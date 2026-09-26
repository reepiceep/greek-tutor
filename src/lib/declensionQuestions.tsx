import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type {
  DeclensionParadigm, AdjectiveUse, AdjectiveUseItem, Chapter, Gender, GrammaticalNumber, NounCase, NounPhrase,
} from '../data/types'
import { shuffle } from './progress'

// Questions for chapter 9: parsing adjective forms, agreement with a noun, and attributive/predicate/substantival use.

export const NOUN_CASES: NounCase[] = ['nominative', 'genitive', 'dative', 'accusative']
export const GENDERS: Gender[] = ['masculine', 'feminine', 'neuter']
export const NUMBERS: GrammaticalNumber[] = ['sg', 'pl']

const CASE_SHORT: Record<NounCase, string> = { nominative: 'nom', genitive: 'gen', dative: 'dat', accusative: 'acc' }
const GENDER_SHORT: Record<Gender, string> = { masculine: 'masc', feminine: 'fem', neuter: 'neut' }

export interface Slot {
  case: NounCase
  number: GrammaticalNumber
  gender: Gender
}

const slotKey = (s: Slot) => `${s.case}-${s.number}-${s.gender}`
export const slotLabel = (s: Slot) => `${CASE_SHORT[s.case]} ${s.number} ${GENDER_SHORT[s.gender]}`
const SLOTS: Slot[] = GENDERS.flatMap((gender) => NUMBERS.flatMap((number) => NOUN_CASES.map((c) => ({ case: c, number, gender }))))

/** The case/number/gender slots a word actually has (a noun has one gender; εἷς is singular only). */
export const slotsOf = (p: DeclensionParadigm) => SLOTS.filter((s) => p.forms[s.gender]?.[s.number])

/** The form in a slot; throws for a slot the word doesn't have. */
export function formAt(p: DeclensionParadigm, s: Slot): string {
  const f = p.forms[s.gender]?.[s.number]?.[NOUN_CASES.indexOf(s.case)]
  if (!f) throw new Error(`${p.lemma} has no ${slotLabel(s)} form`)
  return f
}

/** Does the word have this slot? */
export const hasSlot = (p: DeclensionParadigm, s: Slot) => !!p.forms[s.gender]?.[s.number]

/** Every case/number/gender a form could be (ἀγαθόν is masc acc sg, neut nom sg or neut acc sg). */
export const parsingsOf = (p: DeclensionParadigm, form: string) => slotsOf(p).filter((s) => formAt(p, s) === form)

/** Distinct forms of a word. */
export const distinctForms = (p: DeclensionParadigm) => [...new Set(slotsOf(p).map((s) => formAt(p, s)))]

/** An acute on the last syllable turns grave when another word follows (ἀγαθός → ἀγαθὸς λόγος). */
export function graveBeforeWord(word: string): string {
  const d = word.normalize('NFD')
  const i = d.lastIndexOf('\u0301')
  if (i < 0 || /[αεηιουω]/.test(d.slice(i + 1))) return word
  return (d.slice(0, i) + '\u0300' + d.slice(i + 1)).normalize('NFC')
}

const sharedFeatures = (a: Slot, b: Slot) => Number(a.case === b.case) + Number(a.number === b.number) + Number(a.gender === b.gender)

export const adjParseItemId = (ch: number, p: DeclensionParadigm, form: string) => `ch${ch}:adj-parse:${p.id}:${form}`
export const adjAgreeItemId = (ch: number, p: DeclensionParadigm, n: NounPhrase) => `ch${ch}:adj-agree:${p.id}:${slotKey(n)}`
export const adjUseItemId = (ch: number, u: AdjectiveUseItem, skill: 'use' | 'translate') => `ch${ch}:adj-use:${u.id}:${skill}`

/** See a form, choose one correct parsing; other valid parsings are never offered as wrong answers. */
export function adjParseQuestion(ch: Chapter, p: DeclensionParadigm, form: string): ChoiceQuestion {
  const valid = parsingsOf(p, form)
  const answer = shuffle(valid)[0]
  const wrong = shuffle(slotsOf(p).filter((s) => !valid.some((v) => slotKey(v) === slotKey(s))))
    .sort((a, b) => sharedFeatures(b, answer) - sharedFeatures(a, answer))
    .slice(0, 3)
  const all = valid.map(slotLabel).join(' · ')
  return {
    id: adjParseItemId(ch.number, p, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{p.lexical}</span> — parse it</p></>,
    options: shuffle([answer, ...wrong]).map((s) => ({ key: slotKey(s), label: slotLabel(s) })),
    answer: slotKey(answer),
    explain: valid.length > 1
      ? <p><span className="greek">{form}</span> can be any of: {all}. Context decides.</p>
      : <p><span className="greek">{form}</span> is {all}.</p>,
    review: <><span className="greek">{form}</span> = {all}</>,
  }
}

function describeNoun(n: NounPhrase) {
  const c = n.gender === 'neuter' && (n.case === 'nominative' || n.case === 'accusative') ? 'nominative/accusative' : n.case
  return `${c} ${n.number === 'sg' ? 'singular' : 'plural'} ${n.gender}`
}

/** Which form of the adjective agrees with this article + noun? The adjective must have the noun's slot. */
export function adjAgreeQuestion(ch: Chapter, p: DeclensionParadigm, n: NounPhrase): ChoiceQuestion {
  const correct = formAt(p, n)
  const target: Slot = n
  const candidates = slotsOf(p)
    .filter((s) => formAt(p, s) !== correct)
    .sort((a, b) => sharedFeatures(b, target) - sharedFeatures(a, target) || Math.random() - 0.5)
  const wrong: string[] = []
  for (const s of candidates) {
    const f = formAt(p, s)
    if (!wrong.includes(f)) wrong.push(f)
    if (wrong.length === 3) break
  }
  const [article, ...noun] = n.greek.split(' ')
  const phrase = p.position === 'before-article'
    ? `${graveBeforeWord(correct)} ${n.greek}`
    : `${article} ${graveBeforeWord(correct)} ${noun.join(' ')}`
  const english = p.position === 'before-article' ? null : n.english.replace('the ', `the ${p.gloss} `)
  return {
    id: adjAgreeItemId(ch.number, p, n),
    prompt: <><span className="greek big">{n.greek}</span><p className="muted">Which form of <span className="greek">{p.lexical}</span> agrees with it?</p></>,
    options: shuffle([correct, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: correct,
    explain: (
      <>
        <p><span className="greek">{n.greek}</span> is {describeNoun(n)}, so the adjective must be too: <span className="greek">{correct}</span>.</p>
        {p.pattern === '2-2' && n.gender === 'feminine' && (
          <p><span className="greek">{p.lemma}</span> is a two-ending (2-2) adjective: its feminine uses the masculine forms.</p>
        )}
        <p><span className="greek">{phrase}</span>{english && <> — “{english}”</>}</p>
      </>
    ),
    review: <><span className="greek">{n.greek}</span> + <span className="greek">{p.lemma}</span> → <span className="greek">{phrase}</span></>,
  }
}

export const USE_RULES: Record<AdjectiveUse, { label: string; explain: string }> = {
  attributive: {
    label: 'Attributive — the article comes right before it',
    explain: 'When the article comes right before the adjective, it is attributive: it describes the noun (“the good word”).',
  },
  predicate: {
    label: 'Predicate — the noun has the article but the adjective doesn’t',
    explain: 'When the noun has the article and the adjective doesn’t, the adjective is a predicate: it makes a statement (“the word is good”). Supply “is” if there is no verb.',
  },
  substantival: {
    label: 'Substantival — there is no noun, so it acts as a noun',
    explain: 'An adjective with no noun to describe acts as a noun itself: ὁ ἀγαθός “the good man,” τὸ ἀγαθόν “what is good.”',
  },
}

const TRAP = { key: 'trap', label: 'Attributive — it comes before the noun' }

function highlighted(u: AdjectiveUseItem) {
  const at = u.text.indexOf(u.adjective)
  return (
    <>
      <p className="sentence greek">{u.text.slice(0, at)}<mark>{u.adjective}</mark>{u.text.slice(at + u.adjective.length)}</p>
      <p className="muted small">{u.ref ?? 'practice phrase'}{u.help && <> · <span className="greek">{u.help}</span></>}</p>
    </>
  )
}

function adjectiveUseExplain(u: AdjectiveUseItem) {
  return (
    <>
      <p>{USE_RULES[u.use].explain}</p>
      {u.note && <p>{u.note}</p>}
      {u.translation && <p className="english">“{u.translation}”</p>}
    </>
  )
}

/** Attributive, predicate or substantival — and why. Word order is the trap: it never decides. */
export function adjUseQuestion(ch: Chapter, u: AdjectiveUseItem): ChoiceQuestion {
  const uses = Object.keys(USE_RULES) as AdjectiveUse[]
  return {
    id: adjUseItemId(ch.number, u, 'use'),
    prompt: <>{highlighted(u)}<p className="muted">How is the highlighted adjective used?</p></>,
    options: shuffle([...uses.map((k) => ({ key: k, label: USE_RULES[k].label })), TRAP]),
    answer: u.use,
    explain: adjectiveUseExplain(u),
    review: <><span className="greek">{u.text}</span> — <span className="greek">{u.adjective}</span> is {u.use}</>,
  }
}

export function adjTranslateQuestion(ch: Chapter, u: AdjectiveUseItem): ChoiceQuestion {
  return {
    id: adjUseItemId(ch.number, u, 'translate'),
    prompt: <>{highlighted(u)}<p className="muted">Which translation is right?</p></>,
    options: shuffle([u.translation!, ...u.wrong!.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: u.translation!,
    explain: adjectiveUseExplain(u),
    review: <><span className="greek">{u.text}</span> — {u.translation}</>,
  }
}

/** Items that can be asked as translation questions. */
export const translatable = (u: AdjectiveUseItem) => !!u.translation && (u.wrong?.length ?? 0) >= 3

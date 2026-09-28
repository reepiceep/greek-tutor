import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type {
  CaseOrVocative, Chapter, DeclensionParadigm, DemonstrativeItem, DemonstrativeUse, Gender, LookalikeItem, VocativeForm, VocativeItem,
} from '../data/types'
import { formAt, GENDERS, nearbyForms, NOUN_CASES, NUMBERS, type Slot } from './declensionQuestions'
import { shuffle } from './progress'
import { type UsageConfig, usageItemId, usageQuestion, usageSentenceQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 13: οὗτος and ἐκεῖνος as pronouns or adjectives, English → Greek, look-alikes, and the vocative.

export const DEMONSTRATIVE_USES: Record<DemonstrativeUse, { label: string; explain: string }> = {
  pronoun: {
    label: 'Pronoun (“this one, he; these things”) — it stands on its own, with no noun',
    explain: 'With no noun to go with, a demonstrative is a pronoun: οὗτος “this one, he,” ἐκεῖνος “that one, he,” ταῦτα “these things.”',
  },
  adjective: {
    label: 'Adjective (“this ___, that ___”) — it goes with a noun that has the article',
    explain: 'A demonstrative modifying a noun stands outside the article (οὗτος ὁ λόγος or ὁ λόγος οὗτος), but you still translate it “this word,” never “the word is this.”',
  },
}

const DEMONSTRATIVES: UsageConfig<DemonstrativeUse> = {
  prefix: 'demonstrative',
  ask: 'How is the highlighted demonstrative used?',
  rules: DEMONSTRATIVE_USES,
  traps: [
    { key: 'trap-predicate', label: 'Predicate (“the ___ is this”) — it stands outside the article' },
    { key: 'trap-first', label: 'Pronoun — it comes first in the clause' },
  ],
}

export const demonstrativeItemId = (ch: number, d: DemonstrativeItem, skill: 'use' | 'translate' | 'sentence') =>
  usageItemId(ch, DEMONSTRATIVES.prefix, d, skill)
export const demonstrativeUseQuestion = (ch: Chapter, d: DemonstrativeItem) => usageQuestion(ch, DEMONSTRATIVES, d)
export const demonstrativeTranslateQuestion = (ch: Chapter, d: DemonstrativeItem) => usageTranslateQuestion(ch, DEMONSTRATIVES, d)
export const demonstrativeSentenceQuestion = (ch: Chapter, d: DemonstrativeItem) => usageSentenceQuestion(ch, DEMONSTRATIVES, d)

// --- English for οὗτος and ἐκεῖνος as pronouns ----------------------------------------------

const HELPER: Record<Gender, [string, string]> = { masculine: ['man', 'men'], feminine: ['woman', 'women'], neuter: ['thing', 'things'] }
const CASE_FRAME = ['_', 'of _', 'to _', '_'] as const

/** “this woman”, “of those things”: the pronoun's English, with a helping word by natural gender (Mounce §13.7). */
export function demonstrativeEnglish(p: DeclensionParadigm, s: Slot): string {
  const near = p.id === 'houtos'
  const word = s.number === 'sg' ? (near ? 'this' : 'that') : (near ? 'these' : 'those')
  const phrase = `${word} ${HELPER[s.gender][s.number === 'sg' ? 0 : 1]}`
  return CASE_FRAME[NOUN_CASES.indexOf(s.case)].replace('_', phrase)
}

/** The English as a prompt: nominative and accusative marked, since English doesn't show them on nouns. */
const demonstrativePrompt = (p: DeclensionParadigm, s: Slot) =>
  demonstrativeEnglish(p, s) + (s.case === 'nominative' ? ' (subject)' : s.case === 'accusative' ? ' (object)' : '')

export const DEMONSTRATIVE_SLOTS: Slot[] = GENDERS.flatMap((gender) => NUMBERS.flatMap((number) => NOUN_CASES.map((c) => ({ case: c, number, gender }))))

const slotKey = (s: Slot) => `${s.gender}-${s.number}-${s.case}`
const slotDescription = (p: DeclensionParadigm, s: Slot) =>
  `${p.id === 'houtos' ? '“this”' : '“that”'}: ${s.gender} ${s.case} ${s.number === 'sg' ? 'singular' : 'plural'}`

export type DemonstrativeProduceKind = 'english' | 'desc'
export const demonstrativeProduceId = (ch: number, p: DeclensionParadigm, s: Slot, kind: DemonstrativeProduceKind) =>
  `ch${ch}:dem-produce:${p.id}:${slotKey(s)}:${kind}`

/** From English (“to that woman”) or a description (“this”: feminine dative singular) to the form. */
export function demonstrativeProduceQuestion(ch: Chapter, p: DeclensionParadigm, s: Slot, kind: DemonstrativeProduceKind): ChoiceQuestion {
  const answer = formAt(p, s)
  const prompt = kind === 'english' ? demonstrativePrompt(p, s) : slotDescription(p, s)
  return {
    id: demonstrativeProduceId(ch.number, p, s, kind),
    prompt: <><span className="big">{prompt}</span><p className="muted">Which form of {p.lemma}?</p></>,
    options: shuffle([answer, ...nearbyForms(p, s)]).map((f) => ({ key: f, label: f, greek: true })),
    answer,
    explain: <p>{s.gender} {s.case} {s.number === 'sg' ? 'singular' : 'plural'}, “{demonstrativeEnglish(p, s)}”: <span className="greek">{answer}</span>.</p>,
    review: <>{kind === 'english' ? `“${prompt}”` : prompt} = <span className="greek">{answer}</span></>,
  }
}

// --- Look-alikes -------------------------------------------------------------------------------

function highlight(item: { text: string; word: string; ref?: string; help?: string }) {
  const at = item.text.indexOf(item.word)
  return (
    <>
      <p className="sentence greek">{item.text.slice(0, at)}<mark>{item.word}</mark>{item.text.slice(at + item.word.length)}</p>
      <p className="muted small">{item.ref ?? 'practice phrase'}{item.help && <> · <span className="greek">{item.help}</span></>}</p>
    </>
  )
}

export const lookalikeId = (ch: number, l: LookalikeItem) => `ch${ch}:lookalike:${l.id}`

/** αὕτη or αὐτή, ἤ or ἡ, κἀγώ: which word is the highlighted form? */
export function lookalikeQuestion(ch: Chapter, l: LookalikeItem): ChoiceQuestion {
  return {
    id: lookalikeId(ch.number, l),
    prompt: <>{highlight(l)}<p className="muted">Which word is the highlighted form, and what does it mean here?</p></>,
    options: shuffle([l.answer, ...l.wrong.slice(0, 3)]).map((a) => ({ key: a, label: a })),
    answer: l.answer,
    explain: <p>{l.note}</p>,
    review: <><span className="greek">{l.word}</span> ({l.ref ?? l.text}) = {l.answer}</>,
  }
}

// --- Vocative ----------------------------------------------------------------------------------

export const VOCATIVE_RULES: Record<1 | 2 | 3, string> = {
  1: 'First declension: in the singular the vocative is the same as the nominative.',
  2: 'Second declension: in the singular the vocative usually ends in ε (κύριε, ἄνθρωπε).',
  3: 'Third declension: in the singular the vocative is usually the bare stem, sometimes with a changed vowel (πάτερ, γύναι).',
}
const PLURAL_RULE = 'In the plural the vocative is always the same as the nominative.'

export const vocativeFormId = (ch: number, v: VocativeForm) => `ch${ch}:vocative-form:${v.lemma}:${v.number}`

/** A noun you know → its vocative. */
export function vocativeFormQuestion(ch: Chapter, v: VocativeForm): ChoiceQuestion {
  return {
    id: vocativeFormId(ch.number, v),
    prompt: <><span className="greek big">{v.lemma}</span><p className="muted">“{v.gloss}”: the vocative {v.number === 'sg' ? 'singular' : 'plural'}?</p></>,
    options: shuffle([v.form, ...v.wrong.slice(0, 3)]).map((f) => ({ key: f, label: f, greek: true })),
    answer: v.form,
    explain: <p>{v.number === 'sg' ? VOCATIVE_RULES[v.declension] : PLURAL_RULE} {v.note}</p>,
    review: <><span className="greek">{v.lemma}</span> → <span className="greek">{v.form}</span></>,
  }
}

export const vocativeItemId = (ch: number, v: VocativeItem) => `ch${ch}:vocative-case:${v.id}`
const CASES: CaseOrVocative[] = [...NOUN_CASES, 'vocative']

/** Which case is the highlighted noun? Most are vocatives; a few nominatives keep the question honest. */
export function vocativeCaseQuestion(ch: Chapter, v: VocativeItem): ChoiceQuestion {
  return {
    id: vocativeItemId(ch.number, v),
    prompt: <>{highlight(v)}<p className="muted">What case is the highlighted word?</p></>,
    options: CASES.map((c) => ({ key: c, label: c })),
    answer: v.case,
    explain: (
      <>
        <p><span className="greek">{v.word}</span> is {v.case}{v.case === 'vocative' && ': someone is being spoken to'}.</p>
        <p className="english">“{v.translation}”</p>
        {v.note && <p>{v.note}</p>}
      </>
    ),
    review: <><span className="greek">{v.word}</span> ({v.ref}) is {v.case}</>,
  }
}

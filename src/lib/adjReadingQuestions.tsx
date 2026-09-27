import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { AdjReading, AdjectiveUse, Chapter, DeclensionParadigm, Gender, GrammaticalNumber } from '../data/types'
import { distinctForms, formAt, parsingsOf, slotsOf } from './declensionQuestions'
import { shuffle } from './progress'

// Chapter 9's workbook drills beyond single phrases: take a verse apart (which word the adjective goes with, how it is
// used, the whole sentence), name an adjective's lexical form, and translate a substantival adjective.

export type AdjReadingSkill = 'head' | 'use' | 'translate'
export const ADJ_READING_SKILLS: AdjReadingSkill[] = ['head', 'use', 'translate']

export const adjReadingItemId = (ch: number, r: AdjReading, skill: AdjReadingSkill) => `ch${ch}:adj-reading:${r.id}:${skill}`

/** The option for an adjective that describes no other word. */
export const NO_HEAD = 'none: it stands as a noun'

// Labels by what the adjective does, not by the article: in these verses the article is sometimes missing entirely.
const USE_LABEL: Record<AdjectiveUse, string> = {
  attributive: 'Attributive: it describes a noun',
  predicate: 'Predicate: it says something about the subject (“is”)',
  substantival: 'Substantival: it acts as a noun',
}

function verse(r: AdjReading) {
  const at = r.text.indexOf(r.adjective)
  return (
    <>
      <p className="sentence greek">{r.text.slice(0, at)}<mark>{r.adjective}</mark>{r.text.slice(at + r.adjective.length)}</p>
      <p className="muted small">{r.ref}{r.help && <> · <span className="greek">{r.help}</span></>}</p>
    </>
  )
}

const what = (r: AdjReading) => (r.adjective.includes(' ') ? 'phrase' : 'adjective')

function explain(r: AdjReading) {
  return (
    <>
      {r.note && <p>{r.note}</p>}
      <p className="english">“{r.translation}” ({r.ref})</p>
    </>
  )
}

export function adjReadingHeadQuestion(ch: Chapter, r: AdjReading): ChoiceQuestion {
  const answer = r.head ?? NO_HEAD
  const words = [...new Set(r.decoys)].filter((w) => w !== r.head).slice(0, 3)
  return {
    id: adjReadingItemId(ch.number, r, 'head'),
    prompt: <>{verse(r)}<p className="muted">Which word does the highlighted {what(r)} go with?</p></>,
    options: [...shuffle([answer, ...words].filter((w) => w !== NO_HEAD)), NO_HEAD].map((w) => ({ key: w, label: w })),
    answer,
    explain: explain(r),
    review: <><span className="greek">{r.adjective}</span> ({r.ref}) → {r.head ? <span className="greek">{r.head}</span> : 'stands as a noun'}</>,
  }
}

export function adjReadingUseQuestion(ch: Chapter, r: AdjReading): ChoiceQuestion {
  return {
    id: adjReadingItemId(ch.number, r, 'use'),
    prompt: <>{verse(r)}<p className="muted">How is the highlighted {what(r)} used?</p></>,
    options: (Object.keys(USE_LABEL) as AdjectiveUse[]).map((u) => ({ key: u, label: USE_LABEL[u] })),
    answer: r.use,
    explain: explain(r),
    review: <><span className="greek">{r.adjective}</span> ({r.ref}) is {r.use}</>,
  }
}

export function adjReadingTranslateQuestion(ch: Chapter, r: AdjReading): ChoiceQuestion {
  return {
    id: adjReadingItemId(ch.number, r, 'translate'),
    prompt: <>{verse(r)}<p className="muted">Translate the whole sentence.</p></>,
    options: shuffle([r.translation, ...r.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: r.translation,
    explain: explain(r),
    review: <><span className="greek">{r.text}</span> = “{r.translation}”</>,
  }
}

export function adjReadingQuestion(ch: Chapter, r: AdjReading, skill: AdjReadingSkill): ChoiceQuestion {
  if (skill === 'head') return adjReadingHeadQuestion(ch, r)
  if (skill === 'use') return adjReadingUseQuestion(ch, r)
  return adjReadingTranslateQuestion(ch, r)
}

// --- Lexical form -----------------------------------------------------------------------

/** Every adjective the chapter parses: the main charts and the others. */
export const allAdjectives = (ch: Chapter) => [...(ch.adjectives?.paradigms ?? []), ...(ch.adjectives?.more ?? [])]

export const lexicalItemId = (ch: number, p: DeclensionParadigm, form: string) => `ch${ch}:adj-lexical:${p.id}:${form}`

/** Forms worth asking about: not the lexical form itself. */
export const lexicalForms = (p: DeclensionParadigm) => distinctForms(p).filter((f) => f !== p.lemma)

/**
 * The lexical form: the nominative singular, and for a word with more than one gender the masculine (ἀγαθαῖς → ἀγαθός).
 * `pool` supplies other words' lexical forms as wrong answers (defaults to the chapter's adjectives).
 */
export function lexicalFormQuestion(ch: Chapter, p: DeclensionParadigm, form: string, pool: DeclensionParadigm[] = allAdjectives(ch)): ChoiceQuestion {
  const genders = (['feminine', 'neuter'] as Gender[]).filter((g) => p.forms[g]?.sg)
  // The trap is the feminine or neuter nominative (ἀγαθή, ἀγαθόν), then other words' lemmas.
  const traps = genders.map((g) => formAt(p, { case: 'nominative', number: 'sg', gender: g })).filter((f) => f !== p.lemma && f !== form)
  const others = shuffle(pool.filter((o) => o.id !== p.id && o.lemma !== p.lemma).map((o) => o.lemma))
  const wrong = [...new Set([...traps, ...others])].slice(0, 3)
  const where = parsingsOf(p, form).map((s) => `${s.case} ${s.number} ${s.gender}`)
  const multi = Object.keys(p.forms).length > 1
  return {
    id: lexicalItemId(ch.number, p, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">What is its lexical form?</p></>,
    options: shuffle([p.lemma, ...wrong]).map((f) => ({ key: f, label: f })),
    answer: p.lemma,
    explain: (
      <p>
        <span className="greek">{form}</span> is {where.join(' or ')}. The lexical form is the {multi ? 'masculine ' : ''}nominative
        singular: <span className="greek">{p.lexical}</span>.
      </p>
    ),
    review: <><span className="greek">{form}</span> → <span className="greek">{p.lemma}</span></>,
  }
}

// --- Substantival adjectives -----------------------------------------------------------

const SUBST_ADJECTIVES = ['agathos', 'poneros', 'kakos', 'pistos', 'nekros']
const ARTICLE: Record<Gender, Record<GrammaticalNumber, string>> = {
  masculine: { sg: 'ὁ', pl: 'οἱ' }, feminine: { sg: 'ἡ', pl: 'αἱ' }, neuter: { sg: 'τό', pl: 'τά' },
}

/** English for a substantival adjective: the word added depends on gender and number (Mounce 9.9). */
export function substEnglish(gloss: string, g: Gender, n: GrammaticalNumber, article: boolean): string {
  const noun = { masculine: { sg: 'man', pl: 'people' }, feminine: { sg: 'woman', pl: 'women' }, neuter: { sg: 'thing', pl: 'things' } }[g][n]
  const a = /^[aeiou]/.test(gloss) ? 'an' : 'a'
  return article ? `the ${gloss} ${noun}` : n === 'sg' ? `${a} ${gloss} ${noun}` : `${gloss} ${noun}`
}

export interface SubstItem { p: DeclensionParadigm; gender: Gender; number: GrammaticalNumber; article: boolean }

export const substItemId = (ch: number, s: SubstItem) => `ch${ch}:adj-subst:${s.p.id}:${s.gender}-${s.number}:${s.article ? 'art' : 'bare'}`

/** Nominative forms, with and without the article, of adjectives whose substantival English is natural. */
export function substItems(ch: Chapter): SubstItem[] {
  return allAdjectives(ch)
    .filter((p) => SUBST_ADJECTIVES.includes(p.id))
    .flatMap((p) => slotsOf(p)
      .filter((s) => s.case === 'nominative')
      .flatMap((s) => [true, false].map((article) => ({ p, gender: s.gender, number: s.number, article }))))
}

const substGreek = (s: SubstItem) => {
  const form = formAt(s.p, { case: 'nominative', number: s.number, gender: s.gender })
  return s.article ? `${ARTICLE[s.gender][s.number]} ${form}` : form
}

export function substQuestion(ch: Chapter, s: SubstItem): ChoiceQuestion {
  const answer = substEnglish(s.p.gloss, s.gender, s.number, s.article)
  const wrong = shuffle(slotsOf(s.p).filter((o) => o.case === 'nominative' && !(o.gender === s.gender && o.number === s.number)))
    .map((o) => substEnglish(s.p.gloss, o.gender, o.number, s.article))
  const options = [...new Set([answer, ...wrong])].slice(0, 4)
  return {
    id: substItemId(ch.number, s),
    prompt: <><span className="greek big">{substGreek(s)}</span><p className="muted">No noun to describe: how would you translate it?</p></>,
    options: shuffle(options).map((t) => ({ key: t, label: t })),
    answer,
    explain: (
      <p>
        It is {s.gender} {s.number === 'sg' ? 'singular' : 'plural'}, so add “{answer.split(' ').at(-1)}.”{' '}
        {s.article ? 'With the article: “the …”.' : 'Without the article it is indefinite.'}
        {s.gender === 'masculine' && s.number === 'pl' && ' A masculine plural usually means people in general, men and women.'}
      </p>
    ),
    review: <><span className="greek">{substGreek(s)}</span> = “{answer}”</>,
  }
}

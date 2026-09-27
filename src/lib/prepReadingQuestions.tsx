import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { PREPOSITIONS } from '../data/prepositions'
import type { Case, Chapter, DeclensionParadigm, PrepReading } from '../data/types'
import { distinctForms, parsingsOf } from './declensionQuestions'
import { shuffle } from './progress'

// Chapter 8's workbook drills beyond single phrases: take a verse apart (the preposition's object, the word the phrase
// modifies, the main verb when there is a ἵνα clause, the whole sentence in English), and pair noun forms with a preposition.

export type ReadingSkill = 'object' | 'modifies' | 'main' | 'translate'

export const readingItemId = (ch: number, r: PrepReading, skill: ReadingSkill) => `ch${ch}:reading:${r.id}:${skill}`

/** The skills a verse is asked about, in the order they are asked. */
export const readingSkills = (r: PrepReading): ReadingSkill[] => ['object', 'modifies', ...(r.main ? ['main' as const] : []), 'translate']

/** The option for a phrase that stands as a noun and so modifies nothing. */
export const AS_NOUN = 'nothing: it stands as a noun'

const prepLemma = (id: string) => PREPOSITIONS.find((p) => p.id === id)?.lemma ?? id

function verse(r: PrepReading) {
  const at = r.text.indexOf(r.phrase)
  return (
    <>
      <p className="sentence greek">{r.text.slice(0, at)}<mark>{r.phrase}</mark>{r.text.slice(at + r.phrase.length)}</p>
      <p className="muted small">{r.ref}{r.help && <> · <span className="greek">{r.help}</span></>}</p>
    </>
  )
}

/** Why the phrase attaches where it does: to a verb, to a noun (through a repeated article), or to nothing. */
function phraseUseExplanation(r: PrepReading) {
  if (r.use === 'adverbial') {
    return <>The phrase goes with <span className="greek">{r.modifies}</span>: it tells where, when, how or why. That makes it adverbial, like most prepositional phrases.</>
  }
  if (r.use === 'adjectival') {
    return <>The article in front of the phrase ties it to <span className="greek">{r.modifies}</span>: it says which one, like an adjective.</>
  }
  return <>An article with no noun turns the phrase itself into a noun, so it modifies nothing.</>
}

function explain(r: PrepReading) {
  return (
    <>
      <p className="english">“{r.translation}” ({r.ref})</p>
      {r.note && <p>{r.note}</p>}
    </>
  )
}

const unique = (xs: string[]) => [...new Set(xs)]

export function readingObjectQuestion(ch: Chapter, r: PrepReading): ChoiceQuestion {
  const wrong = unique([...(r.modifies ? [r.modifies] : []), ...r.decoys]).filter((w) => w !== r.object).slice(0, 3)
  return {
    id: readingItemId(ch.number, r, 'object'),
    prompt: <>{verse(r)}<p className="muted">What is the object of <span className="greek">{prepLemma(r.prep)}</span>?</p></>,
    options: shuffle([r.object, ...wrong]).map((w) => ({ key: w, label: w })),
    answer: r.object,
    explain: (
      <p>
        <span className="greek">{r.object}</span> is {r.case} because it is the object of <span className="greek">{prepLemma(r.prep)}</span>,
        which takes the {r.case}.
      </p>
    ),
    review: <><span className="greek">{r.phrase}</span> ({r.ref}): object <span className="greek">{r.object}</span></>,
  }
}

export function readingModifiesQuestion(ch: Chapter, r: PrepReading): ChoiceQuestion {
  const answer = r.modifies ?? AS_NOUN
  const words = unique(r.decoys).filter((w) => w !== r.modifies).slice(0, 3)
  return {
    id: readingItemId(ch.number, r, 'modifies'),
    prompt: <>{verse(r)}<p className="muted">What does the highlighted phrase modify?</p></>,
    options: [...shuffle(unique([answer, ...words, AS_NOUN]).filter((w) => w !== AS_NOUN)), AS_NOUN].map((w) => ({ key: w, label: w })),
    answer,
    explain: <><p>{phraseUseExplanation(r)}</p>{explain(r)}</>,
    review: <><span className="greek">{r.phrase}</span> ({r.ref}) → {r.modifies ? <span className="greek">{r.modifies}</span> : 'used as a noun'}</>,
  }
}

export function readingMainQuestion(ch: Chapter, r: PrepReading): ChoiceQuestion {
  const main = r.main!
  const others = r.decoys.filter((w) => w !== main.verb && !main.dependent.includes(w))
  return {
    id: readingItemId(ch.number, r, 'main'),
    prompt: <>{verse(r)}<p className="muted">Each <span className="greek">ἵνα</span> starts a dependent clause. Which is the main verb?</p></>,
    options: shuffle(unique([main.verb, ...main.dependent, ...others]).slice(0, 4)).map((w) => ({ key: w, label: w })),
    answer: main.verb,
    explain: (
      <>
        <p>
          The main subject and verb are never inside a dependent clause. <span className="greek">{main.dependent.join(', ')}</span>{' '}
          {main.dependent.length > 1 ? 'are' : 'is'} inside a <span className="greek">ἵνα</span> clause, so the main verb is{' '}
          <span className="greek">{main.verb}</span>.
        </p>
        {explain(r)}
      </>
    ),
    review: <>{r.ref}: main verb <span className="greek">{main.verb}</span></>,
  }
}

export function readingTranslateQuestion(ch: Chapter, r: PrepReading): ChoiceQuestion {
  return {
    id: readingItemId(ch.number, r, 'translate'),
    prompt: <>{verse(r)}<p className="muted">Translate the whole sentence.</p></>,
    options: shuffle([r.translation, ...r.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: r.translation,
    explain: explain(r),
    review: <><span className="greek">{r.text}</span> = “{r.translation}”</>,
  }
}

export function readingQuestion(ch: Chapter, r: PrepReading, skill: ReadingSkill): ChoiceQuestion {
  if (skill === 'object') return readingObjectQuestion(ch, r)
  if (skill === 'modifies') return readingModifiesQuestion(ch, r)
  if (skill === 'main') return readingMainQuestion(ch, r)
  return readingTranslateQuestion(ch, r)
}

// --- Which preposition could take this noun form? ------------------------------------

// Prepositions from chapters 6–8 that take one case only, so a form's case settles which of them fit.
const ONE_CASE = ['en-prep', 'eis', 'apo', 'ek', 'pros']
const oneCase = () => PREPOSITIONS.filter((p) => ONE_CASE.includes(p.id))
const caseOf = (id: string) => PREPOSITIONS.find((p) => p.id === id)!.cases![0].case

export const nounPrepItemId = (ch: number, p: DeclensionParadigm, form: string) => `ch${ch}:nounprep:${p.id}:${form}`

/** The case of a form, when it has exactly one and a preposition can take it (not the nominative). */
function objectCase(p: DeclensionParadigm, form: string): Case | undefined {
  const cases = new Set(parsingsOf(p, form).map((s) => s.case))
  const [only] = cases
  return cases.size === 1 && only !== 'nominative' ? only : undefined
}

/** Forms of the chapter's nouns that only one case fits, so exactly one kind of preposition can take them. */
export function nounPrepForms(ch: Chapter): { p: DeclensionParadigm; form: string }[] {
  return (ch.nouns ?? []).flatMap((p) => distinctForms(p).filter((f) => objectCase(p, f)).map((form) => ({ p, form })))
}

export function nounPrepQuestion(ch: Chapter, p: DeclensionParadigm, form: string): ChoiceQuestion {
  const c = objectCase(p, form)!
  const fits = oneCase().filter((w) => caseOf(w.id) === c)
  const answer = shuffle(fits)[0]
  const wrong = shuffle(oneCase().filter((w) => caseOf(w.id) !== c)).slice(0, 3)
  const gloss = (id: string) => PREPOSITIONS.find((w) => w.id === id)!.cases![0].gloss
  return {
    id: nounPrepItemId(ch.number, p, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{p.lexical}</span>. Which preposition could take it as its object?</p></>,
    options: shuffle([answer, ...wrong]).map((w) => ({ key: w.id, label: w.lemma })),
    answer: answer.id,
    explain: (
      <p>
        <span className="greek">{form}</span> is {c}. {fits.map((w, i) => (
          <span key={w.id}>{i > 0 && ' and '}<span className="greek">{w.lemma}</span> (“{gloss(w.id)}”)</span>
        ))} {fits.length > 1 ? 'take' : 'takes'} the {c}.
      </p>
    ),
    review: <><span className="greek">{form}</span> is {c}: <span className="greek">{fits.map((w) => w.lemma).join(', ')}</span></>,
  }
}

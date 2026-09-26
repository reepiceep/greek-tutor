import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, GrammaticalNumber, NounCase, Person, PronounForm, PronounVerse } from '../data/types'
import { NOUN_CASES } from './declensionQuestions'
import { shuffle } from './progress'

// Questions for chapter 11: parsing personal pronouns, their meaning (ἡμ- vs ὑμ-), emphasis, and pronouns in verses.

interface PronounSlot {
  person: Person
  number: GrammaticalNumber
  case: NounCase
}

const CASE_SHORT: Record<NounCase, string> = { nominative: 'nom', genitive: 'gen', dative: 'dat', accusative: 'acc' }
const SLOTS: PronounSlot[] = ([1, 2] as const).flatMap((person) =>
  (['sg', 'pl'] as const).flatMap((number) => NOUN_CASES.map((c) => ({ person, number, case: c }))),
)
const key = (s: PronounSlot) => `${s.person}-${s.number}-${s.case}`
export const pronounSlotLabel = (s: PronounSlot) => `${s.person === 1 ? '1st' : '2nd'} person ${s.number} ${CASE_SHORT[s.case]}`
const shared = (a: PronounSlot, b: PronounSlot) => Number(a.person === b.person) + Number(a.number === b.number) + Number(a.case === b.case)
/** Same number and case, other person: ἡμῶν ↔ ὑμῶν, ἐγώ ↔ σύ. The confusion most worth testing. */
const counterpart = (a: PronounSlot, b: PronounSlot) => a.person !== b.person && a.number === b.number && a.case === b.case
const closeness = (a: PronounSlot, target: PronounSlot) => shared(a, target) + (counterpart(a, target) ? 2 : 0)
const byCloseness = (target: PronounSlot) => (a: PronounSlot, b: PronounSlot) => closeness(b, target) - closeness(a, target) || Math.random() - 0.5

export const WHO: Record<string, string> = {
  '1-sg': 'I / me / my',
  '1-pl': 'we / us / our',
  '2-sg': 'you (singular)',
  '2-pl': 'you (plural)',
}

const STEM_TIP = 'Remember: ἡμ- is “we/us,” ὑμ- is “you” (plural).'

export const pronounParseId = (ch: number, f: PronounForm) => `ch${ch}:pron-parse:${f.form}`
export const pronounMeaningId = (ch: number, f: PronounForm) => `ch${ch}:pron-meaning:${f.form}`
export const pronounEmphasisId = (ch: number, f: PronounForm) => `ch${ch}:pron-emphasis:${f.form}`
export const pronounVerseId = (ch: number, v: PronounVerse, skill: 'who' | 'case') => `ch${ch}:pron-verse:${v.id}:${skill}`

function formExplain(f: PronounForm) {
  return (
    <p>
      <span className="greek">{f.form}</span> is {pronounSlotLabel(f)}: “{f.english}.”
      {f.emphatic === false && <> It is the unemphatic, enclitic form.</>}
      {f.emphatic === true && <> It is the emphatic (accented) form.</>}
      {f.number === 'pl' && <> {STEM_TIP}</>}
    </p>
  )
}

export function pronounParseQuestion(ch: Chapter, f: PronounForm): ChoiceQuestion {
  const wrong = SLOTS.filter((s) => key(s) !== key(f)).sort(byCloseness(f)).slice(0, 3)
  return {
    id: pronounParseId(ch.number, f),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">Person, number and case?</p></>,
    options: shuffle([f, ...wrong]).map((s) => ({ key: key(s), label: pronounSlotLabel(s) })),
    answer: key(f),
    explain: formExplain(f),
    review: <><span className="greek">{f.form}</span> = {pronounSlotLabel(f)}</>,
  }
}

/** Form → English. The closest wrong answers are the other person (ἡμ- ↔ ὑμ-) and other cases. */
export function pronounMeaningQuestion(ch: Chapter, all: PronounForm[], f: PronounForm): ChoiceQuestion {
  const wrong: string[] = []
  for (const g of all.filter((x) => x.english !== f.english).sort(byCloseness(f))) {
    if (!wrong.includes(g.english)) wrong.push(g.english)
    if (wrong.length === 3) break
  }
  return {
    id: pronounMeaningId(ch.number, f),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">What does it mean?</p></>,
    options: shuffle([f.english, ...wrong]).map((e) => ({ key: e, label: e })),
    answer: f.english,
    explain: formExplain(f),
    review: <><span className="greek">{f.form}</span> = “{f.english}”</>,
  }
}

export function pronounEmphasisQuestion(ch: Chapter, f: PronounForm): ChoiceQuestion {
  return {
    id: pronounEmphasisId(ch.number, f),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">“{f.english}” — which kind of form is it?</p></>,
    options: [
      { key: 'emphatic', label: 'Emphatic (accented) form' },
      { key: 'enclitic', label: 'Unemphatic, enclitic form' },
    ],
    answer: f.emphatic ? 'emphatic' : 'enclitic',
    explain: (
      <p>
        In the singular, the genitive, dative and accusative each have two forms: emphatic <span className="greek">ἐμοῦ, ἐμοί, ἐμέ</span> /
        <span className="greek"> σοῦ, σοί, σέ</span>, and enclitic <span className="greek">μου, μοι, με</span> / <span className="greek">σου, σοι, σε</span>.
        After prepositions you usually see the emphatic ones.
      </p>
    ),
    review: <><span className="greek">{f.form}</span> is {f.emphatic ? 'emphatic' : 'enclitic'}</>,
  }
}

function verseHighlight(v: PronounVerse) {
  const at = v.text.indexOf(v.word)
  return (
    <>
      <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
      <p className="muted small">{v.ref}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
    </>
  )
}

function verseExplain(v: PronounVerse) {
  return (
    <>
      <p><span className="greek">{v.word}</span> is {pronounSlotLabel(v)}.</p>
      <p className="english">“{v.translation}”</p>
      {v.note && <p>{v.note}</p>}
    </>
  )
}

export function pronounVerseWhoQuestion(ch: Chapter, v: PronounVerse): ChoiceQuestion {
  return {
    id: pronounVerseId(ch.number, v, 'who'),
    prompt: <>{verseHighlight(v)}<p className="muted">Who does the highlighted pronoun refer to?</p></>,
    options: Object.entries(WHO).map(([k, label]) => ({ key: k, label })),
    answer: `${v.person}-${v.number}`,
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) = {WHO[`${v.person}-${v.number}`]}</>,
  }
}

export function pronounVerseCaseQuestion(ch: Chapter, v: PronounVerse): ChoiceQuestion {
  return {
    id: pronounVerseId(ch.number, v, 'case'),
    prompt: <>{verseHighlight(v)}<p className="muted">What case is the highlighted pronoun?</p></>,
    options: NOUN_CASES.map((c) => ({ key: c, label: c })),
    answer: v.case,
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) is {v.case}</>,
  }
}

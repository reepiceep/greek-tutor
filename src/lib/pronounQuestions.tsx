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
/** Every person/number/case slot. */
export const PRONOUN_SLOTS: PronounSlot[] = ([1, 2] as const).flatMap((person) =>
  (['sg', 'pl'] as const).flatMap((number) => NOUN_CASES.map((c) => ({ person, number, case: c }))),
)
const SLOTS = PRONOUN_SLOTS
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
export const pronounVerseId = (ch: number, v: PronounVerse, skill: 'who' | 'case' | 'translate' | 'stress') => `ch${ch}:pron-verse:${v.id}:${skill}`

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

/** The whole verse in English (only for verses with wrong translations written). */
export function pronounVerseTranslateQuestion(ch: Chapter, v: PronounVerse): ChoiceQuestion {
  return {
    id: pronounVerseId(ch.number, v, 'translate'),
    prompt: <>{verseHighlight(v)}<p className="muted">Translate the whole sentence.</p></>,
    options: shuffle([v.translation, ...(v.wrong ?? []).slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: v.translation,
    explain: verseExplain(v),
    review: <><span className="greek">{v.text}</span> = “{v.translation}”</>,
  }
}

const STRESS_OPTIONS = [
  { key: 'emphasis', label: 'For emphasis or contrast: the verb already includes the subject' },
  { key: 'required', label: 'A Greek verb always needs a subject pronoun written out' },
  { key: 'object', label: 'It is the object of the verb' },
  { key: 'possessive', label: 'It shows possession (“my,” “your”)' },
]

/** Why is a nominative pronoun there when the verb's ending already gives the subject? (Mounce 11.8; Merkle & Plummer 9.6) */
export function pronounStressQuestion(ch: Chapter, v: PronounVerse): ChoiceQuestion {
  return {
    id: pronounVerseId(ch.number, v, 'stress'),
    prompt: <>{verseHighlight(v)}<p className="muted">Why is the highlighted pronoun written out?</p></>,
    options: STRESS_OPTIONS,
    answer: 'emphasis',
    explain: (
      <>
        <p>
          A Greek verb’s ending already gives its subject, so a nominative pronoun is not needed. When it is written out, it usually adds
          emphasis or sets one person against another. English shows it with stress, or with “myself,” “yourselves.”
        </p>
        {verseExplain(v)}
      </>
    ),
    review: <><span className="greek">{v.word}</span> ({v.ref}): emphasis</>,
  }
}

// --- English → Greek -------------------------------------------------------------------

export type ProduceKind = 'english' | 'desc'

export const pronounProduceId = (ch: number, s: PronounSlot, kind: ProduceKind) => `ch${ch}:pron-produce:${key(s)}:${kind}`


/** The forms in a slot, the unemphatic one first (μου before ἐμοῦ); the only form where there is one. */
export function slotForms(all: PronounForm[], s: PronounSlot): PronounForm[] {
  return all.filter((f) => key(f) === key(s)).sort((a, b) => Number(a.emphatic ?? false) - Number(b.emphatic ?? false))
}

/** From English (“to you (pl)”) or a description (“1st person dative plural”) to the Greek form. */
export function pronounProduceQuestion(ch: Chapter, all: PronounForm[], s: PronounSlot, kind: ProduceKind): ChoiceQuestion {
  const [main, emphatic] = slotForms(all, s)
  const wrong: string[] = []
  for (const o of SLOTS.filter((x) => key(x) !== key(s)).sort(byCloseness(s))) {
    const f = slotForms(all, o)[0].form
    if (!wrong.includes(f)) wrong.push(f)
    if (wrong.length === 3) break
  }
  const both = emphatic ? <><span className="greek">{main.form}</span> (emphatic <span className="greek">{emphatic.form}</span>)</> : <span className="greek">{main.form}</span>
  return {
    id: pronounProduceId(ch.number, s, kind),
    prompt: kind === 'english'
      ? <><span className="big">{main.english}</span><p className="muted">Which Greek form?</p></>
      : <><span className="big">{pronounSlotLabel(s)}</span><p className="muted">Which form of the personal pronoun?</p></>,
    options: shuffle([main.form, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: main.form,
    explain: <p>{pronounSlotLabel(s)}, “{main.english}”: {both}.{s.number === 'pl' && <> {STEM_TIP}</>}</p>,
    review: <>{kind === 'english' ? `“${main.english}”` : pronounSlotLabel(s)} = {both}</>,
  }
}

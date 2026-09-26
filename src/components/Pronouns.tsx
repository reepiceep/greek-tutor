import { useState } from 'react'
import type { Chapter, PronounForm } from '../data/types'
import { adjParseItemId, adjParseQuestion, distinctForms, NOUN_CASES } from '../lib/declensionQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import {
  pronounEmphasisId, pronounEmphasisQuestion, pronounMeaningId, pronounMeaningQuestion, pronounParseId, pronounParseQuestion,
  pronounVerseCaseQuestion, pronounVerseId, pronounVerseWhoQuestion,
} from '../lib/pronounQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'meaning' | 'verses' | 'nouns'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'meaning', label: 'Meaning' },
  { tab: 'verses', label: 'In verses' },
  { tab: 'nouns', label: 'New nouns' },
]

export function Pronouns({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Personal pronouns</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'meaning' && <Meaning key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'nouns' && <Nouns key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const COLUMNS = [
  { person: 1, number: 'sg', label: '1st sg' },
  { person: 1, number: 'pl', label: '1st pl' },
  { person: 2, number: 'sg', label: '2nd sg' },
  { person: 2, number: 'pl', label: '2nd pl' },
] as const

function cell(forms: PronounForm[], person: 1 | 2, number: 'sg' | 'pl', c: (typeof NOUN_CASES)[number]) {
  const fs = forms.filter((f) => f.person === person && f.number === number && f.case === c)
  const main = fs.find((f) => f.emphatic !== false)!
  const enclitic = fs.find((f) => f.emphatic === false)
  return <>{main.form}{enclitic && <span className="muted"> ({enclitic.form})</span>}<div className="cell-gloss">{main.english}</div></>
}

function Forms({ chapter }: { chapter: Chapter }) {
  const p = chapter.pronouns
  const forms = p?.forms ?? []
  return (
    <>
      <Lesson title="First and second person pronouns">
        <ul>
          <li>
            The forms don’t follow a noun pattern closely, so learn them as a chart. The <strong>plurals</strong> are easy to
            mix up: <span className="greek">ἡμ-</span> is <strong>we / us</strong>, <span className="greek">ὑμ-</span> is
            <strong> you</strong>.
          </li>
          <li>
            In the singular genitive, dative and accusative there are two forms: the <strong>emphatic</strong>{' '}
            (<span className="greek">ἐμοῦ, σοῦ</span>) and the unemphatic <strong>enclitic</strong> (<span className="greek">μου, σου</span>).
            The meaning is the same; the emphatic forms are normal after prepositions (<span className="greek">διʼ ἐμοῦ</span>).
          </li>
          <li>
            A Greek verb already contains its subject (<span className="greek">λέγω</span> = “I say”), so a <strong>nominative
            pronoun</strong> like <span className="greek">ἐγώ</span> or <span className="greek">ὑμεῖς</span> usually adds emphasis or
            contrast: <span className="greek">ἐγὼ δὲ λέγω ὑμῖν</span>, “but <em>I</em> say to you.”
          </li>
          <li>The genitive often shows possession: <span className="greek">τὸ ὄνομά σου</span>, “your name” (literally “the name of you”).</li>
        </ul>
      </Lesson>
      <table className="paradigm compact pronoun-table">
        <thead><tr><th />{COLUMNS.map((c) => <th key={c.label}>{c.label}</th>)}</tr></thead>
        <tbody>
          {NOUN_CASES.map((c) => (
            <tr key={c}>
              <th>{c.slice(0, 3)}</th>
              {COLUMNS.map((col) => <td key={col.label} className="greek">{cell(forms, col.person, col.number, c)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// --- Quizzes -------------------------------------------------------------------------

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const forms = chapter.pronouns?.forms ?? []
    const pool = [
      ...forms.map((f) => ({ id: pronounParseId(chapter.number, f), make: () => pronounParseQuestion(chapter, f) })),
      ...forms.filter((f) => f.emphatic !== undefined).map((f) => ({ id: pronounEmphasisId(chapter.number, f), make: () => pronounEmphasisQuestion(chapter, f) })),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Meaning({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const forms = chapter.pronouns?.forms ?? []
    return pickWeakest(forms, (f) => pronounMeaningId(chapter.number, f), 12).map((f) => pronounMeaningQuestion(chapter, forms, f))
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verses = chapter.pronouns?.verses ?? []
    const pool = verses.flatMap((v) => [
      { id: pronounVerseId(chapter.number, v, 'who'), make: () => pronounVerseWhoQuestion(chapter, v) },
      { id: pronounVerseId(chapter.number, v, 'case'), make: () => pronounVerseCaseQuestion(chapter, v) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Real New Testament verses (SBLGNT). Identify the highlighted pronoun.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Nouns({ chapter, onRestart }: QuizProps) {
  const nouns = chapter.pronouns?.nouns ?? []
  const [questions] = useState(() => {
    const pool = nouns.flatMap((p) => distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })))
    return pickWeakest(pool, (x) => x.id, 10).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="New third-declension nouns in this chapter" firstVisitOpen={false}>
        <ul>
          <li><span className="greek">πατήρ, πατρός</span> (and <span className="greek">μήτηρ, μητρός</span>): the stem shifts between πατερ- and πατρ-, and the dative plural is <span className="greek">πατράσι(ν)</span>.</li>
          <li><span className="greek">ἀνήρ, ἀνδρός</span>: a δ appears between ν and ρ everywhere except the nominative singular.</li>
          <li><span className="greek">πίστις, πίστεως</span>: the stem vowel ι becomes ε in most forms, and the genitive singular is -εως.</li>
          <li><span className="greek">χάρις, χάριτος</span>: accusative singular <span className="greek">χάριν</span>, not χάριτα.</li>
        </ul>
      </Lesson>
      <div className="adj-tables">{nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
      <h3>Parse</h3>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

import { useState } from 'react'
import type { Chapter } from '../data/types'
import { adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import { ruleItemId, ruleItemQuestion, tisItemId, tisQuestion } from '../lib/thirdDeclensionQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'stops' | 'parse' | 'pas' | 'tis'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'stops', label: 'Stops & stems' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'pas', label: 'πᾶς agreement' },
  { tab: 'tis', label: 'τίς or τις?' },
]

export function ThirdDeclension({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Third declension</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'stops' && <Stops key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'pas' && <Pas key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'tis' && <Tis key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const ENDINGS: { label: string; mf: string; n: string }[] = [
  { label: 'nom sg', mf: 'ς / —', n: '—' },
  { label: 'gen sg', mf: 'ος', n: 'ος' },
  { label: 'dat sg', mf: 'ι', n: 'ι' },
  { label: 'acc sg', mf: 'α / ν', n: '—' },
  { label: 'nom pl', mf: 'ες', n: 'α' },
  { label: 'gen pl', mf: 'ων', n: 'ων' },
  { label: 'dat pl', mf: 'σι(ν)', n: 'σι(ν)' },
  { label: 'acc pl', mf: 'ας', n: 'α' },
]

function Forms({ chapter }: { chapter: Chapter }) {
  const paradigms = chapter.thirdDeclension?.paradigms ?? []
  return (
    <>
      <Lesson title="How the third declension works">
        <p>
          Third-declension stems usually end in a <strong>consonant</strong>, and the endings attach straight to it. That is
          why the nominative is often disguised, and why the lexical form gives you the <strong>genitive</strong>: drop its
          -ος to find the stem (<span className="greek">σάρξ, σαρκός</span> → <span className="greek">σαρκ-</span>).
        </p>
        <div className="lesson-grid">
          <table className="paradigm compact">
            <thead><tr><th /><th>masc/fem</th><th>neut</th></tr></thead>
            <tbody>
              {ENDINGS.map((e) => (
                <tr key={e.label} className={e.label === 'nom pl' ? 'group-start' : ''}>
                  <th>{e.label}</th><td className="greek">{e.mf}</td><td className="greek">{e.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p><strong>Square of Stops</strong>: what happens when a stop meets σ (nominative -ς, dative plural -σι).</p>
            <table className="paradigm compact">
              <thead><tr><th /><th>stops</th><th>+ σ</th></tr></thead>
              <tbody>
                <tr><th>labial</th><td className="greek">π β φ</td><td className="greek">ψ</td></tr>
                <tr><th>velar</th><td className="greek">κ γ χ</td><td className="greek">ξ</td></tr>
                <tr><th>dental</th><td className="greek">τ δ θ</td><td>drops out</td></tr>
              </tbody>
            </table>
            <ul>
              <li><strong>τ can’t end a word</strong>, so it drops: <span className="greek">ὀνοματ</span> → <span className="greek">ὄνομα</span>.</li>
              <li><strong>ντ drops before σ</strong> and the vowel lengthens: <span className="greek">παντ + ς</span> → <span className="greek">πᾶς</span>.</li>
            </ul>
          </div>
        </div>
        <p>
          Watch out: in the third declension <span className="greek">-ος</span> is <em>genitive</em> singular, and
          <span className="greek"> -α</span> can be accusative singular (<span className="greek">σάρκα</span>) or neuter plural.
          The article is your best friend: <span className="greek">τῆς σαρκός</span>.
        </p>
      </Lesson>
      <div className="adj-tables">
        {paradigms.map((p) => <DeclensionTable key={p.id} p={p} />)}
      </div>
    </>
  )
}

// --- Quizzes -------------------------------------------------------------------------

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Stops({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const d = chapter.thirdDeclension
    const pool = [
      ...(d?.stops ?? []).map((r) => ({ id: ruleItemId(chapter.number, 'stop', r), make: () => ruleItemQuestion(chapter, 'stop', r) })),
      ...(d?.stems ?? []).map((r) => ({ id: ruleItemId(chapter.number, 'stem', r), make: () => ruleItemQuestion(chapter, 'stem', r) })),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.thirdDeclension?.paradigms ?? []).flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Give the case, number and gender. Some forms have more than one right answer; only one of them is offered.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Pas({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const a = chapter.thirdDeclension?.agreement
    const pool = (a?.nouns ?? []).map((n) => ({ id: adjAgreeItemId(chapter.number, a!.paradigm, n), make: () => adjAgreeQuestion(chapter, a!.paradigm, n) }))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">
        <span className="greek">πᾶς</span> usually stands before the article: <span className="greek">πᾶς ὁ ὄχλος</span>, “the whole crowd”;
        <span className="greek"> πάντες οἱ ἄνθρωποι</span>, “all the people.” It agrees in case, number and gender even when the noun is from a
        different declension.
      </p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Tis({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() =>
    pickWeakest(chapter.thirdDeclension?.tis ?? [], (t) => tisItemId(chapter.number, t), 10).map((t) => tisQuestion(chapter, t)),
  )
  return (
    <>
      <Lesson title="τίς or τις?">
        <p>
          They look alike, but the accent tells them apart. <span className="greek">τίς, τί</span> asks a question (“who? what? why?”)
          and <strong>always has an acute on its first syllable</strong>. <span className="greek">τις, τι</span> means “someone, anyone,
          a certain” and is <strong>enclitic</strong>, so it usually has no accent, and may give its accent to the word before it
          (<span className="greek">Εἴ τις</span>). Position in the sentence doesn’t decide.
        </p>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

import { useState } from 'react'
import type { Chapter } from '../data/types'
import { adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import {
  relativeAntecedentQuestion, relativeCaseQuestion, relativeFormId, relativeFormQuestion, relativeItemId, relativeTranslateQuestion,
} from '../lib/relativeQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'clauses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'clauses', label: 'Clauses' },
]

export function RelativePronoun({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Relative pronoun</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'clauses' && <Clauses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function Forms({ chapter }: { chapter: Chapter }) {
  const r = chapter.relative
  if (!r) return null
  return (
    <>
      <Lesson title="ὅς, ἥ, ὅ">
        <ul>
          <li>
            The relative pronoun (“who, whom, which, that”) looks like the article’s endings with a rough breathing and an accent:
            <span className="greek"> ὅς, ἥ, ὅ</span>. Neuter <span className="greek">ὅ</span> has no ν.
          </li>
          <li>
            <strong>Relative or article?</strong> The relative always has an accent and never starts with τ.
            The article’s <span className="greek">ὁ, ἡ, οἱ, αἱ</span> have no accent; its other forms start with τ.
            Don’t confuse <span className="greek">ἥ</span> with <span className="greek">ἤ</span> “or,” or <span className="greek">οὗ</span> with <span className="greek">οὐ</span> “not.”
          </li>
          <li>
            <strong>The key rule:</strong> the relative gets its <strong>gender and number from its antecedent</strong> (the word it refers back to)
            but its <strong>case from its job in its own clause</strong>. In <span className="greek">Ἰησοῦς ὃν σὺ διώκεις</span>, Ἰησοῦς is nominative but
            <span className="greek"> ὅν</span> is accusative, because it is the object of διώκεις: “Jesus, whom you are persecuting.”
          </li>
          <li>Translate with “who” (subject), “whom” (object, after prepositions), “whose” (possession), “to whom,” or “which/that” for things.</li>
        </ul>
        <p className="muted">Also in this chapter: <span className="greek">ὁδός</span> is a feminine second-declension noun (<span className="greek">ἡ ὁδός</span>), and the new third-declension nouns <span className="greek">χείρ</span> and <span className="greek">ῥῆμα</span>.</p>
      </Lesson>
      <div className="adj-tables">
        <DeclensionTable p={r.paradigm} />
        {r.nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}
      </div>
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const r = chapter.relative!
    const pool = [
      ...[r.paradigm, ...r.nouns].flatMap((p) =>
        distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
      ),
      ...r.forms.map((f) => ({ id: relativeFormId(chapter.number, f), make: () => relativeFormQuestion(chapter, f) })),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Parse forms of ὅς (and χείρ, ῥῆμα), and tell the relative pronoun from the article.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Clauses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.relative?.items ?? []
    const pool = items.flatMap((r) => [
      { id: relativeItemId(chapter.number, r, 'antecedent'), make: () => relativeAntecedentQuestion(chapter, r) },
      { id: relativeItemId(chapter.number, r, 'case'), make: () => relativeCaseQuestion(chapter, r) },
      { id: relativeItemId(chapter.number, r, 'translate'), make: () => relativeTranslateQuestion(chapter, r) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Gender and number come from the antecedent; case comes from the pronoun’s job in its own clause.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

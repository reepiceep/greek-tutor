import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  USE_RULES, adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, adjTranslateQuestion,
  adjUseItemId, adjUseQuestion, distinctForms, translatable,
} from '../lib/declensionQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'agree' | 'uses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'agree', label: 'Agreement' },
  { tab: 'uses', label: 'Uses' },
]

export function Adjectives({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Adjectives</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'agree' && <Agree key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

function Forms({ chapter }: { chapter: Chapter }) {
  const paradigms = chapter.adjectives?.paradigms ?? []
  return (
    <>
      <Lesson title="Adjective forms and agreement">
        <p>
          An adjective <strong>agrees</strong> with the noun it modifies in <strong>case, number and gender</strong>, and uses
          the same endings you already know from nouns: second declension for masculine and neuter, first declension for feminine.
        </p>
        <ul>
          <li><strong>2-1-2 adjectives</strong> have three sets of endings: <span className="greek">ἀγαθός, -ή, -όν</span>. After ε, ι or ρ the feminine uses α instead of η: <span className="greek">πονηρός, -ά, -όν</span>; <span className="greek">ἅγιος, -ία, -ον</span>.</li>
          <li><strong>2-2 adjectives</strong> have only two: <span className="greek">αἰώνιος, -ον</span>. The feminine uses the masculine forms, so you will see <span className="greek">ζωὴ αἰώνιος</span>, “eternal life.”</li>
          <li>Agreement does not mean the endings look the same: <span className="greek">ἀγαθὴ ὁδός</span> is feminine even though <span className="greek">ὁδός</span> ends in -ος.</li>
        </ul>
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

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.adjectives?.paradigms ?? []).flatMap((p) =>
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

function Agree({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const a = chapter.adjectives
    const pool = (a?.paradigms ?? []).flatMap((p) =>
      (a?.nouns ?? []).map((n) => ({ id: adjAgreeItemId(chapter.number, p, n), make: () => adjAgreeQuestion(chapter, p, n) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Match the adjective to the noun’s case, number and gender.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const uses = chapter.adjectives?.uses ?? []
    const pool = [
      ...uses.map((u) => ({ id: adjUseItemId(chapter.number, u, 'use'), make: () => adjUseQuestion(chapter, u) })),
      ...uses.filter(translatable).map((u) => ({ id: adjUseItemId(chapter.number, u, 'translate'), make: () => adjTranslateQuestion(chapter, u) })),
    ]
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="Attributive, predicate or substantival?">
        <p>Look for the article. Word order does not decide.</p>
        <ul>
          <li><strong>{USE_RULES.attributive.label}.</strong> <span className="greek">ὁ ἀγαθὸς λόγος</span> or <span className="greek">ὁ λόγος ὁ ἀγαθός</span>: “the good word.”</li>
          <li><strong>{USE_RULES.predicate.label}.</strong> <span className="greek">ὁ λόγος ἀγαθός</span> or <span className="greek">ἀγαθὸς ὁ λόγος</span>: “the word is good.”</li>
          <li><strong>{USE_RULES.substantival.label}.</strong> <span className="greek">ὁ ἀγαθός</span>: “the good man”; <span className="greek">οἱ ἅγιοι</span>: “the saints.”</li>
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

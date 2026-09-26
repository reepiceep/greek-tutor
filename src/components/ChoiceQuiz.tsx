import { type ReactNode, useEffect, useState } from 'react'
import { record } from '../lib/progress'
import { Celebration } from './Celebration'

export interface ChoiceOption {
  key: string
  label: ReactNode
  greek?: boolean
}

export interface ChoiceQuestion {
  /** Progress item id recorded on answering. */
  id: string
  prompt: ReactNode
  options: ChoiceOption[]
  answer: string
  /** Shown after answering, e.g. the rule behind the answer. */
  explain?: ReactNode
  /** One-line summary for the "review these" list. */
  review: ReactNode
  /** Skill area, for scoring a chapter test by area. */
  area?: string
}

export interface ChoiceResult {
  q: ChoiceQuestion
  correct: boolean
}

interface Props {
  questions: ChoiceQuestion[]
  onRestart: () => void
  /** "grid": two columns, row by row. "paradigm": two columns filled top to bottom, like singular/plural. */
  layout?: 'list' | 'grid' | 'paradigm'
  /** In a test, answers are not revealed until the end: picking moves straight on. */
  test?: boolean
  /** Called once, when the last question is answered (test) or left (practice). */
  onFinish?: (results: ChoiceResult[]) => void
}

const MILESTONES = [5, 10, 15, 20, 25, 30]

/** How many answers in a row are right, counting back from the latest. */
function trailingStreak(results: ChoiceResult[]): number {
  let n = 0
  for (let i = results.length - 1; i >= 0 && results[i].correct; i--) n++
  return n
}

function bestStreak(results: ChoiceResult[]): number {
  let best = 0
  let run = 0
  for (const r of results) {
    run = r.correct ? run + 1 : 0
    best = Math.max(best, run)
  }
  return best
}

/** Runs a list of multiple-choice questions: number keys pick, Enter moves on, results at the end. */
export function ChoiceQuiz({ questions, onRestart, layout = 'list', test, onFinish }: Props) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [results, setResults] = useState<ChoiceResult[]>([])
  const q = questions[index]

  const pick = (key: string) => {
    if (picked || !q) return
    const correct = key === q.answer
    record(q.id, correct)
    const all = [...results, { q, correct }]
    setResults(all)
    if (test) {
      setIndex((i) => i + 1)
      if (index === questions.length - 1) onFinish?.(all)
    } else setPicked(key)
  }

  const next = () => {
    setPicked(null)
    setIndex((i) => i + 1)
    if (index === questions.length - 1) onFinish?.(results)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !q) return
      if (e.key === 'Enter' && picked) {
        e.preventDefault()
        next()
      } else if (!picked && /^[1-9]$/.test(e.key)) {
        const o = q.options[Number(e.key) - 1]
        if (o) pick(o.key)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const streak = trailingStreak(results)

  if (!q) {
    const missed = results.filter((r) => !r.correct).map((r) => r.q)
    const perfect = results.length > 0 && missed.length === 0
    return (
      <div className="done">
        {perfect && !test && <Celebration />}
        {perfect && !test && <h3 className="perfect">Perfect round!</h3>}
        <div className="score">{results.length - missed.length} / {results.length}</div>
        {!perfect && bestStreak(results) >= 3 && <p className="muted">Best streak: {bestStreak(results)} in a row</p>}
        {missed.length > 0 && (
          <>
            <p>Review these:</p>
            <ul className="word-list">{missed.map((m) => <li key={m.id}>{m.review}</li>)}</ul>
          </>
        )}
        <button className="primary" onClick={onRestart}>Go again</button>
      </div>
    )
  }

  const correct = picked === q.answer

  return (
    <div>
      <div className="quiz-status">
        <span className="muted">{test ? 'Question ' : ''}{index + 1} of {questions.length}</span>
        {!test && results.length > 0 && (
          <span className="quiz-chips">
            <span className="chip">{results.filter((r) => r.correct).length} right</span>
            {streak >= 3 && <span className="chip streak" key={streak}>★ {streak} in a row</span>}
          </span>
        )}
      </div>
      <div className="progress-bar"><div style={{ width: `${(index / questions.length) * 100}%` }} /></div>
      <div className="prompt">{q.prompt}</div>
      <div className={`options ${layout}`}>
        {q.options.map((o, i) => {
          const state = picked && (o.key === q.answer ? 'right' : o.key === picked ? 'wrong' : '')
          return (
            <button key={o.key} className={`option ${o.greek ? 'greek' : ''} ${state || ''}`}
              disabled={!!picked} onClick={() => pick(o.key)}>
              <kbd>{i + 1}</kbd> {o.label}
              {state === 'right' && <span className="mark" aria-label="correct">✓</span>}
              {state === 'wrong' && <span className="mark" aria-label="wrong">✗</span>}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`}>
          <strong>{correct ? (MILESTONES.includes(streak) ? `Correct — ${streak} in a row!` : 'Correct') : 'Not quite'}</strong>
          {q.explain && <div className="explain">{q.explain}</div>}
          <div className="actions">
            <button className="primary" onClick={next}>Next <kbd>Enter</kbd></button>
          </div>
        </div>
      )}
    </div>
  )
}

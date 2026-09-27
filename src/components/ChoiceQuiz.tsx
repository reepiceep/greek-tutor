import { type ReactNode, useEffect, useState } from 'react'
import { record } from '../lib/progress'
import { Celebration } from './Celebration'
import { GreekInput } from './GreekInput'
import { DrillLayout, KeyHelp, MissedList, RoundProgress } from './SidePanel'

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
  /** Answer by typing instead of picking (the options are then empty and `answer` unused). */
  typed?: TypedAnswer
}

export interface TypedAnswer {
  /** Greek (with the Greek keyboard) or English. */
  greek: boolean
  check: (input: string) => boolean
}

export interface ChoiceResult {
  q: ChoiceQuestion
  correct: boolean
  /** What was typed, for a typed question. */
  given?: string
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
  /** More buttons for the results screen, beside "Go again". */
  doneActions?: ReactNode
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

/**
 * Runs a list of questions: number keys pick, Enter moves on, results at the end. A typed question is checked on
 * Enter and recorded on moving on, so "I was right" can overrule the checker first.
 */
export function ChoiceQuiz({ questions, onRestart, layout = 'list', test, onFinish, doneActions }: Props) {
  const [index, setIndex] = useState(0)
  // The option key picked, or for a typed question the text submitted.
  const [picked, setPicked] = useState<string | null>(null)
  const [input, setInput] = useState('')
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

  const submitTyped = () => {
    if (picked !== null || !input.trim()) return
    setPicked(input.trim())
  }

  const next = (overruled = false) => {
    let all = results
    if (q?.typed && picked !== null) {
      const correct = overruled || q.typed.check(picked)
      record(q.id, correct)
      all = [...results, { q, correct, given: picked }]
      setResults(all)
    }
    setPicked(null)
    setInput('')
    setIndex((i) => i + 1)
    if (index === questions.length - 1) onFinish?.(all)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !q) return
      if (e.key === 'Enter' && picked !== null) {
        e.preventDefault()
        next()
      } else if (picked === null && !q.typed && /^[1-9]$/.test(e.key)) {
        const o = q.options[Number(e.key) - 1]
        if (o) pick(o.key)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const streak = trailingStreak(results)

  if (!q) {
    const missed = results.filter((r) => !r.correct)
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
            <ul className="word-list">
              {missed.map((m, i) => (
                <li key={`${i}-${m.q.id}`}>{m.q.review}{m.given && <span className="muted"> (you: {m.given})</span>}</li>
              ))}
            </ul>
          </>
        )}
        <div className="actions">
          {doneActions}
          <button className="primary" onClick={onRestart}>Go again</button>
        </div>
      </div>
    )
  }

  const correct = picked !== null && (q.typed ? q.typed.check(picked) : picked === q.answer)
  // A typed answer isn't in the results until moving on; count it for the "in a row" message now.
  const shownStreak = q.typed && picked !== null ? (correct ? streak + 1 : 0) : streak
  const rightCount = results.filter((r) => r.correct).length
  const aside = (
    <>
      <RoundProgress
        marks={questions.map((_, i) => (i < results.length ? (test ? 'done' : results[i].correct ? 'right' : 'wrong') : 'todo'))}
        current={index}
        stats={test
          ? [[results.length, 'answered'], [questions.length - results.length, 'left']]
          : [[rightCount, 'right'], [results.length - rightCount, 'missed'], [questions.length - results.length, 'left']]} />
      {!test && streak >= 3 && <p className="side-streak" key={streak}>★ {streak} in a row</p>}
      {!test && <MissedList items={results.flatMap((r, i) => (r.correct ? [] : [{ key: `${i}-${r.q.id}`, node: r.q.review }]))} />}
      <KeyHelp keys={q.typed
        ? [[['Enter'], 'check, then next question']]
        : [
            [[`1–${Math.min(q.options.length, 9)}`], 'pick an answer'],
            ...(test ? [] : [[['Enter'], 'next question'] as [string[], string]]),
          ]} />
    </>
  )

  return (
    <DrillLayout aside={aside}>
      {/* On wide screens the side panel shows all this, so it hides (see .drill in index.css). */}
      <div className="quiz-status">
        <span className="muted">{test ? 'Question ' : ''}{index + 1} of {questions.length}</span>
        {!test && results.length > 0 && (
          <span className="quiz-chips">
            <span className="chip">{rightCount} right</span>
            {streak >= 3 && <span className="chip streak" key={streak}>★ {streak} in a row</span>}
          </span>
        )}
      </div>
      <div className="progress-bar"><div style={{ width: `${(index / questions.length) * 100}%` }} /></div>
      <div className="prompt">{q.prompt}</div>
      {q.typed ? (
        <>
          {q.typed.greek ? (
            <GreekInput key={index} value={input} onChange={setInput} onSubmit={submitTyped} disabled={picked !== null} autoFocus />
          ) : (
            <input className="text-answer" key={index} value={input} autoFocus disabled={picked !== null}
              placeholder="English meaning…" onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && picked === null) { e.preventDefault(); submitTyped() } }} />
          )}
          {picked === null && <div className="actions"><button className="primary" onClick={submitTyped}>Check</button></div>}
        </>
      ) : (
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
      )}
      {picked !== null && (
        <div className={`feedback ${correct ? 'good' : 'bad'}`}>
          <strong>{correct ? (MILESTONES.includes(shownStreak) ? `Correct — ${shownStreak} in a row!` : 'Correct') : 'Not quite'}</strong>
          {q.explain && <div className="explain">{q.explain}</div>}
          <div className="actions">
            {q.typed && !correct && <button onClick={() => next(true)}>I was right</button>}
            <button className="primary" onClick={() => next()}>Next <kbd>Enter</kbd></button>
          </div>
        </div>
      )}
    </DrillLayout>
  )
}

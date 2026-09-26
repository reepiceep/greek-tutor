import { type CSSProperties, useEffect, useState } from 'react'
import type { Chapter } from '../data/types'
import { READY_THRESHOLD, areaTier, buildChapterTest, formatTime, neededToPass, scoreTest, testAreas } from '../lib/chapterTest'
import { saveTestResult, type TestResult } from '../lib/progress'
import { ChoiceQuiz, type ChoiceQuestion, type ChoiceResult } from './ChoiceQuiz'
import { Celebration } from './Celebration'

type Phase =
  | { name: 'intro' }
  | { name: 'running'; questions: ChoiceQuestion[]; startedAt: number }
  | { name: 'done'; result: TestResult; results: ChoiceResult[] }

export function ChapterTest({ chapter }: { chapter: Chapter }) {
  const [phase, setPhase] = useState<Phase>({ name: 'intro' })

  const start = () => setPhase({ name: 'running', questions: buildChapterTest(chapter), startedAt: Date.now() })

  const finish = (startedAt: number) => (results: ChoiceResult[]) => {
    const result = scoreTest(chapter, results, Math.round((Date.now() - startedAt) / 1000))
    saveTestResult(result)
    setPhase({ name: 'done', result, results })
  }

  if (phase.name === 'intro') {
    return (
      <section>
        <h2>Chapter {chapter.number} test</h2>
        <p>{testAreas(chapter.number).reduce((n, a) => n + a.count, 0)} mixed questions covering everything in the chapter:</p>
        <ul>
          {testAreas(chapter.number).map((a) => <li key={a.name}><strong>{a.name}</strong> ({a.count}): {a.covers}</li>)}
        </ul>
        <p>
          Answers aren’t shown until the end. You’re <strong>ready for the next chapter</strong> when you score at
          least {READY_THRESHOLD * 100}% in every area. The clock is just for your information.
        </p>
        <button className="primary" onClick={start}>Start the test</button>
      </section>
    )
  }

  if (phase.name === 'running') {
    return (
      <section>
        <div className="toolbar">
          <h2>Chapter {chapter.number} test</h2>
          <Clock startedAt={phase.startedAt} />
        </div>
        <ChoiceQuiz test questions={phase.questions} onRestart={start} onFinish={finish(phase.startedAt)} />
      </section>
    )
  }

  const { result, results } = phase
  const missed = results.filter((r) => !r.correct)
  return (
    <section>
      <h2>Chapter {chapter.number} test</h2>
      {result.ready && <Celebration />}
      <div className={`verdict ${result.ready ? 'good' : 'bad'}`}>
        <div className="score">{result.correct} / {result.total}</div>
        <div>
          <strong>{result.ready ? 'Ready for the next chapter' : 'Not ready yet'}</strong>
          <div className="muted">Time {formatTime(result.seconds)}</div>
        </div>
      </div>

      <AreaBars result={result} />

      {missed.length > 0 && (
        <>
          <h3>Review what you missed</h3>
          <ul className="missed">
            {missed.map(({ q }, i) => (
              <li key={`${q.id}-${i}`}>
                <div>{q.review}</div>
                {q.explain && <div className="muted small-explain">{q.explain}</div>}
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="actions">
        <button className="primary" onClick={start}>Take another test</button>
      </div>
    </section>
  )
}

/** Score per area with the readiness line marked. */
export function AreaBars({ result }: { result: TestResult }) {
  return (
    <div className="skills">
      {testAreas(result.chapter).map((a) => a.name).filter((a) => result.areas[a]).map((a) => {
        const { correct, total } = result.areas[a]
        const pct = Math.round((correct / total) * 100)
        const tier = areaTier(correct, total)
        const need = neededToPass(correct, total)
        const hint = need ? `${need} more right answer${need > 1 ? 's' : ''} needed for ${READY_THRESHOLD * 100}%` : 'Passed'
        return (
          <div key={a} className={`skill static tier-${tier}`} title={hint}>
            <span>{a} <span className="muted">{correct}/{total}</span></span>
            <span className="meter threshold" style={{ '--threshold': `${READY_THRESHOLD * 100}%` } as CSSProperties}>
              <span className={tier} style={{ width: `${pct}%` }} />
            </span>
            <span className="pct">{pct}%</span>
          </div>
        )
      })}
    </div>
  )
}

function Clock({ startedAt }: { startedAt: number }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  return <span className="clock">{formatTime(Math.round((now - startedAt) / 1000))}</span>
}

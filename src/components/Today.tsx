import { useState } from 'react'
import type { Chapter } from '../data/types'
import { currentStreak, markReviewDone, useProgress } from '../lib/progress'
import { reviewPlan, reviewQuestions, whenDue } from '../lib/review'
import { ChoiceQuiz, type ChoiceQuestion } from './ChoiceQuiz'
import { refreshNow, useNow } from '../lib/useNow'

/** The daily review across all chapters. Finishing a session counts the day toward the streak. */
export function Today({ chapter }: { chapter: Chapter }) {
  const { items, daily } = useProgress()
  const [session, setSession] = useState<{ questions: ChoiceQuestion[]; round: number } | null>(null)
  const [finished, setFinished] = useState(false)
  const now = useNow()
  const plan = reviewPlan(items, now, chapter)
  const streak = currentStreak(daily, now)

  const start = () => {
    setFinished(false)
    refreshNow()
    setSession((s) => ({ questions: reviewQuestions(reviewPlan(items, Date.now(), chapter)), round: (s?.round ?? 0) + 1 }))
  }

  if (session) {
    return (
      <section>
        <div className="toolbar">
          <h2>Today’s review</h2>
          {streak > 0 && <span className="chip streak">★ {streak}-day streak</span>}
        </div>
        {finished && (
          <p className="streak-banner">
            {streak > 1 ? <>Day <strong>{streak}</strong> in a row. See you tomorrow!</> : <>Review done for today. Come back tomorrow to start a streak.</>}
          </p>
        )}
        <ChoiceQuiz
          key={session.round}
          questions={session.questions}
          onRestart={start}
          onFinish={() => { markReviewDone(Date.now()); refreshNow(); setFinished(true) }}
        />
      </section>
    )
  }

  const count = plan.due.length + plan.fresh.length
  return (
    <section>
      <h2>Today’s review</h2>
      <div className="today-summary">
        <div className="today-stat"><strong>{plan.totalDue}</strong><span>due</span></div>
        <div className="today-stat"><strong>{plan.fresh.length}</strong><span>new</span></div>
        <div className="today-stat"><strong>{streak}</strong><span>day streak{daily.best > 1 && ` · best ${daily.best}`}</span></div>
      </div>
      {count > 0 ? (
        <>
          <p className="muted">
            {plan.totalDue > plan.due.length
              ? `${plan.due.length} of the ${plan.totalDue} due items this session; run another for the rest.`
              : 'Items you’ve learned come back just before you’d forget them: 1 day, 3, 7, 16, 35, then 90 days. A miss brings one back at once.'}
            {plan.fresh.length > 0 && ` Plus ${plan.fresh.length} new from chapter ${chapter.number}.`}
          </p>
          <button className="primary" onClick={start}>Start ({count} questions)</button>
        </>
      ) : (
        <p className="caught-up">
          All caught up!{plan.nextDue && <> The next review is due {whenDue(plan.nextDue, now)}.</>}
          {' '}Practise any drill to add more to your reviews.
        </p>
      )}
    </section>
  )
}

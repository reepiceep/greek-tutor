import { type ReactNode, useEffect, useState } from 'react'
import { markLessonSeen, useProgress } from '../lib/progress'

interface Props {
  /** Shown in the summary line; also identifies the lesson for "seen" tracking. */
  title: string
  children: ReactNode
  /** Open on the first visit (default). False keeps it collapsed until clicked. */
  firstVisitOpen?: boolean
}

/** A collapsible lesson: open the first time you see it, collapsed after that so the quiz sits higher. */
export function Lesson({ title, children, firstVisitOpen = true }: Props) {
  const { settings } = useProgress()
  const [open] = useState(() => firstVisitOpen && !(settings.seenLessons ?? []).includes(title))

  useEffect(() => markLessonSeen(title), [title])

  return (
    <details className="lesson" open={open}>
      <summary>
        {title}
        <span className="lesson-hint">review</span>
      </summary>
      {children}
    </details>
  )
}

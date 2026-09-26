import { useEffect, useRef } from 'react'
import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import { learnedFraction, updateSettings, useProgress } from '../lib/progress'
import { chapterSkills } from '../lib/skills'

/** The built chapters as a path through the book: progress per chapter, ✓ once its test is passed. */
export function CourseMap({ current }: { current: Chapter }) {
  const { items, tests } = useProgress()
  const ref = useRef<HTMLElement>(null)

  // With more chapters than fit, scroll sideways so the current one is in view (without moving the page).
  useEffect(() => {
    const map = ref.current
    const stop = map?.querySelector<HTMLElement>('.stop.current')
    if (!map || !stop) return
    const left = stop.getBoundingClientRect().left - map.getBoundingClientRect().left + map.scrollLeft
    if (left < map.scrollLeft || left + stop.offsetWidth > map.scrollLeft + map.clientWidth) {
      map.scrollLeft = left - (map.clientWidth - stop.offsetWidth) / 2
    }
  }, [current.number])

  return (
    <nav className="course-map" aria-label="Chapters" ref={ref}>
      <ol>
        {CHAPTERS.map((ch) => {
          const ids = chapterSkills(ch).flatMap((s) => s.items.map((i) => i.id))
          const started = ids.some((id) => items[id])
          const pct = Math.round(learnedFraction(ids, items) * 100)
          const latest = tests.filter((t) => t.chapter === ch.number).at(-1)
          const ready = !!latest?.ready
          const state = ch.number === current.number ? 'current' : ready ? 'ready' : started ? 'started' : 'new'
          const status = ready ? 'test passed' : started ? `${pct}% learned` : 'not started'
          return (
            <li key={ch.number} className={`stop ${state}`}>
              <button
                type="button"
                onClick={() => updateSettings({ chapter: ch.number })}
                aria-current={ch.number === current.number ? 'step' : undefined}
                title={`Chapter ${ch.number}: ${ch.title} · ${status}`}
              >
                <span className="stop-num">{ready ? '✓' : ch.number}</span>
                <span className="stop-title">{ch.short}</span>
                <span className="stop-meter" aria-hidden="true"><span style={{ width: `${ready ? 100 : pct}%` }} /></span>
                <span className="stop-status">{ready ? 'passed' : started ? `${pct}%` : '—'}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

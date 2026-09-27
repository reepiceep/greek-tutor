import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import { learnedFraction, updateSettings, useProgress } from '../lib/progress'
import { chapterSkills } from '../lib/skills'

/** The parts of Mounce's book, for grouping the chapters. */
const PARTS = [
  { title: 'Introduction and nouns', from: 1, to: 14 },
  { title: 'Indicative verbs', from: 15, to: 25 },
  { title: 'Participles', from: 26, to: 30 },
  { title: 'Non-indicative verbs', from: 31, to: 36 },
]

/**
 * The built chapters, grouped by part of the book: progress per chapter, ✓ once its test is passed. Each part wraps onto
 * as many rows as it needs, so every chapter is in view without scrolling sideways.
 */
export function CourseMap({ current }: { current: Chapter }) {
  const { items, tests } = useProgress()
  const parts = PARTS.map((p) => ({ ...p, chapters: CHAPTERS.filter((c) => c.number >= p.from && c.number <= p.to) })).filter((p) => p.chapters.length)

  return (
    <nav className="course-map" aria-label="Chapters">
      {parts.map((part) => (
        <section key={part.title} className="course-part">
          <h3>{part.title} <span className="muted">ch. {part.chapters[0].number}–{part.chapters.at(-1)!.number}</span></h3>
          <ol>
            {part.chapters.map((ch) => {
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
                    aria-label={`Chapter ${ch.number}: ${ch.title}, ${status}`}
                  >
                    <span className="stop-num">{ready ? '✓' : ch.number}</span>
                    {/* Allow a line break after a slash (Middle/passive). */}
                    <span className="stop-title">{ch.short.replace('/', '/\u200b')}</span>
                    <span className="stop-meter" aria-hidden="true"><span style={{ width: `${ready ? 100 : pct}%` }} /></span>
                    <span className="stop-status">{ready ? 'passed' : started ? `${pct}%` : '—'}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </nav>
  )
}

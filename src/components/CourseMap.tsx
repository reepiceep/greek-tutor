import { useEffect, useId, useState } from 'react'
import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import { type ItemStats, type TestResult, learnedFraction, updateSettings, useProgress } from '../lib/progress'
import { chapterSkills } from '../lib/skills'

/** The parts of Mounce's book, for grouping the chapters. */
const PARTS = [
  { title: 'Introduction and nouns', from: 1, to: 14 },
  { title: 'Indicative verbs', from: 15, to: 25 },
  { title: 'Participles', from: 26, to: 30 },
  { title: 'Non-indicative verbs', from: 31, to: 36 },
]

type Part = (typeof PARTS)[number]
type State = 'current' | 'ready' | 'started' | 'new'

const partOf = (ch: Chapter) => PARTS.find((p) => ch.number >= p.from && ch.number <= p.to)!.title

// Which parts are open is a per-browser convenience; without storage the map still works, with the current part open.
const OPEN_KEY = 'greek-tutor:course-map-open'

function loadOpen(): string[] | null {
  try {
    const raw = localStorage.getItem(OPEN_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : null
  } catch {
    return null
  }
}

function saveOpen(open: Set<string>) {
  try {
    localStorage.setItem(OPEN_KEY, JSON.stringify([...open]))
  } catch {
    // Storage blocked or full: the choice just isn't remembered.
  }
}

function chapterStatus(ch: Chapter, current: Chapter, items: Record<string, ItemStats>, tests: TestResult[]) {
  const ids = chapterSkills(ch).flatMap((s) => s.items.map((i) => i.id))
  const started = ids.some((id) => items[id])
  const pct = Math.round(learnedFraction(ids, items) * 100)
  const ready = !!tests.filter((t) => t.chapter === ch.number).at(-1)?.ready
  const state: State = ch.number === current.number ? 'current' : ready ? 'ready' : started ? 'started' : 'new'
  return { ch, started, pct, ready, state, status: ready ? 'test passed' : started ? `${pct}% learned` : 'not started' }
}

type Status = ReturnType<typeof chapterStatus>

/**
 * The built chapters, grouped by part of the book: progress per chapter, ✓ once its test is passed. Each part can be
 * collapsed to one line (with a pip per chapter); the current chapter's part opens by default.
 */
export function CourseMap({ current, onPick, className = '' }: { current: Chapter; onPick?: () => void; className?: string }) {
  const { items, tests } = useProgress()
  const parts = PARTS
    .map((p) => ({ ...p, chapters: CHAPTERS.filter((c) => c.number >= p.from && c.number <= p.to).map((c) => chapterStatus(c, current, items, tests)) }))
    .filter((p) => p.chapters.length)
  // The current chapter's part is always open when the map appears (it lives in the chapter sheet, which opens afresh
  // each time); the others are as the viewer left them.
  const [open, setOpen] = useState<Set<string>>(() => new Set([...(loadOpen() ?? []), partOf(current)]))
  useEffect(() => saveOpen(open), [open])

  const toggle = (title: string) => setOpen((o) => {
    const next = new Set(o)
    if (!next.delete(title)) next.add(title)
    return next
  })
  const allOpen = parts.every((p) => open.has(p.title))

  return (
    <nav className={`course-map ${className}`.trim()} aria-label="Chapters">
      <div className="course-map-head">
        <h2>Chapters</h2>
        <button type="button" className="link" onClick={() => setOpen(allOpen ? new Set() : new Set(parts.map((p) => p.title)))}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      {parts.map((part) => (
        <CoursePart key={part.title} part={part} chapters={part.chapters} open={open.has(part.title)} onToggle={() => toggle(part.title)} onPick={onPick} />
      ))}
    </nav>
  )
}

function CoursePart({ part, chapters, open, onToggle, onPick }: {
  part: Part; chapters: Status[]; open: boolean; onToggle: () => void; onPick?: () => void
}) {
  const bodyId = useId()
  const passed = chapters.filter((c) => c.ready).length
  const pct = Math.round(chapters.reduce((sum, c) => sum + (c.ready ? 100 : c.pct), 0) / chapters.length)
  const hasCurrent = chapters.some((c) => c.state === 'current')
  const range = `ch. ${chapters[0].ch.number}–${chapters.at(-1)!.ch.number}`

  return (
    <section className={`course-part${open ? ' open' : ''}${hasCurrent ? ' has-current' : ''}`}>
      <button type="button" className="part-head" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        <svg className="part-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
        <span className="part-title">{part.title}</span>
        <span className="part-range">{range}</span>
        <span className="part-pips" aria-hidden="true">
          {chapters.map((c) => <span key={c.ch.number} className={`pip ${c.state}`} title={`Chapter ${c.ch.number}`} />)}
        </span>
        <span className="part-summary">{passed} of {chapters.length} passed</span>
        <span className="part-meter" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
      </button>
      <div className="part-body" id={bodyId} inert={!open} aria-hidden={!open}>
        <ol>
          {chapters.map(({ ch, pct: chPct, ready, started, state, status }) => (
            <li key={ch.number} className={`stop ${state}`}>
              <button
                type="button"
                onClick={() => { updateSettings({ chapter: ch.number }); onPick?.() }}
                aria-current={state === 'current' ? 'step' : undefined}
                title={`Chapter ${ch.number}: ${ch.title} · ${status}`}
                aria-label={`Chapter ${ch.number}: ${ch.title}, ${status}`}
              >
                <span className="stop-num">{ready ? '✓' : ch.number}</span>
                {/* Allow a line break after a slash (Middle/passive). */}
                <span className="stop-title">{ch.short.replace('/', '/​')}</span>
                <span className="stop-meter" aria-hidden="true"><span style={{ width: `${ready ? 100 : chPct}%` }} /></span>
                <span className="stop-status">{ready ? 'passed' : started ? `${chPct}%` : '—'}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

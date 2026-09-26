import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import type { Range } from '../lib/vocabQuiz'

/** From / to chapter pickers, with shortcuts for this chapter and every chapter. */
export function ChapterRange({ chapter, range, onChange }: { chapter: Chapter; range: Range; onChange: (r: Range) => void }) {
  const first = CHAPTERS[0].number
  const last = CHAPTERS.at(-1)!.number
  const single = range[0] === range[1]
  return (
    <div className="range-pick">
      <select value={range[0]} aria-label="From chapter" onChange={(e) => {
        const from = Number(e.target.value)
        onChange([from, Math.max(from, range[1])])
      }}>
        {CHAPTERS.map((c) => <option key={c.number} value={c.number}>Ch {c.number}</option>)}
      </select>
      <span className="muted">to</span>
      <select value={range[1]} aria-label="To chapter" onChange={(e) => {
        const to = Number(e.target.value)
        onChange([Math.min(range[0], to), to])
      }}>
        {CHAPTERS.map((c) => <option key={c.number} value={c.number}>Ch {c.number}</option>)}
      </select>
      <div className="seg">
        <button className={single && range[0] === chapter.number ? 'on' : ''} onClick={() => onChange([chapter.number, chapter.number])}>This chapter</button>
        <button className={range[0] === first && range[1] === last ? 'on' : ''} onClick={() => onChange([first, last])}>All ({first}–{last})</button>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import type { Chapter } from '../data/types'
import { CourseMap } from './CourseMap'

/**
 * The chapter picker: the course map in a panel over the page (a sheet from the bottom on phones). Picking a chapter,
 * Escape, the close button or a click outside all close it; focus goes back to the button that opened it.
 */
export function ChapterSheet({ current, onClose }: { current: Chapter; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    // The page behind shouldn't scroll along with the sheet.
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sheet-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={panel} className="sheet" role="dialog" aria-modal="true" aria-label="Choose a chapter" tabIndex={-1}>
        <div className="sheet-head">
          <span className="sheet-grip" aria-hidden="true" />
          <button type="button" className="sheet-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <CourseMap current={current} onPick={onClose} />
      </div>
    </div>
  )
}

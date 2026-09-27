import { useEffect, useRef } from 'react'
import type { Chapter } from '../data/types'
import { CourseMap } from './CourseMap'

/**
 * The chapter picker: the course map in a panel over the page (a sheet from the bottom on phones). Picking a chapter,
 * Escape, the close button or a click outside all close it; focus goes back to the button that opened it.
 */
// Everything Tab can reach inside the sheet (a collapsed part of the map is inert, so its chapters aren't included).
const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Tab and Shift+Tab wrap around inside the sheet instead of escaping to the page behind it. */
function keepFocusIn(panel: HTMLElement | null, e: KeyboardEvent) {
  if (!panel) return
  const all = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.closest('[inert]'))
  if (!all.length) return
  const first = all[0]
  const last = all[all.length - 1]
  const at = document.activeElement
  if (e.shiftKey && (at === first || at === panel)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (at === last || !panel.contains(at))) {
    e.preventDefault()
    first.focus()
  }
}

export function ChapterSheet({ current, onClose }: { current: Chapter; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    panel.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'Tab') keepFocusIn(panel.current, e)
    }
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

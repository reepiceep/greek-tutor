import { type RefObject, useEffect, useState } from 'react'

/**
 * The header is sticky with a negative top: the brand row scrolls away and the nav stays pinned. Returns that top:
 * the nav's distance from the header's top, measured (and re-measured whenever the header resizes) rather than guessed.
 */
export function useStickyNavTop(header: RefObject<HTMLElement | null>, nav: RefObject<HTMLElement | null>) {
  const [top, setTop] = useState(0)
  useEffect(() => {
    const h = header.current
    const n = nav.current
    if (!h || !n || typeof ResizeObserver === 'undefined') return
    // A ResizeObserver reports once as soon as it starts observing, so this also takes the first measurement.
    const ro = new ResizeObserver(() => setTop(-n.offsetTop))
    ro.observe(h)
    return () => ro.disconnect()
  }, [header, nav])
  return top
}

/** Keep a row that scrolls sideways (the nav, a screen's tabs) showing the tab just chosen. */
export function useTabsFollowSelection() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const tab = (e.target as Element | null)?.closest?.('header nav button, .toolbar .seg button')
      tab?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

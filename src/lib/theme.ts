import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const QUERY = '(prefers-color-scheme: dark)'
const media = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(QUERY) : null)

/** The system's light/dark setting, updating live if it changes. */
export function useSystemTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const m = media()
      m?.addEventListener('change', onChange)
      return () => m?.removeEventListener('change', onChange)
    },
    () => (media()?.matches ? 'dark' : 'light'),
    () => 'light',
  )
}

/** Put the chosen theme on <html>, or remove it so the CSS follows the system setting. */
export function applyTheme(choice: Theme | undefined) {
  const root = document.documentElement
  if (choice) root.dataset.theme = choice
  else delete root.dataset.theme
}

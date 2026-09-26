import { updateSettings, useProgress } from '../lib/progress'
import { useSystemTheme } from '../lib/theme'

const NAMES = { light: 'Manuscript (light)', dark: 'Aegean (dark)' } as const

/** Switches between the light Manuscript and dark Aegean themes. Shows the icon of the theme it switches to. */
export function ThemeToggle() {
  const { settings } = useProgress()
  const system = useSystemTheme()
  const current = settings.theme ?? system
  const next = current === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${NAMES[next]}`

  return (
    <button type="button" className="theme-toggle" onClick={() => updateSettings({ theme: next })} title={label} aria-label={label}>
      {next === 'dark' ? (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" fill="none" />
        </svg>
      )}
    </button>
  )
}

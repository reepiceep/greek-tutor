import { useEffect, useState } from 'react'
import { exportProgress, updateSettings } from './progress'

// Progress lives only in this browser's storage, which a browser may clear: Safari deletes a site's data after 7 days
// of use without a visit (apps added to the Home Screen are exempt). Hence backups, and asking to keep storage.

const DAY = 24 * 60 * 60 * 1000
/** How long a backup counts as recent, and how long "Not now" hides the reminder. */
export const BACKUP_INTERVAL = 14 * DAY

/** Download all progress as a JSON file, and remember when. */
export function downloadBackup() {
  const blob = new Blob([exportProgress()], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `greek-tutor-progress-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(a.href)
  updateSettings({ lastBackup: Date.now() })
}

/**
 * Ask the browser not to clear this site's storage. Chrome and Safari decide without asking the user; Firefox asks, so
 * this is called from a button (or in the installed app, where Chrome grants it quietly).
 */
export async function requestPersistence(): Promise<boolean> {
  try {
    return (await navigator.storage?.persist?.()) ?? false
  } catch {
    return false
  }
}

/** Whether the browser has promised to keep this site's storage; undefined until known (or where unsupported). */
export function usePersisted(): boolean | undefined {
  const [persisted, setPersisted] = useState<boolean>()
  useEffect(() => {
    let live = true
    navigator.storage?.persisted?.().then((p) => { if (live) setPersisted(p) }, () => {})
    return () => { live = false }
  }, [])
  return persisted
}

/** Running as an installed app (from the Home Screen or an app window), not in a browser tab. */
export function isInstalled(): boolean {
  return window.matchMedia?.('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true
}

/** An iPhone or iPad browser tab, where Safari's 7-day rule applies and Add to Home Screen avoids it. */
export function isIosTab(): boolean {
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  return ios && !isInstalled()
}

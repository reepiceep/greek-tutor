import { useSyncExternalStore } from 'react'

// The service worker (pwa/sw.js) makes the app installable and usable offline. A new version installs in the
// background and waits; the page offers to switch to it (UpdateBanner) rather than swapping files mid-session.

let waiting: ServiceWorker | null = null
const listeners = new Set<() => void>()

function setWaiting(worker: ServiceWorker | null) {
  waiting = worker
  listeners.forEach((l) => l())
}

/** True once a new version is downloaded and ready to use. */
export function useUpdateReady(): boolean {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l) },
    () => waiting !== null,
    () => false,
  )
}

let applying = false

/** Switch to the waiting version; the page reloads once it has taken over. */
export function applyUpdate() {
  if (!waiting) return
  applying = true
  waiting.postMessage('skip-waiting')
}

export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  window.addEventListener('load', async () => {
    let registration: ServiceWorkerRegistration
    try {
      registration = await navigator.serviceWorker.register('/sw.js')
    } catch {
      return // No offline support (a private window, say); the app works as a normal page.
    }
    // A worker that installs while another controls the page is an update; the very first install isn't.
    const watch = (worker: ServiceWorker | null) => worker?.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) setWaiting(worker)
    })
    if (registration.waiting && navigator.serviceWorker.controller) setWaiting(registration.waiting)
    watch(registration.installing)
    registration.addEventListener('updatefound', () => watch(registration.installing))
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (applying) window.location.reload()
    })
    // An installed app can stay open for days: look for a new version whenever it comes back to the front.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') registration.update().catch(() => {})
    })
  })
}

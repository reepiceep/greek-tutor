import { useSyncExternalStore } from 'react'

// A shared clock for render code that depends on the time (what's due, streaks). Ticks once a minute.

let now = Date.now()
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | undefined

function subscribe(l: () => void) {
  listeners.add(l)
  if (!timer) {
    timer = setInterval(() => {
      now = Date.now()
      listeners.forEach((f) => f())
    }, 60_000)
  }
  return () => {
    listeners.delete(l)
    if (!listeners.size && timer) {
      clearInterval(timer)
      timer = undefined
    }
  }
}

/** The current time, refreshed every minute (and whenever something calls `refreshNow`). */
export function useNow(): number {
  return useSyncExternalStore(subscribe, () => now, () => now)
}

/** Bring the shared clock up to date immediately, e.g. after finishing a review. */
export function refreshNow() {
  now = Date.now()
  listeners.forEach((f) => f())
}

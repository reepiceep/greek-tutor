import { useSyncExternalStore } from 'react'
import type { PartOfSpeech } from '../data/types'

// Per-item progress using Leitner boxes (1 = new/missed … 7 = long-term).
// A correct answer moves an item up a box; a miss sends it back to box 1.
// Each box has a review interval, so the daily review can ask what is due (spaced repetition).

export const MAX_BOX = 7

const DAY_MS = 24 * 60 * 60 * 1000
/** Days until an item in each box is due again (index = box). Box 1 (new or just missed) is due at once. */
export const INTERVAL_DAYS = [0, 0, 1, 3, 7, 16, 35, 90]

/** When an item is next due for review. */
export const dueAt = (s: ItemStats) => s.lastSeen + INTERVAL_DAYS[s.box] * DAY_MS
export const isDue = (s: ItemStats, now: number) => dueAt(s) <= now
/** Items at or above this box count as "learned". */
export const LEARNED_BOX = 3

export interface ItemStats {
  box: number
  attempts: number
  correct: number
  lastSeen: number
}

export interface Settings {
  requireAccents: boolean
  /** Which recording to play: Mounce's Erasmian pronunciation or modern Greek. */
  pronunciation: 'mounce' | 'modern'
  /** Play a word's recording as soon as its Greek appears (on by default). */
  autoplay: boolean
  /** Flashcards: one card per preposition + case instead of one per preposition. */
  splitPrepositions?: boolean
  /** Flashcards: only these parts of speech; empty or unset means every word. */
  flashcardTypes?: PartOfSpeech[]
  /** Set once the user changes autoplay themselves, so the default can change without overriding their choice. */
  autoplayChosen?: boolean
  /** Color theme chosen with the header toggle; unset means follow the system setting. */
  theme?: 'light' | 'dark'
  /** Lessons already shown once; they start collapsed after that. */
  seenLessons?: string[]
  /** Chapter being studied; the latest built chapter when unset. */
  chapter?: number
  /** When progress was last exported (ms since epoch), for the backup reminder. */
  lastBackup?: number
  /** The backup reminder stays hidden until this time ("Not now"). */
  backupSnoozedUntil?: number
}

export interface AreaScore {
  correct: number
  total: number
}

export interface TestResult {
  chapter: number
  date: number
  seconds: number
  correct: number
  total: number
  areas: Record<string, AreaScore>
  ready: boolean
}

interface State {
  items: Record<string, ItemStats>
  settings: Settings
  tests: TestResult[]
  /** Best game results, e.g. { "prep-speed": 23, "prep-match-memory": 41 }. */
  bests: Record<string, number>
  daily: DailyStreak
}

/** Days in a row with a finished daily review. */
export interface DailyStreak {
  /** Local date of the last finished review, "YYYY-MM-DD". */
  lastDay?: string
  streak: number
  best: number
}

const KEY = 'greek-tutor:v1'
const EMPTY: State = { items: {}, settings: { requireAccents: false, pronunciation: 'mounce', autoplay: true }, tests: [], bests: {}, daily: { streak: 0, best: 0 } }
const MAX_TESTS = 50

function isItemStats(v: unknown): v is ItemStats {
  const s = v as ItemStats
  return typeof s === 'object' && s !== null &&
    [s.box, s.attempts, s.correct, s.lastSeen].every((n) => typeof n === 'number' && Number.isFinite(n)) &&
    s.box >= 1 && s.box <= MAX_BOX
}

/** Validate and fill defaults for stored or imported state. Throws if it is not progress data. */
function normalize(raw: unknown): State {
  const parsed = raw as Partial<State>
  if (typeof parsed !== 'object' || parsed === null || typeof parsed.items !== 'object' || parsed.items === null) {
    throw new Error('This file does not contain Greek Tutor progress.')
  }
  const bad = Object.entries(parsed.items).find(([, v]) => !isItemStats(v))
  if (bad) throw new Error(`Progress entry "${bad[0]}" is malformed.`)
  return {
    items: parsed.items,
    settings: withAutoplayDefault({ ...EMPTY.settings, ...parsed.settings }),
    tests: Array.isArray(parsed.tests) ? parsed.tests : [],
    bests: typeof parsed.bests === 'object' && parsed.bests !== null ? parsed.bests : {},
    daily: { ...EMPTY.daily, ...parsed.daily },
  }
}

/** Autoplay became on-by-default; keep an explicit choice, otherwise use the new default. */
function withAutoplayDefault(s: Settings): Settings {
  return s.autoplayChosen ? s : { ...s, autoplay: true }
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? normalize(JSON.parse(raw)) : EMPTY
  } catch {
    return EMPTY
  }
}

let state = load()
const listeners = new Set<() => void>()

function commit(next: State) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable (private window etc.) — progress lasts for this tab only.
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useProgress(): State {
  return useSyncExternalStore(subscribe, () => state)
}

export function stats(id: string): ItemStats {
  return state.items[id] ?? { box: 1, attempts: 0, correct: 0, lastSeen: 0 }
}

export function record(id: string, wasCorrect: boolean) {
  const s = stats(id)
  commit({
    ...state,
    items: {
      ...state.items,
      [id]: {
        box: wasCorrect ? Math.min(s.box + 1, MAX_BOX) : 1,
        attempts: s.attempts + 1,
        correct: s.correct + (wasCorrect ? 1 : 0),
        lastSeen: Date.now(),
      },
    },
  })
}

export function updateSettings(patch: Partial<Settings>) {
  commit({ ...state, settings: { ...state.settings, ...patch } })
}

/** Remember that a lesson has been shown (idempotent). */
export function markLessonSeen(id: string) {
  const seen = state.settings.seenLessons ?? []
  if (!seen.includes(id)) commit({ ...state, settings: { ...state.settings, seenLessons: [...seen, id] } })
}

export function resetProgress() {
  commit({ ...state, items: {}, tests: [], bests: {}, daily: { streak: 0, best: 0 } })
}

/** Local calendar date, "YYYY-MM-DD". */
export function localDay(t: number): string {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** The local date of the day before, by the calendar (safe across daylight-saving changes). */
function previousDay(t: number): string {
  const d = new Date(t)
  d.setDate(d.getDate() - 1)
  return localDay(d.getTime())
}

/** Count today as a review day: extends the streak if yesterday was one, otherwise starts again at 1. */
export function markReviewDone(now: number) {
  const d = state.daily
  const today = localDay(now)
  if (d.lastDay === today) return
  const streak = d.lastDay === previousDay(now) ? d.streak + 1 : 1
  commit({ ...state, daily: { lastDay: today, streak, best: Math.max(d.best, streak) } })
}

/** The streak as it stands now: kept if you reviewed today or yesterday, otherwise 0. */
export function currentStreak(d: DailyStreak, now: number): number {
  return d.lastDay === localDay(now) || d.lastDay === previousDay(now) ? d.streak : 0
}

/** Record a game result; returns true if it beats the saved best (lower is better for times). */
export function saveBest(key: string, value: number, lowerIsBetter = false): boolean {
  const old = state.bests[key]
  const better = old === undefined || (lowerIsBetter ? value < old : value > old)
  if (better) commit({ ...state, bests: { ...state.bests, [key]: value } })
  return better
}

export function saveTestResult(result: TestResult) {
  commit({ ...state, tests: [...state.tests, result].slice(-MAX_TESTS) })
}

export function exportProgress(): string {
  return JSON.stringify({ app: 'greek-tutor', exportedAt: new Date().toISOString(), ...state }, null, 2)
}

/** Replace all progress with an exported file's contents. Throws with a readable message if the file is invalid. */
export function importProgress(json: string) {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('This file is not valid JSON.')
  }
  commit(normalize(parsed))
}

export function shuffle<T>(xs: T[]): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Choose `n` items, favouring low boxes and items not seen recently, then shuffle. */
export function pickWeakest<T>(items: T[], idOf: (t: T) => string, n: number): T[] {
  return shuffle(rankWeakest(items, idOf).slice(0, n))
}

/** Every item, least known first (lowest box, then longest unseen); items that tie come in random order. */
export function rankWeakest<T>(items: T[], idOf: (t: T) => string): T[] {
  return shuffle(items).sort((a, b) => {
    const sa = stats(idOf(a))
    const sb = stats(idOf(b))
    return sa.box - sb.box || sa.lastSeen - sb.lastSeen
  })
}

/** Fraction (0–1) of the given ids that are learned. */
export function learnedFraction(ids: string[], items: Record<string, ItemStats>): number {
  if (ids.length === 0) return 0
  return ids.filter((id) => (items[id]?.box ?? 1) >= LEARNED_BOX).length / ids.length
}

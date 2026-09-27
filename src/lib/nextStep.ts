import type { View } from '../App'
import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import { hasTest } from './chapterTest'
import { type ItemStats, type TestResult, learnedFraction } from './progress'
import { chapterSkills } from './skills'
import { practiceCards } from './views'

/** A skill counts as done enough to move on once this much of it is learned; the test checks the rest. */
const GOOD_ENOUGH = 0.8

export interface NextStep {
  label: string
  detail: string
  /** Where the button goes: a screen in this chapter, or another chapter. */
  view?: View
  chapter?: number
}

/**
 * The one thing to do next in this chapter: what's due for review first, then the first skill (in book order) that
 * isn't mostly learned, then the chapter test, then the next chapter.
 */
export function nextStep(
  chapter: Chapter, items: Record<string, ItemStats>, tests: TestResult[], due: number,
): NextStep {
  if (due > 0) return { label: 'Review what’s due', detail: `${due} ${due === 1 ? 'item is' : 'items are'} due for review`, view: 'today' }

  const cards = practiceCards(chapter)
  const title = (v: View) => cards.find((c) => c.view === v)?.title ?? 'Practice'
  const skills = chapterSkills(chapter)
  const started = skills.some((s) => s.items.some((i) => items[i.id]))
  if (!started && cards.length) return { label: `Start with ${title(cards[0].view)}`, detail: cards[0].description, view: cards[0].view }

  const todo = skills.find((s) => learnedFraction(s.items.map((i) => i.id), items) < GOOD_ENOUGH)
  if (todo) {
    const pct = Math.round(learnedFraction(todo.items.map((i) => i.id), items) * 100)
    return { label: `Continue: ${title(todo.view)}`, detail: `${todo.label} · ${pct}% learned`, view: todo.view }
  }

  const ready = !!tests.filter((t) => t.chapter === chapter.number).at(-1)?.ready
  if (hasTest(chapter.number) && !ready) {
    return { label: 'Take the chapter test', detail: 'Every skill is mostly learned: see if you’re ready to move on', view: 'test' }
  }
  const next = CHAPTERS.find((c) => c.number > chapter.number)
  if (next) return { label: `Go on to chapter ${next.number}`, detail: next.title, chapter: next.number }
  return { label: 'Keep your review going', detail: 'You’ve reached the last chapter so far', view: 'today' }
}

import { describe, expect, it } from 'vitest'
import { chapter08 } from '../data/chapter08'
import { chapter09 } from '../data/chapter09'
import { CHAPTERS } from '../data/chapters'
import { currentStreak, dueAt, INTERVAL_DAYS, isDue, localDay, type ItemStats } from './progress'
import { reviewPlan, reviewQuestions, whenDue } from './review'
import { chapterSkills } from './skills'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date(2026, 8, 26, 12, 0).getTime()
const stat = (box: number, daysAgo: number): ItemStats => ({ box, attempts: 1, correct: box > 1 ? 1 : 0, lastSeen: NOW - daysAgo * DAY })

describe('spacing', () => {
  it('grows the interval with the box and makes misses due at once', () => {
    expect(INTERVAL_DAYS.slice(1)).toEqual([0, 1, 3, 7, 16, 35, 90])
    expect(isDue(stat(1, 0), NOW)).toBe(true)
    expect(isDue(stat(2, 0.5), NOW)).toBe(false)
    expect(isDue(stat(2, 1), NOW)).toBe(true)
    expect(isDue(stat(5, 15), NOW)).toBe(false)
    expect(isDue(stat(5, 16), NOW)).toBe(true)
    expect(dueAt(stat(7, 0))).toBe(NOW + 90 * DAY)
  })
})

describe('daily streak', () => {
  it('keeps the streak for a review today or yesterday, and drops it after a gap', () => {
    const d = (lastDay: string, streak: number) => ({ lastDay, streak, best: streak })
    expect(currentStreak(d(localDay(NOW), 4), NOW)).toBe(4)
    expect(currentStreak(d(localDay(NOW - DAY), 4), NOW)).toBe(4)
    expect(currentStreak(d(localDay(NOW - 2 * DAY), 4), NOW)).toBe(0)
    expect(currentStreak({ streak: 0, best: 0 }, NOW)).toBe(0)
  })
})

describe('reviewPlan', () => {
  const ids = (ch: typeof chapter08) => chapterSkills(ch).flatMap((s) => s.items.map((i) => i.id))

  it('with no progress offers only new items from the current chapter', () => {
    const plan = reviewPlan({}, NOW, chapter09)
    expect(plan.due).toHaveLength(0)
    expect(plan.fresh).toHaveLength(5)
    for (const e of plan.fresh) expect(e.chapter.number).toBe(9)
  })

  it('collects due items from every chapter, shakiest first, and leaves future ones out', () => {
    const [a8, b8] = ids(chapter08)
    const [a9, b9] = ids(chapter09)
    const items = { [a8]: stat(3, 5), [b8]: stat(4, 1), [a9]: stat(1, 0), [b9]: stat(2, 2) }
    const plan = reviewPlan(items, NOW, chapter09)
    expect(plan.due.map((e) => e.item.id)).toEqual([a9, b9, a8])
    expect(plan.totalDue).toBe(3)
    expect(plan.fresh.length).toBeGreaterThan(0)
  })

  it('caps a session and skips new items when the due pile is full', () => {
    const items = Object.fromEntries(ids(chapter08).slice(0, 30).map((id) => [id, stat(1, 0)]))
    const plan = reviewPlan(items, NOW, chapter08)
    expect(plan.due).toHaveLength(20)
    expect(plan.totalDue).toBe(30)
    expect(plan.fresh).toHaveLength(0)
  })

  it('says when the next review is due once caught up', () => {
    const [a] = ids(chapter08)
    const plan = reviewPlan({ [a]: stat(3, 0) }, NOW, chapter08, 20, 0)
    expect(plan.nextDue).toBe(NOW + 3 * DAY)
    expect(whenDue(plan.nextDue!, NOW)).toBe('in 3 days')
  })

  it('labels each review question with its chapter and skill', () => {
    const qs = reviewQuestions(reviewPlan({}, NOW, chapter08))
    expect(qs).toHaveLength(5)
    expect(qs.every((q) => q.id.startsWith('ch8:'))).toBe(true)
  })
})

describe('every item can be reviewed', () => {
  it('builds a valid question for every item in every chapter, with the matching progress id', () => {
    let count = 0
    for (const ch of CHAPTERS) {
      for (const skill of chapterSkills(ch)) {
        for (const item of skill.items) {
          const q = item.make()
          const keys = q.options.map((o) => o.key)
          expect(q.id, `${skill.label}: ${item.name}`).toBe(item.id)
          expect(keys, q.id).toContain(q.answer)
          expect(new Set(keys).size, q.id).toBe(keys.length)
          count++
        }
      }
    }
    expect(count).toBeGreaterThan(1000)
  })
})

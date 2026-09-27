import { expect, it } from 'vitest'
import { getChapter } from '../data/chapters'
import type { ItemStats, TestResult } from './progress'
import { LEARNED_BOX } from './progress'
import { nextStep } from './nextStep'
import { chapterSkills } from './skills'

const learned = (ids: string[]): Record<string, ItemStats> =>
  Object.fromEntries(ids.map((id) => [id, { attempts: 2, correct: 2, box: LEARNED_BOX, lastSeen: 0 }]))
const ids = (n: number) => chapterSkills(getChapter(n)).flatMap((s) => s.items.map((i) => i.id))

it('reviews come first', () => {
  expect(nextStep(getChapter(20), {}, [], 3)).toMatchObject({ view: 'today', detail: '3 items are due for review' })
})

it('a fresh chapter starts with its first practice screen', () => {
  expect(nextStep(getChapter(20), {}, [], 0)).toMatchObject({ view: 'flashcards', label: 'Start with Flashcards' })
  // No vocabulary: the lesson screen.
  expect(nextStep(getChapter(26), {}, [], 0)).toMatchObject({ view: 'participles' })
})

it('then the first skill not yet mostly learned, then the test, then the next chapter', () => {
  const ch = getChapter(20)
  const skills = chapterSkills(ch)
  const firstDone = learned(skills[0].items.map((i) => i.id))
  const step = nextStep(ch, firstDone, [], 0)
  expect(step.label).toMatch(/^Continue: /)
  expect(step.view).toBe(skills[1].view)

  const all = learned(ids(20))
  expect(nextStep(ch, all, [], 0)).toMatchObject({ view: 'test' })
  const passed = [{ chapter: 20, ready: true } as TestResult]
  expect(nextStep(ch, all, passed, 0)).toMatchObject({ chapter: 21 })
})

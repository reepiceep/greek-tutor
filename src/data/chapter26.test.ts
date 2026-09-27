import { describe, expect, it } from 'vitest'
import { buildChapterTest, hasTest, testAreas } from '../lib/chapterTest'
import { PARTICIPLE_AREAS } from '../lib/participleIntroQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter26 as ch } from './chapter26'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'

describe('chapter 26 participle introduction', () => {
  it('is the latest chapter and has no vocabulary screen', () => {
    expect(LATEST_CHAPTER).toBe(26)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toEqual([])
    expect(ch.topics).toContain('participles')
    expect(hasTest(26)).toBe(true)
  })

  it('gives every practice question a unique answer among distinct choices', () => {
    const ids = new Set<string>()
    for (const area of PARTICIPLE_AREAS) {
      const items = ch.participleIntro![area.key]
      expect(items.length).toBeGreaterThanOrEqual(area.testCount)
      for (const item of items) {
        const id = `${area.key}:${item.id}`
        expect(ids.has(id), id).toBe(false)
        ids.add(id)
        expect(item.options).toHaveLength(4)
        expect(new Set(item.options).size, id).toBe(4)
        expect(item.options, id).toContain(item.answer)
        expect(item.explain.length, id).toBeGreaterThan(10)
      }
    }
    for (const skill of chapterSkills(ch)) {
      for (const item of skill.items) {
        const q = item.make()
        expect(q.id).toBe(item.id)
        expect(q.options.map((option) => option.key)).toContain(q.answer)
      }
    }
  })

  it('builds a 30-question test across the four lesson areas', () => {
    expect(testAreas(26).map((area) => area.count)).toEqual([8, 8, 8, 6])
    for (let i = 0; i < 10; i++) {
      const questions = buildChapterTest(ch)
      expect(questions).toHaveLength(30)
      expect(new Set(questions.map((q) => q.id)).size).toBe(30)
      for (const area of PARTICIPLE_AREAS) {
        expect(questions.filter((q) => q.area === area.label)).toHaveLength(area.testCount)
      }
    }
  })
})

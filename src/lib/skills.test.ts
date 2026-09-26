import { describe, expect, it } from 'vitest'
import { CHAPTERS } from '../data/chapters'
import { TOPIC_META } from './views'
import { chapterSkills } from './skills'

describe('chapterSkills', () => {
  it('only lists skills whose practice screen exists in that chapter', () => {
    for (const ch of CHAPTERS) {
      for (const s of chapterSkills(ch)) {
        if (s.view in TOPIC_META) expect(ch.topics, `ch ${ch.number}: ${s.label}`).toContain(s.view)
      }
    }
  })

  it('every skill label has a topic prefix for grouping', () => {
    for (const ch of CHAPTERS) for (const s of chapterSkills(ch)) expect(s.label, s.label).toMatch(/^[^:]+: \S/)
  })

  it('chapter 8 keeps its preposition skills; chapter 14 tracks its prepositions as vocab by case', () => {
    const labels = (n: number) => chapterSkills(CHAPTERS.find((c) => c.number === n)!).map((s) => s.label)
    expect(labels(8)).toContain('Prepositions: elision')
    expect(labels(8)).not.toContain('Vocab: prepositions by case')
    expect(labels(14).some((l) => l.startsWith('Prepositions'))).toBe(false)
    expect(labels(14)).toContain('Vocab: prepositions by case')
  })
})

import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { hasTest } from '../lib/chapterTest'
import { chapterSkills } from '../lib/skills'
import { chapter04 as ch } from './chapter04'

describe('chapter 4 (vocabulary only)', () => {
  it('has Mounce’s 26 words, each with audio', () => {
    expect(ch.vocab).toHaveLength(26)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(26)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('has no practice screens or test yet, and every vocab question has real choices', () => {
    expect(ch.topics).toEqual([])
    expect(hasTest(4)).toBe(false)
    for (const sk of chapterSkills(ch)) {
      for (const it of sk.items) {
        const q = it.make()
        expect(q.options.map((o) => o.key), it.id).toContain(q.answer)
        expect(q.options.length, it.id).toBe(4)
      }
    }
  })
})

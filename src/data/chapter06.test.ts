import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { hasTest } from '../lib/chapterTest'
import { chapterSkills } from '../lib/skills'
import { chapter06 as ch } from './chapter06'

describe('chapter 6 (vocabulary only)', () => {
  it('has Mounce’s 13 words, each with audio', () => {
    expect(ch.vocab).toHaveLength(13)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(13)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('has no practice screens or test yet; its vocabulary still counts in progress and review', () => {
    expect(ch.topics).toEqual([])
    expect(hasTest(6)).toBe(false)
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['Vocab: Greek → English', 'Vocab: English → Greek']))
    for (const sk of chapterSkills(ch)) {
      for (const it of sk.items) {
        const q = it.make()
        expect(q.options.map((o) => o.key), it.id).toContain(q.answer)
        expect(q.options.length, it.id).toBeGreaterThanOrEqual(3)
      }
    }
  })
})

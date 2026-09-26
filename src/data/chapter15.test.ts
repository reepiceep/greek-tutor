import { describe, expect, it } from 'vitest'
import { buildChapterTest } from '../lib/chapterTest'
import { askableProperties } from '../lib/verbIntroQuestions'
import { chapter15 as ch } from './chapter15'

const v = ch.verbIntro!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC')

describe('chapter 15 data', () => {
  it('has no vocabulary, and unique terms', () => {
    expect(ch.vocab).toHaveLength(0)
    expect(new Set(v.terms.map((t) => t.term)).size).toBe(v.terms.length)
  })

  it('each verb splits exactly into stem + connecting vowel + ending', () => {
    for (const p of v.parts) {
      expect(bare(p.stem + p.vowel + p.ending), p.form).toBe(bare(p.form))
      expect(['ο', 'ε']).toContain(p.vowel)
    }
  })

  it('each English sentence contains its verb and has at least two things to ask', () => {
    expect(new Set(v.english.map((e) => e.id)).size).toBe(v.english.length)
    for (const e of v.english) {
      expect(e.sentence, e.id).toContain(e.verb)
      expect(askableProperties(e).length, e.id).toBeGreaterThanOrEqual(2)
      // “you” is ambiguous in English, so 2nd-person statements say which.
      if (e.personNumber === '2 sg' || e.personNumber === '2 pl') expect(e.sentence, e.id).toMatch(/\((singular|plural)\)/)
    }
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (x: string) => qs.filter((q) => q.area === x).length
      expect([count('Terms'), count('English verbs'), count('Parts of a verb')]).toEqual([8, 16, 6])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

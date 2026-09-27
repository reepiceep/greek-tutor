import { describe, expect, it } from 'vitest'
import { CHAPTERS } from './chapters'

describe('memory hooks', () => {
  it('many words in every chapter have one, and each is a short sentence', () => {
    for (const ch of CHAPTERS.filter((c) => c.vocab.length)) {
      const hooked = ch.vocab.filter((w) => w.hook)
      // Five or more, except in chapters with very few words (chapter 25 has three).
      expect(hooked.length, `ch ${ch.number}`).toBeGreaterThanOrEqual(Math.min(5, ch.vocab.length - 1))
      for (const w of hooked) {
        expect(w.hook!.length, w.lemma).toBeLessThan(110)
        expect(w.hook!.trim(), w.lemma).toMatch(/[.”]$/)
      }
    }
  })
})

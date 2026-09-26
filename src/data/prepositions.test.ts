import { describe, expect, it } from 'vitest'
import { normalizeGreek } from '../lib/greek'
import { caseUses, findUse, meaningDistractors, phraseDistractors, phraseTranslation } from '../lib/prepositions'
import { chapter08 } from './chapter08'
import { prepositionReview } from './prepositionReview'
import { PREPOSITION_CHAPTERS, PREPOSITIONS, SENTENCES } from './prepositions'

const ranges = PREPOSITION_CHAPTERS.filter((c) => c >= 8).map(prepositionReview)
const all = prepositionReview(PREPOSITION_CHAPTERS.at(-1)!)

describe('preposition list', () => {
  it('has unique ids and a chapter for every entry', () => {
    expect(new Set(PREPOSITIONS.map((p) => p.id)).size).toBe(PREPOSITIONS.length)
    for (const p of PREPOSITIONS) expect(p.chapter, p.id).toBeGreaterThanOrEqual(4)
  })

  it('chapter 8 uses the shared entries', () => {
    for (const w of chapter08.vocab.filter((v) => v.pos === 'preposition')) {
      expect(PREPOSITIONS).toContain(w)
      expect(w.chapter).toBe(8)
    }
  })

  it('never has two ids clash between chapter 8 vocab and prepositions', () => {
    const ids = chapter08.vocab.map((v) => v.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('sentences', () => {
  it('have unique ids, a phrase inside the text, one blank, and a real meaning', () => {
    expect(new Set(SENTENCES.map((s) => s.id)).size).toBe(SENTENCES.length)
    for (const s of SENTENCES) {
      expect(s.text, s.id).toContain(s.phrase)
      expect(s.english.split('{}'), s.id).toHaveLength(2)
      expect(findUse(all, s.prep, s.case).accept, s.id).toContain(s.meaning)
      // First two letters only, so elided phrases (διʼ, μεθʼ, καθʼ) still match their preposition.
      expect(normalizeGreek(s.phrase, false).startsWith(normalizeGreek(findUse(all, s.prep, s.case).word.lemma, false).slice(0, 2)), s.id).toBe(true)
      expect(s.avoid ?? [], s.id).not.toContain(s.meaning)
    }
  })

  it('chapter 8 gets only sentences for its own prepositions', () => {
    const ch8 = new Set(chapter08.vocab.map((v) => v.id))
    expect(chapter08.sentences!.length).toBeGreaterThan(5)
    for (const s of chapter08.sentences!) expect(ch8.has(s.prep), s.id).toBe(true)
  })
})

describe('review ranges', () => {
  it('grow as the chapter range grows', () => {
    const sizes = ranges.map((r) => r.vocab.length)
    expect(sizes).toEqual([...sizes].sort((a, b) => a - b))
    expect(sizes.at(-1)).toBe(PREPOSITIONS.length)
  })

  it('only include content for prepositions in range', () => {
    for (const r of ranges) {
      const ids = new Set(r.vocab.map((v) => v.id))
      for (const x of [...r.phrases!, ...r.elisions!, ...r.spatial!, ...r.sentences!]) expect(ids.has(x.prep)).toBe(true)
    }
  })

  it('always have three wrong answers, none sharing a meaning with the right one', () => {
    for (const r of [chapter08, ...ranges]) {
      for (const use of caseUses(r)) {
        const ds = meaningDistractors(r, use, 3)
        expect(ds, use.word.lemma).toHaveLength(3)
        for (const d of ds) expect(d.accept.some((a) => use.accept.includes(a))).toBe(false)
      }
      for (const p of [...r.phrases!, ...r.sentences!]) {
        const ds = phraseDistractors(r, p, 3)
        expect(ds, p.id).toHaveLength(3)
        expect(ds).not.toContain(phraseTranslation(p))
        for (const a of p.avoid ?? []) expect(ds).not.toContain(`${a} ${p.object}`)
      }
    }
  })
})

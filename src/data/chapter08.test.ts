import { describe, expect, it } from 'vitest'
import { chapter08 as ch } from './chapter08'
import { normalizeGreek } from '../lib/greek'
import { caseUses, findUse, meaningDistractors, phraseDistractors, phraseTranslation } from '../lib/prepositions'

describe('chapter 8 data', () => {
  it('has unique ids', () => {
    for (const list of [ch.vocab, ch.phrases ?? [], ch.elisions ?? []]) {
      const ids = list.map((x) => x.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('phrases use a real preposition + case and one of its meanings', () => {
    for (const p of ch.phrases ?? []) {
      const use = findUse(ch, p.prep, p.case)
      expect(use.accept, p.id).toContain(p.meaning)
      expect(normalizeGreek(p.greek, false).startsWith(normalizeGreek(use.word.lemma, false)), p.id).toBe(true)
    }
  })

  it('elision items start with their preposition and have distinct options', () => {
    for (const e of ch.elisions ?? []) {
      expect(new Set(e.options).size, e.id).toBe(e.options.length)
      expect(e.options[0].endsWith(e.next), e.id).toBe(true)
      expect(ch.vocab.find((w) => w.id === e.prep)?.pos, e.id).toBe('preposition')
    }
  })

  it('spatial uses exist', () => {
    for (const s of ch.spatial ?? []) expect(() => findUse(ch, s.prep, s.case)).not.toThrow()
  })
})

describe('distractors', () => {
  it('never include a correct meaning', () => {
    for (const use of caseUses(ch)) {
      for (const d of meaningDistractors(ch, use, 3)) {
        expect(d.gloss).not.toBe(use.gloss)
        expect(use.accept).not.toContain(d.primary)
      }
    }
  })

  it('give three wrong phrase translations', () => {
    for (const p of ch.phrases ?? []) {
      const ds = phraseDistractors(ch, p, 3)
      expect(ds, p.id).toHaveLength(3)
      expect(ds).not.toContain(phraseTranslation(p))
    }
  })
})

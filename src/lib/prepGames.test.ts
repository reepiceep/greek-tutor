import { describe, expect, it } from 'vitest'
import { chapter08 } from '../data/chapter08'
import { prepositionReview } from '../data/prepositionReview'
import { PREPOSITIONS } from '../data/prepositions'
import { matchCards, pickPairs, speedPoints, speedQuestion } from './prepGames'

const chapters = [chapter08, prepositionReview(8), prepositionReview(10), prepositionReview(14)]

describe('preposition games', () => {
  it('picks 6 pairs whose meanings never overlap, in every range', () => {
    for (const ch of chapters) {
      for (let i = 0; i < 30; i++) {
        const pairs = pickPairs(ch, 6)
        expect(pairs, ch.title).toHaveLength(6)
        for (const a of pairs) for (const b of pairs) {
          if (a !== b) expect(a.accept.some((x) => b.accept.includes(x)), `${a.gloss} / ${b.gloss}`).toBe(false)
        }
      }
    }
  })

  it('makes one Greek and one English card per pair', () => {
    const cards = matchCards(pickPairs(chapter08, 6))
    expect(cards).toHaveLength(12)
    for (const pair of new Set(cards.map((c) => c.pair))) {
      expect(cards.filter((c) => c.pair === pair).map((c) => c.side).sort()).toEqual(['english', 'greek'])
    }
  })

  it('speed questions always include their answer among distinct options', () => {
    for (const ch of chapters) {
      let q = speedQuestion(ch)
      for (let i = 0; i < 200; i++) {
        const next = speedQuestion(ch, q)
        expect(next.use).not.toBe(q.use)
        q = next
        const keys = q.options.map((o) => o.key)
        expect(keys).toContain(q.answer)
        expect(new Set(keys).size).toBe(keys.length)
      }
    }
  })

  it('scores 1, then 2 from five in a row, then 3 from ten', () => {
    expect([1, 4, 5, 9, 10, 20].map(speedPoints)).toEqual([1, 1, 2, 2, 3, 3])
  })

  it('every preposition has a memory hook', () => {
    for (const p of PREPOSITIONS) expect(p.hook, p.lemma).toBeTruthy()
  })
})

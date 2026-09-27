import { describe, expect, it } from 'vitest'
import { CHAPTERS } from '../data/chapters'
import { synonyms } from './items'
import { buildQuiz, vocabPool } from './vocabQuiz'

const range = (a: number, b: number) => CHAPTERS.filter((c) => c.number >= a && c.number <= b)

describe('vocab quiz over a range of chapters', () => {
  it('pools every word from the chosen chapters once, tagged with its own chapter', () => {
    const pool = vocabPool(range(8, 14))
    const total = range(8, 14).reduce((n, c) => n + c.vocab.length, 0)
    expect(pool.length).toBe(total)
    expect(new Set(pool.map((e) => e.word.lemma)).size).toBe(pool.length)
    for (const e of pool) expect(CHAPTERS.find((c) => c.number === e.chapter)!.vocab).toContain(e.word)
  })

  it('draws questions from across the range, with four distinct non-synonym options', () => {
    const qs = buildQuiz(range(8, 14), 'g2e', 50)
    expect(qs).toHaveLength(50)
    expect(new Set(qs.map((q) => q.chapter)).size).toBeGreaterThan(3)
    for (const q of qs) {
      expect(q.options).toHaveLength(4)
      expect(q.options).toContain(q.word)
      for (const o of q.options) if (o !== q.word) expect(synonyms(o, q.word), `${q.word.lemma} / ${o.lemma}`).toBe(false)
    }
  })

  it('a single chapter still works as before', () => {
    const qs = buildQuiz(range(9, 9), 'e2g', 10)
    expect(qs.every((q) => q.chapter === 9)).toBe(true)
  })
})

describe('the “All” quiz length', () => {
  it('asks every word in the range once', async () => {
    const { CHAPTERS } = await import('../data/chapters')
    const chapters = CHAPTERS.filter((c) => c.number >= 8 && c.number <= 12)
    const qs = buildQuiz(chapters, 'g2e', Infinity)
    expect(qs).toHaveLength(vocabPool(chapters).length)
    expect(new Set(qs.map((q) => `${q.chapter}:${q.word.id}`)).size).toBe(qs.length)
  })
})

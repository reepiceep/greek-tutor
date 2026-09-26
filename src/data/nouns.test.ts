import { describe, expect, it } from 'vitest'
import { displayForm } from '../lib/items'
import { CHAPTERS } from './chapters'

// Indeclinable nouns have no genitive ending to list.
const INDECLINABLE = new Set(['Ἰερουσαλήμ'])

describe('noun lexical forms', () => {
  it('every noun lists nominative, genitive and article, as in Mounce (θάνατος, -ου, ὁ)', () => {
    for (const ch of CHAPTERS) {
      for (const w of ch.vocab.filter((v) => v.pos === 'noun')) {
        const parts = w.lexical?.split(', ') ?? []
        expect(parts[0], `${w.lemma}: lexical starts with the lemma`).toBe(w.lemma)
        expect(['ὁ', 'ἡ', 'τό'], `${w.lemma}: ends with the article`).toContain(parts.at(-1))
        expect(parts.length, `${w.lemma}: has a genitive`).toBe(INDECLINABLE.has(w.lemma) ? 2 : 3)
      }
    }
  })

  it('nouns are shown in full when asked about; other words by their lemma', () => {
    const all = CHAPTERS.flatMap((c) => c.vocab)
    expect(displayForm(all.find((w) => w.lemma === 'θάνατος')!)).toBe('θάνατος, -ου, ὁ')
    expect(displayForm(all.find((w) => w.lemma === 'ἀγαθός')!)).toBe('ἀγαθός')
    expect(displayForm(all.find((w) => w.lemma === 'ἀλλά')!)).toBe('ἀλλά')
  })
})

describe('split preposition cards', () => {
  it('give a first-letter hint only when meaning + case could be another preposition', async () => {
    const { caseUses, firstLetterHint } = await import('../lib/prepositions')
    const { chapter08 } = await import('./chapter08')
    const uses = caseUses(chapter08)
    const find = (lemma: string, c: string) => uses.find((u) => u.word.lemma === lemma && u.case === c)!
    expect(firstLetterHint(find('ἀπό', 'genitive'), uses)).toBe('α')
    expect(firstLetterHint(find('ἐκ', 'genitive'), uses)).toBe('ε')
    expect(firstLetterHint(find('παρά', 'genitive'), uses)).toBe('π')
    expect(firstLetterHint(find('μετά', 'accusative'), uses)).toBeNull()
    expect(firstLetterHint(find('ὑπό', 'genitive'), uses)).toBeNull()
  })
})

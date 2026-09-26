import { CHAPTERS } from '../data/chapters'
import type { Chapter, VocabWord } from '../data/types'
import { type Direction, vocabDistractors, vocabItemId } from './items'
import { pickWeakest, shuffle } from './progress'

// Building a vocabulary quiz over one chapter or a range of chapters.

export type Range = [number, number]

/** The built chapters from `range[0]` to `range[1]`, inclusive. */
export const chaptersIn = (range: Range) => CHAPTERS.filter((c) => c.number >= range[0] && c.number <= range[1])

export interface Question {
  word: VocabWord
  /** The chapter the word belongs to (for its progress id and the chapter tag). */
  chapter: number
  dir: Direction
  options: VocabWord[]
}

/** Every word from the chosen chapters, each tagged with its own chapter. */
export function vocabPool(chapters: Chapter[]): { word: VocabWord; chapter: number }[] {
  const seen = new Set<string>()
  return chapters.flatMap((c) => c.vocab.map((word) => ({ word, chapter: c.number })))
    .filter((e) => !seen.has(e.word.lemma) && !!seen.add(e.word.lemma))
}

/** Weakest words first across the chosen chapters; wrong options come from the same pool. */
export function buildQuiz(chapters: Chapter[], dir: Direction, length: number): Question[] {
  const pool = vocabPool(chapters)
  const combined = { ...chapters[0], vocab: pool.map((e) => e.word) }
  return pickWeakest(pool, (e) => vocabItemId(e.chapter, e.word, dir), length).map(({ word, chapter }) => ({
    word, chapter, dir, options: shuffle([word, ...vocabDistractors(combined, word, 3)]),
  }))
}

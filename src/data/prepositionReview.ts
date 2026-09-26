import { chapter08 } from './chapter08'
import { LATER_ELISIONS, LATER_PHRASES, LATER_SPATIAL, PREPOSITIONS, SENTENCES } from './prepositions'
import type { Chapter } from './types'

/** Chapter number used for the cross-chapter review, so its progress ids ("ch0:…") stay separate from chapter 8's. */
export const REVIEW_CHAPTER = 0

/** Every preposition introduced up to and including chapter `through`, with all practice content for them. */
export function prepositionReview(through: number): Chapter {
  const vocab = PREPOSITIONS.filter((p) => p.chapter! <= through)
  const ids = new Set(vocab.map((v) => v.id))
  const known = <T extends { prep: string }>(xs: T[]) => xs.filter((x) => ids.has(x.prep))
  return {
    number: REVIEW_CHAPTER,
    title: `Prepositions through chapter ${through}`,
    short: 'Prepositions',
    vocab,
    paradigms: [],
    phrases: known([...(chapter08.phrases ?? []), ...LATER_PHRASES]),
    elisions: known([...(chapter08.elisions ?? []), ...LATER_ELISIONS]),
    spatial: known([...(chapter08.spatial ?? []), ...LATER_SPATIAL]),
    sentences: known(SENTENCES),
  }
}

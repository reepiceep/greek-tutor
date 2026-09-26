import type {
  Case, Chapter, ElisionItem, EncliticItem, ParadigmRow, PredicateItem, PrepPhrase, PrepSentence, SpatialUse, VocabWord,
} from '../data/types'
import { shuffle } from './progress'

export type Direction = 'g2e' | 'e2g'
export type ParadigmSkill = 'produce' | 'identify'

// Progress ids, e.g. "ch8:vocab:meta:g2e" or "ch8:eimi-present:3s:identify".
export const vocabItemId = (ch: number, w: VocabWord, dir: Direction) => `ch${ch}:vocab:${w.id}:${dir}`
export const paradigmItemId = (ch: number, paradigmId: string, r: ParadigmRow, skill: ParadigmSkill) =>
  `ch${ch}:${paradigmId}:${r.key}:${skill}`

/** Words that can mean the same thing: any shared accepted English answer (οἰκία / οἶκος, κακός / πονηρός). */
export const synonyms = (a: VocabWord, b: VocabWord) => a.accept.some((x) => b.accept.includes(x))

/** Greek forms accepted for an English→Greek prompt: the word and all its synonyms. */
export function greekAnswersFor(w: VocabWord, all: VocabWord[]): string[] {
  return all.filter((o) => synonyms(o, w)).flatMap((o) => [o.lemma, ...(o.forms ?? [])])
}

export type PrepSkill = 'meaning' | 'case'

export const prepItemId = (ch: number, prep: string, c: Case, skill: PrepSkill) => `ch${ch}:prep:${prep}:${c}:${skill}`
export const phraseItemId = (ch: number, p: PrepPhrase) => `ch${ch}:phrase:${p.id}`
export const elisionItemId = (ch: number, e: ElisionItem) => `ch${ch}:elision:${e.id}`
export const elidedFormItemId = (ch: number, form: string) => `ch${ch}:elided:${form}`
export const spatialItemId = (ch: number, s: SpatialUse) => `ch${ch}:spatial:${s.prep}:${s.case}`
export const sentenceItemId = (ch: number, s: PrepSentence) => `ch${ch}:sentence:${s.id}`
export const predicateItemId = (ch: number, p: PredicateItem, skill: 'subject' | 'translate') => `ch${ch}:predicate:${p.id}:${skill}`
export const encliticItemId = (ch: number, e: EncliticItem, skill: 'accent' | 'rule') => `ch${ch}:enclitic:${e.id}:${skill}`
export const encliticFormItemId = (ch: number, form: string) => `ch${ch}:enclitic-form:${form}`

/** Wrong answers for a vocab question; never a synonym (οἰκία / οἶκος, κακός / πονηρός). */
export function vocabDistractors(ch: Chapter, w: VocabWord, n: number): VocabWord[] {
  return shuffle(ch.vocab.filter((o) => !synonyms(o, w))).slice(0, n)
}

/** How a word is shown when you're asked about it: nouns with genitive and article (θάνατος, -ου, ὁ), as in Mounce. */
export const displayForm = (w: VocabWord) => (w.pos === 'noun' && w.lexical ? w.lexical : w.lemma)

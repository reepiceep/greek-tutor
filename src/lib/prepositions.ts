import type { Case, Chapter, PrepPhrase, VocabWord } from '../data/types'
import { PREPOSITIONS } from '../data/prepositions'
import { shuffle } from './progress'

export const CASE_ABBR: Record<Case, string> = { genitive: 'gen', dative: 'dat', accusative: 'acc' }
export const CASES: Case[] = ['genitive', 'dative', 'accusative']

/** One preposition + one case, e.g. μετά + accusative = "after". */
export interface CaseUse {
  word: VocabWord
  case: Case
  gloss: string
  /** Main meaning, used when building phrase translations. */
  primary: string
  accept: string[]
}

export function caseUses(ch: Chapter): CaseUse[] {
  return ch.vocab.flatMap((word) =>
    (word.cases ?? []).map((c) => ({ word, case: c.case, gloss: c.gloss, primary: c.accept[0], accept: c.accept })),
  )
}

export function prepWord(ch: Chapter, id: string): VocabWord {
  const w = ch.vocab.find((v) => v.id === id)
  if (!w) throw new Error(`Unknown preposition ${id}`)
  return w
}

export function findUse(ch: Chapter, prep: string, c: Case): CaseUse {
  const use = caseUses(ch).find((u) => u.word.id === prep && u.case === c)
  if (!use) throw new Error(`${prep} is not used with the ${c}`)
  return use
}

/**
 * Wrong meanings for a use: the same preposition's other cases first (the key contrast), then other prepositions.
 * A use sharing any accepted meaning with the right one is never offered (ἐπί + acc "on, to" vs πρός "to").
 */
export function meaningDistractors(ch: Chapter, use: CaseUse, n: number): CaseUse[] {
  const unlike = (u: CaseUse) => !u.accept.some((a) => use.accept.includes(a))
  const others = caseUses(ch).filter(unlike)
  const same = shuffle(others.filter((u) => u.word === use.word))
  const rest = shuffle(others.filter((u) => u.word !== use.word))
  // A chapter with few prepositions (chapter 7 has only ἐν and εἰς) borrows meanings from the others.
  const borrowed = shuffle(caseUses({ ...ch, vocab: PREPOSITIONS }).filter((u) => unlike(u) && u.word.id !== use.word.id))
  const seen = new Set<string>()
  return [...same, ...rest, ...borrowed].filter((u) => !seen.has(u.gloss) && seen.add(u.gloss)).slice(0, n)
}

/** The parts of a phrase or sentence item needed to build its translation options. */
type Translatable = Pick<PrepPhrase, 'prep' | 'case' | 'meaning' | 'object' | 'avoid'>

export function phraseTranslation(p: Translatable): string {
  return `${p.meaning} ${p.object}`
}

/** Wrong translations of a phrase: its object with other prepositions' meanings, minus any the item says to avoid. */
export function phraseDistractors(ch: Chapter, p: Translatable, n: number): string[] {
  const use = findUse(ch, p.prep, p.case)
  const meanings = new Set<string>()
  for (const u of meaningDistractors(ch, use, 99)) {
    if (u.primary !== p.meaning && !p.avoid?.includes(u.primary)) meanings.add(u.primary)
  }
  return [...meanings].slice(0, n).map((m) => `${m} ${p.object}`)
}

/** Elided/altered spellings of the chapter's prepositions, e.g. ἀφ᾽ → ἀπό. */
export function elidedForms(ch: Chapter): { form: string; word: VocabWord }[] {
  return ch.vocab.filter((w) => w.pos === 'preposition').flatMap((word) => (word.forms ?? []).map((form) => ({ form, word })))
}

/**
 * For an English → Greek card: the first letter of the answer, when the meaning and case alone could be another
 * preposition (ἀπό, ἐκ and παρά all mean "from" with the genitive).
 */
export function firstLetterHint(use: CaseUse, all: CaseUse[]): string | null {
  const clash = all.some((o) => o.word !== use.word && o.case === use.case && o.accept.some((a) => use.accept.includes(a)))
  if (!clash) return null
  return use.word.lemma.normalize('NFD').replace(/[\u0300-\u036f]/g, '').charAt(0)
}

import type { Case, Chapter } from '../data/types'
import { CASES, CASE_ABBR, type CaseUse, caseUses, meaningDistractors } from './prepositions'
import { shuffle } from './progress'

// Logic for the preposition games: pairs for Match/Memory, questions and scoring for the Speed round.

export const caseUseLabel = (u: CaseUse) => `${u.word.lemma} + ${CASE_ABBR[u.case]}`

/**
 * Up to `n` preposition + case uses that can be paired without ambiguity:
 * no two share an accepted meaning (so "with" can't match both μετά + gen and σύν + dat).
 */
export function pickPairs(ch: Chapter, n: number): CaseUse[] {
  const picked: CaseUse[] = []
  for (const u of shuffle(caseUses(ch))) {
    const clash = picked.some((p) => p.gloss === u.gloss || p.accept.some((a) => u.accept.includes(a)))
    if (!clash) picked.push(u)
    if (picked.length === n) break
  }
  return picked
}

export interface MatchCard {
  /** Position-independent id. */
  id: string
  pair: string
  side: 'greek' | 'english'
  text: string
}

export function matchCards(uses: CaseUse[]): MatchCard[] {
  return shuffle(uses.flatMap((u) => {
    const pair = `${u.word.id}:${u.case}`
    return [
      { id: `${pair}:g`, pair, side: 'greek' as const, text: caseUseLabel(u) },
      { id: `${pair}:e`, pair, side: 'english' as const, text: u.gloss },
    ]
  }))
}

export interface SpeedQuestion {
  kind: 'meaning' | 'case'
  use: CaseUse
  options: { key: string; label: string }[]
  answer: string
}

/** A random speed-round question: "μετά + acc = ?" or "which case gives μετά 'after'?". */
export function speedQuestion(ch: Chapter, previous?: SpeedQuestion): SpeedQuestion {
  const uses = caseUses(ch)
  let use = uses[Math.floor(Math.random() * uses.length)]
  // Avoid asking about the same use twice in a row.
  if (previous && uses.length > 1) while (use === previous.use) use = uses[Math.floor(Math.random() * uses.length)]
  const multiCase = (use.word.cases?.length ?? 0) > 1
  const kind = multiCase && Math.random() < 0.4 ? 'case' : 'meaning'
  if (kind === 'case') {
    return { kind, use, options: CASES.map((c: Case) => ({ key: c, label: c })), answer: use.case }
  }
  const options = shuffle([use, ...meaningDistractors(ch, use, 3)])
  return { kind, use, options: options.map((o) => ({ key: `${o.word.id}:${o.case}`, label: o.gloss })), answer: `${use.word.id}:${use.case}` }
}

/** Points for a correct answer, given the streak including it: 1, then 2 from 5 in a row, 3 from 10. */
export const speedPoints = (streak: number) => (streak >= 10 ? 3 : streak >= 5 ? 2 : 1)

export const SPEED_SECONDS = 60

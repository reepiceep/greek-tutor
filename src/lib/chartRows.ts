import type { ReferenceCell, ReferenceRow } from '../components/ReferenceChart'
import type { GrammaticalNumber, NounCase } from '../data/types'
import { NOUN_CASES } from './declensionQuestions'

/** Reference-chart rows: the four cases in the singular, then in the plural, with a heading row before each number. */
export function numberRows(cells: (s: { case: NounCase; number: GrammaticalNumber }) => ReferenceCell[]): ReferenceRow[] {
  return (['sg', 'pl'] as const).flatMap((number) => NOUN_CASES.map((c, i) => ({
    label: c.slice(0, 3),
    section: i === 0 ? (number === 'sg' ? 'Singular' : 'Plural') : undefined,
    cells: cells({ case: c, number }),
  })))
}

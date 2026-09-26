import type { Case } from '../data/types'
import { CASE_ABBR } from '../lib/prepositions'

export const CaseTag = ({ c }: { c: Case }) => <span className={`case-tag ${c}`}>{CASE_ABBR[c]}</span>

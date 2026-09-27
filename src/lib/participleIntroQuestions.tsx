import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, ParticipleIntroItem, ParticipleIntroSection } from '../data/types'
import { shuffle } from './progress'

export type ParticipleArea = keyof ParticipleIntroSection
export const PARTICIPLE_AREAS: { key: ParticipleArea; label: string; testCount: number }[] = [
  { key: 'english', label: 'English participles', testCount: 8 },
  { key: 'properties', label: 'Verbal and adjectival', testCount: 8 },
  { key: 'agreement', label: 'Agreement', testCount: 8 },
  { key: 'structure', label: 'Word structure', testCount: 6 },
]

export const participleItemId = (chapter: number, area: ParticipleArea, item: ParticipleIntroItem) =>
  `ch${chapter}:participle:${area}:${item.id}`

export function participleQuestion(ch: Chapter, area: ParticipleArea, item: ParticipleIntroItem): ChoiceQuestion {
  return {
    id: participleItemId(ch.number, area, item),
    prompt: <p className="sentence">{item.prompt}</p>,
    options: shuffle(item.options).map((option) => ({ key: option, label: option })),
    answer: item.answer,
    explain: <p>{item.explain}</p>,
    review: <>{item.prompt} <strong>{item.answer}</strong></>,
  }
}

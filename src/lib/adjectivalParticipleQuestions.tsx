import type { Chapter, ParticipleUse, ParticipleUseItem } from '../data/types'
import { type UsageConfig, usageItemId, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 29: is a participle adverbial, attributive or substantival, and how is it translated?

export const PARTICIPLE_USES: Record<ParticipleUse, { label: string; explain: string }> = {
  adverbial: {
    label: 'Adverbial — no article; it tells about the main verb (“while …,” “after …”)',
    explain: 'With no article, the participle is adverbial: it adds something about the main verb’s action, “while …ing” (present) or “after …ing” (aorist).',
  },
  attributive: {
    label: 'Attributive — it has the article and describes a noun (“the … who …”)',
    explain: 'With the article and a noun to describe, the participle is attributive, like ὁ ἀγαθὸς λόγος: translate it as an adjective or a relative clause, “the Father who sent me.”',
  },
  substantival: {
    label: 'Substantival — it has the article but no noun, so it is the noun (“the one who …”)',
    explain: 'With the article and no noun, the participle acts as a noun: “the one who …,” “those who …,” taking “he,” “she” or “it” from its gender and number.',
  },
}

const PARTICIPLES: UsageConfig<ParticipleUse> = {
  prefix: 'ptc-use',
  ask: 'How is the highlighted participle used?',
  rules: PARTICIPLE_USES,
  traps: [
    { key: 'trap-first', label: 'Adverbial — it comes first in its clause' },
    { key: 'trap-verb', label: 'Main verb — it has a personal ending like -ουσιν or -ει' },
  ],
}

export const participleUseId = (ch: number, u: ParticipleUseItem, skill: 'use' | 'translate') => usageItemId(ch, PARTICIPLES.prefix, u, skill)
export const participleUseQuestion = (ch: Chapter, u: ParticipleUseItem) => usageQuestion(ch, PARTICIPLES, u)
export const participleUseTranslateQuestion = (ch: Chapter, u: ParticipleUseItem) => usageTranslateQuestion(ch, PARTICIPLES, u)

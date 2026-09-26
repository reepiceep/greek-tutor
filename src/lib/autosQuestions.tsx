import type { AutosItem, AutosUse, Chapter } from '../data/types'
import { type UsageConfig, usageItemId, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 12: the three uses of αὐτός and how to translate it.

export const AUTOS_USES: Record<AutosUse, { label: string; explain: string }> = {
  pronoun: {
    label: 'Personal pronoun (“he, she, it, they”) — it stands on its own, with no noun',
    explain: 'On its own, αὐτός is the third-person pronoun: “he, she, it, they” (and “him, his, to them…” by case). Its gender follows the word it refers to, not English.',
  },
  intensive: {
    label: 'Intensive (“himself, itself”) — the noun has the article but αὐτός doesn’t',
    explain: 'In predicate position (no article right before αὐτός) it is intensive: αὐτὸς ὁ κύριος, “the Lord himself.”',
  },
  identical: {
    label: 'Identical (“the same”) — the article comes right before it',
    explain: 'In attributive position (the article right before αὐτός) it means “the same”: ὁ αὐτὸς κύριος, “the same Lord.”',
  },
}

const AUTOS: UsageConfig<AutosUse> = {
  prefix: 'autos',
  ask: 'How is the highlighted αὐτός used?',
  rules: AUTOS_USES,
  traps: [{ key: 'trap', label: 'Identical (“the same”) — it comes before the noun' }],
}

export const autosItemId = (ch: number, a: AutosItem, skill: 'use' | 'translate') => usageItemId(ch, AUTOS.prefix, a, skill)

/** Pronoun, intensive or identical — and why. Word order is the trap: position relative to the article decides. */
export const autosUseQuestion = (ch: Chapter, a: AutosItem) => usageQuestion(ch, AUTOS, a)
export const autosTranslateQuestion = (ch: Chapter, a: AutosItem) => usageTranslateQuestion(ch, AUTOS, a)

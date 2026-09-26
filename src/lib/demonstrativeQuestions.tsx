import type { Chapter, DemonstrativeItem, DemonstrativeUse } from '../data/types'
import { type UsageConfig, usageItemId, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 13: οὗτος and ἐκεῖνος as pronouns or adjectives.

export const DEMONSTRATIVE_USES: Record<DemonstrativeUse, { label: string; explain: string }> = {
  pronoun: {
    label: 'Pronoun (“this one, he; these things”) — it stands on its own, with no noun',
    explain: 'With no noun to go with, a demonstrative is a pronoun: οὗτος “this one, he,” ἐκεῖνος “that one, he,” ταῦτα “these things.”',
  },
  adjective: {
    label: 'Adjective (“this ___, that ___”) — it goes with a noun that has the article',
    explain: 'A demonstrative modifying a noun stands outside the article (οὗτος ὁ λόγος or ὁ λόγος οὗτος), but you still translate it “this word,” never “the word is this.”',
  },
}

const DEMONSTRATIVES: UsageConfig<DemonstrativeUse> = {
  prefix: 'demonstrative',
  ask: 'How is the highlighted demonstrative used?',
  rules: DEMONSTRATIVE_USES,
  traps: [
    { key: 'trap-predicate', label: 'Predicate (“the ___ is this”) — it stands outside the article' },
    { key: 'trap-first', label: 'Pronoun — it comes first in the clause' },
  ],
}

export const demonstrativeItemId = (ch: number, d: DemonstrativeItem, skill: 'use' | 'translate') =>
  usageItemId(ch, DEMONSTRATIVES.prefix, d, skill)
export const demonstrativeUseQuestion = (ch: Chapter, d: DemonstrativeItem) => usageQuestion(ch, DEMONSTRATIVES, d)
export const demonstrativeTranslateQuestion = (ch: Chapter, d: DemonstrativeItem) => usageTranslateQuestion(ch, DEMONSTRATIVES, d)

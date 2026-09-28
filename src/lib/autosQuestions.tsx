import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { AutosItem, AutosUse, Chapter, DeclensionParadigm, Gender } from '../data/types'
import { formAt, GENDERS, NOUN_CASES, NUMBERS, type Slot } from './declensionQuestions'
import { shuffle } from './progress'
import { type UsageConfig, usageItemId, usageQuestion, usageSentenceQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 12: the three uses of αὐτός, how to translate it, and English → Greek.

export const AUTOS_USES: Record<AutosUse, { label: string; explain: string }> = {
  pronoun: {
    label: 'Personal pronoun (“he, she, it, they”) — it stands on its own, with no noun',
    explain: 'On its own, αὐτός is the third-person pronoun: “he, she, it, they” (and “him, his, to them…” by case). Its gender follows the word it refers to, not English. In the nominative, with a third-person verb, it adds emphasis: “he himself.”',
  },
  intensive: {
    label: 'Intensive (“himself, myself”) — it goes with a noun or subject, and no article comes right before it',
    explain: 'In predicate position (no article right before αὐτός) it is intensive: αὐτὸς ὁ κύριος, “the Lord himself.” With ἐγώ, σύ, or a first- or second-person verb, it is “myself,” “yourself.”',
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

export const autosItemId = (ch: number, a: AutosItem, skill: 'use' | 'translate' | 'sentence') => usageItemId(ch, AUTOS.prefix, a, skill)

/** Pronoun, intensive or identical — and why. Word order is the trap: position relative to the article decides. */
export const autosUseQuestion = (ch: Chapter, a: AutosItem) => usageQuestion(ch, AUTOS, a)
export const autosTranslateQuestion = (ch: Chapter, a: AutosItem) => usageTranslateQuestion(ch, AUTOS, a)
/** The whole verse (only for items with `sentenceWrong`). */
export const autosSentenceQuestion = (ch: Chapter, a: AutosItem) => usageSentenceQuestion(ch, AUTOS, a)

// --- English -------------------------------------------------------------------------

const SG: Record<Gender, string[]> = {
  masculine: ['he', 'his, of him', 'to him', 'him'],
  feminine: ['she', 'her, of her', 'to her', 'her'],
  neuter: ['it', 'its, of it', 'to it', 'it'],
}
const PL = ['they', 'their, of them', 'to them', 'them']

/** The English for a slot of αὐτός as a personal pronoun. */
export const autosEnglish = (s: Slot) => (s.number === 'sg' ? SG[s.gender] : PL)[NOUN_CASES.indexOf(s.case)]

/** The English as a prompt: unambiguous about which slot is meant. */
const SG_PROMPT: Record<Gender, string[]> = {
  masculine: ['he', 'his', 'to him', 'him'],
  feminine: ['she', 'her (possessive)', 'to her', 'her (object)'],
  neuter: ['it (subject)', 'its', 'to it', 'it (object)'],
}
const PL_PROMPT = ['they', 'their', 'to them', 'them']
export const autosPrompt = (s: Slot) => s.number === 'sg'
  ? SG_PROMPT[s.gender][NOUN_CASES.indexOf(s.case)]
  : `${PL_PROMPT[NOUN_CASES.indexOf(s.case)]} (${s.gender})`

export const AUTOS_SLOTS: Slot[] = GENDERS.flatMap((gender) => NUMBERS.flatMap((number) => NOUN_CASES.map((c) => ({ case: c, number, gender }))))

const slotKey = (s: Slot) => `${s.gender}-${s.number}-${s.case}`
export const autosSlotLabel = (s: Slot) => `3rd person ${s.gender} ${s.case} ${s.number === 'sg' ? 'singular' : 'plural'}`
const closeness = (a: Slot, b: Slot) => Number(a.gender === b.gender) + Number(a.number === b.number) + Number(a.case === b.case)

export type AutosProduceKind = 'english' | 'desc'
export const autosProduceId = (ch: number, s: Slot, kind: AutosProduceKind) => `ch${ch}:autos-produce:${slotKey(s)}:${kind}`

/** From English (“to them (feminine)”) or a description (“3rd person feminine dative plural”) to the form of αὐτός. */
export function autosProduceQuestion(ch: Chapter, p: DeclensionParadigm, s: Slot, kind: AutosProduceKind): ChoiceQuestion {
  const answer = formAt(p, s)
  const wrong: string[] = []
  const others = AUTOS_SLOTS.filter((x) => slotKey(x) !== slotKey(s)).sort((a, b) => closeness(b, s) - closeness(a, s) || Math.random() - 0.5)
  for (const o of others) {
    const f = formAt(p, o)
    if (f !== answer && !wrong.includes(f)) wrong.push(f)
    if (wrong.length === 3) break
  }
  const english = autosPrompt(s)
  return {
    id: autosProduceId(ch.number, s, kind),
    prompt: kind === 'english'
      ? <><span className="big">{english}</span><p className="muted">Which form of αὐτός?</p></>
      : <><span className="big">{autosSlotLabel(s)}</span><p className="muted">Which form of αὐτός?</p></>,
    options: shuffle([answer, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer,
    explain: (
      <p>
        {autosSlotLabel(s)}, “{autosEnglish(s)}”: <span className="greek">{answer}</span>.
        {s.number === 'pl' && s.case === 'genitive' && <> The genitive plural is <span className="greek">αὐτῶν</span> in all three genders.</>}
        {s.gender === 'neuter' && s.number === 'sg' && (s.case === 'nominative' || s.case === 'accusative') && <> The neuter has no ν: <span className="greek">αὐτό</span>, not αὐτόν.</>}
      </p>
    ),
    review: <>{kind === 'english' ? `“${english}”` : autosSlotLabel(s)} = <span className="greek">{answer}</span></>,
  }
}

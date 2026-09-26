import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, RuleItem, TisItem } from '../data/types'
import { shuffle } from './progress'

// Questions for chapter 10: the Square of Stops, finding stems, and τίς vs τις.

export type RuleKind = 'stop' | 'stem'

export const ruleItemId = (ch: number, kind: RuleKind, r: RuleItem) => `ch${ch}:${kind}:${r.id}`
export const tisItemId = (ch: number, t: TisItem) => `ch${ch}:tis:${t.id}`

export function ruleItemQuestion(ch: Chapter, kind: RuleKind, r: RuleItem): ChoiceQuestion {
  const ask = kind === 'stop' ? 'What does it become?' : 'What is the stem?'
  return {
    id: ruleItemId(ch.number, kind, r),
    prompt: <><span className="greek big">{r.prompt}</span><p className="muted">{r.gloss && <>“{r.gloss}” · </>}{ask}</p></>,
    options: shuffle(r.options).map((o) => ({ key: o, label: o, greek: true })),
    answer: r.options[0],
    explain: <p>{r.rule}</p>,
    review: <><span className="greek">{r.prompt} → {r.options[0]}</span></>,
  }
}

export const TIS_KINDS = {
  interrogative: {
    label: 'τίς, τί — interrogative “who? what? why?” (accent always on the first syllable)',
    explain: 'The interrogative τίς, τί always has an acute on its first syllable, and it never turns grave.',
  },
  indefinite: {
    label: 'τις, τι — indefinite “someone, anyone, a certain” (enclitic)',
    explain: 'The indefinite τις, τι is enclitic: usually no accent, or one on its last syllable in the longer forms (τινές).',
  },
} as const

const TRAPS = [
  { key: 'trap-first', label: 'τίς — interrogative, because it begins the clause' },
  { key: 'trap-after', label: 'τις — indefinite, because it follows another word' },
]

/** Which is it: the interrogative or the indefinite? The accent decides, not position. */
export function tisQuestion(ch: Chapter, t: TisItem): ChoiceQuestion {
  const at = t.text.indexOf(t.word)
  return {
    id: tisItemId(ch.number, t),
    prompt: (
      <>
        <p className="sentence greek">{t.text.slice(0, at)}<mark>{t.word}</mark>{t.text.slice(at + t.word.length)}</p>
        <p className="muted small">{t.ref}{t.help && <> · <span className="greek">{t.help}</span></>}</p>
        <p className="muted">Which word is highlighted?</p>
      </>
    ),
    options: shuffle([
      { key: 'interrogative', label: TIS_KINDS.interrogative.label },
      { key: 'indefinite', label: TIS_KINDS.indefinite.label },
      ...TRAPS,
    ]),
    answer: t.kind,
    explain: (
      <>
        <p>{TIS_KINDS[t.kind].explain}</p>
        <p className="english">“{t.translation}”</p>
        {t.note && <p>{t.note}</p>}
      </>
    ),
    review: <><span className="greek">{t.text}</span> — <span className="greek">{t.word}</span> is {t.kind}</>,
  }
}

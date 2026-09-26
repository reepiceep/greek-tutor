import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, RelativeFormItem, RelativeItem, RelativeReason } from '../data/types'
import { shuffle } from './progress'

// Questions for chapter 14: the relative pronoun's antecedent, why it has its case, how to translate it,
// and telling it apart from the article.

export const RELATIVE_REASONS: Record<RelativeReason, string> = {
  subject: 'Nominative: it is the subject of its own clause',
  object: 'Accusative: it is the direct object of the verb in its clause',
  preposition: 'The preposition in front of it takes this case',
  possession: 'Genitive: it shows possession (“whose”)',
  indirect: 'Dative: it is the indirect object (“to whom”)',
}

/** The same reasons, phrased to follow “it is in this case because …”. */
const BECAUSE: Record<RelativeReason, string> = {
  subject: 'it is the subject of its own clause',
  object: 'it is the direct object of the verb in its clause',
  preposition: 'the preposition in front of it takes that case',
  possession: 'it shows possession (“whose”)',
  indirect: 'it is the indirect object (“to whom”)',
}

const CASE_TRAP = { key: 'trap', label: 'It copies the case of its antecedent' }

export const relativeItemId = (ch: number, r: RelativeItem, skill: 'antecedent' | 'case' | 'translate') => `ch${ch}:relative:${r.id}:${skill}`
export const relativeFormId = (ch: number, f: RelativeFormItem) => `ch${ch}:rel-form:${f.form}`

const GENDER_SHORT = { masculine: 'masculine', feminine: 'feminine', neuter: 'neuter' } as const

function highlighted(r: RelativeItem) {
  const at = r.text.indexOf(r.word)
  return (
    <>
      <p className="sentence greek">{r.text.slice(0, at)}<mark>{r.word}</mark>{r.text.slice(at + r.word.length)}</p>
      <p className="muted small">{r.ref ?? 'practice phrase'}{r.help && <> · <span className="greek">{r.help}</span></>}</p>
    </>
  )
}

function explain(r: RelativeItem) {
  return (
    <>
      <p>
        <span className="greek">{r.word}</span> is {GENDER_SHORT[r.gender]} {r.number === 'sg' ? 'singular' : 'plural'}, agreeing
        with its antecedent <span className="greek">{r.antecedent}</span>; it is {r.case} because {BECAUSE[r.reason]}.
      </p>
      <p className="english">“{r.translation}”</p>
      {r.note && <p>{r.note}</p>}
    </>
  )
}

export function relativeAntecedentQuestion(ch: Chapter, r: RelativeItem): ChoiceQuestion {
  return {
    id: relativeItemId(ch.number, r, 'antecedent'),
    prompt: <>{highlighted(r)}<p className="muted">What is the antecedent of the highlighted relative pronoun?</p></>,
    options: shuffle([r.antecedent, ...r.others]).map((w) => ({ key: w, label: w, greek: true })),
    answer: r.antecedent,
    explain: explain(r),
    review: <><span className="greek">{r.word}</span> ({r.ref ?? r.text}) refers to <span className="greek">{r.antecedent}</span></>,
  }
}

/** Why this case? The trap is the most common mistake: assuming it copies the antecedent's case. */
export function relativeCaseQuestion(ch: Chapter, r: RelativeItem): ChoiceQuestion {
  const others = shuffle((Object.keys(RELATIVE_REASONS) as RelativeReason[]).filter((k) => k !== r.reason)).slice(0, 2)
  return {
    id: relativeItemId(ch.number, r, 'case'),
    prompt: <>{highlighted(r)}<p className="muted">The highlighted pronoun is {r.case}. Why?</p></>,
    options: shuffle([...[r.reason, ...others].map((k): { key: string; label: string } => ({ key: k, label: RELATIVE_REASONS[k] })), CASE_TRAP]),
    answer: r.reason,
    explain: explain(r),
    review: <><span className="greek">{r.word}</span> ({r.ref ?? r.text}): {RELATIVE_REASONS[r.reason]}</>,
  }
}

export function relativeTranslateQuestion(ch: Chapter, r: RelativeItem): ChoiceQuestion {
  return {
    id: relativeItemId(ch.number, r, 'translate'),
    prompt: <>{highlighted(r)}<p className="muted">How should the highlighted pronoun be translated?</p></>,
    options: shuffle([r.english, ...r.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: r.english,
    explain: explain(r),
    review: <><span className="greek">{r.word}</span> ({r.ref ?? r.text}) = “{r.english}”</>,
  }
}

const FORM_KINDS = {
  article: 'The article (“the”)',
  relative: 'The relative pronoun (“who, which”)',
  other: 'Another word (ἤ “or,” οὐ “not”)',
} as const

export function relativeFormQuestion(ch: Chapter, f: RelativeFormItem): ChoiceQuestion {
  return {
    id: relativeFormId(ch.number, f),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">Which word is this?</p></>,
    options: (Object.keys(FORM_KINDS) as (keyof typeof FORM_KINDS)[]).map((k) => ({ key: k, label: FORM_KINDS[k] })),
    answer: f.kind,
    explain: <p>{f.note}</p>,
    review: <><span className="greek">{f.form}</span>: {FORM_KINDS[f.kind].toLowerCase()}</>,
  }
}

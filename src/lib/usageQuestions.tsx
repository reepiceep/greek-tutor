import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, UseItem } from '../data/types'
import { shuffle } from './progress'

// Shared builders for "how is this word used here?" drills (αὐτός, demonstratives): classify with a reason, or translate.

export interface UsageConfig<U extends string> {
  /** Progress id prefix, e.g. "autos". */
  prefix: string
  /** Question shown under the text. */
  ask: string
  rules: Record<U, { label: string; explain: string }>
  /** Plausible wrong reasons, usually word order. */
  traps: { key: string; label: string }[]
}

export const usageItemId = (ch: number, prefix: string, item: { id: string }, skill: 'use' | 'translate') =>
  `ch${ch}:${prefix}:${item.id}:${skill}`

function highlighted<U extends string>(item: UseItem<U>) {
  const at = item.text.indexOf(item.word)
  return (
    <>
      <p className="sentence greek">{item.text.slice(0, at)}<mark>{item.word}</mark>{item.text.slice(at + item.word.length)}</p>
      <p className="muted small">{item.ref ?? 'practice phrase'}{item.help && <> · <span className="greek">{item.help}</span></>}</p>
    </>
  )
}

function explain<U extends string>(cfg: UsageConfig<U>, item: UseItem<U>) {
  return (
    <>
      <p>{cfg.rules[item.use].explain}</p>
      <p className="english">“{item.translation}”</p>
      {item.note && <p>{item.note}</p>}
    </>
  )
}

export function usageQuestion<U extends string>(ch: Chapter, cfg: UsageConfig<U>, item: UseItem<U>): ChoiceQuestion {
  const uses = Object.keys(cfg.rules) as U[]
  return {
    id: usageItemId(ch.number, cfg.prefix, item, 'use'),
    prompt: <>{highlighted(item)}<p className="muted">{cfg.ask}</p></>,
    options: shuffle([...uses.map((u) => ({ key: u, label: cfg.rules[u].label })), ...cfg.traps]),
    answer: item.use,
    explain: explain(cfg, item),
    review: <><span className="greek">{item.text}</span> — <span className="greek">{item.word}</span> is {item.use}</>,
  }
}

export function usageTranslateQuestion<U extends string>(ch: Chapter, cfg: UsageConfig<U>, item: UseItem<U>): ChoiceQuestion {
  return {
    id: usageItemId(ch.number, cfg.prefix, item, 'translate'),
    prompt: <>{highlighted(item)}<p className="muted">How should the highlighted word be translated?</p></>,
    options: shuffle([item.english, ...item.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: item.english,
    explain: explain(cfg, item),
    review: <><span className="greek">{item.word}</span> ({item.ref ?? item.text}) = “{item.english}”</>,
  }
}

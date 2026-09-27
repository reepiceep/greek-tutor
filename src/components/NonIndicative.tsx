import { useState } from 'react'
import type { Chapter, DidomiForm } from '../data/types'
import {
  CONDITION_CLASSES, conditionId, conditionQuestion, conditionTranslateQuestion, didomiBuildQuestion, didomiFormId, didomiParseQuestion,
  didomiVerseId, didomiVerseQuestion,
} from '../lib/nonindicativeQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'forms' | 'verses' | 'conditions'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'forms', label: 'Forms' },
  { tab: 'verses', label: 'δίδωμι in verses' },
  { tab: 'conditions', label: 'Conditional sentences' },
]

const MOOD_TITLE: Record<DidomiForm['mood'], string> = { subjunctive: 'Subjunctive', imperative: 'Imperative', infinitive: 'Infinitive', participle: 'Participle' }

export function NonIndicative({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>δίδωμι outside the indicative; “if”</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <NonIndicativeLesson chapter={chapter} />}
      {tab !== 'lesson' && <Drill key={key} chapter={chapter} onRestart={restart} tab={tab} />}
    </section>
  )
}

function NonIndicativeLesson({ chapter }: { chapter: Chapter }) {
  const forms = chapter.nonindicative?.forms ?? []
  const moods = [...new Set(forms.map((f) => f.mood))]
  return (
    <>
      <Lesson title="δίδωμι in the other moods">
        <p>
          The rules of chapter 34 carry on. The <strong>present</strong> keeps the reduplication (<span className="greek">διδ-</span>); the
          <strong> aorist</strong> is the bare root <span className="greek">*δο</span> with no κα outside the indicative. There is no connecting vowel, so
          the stem vowel meets the ending directly: in the subjunctive it contracts (<span className="greek">δῶ, δῷς, δῷ</span>).
        </p>
        <ul>
          <li>Subjunctive: <span className="greek">διδῶ</span> (present), <span className="greek">δῶ</span> (aorist).</li>
          <li>Imperative: <span className="greek">δίδου, διδότω</span>; aorist <span className="greek">δός, δότω, δότε, δότωσαν</span>.</li>
          <li>Infinitive: <span className="greek">διδόναι, δοῦναι</span>; passive <span className="greek">δοθῆναι</span>.</li>
          <li>Participle: <span className="greek">διδούς, διδοῦσα, διδόν</span> (<span className="greek">διδόντος</span>); aorist <span className="greek">δούς, δοῦσα, δόν</span> (<span className="greek">δόντος</span>).</li>
        </ul>
      </Lesson>
      <Lesson title="Conditional sentences">
        <p>An “if” clause (the <strong>protasis</strong>) and a “then” clause (the <strong>apodosis</strong>). The “if” clause’s form tells you how the speaker sees it:</p>
        <ul>
          {(Object.keys(CONDITION_CLASSES) as (keyof typeof CONDITION_CLASSES)[]).map((c) => <li key={c}>{CONDITION_CLASSES[c].label}.</li>)}
        </ul>
        <p className="muted">A first class condition is not necessarily true: the speaker only assumes it for the argument (1 Cor 15:13). There is also a fourth class, εἰ + optative, but the New Testament never has a complete one.</p>
      </Lesson>
      <div className="adj-tables">
        {moods.map((m) => (
          <table key={m} className="reference endings-table">
            <thead><tr><th colSpan={2}>{MOOD_TITLE[m]}</th></tr></thead>
            <tbody>
              {forms.filter((f) => f.mood === m).map((f) => <tr key={f.id}><th>{f.parse.replace(/ (subj|impv|inf|ptc)/, '')}</th><td className="greek">{f.form}</td></tr>)}
            </tbody>
          </table>
        ))}
      </div>
    </>
  )
}

function Drill({ chapter, onRestart, tab }: { chapter: Chapter; onRestart: () => void; tab: Exclude<Tab, 'lesson'> }) {
  const [questions] = useState(() => {
    const ni = chapter.nonindicative
    if (!ni) return []
    const pool = tab === 'forms'
      ? ni.forms.flatMap((f) => [
          { id: didomiFormId(chapter.number, f, 'parse'), make: () => didomiParseQuestion(chapter, f) },
          { id: didomiFormId(chapter.number, f, 'build'), make: () => didomiBuildQuestion(chapter, f) },
        ])
      : tab === 'verses'
        ? ni.verses.map((v) => ({ id: didomiVerseId(chapter.number, v), make: () => didomiVerseQuestion(chapter, v) }))
        : ni.conditions.flatMap((c) => [
            { id: conditionId(chapter.number, c, 'use'), make: () => conditionQuestion(chapter, c) },
            { id: conditionId(chapter.number, c, 'translate'), make: () => conditionTranslateQuestion(chapter, c) },
          ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      {tab === 'conditions' && <p className="muted">Look at the “if”: εἰ or ἐάν? Then the verb: indicative or subjunctive? Is there an ἄν in the “then” clause?</p>}
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout={tab === 'forms' ? 'grid' : 'list'} />
    </>
  )
}

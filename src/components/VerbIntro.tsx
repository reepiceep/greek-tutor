import { useState } from 'react'
import type { Chapter } from '../data/types'
import { pickWeakest } from '../lib/progress'
import {
  type VerbPart, askableProperties, englishItemId, englishVerbQuestion, partsItemId, termDefineQuestion, termItemId, termNameQuestion,
  verbPartQuestion,
} from '../lib/verbIntroQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'terms' | 'english' | 'parts'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'terms', label: 'Terms' },
  { tab: 'english', label: 'English verbs' },
  { tab: 'parts', label: 'Parts of a verb' },
]

export function VerbIntro({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Introduction to verbs</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <VerbLesson chapter={chapter} />}
      {tab === 'terms' && <Terms key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'english' && <English key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'parts' && <Parts key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function VerbLesson({ chapter }: { chapter: Chapter }) {
  const v = chapter.verbIntro
  if (!v) return null
  return (
    <>
      <Lesson title="How Greek verbs work">
        <p>
          A Greek verb packs a lot into one word. <span className="greek">λύομεν</span> means “we loose”: the ending
          <span className="greek"> -μεν</span> already tells you the subject is “we,” so Greek often needs no separate pronoun.
        </p>
        <ul>
          <li><strong>Person and number</strong> tell you who the subject is; the verb <strong>agrees</strong> with its subject.</li>
          <li>
            A Greek <strong>tense</strong> carries <strong>aspect</strong>, how the action is pictured: <em>continuous</em> (ongoing,
            “I am studying”), <em>undefined</em> (simply as a whole, “I studied”), or <em>perfective</em> (completed with lasting
            results, “I have studied”). In the indicative it also shows <strong>time</strong>: past, present or future.
          </li>
          <li><strong>Voice</strong>: the subject does the action (active), receives it (passive), or acts for itself (middle).</li>
          <li><strong>Mood</strong>: a statement (indicative), a possibility (subjunctive), or a command (imperative).</li>
          <li>
            A verb is built from a <strong>stem</strong> (its meaning), a <strong>connecting vowel</strong> (ο or ε), and a
            <strong> personal ending</strong> (person and number): <span className="greek">λυ + ο + μεν</span>.
          </li>
          <li>To <strong>parse</strong> a verb, give its tense, voice, mood, person, number, lexical form and meaning.</li>
        </ul>
      </Lesson>
      <table className="reference terms-table">
        <tbody>
          {v.terms.map((t) => (
            <tr key={t.term}>
              <th>{t.term}</th>
              <td>{t.definition}{t.example && <div className="muted small">e.g. <span className="greek">{t.example}</span></div>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Terms({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const terms = chapter.verbIntro?.terms ?? []
    const pool = terms.flatMap((t) => [
      { id: termItemId(chapter.number, t, 'name'), make: () => termNameQuestion(chapter, t, terms) },
      { id: termItemId(chapter.number, t, 'define'), make: () => termDefineQuestion(chapter, t, terms) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} />
}

function English({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.verbIntro?.english ?? []
    const pool = items.flatMap((e) => askableProperties(e).map((prop) => ({
      id: englishItemId(chapter.number, e, prop), make: () => englishVerbQuestion(chapter, e, prop),
    })))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Mounce starts with English: if you can describe an English verb, the Greek terms will make sense.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Parts({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const parts = chapter.verbIntro?.parts ?? []
    const pool = parts.flatMap((p) => (['stem', 'vowel', 'ending', 'subject'] as VerbPart[]).map((part) => ({
      id: partsItemId(chapter.number, p, part), make: () => verbPartQuestion(chapter, p, part),
    })))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">A preview of chapter 16: split each verb into stem + connecting vowel + personal ending.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

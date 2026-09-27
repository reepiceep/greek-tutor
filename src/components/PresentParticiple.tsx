import { useState } from 'react'
import type { Chapter } from '../data/types'
import { distinctForms, slotsOf } from '../lib/declensionQuestions'
import {
  participleBuildId, participleBuildQuestion, participleCharts, participleParadigm, participleParseId, participleParseQuestion,
  participleVerseId, participleVerseParseQuestion, participleVerseTranslateQuestion,
} from '../lib/participleQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { DeclensionTable } from './DeclensionTable'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'parse' | 'build' | 'verses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'build', label: 'Build the form' },
  { tab: 'verses', label: 'In verses' },
]

export function PresentParticiple({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Present participles</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <ParticipleLesson chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'build' && <Build key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function ParticipleLesson({ chapter }: { chapter: Chapter }) {
  const pt = chapter.participles
  if (!pt) return null
  const lyo = pt.verbs.find((v) => v.id === 'lyo')!
  return (
    <>
      <Lesson title="The present adverbial participle">
        <p>
          An <strong>adverbial</strong> participle adds something about the action of the main verb. It has no article before it.
          The present participle has continuous aspect, and its action happens <strong>while</strong> the main verb’s action does:
          <span className="greek"> ἀναβαίνων ὁ Ἰησοῦς … παρέλαβεν</span>, “<em>while</em> Jesus was going up, he took…”
        </p>
        <ul>
          <li>
            It <strong>agrees</strong> with the word doing its action, usually the subject of the main verb, so it is usually nominative.
            That subject can be only in the verb’s ending: <span className="greek">ἦλθον … βαπτίζων</span>, “I came baptizing.”
          </li>
          <li>
            <strong>Active:</strong> stem + <span className="greek">ο + ντ</span> + third-declension endings. The feminine takes first-declension
            endings (<span className="greek">ο + ντ + σα → ουσα</span>). Learn <span className="greek">λύων, λύοντος · λύουσα, λυούσης · λῦον, λύοντος</span>.
          </li>
          <li>
            <strong>Middle/passive:</strong> stem + <span className="greek">ο + μενο/η</span> + the endings of <span className="greek">ἀγαθός</span>:
            <span className="greek"> λυόμενος, λυομένη, λυόμενον</span>, “being loosed.” A middle-only verb has an active meaning:
            <span className="greek"> ἐρχόμενος</span>, “coming.” <span className="greek">κάθημαι</span> has no connecting vowel: <span className="greek">καθήμενος</span>.
          </li>
          <li><span className="greek">εἰμί</span>’s participle is the active endings with no stem: <span className="greek">ὤν, οὖσα, ὄν</span>, “being.”</li>
          <li>
            Watch the dative plural: <span className="greek">λύουσι(ν)</span> looks just like the 3rd plural “they loose.” Contract verbs contract as
            usual: <span className="greek">ποιῶν, ποιοῦσα, ποιοῦν</span>. A participle is negated with <span className="greek">μή</span>.
          </li>
        </ul>
      </Lesson>
      <table className="reference terms-table">
        <thead><tr><th /><th>Active</th><th>Middle/passive</th></tr></thead>
        <tbody>
          <tr>
            <th>Present</th>
            <td><span className="greek">ο + ντ</span> · 3-1-3 · <span className="greek">λύων, λύουσα, λῦον</span></td>
            <td><span className="greek">ο + μενο/η</span> · 2-1-2 · <span className="greek">λυόμενος, -η, -ον</span></td>
          </tr>
        </tbody>
      </table>
      <div className="adj-tables">
        <DeclensionTable p={participleParadigm(lyo, 'active')} />
        <DeclensionTable p={participleParadigm(lyo, 'middle/passive')} />
        <DeclensionTable p={pt.eimi} />
      </div>
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = participleCharts(chapter).flatMap((c) => distinctForms(c.p).map((form) => ({
      id: participleParseId(chapter.number, c, form), make: () => participleParseQuestion(chapter, c, form),
    })))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Build({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = participleCharts(chapter).flatMap((c) => slotsOf(c.p).map((s) => ({
      id: participleBuildId(chapter.number, c, s), make: () => participleBuildQuestion(chapter, c, s),
    })))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.participles?.verses ?? []).flatMap((v) => [
      { id: participleVerseId(chapter.number, v, 'parse'), make: () => participleVerseParseQuestion(chapter, v) },
      ...(v.wrong?.length ? [{ id: participleVerseId(chapter.number, v, 'translate'), make: () => participleVerseTranslateQuestion(chapter, v) }] : []),
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Find the word the participle agrees with (same case, number and gender); that is who is doing it. Then translate it with “while.”</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

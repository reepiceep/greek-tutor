import { useState } from 'react'
import type { Chapter, TopicView } from '../data/types'
import { distinctForms, slotsOf } from '../lib/declensionQuestions'
import {
  participleBuildId, participleBuildQuestion, participleCharts, participleParadigm, participleParseId, participleParseQuestion,
  participleTenseId, participleTenseQuestion, participleVerseId, participleVerseParseQuestion, participleVerseTranslateQuestion, tenseChoices,
} from '../lib/participleQuestions'
import { pickWeakest } from '../lib/progress'
import { TOPIC_META } from '../lib/views'
import { ChoiceQuiz } from './ChoiceQuiz'
import { DeclensionTable } from './DeclensionTable'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'parse' | 'build' | 'tense' | 'verses'

const TABS: { tab: Tab; label: string; aoristOnly?: boolean }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'build', label: 'Build the form' },
  { tab: 'tense', label: 'Present or aorist?', aoristOnly: true },
  { tab: 'verses', label: 'In verses' },
]

/** Chapters 27 (present) and 28 (aorist) adverbial participles: the same drills on different charts. */
export function Participles({ chapter, view }: { chapter: Chapter; view: TopicView }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`
  const aorist = view === 'ptcAorist'

  return (
    <section>
      <div className="toolbar">
        <h2>{TOPIC_META[view].nav}</h2>
        <div className="seg">
          {TABS.filter((t) => aorist || !t.aoristOnly).map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && (aorist ? <AoristLesson chapter={chapter} /> : <PresentLesson chapter={chapter} />)}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'build' && <Build key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'tense' && <Tense key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} aorist={aorist} />}
    </section>
  )
}

function PresentLesson({ chapter }: { chapter: Chapter }) {
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
        {pt.eimi && <DeclensionTable p={pt.eimi} />}
      </div>
    </>
  )
}

function AoristLesson({ chapter }: { chapter: Chapter }) {
  const pt = chapter.participles
  if (!pt) return null
  const verb = (id: string) => pt.verbs.find((v) => v.id === id)!
  return (
    <>
      <Lesson title="The aorist adverbial participle">
        <p>
          The aorist participle has undefined aspect: it views the action as a whole. As an adverbial participle it usually happened
          <strong> before</strong> the main verb: <span className="greek">ἀκούσας δὲ ὁ βασιλεὺς ἐταράχθη</span>, “<em>after</em> the king heard (<em>when</em> he heard),
          he was troubled.” “Having heard” is literal; often a second main verb reads best: “he called them <em>and</em> asked.”
        </p>
        <ul>
          <li>There is <strong>no augment</strong>: the augment belongs to the indicative. <span className="greek">ἔλυσα</span> but <span className="greek">λύσας</span>.</li>
          <li>
            <strong>First aorist active:</strong> <span className="greek">σα + ντ</span> + endings: <span className="greek">λύσας, λύσαντος · λύσασα, λυσάσης · λῦσαν, λύσαντος</span>.
            Liquid aorists have no σ: <span className="greek">σπείρας, ἀποστείλας</span>. <strong>Middle:</strong> <span className="greek">σα + μενο/η</span>, <span className="greek">λυσάμενος</span>.
          </li>
          <li>
            <strong>Second aorist:</strong> the present’s endings on the aorist stem, accented on the ending:
            <span className="greek"> λαβών, λαβοῦσα, λαβόν</span>; <span className="greek">ἐλθών, εἰπών, ἰδών, γενόμενος</span>. Only the stem tells
            <span className="greek"> λαβών</span> from <span className="greek">λαμβάνων</span>.
          </li>
          <li>
            <strong>Aorist passive:</strong> <span className="greek">θε + ντ</span>: <span className="greek">λυθείς, λυθέντος · λυθεῖσα, λυθείσης · λυθέν, λυθέντος</span>.
            Deponents like <span className="greek">ἀποκριθείς</span> have an active meaning: “answering.”
          </li>
        </ul>
      </Lesson>
      <table className="reference terms-table">
        <thead><tr><th /><th>Active</th><th>Middle</th><th>Passive</th></tr></thead>
        <tbody>
          <tr><th>Present</th><td className="greek">ο + ντ · λύων</td><td className="greek" colSpan={2}>ο + μενο/η · λυόμενος</td></tr>
          <tr><th>1st aorist</th><td className="greek">σα + ντ · λύσας</td><td className="greek">σα + μενο/η · λυσάμενος</td><td className="greek" rowSpan={2}>θε + ντ · λυθείς</td></tr>
          <tr><th>2nd aorist</th><td className="greek">ο + ντ · λαβών</td><td className="greek">ο + μενο/η · γενόμενος</td></tr>
        </tbody>
      </table>
      <div className="adj-tables">
        <DeclensionTable p={participleParadigm(verb('lyo'), 'active')} />
        <DeclensionTable p={participleParadigm(verb('lambano'), 'active')} />
        <DeclensionTable p={participleParadigm(verb('lyo'), 'passive')} />
        <DeclensionTable p={participleParadigm(verb('lyo'), 'middle')} />
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

function Tense({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = tenseChoices(chapter).map(({ c, form }) => ({
      id: participleTenseId(chapter.number, c, form), make: () => participleTenseQuestion(chapter, c, form),
    }))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">A present participle uses the present stem (<span className="greek">λαμβάνων</span>); an aorist uses the aorist stem, with σα or θε, and no augment (<span className="greek">λαβών, λύσας, λυθείς</span>).</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

function Verses({ chapter, onRestart, aorist }: QuizProps & { aorist: boolean }) {
  const [questions] = useState(() => {
    const pool = (chapter.participles?.verses ?? []).flatMap((v) => [
      { id: participleVerseId(chapter.number, v, 'parse'), make: () => participleVerseParseQuestion(chapter, v) },
      ...(v.wrong?.length ? [{ id: participleVerseId(chapter.number, v, 'translate'), make: () => participleVerseTranslateQuestion(chapter, v) }] : []),
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Find the word the participle agrees with (same case, number and gender); that is who is doing it. Then translate it: {aorist ? '“after …,” “having …”' : '“while …”'}.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

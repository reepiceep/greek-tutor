import { useState } from 'react'
import type { Chapter } from '../data/types'
import { AUTOS_USES, autosItemId, autosTranslateQuestion, autosUseQuestion } from '../lib/autosQuestions'
import { adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'uses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'uses', label: 'Uses' },
]

export function Autos({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2 className="greek">αὐτός</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function Forms({ chapter }: { chapter: Chapter }) {
  const a = chapter.autos
  if (!a) return null
  return (
    <>
      <Lesson title="The three uses of αὐτός">
        <p>
          <span className="greek">αὐτός</span> declines like <span className="greek">ἀγαθός</span>, except that the neuter
          nominative and accusative singular is <span className="greek">αὐτό</span> (no ν). How you translate it depends on where
          it stands relative to the article:
        </p>
        <ol>
          <li><strong>{AUTOS_USES.pronoun.label}.</strong> <span className="greek">λέγω αὐτῷ</span>, “I say to him”; <span className="greek">τὸ ὄνομα αὐτοῦ</span>, “his name.” It agrees in number and gender with the word it refers to, so feminine <span className="greek">αὐτάς</span> referring to “commandments” is just “them.”</li>
          <li><strong>{AUTOS_USES.intensive.label}.</strong> <span className="greek">αὐτὸς ὁ κύριος</span> or <span className="greek">ὁ κύριος αὐτός</span>, “the Lord himself.”</li>
          <li><strong>{AUTOS_USES.identical.label}.</strong> <span className="greek">ὁ αὐτὸς κύριος</span>, “the same Lord”; <span className="greek">τὸ αὐτό</span>, “the same thing.”</li>
        </ol>
        <p>In the nominative, <span className="greek">αὐτός</span> on its own is usually emphatic: <span className="greek">αὐτὸς γὰρ σώσει</span>, “for he (himself) will save.”</p>
      </Lesson>
      <div className="adj-tables">
        <DeclensionTable p={a.paradigm} />
        {a.nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}
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
    const a = chapter.autos!
    const pool = [a.paradigm, ...a.nouns].flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Forms of αὐτός, plus the new third-declension nouns αἰών and πούς.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.autos?.items ?? []
    const pool = items.flatMap((a) => [
      { id: autosItemId(chapter.number, a, 'use'), make: () => autosUseQuestion(chapter, a) },
      { id: autosItemId(chapter.number, a, 'translate'), make: () => autosTranslateQuestion(chapter, a) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Look at the article: right before αὐτός means “same”; on the noun only means “-self”; no noun means “he, she, it.”</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

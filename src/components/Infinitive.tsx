import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  INFINITIVE_USES, KINDS, KIND_LABEL, infinitive, infinitiveBuildQuestion, infinitiveItemId, infinitivePairs, infinitiveParseQuestion,
  infinitiveTranslateQuestion, infinitiveUseId, infinitiveUseQuestion, infinitiveVerseParseId, infinitiveVerseParseQuestion,
} from '../lib/infinitiveQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'parse' | 'build' | 'use' | 'translate' | 'verses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'build', label: 'Build the form' },
  { tab: 'use', label: 'How is it used?' },
  { tab: 'translate', label: 'Translate' },
  { tab: 'verses', label: 'In verses' },
]

export function Infinitive({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Infinitive</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <InfinitiveLesson chapter={chapter} />}
      {tab !== 'lesson' && <Drill key={key} chapter={chapter} onRestart={restart} tab={tab} />}
    </section>
  )
}

function InfinitiveLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.infinitives?.verbs ?? []
  const lyo = verbs.find((v) => v.id === 'lyo')
  const lambano = verbs.find((v) => v.id === 'lambano')
  const ginomai = verbs.find((v) => v.id === 'ginomai')
  if (!lyo || !lambano || !ginomai) return null
  const cell = (form: string) => <td className="greek">{form}</td>
  return (
    <>
      <Lesson title="The infinitive">
        <p>
          The infinitive is a <strong>verbal noun</strong>: “to loose.” It has tense (aspect only: present continuous, aorist
          undefined, perfect completed) and voice, but no person or number. Its endings are fixed, so learn them as they stand.
        </p>
        <ul>
          <li>Present <span className="greek">ειν, εσθαι</span>; first aorist <span className="greek">σαι, σασθαι</span>, and <span className="greek">θῆναι</span> in the passive; perfect <span className="greek">κέναι, σθαι</span>.</li>
          <li>The aorist has <strong>no augment</strong>. A second aorist takes the present’s endings, accented: <span className="greek">λαβεῖν, γενέσθαι</span>. Contract verbs contract: <span className="greek">ποιεῖν, ὁρᾶν, πληροῦν</span>. <span className="greek">εἰμί</span>: <span className="greek">εἶναι</span>.</li>
          <li>An infinitive can have its own “subject,” in the <strong>accusative</strong>: <span className="greek">ὥστε τὸν κωφὸν λαλεῖν</span>, “so that the mute man spoke.” It is negated with <span className="greek">μή</span>.</li>
          {(Object.keys(INFINITIVE_USES) as (keyof typeof INFINITIVE_USES)[]).map((u) => (
            <li key={u}><strong>{INFINITIVE_USES[u].label.split(' — ')[0]}</strong>: {INFINITIVE_USES[u].explain}</li>
          ))}
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th className="greek">λύω</th><th className="greek">λαμβάνω</th><th className="greek">γίνομαι</th></tr></thead>
        <tbody>
          {KINDS.map((k) => (
            <tr key={k}>
              <th>{KIND_LABEL[k].replace(' inf', '')}</th>
              {cell(infinitive(lyo, k))}
              {lambano.kinds.includes(k) ? cell(infinitive(lambano, k)) : <td className="muted">—</td>}
              {ginomai.kinds.includes(k) ? cell(infinitive(ginomai, k)) : <td className="muted">—</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function Drill({ chapter, onRestart, tab }: { chapter: Chapter; onRestart: () => void; tab: Exclude<Tab, 'lesson'> }) {
  const [questions] = useState(() => {
    const items = chapter.infinitives?.items ?? []
    const pool = tab === 'parse' || tab === 'build'
      ? infinitivePairs(chapter).map(({ v, kind }) => ({
          id: infinitiveItemId(chapter.number, v, kind, tab),
          make: () => (tab === 'parse' ? infinitiveParseQuestion(chapter, v, kind) : infinitiveBuildQuestion(chapter, v, kind)),
        }))
      : items.map((it) => tab === 'use'
        ? { id: infinitiveUseId(chapter.number, it, 'use'), make: () => infinitiveUseQuestion(chapter, it) }
        : tab === 'translate'
          ? { id: infinitiveUseId(chapter.number, it, 'translate'), make: () => infinitiveTranslateQuestion(chapter, it) }
          : { id: infinitiveVerseParseId(chapter.number, it), make: () => infinitiveVerseParseQuestion(chapter, it) })
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      {tab === 'use' && <p className="muted">Look before the infinitive: a verb like δύναμαι or θέλω, ὥστε, the article with a preposition (ἐν τῷ, πρὸ τοῦ, μετὰ τό, διὰ τό, εἰς τό), or the article alone?</p>}
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout={tab === 'parse' || tab === 'build' ? 'grid' : 'list'} />
    </>
  )
}

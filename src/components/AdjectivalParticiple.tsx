import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  PARTICIPLE_USES, participleUseId, participleUseQuestion, participleUseTranslateQuestion,
} from '../lib/adjectivalParticipleQuestions'
import { participleVerseId, participleVerseParseQuestion } from '../lib/participleQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'use' | 'translate' | 'parse'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'use', label: 'How is it used?' },
  { tab: 'translate', label: 'Translate' },
  { tab: 'parse', label: 'Parse' },
]

export function AdjectivalParticiple({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Adjectival participles</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <AdjectivalLesson />}
      {tab === 'use' && <Drill key={key} chapter={chapter} onRestart={restart} kind="use" />}
      {tab === 'translate' && <Drill key={key} chapter={chapter} onRestart={restart} kind="translate" />}
      {tab === 'parse' && <Drill key={key} chapter={chapter} onRestart={restart} kind="parse" />}
    </section>
  )
}

function AdjectivalLesson() {
  return (
    <>
      <Lesson title="The participle as an adjective">
        <p>
          A participle is a verbal adjective, so it can do what an adjective does. The <strong>article</strong> is the clue: with
          no article a participle is usually adverbial (chapters 27–28); with the article it is adjectival.
        </p>
        <ul>
          <li>
            <strong>{PARTICIPLE_USES.attributive.label.split(' — ')[0]}:</strong> it describes a noun and agrees with it, in either
            attributive position: <span className="greek">ὁ πατὴρ ὁ πέμψας με</span>, “the Father who sent me”;
            <span className="greek"> ἡ ἐρχομένη βασιλεία</span>, “the coming kingdom.” A relative clause (“who …,” “which …”) usually reads best.
          </li>
          <li>
            <strong>{PARTICIPLE_USES.substantival.label.split(' — ')[0]}:</strong> with no noun, it is the noun:
            <span className="greek"> ὁ πιστεύων</span>, “the one who believes”; <span className="greek">οἱ ἀκούσαντες</span>, “those who heard”;
            <span className="greek"> ἡ πιστεύσασα</span>, “she who believed.” Its gender and number supply “he,” “she,” “those,” “what.”
          </li>
          <li>
            <strong>Aspect</strong> still counts: a present is continuous, “the one who believes (keeps believing)”; an aorist is
            undefined, and usually past from the writer’s point of view: <span className="greek">ὁ πέμψας με</span>, “the one who sent me.”
          </li>
          <li>
            One article can cover two participles: <span className="greek">ὁ πιστεύσας καὶ βαπτισθείς</span>, “the one who believed and was baptized.”
            A participle is negated with <span className="greek">μή</span>: <span className="greek">τὸν μὴ ἐσθίοντα</span>.
          </li>
        </ul>
      </Lesson>
      <table className="reference terms-table">
        <thead><tr><th>Use</th><th>Clue</th><th>Example</th></tr></thead>
        <tbody>
          <tr><th>Adverbial</th><td>no article</td><td><span className="greek">ἀκούσας ὁ βασιλεὺς ἐταράχθη</span> — “when the king heard, he was troubled”</td></tr>
          <tr><th>Attributive</th><td>article + noun</td><td><span className="greek">ὁ πατὴρ ὁ πέμψας με</span> — “the Father who sent me”</td></tr>
          <tr><th>Substantival</th><td>article, no noun</td><td><span className="greek">ὁ ἔχων ὦτα</span> — “the one who has ears”</td></tr>
        </tbody>
      </table>
    </>
  )
}

function Drill({ chapter, onRestart, kind }: { chapter: Chapter; onRestart: () => void; kind: 'use' | 'translate' | 'parse' }) {
  const [questions] = useState(() => {
    const items = chapter.participleUses ?? []
    const pool = items.map((u) => kind === 'parse'
      ? { id: participleVerseId(chapter.number, u, 'parse'), make: () => participleVerseParseQuestion(chapter, u) }
      : kind === 'use'
        ? { id: participleUseId(chapter.number, u, 'use'), make: () => participleUseQuestion(chapter, u) }
        : { id: participleUseId(chapter.number, u, 'translate'), make: () => participleUseTranslateQuestion(chapter, u) })
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      {kind === 'use' && <p className="muted">Look just before the participle: is there an article agreeing with it? Then look for a noun it describes.</p>}
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout={kind === 'parse' ? 'grid' : 'list'} />
    </>
  )
}

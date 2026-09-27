import { useState } from 'react'
import type { Chapter } from '../data/types'
import { PARTICIPLE_AREAS, participleItemId, participleQuestion, type ParticipleArea } from '../lib/participleIntroQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | ParticipleArea

export function ParticipleIntro({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((n) => n + 1)
  const section = chapter.participleIntro!

  return (
    <section>
      <div className="toolbar">
        <h2>Introduction to participles</h2>
        <div className="seg">
          <button className={tab === 'lesson' ? 'on' : ''} onClick={() => setTab('lesson')}>Lesson</button>
          {PARTICIPLE_AREAS.map((area) => (
            <button key={area.key} className={tab === area.key ? 'on' : ''} onClick={() => setTab(area.key)}>{area.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' ? (
        <>
          <Lesson title="A participle is a verbal adjective">
            <p>An English participle can describe someone while retaining an action: “the <strong>walking</strong> student,” “the <strong>broken</strong> jar.” An -ing word used as a noun is a gerund, not a participle: “<strong>Swimming</strong> is hard.” Greek participles combine the same two sides.</p>
            <ul>
              <li><strong>Verbal side:</strong> the stem carries meaning; the tense form primarily conveys <strong>aspect</strong>, and the form has active, middle, or passive <strong>voice</strong>.</li>
              <li><strong>Adjectival side:</strong> a participle has <strong>case, gender, and number</strong>. It agrees in these with the noun or pronoun it describes.</li>
              <li>A participle has <strong>no person or personal ending</strong>. Its tense name alone does not set absolute time; read the context and main verb.</li>
              <li>Its common pattern is <strong>verb stem + participle marker + case ending</strong>, sometimes with a connecting vowel. The active marker is <span className="greek">ντ</span>, the middle/passive <span className="greek">μενο/η</span>: <span className="greek">λυ + ο + ντ + ες → λύοντες</span>, <span className="greek">λυ + ο + μενο + ς → λυόμενος</span>.</li>
              <li>An <strong>adverbial</strong> participle adds a circumstance to the main verb: “<strong>Reading</strong> the letter, Maria smiled.” An <strong>adjectival</strong> participle describes a noun or pronoun: “the man <strong>speaking</strong> to Paul.”</li>
            </ul>
          </Lesson>
          <table className="reference terms-table">
            <thead><tr><th>Form</th><th>Aspect in view</th><th>Full forms</th></tr></thead>
            <tbody>
              <tr><th>Present</th><td>Continuous: action pictured as ongoing</td><td>Chapter 27</td></tr>
              <tr><th>Aorist</th><td>Undefined: action viewed simply as a whole</td><td>Chapter 28</td></tr>
              <tr><th>Perfect</th><td>Perfective: completed action with continuing results</td><td>Chapter 30</td></tr>
            </tbody>
          </table>
          <p className="muted">Chapters 27–30 teach the full participle forms and their uses. Here, practise the grammar that makes those forms readable.</p>
        </>
      ) : (
        <ParticiplePractice key={`${tab}-${round}`} chapter={chapter} area={tab} items={section[tab]} onRestart={restart} />
      )}
    </section>
  )
}

function ParticiplePractice({ chapter, area, items, onRestart }: {
  chapter: Chapter
  area: ParticipleArea
  items: NonNullable<Chapter['participleIntro']>[ParticipleArea]
  onRestart: () => void
}) {
  const [questions] = useState(() => pickWeakest(items, (item) => participleItemId(chapter.number, area, item), 10)
    .map((item) => participleQuestion(chapter, area, item)))
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

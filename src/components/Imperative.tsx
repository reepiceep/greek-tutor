import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  IMP_KIND_LABEL, IMP_SLOTS, IMP_SLOT_LABEL, imperative, imperativeBuildQuestion, imperativeItemId, imperativeParseQuestion, imperativeTriples,
  imperativeVerseId, imperativeVerseParseQuestion, imperativeVerseTranslateQuestion, parsableVerses, prohibitionQuestion, prohibitionVerses,
} from '../lib/imperativeQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'

type Tab = 'lesson' | 'parse' | 'build' | 'verses' | 'prohibitions'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'build', label: 'Build the form' },
  { tab: 'verses', label: 'Commands in verses' },
  { tab: 'prohibitions', label: 'Prohibitions' },
]

export function Imperative({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Imperative</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && <ImperativeLesson chapter={chapter} />}
      {tab !== 'lesson' && <Drill key={key} chapter={chapter} onRestart={restart} tab={tab} />}
    </section>
  )
}

function ImperativeLesson({ chapter }: { chapter: Chapter }) {
  const lyo = chapter.imperatives?.verbs.find((v) => v.id === 'lyo')
  if (!lyo) return null
  return (
    <>
      <Lesson title="The imperative">
        <p>
          The imperative is the mood of <strong>command</strong>. It has only 2nd and 3rd persons: “loose!” and “let him loose.”
          The 3rd person is still a command, not permission. Like the subjunctive it has aspect but no time: a <strong>present</strong>
          imperative commands an ongoing or repeated action (“keep believing”), an <strong>aorist</strong> the action as a whole.
        </p>
        <ul>
          <li>Learn the 2nd singulars: present <span className="greek">λῦε, λύου</span>; aorist <span className="greek">λῦσον, λῦσαι</span>; passive <span className="greek">λύθητι</span>. The rest follow <span className="greek">-τω, -τε, -τωσαν</span> (middle <span className="greek">-σθω, -σθε, -σθωσαν</span>).</li>
          <li>The aorist has <strong>no augment</strong>. A second aorist uses the present’s endings: <span className="greek">λάβε, ἔξελθε</span>; <span className="greek">εἰπέ, ἐλθέ</span> are accented on the ending, and the middle is <span className="greek">γενοῦ</span>.</li>
          <li>Look-alikes: the present active 2nd plural <span className="greek">λύετε</span> is also indicative; the aorist middle <span className="greek">λῦσαι</span> is also the aorist active infinitive. <span className="greek">εἰμί</span>: <span className="greek">ἴσθι, ἔστω, ἔστε, ἔστωσαν</span>.</li>
          <li>
            <strong>Prohibitions</strong> use <span className="greek">μή</span>: with a present imperative, often “stop …” (<span className="greek">μὴ φοβοῦ</span>, “stop being afraid”);
            with an aorist subjunctive, “don’t …” (<span className="greek">μὴ φοβηθῇς</span>). The aorist imperative isn’t used with μή in the 2nd person.
          </li>
        </ul>
      </Lesson>
      {[lyo.kinds.filter((k) => k.startsWith('pres')), lyo.kinds.filter((k) => k.startsWith('aor'))].map((kinds) => (
        <table key={kinds[0]} className="reference endings-table">
          <thead><tr><th />{kinds.map((k) => <th key={k}>{IMP_KIND_LABEL[k]}</th>)}</tr></thead>
          <tbody>
            {IMP_SLOTS.map((s) => (
              <tr key={s}><th>{IMP_SLOT_LABEL[s]}</th>{kinds.map((k) => <td key={k} className="greek">{imperative(lyo, k, s)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      ))}
    </>
  )
}

function Drill({ chapter, onRestart, tab }: { chapter: Chapter; onRestart: () => void; tab: Exclude<Tab, 'lesson'> }) {
  const [questions] = useState(() => {
    const pool = tab === 'parse' || tab === 'build'
      ? imperativeTriples(chapter).map(({ v, kind, slot }) => ({
          id: imperativeItemId(chapter.number, v, kind, slot, tab),
          make: () => (tab === 'parse' ? imperativeParseQuestion(chapter, v, kind, slot) : imperativeBuildQuestion(chapter, v, kind, slot)),
        }))
      : tab === 'prohibitions'
        ? prohibitionVerses(chapter).map((v) => ({ id: imperativeVerseId(chapter.number, v, 'prohibition'), make: () => prohibitionQuestion(chapter, v) }))
        : parsableVerses(chapter).flatMap((v) => [
            { id: imperativeVerseId(chapter.number, v, 'parse'), make: () => imperativeVerseParseQuestion(chapter, v) },
            ...(v.wrong?.length ? [{ id: imperativeVerseId(chapter.number, v, 'translate'), make: () => imperativeVerseTranslateQuestion(chapter, v) }] : []),
          ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      {tab === 'prohibitions' && <p className="muted">After μή: an imperative (present), or a subjunctive with a lengthened vowel (aorist)?</p>}
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout={tab === 'parse' || tab === 'build' ? 'grid' : 'list'} />
    </>
  )
}

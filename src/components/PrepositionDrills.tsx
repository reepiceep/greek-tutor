import { type ReactNode, useState } from 'react'
import type { Chapter } from '../data/types'
import { elidedFormItemId, elisionItemId, phraseItemId, prepItemId, sentenceItemId } from '../lib/items'
import { caseUses, elidedForms, prepWord } from '../lib/prepositions'
import { pickWeakest, shuffle } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { CaseTag } from './CaseTag'
import {
  elidedFormQuestion, elisionQuestion, phraseQuestion, prepCaseQuestion, prepMeaningQuestion, sentenceQuestion, spatialLabel,
  spatialQuestion,
} from '../lib/questions'
import { SpatialIcon } from './SpatialIcon'
import { PrepositionGames } from './PrepositionGames'

type Tab = 'reference' | 'cases' | 'phrases' | 'sentences' | 'diagram' | 'elision' | 'games'

const TABS: { tab: Tab; label: string; available: (ch: Chapter) => boolean }[] = [
  { tab: 'reference', label: 'Reference', available: () => true },
  { tab: 'cases', label: 'Meaning & case', available: () => true },
  { tab: 'phrases', label: 'Phrases', available: (ch) => !!ch.phrases?.length },
  { tab: 'sentences', label: 'Sentences', available: (ch) => !!ch.sentences?.length },
  { tab: 'diagram', label: 'Diagram', available: (ch) => !!ch.spatial?.length },
  { tab: 'elision', label: 'Elision', available: (ch) => !!ch.elisions?.length },
  { tab: 'games', label: 'Games', available: () => true },
]

interface Props {
  chapter: Chapter
  title?: string
  /** Controls shown above the tabs, e.g. the chapter-range picker in the review. */
  header?: ReactNode
}

export function PrepositionDrills({ chapter, title = 'Prepositions', header }: Props) {
  const [tab, setTab] = useState<Tab>('cases')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  // A new chapter range or round rebuilds the quiz.
  const key = `${tab}-${round}-${chapter.title}`
  const tabs = TABS.filter((t) => t.available(chapter))

  return (
    <section>
      <div className="toolbar">
        <h2>{title}</h2>
        <div className="seg">
          {tabs.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {header}
      {tab === 'reference' && <Reference key={key} chapter={chapter} />}
      {tab === 'cases' && <CaseQuiz key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'phrases' && <Phrases key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'sentences' && <Sentences key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'diagram' && <Diagram key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'elision' && <Elision key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'games' && <PrepositionGames key={key} chapter={chapter} />}
    </section>
  )
}

// --- Reference -------------------------------------------------------------------

/** Every preposition with its meanings by case. Meanings can be hidden for self-testing. */
function Reference({ chapter }: { chapter: Chapter }) {
  const [hide, setHide] = useState(false)
  const [shown, setShown] = useState<Set<string>>(new Set())
  const preps = chapter.vocab.filter((w) => w.pos === 'preposition')
  const cells = preps.flatMap((w) => (w.cases ?? []).map((u) => `${w.id}:${u.case}`))
  // Click a hidden meaning to check yourself, and click it again to hide it.
  const toggle = (k: string) => setShown((s) => {
    const next = new Set(s)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    return next
  })

  return (
    <>
      <div className="reference-tools">
        <label className="check">
          <input type="checkbox" checked={hide} onChange={(e) => { setHide(e.target.checked); setShown(new Set()) }} />
          Hide meanings (click a cell to show or hide it)
        </label>
        {hide && (
          <div className="seg small-seg">
            <button onClick={() => setShown(new Set(cells))} disabled={shown.size === cells.length}>Show all</button>
            <button onClick={() => setShown(new Set())} disabled={shown.size === 0}>Hide all</button>
          </div>
        )}
      </div>
      <table className="reference">
        <thead><tr><th>Preposition</th><th><CaseTag c="genitive" /></th><th><CaseTag c="dative" /></th><th><CaseTag c="accusative" /></th><th className="hook-col">Remember</th></tr></thead>
        <tbody>
          {preps.map((w) => (
            <tr key={w.id}>
              <th>
                <span className="greek">{w.lemma}</span>
                {w.forms && <span className="greek muted"> ({w.forms.join(', ')})</span>}
                {w.chapter && <span className="muted small"> ch {w.chapter}</span>}
              </th>
              {(['genitive', 'dative', 'accusative'] as const).map((c) => {
                const use = w.cases?.find((u) => u.case === c)
                const k = `${w.id}:${c}`
                if (!use) return <td key={c} className="none">—</td>
                if (!hide) return <td key={c}>{use.gloss}</td>
                return shown.has(k)
                  ? <td key={c}><button className="revealed" onClick={() => toggle(k)} title="Hide again">{use.gloss}</button></td>
                  : <td key={c}><button className="reveal" onClick={() => toggle(k)}>show</button></td>
              })}
              <td className="hook-col muted small">{w.hook}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// --- Meaning & case ------------------------------------------------------------

function CaseQuiz({ chapter: ch, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() => {
    const pool = caseUses(ch).flatMap((use) => [{ use, skill: 'meaning' as const }, { use, skill: 'case' as const }])
    return pickWeakest(pool, ({ use, skill }) => prepItemId(ch.number, use.word.id, use.case, skill), 12).map(({ use, skill }) =>
      skill === 'meaning' ? prepMeaningQuestion(ch, use) : prepCaseQuestion(ch, use),
    )
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} />
}

// --- Phrases -------------------------------------------------------------------

function Phrases({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const phrases = chapter.phrases ?? []
  const [questions] = useState(() =>
    pickWeakest(phrases, (p) => phraseItemId(chapter.number, p), 10).map((p) => phraseQuestion(chapter, p)),
  )
  return (
    <>
      <p className="muted">Look at the case of the object to decide which meaning the preposition has.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Sentences -------------------------------------------------------------------

function Sentences({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() =>
    pickWeakest(chapter.sentences ?? [], (s) => sentenceItemId(chapter.number, s), 10).map((s) => sentenceQuestion(chapter, s)),
  )
  return (
    <>
      <p className="muted">Real New Testament sentences (SBLGNT). Choose the English for the highlighted phrase; the case of its object decides the meaning.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Spatial diagram -------------------------------------------------------------

function Diagram({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [quiz, setQuiz] = useState(false)
  const uses = chapter.spatial ?? []
  const [questions] = useState(() => shuffle(uses).map((s) => spatialQuestion(chapter, s)))

  return (
    <>
      <div className="seg sub">
        <button className={!quiz ? 'on' : ''} onClick={() => setQuiz(false)}>Explore</button>
        <button className={quiz ? 'on' : ''} onClick={() => setQuiz(true)}>Quiz me</button>
      </div>
      {quiz ? (
        <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
      ) : (
        <>
          <p className="muted">The box is the preposition’s object; the dot or arrow shows where something is or goes.</p>
          <div className="spatial-grid">
            {uses.map((s) => (
              <figure key={`${s.prep}:${s.case}`}>
                <SpatialIcon shape={s.shape} label={`${spatialLabel(chapter, s)}: ${s.gloss}`} />
                <figcaption><span className="greek">{prepWord(chapter, s.prep).lemma}</span> + <CaseTag c={s.case} /><br />{s.gloss}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
    </>
  )
}

// --- Elision -------------------------------------------------------------------

function Elision({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() => {
    const produce = (chapter.elisions ?? []).map((e) => ({ id: elisionItemId(chapter.number, e), make: () => elisionQuestion(chapter, e) }))
    const identify = elidedForms(chapter).map(({ form, word }) => ({
      id: elidedFormItemId(chapter.number, form),
      make: () => elidedFormQuestion(chapter, form, word),
    }))
    return pickWeakest([...produce, ...identify], (x) => x.id, 12).map((x) => x.make())
  })

  return (
    <>
      <details className="rules">
        <summary>The rules</summary>
        <ul>
          <li>A preposition ending in a vowel usually drops it before a word starting with a vowel: <span className="greek">ἀπό → ἀπ᾽</span>, <span className="greek">διά → δι᾽</span>.</li>
          <li>If that word has rough breathing, π becomes φ and τ becomes θ: <span className="greek">ἀφ᾽, ὑφ᾽, μεθ᾽</span>.</li>
          <li><span className="greek">ἐκ</span> becomes <span className="greek">ἐξ</span> before any vowel.</li>
          <li>Before a consonant nothing changes, and <span className="greek">πρός</span> never elides.</li>
        </ul>
      </details>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

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
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'
import { adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { nounPrepForms, nounPrepItemId, nounPrepQuestion, readingItemId, readingQuestion, readingSkills } from '../lib/prepReadingQuestions'

type Tab = 'reference' | 'cases' | 'phrases' | 'sentences' | 'read' | 'nouns' | 'diagram' | 'elision' | 'games'

const TABS: { tab: Tab; label: string; available: (ch: Chapter) => boolean }[] = [
  { tab: 'reference', label: 'Reference', available: () => true },
  { tab: 'cases', label: 'Meaning & case', available: () => true },
  { tab: 'phrases', label: 'Phrases', available: (ch) => !!ch.phrases?.length },
  { tab: 'sentences', label: 'Sentences', available: (ch) => !!ch.sentences?.length },
  { tab: 'read', label: 'Read verses', available: (ch) => !!ch.prepReadings?.length },
  { tab: 'nouns', label: 'Noun forms', available: (ch) => !!ch.nouns?.length },
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
      <HowTheyWork />
      {tab === 'reference' && <Reference key={key} chapter={chapter} />}
      {tab === 'cases' && <CaseQuiz key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'phrases' && <Phrases key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'sentences' && <Sentences key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'read' && <ReadVerses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'nouns' && <NounForms key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'diagram' && <Diagram key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'elision' && <Elision key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'games' && <PrepositionGames key={key} chapter={chapter} />}
    </section>
  )
}

// --- Lesson --------------------------------------------------------------------------

/** How Greek prepositions work, from Mounce ch. 8 (with Merkle & Plummer ch. 8 on phrase uses). */
function HowTheyWork() {
  return (
    <Lesson title="How Greek prepositions work">
      <ul>
        <li>
          <strong>The case of the object decides the meaning.</strong> <span className="greek">διὰ τοῦ ὄχλου</span> is “through the
          crowd,” but <span className="greek">διὰ τὸν θάνατον</span> is “on account of death.” Learn each preposition with its case:
          “<span className="greek">διά</span> with the genitive means ‘through.’”
        </li>
        <li>
          <strong>Why is the object in that case?</strong> Say it in full: “<span className="greek">αὐτῷ</span> is dative because it
          is the object of <span className="greek">ἐν</span>, which takes the dative.”
        </li>
        <li>
          <strong>Don’t add the case’s key word.</strong> <span className="greek">ἀπὸ τῆς θαλάσσης</span> is “from the sea,” not
          “from of the sea”; <span className="greek">ἐν τῷ οἴκῳ</span> is “in the house,” not “in to the house.”
        </li>
        <li>
          <strong>Greek often leaves out the article.</strong> <span className="greek">ἐν ἀρχῇ</span> is “in the beginning.” Put
          “the” back when English needs it.
        </li>
        <li>
          <strong>Find the word the phrase modifies.</strong> Usually it is the verb, telling where, when, how or why
          (<em>adverbial</em>). With an article in front, the phrase can describe a noun
          (<em>adjectival</em>: <span className="greek">τὴν δόξαν τὴν παρὰ τοῦ θεοῦ</span>, “the glory that comes from God”) or
          stand as a noun itself (<span className="greek">τὰ ἐν τῷ κόσμῳ</span>, “the things in the world”).
        </li>
        <li>
          <strong>A compound verb often repeats its preposition:</strong> <span className="greek">ἐξῆλθεν ἐξ αὐτοῦ</span>, “it
          came out of him.” Translate it once; the repetition is style, not emphasis.
        </li>
        <li>
          <strong>Glosses are a starting point.</strong> A preposition has a range of meanings, and context decides which fits.
        </li>
      </ul>
    </Lesson>
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

// --- Read verses -------------------------------------------------------------------

/** A few verses, each taken apart in order: the object, what the phrase modifies, the main verb, the whole sentence. */
function ReadVerses({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() =>
    pickWeakest(chapter.prepReadings ?? [], (r) => readingItemId(chapter.number, r, 'translate'), 4)
      .flatMap((r) => readingSkills(r).map((skill) => readingQuestion(chapter, r, skill))),
  )
  return (
    <>
      <details className="rules">
        <summary>How to take a verse apart</summary>
        <ul>
          <li>Mark off the prepositional phrase: the preposition, its object and anything that goes with the object.</li>
          <li>Find the word it modifies. Most phrases go with a verb; one after an article describes a noun or acts as one.</li>
          <li>
            <span className="greek">ἵνα</span> (“in order that”) and <span className="greek">ὅτι</span> start a dependent clause. The main
            subject and verb are never inside one.
          </li>
          <li>Translate the pieces, then put the sentence together.</li>
        </ul>
      </details>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Noun forms ---------------------------------------------------------------------

/** Parse the chapter's new nouns, and pick a preposition that could take each form as its object. */
function NounForms({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const nouns = chapter.nouns ?? []
  const [questions] = useState(() => {
    const parse = nouns.flatMap((p) => distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })))
    const prep = nounPrepForms(chapter).map(({ p, form }) => ({ id: nounPrepItemId(chapter.number, p, form), make: () => nounPrepQuestion(chapter, p, form) }))
    return shuffle([...pickWeakest(parse, (x) => x.id, 6), ...pickWeakest(prep, (x) => x.id, 4)]).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">
        When you parse a noun, think of a preposition that could take the form as its object: <span className="greek">ἡμέρᾳ</span> is
        dative, so <span className="greek">ἐν ἡμέρᾳ</span>, “in a day.”
      </p>
      <details className="rules">
        <summary>The chapter’s nouns</summary>
        <div className="adj-tables">{nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
      </details>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
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

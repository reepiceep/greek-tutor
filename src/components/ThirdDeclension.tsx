import { type ReactNode, useState } from 'react'
import type { Chapter } from '../data/types'
import { adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { pickWeakest, record, shuffle } from '../lib/progress'
import { type RuleKind, ruleItemId, ruleItemQuestion, tisItemId, tisQuestion } from '../lib/thirdDeclensionQuestions'
import { lexicalFormQuestion, lexicalForms, lexicalItemId } from '../lib/adjReadingQuestions'
import {
  MASTER_COLUMNS, MASTER_ROWS, type MasterMode, checkEnding, d3Paradigms, d3ReadingItemId, d3ReadingQuestion, d3ReadingSkills, masterChart,
  masterDisplay, masterItemId,
} from '../lib/d3ReadingQuestions'
import { GreekInput } from './GreekInput'
import type { RuleItem } from '../data/types'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'chart' | 'stops' | 'parse' | 'kinds' | 'pas' | 'tis' | 'look' | 'read'

const TABS: { tab: Tab; label: string; available: (ch: Chapter) => boolean }[] = [
  { tab: 'forms', label: 'Forms', available: () => true },
  { tab: 'chart', label: 'Case ending chart', available: () => true },
  { tab: 'stops', label: 'Stops & stems', available: () => true },
  { tab: 'parse', label: 'Parse', available: () => true },
  { tab: 'kinds', label: 'Declension & gender', available: (ch) => !!ch.thirdDeclension?.forms?.length },
  { tab: 'pas', label: 'πᾶς', available: () => true },
  { tab: 'tis', label: 'τίς or τις?', available: () => true },
  { tab: 'look', label: 'Look-alikes', available: (ch) => !!ch.thirdDeclension?.lookalikes?.length },
  { tab: 'read', label: 'Read verses', available: (ch) => !!ch.thirdDeclension?.readings?.length },
]

export function ThirdDeclension({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Third declension</h2>
        <div className="seg">
          {TABS.filter((t) => t.available(chapter)).map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'stops' && <Stops key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'pas' && <Pas key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'tis' && <Tis key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'chart' && <MasterChart key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'kinds' && <RuleQuiz key={key} chapter={chapter} kind="decl" items={chapter.thirdDeclension?.forms ?? []} onRestart={restart} lesson={<KindsLesson />} />}
      {tab === 'look' && <RuleQuiz key={key} chapter={chapter} kind="look" items={chapter.thirdDeclension?.lookalikes ?? []} onRestart={restart} lesson={<LookLesson />} />}
      {tab === 'read' && <ReadVerses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const ENDINGS: { label: string; mf: string; n: string }[] = [
  { label: 'nom sg', mf: 'ς / —', n: '—' },
  { label: 'gen sg', mf: 'ος', n: 'ος' },
  { label: 'dat sg', mf: 'ι', n: 'ι' },
  { label: 'acc sg', mf: 'α / ν', n: '—' },
  { label: 'nom pl', mf: 'ες', n: 'α' },
  { label: 'gen pl', mf: 'ων', n: 'ων' },
  { label: 'dat pl', mf: 'σι(ν)', n: 'σι(ν)' },
  { label: 'acc pl', mf: 'ας', n: 'α' },
]

function Forms({ chapter }: { chapter: Chapter }) {
  const paradigms = chapter.thirdDeclension?.paradigms ?? []
  return (
    <>
      <Lesson title="How the third declension works">
        <p>
          Third-declension stems usually end in a <strong>consonant</strong>, and the endings attach straight to it. That is
          why the nominative is often disguised, and why the lexical form gives you the <strong>genitive</strong>: drop its
          -ος to find the stem (<span className="greek">σάρξ, σαρκός</span> → <span className="greek">σαρκ-</span>).
        </p>
        <div className="lesson-grid">
          <table className="paradigm compact">
            <thead><tr><th /><th>masc/fem</th><th>neut</th></tr></thead>
            <tbody>
              {ENDINGS.map((e) => (
                <tr key={e.label} className={e.label === 'nom pl' ? 'group-start' : ''}>
                  <th>{e.label}</th><td className="greek">{e.mf}</td><td className="greek">{e.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p><strong>Square of Stops</strong>: what happens when a stop meets σ (nominative -ς, dative plural -σι).</p>
            <table className="paradigm compact">
              <thead><tr><th /><th>stops</th><th>+ σ</th></tr></thead>
              <tbody>
                <tr><th>labial</th><td className="greek">π β φ</td><td className="greek">ψ</td></tr>
                <tr><th>velar</th><td className="greek">κ γ χ</td><td className="greek">ξ</td></tr>
                <tr><th>dental</th><td className="greek">τ δ θ</td><td>drops out</td></tr>
              </tbody>
            </table>
            <ul>
              <li><strong>τ can’t end a word</strong>, so it drops: <span className="greek">ὀνοματ</span> → <span className="greek">ὄνομα</span>.</li>
              <li><strong>ντ drops before σ</strong> and the vowel lengthens: <span className="greek">παντ + ς</span> → <span className="greek">πᾶς</span>.</li>
            </ul>
          </div>
        </div>
        <p>
          Watch out: in the third declension <span className="greek">-ος</span> is <em>genitive</em> singular, and
          <span className="greek"> -α</span> can be accusative singular (<span className="greek">σάρκα</span>) or neuter plural.
          The article is your best friend: <span className="greek">τῆς σαρκός</span>.
        </p>
        <p><strong>Mounce’s four hints</strong>, which explain nearly every change:</p>
        <ol>
          <li>Memorize the genitive with the lexical form; drop its -ος to find the stem (<span className="greek">σάρξ, σαρκός</span> → <span className="greek">σαρκ-</span>).</li>
          <li>Whatever happens in the nominative singular (-ς) also happens in the dative plural (-σι): <span className="greek">σάρξ, σαρξί(ν)</span>.</li>
          <li>ν drops out before σ: <span className="greek">τιν + ς</span> → <span className="greek">τίς</span>, <span className="greek">τιν + σι</span> → <span className="greek">τίσι</span>.</li>
          <li>τ drops out before σ, or at the end of a word: <span className="greek">ὀνόμασι</span>, <span className="greek">ὄνομα</span>.</li>
        </ol>
        <p>
          <strong>Adjective patterns</strong> name the declension of each gender: <span className="greek">ἀγαθός, -ή, -όν</span> is 2-1-2;
          <span className="greek"> πᾶς, πᾶσα, πᾶν</span> 3-1-3; <span className="greek">αἰώνιος, -ον</span> 2-2; <span className="greek">τίς, τί</span> 3-3.
        </p>
        <p>
          <strong>The article</strong> can stand for a person: <span className="greek">ὁ δέ</span> usually means “but he.” And some verbs take two
          accusatives: <span className="greek">τί με λέγεις ἀγαθόν;</span> “Why do you call me good?”
        </p>
      </Lesson>
      <div className="adj-tables">
        {paradigms.map((p) => <DeclensionTable key={p.id} p={p} />)}
      </div>
      {!!chapter.thirdDeclension?.more?.length && (
        <details className="rules">
          <summary>More words from the chapter</summary>
          <div className="adj-tables">{chapter.thirdDeclension.more.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
        </details>
      )}
    </>
  )
}

// --- Quizzes -------------------------------------------------------------------------

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Stops({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const d = chapter.thirdDeclension
    const pool = [
      ...(d?.stops ?? []).map((r) => ({ id: ruleItemId(chapter.number, 'stop', r), make: () => ruleItemQuestion(chapter, 'stop', r) })),
      ...(d?.stems ?? []).map((r) => ({ id: ruleItemId(chapter.number, 'stem', r), make: () => ruleItemQuestion(chapter, 'stem', r) })),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const charts = d3Paradigms(chapter)
    const parse = charts.flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    const lexical = charts.flatMap((p) =>
      lexicalForms(p).map((form) => ({ id: lexicalItemId(chapter.number, p, form), make: () => lexicalFormQuestion(chapter, p, form, charts) })),
    )
    return shuffle([...pickWeakest(parse, (x) => x.id, 9), ...pickWeakest(lexical, (x) => x.id, 3)]).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Give the case, number and gender. Some forms have more than one right answer; only one of them is offered.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Pas({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const a = chapter.thirdDeclension?.agreement
    const agree = (a?.nouns ?? []).map((n) => ({ id: adjAgreeItemId(chapter.number, a!.paradigm, n), make: () => adjAgreeQuestion(chapter, a!.paradigm, n) }))
    const uses = (chapter.thirdDeclension?.pasUses ?? []).map((r) => ({ id: ruleItemId(chapter.number, 'pas', r), make: () => ruleItemQuestion(chapter, 'pas', r) }))
    return shuffle([...pickWeakest(agree, (x) => x.id, uses.length ? 6 : 12), ...pickWeakest(uses, (x) => x.id, 6)]).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="πᾶς: agreement and meaning" firstVisitOpen={false}>
        <p>
          <span className="greek">πᾶς</span> agrees with its noun in case, number and gender, even when the noun is from a different declension.
          Its meaning shifts with its position. This is a guideline, not a law; context has the last word.
        </p>
        <ul>
          <li><strong>No article:</strong> “every” (<span className="greek">πᾶς ἄνθρωπος</span>, “every person”), or “all” in the plural.</li>
          <li><strong>Before the article</strong> (its usual place): “all the …” (<span className="greek">πάντες οἱ ἄνθρωποι</span>). With a singular English often says “the whole”: <span className="greek">πᾶς ὁ ὄχλος</span>, “all the crowd, the whole crowd.”</li>
          <li><strong>After the article:</strong> “the whole …” (<span className="greek">ὁ πᾶς νόμος</span>, “the whole law”).</li>
          <li><strong>No noun:</strong> “all (people)” (<span className="greek">πάντες</span>, <span className="greek">οἱ πάντες</span>) or, neuter, “all things” (<span className="greek">πάντα</span>, <span className="greek">τὰ πάντα</span>).</li>
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Tis({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() =>
    pickWeakest(chapter.thirdDeclension?.tis ?? [], (t) => tisItemId(chapter.number, t), 10).map((t) => tisQuestion(chapter, t)),
  )
  return (
    <>
      <Lesson title="τίς or τις?">
        <p>
          They look alike, but the accent tells them apart. <span className="greek">τίς, τί</span> asks a question (“who? what? why?”)
          and <strong>always has an acute on its first syllable</strong>. <span className="greek">τις, τι</span> means “someone, anyone,
          a certain” and is <strong>enclitic</strong>, so it usually has no accent, and may give its accent to the word before it
          (<span className="greek">Εἴ τις</span>). Position in the sentence doesn’t decide.
        </p>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Declension & gender, look-alikes ----------------------------------------------------

function RuleQuiz({ chapter, kind, items, onRestart, lesson }: QuizProps & { kind: RuleKind; items: RuleItem[]; lesson: ReactNode }) {
  const [questions] = useState(() =>
    shuffle(pickWeakest(items, (r) => ruleItemId(chapter.number, kind, r), 12)).map((r) => ruleItemQuestion(chapter, kind, r)),
  )
  return (
    <>
      {lesson}
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function KindsLesson() {
  return (
    <Lesson title="Which declension, which case, which gender?" firstVisitOpen={false}>
      <ul>
        <li>A stem ending in a consonant means the third declension. Its genitive singular is <span className="greek">-ος</span>, so <span className="greek">-ος</span> alone doesn’t tell you the case: <span className="greek">ὁ λόγος</span> is nominative, <span className="greek">τῆς σαρκός</span> genitive, <span className="greek">τὸ ἔθνος</span> neuter nominative or accusative.</li>
        <li>The article never changes with the declension (<span className="greek">τῷ</span> is always <span className="greek">τῷ</span>), so read the form through it.</li>
        <li>Third-declension nouns come in all three genders, and the form rarely tells you which. Learn the article with the word: <span className="greek">ἡ σάρξ, τὸ ὄνομα</span>. Nouns in <span className="greek">-μα</span> are always neuter.</li>
      </ul>
    </Lesson>
  )
}

function LookLesson() {
  return (
    <Lesson title="Words that look alike" firstVisitOpen={false}>
      <ul>
        <li><span className="greek">εἷς, ἕν</span> (“one”) have <strong>rough breathing</strong>; the prepositions <span className="greek">εἰς</span> (“into”) and <span className="greek">ἐν</span> (“in”) have smooth breathing.</li>
        <li><span className="greek">εἰ</span> (“if”) has no accent of its own; <span className="greek">εἶ</span> (“you are”) has a circumflex. <span className="greek">εἰ μή</span> together usually means “except.”</li>
        <li><span className="greek">τί</span> (accented) asks “what? why?”; <span className="greek">τι</span> (enclitic) is “something.”</li>
      </ul>
    </Lesson>
  )
}

// --- Read verses -------------------------------------------------------------------------

function ReadVerses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() =>
    pickWeakest(chapter.thirdDeclension?.readings ?? [], (r) => d3ReadingItemId(chapter.number, r, 'translate'), 4)
      .flatMap((r) => d3ReadingSkills(r).map((skill) => d3ReadingQuestion(chapter, r, skill))),
  )
  return (
    <>
      <p className="muted">Parse the highlighted word as the sentence uses it, then translate the whole sentence.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Master Case Ending Chart --------------------------------------------------------------

/** Fill in the Master Case Ending Chart from memory (Mounce 10.14; the workbook's first exercise for chapter 10). */
function MasterChart({ chapter, onRestart }: QuizProps) {
  const [mode, setMode] = useState<MasterMode>('true')
  const [values, setValues] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const chart = masterChart(mode)
  const cellKey = (c: string, r: number) => `${c}:${r}`
  const right = (c: keyof typeof chart, r: number) => checkEnding(values[cellKey(c, r)] ?? '', chart[c][r])
  const cells = MASTER_COLUMNS.flatMap(({ col }) => MASTER_ROWS.map((_, r) => ({ col, r })))
  const score = cells.filter(({ col, r }) => right(col, r)).length

  const check = () => {
    cells.forEach(({ col, r }) => record(masterItemId(chapter.number, mode, col, MASTER_ROWS[r]), right(col, r)))
    setChecked(true)
  }
  const switchMode = (m: MasterMode) => { setMode(m); setValues({}); setChecked(false) }

  return (
    <div>
      <Lesson title="The Master Case Ending Chart" firstVisitOpen={false}>
        <p>
          Mounce’s advice: rather than memorizing every paradigm, memorize this chart and see how the endings attach to a stem. Type each
          ending, and type <code>-</code> where there is no ending. Where there are two (<span className="greek">α / ν</span>), either is fine.
        </p>
        <p>
          <em>True endings</em> is the chart as Mounce gives it (the <span className="greek">υ</span> of <span className="greek">λόγου</span> is the ending; ο + υ contracts to ου).
          <em> With the stem vowel</em> shows what you will actually see: <span className="greek">-ος, -ου, -ῳ</span>.
        </p>
      </Lesson>
      <div className="seg sub">
        <button className={mode === 'true' ? 'on' : ''} onClick={() => switchMode('true')}>True endings</button>
        <button className={mode === 'stem' ? 'on' : ''} onClick={() => switchMode('stem')}>With the stem vowel</button>
      </div>
      <table className="paradigm master-chart">
        <thead>
          <tr><th /><th colSpan={3}>1st/2nd declension</th><th colSpan={2}>3rd declension</th></tr>
          <tr><th />{MASTER_COLUMNS.map((c) => <th key={c.col}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {MASTER_ROWS.map((row, r) => (
            <tr key={row} className={row === 'nom pl' ? 'group-start' : ''}>
              <th>{row}</th>
              {MASTER_COLUMNS.map(({ col }) => (
                <td key={col} className={checked ? (right(col, r) ? 'right' : 'wrong') : ''}>
                  <GreekInput compact value={values[cellKey(col, r)] ?? ''} disabled={checked} placeholder=""
                    onChange={(v) => setValues((vs) => ({ ...vs, [cellKey(col, r)]: v }))} />
                  {checked && !right(col, r) && <div className="greek correction">{masterDisplay(chart[col][r])}</div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        {checked ? (
          <>
            <span className="score small">{score} / {cells.length}</span>
            <button className="primary" onClick={() => { setValues({}); setChecked(false); onRestart() }}>Try again</button>
          </>
        ) : (
          <button className="primary" onClick={check}>Check</button>
        )}
      </div>
    </div>
  )
}

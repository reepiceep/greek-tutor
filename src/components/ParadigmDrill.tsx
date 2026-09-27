import { useState } from 'react'
import { ENCLITIC_FORMS, ENCLITIC_RULES } from '../data/chapter08Eimi'
import type { Chapter, EncliticRule, Paradigm, ParadigmRow } from '../data/types'
import {
  encliticAccentQuestion, encliticFormQuestion, encliticRuleQuestion, predicateSubjectQuestion, predicateTranslateQuestion,
} from '../lib/eimiQuestions'
import { checkGreek } from '../lib/greek'
import { encliticFormItemId, encliticItemId, paradigmItemId, predicateItemId } from '../lib/items'
import { pickWeakest, record, shuffle, useProgress } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { GreekInput } from './GreekInput'
import { paradigmIdentifyQuestion } from '../lib/questions'

type Mode = 'reference' | 'chart' | 'identify' | 'predicate' | 'enclitics'

const MODES: { mode: Mode; label: string; available: (ch: Chapter) => boolean }[] = [
  { mode: 'reference', label: 'Reference', available: () => true },
  { mode: 'chart', label: 'Fill the chart', available: () => true },
  { mode: 'identify', label: 'Identify forms', available: () => true },
  { mode: 'predicate', label: 'Subject & predicate', available: (ch) => !!ch.predicates?.length },
  { mode: 'enclitics', label: 'Enclitics', available: (ch) => !!ch.enclitics?.length },
]

export function ParadigmDrill({ chapter }: { chapter: Chapter }) {
  const paradigm = chapter.paradigms[0]
  const [mode, setMode] = useState<Mode>('chart')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${mode}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2 className="greek">εἰμί</h2>
        <div className="seg">
          {MODES.filter((m) => m.available(chapter)).map((m) => (
            <button key={m.mode} className={mode === m.mode ? 'on' : ''} onClick={() => { setMode(m.mode); restart() }}>{m.label}</button>
          ))}
        </div>
      </div>
      {(mode === 'reference' || mode === 'chart' || mode === 'identify') && <EimiLesson />}
      {mode === 'reference' && <Reference key={key} chapter={chapter} paradigm={paradigm} />}
      {mode === 'chart' && <ChartDrill key={key} chapter={chapter} paradigm={paradigm} onRestart={restart} />}
      {mode === 'identify' && <IdentifyDrill key={key} chapter={chapter} paradigm={paradigm} onRestart={restart} />}
      {mode === 'predicate' && <PredicateDrill key={key} chapter={chapter} onRestart={restart} />}
      {mode === 'enclitics' && <EncliticDrill key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Reference -------------------------------------------------------------------------

/** The paradigm with its meanings, which can be hidden for self-testing (like the prepositions reference). */
function Reference({ chapter, paradigm }: { chapter: Chapter; paradigm: Paradigm }) {
  const [hide, setHide] = useState(false)
  const [shown, setShown] = useState<Set<string>>(new Set())
  // ἦν is in the chapter's vocabulary rather than the present paradigm; show it under the chart.
  const past = chapter.vocab.find((w) => w.id === 'en')
  const rows = [
    ...paradigm.rows.map((r) => ({ key: r.key, label: r.label, form: r.display ?? r.forms[0], gloss: r.gloss })),
    ...(past ? [{ key: 'past', label: 'past, 3rd sg', form: past.lemma, gloss: past.gloss }] : []),
  ]
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
            <button onClick={() => setShown(new Set(rows.map((r) => r.key)))} disabled={shown.size === rows.length}>Show all</button>
            <button onClick={() => setShown(new Set())} disabled={shown.size === 0}>Hide all</button>
          </div>
        )}
      </div>
      <table className="reference">
        <thead><tr><th>Form</th><th>Person</th><th>Meaning</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th><span className="greek">{r.form}</span></th>
              <td className="muted">{r.label}</td>
              {!hide ? <td>{r.gloss}</td>
                : shown.has(r.key)
                  ? <td><button className="revealed" onClick={() => toggle(r.key)} title="Hide again">{r.gloss}</button></td>
                  : <td><button className="reveal" onClick={() => toggle(r.key)}>show</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

// --- The present of εἰμί ---------------------------------------------------------------

function EimiLesson() {
  return (
    <Lesson title="The present of εἰμί" firstVisitOpen={false}>
      <ul>
        <li>
          The ending tells you the subject: <span className="greek">εἰμί</span> “I am,” <span className="greek">ἐσμέν</span> “we
          are.” A verb agrees with its subject in person and number.
        </li>
        <li>
          <span className="greek">ἐστί(ν)</span> and <span className="greek">εἰσί(ν)</span> end in a <strong>movable ν</strong>. It was
          added before a vowel to avoid a pause between two vowels (<span className="greek">εἰσὶν αὐτοί</span>), like English “a”
          becoming “an.” In Koine it often appears before consonants and at the end of a clause too, so learn both spellings. For
          the plural, <span className="greek">εἰσίν</span> is what you will meet.
        </li>
        <li><span className="greek">ἦν</span> is the past: “he/she/it was.”</li>
      </ul>
    </Lesson>
  )
}

// --- Subject and predicate nominative ------------------------------------------------

function PredicateDrill({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() => {
    const pool = (chapter.predicates ?? []).flatMap((p) => [
      { id: predicateItemId(chapter.number, p, 'subject'), make: () => predicateSubjectQuestion(chapter, p) },
      { id: predicateItemId(chapter.number, p, 'translate'), make: () => predicateTranslateQuestion(chapter, p) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="How to tell the subject from the predicate nominative">
        <p>
          <span className="greek">εἰμί</span> doesn’t take a direct object. It links the subject to a <strong>predicate
          nominative</strong>, so both are in the nominative case and the endings can’t tell you which is which.
          Word order doesn’t decide it either. Go down this list:
        </p>
        <ol>
          <li><strong>A pronoun is the subject</strong>, even one that is only in the verb’s ending: <span className="greek">ἐγώ εἰμι ὁ ἄρτος</span>, “I am the bread”; <span className="greek">προφήτης εἶ</span>, “you are a prophet.”</li>
          <li>Otherwise, <strong>the noun with the article is the subject</strong>: <span className="greek">θεὸς ἦν ὁ λόγος</span>, “the Word was God,” not “God was the Word.”</li>
          <li>Otherwise, <strong>a proper name is the subject</strong>: <span className="greek">προφήτης ἦν Ἰωάννης</span>, “John was a prophet.”</li>
        </ol>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Enclitics -----------------------------------------------------------------------

const RULE_EXAMPLES: Record<EncliticRule, string> = {
  proparoxytone: 'ἄνθρωπός εἰμι',
  properispomenon: 'Ἰουδαῖός εἰμι',
  paroxytone: 'ἀγάπη ἐστίν',
  oxytone: 'ἐγώ εἰμι',
  perispomenon: 'θεοῦ ἐστιν',
  esti: 'οὐκ ἔστιν',
}

function EncliticDrill({ chapter, onRestart }: { chapter: Chapter; onRestart: () => void }) {
  const [questions] = useState(() => {
    const pool = [
      ...ENCLITIC_FORMS.map((f) => ({ id: encliticFormItemId(chapter.number, f.form), make: () => encliticFormQuestion(chapter, f) })),
      ...(chapter.enclitics ?? []).flatMap((e) => [
        { id: encliticItemId(chapter.number, e, 'accent'), make: () => encliticAccentQuestion(chapter, e) },
        { id: encliticItemId(chapter.number, e, 'rule'), make: () => encliticRuleQuestion(chapter, e) },
      ]),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="How enclitics work with εἰμί">
        <p>
          An <strong>enclitic</strong> is pronounced so closely with the word before it that it usually loses its own
          accent, and that accent can move back onto the previous word. Every present form of <span className="greek">εἰμί</span> is
          enclitic <strong>except <span className="greek">εἶ</span></strong> (“you are”). <span className="greek">ἦν</span> is not enclitic.
        </p>
        <p>
          In your reading, the telltale sign is a word with <strong>two accents</strong>, like <span className="greek">ἄνθρωπός εἰμι</span>:
          the second accent belongs to the enclitic. What happens depends on the word before it:
        </p>
        <table className="rules-table">
          <tbody>
            {(Object.keys(ENCLITIC_RULES) as EncliticRule[]).map((r) => (
              <tr key={r}><td className="greek">{RULE_EXAMPLES[r]}</td><td>{ENCLITIC_RULES[r].explain}</td></tr>
            ))}
          </tbody>
        </table>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

interface DrillProps {
  chapter: Chapter
  paradigm: Paradigm
  onRestart: () => void
}

interface ChartProps extends DrillProps {
  /** Transliteration example for the hint: [typed, result]. */
  example?: [string, string]
}

/** Produce every form of the paradigm from memory. */
export function ChartDrill({ chapter, paradigm, onRestart, example = ['ei)mi/', 'εἰμί'] }: ChartProps) {
  const { settings } = useProgress()
  const [values, setValues] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)

  const isRight = (r: ParadigmRow) => checkGreek(values[r.key] ?? '', r.forms, settings.requireAccents)

  const check = () => {
    paradigm.rows.forEach((r) => record(paradigmItemId(chapter.number, paradigm.id, r, 'produce'), isRight(r)))
    setChecked(true)
  }

  const score = paradigm.rows.filter(isRight).length
  const half = paradigm.rows.length / 2

  const cell = (r: ParadigmRow) => (
    <td key={r.key} className={checked ? (isRight(r) ? 'right' : 'wrong') : ''}>
      <GreekInput compact value={values[r.key] ?? ''} disabled={checked} placeholder=""
        onChange={(v) => setValues((vs) => ({ ...vs, [r.key]: v }))} />
      {/* A caption rather than a placeholder, so a long gloss wraps instead of being cut off on a phone. */}
      <div className="cell-gloss muted small">{r.gloss}</div>
      {checked && !isRight(r) && <div className="greek correction">{r.display ?? r.forms[0]}</div>}
      {checked && isRight(r) && !checkGreek(values[r.key] ?? '', r.forms, true) && (
        <div className="greek muted">accented: {r.display ?? r.forms[0]}</div>
      )}
    </td>
  )

  return (
    <div>
      <p className="muted">Type each form. Transliteration keys work here: <code>{example[0]}</code> → <span className="greek">{example[1]}</span>.</p>
      <table className="paradigm">
        <thead><tr><th /><th>Singular</th><th>Plural</th></tr></thead>
        <tbody>
          {['1st', '2nd', '3rd'].map((person, i) => (
            <tr key={person}>
              <th>{person}</th>
              {cell(paradigm.rows[i])}
              {cell(paradigm.rows[i + half])}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        {checked ? (
          <>
            <span className="score small">{score} / {paradigm.rows.length}</span>
            <button className="primary" onClick={onRestart}>Try again</button>
          </>
        ) : (
          <button className="primary" onClick={check}>Check</button>
        )}
      </div>
    </div>
  )
}

/** See a form, name its person and number. */
function IdentifyDrill({ chapter, paradigm, onRestart }: DrillProps) {
  // Weakest rows first; every accepted spelling is asked (ἐστί and ἐστίν both appear).
  const [questions] = useState(() =>
    pickWeakest(paradigm.rows, (r) => paradigmItemId(chapter.number, paradigm.id, r, 'identify'), paradigm.rows.length)
      .flatMap((r) => shuffle(r.forms).map((form) => paradigmIdentifyQuestion(chapter, paradigm, r, form))),
  )
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="paradigm" />
}

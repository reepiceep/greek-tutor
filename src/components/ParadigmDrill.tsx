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

type Mode = 'chart' | 'identify' | 'predicate' | 'enclitics'

const MODES: { mode: Mode; label: string; available: (ch: Chapter) => boolean }[] = [
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
      {mode === 'chart' && <ChartDrill key={key} chapter={chapter} paradigm={paradigm} onRestart={restart} />}
      {mode === 'identify' && <IdentifyDrill key={key} chapter={chapter} paradigm={paradigm} onRestart={restart} />}
      {mode === 'predicate' && <PredicateDrill key={key} chapter={chapter} onRestart={restart} />}
      {mode === 'enclitics' && <EncliticDrill key={key} chapter={chapter} onRestart={restart} />}
    </section>
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
      <GreekInput compact value={values[r.key] ?? ''} disabled={checked}
        placeholder={r.gloss}
        onChange={(v) => setValues((vs) => ({ ...vs, [r.key]: v }))} />
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

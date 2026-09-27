import { type ReactNode, useState } from 'react'
import type { Chapter, PronounForm } from '../data/types'
import { adjParseItemId, adjParseQuestion, distinctForms, NOUN_CASES } from '../lib/declensionQuestions'
import { pickWeakest, record, shuffle, useProgress } from '../lib/progress'
import {
  PRONOUN_SLOTS, pronounEmphasisId, pronounEmphasisQuestion, pronounMeaningId, pronounMeaningQuestion, pronounParseId, pronounParseQuestion,
  pronounProduceId, pronounProduceQuestion, pronounStressQuestion, pronounVerseCaseQuestion, pronounVerseId, pronounVerseTranslateQuestion,
  pronounVerseWhoQuestion, slotForms,
} from '../lib/pronounQuestions'
import { checkGreek } from '../lib/greek'
import { GreekInput } from './GreekInput'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'chart' | 'parse' | 'meaning' | 'produce' | 'verses' | 'nouns'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'chart', label: 'Fill the chart' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'meaning', label: 'Meaning' },
  { tab: 'produce', label: 'English → Greek' },
  { tab: 'verses', label: 'In verses' },
  { tab: 'nouns', label: 'New nouns' },
]

export function Pronouns({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Personal pronouns</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'meaning' && <Meaning key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'chart' && <FillChart key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'produce' && <Produce key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'nouns' && <Nouns key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const COLUMNS = [
  { person: 1, number: 'sg', label: '1st sg' },
  { person: 1, number: 'pl', label: '1st pl' },
  { person: 2, number: 'sg', label: '2nd sg' },
  { person: 2, number: 'pl', label: '2nd pl' },
] as const

type Hide = 'none' | 'greek' | 'english'

/** The forms in one slot: the emphatic (or only) form, and the unemphatic enclitic if there is one. */
function slot(forms: PronounForm[], person: 1 | 2, number: 'sg' | 'pl', c: (typeof NOUN_CASES)[number]) {
  const fs = forms.filter((f) => f.person === person && f.number === number && f.case === c)
  return { main: fs.find((f) => f.emphatic !== false)!, enclitic: fs.find((f) => f.emphatic === false) }
}

/** The paradigm as a reference chart. Hide the Greek or the English to test yourself, then click a cell to check it. */
function PronounChart({ forms }: { forms: PronounForm[] }) {
  const [hide, setHide] = useState<Hide>('none')
  const [shown, setShown] = useState<Set<string>>(new Set())
  const keys = NOUN_CASES.flatMap((c) => COLUMNS.map((col) => `${c}:${col.label}`))
  const toggle = (k: string) => setShown((s) => {
    const next = new Set(s)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    return next
  })
  const choose = (h: Hide) => { setHide(h); setShown(new Set()) }
  const reveal = (k: string, content: ReactNode, hidden: boolean) =>
    !hidden ? content
      : shown.has(k)
        ? <button className="revealed" onClick={() => toggle(k)} title="Hide again">{content}</button>
        : <button className="reveal" onClick={() => toggle(k)}>show</button>

  return (
    <>
      <div className="reference-tools">
        <div className="hide-choice" role="group" aria-label="Hide">
          <span className="muted small">Hide</span>
          <div className="seg small-seg">
            <button className={hide === 'none' ? 'on' : ''} onClick={() => choose('none')}>Nothing</button>
            <button className={hide === 'greek' ? 'on' : ''} onClick={() => choose('greek')}>Greek</button>
            <button className={hide === 'english' ? 'on' : ''} onClick={() => choose('english')}>English</button>
          </div>
        </div>
        {hide !== 'none' && (
          <div className="seg small-seg">
            <button onClick={() => setShown(new Set(keys))} disabled={shown.size === keys.length}>Show all</button>
            <button onClick={() => setShown(new Set())} disabled={shown.size === 0}>Hide all</button>
          </div>
        )}
      </div>
      {hide !== 'none' && (
        <p className="muted small">Say the hidden {hide === 'greek' ? 'Greek (both forms where there are two)' : 'meaning'}, then click to check it.</p>
      )}
      <table className="paradigm compact pronoun-table">
        <thead><tr><th />{COLUMNS.map((c) => <th key={c.label}>{c.label}</th>)}</tr></thead>
        <tbody>
          {NOUN_CASES.map((c) => (
            <tr key={c}>
              <th>{c.slice(0, 3)}</th>
              {COLUMNS.map((col) => {
                const k = `${c}:${col.label}`
                const { main, enclitic } = slot(forms, col.person, col.number, c)
                return (
                  <td key={col.label}>
                    {reveal(k, <span className="greek">{main.form}{enclitic && <span className="muted"> ({enclitic.form})</span>}</span>, hide === 'greek')}
                    <div className="cell-gloss">{reveal(k, main.english, hide === 'english')}</div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function Forms({ chapter }: { chapter: Chapter }) {
  const p = chapter.pronouns
  const forms = p?.forms ?? []
  return (
    <>
      <Lesson title="First and second person pronouns">
        <ul>
          <li>
            The forms don’t follow a noun pattern closely, so learn them as a chart. The <strong>plurals</strong> are easy to
            mix up: <span className="greek">ἡμ-</span> is <strong>we / us</strong>, <span className="greek">ὑμ-</span> is
            <strong> you</strong>.
          </li>
          <li>
            In the singular genitive, dative and accusative there are two forms: the <strong>emphatic</strong>{' '}
            (<span className="greek">ἐμοῦ, σοῦ</span>) and the unemphatic <strong>enclitic</strong> (<span className="greek">μου, σου</span>).
            The meaning is the same; the emphatic forms are normal after prepositions (<span className="greek">διʼ ἐμοῦ</span>).
          </li>
          <li>
            A Greek verb already contains its subject (<span className="greek">λέγω</span> = “I say”), so a <strong>nominative
            pronoun</strong> like <span className="greek">ἐγώ</span> or <span className="greek">ὑμεῖς</span> usually adds emphasis or
            contrast: <span className="greek">ἐγὼ δὲ λέγω ὑμῖν</span>, “but <em>I</em> say to you.”
          </li>
          <li>The genitive often shows possession: <span className="greek">τὸ ὄνομά σου</span>, “your name” (literally “the name of you”).</li>
          <li>
            A pronoun takes its <strong>person and number</strong> from the word it stands for (its antecedent), but its <strong>case</strong>
            from its own job in the sentence. First and second person pronouns have no gender, so parse them by person, case and number.
          </li>
          <li>
            The endings echo the nouns: genitive <span className="greek">μου, ἡμῶν</span> like <span className="greek">λόγου, λόγων</span>;
            dative <span className="greek">μοι, ἡμῖν</span> with the ι of <span className="greek">λόγῳ</span>. In the plural the two persons differ only
            in the first letter.
          </li>
          <li>
            <span className="greek">μου</span> and <span className="greek">σου</span> usually <strong>follow</strong> their noun. Being enclitic, they can
            put a second accent on it: <span className="greek">τὸ ὄνομά μου</span>, <span className="greek">ὁ κύριός μου</span>.
          </li>
        </ul>
      </Lesson>
      <PronounChart forms={forms} />
    </>
  )
}

// --- Quizzes -------------------------------------------------------------------------

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const forms = chapter.pronouns?.forms ?? []
    const pool = [
      ...forms.map((f) => ({ id: pronounParseId(chapter.number, f), make: () => pronounParseQuestion(chapter, f) })),
      ...forms.filter((f) => f.emphatic !== undefined).map((f) => ({ id: pronounEmphasisId(chapter.number, f), make: () => pronounEmphasisQuestion(chapter, f) })),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Meaning({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const forms = chapter.pronouns?.forms ?? []
    return pickWeakest(forms, (f) => pronounMeaningId(chapter.number, f), 12).map((f) => pronounMeaningQuestion(chapter, forms, f))
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verses = chapter.pronouns?.verses ?? []
    const pool = verses.flatMap((v) => [
      { id: pronounVerseId(chapter.number, v, 'who'), make: () => pronounVerseWhoQuestion(chapter, v) },
      { id: pronounVerseId(chapter.number, v, 'case'), make: () => pronounVerseCaseQuestion(chapter, v) },
      ...(v.stress ? [{ id: pronounVerseId(chapter.number, v, 'stress'), make: () => pronounStressQuestion(chapter, v) }] : []),
      ...(v.wrong?.length ? [{ id: pronounVerseId(chapter.number, v, 'translate'), make: () => pronounVerseTranslateQuestion(chapter, v) }] : []),
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Real New Testament verses (SBLGNT). Identify the highlighted pronoun, say why it is there, or translate the verse.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

function Nouns({ chapter, onRestart }: QuizProps) {
  const nouns = chapter.pronouns?.nouns ?? []
  const [questions] = useState(() => {
    const pool = nouns.flatMap((p) => distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })))
    return pickWeakest(pool, (x) => x.id, 10).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="New third-declension nouns in this chapter" firstVisitOpen={false}>
        <ul>
          <li><span className="greek">πατήρ, πατρός</span> (and <span className="greek">μήτηρ, μητρός</span>): the stem shifts between πατερ- and πατρ-, and the dative plural is <span className="greek">πατράσι(ν)</span>.</li>
          <li><span className="greek">ἀνήρ, ἀνδρός</span>: a δ appears between ν and ρ everywhere except the nominative singular.</li>
          <li><span className="greek">πίστις, πίστεως</span>: the stem vowel ι becomes ε in most forms, and the genitive singular is -εως.</li>
          <li><span className="greek">χάρις, χάριτος</span>: accusative singular <span className="greek">χάριν</span>, not χάριτα (42 of 44 times).</li>
          <li>
            Stems in τ and δ (<span className="greek">χαριτ-, φωτ-, ἐλπιδ-</span>): the dental drops before σ, so <span className="greek">χάρις, ἐλπίς, φῶς</span>
            and the dative plurals <span className="greek">χάρισι(ν), ἐλπίσι(ν), φωσί(ν)</span>.
          </li>
          <li>
            The <span className="greek">πίστις</span> type once had a consonantal ι. It shows as ε before an ending that starts with a vowel
            (<span className="greek">πίστεως, πίστει</span>) and as ι before a consonant (<span className="greek">πίστις, πίστιν</span>), with ε again in the
            dative plural (<span className="greek">πίστεσι</span>). These nouns are all feminine.
          </li>
          <li><span className="greek">ὕδωρ, ὕδατος</span>: the stem looks like ὑδατ-, but where there is no ending the old ρ comes back: <span className="greek">ὕδωρ</span>.</li>
          <li><span className="greek">μήτηρ</span> goes like <span className="greek">πατήρ</span>: stem vowel η, ε or nothing (<span className="greek">μήτηρ, μητέρα, μητρός</span>).</li>
        </ul>
      </Lesson>
      <div className="adj-tables">{nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
      <h3>Parse</h3>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

// --- Fill the chart, English → Greek -----------------------------------------------------

/** Type the paradigm from memory. Either form counts where there are two (μου or ἐμοῦ). */
function FillChart({ chapter, onRestart }: QuizProps) {
  const { settings } = useProgress()
  const forms = chapter.pronouns?.forms ?? []
  const [values, setValues] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)
  const cellKey = (s: (typeof PRONOUN_SLOTS)[number]) => `${s.person}-${s.number}-${s.case}`
  const accepted = (s: (typeof PRONOUN_SLOTS)[number]) => slotForms(forms, s).map((f) => f.form)
  const right = (s: (typeof PRONOUN_SLOTS)[number]) => checkGreek(values[cellKey(s)] ?? '', accepted(s), settings.requireAccents)
  const score = PRONOUN_SLOTS.filter(right).length

  const check = () => {
    PRONOUN_SLOTS.forEach((s) => record(pronounProduceId(chapter.number, s, 'desc'), right(s)))
    setChecked(true)
  }

  return (
    <div>
      <p className="muted">Type each form. Where there are two, either the enclitic or the emphatic form counts. Transliteration works: <code>h(mei=s</code> → <span className="greek">ἡμεῖς</span>.</p>
      <table className="paradigm pronoun-fill">
        <thead><tr><th />{COLUMNS.map((c) => <th key={c.label}>{c.label}</th>)}</tr></thead>
        <tbody>
          {NOUN_CASES.map((c) => (
            <tr key={c}>
              <th>{c.slice(0, 3)}</th>
              {COLUMNS.map((col) => {
                const sl = PRONOUN_SLOTS.find((x) => x.person === col.person && x.number === col.number && x.case === c)!
                return (
                  <td key={col.label} className={checked ? (right(sl) ? 'right' : 'wrong') : ''}>
                    <GreekInput compact value={values[cellKey(sl)] ?? ''} disabled={checked} placeholder=""
                      onChange={(v) => setValues((vs) => ({ ...vs, [cellKey(sl)]: v }))} />
                    {checked && !right(sl) && <div className="greek correction">{accepted(sl).join(', ')}</div>}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        {checked ? (
          <>
            <span className="score small">{score} / {PRONOUN_SLOTS.length}</span>
            <button className="primary" onClick={onRestart}>Try again</button>
          </>
        ) : (
          <button className="primary" onClick={check}>Check</button>
        )}
      </div>
    </div>
  )
}

/** From English (“to us”) or a description (“2nd person genitive plural”) to the Greek form. */
function Produce({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const forms = chapter.pronouns?.forms ?? []
    const pool = PRONOUN_SLOTS.flatMap((s) => (['english', 'desc'] as const).map((kind) => ({
      id: pronounProduceId(chapter.number, s, kind), make: () => pronounProduceQuestion(chapter, forms, s, kind),
    })))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Pick the Greek. Where there are two forms, the enclitic one is offered (<span className="greek">μου</span> rather than <span className="greek">ἐμοῦ</span>).</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

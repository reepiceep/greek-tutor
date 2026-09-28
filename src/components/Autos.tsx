import { useState } from 'react'
import { chapter11 } from '../data/chapter11'
import type { Chapter, Gender } from '../data/types'
import {
  AUTOS_SLOTS, AUTOS_USES, autosEnglish, autosItemId, autosProduceId, autosProduceQuestion, autosSentenceQuestion,
  autosTranslateQuestion, autosUseQuestion,
} from '../lib/autosQuestions'
import { adjParseItemId, adjParseQuestion, distinctForms, formAt, NOUN_CASES, type Slot } from '../lib/declensionQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import { slotForms } from '../lib/pronounQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'
import { ReferenceChart, type ReferenceCell, type ReferenceRow } from './ReferenceChart'

type Tab = 'forms' | 'parse' | 'produce' | 'uses' | 'verses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'produce', label: 'English → Greek' },
  { tab: 'uses', label: 'Uses' },
  { tab: 'verses', label: 'Read verses' },
]

export function Autos({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2 className="greek">αὐτός</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'produce' && <Produce key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const GENDER_COLUMNS: { gender: Gender; label: string }[] = [
  { gender: 'masculine', label: 'masc' },
  { gender: 'feminine', label: 'fem' },
  { gender: 'neuter', label: 'neut' },
]

/** Case rows for singular then plural, with a heading row before each number. */
function numberRows(cells: (s: Omit<Slot, 'gender'>) => ReferenceCell[]): ReferenceRow[] {
  return (['sg', 'pl'] as const).flatMap((number) => NOUN_CASES.map((c, i) => ({
    label: c.slice(0, 3),
    section: i === 0 ? (number === 'sg' ? 'Singular' : 'Plural') : undefined,
    cells: cells({ case: c, number }),
  })))
}

function Forms({ chapter }: { chapter: Chapter }) {
  const a = chapter.autos
  if (!a) return null
  const third = (s: Omit<Slot, 'gender'>) => GENDER_COLUMNS.map(({ gender }) => ({
    greek: <span className="greek">{formAt(a.paradigm, { ...s, gender })}</span>,
    english: autosEnglish({ ...s, gender }),
  }))
  // 1st and 2nd person from chapter 11: the emphatic (or only) form, with the enclitic in brackets.
  const firstSecond = (person: 1 | 2, s: Omit<Slot, 'gender'>): ReferenceCell => {
    const [first, second] = slotForms(chapter11.pronouns!.forms, { person, ...s })
    const main = second ?? first
    return { greek: <span className="greek">{main.form}{second && <span className="muted"> ({first.form})</span>}</span>, english: main.english }
  }
  return (
    <>
      <Lesson title="The three uses of αὐτός">
        <p>
          <span className="greek">αὐτός</span> declines like <span className="greek">ἀγαθός</span>, except that the neuter
          nominative and accusative singular is <span className="greek">αὐτό</span> (no ν). How you translate it depends on where
          it stands relative to the article:
        </p>
        <ol>
          <li><strong>{AUTOS_USES.pronoun.label}.</strong> <span className="greek">λέγω αὐτῷ</span>, “I say to him”; <span className="greek">τὸ ὄνομα αὐτοῦ</span>, “his name.” It agrees in number and gender with the word it refers to, so feminine <span className="greek">αὐτάς</span> referring to “commandments” is just “them.”</li>
          <li><strong>{AUTOS_USES.intensive.label}.</strong> <span className="greek">αὐτὸς ὁ κύριος</span> or <span className="greek">ὁ κύριος αὐτός</span>, “the Lord himself.”</li>
          <li><strong>{AUTOS_USES.identical.label}.</strong> <span className="greek">ὁ αὐτὸς κύριος</span>, “the same Lord”; <span className="greek">τὸ αὐτό</span>, “the same thing.”</li>
        </ol>
      </Lesson>
      <Lesson title="Translating αὐτός well">
        <ul>
          <li>
            <strong>Gender in English.</strong> If it refers to a person, follow the person: <span className="greek">τὸν υἱὸν αὐτῆς</span>, “her son.”
            If it refers to a thing, English says “it” or “them,” whatever the Greek gender: <span className="greek">οἱ εὑρίσκοντες αὐτήν</span>{' '}
            (the gate, <span className="greek">ἡ πύλη</span>) is “those who find <em>it</em>.”
          </li>
          <li>
            <strong>After a preposition</strong> the genitive is just the object of the preposition, not a possessive:{' '}
            <span className="greek">ἔμπροσθεν αὐτῶν</span> is “ahead of <em>them</em>,” not “ahead of their.” After a noun it is possessive:{' '}
            <span className="greek">τὴν φωνὴν αὐτοῦ</span>, “his voice.”
          </li>
          <li>
            <strong>Intensive.</strong> αὐτός has no article of its own, while its noun usually has one. It can also go with{' '}
            <span className="greek">ἐγώ</span> or <span className="greek">σύ</span> (<span className="greek">ἐγὼ αὐτὸς ἄνθρωπός εἰμι</span>, “I myself am a man”) or with
            a subject that is only in the verb (<span className="greek">καὶ αὐτὸς … ἐλεύσομαι</span>, “I myself will come”). If the verb is first or second
            person, αὐτός can’t be “he”: it is “myself,” “yourself.”
          </li>
          <li>
            <strong>Emphatic.</strong> With a third-person verb, a nominative <span className="greek">αὐτός</span> standing alone is the subject “he,” written
            out for emphasis: <span className="greek">αὐτὸς εἶπεν</span>, “he himself said.”
          </li>
          <li>
            <strong>Identical.</strong> The test is the article right before αὐτός: <span className="greek">ὁ αὐτός</span> means “the same.” It usually goes with
            a noun (<span className="greek">ἐν τῇ αὐτῇ γνώμῃ</span>, “in the same judgment”), but can stand alone:{' '}
            <span className="greek">ὁ αὐτός</span>, “the same one”; <span className="greek">τὰ αὐτά</span>, “the same things.” Luke sometimes uses the predicate
            position for “that very”: <span className="greek">ἐν αὐτῇ τῇ ὥρᾳ</span>, “at that very hour.”
          </li>
        </ul>
      </Lesson>
      <Lesson title="Also in this chapter" firstVisitOpen={false}>
        <ul>
          <li>
            <strong>Time.</strong> The dative (often with <span className="greek">ἐν</span>) tells <em>when</em>: <span className="greek">τῇ τρίτῃ ἡμέρᾳ</span>, “on the
            third day.” The accusative tells <em>how long</em>: <span className="greek">πάσας τὰς ἡμέρας</span>, “all the days” (Matt 28:20).
          </li>
          <li><span className="greek">μέν … δέ</span> set two things side by side: “on the one hand … on the other.” Often <span className="greek">μέν</span> is left untranslated and <span className="greek">δέ</span> is “but.”</li>
          <li><span className="greek">μόνος</span> is an adjective, “alone, only,” but its neuter <span className="greek">μόνον</span> is often an adverb: “only.”</li>
          <li><span className="greek">μηδείς, μηδεμία, μηδέν</span> declines exactly like <span className="greek">οὐδείς</span> (chapter 10). It is used where Greek uses <span className="greek">μή</span> rather than οὐ.</li>
          <li>
            <span className="greek">πούς, ποδός</span> is like <span className="greek">ἐλπίς, ἐλπίδος</span>: the δ drops before σ (dative plural <span className="greek">ποσί(ν)</span>).
            The nominative lengthens ο to ου: <span className="greek">πούς</span>, not πός.
          </li>
        </ul>
      </Lesson>
      <h3>αὐτός</h3>
      <ReferenceChart
        className="autos-table"
        columns={GENDER_COLUMNS.map((g) => g.label)}
        rows={numberRows(third)}
      />
      <h3>All the personal pronouns</h3>
      <p className="muted small">First and second person from chapter 11 (enclitic forms in brackets), third person is αὐτός.</p>
      <div className="chart-wrap">
        <ReferenceChart
          className="all-pronouns-table"
          greekHint="Greek (both forms where there are two)"
          columns={['1st', '2nd', '3rd masc', '3rd fem', '3rd neut']}
          rows={numberRows((s) => [firstSecond(1, s), firstSecond(2, s), ...third(s)])}
        />
      </div>
      <h3>New words</h3>
      <div className="adj-tables">
        {a.nouns.map((p) => <DeclensionTable key={p.id} p={p} />)}
      </div>
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
    const a = chapter.autos!
    const pool = [a.paradigm, ...a.nouns].flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Forms of αὐτός, plus the new third-declension nouns αἰών and πούς, and μηδείς.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

/** From English (“her (possessive)”) or a description (“3rd person feminine genitive singular”) to the form. */
function Produce({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const p = chapter.autos!.paradigm
    const pool = AUTOS_SLOTS.flatMap((s) => (['english', 'desc'] as const).map((kind) => ({
      id: autosProduceId(chapter.number, s, kind), make: () => autosProduceQuestion(chapter, p, s, kind),
    })))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Pick the form of αὐτός. In the plural, the English doesn’t show gender, so it is given in brackets.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.autos?.items ?? []
    const pool = items.flatMap((a) => [
      { id: autosItemId(chapter.number, a, 'use'), make: () => autosUseQuestion(chapter, a) },
      { id: autosItemId(chapter.number, a, 'translate'), make: () => autosTranslateQuestion(chapter, a) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Look at the article: right before αὐτός means “same”; on the noun only means “-self”; no noun means “he, she, it.”</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

/** Four verses, each in three steps: the use, the highlighted word, then the whole sentence. */
function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const readings = chapter.autos?.readings ?? []
    return pickWeakest(readings, (a) => autosItemId(chapter.number, a, 'sentence'), 4).flatMap((a) => [
      autosUseQuestion(chapter, a),
      autosTranslateQuestion(chapter, a),
      autosSentenceQuestion(chapter, a),
    ])
  })
  return (
    <>
      <p className="muted">Longer New Testament verses (SBLGNT), each in three steps: how αὐτός is used, how to translate it, then the whole sentence.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

import { useState } from 'react'
import type { Chapter, DeclensionParadigm, Gender } from '../data/types'
import { numberRows } from '../lib/chartRows'
import { adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, distinctForms, formAt } from '../lib/declensionQuestions'
import {
  DEMONSTRATIVE_SLOTS, DEMONSTRATIVE_USES, demonstrativeEnglish, demonstrativeItemId, demonstrativeProduceId, demonstrativeProduceQuestion,
  demonstrativeSentenceQuestion, demonstrativeTranslateQuestion, demonstrativeUseQuestion, lookalikeId, lookalikeQuestion, VOCATIVE_RULES,
  vocativeCaseQuestion, vocativeFormId, vocativeFormQuestion, vocativeItemId,
} from '../lib/demonstrativeQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'
import { ReferenceChart, type ReferenceRow } from './ReferenceChart'

type Tab = 'forms' | 'parse' | 'produce' | 'agree' | 'uses' | 'verses' | 'lookalikes' | 'vocative'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'produce', label: 'English → Greek' },
  { tab: 'agree', label: 'Agreement' },
  { tab: 'uses', label: 'Uses' },
  { tab: 'verses', label: 'Read verses' },
  { tab: 'lookalikes', label: 'Look-alikes' },
  { tab: 'vocative', label: 'Vocative' },
]

export function Demonstratives({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Demonstratives</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'produce' && <Produce key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'agree' && <Agree key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'lookalikes' && <Lookalikes key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'vocative' && <Vocative key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

const GENDER_COLUMNS: { gender: Gender; label: string }[] = [
  { gender: 'masculine', label: 'masc' },
  { gender: 'feminine', label: 'fem' },
  { gender: 'neuter', label: 'neut' },
]

/** οὗτος or ἐκεῖνος with its English as a pronoun (“this woman”), hideable. */
function DemonstrativeChart({ p }: { p: DeclensionParadigm }) {
  return (
    <>
      <h3 className="greek">{p.lexical}</h3>
      <ReferenceChart
        className={`dem-table dem-${p.id}`}
        columns={GENDER_COLUMNS.map((g) => g.label)}
        rows={numberRows((s) => GENDER_COLUMNS.map(({ gender }) => ({
          greek: <span className="greek">{formAt(p, { ...s, gender })}</span>,
          english: demonstrativeEnglish(p, { ...s, gender }),
        })))}
      />
    </>
  )
}

const HEAUTOU: { case: string; sg: [string, string, string]; pl: [string, string, string]; en: [string, string] }[] = [
  { case: 'gen', sg: ['ἑαυτοῦ', 'ἑαυτῆς', 'ἑαυτοῦ'], pl: ['ἑαυτῶν', 'ἑαυτῶν', 'ἑαυτῶν'], en: ['of', 'of'] },
  { case: 'dat', sg: ['ἑαυτῷ', 'ἑαυτῇ', 'ἑαυτῷ'], pl: ['ἑαυτοῖς', 'ἑαυταῖς', 'ἑαυτοῖς'], en: ['to', 'to'] },
  { case: 'acc', sg: ['ἑαυτόν', 'ἑαυτήν', 'ἑαυτό'], pl: ['ἑαυτούς', 'ἑαυτάς', 'ἑαυτά'], en: ['', ''] },
]
const SELF = ['himself', 'herself', 'itself']
const heautouRows: ReferenceRow[] = (['sg', 'pl'] as const).flatMap((number) => HEAUTOU.map((r, i) => ({
  label: r.case,
  section: i === 0 ? (number === 'sg' ? 'Singular' : 'Plural') : undefined,
  cells: r[number].map((form, g) => ({
    greek: <span className="greek">{form}</span>,
    english: `${r.en[0]} ${number === 'sg' ? SELF[g] : 'themselves'}`.trim(),
  })),
})))

function Forms({ chapter }: { chapter: Chapter }) {
  const d = chapter.demonstratives
  if (!d) return null
  const [houtos, ekeinos] = d.agreement.paradigms
  const others = d.paradigms.filter((p) => p !== houtos && p !== ekeinos)
  return (
    <>
      <Lesson title="οὗτος and ἐκεῖνος">
        <ul>
          <li><span className="greek">οὗτος, αὕτη, τοῦτο</span> is “this” (plural “these”); <span className="greek">ἐκεῖνος, -η, -ο</span> is “that” (plural “those”). Both use 2-1-2 endings, with neuter singular <span className="greek">τοῦτο</span>, <span className="greek">ἐκεῖνο</span> (no ν).</li>
          <li>
            <span className="greek">οὗτος</span> starts like the article: a rough breathing where the article has one
            (<span className="greek">ὁ, ἡ, οἱ, αἱ</span> → <span className="greek">οὗτος, αὕτη, οὗτοι, αὗται</span>) and τ everywhere else
            (<span className="greek">τούτου, ταύτης…</span>). The stem has αυ when the ending has α or η (<span className="greek">ταύτης, ταῦτα</span>) and ου when it has ο or ω (<span className="greek">τοῦτο, τούτων</span>).
          </li>
          <li><strong>{DEMONSTRATIVE_USES.pronoun.label}.</strong> <span className="greek">οὗτός ἐστιν ὁ υἱός μου</span>, “this is my son”; <span className="greek">ταῦτα λέγω</span>, “I say these things.”</li>
          <li><strong>{DEMONSTRATIVE_USES.adjective.label}.</strong> It stands <em>outside</em> the article, <span className="greek">οὗτος ὁ λόγος</span> or <span className="greek">ὁ λόγος οὗτος</span>, but it means “this word,” not “the word is this.” The noun always has the article.</li>
        </ul>
      </Lesson>
      <Lesson title="Translating demonstratives">
        <ul>
          <li>
            As a pronoun, add a helping word that follows natural gender: <span className="greek">οὗτος</span> “this man,” <span className="greek">αὕτη</span> “this
            woman,” <span className="greek">τοῦτο</span> “this thing,” <span className="greek">ταῦτα</span> “these things.” If the gender comes from a thing,
            leave it out: <span className="greek">αὕτη ἐστὶν ἡ ἐντολή</span> is just “this is the commandment.”
          </li>
          <li>
            Often the difference between “this” and “that” isn’t distance but the flow of thought: <span className="greek">οὗτος</span> for what was just
            mentioned, <span className="greek">ἐκεῖνος</span> for something further back.
          </li>
          <li>
            A demonstrative can weaken into a plain “he, she”: <span className="greek">οὗτος ἦλθεν εἰς μαρτυρίαν</span>, “he came as a witness.” John does this
            often. But it can also be pointed: <span className="greek">ἐκεῖνος</span> may set someone apart (“<em>he</em>, on the other hand”) or sound
            dismissive, like English “that man.”
          </li>
          <li><span className="greek">διὰ τοῦτο</span> (literally “because of this”) is a set phrase: “for this reason, therefore.”</li>
        </ul>
      </Lesson>
      <Lesson title="Also in this chapter" firstVisitOpen={false}>
        <ul>
          <li>
            <strong>πολύς and μέγας</strong> have a longer stem (<span className="greek">πολλ-, μεγαλ-</span>) except in four forms: masculine nominative and
            accusative singular and the neuter nominative/accusative singular: <span className="greek">πολύς, πολύν, πολύ</span> (one λ, and υ) and{' '}
            <span className="greek">μέγας, μέγαν, μέγα</span>.
          </li>
          <li>
            <strong>Adjectives as adverbs.</strong> Any adjective can work as an adverb, usually in the neuter accusative: <span className="greek">πολύ, πολλά</span>{' '}
            “much, often”; <span className="greek">πρῶτον</span> “first”; <span className="greek">μόνον</span> “only.”
          </li>
          <li>
            <strong>Degrees.</strong> Positive “large” (<span className="greek">μέγας</span>), comparative “larger” (<span className="greek">μείζων</span>),
            superlative “largest” (<span className="greek">μέγιστος</span>). In the New Testament the superlative is fading, and the comparative often does
            its job: <span className="greek">μείζων</span> can mean “greatest.” Let the context decide.
          </li>
          <li>
            <strong>Crasis</strong> joins two words into one, marked with ʼ: <span className="greek">κἀγώ</span> = <span className="greek">καὶ ἐγώ</span>, “and I”
            (also <span className="greek">κἀμοί, κἀμέ</span>).
          </li>
          <li>
            <strong>ἑαυτοῦ</strong> is the reflexive pronoun, “himself, herself, itself; themselves.” It declines like <span className="greek">αὐτός</span> but has no
            nominative (a reflexive is never the subject), so its lexical form is the genitive. In the plural it can also be “ourselves” or “yourselves”
            when the verb calls for it.
          </li>
        </ul>
        <ReferenceChart className="heautou-table" columns={GENDER_COLUMNS.map((g) => g.label)} rows={heautouRows} />
      </Lesson>
      <DemonstrativeChart p={houtos} />
      <DemonstrativeChart p={ekeinos} />
      <h3>Other new words</h3>
      <div className="adj-tables">{others.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
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
    const pool = (chapter.demonstratives?.paradigms ?? []).flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
}

function Produce({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = chapter.demonstratives!.agreement.paradigms.flatMap((p) => DEMONSTRATIVE_SLOTS.flatMap((s) => (['english', 'desc'] as const).map((kind) => ({
      id: demonstrativeProduceId(chapter.number, p, s, kind), make: () => demonstrativeProduceQuestion(chapter, p, s, kind),
    }))))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Pick the form of <span className="greek">οὗτος</span> or <span className="greek">ἐκεῖνος</span>. The English uses a helping word to show gender: “this woman,” “those things.”</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Agree({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const a = chapter.demonstratives!.agreement
    const pool = a.paradigms.flatMap((p) => a.nouns.map((n) => ({ id: adjAgreeItemId(chapter.number, p, n), make: () => adjAgreeQuestion(chapter, p, n) })))
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">The demonstrative agrees with its noun in case, number and gender, and stands outside the article: <span className="greek">οὗτος ὁ ὄχλος</span>, “this crowd.”</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.demonstratives?.items ?? []
    const pool = items.flatMap((d) => [
      { id: demonstrativeItemId(chapter.number, d, 'use'), make: () => demonstrativeUseQuestion(chapter, d) },
      { id: demonstrativeItemId(chapter.number, d, 'translate'), make: () => demonstrativeTranslateQuestion(chapter, d) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Does the demonstrative have a noun (same case, number and gender, with the article)? Then it’s an adjective. If not, it’s a pronoun.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

/** Four verses, each in three steps: the use, the highlighted word, then the whole sentence. */
function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const readings = chapter.demonstratives?.readings ?? []
    return pickWeakest(readings, (d) => demonstrativeItemId(chapter.number, d, 'sentence'), 4).flatMap((d) => [
      demonstrativeUseQuestion(chapter, d),
      demonstrativeTranslateQuestion(chapter, d),
      demonstrativeSentenceQuestion(chapter, d),
    ])
  })
  return (
    <>
      <p className="muted">Longer New Testament verses (SBLGNT), each in three steps: pronoun or adjective, how to translate it, then the whole sentence.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

function Lookalikes({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const items = chapter.demonstratives?.lookalikes ?? []
    return pickWeakest(items, (l) => lookalikeId(chapter.number, l), 12).map((l) => lookalikeQuestion(chapter, l))
  })
  return (
    <>
      <Lesson title="Words that look alike" firstVisitOpen={false}>
        <ul>
          <li><span className="greek">αὕτη, αὗται</span> (rough breathing, accent on the first syllable) are “this, these”; <span className="greek">αὐτή, αὐταί</span> (smooth breathing, accent on the last) are “she, they.”</li>
          <li><span className="greek">ταῦτα</span> (with τ) is “these things”; <span className="greek">αὐτά</span> is “them.”</li>
          <li><span className="greek">ἤ</span> (smooth breathing, accent) is “or,” or “than” after a comparison; <span className="greek">ἡ</span> (rough breathing, no accent) is the article.</li>
          <li><span className="greek">κἀγώ, κἀμοί, κἀμέ</span> are <span className="greek">καί</span> run together with <span className="greek">ἐγώ, ἐμοί, ἐμέ</span>.</li>
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

function Vocative({ chapter, onRestart }: QuizProps) {
  const v = chapter.demonstratives!.vocative
  const [questions] = useState(() => {
    const pool = [
      ...v.forms.map((f) => ({ id: vocativeFormId(chapter.number, f), make: () => vocativeFormQuestion(chapter, f) })),
      ...v.items.map((it) => ({ id: vocativeItemId(chapter.number, it), make: () => vocativeCaseQuestion(chapter, it) })),
    ]
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="The vocative: the case of direct address">
        <p>
          When someone is spoken to, the noun is in the vocative: <span className="greek">Κύριε κύριε</span>, “Lord, Lord.” The forms are simple, and the
          context (a command, a “you” verb, a question) usually shows it.
        </p>
        <ul>
          <li>{VOCATIVE_RULES[1]} <span className="greek">Ψυχή, ἔχεις πολλὰ ἀγαθά</span>, “Soul, you have many good things.”</li>
          <li>{VOCATIVE_RULES[2]}</li>
          <li>{VOCATIVE_RULES[3]}</li>
          <li>In the plural the vocative is always the same as the nominative: <span className="greek">ἄνδρες Γαλιλαῖοι</span>, “men of Galilee.”</li>
        </ul>
      </Lesson>
      <table className="paradigm compact vocative-table">
        <thead><tr><th>Noun</th><th>Vocative</th><th /></tr></thead>
        <tbody>
          {v.forms.map((f) => (
            <tr key={`${f.lemma}-${f.number}`}>
              <td className="greek">{f.lemma}</td>
              <td className="greek">{f.form}</td>
              <td className="muted small">{f.number === 'pl' ? 'plural' : `${f.declension}${['st', 'nd', 'rd'][f.declension - 1]} decl.`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Practice</h3>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

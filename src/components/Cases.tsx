import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  ARTICLE, CASES_USE, CASE_FUNCTIONS, caseUseQuestion, caseUseTranslateQuestion, casePhraseItemId, phraseParseQuestion, phraseSlots,
  phraseTranslateQuestion,
} from '../lib/caseQuestions'
import { adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import { usageItemId } from '../lib/usageQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { DeclensionTable } from './DeclensionTable'
import { Lesson } from './Lesson'

type Tab = 'forms' | 'parse' | 'phrases' | 'uses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Endings' },
  { tab: 'parse', label: 'Parse nouns' },
  { tab: 'phrases', label: 'Phrases' },
  { tab: 'uses', label: 'In verses' },
]

export function Cases({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Genitive and dative</h2>
        <div className="seg">
          {TABS.map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'phrases' && <Phrases key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// One row per case: the ending each declension has, as in Mounce's summary charts.
const ENDING_ROWS: { label: string; forms: [string, string, string, string] }[] = [
  { label: 'nom sg', forms: ['-ος', '-ον', '-η', '-α'] },
  { label: 'gen sg', forms: ['-ου', '-ου', '-ης', '-ας'] },
  { label: 'dat sg', forms: ['-ῳ', '-ῳ', '-ῃ', '-ᾳ'] },
  { label: 'acc sg', forms: ['-ον', '-ον', '-ην', '-αν'] },
  { label: 'nom pl', forms: ['-οι', '-α', '-αι', '-αι'] },
  { label: 'gen pl', forms: ['-ων', '-ων', '-ων', '-ων'] },
  { label: 'dat pl', forms: ['-οις', '-οις', '-αις', '-αις'] },
  { label: 'acc pl', forms: ['-ους', '-α', '-ας', '-ας'] },
]

function Forms({ chapter }: { chapter: Chapter }) {
  const nouns = chapter.cases?.nouns ?? []
  return (
    <>
      <Lesson title="The genitive and the dative">
        <p>
          The <strong>case</strong> of a noun tells you what it is doing in the sentence, and the ending shows the case.
          This chapter adds two cases to the nominative (subject) and accusative (direct object):
        </p>
        <ul>
          <li>
            <strong>Genitive</strong>: possession or connection, “of” or “’s”: <span className="greek">ὁ λόγος τοῦ κυρίου</span>, “the word of the Lord.”
            It also covers relationships: <span className="greek">ὁ υἱὸς τοῦ θεοῦ</span>, “the son of God.”
          </li>
          <li>
            <strong>Dative</strong>: the indirect object, “to” or “for”: <span className="greek">εἶπεν αὐτῷ</span>, “he said to him.” It also says
            where or when, usually after <span className="greek">ἐν</span> (“in,” “at”), and by what means (“by,” “with”).
          </li>
        </ul>
        <p>Things to watch for:</p>
        <ul>
          <li>
            The <strong>iota subscript</strong> marks the dative singular of most nouns: <span className="greek">κυρίῳ, ἁμαρτίᾳ, ἀρχῇ</span>. It is a small
            ι under a long vowel and isn’t pronounced.
          </li>
          <li>
            <span className="greek">-ων</span> is the genitive plural in every declension and gender, so <span className="greek">-ων</span> always means “of the …s.”
          </li>
          <li>
            Some forms look alike: <span className="greek">ἁμαρτίας</span> is genitive singular or accusative plural. The article settles it:
            <span className="greek"> τῆς ἁμαρτίας</span> is “of the sin,” <span className="greek">τὰς ἁμαρτίας</span> is “the sins.”
          </li>
          <li>
            <span className="greek">Ἰησοῦ</span> is both genitive and dative; context decides. <span className="greek">Ἰησοῦς</span> (nominative) and{' '}
            <span className="greek">Ἰησοῦν</span> (accusative) are different.
          </li>
          <li>The prepositions <span className="greek">ἐν</span> (+ dative, “in”) and <span className="greek">εἰς</span> (+ accusative, “into”) need different cases.</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <caption>Case endings of the first and second declensions</caption>
        <thead><tr><th /><th>2nd masc</th><th>2nd neut</th><th>1st fem (η)</th><th>1st fem (α)</th></tr></thead>
        <tbody>
          {ENDING_ROWS.map((r) => (
            <tr key={r.label} className={r.label.startsWith('gen') || r.label.startsWith('dat') ? 'focus' : ''}>
              <th>{r.label}</th>
              {r.forms.map((f, i) => <td key={i} className="greek">{f}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference article-table">
        <caption>The article: the same endings, and the quickest way to tell the case</caption>
        <thead><tr><th /><th>masc sg</th><th>fem sg</th><th>neut sg</th><th>masc pl</th><th>fem pl</th><th>neut pl</th></tr></thead>
        <tbody>
          {['nom', 'gen', 'dat', 'acc'].map((c, i) => (
            <tr key={c} className={c === 'gen' || c === 'dat' ? 'focus' : ''}>
              <th>{c}</th>
              {(['sg', 'pl'] as const).flatMap((n) => (['masculine', 'feminine', 'neuter'] as const).map((g) => (
                <td key={`${n}-${g}`} className="greek">{ARTICLE[g][n][i]}</td>
              )))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="adj-tables noun-grid">
        {nouns.map((n) => <DeclensionTable key={n.paradigm.id} p={n.paradigm} />)}
      </div>
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.cases?.nouns ?? []).flatMap(({ paradigm: p }) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Give the case, number and gender of each noun. Some forms have more than one right answer; only one is offered.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Phrases({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = phraseSlots(chapter).flatMap((s) => [
      { id: casePhraseItemId(chapter.number, s, 'translate'), make: () => phraseTranslateQuestion(chapter, s) },
      { id: casePhraseItemId(chapter.number, s, 'parse'), make: () => phraseParseQuestion(chapter, s) },
    ])
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Article + noun in the genitive or dative: “of the lord,” “to the sons.” Read the article and the ending together.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const uses = chapter.cases?.uses ?? []
    const pool = uses.flatMap((u) => [
      { id: usageItemId(chapter.number, CASES_USE.prefix, u, 'use'), make: () => caseUseQuestion(chapter, u) },
      { id: usageItemId(chapter.number, CASES_USE.prefix, u, 'translate'), make: () => caseUseTranslateQuestion(chapter, u) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="What is the case doing?">
        <ul>
          {(['subject', 'object', 'possession', 'indirect', 'place', 'means'] as const).map((k) => (
            <li key={k}><strong>{CASE_FUNCTIONS[k].label}.</strong> {CASE_FUNCTIONS[k].explain}</li>
          ))}
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

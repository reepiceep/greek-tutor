import { useState } from 'react'
import type { Chapter } from '../data/types'
import { adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, distinctForms } from '../lib/declensionQuestions'
import {
  DEMONSTRATIVE_USES, demonstrativeItemId, demonstrativeTranslateQuestion, demonstrativeUseQuestion,
} from '../lib/demonstrativeQuestions'
import { pickWeakest } from '../lib/progress'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'agree' | 'uses'

const TABS: { tab: Tab; label: string }[] = [
  { tab: 'forms', label: 'Forms' },
  { tab: 'parse', label: 'Parse' },
  { tab: 'agree', label: 'Agreement' },
  { tab: 'uses', label: 'Uses' },
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
      {tab === 'agree' && <Agree key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function Forms({ chapter }: { chapter: Chapter }) {
  const d = chapter.demonstratives
  if (!d) return null
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
          <li><strong>{DEMONSTRATIVE_USES.adjective.label}.</strong> It stands <em>outside</em> the article, <span className="greek">οὗτος ὁ λόγος</span> or <span className="greek">ὁ λόγος οὗτος</span>, but it means “this word,” not “the word is this.”</li>
        </ul>
        <p className="muted">Also in this chapter: the irregular adjectives <span className="greek">μέγας</span> and <span className="greek">πολύς</span>, which switch to a longer stem (<span className="greek">μεγαλ-, πολλ-</span>) in most forms, and the nouns <span className="greek">γυνή</span> and <span className="greek">πόλις</span>.</p>
      </Lesson>
      <div className="adj-tables">{d.paradigms.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
    </>
  )
}

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

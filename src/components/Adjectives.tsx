import { useState } from 'react'
import type { Chapter } from '../data/types'
import {
  USE_RULES, adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, adjTranslateQuestion,
  adjUseItemId, adjUseQuestion, distinctForms, translatable,
} from '../lib/declensionQuestions'
import { pickWeakest, shuffle } from '../lib/progress'
import {
  ADJ_READING_SKILLS, adjReadingItemId, adjReadingQuestion, allAdjectives, lexicalFormQuestion, lexicalForms, lexicalItemId,
  substItemId, substItems, substQuestion,
} from '../lib/adjReadingQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { DeclensionTable } from './DeclensionTable'

type Tab = 'forms' | 'parse' | 'agree' | 'uses' | 'nouns' | 'read'

const TABS: { tab: Tab; label: string; available: (ch: Chapter) => boolean }[] = [
  { tab: 'forms', label: 'Forms', available: () => true },
  { tab: 'parse', label: 'Parse', available: () => true },
  { tab: 'agree', label: 'Agreement', available: () => true },
  { tab: 'uses', label: 'Uses', available: () => true },
  { tab: 'nouns', label: 'As nouns', available: (ch) => substItems(ch).length > 0 },
  { tab: 'read', label: 'Read verses', available: (ch) => !!ch.adjectives?.readings?.length },
]

export function Adjectives({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<Tab>('forms')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>Adjectives</h2>
        <div className="seg">
          {TABS.filter((t) => t.available(chapter)).map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'forms' && <Forms chapter={chapter} />}
      {tab === 'parse' && <Parse key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'agree' && <Agree key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'uses' && <Uses key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'nouns' && <AsNouns key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'read' && <ReadVerses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

// --- Forms ---------------------------------------------------------------------------

function Forms({ chapter }: { chapter: Chapter }) {
  const paradigms = chapter.adjectives?.paradigms ?? []
  return (
    <>
      <Lesson title="Adjective forms and agreement">
        <p>
          An adjective <strong>agrees</strong> with the noun it modifies in <strong>case, number and gender</strong>, and uses
          the same endings you already know from nouns: second declension for masculine and neuter, first declension for feminine.
        </p>
        <ul>
          <li><strong>2-1-2 adjectives</strong> have three sets of endings: <span className="greek">ἀγαθός, -ή, -όν</span>. After ε, ι or ρ the feminine uses α instead of η: <span className="greek">πονηρός, -ά, -όν</span>; <span className="greek">ἅγιος, -ία, -ον</span>.</li>
          <li><strong>2-2 adjectives</strong> have only two: <span className="greek">αἰώνιος, -ον</span>. The feminine uses the masculine forms, so you will see <span className="greek">ζωὴ αἰώνιος</span>, “eternal life.”</li>
          <li>Agreement does not mean the endings look the same: <span className="greek">ἀγαθὴ ὁδός</span> is feminine even though <span className="greek">ὁδός</span> ends in -ος.</li>
          <li>The <strong>lexical form</strong> of a word with more than one gender is the masculine nominative singular: <span className="greek">ἀγαθαῖς</span> is from <span className="greek">ἀγαθός</span>, not ἀγαθή.</li>
          <li>
            <span className="greek">-ας</span> is genitive singular <em>or</em> accusative plural when the feminine uses α (<span className="greek">νεκράς</span>), but only accusative plural when it uses η
            (<span className="greek">ἀγαθάς</span>), because the plural always has α.
          </li>
          <li><span className="greek">ἄλλος, -η, -ο</span> has no -ν in the neuter singular (<span className="greek">ἄλλο</span>), like the article <span className="greek">τό</span>.</li>
          <li>
            <span className="greek">ἐμός</span> is an adjective, “my” (and “mine” standing alone), so it agrees with its noun: <span className="greek">ἡ ἐντολὴ ἡ ἐμή</span>. <span className="greek">μου</span> is the genitive of
            <span className="greek"> ἐγώ</span> and does not change: <span className="greek">ἡ ἐντολή μου</span>.
          </li>
          <li><span className="greek">ἀλλήλων</span> (“one another”) is plural only and has no nominative: <span className="greek">ἀλλήλων, ἀλλήλοις, ἀλλήλους</span> (feminine <span className="greek">ἀλλήλας</span>).</li>
        </ul>
      </Lesson>
      <div className="adj-tables">
        {paradigms.map((p) => <DeclensionTable key={p.id} p={p} />)}
      </div>
      {!!chapter.adjectives?.more?.length && (
        <details className="rules">
          <summary>The chapter’s other adjectives</summary>
          <div className="adj-tables">{chapter.adjectives.more.map((p) => <DeclensionTable key={p.id} p={p} />)}</div>
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

function Parse({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const adjectives = allAdjectives(chapter)
    const parse = adjectives.flatMap((p) =>
      distinctForms(p).map((form) => ({ id: adjParseItemId(chapter.number, p, form), make: () => adjParseQuestion(chapter, p, form) })),
    )
    const lexical = adjectives.flatMap((p) =>
      lexicalForms(p).map((form) => ({ id: lexicalItemId(chapter.number, p, form), make: () => lexicalFormQuestion(chapter, p, form) })),
    )
    return shuffle([...pickWeakest(parse, (x) => x.id, 9), ...pickWeakest(lexical, (x) => x.id, 3)]).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">
        Give the case, number and gender, or the lexical form. Some forms have more than one right parsing; only one of them is offered.
      </p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Agree({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const a = chapter.adjectives
    const pool = (a?.paradigms ?? []).flatMap((p) =>
      (a?.nouns ?? []).map((n) => ({ id: adjAgreeItemId(chapter.number, p, n), make: () => adjAgreeQuestion(chapter, p, n) })),
    )
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Match the adjective to the noun’s case, number and gender.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Uses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const uses = chapter.adjectives?.uses ?? []
    const pool = [
      ...uses.map((u) => ({ id: adjUseItemId(chapter.number, u, 'use'), make: () => adjUseQuestion(chapter, u) })),
      ...uses.filter(translatable).map((u) => ({ id: adjUseItemId(chapter.number, u, 'translate'), make: () => adjTranslateQuestion(chapter, u) })),
    ]
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <Lesson title="Attributive, predicate or substantival?">
        <p>Look for the article. Word order does not decide.</p>
        <ul>
          <li><strong>{USE_RULES.attributive.label}.</strong> <span className="greek">ὁ ἀγαθὸς λόγος</span> or <span className="greek">ὁ λόγος ὁ ἀγαθός</span>: “the good word.”</li>
          <li><strong>{USE_RULES.predicate.label}.</strong> <span className="greek">ὁ λόγος ἀγαθός</span> or <span className="greek">ἀγαθὸς ὁ λόγος</span>: “the word is good.”</li>
          <li><strong>{USE_RULES.substantival.label}.</strong> <span className="greek">ὁ ἀγαθός</span>: “the good man”; <span className="greek">οἱ ἅγιοι</span>: “the saints.”</li>
          <li>
            <strong>Third attributive position:</strong> a noun without the article, then article + adjective, still attributive:
            <span className="greek"> εἰρήνην τὴν ἐμήν</span>, “my peace.” It is more common with phrases:
            <span className="greek"> τοὺς παῖδας τοὺς ἐν Βηθλέεμ</span>, “the children who were in Bethlehem.”
          </li>
          <li>
            <strong>No article at all?</strong> Context decides: <span className="greek">ἀγαθὸς ἄνθρωπος</span> is “a good man” or “a man is good.”
            If the sentence already has its verb, or an “is” makes no sense, it is attributive. The <em>Read verses</em> tab practises this.
          </li>
          <li>
            A <strong>neuter plural subject</strong> usually takes a singular verb, seen as one group: <span className="greek">τὰ πνεύματα … ἐστιν</span>.
            English still says “they are.”
          </li>
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

// --- Substantival adjectives -----------------------------------------------------------

function AsNouns({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() =>
    pickWeakest(substItems(chapter), (s) => substItemId(chapter.number, s), 10).map((s) => substQuestion(chapter, s)),
  )
  return (
    <>
      <Lesson title="Adjectives standing as nouns" firstVisitOpen={false}>
        <ul>
          <li>Its <strong>case</strong> comes from its job in the sentence, like any noun: nominative as the subject, accusative as the object.</li>
          <li>
            Its <strong>gender and number</strong> come from what it stands for. Add the word English needs: masculine “man” (plural “people”),
            feminine “woman,” neuter “thing.”
          </li>
          <li>
            <span className="greek">ἀγαθός</span> “a good man” · <span className="greek">ἀγαθαί</span> “good women” · <span className="greek">ἀγαθόν</span> “a good thing” ·
            <span className="greek"> οἱ ἀγαθοί</span> “the good people” · <span className="greek">τὰ ἀγαθά</span> “the good things.”
          </li>
          <li>Common sense wins: <span className="greek">οἱ νεκροί</span> is simply “the dead,” and <span className="greek">οἱ ἅγιοι</span> “the saints.”</li>
        </ul>
      </Lesson>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

// --- Read verses ------------------------------------------------------------------------

/** A few verses, each taken apart in order: which word the adjective goes with, how it is used, the whole sentence. */
function ReadVerses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() =>
    pickWeakest(chapter.adjectives?.readings ?? [], (r) => adjReadingItemId(chapter.number, r, 'translate'), 4)
      .flatMap((r) => ADJ_READING_SKILLS.map((skill) => adjReadingQuestion(chapter, r, skill))),
  )
  return (
    <>
      <details className="rules">
        <summary>How to take a verse apart</summary>
        <ul>
          <li>Find the main subject and verb first; that gives the verse its shape.</li>
          <li>Keep each adjective with the noun it agrees with (same case, number and gender). They form one unit.</li>
          <li>An article right before the adjective: attributive, or substantival if there is no noun. The noun has the article but the adjective doesn’t: predicate.</li>
          <li>No article at all: context decides between “a good man” and “a man is good.”</li>
        </ul>
      </details>
      <ChoiceQuiz questions={questions} onRestart={onRestart} />
    </>
  )
}

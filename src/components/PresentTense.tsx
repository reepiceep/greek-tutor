import { useState } from 'react'
import type { Chapter, PersonSlot, PresentVerb } from '../data/types'
import { pickWeakest, shuffle } from '../lib/progress'
import {
  CONTRACTIONS, CONTRACT_VOWELS, ENDINGS, ENDING_VOWEL, PRONOUN, SLOTS, SLOT_LABEL, contractTypeItemId,
  contractTypeQuestion, contractionItemId, contractionPairs, contractionQuestion, endingFormQuestion, endingItemId, endingPersonQuestion,
  presentDisplay, presentEnglish, presentIdentifyQuestion, presentItemId, presentParadigm, presentProduceQuestion,
  presentTranslateQuestion, presentVerseId, tellsContractType, verseLexicalQuestion, verseParseQuestion,
} from '../lib/presentQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { ChartDrill } from './ParadigmDrill'

type Tab = 'lesson' | 'chart' | 'forms' | 'endings' | 'contractions' | 'verses'

const TABS: { tab: Tab; label: string; contract?: boolean }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'chart', label: 'Fill the chart' },
  { tab: 'forms', label: 'Parse & translate' },
  { tab: 'endings', label: 'Endings', contract: false },
  { tab: 'contractions', label: 'Contractions', contract: true },
  { tab: 'verses', label: 'In verses' },
]

const isContract = (ch: Chapter) => !!ch.present?.verbs.some((v) => v.contract)

/** The present active indicative: chapter 16 (λύω) and chapter 17 (contract verbs). */
export function PresentTense({ chapter }: { chapter: Chapter }) {
  const contract = isContract(chapter)
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>{contract ? 'Contract verbs' : 'Present active indicative'}</h2>
        <div className="seg">
          {TABS.filter((t) => t.contract === undefined || t.contract === contract).map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && (contract ? <ContractLesson chapter={chapter} /> : <PresentLesson chapter={chapter} />)}
      {tab === 'chart' && <Chart key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'forms' && <Forms key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'endings' && <Endings key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'contractions' && <Contractions key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'verses' && <Verses key={key} chapter={chapter} onRestart={restart} />}
    </section>
  )
}

function PresentLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  if (!luo) return null
  return (
    <>
      <Lesson title="The present active indicative">
        <p>
          Every regular verb builds its present the same way: <strong>present stem + connecting vowel + personal ending</strong>.
          Learn the six endings below (the connecting vowel is part of them) and you can form the present of any verb like{' '}
          <span className="greek">λύω</span>.
        </p>
        <ul>
          <li>The ending tells you the subject, so Greek doesn’t need a pronoun: <span className="greek">λύομεν</span>, “we loose.” A pronoun that <em>is</em> there (<span className="greek">ἐγώ, ὑμεῖς</span>) adds emphasis.</li>
          <li>The <strong>connecting vowel</strong> is <span className="greek">ο</span> before μ or ν (<span className="greek">λύ-ο-μεν</span>) and <span className="greek">ε</span> otherwise (<span className="greek">λύ-ε-τε</span>).</li>
          <li>The 3rd plural has a <strong>movable ν</strong>: <span className="greek">λύουσι</span> or <span className="greek">λύουσιν</span>, like <span className="greek">ἐστί(ν)</span>.</li>
          <li>
            The present has <strong>continuous aspect</strong>: it pictures the action as ongoing. <span className="greek">λύω</span> can be “I loose” or “I am
            loosing”; choose whichever reads best in English.
          </li>
          <li>To <strong>parse</strong>: <span className="greek">λύουσι</span> is present active indicative, 3rd person plural, from <span className="greek">λύω</span>, “they are loosing.”</li>
          <li>
            Some verbs take their object in another case: <span className="greek">ἀκούω</span> often takes the genitive
            (<span className="greek">τῆς φωνῆς μου ἀκούουσιν</span>, “they hear my voice”), and <span className="greek">πιστεύω</span> the dative
            (<span className="greek">οὐ πιστεύετέ μοι</span>, “you do not believe me”).
          </li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Ending</th><th>Subject</th><th className="greek">{luo.lemma}</th><th /></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek">-{ENDINGS[s]}</td>
              <td>{PRONOUN[s]}</td>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted small">
        The same endings on the other verbs of this chapter: {verbs.slice(1).map((v, i) => (
          <span key={v.id}>{i > 0 && ' · '}<span className="greek">{presentDisplay(v, '1p')}</span> “{presentEnglish(v, '1p')}”</span>
        ))}.
      </p>
    </>
  )
}

function ContractLesson({ chapter }: { chapter: Chapter }) {
  const models = CONTRACT_VOWELS.map((c) => chapter.present?.verbs.find((v) => v.contract === c)).filter((v) => !!v)
  const vowels = Object.keys(CONTRACTIONS.ε)
  return (
    <>
      <Lesson title="How contract verbs work">
        <p>
          A <strong>contract verb</strong> has a stem ending in <span className="greek">α</span>, <span className="greek">ε</span> or{' '}
          <span className="greek">ο</span>. The lexical form shows that vowel (<span className="greek">ποιέω</span>), but in the
          present it <strong>contracts</strong> with the connecting vowel of the ending: <span className="greek">ποιε + ομεν → ποιοῦμεν</span>.
          The endings are the ones you know from <span className="greek">λύω</span>; what’s new is the contraction.
        </p>
        <ul>
          <li><span className="greek">ου</span> comes from <span className="greek">ε + ο</span>, <span className="greek">ο + ε</span> and <span className="greek">ο + ο</span>.</li>
          <li><span className="greek">ει</span> comes from <span className="greek">ε + ε</span>; <span className="greek">α</span> from <span className="greek">α + ε</span>.</li>
          <li><span className="greek">ω</span> comes from <span className="greek">α + ο</span> (and <span className="greek">α + ου</span>), and from any of the three + <span className="greek">ω</span>.</li>
          <li>An <span className="greek">ι</span> survives, as an iota subscript under a long vowel: <span className="greek">α + ει → ᾳ</span> (<span className="greek">ἀγαπᾷ</span>), <span className="greek">ο + ει → οι</span> (<span className="greek">πληροῖ</span>).</li>
          <li>The contracted syllable usually takes a <strong>circumflex</strong>: <span className="greek">ποιῶ, ποιεῖς, ποιοῦμεν</span>.</li>
          <li>
            To find the lexical form, look at the 2nd and 3rd singular or the 2nd plural: <span className="greek">-εῖς</span> is an ε-contract,{' '}
            <span className="greek">-ᾷς</span> an α-contract, <span className="greek">-οῖς</span> an ο-contract. A form like{' '}
            <span className="greek">ποιῶ</span> could come from any of the three.
          </li>
          <li>
            <span className="greek">οἶδα</span>, “I know,” isn’t a contract verb: it has perfect endings but a present meaning.{' '}
            <span className="greek">οἶδα, οἶδας, οἶδε(ν), οἴδαμεν, οἴδατε, οἴδασι(ν)</span>.
          </li>
        </ul>
      </Lesson>
      <table className="reference contraction-table">
        <caption>Contractions: contract vowel + the ending’s vowel</caption>
        <thead><tr><th />{vowels.map((b) => <th key={b} className="greek">{b}</th>)}</tr></thead>
        <tbody>
          {CONTRACT_VOWELS.map((c) => (
            <tr key={c}>
              <th className="greek">{c}</th>
              {vowels.map((b) => <td key={b} className="greek">{CONTRACTIONS[c][b]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference endings-table">
        <caption>The three models</caption>
        <thead><tr><th />{models.map((v) => <th key={v.id} className="greek">{v.lemma}</th>)}</tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]} <span className="muted greek">+{ENDINGS[s]}</span></th>
              {models.map((v) => <td key={v.id}><span className="greek">{presentDisplay(v, s)}</span><div className="muted small">{presentEnglish(v, s)}</div></td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted small">
        Each cell: stem + contract vowel + ending, e.g. <span className="greek">ἀγαπα + {ENDINGS['1p']}</span>{' '}
        (<span className="greek">α + {ENDING_VOWEL['1p']} → {CONTRACTIONS.α[ENDING_VOWEL['1p']]}</span>) = <span className="greek">ἀγαπῶμεν</span>.
      </p>
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

/** Type the whole chart for one verb: λύω first, then any of the others. */
function Chart({ chapter, onRestart }: QuizProps) {
  const verbs = chapter.present?.verbs ?? []
  const [verb, setVerb] = useState<PresentVerb | undefined>(verbs[0])
  const [round, setRound] = useState(0)
  if (!verb) return null
  return (
    <>
      <div className="seg small-seg" role="group" aria-label="Verb">
        {verbs.map((v) => (
          <button key={v.id} className={`greek ${v === verb ? 'on' : ''}`} onClick={() => { setVerb(v); setRound((r) => r + 1) }}>{v.lemma}</button>
        ))}
      </div>
      <ChartDrill key={`${verb.id}-${round}`} chapter={chapter} paradigm={presentParadigm(verb)} onRestart={onRestart}
        example={isContract(chapter) ? ['poiw=', 'ποιῶ'] : ['lu/w', 'λύω']} />
    </>
  )
}

function Forms({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verbs = chapter.present?.verbs ?? []
    const pool = verbs.flatMap((v) => SLOTS.flatMap((s: PersonSlot) => [
      { id: presentItemId(chapter.number, v, s, 'identify'), make: () => presentIdentifyQuestion(chapter, v, s) },
      { id: presentItemId(chapter.number, v, s, 'translate'), make: () => presentTranslateQuestion(chapter, v, s) },
      { id: presentItemId(chapter.number, v, s, 'produce'), make: () => presentProduceQuestion(chapter, v, s) },
    ]))
    return shuffle(pickWeakest(pool, (x) => x.id, 15)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">
        Forms of all {chapter.present?.verbs.length} verbs: name the person, translate, or pick the Greek. Watch the ending, not the stem.
      </p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Endings({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = SLOTS.flatMap((s) => [
      { id: endingItemId(chapter.number, s, 'person'), make: () => endingPersonQuestion(chapter, s) },
      { id: endingItemId(chapter.number, s, 'ending'), make: () => endingFormQuestion(chapter, s) },
    ])
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return <ChoiceQuiz questions={questions} onRestart={onRestart} layout="paradigm" />
}

function Verses({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verses = chapter.present?.verses ?? []
    const pool = verses.flatMap((v) => [
      { id: presentVerseId(chapter.number, v, 'parse'), make: () => verseParseQuestion(chapter, v) },
      { id: presentVerseId(chapter.number, v, 'lexical'), make: () => verseLexicalQuestion(chapter, v) },
    ])
    return pickWeakest(pool, (x) => x.id, 12).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Present-tense verbs in the New Testament: find the person from the ending, and the verb from the stem.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

function Contractions({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verbs = chapter.present?.verbs ?? []
    const pool = [
      ...contractionPairs().map(({ c, vowel }) => ({ id: contractionItemId(chapter.number, c, vowel), make: () => contractionQuestion(chapter, c, vowel) })),
      ...verbs.flatMap((v) => SLOTS.filter((s) => tellsContractType(v, s)).map((s) => ({
        id: contractTypeItemId(chapter.number, v, s), make: () => contractTypeQuestion(chapter, v, s),
      }))),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Which vowels contract to what, and working back from a form to the kind of contract verb.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

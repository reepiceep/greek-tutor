import { type ReactNode, useState } from 'react'
import type { Chapter, PersonSlot, PresentVerb } from '../data/types'
import { pickWeakest, shuffle } from '../lib/progress'
import {
  ACTIVE_VOWELS, CONTRACTIONS, CONTRACT_VOWELS, ENDINGS, ENDING_VOWEL, MP_ENDINGS, MP_PRIMARY, PRONOUN, SLOTS, SLOT_LABEL, contractTypeItemId,
  contractTypeQuestion, contractionItemId, contractionPairs, contractionQuestion, endingFormQuestion, endingItemId, endingPersonQuestion,
  FUTURE_RULES, futureFormItemId, futureFormQuestion, futureLexicalItemId, futureLexicalQuestion, futureRuleItemId, futureRuleQuestion,
  PERF_ENDINGS, PERF_MP_ENDINGS, redupItemId, redupQuestion, AORP_ENDINGS, PASSIVE_RULES, aoristFormItemId, aoristFormQuestion, passiveRuleFor, passiveRuleItemId, passiveRuleQuestion, CONTRACT_IMPF, IMPF_ENDINGS, IMPF_MP_ENDINGS, SECONDARY, SECONDARY_MP, augmentItemId, augmentQuestion, hasFutureForm, inTense, inVoice, presentDisplay, rootItemId, rootQuestion, ruleFor, tenseItemId, tensePairs, tenseQuestion, presentEnglish, presentIdentifyQuestion, presentItemId, presentParadigm, presentProduceQuestion,
  presentTranslateQuestion, presentVerseId, tellsContractType, verseLexicalQuestion, verseParseQuestion, voiceItemId, voicePairs, voiceQuestion,
} from '../lib/presentQuestions'
import { ChoiceQuiz } from './ChoiceQuiz'
import { Lesson } from './Lesson'
import { ChartDrill } from './ParadigmDrill'

type Tab = 'lesson' | 'chart' | 'forms' | 'endings' | 'voice' | 'roots' | 'augment' | 'stems' | 'forming' | 'tense' | 'contractions' | 'verses'

/** Chapter 16: present active; 17: contract verbs; 18: middle/passive; 19: future; 20: other futures; 21: imperfect; 22: second aorist. */
type Mode = 'active' | 'contract' | 'middle' | 'future' | 'roots' | 'imperfect' | 'aorist' | 'aorist1' | 'passive' | 'perfect'

const TABS: { tab: Tab; label: string; modes?: Mode[] }[] = [
  { tab: 'lesson', label: 'Lesson' },
  { tab: 'chart', label: 'Fill the chart' },
  { tab: 'forms', label: 'Parse & translate' },
  { tab: 'endings', label: 'Endings', modes: ['active', 'middle'] },
  { tab: 'voice', label: 'Active or passive?', modes: ['middle'] },
  { tab: 'contractions', label: 'Contractions', modes: ['contract'] },
  { tab: 'roots', label: 'Verbal roots', modes: ['roots'] },
  { tab: 'augment', label: 'The augment', modes: ['imperfect'] },
  { tab: 'forming', label: 'Forming the future', modes: ['future', 'roots'] },
  { tab: 'tense', label: 'Present or future?', modes: ['future', 'roots'] },
  { tab: 'tense', label: 'Present or imperfect?', modes: ['imperfect'] },
  { tab: 'stems', label: 'Aorist stems', modes: ['aorist'] },
  { tab: 'stems', label: 'Forming the aorist', modes: ['aorist1'] },
  { tab: 'tense', label: 'Imperfect or aorist?', modes: ['aorist', 'aorist1'] },
  { tab: 'stems', label: 'Forming the passive', modes: ['passive'] },
  { tab: 'tense', label: 'Aorist or future?', modes: ['passive'] },
  { tab: 'stems', label: 'Reduplication', modes: ['perfect'] },
  { tab: 'tense', label: 'Aorist or perfect?', modes: ['perfect'] },
  { tab: 'verses', label: 'In verses' },
]

const modeOf = (ch: Chapter): Mode => {
  const verbs = ch.present?.verbs ?? []
  return verbs.some((v) => v.tense === 'perfect') ? 'perfect' : verbs.some((v) => v.passiveForm) ? 'passive' : verbs.some((v) => v.firstAorist) ? 'aorist1' : verbs.some((v) => v.tense === 'aorist') ? 'aorist' : verbs.some((v) => v.tense === 'imperfect') ? 'imperfect' : verbs.some((v) => v.liquid) ? 'roots' : verbs.some((v) => v.tense) ? 'future' : verbs.some((v) => v.voice) ? 'middle' : verbs.some((v) => v.contract) ? 'contract' : 'active'
}

const HEADINGS: Record<Mode, string> = { active: 'Present active indicative', contract: 'Contract verbs', middle: 'Present middle/passive indicative', future: 'Future active/middle indicative', roots: 'Verbal roots and other futures', imperfect: 'Imperfect indicative', aorist: 'Second aorist active/middle indicative', aorist1: 'First aorist active/middle indicative', passive: 'Aorist and future passive indicative', perfect: 'Perfect indicative' }

/** The present indicative: chapter 16 (λύω), chapter 17 (contract verbs) and chapter 18 (the middle/passive). */
export function PresentTense({ chapter }: { chapter: Chapter }) {
  const mode = modeOf(chapter)
  const [tab, setTab] = useState<Tab>('lesson')
  const [round, setRound] = useState(0)
  const restart = () => setRound((r) => r + 1)
  const key = `${tab}-${round}`

  return (
    <section>
      <div className="toolbar">
        <h2>{HEADINGS[mode]}</h2>
        <div className="seg">
          {TABS.filter((t) => !t.modes || t.modes.includes(mode)).map((t) => (
            <button key={t.tab} className={tab === t.tab ? 'on' : ''} onClick={() => { setTab(t.tab); restart() }}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'lesson' && (mode === 'perfect' ? <PerfectLesson chapter={chapter} /> : mode === 'passive' ? <PassiveLesson chapter={chapter} /> : mode === 'aorist1' ? <FirstAoristLesson chapter={chapter} /> : mode === 'aorist' ? <AoristLesson chapter={chapter} /> : mode === 'imperfect' ? <ImperfectLesson chapter={chapter} /> : mode === 'roots' ? <RootsLesson chapter={chapter} /> : mode === 'future' ? <FutureLesson chapter={chapter} /> : mode === 'middle' ? <MiddleLesson chapter={chapter} /> : mode === 'contract' ? <ContractLesson chapter={chapter} /> : <PresentLesson chapter={chapter} />)}
      {tab === 'chart' && <Chart key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'forms' && <Forms key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'endings' && <Endings key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'voice' && <Voice key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'stems' && <AoristStems key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'augment' && <Augment key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'roots' && <Roots key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'forming' && <Forming key={key} chapter={chapter} onRestart={restart} />}
      {tab === 'tense' && <Tense key={key} chapter={chapter} onRestart={restart} />}
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
  const vowels = ACTIVE_VOWELS
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

function PerfectLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  const luoMp = verbs.find((v) => v.tense === 'perfect' && v.voice === 'passive' && v.lemma === luo?.lemma)
  const second = verbs.filter((v) => !v.voice && !v.stem.endsWith('κ'))
  if (!luo) return null
  return (
    <>
      <Lesson title="The perfect">
        <p>
          The <strong>perfect</strong> describes a completed action whose results continue: <span className="greek">λέλυκα</span>, “I have loosed” (and it
          stays loosed). It is built on the perfect stem: <strong>reduplication + stem + κα + ending</strong>, with no augment. <span className="greek">λε-λύ-κα-μεν</span>, “we have loosed.”
        </p>
        <ul>
          <li><strong>Reduplication</strong>: the first consonant is repeated with ε: <span className="greek">λύω → λέλυκα, πιστεύω → πεπίστευκα, μαρτυρέω → μεμαρτύρηκα</span>. An aspirate is repeated without its h-sound (φ → πε, θ → τε, χ → κε).</li>
          <li>A verb beginning with a vowel lengthens it instead, just like the augment: <span className="greek">ἀγαπάω → ἠγάπηκα, αἰτέω → ᾔτηκα</span>. A verb beginning with two consonants just adds ε: <span className="greek">γινώσκω → ἔγνωκα</span>.</li>
          <li>Active endings: <span className="greek">{SLOTS.map((s) => PERF_ENDINGS[s]).join(', ')}</span>, giving <span className="greek">{SLOTS.map((s) => presentDisplay(luo, s)).join(', ')}</span>. The New Testament often has <span className="greek">-καν</span> in the 3rd plural (<span className="greek">ἔγνωκαν</span>).</li>
          <li>Contract vowels lengthen before κα, as before σ: <span className="greek">πεποίηκα, πεπλήρωκα</span>.</li>
          {second.length > 0 && <li>A <strong>second perfect</strong> has no κ: {second.map((v, i) => <span key={v.id}>{i > 0 && ', '}<span className="greek">{presentDisplay(v, '1s')}</span></span>)}. Several have irregular reduplication and must be learned.</li>}
          <li>The <strong>middle/passive</strong> has no κ and no connecting vowel: <span className="greek">{luoMp ? SLOTS.map((s) => presentDisplay(luoMp, s)).join(', ') : 'λέλυμαι, λέλυσαι, λέλυται…'}</span>. <span className="greek">γέγραπται</span>, “it is written” (it stands written), is how the New Testament quotes Scripture.</li>
          <li>Aorist or perfect? <span className="greek">ἔλυσα</span> says it happened; <span className="greek">λέλυκα</span> says it happened and still stands.</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Aorist</th><th>Perfect active</th><th /><th>Perfect mid./pass.</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek muted">{luo.aorist ? presentDisplay(inTense(luo, 'aorist'), s) : ''}</td>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek">{luoMp ? presentDisplay(luoMp, s) : `-${PERF_MP_ENDINGS[s]}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>This chapter’s perfects</caption>
        <thead><tr><th>Present</th><th>Perfect</th><th /></tr></thead>
        <tbody>
          {verbs.map((v) => (
            <tr key={v.id}>
              <td className="greek">{v.lemma}</td>
              <td className="greek">{presentDisplay(v, '1s')}</td>
              <td className="muted small">{presentEnglish(v, '1s')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function PassiveLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  const deponents = verbs.filter((v) => v.passiveForm && v.voice !== 'passive')
  const secondPassive = verbs.filter((v) => v.passiveForm && !v.stem.includes('θη'))
  if (!luo) return null
  const future = inTense(luo, 'future')
  return (
    <>
      <Lesson title="The aorist and future passive">
        <p>
          The aorist and future have their own passive forms, marked by <strong>θη</strong>. The <strong>aorist passive</strong> is augment + stem + θη +
          secondary active endings: <span className="greek">ἐ-λύ-θη-ν</span>, “I was loosed.” The <strong>future passive</strong> is stem + θη + σ +
          middle/passive endings, with no augment: <span className="greek">λυ-θή-σ-ομαι</span>, “I will be loosed.”
        </p>
        <ul>
          <li>Aorist passive endings: <span className="greek">{SLOTS.map((s) => AORP_ENDINGS[s] || '–').join(', ')}</span> (the 3rd plural is <span className="greek">σαν</span>): <span className="greek">{SLOTS.map((s) => presentDisplay(luo, s)).join(', ')}</span>.</li>
          <li>Future passive: <span className="greek">{SLOTS.map((s) => presentDisplay(future, s)).join(', ')}</span>.</li>
          <li>Before θ, stops change: π, β → φθ (<span className="greek">ὤφθην</span>, from the root *ὀπ); κ, γ → χθ (<span className="greek">ἤχθην, ἐκηρύχθην</span>); τ, δ, ζ → σθ (<span className="greek">ἐβαπτίσθην</span>). Contract vowels lengthen: <span className="greek">ἠγαπήθην, ἐπληρώθην</span>. Some verbs insert a σ: <span className="greek">ἐγνώσθην</span>.</li>
          {secondPassive.length > 0 && <li>A <strong>second aorist passive</strong> has η without θ: {secondPassive.map((v, i) => <span key={v.id}>{i > 0 && ', '}<span className="greek">{presentDisplay(v, '1s')}</span></span>)}.</li>}
          {deponents.length > 0 && (
            <li>
              Some verbs have passive forms but an active meaning (traditionally “deponent”):{' '}
              {deponents.map((v, i) => <span key={v.id}>{i > 0 && ', '}<span className="greek">{presentDisplay(v, '3s')}</span> “{presentEnglish(v, '3s')}”</span>)}. <span className="greek">ἀπεκρίθη</span> is one of the commonest verbs in the Gospels.
            </li>
          )}
          <li>Translate the aorist passive as a simple past, “was loosed”: often with <span className="greek">ὑπό</span> + genitive for the agent (<span className="greek">ἐβαπτίσθη … ὑπὸ Ἰωάννου</span>, “he was baptized by John”).</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Aorist passive</th><th /><th>Future passive</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek">{presentDisplay(future, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>This chapter’s aorist passives</caption>
        <thead><tr><th>Present</th><th>Aorist passive</th><th /></tr></thead>
        <tbody>
          {verbs.map((v) => (
            <tr key={v.id}>
              <td className="greek">{v.lemma}</td>
              <td className="greek">{presentDisplay(v, '1s')}</td>
              <td className="muted small">{presentEnglish(v, '1s')}{passiveRuleFor(v) ? ` · ${passiveRuleFor(v)!.from} + θ → ${passiveRuleFor(v)!.to}` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function FirstAoristLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  const middle = verbs.find((v) => v.voice === 'middle' && v.firstAorist)
  const first = verbs.filter((v) => v.firstAorist)
  const second = verbs.filter((v) => !v.firstAorist)
  if (!luo) return null
  const luoMiddle = { ...luo, voice: 'middle' as const }
  return (
    <>
      <Lesson title="The first aorist">
        <p>
          Most verbs form their aorist with a <strong>σα</strong> added to the stem: <strong>augment + stem + σα + secondary ending</strong>.
          <span className="greek"> ἔ-λυ-σα</span>, “I loosed.” Like the second aorist, it is usually a simple past.
        </p>
        <ul>
          <li>Active: <span className="greek">{SLOTS.map((s) => presentDisplay(luo, s)).join(', ')}</span>. The 3rd singular has ε, not α: <span className="greek">ἔλυσε(ν)</span>.</li>
          <li>Middle: <span className="greek">{SLOTS.map((s) => presentDisplay(luoMiddle, s)).join(', ')}</span>.</li>
          <li>The σ behaves as in the future: π, β, φ + σ → ψ (<span className="greek">ἔγραψα</span>); κ, γ, χ + σ → ξ (<span className="greek">ἐκήρυξα</span>, from the root *κηρυγ); τ, δ, θ, ζ drop out (<span className="greek">ἐδόξασα</span>); contract vowels lengthen (<span className="greek">ἠγάπησα, ἐποίησα, ἐπλήρωσα</span>).</li>
          <li><strong>Liquid aorists</strong> (stems in λ, μ, ν, ρ) have no σ, and the stem vowel often lengthens: <span className="greek">μένω → ἔμεινα, ἀποστέλλω → ἀπέστειλα, αἴρω → ἦρα, κρίνω → ἔκρινα</span>.</li>
          <li>Future or aorist? Both have a σ, but the aorist has the augment and the α: <span className="greek">λύσει</span>, “he will loose,” but <span className="greek">ἔλυσε</span>, “he loosed.”</li>
          {middle && <li><span className="greek">{middle.lemma}</span>, “I begin,” has a middle aorist: <span className="greek">ἤρξατο</span>, “he began,” usually followed by an infinitive.</li>}
          {second.length > 0 && <li>Not every verb has a first aorist. This chapter’s {second.map((v, i) => <span key={v.id}>{i > 0 && ' and '}<span className="greek">{v.lemma} → {presentDisplay(v, '1s')}</span></span>)} are second aorists.</li>}
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Imperfect</th><th>First aorist</th><th /><th>Middle</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek muted">{luo.imperfect ? presentDisplay(inTense(luo, 'imperfect'), s) : ''}</td>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek">{presentDisplay(luoMiddle, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>This chapter’s aorists</caption>
        <thead><tr><th>Present</th><th>Aorist</th><th /></tr></thead>
        <tbody>
          {[...first, ...second].map((v) => (
            <tr key={v.id}>
              <td className="greek">{v.lemma}</td>
              <td className="greek">{presentDisplay(v, '1s')}</td>
              <td className="muted small">{!v.firstAorist ? 'second aorist' : v.liquid ? 'liquid' : ruleFor(v) ? `${ruleFor(v)!.from} + σ → ${ruleFor(v)!.to}` : '+ σα'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function AoristLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const model = verbs.find((v) => v.id === 'lambano') ?? verbs[0]
  const middle = verbs.find((v) => v.voice === 'middle')
  if (!model) return null
  return (
    <>
      <Lesson title="The second aorist">
        <p>
          The <strong>aorist</strong> describes an action simply, as a whole, without saying whether it went on: in the indicative it is usually a
          simple past, <span className="greek">ἔλαβον</span>, “I took.” A <strong>second aorist</strong> is built on a different stem from the present,
          with the augment and the secondary endings you know from the imperfect: augment + aorist stem + connecting vowel + secondary ending.
        </p>
        <ul>
          <li>The endings are the imperfect’s: <span className="greek">ον, ες, ε(ν), ομεν, ετε, ον</span>, and in the middle <span className="greek">ομην, ου, ετο, ομεθα, εσθε, οντο</span>.</li>
          <li>So the <strong>stem</strong> is the only way to tell an aorist from an imperfect: <span className="greek">ἐλάμβανον</span> (imperfect, “I was taking”) but <span className="greek">ἔλαβον</span> (aorist, “I took”); <span className="greek">ἔβαλλον</span> but <span className="greek">ἔβαλον</span>.</li>
          <li>Second aorist stems have to be memorized. Many look nothing like the present, because they come from another root: <span className="greek">λέγω → εἶπον, ὁράω → εἶδον, ἔρχομαι → ἦλθον</span>.</li>
          <li>Compounds of <span className="greek">ἔρχομαι</span> work the same way, with the augment after the preposition: <span className="greek">εἰσῆλθον, ἐξῆλθον, προσῆλθον</span>. Their aorist is active, although the present is middle.</li>
          {middle && <li><span className="greek">{middle.lemma}</span> has a middle second aorist: <span className="greek">{SLOTS.map((s) => presentDisplay(middle, s)).join(', ')}</span>. <span className="greek">ἐγένετο</span> (“it happened, it came to be”) is one of the commonest words in the New Testament.</li>}
          <li><span className="greek">γινώσκω</span> has an unusual aorist with no connecting vowel: <span className="greek">ἔγνων, ἔγνως, ἔγνω, ἔγνωμεν, ἔγνωτε, ἔγνωσαν</span>.</li>
          <li>As in the imperfect, <span className="greek">ἔλαβον</span> is both “I took” and “they took.” In the New Testament you will also see first-aorist endings on some of these stems: <span className="greek">εἶπαν, ἦλθαν</span>.</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Imperfect</th><th>Aorist</th><th /></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek muted">{model.imperfect ? presentDisplay(inTense(model, 'imperfect'), s) : ''}</td>
              <td className="greek">{presentDisplay(model, s)}</td>
              <td className="muted">{presentEnglish(model, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>This chapter’s second aorists</caption>
        <thead><tr><th>Present</th><th>Aorist</th><th /></tr></thead>
        <tbody>
          {verbs.map((v) => (
            <tr key={v.id}><td className="greek">{v.lemma}</td><td className="greek">{presentDisplay(v, '1s')}</td><td className="muted small">{presentEnglish(v, '1s')}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function ImperfectLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs.find((v) => !v.voice && !v.contract)
  const luoMp = verbs.find((v) => v.voice === 'passive')
  const eimi = verbs.find((v) => v.irregular)
  const contracts = CONTRACT_VOWELS.map((c) => verbs.find((v) => v.contract === c && !v.prefix)).filter((v) => !!v)
  if (!luo) return null
  return (
    <>
      <Lesson title="The imperfect indicative">
        <p>
          The imperfect describes <strong>continuous action in the past</strong>: <span className="greek">ἔλυον</span>, “I was loosing.” It is built on the
          <strong> present stem</strong>, with an <strong>augment</strong> in front and <strong>secondary endings</strong>:
          augment + present stem + connecting vowel + secondary ending (<span className="greek">ἐ-λύ-ο-μεν</span>, “we were loosing”).
        </p>
        <ul>
          <li>The <strong>augment</strong> marks past time. Before a consonant it is <span className="greek">ἐ</span> (<span className="greek">λύω → ἔλυον</span>). Before a vowel it lengthens the vowel: α and ε → η, ο → ω, αι → ῃ, οι → ῳ, αυ and ευ → ηυ (<span className="greek">ἀκούω → ἤκουον</span>).</li>
          <li>In a <strong>compound verb</strong> the augment goes after the preposition, which loses a final vowel: <span className="greek">ἐκβάλλω → ἐξέβαλλον</span>, <span className="greek">ἐπερωτάω → ἐπηρώτων</span>. <span className="greek">περι</span> keeps its ι: <span className="greek">περιεπάτουν</span>.</li>
          <li>The <strong>secondary endings</strong> are the past-time set: active <span className="greek">{SLOTS.map((s) => SECONDARY[s]).join(', ')}</span>; middle/passive <span className="greek">{SLOTS.map((s) => SECONDARY_MP[s]).join(', ')}</span>. With the connecting vowel: <span className="greek">{SLOTS.map((s) => IMPF_ENDINGS[s]).join(', ')}</span> and <span className="greek">{SLOTS.map((s) => IMPF_MP_ENDINGS[s]).join(', ')}</span>.</li>
          <li><span className="greek">ἔλυον</span> is both “I was loosing” and “they were loosing”: the context decides.</li>
          <li>The accent goes back as far as it can, but never before the augment: <span className="greek">ἔλυον</span>, but <span className="greek">συνῆγον</span>.</li>
          <li>Contract verbs contract as usual: <span className="greek">ἐποίε + ον → ἐποίουν</span>, <span className="greek">ἠγάπα + ε → ἠγάπα</span>.</li>
          <li>Some verbs have an unexpected augment: <span className="greek">ἔχω → εἶχον</span>, <span className="greek">θέλω → ἤθελον</span>.</li>
          {eimi && <li>The imperfect of <span className="greek">εἰμί</span>: <span className="greek">{SLOTS.map((s) => presentDisplay(eimi, s)).join(', ')}</span>, “I was, you were…”.</li>}
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Active</th><th /><th>Middle/passive</th><th /></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek">{luoMp ? presentDisplay(luoMp, s) : ''}</td>
              <td className="muted">{luoMp ? presentEnglish(luoMp, s) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {contracts.length > 0 && (
        <table className="reference endings-table">
          <caption>Contract verbs in the imperfect</caption>
          <thead><tr><th />{contracts.map((v) => <th key={v.id} className="greek">{v.lemma}</th>)}</tr></thead>
          <tbody>
            {SLOTS.map((s) => (
              <tr key={s}>
                <th>{SLOT_LABEL[s]} <span className="muted greek">+{IMPF_ENDINGS[s]}</span></th>
                {contracts.map((v) => <td key={v.id}><span className="greek">{presentDisplay(v, s)}</span><div className="muted small greek">-{CONTRACT_IMPF[v.contract!][s]}</div></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

function RootsLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const liquids = verbs.filter((v) => v.liquid)
  const changed = verbs.filter((v) => v.change)
  const model = liquids[0]
  if (!model) return null
  return (
    <>
      <Lesson title="Verbal roots and other forms of the future">
        <p>
          Every verb has a <strong>root</strong>, its most basic form. The present tense stem often adds to or changes the root, but the other tenses
          are usually built on the root itself. That is why a future can look different from the present: <span className="greek">ἀποστέλλω</span>{' '}
          (root <span className="greek">*στελ</span>) has the future <span className="greek">ἀποστελῶ</span>.
        </p>
        <ul>
          <li>Common changes in the present: a doubled λ (<span className="greek">*βαλ → βάλλω</span>), ε or α lengthened to ει or αι (<span className="greek">*κτεν → ἀποκτείνω, *ἀρ → αἴρω</span>), δ becoming ζ (<span className="greek">*βαπτιδ → βαπτίζω</span>), and σκ added (<span className="greek">*γνω → γινώσκω</span>).</li>
          <li>
            <strong>Liquid futures.</strong> When the root ends in λ, μ, ν or ρ, the future adds εσ instead of σ. The σ drops out between the vowels and
            the ε contracts with the ending, so the future is conjugated like <span className="greek">ποιέω</span>, with a circumflex:{' '}
            <span className="greek">{SLOTS.map((s) => presentDisplay(model, s)).join(', ')}</span>.
          </li>
          <li>Watch the accent: <span className="greek">μένει</span> is present, “he remains”; <span className="greek">μενεῖ</span> is future, “he will remain.” With <span className="greek">κρίνω</span> and <span className="greek">μένω</span> the accent is the only difference.</li>
          <li>
            Some futures come from another root or a changed stem, and must be learned:{' '}
            {changed.map((v, i) => <span key={v.id}>{i > 0 && '; '}<span className="greek">{v.lemma} → {presentDisplay(v, '1s')}</span></span>)}.
          </li>
          <li><span className="greek">γινώσκω, ὁράω</span> and <span className="greek">ἔρχομαι</span> have middle futures with active meanings: <span className="greek">γνώσομαι</span>, “I will know.”</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th className="greek">{model.lemma}</th><th>Future</th><th /><th className="muted">cf. ποιέω</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek muted">{presentDisplay(inTense(model, 'present'), s)}</td>
              <td className="greek">{presentDisplay(model, s)}</td>
              <td className="muted">{presentEnglish(model, s)}</td>
              <td className="greek muted">{presentDisplay({ ...model, tense: undefined, stem: 'ποι' }, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>This chapter’s futures</caption>
        <thead><tr><th>Present</th><th>Future</th><th /></tr></thead>
        <tbody>
          {verbs.map((v) => (
            <tr key={v.id}>
              <td className="greek">{v.lemma}</td>
              <td className="greek">{presentDisplay(v, '1s')}</td>
              <td className="muted small">{v.liquid ? 'liquid' : v.change ?? ruleFor(v)?.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function FutureLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  const eimi = verbs.find((v) => v.irregular)
  const middles = verbs.filter((v) => v.voice && !v.irregular)
  const stops = verbs.filter((v) => ruleFor(v) && ruleFor(v)!.to.length === 1)
  const contracts = verbs.filter((v) => ruleFor(v) && ruleFor(v)!.to.length === 2)
  if (!luo) return null
  const middle = { ...luo, voice: 'middle' as const, en: luo.en }
  return (
    <>
      <Lesson title="The future indicative">
        <p>
          The future tells you the action will happen: <span className="greek">λύσω</span>, “I will loose.” It is built on the
          <strong> future stem</strong>, which is usually the present stem + <span className="greek">σ</span>, with the endings you
          already know: <strong>future stem + connecting vowel + personal ending</strong>. <span className="greek">λύ-σ-ο-μεν</span>, “we will loose.”
        </p>
        <ul>
          <li>The <strong>future active</strong> uses the present active endings: <span className="greek">λύσω, λύσεις, λύσει, λύσομεν, λύσετε, λύσουσι(ν)</span>.</li>
          <li>The <strong>future middle</strong> uses the middle/passive endings: <span className="greek">λύσομαι, λύσῃ, λύσεται…</span> (The future passive is different; it comes in chapter 24.)</li>
          <li>
            When σ meets a stop, they combine (the <strong>Square of Stops</strong> from chapter 10): π, β, φ + σ → ψ (<span className="greek">βλέπω → βλέψω</span>);
            κ, γ, χ + σ → ξ (<span className="greek">συνάγω → συνάξω</span>); τ, δ, θ, ζ drop out before σ.
          </li>
          <li>Contract verbs <strong>lengthen</strong> their contract vowel before the σ: α and ε → η, ο → ω. <span className="greek">ἀγαπάω → ἀγαπήσω, ποιέω → ποιήσω, πληρόω → πληρώσω</span>. Nothing contracts, because σ now stands between the vowels.</li>
          <li>
            Some verbs have a <strong>middle future with an active meaning</strong>:{' '}
            {middles.map((v, i) => <span key={v.id}>{i > 0 && ', '}<span className="greek">{presentDisplay(v, '1s')}</span> “I will {v.en}”</span>)}.
          </li>
          {eimi && (
            <li>
              The future of <span className="greek">εἰμί</span> is middle: <span className="greek">{SLOTS.map((s) => presentDisplay(eimi, s)).join(', ')}</span>. Note{' '}
              <span className="greek">ἔσται</span>, with no connecting vowel.
            </li>
          )}
          <li>
            To find the lexical form, undo the σ: <span className="greek">ζήσει</span> → <span className="greek">ζη</span> → <span className="greek">ζάω</span>. A ψ could come from π, β or φ,
            so you need to know the verb: <span className="greek">βλέψω</span> is from <span className="greek">βλέπω</span>.
          </li>
          <li>Watch the σ: <span className="greek">λύει</span> is present, “he looses”; <span className="greek">λύσει</span> is future, “he will loose.”</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th className="greek">{luo.lemma}</th><th>Future active</th><th /><th>Future middle</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek muted">{presentDisplay(inTense(luo, 'present'), s)}</td>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek">{presentDisplay(middle, s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="reference future-table">
        <caption>What the σ does</caption>
        <thead><tr><th>Stem ends in</th><th>+ σ</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td className="greek">π β φ</td><td className="greek">ψ</td><td className="greek">{stops.filter((v) => ruleFor(v)!.to === 'ψ').map((v) => `${v.lemma} → ${presentDisplay(v, '1s')}`).join(', ') || '—'}</td></tr>
          <tr><td className="greek">κ γ χ</td><td className="greek">ξ</td><td className="greek">{stops.filter((v) => ruleFor(v)!.to === 'ξ').map((v) => `${v.lemma} → ${presentDisplay(v, '1s')}`).join(', ') || '—'}</td></tr>
          <tr><td className="greek">τ δ θ ζ</td><td className="greek">σ</td><td className="muted">(the dental drops out)</td></tr>
          <tr><td className="greek">α ε ο</td><td className="greek">ησ ησ ωσ</td><td className="greek">{contracts.map((v) => `${v.lemma} → ${presentDisplay(v, '1s')}`).join(', ')}</td></tr>
        </tbody>
      </table>
    </>
  )
}

function MiddleLesson({ chapter }: { chapter: Chapter }) {
  const verbs = chapter.present?.verbs ?? []
  const luo = verbs[0]
  const middles = verbs.filter((v) => v.voice === 'middle' && !v.athematic)
  const dynamai = verbs.find((v) => v.athematic)
  const contracts = CONTRACT_VOWELS.map((c) => verbs.find((v) => v.contract === c)).filter((v) => !!v)
  if (!luo) return null
  return (
    <>
      <Lesson title="The middle and passive voices">
        <p>
          In the <strong>active</strong> the subject does the action (<span className="greek">λύω</span>, “I loose”). In the{' '}
          <strong>passive</strong> the subject receives it (<span className="greek">λύομαι</span>, “I am loosed”). The{' '}
          <strong>middle</strong> is between the two: the subject acts, but with some stake in the action. In the present the middle and
          passive have the <strong>same forms</strong>, so we call them middle/passive and let context decide.
        </p>
        <ul>
          <li>The form is built as before: <strong>present stem + connecting vowel + personal ending</strong>. Only the endings are new: <span className="greek">μαι, σαι, ται, μεθα, σθε, νται</span>.</li>
          <li>With the connecting vowel they become <span className="greek">ομαι, ῃ, εται, ομεθα, εσθε, ονται</span>. In the 2nd singular the σ drops out and <span className="greek">ε + αι</span> contracts to <span className="greek">ῃ</span>.</li>
          <li>Watch the iota subscript: <span className="greek">λύει</span> is active, “he looses”; <span className="greek">λύῃ</span> is middle/passive, “you are loosed.”</li>
          <li>The accent moves forward in the 1st plural, because <span className="greek">-ομεθα</span> is three syllables: <span className="greek">λύομαι</span> but <span className="greek">λυόμεθα</span>.</li>
          <li>
            <strong>Middle-only verbs</strong> have no active forms, so their lexical form ends in <span className="greek">-ομαι</span>. Translate them actively:{' '}
            {middles.map((v, i) => <span key={v.id}>{i > 0 && ', '}<span className="greek">{v.lemma}</span> “I {v.en}”</span>)}. (Older grammars call them “deponent.”)
          </li>
          {dynamai && (
            <li>
              <span className="greek">{dynamai.lemma}</span>, “I can, am able,” has no connecting vowel, so you see the bare endings:{' '}
              <span className="greek">{SLOTS.map((s) => presentDisplay(dynamai, s)).join(', ')}</span>. It is usually followed by an infinitive: <span className="greek">οὐ δύναμαι ποιεῖν</span>, “I cannot do.”
            </li>
          )}
          <li>Contract verbs contract as in chapter 17: <span className="greek">ἀγαπα + εται → ἀγαπᾶται</span>, <span className="greek">καλε + εται → καλεῖται</span>. Note <span className="greek">ἀγαπᾷ</span>: active “he loves” or middle/passive “you are loved.”</li>
          <li><span className="greek">δεῖ</span>, “it is necessary,” is only ever 3rd singular: <span className="greek">ἡμᾶς δεῖ ἐργάζεσθαι</span>, “we must work” (John 9:4).</li>
        </ul>
      </Lesson>
      <table className="reference endings-table">
        <thead><tr><th /><th>Ending</th><th>+ vowel</th><th className="greek">λύομαι</th><th /><th className="muted">Active</th></tr></thead>
        <tbody>
          {SLOTS.map((s) => (
            <tr key={s}>
              <th>{SLOT_LABEL[s]}</th>
              <td className="greek">-{MP_PRIMARY[s]}</td>
              <td className="greek">-{MP_ENDINGS[s]}</td>
              <td className="greek">{presentDisplay(luo, s)}</td>
              <td className="muted">{presentEnglish(luo, s)}</td>
              <td className="greek muted">{presentDisplay(inVoice(luo, 'active'), s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {contracts.length > 0 && (
        <table className="reference endings-table">
          <caption>Contract verbs in the middle/passive</caption>
          <thead><tr><th />{contracts.map((v) => <th key={v.id} className="greek">{v.lemma}</th>)}</tr></thead>
          <tbody>
            {SLOTS.map((s) => (
              <tr key={s}>
                <th>{SLOT_LABEL[s]} <span className="muted greek">+{MP_ENDINGS[s]}</span></th>
                {contracts.map((v) => <td key={v.id}><span className="greek">{presentDisplay(v, s)}</span><div className="muted small">{presentEnglish(v, s)}</div></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

interface QuizProps {
  chapter: Chapter
  onRestart: () => void
}

const EXAMPLES: Record<Mode, [string, string]> = { active: ['lu/w', 'λύω'], contract: ['poiw=', 'ποιῶ'], middle: ['lu/omai', 'λύομαι'], future: ['lu/sw', 'λύσω'], roots: ['menw=', 'μενῶ'], imperfect: ['e)/luon', 'ἔλυον'], aorist: ['e)/labon', 'ἔλαβον'], aorist1: ['e)/lusa', 'ἔλυσα'], passive: ['e)lu/qhn', 'ἐλύθην'], perfect: ['le/luka', 'λέλυκα'] }

/** Type the whole chart for one verb: λύω first, then any of the others. */
function Chart({ chapter, onRestart }: QuizProps) {
  const verbs = chapter.present?.verbs ?? []
  const [verb, setVerb] = useState<PresentVerb | undefined>(verbs[0])
  const [round, setRound] = useState(0)
  if (!verb) return null
  const label = (v: PresentVerb) => `${v.lemma}${v.voice === 'passive' && verbs.some((o) => o !== v && o.lemma === v.lemma) ? ' (m/p)' : ''}`
  return (
    <>
      <label className={`verb-select ${verbs.length > 8 ? 'many' : ''}`}>
        <span className="muted small">Verb</span>
        <select className="greek" value={verb.id} onChange={(e) => { setVerb(verbs.find((v) => v.id === e.target.value)); setRound((r) => r + 1) }}>
          {verbs.map((v) => <option key={v.id} value={v.id}>{label(v)}</option>)}
        </select>
      </label>
      <div className={`seg small-seg ${verbs.length > 8 ? 'verb-chips' : ''}`} role="group" aria-label="Verb">
        {verbs.map((v) => (
          <button key={v.id} className={`greek ${v === verb ? 'on' : ''}`} onClick={() => { setVerb(v); setRound((r) => r + 1) }}>
            {label(v)}
          </button>
        ))}
      </div>
      <ChartDrill key={`${verb.id}-${round}`} chapter={chapter} paradigm={presentParadigm(verb)} onRestart={onRestart}
        example={EXAMPLES[modeOf(chapter)]} />
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

/** The rules for adding σ, choosing a future form, and working back to the lexical form. */
function Forming({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verbs = chapter.present?.verbs ?? []
    const pool = [
      ...FUTURE_RULES.map((r) => ({ id: futureRuleItemId(chapter.number, r), make: () => futureRuleQuestion(chapter, r) })),
      ...verbs.filter(hasFutureForm).map((v) => ({ id: futureFormItemId(chapter.number, v), make: () => futureFormQuestion(chapter, v) })),
      ...verbs.flatMap((v) => SLOTS.map((s) => ({ id: futureLexicalItemId(chapter.number, v, s), make: () => futureLexicalQuestion(chapter, v, s) }))),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">What the σ does to a stem (Square of Stops, lengthened vowels), which future a verb has, and which verb a future comes from.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

/** λαμβάνω → ἔλαβον, and back: second aorist stems have to be learned. */
function AoristStems({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const verbs = chapter.present?.verbs ?? []
    // First aorists add the σ rules (stop + σ, lengthened vowels); passives the θ rules.
    const passive = verbs.some((v) => v.passiveForm)
    const perfect = verbs.some((v) => v.tense === 'perfect')
    const rules = perfect
      ? (chapter.present?.reduplications ?? []).map((r) => ({ id: redupItemId(chapter.number, r), make: () => redupQuestion(chapter, r) }))
      : passive
      ? PASSIVE_RULES.map((r) => ({ id: passiveRuleItemId(chapter.number, r), make: () => passiveRuleQuestion(chapter, r) }))
      : verbs.some((v) => v.firstAorist) ? FUTURE_RULES.map((r) => ({ id: futureRuleItemId(chapter.number, r), make: () => futureRuleQuestion(chapter, r) })) : []
    const pool = [
      ...rules,
      ...verbs.map((v) => ({ id: aoristFormItemId(chapter.number, v), make: () => aoristFormQuestion(chapter, v) })),
      ...verbs.flatMap((v) => SLOTS.map((s) => ({ id: futureLexicalItemId(chapter.number, v, s), make: () => futureLexicalQuestion(chapter, v, s) }))),
    ]
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">
        {chapter.present?.verbs.some((v) => v.tense === 'perfect')
          ? 'How each verb reduplicates, which form is the perfect (not the aorist), and which verb a perfect comes from.'
          : chapter.present?.verbs.some((v) => v.passiveForm)
          ? 'What θ does to a stem, which form is the aorist passive (not the aorist active or the future passive), and which verb a passive comes from.'
          : chapter.present?.verbs.some((v) => v.firstAorist)
          ? 'What the σ does to a stem, which form is the aorist (not the imperfect or the future), and which verb an aorist comes from.'
          : 'Pick each verb’s aorist, and work back from an aorist to its lexical form. The aorist stem is often quite unlike the present.'}
      </p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

/** ἀκούω → ἤκουον: where the augment goes and what it does. */
function Augment({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.present?.augments ?? []).map((r) => ({ id: augmentItemId(chapter.number, r), make: () => augmentQuestion(chapter, r) }))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">ε- before a consonant, a lengthened vowel before a vowel, and after the preposition in a compound verb.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

/** ἀποστέλλω → *στελ. */
function Roots({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = (chapter.present?.roots ?? []).map((r) => ({ id: rootItemId(chapter.number, r), make: () => rootQuestion(chapter, r) }))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">The root is the basic form of a verb; the present stem often changes it. The future is usually built on the root.</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

const TENSE_HINTS: Partial<Record<Mode, ReactNode>> = {
  future: <>Present and future forms side by side. Look for the σ (or ψ, ξ, or a lengthened vowel) before the ending: <span className="greek">λύει</span> / <span className="greek">λύσει</span>, <span className="greek">βλέπεις</span> / <span className="greek">βλέψεις</span>.</>,
  roots: <>Present and future forms side by side. Watch the stem and the accent: <span className="greek">μένει</span> / <span className="greek">μενεῖ</span>, <span className="greek">αἴρει</span> / <span className="greek">ἀρεῖ</span>.</>,
  imperfect: <>Present and imperfect forms side by side. Look for the augment and the secondary ending: <span className="greek">λύει</span> / <span className="greek">ἔλυε</span>, <span className="greek">ποιοῦμεν</span> / <span className="greek">ἐποιοῦμεν</span>.</>,
  perfect: <>Aorist and perfect side by side. The perfect has reduplication (or a lengthened vowel) instead of the augment, and κα: <span className="greek">ἔλυσα</span> / <span className="greek">λέλυκα</span>, <span className="greek">ἦλθον</span> / <span className="greek">ἐλήλυθα</span>, <span className="greek">ἐλύθη</span> / <span className="greek">λέλυται</span>.</>,
  passive: <>Aorist and future passive side by side. Both have θη; the aorist has the augment and secondary endings, the future a σ and middle endings: <span className="greek">ἐλύθη</span> / <span className="greek">λυθήσεται</span>, <span className="greek">ἐσώθης</span> / <span className="greek">σωθήσῃ</span>.</>,
  aorist1: <>Imperfect and aorist forms side by side. Look for the σα (or ψα, ξα, or a liquid stem + α): <span className="greek">ἔλυον</span> / <span className="greek">ἔλυσα</span>, <span className="greek">ἔγραφον</span> / <span className="greek">ἔγραψα</span>, <span className="greek">ἔμενον</span> / <span className="greek">ἔμεινα</span>.</>,
  aorist: <>Imperfect and aorist forms side by side. They share the augment and the endings, so look at the stem: <span className="greek">ἐλάμβανον</span> / <span className="greek">ἔλαβον</span>, <span className="greek">ἔβαλλον</span> / <span className="greek">ἔβαλον</span>.</>,
}

/** λύει or λύσει? The present next to the future (or imperfect), or the imperfect next to the aorist. */
function Tense({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = tensePairs(chapter).map(({ v, slot, tense }) => ({
      id: tenseItemId(chapter.number, v, slot, tense), make: () => tenseQuestion(chapter, v, slot, tense),
    }))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">{TENSE_HINTS[modeOf(chapter)] ?? TENSE_HINTS.future}</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
}

/** λύει or λύῃ? The active next to the middle/passive, for the verbs that have both. */
function Voice({ chapter, onRestart }: QuizProps) {
  const [questions] = useState(() => {
    const pool = voicePairs(chapter).map(({ v, slot, voice }) => ({
      id: voiceItemId(chapter.number, v, slot, voice), make: () => voiceQuestion(chapter, v, slot, voice),
    }))
    return shuffle(pickWeakest(pool, (x) => x.id, 12)).map((x) => x.make())
  })
  return (
    <>
      <p className="muted">Active and middle/passive forms of the verbs that have both. The trap: <span className="greek">λύει</span> (he looses) and <span className="greek">λύῃ</span> (you are loosed).</p>
      <ChoiceQuiz questions={questions} onRestart={onRestart} layout="grid" />
    </>
  )
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
      <p className="muted">This chapter’s verb forms in the New Testament: find the person from the ending, and the verb from the stem.</p>
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

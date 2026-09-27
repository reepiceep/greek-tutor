import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, ConditionClass, ConditionItem, DidomiForm, DidomiVerse } from '../data/types'
import { shuffle } from './progress'
import { type UsageConfig, usageItemId, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 35: the nonindicative forms of δίδωμι, and the three classes of conditional sentence.

const formsOf = (ch: Chapter) => ch.nonindicative?.forms ?? []
const moodOf = (parse: string) => (/subj/.test(parse) ? 'subj' : /impv/.test(parse) ? 'impv' : /inf/.test(parse) ? 'inf' : 'ptc')

/** Three wrong parsings: from the same mood where possible, since that is where they get confused. */
function wrongParses(ch: Chapter, answer: string) {
  const all = [...new Set(formsOf(ch).map((f) => f.parse))].filter((p) => p !== answer)
  return shuffle(all).sort((a, b) => Number(moodOf(b) === moodOf(answer)) - Number(moodOf(a) === moodOf(answer))).slice(0, 3)
}

function explainForm(f: DidomiForm) {
  return (
    <>
      <p><span className="greek">{f.form}</span> is the {f.parse.replace('subj', 'subjunctive').replace('impv', 'imperative').replace('inf', 'infinitive').replace('ptc', 'participle')} of <span className="greek">δίδωμι</span>: “{f.english}.”</p>
      {f.parse.startsWith('aor') && <p>The aorist is built on the bare root <span className="greek">*δο</span>, with no reduplication.</p>}
      {f.parse.startsWith('pres') && <p>The present keeps the reduplication <span className="greek">δι-</span>.</p>}
    </>
  )
}

export const didomiFormId = (ch: number, f: DidomiForm, skill: 'parse' | 'build') => `ch${ch}:didomi-${skill}:${f.id}`

export function didomiParseQuestion(ch: Chapter, f: DidomiForm): ChoiceQuestion {
  return {
    id: didomiFormId(ch.number, f, 'parse'),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">from <span className="greek">δίδωμι</span> — parse it</p></>,
    options: shuffle([f.parse, ...wrongParses(ch, f.parse)]).map((p) => ({ key: p, label: p })),
    answer: f.parse,
    explain: explainForm(f),
    review: <><span className="greek">{f.form}</span> = {f.parse}</>,
  }
}

export function didomiBuildQuestion(ch: Chapter, f: DidomiForm): ChoiceQuestion {
  const same = formsOf(ch).filter((o) => o.id !== f.id && moodOf(o.parse) === moodOf(f.parse))
  const other = formsOf(ch).filter((o) => o.id !== f.id && moodOf(o.parse) !== moodOf(f.parse))
  const wrong = [...shuffle(same), ...shuffle(other)].slice(0, 3).map((o) => o.form)
  return {
    id: didomiFormId(ch.number, f, 'build'),
    prompt: <><p className="sentence">{f.parse}</p><p className="muted">of <span className="greek">δίδωμι</span>, “{f.english}” — which form?</p></>,
    options: shuffle([f.form, ...wrong]).map((x) => ({ key: x, label: x, greek: true })),
    answer: f.form,
    explain: explainForm(f),
    review: <>{f.parse} of <span className="greek">δίδωμι</span> = <span className="greek">{f.form}</span></>,
  }
}

export const didomiVerseId = (ch: number, v: DidomiVerse) => `ch${ch}:didomi-verse:${v.id}`

export function didomiVerseQuestion(ch: Chapter, v: DidomiVerse): ChoiceQuestion {
  const at = v.text.indexOf(v.word)
  return {
    id: didomiVerseId(ch.number, v),
    prompt: (
      <>
        <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
        <p className="muted small">{v.ref}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
        <p className="muted">Parse the highlighted form of <span className="greek">{v.lemma}</span></p>
      </>
    ),
    options: shuffle([v.parse, ...wrongParses(ch, v.parse)]).map((p) => ({ key: p, label: p })),
    answer: v.parse,
    explain: (
      <>
        <p><span className="greek">{v.word}</span> is the {v.parse} of <span className="greek">{v.lemma}</span>.</p>
        <p className="english">“{v.translation}”</p>
        {v.note && <p>{v.note}</p>}
      </>
    ),
    review: <><span className="greek">{v.word}</span> ({v.ref}) = {v.parse}</>,
  }
}

export const CONDITION_CLASSES: Record<ConditionClass, { label: string; explain: string }> = {
  first: {
    label: 'First class — εἰ + indicative: assumed true for the argument (“if …, and let’s say it is”)',
    explain: 'A first class condition has εἰ and an indicative verb (any tense). The speaker assumes it is true for the sake of the argument, whether or not it really is.',
  },
  second: {
    label: 'Second class — εἰ + past indicative, ἄν in the “then” clause: contrary to fact (“if … were …, would …”)',
    explain: 'A second class condition has εἰ with a past-tense indicative (imperfect for the present, aorist for the past) and usually ἄν in the “then” clause. It states something the speaker takes to be untrue.',
  },
  third: {
    label: 'Third class — ἐάν + subjunctive: a possibility (“if …, and it may or may not be”)',
    explain: 'A third class condition has ἐάν and a subjunctive. It says nothing about whether the “if” is true; it may or may not happen.',
  },
}

const CONDITIONS: UsageConfig<ConditionClass> = {
  prefix: 'condition',
  ask: 'What kind of conditional sentence is it?',
  rules: CONDITION_CLASSES,
  traps: [],
}

export const conditionId = (ch: number, c: ConditionItem, skill: 'use' | 'translate') => usageItemId(ch, CONDITIONS.prefix, c, skill)
export const conditionQuestion = (ch: Chapter, c: ConditionItem) => usageQuestion(ch, CONDITIONS, c)
export const conditionTranslateQuestion = (ch: Chapter, c: ConditionItem) => usageTranslateQuestion(ch, CONDITIONS, c)

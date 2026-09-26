import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, EnglishVerbItem, TermItem, VerbPartsItem, VerbProperty } from '../data/types'
import { shuffle } from './progress'

// Questions for chapter 15: verb terms, analysing English verbs, and the parts of a Greek verb.

export const termItemId = (ch: number, t: TermItem, dir: 'name' | 'define') => `ch${ch}:term:${t.term}:${dir}`
export const englishItemId = (ch: number, e: EnglishVerbItem, prop: VerbProperty) => `ch${ch}:english:${e.id}:${prop}`
export const partsItemId = (ch: number, p: VerbPartsItem, part: VerbPart) => `ch${ch}:parts:${p.form}:${part}`

/** Definition → which term? */
export function termNameQuestion(ch: Chapter, t: TermItem, all: TermItem[]): ChoiceQuestion {
  const others = shuffle(all.filter((o) => o !== t)).slice(0, 3)
  return {
    id: termItemId(ch.number, t, 'name'),
    prompt: <><p className="definition">{t.definition}</p>{t.example && <p className="muted small">e.g. <span className="greek">{t.example}</span></p>}<p className="muted">Which term is this?</p></>,
    options: shuffle([t, ...others]).map((o) => ({ key: o.term, label: o.term })),
    answer: t.term,
    explain: <p><strong>{t.term}</strong>: {t.definition}</p>,
    review: <><strong>{t.term}</strong>: {t.definition}</>,
  }
}

/** Term → which definition? */
export function termDefineQuestion(ch: Chapter, t: TermItem, all: TermItem[]): ChoiceQuestion {
  const others = shuffle(all.filter((o) => o !== t)).slice(0, 3)
  return {
    id: termItemId(ch.number, t, 'define'),
    prompt: <><span className="big">{t.term}</span><p className="muted">What does it mean?</p></>,
    options: shuffle([t, ...others]).map((o) => ({ key: o.term, label: o.definition })),
    answer: t.term,
    explain: <p>{t.example && <>e.g. <span className="greek">{t.example}</span></>}</p>,
    review: <><strong>{t.term}</strong>: {t.definition}</>,
  }
}

export const PROPERTY_NAMES: Record<VerbProperty, string> = {
  personNumber: 'person and number',
  time: 'time',
  aspect: 'aspect',
  voice: 'voice',
  mood: 'mood',
}

const PERSON_LABEL: Record<NonNullable<EnglishVerbItem['personNumber']>, string> = {
  '1 sg': '1st person singular', '2 sg': '2nd person singular', '3 sg': '3rd person singular',
  '1 pl': '1st person plural', '2 pl': '2nd person plural', '3 pl': '3rd person plural',
  '2nd person': '2nd person (a command)',
}

const VALUES: Record<Exclude<VerbProperty, 'personNumber'>, string[]> = {
  time: ['past', 'present', 'future'],
  aspect: ['continuous', 'undefined', 'perfective'],
  voice: ['active', 'passive'],
  mood: ['indicative', 'subjunctive', 'imperative'],
}

const WHY: Record<string, string> = {
  past: 'The action happened before now.',
  present: 'The action is happening now.',
  future: 'The action will happen later.',
  continuous: 'The action is pictured as ongoing (“was …ing,” “is …ing”).',
  undefined: 'The action is pictured simply, as a whole, without saying whether it was ongoing.',
  perfective: 'The action is completed and its results continue (“have …”).',
  active: 'The subject does the action.',
  passive: 'The subject receives the action (often with “by …”).',
  indicative: 'It makes a statement of fact.',
  subjunctive: 'It expresses a possibility (“may,” “might”).',
  imperative: 'It gives a command.',
}

/** Properties this sentence can be asked about. */
export const askableProperties = (e: EnglishVerbItem) =>
  (['personNumber', 'time', 'aspect', 'voice', 'mood'] as VerbProperty[]).filter((p) => e[p] !== undefined)

export function englishVerbQuestion(ch: Chapter, e: EnglishVerbItem, prop: VerbProperty): ChoiceQuestion {
  const at = e.sentence.indexOf(e.verb)
  const answer = String(e[prop])
  const options = prop === 'personNumber'
    ? shuffle([answer, ...shuffle(Object.keys(PERSON_LABEL).filter((k) => k !== answer)).slice(0, 3)]).map((k) => ({ key: k, label: PERSON_LABEL[k as keyof typeof PERSON_LABEL] }))
    : VALUES[prop].map((v) => ({ key: v, label: v }))
  const why = prop === 'personNumber' ? `The subject is ${PERSON_LABEL[answer as keyof typeof PERSON_LABEL]}.` : WHY[answer]
  return {
    id: englishItemId(ch.number, e, prop),
    prompt: (
      <>
        <p className="sentence">{e.sentence.slice(0, at)}<mark>{e.verb}</mark>{e.sentence.slice(at + e.verb.length)}</p>
        <p className="muted">What is the <strong>{PROPERTY_NAMES[prop]}</strong> of the highlighted verb?</p>
      </>
    ),
    options,
    answer,
    explain: <p>“{e.verb}” is {prop === 'personNumber' ? PERSON_LABEL[answer as keyof typeof PERSON_LABEL] : answer}. {why}</p>,
    review: <>“{e.verb}” ({e.sentence}): {PROPERTY_NAMES[prop]} = {prop === 'personNumber' ? PERSON_LABEL[answer as keyof typeof PERSON_LABEL] : answer}</>,
  }
}

export type VerbPart = 'stem' | 'vowel' | 'ending' | 'subject'

const PART_ASK: Record<VerbPart, string> = {
  stem: 'What is the stem?',
  vowel: 'What is the connecting vowel?',
  ending: 'What is the personal ending?',
  subject: 'Who is the subject, according to the ending?',
}

/** Wrong answers built from the verb's own pieces, so every option looks plausible. */
function partOptions(p: VerbPartsItem, part: VerbPart): string[] {
  const bare = p.form.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC')
  const candidates: Record<VerbPart, string[]> = {
    stem: [p.stem, p.stem + p.vowel, p.vowel + p.ending, bare.slice(0, -1)],
    ending: [p.ending, p.vowel + p.ending, p.stem, p.ending.slice(-1)],
    vowel: [p.vowel, p.vowel === 'ο' ? 'ε' : 'ο', p.ending.charAt(0), p.stem.slice(-1)],
    subject: [p.subject, 'I', 'they', p.subject === 'we' ? 'you (plural)' : 'we'],
  }
  return [...new Set(candidates[part])]
}

export function verbPartQuestion(ch: Chapter, p: VerbPartsItem, part: VerbPart): ChoiceQuestion {
  const answer = part === 'subject' ? p.subject : p[part]
  return {
    id: partsItemId(ch.number, p, part),
    prompt: <><span className="greek big">{p.form}</span><p className="muted">{PART_ASK[part]}</p></>,
    options: shuffle(partOptions(p, part)).map((o) => ({ key: o, label: o, greek: part !== 'subject' })),
    answer,
    explain: (
      <p>
        <span className="greek">{p.form}</span> = <span className="greek">{p.stem}</span> (stem) + <span className="greek">{p.vowel}</span> (connecting
        vowel) + <span className="greek">{p.ending}</span> (ending: “{p.subject}”): “{p.meaning}.”
      </p>
    ),
    review: <><span className="greek">{p.form} = {p.stem} + {p.vowel} + {p.ending}</span> (“{p.meaning}”)</>,
  }
}

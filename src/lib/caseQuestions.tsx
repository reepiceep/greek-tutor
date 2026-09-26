import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { CaseFunction, CaseNoun, Chapter, Gender, GrammaticalNumber, NounCase, UseItem } from '../data/types'
import { NOUN_CASES, type Slot, formAt, graveBeforeWord, hasSlot, slotLabel } from './declensionQuestions'
import { shuffle } from './progress'
import { type UsageConfig, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 7: the genitive and dative endings on nouns, phrases with the article, and what each case is doing.

/** The definite article by gender, number and case (nominative, genitive, dative, accusative). */
export const ARTICLE: Record<Gender, Record<GrammaticalNumber, [string, string, string, string]>> = {
  masculine: { sg: ['ὁ', 'τοῦ', 'τῷ', 'τόν'], pl: ['οἱ', 'τῶν', 'τοῖς', 'τούς'] },
  feminine: { sg: ['ἡ', 'τῆς', 'τῇ', 'τήν'], pl: ['αἱ', 'τῶν', 'ταῖς', 'τάς'] },
  neuter: { sg: ['τό', 'τοῦ', 'τῷ', 'τό'], pl: ['τά', 'τῶν', 'τοῖς', 'τά'] },
}

/** The cases practised in phrases: this chapter is the genitive and dative. */
export const PHRASE_CASES: NounCase[] = ['genitive', 'dative']

export const caseNounGender = (n: CaseNoun): Gender => Object.keys(n.paradigm.forms)[0] as Gender

/** The nouns that have the article in front of them in a phrase (Ἰησοῦς has no plural and is usually a bare name here). */
export const phraseNouns = (ch: Chapter) => (ch.cases?.nouns ?? []).filter((n) => n.english.length > 1)

export interface PhraseSlot {
  noun: CaseNoun
  case: NounCase
  number: GrammaticalNumber
}

export const phraseSlotKey = (s: PhraseSlot) => `${s.noun.paradigm.id}:${s.case.slice(0, 3)}-${s.number}`
export const casePhraseItemId = (ch: number, s: PhraseSlot, skill: 'translate' | 'parse') => `ch${ch}:case-phrase:${phraseSlotKey(s)}:${skill}`

/** Every genitive and dative phrase the chapter's nouns make. */
export const phraseSlots = (ch: Chapter): PhraseSlot[] =>
  phraseNouns(ch).flatMap((noun) => PHRASE_CASES.flatMap((c) => (['sg', 'pl'] as const).map((number) => ({ noun, case: c, number }))))

const slotOf = (s: PhraseSlot): Slot => ({ case: s.case, number: s.number, gender: caseNounGender(s.noun) })

/** τοῦ κυρίου: the article and the noun in the same case, number and gender. */
export function phraseGreek(noun: CaseNoun, c: NounCase, number: GrammaticalNumber): string {
  const g = caseNounGender(noun)
  return `${graveBeforeWord(ARTICLE[g][number][NOUN_CASES.indexOf(c)])} ${formAt(noun.paradigm, { case: c, number, gender: g })}`
}

/** English for a noun phrase in a case: "of the lord", "to the lord", "the lord". */
export function phraseEnglish(noun: CaseNoun, c: NounCase, number: GrammaticalNumber): string {
  const word = noun.english[number === 'sg' ? 0 : 1] ?? noun.english[0]
  const the = `the ${word}`
  return c === 'genitive' ? `of ${the}` : c === 'dative' ? `to/for ${the}` : c === 'accusative' ? `${the} (object)` : the
}

/** All eight case-and-number combinations of a noun, as English options (a plural noun's plural, and so on). */
function englishOptions(noun: CaseNoun, target: PhraseSlot): { key: string; label: string }[] {
  const options: { key: string; label: string }[] = []
  const add = (c: NounCase, number: GrammaticalNumber) => {
    const label = phraseEnglish(noun, c, number)
    if (!options.some((o) => o.label === label)) options.push({ key: label, label })
  }
  add(target.case, target.number)
  // The other case in the same number, then the same case in the other number, then a third case.
  const otherCase = target.case === 'genitive' ? 'dative' : 'genitive'
  const otherNumber = target.number === 'sg' ? 'pl' : 'sg'
  add(otherCase, target.number)
  add(target.case, otherNumber)
  add('nominative', target.number)
  add('accusative', target.number)
  return options.slice(0, 4)
}

const CASE_LONG: Record<NounCase, string> = { nominative: 'nominative', genitive: 'genitive', dative: 'dative', accusative: 'accusative' }

function explain(s: PhraseSlot) {
  const g = caseNounGender(s.noun)
  const article = ARTICLE[g][s.number][NOUN_CASES.indexOf(s.case)]
  const form = formAt(s.noun.paradigm, slotOf(s))
  return (
    <>
      <p>
        <span className="greek">{phraseGreek(s.noun, s.case, s.number)}</span>: the article <span className="greek">{article}</span> and{' '}
        <span className="greek">{form}</span> are both {CASE_LONG[s.case]} {s.number === 'sg' ? 'singular' : 'plural'} ({slotLabel(slotOf(s))}).
      </p>
      <p className="english">“{phraseEnglish(s.noun, s.case, s.number)}”</p>
    </>
  )
}

/** Greek phrase → English. */
export function phraseTranslateQuestion(ch: Chapter, s: PhraseSlot): ChoiceQuestion {
  const greek = phraseGreek(s.noun, s.case, s.number)
  const answer = phraseEnglish(s.noun, s.case, s.number)
  return {
    id: casePhraseItemId(ch.number, s, 'translate'),
    prompt: <><span className="greek big">{greek}</span><p className="muted">Translate</p></>,
    options: shuffle(englishOptions(s.noun, s)),
    answer,
    explain: explain(s),
    review: <><span className="greek">{greek}</span> = “{answer}”</>,
  }
}

/** Greek phrase → case and number. The article settles what the noun's ending alone cannot (ἁμαρτίας: gen sg or acc pl). */
export function phraseParseQuestion(ch: Chapter, s: PhraseSlot): ChoiceQuestion {
  const greek = phraseGreek(s.noun, s.case, s.number)
  const g = caseNounGender(s.noun)
  // Wrong answers that share the number come first, so the case is what is being tested.
  const closeness = (o: { case: NounCase; number: GrammaticalNumber }) => Number(o.number === s.number)
  const others = shuffle(NOUN_CASES.flatMap((c) => (['sg', 'pl'] as const).map((number) => ({ case: c, number })))
    .filter((o) => hasSlot(s.noun.paradigm, { ...o, gender: g }) && !(o.case === s.case && o.number === s.number)))
    .sort((a, b) => closeness(b) - closeness(a))
    .slice(0, 3)
  const label = (o: { case: NounCase; number: GrammaticalNumber }) => `${CASE_LONG[o.case]} ${o.number === 'sg' ? 'singular' : 'plural'}`
  return {
    id: casePhraseItemId(ch.number, s, 'parse'),
    prompt: <><span className="greek big">{greek}</span><p className="muted">Case and number of the phrase?</p></>,
    options: shuffle([s, ...others]).map((o) => ({ key: label(o), label: label(o) })),
    answer: label(s),
    explain: explain(s),
    review: <><span className="greek">{greek}</span> = {label(s)}</>,
  }
}

// --- What the case is doing in a verse ---------------------------------------------

export const CASE_FUNCTIONS: Record<CaseFunction, { label: string; explain: string }> = {
  subject: {
    label: 'Nominative: the subject',
    explain: 'The nominative names the subject, the one doing the action or being described.',
  },
  object: {
    label: 'Accusative: the direct object',
    explain: 'The accusative is the direct object: the one receiving the action of the verb.',
  },
  possession: {
    label: 'Genitive: possession, “of”',
    explain: 'The genitive shows possession or connection: “of,” or “’s.” It also covers relationships (“the brother of John”).',
  },
  indirect: {
    label: 'Dative: the indirect object, “to” or “for”',
    explain: 'The dative is the indirect object: the one to whom or for whom something is done or said.',
  },
  place: {
    label: 'Dative: place or time, “in” or “at”',
    explain: 'The dative can say where or when, usually after ἐν: “in,” “at.”',
  },
  means: {
    label: 'Dative: means, “by” or “with”',
    explain: 'The dative can say by what means: the instrument, “by” or “with.”',
  },
}

export const CASES_USE: UsageConfig<CaseFunction> = {
  prefix: 'case-use',
  ask: 'What case is the highlighted word, and what is it doing?',
  rules: CASE_FUNCTIONS,
  traps: [],
}

export const caseUseQuestion = (ch: Chapter, item: UseItem<CaseFunction>) => usageQuestion(ch, CASES_USE, item)
export const caseUseTranslateQuestion = (ch: Chapter, item: UseItem<CaseFunction>) => usageTranslateQuestion(ch, CASES_USE, item)

import type { ChoiceQuestion, ChoiceResult } from '../components/ChoiceQuiz'
import { readingModifiesQuestion, readingTranslateQuestion } from './prepReadingQuestions'
import { ADJ_READING_SKILLS, adjReadingQuestion, allAdjectives, lexicalFormQuestion, lexicalForms } from './adjReadingQuestions'
import { chapter08 } from '../data/chapter08'
import { chapter09 } from '../data/chapter09'
import { chapter10 } from '../data/chapter10'
import { chapter11 } from '../data/chapter11'
import { chapter12 } from '../data/chapter12'
import { chapter13 } from '../data/chapter13'
import type { Chapter } from '../data/types'
import {
  encliticAccentQuestion, encliticRuleQuestion, predicateSubjectQuestion, predicateTranslateQuestion,
} from './eimiQuestions'
import {
  adjAgreeQuestion, adjParseQuestion, adjTranslateQuestion, adjUseQuestion, distinctForms, slotsOf, translatable,
} from './declensionQuestions'
import { caseUseQuestion, caseUseTranslateQuestion, phraseParseQuestion, phraseSlots, phraseTranslateQuestion } from './caseQuestions'
import { caseUses, elidedForms } from './prepositions'
import { shuffle, type AreaScore, type TestResult } from './progress'
import { PARTICIPLE_AREAS, participleQuestion } from './participleIntroQuestions'
import {
  participleBuildQuestion, participleCharts, participleParseQuestion, participleTenseQuestion, participleVerseParseQuestion,
  participleVerseTranslateQuestion, tenseChoices, translatableVerses, absoluteQuestion, absoluteVerses,
} from './participleQuestions'
import { participleUseQuestion, participleUseTranslateQuestion } from './adjectivalParticipleQuestions'
import {
  infinitiveBuildQuestion, infinitivePairs, infinitiveParseQuestion, infinitiveTranslateQuestion, infinitiveUseQuestion, infinitiveVerseParseQuestion,
} from './infinitiveQuestions'
import {
  imperativeBuildQuestion, imperativeParseQuestion, imperativeTriples, imperativeVerseParseQuestion, imperativeVerseTranslateQuestion,
  parsableVerses, prohibitionQuestion, prohibitionVerses, translatableImperatives,
} from './imperativeQuestions'
import {
  conditionQuestion, conditionTranslateQuestion, didomiBuildQuestion, didomiParseQuestion, didomiVerseQuestion,
} from './nonindicativeQuestions'
import {
  moodPairs, moodQuestion, subjUseQuestion, whichTensePairs, whichTenseQuestion, whichVerbPairs, whichVerbQuestion,
  FORM_SKILLS, SLOTS, contractTypeQuestion, contractionPairs, contractionQuestion, endingFormQuestion, endingPersonQuestion,
  presentFormQuestion, tellsContractType, verseLexicalQuestion, verseParseQuestion, voicePairs, voiceQuestion, FUTURE_RULES, futureFormQuestion, futureLexicalQuestion, futureRuleQuestion,
  redupQuestion, PASSIVE_RULES, passiveRuleQuestion, aoristFormQuestion, augmentQuestion, hasFutureForm, rootQuestion, tensePairs, tenseQuestion,
} from './presentQuestions'
import { ruleItemQuestion, tisQuestion } from './thirdDeclensionQuestions'
import { autosTranslateQuestion, autosUseQuestion } from './autosQuestions'
import {
  type VerbPart, askableProperties, englishVerbQuestion, termDefineQuestion, termNameQuestion, verbPartQuestion,
} from './verbIntroQuestions'
import { demonstrativeTranslateQuestion, demonstrativeUseQuestion } from './demonstrativeQuestions'
import {
  relativeAntecedentQuestion, relativeCaseQuestion, relativeFormQuestion, relativeTranslateQuestion,
} from './relativeQuestions'
import {
  pronounMeaningQuestion, pronounParseQuestion, pronounVerseCaseQuestion, pronounVerseWhoQuestion,
} from './pronounQuestions'
import {
  elidedFormQuestion, elisionQuestion, paradigmIdentifyQuestion, paradigmProduceQuestion, phraseQuestion, prepCaseQuestion,
  prepMeaningQuestion, spatialQuestion, vocabQuestion,
} from './questions'

/** Share of questions to get right in every area to count as ready for the chapter. */
export const READY_THRESHOLD = 0.9
/** At or above this (but below READY_THRESHOLD) an area is shown as close rather than failing. */
export const CLOSE_THRESHOLD = 0.75

export type AreaTier = 'pass' | 'close' | 'low'

/** How an area score looks: green when passing, amber when close, red when well short. */
export function areaTier(correct: number, total: number): AreaTier {
  const share = total ? correct / total : 0
  return share >= READY_THRESHOLD ? 'pass' : share >= CLOSE_THRESHOLD ? 'close' : 'low'
}

/** How many more right answers the area needed to pass (0 when it passed). */
export function neededToPass(correct: number, total: number): number {
  return Math.max(0, Math.ceil(READY_THRESHOLD * total - 1e-9) - correct)
}

export interface TestArea {
  name: string
  count: number
  /** What the area covers, for the test's intro screen. */
  covers: string
}

interface TestSpec {
  areas: TestArea[]
  /** Questions tagged with their area name (unshuffled). */
  build: (ch: Chapter) => ChoiceQuestion[]
}

const take = <T,>(xs: T[], n: number) => shuffle(xs).slice(0, n)
const tag = (area: string, qs: ChoiceQuestion[]) => qs.map((q) => ({ ...q, area }))
const either = <T,>(a: T, b: T) => (Math.random() < 0.5 ? a : b)

function vocabArea(ch: Chapter) {
  return tag('Vocabulary', take(ch.vocab, 10).map((w, i) => vocabQuestion(ch, w, i < 6 ? 'g2e' : 'e2g')))
}

const SPECS: Record<number, TestSpec> = {
  7: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Noun forms', count: 8, covers: 'parsing genitive, dative and other endings' },
      { name: 'Phrases', count: 6, covers: 'article + noun: “of the lord,” “to the sons”' },
      { name: 'Verses', count: 6, covers: 'what the case is doing in the New Testament' },
    ],
    build: (ch) => {
      const cs = ch.cases!
      const forms = take(cs.nouns.flatMap(({ paradigm: p }) => distinctForms(p).map((f) => ({ p, f }))), 8)
      const phrases = take(phraseSlots(ch).flatMap((s) => [phraseTranslateQuestion, phraseParseQuestion].map((f) => ({ s, f }))), 6)
      const verses = take(cs.uses.flatMap((u) => [caseUseQuestion, caseUseTranslateQuestion].map((f) => ({ u, f }))), 6)
      return [
        ...vocabArea(ch),
        ...tag('Noun forms', forms.map(({ p, f }) => adjParseQuestion(ch, p, f))),
        ...tag('Phrases', phrases.map(({ s, f }) => f(ch, s))),
        ...tag('Verses', verses.map(({ u, f }) => f(ch, u))),
      ]
    },
  },
  8: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'εἰμί', count: 6, covers: 'forms, subject & predicate, enclitics' },
      { name: 'Prepositions', count: 7, covers: 'meanings, cases and the diagram' },
      { name: 'Phrases', count: 4, covers: 'translating preposition phrases, and what they modify in verses' },
      { name: 'Elision', count: 3, covers: 'ἀπ᾽, ἀφ᾽, ἐξ and friends' },
    ],
    build: (ch) => {
      const paradigm = ch.paradigms[0]
      const rows = shuffle(paradigm.rows)
      const uses = take(caseUses(ch), 5)
      const [elided] = take(elidedForms(ch), 1)
      return [
        ...vocabArea(ch),
        ...tag('εἰμί', [
          ...rows.slice(0, 3).map((r) => paradigmIdentifyQuestion(ch, paradigm, r, shuffle(r.forms)[0])),
          paradigmProduceQuestion(ch, paradigm, rows[3]),
          ...take(ch.predicates ?? [], 1).map((p) => either(predicateSubjectQuestion, predicateTranslateQuestion)(ch, p)),
          ...take(ch.enclitics ?? [], 1).map((e) => either(encliticAccentQuestion, encliticRuleQuestion)(ch, e)),
        ]),
        ...tag('Prepositions', [
          ...uses.map((u, i) => (i % 2 ? prepCaseQuestion(ch, u) : prepMeaningQuestion(ch, u))),
          ...take(ch.spatial ?? [], 2).map((s) => spatialQuestion(ch, s)),
        ]),
        ...tag('Phrases', [
          ...take(ch.phrases ?? [], 2).map((p) => phraseQuestion(ch, p)),
          ...take(ch.prepReadings ?? [], 2).map((r) => either(readingModifiesQuestion, readingTranslateQuestion)(ch, r)),
        ]),
        ...tag('Elision', [
          ...take(ch.elisions ?? [], 2).map((e) => elisionQuestion(ch, e)),
          ...(elided ? [elidedFormQuestion(ch, elided.form, elided.word)] : []),
        ]),
      ]
    },
  },
  9: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Adjective forms', count: 8, covers: 'parsing, lexical forms and agreement' },
      { name: 'Adjective use', count: 8, covers: 'attributive, predicate, substantival; translating phrases and verses' },
      { name: 'Chapter 8 review', count: 4, covers: 'prepositions and the predicate nominative' },
    ],
    build: (ch) => {
      const adj = ch.adjectives!
      const parse = take(allAdjectives(ch).flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 3)
      const lexical = take(allAdjectives(ch).flatMap((p) => lexicalForms(p).map((f) => ({ p, f }))), 1)
      const agree = take(adj.paradigms.flatMap((p) => adj.nouns.map((n) => ({ p, n }))), 4)
      const useItems = take(adj.uses, 3)
      const translateItems = take(adj.uses.filter(translatable), 2)
      const readings = take(adj.readings ?? [], 3)
      const ch8 = chapter08
      return [
        ...vocabArea(ch),
        ...tag('Adjective forms', [
          ...parse.map(({ p, f }) => adjParseQuestion(ch, p, f)),
          ...lexical.map(({ p, f }) => lexicalFormQuestion(ch, p, f)),
          ...agree.map(({ p, n }) => adjAgreeQuestion(ch, p, n)),
        ]),
        ...tag('Adjective use', [
          ...useItems.map((u) => adjUseQuestion(ch, u)),
          ...translateItems.map((u) => adjTranslateQuestion(ch, u)),
          ...readings.map((r, i) => adjReadingQuestion(ch, r, ADJ_READING_SKILLS[i % ADJ_READING_SKILLS.length])),
        ]),
        // Review questions use chapter 8's own items, so they also count toward chapter 8 progress.
        ...tag('Chapter 8 review', [
          ...take(caseUses(ch8), 2).map((u) => prepMeaningQuestion(ch8, u)),
          ...take(ch8.predicates ?? [], 1).map((p) => predicateSubjectQuestion(ch8, p)),
          ...take(ch8.phrases ?? [], 1).map((p) => phraseQuestion(ch8, p)),
        ]),
      ]
    },
  },
  10: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Third declension', count: 10, covers: 'Square of Stops, stems, parsing' },
      { name: 'πᾶς and τίς', count: 6, covers: 'πᾶς agreement; τίς or τις' },
      { name: 'Review', count: 4, covers: 'adjectives (ch 9) and εἰμί (ch 8)' },
    ],
    build: (ch) => {
      const d = ch.thirdDeclension!
      const parse = take(d.paradigms.flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 5)
      const ch9 = chapter09
      return [
        ...vocabArea(ch),
        ...tag('Third declension', [
          ...take(d.stops, 3).map((r) => ruleItemQuestion(ch, 'stop', r)),
          ...take(d.stems, 2).map((r) => ruleItemQuestion(ch, 'stem', r)),
          ...parse.map(({ p, f }) => adjParseQuestion(ch, p, f)),
        ]),
        ...tag('πᾶς and τίς', [
          ...take(d.agreement.nouns, 3).map((n) => adjAgreeQuestion(ch, d.agreement.paradigm, n)),
          ...take(d.tis, 3).map((t) => tisQuestion(ch, t)),
        ]),
        ...tag('Review', [
          ...take(ch9.adjectives!.uses, 2).map((u) => adjUseQuestion(ch9, u)),
          ...take(ch9.adjectives!.paradigms.flatMap((p) => ch9.adjectives!.nouns.map((n) => ({ p, n }))), 1).map(({ p, n }) => adjAgreeQuestion(ch9, p, n)),
          ...take(chapter08.predicates ?? [], 1).map((p) => predicateSubjectQuestion(chapter08, p)),
        ]),
      ]
    },
  },
  11: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Pronoun forms', count: 8, covers: 'parsing and meaning of ἐγώ, σύ, ἡμεῖς, ὑμεῖς' },
      { name: 'Pronouns in verses', count: 6, covers: 'who and which case, in real verses' },
      { name: 'New nouns', count: 3, covers: 'πατήρ, ἀνήρ, πίστις, χάρις' },
      { name: 'Review', count: 3, covers: 'third declension (ch 10) and adjectives (ch 9)' },
    ],
    build: (ch) => {
      const pr = ch.pronouns!
      const parseForms = take(pr.forms, 4)
      const meaningForms = take(pr.forms.filter((f) => !parseForms.includes(f)), 4)
      const verses = take(pr.verses, 6)
      const nouns = take(pr.nouns.flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 3)
      const ch10 = chapter10
      return [
        ...vocabArea(ch),
        ...tag('Pronoun forms', [
          ...parseForms.map((f) => pronounParseQuestion(ch, f)),
          ...meaningForms.map((f) => pronounMeaningQuestion(ch, pr.forms, f)),
        ]),
        ...tag('Pronouns in verses', verses.map((v, i) => (i < 4 ? pronounVerseWhoQuestion : pronounVerseCaseQuestion)(ch, v))),
        ...tag('New nouns', nouns.map(({ p, f }) => adjParseQuestion(ch, p, f))),
        ...tag('Review', [
          ...take(ch10.thirdDeclension!.stops, 1).map((r) => ruleItemQuestion(ch10, 'stop', r)),
          ...take(ch10.thirdDeclension!.tis, 1).map((t) => tisQuestion(ch10, t)),
          ...take(chapter09.adjectives!.uses, 1).map((u) => adjUseQuestion(chapter09, u)),
        ]),
      ]
    },
  },
  12: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'αὐτός forms', count: 6, covers: 'parsing αὐτός' },
      { name: 'αὐτός uses', count: 8, covers: 'he/she/it, -self, the same; translation' },
      { name: 'New nouns', count: 2, covers: 'αἰών, πούς' },
      { name: 'Review', count: 4, covers: 'pronouns (ch 11), τίς/τις (ch 10), adjectives (ch 9)' },
    ],
    build: (ch) => {
      const au = ch.autos!
      const items = shuffle(au.items)
      const pr11 = chapter11.pronouns!
      return [
        ...vocabArea(ch),
        ...tag('αὐτός forms', take(distinctForms(au.paradigm), 6).map((f) => adjParseQuestion(ch, au.paradigm, f))),
        ...tag('αὐτός uses', [
          ...items.slice(0, 5).map((a) => autosUseQuestion(ch, a)),
          ...items.slice(5, 8).map((a) => autosTranslateQuestion(ch, a)),
        ]),
        ...tag('New nouns', take(au.nouns.flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 2).map(({ p, f }) => adjParseQuestion(ch, p, f))),
        ...tag('Review', [
          ...take(pr11.verses, 2).map((v) => pronounVerseWhoQuestion(chapter11, v)),
          ...take(chapter10.thirdDeclension!.tis, 1).map((t) => tisQuestion(chapter10, t)),
          ...take(chapter09.adjectives!.uses, 1).map((u) => adjUseQuestion(chapter09, u)),
        ]),
      ]
    },
  },
  13: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Demonstrative forms', count: 6, covers: 'parsing οὗτος, ἐκεῖνος, μέγας, πολύς, γυνή, πόλις' },
      { name: 'Demonstratives in use', count: 8, covers: 'pronoun or adjective; translation' },
      { name: 'Agreement', count: 3, covers: 'οὗτος and ἐκεῖνος with nouns' },
      { name: 'Review', count: 3, covers: 'αὐτός (ch 12) and pronouns (ch 11)' },
    ],
    build: (ch) => {
      const dm = ch.demonstratives!
      const items = shuffle(dm.items)
      const au12 = chapter12.autos!
      return [
        ...vocabArea(ch),
        ...tag('Demonstrative forms', take(dm.paradigms.flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 6).map(({ p, f }) => adjParseQuestion(ch, p, f))),
        ...tag('Demonstratives in use', [
          ...items.slice(0, 5).map((d) => demonstrativeUseQuestion(ch, d)),
          ...items.slice(5, 8).map((d) => demonstrativeTranslateQuestion(ch, d)),
        ]),
        ...tag('Agreement', take(dm.agreement.paradigms.flatMap((p) => dm.agreement.nouns.map((n) => ({ p, n }))), 3).map(({ p, n }) => adjAgreeQuestion(ch, p, n))),
        ...tag('Review', [
          ...take(au12.items, 2).map((a) => autosUseQuestion(chapter12, a)),
          ...take(chapter11.pronouns!.verses, 1).map((v) => pronounVerseWhoQuestion(chapter11, v)),
        ]),
      ]
    },
  },
  14: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Relative forms', count: 6, covers: 'parsing ὅς, ἥ, ὅ; article or relative' },
      { name: 'Relative clauses', count: 10, covers: 'antecedent, case, translation' },
      { name: 'Review', count: 4, covers: 'demonstratives (ch 13) and αὐτός (ch 12)' },
    ],
    build: (ch) => {
      const rl = ch.relative!
      const items = shuffle(rl.items)
      const dm13 = chapter13.demonstratives!
      return [
        ...vocabArea(ch),
        ...tag('Relative forms', [
          ...take(distinctForms(rl.paradigm), 4).map((f) => adjParseQuestion(ch, rl.paradigm, f)),
          ...take(rl.forms, 2).map((f) => relativeFormQuestion(ch, f)),
        ]),
        ...tag('Relative clauses', [
          ...items.slice(0, 4).map((r) => relativeAntecedentQuestion(ch, r)),
          ...items.slice(4, 7).map((r) => relativeCaseQuestion(ch, r)),
          ...items.slice(7, 10).map((r) => relativeTranslateQuestion(ch, r)),
        ]),
        ...tag('Review', [
          ...take(dm13.items, 2).map((d) => demonstrativeUseQuestion(chapter13, d)),
          ...take(dm13.agreement.paradigms.flatMap((p) => dm13.agreement.nouns.map((n) => ({ p, n }))), 1).map(({ p, n }) => adjAgreeQuestion(chapter13, p, n)),
          ...take(chapter12.autos!.items, 1).map((a) => autosUseQuestion(chapter12, a)),
        ]),
      ]
    },
  },
  15: {
    areas: [
      { name: 'Terms', count: 8, covers: 'person, number, aspect, voice, mood and the rest' },
      { name: 'English verbs', count: 16, covers: 'describing English verbs' },
      { name: 'Parts of a verb', count: 6, covers: 'stem, connecting vowel, personal ending' },
    ],
    build: (ch) => {
      const v = ch.verbIntro!
      const terms = shuffle(v.terms)
      const english = take(v.english.flatMap((e) => askableProperties(e).map((prop) => ({ e, prop }))), 16)
      const parts = take(v.parts.flatMap((p) => (['stem', 'vowel', 'ending', 'subject'] as VerbPart[]).map((part) => ({ p, part }))), 6)
      return [
        ...tag('Terms', [
          ...terms.slice(0, 4).map((t) => termNameQuestion(ch, t, v.terms)),
          ...terms.slice(4, 8).map((t) => termDefineQuestion(ch, t, v.terms)),
        ]),
        ...tag('English verbs', english.map(({ e, prop }) => englishVerbQuestion(ch, e, prop))),
        ...tag('Parts of a verb', parts.map(({ p, part }) => verbPartQuestion(ch, p, part))),
      ]
    },
  },
  16: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Present forms', count: 10, covers: 'parsing, translating and choosing forms of six verbs' },
      { name: 'Endings', count: 4, covers: 'ω, εις, ει, ομεν, ετε, ουσι(ν)' },
      { name: 'Verses', count: 6, covers: 'present verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const endings = take(SLOTS.flatMap((s) => [endingPersonQuestion, endingFormQuestion].map((f) => ({ s, f }))), 4)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 6)
      return [
        ...vocabArea(ch),
        ...tag('Present forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Endings', endings.map(({ s, f }) => f(ch, s))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  17: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Contract forms', count: 10, covers: 'parsing, translating and choosing forms of contract verbs' },
      { name: 'Contractions', count: 5, covers: 'which vowels contract to what, and spotting the kind of contract verb' },
      { name: 'Verses', count: 5, covers: 'contract verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const types = take(pr.verbs.flatMap((v) => SLOTS.filter((s) => tellsContractType(v, s)).map((s) => ({ v, s }))), 2)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 5)
      return [
        ...vocabArea(ch),
        ...tag('Contract forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Contractions', [
          ...take(contractionPairs(), 3).map(({ c, vowel }) => contractionQuestion(ch, c, vowel)),
          ...types.map(({ v, s }) => contractTypeQuestion(ch, v, s)),
        ]),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  18: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Middle/passive forms', count: 10, covers: 'parsing, translating and choosing forms, including middle-only verbs and δύναμαι' },
      { name: 'Endings & voice', count: 5, covers: 'ομαι, ῃ, εται, ομεθα, εσθε, ονται, and telling active from middle/passive' },
      { name: 'Verses', count: 5, covers: 'middle/passive verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const endings = take(SLOTS.flatMap((s) => [endingPersonQuestion, endingFormQuestion].map((f) => ({ s, f }))), 2)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 5)
      return [
        ...vocabArea(ch),
        ...tag('Middle/passive forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Endings & voice', [
          ...endings.map(({ s, f }) => f(ch, s)),
          ...take(voicePairs(ch), 3).map(({ v, slot, voice }) => voiceQuestion(ch, v, slot, voice)),
        ]),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  19: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Future forms', count: 8, covers: 'parsing, translating and choosing future forms' },
      { name: 'Forming the future', count: 5, covers: 'what σ does to a stem, and finding the lexical form' },
      { name: 'Present or future', count: 3, covers: 'telling λύει from λύσει' },
      { name: 'Verses', count: 4, covers: 'future verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 8)
      const rules = take([
        ...FUTURE_RULES.map((r) => () => futureRuleQuestion(ch, r)),
        ...pr.verbs.filter(hasFutureForm).map((v) => () => futureFormQuestion(ch, v)),
      ], 2)
      const lexical = take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 3)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Future forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Forming the future', [...rules.map((make) => make()), ...lexical.map(({ v, s }) => futureLexicalQuestion(ch, v, s))]),
        ...tag('Present or future', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  20: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Future forms', count: 8, covers: 'parsing, translating and choosing liquid and other futures' },
      { name: 'Roots & futures', count: 5, covers: 'verbal roots, forming the future, and finding the lexical form' },
      { name: 'Present or future', count: 3, covers: 'μένει or μενεῖ, αἴρει or ἀρεῖ' },
      { name: 'Verses', count: 4, covers: 'these futures in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 8)
      const lexical = take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 2)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Future forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Roots & futures', [
          ...take(pr.roots ?? [], 2).map((r) => rootQuestion(ch, r)),
          ...take(pr.verbs.filter(hasFutureForm), 1).map((v) => futureFormQuestion(ch, v)),
          ...lexical.map(({ v, s }) => futureLexicalQuestion(ch, v, s)),
        ]),
        ...tag('Present or future', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  21: {
    areas: [
      { name: 'Vocabulary', count: 9, covers: 'the chapter’s nine words, both directions' },
      { name: 'Imperfect forms', count: 9, covers: 'parsing, translating and choosing imperfect forms' },
      { name: 'The augment', count: 5, covers: 'where the augment goes and what it does to a vowel' },
      { name: 'Present or imperfect', count: 3, covers: 'λύει or ἔλυε' },
      { name: 'Verses', count: 4, covers: 'imperfect verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 9)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Imperfect forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('The augment', take(pr.augments ?? [], 5).map((r) => augmentQuestion(ch, r))),
        ...tag('Present or imperfect', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  22: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Aorist forms', count: 8, covers: 'parsing, translating and choosing second aorist forms' },
      { name: 'Aorist stems', count: 5, covers: 'each verb’s aorist, and the lexical form of an aorist' },
      { name: 'Imperfect or aorist', count: 3, covers: 'telling ἐλάμβανον from ἔλαβον' },
      { name: 'Verses', count: 4, covers: 'second aorists in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 8)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Aorist forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Aorist stems', [
          ...take(pr.verbs, 2).map((v) => aoristFormQuestion(ch, v)),
          ...take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 3).map(({ v, s }) => futureLexicalQuestion(ch, v, s)),
        ]),
        ...tag('Imperfect or aorist', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  23: {
    areas: [
      { name: 'Vocabulary', count: 8, covers: 'the chapter’s eight words, both directions' },
      { name: 'Aorist forms', count: 10, covers: 'parsing, translating and choosing first aorist forms' },
      { name: 'Forming the aorist', count: 5, covers: 'what σ does to a stem, liquid aorists, and the lexical form of an aorist' },
      { name: 'Imperfect or aorist', count: 3, covers: 'telling ἔλυον from ἔλυσα' },
      { name: 'Verses', count: 4, covers: 'first aorists in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Aorist forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Forming the aorist', [
          ...take(FUTURE_RULES, 1).map((r) => futureRuleQuestion(ch, r)),
          ...take(pr.verbs, 2).map((v) => aoristFormQuestion(ch, v)),
          ...take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 2).map(({ v, s }) => futureLexicalQuestion(ch, v, s)),
        ]),
        ...tag('Imperfect or aorist', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  24: {
    areas: [
      { name: 'Vocabulary', count: 8, covers: 'the chapter’s eight words, both directions' },
      { name: 'Passive forms', count: 10, covers: 'parsing, translating and choosing aorist passive forms, including deponents' },
      { name: 'Forming the passive', count: 5, covers: 'what θ does to a stem, choosing the aorist passive, and the lexical form' },
      { name: 'Aorist or future', count: 3, covers: 'telling ἐλύθη from λυθήσεται' },
      { name: 'Verses', count: 4, covers: 'aorist and future passives in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 4)
      return [
        ...vocabArea(ch),
        ...tag('Passive forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Forming the passive', [
          ...take(PASSIVE_RULES, 1).map((r) => passiveRuleQuestion(ch, r)),
          ...take(pr.verbs, 2).map((v) => aoristFormQuestion(ch, v)),
          ...take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 2).map(({ v, s }) => futureLexicalQuestion(ch, v, s)),
        ]),
        ...tag('Aorist or future', take(tensePairs(ch), 3).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  25: {
    areas: [
      { name: 'Vocabulary', count: 3, covers: 'the chapter’s three words, both directions' },
      { name: 'Perfect forms', count: 12, covers: 'parsing, translating and choosing perfect active and middle/passive forms' },
      { name: 'Reduplication', count: 6, covers: 'how verbs reduplicate, choosing the perfect, and the lexical form' },
      { name: 'Aorist or perfect', count: 4, covers: 'telling ἔλυσα from λέλυκα' },
      { name: 'Verses', count: 5, covers: 'perfects in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 12)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 5)
      return [
        ...vocabArea(ch),
        ...tag('Perfect forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Reduplication', [
          ...take(pr.reduplications ?? [], 2).map((r) => redupQuestion(ch, r)),
          ...take(pr.verbs, 2).map((v) => aoristFormQuestion(ch, v)),
          ...take(pr.verbs.flatMap((v) => SLOTS.map((s) => ({ v, s }))), 2).map(({ v, s }) => futureLexicalQuestion(ch, v, s)),
        ]),
        ...tag('Aorist or perfect', take(tensePairs(ch), 4).map(({ v, slot, tense }) => tenseQuestion(ch, v, slot, tense))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  26: {
    areas: PARTICIPLE_AREAS.map((area) => ({ name: area.label, count: area.testCount, covers: area.label.toLowerCase() })),
    build: (ch) => PARTICIPLE_AREAS.flatMap((area) => tag(area.label,
      take(ch.participleIntro![area.key], area.testCount).map((item) => participleQuestion(ch, area.key, item)))),
  },
  27: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'Participle forms', count: 10, covers: 'parsing present participles, and choosing the form for a parsing' },
      { name: 'Verses', count: 6, covers: 'parsing present participles in the New Testament' },
      { name: 'Translation', count: 4, covers: 'what the participle agrees with, and translating it with “while”' },
    ],
    build: (ch) => {
      const charts = participleCharts(ch)
      const verses = ch.participles!.verses
      return [
        ...vocabArea(ch),
        ...tag('Participle forms', [
          ...take(charts.flatMap((c) => distinctForms(c.p).map((form) => ({ c, form }))), 6).map(({ c, form }) => participleParseQuestion(ch, c, form)),
          ...take(charts.flatMap((c) => slotsOf(c.p).map((s) => ({ c, s }))), 4).map(({ c, s }) => participleBuildQuestion(ch, c, s)),
        ]),
        ...tag('Verses', take(verses, 6).map((v) => participleVerseParseQuestion(ch, v))),
        ...tag('Translation', take(translatableVerses(ch), 4).map((v) => participleVerseTranslateQuestion(ch, v))),
      ]
    },
  },
  28: {
    areas: [
      { name: 'Vocabulary', count: 8, covers: 'the chapter’s eight words, both directions' },
      { name: 'Participle forms', count: 8, covers: 'parsing aorist participles, and choosing the form for a parsing' },
      { name: 'Present or aorist', count: 4, covers: 'telling λύων from λύσας and λαμβάνων from λαβών' },
      { name: 'Verses', count: 6, covers: 'parsing aorist participles in the New Testament' },
      { name: 'Translation', count: 4, covers: 'what the participle agrees with, and translating it with “after”' },
    ],
    build: (ch) => {
      const charts = participleCharts(ch)
      return [
        ...vocabArea(ch),
        ...tag('Participle forms', [
          ...take(charts.flatMap((c) => distinctForms(c.p).map((form) => ({ c, form }))), 5).map(({ c, form }) => participleParseQuestion(ch, c, form)),
          ...take(charts.flatMap((c) => slotsOf(c.p).map((s) => ({ c, s }))), 3).map(({ c, s }) => participleBuildQuestion(ch, c, s)),
        ]),
        ...tag('Present or aorist', take(tenseChoices(ch), 4).map(({ c, form }) => participleTenseQuestion(ch, c, form))),
        ...tag('Verses', take(ch.participles!.verses, 6).map((v) => participleVerseParseQuestion(ch, v))),
        ...tag('Translation', take(translatableVerses(ch), 4).map((v) => participleVerseTranslateQuestion(ch, v))),
      ]
    },
  },
  29: {
    areas: [
      { name: 'Vocabulary', count: 5, covers: 'the chapter’s five words, both directions' },
      { name: 'Use', count: 10, covers: 'adverbial, attributive or substantival' },
      { name: 'Translation', count: 8, covers: '“the one who …,” “the Father who …,” “while …”' },
      { name: 'Parsing', count: 7, covers: 'present and aorist participles in the New Testament' },
    ],
    build: (ch) => {
      const items = shuffle(ch.participleUses!)
      return [
        ...vocabArea(ch),
        ...tag('Use', items.slice(0, 10).map((u) => participleUseQuestion(ch, u))),
        ...tag('Translation', items.slice(10, 18).map((u) => participleUseTranslateQuestion(ch, u))),
        ...tag('Parsing', items.slice(18, 25).map((u) => participleVerseParseQuestion(ch, u))),
      ]
    },
  },
  30: {
    areas: [
      { name: 'Vocabulary', count: 2, covers: 'μηδέ and πρεσβύτερος, both directions' },
      { name: 'Perfect forms', count: 10, covers: 'parsing perfect participles, and choosing the form for a parsing' },
      { name: 'Genitive absolutes', count: 8, covers: 'spotting a genitive absolute, and translating it' },
      { name: 'Verses', count: 10, covers: 'parsing participles of every tense in the New Testament' },
    ],
    build: (ch) => {
      const charts = participleCharts(ch)
      const absolutes = shuffle(absoluteVerses(ch))
      const translatable = absolutes.filter((v) => v.absolute && v.wrong?.length)
      return [
        ...vocabArea(ch),
        ...tag('Perfect forms', [
          ...take(charts.flatMap((c) => distinctForms(c.p).map((form) => ({ c, form }))), 6).map(({ c, form }) => participleParseQuestion(ch, c, form)),
          ...take(charts.flatMap((c) => slotsOf(c.p).map((s) => ({ c, s }))), 4).map(({ c, s }) => participleBuildQuestion(ch, c, s)),
        ]),
        ...tag('Genitive absolutes', [
          ...absolutes.slice(0, 5).map((v) => absoluteQuestion(ch, v)),
          ...translatable.filter((v) => !absolutes.slice(0, 5).includes(v)).slice(0, 3).map((v) => participleVerseTranslateQuestion(ch, v)),
        ]),
        ...tag('Verses', take(ch.participles!.verses, 10).map((v) => participleVerseParseQuestion(ch, v))),
      ]
    },
  },
  31: {
    areas: [
      { name: 'Vocabulary', count: 2, covers: 'λίθος and τοιοῦτος, both directions' },
      { name: 'Subjunctive forms', count: 10, covers: 'parsing, translating and choosing present and aorist subjunctives' },
      { name: 'Indicative or subjunctive', count: 6, covers: 'telling λύει from λύῃ and λύσει from λύσῃ' },
      { name: 'Why subjunctive', count: 6, covers: 'ἵνα, ἐάν, “let us,” questions, οὐ μή, ὃς ἄν' },
      { name: 'Verses', count: 6, covers: 'subjunctives in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const withUse = shuffle(pr.verses.filter((v) => v.use))
      const rest = withUse.slice(6)
      return [
        ...vocabArea(ch),
        ...tag('Subjunctive forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Indicative or subjunctive', take(moodPairs(ch), 6).map(({ v, slot, mood }) => moodQuestion(ch, v, slot, mood))),
        ...tag('Why subjunctive', withUse.slice(0, 6).map((v) => subjUseQuestion(ch, v))),
        ...tag('Verses', take(rest.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 6).map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  32: {
    areas: [
      { name: 'Vocabulary', count: 2, covers: 'δίκαιος and μέλλω, both directions' },
      { name: 'Infinitive forms', count: 10, covers: 'parsing infinitives, and choosing the form for a tense and voice' },
      { name: 'Uses', count: 8, covers: 'complementary, purpose, result, time, cause, substantival' },
      { name: 'Translation', count: 6, covers: 'translating infinitives in the New Testament' },
      { name: 'Parsing in verses', count: 4, covers: 'the tense and voice of infinitives in the New Testament' },
    ],
    build: (ch) => {
      const pairs = infinitivePairs(ch)
      const items = shuffle(ch.infinitives!.items)
      return [
        ...vocabArea(ch),
        ...tag('Infinitive forms', [
          ...take(pairs, 6).map(({ v, kind }) => infinitiveParseQuestion(ch, v, kind)),
          ...take(pairs, 4).map(({ v, kind }) => infinitiveBuildQuestion(ch, v, kind)),
        ]),
        ...tag('Uses', items.slice(0, 8).map((it) => infinitiveUseQuestion(ch, it))),
        ...tag('Translation', items.slice(8, 14).map((it) => infinitiveTranslateQuestion(ch, it))),
        ...tag('Parsing in verses', items.slice(14, 18).map((it) => infinitiveVerseParseQuestion(ch, it))),
      ]
    },
  },
  33: {
    areas: [
      { name: 'Vocabulary', count: 3, covers: 'ἀπόλλυμι, ἀπολύω and εἴτε, both directions' },
      { name: 'Imperative forms', count: 11, covers: 'parsing imperatives, and choosing the form for a parsing' },
      { name: 'Commands in verses', count: 6, covers: 'parsing imperatives in the New Testament' },
      { name: 'Translation', count: 6, covers: '“loose!”, “let him …,” and telling imperative from indicative' },
      { name: 'Prohibitions', count: 4, covers: 'μή + present imperative or μή + aorist subjunctive' },
    ],
    build: (ch) => {
      const triples = imperativeTriples(ch)
      const translate = shuffle(translatableImperatives(ch)).slice(0, 6)
      return [
        ...vocabArea(ch),
        ...tag('Imperative forms', [
          ...take(triples, 7).map(({ v, kind, slot }) => imperativeParseQuestion(ch, v, kind, slot)),
          ...take(triples, 4).map(({ v, kind, slot }) => imperativeBuildQuestion(ch, v, kind, slot)),
        ]),
        ...tag('Commands in verses', take(parsableVerses(ch), 6).map((v) => imperativeVerseParseQuestion(ch, v))),
        ...tag('Translation', translate.map((v) => imperativeVerseTranslateQuestion(ch, v))),
        ...tag('Prohibitions', take(prohibitionVerses(ch), 4).map((v) => prohibitionQuestion(ch, v))),
      ]
    },
  },
  34: {
    areas: [
      { name: 'Vocabulary', count: 7, covers: 'the chapter’s seven words, both directions' },
      { name: 'δίδωμι forms', count: 10, covers: 'parsing, translating and choosing forms of δίδωμι and παραδίδωμι' },
      { name: 'Which tense', count: 6, covers: 'δίδωσι, ἐδίδου, δώσει, ἔδωκεν, δέδωκεν, ἐδόθη' },
      { name: 'Verses', count: 7, covers: 'δίδωμι and παραδίδωμι in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 10)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 7)
      return [
        ...vocabArea(ch),
        ...tag('δίδωμι forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Which tense', take(whichTensePairs(ch), 6).map(({ v, slot }) => whichTenseQuestion(ch, v, slot))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
  35: {
    areas: [
      { name: 'Vocabulary', count: 10, covers: 'the chapter’s words, both directions' },
      { name: 'δίδωμι forms', count: 8, covers: 'subjunctive, imperative, infinitive and participle of δίδωμι' },
      { name: 'δίδωμι in verses', count: 5, covers: 'δός, δοῦναι, διδούς and others in the New Testament' },
      { name: 'Conditional sentences', count: 7, covers: 'first, second and third class conditions, and translating them' },
    ],
    build: (ch) => {
      const ni = ch.nonindicative!
      const conditions = shuffle(ni.conditions)
      return [
        ...vocabArea(ch),
        ...tag('δίδωμι forms', [
          ...take(ni.forms, 5).map((f) => didomiParseQuestion(ch, f)),
          ...take(ni.forms, 3).map((f) => didomiBuildQuestion(ch, f)),
        ]),
        ...tag('δίδωμι in verses', take(ni.verses, 5).map((v) => didomiVerseQuestion(ch, v))),
        ...tag('Conditional sentences', [
          ...conditions.slice(0, 4).map((c) => conditionQuestion(ch, c)),
          ...conditions.slice(4, 7).map((c) => conditionTranslateQuestion(ch, c)),
        ]),
      ]
    },
  },
  36: {
    areas: [
      { name: 'Vocabulary', count: 9, covers: 'the chapter’s nine words, both directions' },
      { name: 'μι verb forms', count: 8, covers: 'parsing, translating and choosing forms of ἵστημι, τίθημι, δείκνυμι and ἀφίημι' },
      { name: 'Which verb', count: 4, covers: 'ἔθηκεν, ἔστησεν, ἔδειξεν, ἀφῆκεν: finding the lexical form' },
      { name: 'Which tense', count: 3, covers: 'present, future, aorist, perfect or passive' },
      { name: 'Verses', count: 6, covers: 'the μι verbs in the New Testament' },
    ],
    build: (ch) => {
      const pr = ch.present!
      const forms = take(pr.verbs.flatMap((v) => SLOTS.flatMap((s) => FORM_SKILLS.map((skill) => ({ v, s, skill })))), 8)
      const verses = take(pr.verses.flatMap((v) => [verseParseQuestion, verseLexicalQuestion].map((f) => ({ v, f }))), 6)
      return [
        ...vocabArea(ch),
        ...tag('μι verb forms', forms.map(({ v, s, skill }) => presentFormQuestion(ch, v, s, skill))),
        ...tag('Which verb', take(whichVerbPairs(ch), 4).map(({ v, slot }) => whichVerbQuestion(ch, v, slot))),
        ...tag('Which tense', take(whichTensePairs(ch), 3).map(({ v, slot }) => whichTenseQuestion(ch, v, slot))),
        ...tag('Verses', verses.map(({ v, f }) => f(ch, v))),
      ]
    },
  },
}

/** The test layout for a chapter, if one has been written. */
export const testAreas = (chapter: number): TestArea[] => SPECS[chapter]?.areas ?? []

/** Chapters added with vocabulary only (chapter 6) have no test yet. */
export const hasTest = (chapter: number) => chapter in SPECS

/** A 30-question mixed test sampled at random (not weakest-first: this measures, it doesn't drill). */
export function buildChapterTest(ch: Chapter): ChoiceQuestion[] {
  return shuffle(SPECS[ch.number].build(ch))
}

export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function scoreTest(ch: Chapter, results: ChoiceResult[], seconds: number): TestResult {
  const areas: Record<string, AreaScore> = {}
  for (const { q, correct } of results) {
    const a = (areas[q.area ?? 'Other'] ??= { correct: 0, total: 0 })
    a.total++
    if (correct) a.correct++
  }
  const correct = results.filter((r) => r.correct).length
  return {
    chapter: ch.number,
    date: Date.now(),
    seconds,
    correct,
    total: results.length,
    areas,
    ready: results.length > 0 && Object.values(areas).every((a) => a.correct / a.total >= READY_THRESHOLD),
  }
}

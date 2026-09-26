import type { ChoiceQuestion, ChoiceResult } from '../components/ChoiceQuiz'
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
  adjAgreeQuestion, adjParseQuestion, adjTranslateQuestion, adjUseQuestion, distinctForms, translatable,
} from './declensionQuestions'
import { caseUseQuestion, caseUseTranslateQuestion, phraseParseQuestion, phraseSlots, phraseTranslateQuestion } from './caseQuestions'
import { caseUses, elidedForms } from './prepositions'
import { shuffle, type AreaScore, type TestResult } from './progress'
import {
  FORM_SKILLS, SLOTS, contractTypeQuestion, contractionPairs, contractionQuestion, endingFormQuestion, endingPersonQuestion,
  presentFormQuestion, tellsContractType, verseLexicalQuestion, verseParseQuestion,
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
      { name: 'Phrases', count: 4, covers: 'translating preposition phrases' },
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
        ...tag('Phrases', take(ch.phrases ?? [], 4).map((p) => phraseQuestion(ch, p))),
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
      { name: 'Adjective forms', count: 8, covers: 'parsing and agreement' },
      { name: 'Adjective use', count: 8, covers: 'attributive, predicate, substantival; translation' },
      { name: 'Chapter 8 review', count: 4, covers: 'prepositions and the predicate nominative' },
    ],
    build: (ch) => {
      const adj = ch.adjectives!
      const parse = take(adj.paradigms.flatMap((p) => distinctForms(p).map((f) => ({ p, f }))), 4)
      const agree = take(adj.paradigms.flatMap((p) => adj.nouns.map((n) => ({ p, n }))), 4)
      const useItems = take(adj.uses, 5)
      const translateItems = take(adj.uses.filter(translatable), 3)
      const ch8 = chapter08
      return [
        ...vocabArea(ch),
        ...tag('Adjective forms', [
          ...parse.map(({ p, f }) => adjParseQuestion(ch, p, f)),
          ...agree.map(({ p, n }) => adjAgreeQuestion(ch, p, n)),
        ]),
        ...tag('Adjective use', [
          ...useItems.map((u) => adjUseQuestion(ch, u)),
          ...translateItems.map((u) => adjTranslateQuestion(ch, u)),
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

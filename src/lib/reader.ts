import { CHAPTERS } from '../data/chapters'
import { GLOSSES, THIRD_DECLENSION } from '../data/readings'
import type { Reading, ReadingWord, VocabWord } from '../data/types'

// The reader: New Testament passages word by word. MorphGNT gives each word a part of speech and an 8-character parse
// code (person, tense, voice, mood, case, number, gender, degree); this turns those into plain English, finds the
// chapter of Mounce where each form is taught, and checks words against the course vocabulary.

const key = (lemma: string) => lemma.normalize('NFC')
const THIRD = new Set(THIRD_DECLENSION.map(key))

/** Every course word by lemma, with the chapter it is taught in (the first, if it comes up twice). */
const VOCAB = new Map<string, { word: VocabWord; chapter: number }>()
for (const c of CHAPTERS) {
  for (const word of c.vocab) if (!VOCAB.has(key(word.lemma))) VOCAB.set(key(word.lemma), { word, chapter: c.number })
}

export function courseWord(lemma: string) {
  return VOCAB.get(key(lemma))
}

/** Mounce's gloss for course words, otherwise the lexicon's. */
export function gloss(lemma: string): string {
  return courseWord(lemma)?.word.gloss ?? GLOSSES[key(lemma)] ?? ''
}

/** A proper name (capitalized lemma): not counted when judging how much of a passage you know. */
export const isName = ([, lemma]: ReadingWord) => lemma[0] !== lemma[0].toLowerCase()

const PERSON: Record<string, string> = { '1': '1st person', '2': '2nd person', '3': '3rd person' }
const TENSE: Record<string, string> = { P: 'present', I: 'imperfect', F: 'future', A: 'aorist', X: 'perfect', Y: 'pluperfect' }
const VOICE: Record<string, string> = { A: 'active', M: 'middle', P: 'passive' }
const MOOD: Record<string, string> = { I: 'indicative', D: 'imperative', S: 'subjunctive', O: 'optative', N: 'infinitive', P: 'participle' }
const CASE: Record<string, string> = { N: 'nominative', G: 'genitive', D: 'dative', A: 'accusative', V: 'vocative' }
const NUMBER: Record<string, string> = { S: 'singular', P: 'plural' }
const GENDER: Record<string, string> = { M: 'masculine', F: 'feminine', N: 'neuter' }
const DEGREE: Record<string, string> = { C: 'comparative', S: 'superlative' }

const POS: Record<string, string> = {
  N: 'noun', A: 'adjective', V: 'verb', P: 'preposition', C: 'conjunction', D: 'adverb', X: 'particle', I: 'interjection',
  RA: 'article', RD: 'demonstrative pronoun', RI: 'interrogative or indefinite pronoun', RP: 'personal pronoun', RR: 'relative pronoun',
}

export function partOfSpeech(pos: string): string {
  return POS[pos] ?? 'word'
}

/** "aorist active indicative, 3rd person singular"; "genitive singular feminine"; "" for words that don't inflect. */
export function describeParse(pos: string, parse: string): string {
  const [person, tense, voice, mood, kase, number, gender, degree] = parse.split('')
  const caseNumberGender = [CASE[kase], NUMBER[number], GENDER[gender]].filter(Boolean).join(' ')
  if (pos === 'V') {
    const verb = [TENSE[tense], VOICE[voice], MOOD[mood]].filter(Boolean).join(' ')
    if (mood === 'P') return `${verb}, ${caseNumberGender}`
    if (mood === 'N') return verb
    return `${verb}, ${[PERSON[person], NUMBER[number]].filter(Boolean).join(' ')}`
  }
  return [caseNumberGender, DEGREE[degree]].filter(Boolean).join(', ')
}

// The μι verbs: δίδωμι's family is chapter 34, the rest chapter 36.
const DIDOMI = /δίδωμι$/
const isMi = (lemma: string) => lemma.endsWith('μι') && lemma !== 'εἰμί'
// Contract verbs end in -άω, -έω, -όω.
const isContract = (lemma: string) => /[άέό]ω$/.test(key(lemma))

/**
 * The chapter of Mounce where this form is taught, so a reader knows what to expect. Approximate where the parse code
 * can't tell (first and second aorists count as chapter 23, adjectival and adverbial participles by tense).
 */
export function grammarChapter([, lemma, pos, parse]: ReadingWord): number {
  const [, tense, voice, mood, kase] = parse.split('')
  switch (pos) {
    case 'N': return THIRD.has(key(lemma)) ? 10 : kase === 'N' || kase === 'A' ? 6 : 7
    case 'RA': return 6
    case 'A': return 9
    case 'P': return 8
    case 'RI': return 10
    case 'RP': return lemma === 'αὐτός' ? 12 : 11
    case 'RD': return 13
    case 'RR': return 14
    case 'V': break
    default: return 4
  }
  let ch: number
  if (lemma === 'εἰμί' && mood === 'I') ch = tense === 'P' ? 8 : tense === 'F' ? 19 : 21
  else if (mood === 'P') ch = tense === 'A' || tense === 'F' ? 28 : tense === 'X' ? 30 : 27
  else if (mood === 'S') ch = 31
  else if (mood === 'N') ch = 32
  else if (mood === 'D') ch = 33
  else if (mood === 'O') ch = 36
  else if (tense === 'P') ch = voice === 'A' ? (isContract(lemma) ? 17 : 16) : 18
  else if (tense === 'F') ch = voice === 'P' ? 24 : 19
  else if (tense === 'I') ch = 21
  else if (tense === 'A') ch = voice === 'P' ? 24 : 23
  else ch = 25
  if (isMi(lemma)) ch = Math.max(ch, DIDOMI.test(lemma) ? 34 : 36)
  return ch
}

/** What each chapter number in grammarChapter stands for. */
export const GRAMMAR_TOPIC: Record<number, string> = {
  4: 'vocabulary only', 6: 'nominative and accusative; the article', 7: 'genitive and dative', 8: 'prepositions; εἰμί',
  9: 'adjectives', 10: 'third declension; τίς and τις', 11: 'personal pronouns', 12: 'αὐτός', 13: 'demonstratives',
  14: 'relative pronoun', 16: 'present active indicative', 17: 'contract verbs', 18: 'present middle/passive',
  19: 'future', 21: 'imperfect', 23: 'aorist active and middle', 24: 'aorist and future passive', 25: 'perfect',
  27: 'present participle', 28: 'aorist participle', 30: 'perfect participle', 31: 'subjunctive', 32: 'infinitive',
  33: 'imperative', 34: 'δίδωμι', 36: 'other μι verbs; optative',
}

export interface PassageStats {
  /** The latest chapter whose grammar the passage uses. */
  grammar: number
  /** Words (not names) in the passage. */
  words: number
  /** Of those, how many are course vocabulary up to the chapter being studied. */
  known: number
  /** Of all the words, how many are in forms taught by the chapter being studied. */
  forms: number
  /** All the words, names included. */
  total: number
  /** How readable now: the average of the share of words learned and of forms covered, 0 to 1. */
  readable: number
}

export function passageStats(reading: Reading, chapter: number): PassageStats {
  const all = reading.verses.flatMap((v) => v.words)
  const counted = all.filter((w) => !isName(w))
  const known = counted.filter((w) => (courseWord(w[1])?.chapter ?? Infinity) <= chapter).length
  const forms = all.filter((w) => grammarChapter(w) <= chapter).length
  return {
    grammar: Math.max(...all.map(grammarChapter)),
    words: counted.length,
    known,
    forms,
    total: all.length,
    readable: (known / counted.length + forms / all.length) / 2,
  }
}

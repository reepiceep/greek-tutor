export type Case = 'genitive' | 'dative' | 'accusative'

export interface CaseUse {
  case: Case
  gloss: string
  accept: string[]
}

export interface VocabWord {
  id: string
  lemma: string
  /** Full lexical form for nouns, e.g. "ἡμέρα, -ας, ἡ". */
  lexical?: string
  /** Elided / alternate spellings, e.g. ἀπ᾽, ἀφ᾽. */
  forms?: string[]
  pos: 'noun' | 'verb' | 'preposition' | 'conjunction' | 'adjective' | 'pronoun' | 'adverb'
  /** Chapter of Mounce's BBG where the word is introduced. */
  chapter?: number
  gloss: string
  accept: string[]
  cases?: CaseUse[]
  /** A memory hook, usually an English word built from it (ὑπό → hypodermic). */
  hook?: string
}

export interface ParadigmRow {
  key: string
  label: string
  /** All accepted spellings; the first is canonical. */
  forms: string[]
  display?: string
  gloss: string
}

export interface Paradigm {
  id: string
  title: string
  rows: ParadigmRow[]
}

/** A preposition phrase to translate, e.g. διὰ τὸν θάνατον. */
export interface PrepPhrase {
  id: string
  greek: string
  /** VocabWord id of the preposition. */
  prep: string
  case: Case
  number: 'sg' | 'pl'
  /** Meaning used in this phrase; must be one of the case use's `accept` glosses. */
  meaning: string
  /** English for the object, e.g. "the crowd". */
  object: string
  /** Meanings too close to the right answer to offer as wrong options (e.g. "beside" vs "alongside"). */
  avoid?: string[]
}

/** A real NT sentence with one preposition phrase to translate in context. */
export interface PrepSentence {
  id: string
  /** Verse reference, e.g. "John 1:1". */
  ref: string
  /** Greek text (SBLGNT), possibly an excerpt of the verse. */
  text: string
  /** The preposition phrase, exactly as it appears in `text`. */
  phrase: string
  prep: string
  case: Case
  meaning: string
  object: string
  /** Literal English with `{}` where the phrase's translation goes. */
  english: string
  /** Extra comment shown after answering. */
  note?: string
  avoid?: string[]
}

/** How a preposition's final letters change before the next word. */
export interface ElisionItem {
  id: string
  prep: string
  next: string
  nextGloss: string
  /** Correct option first; shuffled when shown. */
  options: string[]
  rule: string
}

export type Shape =
  | 'out' | 'away' | 'through' | 'toward' | 'alongside' | 'beside' | 'under'
  | 'in' | 'into' | 'on' | 'around' | 'above' | 'downFrom'

/** A preposition + case drawn as a spatial picture around a box. */
export interface SpatialUse {
  prep: string
  case: Case
  shape: Shape
  /** Short caption for the picture. */
  gloss: string
}

/** Which rule identifies the subject when εἰμί links two nominatives. */
export type SubjectRule = 'pronoun' | 'implied' | 'article' | 'proper'

/** A sentence with εἰμί and a predicate nominative. */
export interface PredicateItem {
  id: string
  /** Verse reference; absent for practice sentences written for this app. */
  ref?: string
  text: string
  /** Subject as it appears in `text`, or an English label like "you (in εἶ)" when it is only in the verb. */
  subject: string
  /** Predicate nominative as it appears in `text`. */
  predicate: string
  rule: SubjectRule
  /** Glosses for words not yet learned. */
  help?: string
  translation: string
  /** Wrong translations; the reversed subject/predicate reading first. */
  wrong: string[]
}

export type EncliticRule = 'proparoxytone' | 'properispomenon' | 'paroxytone' | 'oxytone' | 'perispomenon' | 'esti'

/** A word followed by an enclitic form of εἰμί, from a real verse. */
export interface EncliticItem {
  id: string
  ref: string
  text: string
  /** The word + enclitic exactly as in `text`. */
  pair: string
  /** Dictionary accents of the two words, shown in the prompt. */
  host: string
  enclitic: string
  rule: EncliticRule
  /** Accent variants of the pair; the correct one first. */
  options: string[]
}

// --- Adjectives (chapter 9) ---

export type NounCase = 'nominative' | 'genitive' | 'dative' | 'accusative'
export type Gender = 'masculine' | 'feminine' | 'neuter'
export type GrammaticalNumber = 'sg' | 'pl'

/** Forms in case order: nominative, genitive, dative, accusative. */
export type CaseForms = [string, string, string, string]

/** A declined word: an adjective, a noun (one gender) or a pronoun. */
export interface DeclensionParadigm {
  id: string
  lemma: string
  lexical: string
  gloss: string
  /**
   * 2-1-2: separate feminine forms; 2-2: the feminine uses the masculine forms;
   * 3-1-3: third-declension masculine/neuter with first-declension feminine (πᾶς).
   */
  pattern: '2-1-2' | '2-2' | '3-1-3' | 'noun' | 'pronoun'
  /** Only the genders and numbers the word has (a noun has one gender; εἷς is singular only). */
  forms: Partial<Record<Gender, Partial<Record<GrammaticalNumber, CaseForms>>>>
  /** Where the adjective goes in a sample phrase: after the article (ἀγαθός) or before it (πᾶς ὁ ὄχλος). */
  position?: 'attributive' | 'before-article'
}

/** Article + noun in a known case, number and gender, for agreement practice. */
export interface NounPhrase {
  greek: string
  case: NounCase
  number: GrammaticalNumber
  gender: Gender
  english: string
}

export type AdjectiveUse = 'attributive' | 'predicate' | 'substantival'

/** A phrase or verse with one adjective to classify. */
export interface AdjectiveUseItem {
  id: string
  ref?: string
  text: string
  /** The adjective exactly as it appears in `text` (first occurrence is highlighted). */
  adjective: string
  use: AdjectiveUse
  help?: string
  note?: string
  translation?: string
  /** Wrong translations; the translation question is only asked when these are given. */
  wrong?: string[]
}

export interface AdjectiveSection {
  paradigms: DeclensionParadigm[]
  nouns: NounPhrase[]
  uses: AdjectiveUseItem[]
}

// --- Third declension (chapter 10) ---

/** A multiple-choice item with its options written out (correct first) and the rule behind it. */
export interface RuleItem {
  id: string
  /** What the learner sees, e.g. "κ + σ" or "σάρξ, σαρκός, ἡ". */
  prompt: string
  /** Correct option first; shuffled when shown. */
  options: string[]
  rule: string
  gloss?: string
}

/** A verse with τίς (who? what?) or τις (someone, anyone) to identify. */
export interface TisItem {
  id: string
  ref: string
  text: string
  /** The τις/τίς form exactly as in `text`. */
  word: string
  kind: 'interrogative' | 'indefinite'
  translation: string
  help?: string
  note?: string
}

export interface ThirdDeclensionSection {
  /** Words to chart and parse. */
  paradigms: DeclensionParadigm[]
  /** Adjective practised for agreement, and the noun phrases it agrees with. */
  agreement: { paradigm: DeclensionParadigm; nouns: NounPhrase[] }
  /** Square of Stops: stop + σ, and stem + ending → form. */
  stops: RuleItem[]
  /** Finding the stem from the lexical form. */
  stems: RuleItem[]
  tis: TisItem[]
}

// --- Personal pronouns (chapter 11) ---

export type Person = 1 | 2

export interface PronounForm {
  form: string
  person: Person
  number: GrammaticalNumber
  case: NounCase
  /** Singular oblique forms come in pairs: emphatic (ἐμοῦ) and unemphatic enclitic (μου). */
  emphatic?: boolean
  english: string
}

/** A verse with one personal pronoun highlighted. */
export interface PronounVerse {
  id: string
  ref: string
  text: string
  /** The pronoun exactly as in `text` (first occurrence is highlighted). */
  word: string
  person: Person
  number: GrammaticalNumber
  case: NounCase
  translation: string
  help?: string
  note?: string
}

export interface PronounSection {
  forms: PronounForm[]
  verses: PronounVerse[]
  /** New third-declension nouns in the chapter's vocabulary. */
  nouns: DeclensionParadigm[]
}

// --- αὐτός (chapter 12) ---

export type AutosUse = 'pronoun' | 'intensive' | 'identical'

/** A phrase or verse with one highlighted word to classify by use and translate. */
export interface UseItem<U extends string> {
  id: string
  ref?: string
  text: string
  /** The word exactly as in `text` (first occurrence is highlighted). */
  word: string
  use: U
  /** How the highlighted form is translated here, e.g. "him", "himself", "the same". */
  english: string
  /** Wrong renderings of the highlighted form. */
  wrong: string[]
  translation: string
  help?: string
  note?: string
}

export type AutosItem = UseItem<AutosUse>

export interface AutosSection {
  paradigm: DeclensionParadigm
  items: AutosItem[]
  /** New third-declension nouns in the chapter's vocabulary. */
  nouns: DeclensionParadigm[]
}

// --- Demonstratives (chapter 13) ---

export type DemonstrativeUse = 'pronoun' | 'adjective'
export type DemonstrativeItem = UseItem<DemonstrativeUse>

export interface DemonstrativeSection {
  /** Words to chart and parse (demonstratives plus the chapter's irregular adjectives and new nouns). */
  paradigms: DeclensionParadigm[]
  /** Demonstratives practised for agreement, and the noun phrases they agree with. */
  agreement: { paradigms: DeclensionParadigm[]; nouns: NounPhrase[] }
  items: DemonstrativeItem[]
}

// --- Relative pronoun (chapter 14) ---

/** Why a relative pronoun is in its case: its job in its own clause (never its antecedent's case). */
export type RelativeReason = 'subject' | 'object' | 'preposition' | 'possession' | 'indirect'

/** A relative clause with the relative pronoun highlighted. */
export interface RelativeItem {
  id: string
  ref?: string
  text: string
  /** The relative pronoun exactly as in `text`. */
  word: string
  /** The antecedent exactly as in `text`. */
  antecedent: string
  /** Other words in `text` offered as wrong antecedents. */
  others: string[]
  gender: Gender
  number: GrammaticalNumber
  case: NounCase
  reason: RelativeReason
  /** How the relative is translated here: who, whom, which, whose, to whom. */
  english: string
  wrong: string[]
  translation: string
  help?: string
  note?: string
}

/** A short form that could be the article, the relative pronoun, or something else (ἤ, οὐ). */
export interface RelativeFormItem {
  form: string
  kind: 'article' | 'relative' | 'other'
  note: string
}

export interface RelativeSection {
  paradigm: DeclensionParadigm
  nouns: DeclensionParadigm[]
  items: RelativeItem[]
  forms: RelativeFormItem[]
}

// --- Introduction to verbs (chapter 15) ---

export interface TermItem {
  term: string
  definition: string
  example?: string
}

export type VerbProperty = 'personNumber' | 'time' | 'aspect' | 'voice' | 'mood'

/** An English sentence to analyse. Only properties that are clear from the sentence are given (and asked). */
export interface EnglishVerbItem {
  id: string
  sentence: string
  /** The verb phrase to analyse, as it appears in the sentence. */
  verb: string
  personNumber?: '1 sg' | '2 sg' | '3 sg' | '1 pl' | '2 pl' | '3 pl' | '2nd person'
  time?: 'past' | 'present' | 'future'
  aspect?: 'continuous' | 'undefined' | 'perfective'
  voice?: 'active' | 'passive'
  mood?: 'indicative' | 'subjunctive' | 'imperative'
}

/** A Greek verb split into stem + connecting vowel + personal ending (preview of chapter 16). */
export interface VerbPartsItem {
  form: string
  stem: string
  vowel: string
  ending: string
  /** What the ending tells you, e.g. "we". */
  subject: string
  meaning: string
}

export interface VerbIntroSection {
  terms: TermItem[]
  english: EnglishVerbItem[]
  parts: VerbPartsItem[]
}

// --- Genitive and dative (chapter 7) ---

/** What a noun is doing in its clause; the case follows from it (subject → nominative, "of" → genitive). */
export type CaseFunction = 'subject' | 'object' | 'possession' | 'indirect' | 'place' | 'means'

/** A first or second declension noun with English for its phrases ("the lord" / "the lords"). */
export interface CaseNoun {
  paradigm: DeclensionParadigm
  /** English singular and plural, without the article. A noun with no plural (Ἰησοῦς) has one entry. */
  english: [string, string?]
}

export interface CasesSection {
  nouns: CaseNoun[]
  /** Verse words to classify by case and function, and translate. */
  uses: UseItem<CaseFunction>[]
}

// --- Present active indicative (chapter 16) ---

export type PersonSlot = '1s' | '2s' | '3s' | '1p' | '2p' | '3p'

/** The vowel a contract verb's stem ends in (chapter 17): ἀγαπάω, ποιέω, πληρόω. */
export type ContractVowel = 'α' | 'ε' | 'ο'

/** A regular verb whose present forms are built as stem + ω, εις, ει, ομεν, ετε, ουσι(ν). */
export interface PresentVerb {
  id: string
  lemma: string
  /**
   * The stem with its accent, as it appears in every present form (ἀκού-). For a contract verb, the stem
   * without its contract vowel and unaccented (ποι-), since the accent falls on the contracted ending.
   */
  stem: string
  contract?: ContractVowel
  /**
   * Chapter 18: the verb is drilled in the present middle/passive. 'passive' is an active verb in the passive,
   * translated with `pp` ("I am loosed"); 'middle' is a middle-only verb (ἔρχομαι), translated actively ("I come").
   * Absent for the present active.
   */
  voice?: 'passive' | 'middle'
  /** English past participle for the passive ("loosed"). */
  pp?: string
  /** δύναμαι: the endings μαι, σαι, ται... go straight onto the stem, with no connecting vowel. */
  athematic?: boolean
  /** Chapter 19: the verb is drilled in the future, and `stem` is the future stem with its σ (λύσ, βλέψ, ἀγαπήσ). */
  tense?: 'future'
  /** The stem the future's σ is added to (λυ, βλεπ, ἀγαπα). Absent when there is no σ to add (ἔσομαι). */
  from?: string
  /** The present stem, for telling present from future (λύει, λύσει). Absent when the present is irregular (ζάω, εἰμί). */
  present?: { stem: string; contract?: ContractVowel; voice?: 'middle' }
  /**
   * Chapter 20: a liquid future. The stem (μεν) takes εσ; the σ drops out and the ε contracts with the ending, so it is
   * conjugated like a present ε-contract verb and has `contract: 'ε'` (μενῶ, μενεῖς).
   */
  liquid?: boolean
  /** How the future stem departs from the present, for stems that change (ὁράω → ὄψομαι). */
  change?: string
  /** How the lexical form is glossed when it isn't "I " + `en` (εἰμί: "I am"). */
  lexicalGloss?: string
  /** Forms that break the pattern, e.g. ἔσται (not ἔσεται). */
  irregular?: Partial<Record<PersonSlot, string>>
  /** English: base form and 3rd singular ("hear", "hears"); for a passive verb, its active meaning. */
  en: string
  en3: string
}

/** A present (or, in chapter 19, future) indicative verb in a verse. */
export interface PresentVerse {
  id: string
  ref: string
  text: string
  word: string
  slot: PersonSlot
  /** PresentVerb id. */
  verb: string
  translation: string
  help?: string
  note?: string
}

/** A verb and its verbal root, e.g. ἀποστέλλω, *στελ (chapter 20). */
export interface RootItem {
  lemma: string
  /** The root first, then wrong options; shown with an asterisk. */
  options: string[]
  how: string
  /** Asked instead of "What is its root?", e.g. for the root of an irregular future. */
  ask?: string
}

export interface PresentSection {
  /** The first is the model verb (λύω); every verb's chart is built from its stem. */
  verbs: PresentVerb[]
  verses: PresentVerse[]
  roots?: RootItem[]
}

/** Chapter-specific practice screens; each chapter lists the ones it has. */
export type TopicView =
  | 'paradigm' | 'prepositions' | 'adjectives' | 'declension' | 'pronouns' | 'autos' | 'demonstratives' | 'relative' | 'verbs' | 'present' | 'contract' | 'middle' | 'future' | 'roots' | 'cases'

export interface Chapter {
  number: number
  title: string
  /** Short label for the course map, e.g. "Pronouns". */
  short: string
  vocab: VocabWord[]
  paradigms: Paradigm[]
  topics?: TopicView[]
  adjectives?: AdjectiveSection
  thirdDeclension?: ThirdDeclensionSection
  pronouns?: PronounSection
  autos?: AutosSection
  demonstratives?: DemonstrativeSection
  relative?: RelativeSection
  verbIntro?: VerbIntroSection
  present?: PresentSection
  cases?: CasesSection
  phrases?: PrepPhrase[]
  elisions?: ElisionItem[]
  spatial?: SpatialUse[]
  sentences?: PrepSentence[]
  predicates?: PredicateItem[]
  enclitics?: EncliticItem[]
}

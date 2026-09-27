import { PAS_NOUNS } from './chapter10'
import type { Chapter, DeclensionParadigm, DemonstrativeItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 13: Demonstrative Pronouns/Adjectives.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and practice phrases are written for this app.

const HOUTOS: DeclensionParadigm = {
  id: 'houtos', lemma: 'οὗτος', lexical: 'οὗτος, αὕτη, τοῦτο', gloss: 'this; these', pattern: '2-1-2', position: 'before-article',
  forms: {
    masculine: { sg: ['οὗτος', 'τούτου', 'τούτῳ', 'τοῦτον'], pl: ['οὗτοι', 'τούτων', 'τούτοις', 'τούτους'] },
    feminine: { sg: ['αὕτη', 'ταύτης', 'ταύτῃ', 'ταύτην'], pl: ['αὗται', 'τούτων', 'ταύταις', 'ταύτας'] },
    neuter: { sg: ['τοῦτο', 'τούτου', 'τούτῳ', 'τοῦτο'], pl: ['ταῦτα', 'τούτων', 'τούτοις', 'ταῦτα'] },
  },
}

const EKEINOS: DeclensionParadigm = {
  id: 'ekeinos', lemma: 'ἐκεῖνος', lexical: 'ἐκεῖνος, -η, -ο', gloss: 'that; those', pattern: '2-1-2', position: 'before-article',
  forms: {
    masculine: { sg: ['ἐκεῖνος', 'ἐκείνου', 'ἐκείνῳ', 'ἐκεῖνον'], pl: ['ἐκεῖνοι', 'ἐκείνων', 'ἐκείνοις', 'ἐκείνους'] },
    feminine: { sg: ['ἐκείνη', 'ἐκείνης', 'ἐκείνῃ', 'ἐκείνην'], pl: ['ἐκεῖναι', 'ἐκείνων', 'ἐκείναις', 'ἐκείνας'] },
    neuter: { sg: ['ἐκεῖνο', 'ἐκείνου', 'ἐκείνῳ', 'ἐκεῖνο'], pl: ['ἐκεῖνα', 'ἐκείνων', 'ἐκείνοις', 'ἐκεῖνα'] },
  },
}

const MEGAS: DeclensionParadigm = {
  id: 'megas', lemma: 'μέγας', lexical: 'μέγας, μεγάλη, μέγα', gloss: 'large, great', pattern: '2-1-2',
  forms: {
    masculine: { sg: ['μέγας', 'μεγάλου', 'μεγάλῳ', 'μέγαν'], pl: ['μεγάλοι', 'μεγάλων', 'μεγάλοις', 'μεγάλους'] },
    feminine: { sg: ['μεγάλη', 'μεγάλης', 'μεγάλῃ', 'μεγάλην'], pl: ['μεγάλαι', 'μεγάλων', 'μεγάλαις', 'μεγάλας'] },
    neuter: { sg: ['μέγα', 'μεγάλου', 'μεγάλῳ', 'μέγα'], pl: ['μεγάλα', 'μεγάλων', 'μεγάλοις', 'μεγάλα'] },
  },
}

const POLYS: DeclensionParadigm = {
  id: 'polys', lemma: 'πολύς', lexical: 'πολύς, πολλή, πολύ', gloss: 'much; plural: many', pattern: '2-1-2',
  forms: {
    masculine: { sg: ['πολύς', 'πολλοῦ', 'πολλῷ', 'πολύν'], pl: ['πολλοί', 'πολλῶν', 'πολλοῖς', 'πολλούς'] },
    feminine: { sg: ['πολλή', 'πολλῆς', 'πολλῇ', 'πολλήν'], pl: ['πολλαί', 'πολλῶν', 'πολλαῖς', 'πολλάς'] },
    neuter: { sg: ['πολύ', 'πολλοῦ', 'πολλῷ', 'πολύ'], pl: ['πολλά', 'πολλῶν', 'πολλοῖς', 'πολλά'] },
  },
}

const GYNE: DeclensionParadigm = {
  id: 'gyne', lemma: 'γυνή', lexical: 'γυνή, γυναικός, ἡ', gloss: 'woman, wife', pattern: 'noun',
  forms: { feminine: { sg: ['γυνή', 'γυναικός', 'γυναικί', 'γυναῖκα'], pl: ['γυναῖκες', 'γυναικῶν', 'γυναιξί(ν)', 'γυναῖκας'] } },
}

const POLIS: DeclensionParadigm = {
  id: 'polis', lemma: 'πόλις', lexical: 'πόλις, -εως, ἡ', gloss: 'city', pattern: 'noun',
  forms: { feminine: { sg: ['πόλις', 'πόλεως', 'πόλει', 'πόλιν'], pl: ['πόλεις', 'πόλεων', 'πόλεσι(ν)', 'πόλεις'] } },
}

const ITEMS: DemonstrativeItem[] = [
  // Pronoun: stands on its own
  {
    id: 'matt-3-17', ref: 'Matt 3:17', text: 'Οὗτός ἐστιν ὁ υἱός μου ὁ ἀγαπητός,', word: 'Οὗτός', use: 'pronoun',
    english: 'this', wrong: ['that', 'these', 'this son'], translation: 'This is my beloved Son,',
    note: 'οὗτος has no noun of its own here; ὁ υἱός is the predicate nominative after ἐστιν.',
  },
  {
    id: 'john-1-2', ref: 'John 1:2', text: 'οὗτος ἦν ἐν ἀρχῇ πρὸς τὸν θεόν.', word: 'οὗτος', use: 'pronoun',
    english: 'he', wrong: ['that', 'these', 'the same'], translation: 'He was in the beginning with God.',
    note: 'As a pronoun οὗτος often means simply “he” (literally “this one”).',
  },
  {
    id: 'john-1-7', ref: 'John 1:7', text: 'οὗτος ἦλθεν εἰς μαρτυρίαν,', word: 'οὗτος', use: 'pronoun',
    english: 'he', wrong: ['that', 'these', 'the same'], translation: 'He came as a witness,', help: 'ἦλθεν = came · μαρτυρία = testimony',
  },
  {
    id: 'john-3-19', ref: 'John 3:19', text: 'αὕτη δέ ἐστιν ἡ κρίσις', word: 'αὕτη', use: 'pronoun',
    english: 'this', wrong: ['she', 'that', 'these'], translation: 'And this is the judgment', help: 'κρίσις = judgment',
    note: 'αὕτη is feminine to agree with ἡ κρίσις, but English just says “this.”',
  },
  {
    id: 'john-15-12', ref: 'John 15:12', text: 'Αὕτη ἐστὶν ἡ ἐντολὴ ἡ ἐμὴ', word: 'Αὕτη', use: 'pronoun',
    english: 'this', wrong: ['she', 'that', 'the same'], translation: 'This is my commandment',
  },
  {
    id: '1john-5-11a', ref: '1 John 5:11', text: 'καὶ αὕτη ἐστὶν ἡ μαρτυρία,', word: 'αὕτη', use: 'pronoun',
    english: 'this', wrong: ['she', 'that', 'this testimony'], translation: 'And this is the testimony,', help: 'μαρτυρία = testimony',
    note: 'Compare later in the same verse: αὕτη ἡ ζωή, where αὕτη goes with a noun.',
  },
  {
    id: 'john-20-31', ref: 'John 20:31', text: 'ταῦτα δὲ γέγραπται', word: 'ταῦτα', use: 'pronoun',
    english: 'these things', wrong: ['this', 'those things', 'the same things'], translation: 'But these things have been written',
    help: 'γέγραπται = have been written', note: 'A neuter plural demonstrative on its own means “these things.”',
  },
  {
    id: 'john-14-25', ref: 'John 14:25', text: 'Ταῦτα λελάληκα ὑμῖν', word: 'Ταῦτα', use: 'pronoun',
    english: 'these things', wrong: ['this', 'those things', 'the same things'], translation: 'I have spoken these things to you',
    help: 'λελάληκα = I have spoken',
  },
  {
    id: 'john-6-58a', ref: 'John 6:58', text: 'οὗτός ἐστιν ὁ ἄρτος ὁ ἐξ οὐρανοῦ καταβάς,', word: 'οὗτός', use: 'pronoun',
    english: 'this', wrong: ['that', 'these', 'this bread'], translation: 'This is the bread that came down from heaven,',
    help: 'ἄρτος = bread · καταβάς = having come down',
  },
  {
    id: 'john-1-8', ref: 'John 1:8', text: 'οὐκ ἦν ἐκεῖνος τὸ φῶς,', word: 'ἐκεῖνος', use: 'pronoun',
    english: 'he', wrong: ['this', 'the same', 'that light'], translation: 'He was not the light,',
    note: 'τὸ φῶς is neuter and ἐκεῖνος masculine, so they don’t go together: ἐκεῖνος is the subject, τὸ φῶς the predicate.',
  },
  {
    id: 'john-3-30', ref: 'John 3:30', text: 'ἐκεῖνον δεῖ αὐξάνειν,', word: 'ἐκεῖνον', use: 'pronoun',
    english: 'that one (he)', wrong: ['this one', 'the same', 'those'], translation: 'He must increase,',
    help: 'δεῖ = it is necessary · αὐξάνειν = to increase', note: 'Literally “it is necessary for that one to increase.”',
  },
  {
    id: 'john-9-25', ref: 'John 9:25', text: 'ἀπεκρίθη οὖν ἐκεῖνος·', word: 'ἐκεῖνος', use: 'pronoun',
    english: 'that man', wrong: ['this man', 'the same man', 'those'], translation: 'So that man answered,',
  },
  {
    id: 'practice-1', text: 'ταῦτα λέγω', word: 'ταῦτα', use: 'pronoun',
    english: 'these things', wrong: ['this', 'those things', 'the same things'], translation: 'I say these things',
  },
  // Adjective: goes with a noun that has the article
  {
    id: 'mark-1-9', ref: 'Mark 1:9', text: 'Καὶ ἐγένετο ἐν ἐκείναις ταῖς ἡμέραις', word: 'ἐκείναις', use: 'adjective',
    english: 'those', wrong: ['these', 'that', 'the same'], translation: 'And it happened in those days',
  },
  {
    id: 'matt-3-1', ref: 'Matt 3:1', text: 'Ἐν δὲ ταῖς ἡμέραις ἐκείναις', word: 'ἐκείναις', use: 'adjective',
    english: 'those', wrong: ['these', 'that', 'the same'], translation: 'In those days',
    note: 'Same meaning as Mark 1:9’s ἐν ἐκείναις ταῖς ἡμέραις: before or after the noun, the demonstrative stands outside the article.',
  },
  {
    id: 'john-21-23a', ref: 'John 21:23', text: 'ἐξῆλθεν οὖν οὗτος ὁ λόγος εἰς τοὺς ἀδελφοὺς', word: 'οὗτος', use: 'adjective',
    english: 'this', wrong: ['this is', 'that', 'these'], translation: 'So this saying went out to the brothers', help: 'ἐξῆλθεν = went out',
    note: 'οὗτος stands outside the article (predicate position), yet it means “this saying,” not “the saying is this.”',
  },
  {
    id: 'john-21-23b', ref: 'John 21:23', text: 'ὅτι ὁ μαθητὴς ἐκεῖνος οὐκ ἀποθνῄσκει.', word: 'ἐκεῖνος', use: 'adjective',
    english: 'that', wrong: ['this', 'the same', 'he'], translation: 'that that disciple would not die.', help: 'ἀποθνῄσκει = dies',
  },
  {
    id: 'matt-7-24', ref: 'Matt 7:24', text: 'ἀκούει μου τοὺς λόγους τούτους', word: 'τούτους', use: 'adjective',
    english: 'these', wrong: ['those', 'this', 'the same'], translation: 'hears these words of mine', help: 'ἀκούει = hears',
  },
  {
    id: 'matt-24-36', ref: 'Matt 24:36', text: 'Περὶ δὲ τῆς ἡμέρας ἐκείνης', word: 'ἐκείνης', use: 'adjective',
    english: 'that', wrong: ['this', 'those', 'the same'], translation: 'But concerning that day',
  },
  {
    id: 'john-6-58b', ref: 'John 6:58', text: 'ὁ τρώγων τοῦτον τὸν ἄρτον ζήσει εἰς τὸν αἰῶνα.', word: 'τοῦτον', use: 'adjective',
    english: 'this', wrong: ['that', 'these', 'this is'], translation: 'The one who eats this bread will live forever.',
    help: 'τρώγων = eating · ἄρτος = bread · ζήσει = will live',
  },
  {
    id: '1john-5-11b', ref: '1 John 5:11', text: 'καὶ αὕτη ἡ ζωὴ ἐν τῷ υἱῷ αὐτοῦ ἐστιν.', word: 'αὕτη', use: 'adjective',
    english: 'this', wrong: ['she', 'that', 'this is'], translation: 'and this life is in his Son.',
    note: 'Here αὕτη goes with ἡ ζωή (same case, number and gender): “this life.” Compare αὕτη ἐστὶν ἡ μαρτυρία earlier in the verse.',
  },
  {
    id: 'practice-2', text: 'οὗτος ὁ ἀπόστολος', word: 'οὗτος', use: 'adjective',
    english: 'this', wrong: ['this is', 'that', 'the same'], translation: 'this apostle',
  },
  {
    id: 'practice-3', text: 'ὁ ἀπόστολος οὗτος', word: 'οὗτος', use: 'adjective',
    english: 'this', wrong: ['this is', 'that', 'the same'], translation: 'this apostle',
  },
]

export const chapter13: Chapter = {
  number: 13,
  title: 'Demonstrative Pronouns/Adjectives',
  short: 'Demonstratives',
  topics: ['demonstratives'],
  vocab: [
    { id: 'gyne', lemma: 'γυνή', lexical: 'γυνή, γυναικός, ἡ', pos: 'noun', gloss: 'woman, wife', hook: 'Gynecology: medicine for women.', accept: ['woman', 'wife'] },
    { id: 'dikaiosyne', lemma: 'δικαιοσύνη', lexical: 'δικαιοσύνη, -ης, ἡ', pos: 'noun', gloss: 'righteousness', hook: 'Same root as δίκη, “justice”: theodicy, defending God’s justice.', accept: ['righteousness', 'justice'] },
    { id: 'dodeka', lemma: 'δώδεκα', lexical: 'δώδεκα (indeclinable)', pos: 'adjective', gloss: 'twelve', hook: 'Dodecagon: a twelve-sided figure.', accept: ['twelve', '12'] },
    { id: 'heautou', lemma: 'ἑαυτοῦ', lexical: 'ἑαυτοῦ, -ῆς, -οῦ', pos: 'pronoun', gloss: 'singular: himself, herself, itself; plural: themselves', hook: 'Built on αὐτός, “self”: auto- (automatic, autograph).', accept: ['himself', 'herself', 'itself', 'themselves'] },
    { id: 'ekeinos', lemma: 'ἐκεῖνος', lexical: 'ἐκεῖνος, -η, -ο', pos: 'pronoun', gloss: 'singular: that (man/woman/thing); plural: those', accept: ['that', 'those', 'that one'] },
    { id: 'e', lemma: 'ἤ', pos: 'conjunction', gloss: 'or, than', accept: ['or', 'than'] },
    { id: 'kago', lemma: 'κἀγώ', pos: 'pronoun', gloss: 'and I, but I (καί + ἐγώ)', hook: 'καί + ἐγώ: “and I” (ego).', accept: ['and i', 'but i', 'i also', 'and i too'] },
    { id: 'makarios', lemma: 'μακάριος', lexical: 'μακάριος, -ία, -ιον', pos: 'adjective', gloss: 'blessed, happy', hook: 'Macarism: a “blessed are…” saying.', accept: ['blessed', 'happy'] },
    { id: 'megas', lemma: 'μέγας', lexical: 'μέγας, μεγάλη, μέγα', pos: 'adjective', gloss: 'large, great', hook: 'Megaphone, megalith: great, large.', accept: ['large', 'great', 'big'] },
    { id: 'polis', lemma: 'πόλις', lexical: 'πόλις, -εως, ἡ', pos: 'noun', gloss: 'city', hook: 'Politics, metropolis, police.', accept: ['city', 'town'] },
    { id: 'polys', lemma: 'πολύς', lexical: 'πολύς, πολλή, πολύ', pos: 'adjective', gloss: 'singular: much; plural: many; adverb: often', hook: 'Polygon, polytheism: many.', accept: ['much', 'many', 'often'] },
    { id: 'pos', lemma: 'πῶς', pos: 'adverb', gloss: 'how?', accept: ['how'] },
    { id: 'semeion', lemma: 'σημεῖον', lexical: 'σημεῖον, -ου, τό', pos: 'noun', gloss: 'sign, miracle', hook: 'Semaphore: “sign-bearer”; semiotics: the study of signs.', accept: ['sign', 'miracle'] },
  ],
  paradigms: [],
  demonstratives: {
    paradigms: [HOUTOS, EKEINOS, MEGAS, POLYS, GYNE, POLIS],
    agreement: { paradigms: [HOUTOS, EKEINOS], nouns: PAS_NOUNS },
    items: ITEMS,
  },
}

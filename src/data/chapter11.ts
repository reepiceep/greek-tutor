import { preposition } from './prepositions'
import type { Chapter, DeclensionParadigm, PronounForm, PronounVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 11: First and Second Person Personal Pronouns.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

const FORMS: PronounForm[] = [
  { form: 'ἐγώ', person: 1, number: 'sg', case: 'nominative', english: 'I' },
  { form: 'ἐμοῦ', person: 1, number: 'sg', case: 'genitive', emphatic: true, english: 'my, of me' },
  { form: 'μου', person: 1, number: 'sg', case: 'genitive', emphatic: false, english: 'my, of me' },
  { form: 'ἐμοί', person: 1, number: 'sg', case: 'dative', emphatic: true, english: 'to me' },
  { form: 'μοι', person: 1, number: 'sg', case: 'dative', emphatic: false, english: 'to me' },
  { form: 'ἐμέ', person: 1, number: 'sg', case: 'accusative', emphatic: true, english: 'me' },
  { form: 'με', person: 1, number: 'sg', case: 'accusative', emphatic: false, english: 'me' },
  { form: 'ἡμεῖς', person: 1, number: 'pl', case: 'nominative', english: 'we' },
  { form: 'ἡμῶν', person: 1, number: 'pl', case: 'genitive', english: 'our, of us' },
  { form: 'ἡμῖν', person: 1, number: 'pl', case: 'dative', english: 'to us' },
  { form: 'ἡμᾶς', person: 1, number: 'pl', case: 'accusative', english: 'us' },
  { form: 'σύ', person: 2, number: 'sg', case: 'nominative', english: 'you (sg)' },
  { form: 'σοῦ', person: 2, number: 'sg', case: 'genitive', emphatic: true, english: 'your (sg), of you' },
  { form: 'σου', person: 2, number: 'sg', case: 'genitive', emphatic: false, english: 'your (sg), of you' },
  { form: 'σοί', person: 2, number: 'sg', case: 'dative', emphatic: true, english: 'to you (sg)' },
  { form: 'σοι', person: 2, number: 'sg', case: 'dative', emphatic: false, english: 'to you (sg)' },
  { form: 'σέ', person: 2, number: 'sg', case: 'accusative', emphatic: true, english: 'you (sg, object)' },
  { form: 'σε', person: 2, number: 'sg', case: 'accusative', emphatic: false, english: 'you (sg, object)' },
  { form: 'ὑμεῖς', person: 2, number: 'pl', case: 'nominative', english: 'you (pl)' },
  { form: 'ὑμῶν', person: 2, number: 'pl', case: 'genitive', english: 'your (pl), of you' },
  { form: 'ὑμῖν', person: 2, number: 'pl', case: 'dative', english: 'to you (pl)' },
  { form: 'ὑμᾶς', person: 2, number: 'pl', case: 'accusative', english: 'you (pl, object)' },
]

const VERSES: PronounVerse[] = [
  {
    id: 'matt-5-22a', ref: 'Matt 5:22', text: 'ἐγὼ δὲ λέγω ὑμῖν', word: 'ἐγὼ', person: 1, number: 'sg', case: 'nominative',
    translation: 'But I say to you', note: 'λέγω already means “I say,” so ἐγώ adds emphasis and contrast: “But I say to you.”',
  },
  { id: 'matt-5-22b', ref: 'Matt 5:22', text: 'ἐγὼ δὲ λέγω ὑμῖν', word: 'ὑμῖν', person: 2, number: 'pl', case: 'dative', translation: 'But I say to you' },
  {
    id: 'matt-6-9a', ref: 'Matt 6:9', text: 'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς·', word: 'ἡμῶν', person: 1, number: 'pl', case: 'genitive',
    translation: 'Our Father, who is in heaven', note: 'Πάτερ is the vocative (the form for addressing someone) of πατήρ.',
  },
  {
    id: 'matt-6-9b', ref: 'Matt 6:9', text: 'ἁγιασθήτω τὸ ὄνομά σου,', word: 'σου', person: 2, number: 'sg', case: 'genitive',
    translation: 'let your name be treated as holy', help: 'ἁγιασθήτω = let it be treated as holy',
    note: 'σου is enclitic, which is why ὄνομά has a second accent.',
  },
  {
    id: 'matt-6-11', ref: 'Matt 6:11', text: 'τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον·', word: 'ἡμῖν', person: 1, number: 'pl', case: 'dative',
    translation: 'Give us today our daily bread', help: 'ἄρτος = bread · ἐπιούσιος = daily · δός = give · σήμερον = today',
  },
  {
    id: 'matt-1-23', ref: 'Matt 1:23', text: 'Μεθʼ ἡμῶν ὁ θεός.', word: 'ἡμῶν', person: 1, number: 'pl', case: 'genitive',
    translation: 'God with us', note: 'μετά + genitive = “with”; before the rough breathing of ἡμῶν it becomes μεθʼ.',
  },
  {
    id: 'john-14-6', ref: 'John 14:6', text: 'οὐδεὶς ἔρχεται πρὸς τὸν πατέρα εἰ μὴ διʼ ἐμοῦ.', word: 'ἐμοῦ', person: 1, number: 'sg', case: 'genitive',
    translation: 'No one comes to the Father except through me', help: 'ἔρχεται = comes',
    note: 'After a preposition the emphatic form (ἐμοῦ, not μου) is normal.',
  },
  {
    id: 'john-14-1', ref: 'John 14:1', text: 'καὶ εἰς ἐμὲ πιστεύετε.', word: 'ἐμὲ', person: 1, number: 'sg', case: 'accusative',
    translation: 'believe also in me', help: 'πιστεύετε = believe',
  },
  {
    id: 'john-15-16a', ref: 'John 15:16', text: 'οὐχ ὑμεῖς με ἐξελέξασθε,', word: 'ὑμεῖς', person: 2, number: 'pl', case: 'nominative',
    translation: 'You did not choose me', help: 'ἐξελέξασθε = you chose',
    note: 'The verb already says “you chose”; ὑμεῖς is there for contrast with ἐγώ in the next clause.',
  },
  {
    id: 'john-15-16b', ref: 'John 15:16', text: 'οὐχ ὑμεῖς με ἐξελέξασθε,', word: 'με', person: 1, number: 'sg', case: 'accusative',
    translation: 'You did not choose me', help: 'ἐξελέξασθε = you chose',
  },
  {
    id: 'john-15-16c', ref: 'John 15:16', text: 'ἀλλʼ ἐγὼ ἐξελεξάμην ὑμᾶς,', word: 'ὑμᾶς', person: 2, number: 'pl', case: 'accusative',
    translation: 'but I chose you', help: 'ἐξελεξάμην = I chose',
  },
  {
    id: 'matt-16-15', ref: 'Matt 16:15', text: 'Ὑμεῖς δὲ τίνα με λέγετε εἶναι;', word: 'Ὑμεῖς', person: 2, number: 'pl', case: 'nominative',
    translation: 'But who do you say that I am?', help: 'λέγετε = you say · εἶναι = to be',
    note: 'Emphatic: “But you — who do you say I am?”',
  },
  {
    id: 'rom-8-31', ref: 'Rom 8:31', text: 'εἰ ὁ θεὸς ὑπὲρ ἡμῶν,', word: 'ἡμῶν', person: 1, number: 'pl', case: 'genitive',
    translation: 'If God is for us', note: 'ὑπέρ + genitive = “in behalf of, for.”',
  },
  {
    id: 'luke-23-43', ref: 'Luke 23:43', text: 'Ἀμήν σοι λέγω σήμερον μετʼ ἐμοῦ ἔσῃ', word: 'σοι', person: 2, number: 'sg', case: 'dative',
    translation: 'Truly I say to you, today you will be with me', help: 'σήμερον = today · ἔσῃ = you will be',
  },
  {
    id: '1john-4-19a', ref: '1 John 4:19', text: 'ἡμεῖς ἀγαπῶμεν, ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς.', word: 'ἡμεῖς', person: 1, number: 'pl', case: 'nominative',
    translation: 'We love, because he first loved us', help: 'ἀγαπῶμεν = we love · ἠγάπησεν = he loved',
  },
  {
    id: '1john-4-19b', ref: '1 John 4:19', text: 'ἡμεῖς ἀγαπῶμεν, ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς.', word: 'ἡμᾶς', person: 1, number: 'pl', case: 'accusative',
    translation: 'We love, because he first loved us', help: 'ἀγαπῶμεν = we love · ἠγάπησεν = he loved',
  },
  {
    id: 'mark-1-11', ref: 'Mark 1:11', text: 'Σὺ εἶ ὁ υἱός μου ὁ ἀγαπητός, ἐν σοὶ εὐδόκησα.', word: 'σοὶ', person: 2, number: 'sg', case: 'dative',
    translation: 'You are my beloved Son; in you I am well pleased', help: 'εὐδόκησα = I am well pleased',
  },
  {
    id: 'matt-11-28', ref: 'Matt 11:28', text: 'Δεῦτε πρός με πάντες', word: 'με', person: 1, number: 'sg', case: 'accusative',
    translation: 'Come to me, all', help: 'δεῦτε = come!', note: 'με is enclitic, which is why πρός keeps its acute here.',
  },
  {
    id: 'luke-1-38', ref: 'Luke 1:38', text: 'γένοιτό μοι κατὰ τὸ ῥῆμά σου.', word: 'μοι', person: 1, number: 'sg', case: 'dative',
    translation: 'May it happen to me according to your word', help: 'γένοιτο = may it happen · ῥῆμα = word',
  },
  {
    id: 'john-13-34', ref: 'John 13:34', text: 'καθὼς ἠγάπησα ὑμᾶς', word: 'ὑμᾶς', person: 2, number: 'pl', case: 'accusative',
    translation: 'just as I loved you', help: 'ἠγάπησα = I loved',
  },
  {
    id: 'matt-26-26', ref: 'Matt 26:26', text: 'τοῦτό ἐστιν τὸ σῶμά μου.', word: 'μου', person: 1, number: 'sg', case: 'genitive',
    translation: 'This is my body', help: 'τοῦτο = this',
  },
  {
    id: 'john-14-27', ref: 'John 14:27', text: 'εἰρήνην τὴν ἐμὴν δίδωμι ὑμῖν·', word: 'ὑμῖν', person: 2, number: 'pl', case: 'dative',
    translation: 'My peace I give to you', help: 'εἰρήνη = peace · δίδωμι = I give',
    note: 'τὴν ἐμήν is the possessive adjective ἐμός (ch. 9) in the second attributive position.',
  },
]

const PATER: DeclensionParadigm = {
  id: 'pater', lemma: 'πατήρ', lexical: 'πατήρ, πατρός, ὁ', gloss: 'father', pattern: 'noun',
  forms: { masculine: { sg: ['πατήρ', 'πατρός', 'πατρί', 'πατέρα'], pl: ['πατέρες', 'πατέρων', 'πατράσι(ν)', 'πατέρας'] } },
}

const ANER: DeclensionParadigm = {
  id: 'aner', lemma: 'ἀνήρ', lexical: 'ἀνήρ, ἀνδρός, ὁ', gloss: 'man, husband', pattern: 'noun',
  forms: { masculine: { sg: ['ἀνήρ', 'ἀνδρός', 'ἀνδρί', 'ἄνδρα'], pl: ['ἄνδρες', 'ἀνδρῶν', 'ἀνδράσι(ν)', 'ἄνδρας'] } },
}

const PISTIS: DeclensionParadigm = {
  id: 'pistis', lemma: 'πίστις', lexical: 'πίστις, πίστεως, ἡ', gloss: 'faith', pattern: 'noun',
  forms: { feminine: { sg: ['πίστις', 'πίστεως', 'πίστει', 'πίστιν'], pl: ['πίστεις', 'πίστεων', 'πίστεσι(ν)', 'πίστεις'] } },
}

const CHARIS: DeclensionParadigm = {
  id: 'charis', lemma: 'χάρις', lexical: 'χάρις, -ιτος, ἡ', gloss: 'grace', pattern: 'noun',
  forms: { feminine: { sg: ['χάρις', 'χάριτος', 'χάριτι', 'χάριν'], pl: ['χάριτες', 'χαρίτων', 'χάρισι(ν)', 'χάριτας'] } },
}

export const chapter11: Chapter = {
  number: 11,
  title: 'First and Second Person Personal Pronouns',
  short: 'Pronouns',
  topics: ['pronouns'],
  vocab: [
    { id: 'adelphos', lemma: 'ἀδελφός', lexical: 'ἀδελφός, -οῦ, ὁ', pos: 'noun', gloss: 'brother', hook: 'Philadelphia: the city of “brotherly love.”', accept: ['brother'] },
    { id: 'an', lemma: 'ἄν', pos: 'conjunction', gloss: 'untranslatable particle that makes a statement contingent', accept: ['untranslatable', 'particle', 'contingent', 'conditional', 'untranslatable particle'] },
    { id: 'aner', lemma: 'ἀνήρ', lexical: 'ἀνήρ, ἀνδρός, ὁ', pos: 'noun', gloss: 'man, male, husband', hook: 'Android: “man-like”; philanderer.', accept: ['man', 'male', 'husband'] },
    { id: 'ekklesia', lemma: 'ἐκκλησία', lexical: 'ἐκκλησία, -ας, ἡ', pos: 'noun', gloss: 'a church, (the) Church, assembly, congregation', hook: 'Ecclesiastical: to do with the church.', accept: ['church', 'assembly', 'congregation'] },
    { id: 'elpis', lemma: 'ἐλπίς', lexical: 'ἐλπίς, -ίδος, ἡ', pos: 'noun', gloss: 'hope', accept: ['hope'] },
    preposition('exo'),
    preposition('epi'),
    { id: 'hemeis', lemma: 'ἡμεῖς', pos: 'pronoun', gloss: 'we (plural of ἐγώ)', accept: ['we'] },
    { id: 'thelema', lemma: 'θέλημα', lexical: 'θέλημα, -ματος, τό', pos: 'noun', gloss: 'will, desire', accept: ['will', 'desire'] },
    { id: 'ide', lemma: 'ἴδε', pos: 'adverb', gloss: 'See! Behold!', hook: 'Idea comes from the same root: “see.”', accept: ['see', 'behold', 'look'] },
    { id: 'idou', lemma: 'ἰδού', pos: 'adverb', gloss: 'See! Behold!', hook: 'Idea comes from the same root: “see.”', accept: ['see', 'behold', 'look'] },
    { id: 'kalos', lemma: 'καλός', lexical: 'καλός, -ή, -όν', pos: 'adjective', gloss: 'beautiful, good', hook: 'Calligraphy: beautiful writing; kaleidoscope.', accept: ['beautiful', 'good', 'fine'] },
    { id: 'meter', lemma: 'μήτηρ', lexical: 'μήτηρ, μητρός, ἡ', pos: 'noun', gloss: 'mother', hook: 'Metropolis: “mother city.”', accept: ['mother'] },
    { id: 'oude', lemma: 'οὐδέ', pos: 'conjunction', gloss: 'and not, not even, neither, nor', accept: ['and not', 'not even', 'neither', 'nor'] },
    { id: 'pater', lemma: 'πατήρ', lexical: 'πατήρ, πατρός, ὁ', pos: 'noun', gloss: 'father', hook: 'Patriarch: the father who rules.', accept: ['father'] },
    { id: 'pistis', lemma: 'πίστις', lexical: 'πίστις, πίστεως, ἡ', pos: 'noun', gloss: 'faith, belief', accept: ['faith', 'belief', 'trust'] },
    { id: 'hydor', lemma: 'ὕδωρ', lexical: 'ὕδωρ, ὕδατος, τό', pos: 'noun', gloss: 'water', hook: 'Hydrant, hydraulic, dehydrate.', accept: ['water'] },
    { id: 'hymeis', lemma: 'ὑμεῖς', pos: 'pronoun', gloss: 'you (plural of σύ)', accept: ['you', 'you all', 'you (pl)', 'you plural'] },
    { id: 'phos', lemma: 'φῶς', lexical: 'φῶς, φωτός, τό', pos: 'noun', gloss: 'light', hook: 'Photograph: “writing with light”; photon.', accept: ['light'] },
    { id: 'charis', lemma: 'χάρις', lexical: 'χάρις, -ιτος, ἡ', pos: 'noun', gloss: 'grace, favor, kindness', hook: 'Charisma: a gift of grace; Eucharist: giving thanks.', accept: ['grace', 'favor', 'kindness'] },
    { id: 'hode', lemma: 'ὧδε', pos: 'adverb', gloss: 'here', accept: ['here'] },
  ],
  paradigms: [],
  pronouns: { forms: FORMS, verses: VERSES, nouns: [PATER, ANER, PISTIS, CHARIS] },
}

import { preposition } from './prepositions'
import type { Chapter, DeclensionParadigm, RelativeFormItem, RelativeItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 14: Relative Pronoun.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and practice phrases are written for this app.

const HOS: DeclensionParadigm = {
  id: 'hos', lemma: 'ὅς', lexical: 'ὅς, ἥ, ὅ', gloss: 'who, whom, which', pattern: '2-1-2',
  forms: {
    masculine: { sg: ['ὅς', 'οὗ', 'ᾧ', 'ὅν'], pl: ['οἵ', 'ὧν', 'οἷς', 'οὕς'] },
    feminine: { sg: ['ἥ', 'ἧς', 'ᾗ', 'ἥν'], pl: ['αἵ', 'ὧν', 'αἷς', 'ἅς'] },
    neuter: { sg: ['ὅ', 'οὗ', 'ᾧ', 'ὅ'], pl: ['ἅ', 'ὧν', 'οἷς', 'ἅ'] },
  },
}

const CHEIR: DeclensionParadigm = {
  id: 'cheir', lemma: 'χείρ', lexical: 'χείρ, χειρός, ἡ', gloss: 'hand', pattern: 'noun',
  forms: { feminine: { sg: ['χείρ', 'χειρός', 'χειρί', 'χεῖρα'], pl: ['χεῖρες', 'χειρῶν', 'χερσί(ν)', 'χεῖρας'] } },
}

const RHEMA: DeclensionParadigm = {
  id: 'rhema', lemma: 'ῥῆμα', lexical: 'ῥῆμα, -ματος, τό', gloss: 'word', pattern: 'noun',
  forms: { neuter: { sg: ['ῥῆμα', 'ῥήματος', 'ῥήματι', 'ῥῆμα'], pl: ['ῥήματα', 'ῥημάτων', 'ῥήμασι(ν)', 'ῥήματα'] } },
}

const ITEMS: RelativeItem[] = [
  {
    id: 'acts-9-5', ref: 'Acts 9:5', text: 'Ἐγώ εἰμι Ἰησοῦς ὃν σὺ διώκεις·', word: 'ὃν', antecedent: 'Ἰησοῦς', others: ['Ἐγώ', 'σὺ'],
    gender: 'masculine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'whom', wrong: ['who', 'which', 'whose'], translation: 'I am Jesus, whom you are persecuting.', help: 'διώκεις = you are persecuting',
    note: 'Ἰησοῦς is nominative, but ὅν is accusative: it is the object of διώκεις in its own clause.',
  },
  {
    id: 'john-4-29', ref: 'John 4:29', text: 'Δεῦτε ἴδετε ἄνθρωπον ὃς εἶπέ μοι πάντα ὅσα ἐποίησα·', word: 'ὃς', antecedent: 'ἄνθρωπον', others: ['μοι', 'πάντα'],
    gender: 'masculine', number: 'sg', case: 'nominative', reason: 'subject',
    english: 'who', wrong: ['whom', 'which', 'whose'], translation: 'Come, see a man who told me everything I did.',
    help: 'δεῦτε ἴδετε = come, see · εἶπε = told · ἐποίησα = I did',
    note: 'ἄνθρωπον is accusative (object of ἴδετε), but ὅς is nominative: it is the subject of εἶπε.',
  },
  {
    id: 'matt-1-16', ref: 'Matt 1:16', text: 'τὸν ἄνδρα Μαρίας, ἐξ ἧς ἐγεννήθη Ἰησοῦς', word: 'ἧς', antecedent: 'Μαρίας', others: ['τὸν ἄνδρα', 'Ἰησοῦς'],
    gender: 'feminine', number: 'sg', case: 'genitive', reason: 'preposition',
    english: 'whom', wrong: ['who', 'which', 'whose'], translation: 'the husband of Mary, from whom Jesus was born', help: 'ἐγεννήθη = was born',
    note: 'Feminine singular to agree with Mary (not with ἄνδρα); genitive because ἐκ takes the genitive.',
  },
  {
    id: 'matt-3-17', ref: 'Matt 3:17', text: 'Οὗτός ἐστιν ὁ υἱός μου ὁ ἀγαπητός, ἐν ᾧ εὐδόκησα.', word: 'ᾧ', antecedent: 'ὁ υἱός', others: ['μου', 'εὐδόκησα'],
    gender: 'masculine', number: 'sg', case: 'dative', reason: 'preposition',
    english: 'whom', wrong: ['who', 'which', 'whose'], translation: 'This is my beloved Son, in whom I am well pleased.', help: 'εὐδόκησα = I am well pleased',
  },
  {
    id: 'john-14-24', ref: 'John 14:24', text: 'καὶ ὁ λόγος ὃν ἀκούετε οὐκ ἔστιν ἐμὸς', word: 'ὃν', antecedent: 'ὁ λόγος', others: ['ἐμὸς', 'ἀκούετε'],
    gender: 'masculine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'and the word that you hear is not mine', help: 'ἀκούετε = you hear',
    note: 'Masculine because λόγος is masculine, but in English a thing takes “which” or “that.”',
  },
  {
    id: '1john-2-7', ref: '1 John 2:7', text: 'ἀλλʼ ἐντολὴν παλαιὰν ἣν εἴχετε ἀπʼ ἀρχῆς·', word: 'ἣν', antecedent: 'ἐντολὴν παλαιὰν', others: ['ἀρχῆς', 'εἴχετε'],
    gender: 'feminine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'but an old commandment, which you had from the beginning', help: 'εἴχετε = you had · παλαιός = old',
  },
  {
    id: '1john-1-5', ref: '1 John 1:5', text: 'Καὶ ἔστιν αὕτη ἡ ἀγγελία ἣν ἀκηκόαμεν ἀπʼ αὐτοῦ', word: 'ἣν', antecedent: 'ἡ ἀγγελία', others: ['αὐτοῦ', 'ἀκηκόαμεν'],
    gender: 'feminine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'And this is the message that we have heard from him', help: 'ἀγγελία = message · ἀκηκόαμεν = we have heard',
  },
  {
    id: 'john-6-63', ref: 'John 6:63', text: 'τὰ ῥήματα ἃ ἐγὼ λελάληκα ὑμῖν πνεῦμά ἐστιν', word: 'ἃ', antecedent: 'τὰ ῥήματα', others: ['ἐγὼ', 'ὑμῖν', 'πνεῦμά'],
    gender: 'neuter', number: 'pl', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'the words that I have spoken to you are spirit', help: 'λελάληκα = I have spoken',
  },
  {
    id: 'john-20-30', ref: 'John 20:30', text: 'ἄλλα σημεῖα ἐποίησεν ὁ Ἰησοῦς ἐνώπιον τῶν μαθητῶν, ἃ οὐκ ἔστιν γεγραμμένα', word: 'ἃ', antecedent: 'σημεῖα', others: ['ὁ Ἰησοῦς', 'τῶν μαθητῶν'],
    gender: 'neuter', number: 'pl', case: 'nominative', reason: 'subject',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'Jesus did other signs in front of the disciples, which are not written',
    help: 'ἐποίησεν = did · γεγραμμένα = written',
    note: 'σημεῖα is the object of ἐποίησεν, but ἅ is nominative: it is the subject of “are not written.”',
  },
  {
    id: 'matt-2-9', ref: 'Matt 2:9', text: 'καὶ ἰδοὺ ὁ ἀστὴρ ὃν εἶδον ἐν τῇ ἀνατολῇ προῆγεν αὐτούς,', word: 'ὃν', antecedent: 'ὁ ἀστὴρ', others: ['τῇ ἀνατολῇ', 'αὐτούς'],
    gender: 'masculine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'and look, the star that they had seen at its rising went before them,',
    help: 'ἀστήρ = star · εἶδον = they saw · ἀνατολή = rising · προῆγεν = went before',
  },
  {
    id: 'john-21-20', ref: 'John 21:20', text: 'βλέπει τὸν μαθητὴν ὃν ἠγάπα ὁ Ἰησοῦς ἀκολουθοῦντα,', word: 'ὃν', antecedent: 'τὸν μαθητὴν', others: ['ὁ Ἰησοῦς', 'ἀκολουθοῦντα'],
    gender: 'masculine', number: 'sg', case: 'accusative', reason: 'object',
    english: 'whom', wrong: ['who', 'which', 'whose'], translation: 'he sees the disciple whom Jesus loved following,',
    help: 'ἠγάπα = loved · ἀκολουθοῦντα = following', note: 'ὁ Ἰησοῦς is the subject inside the relative clause; ὅν is its object.',
  },
  {
    id: 'luke-2-15', ref: 'Luke 2:15', text: 'τὸ ῥῆμα τοῦτο τὸ γεγονὸς ὃ ὁ κύριος ἐγνώρισεν ἡμῖν.', word: 'ὃ', antecedent: 'τὸ ῥῆμα', others: ['ὁ κύριος', 'ἡμῖν'],
    gender: 'neuter', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'this thing that has happened, which the Lord has made known to us.',
    help: 'γεγονός = that has happened · ἐγνώρισεν = made known',
    note: 'ὃ (accented: relative pronoun) sits right next to ὁ (no accent: the article of κύριος).',
  },
  {
    id: 'john-17-4', ref: 'John 17:4', text: 'τὸ ἔργον τελειώσας ὃ δέδωκάς μοι', word: 'ὃ', antecedent: 'τὸ ἔργον', others: ['μοι', 'τελειώσας'],
    gender: 'neuter', number: 'sg', case: 'accusative', reason: 'object',
    english: 'which', wrong: ['who', 'whom', 'whose'], translation: 'having completed the work that you have given me', help: 'τελειώσας = having completed · δέδωκας = you have given',
  },
  {
    id: 'practice-1', text: 'ὁ ἀπόστολος ᾧ λέγω τὸν λόγον', word: 'ᾧ', antecedent: 'ὁ ἀπόστολος', others: ['τὸν λόγον', 'λέγω'],
    gender: 'masculine', number: 'sg', case: 'dative', reason: 'indirect',
    english: 'to whom', wrong: ['who', 'whose', 'which'], translation: 'the apostle to whom I speak the word',
  },
  {
    id: 'practice-2', text: 'ἡ γυνὴ ἧς τὸ τέκνον βλέπω', word: 'ἧς', antecedent: 'ἡ γυνὴ', others: ['τὸ τέκνον', 'βλέπω'],
    gender: 'feminine', number: 'sg', case: 'genitive', reason: 'possession',
    english: 'whose', wrong: ['who', 'whom', 'which'], translation: 'the woman whose child I see',
  },
]

const ARTICLE_NOTE = 'The nominative article forms ὁ, ἡ, οἱ, αἱ have no accent; every other article form starts with τ.'
const RELATIVE_NOTE = 'The relative pronoun always has an accent and never starts with τ.'

const FORMS: RelativeFormItem[] = [
  { form: 'ὁ', kind: 'article', note: ARTICLE_NOTE },
  { form: 'ὅ', kind: 'relative', note: `${RELATIVE_NOTE} ὅ is neuter nominative/accusative singular.` },
  { form: 'ἡ', kind: 'article', note: ARTICLE_NOTE },
  { form: 'ἥ', kind: 'relative', note: `${RELATIVE_NOTE} ἥ is feminine nominative singular.` },
  { form: 'ἤ', kind: 'other', note: 'ἤ with smooth breathing is the conjunction “or, than” (chapter 13).' },
  { form: 'οἱ', kind: 'article', note: ARTICLE_NOTE },
  { form: 'οἵ', kind: 'relative', note: `${RELATIVE_NOTE} οἵ is masculine nominative plural.` },
  { form: 'αἱ', kind: 'article', note: ARTICLE_NOTE },
  { form: 'αἵ', kind: 'relative', note: `${RELATIVE_NOTE} αἵ is feminine nominative plural.` },
  { form: 'οὗ', kind: 'relative', note: `${RELATIVE_NOTE} οὗ (rough breathing, circumflex) is genitive singular masculine/neuter.` },
  { form: 'οὐ', kind: 'other', note: 'οὐ with smooth breathing is “not.”' },
  { form: 'ὅν', kind: 'relative', note: `${RELATIVE_NOTE} Compare the article τόν.` },
  { form: 'τόν', kind: 'article', note: ARTICLE_NOTE },
  { form: 'ἅ', kind: 'relative', note: `${RELATIVE_NOTE} Compare the article τά.` },
  { form: 'ὧν', kind: 'relative', note: `${RELATIVE_NOTE} Compare the article τῶν.` },
  { form: 'ᾧ', kind: 'relative', note: `${RELATIVE_NOTE} Compare the article τῷ.` },
]

export const chapter14: Chapter = {
  number: 14,
  title: 'Relative Pronoun',
  short: 'Relative pronoun',
  topics: ['relative'],
  vocab: [
    { id: 'aletheia', lemma: 'ἀλήθεια', lexical: 'ἀλήθεια, -ας, ἡ', pos: 'noun', gloss: 'truth', accept: ['truth'] },
    { id: 'eirene', lemma: 'εἰρήνη', lexical: 'εἰρήνη, -ης, ἡ', pos: 'noun', gloss: 'peace', hook: 'Irene: a name meaning “peace”; irenic: peaceable.', accept: ['peace'] },
    preposition('enopion'),
    { id: 'epangelia', lemma: 'ἐπαγγελία', lexical: 'ἐπαγγελία, -ας, ἡ', pos: 'noun', gloss: 'promise', hook: 'Same root as ἄγγελος and εὐαγγέλιον: to announce.', accept: ['promise'] },
    { id: 'hepta', lemma: 'ἑπτά', pos: 'adjective', gloss: 'seven', hook: 'Heptagon: a seven-sided figure.', accept: ['seven', '7'] },
    { id: 'thronos', lemma: 'θρόνος', lexical: 'θρόνος, -ου, ὁ', pos: 'noun', gloss: 'throne', hook: 'Throne.', accept: ['throne'] },
    { id: 'ierousalem', lemma: 'Ἰερουσαλήμ', lexical: 'Ἰερουσαλήμ, ἡ', pos: 'noun', gloss: 'Jerusalem', accept: ['jerusalem'] },
    preposition('kata'),
    { id: 'kephale', lemma: 'κεφαλή', lexical: 'κεφαλή, -ῆς, ἡ', pos: 'noun', gloss: 'head', hook: 'Encephalitis (in the head), cephalic.', accept: ['head'] },
    { id: 'hodos', lemma: 'ὁδός', lexical: 'ὁδός, -οῦ, ἡ', pos: 'noun', gloss: 'way, road, journey, conduct', hook: 'Exodus (ἐξ + ὁδός, the way out), method, odometer.', accept: ['way', 'road', 'journey', 'conduct', 'path'] },
    { id: 'hos', lemma: 'ὅς', lexical: 'ὅς, ἥ, ὅ', pos: 'pronoun', gloss: 'who, whom, which (relative pronoun)', accept: ['who', 'whom', 'which', 'that'] },
    { id: 'hote', lemma: 'ὅτε', pos: 'conjunction', gloss: 'when', accept: ['when', 'while'] },
    { id: 'houtos-adv', lemma: 'οὕτως', pos: 'adverb', gloss: 'thus, so, in this manner', accept: ['thus', 'so', 'in this manner', 'in this way'] },
    { id: 'ploion', lemma: 'πλοῖον', lexical: 'πλοῖον, -ου, τό', pos: 'noun', gloss: 'ship, boat', accept: ['ship', 'boat'] },
    { id: 'rhema', lemma: 'ῥῆμα', lexical: 'ῥῆμα, -ματος, τό', pos: 'noun', gloss: 'word, saying', hook: 'Rhetoric comes from the same root: speaking.', accept: ['word', 'saying', 'thing'] },
    { id: 'te', lemma: 'τε', pos: 'conjunction', gloss: 'and (so), so', accept: ['and', 'both'] },
    { id: 'cheir', lemma: 'χείρ', lexical: 'χείρ, χειρός, ἡ', pos: 'noun', gloss: 'hand, arm, finger', hook: 'Chiropractor: one who treats with the hands.', accept: ['hand', 'arm', 'finger'] },
    { id: 'psyche', lemma: 'ψυχή', lexical: 'ψυχή, -ῆς, ἡ', pos: 'noun', gloss: 'soul, life, self', hook: 'Psychology, psyche.', accept: ['soul', 'life', 'self'] },
  ],
  paradigms: [],
  relative: { paradigm: HOS, nouns: [CHEIR, RHEMA], items: ITEMS, forms: FORMS },
}

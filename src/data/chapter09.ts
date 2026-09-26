import type { DeclensionParadigm, Chapter, NounPhrase, AdjectiveUseItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 9: Adjectives.
// Verse excerpts are from the SBLGNT (CC BY 4.0); other phrases and all English are written for this app.

const PARADIGMS: DeclensionParadigm[] = [
  {
    id: 'agathos', lemma: 'ἀγαθός', lexical: 'ἀγαθός, -ή, -όν', gloss: 'good', pattern: '2-1-2',
    forms: {
      masculine: { sg: ['ἀγαθός', 'ἀγαθοῦ', 'ἀγαθῷ', 'ἀγαθόν'], pl: ['ἀγαθοί', 'ἀγαθῶν', 'ἀγαθοῖς', 'ἀγαθούς'] },
      feminine: { sg: ['ἀγαθή', 'ἀγαθῆς', 'ἀγαθῇ', 'ἀγαθήν'], pl: ['ἀγαθαί', 'ἀγαθῶν', 'ἀγαθαῖς', 'ἀγαθάς'] },
      neuter: { sg: ['ἀγαθόν', 'ἀγαθοῦ', 'ἀγαθῷ', 'ἀγαθόν'], pl: ['ἀγαθά', 'ἀγαθῶν', 'ἀγαθοῖς', 'ἀγαθά'] },
    },
  },
  {
    id: 'poneros', lemma: 'πονηρός', lexical: 'πονηρός, -ά, -όν', gloss: 'evil', pattern: '2-1-2',
    forms: {
      masculine: { sg: ['πονηρός', 'πονηροῦ', 'πονηρῷ', 'πονηρόν'], pl: ['πονηροί', 'πονηρῶν', 'πονηροῖς', 'πονηρούς'] },
      feminine: { sg: ['πονηρά', 'πονηρᾶς', 'πονηρᾷ', 'πονηράν'], pl: ['πονηραί', 'πονηρῶν', 'πονηραῖς', 'πονηράς'] },
      neuter: { sg: ['πονηρόν', 'πονηροῦ', 'πονηρῷ', 'πονηρόν'], pl: ['πονηρά', 'πονηρῶν', 'πονηροῖς', 'πονηρά'] },
    },
  },
  {
    id: 'hagios', lemma: 'ἅγιος', lexical: 'ἅγιος, -ία, -ον', gloss: 'holy', pattern: '2-1-2',
    forms: {
      masculine: { sg: ['ἅγιος', 'ἁγίου', 'ἁγίῳ', 'ἅγιον'], pl: ['ἅγιοι', 'ἁγίων', 'ἁγίοις', 'ἁγίους'] },
      feminine: { sg: ['ἁγία', 'ἁγίας', 'ἁγίᾳ', 'ἁγίαν'], pl: ['ἅγιαι', 'ἁγίων', 'ἁγίαις', 'ἁγίας'] },
      neuter: { sg: ['ἅγιον', 'ἁγίου', 'ἁγίῳ', 'ἅγιον'], pl: ['ἅγια', 'ἁγίων', 'ἁγίοις', 'ἅγια'] },
    },
  },
  {
    id: 'aionios', lemma: 'αἰώνιος', lexical: 'αἰώνιος, -ον', gloss: 'eternal', pattern: '2-2',
    forms: {
      masculine: { sg: ['αἰώνιος', 'αἰωνίου', 'αἰωνίῳ', 'αἰώνιον'], pl: ['αἰώνιοι', 'αἰωνίων', 'αἰωνίοις', 'αἰωνίους'] },
      feminine: { sg: ['αἰώνιος', 'αἰωνίου', 'αἰωνίῳ', 'αἰώνιον'], pl: ['αἰώνιοι', 'αἰωνίων', 'αἰωνίοις', 'αἰωνίους'] },
      neuter: { sg: ['αἰώνιον', 'αἰωνίου', 'αἰωνίῳ', 'αἰώνιον'], pl: ['αἰώνια', 'αἰωνίων', 'αἰωνίοις', 'αἰώνια'] },
    },
  },
]

const NOUNS: NounPhrase[] = [
  { greek: 'ὁ λόγος', case: 'nominative', number: 'sg', gender: 'masculine', english: 'the word' },
  { greek: 'τοῦ λόγου', case: 'genitive', number: 'sg', gender: 'masculine', english: 'of the word' },
  { greek: 'τῷ δούλῳ', case: 'dative', number: 'sg', gender: 'masculine', english: 'to the slave' },
  { greek: 'τὸν οἶκον', case: 'accusative', number: 'sg', gender: 'masculine', english: 'the house' },
  { greek: 'οἱ ἀπόστολοι', case: 'nominative', number: 'pl', gender: 'masculine', english: 'the apostles' },
  { greek: 'τῶν ἀγγέλων', case: 'genitive', number: 'pl', gender: 'masculine', english: 'of the angels' },
  { greek: 'τοῖς δούλοις', case: 'dative', number: 'pl', gender: 'masculine', english: 'to the slaves' },
  { greek: 'τοὺς λόγους', case: 'accusative', number: 'pl', gender: 'masculine', english: 'the words' },
  { greek: 'ἡ ἐντολή', case: 'nominative', number: 'sg', gender: 'feminine', english: 'the commandment' },
  { greek: 'τῆς ἡμέρας', case: 'genitive', number: 'sg', gender: 'feminine', english: 'of the day' },
  { greek: 'τῇ καρδίᾳ', case: 'dative', number: 'sg', gender: 'feminine', english: 'to the heart' },
  { greek: 'τὴν ζωήν', case: 'accusative', number: 'sg', gender: 'feminine', english: 'the life' },
  { greek: 'αἱ ἐντολαί', case: 'nominative', number: 'pl', gender: 'feminine', english: 'the commandments' },
  { greek: 'τῶν ἡμερῶν', case: 'genitive', number: 'pl', gender: 'feminine', english: 'of the days' },
  { greek: 'ταῖς γραφαῖς', case: 'dative', number: 'pl', gender: 'feminine', english: 'to the writings' },
  { greek: 'τὰς ὥρας', case: 'accusative', number: 'pl', gender: 'feminine', english: 'the hours' },
  { greek: 'τὸ ἔργον', case: 'nominative', number: 'sg', gender: 'neuter', english: 'the work' },
  { greek: 'τοῦ εὐαγγελίου', case: 'genitive', number: 'sg', gender: 'neuter', english: 'of the gospel' },
  { greek: 'τῷ ἔργῳ', case: 'dative', number: 'sg', gender: 'neuter', english: 'to the work' },
  { greek: 'τὰ ἔργα', case: 'accusative', number: 'pl', gender: 'neuter', english: 'the works' },
  { greek: 'τῶν ἔργων', case: 'genitive', number: 'pl', gender: 'neuter', english: 'of the works' },
  { greek: 'τοῖς ἔργοις', case: 'dative', number: 'pl', gender: 'neuter', english: 'to the works' },
]

const USES: AdjectiveUseItem[] = [
  // Attributive
  {
    id: 'matt-12-35', ref: 'Matt 12:35', text: 'ὁ ἀγαθὸς ἄνθρωπος', adjective: 'ἀγαθὸς', use: 'attributive',
    translation: 'the good person', wrong: ['the person is good', 'the good one is a person', 'the person of the good'],
  },
  {
    id: 'john-10-11', ref: 'John 10:11', text: 'Ἐγώ εἰμι ὁ ποιμὴν ὁ καλός·', adjective: 'καλός', use: 'attributive',
    help: 'ποιμήν = shepherd · καλός = good', note: 'Second attributive position: article–noun–article–adjective. Both articles go with the same person.',
    translation: 'I am the good shepherd', wrong: ['the shepherd is good', 'I am good, the shepherd', 'I am the shepherd of the good'],
  },
  {
    id: 'john-2-10', ref: 'John 2:10', text: 'σὺ τετήρηκας τὸν καλὸν οἶνον ἕως ἄρτι.', adjective: 'καλὸν', use: 'attributive',
    help: 'τετήρηκας = you have kept · καλός = good · οἶνος = wine · ἄρτι = now',
  },
  {
    id: 'matt-5-48a', ref: 'Matt 5:48', text: 'ὡς ὁ πατὴρ ὑμῶν ὁ οὐράνιος τέλειός ἐστιν.', adjective: 'οὐράνιος', use: 'attributive',
    help: 'πατήρ = father · ὑμῶν = your · οὐράνιος = heavenly · τέλειος = perfect',
    note: 'ὁ οὐράνιος has its own article, so it is attributive: “your heavenly Father.”',
  },
  {
    id: '1john-2-7', ref: '1 John 2:7', text: 'ἡ ἐντολὴ ἡ παλαιά ἐστιν ὁ λόγος', adjective: 'παλαιά', use: 'attributive',
    help: 'παλαιός = old', note: 'Both nouns have the article, but ἡ ἐντολή comes first and carries the attributive adjective.',
    translation: 'the old commandment is the word', wrong: ['the commandment is old, the word', 'the commandment is the old word', 'the old word is the commandment'],
  },
  {
    id: 'practice-1', text: 'ὁ ἀγαθὸς δοῦλος', adjective: 'ἀγαθὸς', use: 'attributive',
    translation: 'the good slave', wrong: ['the slave is good', 'the good one is a slave', 'the slaves are good'],
  },
  {
    id: 'practice-2', text: 'ὁ δοῦλος ὁ ἀγαθός', adjective: 'ἀγαθός', use: 'attributive',
    translation: 'the good slave', wrong: ['the slave is good', 'the slave of the good one', 'the good one is a slave'],
  },
  {
    id: 'practice-3', text: 'αἱ ἐντολαὶ αἱ πρῶται', adjective: 'πρῶται', use: 'attributive',
    translation: 'the first commandments', wrong: ['the commandments are first', 'the first ones are commandments', 'the first commandment'],
  },
  {
    id: 'practice-4', text: 'τὰ ἔργα τὰ ἀγαθά', adjective: 'ἀγαθά', use: 'attributive',
    translation: 'the good works', wrong: ['the works are good', 'the good ones are works', 'the good work'],
  },
  // Predicate
  {
    id: 'rom-7-12a', ref: 'Rom 7:12', text: 'ὁ μὲν νόμος ἅγιος,', adjective: 'ἅγιος', use: 'predicate',
    help: 'νόμος = law · μέν is left untranslated here', note: 'No verb: with a predicate adjective, supply “is.”',
    translation: 'the law is holy', wrong: ['the holy law', 'the law of the saints', 'the holy one is the law'],
  },
  {
    id: 'rom-7-12b', ref: 'Rom 7:12', text: 'καὶ ἡ ἐντολὴ ἁγία', adjective: 'ἁγία', use: 'predicate',
    translation: 'and the commandment is holy', wrong: ['and the holy commandment', 'and the commandment of the saints', 'and the holy one is a commandment'],
  },
  {
    id: '1cor-1-9', ref: '1 Cor 1:9', text: 'πιστὸς ὁ θεὸς', adjective: 'πιστὸς', use: 'predicate',
    note: 'The adjective comes first but has no article, while θεός does: predicate. Supply “is.”',
    translation: 'God is faithful', wrong: ['the faithful God', 'the faithful one of God', 'God was faithful'],
  },
  {
    id: 'matt-5-48b', ref: 'Matt 5:48', text: 'ὡς ὁ πατὴρ ὑμῶν ὁ οὐράνιος τέλειός ἐστιν.', adjective: 'τέλειός', use: 'predicate',
    help: 'πατήρ = father · ὑμῶν = your · οὐράνιος = heavenly · τέλειος = perfect',
    note: 'τέλειος has no article and is linked by ἐστιν: “as your heavenly Father is perfect.”',
  },
  {
    id: 'luke-16-10b', ref: 'Luke 16:10', text: 'Ὁ πιστὸς ἐν ἐλαχίστῳ καὶ ἐν πολλῷ πιστός ἐστιν,', adjective: 'πιστός', use: 'predicate',
    help: 'ἐλάχιστος = very little · πολύς = much', note: 'The first πιστὸς (with ὁ) is substantival; this second πιστός is the predicate.',
  },
  {
    id: 'practice-5', text: 'ὁ δοῦλος ἀγαθός', adjective: 'ἀγαθός', use: 'predicate',
    translation: 'the slave is good', wrong: ['the good slave', 'the slave of the good one', 'the good one is a slave'],
  },
  {
    id: 'practice-6', text: 'ἀγαθὸς ὁ δοῦλος', adjective: 'ἀγαθὸς', use: 'predicate',
    translation: 'the slave is good', wrong: ['the good slave', 'the good one is a slave', 'the slave of the good one'],
  },
  {
    id: 'practice-7', text: 'αἱ ἡμέραι πονηραί', adjective: 'πονηραί', use: 'predicate',
    translation: 'the days are evil', wrong: ['the evil days', 'the evil ones are days', 'the day is evil'],
  },
  // Substantival
  {
    id: 'john-6-69', ref: 'John 6:69', text: 'σὺ εἶ ὁ ἅγιος τοῦ θεοῦ.', adjective: 'ἅγιος', use: 'substantival',
    translation: 'you are the Holy One of God', wrong: ['you are the holy God', 'you are holy, God', 'the holy God is you'],
  },
  {
    id: 'rev-1-17', ref: 'Rev 1:17', text: 'ἐγώ εἰμι ὁ πρῶτος καὶ ὁ ἔσχατος,', adjective: 'πρῶτος', use: 'substantival',
    translation: 'I am the first and the last', wrong: ['I was the first and the last', 'the first is the last', 'I am the first of the last'],
  },
  {
    id: 'matt-6-13', ref: 'Matt 6:13', text: 'ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ.', adjective: 'πονηροῦ', use: 'substantival',
    help: 'ῥῦσαι = deliver · ἡμᾶς = us', note: 'τοῦ πονηροῦ can be masculine (“the evil one”) or neuter (“evil”); the form is the same.',
    translation: 'but deliver us from the evil one', wrong: ['but deliver the evil one from us', 'but deliver us, evil one', 'but deliver us from the evil word'],
  },
  {
    id: 'acts-9-13', ref: 'Acts 9:13', text: 'ὅσα κακὰ τοῖς ἁγίοις σου ἐποίησεν', adjective: 'ἁγίοις', use: 'substantival',
    help: 'ὅσα = how much · ἐποίησεν = he did · σου = your', note: 'In the plural, οἱ ἅγιοι means “the saints.”',
  },
  {
    id: 'luke-6-45', ref: 'Luke 6:45', text: 'προφέρει τὸ ἀγαθόν,', adjective: 'ἀγαθόν', use: 'substantival',
    help: 'προφέρει = he brings out', note: 'Neuter substantival adjectives often mean “what is ___” or “___ things.”',
    translation: 'he brings out what is good', wrong: ['he brings out the good man', 'the good one brings out', 'he is good'],
  },
  {
    id: 'luke-16-10a', ref: 'Luke 16:10', text: 'Ὁ πιστὸς ἐν ἐλαχίστῳ καὶ ἐν πολλῷ πιστός ἐστιν,', adjective: 'πιστὸς', use: 'substantival',
    help: 'ἐλάχιστος = very little · πολύς = much', note: 'Ὁ πιστός has the article and no noun: “the faithful person.”',
  },
  {
    id: 'practice-8', text: 'οἱ νεκροί', adjective: 'νεκροί', use: 'substantival',
    translation: 'the dead', wrong: ['they are dead', 'the dead word', 'the dead ones are'],
  },
]

export const chapter09: Chapter = {
  number: 9,
  title: 'Adjectives',
  short: 'Adjectives',
  topics: ['adjectives'],
  vocab: [
    { id: 'agathos', lemma: 'ἀγαθός', lexical: 'ἀγαθός, -ή, -όν', pos: 'adjective', gloss: 'good, useful', hook: 'Agatha: a name meaning “good.”', accept: ['good', 'useful'] },
    { id: 'agapetos', lemma: 'ἀγαπητός', lexical: 'ἀγαπητός, -ή, -όν', pos: 'adjective', gloss: 'beloved', hook: 'From ἀγάπη, love: “agape.”', accept: ['beloved', 'dear'] },
    { id: 'hagios', lemma: 'ἅγιος', lexical: 'ἅγιος, -ία, -ον', pos: 'adjective', gloss: 'holy; plural noun: saints', hook: 'Hagiography: writing about saints; Hagia Sophia, “Holy Wisdom.”', accept: ['holy', 'saints', 'saint', 'holy ones'] },
    { id: 'aionios', lemma: 'αἰώνιος', lexical: 'αἰώνιος, -ον', pos: 'adjective', gloss: 'eternal', hook: 'From αἰών, “age”: eon.', accept: ['eternal', 'everlasting'] },
    { id: 'allelon', lemma: 'ἀλλήλων', pos: 'pronoun', gloss: 'one another', hook: 'Parallel: παρʼ ἀλλήλοις, lines “beside one another.”', accept: ['one another', 'each other'] },
    { id: 'apekrithe', lemma: 'ἀπεκρίθη', pos: 'verb', gloss: 'he/she/it answered', hook: 'Related to κρίνω, “judge”: critic, crisis.', accept: ['he answered', 'she answered', 'it answered', 'he/she/it answered', 'answered'] },
    { id: 'doulos', lemma: 'δοῦλος', lexical: 'δοῦλος, -ου, ὁ', pos: 'noun', gloss: 'slave, servant', accept: ['slave', 'servant'] },
    { id: 'ean', lemma: 'ἐάν', pos: 'conjunction', gloss: 'if, when', accept: ['if', 'when'] },
    { id: 'emos', lemma: 'ἐμός', lexical: 'ἐμός, ἐμή, ἐμόν', pos: 'adjective', gloss: 'my, mine', accept: ['my', 'mine'] },
    { id: 'entole', lemma: 'ἐντολή', lexical: 'ἐντολή, -ῆς, ἡ', pos: 'noun', gloss: 'commandment', accept: ['commandment', 'command'] },
    { id: 'kathos', lemma: 'καθώς', pos: 'adverb', gloss: 'as, even as', accept: ['as', 'even as', 'just as'] },
    { id: 'kakos', lemma: 'κακός', lexical: 'κακός, -ή, -όν', pos: 'adjective', gloss: 'bad, evil', hook: 'Cacophony: a bad sound.', accept: ['bad', 'evil'] },
    { id: 'mou', lemma: 'μου', pos: 'pronoun', gloss: 'my (genitive of ἐγώ)', accept: ['my', 'of me', 'mine'] },
    { id: 'nekros', lemma: 'νεκρός', lexical: 'νεκρός, -ά, -όν', pos: 'adjective', gloss: 'dead; noun: dead body, corpse', hook: 'Necropolis: a city of the dead.', accept: ['dead', 'dead body', 'corpse'] },
    { id: 'pistos', lemma: 'πιστός', lexical: 'πιστός, -ή, -όν', pos: 'adjective', gloss: 'faithful, believing', accept: ['faithful', 'believing', 'trustworthy'] },
    { id: 'poneros', lemma: 'πονηρός', lexical: 'πονηρός, -ά, -όν', pos: 'adjective', gloss: 'evil, bad', accept: ['evil', 'bad', 'wicked'] },
    { id: 'protos', lemma: 'πρῶτος', lexical: 'πρῶτος, -η, -ον', pos: 'adjective', gloss: 'first, earlier', hook: 'Prototype: the first model; protagonist: the first actor.', accept: ['first', 'earlier'] },
    { id: 'tritos', lemma: 'τρίτος', lexical: 'τρίτος, -η, -ον', pos: 'adjective', gloss: 'third', hook: 'From τρία, “three”: triangle, trio.', accept: ['third'] },
  ],
  paradigms: [],
  adjectives: { paradigms: PARADIGMS, nouns: NOUNS, uses: USES },
}

import { preposition } from './prepositions'
import type { Chapter, DeclensionParadigm, NounPhrase, RuleItem, TisItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 10: Third Declension.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and other examples are written for this app.

const SARX: DeclensionParadigm = {
  id: 'sarx', lemma: 'σάρξ', lexical: 'σάρξ, σαρκός, ἡ', gloss: 'flesh', pattern: 'noun',
  forms: { feminine: { sg: ['σάρξ', 'σαρκός', 'σαρκί', 'σάρκα'], pl: ['σάρκες', 'σαρκῶν', 'σαρξί(ν)', 'σάρκας'] } },
}

const ONOMA: DeclensionParadigm = {
  id: 'onoma', lemma: 'ὄνομα', lexical: 'ὄνομα, -ματος, τό', gloss: 'name', pattern: 'noun',
  forms: { neuter: { sg: ['ὄνομα', 'ὀνόματος', 'ὀνόματι', 'ὄνομα'], pl: ['ὀνόματα', 'ὀνομάτων', 'ὀνόμασι(ν)', 'ὀνόματα'] } },
}

const PAS: DeclensionParadigm = {
  id: 'pas', lemma: 'πᾶς', lexical: 'πᾶς, πᾶσα, πᾶν', gloss: 'every, all', pattern: '3-1-3', position: 'before-article',
  forms: {
    masculine: { sg: ['πᾶς', 'παντός', 'παντί', 'πάντα'], pl: ['πάντες', 'πάντων', 'πᾶσι(ν)', 'πάντας'] },
    feminine: { sg: ['πᾶσα', 'πάσης', 'πάσῃ', 'πᾶσαν'], pl: ['πᾶσαι', 'πασῶν', 'πάσαις', 'πάσας'] },
    neuter: { sg: ['πᾶν', 'παντός', 'παντί', 'πᾶν'], pl: ['πάντα', 'πάντων', 'πᾶσι(ν)', 'πάντα'] },
  },
}

const TIS: DeclensionParadigm = {
  id: 'tis', lemma: 'τίς', lexical: 'τίς, τί', gloss: 'who? what?', pattern: 'pronoun',
  forms: {
    masculine: { sg: ['τίς', 'τίνος', 'τίνι', 'τίνα'], pl: ['τίνες', 'τίνων', 'τίσι(ν)', 'τίνας'] },
    feminine: { sg: ['τίς', 'τίνος', 'τίνι', 'τίνα'], pl: ['τίνες', 'τίνων', 'τίσι(ν)', 'τίνας'] },
    neuter: { sg: ['τί', 'τίνος', 'τίνι', 'τί'], pl: ['τίνα', 'τίνων', 'τίσι(ν)', 'τίνα'] },
  },
}

const HEIS: DeclensionParadigm = {
  id: 'heis', lemma: 'εἷς', lexical: 'εἷς, μία, ἕν', gloss: 'one', pattern: '3-1-3',
  forms: {
    masculine: { sg: ['εἷς', 'ἑνός', 'ἑνί', 'ἕνα'] },
    feminine: { sg: ['μία', 'μιᾶς', 'μιᾷ', 'μίαν'] },
    neuter: { sg: ['ἕν', 'ἑνός', 'ἑνί', 'ἕν'] },
  },
}

/** Noun phrases for πᾶς agreement: one per case/number/gender, mixing first, second and third declension nouns. */
export const PAS_NOUNS: NounPhrase[] = [
  { greek: 'ὁ ὄχλος', case: 'nominative', number: 'sg', gender: 'masculine', english: 'the crowd' },
  { greek: 'τοῦ κόσμου', case: 'genitive', number: 'sg', gender: 'masculine', english: 'of the world' },
  { greek: 'τῷ λόγῳ', case: 'dative', number: 'sg', gender: 'masculine', english: 'to the word' },
  { greek: 'τὸν οἶκον', case: 'accusative', number: 'sg', gender: 'masculine', english: 'the house' },
  { greek: 'οἱ ἄνθρωποι', case: 'nominative', number: 'pl', gender: 'masculine', english: 'the people' },
  { greek: 'τῶν ἀγγέλων', case: 'genitive', number: 'pl', gender: 'masculine', english: 'of the angels' },
  { greek: 'τοῖς ἀνθρώποις', case: 'dative', number: 'pl', gender: 'masculine', english: 'to the people' },
  { greek: 'τοὺς ἀποστόλους', case: 'accusative', number: 'pl', gender: 'masculine', english: 'the apostles' },
  { greek: 'ἡ σάρξ', case: 'nominative', number: 'sg', gender: 'feminine', english: 'the flesh' },
  { greek: 'τῆς ἡμέρας', case: 'genitive', number: 'sg', gender: 'feminine', english: 'of the day' },
  { greek: 'τῇ σαρκί', case: 'dative', number: 'sg', gender: 'feminine', english: 'to the flesh' },
  { greek: 'τὴν ἐντολήν', case: 'accusative', number: 'sg', gender: 'feminine', english: 'the commandment' },
  { greek: 'αἱ ἡμέραι', case: 'nominative', number: 'pl', gender: 'feminine', english: 'the days' },
  { greek: 'τῶν ἡμερῶν', case: 'genitive', number: 'pl', gender: 'feminine', english: 'of the days' },
  { greek: 'ταῖς ἐντολαῖς', case: 'dative', number: 'pl', gender: 'feminine', english: 'to the commandments' },
  { greek: 'τὰς σάρκας', case: 'accusative', number: 'pl', gender: 'feminine', english: 'the bodies' },
  { greek: 'τὸ ὄνομα', case: 'nominative', number: 'sg', gender: 'neuter', english: 'the name' },
  { greek: 'τοῦ ὀνόματος', case: 'genitive', number: 'sg', gender: 'neuter', english: 'of the name' },
  { greek: 'τῷ σώματι', case: 'dative', number: 'sg', gender: 'neuter', english: 'to the body' },
  { greek: 'τὸ σῶμα', case: 'accusative', number: 'sg', gender: 'neuter', english: 'the body' },
  { greek: 'τὰ τέκνα', case: 'nominative', number: 'pl', gender: 'neuter', english: 'the children' },
  { greek: 'τῶν σωμάτων', case: 'genitive', number: 'pl', gender: 'neuter', english: 'of the bodies' },
  { greek: 'τοῖς τέκνοις', case: 'dative', number: 'pl', gender: 'neuter', english: 'to the children' },
  { greek: 'τὰ ὀνόματα', case: 'accusative', number: 'pl', gender: 'neuter', english: 'the names' },
]

const LABIAL = 'Labials (π, β, φ) + σ → ψ.'
const VELAR = 'Velars (κ, γ, χ) + σ → ξ.'
const DENTAL = 'Dentals (τ, δ, θ) drop out before σ.'

const STOPS: RuleItem[] = [
  { id: 'pi', prompt: 'π + σ', options: ['ψ', 'ξ', 'σ', 'πσ'], rule: LABIAL },
  { id: 'beta', prompt: 'β + σ', options: ['ψ', 'ξ', 'σ', 'βσ'], rule: LABIAL },
  { id: 'phi', prompt: 'φ + σ', options: ['ψ', 'ξ', 'σ', 'φσ'], rule: LABIAL },
  { id: 'kappa', prompt: 'κ + σ', options: ['ξ', 'ψ', 'σ', 'κσ'], rule: VELAR },
  { id: 'gamma', prompt: 'γ + σ', options: ['ξ', 'ψ', 'σ', 'γσ'], rule: VELAR },
  { id: 'chi', prompt: 'χ + σ', options: ['ξ', 'ψ', 'σ', 'χσ'], rule: VELAR },
  { id: 'tau', prompt: 'τ + σ', options: ['σ', 'ξ', 'ψ', 'τσ'], rule: DENTAL },
  { id: 'delta', prompt: 'δ + σ', options: ['σ', 'ξ', 'ψ', 'δσ'], rule: DENTAL },
  { id: 'theta', prompt: 'θ + σ', options: ['σ', 'ξ', 'ψ', 'θσ'], rule: DENTAL },
  { id: 'sarx', prompt: 'σαρκ + ς', options: ['σάρξ', 'σάρκς', 'σάρς', 'σάρψ'], rule: `${VELAR} Nominative singular of σάρξ.` },
  { id: 'nyx', prompt: 'νυκτ + ς', options: ['νύξ', 'νύκτς', 'νύτς', 'νύψ'], rule: `${DENTAL} Then ${VELAR.toLowerCase()} νύξ, “night.”` },
  { id: 'araps', prompt: 'Ἀραβ + ς', options: ['Ἄραψ', 'Ἄραβς', 'Ἄραξ', 'Ἄρας'], rule: `${LABIAL} Ἄραψ, “an Arab” (Ἄραβες in Acts 2:11).` },
  { id: 'charis', prompt: 'χαριτ + ς', options: ['χάρις', 'χάριτς', 'χάριξ', 'χάριψ'], rule: `${DENTAL} χάρις, “grace.”` },
  { id: 'elpis', prompt: 'ἐλπιδ + ς', options: ['ἐλπίς', 'ἐλπίδς', 'ἐλπίξ', 'ἐλπίψ'], rule: `${DENTAL} ἐλπίς, “hope.”` },
  { id: 'sarxi', prompt: 'σαρκ + σι(ν)', options: ['σαρξί(ν)', 'σαρκσί(ν)', 'σαρσί(ν)', 'σαρκί(ν)'], rule: `${VELAR} Dative plural of σάρξ.` },
  { id: 'onomasi', prompt: 'ὀνοματ + σι(ν)', options: ['ὀνόμασι(ν)', 'ὀνόματσι(ν)', 'ὀνόμαξι(ν)', 'ὀνόματι(ν)'], rule: `${DENTAL} Dative plural of ὄνομα.` },
  { id: 'onoma', prompt: 'ὀνοματ + (no ending)', options: ['ὄνομα', 'ὄνοματ', 'ὄνομας', 'ὀνόματα'], rule: 'τ cannot stand at the end of a word, so it drops: ὄνομα.' },
  { id: 'pas', prompt: 'παντ + ς', options: ['πᾶς', 'πάντς', 'πάνς', 'πάξ'], rule: 'ντ drops out before σ, and the vowel before it lengthens: πᾶς.' },
  { id: 'pasi', prompt: 'παντ + σι(ν)', options: ['πᾶσι(ν)', 'πάντσι(ν)', 'πάνσι(ν)', 'πάξι(ν)'], rule: 'ντ drops out before σ, and the vowel before it lengthens: πᾶσι(ν).' },
]

const STEM_RULE = 'Drop the genitive singular ending -ος to find the stem; the nominative often hides it.'

const STEMS: RuleItem[] = [
  { id: 'sarx', prompt: 'σάρξ, σαρκός, ἡ', options: ['σαρκ', 'σαρ', 'σαρξ', 'σαρκο'], rule: STEM_RULE, gloss: 'flesh' },
  { id: 'onoma', prompt: 'ὄνομα, -ματος, τό', options: ['ὀνοματ', 'ὀνομα', 'ὀνοματο', 'ὀνομ'], rule: STEM_RULE, gloss: 'name' },
  { id: 'soma', prompt: 'σῶμα, -ματος, τό', options: ['σωματ', 'σωμα', 'σωματο', 'σωμ'], rule: STEM_RULE, gloss: 'body' },
  { id: 'pneuma', prompt: 'πνεῦμα, -ματος, τό', options: ['πνευματ', 'πνευμα', 'πνευματο', 'πνευμ'], rule: STEM_RULE, gloss: 'spirit' },
  { id: 'charis', prompt: 'χάρις, -ιτος, ἡ', options: ['χαριτ', 'χαρι', 'χαρις', 'χαριτο'], rule: STEM_RULE, gloss: 'grace' },
  { id: 'elpis', prompt: 'ἐλπίς, -ίδος, ἡ', options: ['ἐλπιδ', 'ἐλπι', 'ἐλπις', 'ἐλπιδο'], rule: STEM_RULE, gloss: 'hope' },
  { id: 'nyx', prompt: 'νύξ, νυκτός, ἡ', options: ['νυκτ', 'νυξ', 'νυκ', 'νυκτο'], rule: STEM_RULE, gloss: 'night' },
  { id: 'pous', prompt: 'πούς, ποδός, ὁ', options: ['ποδ', 'που', 'πους', 'ποδο'], rule: STEM_RULE, gloss: 'foot' },
  { id: 'hydor', prompt: 'ὕδωρ, ὕδατος, τό', options: ['ὑδατ', 'ὑδωρ', 'ὑδα', 'ὑδατο'], rule: `${STEM_RULE} ὕδωρ is a good example: you could never guess ὑδατ- from the nominative.`, gloss: 'water' },
]

const TIS_ITEMS: TisItem[] = [
  { id: 'john-1-19', ref: 'John 1:19', text: 'Σὺ τίς εἶ;', word: 'τίς', kind: 'interrogative', translation: 'Who are you?' },
  { id: 'mark-5-30', ref: 'Mark 5:30', text: 'Τίς μου ἥψατο τῶν ἱματίων;', word: 'Τίς', kind: 'interrogative', translation: 'Who touched my garments?', help: 'ἥψατο = touched · ἱμάτιον = garment' },
  { id: 'luke-10-29', ref: 'Luke 10:29', text: 'Καὶ τίς ἐστίν μου πλησίον;', word: 'τίς', kind: 'interrogative', translation: 'And who is my neighbor?', help: 'πλησίον = neighbor' },
  { id: 'matt-21-10', ref: 'Matt 21:10', text: 'Τίς ἐστιν οὗτος;', word: 'Τίς', kind: 'interrogative', translation: 'Who is this?', help: 'οὗτος = this (man)' },
  { id: 'acts-9-5', ref: 'Acts 9:5', text: 'Τίς εἶ, κύριε;', word: 'Τίς', kind: 'interrogative', translation: 'Who are you, Lord?' },
  { id: 'john-7-20', ref: 'John 7:20', text: 'τίς σε ζητεῖ ἀποκτεῖναι;', word: 'τίς', kind: 'interrogative', translation: 'Who is seeking to kill you?', help: 'σε = you · ζητεῖ = seeks · ἀποκτεῖναι = to kill' },
  { id: 'mark-10-18', ref: 'Mark 10:18', text: 'Τί με λέγεις ἀγαθόν;', word: 'Τί', kind: 'interrogative', translation: 'Why do you call me good?', help: 'με = me', note: 'The neuter τί often means “why?”' },
  { id: 'mark-1-24', ref: 'Mark 1:24', text: 'οἶδά σε τίς εἶ,', word: 'τίς', kind: 'interrogative', translation: 'I know who you are', help: 'οἶδα = I know · σε = you', note: 'An indirect question still uses the interrogative τίς. (οἶδά has two accents because the enclitic σε follows.)' },
  { id: 'mark-8-34', ref: 'Mark 8:34', text: 'Εἴ τις θέλει ὀπίσω μου ἐλθεῖν,', word: 'τις', kind: 'indefinite', translation: 'If anyone wants to come after me,', help: 'θέλει = wants · ὀπίσω = after · ἐλθεῖν = to come', note: 'εἰ has no accent of its own; it gets one here from the enclitic τις.' },
  { id: 'john-6-51', ref: 'John 6:51', text: 'ἐάν τις φάγῃ ἐκ τούτου τοῦ ἄρτου', word: 'τις', kind: 'indefinite', translation: 'if anyone eats from this bread', help: 'φάγῃ = eats · τούτου = this · ἄρτος = bread' },
  { id: 'luke-10-25', ref: 'Luke 10:25', text: 'Καὶ ἰδοὺ νομικός τις ἀνέστη', word: 'τις', kind: 'indefinite', translation: 'And look, a certain lawyer stood up', help: 'νομικός = lawyer · ἀνέστη = stood up', note: 'After a noun, τις often means “a certain.” νομικός keeps its acute because an enclitic follows.' },
  { id: 'mark-14-47', ref: 'Mark 14:47', text: 'εἷς δέ τις τῶν παρεστηκότων', word: 'τις', kind: 'indefinite', translation: 'but a certain one of those standing by', help: 'παρεστηκότων = those standing by' },
  { id: 'rom-8-9', ref: 'Rom 8:9', text: 'εἰ δέ τις πνεῦμα Χριστοῦ οὐκ ἔχει,', word: 'τις', kind: 'indefinite', translation: 'but if anyone does not have the Spirit of Christ,', help: 'ἔχει = has' },
  { id: 'john-3-3', ref: 'John 3:3', text: 'ἐὰν μή τις γεννηθῇ ἄνωθεν,', word: 'τις', kind: 'indefinite', translation: 'unless someone is born from above,', help: 'γεννηθῇ = is born · ἄνωθεν = from above, again' },
  { id: 'luke-7-2', ref: 'Luke 7:2', text: 'Ἑκατοντάρχου δέ τινος δοῦλος', word: 'τινος', kind: 'indefinite', translation: 'now the slave of a certain centurion', help: 'ἑκατοντάρχης = centurion', note: 'τινος is genitive, agreeing with Ἑκατοντάρχου.' },
  { id: 'acts-9-36', ref: 'Acts 9:36', text: 'Ἐν Ἰόππῃ δέ τις ἦν μαθήτρια', word: 'τις', kind: 'indefinite', translation: 'Now in Joppa there was a certain disciple', help: 'μαθήτρια = (woman) disciple' },
]

export const chapter10: Chapter = {
  number: 10,
  title: 'Third Declension',
  short: '3rd declension',
  topics: ['declension'],
  vocab: [
    { id: 'ei', lemma: 'εἰ', pos: 'conjunction', gloss: 'if', accept: ['if'] },
    { id: 'ei-me', lemma: 'εἰ μή', pos: 'conjunction', gloss: 'except, if not', accept: ['except', 'if not', 'unless'] },
    { id: 'heis', lemma: 'εἷς', lexical: 'εἷς, μία, ἕν', pos: 'adjective', gloss: 'one', hook: 'Hyphen comes from ὑφʼ ἕν, “under one” (joining two words into one).', accept: ['one'] },
    { id: 'ede', lemma: 'ἤδη', pos: 'adverb', gloss: 'now, already', accept: ['now', 'already'] },
    { id: 'onoma', lemma: 'ὄνομα', lexical: 'ὄνομα, -ματος, τό', pos: 'noun', gloss: 'name', hook: 'Anonymous (without a name), synonym, onomatopoeia.', accept: ['name'] },
    { id: 'oudeis', lemma: 'οὐδείς', lexical: 'οὐδείς, οὐδεμία, οὐδέν', pos: 'adjective', gloss: 'no one, none, nothing', accept: ['no one', 'none', 'nothing', 'nobody'] },
    { id: 'pas', lemma: 'πᾶς', lexical: 'πᾶς, πᾶσα, πᾶν', pos: 'adjective', gloss: 'singular: each, every; plural: all', hook: 'Pandemic (among all the people), panorama, pantheon.', accept: ['each', 'every', 'all', 'whole'] },
    preposition('peri'),
    { id: 'sarx', lemma: 'σάρξ', lexical: 'σάρξ, σαρκός, ἡ', pos: 'noun', gloss: 'flesh, body', hook: 'Sarcophagus: “flesh-eating” stone coffin; sarcasm: tearing the flesh.', accept: ['flesh', 'body'] },
    preposition('syn'),
    { id: 'soma', lemma: 'σῶμα', lexical: 'σῶμα, -ματος, τό', pos: 'noun', gloss: 'body', hook: 'Psychosomatic: of mind and body.', accept: ['body'] },
    { id: 'teknon', lemma: 'τέκνον', lexical: 'τέκνον, -ου, τό', pos: 'noun', gloss: 'child, descendant', accept: ['child', 'descendant'] },
    { id: 'tis-q', lemma: 'τίς', lexical: 'τίς, τί', pos: 'pronoun', gloss: 'who? what? which? why?', accept: ['who', 'what', 'which', 'why'] },
    { id: 'tis-i', lemma: 'τις', lexical: 'τις, τι', pos: 'pronoun', gloss: 'someone/thing, a certain one/thing, anyone/thing', accept: ['someone', 'something', 'anyone', 'anything', 'a certain one', 'a certain thing', 'certain'] },
  ],
  paradigms: [],
  thirdDeclension: {
    paradigms: [SARX, ONOMA, PAS, TIS, HEIS],
    agreement: { paradigm: PAS, nouns: PAS_NOUNS },
    stops: STOPS,
    stems: STEMS,
    tis: TIS_ITEMS,
  },
}

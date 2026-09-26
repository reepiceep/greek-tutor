import { preposition } from './prepositions'
import type { AutosItem, Chapter, DeclensionParadigm } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 12: αὐτός.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and practice phrases are written for this app.

const AUTOS: DeclensionParadigm = {
  id: 'autos', lemma: 'αὐτός', lexical: 'αὐτός, -ή, -ό', gloss: 'he, she, it; -self; same', pattern: '2-1-2',
  forms: {
    masculine: { sg: ['αὐτός', 'αὐτοῦ', 'αὐτῷ', 'αὐτόν'], pl: ['αὐτοί', 'αὐτῶν', 'αὐτοῖς', 'αὐτούς'] },
    feminine: { sg: ['αὐτή', 'αὐτῆς', 'αὐτῇ', 'αὐτήν'], pl: ['αὐταί', 'αὐτῶν', 'αὐταῖς', 'αὐτάς'] },
    neuter: { sg: ['αὐτό', 'αὐτοῦ', 'αὐτῷ', 'αὐτό'], pl: ['αὐτά', 'αὐτῶν', 'αὐτοῖς', 'αὐτά'] },
  },
}

const AION: DeclensionParadigm = {
  id: 'aion', lemma: 'αἰών', lexical: 'αἰών, -ῶνος, ὁ', gloss: 'age, eternity', pattern: 'noun',
  forms: { masculine: { sg: ['αἰών', 'αἰῶνος', 'αἰῶνι', 'αἰῶνα'], pl: ['αἰῶνες', 'αἰώνων', 'αἰῶσι(ν)', 'αἰῶνας'] } },
}

const POUS: DeclensionParadigm = {
  id: 'pous', lemma: 'πούς', lexical: 'πούς, ποδός, ὁ', gloss: 'foot', pattern: 'noun',
  forms: { masculine: { sg: ['πούς', 'ποδός', 'ποδί', 'πόδα'], pl: ['πόδες', 'ποδῶν', 'ποσί(ν)', 'πόδας'] } },
}

const PRONOUN_WRONG = ['himself', 'the same']

const ITEMS: AutosItem[] = [
  // Personal pronoun
  {
    id: 'john-1-3', ref: 'John 1:3', text: 'πάντα διʼ αὐτοῦ ἐγένετο,', word: 'αὐτοῦ', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'his'], translation: 'All things came into being through him,',
    note: 'αὐτοῦ refers back to ὁ λόγος (the Word): masculine singular, “him.”',
  },
  {
    id: 'john-1-4', ref: 'John 1:4', text: 'ἐν αὐτῷ ζωὴ ἦν,', word: 'αὐτῷ', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'them'], translation: 'In him was life,',
  },
  {
    id: 'john-1-5', ref: 'John 1:5', text: 'καὶ ἡ σκοτία αὐτὸ οὐ κατέλαβεν.', word: 'αὐτὸ', use: 'pronoun',
    english: 'it', wrong: ['itself', 'the same', 'him'], translation: 'and the darkness did not overcome it.',
    help: 'σκοτία = darkness · κατέλαβεν = overcame', note: 'Neuter αὐτό agrees with τὸ φῶς (the light) in the verse before: “it.”',
  },
  {
    id: 'john-1-11', ref: 'John 1:11', text: 'καὶ οἱ ἴδιοι αὐτὸν οὐ παρέλαβον.', word: 'αὐτὸν', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'them'], translation: 'and his own people did not receive him.',
    help: 'ἴδιοι = his own (people) · παρέλαβον = they received',
  },
  {
    id: 'john-1-12', ref: 'John 1:12', text: 'ὅσοι δὲ ἔλαβον αὐτόν, ἔδωκεν αὐτοῖς ἐξουσίαν', word: 'αὐτοῖς', use: 'pronoun',
    english: 'to them', wrong: ['to him', 'themselves', 'the same'], translation: 'But as many as received him, he gave to them authority',
    help: 'ὅσοι = as many as · ἔλαβον = received · ἔδωκεν = he gave · ἐξουσία = authority',
  },
  {
    id: 'matt-1-21a', ref: 'Matt 1:21', text: 'καὶ καλέσεις τὸ ὄνομα αὐτοῦ Ἰησοῦν,', word: 'αὐτοῦ', use: 'pronoun',
    english: 'his', wrong: [...PRONOUN_WRONG, 'their'], translation: 'and you will call his name Jesus,',
    help: 'καλέσεις = you will call', note: 'The genitive of αὐτός often shows possession: “his.”',
  },
  {
    id: 'matt-1-21b', ref: 'Matt 1:21', text: 'σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν.', word: 'αὐτῶν', use: 'pronoun',
    english: 'their', wrong: ['his', 'themselves', 'the same'], translation: 'he will save his people from their sins.',
    help: 'σώσει = he will save · λαός = people · ἁμαρτία = sin', note: 'Plural αὐτῶν refers back to the people: “their.”',
  },
  {
    id: 'matt-5-1', ref: 'Matt 5:1', text: 'προσῆλθαν αὐτῷ οἱ μαθηταὶ αὐτοῦ·', word: 'αὐτῷ', use: 'pronoun',
    english: 'to him', wrong: ['to them', 'himself', 'the same'], translation: 'his disciples came to him.',
    help: 'προσῆλθαν = came to',
  },
  {
    id: 'luke-2-7', ref: 'Luke 2:7', text: 'καὶ ἔτεκεν τὸν υἱὸν αὐτῆς τὸν πρωτότοκον,', word: 'αὐτῆς', use: 'pronoun',
    english: 'her', wrong: ['his', 'herself', 'the same'], translation: 'and she gave birth to her firstborn son,',
    help: 'ἔτεκεν = she gave birth to · πρωτότοκος = firstborn',
  },
  {
    id: 'john-14-21', ref: 'John 14:21', text: 'ὁ ἔχων τὰς ἐντολάς μου καὶ τηρῶν αὐτὰς', word: 'αὐτὰς', use: 'pronoun',
    english: 'them', wrong: ['her', 'themselves', 'the same'], translation: 'the one who has my commandments and keeps them',
    help: 'ἔχων = having · τηρῶν = keeping', note: 'Feminine plural because it refers to τὰς ἐντολάς. English uses “them” whatever the gender.',
  },
  {
    id: 'practice-1', text: 'λέγω αὐτῷ', word: 'αὐτῷ', use: 'pronoun',
    english: 'to him', wrong: ['himself', 'to them', 'the same'], translation: 'I say to him',
  },
  // Intensive
  {
    id: '1thess-4-16', ref: '1 Thess 4:16', text: 'αὐτὸς ὁ κύριος', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the Lord himself',
  },
  {
    id: 'rom-8-16', ref: 'Rom 8:16', text: 'αὐτὸ τὸ πνεῦμα συμμαρτυρεῖ τῷ πνεύματι ἡμῶν', word: 'αὐτὸ', use: 'intensive',
    english: 'himself', wrong: ['the same', 'it', 'him'], translation: 'the Spirit himself bears witness with our spirit',
    help: 'συμμαρτυρεῖ = bears witness with',
    note: 'αὐτό is neuter to agree with πνεῦμα. Translations usually say “the Spirit himself” because the Spirit is a person.',
  },
  {
    id: 'john-16-27', ref: 'John 16:27', text: 'αὐτὸς γὰρ ὁ πατὴρ φιλεῖ ὑμᾶς,', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'for the Father himself loves you,', help: 'φιλεῖ = loves',
  },
  {
    id: 'mark-12-36', ref: 'Mark 12:36', text: 'αὐτὸς Δαυὶδ εἶπεν ἐν τῷ πνεύματι τῷ ἁγίῳ·', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'David himself said by the Holy Spirit,',
  },
  {
    id: 'luke-24-15', ref: 'Luke 24:15', text: 'καὶ αὐτὸς Ἰησοῦς ἐγγίσας συνεπορεύετο αὐτοῖς,', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'Jesus himself drew near and went with them,',
    help: 'ἐγγίσας = drawing near · συνεπορεύετο = went with',
  },
  {
    id: 'practice-2', text: 'ὁ ἀπόστολος αὐτός', word: 'αὐτός', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the apostle himself',
  },
  {
    id: 'practice-3', text: 'αὐτὸς ὁ ἀπόστολος', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the apostle himself',
  },
  // Identical
  {
    id: '1cor-12-4', ref: '1 Cor 12:4', text: 'τὸ δὲ αὐτὸ πνεῦμα·', word: 'αὐτὸ', use: 'identical',
    english: 'the same', wrong: ['itself', 'it', 'himself'], translation: 'but the same Spirit',
    note: 'δέ always comes second in its clause, so it can sit between the article and αὐτό; τὸ … αὐτό still go together.',
  },
  {
    id: '1cor-12-5', ref: '1 Cor 12:5', text: 'καὶ ὁ αὐτὸς κύριος·', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'and the same Lord',
  },
  {
    id: '1cor-12-6', ref: '1 Cor 12:6', text: 'ὁ δὲ αὐτὸς θεός,', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'but the same God',
  },
  {
    id: 'heb-13-8', ref: 'Heb 13:8', text: 'Ἰησοῦς Χριστὸς ἐχθὲς καὶ σήμερον ὁ αὐτός, καὶ εἰς τοὺς αἰῶνας.', word: 'αὐτός', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'Jesus Christ is the same yesterday and today and forever.',
    help: 'ἐχθές = yesterday · σήμερον = today', note: 'ὁ αὐτός with no noun means “the same (one).” εἰς τοὺς αἰῶνας = “forever.”',
  },
  {
    id: 'rom-10-12', ref: 'Rom 10:12', text: 'ὁ γὰρ αὐτὸς κύριος πάντων,', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'for the same Lord is Lord of all,',
  },
  {
    id: 'mark-14-39', ref: 'Mark 14:39', text: 'τὸν αὐτὸν λόγον εἰπών.', word: 'αὐτὸν', use: 'identical',
    english: 'the same', wrong: ['himself', 'him', 'his'], translation: 'saying the same word.', help: 'εἰπών = saying',
  },
  {
    id: 'phil-2-2', ref: 'Phil 2:2', text: 'ἵνα τὸ αὐτὸ φρονῆτε,', word: 'αὐτὸ', use: 'identical',
    english: 'the same (thing)', wrong: ['itself', 'it', 'himself'], translation: 'so that you think the same thing,',
    help: 'φρονῆτε = you think', note: 'Neuter with the article and no noun: “the same thing.”',
  },
  {
    id: 'practice-4', text: 'ὁ αὐτὸς ἀπόστολος', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'the same apostle',
  },
  {
    id: 'practice-5', text: 'τὴν αὐτὴν ἐντολήν', word: 'αὐτὴν', use: 'identical',
    english: 'the same', wrong: ['herself', 'her', 'it'], translation: 'the same commandment',
  },
]

export const chapter12: Chapter = {
  number: 12,
  title: 'αὐτός',
  short: 'αὐτός',
  topics: ['autos'],
  vocab: [
    { id: 'aion', lemma: 'αἰών', lexical: 'αἰών, -ῶνος, ὁ', pos: 'noun', gloss: 'age, eternity; εἰς τὸν αἰῶνα: forever', hook: 'Eon (aeon): an age.', accept: ['age', 'eternity', 'forever'] },
    { id: 'didaskalos', lemma: 'διδάσκαλος', lexical: 'διδάσκαλος, -ου, ὁ', pos: 'noun', gloss: 'teacher', hook: 'Didactic: meant to teach.', accept: ['teacher'] },
    { id: 'euthys', lemma: 'εὐθύς', pos: 'adverb', gloss: 'immediately', accept: ['immediately', 'at once'] },
    preposition('heos'),
    { id: 'mathetes', lemma: 'μαθητής', lexical: 'μαθητής, -οῦ, ὁ', pos: 'noun', gloss: 'disciple', hook: 'Mathematics: from μάθημα, “what is learned.”', accept: ['disciple', 'pupil', 'student'] },
    { id: 'men', lemma: 'μέν', pos: 'conjunction', gloss: 'on the one hand, indeed (often untranslated)', accept: ['on the one hand', 'indeed', 'untranslated'] },
    { id: 'medeis', lemma: 'μηδείς', lexical: 'μηδείς, μηδεμία, μηδέν', pos: 'adjective', gloss: 'no one, nothing', accept: ['no one', 'nothing', 'none', 'nobody'] },
    { id: 'monos', lemma: 'μόνος', lexical: 'μόνος, -η, -ον', pos: 'adjective', gloss: 'alone, only', hook: 'Monologue, monotheism, monopoly: alone, only one.', accept: ['alone', 'only'] },
    { id: 'hopos', lemma: 'ὅπως', pos: 'conjunction', gloss: 'how, that, in order that', accept: ['how', 'that', 'in order that', 'so that'] },
    { id: 'hosos', lemma: 'ὅσος', lexical: 'ὅσος, -η, -ον', pos: 'adjective', gloss: 'as great as, as many as', accept: ['as great as', 'as many as', 'as much as'] },
    { id: 'oun', lemma: 'οὖν', pos: 'conjunction', gloss: 'therefore, then, accordingly', accept: ['therefore', 'then', 'accordingly', 'so'] },
    { id: 'ophthalmos', lemma: 'ὀφθαλμός', lexical: 'ὀφθαλμός, -οῦ, ὁ', pos: 'noun', gloss: 'eye, sight', hook: 'Ophthalmology: the study of the eye.', accept: ['eye', 'sight'] },
    { id: 'palin', lemma: 'πάλιν', pos: 'adverb', gloss: 'again', hook: 'Palindrome: a word that runs back again (“level”).', accept: ['again'] },
    { id: 'pous', lemma: 'πούς', lexical: 'πούς, ποδός, ὁ', pos: 'noun', gloss: 'foot', hook: 'Podiatrist (foot doctor), tripod, octopus (“eight-foot”).', accept: ['foot'] },
    preposition('hyper'),
  ],
  paradigms: [],
  autos: { paradigm: AUTOS, items: ITEMS, nouns: [AION, POUS] },
}

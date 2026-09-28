import { PAS_NOUNS } from './chapter10'
import type { Chapter, DeclensionParadigm, DemonstrativeItem, LookalikeItem, VocativeForm, VocativeItem } from './types'

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

// Longer verses from Mounce's workbook (Exercise 13) and Merkle & Plummer ch. 20, read in three steps.
const READINGS: DemonstrativeItem[] = [
  {
    id: 'john-10-18', ref: 'John 10:18', text: 'ταύτην τὴν ἐντολὴν ἔλαβον παρὰ τοῦ πατρός μου.', word: 'ταύτην', use: 'adjective',
    english: 'this', wrong: ['that', 'these', 'this is'], translation: 'I received this command from my Father.',
    sentenceWrong: ['This is the command I received from my Father.', 'I received that command from this Father.', 'She received the command from my Father.'],
    help: 'ἔλαβον = I received · παρά + gen = from',
    note: 'ταύτην agrees with τὴν ἐντολήν (accusative singular feminine) and stands outside the article: “this command.”',
  },
  {
    id: 'matt-22-38', ref: 'Matt 22:38', text: 'αὕτη ἐστὶν ἡ μεγάλη καὶ πρώτη ἐντολή.', word: 'αὕτη', use: 'pronoun',
    english: 'this', wrong: ['she', 'that', 'this great'], translation: 'This is the great and first commandment.',
    sentenceWrong: ['She is the great and first commandment.', 'This great commandment is first.', 'That is the great and first commandment.'],
    help: 'πρῶτος = first',
    note: 'αὕτη is the subject and ἡ … ἐντολή the predicate. αὕτη (rough breathing) is “this,” not αὐτή “she.”',
  },
  {
    id: 'john-13-17', ref: 'John 13:17', text: 'εἰ ταῦτα οἴδατε, μακάριοί ἐστε ἐὰν ποιῆτε αὐτά.', word: 'ταῦτα', use: 'pronoun',
    english: 'these things', wrong: ['this', 'those things', 'them'], translation: 'If you know these things, you are blessed if you do them.',
    sentenceWrong: ['If you know them, these are blessed if you do the same things.', 'If you know those things, you are blessed if you do these.', 'If they know these things, they are blessed if they do them.'],
    help: 'οἴδατε = you know · ἐάν = if · ποιῆτε = you do',
    note: 'ταῦτα (demonstrative, “these things”) and αὐτά (personal pronoun, “them”) look alike: watch the breathing and the τ.',
  },
  {
    id: 'john-4-39', ref: 'John 4:39', text: 'Ἐκ δὲ τῆς πόλεως ἐκείνης πολλοὶ ἐπίστευσαν εἰς αὐτὸν τῶν Σαμαριτῶν', word: 'ἐκείνης', use: 'adjective',
    english: 'that', wrong: ['this', 'those', 'he'], translation: 'And many of the Samaritans from that city believed in him',
    sentenceWrong: ['And that city believed in many of the Samaritans', 'And many from this city believed in the Samaritans', 'And from that city he believed in many Samaritans'],
    help: 'πόλις = city · ἐπίστευσαν = believed · Σαμαρίτης = Samaritan',
    note: 'πολλοί is used as a noun (“many”), and τῶν Σαμαριτῶν says many of whom.',
  },
  {
    id: 'john-8-47', ref: 'John 8:47', text: 'διὰ τοῦτο ὑμεῖς οὐκ ἀκούετε ὅτι ἐκ τοῦ θεοῦ οὐκ ἐστέ.', word: 'τοῦτο', use: 'pronoun',
    english: 'this (reason)', wrong: ['that', 'these things', 'him'], translation: 'For this reason you do not hear, because you are not from God.',
    sentenceWrong: ['Through this you hear, because you are from God.', 'For this reason we do not hear, because we are not from God.', 'You do not hear this, because you are not from God.'],
    help: 'ἀκούετε = you hear',
    note: 'διὰ τοῦτο (literally “because of this”) is a set phrase: “for this reason, therefore.”',
  },
  {
    id: '1john-3-3', ref: '1 John 3:3', text: 'καὶ πᾶς ὁ ἔχων τὴν ἐλπίδα ταύτην ἐπʼ αὐτῷ ἁγνίζει ἑαυτὸν καθὼς ἐκεῖνος ἁγνός ἐστιν.', word: 'ἐκεῖνος', use: 'pronoun',
    english: 'he', wrong: ['this', 'that hope', 'himself'], translation: 'And everyone who has this hope in him purifies himself, just as he is pure.',
    sentenceWrong: ['And everyone who has that hope purifies him, just as this one is pure.', 'And he who has all this hope purifies them, just as he is pure.', 'And everyone who has this hope in himself is pure, just as that one purifies.'],
    help: 'ὁ ἔχων = the one who has · ἁγνίζει = purifies · ἑαυτόν = himself · καθώς = just as · ἁγνός = pure',
    note: 'ἐκεῖνος has no noun here: it means “he” (Christ), as often in John’s writings. ἑαυτόν is the reflexive “himself.”',
  },
  {
    id: 'mark-11-28', ref: 'Mark 11:28', text: 'Ἐν ποίᾳ ἐξουσίᾳ ταῦτα ποιεῖς;', word: 'ταῦτα', use: 'pronoun',
    english: 'these things', wrong: ['this', 'those things', 'them'], translation: 'By what authority are you doing these things?',
    sentenceWrong: ['By this authority you do what things?', 'What authority are these things doing?', 'By what authority are they doing those things?'],
    help: 'ποῖος = what kind of · ἐξουσία = authority · ποιεῖς = you are doing',
  },
  {
    id: 'john-11-47', ref: 'John 11:47', text: 'Τί ποιοῦμεν ὅτι οὗτος ὁ ἄνθρωπος πολλὰ ποιεῖ σημεῖα;', word: 'οὗτος', use: 'adjective',
    english: 'this', wrong: ['this is', 'that', 'he'], translation: 'What are we doing, since this man is doing many signs?',
    sentenceWrong: ['What are we doing, since this is the man doing many signs?', 'What is this man doing with many signs?', 'Why are we doing many signs, since he is a man?'],
    help: 'ποιοῦμεν = we are doing · ποιεῖ = he is doing · σημεῖον = sign',
    note: 'πολλά agrees with σημεῖα even though other words stand between them.',
  },
  {
    id: 'matt-10-2', ref: 'Matt 10:2', text: 'τῶν δὲ δώδεκα ἀποστόλων τὰ ὀνόματά ἐστιν ταῦτα·', word: 'ταῦτα', use: 'pronoun',
    english: 'these', wrong: ['this', 'those', 'the same'], translation: 'And the names of the twelve apostles are these:',
    sentenceWrong: ['And these names are of the twelve apostles:', 'And the twelve apostles have those names:', 'And this is the name of the twelve apostles:'],
    help: 'δώδεκα = twelve · ὄνομα = name',
    note: 'ταῦτα is the predicate (“are these”), not part of τὰ ὀνόματα. A neuter plural subject can take a singular verb (ἐστιν).',
  },
  {
    id: 'john-14-20', ref: 'John 14:20', text: 'ἐν ἐκείνῃ τῇ ἡμέρᾳ γνώσεσθε ὑμεῖς ὅτι ἐγὼ ἐν τῷ πατρί μου', word: 'ἐκείνῃ', use: 'adjective',
    english: 'that', wrong: ['this', 'she', 'those'], translation: 'On that day you will know that I am in my Father',
    sentenceWrong: ['On this day you will know that I am in my Father', 'In her day you will know that I am in my Father', 'On that day I will know that you are in my Father'],
    help: 'γνώσεσθε = you will know',
    note: 'ἐν ἐκείνῃ τῇ ἡμέρᾳ: the dative (with ἐν) tells when.',
  },
  {
    id: 'mark-15-39', ref: 'Mark 15:39', text: 'Ἀληθῶς οὗτος ὁ ἄνθρωπος υἱὸς θεοῦ ἦν.', word: 'οὗτος', use: 'adjective',
    english: 'this', wrong: ['this is', 'that', 'he'], translation: 'Truly this man was God’s Son.',
    sentenceWrong: ['Truly this was the man, God’s Son.', 'Truly that Son of God was a man.', 'Truly he was the man of God’s Son.'],
    help: 'ἀληθῶς = truly',
    note: 'οὗτος ὁ ἄνθρωπος is the subject; υἱὸς θεοῦ (no article) is the predicate.',
  },
  {
    id: 'rom-8-9', ref: 'Rom 8:9', text: 'εἰ δέ τις πνεῦμα Χριστοῦ οὐκ ἔχει, οὗτος οὐκ ἔστιν αὐτοῦ.', word: 'οὗτος', use: 'pronoun',
    english: 'this person', wrong: ['that spirit', 'this spirit', 'the same'], translation: 'But if anyone does not have the Spirit of Christ, this person does not belong to him.',
    sentenceWrong: ['But if anyone does not have this Spirit of Christ, he is not the same.', 'But if the Spirit of Christ does not have anyone, this is not his.', 'But if anyone does not have the Spirit, this Christ is not his.'],
    help: 'τις = anyone',
    note: 'οὗτος points back to τις (“anyone”): “this person.” The genitive αὐτοῦ with εἰμί means “belongs to him.”',
  },
  {
    id: 'john-2-21', ref: 'John 2:21', text: 'ἐκεῖνος δὲ ἔλεγεν περὶ τοῦ ναοῦ τοῦ σώματος αὐτοῦ.', word: 'ἐκεῖνος', use: 'pronoun',
    english: 'he', wrong: ['this', 'that temple', 'the same'], translation: 'But he was speaking about the temple of his body.',
    sentenceWrong: ['But that temple was speaking about his body.', 'But this one was speaking about the body of the temple.', 'But he was speaking about that temple, his body.'],
    help: 'ἔλεγεν = he was speaking · ναός = temple',
    note: 'ἐκεῖνος sets Jesus against the people who misunderstood him in the verse before: “but he.”',
  },
  {
    id: 'mark-14-71', ref: 'Mark 14:71', text: 'Οὐκ οἶδα τὸν ἄνθρωπον τοῦτον ὃν λέγετε.', word: 'τοῦτον', use: 'adjective',
    english: 'this', wrong: ['that', 'him', 'this is'], translation: 'I do not know this man you are talking about.',
    sentenceWrong: ['I do not know the man; this is the one you mean.', 'You do not know this man I am talking about.', 'I do not know him, the man you are talking about.'],
    help: 'οἶδα = I know · ὅν = whom · λέγετε = you are talking about',
    note: 'Peter’s denial: τοῦτον stands after the noun, outside the article, and can sound dismissive (“this fellow”).',
  },
  {
    id: 'john-9-28', ref: 'John 9:28', text: 'Σὺ μαθητὴς εἶ ἐκείνου, ἡμεῖς δὲ τοῦ Μωϋσέως ἐσμὲν μαθηταί·', word: 'ἐκείνου', use: 'pronoun',
    english: 'that man’s', wrong: ['this man’s', 'of the same', 'those'], translation: 'You are that man’s disciple, but we are disciples of Moses.',
    sentenceWrong: ['You are this man’s disciple, but we are Moses’ disciples.', 'That disciple is yours, but we are disciples of Moses.', 'You are a disciple of Moses, but we are that man’s disciples.'],
    help: 'μαθητής = disciple',
    note: 'Contemptuous: the Pharisees won’t name Jesus. ἐκείνου “of that man” is set against τοῦ Μωϋσέως.',
  },
  {
    id: 'acts-9-36', ref: 'Acts 9:36', text: 'αὕτη ἦν πλήρης ἔργων ἀγαθῶν', word: 'αὕτη', use: 'pronoun',
    english: 'this woman', wrong: ['she herself', 'this man', 'that'], translation: 'This woman was full of good works',
    sentenceWrong: ['She herself was full of good works', 'This work was full of good women', 'That woman was full of the same works'],
    help: 'πλήρης = full (+ gen) · ἔργον = work',
    note: 'A feminine demonstrative with no noun, referring to Tabitha: English adds a helping word by natural gender, “this woman.”',
  },
  {
    id: 'rom-7-24', ref: 'Rom 7:24', text: 'τίς με ῥύσεται ἐκ τοῦ σώματος τοῦ θανάτου τούτου;', word: 'τούτου', use: 'adjective',
    english: 'this', wrong: ['that', 'these', 'his'], translation: 'Who will rescue me from this body of death?',
    sentenceWrong: ['Who will rescue this one from the body of death?', 'Who will rescue me from the death of that body?', 'Will anyone rescue me from his body of death?'],
    help: 'τίς = who? · ῥύσεται = will rescue',
    note: 'τούτου stands outside the article τοῦ θανάτου. It may go with θανάτου or with the whole phrase (“this body of death”); translations differ.',
  },
]

// Words that look alike: the demonstrative and αὐτός, ἤ and ἡ, crasis.
const LOOKALIKES: LookalikeItem[] = [
  {
    id: 'matt-22-38', ref: 'Matt 22:38', text: 'αὕτη ἐστὶν ἡ μεγάλη καὶ πρώτη ἐντολή.', word: 'αὕτη',
    answer: 'οὗτος: “this”', wrong: ['αὐτός: “she”', 'ὁ: “the”', 'αὐτός: “herself”'],
    note: 'Rough breathing and the accent on the first syllable: αὕτη is the demonstrative. αὐτή (smooth, accent on the last) would be “she.”',
  },
  {
    id: 'luke-2-37', ref: 'Luke 2:37', text: 'καὶ αὐτὴ χήρα ἕως ἐτῶν ὀγδοήκοντα τεσσάρων', word: 'αὐτὴ',
    answer: 'αὐτός: “she”', wrong: ['οὗτος: “this”', 'ὁ: “the”', 'οὗτος: “these”'],
    note: 'Smooth breathing and the accent on the last syllable: αὐτή is the personal pronoun, “she” (here: “and she was a widow until eighty-four”).',
  },
  {
    id: 'luke-21-22', ref: 'Luke 21:22', text: 'ὅτι ἡμέραι ἐκδικήσεως αὗταί εἰσιν', word: 'αὗταί',
    answer: 'οὗτος: “these”', wrong: ['αὐτός: “they”', 'αὐτός: “themselves”', 'ὁ: “the”'],
    note: 'αὗται has a rough breathing: “these are days of vengeance.” (The second accent comes from the enclitic εἰσιν.) αὐταί would be “they.”',
  },
  {
    id: 'acts-20-34', ref: 'Acts 20:34', text: 'ὑπηρέτησαν αἱ χεῖρες αὗται.', word: 'αὗται',
    answer: 'οὗτος: “these”', wrong: ['αὐτός: “they”', 'αὐτός: “themselves”', 'ὁ: “the”'],
    note: 'αὗται agrees with αἱ χεῖρες and stands outside the article: “these hands served.”',
  },
  {
    id: 'john-13-17a', ref: 'John 13:17', text: 'εἰ ταῦτα οἴδατε, μακάριοί ἐστε ἐὰν ποιῆτε αὐτά.', word: 'ταῦτα',
    answer: 'οὗτος: “these things”', wrong: ['αὐτός: “them”', 'αὐτός: “the same things”', 'ὁ: “the (things)”'],
    note: 'ταῦτα starts with τ: the demonstrative, “these things.”',
  },
  {
    id: 'john-13-17b', ref: 'John 13:17', text: 'ἐὰν ποιῆτε αὐτά.', word: 'αὐτά',
    answer: 'αὐτός: “them”', wrong: ['οὗτος: “these things”', 'αὐτός: “themselves”', 'ὁ: “the”'],
    note: 'αὐτά has a smooth breathing and no τ: the personal pronoun, “them” (the things just mentioned).',
  },
  {
    id: 'mark-13-32', ref: 'Mark 13:32', text: 'Περὶ δὲ τῆς ἡμέρας ἐκείνης ἢ τῆς ὥρας οὐδεὶς οἶδεν,', word: 'ἢ',
    answer: 'ἤ: “or”', wrong: ['ὁ: “the”', 'ἤ: “than”', 'οὗτος: “this”'],
    note: 'ἤ has a smooth breathing and an accent; the article ἡ has a rough breathing and none. Here it joins two nouns: “that day or hour.”',
  },
  {
    id: 'acts-20-35', ref: 'Acts 20:35', text: 'Μακάριόν ἐστιν μᾶλλον διδόναι ἢ λαμβάνειν.', word: 'ἢ',
    answer: 'ἤ: “than”', wrong: ['ἤ: “or”', 'ὁ: “the”', 'οὗτος: “this”'],
    note: 'After a comparison (μᾶλλον, “more”) ἤ means “than”: “It is more blessed to give than to receive.”',
  },
  {
    id: 'matt-22-38b', ref: 'Matt 22:38', text: 'αὕτη ἐστὶν ἡ μεγάλη καὶ πρώτη ἐντολή.', word: 'ἡ',
    answer: 'ὁ: “the”', wrong: ['ἤ: “or”', 'ἤ: “than”', 'οὗτος: “this”'],
    note: 'Rough breathing, no accent: the article ἡ, going with ἐντολή.',
  },
  {
    id: 'john-14-20', ref: 'John 14:20', text: 'καὶ ὑμεῖς ἐν ἐμοὶ κἀγὼ ἐν ὑμῖν.', word: 'κἀγὼ',
    answer: 'καί + ἐγώ: “and I”', wrong: ['καί + ἐμέ: “and me”', 'ἐγώ: “I myself”', 'καί + ἐμοί: “and to me”'],
    note: 'κἀγώ is crasis: καί and ἐγώ run together, with the ʼ (coronis) marking the join. “You in me, and I in you.”',
  },
  {
    id: 'john-17-6', ref: 'John 17:6', text: 'σοὶ ἦσαν κἀμοὶ αὐτοὺς ἔδωκας,', word: 'κἀμοὶ',
    answer: 'καί + ἐμοί: “and to me”', wrong: ['καί + ἐγώ: “and I”', 'καί + ἐμέ: “and me”', 'ἐμοί: “to me” only'],
    note: 'κἀμοί = καὶ ἐμοί: “they were yours, and you gave them to me.”',
  },
  {
    id: 'john-7-28', ref: 'John 7:28', text: 'Κἀμὲ οἴδατε καὶ οἴδατε πόθεν εἰμί·', word: 'Κἀμὲ',
    answer: 'καί + ἐμέ: “me too, and me”', wrong: ['καί + ἐγώ: “and I”', 'καί + ἐμοί: “and to me”', 'ἐμέ: “me” only'],
    note: 'κἀμέ = καὶ ἐμέ, an accusative, the object of οἴδατε: “you know me, and you know where I am from.”',
  },
]

// The vocative (Mounce §13.10). Every form here occurs as a vocative in the SBLGNT (checked against MorphGNT).
const VOCATIVE_FORMS: VocativeForm[] = [
  { lemma: 'κύριος', gloss: 'lord', declension: 2, number: 'sg', form: 'κύριε', wrong: ['κύριος', 'κυρίου', 'κύριον'] },
  { lemma: 'ἄνθρωπος', gloss: 'man, person', declension: 2, number: 'sg', form: 'ἄνθρωπε', wrong: ['ἄνθρωπος', 'ἀνθρώπου', 'ἄνθρωπον'] },
  { lemma: 'διδάσκαλος', gloss: 'teacher', declension: 2, number: 'sg', form: 'διδάσκαλε', wrong: ['διδάσκαλος', 'διδασκάλου', 'διδάσκαλον'] },
  { lemma: 'δοῦλος', gloss: 'slave, servant', declension: 2, number: 'sg', form: 'δοῦλε', wrong: ['δοῦλος', 'δούλου', 'δοῦλον'] },
  { lemma: 'ἀδελφός', gloss: 'brother', declension: 2, number: 'sg', form: 'ἀδελφέ', wrong: ['ἀδελφός', 'ἀδελφοῦ', 'ἀδελφόν'] },
  { lemma: 'υἱός', gloss: 'son', declension: 2, number: 'sg', form: 'υἱέ', wrong: ['υἱός', 'υἱοῦ', 'υἱόν'] },
  {
    lemma: 'τέκνον', gloss: 'child', declension: 2, number: 'sg', form: 'τέκνον', wrong: ['τέκνε', 'τέκνου', 'τέκνῳ'],
    note: 'A neuter’s vocative is the same as its nominative.',
  },
  {
    lemma: 'Ἰησοῦς', gloss: 'Jesus', declension: 2, number: 'sg', form: 'Ἰησοῦ', wrong: ['Ἰησοῦς', 'Ἰησοῦν', 'Ἰησέ'],
    note: 'Ἰησοῦς is irregular: the vocative Ἰησοῦ looks like the genitive and dative.',
  },
  {
    lemma: 'ψυχή', gloss: 'soul, life', declension: 1, number: 'sg', form: 'ψυχή', wrong: ['ψυχέ', 'ψυχῆς', 'ψυχήν'],
    note: 'Luke 12:19: Ψυχή, ἔχεις πολλὰ ἀγαθά.',
  },
  {
    lemma: 'πατήρ', gloss: 'father', declension: 3, number: 'sg', form: 'πάτερ', wrong: ['πατήρ', 'πατρός', 'πατέρα'],
    note: 'πατερ-, with the accent moved back.',
  },
  {
    lemma: 'γυνή', gloss: 'woman', declension: 3, number: 'sg', form: 'γύναι', wrong: ['γυνή', 'γυναικός', 'γυναῖκα'],
    note: 'The stem γυναικ- loses its final κ, which can’t end a Greek word.',
  },
  { lemma: 'ἀδελφός', gloss: 'brother', declension: 2, number: 'pl', form: 'ἀδελφοί', wrong: ['ἀδελφέ', 'ἀδελφούς', 'ἀδελφῶν'] },
  { lemma: 'ἀνήρ', gloss: 'man, husband', declension: 3, number: 'pl', form: 'ἄνδρες', wrong: ['ἄνδρας', 'ἀνδρῶν', 'ἄνερ'] },
  { lemma: 'ἀγαπητός', gloss: 'beloved', declension: 2, number: 'pl', form: 'ἀγαπητοί', wrong: ['ἀγαπητέ', 'ἀγαπητούς', 'ἀγαπητῶν'] },
]

const VOCATIVE_ITEMS: VocativeItem[] = [
  {
    id: 'matt-7-21', ref: 'Matt 7:21', text: 'Οὐ πᾶς ὁ λέγων μοι· Κύριε κύριε εἰσελεύσεται εἰς τὴν βασιλείαν τῶν οὐρανῶν,', word: 'Κύριε', case: 'vocative',
    translation: 'Not everyone who says to me, “Lord, Lord,” will enter the kingdom of heaven,', help: 'ὁ λέγων = the one who says · εἰσελεύσεται = will enter',
    note: 'Second declension: the vocative singular ends in ε.',
  },
  {
    id: 'acts-1-11', ref: 'Acts 1:11', text: 'Ἄνδρες Γαλιλαῖοι, τί ἑστήκατε βλέποντες εἰς τὸν οὐρανόν;', word: 'Ἄνδρες', case: 'vocative',
    translation: 'Men of Galilee, why do you stand looking into heaven?', help: 'ἑστήκατε = you stand · βλέποντες = looking',
    note: 'A plural vocative looks just like the nominative; the question addressed to them shows it is the vocative.',
  },
  {
    id: 'acts-1-16', ref: 'Acts 1:16', text: 'Ἄνδρες ἀδελφοί, ἔδει πληρωθῆναι τὴν γραφὴν', word: 'ἀδελφοί', case: 'vocative',
    translation: 'Men, brothers, the Scripture had to be fulfilled', help: 'ἔδει = it was necessary · πληρωθῆναι = to be fulfilled · γραφή = Scripture',
    note: 'Peter addresses the believers. ἀδελφοί looks nominative, but nothing in the sentence is its verb: it is a vocative.',
  },
  {
    id: 'luke-12-19', ref: 'Luke 12:19', text: 'καὶ ἐρῶ τῇ ψυχῇ μου· Ψυχή, ἔχεις πολλὰ ἀγαθὰ', word: 'Ψυχή', case: 'vocative',
    translation: 'And I will say to my soul, “Soul, you have many good things”', help: 'ἐρῶ = I will say · ἔχεις = you have',
    note: 'First declension: the vocative singular is the same as the nominative. ἔχεις (“you have”) shows ψυχή is being spoken to.',
  },
  {
    id: 'luke-5-20', ref: 'Luke 5:20', text: 'Ἄνθρωπε, ἀφέωνταί σοι αἱ ἁμαρτίαι σου.', word: 'Ἄνθρωπε', case: 'vocative',
    translation: 'Friend, your sins are forgiven you.', help: 'ἀφέωνται = are forgiven',
    note: 'Literally “Man,” but English says “Friend.”',
  },
  {
    id: 'matt-6-9', ref: 'Matt 6:9', text: 'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς·', word: 'Πάτερ', case: 'vocative',
    translation: 'Our Father in heaven,',
    note: 'Third declension: the bare stem πατερ-, with the accent moved to the first syllable.',
  },
  {
    id: 'john-2-4', ref: 'John 2:4', text: 'καὶ λέγει αὐτῇ ὁ Ἰησοῦς· Τί ἐμοὶ καὶ σοί, γύναι;', word: 'γύναι', case: 'vocative',
    translation: 'And Jesus says to her, “Woman, what does this have to do with me and you?”',
    note: 'γύναι is the vocative of γυνή. It was a polite form of address, not rude as “Woman!” can sound in English.',
  },
  {
    id: 'mark-10-17', ref: 'Mark 10:17', text: 'Διδάσκαλε ἀγαθέ, τί ποιήσω', word: 'Διδάσκαλε', case: 'vocative',
    translation: 'Good Teacher, what shall I do', help: 'ποιήσω = shall I do',
    note: 'The adjective agrees and is vocative too: ἀγαθέ.',
  },
  {
    id: 'luke-18-38', ref: 'Luke 18:38', text: 'Ἰησοῦ υἱὲ Δαυίδ, ἐλέησόν με.', word: 'Ἰησοῦ', case: 'vocative',
    translation: 'Jesus, Son of David, have mercy on me.', help: 'ἐλέησον = have mercy on',
    note: 'Ἰησοῦ looks like a genitive, but υἱέ next to it is clearly vocative, and the command shows Jesus is being addressed.',
  },
  {
    id: 'matt-9-2', ref: 'Matt 9:2', text: 'Θάρσει, τέκνον· ἀφίενταί σου αἱ ἁμαρτίαι.', word: 'τέκνον', case: 'vocative',
    translation: 'Take heart, child; your sins are forgiven.', help: 'θάρσει = take heart · ἀφίενται = are forgiven',
    note: 'A neuter vocative is the same as the nominative; the command θάρσει shows who is addressed.',
  },
  {
    id: 'matt-25-21', ref: 'Matt 25:21', text: 'Εὖ, δοῦλε ἀγαθὲ καὶ πιστέ,', word: 'δοῦλε', case: 'vocative',
    translation: 'Well done, good and faithful servant,', help: 'εὖ = well (done)',
  },
  {
    id: 'john-4-15a', ref: 'John 4:15', text: 'λέγει πρὸς αὐτὸν ἡ γυνή· Κύριε, δός μοι τοῦτο τὸ ὕδωρ,', word: 'γυνή', case: 'nominative',
    translation: 'The woman says to him, “Sir, give me this water,”', help: 'δός = give',
    note: 'ἡ γυνή has the article and is the subject of λέγει: nominative. The vocative in this verse is Κύριε.',
  },
  {
    id: 'john-4-15b', ref: 'John 4:15', text: 'λέγει πρὸς αὐτὸν ἡ γυνή· Κύριε, δός μοι τοῦτο τὸ ὕδωρ,', word: 'Κύριε', case: 'vocative',
    translation: 'The woman says to him, “Sir, give me this water,”', help: 'δός = give',
    note: 'κύριε here is a polite “sir.”',
  },
  {
    id: 'matt-3-17', ref: 'Matt 3:17', text: 'Οὗτός ἐστιν ὁ υἱός μου ὁ ἀγαπητός,', word: 'υἱός', case: 'nominative',
    translation: 'This is my beloved Son,',
    note: 'Here the Father speaks about the Son, not to him: ὁ υἱός is the predicate nominative. The vocative would be υἱέ.',
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
    readings: READINGS,
    lookalikes: LOOKALIKES,
    vocative: { forms: VOCATIVE_FORMS, items: VOCATIVE_ITEMS },
  },
}

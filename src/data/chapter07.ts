import { preposition } from './prepositions'
import type { CaseFunction, CaseNoun, Chapter, DeclensionParadigm, UseItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 7: Genitive and Dative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and practice notes are written for this app.

const noun = (id: string, lemma: string, lexical: string, gloss: string, forms: DeclensionParadigm['forms']): DeclensionParadigm =>
  ({ id, lemma, lexical, gloss, pattern: 'noun', forms })

const NOUNS: CaseNoun[] = [
  {
    paradigm: noun('kyrios', 'κύριος', 'κύριος, -ου, ὁ', 'lord', {
      masculine: { sg: ['κύριος', 'κυρίου', 'κυρίῳ', 'κύριον'], pl: ['κύριοι', 'κυρίων', 'κυρίοις', 'κυρίους'] },
    }),
    english: ['lord', 'lords'],
  },
  {
    paradigm: noun('ouranos', 'οὐρανός', 'οὐρανός, -οῦ, ὁ', 'heaven', {
      masculine: { sg: ['οὐρανός', 'οὐρανοῦ', 'οὐρανῷ', 'οὐρανόν'], pl: ['οὐρανοί', 'οὐρανῶν', 'οὐρανοῖς', 'οὐρανούς'] },
    }),
    english: ['heaven', 'heavens'],
  },
  {
    paradigm: noun('huios', 'υἱός', 'υἱός, -οῦ, ὁ', 'son', {
      masculine: { sg: ['υἱός', 'υἱοῦ', 'υἱῷ', 'υἱόν'], pl: ['υἱοί', 'υἱῶν', 'υἱοῖς', 'υἱούς'] },
    }),
    english: ['son', 'sons'],
  },
  {
    paradigm: noun('euangelion', 'εὐαγγέλιον', 'εὐαγγέλιον, -ου, τό', 'gospel', {
      neuter: { sg: ['εὐαγγέλιον', 'εὐαγγελίου', 'εὐαγγελίῳ', 'εὐαγγέλιον'], pl: ['εὐαγγέλια', 'εὐαγγελίων', 'εὐαγγελίοις', 'εὐαγγέλια'] },
    }),
    english: ['gospel', 'gospels'],
  },
  {
    paradigm: noun('hamartia', 'ἁμαρτία', 'ἁμαρτία, -ας, ἡ', 'sin', {
      feminine: { sg: ['ἁμαρτία', 'ἁμαρτίας', 'ἁμαρτίᾳ', 'ἁμαρτίαν'], pl: ['ἁμαρτίαι', 'ἁμαρτιῶν', 'ἁμαρτίαις', 'ἁμαρτίας'] },
    }),
    english: ['sin', 'sins'],
  },
  {
    paradigm: noun('exousia', 'ἐξουσία', 'ἐξουσία, -ας, ἡ', 'authority', {
      feminine: { sg: ['ἐξουσία', 'ἐξουσίας', 'ἐξουσίᾳ', 'ἐξουσίαν'], pl: ['ἐξουσίαι', 'ἐξουσιῶν', 'ἐξουσίαις', 'ἐξουσίας'] },
    }),
    english: ['authority', 'authorities'],
  },
  {
    paradigm: noun('arche', 'ἀρχή', 'ἀρχή, -ῆς, ἡ', 'beginning', {
      feminine: { sg: ['ἀρχή', 'ἀρχῆς', 'ἀρχῇ', 'ἀρχήν'], pl: ['ἀρχαί', 'ἀρχῶν', 'ἀρχαῖς', 'ἀρχάς'] },
    }),
    english: ['beginning', 'beginnings'],
  },
  {
    // Ἰησοῦς has one form for the genitive and the dative (Ἰησοῦ) and no plural.
    paradigm: noun('iesous', 'Ἰησοῦς', 'Ἰησοῦς, -οῦ, ὁ', 'Jesus', {
      masculine: { sg: ['Ἰησοῦς', 'Ἰησοῦ', 'Ἰησοῦ', 'Ἰησοῦν'] },
    }),
    english: ['Jesus'],
  },
]

type Use = UseItem<CaseFunction>

const USES: Use[] = [
  {
    id: 'matt-28-18-authority', ref: 'Matt 28:18', text: 'Ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ', word: 'ἐξουσία', use: 'subject',
    english: 'authority', wrong: ['of authority', 'to authority', 'in authority'],
    translation: 'All authority in heaven has been given to me.', help: 'ἐδόθη = was given · πᾶσα = all',
    note: 'The verb is passive: the authority is what was given, so it is the subject.',
  },
  {
    id: 'matt-28-18-me', ref: 'Matt 28:18', text: 'Ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ', word: 'μοι', use: 'indirect',
    english: 'to me', wrong: ['of me', 'me (object)', 'in me'],
    translation: 'All authority in heaven has been given to me.', help: 'ἐδόθη = was given · πᾶσα = all',
  },
  {
    id: 'matt-28-18-heaven', ref: 'Matt 28:18', text: 'Ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ', word: 'οὐρανῷ', use: 'place',
    english: 'in heaven', wrong: ['of heaven', 'to heaven', 'heaven (object)'],
    translation: 'All authority in heaven has been given to me.', help: 'ἐδόθη = was given · πᾶσα = all',
    note: 'A dative after ἐν says where.',
  },
  {
    id: 'john-1-1-beginning', ref: 'John 1:1', text: 'Ἐν ἀρχῇ ἦν ὁ λόγος', word: 'ἀρχῇ', use: 'place',
    english: 'in the beginning', wrong: ['of the beginning', 'to the beginning', 'the beginning (object)'],
    translation: 'In the beginning was the Word.', help: 'ἦν = was · λόγος = word',
    note: 'A dative after ἐν can say when as well as where.',
  },
  {
    id: 'matt-6-9-heavens', ref: 'Matt 6:9', text: 'Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς', word: 'οὐρανοῖς', use: 'place',
    english: 'in the heavens', wrong: ['of the heavens', 'to the heavens', 'the heavens (object)'],
    translation: 'Our Father who is in heaven', help: 'πατήρ = father · ἡμῶν = of us, our',
    note: 'Plural, so “in the heavens”; the Greek often puts heaven in the plural where we say “heaven.”',
  },
  {
    id: 'mark-1-1-gospel', ref: 'Mark 1:1', text: 'Ἀρχὴ τοῦ εὐαγγελίου', word: 'εὐαγγελίου', use: 'possession',
    english: 'of the gospel', wrong: ['to the gospel', 'the gospel (object)', 'in the gospel'],
    translation: 'The beginning of the gospel', help: 'ἀρχή = beginning',
  },
  {
    id: 'matt-4-17-heavens', ref: 'Matt 4:17', text: 'ἤγγικεν γὰρ ἡ βασιλεία τῶν οὐρανῶν', word: 'οὐρανῶν', use: 'possession',
    english: 'of the heavens', wrong: ['in the heavens', 'to the heavens', 'the heavens (object)'],
    translation: 'for the kingdom of heaven has come near', help: 'ἤγγικεν = has come near · βασιλεία = kingdom',
    note: 'The genitive plural ending -ῶν; the article τῶν is genitive plural as well.',
  },
  {
    id: 'john-1-34-god', ref: 'John 1:34', text: 'οὗτός ἐστιν ὁ ἐκλεκτὸς τοῦ θεοῦ', word: 'θεοῦ', use: 'possession',
    english: 'of God', wrong: ['to God', 'God (object)', 'in God'],
    translation: 'This is the chosen one of God.', help: 'ἐκλεκτός = chosen one',
  },
  {
    id: 'matt-1-20-lord', ref: 'Matt 1:20', text: 'ἄγγελος κυρίου κατʼ ὄναρ ἐφάνη αὐτῷ', word: 'κυρίου', use: 'possession',
    english: 'of the Lord', wrong: ['to the Lord', 'the Lord (object)', 'in the Lord'],
    translation: 'an angel of the Lord appeared to him in a dream', help: 'ἄγγελος = angel · ὄναρ = dream · ἐφάνη = appeared',
    note: 'No article, but the ending -ου still marks the genitive.',
  },
  {
    id: 'acts-12-2-john', ref: 'Acts 12:2', text: 'ἀνεῖλεν δὲ Ἰάκωβον τὸν ἀδελφὸν Ἰωάννου μαχαίρῃ', word: 'Ἰωάννου', use: 'possession',
    english: 'of John', wrong: ['to John', 'John (object)', 'with John'],
    translation: 'He killed James, the brother of John, with a sword.', help: 'ἀνεῖλεν = he killed · ἀδελφός = brother · μάχαιρα = sword',
    note: 'Genitive also covers relationships: “the brother of John.”',
  },
  {
    id: 'acts-12-2-sword', ref: 'Acts 12:2', text: 'ἀνεῖλεν δὲ Ἰάκωβον τὸν ἀδελφὸν Ἰωάννου μαχαίρῃ', word: 'μαχαίρῃ', use: 'means',
    english: 'with a sword', wrong: ['of a sword', 'to a sword', 'a sword (object)'],
    translation: 'He killed James, the brother of John, with a sword.', help: 'ἀνεῖλεν = he killed · ἀδελφός = brother · μάχαιρα = sword',
    note: 'The dative without a preposition can say how: the instrument or means.',
  },
  {
    id: 'john-3-3-jesus', ref: 'John 3:3', text: 'ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτῷ', word: 'Ἰησοῦς', use: 'subject',
    english: 'Jesus', wrong: ['of Jesus', 'to Jesus', 'Jesus (object)'],
    translation: 'Jesus answered and said to him', help: 'ἀπεκρίθη = answered · αὐτῷ = to him',
    note: 'Ἰησοῦς ends in -ς here: nominative. Ἰησοῦ would be genitive or dative.',
  },
  {
    id: 'john-3-3-him', ref: 'John 3:3', text: 'ἀπεκρίθη Ἰησοῦς καὶ εἶπεν αὐτῷ', word: 'αὐτῷ', use: 'indirect',
    english: 'to him', wrong: ['of him', 'him (object)', 'in him'],
    translation: 'Jesus answered and said to him', help: 'ἀπεκρίθη = answered',
    note: 'With verbs of speaking, the person spoken to is in the dative.',
  },
  {
    id: '1john-1-8-sin', ref: '1 John 1:8', text: 'ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν', word: 'ἁμαρτίαν', use: 'object',
    english: 'sin', wrong: ['of sin', 'to sin', 'in sin'],
    translation: 'If we say that we have no sin', help: 'ἐὰν εἴπωμεν = if we say · ἔχομεν = we have',
    note: 'The ending -ν and the verb ἔχομεν: sin is what we have, the direct object.',
  },
  {
    id: 'john-3-35-son', ref: 'John 3:35', text: 'ὁ πατὴρ ἀγαπᾷ τὸν υἱόν', word: 'υἱόν', use: 'object',
    english: 'the Son', wrong: ['of the Son', 'to the Son', 'in the Son'],
    translation: 'The Father loves the Son', help: 'πατήρ = father · ἀγαπᾷ = loves',
    note: 'Both ὁ πατήρ and τὸν υἱόν are people, and only the endings tell you who loves whom.',
  },
]

export const chapter07: Chapter = {
  number: 7,
  title: 'Genitive and Dative',
  short: 'Genitive & dative',
  topics: ['cases'],
  vocab: [
    { id: 'hamartia', lemma: 'ἁμαρτία', lexical: 'ἁμαρτία, -ας, ἡ', pos: 'noun', gloss: 'sin', hook: 'Hamartiology: the study of sin.', accept: ['sin'] },
    { id: 'arche', lemma: 'ἀρχή', lexical: 'ἀρχή, -ῆς, ἡ', pos: 'noun', gloss: 'beginning; ruler', hook: 'Archaeology, monarchy, patriarch: beginning and rule.', accept: ['beginning', 'ruler', 'rule'] },
    { id: 'gar', lemma: 'γάρ', pos: 'conjunction', gloss: 'for; then', accept: ['for', 'then'] },
    { id: 'eipen', lemma: 'εἶπεν', pos: 'verb', gloss: 'he/she/it said', accept: ['said', 'he said', 'she said', 'it said', 'he/she/it said'] },
    preposition('eis'),
    { id: 'exousia', lemma: 'ἐξουσία', lexical: 'ἐξουσία, -ας, ἡ', pos: 'noun', gloss: 'authority, power', accept: ['authority', 'power'] },
    { id: 'euangelion', lemma: 'εὐαγγέλιον', lexical: 'εὐαγγέλιον, -ου, τό', pos: 'noun', gloss: 'good news, Gospel', hook: 'Evangelist: εὖ (good) + ἄγγελος (messenger).', accept: ['good news', 'gospel'] },
    { id: 'iesous', lemma: 'Ἰησοῦς', lexical: 'Ἰησοῦς, -οῦ, ὁ', pos: 'noun', gloss: 'Jesus, Joshua', hook: 'The same name as Joshua (Hebrew Yeshua).', accept: ['jesus', 'joshua'] },
    { id: 'kyrios', lemma: 'κύριος', lexical: 'κύριος, -ου, ὁ', pos: 'noun', gloss: 'Lord; lord, master, sir', hook: 'Kyrie eleison: “Lord, have mercy.”', accept: ['lord', 'master', 'sir'] },
    { id: 'me', lemma: 'μή', pos: 'adverb', gloss: 'not, lest', accept: ['not', 'lest'] },
    { id: 'ouranos', lemma: 'οὐρανός', lexical: 'οὐρανός, -οῦ, ὁ', pos: 'noun', gloss: 'heaven, sky', hook: 'Uranus, the planet, is named for the sky god.', accept: ['heaven', 'sky', 'heavens'] },
    { id: 'houtos-pron', lemma: 'οὗτος', lexical: 'οὗτος, αὕτη, τοῦτο', pos: 'pronoun', gloss: 'this (one); he, she, it; these (they)', accept: ['this', 'this one', 'these', 'he', 'she', 'it', 'they'] },
    { id: 'sy', lemma: 'σύ', pos: 'pronoun', gloss: 'you (sg)', accept: ['you', 'you (sg)', 'thou'] },
    { id: 'huios-word', lemma: 'υἱός', lexical: 'υἱός, -οῦ, ὁ', pos: 'noun', gloss: 'son, descendant', accept: ['son', 'descendant'] },
    { id: 'hoste', lemma: 'ὥστε', pos: 'conjunction', gloss: 'therefore; so that', accept: ['therefore', 'so that', 'so'] },
  ],
  paradigms: [],
  cases: { nouns: NOUNS, uses: USES },
}

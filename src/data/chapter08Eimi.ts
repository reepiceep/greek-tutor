import type { EncliticItem, EncliticRule, PredicateItem, SubjectRule } from './types'

// Chapter 8's εἰμί topics beyond the paradigm: telling subject from predicate nominative, and enclitics.
// Items with a `ref` are from the SBLGNT (CC BY 4.0); the others are simple practice sentences written for this app.
// English translations are written for this app.

export const SUBJECT_RULES: Record<SubjectRule, { reason: string; explain: string }> = {
  pronoun: { reason: 'it is a pronoun', explain: 'A pronoun is always the subject, even when the other noun has the article.' },
  implied: { reason: 'the subject is built into the verb', explain: 'The verb’s ending supplies the subject, so the only nominative is the predicate.' },
  article: { reason: 'it has the article', explain: 'When there is no pronoun, the noun with the article is the subject.' },
  proper: { reason: 'it is a proper name', explain: 'When there is no pronoun or article, a proper name is the subject.' },
}

export const PREDICATES: PredicateItem[] = [
  {
    id: 'john-1-1c', ref: 'John 1:1', text: 'καὶ θεὸς ἦν ὁ λόγος.', subject: 'ὁ λόγος', predicate: 'θεὸς', rule: 'article',
    translation: 'and the Word was God', wrong: ['and God was the Word', 'and the Word is God', 'and God is the Word'],
  },
  {
    id: '1john-4-8', ref: '1 John 4:8', text: 'ὁ θεὸς ἀγάπη ἐστίν.', subject: 'ὁ θεὸς', predicate: 'ἀγάπη', rule: 'article',
    translation: 'God is love', wrong: ['love is God', 'God was love', 'love was God'],
  },
  {
    id: '1john-1-5', ref: '1 John 1:5', text: 'ὁ θεὸς φῶς ἐστιν', subject: 'ὁ θεὸς', predicate: 'φῶς', rule: 'article',
    help: 'φῶς = light', translation: 'God is light', wrong: ['light is God', 'God was light', 'you are light'],
  },
  {
    id: 'john-17-17', ref: 'John 17:17', text: 'ὁ λόγος ὁ σὸς ἀλήθειά ἐστιν.', subject: 'ὁ λόγος ὁ σὸς', predicate: 'ἀλήθειά', rule: 'article',
    help: 'σός = your · ἀλήθεια = truth', translation: 'your word is truth', wrong: ['the truth is your word', 'your word was truth', 'truth is in your word'],
  },
  {
    id: 'mark-2-28', ref: 'Mark 2:28', text: 'κύριός ἐστιν ὁ υἱὸς τοῦ ἀνθρώπου', subject: 'ὁ υἱὸς τοῦ ἀνθρώπου', predicate: 'κύριός', rule: 'article',
    translation: 'the Son of Man is lord', wrong: ['the Lord is the Son of Man', 'the Son of Man was lord', 'the Lord is a son of man'],
  },
  {
    id: 'john-6-35', ref: 'John 6:35', text: 'Ἐγώ εἰμι ὁ ἄρτος τῆς ζωῆς·', subject: 'Ἐγώ', predicate: 'ὁ ἄρτος τῆς ζωῆς', rule: 'pronoun',
    help: 'ἄρτος = bread', translation: 'I am the bread of life', wrong: ['the bread is my life', 'I was the bread of life', 'you are the bread of life'],
  },
  {
    id: 'john-8-12', ref: 'John 8:12', text: 'Ἐγώ εἰμι τὸ φῶς τοῦ κόσμου·', subject: 'Ἐγώ', predicate: 'τὸ φῶς τοῦ κόσμου', rule: 'pronoun',
    help: 'φῶς = light', translation: 'I am the light of the world', wrong: ['the world is my light', 'I was the light of the world', 'he is the light of the world'],
  },
  {
    id: 'john-14-6', ref: 'John 14:6', text: 'Ἐγώ εἰμι ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή·', subject: 'Ἐγώ', predicate: 'ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή', rule: 'pronoun',
    help: 'ὁδός = way · ἀλήθεια = truth', translation: 'I am the way and the truth and the life', wrong: ['I was the way and the truth and the life', 'we are the way and the truth and the life', 'the way and the truth are life'],
  },
  {
    id: 'mark-1-11', ref: 'Mark 1:11', text: 'Σὺ εἶ ὁ υἱός μου ὁ ἀγαπητός,', subject: 'Σὺ', predicate: 'ὁ υἱός μου ὁ ἀγαπητός', rule: 'pronoun',
    help: 'ἀγαπητός = beloved', translation: 'You are my beloved Son', wrong: ['my beloved Son is here', 'You were my beloved Son', 'I am your beloved Son'],
  },
  {
    id: 'john-4-19', ref: 'John 4:19', text: 'θεωρῶ ὅτι προφήτης εἶ σύ.', subject: 'σύ', predicate: 'προφήτης', rule: 'pronoun',
    help: 'θεωρῶ = I see', translation: 'I see that you are a prophet', wrong: ['I see that the prophet is here', 'I see that you were a prophet', 'I see that he is a prophet'],
  },
  {
    id: 'john-18-37', ref: 'John 18:37', text: 'Οὐκοῦν βασιλεὺς εἶ σύ;', subject: 'σύ', predicate: 'βασιλεὺς', rule: 'pronoun',
    help: 'οὐκοῦν = so then · βασιλεύς = king', translation: 'So you are a king?', wrong: ['So the king is here?', 'So you were a king?', 'So I am a king?'],
  },
  {
    id: 'matt-14-33', ref: 'Matt 14:33', text: 'Ἀληθῶς θεοῦ υἱὸς εἶ.', subject: 'you (in εἶ)', predicate: 'θεοῦ υἱὸς', rule: 'implied',
    help: 'ἀληθῶς = truly', translation: 'Truly you are the Son of God', wrong: ['Truly God is your son', 'Truly you were the Son of God', 'Truly he is the Son of God'],
  },
  {
    id: 'rom-1-16', ref: 'Rom 1:16', text: 'δύναμις γὰρ θεοῦ ἐστιν', subject: 'it (in ἐστιν)', predicate: 'δύναμις', rule: 'implied',
    help: 'δύναμις = power · γάρ = for (it refers to the gospel)', translation: 'for it is the power of God', wrong: ['for God is power', 'for it was the power of God', 'for they are the power of God'],
  },
  {
    id: 'practice-paulos', text: 'Παῦλος ἀπόστολός ἐστιν.', subject: 'Παῦλος', predicate: 'ἀπόστολός', rule: 'proper',
    translation: 'Paul is an apostle', wrong: ['the apostle is Paul', 'Paul was an apostle', 'you are an apostle'],
  },
  {
    id: 'practice-ioannes', text: 'προφήτης ἦν Ἰωάννης.', subject: 'Ἰωάννης', predicate: 'προφήτης', rule: 'proper',
    translation: 'John was a prophet', wrong: ['the prophet was with John', 'John is a prophet', 'the prophet was John'],
  },
  {
    id: 'practice-apostoloi', text: 'ἀπόστολοί ἐσμεν.', subject: 'we (in ἐσμεν)', predicate: 'ἀπόστολοί', rule: 'implied',
    translation: 'We are apostles', wrong: ['They are apostles', 'You are apostles', 'We were apostles'],
  },
  {
    id: 'practice-angelos', text: 'ἄγγελος εἶ.', subject: 'you (in εἶ)', predicate: 'ἄγγελος', rule: 'implied',
    translation: 'You are an angel', wrong: ['He is an angel', 'I am an angel', 'You were an angel'],
  },
]

export const ENCLITIC_RULES: Record<EncliticRule, { name: string; explain: string }> = {
  proparoxytone: {
    name: 'Acute on the third-last syllable: it gains a second acute on its last syllable',
    explain: 'A word accented on the third-last syllable takes the enclitic’s accent as an extra acute on its last syllable. The enclitic loses its accent.',
  },
  properispomenon: {
    name: 'Circumflex on the second-last syllable: it gains an acute on its last syllable',
    explain: 'A word with a circumflex on the second-last syllable takes an extra acute on its last syllable. The enclitic loses its accent.',
  },
  paroxytone: {
    name: 'Acute on the second-last syllable: nothing changes, and the enclitic keeps its accent',
    explain: 'After a word accented on the second-last syllable, a two-syllable enclitic (every enclitic form of εἰμί) keeps its own accent.',
  },
  oxytone: {
    name: 'Acute on the last syllable: it stays acute instead of turning grave',
    explain: 'An acute on the last syllable normally turns grave before another word, but before an enclitic it stays acute. The enclitic loses its accent.',
  },
  perispomenon: {
    name: 'Circumflex on the last syllable: nothing changes, and the enclitic loses its accent',
    explain: 'A word with a circumflex on its last syllable does not change, and the enclitic loses its accent.',
  },
  esti: {
    name: 'ἐστί(ν) is written ἔστι(ν) after οὐκ, καί and similar words, or at the start of a sentence',
    explain: 'ἐστί(ν) is accented on its first syllable, ἔστι(ν), at the start of a sentence, after οὐκ, καί, εἰ and a few similar words, and when it means “there is” or “it is possible.”',
  },
}

export const ENCLITIC_FORMS: { form: string; enclitic: boolean; label: string }[] = [
  { form: 'εἰμί', enclitic: true, label: 'I am' },
  { form: 'εἶ', enclitic: false, label: 'you are (sg)' },
  { form: 'ἐστί(ν)', enclitic: true, label: 'he/she/it is' },
  { form: 'ἐσμέν', enclitic: true, label: 'we are' },
  { form: 'ἐστέ', enclitic: true, label: 'you are (pl)' },
  { form: 'εἰσί(ν)', enclitic: true, label: 'they are' },
  { form: 'ἦν', enclitic: false, label: 'he/she/it was' },
]

export const ENCLITICS: EncliticItem[] = [
  { id: 'anthropos-eimi', ref: 'Acts 10:26', text: 'καὶ ἐγὼ αὐτὸς ἄνθρωπός εἰμι.', pair: 'ἄνθρωπός εἰμι', host: 'ἄνθρωπος', enclitic: 'εἰμί', rule: 'proparoxytone', options: ['ἄνθρωπός εἰμι', 'ἄνθρωπος εἰμί', 'ἄνθρωπος εἰμι', 'ἀνθρωπός εἰμι'] },
  { id: 'aletheia-estin', ref: 'John 17:17', text: 'ὁ λόγος ὁ σὸς ἀλήθειά ἐστιν.', pair: 'ἀλήθειά ἐστιν', host: 'ἀλήθεια', enclitic: 'ἐστί(ν)', rule: 'proparoxytone', options: ['ἀλήθειά ἐστιν', 'ἀλήθεια ἐστίν', 'ἀλήθεια ἐστιν'] },
  { id: 'kyrios-estin', ref: 'Mark 2:28', text: 'κύριός ἐστιν ὁ υἱὸς τοῦ ἀνθρώπου', pair: 'κύριός ἐστιν', host: 'κύριος', enclitic: 'ἐστί(ν)', rule: 'proparoxytone', options: ['κύριός ἐστιν', 'κύριος ἐστίν', 'κύριος ἐστιν'] },
  { id: 'makarioi-este', ref: 'Matt 5:11', text: 'μακάριοί ἐστε ὅταν ὀνειδίσωσιν ὑμᾶς', pair: 'μακάριοί ἐστε', host: 'μακάριοι', enclitic: 'ἐστέ', rule: 'proparoxytone', options: ['μακάριοί ἐστε', 'μακάριοι ἐστέ', 'μακάριοι ἐστε'] },
  { id: 'ioudaios-eimi', ref: 'John 18:35', text: 'Μήτι ἐγὼ Ἰουδαῖός εἰμι;', pair: 'Ἰουδαῖός εἰμι', host: 'Ἰουδαῖος', enclitic: 'εἰμί', rule: 'properispomenon', options: ['Ἰουδαῖός εἰμι', 'Ἰουδαῖος εἰμί', 'Ἰουδαῖος εἰμι'] },
  { id: 'soma-esmen', ref: 'Rom 12:5', text: 'οὕτως οἱ πολλοὶ ἓν σῶμά ἐσμεν ἐν Χριστῷ,', pair: 'σῶμά ἐσμεν', host: 'σῶμα', enclitic: 'ἐσμέν', rule: 'properispomenon', options: ['σῶμά ἐσμεν', 'σῶμα ἐσμέν', 'σῶμα ἐσμεν'] },
  { id: 'agape-estin', ref: '1 John 4:8', text: 'ὅτι ὁ θεὸς ἀγάπη ἐστίν.', pair: 'ἀγάπη ἐστίν', host: 'ἀγάπη', enclitic: 'ἐστί(ν)', rule: 'paroxytone', options: ['ἀγάπη ἐστίν', 'ἀγάπη ἐστιν', 'ἀγάπή ἐστιν'] },
  { id: 'ego-eimi', ref: 'John 8:12', text: 'Ἐγώ εἰμι τὸ φῶς τοῦ κόσμου·', pair: 'Ἐγώ εἰμι', host: 'ἐγώ', enclitic: 'εἰμί', rule: 'oxytone', options: ['ἐγώ εἰμι', 'ἐγὼ εἰμι', 'ἐγὼ εἰμί', 'ἐγώ εἰμί'] },
  { id: 'nazarenos-estin', ref: 'Mark 10:47', text: 'ὅτι Ἰησοῦς ὁ Ναζαρηνός ἐστιν', pair: 'Ναζαρηνός ἐστιν', host: 'Ναζαρηνός', enclitic: 'ἐστί(ν)', rule: 'oxytone', options: ['Ναζαρηνός ἐστιν', 'Ναζαρηνὸς ἐστιν', 'Ναζαρηνὸς ἐστίν'] },
  { id: 'phos-estin', ref: '1 John 1:5', text: 'ὅτι ὁ θεὸς φῶς ἐστιν', pair: 'φῶς ἐστιν', host: 'φῶς', enclitic: 'ἐστί(ν)', rule: 'perispomenon', options: ['φῶς ἐστιν', 'φῶς ἐστίν', 'φώς ἐστιν'] },
  { id: 'theou-estin', ref: 'Rom 1:16', text: 'δύναμις γὰρ θεοῦ ἐστιν εἰς σωτηρίαν', pair: 'θεοῦ ἐστιν', host: 'θεοῦ', enclitic: 'ἐστί(ν)', rule: 'perispomenon', options: ['θεοῦ ἐστιν', 'θεοῦ ἐστίν', 'θεού ἐστιν'] },
  { id: 'ouk-estin', ref: 'Matt 10:24', text: 'Οὐκ ἔστιν μαθητὴς ὑπὲρ τὸν διδάσκαλον', pair: 'Οὐκ ἔστιν', host: 'οὐκ', enclitic: 'ἐστί(ν)', rule: 'esti', options: ['οὐκ ἔστιν', 'οὐκ ἐστιν', 'οὐκ ἐστίν'] },
  { id: 'kai-estin', ref: '1 John 1:5', text: 'Καὶ ἔστιν αὕτη ἡ ἀγγελία', pair: 'Καὶ ἔστιν', host: 'καί', enclitic: 'ἐστί(ν)', rule: 'esti', options: ['καὶ ἔστιν', 'καὶ ἐστιν', 'καὶ ἐστίν'] },
]

import type { D3Reading, DeclensionParadigm, RuleItem } from './types'

// Chapter 10 additions from checking Mounce's textbook and workbook and Merkle & Plummer ch. 14: more charts, verses to
// parse and translate, and drills on declension, gender, πᾶς and look-alikes. Verse text is SBLGNT, checked against MorphGNT.

export const MORE_D3: DeclensionParadigm[] = [
  {
    id: 'soma', lemma: 'σῶμα', lexical: 'σῶμα, -ματος, τό', gloss: 'body', pattern: 'noun',
    forms: { neuter: { sg: ['σῶμα', 'σώματος', 'σώματι', 'σῶμα'], pl: ['σώματα', 'σωμάτων', 'σώμασι(ν)', 'σώματα'] } },
  },
  {
    id: 'pneuma', lemma: 'πνεῦμα', lexical: 'πνεῦμα, -ατος, τό', gloss: 'spirit', pattern: 'noun',
    forms: { neuter: { sg: ['πνεῦμα', 'πνεύματος', 'πνεύματι', 'πνεῦμα'], pl: ['πνεύματα', 'πνευμάτων', 'πνεύμασι(ν)', 'πνεύματα'] } },
  },
  {
    id: 'simon', lemma: 'Σίμων', lexical: 'Σίμων, -ωνος, ὁ', gloss: 'Simon', pattern: 'noun',
    forms: { masculine: { sg: ['Σίμων', 'Σίμωνος', 'Σίμωνι', 'Σίμωνα'] } },
  },
  {
    // Enclitic: written here with the accents of the longer forms when they have one (Mounce 10.11).
    id: 'tis-i', lemma: 'τις', lexical: 'τις, τι', gloss: 'someone, something', pattern: 'pronoun',
    forms: {
      masculine: { sg: ['τις', 'τινός', 'τινί', 'τινά'], pl: ['τινές', 'τινῶν', 'τισί(ν)', 'τινάς'] },
      feminine: { sg: ['τις', 'τινός', 'τινί', 'τινά'], pl: ['τινές', 'τινῶν', 'τισί(ν)', 'τινάς'] },
      neuter: { sg: ['τι', 'τινός', 'τινί', 'τι'], pl: ['τινά', 'τινῶν', 'τισί(ν)', 'τινά'] },
    },
  },
  {
    id: 'oudeis', lemma: 'οὐδείς', lexical: 'οὐδείς, οὐδεμία, οὐδέν', gloss: 'no one, nothing', pattern: '3-1-3',
    forms: {
      masculine: { sg: ['οὐδείς', 'οὐδενός', 'οὐδενί', 'οὐδένα'] },
      feminine: { sg: ['οὐδεμία', 'οὐδεμιᾶς', 'οὐδεμιᾷ', 'οὐδεμίαν'] },
      neuter: { sg: ['οὐδέν', 'οὐδενός', 'οὐδενί', 'οὐδέν'] },
    },
  },
]

export const D3_READINGS: D3Reading[] = [
  {
    id: 'mark-9-37', ref: 'Mark 9:37', text: 'Ὃς ἂν ἓν τῶν τοιούτων παιδίων δέξηται ἐπὶ τῷ ὀνόματί μου, ἐμὲ δέχεται·',
    word: 'ὀνόματί', form: 'ὀνόματι', paradigm: 'onoma', case: 'dative', number: 'sg', gender: 'neuter',
    help: 'ὃς ἄν whoever · τοιούτων such · παιδίων children · δέξηται receives · ἐπί in · ἐμέ me · δέχεται receives',
    translation: 'Whoever receives one of such children in my name receives me;',
    wrong: [
      'Whoever receives such a child receives my name;',
      'Whoever receives one of such children in his name receives them;',
      'One of such children receives me in my name;',
    ],
    note: 'ὀνόματί has a second accent because the enclitic μου follows. ἕν (rough breathing) is “one,” not the preposition ἐν.',
  },
  {
    id: 'matt-19-5', ref: 'Matt 19:5', text: 'καὶ ἔσονται οἱ δύο εἰς σάρκα μίαν',
    word: 'σάρκα', paradigm: 'sarx', case: 'accusative', number: 'sg', gender: 'feminine',
    help: 'ἔσονται they will be · δύο two',
    translation: 'and the two will become one flesh',
    wrong: [
      'and the one will become two flesh',
      'and they will be two in the flesh',
      'and the two will be into one another’s flesh',
    ],
    note: 'σάρκα: stem σαρκ- + accusative -α. μίαν (feminine of εἷς) agrees with it. With ἔσονται, εἰς means “become.”',
  },
  {
    id: 'matt-12-48', ref: 'Matt 12:48', text: 'Τίς ἐστιν ἡ μήτηρ μου, καὶ τίνες εἰσὶν οἱ ἀδελφοί μου;',
    word: 'τίνες', paradigm: 'tis', case: 'nominative', number: 'pl', gender: 'masculine',
    help: 'μήτηρ mother · ἀδελφοί brothers · ; = ?',
    translation: 'Who is my mother, and who are my brothers?',
    wrong: [
      'Someone is my mother, and some are my brothers.',
      'Who is the mother of my brothers?',
      'Why is she my mother, and why are they my brothers?',
    ],
    note: 'τίνες keeps its acute on the first syllable: the interrogative “who?”, nominative plural to match οἱ ἀδελφοί.',
  },
  {
    id: 'john-3-26', ref: 'John 3:26', text: 'ἴδε οὗτος βαπτίζει καὶ πάντες ἔρχονται πρὸς αὐτόν.',
    word: 'πάντες', paradigm: 'pas', case: 'nominative', number: 'pl', gender: 'masculine',
    help: 'ἴδε look · οὗτος this man · βαπτίζει is baptizing · ἔρχονται are going',
    translation: 'Look, this man is baptizing, and all are going to him.',
    wrong: [
      'Look, this man is baptizing all, and they are going to him.',
      'Look, this man is baptizing, and he is going to all of them.',
      'Look, everyone is baptizing, and this man is going to them.',
    ],
    note: 'πάντες stands alone: “all (people),” nominative because it is the subject of ἔρχονται.',
  },
  {
    id: 'luke-1-49', ref: 'Luke 1:49', text: 'καὶ ἅγιον τὸ ὄνομα αὐτοῦ,',
    word: 'ὄνομα', paradigm: 'onoma', case: 'nominative', number: 'sg', gender: 'neuter',
    help: 'ἅγιον holy · αὐτοῦ his',
    translation: 'and holy is his name,',
    wrong: [
      'and his holy name,',
      'and he made his name holy,',
      'and the holy one is his name,',
    ],
    note: 'τὸ ὄνομα has the article and ἅγιον doesn’t, so ἅγιον is a predicate: “holy is his name.” ὄνομα is the subject here; a neuter looks the same in the nominative and accusative.',
  },
  {
    id: 'john-2-21', ref: 'John 2:21', text: 'ἐκεῖνος δὲ ἔλεγεν περὶ τοῦ ναοῦ τοῦ σώματος αὐτοῦ.',
    word: 'σώματος', paradigm: 'soma', case: 'genitive', number: 'sg', gender: 'neuter',
    help: 'ἐκεῖνος he · ἔλεγεν was speaking · ναοῦ temple',
    translation: 'But he was speaking about the temple of his body.',
    wrong: [
      'But he was speaking about his temple and body.',
      'But he was speaking around the temple with his body.',
      'But his body was speaking about the temple.',
    ],
    note: 'In the third declension -ος is genitive singular, not nominative: τοῦ σώματος, “of the body.” περί + genitive is “about.”',
  },
  {
    id: 'mark-10-18', ref: 'Mark 10:18', text: 'Τί με λέγεις ἀγαθόν; οὐδεὶς ἀγαθὸς εἰ μὴ εἷς ὁ θεός.',
    word: 'εἷς', paradigm: 'heis', case: 'nominative', number: 'sg', gender: 'masculine',
    help: 'με me · λέγεις do you call',
    translation: 'Why do you call me good? No one is good except God alone.',
    wrong: [
      'Why do you call me good? No one is good if God is not one.',
      'Who calls me good? No one but God is one.',
      'Why do you call me good? Only one is good, not God.',
    ],
    note: 'Τί (neuter, accented) means “why?” με and ἀγαθόν are both accusative: a double accusative, “call me good.” εἰ μή is “except,” and εἷς (rough breathing, circumflex) is “one”: “no one is good except one, God.”',
  },
  {
    id: '1cor-12-3', ref: '1 Cor 12:3', text: 'καὶ οὐδεὶς δύναται εἰπεῖν· Κύριος Ἰησοῦς εἰ μὴ ἐν πνεύματι ἁγίῳ.',
    word: 'πνεύματι', paradigm: 'pneuma', case: 'dative', number: 'sg', gender: 'neuter',
    help: 'δύναται is able · εἰπεῖν to say',
    translation: 'and no one is able to say, “Jesus is Lord,” except by the Holy Spirit.',
    wrong: [
      'and no one is able to say, “Jesus is Lord,” if he is not holy in spirit.',
      'and no one is able to say to the Holy Spirit, “Jesus is Lord.”',
      'and everyone is able to say, “Jesus is Lord,” by the Holy Spirit.',
    ],
    note: 'εἰ μή is “except.” πνεύματι: stem πνευματ- + dative -ι, the object of ἐν; ἁγίῳ agrees with it.',
  },
  {
    id: '1cor-9-22', ref: '1 Cor 9:22', text: 'τοῖς πᾶσιν γέγονα πάντα, ἵνα πάντως τινὰς σώσω.',
    word: 'πᾶσιν', form: 'πᾶσι(ν)', paradigm: 'pas', case: 'dative', number: 'pl', gender: 'masculine',
    help: 'γέγονα I have become · πάντως by all means · σώσω I might save',
    translation: 'I have become all things to all people, so that by all means I might save some.',
    wrong: [
      'I have become all people to all things, so that I might save everything.',
      'All people have become all things to me, so that I might save some.',
      'I have become some things to some people, so that I might save all.',
    ],
    note: 'τοῖς πᾶσιν (“to all”) and πάντα (neuter plural, “all things”) both stand alone as nouns. τινάς is the indefinite τις: “some.”',
  },
  {
    id: 'luke-7-35', ref: 'Luke 7:35', text: 'καὶ ἐδικαιώθη ἡ σοφία ἀπὸ πάντων τῶν τέκνων αὐτῆς.',
    word: 'πάντων', paradigm: 'pas', case: 'genitive', number: 'pl', gender: 'neuter', head: 'τέκνων', decoys: ['σοφία', 'ἐδικαιώθη'],
    help: 'ἐδικαιώθη is vindicated · σοφία wisdom · αὐτῆς her',
    translation: 'And wisdom is vindicated by all her children.',
    wrong: [
      'And all wisdom is vindicated by her children.',
      'And wisdom vindicates all her children.',
      'And wisdom is vindicated by the whole of her child.',
    ],
    note: 'πάντων stands before the article: “all the children.” It agrees with τέκνων (genitive plural neuter, second declension); πᾶς agrees across declensions.',
  },
  {
    id: 'rom-8-9', ref: 'Rom 8:9', text: 'Ὑμεῖς δὲ οὐκ ἐστὲ ἐν σαρκὶ ἀλλὰ ἐν πνεύματι,',
    word: 'σαρκὶ', form: 'σαρκί', paradigm: 'sarx', case: 'dative', number: 'sg', gender: 'feminine',
    help: 'Ὑμεῖς you',
    translation: 'But you are not in the flesh but in the Spirit,',
    wrong: [
      'But you are not flesh but spirit,',
      'But you are in the flesh and not in the Spirit,',
      'But the flesh is not in you, but the Spirit is,',
    ],
    note: 'σαρκί: stem σαρκ- + dative -ι. Both phrases leave out the article, and English puts “the” back.',
  },
  {
    id: '1cor-2-12', ref: '1 Cor 2:12', text: 'ἡμεῖς δὲ οὐ τὸ πνεῦμα τοῦ κόσμου ἐλάβομεν ἀλλὰ τὸ πνεῦμα τὸ ἐκ τοῦ θεοῦ,',
    word: 'πνεῦμα', paradigm: 'pneuma', case: 'accusative', number: 'sg', gender: 'neuter',
    help: 'ἡμεῖς we · ἐλάβομεν we received',
    translation: 'But we did not receive the spirit of the world but the Spirit who is from God,',
    wrong: [
      'But the spirit of the world did not receive us, but the Spirit from God did,',
      'But we did not receive the world’s spirit or the Spirit from God,',
      'But we received the spirit of the world and not God,',
    ],
    note: 'τὸ πνεῦμα is accusative, the object of ἐλάβομεν (a neuter looks the same in the nominative and accusative). τὸ ἐκ τοῦ θεοῦ is article + phrase: “the one from God.”',
  },
  {
    id: 'eph-1-15', ref: 'Eph 1:15', text: 'καὶ τὴν ἀγάπην τὴν εἰς πάντας τοὺς ἁγίους,',
    word: 'πάντας', paradigm: 'pas', case: 'accusative', number: 'pl', gender: 'masculine', head: 'ἁγίους', decoys: ['ἀγάπην'],
    help: 'ἀγάπην love · ἁγίους saints',
    translation: 'and the love that is toward all the saints,',
    wrong: [
      'and the love of all the saints,',
      'and all the love toward the saints,',
      'and the love that is in every saint,',
    ],
    note: 'τὴν εἰς πάντας τοὺς ἁγίους is article + phrase, telling which love. πάντας stands before the article: “all the saints.”',
  },
  {
    id: 'john-1-14', ref: 'John 1:14', text: 'Καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν,',
    word: 'σὰρξ', form: 'σάρξ', paradigm: 'sarx', case: 'nominative', number: 'sg', gender: 'feminine',
    help: 'ἐγένετο became · ἐσκήνωσεν dwelt · ἡμῖν us',
    translation: 'And the Word became flesh and dwelt among us,',
    wrong: [
      'And the flesh became the Word and dwelt among us,',
      'And the Word became flesh and we dwelt in him,',
      'And the word of the flesh dwelt among us,',
    ],
    note: 'σάρξ is σαρκ + ς (velar + σ → ξ). It is nominative, a predicate after ἐγένετο; ὁ λόγος has the article, so it is the subject.',
  },
  {
    id: 'john-1-3', ref: 'John 1:3', text: 'πάντα διʼ αὐτοῦ ἐγένετο, καὶ χωρὶς αὐτοῦ ἐγένετο οὐδὲ ἕν.',
    word: 'πάντα', paradigm: 'pas', case: 'nominative', number: 'pl', gender: 'neuter',
    help: 'ἐγένετο came into being · χωρίς without · οὐδὲ ἕν not even one thing',
    translation: 'All things came into being through him, and without him not one thing came into being.',
    wrong: [
      'All people came into being through him, and without him no one came into being.',
      'He came into being through all things, and without them nothing came into being.',
      'Everything came into being without him, and through him not one thing.',
    ],
    note: 'πάντα alone and neuter plural: “all things.” A neuter plural subject takes a singular verb (ἐγένετο). ἕν (rough breathing) is “one,” not the preposition ἐν.',
  },
  {
    id: 'john-1-18', ref: 'John 1:18', text: 'θεὸν οὐδεὶς ἑώρακεν πώποτε·',
    word: 'οὐδεὶς', form: 'οὐδείς', paradigm: 'oudeis', case: 'nominative', number: 'sg', gender: 'masculine',
    help: 'ἑώρακεν has seen · πώποτε ever',
    translation: 'No one has ever seen God;',
    wrong: [
      'God has never seen anyone;',
      'Someone has seen God at some time;',
      'God is someone no one has seen;',
    ],
    note: 'οὐδείς is nominative, the subject. θεόν is accusative, the object, even though it comes first.',
  },
]

const DECL = 'first declension'
const DECL2 = 'second declension'
const DECL3 = 'third declension'
const WHICH = 'Which declension?'
const CASE = 'What case and number? Use the article.'
const GENDER = 'What gender is it?'

export const D3_FORMS: RuleItem[] = [
  { id: 'decl-sarkos', prompt: 'σαρκός', ask: WHICH, english: true, options: [DECL3, DECL2, DECL], rule: 'A genitive in -ος belongs to the third declension; the second declension genitive is -ου (λόγου).' },
  { id: 'decl-logou', prompt: 'λόγου', ask: WHICH, english: true, options: [DECL2, DECL3, DECL], rule: 'Genitive singular -ου: second declension (stem λογο-).' },
  { id: 'decl-onomata', prompt: 'ὀνόματα', ask: WHICH, english: true, options: [DECL3, DECL2, DECL], rule: 'The stem ὀνοματ- ends in a consonant, so it is third declension. (Neuter plurals end in -α in every declension.)' },
  { id: 'decl-hemeras', prompt: 'ἡμέρας', ask: WHICH, english: true, options: [DECL, DECL2, DECL3], rule: 'Stem ἡμερα-: first declension, α after ρ.' },
  { id: 'decl-tekna', prompt: 'τέκνα', ask: WHICH, english: true, options: [DECL2, DECL3, DECL], rule: 'τέκνον, -ου, τό: a second declension neuter (stem τεκνο-).' },
  { id: 'decl-somati', prompt: 'σώματι', ask: WHICH, english: true, options: [DECL3, DECL2, DECL], rule: 'A dative in plain -ι (no iota subscript) is third declension: σωματ- + ι.' },
  { id: 'decl-simona', prompt: 'Σίμωνα', ask: WHICH, english: true, options: [DECL3, DECL2, DECL], rule: 'Σίμων, -ωνος: stem Σιμων- ends in ν, third declension; the accusative singular is -α.' },
  { id: 'decl-kardia', prompt: 'καρδίᾳ', ask: WHICH, english: true, options: [DECL, DECL2, DECL3], rule: 'Iota subscript under α: first declension dative.' },
  { id: 'case-tes-sarkos', prompt: 'τῆς σαρκός', ask: CASE, english: true, options: ['genitive singular', 'nominative singular', 'accusative plural', 'dative singular'], rule: 'τῆς is genitive singular feminine, so σαρκός is too: -ος is the 3rd-declension genitive.' },
  { id: 'case-ho-logos', prompt: 'ὁ λόγος', ask: CASE, english: true, options: ['nominative singular', 'genitive singular', 'accusative singular', 'nominative plural'], rule: 'ὁ is nominative singular masculine: here -ος is the 2nd-declension nominative.' },
  { id: 'case-to-soma', prompt: 'τὸ σῶμα', ask: CASE, english: true, options: ['nominative or accusative singular', 'genitive singular', 'dative singular', 'nominative plural'], rule: 'τό is nominative or accusative singular neuter; the sentence decides which.' },
  { id: 'case-tas-sarkas', prompt: 'τὰς σάρκας', ask: CASE, english: true, options: ['accusative plural', 'genitive singular', 'nominative plural', 'dative plural'], rule: 'τάς is accusative plural feminine; -ας is the 3rd-declension accusative plural.' },
  { id: 'case-ten-sarka', prompt: 'τὴν σάρκα', ask: CASE, english: true, options: ['accusative singular', 'nominative plural', 'genitive singular', 'dative singular'], rule: 'τήν is accusative singular: -α is the 3rd-declension accusative singular, not a neuter plural.' },
  { id: 'case-ta-onomata', prompt: 'τὰ ὀνόματα', ask: CASE, english: true, options: ['nominative or accusative plural', 'accusative singular', 'genitive plural', 'dative singular'], rule: 'τά is nominative or accusative plural neuter.' },
  { id: 'case-tois-somasin', prompt: 'τοῖς σώμασιν', ask: CASE, english: true, options: ['dative plural', 'dative singular', 'accusative plural', 'genitive plural'], rule: 'τοῖς is dative plural: σωματ + σι(ν) → σώμασι(ν), the τ dropping before σ.' },
  { id: 'gender-onoma', prompt: 'ὄνομα, -ματος', ask: GENDER, english: true, options: ['neuter', 'masculine', 'feminine'], gloss: 'name', rule: 'Nouns in -μα are always neuter: τὸ ὄνομα.' },
  { id: 'gender-pneuma', prompt: 'πνεῦμα, -ατος', ask: GENDER, english: true, options: ['neuter', 'masculine', 'feminine'], gloss: 'spirit', rule: 'Nouns in -μα are always neuter: τὸ πνεῦμα. (The grammatical gender says nothing about who the Spirit is.)' },
  { id: 'gender-sarx', prompt: 'σάρξ, σαρκός', ask: GENDER, english: true, options: ['feminine', 'masculine', 'neuter'], gloss: 'flesh', rule: 'ἡ σάρξ: nothing in the form tells you, so learn the article with the word.' },
  { id: 'gender-simon', prompt: 'Σίμων, -ωνος', ask: GENDER, english: true, options: ['masculine', 'feminine', 'neuter'], gloss: 'Simon', rule: 'ὁ Σίμων: a man’s name.' },
  { id: 'gender-soma', prompt: 'σῶμα, -ματος', ask: GENDER, english: true, options: ['neuter', 'masculine', 'feminine'], gloss: 'body', rule: 'Nouns in -μα are always neuter: τὸ σῶμα.' },
]

const PAS_RULES = {
  every: 'No article: “every” (singular) or “all” (plural).',
  all: 'πᾶς before the article (predicate position): “all the …”. English often says “the whole …” for a singular.',
  whole: 'πᾶς after the article (attributive position): “the whole …”.',
  alone: 'πᾶς with no noun stands as a noun: “all (people)” or, neuter, “all things.”',
}

export const PAS_USES: RuleItem[] = [
  { id: 'pas-anthropos', prompt: 'πᾶς ἄνθρωπος', english: true, options: ['every person', 'all the people', 'the whole person', 'all things'], rule: PAS_RULES.every },
  { id: 'pas-entole', prompt: 'πάσῃ ἐντολῇ', english: true, options: ['to every commandment', 'to all the commandments', 'to the whole commandment', 'to all things'], rule: PAS_RULES.every },
  { id: 'pas-hemera', prompt: 'πᾶσαν ἡμέραν', english: true, options: ['every day', 'all the days', 'the day of all', 'all people'], rule: PAS_RULES.every },
  { id: 'pas-hoi-anthropoi', prompt: 'πάντες οἱ ἄνθρωποι', english: true, options: ['all the people', 'every person', 'the whole person', 'all things'], rule: PAS_RULES.all },
  { id: 'pas-ta-ethne', prompt: 'πάντα τὰ ἔθνη', gloss: 'ἔθνη nations', english: true, options: ['all the nations', 'every nation', 'the whole nation', 'all things'], rule: `${PAS_RULES.all} (Matt 28:19)` },
  { id: 'pas-ton-teknon', prompt: 'πάντων τῶν τέκνων', english: true, options: ['of all the children', 'of every child', 'of the whole child', 'of all things'], rule: `${PAS_RULES.all} (Luke 7:35)` },
  { id: 'pas-ho-nomos', prompt: 'ὁ πᾶς νόμος', gloss: 'νόμος law', english: true, options: ['the whole law', 'every law', 'all the laws', 'all things'], rule: `${PAS_RULES.whole} (Gal 5:14)` },
  { id: 'pas-to-soma', prompt: 'τὸ πᾶν σῶμα', english: true, options: ['the whole body', 'every body', 'all the bodies', 'all things'], rule: PAS_RULES.whole },
  { id: 'pas-hoi-pantes', prompt: 'οἱ πάντες', english: true, options: ['all people', 'all things', 'every man', 'the whole man'], rule: PAS_RULES.alone },
  { id: 'pas-ta-panta', prompt: 'τὰ πάντα', english: true, options: ['all things', 'all people', 'every man', 'the whole thing'], rule: PAS_RULES.alone },
]

const WHAT = 'What is it?'
const LOOK = ['one', 'into (preposition)', 'in (preposition)', 'if', 'you are', 'who? what?', 'someone, something']

/** Options: the answer first, then three other meanings from the look-alike set. */
const look = (answer: string, others: string[]) => [answer, ...others.filter((o) => o !== answer && LOOK.includes(o))].slice(0, 4)

export const LOOKALIKES: RuleItem[] = [
  { id: 'heis', prompt: 'εἷς', ask: WHAT, english: true, options: look('one', ['into (preposition)', 'in (preposition)', 'if']), rule: 'εἷς, with rough breathing and a circumflex, is “one” (masculine). The preposition εἰς has smooth breathing and usually no accent.' },
  { id: 'eis', prompt: 'εἰς', ask: WHAT, english: true, options: look('into (preposition)', ['one', 'in (preposition)', 'you are']), rule: 'εἰς, smooth breathing and no accent of its own: the preposition “into.”' },
  { id: 'hen', prompt: 'ἕν', ask: WHAT, english: true, options: look('one', ['in (preposition)', 'into (preposition)', 'if']), rule: 'ἕν, rough breathing and an accent: “one” (neuter). The preposition ἐν has smooth breathing.' },
  { id: 'en', prompt: 'ἐν', ask: WHAT, english: true, options: look('in (preposition)', ['one', 'into (preposition)', 'you are']), rule: 'ἐν, smooth breathing: the preposition “in.”' },
  { id: 'ei', prompt: 'εἰ', ask: WHAT, english: true, options: look('if', ['you are', 'into (preposition)', 'one']), rule: 'εἰ has no accent of its own: “if.” It starts a dependent clause.' },
  { id: 'ei-you', prompt: 'εἶ', ask: WHAT, english: true, options: look('you are', ['if', 'one', 'into (preposition)']), rule: 'εἶ, with a circumflex, is “you are” (the one form of εἰμί that is not enclitic).' },
  { id: 'hena', prompt: 'ἕνα', ask: WHAT, english: true, options: look('one', ['in (preposition)', 'someone, something', 'if']), rule: 'ἕνα is the accusative of εἷς, “one.” Rough breathing again.' },
  { id: 'ti-q', prompt: 'τί', ask: WHAT, english: true, options: look('who? what?', ['someone, something', 'one', 'if']), rule: 'τί, accented: the interrogative “what? why?”' },
  { id: 'ti-i', prompt: 'τι', ask: WHAT, english: true, options: look('someone, something', ['who? what?', 'one', 'if']), rule: 'τι, unaccented (enclitic): the indefinite “something.”' },
]

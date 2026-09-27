import type { Chapter, PresentVerb, PresentVerse, RootItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 21: Imperfect Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first (ἔλυον, ἐλυόμην). `stem` is the augmented stem without an accent; each form's accent is worked out
 * (recessive, but never before a compound's augment). `change` says what the augment did.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'imperfect', stem: 'ἐλυ', present: { stem: 'λύ' }, en: 'loose', en3: 'looses', ing: 'loosing', change: 'The augment ἐ- goes before the consonant.' },
  {
    id: 'lyo-mp', lemma: 'λύω', tense: 'imperfect', voice: 'passive', pp: 'loosed', stem: 'ἐλυ', present: { stem: 'λύ', voice: 'passive' },
    en: 'loose', en3: 'looses', change: 'The augment ἐ-, and the secondary middle/passive endings.',
  },
  { id: 'akouo', lemma: 'ἀκούω', tense: 'imperfect', stem: 'ἠκου', present: { stem: 'ἀκού' }, en: 'hear', en3: 'hears', ing: 'hearing', change: 'The augment lengthens α to η.' },
  { id: 'didasko', lemma: 'διδάσκω', tense: 'imperfect', stem: 'ἐδιδασκ', present: { stem: 'διδάσκ' }, en: 'teach', en3: 'teaches', ing: 'teaching' },
  {
    id: 'thelo', lemma: 'θέλω', tense: 'imperfect', stem: 'ἠθελ', present: { stem: 'θέλ' }, en: 'wish', en3: 'wishes', ing: 'wishing',
    change: 'The augment is η-, because the stem once began with ε (ἐθελ).',
  },
  { id: 'echo', lemma: 'ἔχω', tense: 'imperfect', stem: 'εἰχ', present: { stem: 'ἔχ' }, en: 'have', en3: 'has', ing: 'having', change: 'An irregular augment: εἶχον.' },
  { id: 'lego', lemma: 'λέγω', tense: 'imperfect', stem: 'ἐλεγ', present: { stem: 'λέγ' }, en: 'say', en3: 'says', ing: 'saying' },
  {
    id: 'ekballo', lemma: 'ἐκβάλλω', tense: 'imperfect', stem: 'ἐξεβαλλ', prefix: 'ἐξ', present: { stem: 'ἐκβάλλ' }, en: 'cast out', en3: 'casts out', ing: 'casting out',
    change: 'The augment goes after the preposition, and ἐκ becomes ἐξ before it.',
  },
  {
    id: 'synago', lemma: 'συνάγω', tense: 'imperfect', stem: 'συνηγ', prefix: 'συν', present: { stem: 'συνάγ' }, en: 'gather together', en3: 'gathers together', ing: 'gathering together',
    change: 'The augment goes after συν and lengthens α to η.',
  },
  {
    id: 'akoloutheo', lemma: 'ἀκολουθέω', tense: 'imperfect', stem: 'ἠκολουθ', contract: 'ε', present: { stem: 'ἀκολουθ', contract: 'ε' }, en: 'follow', en3: 'follows', ing: 'following',
    change: 'The augment lengthens α to η.',
  },
  {
    id: 'peripateo', lemma: 'περιπατέω', tense: 'imperfect', stem: 'περιεπατ', prefix: 'περι', contract: 'ε', present: { stem: 'περιπατ', contract: 'ε' }, en: 'walk', en3: 'walks', ing: 'walking',
    change: 'The augment goes after περι, which keeps its ι.',
  },
  {
    id: 'erotao', lemma: 'ἐρωτάω', tense: 'imperfect', stem: 'ἠρωτ', contract: 'α', present: { stem: 'ἐρωτ', contract: 'α' }, en: 'ask', en3: 'asks', ing: 'asking',
    change: 'The augment lengthens ε to η.',
  },
  {
    id: 'eperotao', lemma: 'ἐπερωτάω', tense: 'imperfect', stem: 'ἐπηρωτ', prefix: 'ἐπ', contract: 'α', present: { stem: 'ἐπερωτ', contract: 'α' }, en: 'question', en3: 'questions', ing: 'questioning',
    change: 'ἐπί + ἐρωτάω: the augment goes after ἐπ and lengthens ε to η.',
  },
  { id: 'poieo', lemma: 'ποιέω', tense: 'imperfect', stem: 'ἐποι', contract: 'ε', present: { stem: 'ποι', contract: 'ε' }, en: 'do', en3: 'does', ing: 'doing' },
  {
    id: 'agapao', lemma: 'ἀγαπάω', tense: 'imperfect', stem: 'ἠγαπ', contract: 'α', present: { stem: 'ἀγαπ', contract: 'α' }, en: 'love', en3: 'loves', ing: 'loving',
    change: 'The augment lengthens α to η.',
  },
  { id: 'laleo', lemma: 'λαλέω', tense: 'imperfect', stem: 'ἐλαλ', contract: 'ε', present: { stem: 'λαλ', contract: 'ε' }, en: 'speak', en3: 'speaks', ing: 'speaking' },
  {
    id: 'erchomai', lemma: 'ἔρχομαι', tense: 'imperfect', voice: 'middle', stem: 'ἠρχ', present: { stem: 'ἔρχ', voice: 'middle' }, en: 'come', en3: 'comes', ing: 'coming',
    change: 'The augment lengthens ε to η.',
  },
  { id: 'poreuomai', lemma: 'πορεύομαι', tense: 'imperfect', voice: 'middle', stem: 'ἐπορευ', present: { stem: 'πορεύ', voice: 'middle' }, en: 'go', en3: 'goes', ing: 'going' },
  {
    id: 'eimi', lemma: 'εἰμί', tense: 'imperfect', stem: 'ἠ',
    irregular: { '1s': 'ἤμην', '2s': 'ἦς', '3s': 'ἦν', '1p': 'ἦμεν', '2p': 'ἦτε', '3p': 'ἦσαν' },
    en: 'be', en3: 'is', ing: '', lexicalGloss: 'I am',
  },
]

/** The imperfect 1st singular (or the lengthened vowel) first in each `options`. */
const AUGMENTS: RootItem[] = [
  { lemma: 'α-', ask: 'An initial α: what does the augment make it?', options: ['η', 'ω', 'ει', 'α'], how: 'α lengthens to η: ἀκούω → ἤκουον, ἀγαπάω → ἠγάπων.' },
  { lemma: 'ε-', ask: 'An initial ε: what does the augment make it?', options: ['η', 'ει', 'ω', 'ε'], how: 'ε lengthens to η: ἐρωτάω → ἠρώτων, ἔρχομαι → ἠρχόμην.' },
  { lemma: 'ο-', ask: 'An initial ο: what does the augment make it?', options: ['ω', 'ου', 'η', 'ο'], how: 'ο lengthens to ω.' },
  { lemma: 'αι-', ask: 'An initial αι: what does the augment make it?', options: ['ῃ', 'η', 'ει', 'αι'], how: 'αι lengthens to ῃ: the ι stays as an iota subscript.' },
  { lemma: 'οι-', ask: 'An initial οι: what does the augment make it?', options: ['ῳ', 'ω', 'ου', 'οι'], how: 'οι lengthens to ῳ: the ι stays as an iota subscript.' },
  { lemma: 'ευ-', ask: 'An initial ευ: what does the augment make it?', options: ['ηυ', 'ευ', 'ει', 'η'], how: 'ευ lengthens to ηυ (though often it is left unchanged).' },
  { lemma: 'λύω', options: ['ἔλυον', 'λύον', 'ἤλυον', 'ἐλύουν'], how: 'Before a consonant the augment is ἐ-: ἔλυον.' },
  { lemma: 'ἀκούω', options: ['ἤκουον', 'ἐάκουον', 'ἄκουον', 'ὤκουον'], how: 'Before a vowel the augment lengthens it: α → η.' },
  { lemma: 'διδάσκω', options: ['ἐδίδασκον', 'ἠδίδασκον', 'δίδασκον', 'ἐδιδάσκουν'], how: 'Before a consonant the augment is ἐ-.' },
  { lemma: 'ἐκβάλλω', options: ['ἐξέβαλλον', 'ἐέκβαλλον', 'ἐκέβαλλον', 'ἔκβαλλον'], how: 'The augment goes between the preposition and the stem, and ἐκ becomes ἐξ before a vowel.' },
  { lemma: 'συνάγω', options: ['συνῆγον', 'ἐσύναγον', 'συνέαγον', 'σύναγον'], how: 'The augment goes after συν, and lengthens α to η.' },
  { lemma: 'περιπατέω', options: ['περιεπάτουν', 'ἐπεριπάτουν', 'περεπάτουν', 'περιπάτουν'], how: 'The augment goes after περι, which (unlike most prepositions) keeps its final vowel.' },
  { lemma: 'ἐπερωτάω', options: ['ἐπηρώτων', 'ἐπεερώτων', 'ἠπερώτων', 'ἐπερώτων'], how: 'ἐπί loses its ι before a vowel; the augment lengthens the ε of ἐρωτάω to η.' },
  { lemma: 'ἐρωτάω', options: ['ἠρώτων', 'ἐερώτων', 'ἐρώτων', 'εἰρώτων'], how: 'ε lengthens to η, and α + ον → ων.' },
  { lemma: 'ἀκολουθέω', options: ['ἠκολούθουν', 'ἐακολούθουν', 'ἀκολούθουν', 'ὠκολούθουν'], how: 'α lengthens to η, and ε + ον → ουν.' },
  { lemma: 'ἀγαπάω', options: ['ἠγάπων', 'ἐαγάπων', 'ἀγάπων', 'ἠγάπουν'], how: 'α lengthens to η, and α + ον → ων.' },
  { lemma: 'ἔχω', options: ['εἶχον', 'ἦχον', 'ἔεχον', 'ἔχον'], how: 'ἔχω has an irregular augment: εἶχον.' },
  { lemma: 'θέλω', options: ['ἤθελον', 'ἔθελον', 'θέλον', 'ἐθέλουν'], how: 'θέλω augments with η, because its stem once began with ε (ἐθελ).' },
  { lemma: 'ἔρχομαι', options: ['ἠρχόμην', 'ἐερχόμην', 'ἐρχόμην', 'ἠρχόμαι'], how: 'ε lengthens to η, and -όμην is the secondary middle/passive ending.' },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: '1cor-13-11-eimi', ref: '1 Cor 13:11', text: 'ὅτε ἤμην νήπιος, ἐλάλουν ὡς νήπιος', word: 'ἤμην', slot: '1s', verb: 'eimi',
    translation: 'When I was a child, I spoke like a child', help: 'ὅτε = when · νήπιος = child',
  },
  {
    id: '1cor-13-11', ref: '1 Cor 13:11', text: 'ὅτε ἤμην νήπιος, ἐλάλουν ὡς νήπιος', word: 'ἐλάλουν', slot: '1s', verb: 'laleo',
    translation: 'When I was a child, I spoke like a child', help: 'ὅτε = when · νήπιος = child', note: 'ἤμην, “I was,” shows that ἐλάλουν means “I,” not “they.”',
  },
  {
    id: 'john-17-5', ref: 'John 17:5', text: 'τῇ δόξῃ ᾗ εἶχον πρὸ τοῦ τὸν κόσμον εἶναι παρὰ σοί.', word: 'εἶχον', slot: '1s', verb: 'echo',
    translation: 'with the glory that I had with you before the world existed.', help: 'πρὸ τοῦ… εἶναι = before… existed',
  },
  {
    id: 'gal-4-20', ref: 'Gal 4:20', text: 'ἤθελον δὲ παρεῖναι πρὸς ὑμᾶς ἄρτι', word: 'ἤθελον', slot: '1s', verb: 'thelo',
    translation: 'I wish I could be with you now', help: 'παρεῖναι = to be present · ἄρτι = now',
  },
  {
    id: 'acts-22-5', ref: 'Acts 22:5', text: 'εἰς Δαμασκὸν ἐπορευόμην', word: 'ἐπορευόμην', slot: '1s', verb: 'poreuomai',
    translation: 'I was traveling to Damascus', note: 'Paul, telling how he set out to arrest believers.',
  },
  // 2nd singular
  {
    id: 'john-21-18', ref: 'John 21:18', text: 'ὅτε ἦς νεώτερος, ἐζώννυες σεαυτὸν καὶ περιεπάτεις ὅπου ἤθελες', word: 'περιεπάτεις', slot: '2s', verb: 'peripateo',
    translation: 'When you were younger, you dressed yourself and walked where you wanted', help: 'νεώτερος = younger · ἐζώννυες = you dressed',
  },
  {
    id: 'john-21-18-thelo', ref: 'John 21:18', text: 'ὅτε ἦς νεώτερος, ἐζώννυες σεαυτὸν καὶ περιεπάτεις ὅπου ἤθελες', word: 'ἤθελες', slot: '2s', verb: 'thelo',
    translation: 'When you were younger, you dressed yourself and walked where you wanted', help: 'νεώτερος = younger · ἐζώννυες = you dressed',
  },
  {
    id: 'john-11-21', ref: 'John 11:21', text: 'Κύριε, εἰ ἦς ὧδε οὐκ ἂν ἀπέθανεν ὁ ἀδελφός μου·', word: 'ἦς', slot: '2s', verb: 'eimi',
    translation: 'Lord, if you had been here, my brother would not have died.', help: 'ὧδε = here · ἀπέθανεν = he died',
  },
  {
    id: 'john-19-11', ref: 'John 19:11', text: 'Οὐκ εἶχες ἐξουσίαν κατʼ ἐμοῦ οὐδεμίαν', word: 'εἶχες', slot: '2s', verb: 'echo',
    translation: 'You would have no authority over me at all', help: 'ἐξουσία = authority · οὐδεμίαν = none',
  },
  {
    id: 'acts-9-17', ref: 'Acts 9:17', text: 'Ἰησοῦς ὁ ὀφθείς σοι ἐν τῇ ὁδῷ ᾗ ἤρχου', word: 'ἤρχου', slot: '2s', verb: 'erchomai',
    translation: 'Jesus, who appeared to you on the road by which you were coming', help: 'ὁ ὀφθείς = who appeared',
    note: 'ἤρχου = ἠρχ + ε + σο: the σ drops and ε + ο → ου.',
  },
  // 3rd singular
  {
    id: 'john-1-1', ref: 'John 1:1', text: 'Ἐν ἀρχῇ ἦν ὁ λόγος', word: 'ἦν', slot: '3s', verb: 'eimi',
    translation: 'In the beginning was the Word',
  },
  {
    id: 'john-5-18', ref: 'John 5:18', text: 'ὅτι οὐ μόνον ἔλυε τὸ σάββατον', word: 'ἔλυε', slot: '3s', verb: 'lyo',
    translation: 'because he was not only breaking the Sabbath', note: 'λύω can mean “break” or “destroy” as well as “loose.”',
  },
  {
    id: 'john-11-5', ref: 'John 11:5', text: 'ἠγάπα δὲ ὁ Ἰησοῦς τὴν Μάρθαν καὶ τὴν ἀδελφὴν αὐτῆς καὶ τὸν Λάζαρον.', word: 'ἠγάπα', slot: '3s', verb: 'agapao',
    translation: 'Now Jesus loved Martha and her sister and Lazarus.', note: 'ἠγάπα = ἠγαπα + ε: α + ε → α.',
  },
  {
    id: 'john-7-14', ref: 'John 7:14', text: 'ἀνέβη Ἰησοῦς εἰς τὸ ἱερὸν καὶ ἐδίδασκεν.', word: 'ἐδίδασκεν', slot: '3s', verb: 'didasko',
    translation: 'Jesus went up into the temple and began teaching.', help: 'ἀνέβη = he went up · ἱερόν = temple',
    note: 'The imperfect can mean “began to…”.',
  },
  {
    id: 'luke-10-39', ref: 'Luke 10:39', text: 'ἤκουεν τὸν λόγον αὐτοῦ.', word: 'ἤκουεν', slot: '3s', verb: 'akouo',
    translation: 'she was listening to his word.', note: 'Mary, sitting at Jesus’ feet.',
  },
  {
    id: 'acts-16-18', ref: 'Acts 16:18', text: 'τοῦτο δὲ ἐποίει ἐπὶ πολλὰς ἡμέρας.', word: 'ἐποίει', slot: '3s', verb: 'poieo',
    translation: 'She kept doing this for many days.', note: 'Continuous or repeated action in the past: the imperfect.',
  },
  {
    id: 'john-4-50', ref: 'John 4:50', text: 'ἐπίστευσεν ὁ ἄνθρωπος τῷ λόγῳ ὃν εἶπεν αὐτῷ ὁ Ἰησοῦς καὶ ἐπορεύετο.', word: 'ἐπορεύετο', slot: '3s', verb: 'poreuomai',
    translation: 'The man believed the word that Jesus spoke to him, and went on his way.', help: 'ἐπίστευσεν = he believed · εἶπεν = he said',
  },
  {
    id: 'mark-10-17', ref: 'Mark 10:17', text: 'ἐπηρώτα αὐτόν· Διδάσκαλε ἀγαθέ, τί ποιήσω', word: 'ἐπηρώτα', slot: '3s', verb: 'eperotao',
    translation: 'he asked him, “Good Teacher, what shall I do…?”', help: 'διδάσκαλε = teacher!',
  },
  {
    id: 'mark-4-33', ref: 'Mark 4:33', text: 'Καὶ τοιαύταις παραβολαῖς πολλαῖς ἐλάλει αὐτοῖς τὸν λόγον', word: 'ἐλάλει', slot: '3s', verb: 'laleo',
    translation: 'With many such parables he spoke the word to them', help: 'τοιοῦτος = such · παραβολή = parable',
  },
  {
    id: 'john-11-29', ref: 'John 11:29', text: 'ἐκείνη δὲ ὡς ἤκουσεν ἠγέρθη ταχὺ καὶ ἤρχετο πρὸς αὐτόν·', word: 'ἤρχετο', slot: '3s', verb: 'erchomai',
    translation: 'And when she heard it, she rose quickly and went to him.', help: 'ἤκουσεν = she heard · ἠγέρθη = she rose',
  },
  // 1st plural
  {
    id: 'heb-12-9', ref: 'Heb 12:9', text: 'τοὺς μὲν τῆς σαρκὸς ἡμῶν πατέρας εἴχομεν παιδευτὰς', word: 'εἴχομεν', slot: '1p', verb: 'echo',
    translation: 'we had our earthly fathers to discipline us', help: 'παιδευτής = one who disciplines',
  },
  {
    id: 'acts-21-5', ref: 'Acts 21:5', text: 'ἐξελθόντες ἐπορευόμεθα', word: 'ἐπορευόμεθα', slot: '1p', verb: 'poreuomai',
    translation: 'we left and went on our way', help: 'ἐξελθόντες = going out',
  },
  {
    id: 'acts-16-12', ref: 'Acts 16:12', text: 'ἦμεν δὲ ἐν ταύτῃ τῇ πόλει διατρίβοντες ἡμέρας τινάς.', word: 'ἦμεν', slot: '1p', verb: 'eimi',
    translation: 'We stayed in this city some days.', help: 'διατρίβοντες = staying',
  },
  // 2nd plural
  {
    id: 'john-9-41', ref: 'John 9:41', text: 'Εἰ τυφλοὶ ἦτε, οὐκ ἂν εἴχετε ἁμαρτίαν·', word: 'εἴχετε', slot: '2p', verb: 'echo',
    translation: 'If you were blind, you would have no sin.', help: 'ἁμαρτία = sin',
  },
  {
    id: 'john-9-41-eimi', ref: 'John 9:41', text: 'Εἰ τυφλοὶ ἦτε, οὐκ ἂν εἴχετε ἁμαρτίαν·', word: 'ἦτε', slot: '2p', verb: 'eimi',
    translation: 'If you were blind, you would have no sin.', help: 'ἁμαρτία = sin',
  },
  {
    id: 'john-8-39', ref: 'John 8:39', text: 'Εἰ τέκνα τοῦ Ἀβραάμ ἐστε, τὰ ἔργα τοῦ Ἀβραὰμ ἐποιεῖτε·', word: 'ἐποιεῖτε', slot: '2p', verb: 'poieo',
    translation: 'If you are Abraham’s children, you would be doing the works of Abraham.', help: 'τέκνον = child',
  },
  {
    id: 'john-8-42', ref: 'John 8:42', text: 'Εἰ ὁ θεὸς πατὴρ ὑμῶν ἦν ἠγαπᾶτε ἂν ἐμέ', word: 'ἠγαπᾶτε', slot: '2p', verb: 'agapao',
    translation: 'If God were your Father, you would love me', note: 'ἦν (imperfect of εἰμί) and ἠγαπᾶτε in one sentence.',
  },
  // 3rd plural
  {
    id: 'mark-2-15', ref: 'Mark 2:15', text: 'ἦσαν γὰρ πολλοὶ καὶ ἠκολούθουν αὐτῷ.', word: 'ἠκολούθουν', slot: '3p', verb: 'akoloutheo',
    translation: 'for there were many, and they were following him.', note: 'ἀκολουθέω takes its object in the dative.',
  },
  {
    id: 'mark-6-13', ref: 'Mark 6:13', text: 'καὶ δαιμόνια πολλὰ ἐξέβαλλον', word: 'ἐξέβαλλον', slot: '3p', verb: 'ekballo',
    translation: 'And they were casting out many demons',
  },
  {
    id: 'luke-3-10', ref: 'Luke 3:10', text: 'Καὶ ἐπηρώτων αὐτὸν οἱ ὄχλοι λέγοντες· Τί οὖν ποιήσωμεν;', word: 'ἐπηρώτων', slot: '3p', verb: 'eperotao',
    translation: 'And the crowds were asking him, “What then should we do?”', help: 'λέγοντες = saying',
  },
  {
    id: 'john-6-66', ref: 'John 6:66', text: 'καὶ οὐκέτι μετʼ αὐτοῦ περιεπάτουν.', word: 'περιεπάτουν', slot: '3p', verb: 'peripateo',
    translation: 'and no longer walked with him.', help: 'οὐκέτι = no longer',
  },
  {
    id: 'acts-12-15', ref: 'Acts 12:15', text: 'οἱ δὲ ἔλεγον· Ὁ ἄγγελός ἐστιν αὐτοῦ.', word: 'ἔλεγον', slot: '3p', verb: 'lego',
    translation: 'They kept saying, “It is his angel.”', note: 'οἱ, “they,” shows that ἔλεγον is 3rd plural here.',
  },
  {
    id: 'acts-8-36', ref: 'Acts 8:36', text: 'ὡς δὲ ἐπορεύοντο κατὰ τὴν ὁδόν, ἦλθον ἐπί τι ὕδωρ', word: 'ἐπορεύοντο', slot: '3p', verb: 'poreuomai',
    translation: 'As they were going along the road, they came to some water', help: 'ἦλθον = they came · ὕδωρ = water',
  },
  {
    id: '1john-2-19', ref: '1 John 2:19', text: 'ἐξ ἡμῶν ἐξῆλθαν, ἀλλʼ οὐκ ἦσαν ἐξ ἡμῶν·', word: 'ἦσαν', slot: '3p', verb: 'eimi',
    translation: 'They went out from us, but they were not of us.', help: 'ἐξῆλθαν = they went out',
  },
]

export const chapter21: Chapter = {
  number: 21,
  title: 'Imperfect Indicative',
  short: 'Imperfect',
  topics: ['imperfect'],
  vocab: [
    { id: 'akoloutheo', lemma: 'ἀκολουθέω', pos: 'verb', gloss: 'I follow, accompany', hook: 'An acolyte is an attendant, one who follows.', accept: ['i follow', 'follow', 'i accompany', 'accompany'] },
    { id: 'didasko', lemma: 'διδάσκω', pos: 'verb', gloss: 'I teach', hook: 'Didactic: meant to teach.', accept: ['i teach', 'teach'] },
    { id: 'eperotao', lemma: 'ἐπερωτάω', pos: 'verb', gloss: 'I ask (for), question, demand of', accept: ['i ask', 'ask', 'ask for', 'i question', 'question', 'demand of', 'demand'] },
    { id: 'erotao', lemma: 'ἐρωτάω', pos: 'verb', gloss: 'I ask (for), request, entreat', accept: ['i ask', 'ask', 'ask for', 'i request', 'request', 'i entreat', 'entreat'] },
    { id: 'thelo', lemma: 'θέλω', pos: 'verb', gloss: 'I will, wish, desire, enjoy', hook: 'Monothelitism: the heresy that Christ had only one will.', accept: ['i will', 'will', 'i wish', 'wish', 'i desire', 'desire', 'i enjoy', 'enjoy', 'want', 'i want'] },
    { id: 'peripateo', lemma: 'περιπατέω', pos: 'verb', gloss: 'I walk (around), live', hook: 'Peripatetic: walking about (Aristotle taught while walking).', accept: ['i walk', 'walk', 'walk around', 'i live', 'live', 'conduct oneself'] },
    { id: 'synagoge', lemma: 'συναγωγή', lexical: 'συναγωγή, -ῆς, ἡ', pos: 'noun', gloss: 'synagogue, meeting', hook: 'Synagogue: from συνάγω, a gathering together.', accept: ['synagogue', 'meeting', 'assembly', 'gathering'] },
    { id: 'pharisaios', lemma: 'Φαρισαῖος', lexical: 'Φαρισαῖος, -ου, ὁ', pos: 'noun', gloss: 'Pharisee', hook: 'Pharisaic: self-righteous, as the Pharisees were painted.', accept: ['pharisee'] },
    { id: 'chronos', lemma: 'χρόνος', lexical: 'χρόνος, -ου, ὁ', pos: 'noun', gloss: 'time', hook: 'Chronology, chronic, synchronize.', accept: ['time', 'period of time'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES, augments: AUGMENTS },
}

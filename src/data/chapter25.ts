import type { Chapter, PresentVerb, PresentVerse, RootItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 25: Perfect Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first (λέλυκα). `stem` is the reduplicated perfect stem, with κ for a first perfect (λελυκ) and without for a
 * second perfect (γεγον) or the middle/passive (λελυ); `aorist` gives the aorist, for telling the two apart.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'perfect', stem: 'λελυκ', aorist: { stem: 'ἐλυσ', firstAorist: true }, en: 'loose', en3: 'looses', pp: 'loosed', past: 'loosed' },
  { id: 'pisteuo', lemma: 'πιστεύω', tense: 'perfect', stem: 'πεπιστευκ', aorist: { stem: 'ἐπιστευσ', firstAorist: true }, en: 'believe', en3: 'believes', pp: 'believed', past: 'believed' },
  {
    id: 'agapao', lemma: 'ἀγαπάω', tense: 'perfect', stem: 'ἠγαπηκ', aorist: { stem: 'ἠγαπησ', firstAorist: true }, en: 'love', en3: 'loves', pp: 'loved', past: 'loved',
    change: 'A vowel lengthens instead of reduplicating: α → η.',
  },
  { id: 'poieo', lemma: 'ποιέω', tense: 'perfect', stem: 'πεποιηκ', aorist: { stem: 'ἐποιησ', firstAorist: true }, en: 'do', en3: 'does', pp: 'done', past: 'did' },
  { id: 'pleroo', lemma: 'πληρόω', tense: 'perfect', stem: 'πεπληρωκ', aorist: { stem: 'ἐπληρωσ', firstAorist: true }, en: 'fill', en3: 'fills', pp: 'filled', past: 'filled' },
  { id: 'martyreo', lemma: 'μαρτυρέω', tense: 'perfect', stem: 'μεμαρτυρηκ', aorist: { stem: 'ἐμαρτυρησ', firstAorist: true }, en: 'testify', en3: 'testifies', pp: 'testified', past: 'testified' },
  {
    id: 'aiteo', lemma: 'αἰτέω', tense: 'perfect', stem: 'ᾐτηκ', aorist: { stem: 'ᾐτησ', firstAorist: true }, en: 'ask', en3: 'asks', pp: 'asked', past: 'asked',
    change: 'αι lengthens to ῃ instead of reduplicating.',
  },
  {
    id: 'ginosko', lemma: 'γινώσκω', tense: 'perfect', stem: 'ἐγνωκ',
    aorist: { stem: 'ἐγνω', irregular: { '1s': 'ἔγνων', '2s': 'ἔγνως', '3s': 'ἔγνω', '1p': 'ἔγνωμεν', '2p': 'ἔγνωτε', '3p': 'ἔγνωσαν' } },
    en: 'know', en3: 'knows', pp: 'known', past: 'knew', change: 'γν is two consonants, so it only adds ε.',
  },
  { id: 'laleo', lemma: 'λαλέω', tense: 'perfect', stem: 'λελαληκ', aorist: { stem: 'ἐλαλησ', firstAorist: true }, en: 'speak', en3: 'speaks', pp: 'spoken', past: 'spoke' },
  { id: 'tereo', lemma: 'τηρέω', tense: 'perfect', stem: 'τετηρηκ', aorist: { stem: 'ἐτηρησ', firstAorist: true }, en: 'keep', en3: 'keeps', pp: 'kept', past: 'kept' },
  {
    id: 'apostello', lemma: 'ἀποστέλλω', tense: 'perfect', stem: 'ἀπεσταλκ', prefix: 'ἀπ', aorist: { stem: 'ἀπεστειλ', prefix: 'ἀπ', firstAorist: true, liquid: true },
    en: 'send', en3: 'sends', pp: 'sent', past: 'sent', change: 'After the preposition, στ adds only ε, and *στελ becomes σταλ.',
  },
  // Second perfects: no κ.
  {
    id: 'ginomai', lemma: 'γίνομαι', tense: 'perfect', stem: 'γεγον', aorist: { stem: 'ἐγεν', voice: 'middle' }, en: 'become', en3: 'becomes', pp: 'become', past: 'became',
    change: 'A second perfect, active in form: γέγονα (the root *γεν changes to γον).',
  },
  {
    id: 'erchomai', lemma: 'ἔρχομαι', tense: 'perfect', stem: 'ἐληλυθ', aorist: { stem: 'ἠλθ' }, en: 'come', en3: 'comes', pp: 'come', past: 'came',
    change: 'A second perfect with irregular reduplication: ἐλ-ήλυθ-α.',
  },
  {
    id: 'akouo', lemma: 'ἀκούω', tense: 'perfect', stem: 'ἀκηκο', aorist: { stem: 'ἠκουσ', firstAorist: true }, en: 'hear', en3: 'hears', pp: 'heard', past: 'heard',
    change: 'A second perfect with “Attic” reduplication: ἀκ-ήκο-α.',
  },
  { id: 'grapho', lemma: 'γράφω', tense: 'perfect', stem: 'γεγραφ', aorist: { stem: 'ἐγραψ', firstAorist: true }, en: 'write', en3: 'writes', pp: 'written', past: 'wrote', change: 'A second perfect: no κ.' },
  {
    id: 'horao', lemma: 'ὁράω', tense: 'perfect', stem: 'ἑωρακ', aorist: { stem: 'εἰδ' }, en: 'see', en3: 'sees', pp: 'seen', past: 'saw',
    change: 'Irregular reduplication: ἑώρακα.',
  },
  // Middle/passive: no κ, no connecting vowel.
  { id: 'lyo-mp', lemma: 'λύω', tense: 'perfect', voice: 'passive', stem: 'λελυ', aorist: { stem: 'ἐλυθη', passiveForm: true }, en: 'loose', en3: 'looses', pp: 'loosed' },
  { id: 'pleroo-mp', lemma: 'πληρόω', tense: 'perfect', voice: 'passive', stem: 'πεπληρω', aorist: { stem: 'ἐπληρωθη', passiveForm: true }, en: 'fulfill', en3: 'fulfills', pp: 'fulfilled' },
  {
    id: 'grapho-mp', lemma: 'γράφω', tense: 'perfect', voice: 'passive', stem: 'γεγραφ', aorist: { stem: 'ἐγραφη', passiveForm: true },
    irregular: { '1s': 'γέγραμμαι', '2s': 'γέγραψαι', '3s': 'γέγραπται', '1p': 'γεγράμμεθα', '2p': 'γέγραφθε', '3p': 'γεγραμμένοι εἰσίν' },
    en: 'write', en3: 'writes', pp: 'written', change: 'The φ changes before each ending; the 3rd plural is written with a participle and εἰσίν.',
  },
]

/** The perfect first in each `options`. */
const REDUPLICATIONS: RootItem[] = [
  { lemma: 'λύω', options: ['λέλυκα', 'ἔλυκα', 'λύκα', 'ἔλυσα'], how: 'A consonant is repeated with ε (λε-), then κα is added.' },
  { lemma: 'πιστεύω', options: ['πεπίστευκα', 'ἐπίστευκα', 'πιπίστευκα', 'ἐπίστευσα'], how: 'π is repeated with ε: πε-πίστευ-κα.' },
  { lemma: 'ποιέω', options: ['πεποίηκα', 'πεποίεκα', 'ἐποίηκα', 'ἐποίησα'], how: 'πε-, and the contract vowel ε lengthens to η before κα.' },
  { lemma: 'μαρτυρέω', options: ['μεμαρτύρηκα', 'ἐμαρτύρηκα', 'μαμαρτύρηκα', 'ἐμαρτύρησα'], how: 'μ is repeated with ε, and ε lengthens to η.' },
  { lemma: 'ἀγαπάω', options: ['ἠγάπηκα', 'ἀγαγάπηκα', 'ἀγάπηκα', 'ἠγάπησα'], how: 'A verb beginning with a vowel lengthens it instead, like the augment: α → η.' },
  { lemma: 'αἰτέω', options: ['ᾔτηκα', 'αἰαίτηκα', 'αἴτηκα', 'ᾔτησα'], how: 'αι lengthens to ῃ; the contract ε lengthens to η before κα.' },
  { lemma: 'γινώσκω', options: ['ἔγνωκα', 'γέγνωκα', 'γεγίνωσκα', 'ἔγνων'], how: 'The root *γνω begins with two consonants, so only ε is added.' },
  { lemma: 'ἀποστέλλω', options: ['ἀπέσταλκα', 'ἀποστέσταλκα', 'ἀπέστελκα', 'ἀπέστειλα'], how: 'After the preposition, στ (two consonants) adds only ε, and *στελ becomes σταλ.' },
  { lemma: 'γίνομαι', options: ['γέγονα', 'γεγένηκα', 'γέγενα', 'ἐγενόμην'], how: 'A second perfect: γε- and no κ, and the root *γεν changes to γον.' },
  { lemma: 'ἔρχομαι', options: ['ἐλήλυθα', 'ἐλήλυκα', 'ἦλθα', 'ἦλθον'], how: 'From the root *ἐλυθ, with irregular reduplication: ἐλ-ήλυθ-α.' },
  { lemma: 'ἀκούω', options: ['ἀκήκοα', 'ἀκήκουκα', 'ἤκουκα', 'ἤκουσα'], how: '“Attic” reduplication: the first syllable is repeated and lengthened, ἀκ-ήκο-α.' },
  { lemma: 'ὁράω', options: ['ἑώρακα', 'ὥρακα', 'ὀόρακα', 'εἶδον'], how: 'Irregular: ἑώρακα.' },
  { lemma: 'γράφω', options: ['γέγραφα', 'γέγραπκα', 'ἔγραφα', 'ἔγραψα'], how: 'γ is repeated with ε, and there is no κ: a second perfect.' },
  { lemma: 'φ-, θ-, χ-', ask: 'How does a verb beginning with an aspirate reduplicate?', options: ['πε-, τε-, κε-', 'φε-, θε-, χε-', 'ε- only', 'no reduplication'], how: 'The repeated consonant loses its h-sound: φ → πε-, θ → τε-, χ → κε- (φιλέω → πεφίληκα).' },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-11-27', ref: 'John 11:27', text: 'ἐγὼ πεπίστευκα ὅτι σὺ εἶ ὁ χριστὸς ὁ υἱὸς τοῦ θεοῦ', word: 'πεπίστευκα', slot: '1s', verb: 'pisteuo',
    translation: 'I believe that you are the Christ, the Son of God', note: 'Martha’s confession. The perfect: “I have come to believe, and still do.”',
  },
  {
    id: 'john-1-34', ref: 'John 1:34', text: 'κἀγὼ ἑώρακα, καὶ μεμαρτύρηκα ὅτι οὗτός ἐστιν ὁ ἐκλεκτὸς τοῦ θεοῦ.', word: 'ἑώρακα', slot: '1s', verb: 'horao',
    translation: 'And I have seen and have borne witness that this is the Chosen One of God.', help: 'ἐκλεκτός = chosen',
  },
  {
    id: 'john-1-34-martyreo', ref: 'John 1:34', text: 'κἀγὼ ἑώρακα, καὶ μεμαρτύρηκα ὅτι οὗτός ἐστιν ὁ ἐκλεκτὸς τοῦ θεοῦ.', word: 'μεμαρτύρηκα', slot: '1s', verb: 'martyreo',
    translation: 'And I have seen and have borne witness that this is the Chosen One of God.', help: 'ἐκλεκτός = chosen',
    note: 'μαρτυρέω is from this chapter’s vocabulary.',
  },
  {
    id: 'john-12-46', ref: 'John 12:46', text: 'ἐγὼ φῶς εἰς τὸν κόσμον ἐλήλυθα', word: 'ἐλήλυθα', slot: '1s', verb: 'erchomai',
    translation: 'I have come into the world as light',
  },
  {
    id: 'john-19-22', ref: 'John 19:22', text: 'Ὃ γέγραφα γέγραφα.', word: 'γέγραφα', slot: '1s', verb: 'grapho',
    translation: 'What I have written, I have written.', note: 'Pilate’s answer: the perfect says it stands written.',
  },
  {
    id: 'john-14-25', ref: 'John 14:25', text: 'Ταῦτα λελάληκα ὑμῖν παρʼ ὑμῖν μένων·', word: 'λελάληκα', slot: '1s', verb: 'laleo',
    translation: 'These things I have spoken to you while I am still with you.', help: 'μένων = remaining',
  },
  {
    id: '1cor-13-11', ref: '1 Cor 13:11', text: 'ὅτε γέγονα ἀνήρ', word: 'γέγονα', slot: '1s', verb: 'ginomai',
    translation: 'when I became a man',
  },
  {
    id: '1john-2-4', ref: '1 John 2:4', text: 'ὁ λέγων ὅτι Ἔγνωκα αὐτὸν', word: 'Ἔγνωκα', slot: '1s', verb: 'ginosko',
    translation: 'Whoever says, “I know him”', help: 'ὁ λέγων = the one who says',
  },
  // 2nd singular
  {
    id: 'john-20-29', ref: 'John 20:29', text: 'Ὅτι ἑώρακάς με πεπίστευκας;', word: 'πεπίστευκας', slot: '2s', verb: 'pisteuo',
    translation: 'Have you believed because you have seen me?',
  },
  {
    id: 'john-5-14', ref: 'John 5:14', text: 'Ἴδε ὑγιὴς γέγονας·', word: 'γέγονας', slot: '2s', verb: 'ginomai',
    translation: 'See, you have been made well.', help: 'ὑγιής = healthy, well',
  },
  {
    id: 'john-3-26', ref: 'John 3:26', text: 'ᾧ σὺ μεμαρτύρηκας', word: 'μεμαρτύρηκας', slot: '2s', verb: 'martyreo',
    translation: 'to whom you bore witness', note: 'μαρτυρέω takes a dative: “bear witness to.”',
  },
  {
    id: 'john-2-10', ref: 'John 2:10', text: 'σὺ τετήρηκας τὸν καλὸν οἶνον ἕως ἄρτι.', word: 'τετήρηκας', slot: '2s', verb: 'tereo',
    translation: 'you have kept the good wine until now.', help: 'οἶνος = wine · ἄρτι = now',
  },
  {
    id: '1cor-7-27', ref: '1 Cor 7:27', text: 'λέλυσαι ἀπὸ γυναικός; μὴ ζήτει γυναῖκα·', word: 'λέλυσαι', slot: '2s', verb: 'lyo-mp',
    translation: 'Are you free from a wife? Do not seek a wife.', help: 'ζήτει = seek!', note: 'A perfect passive: “have you been released?”',
  },
  // 3rd singular
  {
    id: 'john-12-23', ref: 'John 12:23', text: 'Ἐλήλυθεν ἡ ὥρα ἵνα δοξασθῇ ὁ υἱὸς τοῦ ἀνθρώπου.', word: 'Ἐλήλυθεν', slot: '3s', verb: 'erchomai',
    translation: 'The hour has come for the Son of Man to be glorified.', help: 'δοξασθῇ = he may be glorified',
  },
  {
    id: '1john-4-14', ref: '1 John 4:14', text: 'ὅτι ὁ πατὴρ ἀπέσταλκεν τὸν υἱὸν σωτῆρα τοῦ κόσμου.', word: 'ἀπέσταλκεν', slot: '3s', verb: 'apostello',
    translation: 'that the Father has sent the Son as Savior of the world.', help: 'σωτήρ = savior',
  },
  {
    id: 'john-16-6', ref: 'John 16:6', text: 'ἡ λύπη πεπλήρωκεν ὑμῶν τὴν καρδίαν.', word: 'πεπλήρωκεν', slot: '3s', verb: 'pleroo',
    translation: 'sorrow has filled your heart.', help: 'λύπη = sorrow',
  },
  {
    id: '1john-3-6', ref: '1 John 3:6', text: 'πᾶς ὁ ἁμαρτάνων οὐχ ἑώρακεν αὐτὸν οὐδὲ ἔγνωκεν αὐτόν.', word: 'ἑώρακεν', slot: '3s', verb: 'horao',
    translation: 'No one who keeps on sinning has either seen him or known him.', help: 'ὁ ἁμαρτάνων = the one who sins',
  },
  {
    id: '1john-3-6-ginosko', ref: '1 John 3:6', text: 'πᾶς ὁ ἁμαρτάνων οὐχ ἑώρακεν αὐτὸν οὐδὲ ἔγνωκεν αὐτόν.', word: 'ἔγνωκεν', slot: '3s', verb: 'ginosko',
    translation: 'No one who keeps on sinning has either seen him or known him.', help: 'ὁ ἁμαρτάνων = the one who sins',
  },
  {
    id: '1john-5-10', ref: '1 John 5:10', text: 'ὁ μὴ πιστεύων τῷ θεῷ ψεύστην πεποίηκεν αὐτόν', word: 'πεποίηκεν', slot: '3s', verb: 'poieo',
    translation: 'Whoever does not believe God has made him a liar', help: 'ψεύστης = liar',
  },
  {
    id: 'john-5-33', ref: 'John 5:33', text: 'ὑμεῖς ἀπεστάλκατε πρὸς Ἰωάννην, καὶ μεμαρτύρηκε τῇ ἀληθείᾳ·', word: 'μεμαρτύρηκε', slot: '3s', verb: 'martyreo',
    translation: 'You sent to John, and he has borne witness to the truth.',
  },
  {
    id: 'gal-5-14', ref: 'Gal 5:14', text: 'ὁ γὰρ πᾶς νόμος ἐν ἑνὶ λόγῳ πεπλήρωται', word: 'πεπλήρωται', slot: '3s', verb: 'pleroo-mp',
    translation: 'For the whole law is fulfilled in one word', note: 'A perfect passive: fulfilled, and it stands fulfilled.',
  },
  {
    id: '1cor-10-7', ref: '1 Cor 10:7', text: 'καθώς τινες αὐτῶν· ὥσπερ γέγραπται', word: 'γέγραπται', slot: '3s', verb: 'grapho-mp',
    translation: 'as some of them were; as it is written', note: 'γέγραπται, “it stands written,” introduces a quotation of Scripture.',
  },
  // 1st plural
  {
    id: '1john-4-16', ref: '1 John 4:16', text: 'καὶ ἡμεῖς ἐγνώκαμεν καὶ πεπιστεύκαμεν τὴν ἀγάπην ἣν ἔχει ὁ θεὸς ἐν ἡμῖν.', word: 'πεπιστεύκαμεν', slot: '1p', verb: 'pisteuo',
    translation: 'So we have come to know and to believe the love that God has for us.',
  },
  {
    id: '1john-4-16-ginosko', ref: '1 John 4:16', text: 'καὶ ἡμεῖς ἐγνώκαμεν καὶ πεπιστεύκαμεν τὴν ἀγάπην ἣν ἔχει ὁ θεὸς ἐν ἡμῖν.', word: 'ἐγνώκαμεν', slot: '1p', verb: 'ginosko',
    translation: 'So we have come to know and to believe the love that God has for us.',
  },
  {
    id: '1john-1-1', ref: '1 John 1:1', text: 'Ὃ ἦν ἀπʼ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν', word: 'ἀκηκόαμεν', slot: '1p', verb: 'akouo',
    translation: 'That which was from the beginning, which we have heard, which we have seen with our eyes',
  },
  {
    id: '1john-1-1-horao', ref: '1 John 1:1', text: 'Ὃ ἦν ἀπʼ ἀρχῆς, ὃ ἀκηκόαμεν, ὃ ἑωράκαμεν τοῖς ὀφθαλμοῖς ἡμῶν', word: 'ἑωράκαμεν', slot: '1p', verb: 'horao',
    translation: 'That which was from the beginning, which we have heard, which we have seen with our eyes',
  },
  {
    id: '1john-4-10', ref: '1 John 4:10', text: 'οὐχ ὅτι ἡμεῖς ἠγαπήκαμεν τὸν θεόν', word: 'ἠγαπήκαμεν', slot: '1p', verb: 'agapao',
    translation: 'not that we have loved God', note: 'The next words switch to the aorist: ἀλλʼ ὅτι αὐτὸς ἠγάπησεν ἡμᾶς.',
  },
  {
    id: '1john-5-15', ref: '1 John 5:15', text: 'οἴδαμεν ὅτι ἔχομεν τὰ αἰτήματα ἃ ᾐτήκαμεν', word: 'ᾐτήκαμεν', slot: '1p', verb: 'aiteo',
    translation: 'we know that we have the requests that we have asked', help: 'αἴτημα = request', note: 'αἰτέω is from this chapter’s vocabulary.',
  },
  {
    id: 'luke-17-10', ref: 'Luke 17:10', text: 'ὃ ὠφείλομεν ποιῆσαι πεποιήκαμεν.', word: 'πεποιήκαμεν', slot: '1p', verb: 'poieo',
    translation: 'we have only done what was our duty.', help: 'ὠφείλομεν = we ought · ποιῆσαι = to do',
  },
  // 2nd plural
  {
    id: 'john-16-27', ref: 'John 16:27', text: 'ὅτι ὑμεῖς ἐμὲ πεφιλήκατε καὶ πεπιστεύκατε', word: 'πεπιστεύκατε', slot: '2p', verb: 'pisteuo',
    translation: 'because you have loved me and have believed', note: 'πεφιλήκατε (from φιλέω) shows φ reduplicating as πε-.',
  },
  {
    id: '1john-2-13', ref: '1 John 2:13', text: 'γράφω ὑμῖν, πατέρες, ὅτι ἐγνώκατε τὸν ἀπʼ ἀρχῆς·', word: 'ἐγνώκατε', slot: '2p', verb: 'ginosko',
    translation: 'I am writing to you, fathers, because you know him who is from the beginning.',
  },
  {
    id: 'acts-5-28', ref: 'Acts 5:28', text: 'καὶ ἰδοὺ πεπληρώκατε τὴν Ἰερουσαλὴμ τῆς διδαχῆς ὑμῶν', word: 'πεπληρώκατε', slot: '2p', verb: 'pleroo',
    translation: 'and yet you have filled Jerusalem with your teaching', help: 'διδαχή = teaching',
  },
  {
    id: 'mark-11-17', ref: 'Mark 11:17', text: 'ὑμεῖς δὲ πεποιήκατε αὐτὸν σπήλαιον λῃστῶν.', word: 'πεποιήκατε', slot: '2p', verb: 'poieo',
    translation: 'But you have made it a den of robbers.', help: 'σπήλαιον = cave, den · λῃστής = robber',
  },
  // 3rd plural
  {
    id: 'john-17-7', ref: 'John 17:7', text: 'νῦν ἔγνωκαν ὅτι πάντα ὅσα δέδωκάς μοι παρὰ σοῦ εἰσιν·', word: 'ἔγνωκαν', slot: '3p', verb: 'ginosko',
    translation: 'Now they know that everything you have given me is from you.', help: 'δέδωκας = you have given',
    note: 'ἔγνωκαν: the -καν ending the New Testament often uses for -κασι(ν).',
  },
  {
    id: 'john-17-6', ref: 'John 17:6', text: 'καὶ τὸν λόγον σου τετήρηκαν.', word: 'τετήρηκαν', slot: '3p', verb: 'tereo',
    translation: 'and they have kept your word.',
  },
  {
    id: 'rom-15-21', ref: 'Rom 15:21', text: 'καὶ οἳ οὐκ ἀκηκόασιν συνήσουσιν.', word: 'ἀκηκόασιν', slot: '3p', verb: 'akouo',
    translation: 'and those who have never heard will understand.', help: 'συνήσουσιν = they will understand',
  },
  {
    id: 'luke-9-36', ref: 'Luke 9:36', text: 'καὶ οὐδενὶ ἀπήγγειλαν ἐν ἐκείναις ταῖς ἡμέραις οὐδὲν ὧν ἑώρακαν.', word: 'ἑώρακαν', slot: '3p', verb: 'horao',
    translation: 'and in those days they told no one anything of what they had seen.', help: 'ἀπήγγειλαν = they told',
  },
]

export const chapter25: Chapter = {
  number: 25,
  title: 'Perfect Indicative',
  short: 'Perfect',
  topics: ['perfect'],
  vocab: [
    { id: 'aiteo', lemma: 'αἰτέω', pos: 'verb', gloss: 'I ask, demand', accept: ['i ask', 'ask', 'i demand', 'demand', 'ask for', 'request'] },
    { id: 'mallon', lemma: 'μᾶλλον', pos: 'adverb', gloss: 'more, rather', hook: 'With ἤ, ἤ means “than”: μᾶλλον ἤ, “rather than.”', accept: ['more', 'rather', 'all the more'] },
    { id: 'martyreo', lemma: 'μαρτυρέω', pos: 'verb', gloss: 'I bear witness, testify', hook: 'A martyr (μάρτυς) was first a witness.', accept: ['i bear witness', 'bear witness', 'i testify', 'testify', 'witness'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES, reduplications: REDUPLICATIONS },
}

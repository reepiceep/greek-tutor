import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 23: First Aorist Active/Middle Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first (ἔλυσα). `stem` is the augmented aorist stem with its σ (ἐλυσ, ἐγραψ, ἠγαπησ), or a liquid stem with no σ
 * (ἐμειν); `from` is the stem the σ is added to, for the Square of Stops. Then the chapter's two second aorists.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'aorist', firstAorist: true, stem: 'ἐλυσ', from: 'λυ', imperfect: { stem: 'ἐλυ' }, future1s: 'λύσω', en: 'loose', en3: 'looses', past: 'loosed', ing: 'loosing' },
  { id: 'akouo', lemma: 'ἀκούω', tense: 'aorist', firstAorist: true, stem: 'ἠκουσ', from: 'ἀκου', imperfect: { stem: 'ἠκου' }, future1s: 'ἀκούσω', en: 'hear', en3: 'hears', past: 'heard', ing: 'hearing' },
  { id: 'pisteuo', lemma: 'πιστεύω', tense: 'aorist', firstAorist: true, stem: 'ἐπιστευσ', from: 'πιστευ', imperfect: { stem: 'ἐπιστευ' }, future1s: 'πιστεύσω', en: 'believe', en3: 'believes', past: 'believed', ing: 'believing' },
  { id: 'grapho', lemma: 'γράφω', tense: 'aorist', firstAorist: true, stem: 'ἐγραψ', from: 'γραφ', imperfect: { stem: 'ἐγραφ' }, future1s: 'γράψω', en: 'write', en3: 'writes', past: 'wrote', ing: 'writing' },
  {
    id: 'kerysso', lemma: 'κηρύσσω', tense: 'aorist', firstAorist: true, stem: 'ἐκηρυξ', from: 'κηρυγ', imperfect: { stem: 'ἐκηρυσσ' }, future1s: 'κηρύξω',
    en: 'proclaim', en3: 'proclaims', past: 'proclaimed', ing: 'proclaiming', change: 'The root is *κηρυγ, so γ + σ → ξ.',
  },
  { id: 'doxazo', lemma: 'δοξάζω', tense: 'aorist', firstAorist: true, stem: 'ἐδοξασ', from: 'δοξαζ', imperfect: { stem: 'ἐδοξαζ' }, future1s: 'δοξάσω', en: 'glorify', en3: 'glorifies', past: 'glorified', ing: 'glorifying' },
  { id: 'agapao', lemma: 'ἀγαπάω', tense: 'aorist', firstAorist: true, stem: 'ἠγαπησ', from: 'ἀγαπα', imperfect: { stem: 'ἠγαπ', contract: 'α' }, future1s: 'ἀγαπήσω', en: 'love', en3: 'loves', past: 'loved', ing: 'loving' },
  { id: 'poieo', lemma: 'ποιέω', tense: 'aorist', firstAorist: true, stem: 'ἐποιησ', from: 'ποιε', imperfect: { stem: 'ἐποι', contract: 'ε' }, future1s: 'ποιήσω', en: 'do', en3: 'does', past: 'did', ing: 'doing' },
  { id: 'pleroo', lemma: 'πληρόω', tense: 'aorist', firstAorist: true, stem: 'ἐπληρωσ', from: 'πληρο', imperfect: { stem: 'ἐπληρ', contract: 'ο' }, future1s: 'πληρώσω', en: 'fill', en3: 'fills', past: 'filled', ing: 'filling' },
  {
    id: 'archomai', lemma: 'ἄρχομαι', tense: 'aorist', firstAorist: true, voice: 'middle', stem: 'ἠρξ', from: 'ἀρχ', imperfect: { stem: 'ἠρχ', voice: 'middle' }, future1s: 'ἄρξομαι',
    en: 'begin', en3: 'begins', past: 'began', ing: 'beginning',
  },
  {
    id: 'meno', lemma: 'μένω', tense: 'aorist', firstAorist: true, liquid: true, stem: 'ἐμειν', imperfect: { stem: 'ἐμεν' }, future1s: 'μενῶ',
    en: 'remain', en3: 'remains', past: 'remained', ing: 'remaining', change: 'The stem vowel lengthens: μεν → μειν.',
  },
  {
    id: 'krino', lemma: 'κρίνω', tense: 'aorist', firstAorist: true, liquid: true, stem: 'ἐκριν', imperfect: { stem: 'ἐκριν' }, future1s: 'κρινῶ',
    en: 'judge', en3: 'judges', past: 'judged', ing: 'judging', change: 'Only the α tells it from the imperfect ἔκρινον.',
  },
  {
    id: 'apostello', lemma: 'ἀποστέλλω', tense: 'aorist', firstAorist: true, liquid: true, stem: 'ἀπεστειλ', prefix: 'ἀπ', imperfect: { stem: 'ἀπεστελλ', prefix: 'ἀπ' }, future1s: 'ἀποστελῶ',
    en: 'send', en3: 'sends', past: 'sent', ing: 'sending', change: 'The root *στελ lengthens to στειλ.',
  },
  {
    id: 'egeiro', lemma: 'ἐγείρω', tense: 'aorist', firstAorist: true, liquid: true, stem: 'ἠγειρ', imperfect: { stem: 'ἠγειρ' }, future1s: 'ἐγερῶ',
    en: 'raise', en3: 'raises', past: 'raised', ing: 'raising', change: 'Only the α tells it from the imperfect ἤγειρον.',
  },
  {
    id: 'airo', lemma: 'αἴρω', tense: 'aorist', firstAorist: true, liquid: true, stem: 'ἠρ', imperfect: { stem: 'ᾐρ' }, future1s: 'ἀρῶ',
    en: 'take away', en3: 'takes away', past: 'took away', ing: 'taking away', change: 'The root *ἀρ, with the augment: ἦρα.',
  },
  {
    id: 'aperchomai', lemma: 'ἀπέρχομαι', tense: 'aorist', stem: 'ἀπηλθ', prefix: 'ἀπ', imperfect: { stem: 'ἀπηρχ', prefix: 'ἀπ', voice: 'middle' }, future1s: 'ἀπελεύσομαι',
    en: 'go away', en3: 'goes away', past: 'went away', ing: 'going away', change: 'A second aorist, like ἦλθον.',
  },
  {
    id: 'pino', lemma: 'πίνω', tense: 'aorist', stem: 'ἐπι', imperfect: { stem: 'ἐπιν' }, future1s: 'πίομαι',
    en: 'drink', en3: 'drinks', past: 'drank', ing: 'drinking', change: 'A second aorist: the root *πι, without the ν of the present.',
  },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-13-34', ref: 'John 13:34', text: 'ἵνα ἀγαπᾶτε ἀλλήλους, καθὼς ἠγάπησα ὑμᾶς', word: 'ἠγάπησα', slot: '1s', verb: 'agapao',
    translation: 'that you love one another, just as I have loved you', note: 'ἀγαπᾶτε is present; ἠγάπησα is aorist, with the lengthened η before σα.',
  },
  {
    id: 'john-17-18', ref: 'John 17:18', text: 'κἀγὼ ἀπέστειλα αὐτοὺς εἰς τὸν κόσμον·', word: 'ἀπέστειλα', slot: '1s', verb: 'apostello',
    translation: 'so I have sent them into the world.', note: 'A liquid aorist: no σ, and στελ lengthens to στειλ.',
  },
  {
    id: 'john-12-28', ref: 'John 12:28', text: 'Καὶ ἐδόξασα καὶ πάλιν δοξάσω.', word: 'ἐδόξασα', slot: '1s', verb: 'doxazo',
    translation: 'I have glorified it, and I will glorify it again.', note: 'ἐδόξασα (aorist) and δοξάσω (future) side by side: the augment and α mark the aorist.',
  },
  {
    id: '1cor-5-11', ref: '1 Cor 5:11', text: 'νῦν δὲ ἔγραψα ὑμῖν', word: 'ἔγραψα', slot: '1s', verb: 'grapho',
    translation: 'But now I am writing to you', note: 'φ + σ → ψ. An “epistolary” aorist: the writer’s present is the reader’s past.',
  },
  {
    id: 'acts-11-7', ref: 'Acts 11:7', text: 'ἤκουσα δὲ καὶ φωνῆς λεγούσης μοι', word: 'ἤκουσα', slot: '1s', verb: 'akouo',
    translation: 'And I heard a voice saying to me', help: 'λεγούσης = saying',
  },
  {
    id: '2cor-4-13', ref: '2 Cor 4:13', text: 'Ἐπίστευσα, διὸ ἐλάλησα', word: 'Ἐπίστευσα', slot: '1s', verb: 'pisteuo',
    translation: 'I believed, and so I spoke', help: 'ἐλάλησα = I spoke', note: 'διό, “therefore,” is from this chapter’s vocabulary.',
  },
  // 2nd singular
  {
    id: 'heb-1-9', ref: 'Heb 1:9', text: 'ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν·', word: 'ἠγάπησας', slot: '2s', verb: 'agapao',
    translation: 'You have loved righteousness and hated lawlessness.', help: 'ἐμίσησας = you hated · ἀνομία = lawlessness',
  },
  {
    id: 'john-11-42', ref: 'John 11:42', text: 'ἵνα πιστεύσωσιν ὅτι σύ με ἀπέστειλας.', word: 'ἀπέστειλας', slot: '2s', verb: 'apostello',
    translation: 'that they may believe that you sent me.', help: 'πιστεύσωσιν = they may believe',
  },
  {
    id: 'luke-7-43', ref: 'Luke 7:43', text: 'Ὀρθῶς ἔκρινας.', word: 'ἔκρινας', slot: '2s', verb: 'krino',
    translation: 'You have judged rightly.', help: 'ὀρθῶς = rightly',
  },
  {
    id: 'luke-1-20', ref: 'Luke 1:20', text: 'ἀνθʼ ὧν οὐκ ἐπίστευσας τοῖς λόγοις μου', word: 'ἐπίστευσας', slot: '2s', verb: 'pisteuo',
    translation: 'because you did not believe my words', help: 'ἀνθʼ ὧν = because', note: 'πιστεύω takes a dative object: τοῖς λόγοις.',
  },
  // 3rd singular
  {
    id: '1john-4-10', ref: '1 John 4:10', text: 'ἀλλʼ ὅτι αὐτὸς ἠγάπησεν ἡμᾶς καὶ ἀπέστειλεν τὸν υἱὸν αὐτοῦ', word: 'ἠγάπησεν', slot: '3s', verb: 'agapao',
    translation: 'but that he loved us and sent his Son', note: 'The 3rd singular ends in ε(ν), not α.',
  },
  {
    id: '1john-4-10-apostello', ref: '1 John 4:10', text: 'ἀλλʼ ὅτι αὐτὸς ἠγάπησεν ἡμᾶς καὶ ἀπέστειλεν τὸν υἱὸν αὐτοῦ', word: 'ἀπέστειλεν', slot: '3s', verb: 'apostello',
    translation: 'but that he loved us and sent his Son',
  },
  {
    id: 'john-5-9', ref: 'John 5:9', text: 'καὶ ἦρε τὸν κράβαττον αὐτοῦ καὶ περιεπάτει.', word: 'ἦρε', slot: '3s', verb: 'airo',
    translation: 'and he picked up his mat and began to walk.', help: 'κράβαττος = mat',
    note: 'ἦρε (aorist: he picked it up once) and περιεπάτει (imperfect: he went on walking).',
  },
  {
    id: 'acts-1-1', ref: 'Acts 1:1', text: 'ὧν ἤρξατο ὁ Ἰησοῦς ποιεῖν τε καὶ διδάσκειν', word: 'ἤρξατο', slot: '3s', verb: 'archomai',
    translation: 'all that Jesus began to do and to teach', help: 'ποιεῖν = to do · διδάσκειν = to teach',
  },
  {
    id: 'john-1-45', ref: 'John 1:45', text: 'Ὃν ἔγραψεν Μωϋσῆς ἐν τῷ νόμῳ', word: 'ἔγραψεν', slot: '3s', verb: 'grapho',
    translation: 'The one Moses wrote about in the law',
  },
  {
    id: '1cor-15-15', ref: '1 Cor 15:15', text: 'ὅτι ἤγειρεν τὸν Χριστόν', word: 'ἤγειρεν', slot: '3s', verb: 'egeiro',
    translation: 'that he raised Christ', note: 'The imperfect 3rd singular is identical (ἤγειρε(ν)); every other form of the aorist has an α. Here the sense decides: a single act.',
  },
  {
    id: 'acts-22-30', ref: 'Acts 22:30', text: 'ἔλυσεν αὐτόν', word: 'ἔλυσεν', slot: '3s', verb: 'lyo',
    translation: 'he released him',
  },
  {
    id: '2cor-5-21', ref: '2 Cor 5:21', text: 'τὸν μὴ γνόντα ἁμαρτίαν ὑπὲρ ἡμῶν ἁμαρτίαν ἐποίησεν', word: 'ἐποίησεν', slot: '3s', verb: 'poieo',
    translation: 'He made him who knew no sin to be sin for us', help: 'τὸν μὴ γνόντα = the one who did not know',
  },
  {
    id: 'acts-2-2', ref: 'Acts 2:2', text: 'καὶ ἐπλήρωσεν ὅλον τὸν οἶκον', word: 'ἐπλήρωσεν', slot: '3s', verb: 'pleroo',
    translation: 'and it filled the whole house',
  },
  {
    id: '1cor-2-9', ref: '1 Cor 2:9', text: 'Ἃ ὀφθαλμὸς οὐκ εἶδεν καὶ οὖς οὐκ ἤκουσεν', word: 'ἤκουσεν', slot: '3s', verb: 'akouo',
    translation: 'What no eye has seen and no ear has heard', help: 'οὖς = ear', note: 'εἶδεν (second aorist) and ἤκουσεν (first aorist) side by side.',
  },
  {
    id: 'acts-10-37', ref: 'Acts 10:37', text: 'μετὰ τὸ βάπτισμα ὃ ἐκήρυξεν Ἰωάννης', word: 'ἐκήρυξεν', slot: '3s', verb: 'kerysso',
    translation: 'after the baptism that John proclaimed', note: 'κηρύσσω’s root is *κηρυγ: γ + σ → ξ.',
  },
  {
    id: 'acts-10-7', ref: 'Acts 10:7', text: 'ὡς δὲ ἀπῆλθεν ὁ ἄγγελος ὁ λαλῶν αὐτῷ', word: 'ἀπῆλθεν', slot: '3s', verb: 'aperchomai',
    translation: 'When the angel who spoke to him had gone away', help: 'ὁ λαλῶν = who was speaking',
  },
  {
    id: 'acts-9-9', ref: 'Acts 9:9', text: 'καὶ οὐκ ἔφαγεν οὐδὲ ἔπιεν.', word: 'ἔπιεν', slot: '3s', verb: 'pino',
    translation: 'and he neither ate nor drank.', help: 'ἔφαγεν = he ate',
  },
  // 1st plural
  {
    id: 'gal-2-16', ref: 'Gal 2:16', text: 'καὶ ἡμεῖς εἰς Χριστὸν Ἰησοῦν ἐπιστεύσαμεν', word: 'ἐπιστεύσαμεν', slot: '1p', verb: 'pisteuo',
    translation: 'we too have believed in Christ Jesus',
  },
  {
    id: 'matt-7-22', ref: 'Matt 7:22', text: 'καὶ τῷ σῷ ὀνόματι δυνάμεις πολλὰς ἐποιήσαμεν;', word: 'ἐποιήσαμεν', slot: '1p', verb: 'poieo',
    translation: 'and did many mighty works in your name?', note: 'δύναμις, “power, miracle,” is from this chapter’s vocabulary.',
  },
  {
    id: 'acts-15-24', ref: 'Acts 15:24', text: 'ἐπειδὴ ἠκούσαμεν ὅτι', word: 'ἠκούσαμεν', slot: '1p', verb: 'akouo',
    translation: 'Since we have heard that', help: 'ἐπειδή = since',
  },
  {
    id: '2cor-11-4', ref: '2 Cor 11:4', text: 'ἄλλον Ἰησοῦν κηρύσσει ὃν οὐκ ἐκηρύξαμεν', word: 'ἐκηρύξαμεν', slot: '1p', verb: 'kerysso',
    translation: 'proclaims another Jesus than the one we proclaimed', note: 'κηρύσσει (present) and ἐκηρύξαμεν (aorist) in one line.',
  },
  // 2nd plural
  {
    id: '1cor-15-11', ref: '1 Cor 15:11', text: 'οὕτως κηρύσσομεν καὶ οὕτως ἐπιστεύσατε.', word: 'ἐπιστεύσατε', slot: '2p', verb: 'pisteuo',
    translation: 'so we preach and so you believed.',
  },
  {
    id: '1john-2-18', ref: '1 John 2:18', text: 'καθὼς ἠκούσατε ὅτι ἀντίχριστος ἔρχεται', word: 'ἠκούσατε', slot: '2p', verb: 'akouo',
    translation: 'as you heard that antichrist is coming',
  },
  {
    id: 'acts-4-7', ref: 'Acts 4:7', text: 'Ἐν ποίᾳ δυνάμει ἢ ἐν ποίῳ ὀνόματι ἐποιήσατε τοῦτο ὑμεῖς;', word: 'ἐποιήσατε', slot: '2p', verb: 'poieo',
    translation: 'By what power or by what name did you do this?', help: 'ποῖος = what kind of',
  },
  {
    id: 'luke-11-52', ref: 'Luke 11:52', text: 'ὅτι ἤρατε τὴν κλεῖδα τῆς γνώσεως', word: 'ἤρατε', slot: '2p', verb: 'airo',
    translation: 'because you have taken away the key of knowledge', help: 'κλείς = key · γνῶσις = knowledge',
  },
  // 3rd plural
  {
    id: 'john-12-43', ref: 'John 12:43', text: 'ἠγάπησαν γὰρ τὴν δόξαν τῶν ἀνθρώπων μᾶλλον ἤπερ τὴν δόξαν τοῦ θεοῦ.', word: 'ἠγάπησαν', slot: '3p', verb: 'agapao',
    translation: 'for they loved the glory that comes from people more than the glory that comes from God.', help: 'μᾶλλον ἤπερ = more than',
  },
  {
    id: 'acts-13-48', ref: 'Acts 13:48', text: 'καὶ ἐπίστευσαν ὅσοι ἦσαν τεταγμένοι εἰς ζωὴν αἰώνιον·', word: 'ἐπίστευσαν', slot: '3p', verb: 'pisteuo',
    translation: 'and as many as were appointed to eternal life believed.', help: 'τεταγμένοι = appointed',
  },
  {
    id: 'mark-16-20', ref: 'Mark 16:20', text: 'ἐκεῖνοι δὲ ἐξελθόντες ἐκήρυξαν πανταχοῦ', word: 'ἐκήρυξαν', slot: '3p', verb: 'kerysso',
    translation: 'And they went out and preached everywhere', help: 'ἐξελθόντες = going out · πανταχοῦ = everywhere',
  },
  {
    id: 'john-1-39', ref: 'John 1:39', text: 'καὶ παρʼ αὐτῷ ἔμειναν τὴν ἡμέραν ἐκείνην·', word: 'ἔμειναν', slot: '3p', verb: 'meno',
    translation: 'and they stayed with him that day.', note: 'A liquid aorist: μεν lengthens to μειν.',
  },
  {
    id: 'acts-2-4', ref: 'Acts 2:4', text: 'καὶ ἤρξαντο λαλεῖν ἑτέραις γλώσσαις', word: 'ἤρξαντο', slot: '3p', verb: 'archomai',
    translation: 'and they began to speak in other tongues', help: 'λαλεῖν = to speak · ἕτερος = other',
  },
  {
    id: 'acts-11-18', ref: 'Acts 11:18', text: 'ἡσύχασαν καὶ ἐδόξασαν τὸν θεὸν', word: 'ἐδόξασαν', slot: '3p', verb: 'doxazo',
    translation: 'they fell silent and glorified God', help: 'ἡσύχασαν = they fell silent',
  },
]

export const chapter23: Chapter = {
  number: 23,
  title: 'First Aorist Active/Middle Indicative',
  short: 'First aorist',
  topics: ['aorist1'],
  vocab: [
    { id: 'aperchomai', lemma: 'ἀπέρχομαι', pos: 'verb', gloss: 'I depart, go away', accept: ['i depart', 'depart', 'i go away', 'go away', 'leave'] },
    { id: 'archomai', lemma: 'ἄρχομαι', pos: 'verb', gloss: 'I begin', hook: 'Same root as ἀρχή, beginning: archaic, archaeology.', accept: ['i begin', 'begin', 'start'] },
    { id: 'grapho', lemma: 'γράφω', pos: 'verb', gloss: 'I write', hook: 'Graphic, autograph, biography.', accept: ['i write', 'write'] },
    { id: 'dio', lemma: 'διό', pos: 'conjunction', gloss: 'therefore, for this reason', accept: ['therefore', 'for this reason', 'so', 'wherefore'] },
    { id: 'doxazo', lemma: 'δοξάζω', pos: 'verb', gloss: 'I glorify, praise, honor', hook: 'From δόξα, glory: doxology, a hymn of praise.', accept: ['i glorify', 'glorify', 'i praise', 'praise', 'i honor', 'honor', 'honour'] },
    { id: 'dynamis', lemma: 'δύναμις', lexical: 'δύναμις, -εως, ἡ', pos: 'noun', gloss: 'power, miracle', hook: 'Dynamic, dynamite: the cognate of δύναμαι.', accept: ['power', 'miracle', 'might', 'mighty work', 'ability'] },
    { id: 'kerysso', lemma: 'κηρύσσω', pos: 'verb', gloss: 'I proclaim, preach', hook: 'Kerygma: the proclamation of the gospel.', accept: ['i proclaim', 'proclaim', 'i preach', 'preach', 'announce'] },
    { id: 'pino', lemma: 'πίνω', pos: 'verb', gloss: 'I drink', accept: ['i drink', 'drink'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

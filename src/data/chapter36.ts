import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 36: ἵστημι, τίθημι, δείκνυμι; Odds and Ends.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * The other μι verbs follow δίδωμι's rules. Presents (and the second aorist ἔστην) are listed; the future, the κα
 * aorists (ἔθηκα, ἀφῆκα), the σα aorists (ἔστησα, ἔδειξα), the perfects and the passives come from their stems.
 */
const VERBS: PresentVerb[] = [
  {
    id: 'histemi', lemma: 'ἵστημι', stem: 'ἵστη', en: 'set', en3: 'sets',
    irregular: { '1s': 'ἵστημι', '2s': 'ἵστης', '3s': 'ἵστησι(ν)', '1p': 'ἵσταμεν', '2p': 'ἵστατε', '3p': 'ἱστᾶσι(ν)' },
    change: 'Root *στα, reduplicated with ι; the σ of σι- became a rough breathing: ἱ-στη-μι.',
  },
  { id: 'histemi-fut', lemma: 'ἵστημι', tense: 'future', stem: 'στήσ', en: 'set', en3: 'sets' },
  {
    id: 'histemi-aor1', lemma: 'ἵστημι', tense: 'aorist', firstAorist: true, stem: 'ἐστησ', past: 'set', en: 'set', en3: 'sets',
    change: 'The first aorist is transitive: “I set, caused to stand.”',
  },
  {
    id: 'histemi-aor2', lemma: 'ἵστημι', tense: 'aorist', stem: 'ἐστη', past: 'stood', en: 'stand', en3: 'stands',
    irregular: { '1s': 'ἔστην', '2s': 'ἔστης', '3s': 'ἔστη', '1p': 'ἔστημεν', '2p': 'ἔστητε', '3p': 'ἔστησαν' },
    change: 'The second aorist is intransitive: “I stood.” Its 3rd plural ἔστησαν is spelled like the first aorist’s.',
  },
  {
    id: 'histemi-perf', lemma: 'ἵστημι', tense: 'perfect', stem: 'ἑστηκ', pp: 'stood', en: 'stand', en3: 'stands',
    change: 'ἕστηκα has a present meaning: “I stand.”',
  },
  {
    id: 'tithemi', lemma: 'τίθημι', stem: 'τίθη', en: 'put', en3: 'puts',
    irregular: { '1s': 'τίθημι', '2s': 'τίθης', '3s': 'τίθησι(ν)', '1p': 'τίθεμεν', '2p': 'τίθετε', '3p': 'τιθέασι(ν)' },
    change: 'Root *θε, reduplicated: θι-θη becomes τι-θη, since two aspirates in a row lose the first one’s h.',
  },
  { id: 'tithemi-mp', lemma: 'τίθημι', stem: 'τίθε', athematic: true, voice: 'passive', pp: 'put', en: 'put', en3: 'puts' },
  { id: 'tithemi-fut', lemma: 'τίθημι', tense: 'future', stem: 'θήσ', en: 'put', en3: 'puts' },
  { id: 'tithemi-aor', lemma: 'τίθημι', tense: 'aorist', firstAorist: true, stem: 'ἐθηκ', past: 'put', en: 'put', en3: 'puts', change: 'Like ἔδωκα, a κα aorist.' },
  {
    id: 'tithemi-aormid', lemma: 'τίθημι', tense: 'aorist', voice: 'middle', stem: 'ἐθε', past: 'put', en: 'put', en3: 'puts',
    irregular: { '1s': 'ἐθέμην', '2s': 'ἔθου', '3s': 'ἔθετο', '1p': 'ἐθέμεθα', '2p': 'ἔθεσθε', '3p': 'ἔθεντο' },
    change: 'The aorist middle is built on the short root ἐθε with no connecting vowel.',
  },
  { id: 'tithemi-perf', lemma: 'τίθημι', tense: 'perfect', stem: 'τεθεικ', pp: 'put', en: 'put', en3: 'puts' },
  { id: 'tithemi-aorp', lemma: 'τίθημι', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐτεθη', pp: 'put', en: 'put', en3: 'puts' },
  {
    id: 'deiknymi', lemma: 'δείκνυμι', stem: 'δείκνυ', en: 'show', en3: 'shows',
    irregular: { '1s': 'δείκνυμι', '2s': 'δείκνυς', '3s': 'δείκνυσι(ν)', '1p': 'δείκνυμεν', '2p': 'δείκνυτε', '3p': 'δεικνύασι(ν)' },
    change: 'No reduplication: νυ is added to the root *δεικ in the present.',
  },
  { id: 'deiknymi-fut', lemma: 'δείκνυμι', tense: 'future', stem: 'δείξ', en: 'show', en3: 'shows' },
  { id: 'deiknymi-aor', lemma: 'δείκνυμι', tense: 'aorist', firstAorist: true, stem: 'ἐδειξ', past: 'showed', en: 'show', en3: 'shows' },
  {
    id: 'aphiemi', lemma: 'ἀφίημι', stem: 'ἀφίη', en: 'forgive, leave', en3: 'forgives',
    irregular: { '1s': 'ἀφίημι', '2s': 'ἀφίης', '3s': 'ἀφίησι(ν)', '1p': 'ἀφίεμεν', '2p': 'ἀφίετε', '3p': 'ἀφιᾶσι(ν)' },
    change: 'ἀπό + ἵημι (root *σε): the π becomes φ before the rough breathing, and the root nearly disappears.',
  },
  { id: 'aphiemi-mp', lemma: 'ἀφίημι', stem: 'ἀφίε', athematic: true, voice: 'passive', pp: 'forgiven', en: 'forgive', en3: 'forgives' },
  { id: 'aphiemi-fut', lemma: 'ἀφίημι', tense: 'future', stem: 'ἀφήσ', en: 'forgive, leave', en3: 'forgives' },
  { id: 'aphiemi-aor', lemma: 'ἀφίημι', tense: 'aorist', firstAorist: true, stem: 'ἀφηκ', prefix: 'ἀφ', past: 'forgave, left', en: 'forgive, leave', en3: 'forgives', change: 'A κα aorist: ἀφῆκα.' },
  { id: 'aphiemi-aorp', lemma: 'ἀφίημι', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἀφεθη', prefix: 'ἀφ', pp: 'forgiven', en: 'forgive', en3: 'forgives' },
  {
    id: 'anistemi-aor2', lemma: 'ἀνίστημι', tense: 'aorist', stem: 'ἀνεστη', past: 'rose', en: 'rise', en3: 'rises',
    irregular: { '1s': 'ἀνέστην', '2s': 'ἀνέστης', '3s': 'ἀνέστη', '1p': 'ἀνέστημεν', '2p': 'ἀνέστητε', '3p': 'ἀνέστησαν' },
    change: 'Like ἔστην, the second aorist is intransitive: “I rose.”',
  },
  { id: 'anistemi-fut', lemma: 'ἀνίστημι', tense: 'future', stem: 'ἀναστήσ', en: 'raise', en3: 'raises', change: 'The future active is transitive: “I will raise.”' },
  { id: 'anistemi-futm', lemma: 'ἀνίστημι', tense: 'future', voice: 'middle', stem: 'ἀναστήσ', en: 'rise', en3: 'rises', change: 'The future middle is intransitive: “I will rise.”' },
]

const VERSES: PresentVerse[] = [
  // ἵστημι and ἀνίστημι.
  { id: 'matt-4-5', ref: 'Matt 4:5', text: 'καὶ ἔστησεν αὐτὸν ἐπὶ τὸ πτερύγιον τοῦ ἱεροῦ', word: 'ἔστησεν', slot: '3s', verb: 'histemi-aor1', translation: 'and he set him on the pinnacle of the temple', help: 'πτερύγιον = pinnacle', note: 'Transitive: it has an object, αὐτόν.' },
  { id: 'matt-26-15', ref: 'Matt 26:15', text: 'οἱ δὲ ἔστησαν αὐτῷ τριάκοντα ἀργύρια.', word: 'ἔστησαν', slot: '3p', verb: 'histemi-aor1', translation: 'And they weighed out for him thirty pieces of silver.', help: 'ἀργύριον = piece of silver', note: 'ἔστησαν could be either aorist; the object makes it the transitive first aorist: they “set” (weighed) the silver.' },
  { id: 'matt-25-33', ref: 'Matt 25:33', text: 'καὶ στήσει τὰ μὲν πρόβατα ἐκ δεξιῶν αὐτοῦ', word: 'στήσει', slot: '3s', verb: 'histemi-fut', translation: 'And he will place the sheep on his right', help: 'πρόβατον = sheep', note: 'δεξιός is from chapter 27.' },
  { id: 'john-1-26', ref: 'John 1:26', text: 'μέσος ὑμῶν ἕστηκεν ὃν ὑμεῖς οὐκ οἴδατε', word: 'ἕστηκεν', slot: '3s', verb: 'histemi-perf', translation: 'among you stands one you do not know', note: 'ἕστηκα is perfect in form, present in meaning. μέσος is from this chapter’s vocabulary.' },
  { id: 'acts-7-33', ref: 'Acts 7:33', text: 'ὁ γὰρ τόπος ἐφʼ ᾧ ἕστηκας γῆ ἁγία ἐστίν.', word: 'ἕστηκας', slot: '2s', verb: 'histemi-perf', translation: 'for the place where you are standing is holy ground.' },
  { id: 'matt-20-6', ref: 'Matt 20:6', text: 'Τί ὧδε ἑστήκατε ὅλην τὴν ἡμέραν ἀργοί;', word: 'ἑστήκατε', slot: '2p', verb: 'histemi-perf', translation: 'Why do you stand here idle all day?', help: 'ἀργός = idle' },
  { id: 'mark-3-26', ref: 'Mark 3:26', text: 'καὶ εἰ ὁ Σατανᾶς ἀνέστη ἐφʼ ἑαυτὸν', word: 'ἀνέστη', slot: '3s', verb: 'anistemi-aor2', translation: 'And if Satan has risen up against himself', note: 'Intransitive second aorist of ἀνίστημι, from this chapter’s vocabulary.' },
  { id: 'john-6-44', ref: 'John 6:44', text: 'κἀγὼ ἀναστήσω αὐτὸν ἐν τῇ ἐσχάτῃ ἡμέρᾳ.', word: 'ἀναστήσω', slot: '1s', verb: 'anistemi-fut', translation: 'and I will raise him up on the last day.' },
  { id: 'acts-7-37', ref: 'Acts 7:37', text: 'Προφήτην ὑμῖν ἀναστήσει ὁ θεὸς ἐκ τῶν ἀδελφῶν ὑμῶν ὡς ἐμέ.', word: 'ἀναστήσει', slot: '3s', verb: 'anistemi-fut', translation: 'God will raise up for you a prophet like me from your brothers.' },
  { id: 'luke-18-33', ref: 'Luke 18:33', text: 'καὶ τῇ ἡμέρᾳ τῇ τρίτῃ ἀναστήσεται.', word: 'ἀναστήσεται', slot: '3s', verb: 'anistemi-futm', translation: 'and on the third day he will rise.', note: 'The future middle is intransitive: “he will rise.”' },
  // τίθημι.
  { id: 'john-10-11', ref: 'John 10:11', text: 'ὁ ποιμὴν ὁ καλὸς τὴν ψυχὴν αὐτοῦ τίθησιν ὑπὲρ τῶν προβάτων·', word: 'τίθησιν', slot: '3s', verb: 'tithemi', translation: 'The good shepherd lays down his life for the sheep.', help: 'ποιμήν = shepherd' },
  { id: 'john-10-15', ref: 'John 10:15', text: 'καὶ τὴν ψυχήν μου τίθημι ὑπὲρ τῶν προβάτων.', word: 'τίθημι', slot: '1s', verb: 'tithemi', translation: 'and I lay down my life for the sheep.' },
  { id: 'john-13-37', ref: 'John 13:37', text: 'τὴν ψυχήν μου ὑπὲρ σοῦ θήσω.', word: 'θήσω', slot: '1s', verb: 'tithemi-fut', translation: 'I will lay down my life for you.', note: 'Peter echoes John 10:15, in the future.' },
  { id: 'luke-23-53', ref: 'Luke 23:53', text: 'καὶ ἔθηκεν αὐτὸν ἐν μνήματι λαξευτῷ', word: 'ἔθηκεν', slot: '3s', verb: 'tithemi-aor', translation: 'and he laid him in a tomb cut in stone', help: 'μνῆμα = tomb · λαξευτός = cut in rock' },
  { id: 'mark-6-29', ref: 'Mark 6:29', text: 'καὶ ἦραν τὸ πτῶμα αὐτοῦ καὶ ἔθηκαν αὐτὸ ἐν μνημείῳ.', word: 'ἔθηκαν', slot: '3p', verb: 'tithemi-aor', translation: 'and they took his body and laid it in a tomb.', help: 'πτῶμα = body, corpse' },
  { id: 'luke-19-21', ref: 'Luke 19:21', text: 'αἴρεις ὃ οὐκ ἔθηκας καὶ θερίζεις ὃ οὐκ ἔσπειρας.', word: 'ἔθηκας', slot: '2s', verb: 'tithemi-aor', translation: 'you take what you did not deposit, and reap what you did not sow.', help: 'θερίζεις = you reap', note: 'σπείρω is from chapter 28.' },
  { id: 'acts-1-7', ref: 'Acts 1:7', text: 'χρόνους ἢ καιροὺς οὓς ὁ πατὴρ ἔθετο ἐν τῇ ἰδίᾳ ἐξουσίᾳ', word: 'ἔθετο', slot: '3s', verb: 'tithemi-aormid', translation: 'times or seasons that the Father has fixed by his own authority', note: 'ἴδιος, “one’s own,” is from this chapter’s vocabulary.' },
  { id: 'john-11-34', ref: 'John 11:34', text: 'Ποῦ τεθείκατε αὐτόν;', word: 'τεθείκατε', slot: '2p', verb: 'tithemi-perf', translation: 'Where have you laid him?', help: 'ποῦ = where?' },
  // δείκνυμι.
  { id: '1cor-12-31', ref: '1 Cor 12:31', text: 'καὶ ἔτι καθʼ ὑπερβολὴν ὁδὸν ὑμῖν δείκνυμι.', word: 'δείκνυμι', slot: '1s', verb: 'deiknymi', translation: 'And I will show you a still more excellent way.', help: 'καθʼ ὑπερβολήν = beyond comparison' },
  { id: 'luke-4-5', ref: 'Luke 4:5', text: 'ἔδειξεν αὐτῷ πάσας τὰς βασιλείας τῆς οἰκουμένης', word: 'ἔδειξεν', slot: '3s', verb: 'deiknymi-aor', translation: 'he showed him all the kingdoms of the world', help: 'οἰκουμένη = the inhabited world' },
  { id: 'john-10-32', ref: 'John 10:32', text: 'Πολλὰ ἔργα καλὰ ἔδειξα ὑμῖν ἐκ τοῦ πατρός·', word: 'ἔδειξα', slot: '1s', verb: 'deiknymi-aor', translation: 'I have shown you many good works from the Father.' },
  { id: 'mark-14-15', ref: 'Mark 14:15', text: 'καὶ αὐτὸς ὑμῖν δείξει ἀνάγαιον μέγα', word: 'δείξει', slot: '3s', verb: 'deiknymi-fut', translation: 'And he will show you a large upper room', help: 'ἀνάγαιον = upper room' },
  // ἀφίημι.
  { id: 'john-16-28', ref: 'John 16:28', text: 'πάλιν ἀφίημι τὸν κόσμον καὶ πορεύομαι πρὸς τὸν πατέρα.', word: 'ἀφίημι', slot: '1s', verb: 'aphiemi', translation: 'Now I am leaving the world and going to the Father.' },
  { id: 'matt-4-11', ref: 'Matt 4:11', text: 'τότε ἀφίησιν αὐτὸν ὁ διάβολος', word: 'ἀφίησιν', slot: '3s', verb: 'aphiemi', translation: 'Then the devil left him', help: 'διάβολος = devil' },
  { id: 'matt-23-38', ref: 'Matt 23:38', text: 'ἰδοὺ ἀφίεται ὑμῖν ὁ οἶκος ὑμῶν ἔρημος.', word: 'ἀφίεται', slot: '3s', verb: 'aphiemi-mp', translation: 'See, your house is left to you desolate.', help: 'ἔρημος = desolate' },
  { id: 'matt-6-12', ref: 'Matt 6:12', text: 'ὡς καὶ ἡμεῖς ἀφήκαμεν τοῖς ὀφειλέταις ἡμῶν·', word: 'ἀφήκαμεν', slot: '1p', verb: 'aphiemi-aor', translation: 'as we also have forgiven our debtors.', help: 'ὀφειλέτης = debtor' },
  { id: 'matt-8-15', ref: 'Matt 8:15', text: 'καὶ ἀφῆκεν αὐτὴν ὁ πυρετός', word: 'ἀφῆκεν', slot: '3s', verb: 'aphiemi-aor', translation: 'and the fever left her', help: 'πυρετός = fever' },
  { id: 'mark-11-6', ref: 'Mark 11:6', text: 'καὶ ἀφῆκαν αὐτούς.', word: 'ἀφῆκαν', slot: '3p', verb: 'aphiemi-aor', translation: 'and they let them go.' },
  { id: 'john-14-18', ref: 'John 14:18', text: 'Οὐκ ἀφήσω ὑμᾶς ὀρφανούς', word: 'ἀφήσω', slot: '1s', verb: 'aphiemi-fut', translation: 'I will not leave you as orphans', help: 'ὀρφανός = orphan' },
  { id: 'rom-4-7', ref: 'Rom 4:7', text: 'Μακάριοι ὧν ἀφέθησαν αἱ ἀνομίαι', word: 'ἀφέθησαν', slot: '3p', verb: 'aphiemi-aorp', translation: 'Blessed are those whose lawless deeds are forgiven', help: 'ἀνομία = lawless deed' },
]

export const chapter36: Chapter = {
  number: 36,
  title: 'ἵστημι, τίθημι, δείκνυμι; Odds and Ends',
  short: 'ἵστημι, τίθημι',
  topics: ['mi2'],
  vocab: [
    { id: 'anistemi', lemma: 'ἀνίστημι', pos: 'verb', gloss: 'intransitive: I rise, get up; transitive: I raise', hook: 'ἀνά “up” + ἵστημι: the noun is ἀνάστασις, “resurrection.”', accept: ['i rise', 'rise', 'get up', 'i get up', 'i raise', 'raise', 'stand up', 'arise'] },
    { id: 'anoigo', lemma: 'ἀνοίγω', pos: 'verb', gloss: 'I open', hook: 'Its aorist has three spellings: ἀνέῳξα, ἠνέῳξα, ἤνοιξα.', accept: ['i open', 'open'] },
    { id: 'aphiemi', lemma: 'ἀφίημι', pos: 'verb', gloss: 'I let go, leave, permit, forgive', hook: 'Aphesis, “letting go,” is the New Testament word for forgiveness (ἄφεσις).', accept: ['i let go', 'let go', 'leave', 'i leave', 'permit', 'forgive', 'i forgive', 'allow', 'release'] },
    { id: 'deiknymi', lemma: 'δείκνυμι', pos: 'verb', gloss: 'I show, explain', hook: 'Deictic words point things out: this, that.', accept: ['i show', 'show', 'explain', 'i explain', 'point out'] },
    { id: 'idios', lemma: 'ἴδιος', lexical: 'ἴδιος, -α, -ον', pos: 'adjective', gloss: 'one’s own (e.g., people, home)', hook: 'Idiom, idiosyncrasy: what is one’s own.', accept: ['own', 'one’s own', "one's own", 'his own', 'private'] },
    { id: 'histemi', lemma: 'ἵστημι', pos: 'verb', gloss: 'transitive: I cause to stand, set; intransitive: I stand', hook: 'Stand, static, and the root *στα.', accept: ['i stand', 'stand', 'i set', 'set', 'cause to stand', 'i cause to stand', 'place', 'establish'] },
    { id: 'mesos', lemma: 'μέσος', lexical: 'μέσος, -η, -ον', pos: 'adjective', gloss: 'middle, in the midst', hook: 'Mesopotamia: the land “between the rivers.”', accept: ['middle', 'in the midst', 'midst', 'among', 'in the middle'] },
    { id: 'tithemi', lemma: 'τίθημι', pos: 'verb', gloss: 'I put, place', hook: 'Root *θε: a thesis is something “placed” before you.', accept: ['i put', 'put', 'i place', 'place', 'lay', 'set', 'lay down'] },
    { id: 'phemi', lemma: 'φημί', pos: 'verb', gloss: 'I say, affirm', hook: 'You already know its most common form, ἔφη (chapter 28).', accept: ['i say', 'say', 'affirm', 'i affirm'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

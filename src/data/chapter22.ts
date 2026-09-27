import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 22: Second Aorist Active/Middle Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λαμβάνω first (ἔλαβον). `stem` is the augmented second aorist stem without an accent, and takes the imperfect's
 * endings; `imperfect` is the augmented present stem, for telling the two apart.
 */
const VERBS: PresentVerb[] = [
  { id: 'lambano', lemma: 'λαμβάνω', tense: 'aorist', stem: 'ἐλαβ', imperfect: { stem: 'ἐλαμβαν' }, en: 'take', en3: 'takes', past: 'took', ing: 'taking' },
  { id: 'ballo', lemma: 'βάλλω', tense: 'aorist', stem: 'ἐβαλ', imperfect: { stem: 'ἐβαλλ' }, en: 'throw', en3: 'throws', past: 'threw', ing: 'throwing' },
  {
    id: 'apothnesko', lemma: 'ἀποθνῄσκω', tense: 'aorist', stem: 'ἀπεθαν', prefix: 'ἀπ', imperfect: { stem: 'ἀπεθνῃσκ', prefix: 'ἀπ' },
    en: 'die', en3: 'dies', past: 'died', ing: 'dying',
  },
  { id: 'heurisko', lemma: 'εὑρίσκω', tense: 'aorist', stem: 'εὑρ', imperfect: { stem: 'εὑρισκ' }, en: 'find', en3: 'finds', past: 'found', ing: 'finding' },
  {
    id: 'ginomai', lemma: 'γίνομαι', tense: 'aorist', voice: 'middle', stem: 'ἐγεν', imperfect: { stem: 'ἐγιν', voice: 'middle' },
    en: 'become', en3: 'becomes', past: 'became', ing: 'becoming',
  },
  {
    id: 'erchomai', lemma: 'ἔρχομαι', tense: 'aorist', stem: 'ἠλθ', imperfect: { stem: 'ἠρχ', voice: 'middle' },
    en: 'come', en3: 'comes', past: 'came', ing: 'coming',
  },
  {
    id: 'eiserchomai', lemma: 'εἰσέρχομαι', tense: 'aorist', stem: 'εἰσηλθ', prefix: 'εἰσ', imperfect: { stem: 'εἰσηρχ', prefix: 'εἰσ', voice: 'middle' },
    en: 'enter', en3: 'enters', past: 'entered', ing: 'entering',
  },
  {
    id: 'exerchomai', lemma: 'ἐξέρχομαι', tense: 'aorist', stem: 'ἐξηλθ', prefix: 'ἐξ', imperfect: { stem: 'ἐξηρχ', prefix: 'ἐξ', voice: 'middle' },
    en: 'go out', en3: 'goes out', past: 'went out', ing: 'going out',
  },
  {
    id: 'proserchomai', lemma: 'προσέρχομαι', tense: 'aorist', stem: 'προσηλθ', prefix: 'προσ', imperfect: { stem: 'προσηρχ', prefix: 'προσ', voice: 'middle' },
    en: 'come to', en3: 'comes to', past: 'came to', ing: 'coming to',
  },
  { id: 'lego', lemma: 'λέγω', tense: 'aorist', stem: 'εἰπ', imperfect: { stem: 'ἐλεγ' }, en: 'say', en3: 'says', past: 'said', ing: 'saying' },
  { id: 'horao', lemma: 'ὁράω', tense: 'aorist', stem: 'εἰδ', imperfect: { stem: 'ἑωρ', contract: 'α' }, en: 'see', en3: 'sees', past: 'saw', ing: 'seeing' },
  { id: 'echo', lemma: 'ἔχω', tense: 'aorist', stem: 'ἐσχ', imperfect: { stem: 'εἰχ' }, en: 'have', en3: 'has', past: 'had', ing: 'having' },
  {
    id: 'synago', lemma: 'συνάγω', tense: 'aorist', stem: 'συνηγαγ', prefix: 'συν', imperfect: { stem: 'συνηγ', prefix: 'συν' },
    en: 'gather together', en3: 'gathers together', past: 'gathered together', ing: 'gathering together',
  },
  {
    id: 'ginosko', lemma: 'γινώσκω', tense: 'aorist', stem: 'ἐγνω', imperfect: { stem: 'ἐγινωσκ' },
    irregular: { '1s': 'ἔγνων', '2s': 'ἔγνως', '3s': 'ἔγνω', '1p': 'ἔγνωμεν', '2p': 'ἔγνωτε', '3p': 'ἔγνωσαν' },
    en: 'know', en3: 'knows', past: 'knew', ing: 'knowing',
  },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'gal-2-19', ref: 'Gal 2:19', text: 'ἐγὼ γὰρ διὰ νόμου νόμῳ ἀπέθανον ἵνα θεῷ ζήσω·', word: 'ἀπέθανον', slot: '1s', verb: 'apothnesko',
    translation: 'For through the law I died to the law, so that I might live to God.', help: 'ζήσω = I might live',
    note: 'ἐγώ shows that ἀπέθανον is 1st singular here, not 3rd plural.',
  },
  {
    id: '1cor-2-3', ref: '1 Cor 2:3', text: 'κἀγὼ ἐν ἀσθενείᾳ καὶ ἐν φόβῳ καὶ ἐν τρόμῳ πολλῷ ἐγενόμην πρὸς ὑμᾶς', word: 'ἐγενόμην', slot: '1s', verb: 'ginomai',
    translation: 'And I was with you in weakness and in fear and in much trembling', help: 'ἀσθένεια = weakness · φόβος = fear · τρόμος = trembling',
  },
  {
    id: 'luke-15-6', ref: 'Luke 15:6', text: 'ὅτι εὗρον τὸ πρόβατόν μου τὸ ἀπολωλός.', word: 'εὗρον', slot: '1s', verb: 'heurisko',
    translation: 'because I have found my sheep that was lost.', help: 'πρόβατον = sheep · τὸ ἀπολωλός = that was lost',
  },
  {
    id: 'matt-5-17', ref: 'Matt 5:17', text: 'οὐκ ἦλθον καταλῦσαι ἀλλὰ πληρῶσαι·', word: 'ἦλθον', slot: '1s', verb: 'erchomai',
    translation: 'I did not come to abolish but to fulfill.', help: 'καταλῦσαι = to abolish · πληρῶσαι = to fulfill',
  },
  {
    id: 'john-14-28', ref: 'John 14:28', text: 'ἠκούσατε ὅτι ἐγὼ εἶπον ὑμῖν', word: 'εἶπον', slot: '1s', verb: 'lego',
    translation: 'You heard that I said to you', help: 'ἠκούσατε = you heard',
  },
  {
    id: 'john-17-25', ref: 'John 17:25', text: 'καὶ ὁ κόσμος σε οὐκ ἔγνω, ἐγὼ δέ σε ἔγνων', word: 'ἔγνων', slot: '1s', verb: 'ginosko',
    translation: 'The world did not know you, but I knew you', note: 'ἔγνω (3rd sg) and ἔγνων (1st sg) side by side.',
  },
  // 2nd singular
  {
    id: 'john-4-18', ref: 'John 4:18', text: 'πέντε γὰρ ἄνδρας ἔσχες', word: 'ἔσχες', slot: '2s', verb: 'echo',
    translation: 'for you have had five husbands', help: 'πέντε = five',
  },
  {
    id: 'luke-1-30', ref: 'Luke 1:30', text: 'εὗρες γὰρ χάριν παρὰ τῷ θεῷ·', word: 'εὗρες', slot: '2s', verb: 'heurisko',
    translation: 'for you have found favor with God.',
  },
  {
    id: '1cor-4-7', ref: '1 Cor 4:7', text: 'τί δὲ ἔχεις ὃ οὐκ ἔλαβες;', word: 'ἔλαβες', slot: '2s', verb: 'lambano',
    translation: 'What do you have that you did not receive?', note: 'ἔχεις (present) and ἔλαβες (aorist) in one question.',
  },
  // 3rd singular
  {
    id: 'john-1-14', ref: 'John 1:14', text: 'Καὶ ὁ λόγος σὰρξ ἐγένετο', word: 'ἐγένετο', slot: '3s', verb: 'ginomai',
    translation: 'And the Word became flesh', note: 'γίνομαι takes a predicate nominative, like εἰμί: σάρξ.',
  },
  {
    id: 'john-1-11', ref: 'John 1:11', text: 'εἰς τὰ ἴδια ἦλθεν', word: 'ἦλθεν', slot: '3s', verb: 'erchomai',
    translation: 'He came to his own', help: 'τὰ ἴδια = his own (things, home)',
  },
  {
    id: '1cor-15-3', ref: '1 Cor 15:3', text: 'Χριστὸς ἀπέθανεν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν κατὰ τὰς γραφάς', word: 'ἀπέθανεν', slot: '3s', verb: 'apothnesko',
    translation: 'Christ died for our sins in accordance with the Scriptures',
  },
  {
    id: 'john-1-10', ref: 'John 1:10', text: 'καὶ ὁ κόσμος αὐτὸν οὐκ ἔγνω.', word: 'ἔγνω', slot: '3s', verb: 'ginosko',
    translation: 'and the world did not know him.',
  },
  {
    id: 'mark-1-35', ref: 'Mark 1:35', text: 'ἀναστὰς ἐξῆλθεν καὶ ἀπῆλθεν εἰς ἔρημον τόπον', word: 'ἐξῆλθεν', slot: '3s', verb: 'exerchomai',
    translation: 'he got up, went out, and went away to a deserted place', help: 'ἀναστάς = getting up · ἀπῆλθεν = he went away · ἔρημος = deserted',
  },
  {
    id: 'matt-26-7', ref: 'Matt 26:7', text: 'προσῆλθεν αὐτῷ γυνὴ ἔχουσα ἀλάβαστρον μύρου βαρυτίμου', word: 'προσῆλθεν', slot: '3s', verb: 'proserchomai',
    translation: 'a woman came to him with an alabaster jar of very expensive ointment', help: 'ἔχουσα = having · μύρον = ointment',
  },
  {
    id: 'john-20-8', ref: 'John 20:8', text: 'καὶ εἶδεν καὶ ἐπίστευσεν·', word: 'εἶδεν', slot: '3s', verb: 'horao',
    translation: 'and he saw and believed.', note: 'εἶδεν is the aorist of ὁράω, from another root (*ἰδ).',
  },
  {
    id: 'john-6-11', ref: 'John 6:11', text: 'ἔλαβεν οὖν τοὺς ἄρτους ὁ Ἰησοῦς', word: 'ἔλαβεν', slot: '3s', verb: 'lambano',
    translation: 'Then Jesus took the loaves', note: 'ἄρτος, “bread, loaf,” is from this chapter’s vocabulary.',
  },
  {
    id: 'luke-1-40', ref: 'Luke 1:40', text: 'καὶ εἰσῆλθεν εἰς τὸν οἶκον Ζαχαρίου', word: 'εἰσῆλθεν', slot: '3s', verb: 'eiserchomai',
    translation: 'and she entered the house of Zechariah', note: 'εἰσέρχομαι is often followed by εἰς: the preposition is repeated.',
  },
  {
    id: 'mark-12-43', ref: 'Mark 12:43', text: 'ἡ χήρα αὕτη ἡ πτωχὴ πλεῖον πάντων ἔβαλεν', word: 'ἔβαλεν', slot: '3s', verb: 'ballo',
    translation: 'this poor widow has put in more than all of them', help: 'χήρα = widow · πτωχός = poor',
    note: 'One λ: ἔβαλεν is aorist. The imperfect would be ἔβαλλεν.',
  },
  {
    id: 'matt-21-19', ref: 'Matt 21:19', text: 'καὶ οὐδὲν εὗρεν ἐν αὐτῇ εἰ μὴ φύλλα μόνον', word: 'εὗρεν', slot: '3s', verb: 'heurisko',
    translation: 'and found nothing on it but leaves', help: 'φύλλον = leaf',
  },
  // 1st plural
  {
    id: 'rom-6-2', ref: 'Rom 6:2', text: 'οἵτινες ἀπεθάνομεν τῇ ἁμαρτίᾳ', word: 'ἀπεθάνομεν', slot: '1p', verb: 'apothnesko',
    translation: 'we who died to sin', note: 'οἵτινες is a form of ὅστις (chapter 18).',
  },
  {
    id: 'matt-2-2', ref: 'Matt 2:2', text: 'εἴδομεν γὰρ αὐτοῦ τὸν ἀστέρα ἐν τῇ ἀνατολῇ καὶ ἤλθομεν προσκυνῆσαι αὐτῷ.', word: 'εἴδομεν', slot: '1p', verb: 'horao',
    translation: 'For we saw his star at its rising and have come to worship him.', help: 'ἀστήρ = star · ἀνατολή = rising · προσκυνῆσαι = to worship',
  },
  {
    id: 'matt-2-2-erchomai', ref: 'Matt 2:2', text: 'εἴδομεν γὰρ αὐτοῦ τὸν ἀστέρα ἐν τῇ ἀνατολῇ καὶ ἤλθομεν προσκυνῆσαι αὐτῷ.', word: 'ἤλθομεν', slot: '1p', verb: 'erchomai',
    translation: 'For we saw his star at its rising and have come to worship him.', help: 'ἀστήρ = star · ἀνατολή = rising · προσκυνῆσαι = to worship',
  },
  {
    id: 'john-1-16', ref: 'John 1:16', text: 'ἡμεῖς πάντες ἐλάβομεν, καὶ χάριν ἀντὶ χάριτος·', word: 'ἐλάβομεν', slot: '1p', verb: 'lambano',
    translation: 'we have all received, grace upon grace.', help: 'ἀντί = in place of, upon',
  },
  {
    id: 'matt-25-38', ref: 'Matt 25:38', text: 'πότε δέ σε εἴδομεν ξένον καὶ συνηγάγομεν', word: 'συνηγάγομεν', slot: '1p', verb: 'synago',
    translation: 'And when did we see you a stranger and welcome you?', help: 'πότε = when? · ξένος = stranger',
    note: 'συνάγω here means “invite in, welcome.” Its aorist ἤγαγον reduplicates the stem (ἀγ-αγ).',
  },
  // 2nd plural
  {
    id: 'rom-8-15', ref: 'Rom 8:15', text: 'οὐ γὰρ ἐλάβετε πνεῦμα δουλείας πάλιν εἰς φόβον', word: 'ἐλάβετε', slot: '2p', verb: 'lambano',
    translation: 'For you did not receive a spirit of slavery to fall back into fear', help: 'δουλεία = slavery · φόβος = fear',
  },
  {
    id: 'luke-7-22', ref: 'Luke 7:22', text: 'ἃ εἴδετε καὶ ἠκούσατε', word: 'εἴδετε', slot: '2p', verb: 'horao',
    translation: 'what you have seen and heard', help: 'ἠκούσατε = you heard',
  },
  {
    id: 'gal-3-2', ref: 'Gal 3:2', text: 'ἐξ ἔργων νόμου τὸ πνεῦμα ἐλάβετε ἢ ἐξ ἀκοῆς πίστεως;', word: 'ἐλάβετε', slot: '2p', verb: 'lambano',
    translation: 'Did you receive the Spirit by works of the law or by hearing with faith?', help: 'ἀκοή = hearing',
  },
  // 3rd plural
  {
    id: 'mark-12-44', ref: 'Mark 12:44', text: 'πάντες γὰρ ἐκ τοῦ περισσεύοντος αὐτοῖς ἔβαλον', word: 'ἔβαλον', slot: '3p', verb: 'ballo',
    translation: 'For they all contributed out of their abundance', help: 'τὸ περισσεῦον = abundance',
  },
  {
    id: 'heb-11-13', ref: 'Heb 11:13', text: 'Κατὰ πίστιν ἀπέθανον οὗτοι πάντες', word: 'ἀπέθανον', slot: '3p', verb: 'apothnesko',
    translation: 'These all died in faith', note: 'οὗτοι πάντες shows that ἀπέθανον is 3rd plural here.',
  },
  {
    id: 'john-17-8', ref: 'John 17:8', text: 'καὶ αὐτοὶ ἔλαβον καὶ ἔγνωσαν ἀληθῶς', word: 'ἔλαβον', slot: '3p', verb: 'lambano',
    translation: 'and they received them and knew truly', help: 'ἀληθῶς = truly',
  },
  {
    id: 'john-17-8-ginosko', ref: 'John 17:8', text: 'καὶ αὐτοὶ ἔλαβον καὶ ἔγνωσαν ἀληθῶς', word: 'ἔγνωσαν', slot: '3p', verb: 'ginosko',
    translation: 'and they received them and knew truly', help: 'ἀληθῶς = truly',
  },
  {
    id: 'luke-24-24', ref: 'Luke 24:24', text: 'καὶ εὗρον οὕτως καθὼς καὶ αἱ γυναῖκες εἶπον', word: 'εὗρον', slot: '3p', verb: 'heurisko',
    translation: 'and they found it just as the women had said', help: 'οὕτως = so · καθώς = just as',
  },
  {
    id: 'luke-24-24-lego', ref: 'Luke 24:24', text: 'καὶ εὗρον οὕτως καθὼς καὶ αἱ γυναῖκες εἶπον', word: 'εἶπον', slot: '3p', verb: 'lego',
    translation: 'and they found it just as the women had said', help: 'οὕτως = so · καθώς = just as',
    note: 'αἱ γυναῖκες is the subject, so εἶπον is 3rd plural.',
  },
]

export const chapter22: Chapter = {
  number: 22,
  title: 'Second Aorist Active/Middle Indicative',
  short: 'Second aorist',
  topics: ['aorist'],
  vocab: [
    { id: 'apothnesko', lemma: 'ἀποθνῄσκω', pos: 'verb', gloss: 'I die', hook: 'Same root as θάνατος, death: thanatology.', accept: ['i die', 'die', 'i am dying', 'am about to die'] },
    { id: 'artos', lemma: 'ἄρτος', lexical: 'ἄρτος, -ου, ὁ', pos: 'noun', gloss: 'bread, loaf, food', accept: ['bread', 'loaf', 'food'] },
    { id: 'ballo', lemma: 'βάλλω', pos: 'verb', gloss: 'I throw, put', hook: 'Ballistic: to do with thrown objects.', accept: ['i throw', 'throw', 'i put', 'put', 'cast', 'place'] },
    { id: 'ge', lemma: 'γῆ', lexical: 'γῆ, γῆς, ἡ', pos: 'noun', gloss: 'earth, land, region, humanity', hook: 'Geology, geography, geocentric.', accept: ['earth', 'land', 'region', 'humanity', 'ground', 'world'] },
    { id: 'ginomai', lemma: 'γίνομαι', pos: 'verb', gloss: 'I become, am, exist; am born, am created; happen', hook: 'Same root as genesis: coming into being.', accept: ['i become', 'become', 'i am', 'am', 'exist', 'i exist', 'am born', 'am created', 'happen', 'come to be'] },
    { id: 'eiserchomai', lemma: 'εἰσέρχομαι', pos: 'verb', gloss: 'I go in(to), come in(to), enter', accept: ['i go in', 'go in', 'go into', 'i come in', 'come in', 'come into', 'i enter', 'enter'] },
    { id: 'exerchomai', lemma: 'ἐξέρχομαι', pos: 'verb', gloss: 'I go out, I come out', accept: ['i go out', 'go out', 'i come out', 'come out', 'depart'] },
    { id: 'eti', lemma: 'ἔτι', pos: 'adverb', gloss: 'still, yet, even', accept: ['still', 'yet', 'even'] },
    { id: 'heurisko', lemma: 'εὑρίσκω', pos: 'verb', gloss: 'I find', hook: 'Eureka!, “I have found it!”: the perfect of εὑρίσκω.', accept: ['i find', 'find', 'discover'] },
    { id: 'lambano', lemma: 'λαμβάνω', pos: 'verb', gloss: 'I take, receive', hook: 'A syllable (συλλαβή) is letters “taken together.”', accept: ['i take', 'take', 'i receive', 'receive', 'get'] },
    { id: 'oute', lemma: 'οὔτε', pos: 'conjunction', gloss: 'and not, neither, nor', accept: ['and not', 'neither', 'nor', 'not'] },
    { id: 'proserchomai', lemma: 'προσέρχομαι', pos: 'verb', gloss: 'I come, go to', accept: ['i come', 'come', 'i go to', 'go to', 'come to', 'approach'] },
    { id: 'proseuchomai', lemma: 'προσεύχομαι', pos: 'verb', gloss: 'I pray', accept: ['i pray', 'pray'] },
    { id: 'pyr', lemma: 'πῦρ', lexical: 'πῦρ, πυρός, τό', pos: 'noun', gloss: 'fire', hook: 'Pyromaniac, pyrotechnics.', accept: ['fire'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 31: Subjunctive.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * Every verb here is subjunctive. A present keeps its present stem (λύ); an aorist has no augment, so `stem` is the
 * bare aorist stem (λύσ, λάβ); an aorist passive's θ stem (λυθ) takes contracted endings accented on the ending.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', mood: 'subjunctive', stem: 'λύ', en: 'loose', en3: 'looses' },
  { id: 'pisteuo', lemma: 'πιστεύω', mood: 'subjunctive', stem: 'πιστεύ', en: 'believe', en3: 'believes' },
  { id: 'echo', lemma: 'ἔχω', mood: 'subjunctive', stem: 'ἔχ', en: 'have', en3: 'has' },
  { id: 'lego', lemma: 'λέγω', mood: 'subjunctive', stem: 'λέγ', en: 'say', en3: 'says' },
  { id: 'ago', lemma: 'ἄγω', mood: 'subjunctive', stem: 'ἄγ', en: 'go, lead', en3: 'goes' },
  {
    id: 'poieo', lemma: 'ποιέω', mood: 'subjunctive', stem: 'ποι', en: 'do', en3: 'does',
    irregular: { '1s': 'ποιῶ', '2s': 'ποιῇς', '3s': 'ποιῇ', '1p': 'ποιῶμεν', '2p': 'ποιῆτε', '3p': 'ποιῶσι(ν)' },
    change: 'A contract verb: ε + ω → ω, ε + ῃ → ῃ, ε + η → η, with the accent on the contraction.',
  },
  { id: 'lyo-mp', lemma: 'λύω', mood: 'subjunctive', stem: 'λύ', voice: 'passive', pp: 'loosed', en: 'loose', en3: 'looses' },
  { id: 'erchomai', lemma: 'ἔρχομαι', mood: 'subjunctive', stem: 'ἔρχ', voice: 'middle', en: 'come', en3: 'comes' },
  { id: 'proseuchomai', lemma: 'προσεύχομαι', mood: 'subjunctive', stem: 'προσεύχ', voice: 'middle', en: 'pray', en3: 'prays' },
  { id: 'proserchomai', lemma: 'προσέρχομαι', mood: 'subjunctive', stem: 'προσέρχ', voice: 'middle', en: 'come to', en3: 'comes to' },
  {
    id: 'eimi', lemma: 'εἰμί', mood: 'subjunctive', stem: '', en: 'be', en3: 'is',
    irregular: { '1s': 'ὦ', '2s': 'ᾖς', '3s': 'ᾖ', '1p': 'ὦμεν', '2p': 'ἦτε', '3p': 'ὦσι(ν)' },
    change: 'εἰμί’s subjunctive is just the lengthened endings, with a smooth breathing: ὦ, ᾖς, ᾖ.',
  },
  // First aorist: σ + the lengthened vowel, and no augment.
  { id: 'lyo-aor', lemma: 'λύω', mood: 'subjunctive', tense: 'aorist', firstAorist: true, stem: 'λύσ', en: 'loose', en3: 'looses' },
  { id: 'pisteuo-aor', lemma: 'πιστεύω', mood: 'subjunctive', tense: 'aorist', firstAorist: true, stem: 'πιστεύσ', en: 'believe', en3: 'believes' },
  { id: 'akouo-aor', lemma: 'ἀκούω', mood: 'subjunctive', tense: 'aorist', firstAorist: true, stem: 'ἀκούσ', en: 'hear', en3: 'hears' },
  { id: 'poieo-aor', lemma: 'ποιέω', mood: 'subjunctive', tense: 'aorist', firstAorist: true, stem: 'ποιήσ', en: 'do', en3: 'does' },
  { id: 'proseuchomai-aor', lemma: 'προσεύχομαι', mood: 'subjunctive', tense: 'aorist', firstAorist: true, stem: 'προσεύξ', voice: 'middle', en: 'pray', en3: 'prays' },
  // Second aorist: the aorist stem with the present's subjunctive endings.
  { id: 'lambano', lemma: 'λαμβάνω', mood: 'subjunctive', tense: 'aorist', stem: 'λάβ', en: 'take, receive', en3: 'takes' },
  { id: 'eiserchomai', lemma: 'εἰσέρχομαι', mood: 'subjunctive', tense: 'aorist', stem: 'εἰσέλθ', en: 'go in, enter', en3: 'enters' },
  { id: 'exerchomai', lemma: 'ἐξέρχομαι', mood: 'subjunctive', tense: 'aorist', stem: 'ἐξέλθ', en: 'go out', en3: 'goes out' },
  { id: 'lego-aor', lemma: 'λέγω', mood: 'subjunctive', tense: 'aorist', stem: 'εἴπ', en: 'say', en3: 'says' },
  { id: 'horao', lemma: 'ὁράω', mood: 'subjunctive', tense: 'aorist', stem: 'ἴδ', en: 'see', en3: 'sees' },
  { id: 'esthio', lemma: 'ἐσθίω', mood: 'subjunctive', tense: 'aorist', stem: 'φάγ', en: 'eat', en3: 'eats' },
  { id: 'apothnesko', lemma: 'ἀποθνῄσκω', mood: 'subjunctive', tense: 'aorist', stem: 'ἀποθάν', en: 'die', en3: 'dies' },
  { id: 'ginomai', lemma: 'γίνομαι', mood: 'subjunctive', tense: 'aorist', stem: 'γέν', voice: 'middle', en: 'become', en3: 'becomes' },
  // Aorist passive: θ + contracted endings, accented on the ending.
  { id: 'lyo-pass', lemma: 'λύω', mood: 'subjunctive', tense: 'aorist', passiveForm: true, stem: 'λυθ', voice: 'passive', pp: 'loosed', en: 'loose', en3: 'looses' },
  { id: 'pleroo', lemma: 'πληρόω', mood: 'subjunctive', tense: 'aorist', passiveForm: true, stem: 'πληρωθ', voice: 'passive', pp: 'fulfilled', en: 'fulfill', en3: 'fulfills' },
  { id: 'krino', lemma: 'κρίνω', mood: 'subjunctive', tense: 'aorist', passiveForm: true, stem: 'κριθ', voice: 'passive', pp: 'judged', en: 'judge', en3: 'judges' },
  { id: 'apokrinomai', lemma: 'ἀποκρίνομαι', mood: 'subjunctive', tense: 'aorist', passiveForm: true, stem: 'ἀποκριθ', en: 'answer', en3: 'answers' },
  { id: 'poreuomai', lemma: 'πορεύομαι', mood: 'subjunctive', tense: 'aorist', passiveForm: true, stem: 'πορευθ', en: 'go', en3: 'goes' },
]

const VERSES: PresentVerse[] = [
  // ἵνα: purpose, “so that …” (or the content of a request: “that …”).
  {
    id: 'john-3-16', ref: 'John 3:16', text: 'ἵνα πᾶς ὁ πιστεύων εἰς αὐτὸν μὴ ἀπόληται ἀλλὰ ἔχῃ ζωὴν αἰώνιον.', word: 'ἔχῃ', slot: '3s', verb: 'echo', use: 'purpose',
    translation: 'so that everyone who believes in him may not perish but have eternal life.', help: 'ἀπόληται = he may perish',
    note: 'ἔχῃ, not ἔχει: the ει of the indicative lengthens to ῃ. A subjunctive is negated with μή.',
  },
  {
    id: 'john-20-31', ref: 'John 20:31', text: 'ταῦτα δὲ γέγραπται ἵνα πιστεύητε ὅτι Ἰησοῦς ἐστιν ὁ χριστὸς ὁ υἱὸς τοῦ θεοῦ', word: 'πιστεύητε', slot: '2p', verb: 'pisteuo', use: 'purpose',
    translation: 'but these are written so that you may believe that Jesus is the Christ, the Son of God', note: 'The present: “that you may go on believing.”',
  },
  {
    id: 'john-20-31-echo', ref: 'John 20:31', text: 'καὶ ἵνα πιστεύοντες ζωὴν ἔχητε ἐν τῷ ὀνόματι αὐτοῦ.', word: 'ἔχητε', slot: '2p', verb: 'echo', use: 'purpose',
    translation: 'and that by believing you may have life in his name.',
  },
  {
    id: 'matt-1-22', ref: 'Matt 1:22', text: 'τοῦτο δὲ ὅλον γέγονεν ἵνα πληρωθῇ τὸ ῥηθὲν ὑπὸ κυρίου διὰ τοῦ προφήτου', word: 'πληρωθῇ', slot: '3s', verb: 'pleroo', use: 'purpose',
    translation: 'All this took place so that what was spoken by the Lord through the prophet might be fulfilled', help: 'τὸ ῥηθέν = what was spoken',
    note: 'An aorist passive subjunctive: θ + ῇ, with no augment and the accent on the ending.',
  },
  {
    id: 'matt-7-1', ref: 'Matt 7:1', text: 'Μὴ κρίνετε, ἵνα μὴ κριθῆτε·', word: 'κριθῆτε', slot: '2p', verb: 'krino', use: 'purpose',
    translation: 'Do not judge, so that you may not be judged.', help: 'μὴ κρίνετε = do not judge',
  },
  {
    id: 'mark-3-14', ref: 'Mark 3:14', text: 'καὶ ἐποίησεν δώδεκα, ἵνα ὦσιν μετʼ αὐτοῦ', word: 'ὦσιν', slot: '3p', verb: 'eimi', use: 'purpose',
    translation: 'And he appointed twelve so that they might be with him',
  },
  {
    id: 'john-14-3-ete', ref: 'John 14:3', text: 'ἵνα ὅπου εἰμὶ ἐγὼ καὶ ὑμεῖς ἦτε.', word: 'ἦτε', slot: '2p', verb: 'eimi', use: 'purpose',
    translation: 'so that where I am you may be also.', note: 'ἦτε is also the imperfect, “you were”; after ἵνα it is the subjunctive.',
  },
  {
    id: 'matt-26-41', ref: 'Matt 26:41', text: 'γρηγορεῖτε καὶ προσεύχεσθε, ἵνα μὴ εἰσέλθητε εἰς πειρασμόν·', word: 'εἰσέλθητε', slot: '2p', verb: 'eiserchomai', use: 'purpose',
    translation: 'Watch and pray so that you may not enter into temptation.', help: 'γρηγορεῖτε = watch! · πειρασμός = temptation',
  },
  {
    id: 'matt-19-13', ref: 'Matt 19:13', text: 'Τότε προσηνέχθησαν αὐτῷ παιδία ἵνα τὰς χεῖρας ἐπιθῇ αὐτοῖς καὶ προσεύξηται·', word: 'προσεύξηται', slot: '3s', verb: 'proseuchomai-aor', use: 'purpose',
    translation: 'Then children were brought to him so that he might lay his hands on them and pray.', help: 'προσηνέχθησαν = they were brought · ἐπιθῇ = he might lay',
  },
  {
    id: 'matt-4-3', ref: 'Matt 4:3', text: 'εἰπὲ ἵνα οἱ λίθοι οὗτοι ἄρτοι γένωνται.', word: 'γένωνται', slot: '3p', verb: 'ginomai', use: 'purpose',
    translation: 'command that these stones become loaves of bread.', help: 'εἰπέ = say!',
    note: 'After a verb of speaking or commanding, ἵνα gives what is said: “that ….” λίθος is from this chapter’s vocabulary.',
  },
  {
    id: 'heb-4-16-labomen', ref: 'Heb 4:16', text: 'προσερχώμεθα οὖν μετὰ παρρησίας τῷ θρόνῳ τῆς χάριτος, ἵνα λάβωμεν ἔλεος', word: 'λάβωμεν', slot: '1p', verb: 'lambano', use: 'purpose',
    translation: 'Let us then approach the throne of grace with confidence, so that we may receive mercy', help: 'παρρησία = confidence · ἔλεος = mercy',
  },
  {
    id: 'john-11-16-apothanomen', ref: 'John 11:16', text: 'Ἄγωμεν καὶ ἡμεῖς ἵνα ἀποθάνωμεν μετʼ αὐτοῦ.', word: 'ἀποθάνωμεν', slot: '1p', verb: 'apothnesko', use: 'purpose',
    translation: 'Let us also go, so that we may die with him.',
  },
  // ἐάν: a condition, “if …”.
  {
    id: 'matt-6-22', ref: 'Matt 6:22', text: 'ἐὰν οὖν ᾖ ὁ ὀφθαλμός σου ἁπλοῦς, ὅλον τὸ σῶμά σου φωτεινὸν ἔσται·', word: 'ᾖ', slot: '3s', verb: 'eimi', use: 'condition',
    translation: 'So if your eye is healthy, your whole body will be full of light.', help: 'ἁπλοῦς = healthy, single · φωτεινός = full of light',
  },
  {
    id: 'matt-18-16', ref: 'Matt 18:16', text: 'ἐὰν δὲ μὴ ἀκούσῃ, παράλαβε μετὰ σοῦ ἔτι ἕνα ἢ δύο', word: 'ἀκούσῃ', slot: '3s', verb: 'akouo-aor', use: 'condition',
    translation: 'But if he does not listen, take one or two others along with you', help: 'παράλαβε = take along!',
    note: 'ἀκούσῃ looks like a future (ἀκούσει has ει); the ῃ shows it is aorist subjunctive.',
  },
  {
    id: 'matt-21-3', ref: 'Matt 21:3', text: 'καὶ ἐάν τις ὑμῖν εἴπῃ τι, ἐρεῖτε ὅτι Ὁ κύριος αὐτῶν χρείαν ἔχει·', word: 'εἴπῃ', slot: '3s', verb: 'lego-aor', use: 'condition',
    translation: 'And if anyone says anything to you, you will say, “The Lord needs them.”', help: 'ἐρεῖτε = you will say · χρεία = need',
  },
  {
    id: 'john-14-3', ref: 'John 14:3', text: 'καὶ ἐὰν πορευθῶ καὶ ἑτοιμάσω τόπον ὑμῖν, πάλιν ἔρχομαι', word: 'πορευθῶ', slot: '1s', verb: 'poreuomai', use: 'condition',
    translation: 'And if I go and prepare a place for you, I will come again', help: 'ἑτοιμάσω = I prepare',
    note: 'πορεύομαι has a passive-looking aorist with an active meaning: πορευθῶ, “I go.”',
  },
  {
    id: '1cor-14-14', ref: '1 Cor 14:14', text: 'ἐὰν γὰρ προσεύχωμαι γλώσσῃ, τὸ πνεῦμά μου προσεύχεται', word: 'προσεύχωμαι', slot: '1s', verb: 'proseuchomai', use: 'condition',
    translation: 'For if I pray in a tongue, my spirit prays', note: 'προσεύχωμαι (subjunctive, ω) against προσεύχεται (indicative, ε) in the same verse.',
  },
  {
    id: 'john-6-51', ref: 'John 6:51', text: 'ἐάν τις φάγῃ ἐκ τούτου τοῦ ἄρτου ζήσει εἰς τὸν αἰῶνα', word: 'φάγῃ', slot: '3s', verb: 'esthio', use: 'condition',
    translation: 'If anyone eats of this bread, he will live forever', help: 'ζήσει = he will live', note: 'φαγ- is the second aorist stem of ἐσθίω.',
  },
  {
    id: 'matt-18-3', ref: 'Matt 18:3', text: 'ἐὰν μὴ στραφῆτε καὶ γένησθε ὡς τὰ παιδία', word: 'γένησθε', slot: '2p', verb: 'ginomai', use: 'condition',
    translation: 'unless you turn and become like children', help: 'στραφῆτε = you turn', note: 'ἐὰν μή: “if not, unless.”',
  },
  // οὐ μή: emphatic negation.
  {
    id: 'matt-18-3-eiselthete', ref: 'Matt 18:3', text: 'οὐ μὴ εἰσέλθητε εἰς τὴν βασιλείαν τῶν οὐρανῶν.', word: 'εἰσέλθητε', slot: '2p', verb: 'eiserchomai', use: 'emphatic',
    translation: 'you will never enter the kingdom of heaven.',
  },
  {
    id: 'matt-5-26', ref: 'Matt 5:26', text: 'ἀμὴν λέγω σοι, οὐ μὴ ἐξέλθῃς ἐκεῖθεν', word: 'ἐξέλθῃς', slot: '2s', verb: 'exerchomai', use: 'emphatic',
    translation: 'Truly I tell you, you will never get out of there', help: 'ἐκεῖθεν = from there',
  },
  {
    id: 'matt-23-39', ref: 'Matt 23:39', text: 'λέγω γὰρ ὑμῖν, οὐ μή με ἴδητε ἀπʼ ἄρτι', word: 'ἴδητε', slot: '2p', verb: 'horao', use: 'emphatic',
    translation: 'For I tell you, you will not see me again from now on', help: 'ἀπʼ ἄρτι = from now on',
  },
  {
    id: 'luke-6-37', ref: 'Luke 6:37', text: 'Καὶ μὴ κρίνετε, καὶ οὐ μὴ κριθῆτε·', word: 'κριθῆτε', slot: '2p', verb: 'krino', use: 'emphatic',
    translation: 'Do not judge, and you will not be judged.', note: 'Compare Matt 7:1, where ἵνα μή gives the purpose.',
  },
  {
    id: 'luke-22-68', ref: 'Luke 22:68', text: 'ἐὰν δὲ ἐρωτήσω, οὐ μὴ ἀποκριθῆτε.', word: 'ἀποκριθῆτε', slot: '2p', verb: 'apokrinomai', use: 'emphatic',
    translation: 'and if I ask you, you will certainly not answer.', help: 'ἐρωτήσω = I ask',
  },
  // ὃς ἄν, ὅταν: “whoever, whenever”.
  {
    id: 'john-2-5', ref: 'John 2:5', text: 'Ὅ τι ἂν λέγῃ ὑμῖν ποιήσατε.', word: 'λέγῃ', slot: '3s', verb: 'lego', use: 'indefinite',
    translation: 'Do whatever he tells you.', help: 'ποιήσατε = do!',
  },
  {
    id: 'luke-8-18', ref: 'Luke 8:18', text: 'ὃς ἂν γὰρ ἔχῃ, δοθήσεται αὐτῷ', word: 'ἔχῃ', slot: '3s', verb: 'echo', use: 'indefinite',
    translation: 'For whoever has, to him more will be given', help: 'δοθήσεται = it will be given',
  },
  {
    id: 'matt-12-50', ref: 'Matt 12:50', text: 'ὅστις γὰρ ἂν ποιήσῃ τὸ θέλημα τοῦ πατρός μου τοῦ ἐν οὐρανοῖς, αὐτός μου ἀδελφὸς καὶ ἀδελφὴ καὶ μήτηρ ἐστίν.', word: 'ποιήσῃ', slot: '3s', verb: 'poieo-aor', use: 'indefinite',
    translation: 'For whoever does the will of my Father in heaven is my brother and sister and mother.',
  },
  {
    id: 'john-7-27', ref: 'John 7:27', text: 'ὁ δὲ χριστὸς ὅταν ἔρχηται οὐδεὶς γινώσκει πόθεν ἐστίν.', word: 'ἔρχηται', slot: '3s', verb: 'erchomai', use: 'indefinite',
    translation: 'but when the Christ comes, no one will know where he is from.', help: 'πόθεν = from where', note: 'ὅταν is ὅτε + ἄν, “whenever.”',
  },
  {
    id: 'luke-11-2', ref: 'Luke 11:2', text: 'Ὅταν προσεύχησθε, λέγετε· Πάτερ, ἁγιασθήτω τὸ ὄνομά σου·', word: 'προσεύχησθε', slot: '2p', verb: 'proseuchomai', use: 'indefinite',
    translation: 'When you pray, say: Father, hallowed be your name.', help: 'λέγετε = say! · ἁγιασθήτω = let it be hallowed',
  },
  // Hortatory: “let us …”.
  {
    id: 'john-11-16', ref: 'John 11:16', text: 'Ἄγωμεν καὶ ἡμεῖς ἵνα ἀποθάνωμεν μετʼ αὐτοῦ.', word: 'Ἄγωμεν', slot: '1p', verb: 'ago', use: 'hortatory',
    translation: 'Let us also go, so that we may die with him.', note: 'Thomas: the first verb urges (“let us go”), the second gives the purpose.',
  },
  {
    id: 'heb-4-16', ref: 'Heb 4:16', text: 'προσερχώμεθα οὖν μετὰ παρρησίας τῷ θρόνῳ τῆς χάριτος', word: 'προσερχώμεθα', slot: '1p', verb: 'proserchomai', use: 'hortatory',
    translation: 'Let us then approach the throne of grace with confidence', help: 'παρρησία = confidence',
  },
  {
    id: 'luke-2-15', ref: 'Luke 2:15', text: 'Διέλθωμεν δὴ ἕως Βηθλέεμ καὶ ἴδωμεν τὸ ῥῆμα τοῦτο τὸ γεγονός', word: 'ἴδωμεν', slot: '1p', verb: 'horao', use: 'hortatory',
    translation: 'Let us go over to Bethlehem and see this thing that has happened', help: 'διέλθωμεν = let us go over',
  },
  {
    id: '1cor-15-32', ref: '1 Cor 15:32', text: 'Φάγωμεν καὶ πίωμεν, αὔριον γὰρ ἀποθνῄσκομεν.', word: 'Φάγωμεν', slot: '1p', verb: 'esthio', use: 'hortatory',
    translation: 'Let us eat and drink, for tomorrow we die.', help: 'πίωμεν = let us drink · αὔριον = tomorrow',
  },
  // Deliberative: a real question about what to do.
  {
    id: 'luke-3-10', ref: 'Luke 3:10', text: 'Τί οὖν ποιήσωμεν;', word: 'ποιήσωμεν', slot: '1p', verb: 'poieo-aor', use: 'deliberative',
    translation: 'What then should we do?',
  },
  {
    id: 'matt-6-31', ref: 'Matt 6:31', text: 'Τί φάγωμεν; ἤ· Τί πίωμεν;', word: 'φάγωμεν', slot: '1p', verb: 'esthio', use: 'deliberative',
    translation: 'What shall we eat? or, What shall we drink?', note: 'The same form as the hortatory φάγωμεν in 1 Cor 15:32; the question makes it deliberative.',
  },
  {
    id: 'john-6-28', ref: 'John 6:28', text: 'Τί ποιῶμεν ἵνα ἐργαζώμεθα τὰ ἔργα τοῦ θεοῦ;', word: 'ποιῶμεν', slot: '1p', verb: 'poieo', use: 'deliberative',
    translation: 'What must we do to be doing the works of God?', help: 'ἐργαζώμεθα = we may work',
  },
  {
    id: 'mark-9-6', ref: 'Mark 9:6', text: 'οὐ γὰρ ᾔδει τί ἀποκριθῇ', word: 'ἀποκριθῇ', slot: '3s', verb: 'apokrinomai', use: 'deliberative',
    translation: 'For he did not know what to answer', help: 'ᾔδει = he knew', note: 'An indirect question: “what he should answer.”',
  },
]

export const chapter31: Chapter = {
  number: 31,
  title: 'Subjunctive',
  short: 'Subjunctive',
  topics: ['subjunctive'],
  vocab: [
    { id: 'lithos', lemma: 'λίθος', lexical: 'λίθος, -ου, ὁ', pos: 'noun', gloss: 'stone', hook: 'Lithography was first printed from stone.', accept: ['stone', 'rock'] },
    { id: 'toioutos', lemma: 'τοιοῦτος', lexical: 'τοιοῦτος, -αύτη, -οῦτον', pos: 'adjective', gloss: 'such, of such a kind', hook: 'Declined like οὗτος with τοι- in front: τοιαύτη, τοιοῦτο(ν).', accept: ['such', 'of such a kind', 'such a', 'like this'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

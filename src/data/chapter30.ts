import type { Chapter, ParticipleVerb, ParticipleVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 30: Perfect Participles and Genitive Absolutes.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * `stem` is the reduplicated perfect stem: with κ for a first perfect active (λελυκ), without for a second perfect
 * (γεγον, ἐληλυθ, εἰδ), and the middle/passive stem with no κ (λελυ, γεγραμ: φ + μ → μμ).
 */
const VERBS: ParticipleVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'perfect', stem: 'λελυκ', voices: ['active'], ing: 'having loosed' },
  { id: 'lyo-mp', lemma: 'λύω', tense: 'perfect', stem: 'λελυ', voices: ['middle/passive'], ing: 'having loosed', pp: 'loosed' },
  { id: 'pisteuo', lemma: 'πιστεύω', tense: 'perfect', stem: 'πεπιστευκ', voices: ['active'], ing: 'having believed' },
  { id: 'poieo', lemma: 'ποιέω', tense: 'perfect', stem: 'πεποιηκ', voices: ['active'], ing: 'having done' },
  { id: 'akouo', lemma: 'ἀκούω', tense: 'perfect', stem: 'ἀκηκο', voices: ['active'], ing: 'having heard' },
  { id: 'ginomai', lemma: 'γίνομαι', tense: 'perfect', stem: 'γεγον', voices: ['active'], ing: 'having become' },
  { id: 'erchomai', lemma: 'ἔρχομαι', tense: 'perfect', stem: 'ἐληλυθ', voices: ['active'], ing: 'having come' },
  { id: 'exerchomai', lemma: 'ἐξέρχομαι', tense: 'perfect', stem: 'ἐξεληλυθ', voices: ['active'], ing: 'having gone out' },
  // οἶδα is a perfect in form with a present meaning: εἰδώς, “knowing.”
  { id: 'oida', lemma: 'οἶδα', tense: 'perfect', stem: 'εἰδ', voices: ['active'], ing: 'knowing' },
  { id: 'peitho', lemma: 'πείθω', tense: 'perfect', stem: 'πεποιθ', voices: ['active'], ing: 'trusting (having been persuaded)' },
  { id: 'grapho-mp', lemma: 'γράφω', tense: 'perfect', stem: 'γεγραμ', voices: ['middle/passive'], ing: 'having written', pp: 'written' },
  { id: 'kaleo-mp', lemma: 'καλέω', tense: 'perfect', stem: 'κεκλη', voices: ['middle/passive'], ing: 'having called', pp: 'called' },
  { id: 'apostello-mp', lemma: 'ἀποστέλλω', tense: 'perfect', stem: 'ἀπεσταλ', voices: ['middle/passive'], ing: 'having sent', pp: 'sent' },
  { id: 'pleroo-mp', lemma: 'πληρόω', tense: 'perfect', stem: 'πεπληρω', voices: ['middle/passive'], ing: 'having filled', pp: 'filled' },
  { id: 'gennao-mp', lemma: 'γεννάω', tense: 'perfect', stem: 'γεγεννη', voices: ['middle/passive'], ing: 'having begotten', pp: 'born' },
  { id: 'ballo-mp', lemma: 'βάλλω', tense: 'perfect', stem: 'βεβλη', voices: ['middle/passive'], ing: 'having thrown', pp: 'thrown' },
  { id: 'sozo-mp', lemma: 'σῴζω', tense: 'perfect', stem: 'σεσῳσ', voices: ['middle/passive'], ing: 'having saved', pp: 'saved' },
  { id: 'peitho-mp', lemma: 'πείθω', tense: 'perfect', stem: 'πεπεισ', voices: ['middle/passive'], ing: 'having persuaded', pp: 'persuaded' },
]

const VERSES: ParticipleVerse[] = [
  // Perfect active: οτ, feminine υια.
  {
    id: 'matt-9-4', ref: 'Matt 9:4', text: 'καὶ εἰδὼς ὁ Ἰησοῦς τὰς ἐνθυμήσεις αὐτῶν εἶπεν·', word: 'εἰδὼς', lemma: 'οἶδα', tense: 'perfect', voice: 'active',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'And Jesus, knowing their thoughts, said,', help: 'ἐνθύμησις = thought',
    note: 'οἶδα is perfect in form but present in meaning, so εἰδώς is “knowing.”',
    wrong: ['And after Jesus had been known by their thoughts, he said,', 'And they, knowing the thoughts of Jesus, said,'],
  },
  {
    id: 'matt-22-29', ref: 'Matt 22:29', text: 'Πλανᾶσθε μὴ εἰδότες τὰς γραφὰς μηδὲ τὴν δύναμιν τοῦ θεοῦ·', word: 'εἰδότες', lemma: 'οἶδα', tense: 'perfect', voice: 'active',
    case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'you (in πλανᾶσθε)',
    translation: 'You are wrong, because you know neither the Scriptures nor the power of God.', help: 'πλανᾶσθε = you are wrong, deceived',
    note: 'A participle is negated with μή; μηδέ, “nor,” is from this chapter’s vocabulary.',
    wrong: ['You are wrong about those who know neither the Scriptures nor the power of God.', 'You are deceived by the Scriptures and the power of God, which you do not know.'],
  },
  {
    id: 'acts-5-7', ref: 'Acts 5:7', text: 'καὶ ἡ γυνὴ αὐτοῦ μὴ εἰδυῖα τὸ γεγονὸς εἰσῆλθεν.', word: 'εἰδυῖα', lemma: 'οἶδα', tense: 'perfect', voice: 'active',
    case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'ἡ γυνή',
    translation: 'and his wife came in, not knowing what had happened.',
    note: 'The feminine of εἰδώς: υια, with first-declension endings.',
    wrong: ['and his wife came in, and what had happened did not know her.', 'and he came in to his wife, who did not know what had happened.'],
  },
  {
    id: 'acts-5-7-gegonos', ref: 'Acts 5:7', text: 'καὶ ἡ γυνὴ αὐτοῦ μὴ εἰδυῖα τὸ γεγονὸς εἰσῆλθεν.', word: 'γεγονὸς', lemma: 'γίνομαι', tense: 'perfect', voice: 'active',
    case: 'accusative', number: 'sg', gender: 'neuter', agrees: 'τό (substantival: “what had happened”)',
    translation: 'and his wife came in, not knowing what had happened.',
    note: 'A second perfect with no κ. With τό and no noun it is substantival: “the thing that has happened.”',
  },
  {
    id: 'mark-7-30', ref: 'Mark 7:30', text: 'εὗρεν τὸ παιδίον βεβλημένον ἐπὶ τὴν κλίνην καὶ τὸ δαιμόνιον ἐξεληλυθός.', word: 'ἐξεληλυθός', lemma: 'ἐξέρχομαι', tense: 'perfect', voice: 'active',
    case: 'accusative', number: 'sg', gender: 'neuter', agrees: 'τὸ δαιμόνιον',
    translation: 'she found the child lying on the bed and the demon gone.', help: 'κλίνη = bed',
    note: 'The perfect stresses the result: the demon has gone out, and stays gone.',
    wrong: ['she found the child lying on the bed and the demon going out.', 'she found the child, who had thrown the demon out onto the bed.'],
  },
  {
    id: 'luke-8-46', ref: 'Luke 8:46', text: 'ἐγὼ γὰρ ἔγνων δύναμιν ἐξεληλυθυῖαν ἀπʼ ἐμοῦ.', word: 'ἐξεληλυθυῖαν', lemma: 'ἐξέρχομαι', tense: 'perfect', voice: 'active',
    case: 'accusative', number: 'sg', gender: 'feminine', agrees: 'δύναμιν',
    translation: 'for I know that power has gone out from me.',
    wrong: ['for I knew the power that will go out from me.', 'for after I had gone out, I knew power from myself.'],
  },
  {
    id: 'acts-16-34', ref: 'Acts 16:34', text: 'καὶ ἠγαλλιάσατο πανοικεὶ πεπιστευκὼς τῷ θεῷ.', word: 'πεπιστευκὼς', lemma: 'πιστεύω', tense: 'perfect', voice: 'active',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, the jailer (in ἠγαλλιάσατο)',
    translation: 'and he rejoiced with his whole household that he had believed in God.', help: 'ἠγαλλιάσατο = he rejoiced · πανοικεί = with his whole household',
  },
  {
    id: 'john-18-21', ref: 'John 18:21', text: 'ἐρώτησον τοὺς ἀκηκοότας τί ἐλάλησα αὐτοῖς·', word: 'ἀκηκοότας', lemma: 'ἀκούω', tense: 'perfect', voice: 'active',
    case: 'accusative', number: 'pl', gender: 'masculine', agrees: 'τούς (substantival: “those who have heard”)',
    translation: 'Ask those who have heard what I said to them.', help: 'ἐρώτησον = ask!',
    note: 'ἀκηκο- has “Attic” reduplication (ἀκ-ηκο-), as in ἀκήκοα, and no κ.',
  },
  {
    id: 'heb-2-13', ref: 'Heb 2:13', text: 'Ἐγὼ ἔσομαι πεποιθὼς ἐπʼ αὐτῷ·', word: 'πεποιθὼς', lemma: 'πείθω', tense: 'perfect', voice: 'active',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ἐγώ',
    translation: 'I will put my trust in him.', note: 'εἰμί + a participle (a periphrastic): “I will be trusting.” πέποιθα, the second perfect of πείθω, means “I trust.”',
  },
  // Perfect middle/passive: μενο/η, accented on μέν.
  {
    id: 'matt-27-37', ref: 'Matt 27:37', text: 'καὶ ἐπέθηκαν ἐπάνω τῆς κεφαλῆς αὐτοῦ τὴν αἰτίαν αὐτοῦ γεγραμμένην·', word: 'γεγραμμένην', lemma: 'γράφω', tense: 'perfect', voice: 'middle/passive',
    case: 'accusative', number: 'sg', gender: 'feminine', agrees: 'τὴν αἰτίαν',
    translation: 'And over his head they put the charge against him, written down:', help: 'ἐπέθηκαν = they put · αἰτία = charge',
    note: 'γραφ + μενη → γεγραμμένη: φ before μ becomes μ.',
    wrong: ['And over his head they put the charge against him, while he was writing:', 'And the ones who had written the charge against him put it over his head:'],
  },
  {
    id: 'mark-7-30-beblemenon', ref: 'Mark 7:30', text: 'εὗρεν τὸ παιδίον βεβλημένον ἐπὶ τὴν κλίνην καὶ τὸ δαιμόνιον ἐξεληλυθός.', word: 'βεβλημένον', lemma: 'βάλλω', tense: 'perfect', voice: 'middle/passive',
    case: 'accusative', number: 'sg', gender: 'neuter', agrees: 'τὸ παιδίον',
    translation: 'she found the child lying on the bed and the demon gone.', help: 'κλίνη = bed',
    note: 'Literally “having been thrown” onto the bed: lying there. παιδίον is from chapter 28’s vocabulary.',
  },
  {
    id: 'john-1-6', ref: 'John 1:6', text: 'Ἐγένετο ἄνθρωπος ἀπεσταλμένος παρὰ θεοῦ, ὄνομα αὐτῷ Ἰωάννης·', word: 'ἀπεσταλμένος', lemma: 'ἀποστέλλω', tense: 'perfect', voice: 'middle/passive',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ἄνθρωπος',
    translation: 'There came a man sent from God, whose name was John.',
    wrong: ['There came a man who sent God, whose name was John.', 'There came a man, and God will send him; his name was John.'],
  },
  {
    id: 'john-16-24', ref: 'John 16:24', text: 'ἵνα ἡ χαρὰ ὑμῶν ᾖ πεπληρωμένη.', word: 'πεπληρωμένη', lemma: 'πληρόω', tense: 'perfect', voice: 'middle/passive',
    case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'ἡ χαρά',
    translation: 'so that your joy may be full.', note: 'ᾖ (the subjunctive of εἰμί, chapter 31) + a perfect participle: “may be (and stay) filled.”',
    wrong: ['so that your joy may fill you.', 'so that you may be filled with joy while you are filling others.'],
  },
  {
    id: 'eph-2-5', ref: 'Eph 2:5', text: 'χάριτί ἐστε σεσῳσμένοι', word: 'σεσῳσμένοι', lemma: 'σῴζω', tense: 'perfect', voice: 'middle/passive',
    case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'you (in ἐστε)',
    translation: 'by grace you have been saved', note: 'εἰμί + a perfect participle is a periphrastic perfect: “you are saved,” and remain so.',
    wrong: ['by grace you are saving', 'by grace you were being saved'],
  },
  {
    id: 'john-3-6', ref: 'John 3:6', text: 'τὸ γεγεννημένον ἐκ τῆς σαρκὸς σάρξ ἐστιν', word: 'γεγεννημένον', lemma: 'γεννάω', tense: 'perfect', voice: 'middle/passive',
    case: 'nominative', number: 'sg', gender: 'neuter', agrees: 'τό (substantival: “that which is born”)',
    translation: 'That which is born of the flesh is flesh',
    wrong: ['The flesh that gives birth is flesh', 'After he was born of the flesh, he is flesh'],
  },
  {
    id: 'matt-22-3', ref: 'Matt 22:3', text: 'καὶ ἀπέστειλεν τοὺς δούλους αὐτοῦ καλέσαι τοὺς κεκλημένους εἰς τοὺς γάμους', word: 'κεκλημένους', lemma: 'καλέω', tense: 'perfect', voice: 'middle/passive',
    case: 'accusative', number: 'pl', gender: 'masculine', agrees: 'τούς (substantival: “those who had been invited”)',
    translation: 'and he sent his servants to call those who had been invited to the wedding feast', help: 'καλέσαι = to call · γάμος = wedding feast',
  },
  {
    id: 'luke-20-6', ref: 'Luke 20:6', text: 'πεπεισμένος γάρ ἐστιν Ἰωάννην προφήτην εἶναι·', word: 'πεπεισμένος', lemma: 'πείθω', tense: 'perfect', voice: 'middle/passive',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'the people (ὁ λαός, in the verse before)',
    translation: 'for they are convinced that John was a prophet.', help: 'εἶναι = to be',
    note: 'ὁ λαός is singular, so the participle is too, though English says “they.” πεπεισ-: the dental θ of πειθ becomes σ before μ.',
  },
  // Genitive absolutes: a participle and its own “subject” in the genitive, standing apart from the main clause.
  {
    id: 'luke-9-57', ref: 'Luke 9:57', text: 'Καὶ πορευομένων αὐτῶν ἐν τῇ ὁδῷ εἶπέν τις πρὸς αὐτόν·', word: 'πορευομένων', lemma: 'πορεύομαι', voice: 'middle/passive',
    case: 'genitive', number: 'pl', gender: 'masculine', agrees: 'αὐτῶν', absolute: true,
    translation: 'As they were going along the road, someone said to him,',
    wrong: ['Someone said to those who were going along the road,', 'Someone of those going along the road said to him,'],
  },
  {
    id: 'mark-14-22', ref: 'Mark 14:22', text: 'Καὶ ἐσθιόντων αὐτῶν λαβὼν ἄρτον εὐλογήσας ἔκλασεν', word: 'ἐσθιόντων', lemma: 'ἐσθίω', voice: 'active',
    case: 'genitive', number: 'pl', gender: 'masculine', agrees: 'αὐτῶν', absolute: true,
    translation: 'And while they were eating, he took bread, blessed it and broke it', help: 'εὐλογήσας = having blessed · ἔκλασεν = he broke',
    wrong: ['And he took the bread of those who were eating, blessed it and broke it', 'And after they had eaten, he took bread, blessed it and broke it'],
  },
  {
    id: 'john-4-51', ref: 'John 4:51', text: 'ἤδη δὲ αὐτοῦ καταβαίνοντος οἱ δοῦλοι αὐτοῦ ὑπήντησαν αὐτῷ', word: 'καταβαίνοντος', lemma: 'καταβαίνω', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'αὐτοῦ', absolute: true,
    translation: 'As he was already going down, his servants met him', help: 'ὑπήντησαν = they met',
    wrong: ['His servants, already going down, met him', 'The servants of the one going down met him'],
  },
  {
    id: 'luke-20-45', ref: 'Luke 20:45', text: 'Ἀκούοντος δὲ παντὸς τοῦ λαοῦ εἶπεν τοῖς μαθηταῖς·', word: 'Ἀκούοντος', lemma: 'ἀκούω', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'παντὸς τοῦ λαοῦ', absolute: true,
    translation: 'And while all the people were listening, he said to the disciples,',
    wrong: ['And he said to the disciples of all the people who were listening,', 'And while he was listening to all the people, he said to the disciples,'],
  },
  {
    id: 'rom-5-8', ref: 'Rom 5:8', text: 'ὅτι ἔτι ἁμαρτωλῶν ὄντων ἡμῶν Χριστὸς ὑπὲρ ἡμῶν ἀπέθανεν.', word: 'ὄντων', lemma: 'εἰμί', voice: 'active',
    case: 'genitive', number: 'pl', gender: 'masculine', agrees: 'ἡμῶν', absolute: true,
    translation: 'in that while we were still sinners, Christ died for us.', help: 'ἁμαρτωλός = sinner',
    wrong: ['in that Christ, still being a sinner, died for us.', 'in that Christ died for those of us who are sinners.'],
  },
  {
    id: 'matt-8-1', ref: 'Matt 8:1', text: 'Καταβάντος δὲ αὐτοῦ ἀπὸ τοῦ ὄρους ἠκολούθησαν αὐτῷ ὄχλοι πολλοί.', word: 'Καταβάντος', lemma: 'καταβαίνω', tense: 'aorist', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'αὐτοῦ', absolute: true,
    translation: 'When he had come down from the mountain, great crowds followed him.',
    note: 'An aorist: first he came down, then they followed. καταβάς, καταβάντος is a second aorist of βαίνω with no connecting vowel.',
    wrong: ['Great crowds, having come down from the mountain, followed him.', 'Great crowds followed the one who was coming down from the mountain.'],
  },
  {
    id: 'acts-21-17', ref: 'Acts 21:17', text: 'Γενομένων δὲ ἡμῶν εἰς Ἱεροσόλυμα ἀσμένως ἀπεδέξαντο ἡμᾶς οἱ ἀδελφοί.', word: 'Γενομένων', lemma: 'γίνομαι', tense: 'aorist', voice: 'middle',
    case: 'genitive', number: 'pl', gender: 'masculine', agrees: 'ἡμῶν', absolute: true,
    translation: 'When we arrived in Jerusalem, the brothers welcomed us gladly.', help: 'ἀσμένως = gladly · ἀπεδέξαντο = they welcomed',
    wrong: ['The brothers, having arrived in Jerusalem, welcomed us gladly.', 'The brothers of those of us who were in Jerusalem welcomed us gladly.'],
  },
  {
    id: 'matt-14-32', ref: 'Matt 14:32', text: 'καὶ ἀναβάντων αὐτῶν εἰς τὸ πλοῖον ἐκόπασεν ὁ ἄνεμος.', word: 'ἀναβάντων', lemma: 'ἀναβαίνω', tense: 'aorist', voice: 'active',
    case: 'genitive', number: 'pl', gender: 'masculine', agrees: 'αὐτῶν', absolute: true,
    translation: 'And when they got into the boat, the wind stopped.', help: 'ἐκόπασεν = it stopped · ἄνεμος = wind',
    wrong: ['And the wind stopped those who were getting into the boat.', 'And when the wind got into the boat, it stopped.'],
  },
  {
    id: 'john-12-37', ref: 'John 12:37', text: 'τοσαῦτα δὲ αὐτοῦ σημεῖα πεποιηκότος ἔμπροσθεν αὐτῶν οὐκ ἐπίστευον εἰς αὐτόν', word: 'πεποιηκότος', lemma: 'ποιέω', tense: 'perfect', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'αὐτοῦ', absolute: true,
    translation: 'Though he had done so many signs before them, they were not believing in him', help: 'τοσοῦτος = so many · ἔμπροσθεν = before',
    note: 'A perfect participle in a genitive absolute. Here it is concessive: “although.”',
    wrong: ['They did not believe the many signs that he had done before them', 'Though they had done so many signs before him, they were not believing in him'],
  },
  // Genitive participles that are not absolute: they agree with a genitive word the sentence needs.
  {
    id: 'matt-2-15', ref: 'Matt 2:15', text: 'ἵνα πληρωθῇ τὸ ῥηθὲν ὑπὸ κυρίου διὰ τοῦ προφήτου λέγοντος·', word: 'λέγοντος', lemma: 'λέγω', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'τοῦ προφήτου', absolute: false,
    translation: 'so that what was spoken by the Lord through the prophet might be fulfilled, saying,', help: 'πληρωθῇ = might be fulfilled · τὸ ῥηθέν = what was spoken',
    note: 'Not absolute: λέγοντος describes τοῦ προφήτου, which διά needs.',
  },
  {
    id: 'john-9-32', ref: 'John 9:32', text: 'οὐκ ἠκούσθη ὅτι ἠνέῳξέν τις ὀφθαλμοὺς τυφλοῦ γεγεννημένου·', word: 'γεγεννημένου', lemma: 'γεννάω', tense: 'perfect', voice: 'middle/passive',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'τυφλοῦ', absolute: false,
    translation: 'it has never been heard that anyone opened the eyes of a man born blind.', help: 'ἠκούσθη = it was heard · ἠνέῳξεν = he opened',
    note: 'Not absolute: γεγεννημένου describes τυφλοῦ, “of a blind man,” whose eyes were opened.',
  },
  {
    id: 'matt-16-16', ref: 'Matt 16:16', text: 'Σὺ εἶ ὁ χριστὸς ὁ υἱὸς τοῦ θεοῦ τοῦ ζῶντος.', word: 'ζῶντος', lemma: 'ζάω', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'τοῦ θεοῦ', absolute: false,
    translation: 'You are the Christ, the Son of the living God.',
    note: 'Not absolute: an attributive participle describing τοῦ θεοῦ, “of God.”',
  },
  {
    id: 'john-4-34', ref: 'John 4:34', text: 'Ἐμὸν βρῶμά ἐστιν ἵνα ποιήσω τὸ θέλημα τοῦ πέμψαντός με', word: 'πέμψαντός', lemma: 'πέμπω', tense: 'aorist', voice: 'active',
    case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'τοῦ (substantival: “of the one who sent”)', absolute: false,
    translation: 'My food is to do the will of the one who sent me', help: 'βρῶμα = food',
    note: 'Not absolute: with its article it is a noun, “the will of the one who sent me.”',
  },
]

export const chapter30: Chapter = {
  number: 30,
  title: 'Perfect Participles and Genitive Absolutes',
  short: 'Perfect participles',
  topics: ['ptcPerfect'],
  vocab: [
    { id: 'mede', lemma: 'μηδέ', pos: 'conjunction', gloss: 'but not, nor, not even', hook: 'μή + δέ, as οὐδέ is οὐ + δέ; used where μή would be.', accept: ['but not', 'nor', 'not even', 'and not', 'neither'] },
    { id: 'presbyteros', lemma: 'πρεσβύτερος', lexical: 'πρεσβύτερος, -α, -ον', pos: 'adjective', gloss: 'elder', hook: 'Presbyterian: a church led by elders.', accept: ['elder', 'older', 'elders', 'older man'] },
  ],
  paradigms: [],
  participles: { verbs: VERBS, verses: VERSES },
}

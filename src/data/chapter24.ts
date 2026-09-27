import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 24: Aorist and Future Passive Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first (ἐλύθην). `stem` is the augmented aorist passive stem with θη (or η for a second aorist passive);
 * `from` is the stem θ is added to, for the stop rules; `futurePassive` is the future passive stem.
 * Verbs with `voice: 'passive'` mean “was …ed”; the rest are deponents with an active meaning.
 */
const VERBS: PresentVerb[] = [
  {
    id: 'lyo', lemma: 'λύω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐλυθη', from: 'λυ', futurePassive: { stem: 'λυθήσ' },
    alt1s: ['ἔλυσα'], en: 'loose', en3: 'looses', pp: 'loosed',
  },
  {
    id: 'agapao', lemma: 'ἀγαπάω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἠγαπηθη', from: 'ἀγαπα', futurePassive: { stem: 'ἀγαπηθήσ' },
    alt1s: ['ἠγάπησα'], en: 'love', en3: 'loves', pp: 'loved',
  },
  {
    id: 'pleroo', lemma: 'πληρόω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐπληρωθη', from: 'πληρο', futurePassive: { stem: 'πληρωθήσ' },
    alt1s: ['ἐπλήρωσα'], en: 'fulfill', en3: 'fulfills', pp: 'fulfilled',
  },
  {
    id: 'baptizo', lemma: 'βαπτίζω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐβαπτισθη', from: 'βαπτιζ', futurePassive: { stem: 'βαπτισθήσ' },
    alt1s: ['ἐβάπτισα'], en: 'baptize', en3: 'baptizes', pp: 'baptized',
  },
  {
    id: 'ago', lemma: 'ἄγω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἠχθη', from: 'ἀγ', futurePassive: { stem: 'ἀχθήσ' },
    alt1s: ['ἤγαγον'], en: 'lead', en3: 'leads', pp: 'led',
  },
  {
    id: 'kerysso', lemma: 'κηρύσσω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐκηρυχθη', from: 'κηρυγ', futurePassive: { stem: 'κηρυχθήσ' },
    alt1s: ['ἐκήρυξα'], en: 'proclaim', en3: 'proclaims', pp: 'proclaimed', change: 'The root is *κηρυγ: γ + θ → χθ.',
  },
  {
    id: 'kaleo', lemma: 'καλέω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐκληθη', futurePassive: { stem: 'κληθήσ' },
    alt1s: ['ἐκάλεσα'], en: 'call', en3: 'calls', pp: 'called', change: 'The passive is built on the stem κλη: ἐκλήθην.',
  },
  {
    id: 'sozo', lemma: 'σῴζω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐσωθη', futurePassive: { stem: 'σωθήσ' },
    alt1s: ['ἔσωσα'], en: 'save', en3: 'saves', pp: 'saved', change: 'The passive is built on the stem σω: ἐσώθην.',
  },
  {
    id: 'egeiro', lemma: 'ἐγείρω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἠγερθη', futurePassive: { stem: 'ἐγερθήσ' },
    alt1s: ['ἤγειρα'], en: 'raise', en3: 'raises', pp: 'raised', change: 'Built on the root *ἐγερ: ἠγέρθην.',
  },
  {
    id: 'ginosko', lemma: 'γινώσκω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐγνωσθη', futurePassive: { stem: 'γνωσθήσ' },
    alt1s: ['ἔγνων'], en: 'know', en3: 'knows', pp: 'known', change: 'Built on the root *γνω, with a σ inserted before θ.',
  },
  {
    id: 'grapho', lemma: 'γράφω', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐγραφη', futurePassive: { stem: 'γραφήσ' },
    alt1s: ['ἔγραψα'], en: 'write', en3: 'writes', pp: 'written', change: 'A second aorist passive: η without θ.',
  },
  // Passive in form, active in meaning.
  {
    id: 'horao', lemma: 'ὁράω', tense: 'aorist', passiveForm: true, stem: 'ὠφθη', from: 'ὀπ', futurePassive: { stem: 'ὀφθήσ' },
    alt1s: ['εἶδον'], en: 'appear', en3: 'appears', past: 'appeared', change: 'From the root *ὀπ (π + θ → φθ): “I appeared, was seen.”',
  },
  {
    id: 'apokrinomai', lemma: 'ἀποκρίνομαι', tense: 'aorist', passiveForm: true, stem: 'ἀπεκριθη', prefix: 'ἀπ', futurePassive: { stem: 'ἀποκριθήσ' },
    en: 'answer', en3: 'answers', past: 'answered', change: 'Passive in form, active in meaning.',
  },
  {
    id: 'ginomai', lemma: 'γίνομαι', tense: 'aorist', passiveForm: true, stem: 'ἐγενηθη',
    alt1s: ['ἐγενόμην'], en: 'become', en3: 'becomes', past: 'became', change: 'Passive in form, active in meaning (like ἐγενόμην).',
  },
  {
    id: 'poreuomai', lemma: 'πορεύομαι', tense: 'aorist', passiveForm: true, stem: 'ἐπορευθη',
    en: 'go', en3: 'goes', past: 'went', change: 'Passive in form, active in meaning.',
  },
  {
    id: 'phobeomai', lemma: 'φοβέομαι', tense: 'aorist', passiveForm: true, stem: 'ἐφοβηθη', from: 'φοβε', futurePassive: { stem: 'φοβηθήσ' },
    en: 'fear', en3: 'fears', past: 'feared', change: 'Passive in form, active in meaning.',
  },
  {
    id: 'chairo', lemma: 'χαίρω', tense: 'aorist', passiveForm: true, stem: 'ἐχαρη', futurePassive: { stem: 'χαρήσ' },
    en: 'rejoice', en3: 'rejoices', past: 'rejoiced', change: 'A second aorist passive (η, no θ) with an active meaning.',
  },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'acts-22-8', ref: 'Acts 22:8', text: 'ἐγὼ δὲ ἀπεκρίθην· Τίς εἶ, κύριε;', word: 'ἀπεκρίθην', slot: '1s', verb: 'apokrinomai',
    translation: 'And I answered, “Who are you, Lord?”', note: 'Passive in form, active in meaning: “I answered.”',
  },
  {
    id: 'acts-26-16', ref: 'Acts 26:16', text: 'εἰς τοῦτο γὰρ ὤφθην σοι', word: 'ὤφθην', slot: '1s', verb: 'horao',
    translation: 'for I have appeared to you for this purpose',
  },
  {
    id: 'mark-5-28', ref: 'Mark 5:28', text: 'Ἐὰν ἅψωμαι κἂν τῶν ἱματίων αὐτοῦ σωθήσομαι.', word: 'σωθήσομαι', slot: '1s', verb: 'sozo', tense: 'future',
    translation: 'If I touch even his garments, I will be made well.', help: 'ἅψωμαι = I touch · κἄν = even',
    note: 'A future passive: θη + σ + ομαι. ἱμάτιον, “garment,” is from this chapter’s vocabulary.',
  },
  {
    id: 'heb-13-6', ref: 'Heb 13:6', text: 'Κύριος ἐμοὶ βοηθός, οὐ φοβηθήσομαι·', word: 'φοβηθήσομαι', slot: '1s', verb: 'phobeomai', tense: 'future',
    translation: 'The Lord is my helper; I will not be afraid.', help: 'βοηθός = helper',
  },
  // 2nd singular
  {
    id: 'luke-10-28', ref: 'Luke 10:28', text: 'Ὀρθῶς ἀπεκρίθης· τοῦτο ποίει καὶ ζήσῃ.', word: 'ἀπεκρίθης', slot: '2s', verb: 'apokrinomai',
    translation: 'You have answered correctly; do this, and you will live.', help: 'ὀρθῶς = correctly · ποίει = do!',
  },
  {
    id: '1cor-7-21', ref: '1 Cor 7:21', text: 'Δοῦλος ἐκλήθης; μή σοι μελέτω·', word: 'ἐκλήθης', slot: '2s', verb: 'kaleo',
    translation: 'Were you a slave when you were called? Do not be concerned about it.', help: 'μή σοι μελέτω = do not let it trouble you',
  },
  {
    id: 'acts-16-31', ref: 'Acts 16:31', text: 'Πίστευσον ἐπὶ τὸν κύριον Ἰησοῦν, καὶ σωθήσῃ σὺ καὶ ὁ οἶκός σου.', word: 'σωθήσῃ', slot: '2s', verb: 'sozo', tense: 'future',
    translation: 'Believe in the Lord Jesus, and you will be saved, you and your household.', help: 'πίστευσον = believe!',
  },
  // 3rd singular
  {
    id: 'john-1-26', ref: 'John 1:26', text: 'ἀπεκρίθη αὐτοῖς ὁ Ἰωάννης λέγων', word: 'ἀπεκρίθη', slot: '3s', verb: 'apokrinomai',
    translation: 'John answered them, saying',
  },
  {
    id: '1cor-15-5', ref: '1 Cor 15:5', text: 'καὶ ὅτι ὤφθη Κηφᾷ, εἶτα τοῖς δώδεκα·', word: 'ὤφθη', slot: '3s', verb: 'horao',
    translation: 'and that he appeared to Cephas, then to the Twelve.', help: 'εἶτα = then', note: 'ὤφθη takes a dative: “appeared to.”',
  },
  {
    id: 'matt-28-6', ref: 'Matt 28:6', text: 'οὐκ ἔστιν ὧδε, ἠγέρθη γὰρ καθὼς εἶπεν·', word: 'ἠγέρθη', slot: '3s', verb: 'egeiro',
    translation: 'He is not here, for he has been raised, just as he said.',
  },
  {
    id: 'mark-1-9', ref: 'Mark 1:9', text: 'καὶ ἐβαπτίσθη εἰς τὸν Ἰορδάνην ὑπὸ Ἰωάννου.', word: 'ἐβαπτίσθη', slot: '3s', verb: 'baptizo',
    translation: 'and he was baptized in the Jordan by John.', note: 'ὑπό + genitive names the agent: “by John.” ζ + θ → σθ.',
  },
  {
    id: 'mark-7-35', ref: 'Mark 7:35', text: 'καὶ ἐλύθη ὁ δεσμὸς τῆς γλώσσης αὐτοῦ', word: 'ἐλύθη', slot: '3s', verb: 'lyo',
    translation: 'and the bond of his tongue was loosed', help: 'δεσμός = bond',
  },
  {
    id: 'rom-4-23', ref: 'Rom 4:23', text: 'Οὐκ ἐγράφη δὲ διʼ αὐτὸν μόνον', word: 'ἐγράφη', slot: '3s', verb: 'grapho',
    translation: 'But it was not written for his sake alone', note: 'A second aorist passive: η without θ.',
  },
  {
    id: 'luke-8-36', ref: 'Luke 8:36', text: 'πῶς ἐσώθη ὁ δαιμονισθείς.', word: 'ἐσώθη', slot: '3s', verb: 'sozo',
    translation: 'how the man who had been possessed by demons was healed.', help: 'ὁ δαιμονισθείς = the demon-possessed man',
  },
  {
    id: 'acts-19-21', ref: 'Acts 19:21', text: 'Ὡς δὲ ἐπληρώθη ταῦτα', word: 'ἐπληρώθη', slot: '3s', verb: 'pleroo',
    translation: 'Now when these things had been accomplished', note: 'A neuter plural subject (ταῦτα) takes a singular verb.',
  },
  {
    id: '1cor-1-30', ref: '1 Cor 1:30', text: 'ὃς ἐγενήθη σοφία ἡμῖν ἀπὸ θεοῦ', word: 'ἐγενήθη', slot: '3s', verb: 'ginomai',
    translation: 'who became to us wisdom from God',
  },
  {
    id: 'luke-1-32', ref: 'Luke 1:32', text: 'οὗτος ἔσται μέγας καὶ υἱὸς Ὑψίστου κληθήσεται', word: 'κληθήσεται', slot: '3s', verb: 'kaleo', tense: 'future',
    translation: 'He will be great and will be called the Son of the Most High', help: 'ὕψιστος = most high',
  },
  {
    id: 'john-16-22', ref: 'John 16:22', text: 'καὶ χαρήσεται ὑμῶν ἡ καρδία', word: 'χαρήσεται', slot: '3s', verb: 'chairo', tense: 'future',
    translation: 'and your heart will rejoice',
  },
  {
    id: 'matt-24-14', ref: 'Matt 24:14', text: 'καὶ κηρυχθήσεται τοῦτο τὸ εὐαγγέλιον τῆς βασιλείας ἐν ὅλῃ τῇ οἰκουμένῃ', word: 'κηρυχθήσεται', slot: '3s', verb: 'kerysso', tense: 'future',
    translation: 'And this gospel of the kingdom will be proclaimed throughout the whole world', help: 'οἰκουμένη = the inhabited world',
  },
  {
    id: 'john-14-21', ref: 'John 14:21', text: 'ὁ δὲ ἀγαπῶν με ἀγαπηθήσεται ὑπὸ τοῦ πατρός μου', word: 'ἀγαπηθήσεται', slot: '3s', verb: 'agapao', tense: 'future',
    translation: 'And whoever loves me will be loved by my Father', help: 'ὁ ἀγαπῶν = the one who loves',
  },
  // 1st plural
  {
    id: 'rom-6-3', ref: 'Rom 6:3', text: 'ὅσοι ἐβαπτίσθημεν εἰς Χριστὸν Ἰησοῦν εἰς τὸν θάνατον αὐτοῦ ἐβαπτίσθημεν', word: 'ἐβαπτίσθημεν', slot: '1p', verb: 'baptizo',
    translation: 'all of us who were baptized into Christ Jesus were baptized into his death', help: 'ὅσοι = as many as',
  },
  {
    id: 'rom-8-24', ref: 'Rom 8:24', text: 'τῇ γὰρ ἐλπίδι ἐσώθημεν·', word: 'ἐσώθημεν', slot: '1p', verb: 'sozo',
    translation: 'For in this hope we were saved.', help: 'ἐλπίς = hope',
  },
  {
    id: '1cor-4-13', ref: '1 Cor 4:13', text: 'ὡς περικαθάρματα τοῦ κόσμου ἐγενήθημεν', word: 'ἐγενήθημεν', slot: '1p', verb: 'ginomai',
    translation: 'we have become like the scum of the world', help: 'περικάθαρμα = scum, refuse',
  },
  // 2nd plural
  {
    id: '1cor-1-9', ref: '1 Cor 1:9', text: 'πιστὸς ὁ θεὸς διʼ οὗ ἐκλήθητε εἰς κοινωνίαν τοῦ υἱοῦ αὐτοῦ', word: 'ἐκλήθητε', slot: '2p', verb: 'kaleo',
    translation: 'God is faithful, by whom you were called into the fellowship of his Son', help: 'κοινωνία = fellowship',
  },
  {
    id: 'john-14-28', ref: 'John 14:28', text: 'εἰ ἠγαπᾶτέ με ἐχάρητε ἄν', word: 'ἐχάρητε', slot: '2p', verb: 'chairo',
    translation: 'If you loved me, you would have rejoiced', note: 'A second aorist passive with an active meaning.',
  },
  {
    id: 'acts-1-5', ref: 'Acts 1:5', text: 'ὑμεῖς δὲ ἐν πνεύματι βαπτισθήσεσθε ἁγίῳ', word: 'βαπτισθήσεσθε', slot: '2p', verb: 'baptizo', tense: 'future',
    translation: 'but you will be baptized with the Holy Spirit',
  },
  // 3rd plural
  {
    id: 'matt-2-10', ref: 'Matt 2:10', text: 'ἰδόντες δὲ τὸν ἀστέρα ἐχάρησαν χαρὰν μεγάλην σφόδρα.', word: 'ἐχάρησαν', slot: '3p', verb: 'chairo',
    translation: 'When they saw the star, they rejoiced exceedingly with great joy.', help: 'ἰδόντες = seeing · σφόδρα = exceedingly',
  },
  {
    id: 'mark-4-41', ref: 'Mark 4:41', text: 'καὶ ἐφοβήθησαν φόβον μέγαν', word: 'ἐφοβήθησαν', slot: '3p', verb: 'phobeomai',
    translation: 'And they were filled with great fear', note: 'Literally “they feared a great fear.”',
  },
  {
    id: 'acts-19-5', ref: 'Acts 19:5', text: 'ἀκούσαντες δὲ ἐβαπτίσθησαν εἰς τὸ ὄνομα τοῦ κυρίου Ἰησοῦ·', word: 'ἐβαπτίσθησαν', slot: '3p', verb: 'baptizo',
    translation: 'On hearing this, they were baptized in the name of the Lord Jesus.', help: 'ἀκούσαντες = hearing',
  },
  {
    id: 'john-10-33', ref: 'John 10:33', text: 'ἀπεκρίθησαν αὐτῷ οἱ Ἰουδαῖοι', word: 'ἀπεκρίθησαν', slot: '3p', verb: 'apokrinomai',
    translation: 'The Jews answered him',
  },
  {
    id: 'luke-9-56', ref: 'Luke 9:56', text: 'καὶ ἐπορεύθησαν εἰς ἑτέραν κώμην.', word: 'ἐπορεύθησαν', slot: '3p', verb: 'poreuomai',
    translation: 'And they went on to another village.', help: 'κώμη = village',
  },
  {
    id: 'matt-5-9', ref: 'Matt 5:9', text: 'ὅτι αὐτοὶ υἱοὶ θεοῦ κληθήσονται.', word: 'κληθήσονται', slot: '3p', verb: 'kaleo', tense: 'future',
    translation: 'for they will be called sons of God.',
  },
  {
    id: '1cor-15-52', ref: '1 Cor 15:52', text: 'καὶ οἱ νεκροὶ ἐγερθήσονται ἄφθαρτοι', word: 'ἐγερθήσονται', slot: '3p', verb: 'egeiro', tense: 'future',
    translation: 'and the dead will be raised imperishable', help: 'ἄφθαρτος = imperishable',
  },
]

export const chapter24: Chapter = {
  number: 24,
  title: 'Aorist and Future Passive Indicative',
  short: 'Passive',
  topics: ['passive'],
  vocab: [
    { id: 'ago', lemma: 'ἄγω', pos: 'verb', gloss: 'I lead, bring, arrest', hook: 'The verb inside συνάγω (gather together) and συναγωγή.', accept: ['i lead', 'lead', 'i bring', 'bring', 'i arrest', 'arrest', 'go'] },
    { id: 'haima', lemma: 'αἷμα', lexical: 'αἷμα, -ματος, τό', pos: 'noun', gloss: 'blood', hook: 'Hematology, anemia (“bloodless”).', accept: ['blood'] },
    { id: 'hekastos', lemma: 'ἕκαστος', lexical: 'ἕκαστος, -η, -ον', pos: 'adjective', gloss: 'each, every', accept: ['each', 'every', 'each one', 'every one'] },
    { id: 'himation', lemma: 'ἱμάτιον', lexical: 'ἱμάτιον, -ου, τό', pos: 'noun', gloss: 'garment', hook: 'The himation was a Greek cloak worn over the tunic.', accept: ['garment', 'cloak', 'robe', 'clothing', 'clothes'] },
    { id: 'oros', lemma: 'ὄρος', lexical: 'ὄρος, ὄρους, τό', pos: 'noun', gloss: 'mountain, hill', hook: 'Orography: the study of mountains.', accept: ['mountain', 'hill', 'mount'] },
    { id: 'hypago', lemma: 'ὑπάγω', pos: 'verb', gloss: 'I depart', accept: ['i depart', 'depart', 'go away', 'i go away', 'go'] },
    { id: 'phobeomai', lemma: 'φοβέομαι', pos: 'verb', gloss: 'I fear', hook: 'Phobia, and every -phobia.', accept: ['i fear', 'fear', 'i am afraid', 'am afraid', 'be afraid'] },
    { id: 'chairo', lemma: 'χαίρω', pos: 'verb', gloss: 'I rejoice', hook: 'Same root as χαρά, joy, and χάρις, grace.', accept: ['i rejoice', 'rejoice', 'be glad', 'i am glad'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

import type { Chapter, PresentVerb, PresentVerse, RootItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 20: Verbal Roots, and Other Forms of the Future.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * Liquid futures first (μένω → μενῶ is the model): the stem takes εσ, the σ drops out, and the endings contract like ποιέω,
 * so each has `contract: 'ε'` and an unaccented stem. Then futures with a changed stem or another root.
 */
const VERBS: PresentVerb[] = [
  { id: 'meno', lemma: 'μένω', tense: 'future', liquid: true, stem: 'μεν', contract: 'ε', present: { stem: 'μέν' }, en: 'remain', en3: 'remains' },
  { id: 'krino', lemma: 'κρίνω', tense: 'future', liquid: true, stem: 'κριν', contract: 'ε', present: { stem: 'κρίν' }, en: 'judge', en3: 'judges' },
  { id: 'apostello', lemma: 'ἀποστέλλω', tense: 'future', liquid: true, stem: 'ἀποστελ', contract: 'ε', present: { stem: 'ἀποστέλλ' }, en: 'send', en3: 'sends' },
  { id: 'apokteino', lemma: 'ἀποκτείνω', tense: 'future', liquid: true, stem: 'ἀποκτεν', contract: 'ε', present: { stem: 'ἀποκτείν' }, en: 'kill', en3: 'kills' },
  { id: 'egeiro', lemma: 'ἐγείρω', tense: 'future', liquid: true, stem: 'ἐγερ', contract: 'ε', present: { stem: 'ἐγείρ' }, en: 'raise', en3: 'raises' },
  { id: 'airo', lemma: 'αἴρω', tense: 'future', liquid: true, stem: 'ἀρ', contract: 'ε', present: { stem: 'αἴρ' }, en: 'take away', en3: 'takes away' },
  { id: 'ekballo', lemma: 'ἐκβάλλω', tense: 'future', liquid: true, stem: 'ἐκβαλ', contract: 'ε', present: { stem: 'ἐκβάλλ' }, en: 'cast out', en3: 'casts out' },
  {
    id: 'lego', lemma: 'λέγω', tense: 'future', liquid: true, stem: 'ἐρ', contract: 'ε', present: { stem: 'λέγ' }, en: 'say', en3: 'says',
    change: 'Its future comes from another root, *ἐρ, and is a liquid future.',
  },
  { id: 'baptizo', lemma: 'βαπτίζω', tense: 'future', stem: 'βαπτίσ', from: 'βαπτιζ', present: { stem: 'βαπτίζ' }, en: 'baptize', en3: 'baptizes' },
  { id: 'sozo', lemma: 'σῴζω', tense: 'future', stem: 'σώσ', from: 'σωζ', present: { stem: 'σῴζ' }, en: 'save', en3: 'saves' },
  {
    id: 'ginosko', lemma: 'γινώσκω', tense: 'future', voice: 'middle', stem: 'γνώσ', from: 'γνω', present: { stem: 'γινώσκ' }, en: 'know', en3: 'knows',
    change: 'The future is built on the root *γνω; the present adds γι and σκ.',
  },
  {
    id: 'horao', lemma: 'ὁράω', tense: 'future', voice: 'middle', stem: 'ὄψ', from: 'ὀπ', present: { stem: 'ὁρ', contract: 'α' }, en: 'see', en3: 'sees',
    change: 'The future comes from another root, *ὀπ: ὀπ + σ → ὀψ.',
  },
  {
    id: 'erchomai', lemma: 'ἔρχομαι', tense: 'future', voice: 'middle', stem: 'ἐλεύσ', from: 'ἐλευθ', present: { stem: 'ἔρχ', voice: 'middle' }, en: 'come', en3: 'comes',
    change: 'The future comes from another root, *ἐλευθ; the θ drops out before σ.',
  },
  {
    id: 'echo', lemma: 'ἔχω', tense: 'future', stem: 'ἕξ', from: 'ἐχ', present: { stem: 'ἔχ' }, en: 'have', en3: 'has',
    change: 'χ + σ → ξ, and the breathing becomes rough: ἕξω.',
  },
  {
    id: 'kaleo', lemma: 'καλέω', tense: 'future', stem: 'καλέσ', present: { stem: 'καλ', contract: 'ε' }, en: 'call', en3: 'calls',
    change: 'The ε does not lengthen: καλέσω, not καλήσω.',
  },
]

/** The root first in each `options`. */
const ROOTS: RootItem[] = [
  { lemma: 'ἐκβάλλω', options: ['βαλ', 'βαλλ', 'βολ', 'βλη'], how: 'ἐκ + *βαλ. The present doubles the λ; the future uses the root: ἐκβαλῶ.' },
  { lemma: 'ἀποστέλλω', options: ['στελ', 'στελλ', 'στολ', 'στειλ'], how: 'ἀπο + *στελ. The present doubles the λ; the future uses the root: ἀποστελῶ.' },
  { lemma: 'ἀποκτείνω', options: ['κτεν', 'κτειν', 'κτον', 'κτα'], how: 'ἀπο + *κτεν. The present lengthens ε to ει; the future uses the root: ἀποκτενῶ.' },
  { lemma: 'ἐγείρω', options: ['ἐγερ', 'ἐγειρ', 'ἐγορ', 'ἐγρ'], how: '*ἐγερ. The present lengthens ε to ει; the future uses the root: ἐγερῶ.' },
  { lemma: 'αἴρω', options: ['ἀρ', 'αἰρ', 'ἐρ', 'ἀρρ'], how: '*ἀρ. The present adds ι (α → αι); the future uses the root: ἀρῶ.' },
  { lemma: 'κρίνω', options: ['κριν', 'κρι', 'κρειν', 'κρις'], how: '*κριν. The present stem is the root unchanged; the future is liquid: κρινῶ.' },
  { lemma: 'μένω', options: ['μεν', 'μειν', 'μον', 'μν'], how: '*μεν. The present stem is the root unchanged; the future is liquid: μενῶ.' },
  { lemma: 'βαπτίζω', options: ['βαπτιδ', 'βαπτιζ', 'βαπτις', 'βαπτ'], how: '*βαπτιδ. In the present the δ became ζ; before the σ of the future the dental drops out: βαπτίσω.' },
  { lemma: 'γινώσκω', options: ['γνω', 'γινω', 'γινωσκ', 'γνως'], how: '*γνω. The present adds γι in front and σκ after; the future uses the root: γνώσομαι.' },
  { lemma: 'ὁράω', ask: 'What root is its future (ὄψομαι) built on?', options: ['ὀπ', 'ὁρα', 'ὀψ', 'ὀρ'], how: 'ὁράω has more than one root. The future comes from *ὀπ: ὀπ + σ → ὄψομαι.' },
  { lemma: 'ἔρχομαι', ask: 'What root is its future (ἐλεύσομαι) built on?', options: ['ἐλευθ', 'ἐρχ', 'ἐλευς', 'ἐλθ'], how: 'The future comes from *ἐλευθ: the θ drops out before σ, giving ἐλεύσομαι.' },
  { lemma: 'λέγω', ask: 'What root is its future (ἐρῶ) built on?', options: ['ἐρ', 'λεγ', 'λεξ', 'ῥη'], how: 'The future comes from *ἐρ, a liquid root, so it is a liquid future: ἐρῶ, ἐρεῖς, ἐρεῖ.' },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-2-19', ref: 'John 2:19', text: 'Λύσατε τὸν ναὸν τοῦτον καὶ ἐν τρισὶν ἡμέραις ἐγερῶ αὐτόν.', word: 'ἐγερῶ', slot: '1s', verb: 'egeiro',
    translation: 'Destroy this temple, and in three days I will raise it up.', help: 'λύσατε = destroy! · ναός = temple · τρισίν = three',
    note: 'ἐγερῶ is built on the root *ἐγερ, not the present stem ἐγειρ.',
  },
  {
    id: 'luke-11-49', ref: 'Luke 11:49', text: 'Ἀποστελῶ εἰς αὐτοὺς προφήτας καὶ ἀποστόλους', word: 'Ἀποστελῶ', slot: '1s', verb: 'apostello',
    translation: 'I will send them prophets and apostles', note: 'One λ, and a circumflex: the future of ἀποστέλλω.',
  },
  {
    id: 'john-16-22', ref: 'John 16:22', text: 'πάλιν δὲ ὄψομαι ὑμᾶς, καὶ χαρήσεται ὑμῶν ἡ καρδία', word: 'ὄψομαι', slot: '1s', verb: 'horao',
    translation: 'But I will see you again, and your heart will rejoice', help: 'πάλιν = again · χαρήσεται = will rejoice',
  },
  {
    id: 'luke-1-18', ref: 'Luke 1:18', text: 'Κατὰ τί γνώσομαι τοῦτο;', word: 'γνώσομαι', slot: '1s', verb: 'ginosko',
    translation: 'How will I know this?', help: 'κατὰ τί = by what? how?',
  },
  {
    id: '1cor-4-19', ref: '1 Cor 4:19', text: 'ἐλεύσομαι δὲ ταχέως πρὸς ὑμᾶς', word: 'ἐλεύσομαι', slot: '1s', verb: 'erchomai',
    translation: 'But I will come to you soon', help: 'ταχέως = soon',
  },
  {
    id: 'john-20-15', ref: 'John 20:15', text: 'εἰπέ μοι ποῦ ἔθηκας αὐτόν, κἀγὼ αὐτὸν ἀρῶ.', word: 'ἀρῶ', slot: '1s', verb: 'airo',
    translation: 'Tell me where you have laid him, and I will take him away.', help: 'εἰπέ = tell! · ἔθηκας = you laid · κἀγώ = καὶ ἐγώ',
  },
  {
    id: 'rom-9-25', ref: 'Rom 9:25', text: 'Καλέσω τὸν οὐ λαόν μου λαόν μου', word: 'Καλέσω', slot: '1s', verb: 'kaleo',
    translation: 'Those who were not my people I will call “my people”', note: 'λαός, “people,” is from this chapter’s vocabulary.',
  },
  // 2nd singular
  {
    id: 'john-2-20', ref: 'John 2:20', text: 'καὶ σὺ ἐν τρισὶν ἡμέραις ἐγερεῖς αὐτόν;', word: 'ἐγερεῖς', slot: '2s', verb: 'egeiro',
    translation: 'and you will raise it up in three days?',
  },
  {
    id: 'john-13-7', ref: 'John 13:7', text: 'Ὃ ἐγὼ ποιῶ σὺ οὐκ οἶδας ἄρτι, γνώσῃ δὲ μετὰ ταῦτα.', word: 'γνώσῃ', slot: '2s', verb: 'ginosko',
    translation: 'What I am doing you do not understand now, but afterward you will understand.', help: 'ἄρτι = now · μετὰ ταῦτα = afterward',
  },
  {
    id: 'john-1-50', ref: 'John 1:50', text: 'μείζω τούτων ὄψῃ.', word: 'ὄψῃ', slot: '2s', verb: 'horao',
    translation: 'You will see greater things than these.', note: 'μείζω is a form of μείζων, “greater,” with a genitive: “than these.”',
  },
  {
    id: 'luke-1-31', ref: 'Luke 1:31', text: 'καὶ καλέσεις τὸ ὄνομα αὐτοῦ Ἰησοῦν.', word: 'καλέσεις', slot: '2s', verb: 'kaleo',
    translation: 'and you will call his name Jesus.',
  },
  {
    id: 'mark-10-21', ref: 'Mark 10:21', text: 'καὶ ἕξεις θησαυρὸν ἐν οὐρανῷ', word: 'ἕξεις', slot: '2s', verb: 'echo',
    translation: 'and you will have treasure in heaven', help: 'θησαυρός = treasure',
  },
  // 3rd singular
  {
    id: 'mark-1-8', ref: 'Mark 1:8', text: 'αὐτὸς δὲ βαπτίσει ὑμᾶς ἐν πνεύματι ἁγίῳ.', word: 'βαπτίσει', slot: '3s', verb: 'baptizo',
    translation: 'but he will baptize you with the Holy Spirit.',
  },
  {
    id: 'matt-1-21', ref: 'Matt 1:21', text: 'αὐτὸς γὰρ σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν.', word: 'σώσει', slot: '3s', verb: 'sozo',
    translation: 'for he will save his people from their sins.', note: 'σῳζ + σ → σωσ: the ζ drops out before σ.',
  },
  {
    id: 'heb-13-4', ref: 'Heb 13:4', text: 'πόρνους γὰρ καὶ μοιχοὺς κρινεῖ ὁ θεός.', word: 'κρινεῖ', slot: '3s', verb: 'krino',
    translation: 'for God will judge the sexually immoral and adulterers.', help: 'πόρνος = sexually immoral person · μοιχός = adulterer',
    note: 'κρινεῖ is future; the present would be κρίνει. Only the accent differs.',
  },
  {
    id: '1cor-3-14', ref: '1 Cor 3:14', text: 'εἴ τινος τὸ ἔργον μενεῖ ὃ ἐποικοδόμησεν', word: 'μενεῖ', slot: '3s', verb: 'meno',
    translation: 'If the work that anyone has built on it survives', help: 'ἐποικοδόμησεν = he built on',
    note: 'Greek uses the future after εἰ here; English says “survives.”',
  },
  {
    id: 'matt-13-41', ref: 'Matt 13:41', text: 'ἀποστελεῖ ὁ υἱὸς τοῦ ἀνθρώπου τοὺς ἀγγέλους αὐτοῦ', word: 'ἀποστελεῖ', slot: '3s', verb: 'apostello',
    translation: 'The Son of Man will send his angels',
  },
  {
    id: 'john-8-12', ref: 'John 8:12', text: 'ἀλλʼ ἕξει τὸ φῶς τῆς ζωῆς.', word: 'ἕξει', slot: '3s', verb: 'echo',
    translation: 'but will have the light of life.', help: 'φῶς = light',
  },
  {
    id: 'acts-1-11', ref: 'Acts 1:11', text: 'οὗτος ὁ Ἰησοῦς ὁ ἀναλημφθεὶς ἀφʼ ὑμῶν εἰς τὸν οὐρανὸν οὕτως ἐλεύσεται', word: 'ἐλεύσεται', slot: '3s', verb: 'erchomai',
    translation: 'This Jesus, who was taken up from you into heaven, will come in the same way', help: 'ὁ ἀναλημφθείς = who was taken up · οὕτως = in the same way',
  },
  {
    id: 'john-3-36', ref: 'John 3:36', text: 'ὁ δὲ ἀπειθῶν τῷ υἱῷ οὐκ ὄψεται ζωήν', word: 'ὄψεται', slot: '3s', verb: 'horao',
    translation: 'but whoever does not obey the Son will not see life', help: 'ὁ ἀπειθῶν = the one who disobeys',
  },
  // 1st plural
  {
    id: '1cor-6-3', ref: '1 Cor 6:3', text: 'οὐκ οἴδατε ὅτι ἀγγέλους κρινοῦμεν', word: 'κρινοῦμεν', slot: '1p', verb: 'krino',
    translation: 'Do you not know that we will judge angels?', note: 'κρινοῦμεν, not κρίνομεν: ε + ο → ου.',
  },
  {
    id: 'rom-4-1', ref: 'Rom 4:1', text: 'Τί οὖν ἐροῦμεν', word: 'ἐροῦμεν', slot: '1p', verb: 'lego',
    translation: 'What then shall we say…?', note: 'A favorite question of Paul’s. ἐροῦμεν is the future of λέγω, from the root *ἐρ.',
  },
  {
    id: '1john-3-2', ref: '1 John 3:2', text: 'ὅτι ὀψόμεθα αὐτὸν καθώς ἐστιν.', word: 'ὀψόμεθα', slot: '1p', verb: 'horao',
    translation: 'because we will see him as he is.', help: 'καθώς = as',
  },
  // 2nd plural
  {
    id: 'john-15-10', ref: 'John 15:10', text: 'ἐὰν τὰς ἐντολάς μου τηρήσητε, μενεῖτε ἐν τῇ ἀγάπῃ μου', word: 'μενεῖτε', slot: '2p', verb: 'meno',
    translation: 'If you keep my commandments, you will remain in my love', help: 'τηρήσητε = you keep',
  },
  {
    id: 'john-8-32', ref: 'John 8:32', text: 'καὶ γνώσεσθε τὴν ἀλήθειαν, καὶ ἡ ἀλήθεια ἐλευθερώσει ὑμᾶς.', word: 'γνώσεσθε', slot: '2p', verb: 'ginosko',
    translation: 'and you will know the truth, and the truth will set you free.', help: 'ἐλευθερώσει = will set free',
  },
  {
    id: 'luke-19-31', ref: 'Luke 19:31', text: 'οὕτως ἐρεῖτε ὅτι Ὁ κύριος αὐτοῦ χρείαν ἔχει.', word: 'ἐρεῖτε', slot: '2p', verb: 'lego',
    translation: 'you will say this: “The Lord needs it.”', help: 'χρείαν ἔχει = has need of',
  },
  {
    id: 'acts-20-25', ref: 'Acts 20:25', text: 'ὅτι οὐκέτι ὄψεσθε τὸ πρόσωπόν μου ὑμεῖς πάντες', word: 'ὄψεσθε', slot: '2p', verb: 'horao',
    translation: 'that none of you will see my face again', help: 'οὐκέτι = no longer',
  },
  // 3rd plural
  {
    id: 'mark-16-17', ref: 'Mark 16:17', text: 'ἐν τῷ ὀνόματί μου δαιμόνια ἐκβαλοῦσιν, γλώσσαις λαλήσουσιν καιναῖς', word: 'ἐκβαλοῦσιν', slot: '3p', verb: 'ekballo',
    translation: 'in my name they will cast out demons; they will speak in new tongues', help: 'καινός = new',
    note: 'ἐκβαλοῦσιν (liquid) next to λαλήσουσιν (σ future). γλῶσσα is from this chapter’s vocabulary.',
  },
  {
    id: '1cor-6-2', ref: '1 Cor 6:2', text: 'ἢ οὐκ οἴδατε ὅτι οἱ ἅγιοι τὸν κόσμον κρινοῦσιν;', word: 'κρινοῦσιν', slot: '3p', verb: 'krino',
    translation: 'Or do you not know that the saints will judge the world?',
  },
  {
    id: 'luke-18-33', ref: 'Luke 18:33', text: 'καὶ μαστιγώσαντες ἀποκτενοῦσιν αὐτόν', word: 'ἀποκτενοῦσιν', slot: '3p', verb: 'apokteino',
    translation: 'and after flogging him, they will kill him', help: 'μαστιγώσαντες = after flogging',
  },
  {
    id: 'john-13-35', ref: 'John 13:35', text: 'ἐν τούτῳ γνώσονται πάντες ὅτι ἐμοὶ μαθηταί ἐστε', word: 'γνώσονται', slot: '3p', verb: 'ginosko',
    translation: 'By this everyone will know that you are my disciples', help: 'μαθητής = disciple',
  },
  {
    id: 'matt-5-8', ref: 'Matt 5:8', text: 'μακάριοι οἱ καθαροὶ τῇ καρδίᾳ, ὅτι αὐτοὶ τὸν θεὸν ὄψονται.', word: 'ὄψονται', slot: '3p', verb: 'horao',
    translation: 'Blessed are the pure in heart, for they will see God.', help: 'μακάριος = blessed · καθαρός = pure',
  },
  {
    id: 'john-11-48', ref: 'John 11:48', text: 'καὶ ἐλεύσονται οἱ Ῥωμαῖοι καὶ ἀροῦσιν ἡμῶν καὶ τὸν τόπον καὶ τὸ ἔθνος.', word: 'ἀροῦσιν', slot: '3p', verb: 'airo',
    translation: 'and the Romans will come and take away both our place and our nation.', help: 'ἔθνος = nation',
    note: 'Two futures from this chapter: ἐλεύσονται (ἔρχομαι) and ἀροῦσιν (αἴρω).',
  },
]

export const chapter20: Chapter = {
  number: 20,
  title: 'Verbal Roots, and Other Forms of the Future',
  short: 'Other futures',
  topics: ['roots'],
  vocab: [
    { id: 'airo', lemma: 'αἴρω', pos: 'verb', gloss: 'I raise, take up, take away', accept: ['i raise', 'raise', 'i take up', 'take up', 'i take away', 'take away', 'lift up', 'remove'] },
    { id: 'apokteino', lemma: 'ἀποκτείνω', pos: 'verb', gloss: 'I kill', accept: ['i kill', 'kill', 'put to death'] },
    { id: 'apostello', lemma: 'ἀποστέλλω', pos: 'verb', gloss: 'I send (away)', hook: 'Its cognate noun is ἀπόστολος: an apostle is one who is sent.', accept: ['i send', 'send', 'i send away', 'send away', 'send out'] },
    { id: 'baptizo', lemma: 'βαπτίζω', pos: 'verb', gloss: 'I baptize', hook: 'Baptize, baptism.', accept: ['i baptize', 'baptize', 'baptise', 'immerse', 'dip'] },
    { id: 'ginosko', lemma: 'γινώσκω', pos: 'verb', gloss: 'I know, come to know, realize, learn', hook: 'Root γνω: agnostic, diagnosis, and English “know” are all related.', accept: ['i know', 'know', 'come to know', 'realize', 'realise', 'learn', 'understand', 'recognize'] },
    { id: 'glossa', lemma: 'γλῶσσα', lexical: 'γλῶσσα, -ης, ἡ', pos: 'noun', gloss: 'tongue, language', hook: 'Glossolalia: speaking in tongues; a glossary lists words.', accept: ['tongue', 'language'] },
    { id: 'egeiro', lemma: 'ἐγείρω', pos: 'verb', gloss: 'I raise up, wake', accept: ['i raise up', 'raise up', 'raise', 'i wake', 'wake', 'awaken', 'rise'] },
    { id: 'ekballo', lemma: 'ἐκβάλλω', pos: 'verb', gloss: 'I cast out, send out', hook: 'ἐκ (out) + βάλλω (I throw): ballistic.', accept: ['i cast out', 'cast out', 'i send out', 'send out', 'drive out', 'throw out'] },
    { id: 'ekei', lemma: 'ἐκεῖ', pos: 'adverb', gloss: 'there, in that place', accept: ['there', 'in that place'] },
    { id: 'krino', lemma: 'κρίνω', pos: 'verb', gloss: 'I judge, decide, prefer', hook: 'Critic, criterion, crisis (a decisive moment).', accept: ['i judge', 'judge', 'i decide', 'decide', 'i prefer', 'prefer'] },
    { id: 'laos', lemma: 'λαός', lexical: 'λαός, -οῦ, ὁ', pos: 'noun', gloss: 'people, crowd', hook: 'Laity: the people, as distinct from the clergy.', accept: ['people', 'crowd', 'a people', 'nation'] },
    { id: 'meno', lemma: 'μένω', pos: 'verb', gloss: 'I remain, live', accept: ['i remain', 'remain', 'i live', 'live', 'stay', 'abide', 'dwell'] },
    { id: 'horao', lemma: 'ὁράω', pos: 'verb', gloss: 'I see, notice, experience', hook: 'Its future ὄψομαι gives optic and optometry.', accept: ['i see', 'see', 'i notice', 'notice', 'i experience', 'experience', 'perceive'] },
    { id: 'sophia', lemma: 'σοφία', lexical: 'σοφία, -ας, ἡ', pos: 'noun', gloss: 'wisdom', hook: 'Philosophy: the love of wisdom.', accept: ['wisdom'] },
    { id: 'stoma', lemma: 'στόμα', lexical: 'στόμα, -ατος, τό', pos: 'noun', gloss: 'mouth', hook: 'Stomatology: the study of the mouth. Stomach is from the same word.', accept: ['mouth'] },
    { id: 'sozo', lemma: 'σῴζω', pos: 'verb', gloss: 'I save, deliver, rescue', hook: 'Same root as σωτήρ, savior: soteriology, the doctrine of salvation.', accept: ['i save', 'save', 'i deliver', 'deliver', 'i rescue', 'rescue', 'heal'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES, roots: ROOTS },
}

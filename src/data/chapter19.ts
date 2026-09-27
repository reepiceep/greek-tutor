import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 19: Future Active/Middle Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first (λύσω is Mounce's model). `stem` is the future stem, built from `from` + σ: plain (λύσ), with a stop
 * (βλεπ + σ → βλέψ, συναγ + σ → συνάξ), or with a lengthened contract vowel (ἀγαπα + σ → ἀγαπήσ). Then two middle futures.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'future', stem: 'λύσ', from: 'λυ', present: { stem: 'λύ' }, en: 'loose', en3: 'looses' },
  { id: 'akouo', lemma: 'ἀκούω', tense: 'future', stem: 'ἀκούσ', from: 'ἀκου', present: { stem: 'ἀκού' }, en: 'hear', en3: 'hears' },
  { id: 'pisteuo', lemma: 'πιστεύω', tense: 'future', stem: 'πιστεύσ', from: 'πιστευ', present: { stem: 'πιστεύ' }, en: 'believe', en3: 'believes' },
  { id: 'blepo', lemma: 'βλέπω', tense: 'future', stem: 'βλέψ', from: 'βλεπ', present: { stem: 'βλέπ' }, en: 'see', en3: 'sees' },
  { id: 'synago', lemma: 'συνάγω', tense: 'future', stem: 'συνάξ', from: 'συναγ', present: { stem: 'συνάγ' }, en: 'gather together', en3: 'gathers together' },
  { id: 'agapao', lemma: 'ἀγαπάω', tense: 'future', stem: 'ἀγαπήσ', from: 'ἀγαπα', present: { stem: 'ἀγαπ', contract: 'α' }, en: 'love', en3: 'loves' },
  { id: 'poieo', lemma: 'ποιέω', tense: 'future', stem: 'ποιήσ', from: 'ποιε', present: { stem: 'ποι', contract: 'ε' }, en: 'do', en3: 'does' },
  { id: 'pleroo', lemma: 'πληρόω', tense: 'future', stem: 'πληρώσ', from: 'πληρο', present: { stem: 'πληρ', contract: 'ο' }, en: 'fill', en3: 'fills' },
  { id: 'tereo', lemma: 'τηρέω', tense: 'future', stem: 'τηρήσ', from: 'τηρε', present: { stem: 'τηρ', contract: 'ε' }, en: 'keep', en3: 'keeps' },
  { id: 'proskyneo', lemma: 'προσκυνέω', tense: 'future', stem: 'προσκυνήσ', from: 'προσκυνε', present: { stem: 'προσκυν', contract: 'ε' }, en: 'worship', en3: 'worships' },
  { id: 'gennao', lemma: 'γεννάω', tense: 'future', stem: 'γεννήσ', from: 'γεννα', present: { stem: 'γενν', contract: 'α' }, en: 'give birth to', en3: 'gives birth to' },
  // ζάω's present contracts irregularly (ζῇ, not ζᾷ), so it is left out of "present or future".
  { id: 'zao', lemma: 'ζάω', tense: 'future', stem: 'ζήσ', from: 'ζα', en: 'live', en3: 'lives' },
  { id: 'poreuomai', lemma: 'πορεύομαι', tense: 'future', voice: 'middle', stem: 'πορεύσ', from: 'πορευ', present: { stem: 'πορεύ' }, en: 'go', en3: 'goes' },
  {
    id: 'eimi', lemma: 'εἰμί', tense: 'future', voice: 'middle', stem: 'ἔσ', irregular: { '3s': 'ἔσται' },
    en: 'be', en3: 'is', lexicalGloss: 'I am',
  },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-14-13', ref: 'John 14:13', text: 'τοῦτο ποιήσω', word: 'ποιήσω', slot: '1s', verb: 'poieo',
    translation: 'this I will do', note: 'ποιε + σ + ω: the ε lengthens to η before the σ.',
  },
  {
    id: 'luke-15-18', ref: 'Luke 15:18', text: 'ἀναστὰς πορεύσομαι πρὸς τὸν πατέρα μου', word: 'πορεύσομαι', slot: '1s', verb: 'poreuomai',
    translation: 'I will get up and go to my father', help: 'ἀναστάς = getting up', note: 'The prodigal son. πορεύομαι is middle in the future too.',
  },
  {
    id: 'luke-12-17', ref: 'Luke 12:17', text: 'ὅτι οὐκ ἔχω ποῦ συνάξω τοὺς καρπούς μου;', word: 'συνάξω', slot: '1s', verb: 'synago',
    translation: 'for I have nowhere to gather my crops?', help: 'ποῦ = where', note: 'γ + σ → ξ. καρπός, “crop,” is from this chapter’s vocabulary.',
  },
  {
    id: 'rev-3-10', ref: 'Rev 3:10', text: 'κἀγώ σε τηρήσω ἐκ τῆς ὥρας τοῦ πειρασμοῦ', word: 'τηρήσω', slot: '1s', verb: 'tereo',
    translation: 'I too will keep you from the hour of trial', help: 'κἀγώ = καὶ ἐγώ · πειρασμός = trial, testing',
  },
  {
    id: 'mark-9-19', ref: 'Mark 9:19', text: 'ἕως πότε πρὸς ὑμᾶς ἔσομαι;', word: 'ἔσομαι', slot: '1s', verb: 'eimi',
    translation: 'How long will I be with you?', help: 'ἕως πότε = how long?', note: 'The future of εἰμί is middle: ἔσομαι.',
  },
  // 2nd singular
  {
    id: 'mark-12-31', ref: 'Mark 12:31', text: 'Ἀγαπήσεις τὸν πλησίον σου ὡς σεαυτόν.', word: 'Ἀγαπήσεις', slot: '2s', verb: 'agapao',
    translation: 'You shall love your neighbor as yourself.', help: 'πλησίον = neighbor · σεαυτόν = yourself',
    note: 'A future can give a command: “you shall love.”',
  },
  {
    id: 'matt-4-10', ref: 'Matt 4:10', text: 'Κύριον τὸν θεόν σου προσκυνήσεις', word: 'προσκυνήσεις', slot: '2s', verb: 'proskyneo',
    translation: 'You shall worship the Lord your God', note: 'Another command in the future, quoting Deuteronomy.',
  },
  {
    id: 'acts-2-28', ref: 'Acts 2:28', text: 'πληρώσεις με εὐφροσύνης μετὰ τοῦ προσώπου σου.', word: 'πληρώσεις', slot: '2s', verb: 'pleroo',
    translation: 'You will fill me with gladness in your presence.', help: 'εὐφροσύνη = gladness', note: 'ο lengthens to ω before the σ.',
  },
  {
    id: 'luke-23-43', ref: 'Luke 23:43', text: 'σήμερον μετʼ ἐμοῦ ἔσῃ ἐν τῷ παραδείσῳ.', word: 'ἔσῃ', slot: '2s', verb: 'eimi',
    translation: 'Today you will be with me in paradise.', help: 'σήμερον = today · παράδεισος = paradise',
  },
  // 3rd singular
  {
    id: 'john-6-51', ref: 'John 6:51', text: 'ἐάν τις φάγῃ ἐκ τούτου τοῦ ἄρτου ζήσει εἰς τὸν αἰῶνα', word: 'ζήσει', slot: '3s', verb: 'zao',
    translation: 'If anyone eats of this bread, he will live forever', help: 'φάγῃ = eats · ἄρτος = bread', note: 'ζα + σ + ει: α lengthens to η.',
  },
  {
    id: 'john-14-23', ref: 'John 14:23', text: 'καὶ ὁ πατήρ μου ἀγαπήσει αὐτόν', word: 'ἀγαπήσει', slot: '3s', verb: 'agapao',
    translation: 'and my Father will love him',
  },
  {
    id: 'matt-3-12', ref: 'Matt 3:12', text: 'καὶ συνάξει τὸν σῖτον αὐτοῦ εἰς τὴν ἀποθήκην', word: 'συνάξει', slot: '3s', verb: 'synago',
    translation: 'and he will gather his wheat into the barn', help: 'σῖτος = wheat · ἀποθήκη = barn',
  },
  {
    id: 'luke-1-13', ref: 'Luke 1:13', text: 'καὶ ἡ γυνή σου Ἐλισάβετ γεννήσει υἱόν σοι', word: 'γεννήσει', slot: '3s', verb: 'gennao',
    translation: 'and your wife Elizabeth will bear you a son',
  },
  {
    id: '1cor-14-25', ref: '1 Cor 14:25', text: 'καὶ οὕτως πεσὼν ἐπὶ πρόσωπον προσκυνήσει τῷ θεῷ', word: 'προσκυνήσει', slot: '3s', verb: 'proskyneo',
    translation: 'and so, falling on his face, he will worship God', help: 'πεσών = falling', note: 'προσκυνέω often takes its object in the dative.',
  },
  {
    id: 'luke-1-32', ref: 'Luke 1:32', text: 'οὗτος ἔσται μέγας', word: 'ἔσται', slot: '3s', verb: 'eimi',
    translation: 'He will be great', note: 'ἔσται, not ἔσεται: the one irregular form of ἔσομαι.',
  },
  // 1st plural
  {
    id: 'rom-6-2', ref: 'Rom 6:2', text: 'πῶς ἔτι ζήσομεν ἐν αὐτῇ;', word: 'ζήσομεν', slot: '1p', verb: 'zao',
    translation: 'How will we still live in it?', help: 'ἔτι = still · αὐτῇ = it (sin)',
  },
  {
    id: 'matt-27-42', ref: 'Matt 27:42', text: 'καταβάτω νῦν ἀπὸ τοῦ σταυροῦ καὶ πιστεύσομεν ἐπʼ αὐτόν.', word: 'πιστεύσομεν', slot: '1p', verb: 'pisteuo',
    translation: 'Let him come down now from the cross, and we will believe in him.', help: 'καταβάτω = let him come down · σταυρός = cross',
  },
  {
    id: '1john-3-2', ref: '1 John 3:2', text: 'οἴδαμεν ὅτι ἐὰν φανερωθῇ ὅμοιοι αὐτῷ ἐσόμεθα', word: 'ἐσόμεθα', slot: '1p', verb: 'eimi',
    translation: 'We know that when he appears we will be like him', help: 'φανερωθῇ = he appears · ὅμοιος = like',
    note: 'The accent moves forward in the 1st plural: ἔσομαι, ἐσόμεθα.',
  },
  // 2nd plural
  {
    id: 'john-14-15', ref: 'John 14:15', text: 'Ἐὰν ἀγαπᾶτέ με, τὰς ἐντολὰς τὰς ἐμὰς τηρήσετε·', word: 'τηρήσετε', slot: '2p', verb: 'tereo',
    translation: 'If you love me, you will keep my commandments.', help: 'ἐντολή = commandment',
    note: 'ἀγαπᾶτε is present, τηρήσετε future: the σ makes the difference.',
  },
  {
    id: 'john-14-19', ref: 'John 14:19', text: 'ὅτι ἐγὼ ζῶ καὶ ὑμεῖς ζήσετε.', word: 'ζήσετε', slot: '2p', verb: 'zao',
    translation: 'Because I live, you also will live.', note: 'ζῶ, present; ζήσετε, future.',
  },
  {
    id: 'matt-13-14', ref: 'Matt 13:14', text: 'Ἀκοῇ ἀκούσετε καὶ οὐ μὴ συνῆτε, καὶ βλέποντες βλέψετε καὶ οὐ μὴ ἴδητε.', word: 'ἀκούσετε', slot: '2p', verb: 'akouo',
    translation: 'You will indeed hear but never understand, and you will indeed see but never perceive.', help: 'ἀκοῇ = with hearing · συνῆτε = understand · ἴδητε = perceive',
  },
  {
    id: 'matt-13-14-blepo', ref: 'Matt 13:14', text: 'Ἀκοῇ ἀκούσετε καὶ οὐ μὴ συνῆτε, καὶ βλέποντες βλέψετε καὶ οὐ μὴ ἴδητε.', word: 'βλέψετε', slot: '2p', verb: 'blepo',
    translation: 'You will indeed hear but never understand, and you will indeed see but never perceive.', help: 'βλέποντες = seeing · ἴδητε = perceive',
    note: 'βλεπ + σ → βλεψ: π + σ → ψ.',
  },
  {
    id: 'john-4-21', ref: 'John 4:21', text: 'ὅτε οὔτε ἐν τῷ ὄρει τούτῳ οὔτε ἐν Ἱεροσολύμοις προσκυνήσετε τῷ πατρί.', word: 'προσκυνήσετε', slot: '2p', verb: 'proskyneo',
    translation: 'when you will worship the Father neither on this mountain nor in Jerusalem.', help: 'οὔτε… οὔτε = neither… nor · ὄρος = mountain',
  },
  {
    id: 'matt-5-48', ref: 'Matt 5:48', text: 'Ἔσεσθε οὖν ὑμεῖς τέλειοι ὡς ὁ πατὴρ ὑμῶν ὁ οὐράνιος τέλειός ἐστιν.', word: 'Ἔσεσθε', slot: '2p', verb: 'eimi',
    translation: 'You therefore shall be perfect, as your heavenly Father is perfect.', help: 'τέλειος = perfect · οὐράνιος = heavenly',
    note: 'ἔσεσθε (future) and ἐστιν (present) in one verse.',
  },
  // 3rd plural
  {
    id: 'john-10-16', ref: 'John 10:16', text: 'καὶ τῆς φωνῆς μου ἀκούσουσιν', word: 'ἀκούσουσιν', slot: '3p', verb: 'akouo',
    translation: 'and they will listen to my voice', note: 'ἀκούω takes its object in the genitive.',
  },
  {
    id: 'john-4-23', ref: 'John 4:23', text: 'ὅτε οἱ ἀληθινοὶ προσκυνηταὶ προσκυνήσουσιν τῷ πατρὶ ἐν πνεύματι καὶ ἀληθείᾳ', word: 'προσκυνήσουσιν', slot: '3p', verb: 'proskyneo',
    translation: 'when the true worshipers will worship the Father in spirit and truth', help: 'ἀληθινός = true · προσκυνητής = worshiper',
  },
  {
    id: 'john-11-48', ref: 'John 11:48', text: 'πάντες πιστεύσουσιν εἰς αὐτόν', word: 'πιστεύσουσιν', slot: '3p', verb: 'pisteuo',
    translation: 'everyone will believe in him',
  },
  {
    id: 'john-15-21', ref: 'John 15:21', text: 'ἀλλὰ ταῦτα πάντα ποιήσουσιν εἰς ὑμᾶς διὰ τὸ ὄνομά μου', word: 'ποιήσουσιν', slot: '3p', verb: 'poieo',
    translation: 'But they will do all these things to you because of my name',
  },
  {
    id: '1cor-16-4', ref: '1 Cor 16:4', text: 'σὺν ἐμοὶ πορεύσονται.', word: 'πορεύσονται', slot: '3p', verb: 'poreuomai',
    translation: 'they will go with me.',
  },
  {
    id: 'matt-20-16', ref: 'Matt 20:16', text: 'οὕτως ἔσονται οἱ ἔσχατοι πρῶτοι καὶ οἱ πρῶτοι ἔσχατοι.', word: 'ἔσονται', slot: '3p', verb: 'eimi',
    translation: 'So the last will be first, and the first last.',
  },
]

export const chapter19: Chapter = {
  number: 19,
  title: 'Future Active/Middle Indicative',
  short: 'Future',
  topics: ['future'],
  vocab: [
    { id: 'basileus', lemma: 'βασιλεύς', lexical: 'βασιλεύς, -έως, ὁ', pos: 'noun', gloss: 'king', hook: 'Basilica (a royal hall) and the name Basil (“kingly”).', accept: ['king'] },
    { id: 'gennao', lemma: 'γεννάω', pos: 'verb', gloss: 'I beget, give birth to, produce', hook: 'Same root as genesis and genealogy.', accept: ['i beget', 'beget', 'i give birth to', 'give birth to', 'give birth', 'i produce', 'produce', 'bear', 'father'] },
    { id: 'zao', lemma: 'ζάω', pos: 'verb', gloss: 'I live', hook: 'Same root as ζωή, life, and ζῷον, living thing: zoology.', accept: ['i live', 'live'] },
    { id: 'ioudaia', lemma: 'Ἰουδαία', lexical: 'Ἰουδαία, -ας, ἡ', pos: 'noun', gloss: 'Judea', accept: ['judea', 'judaea'] },
    { id: 'ioudaios', lemma: 'Ἰουδαῖος', lexical: 'Ἰουδαῖος, -αία, -αῖον', pos: 'adjective', gloss: 'Jewish (adj); Jew (noun)', accept: ['jewish', 'jew', 'a jew', 'judean'] },
    { id: 'israel', lemma: 'Ἰσραήλ', lexical: 'Ἰσραήλ, ὁ', pos: 'noun', gloss: 'Israel', accept: ['israel'] },
    { id: 'karpos', lemma: 'καρπός', lexical: 'καρπός, -οῦ, ὁ', pos: 'noun', gloss: 'fruit, result, crop', hook: 'Carpology: the study of fruit.', accept: ['fruit', 'result', 'crop', 'harvest'] },
    { id: 'meizon', lemma: 'μείζων', lexical: 'μείζων, μεῖζον', pos: 'adjective', gloss: 'greater', hook: 'The comparative of μέγας (mega): greater. Often followed by a genitive, “than.”', accept: ['greater', 'larger', 'bigger'] },
    { id: 'holos', lemma: 'ὅλος', lexical: 'ὅλος, -η, -ον', pos: 'adjective', gloss: 'whole, complete (adj); entirely (adv)', hook: 'Holistic; holocaust (“wholly burnt”).', accept: ['whole', 'complete', 'entirely', 'all', 'entire'] },
    { id: 'proskyneo', lemma: 'προσκυνέω', pos: 'verb', gloss: 'I worship', accept: ['i worship', 'worship', 'bow down', 'i bow down'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

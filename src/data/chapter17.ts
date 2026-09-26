import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 17: Contract Verbs.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/** Mounce's three models first (ἀγαπάω, ποιέω, πληρόω), then the other contract verbs in the vocabulary. */
const VERBS: PresentVerb[] = [
  { id: 'agapao', lemma: 'ἀγαπάω', stem: 'ἀγαπ', contract: 'α', en: 'love', en3: 'loves' },
  { id: 'poieo', lemma: 'ποιέω', stem: 'ποι', contract: 'ε', en: 'do', en3: 'does' },
  { id: 'pleroo', lemma: 'πληρόω', stem: 'πληρ', contract: 'ο', en: 'fill', en3: 'fills' },
  { id: 'laleo', lemma: 'λαλέω', stem: 'λαλ', contract: 'ε', en: 'speak', en3: 'speaks' },
  { id: 'zeteo', lemma: 'ζητέω', stem: 'ζητ', contract: 'ε', en: 'seek', en3: 'seeks' },
  { id: 'kaleo', lemma: 'καλέω', stem: 'καλ', contract: 'ε', en: 'call', en3: 'calls' },
  { id: 'tereo', lemma: 'τηρέω', stem: 'τηρ', contract: 'ε', en: 'keep', en3: 'keeps' },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-8-29', ref: 'John 8:29', text: 'ὅτι ἐγὼ τὰ ἀρεστὰ αὐτῷ ποιῶ πάντοτε.', word: 'ποιῶ', slot: '1s', verb: 'poieo',
    translation: 'because I always do the things that please him', help: 'τὰ ἀρεστά = the things that please · πάντοτε = always',
  },
  {
    id: 'john-8-50', ref: 'John 8:50', text: 'ἐγὼ δὲ οὐ ζητῶ τὴν δόξαν μου·', word: 'ζητῶ', slot: '1s', verb: 'zeteo',
    translation: 'But I do not seek my own glory.',
  },
  {
    id: 'john-8-55', ref: 'John 8:55', text: 'ἀλλὰ οἶδα αὐτὸν καὶ τὸν λόγον αὐτοῦ τηρῶ.', word: 'τηρῶ', slot: '1s', verb: 'tereo',
    translation: 'But I know him, and I keep his word.', note: 'οἶδα, “I know,” is from this chapter’s vocabulary.',
  },
  {
    id: 'john-8-26', ref: 'John 8:26', text: 'ἃ ἤκουσα παρʼ αὐτοῦ ταῦτα λαλῶ εἰς τὸν κόσμον.', word: 'λαλῶ', slot: '1s', verb: 'laleo',
    translation: 'What I heard from him, these things I speak to the world.', help: 'ἤκουσα = I heard',
  },
  // 2nd singular
  {
    id: 'john-21-15', ref: 'John 21:15', text: 'Σίμων Ἰωάννου, ἀγαπᾷς με πλέον τούτων;', word: 'ἀγαπᾷς', slot: '2s', verb: 'agapao',
    translation: 'Simon, son of John, do you love me more than these?', help: 'πλέον τούτων = more than these',
    note: 'πλέον is the neuter of πλείων, “more,” from this chapter’s vocabulary.',
  },
  {
    id: 'john-13-27', ref: 'John 13:27', text: 'Ὃ ποιεῖς ποίησον τάχιον.', word: 'ποιεῖς', slot: '2s', verb: 'poieo',
    translation: 'What you are doing, do quickly.', help: 'ποίησον = do! · τάχιον = quickly',
  },
  {
    id: 'john-4-27', ref: 'John 4:27', text: 'Τί ζητεῖς; ἢ τί λαλεῖς μετʼ αὐτῆς;', word: 'ζητεῖς', slot: '2s', verb: 'zeteo',
    translation: 'What are you seeking? Or why are you speaking with her?', help: 'τί = what? why?',
  },
  {
    id: 'john-16-29', ref: 'John 16:29', text: 'Ἴδε νῦν ἐν παρρησίᾳ λαλεῖς', word: 'λαλεῖς', slot: '2s', verb: 'laleo',
    translation: 'Look, now you are speaking plainly', help: 'ἴδε = look! · ἐν παρρησίᾳ = plainly, openly',
  },
  // 3rd singular
  {
    id: 'john-3-35', ref: 'John 3:35', text: 'ὁ πατὴρ ἀγαπᾷ τὸν υἱόν', word: 'ἀγαπᾷ', slot: '3s', verb: 'agapao',
    translation: 'The Father loves the Son', note: 'α + ει → ᾳ: the ι of the ending survives as an iota subscript.',
  },
  {
    id: 'matt-22-45', ref: 'Matt 22:45', text: 'εἰ οὖν Δαυὶδ καλεῖ αὐτὸν κύριον, πῶς υἱὸς αὐτοῦ ἐστιν;', word: 'καλεῖ', slot: '3s', verb: 'kaleo',
    translation: 'If David, then, calls him Lord, how is he his son?', help: 'πῶς = how?',
  },
  {
    id: 'john-9-16', ref: 'John 9:16', text: 'ὅτι τὸ σάββατον οὐ τηρεῖ.', word: 'τηρεῖ', slot: '3s', verb: 'tereo',
    translation: 'because he does not keep the Sabbath', help: 'σάββατον = Sabbath',
  },
  {
    id: 'john-16-18', ref: 'John 16:18', text: 'οὐκ οἴδαμεν τί λαλεῖ.', word: 'λαλεῖ', slot: '3s', verb: 'laleo',
    translation: 'We do not know what he is talking about.', note: 'οἴδαμεν is “we know,” from οἶδα.',
  },
  // 1st plural
  {
    id: '1john-4-19', ref: '1 John 4:19', text: 'ἡμεῖς ἀγαπῶμεν, ὅτι αὐτὸς πρῶτος ἠγάπησεν ἡμᾶς.', word: 'ἀγαπῶμεν', slot: '1p', verb: 'agapao',
    translation: 'We love, because he first loved us.', help: 'πρῶτος = first · ἠγάπησεν = he loved',
    note: 'α + ο → ω: an α-contract has ω where ε- and ο-contracts have ου (ποιοῦμεν).',
  },
  {
    id: '1john-3-22', ref: '1 John 3:22', text: 'ὅτι τὰς ἐντολὰς αὐτοῦ τηροῦμεν', word: 'τηροῦμεν', slot: '1p', verb: 'tereo',
    translation: 'because we keep his commandments',
  },
  {
    id: '1cor-2-6', ref: '1 Cor 2:6', text: 'Σοφίαν δὲ λαλοῦμεν ἐν τοῖς τελείοις', word: 'λαλοῦμεν', slot: '1p', verb: 'laleo',
    translation: 'Yet among the mature we do speak wisdom', help: 'σοφία = wisdom · τέλειος = mature',
  },
  {
    id: 'john-3-11', ref: 'John 3:11', text: 'ὃ οἴδαμεν λαλοῦμεν', word: 'λαλοῦμεν', slot: '1p', verb: 'laleo',
    translation: 'We speak what we know', note: 'οἴδαμεν, “we know,” is from οἶδα.',
  },
  // 2nd plural
  {
    id: 'john-1-38', ref: 'John 1:38', text: 'Τί ζητεῖτε;', word: 'ζητεῖτε', slot: '2p', verb: 'zeteo',
    translation: 'What are you looking for?', note: 'Jesus’ first words in John’s Gospel.',
  },
  {
    id: 'luke-6-46', ref: 'Luke 6:46', text: 'Τί δέ με καλεῖτε· Κύριε κύριε, καὶ οὐ ποιεῖτε ἃ λέγω;', word: 'καλεῖτε', slot: '2p', verb: 'kaleo',
    translation: 'Why do you call me “Lord, Lord,” and do not do what I say?',
  },
  {
    id: 'luke-11-43', ref: 'Luke 11:43', text: 'ὅτι ἀγαπᾶτε τὴν πρωτοκαθεδρίαν ἐν ταῖς συναγωγαῖς', word: 'ἀγαπᾶτε', slot: '2p', verb: 'agapao',
    translation: 'because you love the best seat in the synagogues', help: 'πρωτοκαθεδρία = the best seat',
  },
  {
    id: 'john-8-41', ref: 'John 8:41', text: 'ὑμεῖς ποιεῖτε τὰ ἔργα τοῦ πατρὸς ὑμῶν.', word: 'ποιεῖτε', slot: '2p', verb: 'poieo',
    translation: 'You are doing the works of your father.',
  },
  // 3rd plural
  {
    id: 'luke-23-34', ref: 'Luke 23:34', text: 'Πάτερ, ἄφες αὐτοῖς, οὐ γὰρ οἴδασιν τί ποιοῦσιν.', word: 'ποιοῦσιν', slot: '3p', verb: 'poieo',
    translation: 'Father, forgive them, for they do not know what they are doing.', help: 'ἄφες = forgive!',
    note: 'οἴδασιν, “they know,” is from οἶδα.',
  },
  {
    id: 'luke-6-32', ref: 'Luke 6:32', text: 'καὶ γὰρ οἱ ἁμαρτωλοὶ τοὺς ἀγαπῶντας αὐτοὺς ἀγαπῶσιν.', word: 'ἀγαπῶσιν', slot: '3p', verb: 'agapao',
    translation: 'For even sinners love those who love them.', help: 'τοὺς ἀγαπῶντας = those who love',
  },
  {
    id: 'matt-23-3', ref: 'Matt 23:3', text: 'λέγουσιν γὰρ καὶ οὐ ποιοῦσιν.', word: 'ποιοῦσιν', slot: '3p', verb: 'poieo',
    translation: 'For they say, and do not do.', note: 'λέγουσιν and ποιοῦσιν side by side: the same ending, before and after contraction.',
  },
]

export const chapter17: Chapter = {
  number: 17,
  title: 'Contract Verbs',
  short: 'Contract verbs',
  topics: ['contract'],
  vocab: [
    { id: 'agapao', lemma: 'ἀγαπάω', pos: 'verb', gloss: 'I love, cherish', hook: 'Same root as ἀγάπη, love: an agape meal.', accept: ['i love', 'love', 'i cherish', 'cherish'] },
    { id: 'daimonion', lemma: 'δαιμόνιον', lexical: 'δαιμόνιον, -ου, τό', pos: 'noun', gloss: 'demon', hook: 'Demon, demonic.', accept: ['demon', 'evil spirit'] },
    { id: 'zeteo', lemma: 'ζητέω', pos: 'verb', gloss: 'I seek, desire, try to obtain', accept: ['i seek', 'seek', 'i desire', 'desire', 'i try to obtain', 'try to obtain', 'look for'] },
    { id: 'kaleo', lemma: 'καλέω', pos: 'verb', gloss: 'I call, name, invite', hook: 'ἐκκλησία, the church, is those “called out” (ἐκ + καλέω).', accept: ['i call', 'call', 'i name', 'name', 'i invite', 'invite'] },
    { id: 'laleo', lemma: 'λαλέω', pos: 'verb', gloss: 'I speak, say', hook: 'Glossolalia: speaking in tongues.', accept: ['i speak', 'speak', 'i say', 'say', 'talk'] },
    { id: 'oida', lemma: 'οἶδα', pos: 'verb', gloss: 'I know, understand', hook: 'Same root as “idea” and “video”: to see, and so to know.', accept: ['i know', 'know', 'i understand', 'understand'] },
    { id: 'hotan', lemma: 'ὅταν', pos: 'conjunction', gloss: 'whenever', hook: 'ὅτε (when) + ἄν (-ever): whenever.', accept: ['whenever', 'when'] },
    { id: 'pleion', lemma: 'πλείων', lexical: 'πλείων, πλεῖον', pos: 'adjective', gloss: 'larger, more', hook: 'Pleonasm: using more words than you need.', accept: ['larger', 'more', 'greater'] },
    { id: 'pleroo', lemma: 'πληρόω', pos: 'verb', gloss: 'I fill, complete, fulfill', hook: 'Plenary and plethora come from the same root: full.', accept: ['i fill', 'fill', 'i complete', 'complete', 'i fulfill', 'fulfill', 'fulfil'] },
    { id: 'poieo', lemma: 'ποιέω', pos: 'verb', gloss: 'I do, make', hook: 'Poem, poet: something made, one who makes.', accept: ['i do', 'do', 'i make', 'make'] },
    { id: 'tereo', lemma: 'τηρέω', pos: 'verb', gloss: 'I keep, guard, observe', accept: ['i keep', 'keep', 'i guard', 'guard', 'i observe', 'observe'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 18: Present Middle/Passive Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/**
 * λύω first: λύομαι is Mounce's model. Then the middle-only verbs of the vocabulary, συνάγω, and three contract verbs
 * from chapter 17 in the passive. Every form is built from the stem: λύ + ομαι, ῃ, εται, ομεθα, εσθε, ονται.
 */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', stem: 'λύ', voice: 'passive', pp: 'loosed', en: 'loose', en3: 'looses' },
  { id: 'erchomai', lemma: 'ἔρχομαι', stem: 'ἔρχ', voice: 'middle', en: 'come', en3: 'comes' },
  { id: 'poreuomai', lemma: 'πορεύομαι', stem: 'πορεύ', voice: 'middle', en: 'go', en3: 'goes' },
  { id: 'apokrinomai', lemma: 'ἀποκρίνομαι', stem: 'ἀποκρίν', voice: 'middle', en: 'answer', en3: 'answers' },
  { id: 'dynamai', lemma: 'δύναμαι', stem: 'δύνα', voice: 'middle', athematic: true, en: 'can', en3: 'can' },
  { id: 'synago', lemma: 'συνάγω', stem: 'συνάγ', voice: 'passive', pp: 'gathered together', en: 'gather together', en3: 'gathers together' },
  { id: 'agapao', lemma: 'ἀγαπάω', stem: 'ἀγαπ', contract: 'α', voice: 'passive', pp: 'loved', en: 'love', en3: 'loves' },
  { id: 'kaleo', lemma: 'καλέω', stem: 'καλ', contract: 'ε', voice: 'passive', pp: 'called', en: 'call', en3: 'calls' },
  { id: 'pleroo', lemma: 'πληρόω', stem: 'πληρ', contract: 'ο', voice: 'passive', pp: 'filled', en: 'fill', en3: 'fills' },
]

const VERSES: PresentVerse[] = [
  // 1st singular
  {
    id: 'john-14-2', ref: 'John 14:2', text: 'πορεύομαι ἑτοιμάσαι τόπον ὑμῖν', word: 'πορεύομαι', slot: '1s', verb: 'poreuomai',
    translation: 'I am going to prepare a place for you', help: 'ἑτοιμάσαι = to prepare', note: 'τόπος, “place,” is from this chapter’s vocabulary.',
  },
  {
    id: 'john-14-28', ref: 'John 14:28', text: 'Ὑπάγω καὶ ἔρχομαι πρὸς ὑμᾶς.', word: 'ἔρχομαι', slot: '1s', verb: 'erchomai',
    translation: 'I am going away, and I am coming to you.', help: 'ὑπάγω = I go away',
    note: 'ὑπάγω and ἔρχομαι side by side: -ω and -ομαι both mean “I.”',
  },
  {
    id: 'john-5-30', ref: 'John 5:30', text: 'Οὐ δύναμαι ἐγὼ ποιεῖν ἀπʼ ἐμαυτοῦ οὐδέν·', word: 'δύναμαι', slot: '1s', verb: 'dynamai',
    translation: 'I can do nothing on my own.', help: 'ποιεῖν = to do · ἐμαυτοῦ = myself · οὐδέν = nothing',
    note: 'δύναμαι is usually followed by an infinitive (“to do”), like English “I can do.”',
  },
  {
    id: 'rev-22-20', ref: 'Rev 22:20', text: 'Ναί· ἔρχομαι ταχύ.', word: 'ἔρχομαι', slot: '1s', verb: 'erchomai',
    translation: 'Yes, I am coming soon.', help: 'ναί = yes · ταχύ = soon',
  },
  // 2nd singular
  {
    id: 'luke-6-42', ref: 'Luke 6:42', text: 'πῶς δύνασαι λέγειν τῷ ἀδελφῷ σου·', word: 'δύνασαι', slot: '2s', verb: 'dynamai',
    translation: 'How can you say to your brother…', help: 'πῶς = how? · λέγειν = to say · ἀδελφός = brother',
    note: 'δύναμαι keeps the σ of σαι; in λύῃ it has dropped out.',
  },
  {
    id: 'matt-3-14', ref: 'Matt 3:14', text: 'καὶ σὺ ἔρχῃ πρός με;', word: 'ἔρχῃ', slot: '2s', verb: 'erchomai',
    translation: 'and do you come to me?', note: 'Not ἔρχει: the 2nd singular middle/passive ends in ῃ, with an iota subscript.',
  },
  {
    id: 'mark-14-60', ref: 'Mark 14:60', text: 'Οὐκ ἀποκρίνῃ οὐδέν;', word: 'ἀποκρίνῃ', slot: '2s', verb: 'apokrinomai',
    translation: 'Do you answer nothing?', help: 'οὐδέν = nothing',
  },
  // 3rd singular
  {
    id: 'john-3-8', ref: 'John 3:8', text: 'ἀλλʼ οὐκ οἶδας πόθεν ἔρχεται καὶ ποῦ ὑπάγει·', word: 'ἔρχεται', slot: '3s', verb: 'erchomai',
    translation: 'but you do not know where it comes from or where it goes', help: 'πόθεν = from where · ποῦ = where · ὑπάγει = it goes',
    note: 'ἔρχεται and ὑπάγει: -εται and -ει both mean “he/she/it.”',
  },
  {
    id: 'john-4-23', ref: 'John 4:23', text: 'ἀλλὰ ἔρχεται ὥρα καὶ νῦν ἐστιν', word: 'ἔρχεται', slot: '3s', verb: 'erchomai',
    translation: 'But an hour is coming, and is now here', note: 'The subject, ὥρα, comes after the verb.',
  },
  {
    id: 'john-9-4', ref: 'John 9:4', text: 'ἔρχεται νὺξ ὅτε οὐδεὶς δύναται ἐργάζεσθαι.', word: 'ἔρχεται', slot: '3s', verb: 'erchomai',
    translation: 'Night is coming, when no one can work.', help: 'ὅτε = when · οὐδείς = no one · ἐργάζεσθαι = to work',
    note: 'νύξ, “night,” is from this chapter’s vocabulary, and δύναται is another 3rd singular middle/passive.',
  },
  {
    id: 'john-3-3', ref: 'John 3:3', text: 'οὐ δύναται ἰδεῖν τὴν βασιλείαν τοῦ θεοῦ.', word: 'δύναται', slot: '3s', verb: 'dynamai',
    translation: 'he cannot see the kingdom of God.', help: 'ἰδεῖν = to see',
  },
  {
    id: 'luke-2-4', ref: 'Luke 2:4', text: 'εἰς πόλιν Δαυὶδ ἥτις καλεῖται Βηθλέεμ', word: 'καλεῖται', slot: '3s', verb: 'kaleo',
    translation: 'to the city of David, which is called Bethlehem', note: 'ἥτις is the feminine of ὅστις, from this chapter’s vocabulary.',
  },
  {
    id: 'acts-28-1', ref: 'Acts 28:1', text: 'ὅτι Μελίτη ἡ νῆσος καλεῖται.', word: 'καλεῖται', slot: '3s', verb: 'kaleo',
    translation: 'that the island was called Malta.', help: 'νῆσος = island',
    note: 'Greek keeps the tense of what was said (“is called”); English shifts it to “was called.”',
  },
  {
    id: 'john-12-23', ref: 'John 12:23', text: 'ὁ δὲ Ἰησοῦς ἀποκρίνεται αὐτοῖς λέγων·', word: 'ἀποκρίνεται', slot: '3s', verb: 'apokrinomai',
    translation: 'And Jesus answered them, saying', help: 'λέγων = saying',
    note: 'A historical present: a past event told in the present for vividness. Translate it as a past tense.',
  },
  {
    id: 'matt-12-45', ref: 'Matt 12:45', text: 'τότε πορεύεται καὶ παραλαμβάνει μεθʼ ἑαυτοῦ ἑπτὰ ἕτερα πνεύματα', word: 'πορεύεται', slot: '3s', verb: 'poreuomai',
    translation: 'Then it goes and takes along with it seven other spirits', help: 'παραλαμβάνει = it takes along · ἑαυτοῦ = itself · ἑπτά = seven',
  },
  {
    id: 'mark-4-1', ref: 'Mark 4:1', text: 'καὶ συνάγεται πρὸς αὐτὸν ὄχλος πλεῖστος', word: 'συνάγεται', slot: '3s', verb: 'synago',
    translation: 'and a very large crowd gathered around him', help: 'πλεῖστος = very large',
    note: 'Middle/passive: “is gathered,” or simply “gathers.” Context decides.',
  },
  // 1st plural
  {
    id: 'acts-4-20', ref: 'Acts 4:20', text: 'οὐ δυνάμεθα γὰρ ἡμεῖς ἃ εἴδαμεν καὶ ἠκούσαμεν μὴ λαλεῖν.', word: 'δυνάμεθα', slot: '1p', verb: 'dynamai',
    translation: 'For we cannot stop speaking about what we have seen and heard.', help: 'εἴδαμεν = we saw · ἠκούσαμεν = we heard · μὴ λαλεῖν = not to speak',
    note: 'The accent moves forward in the 1st plural: δύναμαι but δυνάμεθα.',
  },
  {
    id: 'john-21-3', ref: 'John 21:3', text: 'Ἐρχόμεθα καὶ ἡμεῖς σὺν σοί.', word: 'Ἐρχόμεθα', slot: '1p', verb: 'erchomai',
    translation: 'We are coming with you too.', note: 'The accent moves forward in the 1st plural: ἔρχομαι but ἐρχόμεθα.',
  },
  // 2nd plural
  {
    id: 'john-5-44', ref: 'John 5:44', text: 'πῶς δύνασθε ὑμεῖς πιστεῦσαι', word: 'δύνασθε', slot: '2p', verb: 'dynamai',
    translation: 'How can you believe', help: 'πιστεῦσαι = to believe',
  },
  {
    id: 'john-8-43', ref: 'John 8:43', text: 'ὅτι οὐ δύνασθε ἀκούειν τὸν λόγον τὸν ἐμόν.', word: 'δύνασθε', slot: '2p', verb: 'dynamai',
    translation: 'Because you cannot hear my word.', help: 'ἀκούειν = to hear · ἐμός = my',
  },
  {
    id: 'john-7-34', ref: 'John 7:34', text: 'καὶ ὅπου εἰμὶ ἐγὼ ὑμεῖς οὐ δύνασθε ἐλθεῖν.', word: 'δύνασθε', slot: '2p', verb: 'dynamai',
    translation: 'and where I am, you cannot come.', help: 'ἐλθεῖν = to come',
  },
  // 3rd plural
  {
    id: 'rom-8-8', ref: 'Rom 8:8', text: 'οἱ δὲ ἐν σαρκὶ ὄντες θεῷ ἀρέσαι οὐ δύνανται.', word: 'δύνανται', slot: '3p', verb: 'dynamai',
    translation: 'Those who are in the flesh cannot please God.', help: 'ὄντες = being · ἀρέσαι = to please',
  },
  {
    id: 'matt-7-15', ref: 'Matt 7:15', text: 'οἵτινες ἔρχονται πρὸς ὑμᾶς ἐν ἐνδύμασι προβάτων', word: 'ἔρχονται', slot: '3p', verb: 'erchomai',
    translation: 'who come to you in sheep’s clothing', help: 'ἔνδυμα = clothing · πρόβατον = sheep',
    note: 'οἵτινες is the plural of ὅστις, from this chapter’s vocabulary.',
  },
  {
    id: 'mark-2-18', ref: 'Mark 2:18', text: 'καὶ ἔρχονται καὶ λέγουσιν αὐτῷ·', word: 'ἔρχονται', slot: '3p', verb: 'erchomai',
    translation: 'And they came and said to him', note: 'ἔρχονται and λέγουσιν: middle and active 3rd plural side by side (both historical presents).',
  },
  {
    id: 'luke-22-25', ref: 'Luke 22:25', text: 'καὶ οἱ ἐξουσιάζοντες αὐτῶν εὐεργέται καλοῦνται.', word: 'καλοῦνται', slot: '3p', verb: 'kaleo',
    translation: 'and those in authority over them are called benefactors.', help: 'οἱ ἐξουσιάζοντες = those in authority · εὐεργέτης = benefactor',
  },
  {
    id: 'mark-6-30', ref: 'Mark 6:30', text: 'Καὶ συνάγονται οἱ ἀπόστολοι πρὸς τὸν Ἰησοῦν', word: 'συνάγονται', slot: '3p', verb: 'synago',
    translation: 'The apostles gathered around Jesus', note: 'A historical present, and middle in sense: they “gather,” not “are gathered.”',
  },
]

export const chapter18: Chapter = {
  number: 18,
  title: 'Present Middle/Passive Indicative',
  short: 'Middle/passive',
  topics: ['middle'],
  vocab: [
    { id: 'apokrinomai', lemma: 'ἀποκρίνομαι', pos: 'verb', gloss: 'I answer', hook: 'Built on κρίνω, “I judge” (critic): to give a judgment back.', accept: ['i answer', 'answer', 'i reply', 'reply', 'respond'] },
    { id: 'dei', lemma: 'δεῖ', pos: 'verb', gloss: 'it is necessary', accept: ['it is necessary', 'necessary', 'must', 'one must', 'it must', 'it is needful'] },
    { id: 'dynamai', lemma: 'δύναμαι', pos: 'verb', gloss: 'I am powerful, am able', hook: 'Dynamo, dynamite, dynamic: power.', accept: ['i am able', 'am able', 'able', 'i can', 'can', 'i am powerful', 'am powerful', 'powerful'] },
    { id: 'erchomai', lemma: 'ἔρχομαι', pos: 'verb', gloss: 'I come, go', accept: ['i come', 'come', 'i go', 'go'] },
    { id: 'poreuomai', lemma: 'πορεύομαι', pos: 'verb', gloss: 'I go, proceed, live', hook: 'Same family as πόρος, a passage, which gives English “pore.”', accept: ['i go', 'go', 'i proceed', 'proceed', 'i live', 'live', 'travel', 'journey'] },
    { id: 'nyx', lemma: 'νύξ', lexical: 'νύξ, νυκτός, ἡ', pos: 'noun', gloss: 'night', hook: 'Nyctophobia: fear of the dark. Nocturnal only looks related: it comes from Latin.', accept: ['night'] },
    { id: 'hostis', lemma: 'ὅστις', lexical: 'ὅστις, ἥτις, ὅτι', pos: 'pronoun', gloss: 'whoever, whichever, whatever', hook: 'ὅς (who) + τις (anyone): whoever.', accept: ['whoever', 'whichever', 'whatever', 'who', 'which', 'anyone who', 'everyone who'] },
    { id: 'synago', lemma: 'συνάγω', pos: 'verb', gloss: 'I gather together, invite', hook: 'Synagogue: a gathering.', accept: ['i gather together', 'gather together', 'i gather', 'gather', 'i invite', 'invite'] },
    { id: 'topos', lemma: 'τόπος', lexical: 'τόπος, -ου, ὁ', pos: 'noun', gloss: 'place, location', hook: 'Topography, topic, utopia (“no place”).', accept: ['place', 'location', 'region', 'spot'] },
    { id: 'hos', lemma: 'ὡς', pos: 'conjunction', gloss: 'as, like, when, that, how, about', accept: ['as', 'like', 'when', 'that', 'how', 'about', 'approximately'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

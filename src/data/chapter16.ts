import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 16: Present Active Indicative.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations are written for this app.

/** λύω first: it is Mounce's model verb. Every present form is stem + ω, εις, ει, ομεν, ετε, ουσι(ν). */
const VERBS: PresentVerb[] = [
  { id: 'lyo', lemma: 'λύω', stem: 'λύ', en: 'loose', en3: 'looses' },
  { id: 'akouo', lemma: 'ἀκούω', stem: 'ἀκού', en: 'hear', en3: 'hears' },
  { id: 'blepo', lemma: 'βλέπω', stem: 'βλέπ', en: 'see', en3: 'sees' },
  { id: 'echo', lemma: 'ἔχω', stem: 'ἔχ', en: 'have', en3: 'has' },
  { id: 'lego', lemma: 'λέγω', stem: 'λέγ', en: 'say', en3: 'says' },
  { id: 'pisteuo', lemma: 'πιστεύω', stem: 'πιστεύ', en: 'believe', en3: 'believes' },
]

const VERSES: PresentVerse[] = [
  {
    id: 'mark-9-24', ref: 'Mark 9:24', text: 'Πιστεύω· βοήθει μου τῇ ἀπιστίᾳ.', word: 'Πιστεύω', slot: '1s', verb: 'pisteuo',
    translation: 'I believe; help my unbelief!', help: 'βοήθει = help! · ἀπιστία = unbelief',
  },
  {
    id: 'john-9-25', ref: 'John 9:25', text: 'ἓν οἶδα ὅτι τυφλὸς ὢν ἄρτι βλέπω.', word: 'βλέπω', slot: '1s', verb: 'blepo',
    translation: 'One thing I know: that though I was blind, now I see.', help: 'οἶδα = I know · ὤν = being · ἄρτι = now',
  },
  {
    id: 'rom-7-23', ref: 'Rom 7:23', text: 'βλέπω δὲ ἕτερον νόμον ἐν τοῖς μέλεσίν μου', word: 'βλέπω', slot: '1s', verb: 'blepo',
    translation: 'But I see another law in my members', help: 'ἕτερος = another · μέλος = member, part of the body',
  },
  {
    id: 'john-3-3', ref: 'John 3:3', text: 'Ἀμὴν ἀμὴν λέγω σοι', word: 'λέγω', slot: '1s', verb: 'lego',
    translation: 'Truly, truly, I say to you', note: 'No ἐγώ is needed: the ending -ω already means “I.”',
  },
  {
    id: 'john-14-10', ref: 'John 14:10', text: 'οὐ πιστεύεις ὅτι ἐγὼ ἐν τῷ πατρὶ καὶ ὁ πατὴρ ἐν ἐμοί ἐστιν;', word: 'πιστεύεις', slot: '2s', verb: 'pisteuo',
    translation: 'Do you not believe that I am in the Father and the Father is in me?',
  },
  {
    id: 'john-11-42', ref: 'John 11:42', text: 'πάντοτέ μου ἀκούεις', word: 'ἀκούεις', slot: '2s', verb: 'akouo',
    translation: 'you always hear me', help: 'πάντοτε = always',
    note: 'ἀκούω often takes its object in the genitive: μου, “me.”',
  },
  {
    id: 'john-3-36', ref: 'John 3:36', text: 'ὁ πιστεύων εἰς τὸν υἱὸν ἔχει ζωὴν αἰώνιον·', word: 'ἔχει', slot: '3s', verb: 'echo',
    translation: 'The one who believes in the Son has eternal life.', help: 'ὁ πιστεύων = the one who believes',
  },
  {
    id: 'john-4-7', ref: 'John 4:7', text: 'λέγει αὐτῇ ὁ Ἰησοῦς· Δός μοι πεῖν·', word: 'λέγει', slot: '3s', verb: 'lego',
    translation: 'Jesus says to her, ‘Give me a drink.’', help: 'δός μοι πεῖν = give me (something) to drink',
    note: 'Greek often tells a past story in the present tense; English would usually say “said.”',
  },
  {
    id: '1cor-13-12', ref: '1 Cor 13:12', text: 'βλέπομεν γὰρ ἄρτι διʼ ἐσόπτρου ἐν αἰνίγματι', word: 'βλέπομεν', slot: '1p', verb: 'blepo',
    translation: 'For now we see in a mirror, dimly', help: 'ἄρτι = now · ἔσοπτρον = mirror · αἴνιγμα = riddle',
  },
  {
    id: 'heb-4-15', ref: 'Heb 4:15', text: 'οὐ γὰρ ἔχομεν ἀρχιερέα μὴ δυνάμενον συμπαθῆσαι ταῖς ἀσθενείαις ἡμῶν', word: 'ἔχομεν', slot: '1p', verb: 'echo',
    translation: 'For we do not have a high priest who is unable to sympathize with our weaknesses',
    help: 'ἀρχιερεύς = high priest · μὴ δυνάμενον συμπαθῆσαι = unable to sympathize · ἀσθένεια = weakness',
  },
  {
    id: '1john-1-8', ref: '1 John 1:8', text: 'ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν', word: 'ἔχομεν', slot: '1p', verb: 'echo',
    translation: 'If we say that we have no sin', help: 'ἐὰν εἴπωμεν = if we say',
  },
  {
    id: 'luke-19-33', ref: 'Luke 19:33', text: 'Τί λύετε τὸν πῶλον;', word: 'λύετε', slot: '2p', verb: 'lyo',
    translation: 'Why are you untying the colt?', help: 'τί = why? · πῶλος = colt',
    note: 'The present is often best translated “you are …ing”: the action is in progress.',
  },
  {
    id: 'mark-8-18', ref: 'Mark 8:18', text: 'ὀφθαλμοὺς ἔχοντες οὐ βλέπετε καὶ ὦτα ἔχοντες οὐκ ἀκούετε;', word: 'ἀκούετε', slot: '2p', verb: 'akouo',
    translation: 'Having eyes, do you not see? And having ears, do you not hear?', help: 'ὀφθαλμός = eye · οὖς, ὠτός = ear · ἔχοντες = having',
  },
  {
    id: 'matt-16-15', ref: 'Matt 16:15', text: 'Ὑμεῖς δὲ τίνα με λέγετε εἶναι;', word: 'λέγετε', slot: '2p', verb: 'lego',
    translation: 'But who do you say that I am?', help: 'τίνα = whom? · εἶναι = to be',
    note: 'The ending already means “you (plural)”; ὑμεῖς adds emphasis: “But you, who do you say I am?”',
  },
  {
    id: 'john-8-45', ref: 'John 8:45', text: 'ἐγὼ δὲ ὅτι τὴν ἀλήθειαν λέγω, οὐ πιστεύετέ μοι.', word: 'πιστεύετέ', slot: '2p', verb: 'pisteuo',
    translation: 'But because I tell the truth, you do not believe me.',
    note: 'The second accent on πιστεύετέ comes from the enclitic μοι. πιστεύω takes a dative object: μοι, “me.”',
  },
  {
    id: 'john-16-22', ref: 'John 16:22', text: 'καὶ ὑμεῖς οὖν νῦν μὲν λύπην ἔχετε·', word: 'ἔχετε', slot: '2p', verb: 'echo',
    translation: 'So you also have sorrow now', help: 'λύπη = sorrow · νῦν = now',
  },
  {
    id: 'matt-13-13', ref: 'Matt 13:13', text: 'βλέποντες οὐ βλέπουσιν καὶ ἀκούοντες οὐκ ἀκούουσιν', word: 'βλέπουσιν', slot: '3p', verb: 'blepo',
    translation: 'seeing, they do not see, and hearing, they do not hear', help: 'βλέποντες = seeing · ἀκούοντες = hearing',
    note: 'The movable ν: βλέπουσι(ν) adds ν here because the next word begins with a vowel.',
  },
  {
    id: 'john-10-27', ref: 'John 10:27', text: 'τὰ πρόβατα τὰ ἐμὰ τῆς φωνῆς μου ἀκούουσιν', word: 'ἀκούουσιν', slot: '3p', verb: 'akouo',
    translation: 'My sheep hear my voice', help: 'πρόβατον = sheep · ἐμός = my',
    note: 'The object of ἀκούω is in the genitive here: τῆς φωνῆς, “my voice.”',
  },
]

export const chapter16: Chapter = {
  number: 16,
  title: 'Present Active Indicative',
  short: 'Present active',
  topics: ['present'],
  vocab: [
    { id: 'akouo', lemma: 'ἀκούω', pos: 'verb', gloss: 'I hear, learn, obey, understand', hook: 'Acoustic: to do with hearing.', accept: ['i hear', 'hear', 'i learn', 'learn', 'i obey', 'obey', 'i understand', 'understand'] },
    { id: 'blepo', lemma: 'βλέπω', pos: 'verb', gloss: 'I see, look at', accept: ['i see', 'see', 'i look at', 'look at', 'look'] },
    { id: 'echo', lemma: 'ἔχω', pos: 'verb', gloss: 'I have, hold', hook: 'Hectic: from ἑκτικός, “habitual,” which is built on ἔχω.', accept: ['i have', 'have', 'i hold', 'hold'] },
    { id: 'chara', lemma: 'χαρά', lexical: 'χαρά, -ᾶς, ἡ', pos: 'noun', gloss: 'joy, delight', hook: 'Same root as χάρις, grace: charismatic.', accept: ['joy', 'delight', 'gladness'] },
    { id: 'lego', lemma: 'λέγω', pos: 'verb', gloss: 'I say, speak', hook: 'Same family as λόγος: prologue, dialogue, lexicon.', accept: ['i say', 'say', 'i speak', 'speak'] },
    { id: 'lyo', lemma: 'λύω', pos: 'verb', gloss: 'I loose, untie, release, destroy', hook: 'Analysis (loosening up), paralysis, dialysis.', accept: ['i loose', 'loose', 'i untie', 'untie', 'i release', 'release', 'i destroy', 'destroy'] },
    { id: 'nomos', lemma: 'νόμος', lexical: 'νόμος, -ου, ὁ', pos: 'noun', gloss: 'law, principle', hook: 'Deuteronomy (the second law), autonomy, astronomy.', accept: ['law', 'principle'] },
    { id: 'hopou', lemma: 'ὅπου', pos: 'adverb', gloss: 'where', accept: ['where', 'wherever'] },
    { id: 'pisteuo', lemma: 'πιστεύω', pos: 'verb', gloss: 'I believe, have faith (in), trust', hook: 'Same root as πίστις, faith.', accept: ['i believe', 'believe', 'i have faith', 'have faith', 'i trust', 'trust'] },
    { id: 'prosopon', lemma: 'πρόσωπον', lexical: 'πρόσωπον, -ου, τό', pos: 'noun', gloss: 'face, appearance', hook: 'Prosopagnosia: being unable to recognise faces.', accept: ['face', 'appearance', 'presence'] },
    { id: 'tote', lemma: 'τότε', pos: 'adverb', gloss: 'then, thereafter', accept: ['then', 'thereafter'] },
    { id: 'typhlos', lemma: 'τυφλός', lexical: 'τυφλός, -ή, -όν', pos: 'adjective', gloss: 'blind', accept: ['blind'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

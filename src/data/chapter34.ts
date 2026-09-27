import type { Chapter, PresentVerb, PresentVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 34: Indicative of δίδωμι.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * δίδωμι in every tense of the indicative. The present and imperfect actives are listed; the rest come from the stem:
 * the present middle/passive has no connecting vowel (δίδο + μαι, like δύναμαι), the future and perfect lengthen the
 * root *δο to δω, and the aorist takes κα instead of σα (ἔδωκα).
 */
const VERBS: PresentVerb[] = [
  {
    id: 'didomi', lemma: 'δίδωμι', stem: 'δίδω', en: 'give', en3: 'gives',
    irregular: { '1s': 'δίδωμι', '2s': 'δίδως', '3s': 'δίδωσι(ν)', '1p': 'δίδομεν', '2p': 'δίδοτε', '3p': 'διδόασι(ν)' },
    change: 'A μι verb: reduplicated δι-, a long ω in the singular and short ο in the plural, and no connecting vowel.',
  },
  { id: 'didomi-mp', lemma: 'δίδωμι', stem: 'δίδο', athematic: true, voice: 'passive', pp: 'given', en: 'give', en3: 'gives' },
  {
    id: 'didomi-impf', lemma: 'δίδωμι', tense: 'imperfect', stem: 'ἐδιδο', ing: 'giving', en: 'give', en3: 'gives',
    irregular: { '1s': 'ἐδίδουν', '2s': 'ἐδίδους', '3s': 'ἐδίδου', '1p': 'ἐδίδομεν', '2p': 'ἐδίδοτε', '3p': 'ἐδίδοσαν' },
    change: 'The augment and reduplication; ο + ν → ουν, ο + ς → ους, ο + ε → ου in the singular.',
  },
  { id: 'didomi-fut', lemma: 'δίδωμι', tense: 'future', stem: 'δώσ', en: 'give', en3: 'gives', change: 'The root *δο lengthens to δω before the σ.' },
  {
    id: 'didomi-futp', lemma: 'δίδωμι', tense: 'future', voice: 'passive', passiveForm: true, stem: 'δοθήσ', pp: 'given', en: 'give', en3: 'gives',
    change: 'The future passive: θησ on the root *δο.',
  },
  {
    id: 'didomi-aor', lemma: 'δίδωμι', tense: 'aorist', firstAorist: true, stem: 'ἐδωκ', past: 'gave', en: 'give', en3: 'gives',
    change: 'The aorist takes κα, not σα: ἔδωκα.',
  },
  { id: 'didomi-aorp', lemma: 'δίδωμι', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'ἐδοθη', pp: 'given', en: 'give', en3: 'gives' },
  { id: 'didomi-perf', lemma: 'δίδωμι', tense: 'perfect', stem: 'δεδωκ', pp: 'given', en: 'give', en3: 'gives' },
  {
    id: 'paradidomi', lemma: 'παραδίδωμι', stem: 'παραδίδω', en: 'hand over', en3: 'hands over',
    irregular: { '1s': 'παραδίδωμι', '2s': 'παραδίδως', '3s': 'παραδίδωσι(ν)', '1p': 'παραδίδομεν', '2p': 'παραδίδοτε', '3p': 'παραδιδόασι(ν)' },
  },
  { id: 'paradidomi-mp', lemma: 'παραδίδωμι', stem: 'παραδίδο', athematic: true, voice: 'passive', pp: 'handed over', en: 'hand over', en3: 'hands over' },
  { id: 'paradidomi-fut', lemma: 'παραδίδωμι', tense: 'future', stem: 'παραδώσ', en: 'hand over', en3: 'hands over' },
  { id: 'paradidomi-aor', lemma: 'παραδίδωμι', tense: 'aorist', firstAorist: true, stem: 'παρεδωκ', prefix: 'παρ', past: 'handed over', en: 'hand over', en3: 'hands over' },
  { id: 'paradidomi-aorp', lemma: 'παραδίδωμι', tense: 'aorist', passiveForm: true, voice: 'passive', stem: 'παρεδοθη', prefix: 'παρ', pp: 'handed over', en: 'hand over', en3: 'hands over' },
  { id: 'pipto', lemma: 'πίπτω', stem: 'πίπτ', en: 'fall', en3: 'falls' },
  { id: 'pipto-aor', lemma: 'πίπτω', tense: 'aorist', stem: 'ἐπεσ', past: 'fell', en: 'fall', en3: 'falls', change: 'A second aorist from the root *πετ: ἔπεσον.' },
  { id: 'hyparcho', lemma: 'ὑπάρχω', stem: 'ὑπάρχ', en: 'am, exist', en3: 'is' },
]

const VERSES: PresentVerse[] = [
  // Present.
  { id: 'john-10-28', ref: 'John 10:28', text: 'κἀγὼ δίδωμι αὐτοῖς ζωὴν αἰώνιον', word: 'δίδωμι', slot: '1s', verb: 'didomi', translation: 'and I give them eternal life' },
  {
    id: 'john-3-34', ref: 'John 3:34', text: 'οὐ γὰρ ἐκ μέτρου δίδωσιν τὸ πνεῦμα.', word: 'δίδωσιν', slot: '3s', verb: 'didomi',
    translation: 'for he gives the Spirit without measure.', help: 'μέτρον = measure',
  },
  {
    id: 'luke-22-48', ref: 'Luke 22:48', text: 'Ἰούδα, φιλήματι τὸν υἱὸν τοῦ ἀνθρώπου παραδίδως;', word: 'παραδίδως', slot: '2s', verb: 'paradidomi',
    translation: 'Judas, would you betray the Son of Man with a kiss?', help: 'φίλημα = kiss',
  },
  {
    id: 'matt-26-2', ref: 'Matt 26:2', text: 'καὶ ὁ υἱὸς τοῦ ἀνθρώπου παραδίδοται εἰς τὸ σταυρωθῆναι.', word: 'παραδίδοται', slot: '3s', verb: 'paradidomi-mp',
    translation: 'and the Son of Man will be handed over to be crucified.', help: 'σταυρωθῆναι = to be crucified',
    note: 'A present with a future sense: it is as good as done.',
  },
  {
    id: '1cor-12-7', ref: '1 Cor 12:7', text: 'ἑκάστῳ δὲ δίδοται ἡ φανέρωσις τοῦ πνεύματος πρὸς τὸ συμφέρον.', word: 'δίδοται', slot: '3s', verb: 'didomi-mp',
    translation: 'To each is given the manifestation of the Spirit for the common good.', help: 'φανέρωσις = manifestation · τὸ συμφέρον = the common good',
  },
  { id: '1cor-13-8', ref: '1 Cor 13:8', text: 'Ἡ ἀγάπη οὐδέποτε πίπτει.', word: 'πίπτει', slot: '3s', verb: 'pipto', translation: 'Love never fails.', help: 'οὐδέποτε = never' },
  {
    id: 'phil-3-20', ref: 'Phil 3:20', text: 'ἡμῶν γὰρ τὸ πολίτευμα ἐν οὐρανοῖς ὑπάρχει', word: 'ὑπάρχει', slot: '3s', verb: 'hyparcho',
    translation: 'But our citizenship is in heaven', help: 'πολίτευμα = citizenship',
  },
  // Imperfect.
  {
    id: 'matt-13-8', ref: 'Matt 13:8', text: 'ἄλλα δὲ ἔπεσεν ἐπὶ τὴν γῆν τὴν καλὴν καὶ ἐδίδου καρπόν', word: 'ἐδίδου', slot: '3s', verb: 'didomi-impf',
    translation: 'Other seeds fell on good soil and produced grain', help: 'καρπός = fruit, grain', note: 'The imperfect: it kept yielding.',
  },
  {
    id: 'luke-15-16', ref: 'Luke 15:16', text: 'καὶ οὐδεὶς ἐδίδου αὐτῷ.', word: 'ἐδίδου', slot: '3s', verb: 'didomi-impf',
    translation: 'and no one was giving him anything.',
  },
  // Future.
  { id: 'matt-4-9', ref: 'Matt 4:9', text: 'Ταῦτά σοι πάντα δώσω, ἐὰν πεσὼν προσκυνήσῃς μοι.', word: 'δώσω', slot: '1s', verb: 'didomi-fut', translation: 'All these things I will give you, if you will fall down and worship me.', help: 'πεσών = falling down' },
  { id: 'mark-12-9', ref: 'Mark 12:9', text: 'καὶ δώσει τὸν ἀμπελῶνα ἄλλοις.', word: 'δώσει', slot: '3s', verb: 'didomi-fut', translation: 'and he will give the vineyard to others.', help: 'ἀμπελών = vineyard' },
  { id: 'acts-2-27', ref: 'Acts 2:27', text: 'οὐδὲ δώσεις τὸν ὅσιόν σου ἰδεῖν διαφθοράν.', word: 'δώσεις', slot: '2s', verb: 'didomi-fut', translation: 'nor will you let your Holy One see decay.', help: 'ὅσιος = holy · διαφθορά = decay', note: 'δίδωμι can mean “allow, let.”' },
  { id: 'matt-26-21', ref: 'Matt 26:21', text: 'Ἀμὴν λέγω ὑμῖν ὅτι εἷς ἐξ ὑμῶν παραδώσει με.', word: 'παραδώσει', slot: '3s', verb: 'paradidomi-fut', translation: 'Truly I tell you, one of you will betray me.' },
  { id: 'matt-7-7', ref: 'Matt 7:7', text: 'Αἰτεῖτε, καὶ δοθήσεται ὑμῖν·', word: 'δοθήσεται', slot: '3s', verb: 'didomi-futp', translation: 'Ask, and it will be given to you.', help: 'αἰτεῖτε = ask!' },
  // Aorist: κα, not σα.
  { id: 'john-13-15', ref: 'John 13:15', text: 'ὑπόδειγμα γὰρ ἔδωκα ὑμῖν', word: 'ἔδωκα', slot: '1s', verb: 'didomi-aor', translation: 'For I have given you an example', help: 'ὑπόδειγμα = example' },
  { id: 'luke-7-45', ref: 'Luke 7:45', text: 'φίλημά μοι οὐκ ἔδωκας·', word: 'ἔδωκας', slot: '2s', verb: 'didomi-aor', translation: 'You did not give me a kiss.', help: 'φίλημα = kiss' },
  {
    id: 'matt-25-15', ref: 'Matt 25:15', text: 'καὶ ᾧ μὲν ἔδωκεν πέντε τάλαντα ᾧ δὲ δύο ᾧ δὲ ἕν', word: 'ἔδωκεν', slot: '3s', verb: 'didomi-aor',
    translation: 'To one he gave five talents, to another two, to another one', help: 'πέντε = five · τάλαντον = talent',
  },
  { id: 'matt-27-10', ref: 'Matt 27:10', text: 'καὶ ἔδωκαν αὐτὰ εἰς τὸν ἀγρὸν τοῦ κεραμέως', word: 'ἔδωκαν', slot: '3p', verb: 'didomi-aor', translation: 'and they gave them for the potter’s field', help: 'κεραμεύς = potter' },
  { id: '1cor-11-23', ref: '1 Cor 11:23', text: 'Ἐγὼ γὰρ παρέλαβον ἀπὸ τοῦ κυρίου, ὃ καὶ παρέδωκα ὑμῖν', word: 'παρέδωκα', slot: '1s', verb: 'paradidomi-aor', translation: 'For I received from the Lord what I also handed on to you', help: 'παρέλαβον = I received' },
  {
    id: 'matt-27-2', ref: 'Matt 27:2', text: 'καὶ δήσαντες αὐτὸν ἀπήγαγον καὶ παρέδωκαν Πιλάτῳ τῷ ἡγεμόνι.', word: 'παρέδωκαν', slot: '3p', verb: 'paradidomi-aor',
    translation: 'And they bound him, led him away, and handed him over to Pilate the governor.', help: 'δήσαντες = having bound · ἀπήγαγον = they led away · ἡγεμών = governor',
  },
  { id: 'matt-13-4', ref: 'Matt 13:4', text: 'καὶ ἐν τῷ σπείρειν αὐτὸν ἃ μὲν ἔπεσεν παρὰ τὴν ὁδόν', word: 'ἔπεσεν', slot: '3s', verb: 'pipto-aor', translation: 'And as he sowed, some seeds fell along the path' },
  { id: 'matt-28-18', ref: 'Matt 28:18', text: 'Ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ καὶ ἐπὶ τῆς γῆς·', word: 'Ἐδόθη', slot: '3s', verb: 'didomi-aorp', translation: 'All authority in heaven and on earth has been given to me.' },
  {
    id: 'rom-4-25', ref: 'Rom 4:25', text: 'ὃς παρεδόθη διὰ τὰ παραπτώματα ἡμῶν καὶ ἠγέρθη διὰ τὴν δικαίωσιν ἡμῶν.', word: 'παρεδόθη', slot: '3s', verb: 'paradidomi-aorp',
    translation: 'who was delivered up for our trespasses and raised for our justification.', help: 'παράπτωμα = trespass · δικαίωσις = justification',
  },
  // Perfect.
  { id: 'john-3-35', ref: 'John 3:35', text: 'ὁ πατὴρ ἀγαπᾷ τὸν υἱόν, καὶ πάντα δέδωκεν ἐν τῇ χειρὶ αὐτοῦ.', word: 'δέδωκεν', slot: '3s', verb: 'didomi-perf', translation: 'The Father loves the Son and has given all things into his hand.' },
  { id: 'john-17-22', ref: 'John 17:22', text: 'κἀγὼ τὴν δόξαν ἣν δέδωκάς μοι δέδωκα αὐτοῖς', word: 'δέδωκα', slot: '1s', verb: 'didomi-perf', translation: 'The glory that you have given me I have given to them', note: 'δέδωκάς has a second accent from the enclitic μοι.' },
]

export const chapter34: Chapter = {
  number: 34,
  title: 'Indicative of δίδωμι',
  short: 'δίδωμι',
  topics: ['mi'],
  vocab: [
    { id: 'didomi', lemma: 'δίδωμι', pos: 'verb', gloss: 'I give (out), entrust, give back, put', hook: 'Antidote: something “given against.” The root is *δο.', accept: ['i give', 'give', 'entrust', 'give back', 'put', 'grant', 'allow'] },
    { id: 'ethnos', lemma: 'ἔθνος', lexical: 'ἔθνος, -ους, τό', pos: 'noun', gloss: 'sg: nation; pl: Gentiles', hook: 'Ethnic.', accept: ['nation', 'gentiles', 'people', 'nations', 'gentile'] },
    { id: 'loipos', lemma: 'λοιπός', lexical: 'λοιπός, -ή, -όν', pos: 'adjective', gloss: 'remaining; noun: the rest; adverb: for the rest', accept: ['remaining', 'rest', 'the rest', 'other', 'finally', 'for the rest'] },
    { id: 'mouses', lemma: 'Μωϋσῆς', lexical: 'Μωϋσῆς, -έως, ὁ', pos: 'noun', gloss: 'Moses', hook: 'Irregular: Μωϋσῆς, Μωϋσέως, Μωϋσεῖ, Μωϋσῆν.', accept: ['moses'] },
    { id: 'paradidomi', lemma: 'παραδίδωμι', pos: 'verb', gloss: 'I entrust, hand over, betray', hook: 'παρά + δίδωμι: “give over.” Judas is ὁ παραδιδούς, “the betrayer.”', accept: ['i entrust', 'entrust', 'hand over', 'i hand over', 'betray', 'i betray', 'deliver', 'hand on'] },
    { id: 'pipto', lemma: 'πίπτω', pos: 'verb', gloss: 'I fall', hook: 'Root *πετ; aorist ἔπεσον.', accept: ['i fall', 'fall', 'fall down'] },
    { id: 'hyparcho', lemma: 'ὑπάρχω', pos: 'verb', gloss: 'I am, exist', hook: 'τὰ ὑπάρχοντα, “what exists (for someone)”: possessions.', accept: ['i am', 'am', 'exist', 'i exist', 'be'] },
  ],
  paradigms: [],
  present: { verbs: VERBS, verses: VERSES },
}

import type { Chapter, ImperativeVerb, ImperativeVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 33: Imperative.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/** Stems are unaccented; the accent is recessive. Contract verbs and the true irregulars are listed. */
const VERBS: ImperativeVerb[] = [
  { id: 'lyo', lemma: 'λύω', en: 'loose', pp: 'loosed', present: 'λυ', aorist: 'λυσ', passive: 'λυθ', long: true, kinds: ['pres-act', 'pres-mp', 'aor-act', 'aor-mid', 'aor-pass'] },
  { id: 'pisteuo', lemma: 'πιστεύω', en: 'believe', present: 'πιστευ', aorist: 'πιστευσ', kinds: ['pres-act', 'aor-act'] },
  { id: 'akouo', lemma: 'ἀκούω', en: 'hear', present: 'ἀκου', aorist: 'ἀκουσ', kinds: ['pres-act', 'aor-act'] },
  { id: 'lego', lemma: 'λέγω', en: 'say', present: 'λεγ', aorist: 'εἰπ', second: true, kinds: ['pres-act', 'aor-act'],
    irregular: { 'aor-act': { '2s': 'εἰπέ', '3s': 'εἰπάτω', '2p': 'εἴπατε', '3p': 'εἰπάτωσαν' } } },
  { id: 'lambano', lemma: 'λαμβάνω', en: 'take', present: 'λαμβαν', aorist: 'λαβ', second: true, kinds: ['pres-act', 'aor-act'] },
  { id: 'horao', lemma: 'ὁράω', en: 'see', aorist: 'ἰδ', second: true, kinds: ['aor-act'] },
  { id: 'erchomai', lemma: 'ἔρχομαι', en: 'come', middleOnly: true, present: 'ἐρχ', aorist: 'ἐλθ', second: true, kinds: ['pres-mp', 'aor-act'],
    irregular: { 'aor-act': { '2s': 'ἐλθέ' } } },
  { id: 'exerchomai', lemma: 'ἐξέρχομαι', en: 'come out', middleOnly: true, aorist: 'ἐξελθ', second: true, kinds: ['aor-act'] },
  { id: 'hypago', lemma: 'ὑπάγω', en: 'go', present: 'ὑπαγ', kinds: ['pres-act'] },
  { id: 'krino', lemma: 'κρίνω', en: 'judge', present: 'κριν', long: true, kinds: ['pres-act'] },
  { id: 'apolyo', lemma: 'ἀπολύω', en: 'release', present: 'ἀπολυ', aorist: 'ἀπολυσ', kinds: ['pres-act', 'aor-act'] },
  { id: 'airo', lemma: 'αἴρω', en: 'take up', aorist: 'ἀρ', long: true, kinds: ['aor-act'] },
  { id: 'sozo', lemma: 'σῴζω', en: 'save', pp: 'saved', aorist: 'σωσ', passive: 'σωθ', kinds: ['aor-act', 'aor-pass'] },
  { id: 'egeiro', lemma: 'ἐγείρω', en: 'raise', pp: 'raised', present: 'ἐγειρ', passive: 'ἐγερθ', kinds: ['pres-mp', 'aor-pass'] },
  { id: 'poieo', lemma: 'ποιέω', en: 'do', aorist: 'ποιησ', kinds: ['pres-act', 'aor-act'],
    irregular: { 'pres-act': { '2s': 'ποίει', '3s': 'ποιείτω', '2p': 'ποιεῖτε', '3p': 'ποιείτωσαν' } } },
  { id: 'akoloutheo', lemma: 'ἀκολουθέω', en: 'follow', kinds: ['pres-act'],
    irregular: { 'pres-act': { '2s': 'ἀκολούθει', '3s': 'ἀκολουθείτω', '2p': 'ἀκολουθεῖτε', '3p': 'ἀκολουθείτωσαν' } } },
  { id: 'phobeomai', lemma: 'φοβέομαι', en: 'fear', middleOnly: true, passive: 'φοβηθ', kinds: ['pres-mp'],
    irregular: { 'pres-mp': { '2s': 'φοβοῦ', '3s': 'φοβείσθω', '2p': 'φοβεῖσθε', '3p': 'φοβείσθωσαν' } } },
  { id: 'ginomai', lemma: 'γίνομαι', en: 'become', pp: 'done', middleOnly: true, present: 'γιν', aorist: 'γεν', second: true, passive: 'γενηθ', kinds: ['pres-mp', 'aor-mid', 'aor-pass'] },
  { id: 'proseuchomai', lemma: 'προσεύχομαι', en: 'pray', middleOnly: true, present: 'προσευχ', kinds: ['pres-mp'] },
  { id: 'poreuomai', lemma: 'πορεύομαι', en: 'go', middleOnly: true, present: 'πορευ', passive: 'πορευθ', kinds: ['pres-mp', 'aor-pass'] },
  { id: 'eimi', lemma: 'εἰμί', en: 'be', kinds: ['pres-act'], irregular: { 'pres-act': { '2s': 'ἴσθι', '3s': 'ἔστω', '2p': 'ἔστε', '3p': 'ἔστωσαν' } } },
]

const VERSES: ImperativeVerse[] = [
  // Present: an ongoing or repeated action, or a general command.
  {
    id: 'mark-1-15', ref: 'Mark 1:15', text: 'μετανοεῖτε καὶ πιστεύετε ἐν τῷ εὐαγγελίῳ.', word: 'πιστεύετε', lemma: 'πιστεύω', kind: 'pres-act', slot: '2p',
    translation: 'Repent and believe in the gospel.', help: 'μετανοεῖτε = repent!',
    note: 'πιστεύετε could be indicative, “you believe”; beside μετανοεῖτε, a command, it is imperative.',
    wrong: ['You repent and you believe in the gospel.', 'Let them repent and believe in the gospel.'],
  },
  {
    id: 'mark-5-36', ref: 'Mark 5:36', text: 'Μὴ φοβοῦ, μόνον πίστευε.', word: 'πίστευε', lemma: 'πιστεύω', kind: 'pres-act', slot: '2s',
    translation: 'Do not fear; only believe.', note: 'The present: go on believing.',
    wrong: ['Do not fear; he only believes.', 'Do not be feared; only believe.'],
  },
  {
    id: 'matt-11-15', ref: 'Matt 11:15', text: 'ὁ ἔχων ὦτα ἀκουέτω.', word: 'ἀκουέτω', lemma: 'ἀκούω', kind: 'pres-act', slot: '3s',
    translation: 'Whoever has ears, let him hear.', note: 'A 3rd person imperative: “let him …”; it is still a command, not permission.',
    wrong: ['Whoever has ears will hear.', 'Hear the one who has ears!'],
  },
  {
    id: 'luke-5-27', ref: 'Luke 5:27', text: 'καὶ εἶπεν αὐτῷ· Ἀκολούθει μοι.', word: 'Ἀκολούθει', lemma: 'ἀκολουθέω', kind: 'pres-act', slot: '2s',
    translation: 'And he said to him, “Follow me.”', note: 'A contract verb: ἀκολούθεε → ἀκολούθει. It looks like the 3rd singular indicative.',
    wrong: ['And he said to him, “He follows me.”', 'And he said to him, “Let him follow me.”'],
  },
  {
    id: 'matt-8-13', ref: 'Matt 8:13', text: 'Ὕπαγε, ὡς ἐπίστευσας γενηθήτω σοι·', word: 'Ὕπαγε', lemma: 'ὑπάγω', kind: 'pres-act', slot: '2s',
    translation: 'Go; let it be done for you as you have believed.',
  },
  {
    id: 'matt-5-44', ref: 'Matt 5:44', text: 'ἀγαπᾶτε τοὺς ἐχθροὺς ὑμῶν καὶ προσεύχεσθε ὑπὲρ τῶν διωκόντων ὑμᾶς·', word: 'προσεύχεσθε', lemma: 'προσεύχομαι', kind: 'pres-mp', slot: '2p',
    translation: 'Love your enemies and pray for those who persecute you.', help: 'ἐχθρός = enemy · διωκόντων = persecuting',
    wrong: ['You love your enemies and pray for those who persecute you.', 'Let them love their enemies and pray for those who persecute them.'],
  },
  {
    id: 'luke-7-50', ref: 'Luke 7:50', text: 'Ἡ πίστις σου σέσωκέν σε· πορεύου εἰς εἰρήνην.', word: 'πορεύου', lemma: 'πορεύομαι', kind: 'pres-mp', slot: '2s',
    translation: 'Your faith has saved you; go in peace.', note: 'The middle/passive 2nd singular ending is ου (from ε + σο).',
    wrong: ['Your faith has saved you; he goes in peace.', 'Your faith has saved you; you went in peace.'],
  },
  {
    id: 'matt-26-46', ref: 'Matt 26:46', text: 'ἐγείρεσθε ἄγωμεν·', word: 'ἐγείρεσθε', lemma: 'ἐγείρω', kind: 'pres-mp', slot: '2p',
    translation: 'Rise, let us be going.', help: 'ἄγωμεν = let us go',
  },
  {
    id: 'luke-22-42', ref: 'Luke 22:42', text: 'πλὴν μὴ τὸ θέλημά μου ἀλλὰ τὸ σὸν γινέσθω.', word: 'γινέσθω', lemma: 'γίνομαι', kind: 'pres-mp', slot: '3s',
    translation: 'Yet not my will, but yours, be done.', help: 'πλήν = yet · σός = your',
    wrong: ['Yet not my will, but yours, was done.', 'Yet do not do my will, but become yours.'],
  },
  {
    id: 'matt-5-37', ref: 'Matt 5:37', text: 'ἔστω δὲ ὁ λόγος ὑμῶν ναὶ ναί, οὒ οὔ·', word: 'ἔστω', lemma: 'εἰμί', kind: 'pres-act', slot: '3s',
    translation: 'But let your word be “Yes, yes” or “No, no.”', help: 'ναί = yes', note: 'εἰμί’s imperatives: ἴσθι, ἔστω, ἔστε, ἔστωσαν.',
    wrong: ['But your word is “Yes, yes” or “No, no.”', 'But be the word of “Yes, yes” or “No, no.”'],
  },
  {
    id: 'rom-14-3', ref: 'Rom 14:3', text: 'ὁ δὲ μὴ ἐσθίων τὸν ἐσθίοντα μὴ κρινέτω', word: 'κρινέτω', lemma: 'κρίνω', kind: 'pres-act', slot: '3s',
    translation: 'and let the one who does not eat not judge the one who eats', prohibition: 'imperative',
  },
  // Aorist: the action as a whole, often a specific command.
  {
    id: 'acts-16-31', ref: 'Acts 16:31', text: 'Πίστευσον ἐπὶ τὸν κύριον Ἰησοῦν, καὶ σωθήσῃ σὺ καὶ ὁ οἶκός σου.', word: 'Πίστευσον', lemma: 'πιστεύω', kind: 'aor-act', slot: '2s',
    translation: 'Believe in the Lord Jesus, and you will be saved, you and your household.', help: 'σωθήσῃ = you will be saved',
    note: 'The aorist 2nd singular ends in σον: “believe” as one decisive act.',
    wrong: ['You believed in the Lord Jesus, and you will be saved, you and your household.', 'Let him believe in the Lord Jesus, and you will be saved.'],
  },
  {
    id: 'matt-8-25', ref: 'Matt 8:25', text: 'Κύριε, σῶσον, ἀπολλύμεθα.', word: 'σῶσον', lemma: 'σῴζω', kind: 'aor-act', slot: '2s',
    translation: 'Lord, save us! We are perishing.', help: 'ἀπολλύμεθα = we are perishing (ἀπόλλυμι)',
    note: 'ἀπόλλυμι, “destroy; middle: perish,” is from this chapter’s vocabulary.',
    wrong: ['Lord, you saved us; we are perishing.', 'Lord, let him save us; we are perishing.'],
  },
  {
    id: 'matt-3-8', ref: 'Matt 3:8', text: 'ποιήσατε οὖν καρπὸν ἄξιον τῆς μετανοίας', word: 'ποιήσατε', lemma: 'ποιέω', kind: 'aor-act', slot: '2p',
    translation: 'Bear fruit, then, worthy of repentance', help: 'καρπός = fruit · ἄξιος = worthy · μετάνοια = repentance',
    note: 'Without an augment, ποιήσατε is imperative; the indicative is ἐποιήσατε.',
    wrong: ['You bore fruit, then, worthy of repentance', 'Let them bear fruit, then, worthy of repentance'],
  },
  {
    id: 'luke-16-29', ref: 'Luke 16:29', text: 'Ἔχουσι Μωϋσέα καὶ τοὺς προφήτας· ἀκουσάτωσαν αὐτῶν.', word: 'ἀκουσάτωσαν', lemma: 'ἀκούω', kind: 'aor-act', slot: '3p',
    translation: 'They have Moses and the Prophets; let them listen to them.',
    wrong: ['They have Moses and the Prophets; they listened to them.', 'They have Moses and the Prophets; listen to them!'],
  },
  {
    id: 'mark-1-25', ref: 'Mark 1:25', text: 'Φιμώθητι καὶ ἔξελθε ἐξ αὐτοῦ.', word: 'ἔξελθε', lemma: 'ἐξέρχομαι', kind: 'aor-act', slot: '2s',
    translation: 'Be silent, and come out of him!', help: 'φιμώθητι = be silent! (an aorist passive imperative)',
    note: 'A second aorist: the present’s endings on the aorist stem ἐξελθ-.',
    wrong: ['Be silent, and he came out of him!', 'Be silent, and let him come out of him!'],
  },
  {
    id: 'john-20-27', ref: 'John 20:27', text: 'Φέρε τὸν δάκτυλόν σου ὧδε καὶ ἴδε τὰς χεῖράς μου', word: 'ἴδε', lemma: 'ὁράω', kind: 'aor-act', slot: '2s',
    translation: 'Put your finger here, and see my hands', help: 'φέρε = bring! · δάκτυλος = finger', note: 'φέρε is a present imperative of φέρω.',
  },
  {
    id: 'matt-4-3', ref: 'Matt 4:3', text: 'Εἰ υἱὸς εἶ τοῦ θεοῦ, εἰπὲ ἵνα οἱ λίθοι οὗτοι ἄρτοι γένωνται.', word: 'εἰπὲ', lemma: 'λέγω', kind: 'aor-act', slot: '2s',
    translation: 'If you are the Son of God, command these stones to become loaves of bread.', note: 'εἰπέ is one of the few second aorist imperatives accented on the ending.',
  },
  {
    id: 'matt-6-10', ref: 'Matt 6:10', text: 'ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου', word: 'ἐλθέτω', lemma: 'ἔρχομαι', kind: 'aor-act', slot: '3s',
    translation: 'Your kingdom come, your will be done', note: '“Let your kingdom come”: a 3rd person imperative addressed to God as a request.',
    wrong: ['Your kingdom came, your will was done', 'Come into your kingdom, and do your will'],
  },
  {
    id: 'matt-6-10-genetheto', ref: 'Matt 6:10', text: 'ἐλθέτω ἡ βασιλεία σου, γενηθήτω τὸ θέλημά σου', word: 'γενηθήτω', lemma: 'γίνομαι', kind: 'aor-pass', slot: '3s',
    translation: 'Your kingdom come, your will be done', note: 'γίνομαι has a passive aorist too, γενηθ-: “let it be done.”',
  },
  {
    id: 'acts-2-40', ref: 'Acts 2:40', text: 'Σώθητε ἀπὸ τῆς γενεᾶς τῆς σκολιᾶς ταύτης.', word: 'Σώθητε', lemma: 'σῴζω', kind: 'aor-pass', slot: '2p',
    translation: 'Be saved from this crooked generation.', help: 'γενεά = generation · σκολιός = crooked',
    wrong: ['Save yourselves from this crooked generation, you who were saved.', 'You were saved from this crooked generation.'],
  },
  {
    id: 'luke-7-14', ref: 'Luke 7:14', text: 'Νεανίσκε, σοὶ λέγω, ἐγέρθητι.', word: 'ἐγέρθητι', lemma: 'ἐγείρω', kind: 'aor-pass', slot: '2s',
    translation: 'Young man, I say to you, arise.', help: 'νεανίσκος = young man', note: 'The aorist passive 2nd singular ends in θητι.',
  },
  {
    id: 'john-5-8', ref: 'John 5:8', text: 'Ἔγειρε ἆρον τὸν κράβαττόν σου καὶ περιπάτει.', word: 'ἆρον', lemma: 'αἴρω', kind: 'aor-act', slot: '2s',
    translation: 'Get up, take up your mat, and walk.', help: 'ἔγειρε = get up! · κράβαττος = mat · περιπάτει = walk!',
    note: 'A liquid aorist: no σ, just ον (ἦρα, ἆρον). Three imperatives in a row.',
    wrong: ['He gets up, takes up his mat, and walks.', 'Let him get up, take up his mat, and walk.'],
  },
  {
    id: 'matt-15-23', ref: 'Matt 15:23', text: 'Ἀπόλυσον αὐτήν, ὅτι κράζει ὄπισθεν ἡμῶν.', word: 'Ἀπόλυσον', lemma: 'ἀπολύω', kind: 'aor-act', slot: '2s',
    translation: 'Send her away, for she keeps crying out after us.', help: 'ὄπισθεν = behind', note: 'ἀπολύω, “release, send away,” is from this chapter’s vocabulary.',
    wrong: ['He sent her away, for she keeps crying out after us.', 'Let her be sent away, for she keeps crying out after us.'],
  },
  // Prohibitions: μή + present imperative, or μή + aorist subjunctive.
  {
    id: 'luke-1-30', ref: 'Luke 1:30', text: 'Μὴ φοβοῦ, Μαριάμ, εὗρες γὰρ χάριν παρὰ τῷ θεῷ·', word: 'φοβοῦ', lemma: 'φοβέομαι', kind: 'pres-mp', slot: '2s', prohibition: 'imperative',
    translation: 'Do not be afraid, Mary, for you have found favor with God.', note: 'Mary was already afraid: “stop being afraid.” φοβέου contracts to φοβοῦ.',
  },
  {
    id: 'matt-14-27', ref: 'Matt 14:27', text: 'Θαρσεῖτε, ἐγώ εἰμι· μὴ φοβεῖσθε.', word: 'φοβεῖσθε', lemma: 'φοβέομαι', kind: 'pres-mp', slot: '2p', prohibition: 'imperative',
    translation: 'Take heart; it is I. Do not be afraid.', help: 'θαρσεῖτε = take courage!',
  },
  {
    id: 'matt-7-1', ref: 'Matt 7:1', text: 'Μὴ κρίνετε, ἵνα μὴ κριθῆτε·', word: 'κρίνετε', lemma: 'κρίνω', kind: 'pres-act', slot: '2p', prohibition: 'imperative',
    translation: 'Do not judge, so that you may not be judged.', note: 'The present forbids a habit: “do not be judging.”',
  },
  {
    id: 'mark-13-21', ref: 'Mark 13:21', text: 'καὶ τότε ἐάν τις ὑμῖν εἴπῃ· Ἴδε ὧδε ὁ χριστός, Ἴδε ἐκεῖ, μὴ πιστεύετε·', word: 'πιστεύετε', lemma: 'πιστεύω', kind: 'pres-act', slot: '2p', prohibition: 'imperative',
    translation: 'And then if anyone says to you, “Look, here is the Christ,” or “Look, there he is,” do not believe it.',
    note: 'Here the present does not mean “stop”: they are not yet believing it. The rule of thumb has exceptions.',
  },
  {
    id: 'john-20-27-ginou', ref: 'John 20:27', text: 'καὶ μὴ γίνου ἄπιστος ἀλλὰ πιστός.', word: 'γίνου', lemma: 'γίνομαι', kind: 'pres-mp', slot: '2s', prohibition: 'imperative',
    translation: 'and do not go on being unbelieving, but believe.', help: 'ἄπιστος = unbelieving · πιστός = believing',
  },
  {
    id: 'matt-1-20', ref: 'Matt 1:20', text: 'Ἰωσὴφ υἱὸς Δαυίδ, μὴ φοβηθῇς παραλαβεῖν Μαρίαν τὴν γυναῖκά σου', word: 'φοβηθῇς', lemma: 'φοβέομαι', kind: 'aor-pass', slot: '2s', prohibition: 'subjunctive',
    translation: 'Joseph, son of David, do not be afraid to take Mary as your wife', help: 'παραλαβεῖν = to take',
    note: 'An aorist passive subjunctive with μή: a prohibition. The aorist imperative is not used with μή in the 2nd person.',
  },
  {
    id: 'matt-10-26', ref: 'Matt 10:26', text: 'Μὴ οὖν φοβηθῆτε αὐτούς·', word: 'φοβηθῆτε', lemma: 'φοβέομαι', kind: 'aor-pass', slot: '2p', prohibition: 'subjunctive',
    translation: 'So do not be afraid of them.',
  },
  {
    id: 'matt-24-23', ref: 'Matt 24:23', text: 'τότε ἐάν τις ὑμῖν εἴπῃ· Ἰδοὺ ὧδε ὁ χριστός, ἤ· Ὧδε, μὴ πιστεύσητε·', word: 'πιστεύσητε', lemma: 'πιστεύω', kind: 'aor-act', slot: '2p', prohibition: 'subjunctive',
    translation: 'Then if anyone says to you, “Look, here is the Christ,” or “There he is,” do not believe it.',
    note: 'The same warning as Mark 13:21, with the aorist subjunctive instead of the present imperative.',
  },
]

export const chapter33: Chapter = {
  number: 33,
  title: 'Imperative',
  short: 'Imperative',
  topics: ['imperative'],
  vocab: [
    { id: 'apollymi', lemma: 'ἀπόλλυμι', pos: 'verb', gloss: 'active: I destroy, kill; middle: I perish, die', hook: 'Apollyon, the destroyer (Rev 9:11).', accept: ['i destroy', 'destroy', 'kill', 'i kill', 'perish', 'i perish', 'die', 'lose', 'i lose'] },
    { id: 'apolyo', lemma: 'ἀπολύω', pos: 'verb', gloss: 'I release', hook: 'ἀπό + λύω, “loose away”: release, send away, divorce.', accept: ['i release', 'release', 'send away', 'dismiss', 'set free', 'let go'] },
    { id: 'eite', lemma: 'εἴτε', pos: 'conjunction', gloss: 'if, whether', hook: 'Usually doubled: εἴτε … εἴτε, “whether … or.”', accept: ['if', 'whether', 'whether or'] },
  ],
  paradigms: [],
  imperatives: { verbs: VERBS, verses: VERSES },
}

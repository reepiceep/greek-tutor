import type { Chapter, ConditionItem, DidomiForm, DidomiVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 35: Nonindicative of δίδωμι; Conditional Sentences.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * The nonindicative forms of δίδωμι. The rules of chapter 34 still hold: reduplication in the present only, no
 * connecting vowel, a long stem vowel where the ending allows, and the aorist on the bare root *δο.
 */
const FORMS: DidomiForm[] = [
  // Subjunctive: the stem vowel contracts with ω/η.
  { id: 'ps1s', form: 'διδῶ', mood: 'subjunctive', parse: 'pres act subj 1st sg', english: '(that) I may give' },
  { id: 'ps3s', form: 'διδῷ', mood: 'subjunctive', parse: 'pres act subj 3rd sg', english: '(that) he may give' },
  { id: 'ps1p', form: 'διδῶμεν', mood: 'subjunctive', parse: 'pres act subj 1st pl', english: '(that) we may give' },
  { id: 'ps3p', form: 'διδῶσι(ν)', mood: 'subjunctive', parse: 'pres act subj 3rd pl', english: '(that) they may give' },
  { id: 'as1s', form: 'δῶ', mood: 'subjunctive', parse: 'aor act subj 1st sg', english: '(that) I may give' },
  { id: 'as2s', form: 'δῷς', mood: 'subjunctive', parse: 'aor act subj 2nd sg', english: '(that) you may give' },
  { id: 'as3s', form: 'δῷ', mood: 'subjunctive', parse: 'aor act subj 3rd sg', english: '(that) he may give' },
  { id: 'as1p', form: 'δῶμεν', mood: 'subjunctive', parse: 'aor act subj 1st pl', english: '(that) we may give' },
  { id: 'as2p', form: 'δῶτε', mood: 'subjunctive', parse: 'aor act subj 2nd pl', english: '(that) you may give' },
  { id: 'as3p', form: 'δῶσι(ν)', mood: 'subjunctive', parse: 'aor act subj 3rd pl', english: '(that) they may give' },
  // Imperative.
  { id: 'pi2s', form: 'δίδου', mood: 'imperative', parse: 'pres act impv 2nd sg', english: 'give! (keep giving)' },
  { id: 'pi3s', form: 'διδότω', mood: 'imperative', parse: 'pres act impv 3rd sg', english: 'let him give' },
  { id: 'pi2p', form: 'δίδοτε', mood: 'imperative', parse: 'pres act impv 2nd pl', english: 'give! (you all)' },
  { id: 'ai2s', form: 'δός', mood: 'imperative', parse: 'aor act impv 2nd sg', english: 'give!' },
  { id: 'ai3s', form: 'δότω', mood: 'imperative', parse: 'aor act impv 3rd sg', english: 'let him give' },
  { id: 'ai2p', form: 'δότε', mood: 'imperative', parse: 'aor act impv 2nd pl', english: 'give! (you all)' },
  { id: 'ai3p', form: 'δότωσαν', mood: 'imperative', parse: 'aor act impv 3rd pl', english: 'let them give' },
  // Infinitive.
  { id: 'pinf', form: 'διδόναι', mood: 'infinitive', parse: 'pres act inf', english: 'to give' },
  { id: 'pminf', form: 'δίδοσθαι', mood: 'infinitive', parse: 'pres mid/pass inf', english: 'to be given' },
  { id: 'ainf', form: 'δοῦναι', mood: 'infinitive', parse: 'aor act inf', english: 'to give' },
  { id: 'apinf', form: 'δοθῆναι', mood: 'infinitive', parse: 'aor pass inf', english: 'to be given' },
  { id: 'rinf', form: 'δεδωκέναι', mood: 'infinitive', parse: 'perf act inf', english: 'to have given' },
  // Participle.
  { id: 'pp-nsm', form: 'διδούς', mood: 'participle', parse: 'pres act ptc nom sg masc', english: 'giving' },
  { id: 'pp-nsf', form: 'διδοῦσα', mood: 'participle', parse: 'pres act ptc nom sg fem', english: 'giving' },
  { id: 'pp-gsm', form: 'διδόντος', mood: 'participle', parse: 'pres act ptc gen sg masc', english: 'of the one giving' },
  { id: 'ppm-nsm', form: 'διδόμενος', mood: 'participle', parse: 'pres mid/pass ptc nom sg masc', english: 'being given' },
  { id: 'ap-nsm', form: 'δούς', mood: 'participle', parse: 'aor act ptc nom sg masc', english: 'having given' },
  { id: 'ap-nsf', form: 'δοῦσα', mood: 'participle', parse: 'aor act ptc nom sg fem', english: 'having given' },
  { id: 'ap-gsm', form: 'δόντος', mood: 'participle', parse: 'aor act ptc gen sg masc', english: 'of the one who gave' },
  { id: 'app-nsm', form: 'δοθείς', mood: 'participle', parse: 'aor pass ptc nom sg masc', english: 'having been given' },
]

const VERSES: DidomiVerse[] = [
  { id: 'matt-6-11', ref: 'Matt 6:11', text: 'τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον δὸς ἡμῖν σήμερον·', word: 'δὸς', lemma: 'δίδωμι', parse: 'aor act impv 2nd sg', translation: 'Give us today our daily bread.', help: 'ἐπιούσιος = daily · σήμερον = today' },
  { id: 'john-4-7', ref: 'John 4:7', text: 'Δός μοι πεῖν·', word: 'Δός', lemma: 'δίδωμι', parse: 'aor act impv 2nd sg', translation: 'Give me a drink.', help: 'πεῖν = to drink' },
  { id: 'matt-14-16', ref: 'Matt 14:16', text: 'δότε αὐτοῖς ὑμεῖς φαγεῖν.', word: 'δότε', lemma: 'δίδωμι', parse: 'aor act impv 2nd pl', translation: 'You give them something to eat.' },
  { id: 'matt-5-31', ref: 'Matt 5:31', text: 'Ὃς ἂν ἀπολύσῃ τὴν γυναῖκα αὐτοῦ, δότω αὐτῇ ἀποστάσιον.', word: 'δότω', lemma: 'δίδωμι', parse: 'aor act impv 3rd sg', translation: 'Whoever divorces his wife, let him give her a certificate of divorce.', help: 'ἀποστάσιον = certificate of divorce', note: 'ἀπολύω, “release, divorce,” is from chapter 33.' },
  { id: 'luke-6-38', ref: 'Luke 6:38', text: 'δίδοτε, καὶ δοθήσεται ὑμῖν·', word: 'δίδοτε', lemma: 'δίδωμι', parse: 'pres act impv 2nd pl', translation: 'Give, and it will be given to you.', note: 'δίδοτε is also the present indicative, “you give”; here it is a command.' },
  { id: 'mark-10-45', ref: 'Mark 10:45', text: 'οὐκ ἦλθεν διακονηθῆναι ἀλλὰ διακονῆσαι καὶ δοῦναι τὴν ψυχὴν αὐτοῦ λύτρον ἀντὶ πολλῶν.', word: 'δοῦναι', lemma: 'δίδωμι', parse: 'aor act inf', translation: 'he did not come to be served but to serve, and to give his life as a ransom for many.', help: 'λύτρον = ransom', note: 'διακονέω, “serve,” is from this chapter’s vocabulary.' },
  { id: 'matt-26-15', ref: 'Matt 26:15', text: 'Τί θέλετέ μοι δοῦναι κἀγὼ ὑμῖν παραδώσω αὐτόν;', word: 'δοῦναι', lemma: 'δίδωμι', parse: 'aor act inf', translation: 'What will you give me if I hand him over to you?' },
  { id: 'acts-20-35', ref: 'Acts 20:35', text: 'Μακάριόν ἐστιν μᾶλλον διδόναι ἢ λαμβάνειν.', word: 'διδόναι', lemma: 'δίδωμι', parse: 'pres act inf', translation: 'It is more blessed to give than to receive.' },
  { id: 'matt-7-11', ref: 'Matt 7:11', text: 'οἴδατε δόματα ἀγαθὰ διδόναι τοῖς τέκνοις ὑμῶν', word: 'διδόναι', lemma: 'δίδωμι', parse: 'pres act inf', translation: 'you know how to give good gifts to your children', help: 'δόμα = gift' },
  { id: 'john-6-33', ref: 'John 6:33', text: 'ὁ γὰρ ἄρτος τοῦ θεοῦ ἐστιν ὁ καταβαίνων ἐκ τοῦ οὐρανοῦ καὶ ζωὴν διδοὺς τῷ κόσμῳ.', word: 'διδοὺς', lemma: 'δίδωμι', parse: 'pres act ptc nom sg masc', translation: 'For the bread of God is he who comes down from heaven and gives life to the world.' },
  { id: 'matt-26-46', ref: 'Matt 26:46', text: 'ἰδοὺ ἤγγικεν ὁ παραδιδούς με.', word: 'παραδιδούς', lemma: 'παραδίδωμι', parse: 'pres act ptc nom sg masc', translation: 'Look, my betrayer is at hand.', note: 'ὁ παραδιδούς, “the one handing over”: the betrayer.' },
  { id: 'luke-22-19', ref: 'Luke 22:19', text: 'Τοῦτό ἐστιν τὸ σῶμά μου τὸ ὑπὲρ ὑμῶν διδόμενον·', word: 'διδόμενον', lemma: 'δίδωμι', parse: 'pres mid/pass ptc nom sg neut', translation: 'This is my body, which is given for you.' },
  { id: 'gal-1-4', ref: 'Gal 1:4', text: 'τοῦ δόντος ἑαυτὸν ὑπὲρ τῶν ἁμαρτιῶν ἡμῶν', word: 'δόντος', lemma: 'δίδωμι', parse: 'aor act ptc gen sg masc', translation: 'who gave himself for our sins' },
]

const CONDITIONS: ConditionItem[] = [
  // First class: εἰ + indicative, assumed true for the sake of the argument.
  {
    id: 'matt-4-3', ref: 'Matt 4:3', text: 'Εἰ υἱὸς εἶ τοῦ θεοῦ, εἰπὲ ἵνα οἱ λίθοι οὗτοι ἄρτοι γένωνται.', word: 'Εἰ υἱὸς εἶ τοῦ θεοῦ', use: 'first',
    english: 'If you are the Son of God', wrong: ['If you were the Son of God (but you are not)', 'Whenever you may be the Son of God', 'Since you will be the Son of God'],
    translation: 'If you are the Son of God, command these stones to become loaves of bread.', note: 'The devil assumes it for the sake of argument: “if (as you claim) you are ….”',
  },
  {
    id: 'john-15-20', ref: 'John 15:20', text: 'εἰ ἐμὲ ἐδίωξαν, καὶ ὑμᾶς διώξουσιν·', word: 'εἰ ἐμὲ ἐδίωξαν', use: 'first',
    english: 'If they persecuted me', wrong: ['If they had persecuted me (but they did not)', 'If they should persecute me', 'Whoever persecutes me'],
    translation: 'If they persecuted me, they will also persecute you.', help: 'ἐδίωξαν = they persecuted',
  },
  {
    id: 'rom-8-31', ref: 'Rom 8:31', text: 'εἰ ὁ θεὸς ὑπὲρ ἡμῶν, τίς καθʼ ἡμῶν;', word: 'εἰ ὁ θεὸς ὑπὲρ ἡμῶν', use: 'first',
    english: 'If God is for us', wrong: ['If God were for us (but he is not)', 'If God should perhaps be for us', 'Whenever God may be for us'],
    translation: 'If God is for us, who can be against us?', note: 'The verb (ἐστιν) is understood. Paul is sure of it: “if, as is true, ….”',
  },
  {
    id: '1cor-15-13', ref: '1 Cor 15:13', text: 'εἰ δὲ ἀνάστασις νεκρῶν οὐκ ἔστιν, οὐδὲ Χριστὸς ἐγήγερται·', word: 'εἰ δὲ ἀνάστασις νεκρῶν οὐκ ἔστιν', use: 'first',
    english: 'But if there is no resurrection of the dead', wrong: ['But if there had been no resurrection of the dead', 'But whenever there may be no resurrection', 'But since the dead will not rise'],
    translation: 'But if there is no resurrection of the dead, then not even Christ has been raised.', help: 'ἐγήγερται = he has been raised',
    note: 'Assumed for the argument, not believed: Paul takes his opponents’ claim and shows where it leads. ἀνάστασις is from this chapter’s vocabulary.',
  },
  {
    id: 'gal-5-25', ref: 'Gal 5:25', text: 'εἰ ζῶμεν πνεύματι, πνεύματι καὶ στοιχῶμεν.', word: 'εἰ ζῶμεν πνεύματι', use: 'first',
    english: 'If we live by the Spirit', wrong: ['If we were living by the Spirit (but we are not)', 'If we should ever live by the Spirit', 'Let us live by the Spirit'],
    translation: 'If we live by the Spirit, let us also keep in step with the Spirit.', help: 'στοιχῶμεν = let us keep in step',
  },
  // Second class: contrary to fact.
  {
    id: 'john-11-21', ref: 'John 11:21', text: 'Κύριε, εἰ ἦς ὧδε οὐκ ἂν ἀπέθανεν ὁ ἀδελφός μου·', word: 'εἰ ἦς ὧδε', use: 'second',
    english: 'If you had been here', wrong: ['If you are here', 'If you should be here', 'Since you were here'],
    translation: 'Lord, if you had been here, my brother would not have died.',
    note: 'He was not there: εἰ + past indicative, and ἄν in the “then” clause.',
  },
  {
    id: 'john-5-46', ref: 'John 5:46', text: 'εἰ γὰρ ἐπιστεύετε Μωϋσεῖ, ἐπιστεύετε ἂν ἐμοί', word: 'εἰ γὰρ ἐπιστεύετε Μωϋσεῖ', use: 'second',
    english: 'For if you believed Moses', wrong: ['For if you believe Moses (as you do)', 'For if you should believe Moses', 'For whenever you believe Moses'],
    translation: 'For if you believed Moses, you would believe me.', note: 'They do not: an imperfect for the present, contrary to fact. Μωϋσῆς is from chapter 34.',
  },
  {
    id: 'john-8-42', ref: 'John 8:42', text: 'Εἰ ὁ θεὸς πατὴρ ὑμῶν ἦν ἠγαπᾶτε ἂν ἐμέ', word: 'Εἰ ὁ θεὸς πατὴρ ὑμῶν ἦν', use: 'second',
    english: 'If God were your Father', wrong: ['If God is your Father (as he is)', 'If God should become your Father', 'Whenever God is your Father'],
    translation: 'If God were your Father, you would love me.',
  },
  {
    id: 'luke-7-39', ref: 'Luke 7:39', text: 'Οὗτος εἰ ἦν προφήτης, ἐγίνωσκεν ἂν τίς καὶ ποταπὴ ἡ γυνὴ ἥτις ἅπτεται αὐτοῦ', word: 'εἰ ἦν προφήτης', use: 'second',
    english: 'If this man were a prophet', wrong: ['If this man is a prophet (as he is)', 'If this man should be a prophet', 'Since this man was a prophet'],
    translation: 'If this man were a prophet, he would know who and what sort of woman this is who is touching him', help: 'ποταπός = what sort of · ἅπτεται = she touches',
    note: 'The Pharisee’s view: he is not a prophet. ἁμαρτωλός (“sinner”), later in the verse, is from this chapter’s vocabulary.',
  },
  {
    id: '1cor-2-8', ref: '1 Cor 2:8', text: 'εἰ γὰρ ἔγνωσαν, οὐκ ἂν τὸν κύριον τῆς δόξης ἐσταύρωσαν·', word: 'εἰ γὰρ ἔγνωσαν', use: 'second',
    english: 'For if they had understood', wrong: ['For if they understand', 'For if they should understand', 'For since they understood'],
    translation: 'For if they had understood, they would not have crucified the Lord of glory.', note: 'An aorist for the past, contrary to fact. σταυρόω is from this chapter’s vocabulary.',
  },
  {
    id: 'john-18-30', ref: 'John 18:30', text: 'Εἰ μὴ ἦν οὗτος κακὸν ποιῶν, οὐκ ἄν σοι παρεδώκαμεν αὐτόν.', word: 'Εἰ μὴ ἦν οὗτος κακὸν ποιῶν', use: 'second',
    english: 'If this man were not doing evil', wrong: ['If this man is not doing evil (as he is not)', 'Unless this man should do evil', 'Whenever this man does not do evil'],
    translation: 'If this man were not doing evil, we would not have handed him over to you.',
  },
  // Third class: ἐάν + subjunctive.
  {
    id: '1john-1-9', ref: '1 John 1:9', text: 'ἐὰν ὁμολογῶμεν τὰς ἁμαρτίας ἡμῶν, πιστός ἐστιν καὶ δίκαιος', word: 'ἐὰν ὁμολογῶμεν τὰς ἁμαρτίας ἡμῶν', use: 'third',
    english: 'If we confess our sins', wrong: ['If we had confessed our sins (but we did not)', 'Since we confessed our sins', 'Let us confess our sins'],
    translation: 'If we confess our sins, he is faithful and just', help: 'ὁμολογῶμεν = we confess', note: 'δίκαιος is from chapter 32.',
  },
  {
    id: '1john-1-8', ref: '1 John 1:8', text: 'ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν, ἑαυτοὺς πλανῶμεν', word: 'ἐὰν εἴπωμεν ὅτι ἁμαρτίαν οὐκ ἔχομεν', use: 'third',
    english: 'If we say that we have no sin', wrong: ['If we had said that we have no sin', 'Since we say that we have no sin', 'Whenever we said that we had no sin'],
    translation: 'If we say that we have no sin, we deceive ourselves', help: 'πλανῶμεν = we deceive',
  },
  {
    id: 'john-14-15', ref: 'John 14:15', text: 'Ἐὰν ἀγαπᾶτέ με, τὰς ἐντολὰς τὰς ἐμὰς τηρήσετε·', word: 'Ἐὰν ἀγαπᾶτέ με', use: 'third',
    english: 'If you love me', wrong: ['If you had loved me (but you did not)', 'Since you loved me', 'Love me!'],
    translation: 'If you love me, you will keep my commandments.', note: 'ἀγαπᾶτε here is the present subjunctive of a contract verb, spelled like the indicative.',
  },
  {
    id: 'john-8-51', ref: 'John 8:51', text: 'ἐάν τις τὸν ἐμὸν λόγον τηρήσῃ, θάνατον οὐ μὴ θεωρήσῃ εἰς τὸν αἰῶνα.', word: 'ἐάν τις τὸν ἐμὸν λόγον τηρήσῃ', use: 'third',
    english: 'If anyone keeps my word', wrong: ['If anyone had kept my word', 'Since someone kept my word', 'Let someone keep my word'],
    translation: 'If anyone keeps my word, he will never see death.',
  },
  {
    id: 'john-11-40', ref: 'John 11:40', text: 'Οὐκ εἶπόν σοι ὅτι ἐὰν πιστεύσῃς ὄψῃ τὴν δόξαν τοῦ θεοῦ;', word: 'ἐὰν πιστεύσῃς', use: 'third',
    english: 'if you believe', wrong: ['if you had believed', 'since you believed', 'whenever you were believing'],
    translation: 'Did I not tell you that if you believe you will see the glory of God?', help: 'ὄψῃ = you will see',
  },
]

export const chapter35: Chapter = {
  number: 35,
  title: 'Nonindicative of δίδωμι; Conditional Sentences',
  short: 'δίδωμι: moods; “if”',
  topics: ['miMoods'],
  vocab: [
    { id: 'hagiazo', lemma: 'ἁγιάζω', pos: 'verb', gloss: 'I consecrate, sanctify', hook: 'From ἅγιος, “holy”: “make holy.”', accept: ['i consecrate', 'consecrate', 'i sanctify', 'sanctify', 'make holy', 'hallow'] },
    { id: 'hamartano', lemma: 'ἁμαρτάνω', pos: 'verb', gloss: 'I sin', hook: 'The verb of ἁμαρτία, “sin.”', accept: ['i sin', 'sin'] },
    { id: 'hamartolos', lemma: 'ἁμαρτωλός', lexical: 'ἁμαρτωλός, -όν', pos: 'adjective', gloss: 'sinful; noun: sinner', accept: ['sinful', 'sinner', 'sinners'] },
    { id: 'anastasis', lemma: 'ἀνάστασις', lexical: 'ἀνάστασις, -εως, ἡ', pos: 'noun', gloss: 'resurrection', hook: 'ἀνά “up” + στάσις “standing”: the name Anastasia.', accept: ['resurrection', 'rising'] },
    { id: 'apangello', lemma: 'ἀπαγγέλλω', pos: 'verb', gloss: 'I report, tell', hook: 'The ἀγγελ- of ἄγγελος, “messenger.”', accept: ['i report', 'report', 'i tell', 'tell', 'announce', 'proclaim'] },
    { id: 'diakoneo', lemma: 'διακονέω', pos: 'verb', gloss: 'I serve', hook: 'Deacon (διάκονος), a servant.', accept: ['i serve', 'serve', 'minister', 'wait on'] },
    { id: 'diakonia', lemma: 'διακονία', lexical: 'διακονία, -ας, ἡ', pos: 'noun', gloss: 'service', accept: ['service', 'ministry'] },
    { id: 'dikaioo', lemma: 'δικαιόω', pos: 'verb', gloss: 'I justify, vindicate', hook: 'The verb of δίκαιος, “righteous”: “declare righteous.”', accept: ['i justify', 'justify', 'i vindicate', 'vindicate', 'declare righteous'] },
    { id: 'thlipsis', lemma: 'θλῖψις', lexical: 'θλῖψις, -εως, ἡ', pos: 'noun', gloss: 'affliction, tribulation', accept: ['affliction', 'tribulation', 'trouble', 'distress', 'persecution'] },
    { id: 'hilasterion', lemma: 'ἱλαστήριον', lexical: 'ἱλαστήριον, -ου, τό', pos: 'noun', gloss: 'propitiation, expiation, place of propitiation', accept: ['propitiation', 'expiation', 'place of propitiation', 'mercy seat', 'atonement'] },
    { id: 'stauroo', lemma: 'σταυρόω', pos: 'verb', gloss: 'I crucify', hook: 'From σταυρός, “cross.”', accept: ['i crucify', 'crucify'] },
    { id: 'soter', lemma: 'σωτήρ', lexical: 'σωτήρ, -ῆρος, ὁ', pos: 'noun', gloss: 'savior, deliverer', hook: 'From σῴζω, “save.”', accept: ['savior', 'saviour', 'deliverer'] },
    { id: 'soteria', lemma: 'σωτηρία', lexical: 'σωτηρία, -ας, ἡ', pos: 'noun', gloss: 'salvation, deliverance', hook: 'Soteriology: the doctrine of salvation.', accept: ['salvation', 'deliverance'] },
    { id: 'phaneroo', lemma: 'φανερόω', pos: 'verb', gloss: 'I reveal, make known', hook: 'From φανερός, “visible, known.”', accept: ['i reveal', 'reveal', 'make known', 'manifest', 'show', 'disclose'] },
    { id: 'phobos', lemma: 'φόβος', lexical: 'φόβος, -ου, ὁ', pos: 'noun', gloss: 'fear, reverence', hook: 'Phobia.', accept: ['fear', 'reverence', 'terror', 'respect'] },
  ],
  paradigms: [],
  nonindicative: { forms: FORMS, verses: VERSES, conditions: CONDITIONS },
}

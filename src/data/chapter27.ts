import type { Chapter, DeclensionParadigm, ParticipleVerb, ParticipleVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 27: Adverbial Participles (Present).
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/** `stem` keeps the lexical form's accent; the participle's accent stays there unless a long ultima pulls it forward. */
const VERBS: ParticipleVerb[] = [
  { id: 'lyo', lemma: 'λύω', stem: 'λύ', long: true, voices: ['active', 'middle/passive'], ing: 'loosing', pp: 'loosed' },
  { id: 'pisteuo', lemma: 'πιστεύω', stem: 'πιστεύ', voices: ['active'], ing: 'believing' },
  { id: 'akouo', lemma: 'ἀκούω', stem: 'ἀκού', voices: ['active'], ing: 'hearing' },
  { id: 'lego', lemma: 'λέγω', stem: 'λέγ', voices: ['active'], ing: 'saying' },
  { id: 'echo', lemma: 'ἔχω', stem: 'ἔχ', voices: ['active'], ing: 'having' },
  { id: 'blepo', lemma: 'βλέπω', stem: 'βλέπ', voices: ['active', 'middle/passive'], ing: 'seeing', pp: 'seen' },
  { id: 'didasko', lemma: 'διδάσκω', stem: 'διδάσκ', voices: ['active'], ing: 'teaching' },
  // The υ of κηρύσσω is long (aorist infinitive κηρῦξαι), so its neuter is κηρῦσσον.
  { id: 'kerysso', lemma: 'κηρύσσω', stem: 'κηρύσσ', long: true, voices: ['active'], ing: 'preaching' },
  { id: 'baptizo', lemma: 'βαπτίζω', stem: 'βαπτίζ', voices: ['active'], ing: 'baptizing' },
  { id: 'ginosko', lemma: 'γινώσκω', stem: 'γινώσκ', voices: ['active'], ing: 'knowing' },
  { id: 'anabaino', lemma: 'ἀναβαίνω', stem: 'ἀναβαίν', voices: ['active'], ing: 'going up' },
  { id: 'katabaino', lemma: 'καταβαίνω', stem: 'καταβαίν', voices: ['active'], ing: 'coming down' },
  { id: 'peitho', lemma: 'πείθω', stem: 'πείθ', voices: ['active', 'middle/passive'], ing: 'persuading', pp: 'persuaded' },
  // Middle-only: middle/passive forms, active meaning. The New Testament uses εὐαγγελίζω almost only in the middle.
  { id: 'erchomai', lemma: 'ἔρχομαι', stem: 'ἔρχ', voices: ['middle/passive'], middleOnly: true, ing: 'coming' },
  { id: 'poreuomai', lemma: 'πορεύομαι', stem: 'πορεύ', voices: ['middle/passive'], middleOnly: true, ing: 'going' },
  { id: 'proseuchomai', lemma: 'προσεύχομαι', stem: 'προσεύχ', voices: ['middle/passive'], middleOnly: true, ing: 'praying' },
  { id: 'euangelizo', lemma: 'εὐαγγελίζω', stem: 'εὐαγγελίζ', voices: ['middle/passive'], middleOnly: true, ing: 'preaching the good news' },
  { id: 'kathemai', lemma: 'κάθημαι', stem: 'κάθη', athematic: true, voices: ['middle/passive'], middleOnly: true, ing: 'sitting' },
]

const EIMI: DeclensionParadigm = {
  id: 'eimi-act',
  lemma: 'εἰμί',
  lexical: 'ὤν, οὖσα, ὄν',
  gloss: 'being',
  pattern: '3-1-3',
  forms: {
    masculine: { sg: ['ὤν', 'ὄντος', 'ὄντι', 'ὄντα'], pl: ['ὄντες', 'ὄντων', 'οὖσι(ν)', 'ὄντας'] },
    feminine: { sg: ['οὖσα', 'οὔσης', 'οὔσῃ', 'οὖσαν'], pl: ['οὖσαι', 'οὐσῶν', 'οὔσαις', 'οὔσας'] },
    neuter: { sg: ['ὄν', 'ὄντος', 'ὄντι', 'ὄν'], pl: ['ὄντα', 'ὄντων', 'οὖσι(ν)', 'ὄντα'] },
  },
}

const VERSES: ParticipleVerse[] = [
  // Active, nominative: the participle goes with the subject of the main verb.
  {
    id: 'mark-1-14', ref: 'Mark 1:14', text: 'ἦλθεν ὁ Ἰησοῦς εἰς τὴν Γαλιλαίαν κηρύσσων τὸ εὐαγγέλιον τοῦ θεοῦ',
    word: 'κηρύσσων', lemma: 'κηρύσσω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'Jesus came into Galilee, preaching the gospel of God',
    wrong: [
      'Jesus came into Galilee after he had preached the gospel of God',
      'Jesus came into Galilee to those preaching the gospel of God',
      'Jesus came into Galilee, and the gospel of God was preached to him',
    ],
  },
  {
    id: 'matt-13-13', ref: 'Matt 13:13', text: 'ὅτι βλέποντες οὐ βλέπουσιν καὶ ἀκούοντες οὐκ ἀκούουσιν οὐδὲ συνίουσιν·',
    word: 'βλέποντες', lemma: 'βλέπω', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'they (in βλέπουσιν)',
    translation: 'because while seeing they do not see, and while hearing they do not hear, nor do they understand',
    help: 'συνίουσιν = they understand',
    wrong: [
      'because after they had seen they did not see, and after they had heard they did not hear, nor did they understand',
      'because they are seen but do not see, and are heard but do not hear, nor do they understand',
    ],
  },
  {
    id: 'matt-13-13-akouo', ref: 'Matt 13:13', text: 'ὅτι βλέποντες οὐ βλέπουσιν καὶ ἀκούοντες οὐκ ἀκούουσιν οὐδὲ συνίουσιν·',
    word: 'ἀκούοντες', lemma: 'ἀκούω', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'they (in ἀκούουσιν)',
    translation: 'because while seeing they do not see, and while hearing they do not hear, nor do they understand',
    help: 'συνίουσιν = they understand',
    note: 'ἀκούοντες and ἀκούουσιν differ only in the ending: ντ + ες makes the participle, ουσι(ν) the 3rd plural.',
  },
  {
    id: 'matt-14-30', ref: 'Matt 14:30', text: 'βλέπων δὲ τὸν ἄνεμον ἰσχυρὸν ἐφοβήθη',
    word: 'βλέπων', lemma: 'βλέπω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, Peter (in ἐφοβήθη)',
    translation: 'But seeing the strong wind, he became afraid', help: 'ἄνεμος = wind · ἰσχυρός = strong',
    note: 'Peter walking on the water. ἐφοβήθη is the aorist passive of φοβέομαι, with an active meaning.',
    wrong: ['But the strong wind saw him, and he became afraid', 'But he became afraid of being seen by the strong wind'],
  },
  {
    id: 'matt-20-17', ref: 'Matt 20:17', text: 'Καὶ ἀναβαίνων ὁ Ἰησοῦς εἰς Ἱεροσόλυμα παρέλαβεν τοὺς δώδεκα μαθητὰς κατʼ ἰδίαν',
    word: 'ἀναβαίνων', lemma: 'ἀναβαίνω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'And while Jesus was going up to Jerusalem, he took the twelve disciples aside', help: 'παρέλαβεν = he took · κατʼ ἰδίαν = privately',
    note: 'ἀναβαίνω and Ἱεροσόλυμα are from this chapter’s vocabulary.',
    wrong: [
      'And Jesus took aside the twelve disciples who were going up to Jerusalem',
      'And after Jesus had gone up to Jerusalem, he took the twelve disciples aside',
    ],
  },
  {
    id: 'matt-21-22', ref: 'Matt 21:22', text: 'καὶ πάντα ὅσα ἂν αἰτήσητε ἐν τῇ προσευχῇ πιστεύοντες λήμψεσθε.',
    word: 'πιστεύοντες', lemma: 'πιστεύω', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'you (in λήμψεσθε)',
    translation: 'And whatever you ask in prayer, believing, you will receive.', help: 'αἰτήσητε = you ask · προσευχή = prayer · λήμψεσθε = you will receive',
    wrong: ['And whatever those who believe ask in prayer, you will receive.', 'And whatever you ask in prayer, you will receive, and then you will believe.'],
  },
  {
    id: 'john-1-31', ref: 'John 1:31', text: 'διὰ τοῦτο ἦλθον ἐγὼ ἐν ὕδατι βαπτίζων.',
    word: 'βαπτίζων', lemma: 'βαπτίζω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ἐγώ',
    translation: 'For this reason I came baptizing with water.',
    wrong: ['For this reason I came to be baptized with water.', 'For this reason I came to the one baptizing with water.'],
  },
  {
    id: 'acts-19-8', ref: 'Acts 19:8', text: 'ἐπαρρησιάζετο ἐπὶ μῆνας τρεῖς διαλεγόμενος καὶ πείθων περὶ τῆς βασιλείας τοῦ θεοῦ.',
    word: 'πείθων', lemma: 'πείθω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, Paul (in ἐπαρρησιάζετο)',
    translation: 'He spoke boldly for three months, reasoning and persuading about the kingdom of God.',
    help: 'ἐπαρρησιάζετο = he spoke boldly · μήν = month · διαλεγόμενος = reasoning',
    note: 'διαλεγόμενος is a present middle participle, joined to πείθων by καί. πείθω and τρεῖς are from this chapter’s vocabulary.',
    wrong: [
      'He spoke boldly for three months and was persuaded about the kingdom of God.',
      'He spoke boldly for three months to those reasoning and persuading about the kingdom of God.',
    ],
  },
  {
    id: 'matt-12-34', ref: 'Matt 12:34', text: 'πῶς δύνασθε ἀγαθὰ λαλεῖν πονηροὶ ὄντες;',
    word: 'ὄντες', lemma: 'εἰμί', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'you (in δύνασθε)',
    translation: 'How can you speak good things, being evil?', help: 'λαλεῖν = to speak',
    note: 'The participle gives the contrast: “when you are evil.” εἰμί’s participle is only the endings: ὄντες.',
    wrong: ['How can evil people speak good things to you?', 'How can you speak good things to those who are evil?'],
  },
  // Feminine and neuter: the participle takes the gender of its word.
  {
    id: 'mark-5-25', ref: 'Mark 5:25', text: 'καὶ γυνὴ οὖσα ἐν ῥύσει αἵματος δώδεκα ἔτη',
    word: 'οὖσα', lemma: 'εἰμί', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'γυνή',
    translation: 'And a woman, being in a flow of blood for twelve years…', help: 'ῥύσις = flow · ἔτη = years',
    note: 'οὖσα is feminine to agree with γυνή. The present pictures the bleeding as going on through those years.',
  },
  {
    id: 'matt-26-7', ref: 'Matt 26:7', text: 'προσῆλθεν αὐτῷ γυνὴ ἔχουσα ἀλάβαστρον μύρου βαρυτίμου',
    word: 'ἔχουσα', lemma: 'ἔχω', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'γυνή',
    translation: 'A woman came to him, having an alabaster flask of very costly ointment', help: 'ἀλάβαστρον = alabaster flask · μύρον = ointment · βαρύτιμος = very costly',
    wrong: [
      'A woman came to him, and he had an alabaster flask of very costly ointment',
      'He came to a woman who had an alabaster flask of very costly ointment',
    ],
  },
  {
    id: 'acts-13-48', ref: 'Acts 13:48', text: 'ἀκούοντα δὲ τὰ ἔθνη ἔχαιρον καὶ ἐδόξαζον τὸν λόγον τοῦ κυρίου',
    word: 'ἀκούοντα', lemma: 'ἀκούω', voice: 'active', case: 'nominative', number: 'pl', gender: 'neuter', agrees: 'τὰ ἔθνη',
    translation: 'And hearing this, the Gentiles were rejoicing and glorifying the word of the Lord', help: 'ἔθνος = nation; plural, Gentiles',
    note: 'ἔθνη is neuter plural, so the participle is too. The form could be accusative, but τὰ ἔθνη is the subject.',
    wrong: [
      'And the Gentiles were rejoicing when they heard others glorifying the word of the Lord',
      'And after being heard, the Gentiles were rejoicing and glorifying the word of the Lord',
    ],
  },
  {
    id: 'john-1-32', ref: 'John 1:32', text: 'Τεθέαμαι τὸ πνεῦμα καταβαῖνον ὡς περιστερὰν ἐξ οὐρανοῦ, καὶ ἔμεινεν ἐπʼ αὐτόν·',
    word: 'καταβαῖνον', lemma: 'καταβαίνω', voice: 'active', case: 'accusative', number: 'sg', gender: 'neuter', agrees: 'τὸ πνεῦμα',
    translation: 'I have seen the Spirit coming down like a dove from heaven, and it remained on him.', help: 'τεθέαμαι = I have seen · περιστερά = dove',
    note: 'καταβαῖνον is neuter to agree with πνεῦμα; the circumflex comes from the long αι before a short ultima. καταβαίνω is from this chapter’s vocabulary.',
    wrong: [
      'While I was coming down like a dove from heaven, I saw the Spirit, and it remained on him.',
      'The Spirit has seen me coming down like a dove from heaven, and remained on him.',
    ],
  },
  // Accusative, genitive, dative: the participle describes a word that isn't the subject.
  {
    id: 'john-6-62', ref: 'John 6:62', text: 'ἐὰν οὖν θεωρῆτε τὸν υἱὸν τοῦ ἀνθρώπου ἀναβαίνοντα ὅπου ἦν τὸ πρότερον;',
    word: 'ἀναβαίνοντα', lemma: 'ἀναβαίνω', voice: 'active', case: 'accusative', number: 'sg', gender: 'masculine', agrees: 'τὸν υἱόν',
    translation: 'Then what if you see the Son of Man going up to where he was before?', help: 'θεωρῆτε = you see · τὸ πρότερον = before',
    note: 'ἀναβαίνοντα is accusative because it describes τὸν υἱόν, the object of θεωρῆτε. θεωρέω and ἀναβαίνω are from this chapter’s vocabulary.',
    wrong: [
      'Then what if, while going up to where you were before, you see the Son of Man?',
      'Then what if the Son of Man sees you going up to where he was before?',
    ],
  },
  {
    id: 'luke-22-3', ref: 'Luke 22:3', text: 'Εἰσῆλθεν δὲ Σατανᾶς εἰς Ἰούδαν τὸν καλούμενον Ἰσκαριώτην, ὄντα ἐκ τοῦ ἀριθμοῦ τῶν δώδεκα·',
    word: 'ὄντα', lemma: 'εἰμί', voice: 'active', case: 'accusative', number: 'sg', gender: 'masculine', agrees: 'Ἰούδαν',
    translation: 'Then Satan entered into Judas called Iscariot, who was one of the twelve.', help: 'Σατανᾶς = Satan · ἀριθμός = number',
    note: 'ὄντα is accusative to agree with Ἰούδαν (after εἰς), not nominative with Σατανᾶς. τὸν καλούμενον is a present passive participle, “the one called.”',
    wrong: [
      'Then Satan, being one of the twelve, entered into Judas called Iscariot.',
      'Then Satan entered into Judas while calling Iscariot, one of the twelve.',
    ],
  },
  {
    id: 'matt-2-15', ref: 'Matt 2:15', text: 'ἵνα πληρωθῇ τὸ ῥηθὲν ὑπὸ κυρίου διὰ τοῦ προφήτου λέγοντος· Ἐξ Αἰγύπτου ἐκάλεσα τὸν υἱόν μου.',
    word: 'λέγοντος', lemma: 'λέγω', voice: 'active', case: 'genitive', number: 'sg', gender: 'masculine', agrees: 'τοῦ προφήτου',
    translation: 'so that what was spoken by the Lord through the prophet might be fulfilled, saying, “Out of Egypt I called my son.”',
    help: 'πληρωθῇ = might be fulfilled · τὸ ῥηθέν = what was spoken · Αἴγυπτος = Egypt',
    note: 'λέγοντος is genitive because it describes τοῦ προφήτου, after διά. Matthew often introduces Scripture this way.',
  },
  {
    id: 'luke-2-5', ref: 'Luke 2:5', text: 'σὺν Μαριὰμ τῇ ἐμνηστευμένῃ αὐτῷ, οὔσῃ ἐγκύῳ.',
    word: 'οὔσῃ', lemma: 'εἰμί', voice: 'active', case: 'dative', number: 'sg', gender: 'feminine', agrees: 'Μαριάμ',
    translation: 'with Mary, who was engaged to him, being pregnant.', help: 'ἐμνηστευμένῃ = engaged · ἔγκυος = pregnant',
    note: 'σύν takes the dative. Μαριάμ doesn’t decline, but the article τῇ and the participle οὔσῃ show the case.',
  },
  // Middle/passive: μενο/η and 2-1-2 endings.
  {
    id: 'acts-16-25', ref: 'Acts 16:25', text: 'Κατὰ δὲ τὸ μεσονύκτιον Παῦλος καὶ Σιλᾶς προσευχόμενοι ὕμνουν τὸν θεόν',
    word: 'προσευχόμενοι', lemma: 'προσεύχομαι', voice: 'middle/passive', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'Παῦλος καὶ Σιλᾶς',
    translation: 'About midnight Paul and Silas, while praying, were singing hymns to God', help: 'μεσονύκτιον = midnight · ὕμνουν = they were singing hymns',
    note: 'Plural because it goes with two people. προσεύχομαι is middle-only, so the meaning is active.',
    wrong: [
      'About midnight, while people were praying for Paul and Silas, they were singing hymns to God',
      'About midnight Paul and Silas, after they had prayed, sang hymns to God',
    ],
  },
  {
    id: 'john-12-15', ref: 'John 12:15', text: 'ἰδοὺ ὁ βασιλεύς σου ἔρχεται, καθήμενος ἐπὶ πῶλον ὄνου.',
    word: 'καθήμενος', lemma: 'κάθημαι', voice: 'middle/passive', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ βασιλεύς',
    translation: 'Look, your king is coming, sitting on a donkey’s colt.', help: 'πῶλος = colt · ὄνος = donkey',
    note: 'κάθημαι has no connecting vowel, so μενο/η goes straight onto the stem: καθή-μενος. It is from this chapter’s vocabulary.',
    wrong: ['Look, your king is coming to the one sitting on a donkey’s colt.', 'Look, your king is coming, and he will sit on a donkey’s colt.'],
  },
  {
    id: 'luke-5-27', ref: 'Luke 5:27', text: 'ἐθεάσατο τελώνην ὀνόματι Λευὶν καθήμενον ἐπὶ τὸ τελώνιον',
    word: 'καθήμενον', lemma: 'κάθημαι', voice: 'middle/passive', case: 'accusative', number: 'sg', gender: 'masculine', agrees: 'τελώνην (Λευίν)',
    translation: 'He saw a tax collector named Levi sitting at the tax booth', help: 'ἐθεάσατο = he saw · τελώνης = tax collector · τελώνιον = tax booth',
    note: 'καθήμενον is accusative because Levi is the one seen.',
    wrong: ['While sitting at the tax booth, he saw a tax collector named Levi', 'He saw a tax collector named Levi and sat down at the tax booth'],
  },
  {
    id: 'luke-15-25', ref: 'Luke 15:25', text: 'καὶ ὡς ἐρχόμενος ἤγγισεν τῇ οἰκίᾳ, ἤκουσεν συμφωνίας καὶ χορῶν',
    word: 'ἐρχόμενος', lemma: 'ἔρχομαι', voice: 'middle/passive', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, the older son (in ἤγγισεν)',
    translation: 'And as he came and drew near to the house, he heard music and dancing', help: 'ἤγγισεν = he drew near · συμφωνία = music · χορός = dancing',
  },
  {
    id: 'acts-8-4', ref: 'Acts 8:4', text: 'Οἱ μὲν οὖν διασπαρέντες διῆλθον εὐαγγελιζόμενοι τὸν λόγον.',
    word: 'εὐαγγελιζόμενοι', lemma: 'εὐαγγελίζω', voice: 'middle/passive', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'οἱ διασπαρέντες',
    translation: 'Now those who were scattered went about preaching the word.', help: 'διασπαρέντες = scattered · διῆλθον = they went about',
    note: 'εὐαγγελίζω is from this chapter’s vocabulary. The New Testament almost always uses it in the middle, with an active meaning.',
    wrong: ['Now those who were scattered went about, and the word was preached to them.', 'Now those who were scattered went about after the word had been preached.'],
  },
  {
    id: 'mark-16-12', ref: 'Mark 16:12', text: 'Μετὰ δὲ ταῦτα δυσὶν ἐξ αὐτῶν περιπατοῦσιν ἐφανερώθη ἐν ἑτέρᾳ μορφῇ πορευομένοις εἰς ἀγρόν·',
    word: 'πορευομένοις', lemma: 'πορεύομαι', voice: 'middle/passive', case: 'dative', number: 'pl', gender: 'masculine', agrees: 'δυσίν',
    translation: 'After these things he appeared in another form to two of them as they were walking, going into the country.',
    help: 'ἐφανερώθη = he appeared · μορφή = form · ἀγρός = field, country',
    note: 'πορευομένοις is dative because it describes δυσίν (from δύο), the two he appeared to. περιπατοῦσιν is a contracted present participle, also dative plural. δύο and ἕτερος are from this chapter’s vocabulary.',
    wrong: [
      'After these things, while going into the country, he appeared in another form to two of them as they were walking.',
      'After these things two of them appeared in another form as they were walking into the country.',
    ],
  },
  {
    id: 'rom-8-24', ref: 'Rom 8:24', text: 'ἐλπὶς δὲ βλεπομένη οὐκ ἔστιν ἐλπίς',
    word: 'βλεπομένη', lemma: 'βλέπω', voice: 'middle/passive', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'ἐλπίς',
    translation: 'But hope that is seen is not hope',
    note: 'Middle/passive form with a passive meaning, “being seen.” Feminine, because ἐλπίς is.',
    wrong: ['But hope that sees is not hope', 'But while seeing hope, he is not hope'],
  },
  {
    id: 'mark-1-10', ref: 'Mark 1:10', text: 'καὶ εὐθὺς ἀναβαίνων ἐκ τοῦ ὕδατος εἶδεν σχιζομένους τοὺς οὐρανούς',
    word: 'σχιζομένους', lemma: 'σχίζω', voice: 'middle/passive', case: 'accusative', number: 'pl', gender: 'masculine', agrees: 'τοὺς οὐρανούς',
    translation: 'And immediately, while coming up out of the water, he saw the heavens being torn open', help: 'σχίζω = I split, tear',
    note: 'Two present participles: ἀναβαίνων (nominative, with “he”) and σχιζομένους (accusative, with τοὺς οὐρανούς, and passive: “being torn”).',
    wrong: [
      'And immediately, while the heavens were coming up out of the water, he saw them torn open',
      'And immediately, while coming up out of the water, he tore the heavens open',
    ],
  },
]

export const chapter27: Chapter = {
  number: 27,
  title: 'Adverbial Participles (Present)',
  short: 'Present participles',
  topics: ['ptcPresent'],
  vocab: [
    { id: 'anabaino', lemma: 'ἀναβαίνω', pos: 'verb', gloss: 'I go up, come up', hook: 'ἀνά “up” + βαίνω “go”: an anabasis is a march up-country.', accept: ['i go up', 'go up', 'i come up', 'come up', 'ascend', 'i ascend', 'go', 'goes up'] },
    { id: 'archiereus', lemma: 'ἀρχιερεύς', lexical: 'ἀρχιερεύς, -έως, ὁ', pos: 'noun', gloss: 'chief priest, high priest', hook: 'ἀρχι- “chief” (archangel) + ἱερεύς “priest”; the parts swap in hierarch.', accept: ['chief priest', 'high priest', 'high-priest', 'chief-priest'] },
    { id: 'dexios', lemma: 'δεξιός', lexical: 'δεξιός, -ιά, -ιόν', pos: 'adjective', gloss: 'right', hook: 'Dexterity: Latin dextra, the right hand. You usually supply “hand” or “side.”', accept: ['right', 'right hand', 'right side'] },
    { id: 'dyo', lemma: 'δύο', lexical: 'δύο (indeclinable)', pos: 'adjective', gloss: 'two', hook: 'A dyad, a duo. Its one other form is the dative δυσί(ν).', accept: ['two'] },
    { id: 'heteros', lemma: 'ἕτερος', lexical: 'ἕτερος, -α, -ον', pos: 'adjective', gloss: 'other, another, different', hook: 'Heterodoxy: a different teaching.', accept: ['other', 'another', 'different'] },
    { id: 'euangelizo', lemma: 'εὐαγγελίζω', pos: 'verb', gloss: 'I bring good news, preach', hook: 'Evangelize; usually middle in the New Testament: εὐαγγελίζομαι.', accept: ['i bring good news', 'bring good news', 'i preach', 'preach', 'preach the gospel', 'evangelize', 'i evangelize', 'proclaim good news'] },
    { id: 'theoreo', lemma: 'θεωρέω', pos: 'verb', gloss: 'I look at, behold', hook: 'Theory, theater: a way of looking.', accept: ['i look at', 'look at', 'i behold', 'behold', 'see', 'look', 'watch', 'observe'] },
    { id: 'hierosolyma', lemma: 'Ἱεροσόλυμα', lexical: 'Ἱεροσόλυμα, -ων, τά', pos: 'noun', gloss: 'Jerusalem', hook: 'The Greek spelling of Ἰερουσαλήμ, which you already know. Usually neuter plural, sometimes feminine singular.', accept: ['jerusalem'] },
    { id: 'kathemai', lemma: 'κάθημαι', pos: 'verb', gloss: 'I sit (down), live', hook: 'Cathedral: the church with the bishop’s seat.', accept: ['i sit', 'sit', 'i sit down', 'sit down', 'i live', 'live', 'dwell'] },
    { id: 'katabaino', lemma: 'καταβαίνω', pos: 'verb', gloss: 'I go down, come down', hook: 'κατά “down” + βαίνω “go”; the opposite of ἀναβαίνω.', accept: ['i go down', 'go down', 'i come down', 'come down', 'descend', 'i descend'] },
    { id: 'hou', lemma: 'οὗ', pos: 'adverb', gloss: 'where', hook: 'Don’t confuse it with οὐ “not” or the relative pronoun οὗ “of whom.”', accept: ['where'] },
    { id: 'parakaleo', lemma: 'παρακαλέω', pos: 'verb', gloss: 'I call, urge, exhort, comfort', hook: 'παρά + καλέω, “call alongside”: the Paraclete.', accept: ['i call', 'call', 'i urge', 'urge', 'i exhort', 'exhort', 'i comfort', 'comfort', 'encourage', 'i encourage'] },
    { id: 'peitho', lemma: 'πείθω', pos: 'verb', gloss: 'I persuade', accept: ['i persuade', 'persuade', 'convince', 'i convince'] },
    { id: 'treis', lemma: 'τρεῖς', lexical: 'τρεῖς, τρία', pos: 'adjective', gloss: 'three', hook: 'A triad, a tricycle.', accept: ['three'] },
  ],
  paradigms: [],
  participles: { verbs: VERBS, eimi: EIMI, verses: VERSES },
}

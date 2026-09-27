import type { Chapter, InfinitiveItem, InfinitiveVerb } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 32: Infinitive.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

const ALL = ['pres-act', 'pres-mp', 'aor-act', 'aor-mid', 'aor-pass', 'perf-act', 'perf-mp'] as const

const VERBS: InfinitiveVerb[] = [
  { id: 'lyo', lemma: 'λύω', en: 'loose', pp: 'loosed', present: 'λύ', aorist: 'λύσ', long: true, passive: 'λυθ', perfect: 'λελυκ', perfectMp: 'λελυ', kinds: [...ALL] },
  { id: 'pisteuo', lemma: 'πιστεύω', en: 'believe', pp: 'believed', present: 'πιστεύ', aorist: 'πιστεύσ', perfect: 'πεπιστευκ', kinds: ['pres-act', 'aor-act', 'perf-act'] },
  { id: 'akouo', lemma: 'ἀκούω', en: 'hear', pp: 'heard', present: 'ἀκού', aorist: 'ἀκούσ', passive: 'ἀκουσθ', kinds: ['pres-act', 'aor-act', 'aor-pass'] },
  { id: 'lego', lemma: 'λέγω', en: 'say', pp: 'said', present: 'λέγ', aorist: 'εἰπ', second: true, kinds: ['pres-act', 'pres-mp', 'aor-act'] },
  { id: 'echo', lemma: 'ἔχω', en: 'have', present: 'ἔχ', kinds: ['pres-act'] },
  { id: 'poieo', lemma: 'ποιέω', en: 'do', pp: 'done', present: 'ποι', contract: 'ε', aorist: 'ποιήσ', perfect: 'πεποιηκ', kinds: ['pres-act', 'aor-act', 'perf-act'] },
  { id: 'laleo', lemma: 'λαλέω', en: 'speak', pp: 'spoken', present: 'λαλ', contract: 'ε', aorist: 'λαλήσ', kinds: ['pres-act', 'aor-act'] },
  { id: 'pleroo', lemma: 'πληρόω', en: 'fulfill', pp: 'fulfilled', present: 'πληρ', contract: 'ο', aorist: 'πληρώσ', passive: 'πληρωθ', kinds: ['pres-act', 'aor-act', 'aor-pass'] },
  { id: 'horao', lemma: 'ὁράω', en: 'see', pp: 'seen', present: 'ὁρ', contract: 'α', aorist: 'ἰδ', second: true, kinds: ['pres-act', 'aor-act'] },
  { id: 'sozo', lemma: 'σῴζω', en: 'save', pp: 'saved', present: 'σῴζ', aorist: 'σώσ', passive: 'σωθ', kinds: ['pres-act', 'aor-act', 'aor-pass'] },
  { id: 'baptizo', lemma: 'βαπτίζω', en: 'baptize', pp: 'baptized', present: 'βαπτίζ', aorist: 'βαπτίσ', passive: 'βαπτισθ', kinds: ['pres-act', 'aor-act', 'aor-pass'] },
  { id: 'speiro', lemma: 'σπείρω', en: 'sow', pp: 'sown', present: 'σπείρ', aorist: 'σπείρ', kinds: ['pres-act', 'aor-act'] },
  { id: 'egeiro', lemma: 'ἐγείρω', en: 'raise', pp: 'raised', present: 'ἐγείρ', aorist: 'ἐγείρ', passive: 'ἐγερθ', kinds: ['pres-act', 'aor-act', 'aor-pass'] },
  { id: 'lambano', lemma: 'λαμβάνω', en: 'take, receive', present: 'λαμβάν', aorist: 'λαβ', second: true, kinds: ['pres-act', 'aor-act'] },
  { id: 'esthio', lemma: 'ἐσθίω', en: 'eat', present: 'ἐσθί', aorist: 'φαγ', second: true, kinds: ['pres-act', 'aor-act'] },
  { id: 'apothnesko', lemma: 'ἀποθνῄσκω', en: 'die', present: 'ἀποθνῄσκ', aorist: 'ἀποθαν', second: true, kinds: ['pres-act', 'aor-act'] },
  { id: 'erchomai', lemma: 'ἔρχομαι', en: 'come', middleOnly: true, present: 'ἔρχ', aorist: 'ἐλθ', second: true, kinds: ['pres-mp', 'aor-act'] },
  { id: 'ginomai', lemma: 'γίνομαι', en: 'become', pp: 'become', middleOnly: true, present: 'γίν', aorist: 'γεν', second: true, perfect: 'γεγον', kinds: ['pres-mp', 'aor-mid', 'perf-act'] },
  { id: 'proseuchomai', lemma: 'προσεύχομαι', en: 'pray', middleOnly: true, present: 'προσεύχ', aorist: 'προσεύξ', kinds: ['pres-mp', 'aor-mid'] },
  { id: 'eimi', lemma: 'εἰμί', en: 'be', kinds: ['pres-act'], irregular: { 'pres-act': 'εἶναι' } },
  { id: 'zao', lemma: 'ζάω', en: 'live', kinds: ['pres-act'], irregular: { 'pres-act': 'ζῆν' } },
]

const ITEMS: InfinitiveItem[] = [
  // Complementary: it completes the verb.
  {
    id: 'mark-13-5', ref: 'Mark 13:5', text: 'ὁ δὲ Ἰησοῦς ἤρξατο λέγειν αὐτοῖς·', word: 'λέγειν', lemma: 'λέγω', kind: 'pres-act', use: 'complementary',
    english: 'to say', wrong: ['in order to say', 'while saying', 'because he said'], translation: 'And Jesus began to say to them,',
  },
  {
    id: 'matt-27-42', ref: 'Matt 27:42', text: 'Ἄλλους ἔσωσεν, ἑαυτὸν οὐ δύναται σῶσαι·', word: 'σῶσαι', lemma: 'σῴζω', kind: 'aor-act', use: 'complementary',
    english: 'to save', wrong: ['so that he saved', 'after saving', 'to be saved'], translation: 'He saved others; he cannot save himself.',
  },
  {
    id: 'matt-12-38', ref: 'Matt 12:38', text: 'Διδάσκαλε, θέλομεν ἀπὸ σοῦ σημεῖον ἰδεῖν.', word: 'ἰδεῖν', lemma: 'ὁράω', kind: 'aor-act', use: 'complementary',
    english: 'to see', wrong: ['seeing', 'having seen', 'so that we saw'], translation: 'Teacher, we want to see a sign from you.',
    note: 'ἰδ- is the second aorist stem of ὁράω: ἰδεῖν, like λαβεῖν.',
  },
  {
    id: 'matt-20-26', ref: 'Matt 20:26', text: 'ἀλλʼ ὃς ἂν θέλῃ ἐν ὑμῖν μέγας γενέσθαι ἔσται ὑμῶν διάκονος', word: 'γενέσθαι', lemma: 'γίνομαι', kind: 'aor-mid', use: 'complementary',
    english: 'to become', wrong: ['having become', 'while becoming', 'because he became'], translation: 'but whoever wants to become great among you will be your servant',
    help: 'διάκονος = servant',
  },
  {
    id: 'john-6-6', ref: 'John 6:6', text: 'αὐτὸς γὰρ ᾔδει τί ἔμελλεν ποιεῖν.', word: 'ποιεῖν', lemma: 'ποιέω', kind: 'pres-act', use: 'complementary',
    english: 'to do', wrong: ['doing', 'in order to do', 'having done'], translation: 'for he himself knew what he was about to do.', help: 'ᾔδει = he knew',
    note: 'μέλλω, from this chapter’s vocabulary, takes an infinitive: “I am about to ….” ποιεῖν is contracted: ε + ειν → εῖν.',
  },
  {
    id: 'matt-11-14', ref: 'Matt 11:14', text: 'αὐτός ἐστιν Ἠλίας ὁ μέλλων ἔρχεσθαι.', word: 'ἔρχεσθαι', lemma: 'ἔρχομαι', kind: 'pres-mp', use: 'complementary',
    english: 'to come', wrong: ['to be come', 'coming', 'having come'], translation: 'he is Elijah who is to come.',
  },
  {
    id: 'matt-19-25', ref: 'Matt 19:25', text: 'Τίς ἄρα δύναται σωθῆναι;', word: 'σωθῆναι', lemma: 'σῴζω', kind: 'aor-pass', use: 'complementary',
    english: 'to be saved', wrong: ['to save', 'having been saved', 'so that he was saved'], translation: 'Who then can be saved?',
  },
  {
    id: 'mark-6-18', ref: 'Mark 6:18', text: 'Οὐκ ἔξεστίν σοι ἔχειν τὴν γυναῖκα τοῦ ἀδελφοῦ σου.', word: 'ἔχειν', lemma: 'ἔχω', kind: 'pres-act', use: 'complementary',
    english: 'to have', wrong: ['having had', 'so that you have', 'while having'], translation: 'It is not lawful for you to have your brother’s wife.', help: 'ἔξεστιν = it is lawful',
  },
  // Purpose.
  {
    id: 'matt-5-17', ref: 'Matt 5:17', text: 'οὐκ ἦλθον καταλῦσαι ἀλλὰ πληρῶσαι·', word: 'πληρῶσαι', lemma: 'πληρόω', kind: 'aor-act', use: 'purpose',
    english: 'to fulfill', wrong: ['fulfilling', 'because I fulfilled', 'after fulfilling'], translation: 'I did not come to abolish but to fulfill.', help: 'καταλῦσαι = to abolish',
  },
  {
    id: 'luke-18-10', ref: 'Luke 18:10', text: 'Ἄνθρωποι δύο ἀνέβησαν εἰς τὸ ἱερὸν προσεύξασθαι', word: 'προσεύξασθαι', lemma: 'προσεύχομαι', kind: 'aor-mid', use: 'purpose',
    english: 'to pray', wrong: ['while praying', 'because they prayed', 'the praying'], translation: 'Two men went up into the temple to pray',
    note: 'The first aorist middle infinitive: σα + σθαι. δύο and ἱερόν are from earlier chapters.',
  },
  {
    id: 'matt-3-13', ref: 'Matt 3:13', text: 'παραγίνεται ὁ Ἰησοῦς ἀπὸ τῆς Γαλιλαίας ἐπὶ τὸν Ἰορδάνην πρὸς τὸν Ἰωάννην τοῦ βαπτισθῆναι ὑπʼ αὐτοῦ.', word: 'βαπτισθῆναι', lemma: 'βαπτίζω', kind: 'aor-pass', use: 'purpose',
    english: 'to be baptized', wrong: ['to baptize', 'of the baptizing', 'after he was baptized'], translation: 'Jesus came from Galilee to the Jordan to John, to be baptized by him.',
    help: 'παραγίνεται = he comes', note: 'τοῦ + infinitive gives purpose; it is not “of.”',
  },
  {
    id: 'matt-13-3', ref: 'Matt 13:3', text: 'Ἰδοὺ ἐξῆλθεν ὁ σπείρων τοῦ σπείρειν.', word: 'σπείρειν', lemma: 'σπείρω', kind: 'pres-act', use: 'purpose',
    english: 'to sow', wrong: ['of sowing', 'while he sowed', 'the sowing'], translation: 'Look, the sower went out to sow.',
  },
  {
    id: 'luke-19-10', ref: 'Luke 19:10', text: 'ἦλθεν γὰρ ὁ υἱὸς τοῦ ἀνθρώπου ζητῆσαι καὶ σῶσαι τὸ ἀπολωλός.', word: 'σῶσαι', lemma: 'σῴζω', kind: 'aor-act', use: 'purpose',
    english: 'to save', wrong: ['saving', 'after saving', 'so that he saved'], translation: 'For the Son of Man came to seek and to save the lost.', help: 'ζητῆσαι = to seek · τὸ ἀπολωλός = what is lost',
  },
  {
    id: 'rom-8-29', ref: 'Rom 8:29', text: 'εἰς τὸ εἶναι αὐτὸν πρωτότοκον ἐν πολλοῖς ἀδελφοῖς·', word: 'εἶναι', lemma: 'εἰμί', kind: 'pres-act', use: 'purpose',
    english: 'so that he would be', wrong: ['because he was', 'while he was', 'into his being'], translation: 'so that he would be the firstborn among many brothers.', help: 'πρωτότοκος = firstborn',
    note: 'εἰς τό + infinitive: purpose. αὐτόν is the infinitive’s subject, in the accusative.',
  },
  {
    id: '1cor-10-6', ref: '1 Cor 10:6', text: 'Ταῦτα δὲ τύποι ἡμῶν ἐγενήθησαν, εἰς τὸ μὴ εἶναι ἡμᾶς ἐπιθυμητὰς κακῶν', word: 'εἶναι', lemma: 'εἰμί', kind: 'pres-act', use: 'purpose',
    english: 'so that we would not be', wrong: ['because we are not', 'while we were not', 'after we were not'], translation: 'Now these things happened as examples for us, so that we would not desire evil',
    help: 'τύπος = example · ἐπιθυμητής = one who desires', note: 'The infinitive is negated with μή; ἡμᾶς is its subject.',
  },
  // Result.
  {
    id: 'matt-12-22', ref: 'Matt 12:22', text: 'καὶ ἐθεράπευσεν αὐτόν, ὥστε τὸν κωφὸν λαλεῖν καὶ βλέπειν.', word: 'λαλεῖν', lemma: 'λαλέω', kind: 'pres-act', use: 'result',
    english: 'so that he spoke', wrong: ['in order to speak', 'while speaking', 'the one speaking'], translation: 'and he healed him, so that the mute man spoke and saw.',
    help: 'ἐθεράπευσεν = he healed · κωφός = mute', note: 'τὸν κωφόν is the accusative subject of the infinitive.',
  },
  {
    id: 'mark-9-26', ref: 'Mark 9:26', text: 'καὶ ἐγένετο ὡσεὶ νεκρὸς ὥστε τοὺς πολλοὺς λέγειν ὅτι ἀπέθανεν.', word: 'λέγειν', lemma: 'λέγω', kind: 'pres-act', use: 'result',
    english: 'so that they said', wrong: ['in order to say', 'while saying', 'because they said'], translation: 'and he became like a corpse, so that most of them said, “He is dead.”',
  },
  {
    id: 'matt-8-24', ref: 'Matt 8:24', text: 'καὶ ἰδοὺ σεισμὸς μέγας ἐγένετο ἐν τῇ θαλάσσῃ, ὥστε τὸ πλοῖον καλύπτεσθαι ὑπὸ τῶν κυμάτων', word: 'καλύπτεσθαι', lemma: 'καλύπτω', kind: 'pres-mp', use: 'result',
    english: 'so that it was being covered', wrong: ['in order to cover', 'so that it covered', 'while covering'], translation: 'And a great storm arose on the sea, so that the boat was being swamped by the waves',
    help: 'σεισμός = storm · καλύπτω = I cover · κῦμα = wave', note: 'A present passive infinitive: the waves kept covering it.',
  },
  // Time.
  {
    id: 'luke-9-29', ref: 'Luke 9:29', text: 'καὶ ἐγένετο ἐν τῷ προσεύχεσθαι αὐτὸν τὸ εἶδος τοῦ προσώπου αὐτοῦ ἕτερον', word: 'προσεύχεσθαι', lemma: 'προσεύχομαι', kind: 'pres-mp', use: 'time',
    english: 'while he was praying', wrong: ['in order to pray', 'after he prayed', 'because he prayed'], translation: 'And while he was praying, the appearance of his face became different',
    help: 'εἶδος = appearance',
  },
  {
    id: 'matt-13-4', ref: 'Matt 13:4', text: 'καὶ ἐν τῷ σπείρειν αὐτὸν ἃ μὲν ἔπεσεν παρὰ τὴν ὁδόν', word: 'σπείρειν', lemma: 'σπείρω', kind: 'pres-act', use: 'time',
    english: 'as he was sowing', wrong: ['in order to sow', 'because he sowed', 'before he sowed'], translation: 'And as he was sowing, some seeds fell along the path',
  },
  {
    id: 'gal-3-23', ref: 'Gal 3:23', text: 'Πρὸ τοῦ δὲ ἐλθεῖν τὴν πίστιν ὑπὸ νόμον ἐφρουρούμεθα', word: 'ἐλθεῖν', lemma: 'ἔρχομαι', kind: 'aor-act', use: 'time',
    english: 'before … came', wrong: ['after … came', 'while … was coming', 'in order to come'], translation: 'Now before faith came, we were held captive under the law',
    help: 'ἐφρουρούμεθα = we were held in custody', note: 'τὴν πίστιν is the accusative subject of ἐλθεῖν.',
  },
  {
    id: 'john-13-19', ref: 'John 13:19', text: 'ἀπʼ ἄρτι λέγω ὑμῖν πρὸ τοῦ γενέσθαι', word: 'γενέσθαι', lemma: 'γίνομαι', kind: 'aor-mid', use: 'time',
    english: 'before it happens', wrong: ['after it happens', 'so that it happens', 'in order for it to happen'], translation: 'I am telling you this now, before it happens',
  },
  {
    id: 'matt-26-32', ref: 'Matt 26:32', text: 'μετὰ δὲ τὸ ἐγερθῆναί με προάξω ὑμᾶς εἰς τὴν Γαλιλαίαν.', word: 'ἐγερθῆναί', lemma: 'ἐγείρω', kind: 'aor-pass', use: 'time',
    english: 'after I am raised', wrong: ['before I am raised', 'in order to raise me', 'while I am raising'], translation: 'But after I am raised up, I will go before you to Galilee.',
    help: 'προάξω = I will go before', note: 'The second accent on ἐγερθῆναί comes from the enclitic με, its accusative subject.',
  },
  {
    id: 'mark-16-19', ref: 'Mark 16:19', text: 'Ὁ μὲν οὖν κύριος Ἰησοῦς μετὰ τὸ λαλῆσαι αὐτοῖς ἀνελήμφθη εἰς τὸν οὐρανὸν', word: 'λαλῆσαι', lemma: 'λαλέω', kind: 'aor-act', use: 'time',
    english: 'after he had spoken', wrong: ['while he was speaking', 'in order to speak', 'before he spoke'], translation: 'So the Lord Jesus, after he had spoken to them, was taken up into heaven',
    help: 'ἀνελήμφθη = he was taken up',
  },
  // Cause.
  {
    id: 'john-2-24', ref: 'John 2:24', text: 'αὐτὸς δὲ Ἰησοῦς οὐκ ἐπίστευεν αὑτὸν αὐτοῖς διὰ τὸ αὐτὸν γινώσκειν πάντας', word: 'γινώσκειν', lemma: 'γινώσκω', kind: 'pres-act', use: 'cause',
    english: 'because he knew', wrong: ['through knowing', 'in order to know', 'while knowing'], translation: 'But Jesus did not entrust himself to them, because he knew all people',
    help: 'αὑτόν = himself', note: 'διά + τό + infinitive is “because,” not “through.”',
  },
  {
    id: 'mark-4-6', ref: 'Mark 4:6', text: 'καὶ διὰ τὸ μὴ ἔχειν ῥίζαν ἐξηράνθη.', word: 'ἔχειν', lemma: 'ἔχω', kind: 'pres-act', use: 'cause',
    english: 'because it did not have', wrong: ['through not having', 'so that it did not have', 'before it had'], translation: 'and because it had no root, it withered away.',
    help: 'ῥίζα = root · ἐξηράνθη = it withered',
  },
  {
    id: 'luke-9-7', ref: 'Luke 9:7', text: 'καὶ διηπόρει διὰ τὸ λέγεσθαι ὑπό τινων ὅτι Ἰωάννης ἠγέρθη ἐκ νεκρῶν', word: 'λέγεσθαι', lemma: 'λέγω', kind: 'pres-mp', use: 'cause',
    english: 'because it was said', wrong: ['because they said', 'in order to be said', 'while he was saying'], translation: 'and he was perplexed, because it was said by some that John had been raised from the dead',
    help: 'διηπόρει = he was perplexed',
  },
  // Substantival: with the article, a noun.
  {
    id: 'phil-1-21', ref: 'Phil 1:21', text: 'ἐμοὶ γὰρ τὸ ζῆν Χριστὸς καὶ τὸ ἀποθανεῖν κέρδος.', word: 'ζῆν', lemma: 'ζάω', kind: 'pres-act', use: 'substantival',
    english: 'to live (living)', wrong: ['in order to live', 'while living', 'because he lives'], translation: 'For to me, to live is Christ and to die is gain.', help: 'κέρδος = gain',
    note: 'τὸ ζῆν is the subject: “living is Christ.” ζάω contracts to ζῆν.',
  },
  {
    id: 'phil-1-21-apothanein', ref: 'Phil 1:21', text: 'ἐμοὶ γὰρ τὸ ζῆν Χριστὸς καὶ τὸ ἀποθανεῖν κέρδος.', word: 'ἀποθανεῖν', lemma: 'ἀποθνῄσκω', kind: 'aor-act', use: 'substantival',
    english: 'to die (dying)', wrong: ['in order to die', 'after dying', 'so that he died'], translation: 'For to me, to live is Christ and to die is gain.', help: 'κέρδος = gain',
    note: 'A second aorist infinitive (ἀποθαν + εῖν), the subject of the second clause.',
  },
  {
    id: '1cor-14-39', ref: '1 Cor 14:39', text: 'καὶ τὸ λαλεῖν μὴ κωλύετε γλώσσαις·', word: 'λαλεῖν', lemma: 'λαλέω', kind: 'pres-act', use: 'substantival',
    english: 'speaking', wrong: ['in order to speak', 'so that he spoke', 'while speaking'], translation: 'and do not forbid speaking in tongues.', help: 'κωλύετε = forbid',
    note: 'τὸ λαλεῖν is the object of κωλύετε.',
  },
  {
    id: 'matt-15-20', ref: 'Matt 15:20', text: 'τὸ δὲ ἀνίπτοις χερσὶν φαγεῖν οὐ κοινοῖ τὸν ἄνθρωπον.', word: 'φαγεῖν', lemma: 'ἐσθίω', kind: 'aor-act', use: 'substantival',
    english: 'to eat (eating)', wrong: ['in order to eat', 'after eating', 'so that he ate'], translation: 'but to eat with unwashed hands does not defile a person.',
    help: 'ἄνιπτος = unwashed · κοινοῖ = it defiles', note: 'τό … φαγεῖν is the subject of κοινοῖ, with words in between.',
  },
]

export const chapter32: Chapter = {
  number: 32,
  title: 'Infinitive',
  short: 'Infinitive',
  topics: ['infinitive'],
  vocab: [
    { id: 'dikaios', lemma: 'δίκαιος', lexical: 'δίκαιος, -αία, -αιον', pos: 'adjective', gloss: 'right, just, righteous', hook: 'The adjective of δικαιοσύνη, “righteousness.”', accept: ['right', 'just', 'righteous', 'upright'] },
    { id: 'mello', lemma: 'μέλλω', pos: 'verb', gloss: 'I am about to', hook: 'It takes an infinitive: μέλλει ἔρχεσθαι, “he is about to come.”', accept: ['i am about to', 'am about to', 'about to', 'i intend', 'intend', 'be about to'] },
  ],
  paradigms: [],
  infinitives: { verbs: VERBS, items: ITEMS },
}

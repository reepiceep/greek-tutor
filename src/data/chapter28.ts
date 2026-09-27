import type { Chapter, ParticipleVerb, ParticipleVerse } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 28: Adverbial Participles (Aorist).
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.

/**
 * First aorists keep the accent on the stem (λύσ → λύσας, λῦσαν); second aorists put it on the ending (λαβών), so their
 * stems are unaccented. `passiveStem` is the aorist passive stem, before ε + ντ (λυθ → λυθείς).
 */
const VERBS: ParticipleVerb[] = [
  { id: 'lyo', lemma: 'λύω', tense: 'aorist', stem: 'λύσ', passiveStem: 'λυθ', long: true, voices: ['active', 'middle', 'passive'], ing: 'having loosed', pp: 'loosed' },
  { id: 'akouo', lemma: 'ἀκούω', tense: 'aorist', stem: 'ἀκούσ', voices: ['active'], ing: 'having heard' },
  { id: 'pisteuo', lemma: 'πιστεύω', tense: 'aorist', stem: 'πιστεύσ', voices: ['active'], ing: 'having believed' },
  { id: 'kaleo', lemma: 'καλέω', tense: 'aorist', stem: 'καλέσ', passiveStem: 'κληθ', voices: ['active', 'passive'], ing: 'having called', pp: 'called' },
  { id: 'poieo', lemma: 'ποιέω', tense: 'aorist', stem: 'ποιήσ', voices: ['active'], ing: 'having done' },
  { id: 'baptizo', lemma: 'βαπτίζω', tense: 'aorist', stem: 'βαπτίσ', passiveStem: 'βαπτισθ', voices: ['active', 'passive'], ing: 'having baptized', pp: 'baptized' },
  // Liquid aorists: no σ, and the stem vowel lengthens (*σπερ → σπείρ, *στελ → στείλ).
  { id: 'speiro', lemma: 'σπείρω', tense: 'aorist', stem: 'σπείρ', passiveStem: 'σπαρ', voices: ['active', 'passive'], ing: 'having sown', pp: 'sown' },
  { id: 'apostello', lemma: 'ἀποστέλλω', tense: 'aorist', stem: 'ἀποστείλ', voices: ['active'], ing: 'having sent' },
  { id: 'aspazomai', lemma: 'ἀσπάζομαι', tense: 'aorist', stem: 'ἀσπάσ', voices: ['middle'], middleOnly: true, ing: 'having greeted' },
  // Second aorists.
  { id: 'lambano', lemma: 'λαμβάνω', tense: 'aorist', second: true, stem: 'λαβ', voices: ['active'], ing: 'having taken' },
  { id: 'erchomai', lemma: 'ἔρχομαι', tense: 'aorist', second: true, stem: 'ἐλθ', voices: ['active'], ing: 'having come' },
  { id: 'exerchomai', lemma: 'ἐξέρχομαι', tense: 'aorist', second: true, stem: 'ἐξελθ', voices: ['active'], ing: 'having gone out' },
  { id: 'aperchomai', lemma: 'ἀπέρχομαι', tense: 'aorist', second: true, stem: 'ἀπελθ', voices: ['active'], ing: 'having gone away' },
  { id: 'proserchomai', lemma: 'προσέρχομαι', tense: 'aorist', second: true, stem: 'προσελθ', voices: ['active'], ing: 'having come to' },
  { id: 'lego', lemma: 'λέγω', tense: 'aorist', second: true, stem: 'εἰπ', voices: ['active'], ing: 'having said' },
  { id: 'horao', lemma: 'ὁράω', tense: 'aorist', second: true, stem: 'ἰδ', voices: ['active'], ing: 'having seen' },
  { id: 'heurisko', lemma: 'εὑρίσκω', tense: 'aorist', second: true, stem: 'εὑρ', voices: ['active'], ing: 'having found' },
  { id: 'ginomai', lemma: 'γίνομαι', tense: 'aorist', second: true, stem: 'γεν', voices: ['middle'], middleOnly: true, ing: 'having become' },
  // Passive in form, active in meaning.
  { id: 'apokrinomai', lemma: 'ἀποκρίνομαι', tense: 'aorist', stem: 'ἀποκρίν', passiveStem: 'ἀποκριθ', voices: ['passive'], middleOnly: true, ing: 'having answered' },
  { id: 'poreuomai', lemma: 'πορεύομαι', tense: 'aorist', stem: 'πορεύ', passiveStem: 'πορευθ', voices: ['passive'], middleOnly: true, ing: 'having gone' },
  { id: 'egeiro', lemma: 'ἐγείρω', tense: 'aorist', stem: 'ἐγείρ', passiveStem: 'ἐγερθ', voices: ['active', 'passive'], ing: 'having raised', pp: 'raised' },
]

const VERSES: ParticipleVerse[] = [
  // First aorist active.
  {
    id: 'matt-2-3', ref: 'Matt 2:3', text: 'ἀκούσας δὲ ὁ βασιλεὺς Ἡρῴδης ἐταράχθη', word: 'ἀκούσας', lemma: 'ἀκούω', tense: 'aorist', voice: 'active',
    case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ βασιλεὺς Ἡρῴδης',
    translation: 'When King Herod heard this, he was troubled', help: 'ἐταράχθη = he was troubled',
    note: 'An aorist participle usually happened before the main verb: first he heard, then he was troubled.',
    wrong: ['While King Herod was troubled, they heard him', 'After King Herod had been heard, he was troubled'],
  },
  {
    id: 'matt-2-7', ref: 'Matt 2:7', text: 'Τότε Ἡρῴδης λάθρᾳ καλέσας τοὺς μάγους ἠκρίβωσεν παρʼ αὐτῶν τὸν χρόνον',
    word: 'καλέσας', lemma: 'καλέω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'Ἡρῴδης',
    translation: 'Then Herod secretly called the wise men and found out from them the time', help: 'λάθρᾳ = secretly · μάγος = wise man · ἠκρίβωσεν = he found out exactly',
    note: 'An aorist participle before the main verb is often best translated as a second main verb joined by “and.”',
    wrong: ['Then Herod, after the wise men had secretly called him, found out the time from them', 'Then Herod found out the time from the wise men who were secretly calling him'],
  },
  {
    id: 'acts-2-24', ref: 'Acts 2:24', text: 'ὃν ὁ θεὸς ἀνέστησεν λύσας τὰς ὠδῖνας τοῦ θανάτου',
    word: 'λύσας', lemma: 'λύω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ θεός',
    translation: 'whom God raised up, having loosed the pangs of death', help: 'ἀνέστησεν = he raised up · ὠδίν = pain, pang',
    note: 'λύσας is λυ + σα + ντ + ς: the ντ drops before ς and the α lengthens.',
    wrong: ['whom God raised up while the pangs of death were being loosed', 'whom God raised up after he had been loosed from the pangs of death'],
  },
  {
    id: 'matt-13-24', ref: 'Matt 13:24', text: 'Ὡμοιώθη ἡ βασιλεία τῶν οὐρανῶν ἀνθρώπῳ σπείραντι καλὸν σπέρμα ἐν τῷ ἀγρῷ αὐτοῦ.',
    word: 'σπείραντι', lemma: 'σπείρω', tense: 'aorist', voice: 'active', case: 'dative', number: 'sg', gender: 'masculine', agrees: 'ἀνθρώπῳ',
    translation: 'The kingdom of heaven is like a man who sowed good seed in his field.', help: 'ὡμοιώθη = has become like · σπέρμα = seed · ἀγρός = field',
    note: 'A liquid aorist: no σ, just α + ντ. It is dative because it describes ἀνθρώπῳ. σπείρω is from this chapter’s vocabulary.',
    wrong: ['The kingdom of heaven is like a man, and he will sow good seed in his field.', 'The kingdom of heaven, having sown good seed in his field, is like a man.'],
  },
  {
    id: 'mark-6-27', ref: 'Mark 6:27', text: 'καὶ εὐθὺς ἀποστείλας ὁ βασιλεὺς σπεκουλάτορα ἐπέταξεν ἐνέγκαι τὴν κεφαλὴν αὐτοῦ.',
    word: 'ἀποστείλας', lemma: 'ἀποστέλλω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ βασιλεύς',
    translation: 'And immediately the king sent an executioner and ordered him to bring his head.', help: 'σπεκουλάτωρ = executioner · ἐπέταξεν = he ordered · ἐνέγκαι = to bring',
    note: 'A liquid aorist: *στελ lengthens to στειλ, with no σ.',
  },
  {
    id: 'matt-27-50', ref: 'Matt 27:50', text: 'ὁ δὲ Ἰησοῦς πάλιν κράξας φωνῇ μεγάλῃ ἀφῆκεν τὸ πνεῦμα.',
    word: 'κράξας', lemma: 'κράζω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'And Jesus cried out again with a loud voice and gave up his spirit.', help: 'ἀφῆκεν = he gave up',
    note: 'κράζω is from this chapter’s vocabulary; its stem is κραγ, so γ + σ → ξ.',
    wrong: ['And while Jesus was crying out with a loud voice, the spirit left him.', 'And Jesus was cried out to with a loud voice and gave up his spirit.'],
  },
  {
    id: 'acts-7-57', ref: 'Acts 7:57', text: 'κράξαντες δὲ φωνῇ μεγάλῃ συνέσχον τὰ ὦτα αὐτῶν',
    word: 'κράξαντες', lemma: 'κράζω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'they (in συνέσχον)',
    translation: 'But they cried out with a loud voice and stopped their ears', help: 'συνέσχον = they stopped, covered · οὖς, ὠτός = ear',
  },
  // Second aorist active: no σ, accent on the ending.
  {
    id: 'matt-2-10', ref: 'Matt 2:10', text: 'ἰδόντες δὲ τὸν ἀστέρα ἐχάρησαν χαρὰν μεγάλην σφόδρα.',
    word: 'ἰδόντες', lemma: 'ὁράω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', agrees: 'they (in ἐχάρησαν)',
    translation: 'When they saw the star, they rejoiced with exceedingly great joy.', help: 'ἀστήρ = star · ἐχάρησαν = they rejoiced · σφόδρα = exceedingly',
    note: 'ἰδ- is the second aorist stem of ὁράω (εἶδον); with no augment it is just ἰδ.',
    wrong: ['While they were seeing the star, they rejoiced with exceedingly great joy.', 'When the star saw them, it rejoiced with exceedingly great joy.'],
  },
  {
    id: 'matt-2-23', ref: 'Matt 2:23', text: 'καὶ ἐλθὼν κατῴκησεν εἰς πόλιν λεγομένην Ναζαρέτ',
    word: 'ἐλθὼν', lemma: 'ἔρχομαι', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, Joseph (in κατῴκησεν)',
    translation: 'And he went and settled in a town called Nazareth', help: 'κατῴκησεν = he settled',
    note: 'ἔρχομαι is middle-only in the present, but its second aorist ἦλθον is active: ἐλθών. λεγομένην is a present passive participle, “called.”',
    wrong: ['And while he was coming, he settled in a town called Nazareth', 'And he settled in a town that had come to be called Nazareth'],
  },
  {
    id: 'matt-13-1', ref: 'Matt 13:1', text: 'Ἐν τῇ ἡμέρᾳ ἐκείνῃ ἐξελθὼν ὁ Ἰησοῦς τῆς οἰκίας ἐκάθητο παρὰ τὴν θάλασσαν·',
    word: 'ἐξελθὼν', lemma: 'ἐξέρχομαι', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'On that day Jesus went out of the house and was sitting beside the sea.', help: 'ἐκάθητο = he was sitting (κάθημαι)',
    wrong: ['On that day, while Jesus was going out of the house, he sat beside the sea.', 'On that day Jesus was sitting beside the sea when they went out of the house.'],
  },
  {
    id: 'matt-13-46', ref: 'Matt 13:46', text: 'εὑρὼν δὲ ἕνα πολύτιμον μαργαρίτην ἀπελθὼν πέπρακεν πάντα ὅσα εἶχεν καὶ ἠγόρασεν αὐτόν.',
    word: 'εὑρὼν', lemma: 'εὑρίσκω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, the merchant (in πέπρακεν)',
    translation: 'And having found one very valuable pearl, he went away and sold all that he had and bought it.',
    help: 'πολύτιμος = very valuable · μαργαρίτης = pearl · πέπρακεν = he sold · ἠγόρασεν = he bought',
    note: 'Two aorist participles, εὑρών and ἀπελθών, both before the main verb πέπρακεν.',
  },
  {
    id: 'matt-13-46-aperchomai', ref: 'Matt 13:46', text: 'εὑρὼν δὲ ἕνα πολύτιμον μαργαρίτην ἀπελθὼν πέπρακεν πάντα ὅσα εἶχεν καὶ ἠγόρασεν αὐτόν.',
    word: 'ἀπελθὼν', lemma: 'ἀπέρχομαι', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, the merchant (in πέπρακεν)',
    translation: 'And having found one very valuable pearl, he went away and sold all that he had and bought it.',
    help: 'πολύτιμος = very valuable · μαργαρίτης = pearl · πέπρακεν = he sold · ἠγόρασεν = he bought',
  },
  {
    id: 'matt-9-20', ref: 'Matt 9:20', text: 'Καὶ ἰδοὺ γυνὴ αἱμορροοῦσα δώδεκα ἔτη προσελθοῦσα ὄπισθεν ἥψατο τοῦ κρασπέδου τοῦ ἱματίου αὐτοῦ·',
    word: 'προσελθοῦσα', lemma: 'προσέρχομαι', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'γυνή',
    translation: 'And behold, a woman who had suffered from bleeding for twelve years came up behind him and touched the edge of his garment.',
    help: 'αἱμορροοῦσα = suffering from bleeding · ὄπισθεν = from behind · ἥψατο = she touched · κράσπεδον = edge',
    note: 'αἱμορροοῦσα is a present participle (a contract verb): her bleeding was ongoing. προσελθοῦσα is aorist: she came up, then touched.',
    wrong: [
      'And behold, a woman came up behind him and touched the edge of his garment, and she was healed after twelve years.',
      'And behold, while a woman was bleeding, he came up behind her and touched the edge of her garment.',
    ],
  },
  {
    id: 'matt-25-1', ref: 'Matt 25:1', text: 'αἵτινες λαβοῦσαι τὰς λαμπάδας ἑαυτῶν ἐξῆλθον εἰς ὑπάντησιν τοῦ νυμφίου.',
    word: 'λαβοῦσαι', lemma: 'λαμβάνω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'feminine', agrees: 'αἵτινες (the ten virgins)',
    translation: 'who took their lamps and went out to meet the bridegroom.', help: 'λαμπάς = lamp · ὑπάντησις = meeting · νυμφίος = bridegroom',
    note: 'Feminine plural, to agree with the virgins.',
    wrong: ['who went out to meet the bridegroom, who was taking their lamps.', 'who were taking their lamps while the bridegroom went out to meet them.'],
  },
  {
    id: 'luke-15-9', ref: 'Luke 15:9', text: 'καὶ εὑροῦσα συγκαλεῖ τὰς φίλας καὶ γείτονας',
    word: 'εὑροῦσα', lemma: 'εὑρίσκω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'she (in συγκαλεῖ)',
    translation: 'And when she has found it, she calls together her friends and neighbors', help: 'συγκαλεῖ = she calls together · φίλη = friend · γείτων = neighbor',
    note: 'The aorist participle happens before the main verb, even when the main verb is present.',
  },
  {
    id: 'john-11-28', ref: 'John 11:28', text: 'Καὶ τοῦτο εἰποῦσα ἀπῆλθεν καὶ ἐφώνησεν Μαριὰμ τὴν ἀδελφὴν αὐτῆς',
    word: 'εἰποῦσα', lemma: 'λέγω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'she, Martha (in ἀπῆλθεν)',
    translation: 'And when she had said this, she went away and called her sister Mary', help: 'ἐφώνησεν = she called',
    note: 'εἰπ- is the second aorist stem of λέγω (εἶπον).',
    wrong: ['And while she was saying this, Mary went away and called her sister', 'And after this had been said to her, she went away and called her sister Mary'],
  },
  {
    id: 'matt-26-71', ref: 'Matt 26:71', text: 'ἐξελθόντα δὲ εἰς τὸν πυλῶνα εἶδεν αὐτὸν ἄλλη',
    word: 'ἐξελθόντα', lemma: 'ἐξέρχομαι', tense: 'aorist', voice: 'active', case: 'accusative', number: 'sg', gender: 'masculine', agrees: 'αὐτόν (Peter)',
    translation: 'And when he had gone out to the gateway, another servant girl saw him', help: 'πυλών = gateway · ἄλλη = another (woman)',
    note: 'Accusative because it describes αὐτόν, the one who was seen, not ἄλλη, who saw him.',
    wrong: ['And when she had gone out to the gateway, another servant girl saw him', 'And another servant girl, going out to the gateway, saw him'],
  },
  {
    id: 'luke-9-59', ref: 'Luke 9:59', text: 'Κύριε, ἐπίτρεψόν μοι ἀπελθόντι πρῶτον θάψαι τὸν πατέρα μου.',
    word: 'ἀπελθόντι', lemma: 'ἀπέρχομαι', tense: 'aorist', voice: 'active', case: 'dative', number: 'sg', gender: 'masculine', agrees: 'μοι',
    translation: 'Lord, let me first go and bury my father.', help: 'ἐπίτρεψον = allow! · θάψαι = to bury',
    note: 'Dative because it describes μοι.',
  },
  // Aorist middle.
  {
    id: 'mark-6-26', ref: 'Mark 6:26', text: 'καὶ περίλυπος γενόμενος ὁ βασιλεὺς διὰ τοὺς ὅρκους καὶ τοὺς ἀνακειμένους οὐκ ἠθέλησεν ἀθετῆσαι αὐτήν·',
    word: 'γενόμενος', lemma: 'γίνομαι', tense: 'aorist', voice: 'middle', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ βασιλεύς',
    translation: 'And though the king became very sorry, because of his oaths and his guests he did not want to refuse her.',
    help: 'περίλυπος = very sad · ὅρκος = oath · ἀνακείμενος = guest · ἀθετῆσαι = to refuse',
    note: 'A second aorist middle: γεν + ο + μενο/η. γίνομαι is middle-only, so the meaning is active.',
    wrong: [
      'And while the king was becoming very sorry, his oaths and his guests did not want to refuse her.',
      'And the king, having made his guests very sorry because of his oaths, did not want to refuse her.',
    ],
  },
  {
    id: 'acts-18-22', ref: 'Acts 18:22', text: 'ἀναβὰς καὶ ἀσπασάμενος τὴν ἐκκλησίαν, κατέβη εἰς Ἀντιόχειαν',
    word: 'ἀσπασάμενος', lemma: 'ἀσπάζομαι', tense: 'aorist', voice: 'middle', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'he, Paul (in κατέβη)',
    translation: 'He went up and greeted the church, and then went down to Antioch', help: 'ἀναβάς = having gone up · κατέβη = he went down',
    note: 'A first aorist middle: ἀσπασ + α + μενο/η. ἀσπάζομαι is from this chapter’s vocabulary.',
    wrong: ['He went up, and the church greeted him, and then he went down to Antioch', 'While he was greeting the church, he went up and down to Antioch'],
  },
  // Aorist passive: θε + ντ.
  {
    id: 'matt-3-15', ref: 'Matt 3:15', text: 'ἀποκριθεὶς δὲ ὁ Ἰησοῦς εἶπεν πρὸς αὐτόν·',
    word: 'ἀποκριθεὶς', lemma: 'ἀποκρίνομαι', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰησοῦς',
    translation: 'But Jesus answered him,',
    note: 'ἀποκριθεὶς … εἶπεν, “answering, he said,” is so common that it is simply translated “he answered.” Passive in form, active in meaning.',
    wrong: ['But Jesus, having been answered, said to him,', 'But they answered Jesus and said to him,'],
  },
  {
    id: 'luke-1-60', ref: 'Luke 1:60', text: 'καὶ ἀποκριθεῖσα ἡ μήτηρ αὐτοῦ εἶπεν· Οὐχί, ἀλλὰ κληθήσεται Ἰωάννης.',
    word: 'ἀποκριθεῖσα', lemma: 'ἀποκρίνομαι', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'ἡ μήτηρ',
    translation: 'But his mother answered, “No, he will be called John.”', help: 'κληθήσεται = he will be called',
    note: 'The feminine of ἀποκριθείς, for his mother. οὐχί is from this chapter’s vocabulary.',
  },
  {
    id: 'acts-19-15', ref: 'Acts 19:15', text: 'ἀποκριθὲν δὲ τὸ πνεῦμα τὸ πονηρὸν εἶπεν αὐτοῖς·',
    word: 'ἀποκριθὲν', lemma: 'ἀποκρίνομαι', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'neuter', agrees: 'τὸ πνεῦμα τὸ πονηρόν',
    translation: 'But the evil spirit answered them,', note: 'Neuter, because πνεῦμα is.',
    wrong: ['But they answered the evil spirit,', 'But the evil spirit, having been answered, said to them,'],
  },
  {
    id: 'matt-1-24', ref: 'Matt 1:24', text: 'ἐγερθεὶς δὲ ὁ Ἰωσὴφ ἀπὸ τοῦ ὕπνου ἐποίησεν ὡς προσέταξεν αὐτῷ ὁ ἄγγελος κυρίου',
    word: 'ἐγερθεὶς', lemma: 'ἐγείρω', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'masculine', agrees: 'ὁ Ἰωσήφ',
    translation: 'When Joseph woke from sleep, he did as the angel of the Lord had commanded him', help: 'ὕπνος = sleep · προσέταξεν = he commanded',
    note: 'Literally “having been raised from sleep”: the passive of ἐγείρω often means “get up, wake.”',
    wrong: ['While Joseph was raising him from sleep, he did as the angel of the Lord had commanded him', 'When Joseph had raised the angel from sleep, he did as he had commanded him'],
  },
  {
    id: 'mark-16-10', ref: 'Mark 16:10', text: 'ἐκείνη πορευθεῖσα ἀπήγγειλεν τοῖς μετʼ αὐτοῦ γενομένοις',
    word: 'πορευθεῖσα', lemma: 'πορεύομαι', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'feminine', agrees: 'ἐκείνη',
    translation: 'She went and told those who had been with him', help: 'ἀπήγγειλεν = she told',
    note: 'πορεύομαι has a passive-looking aorist with an active meaning. τοῖς … γενομένοις is an aorist participle with the article: “those who had been” (chapter 29).',
  },
]

export const chapter28: Chapter = {
  number: 28,
  title: 'Adverbial Participles (Aorist)',
  short: 'Aorist participles',
  topics: ['ptcAorist'],
  vocab: [
    { id: 'aspazomai', lemma: 'ἀσπάζομαι', pos: 'verb', gloss: 'I greet, salute', hook: 'Paul’s letters end with it: ἀσπάσασθε, “greet!”', accept: ['i greet', 'greet', 'i salute', 'salute', 'welcome'] },
    { id: 'grammateus', lemma: 'γραμματεύς', lexical: 'γραμματεύς, -έως, ὁ', pos: 'noun', gloss: 'scribe', hook: 'Grammar: a scribe’s trade was letters (γράμμα).', accept: ['scribe', 'scribes', 'teacher of the law', 'secretary'] },
    { id: 'ephe', lemma: 'ἔφη', pos: 'verb', gloss: 'he/she/it was saying, said', hook: 'The 3rd singular of φημί, imperfect or second aorist; this one form occurs 43 times.', accept: ['he said', 'said', 'she said', 'it said', 'he was saying', 'was saying', 'says'] },
    { id: 'hieron', lemma: 'ἱερόν', lexical: 'ἱερόν, -οῦ, τό', pos: 'noun', gloss: 'temple', hook: 'ἱερός “holy”: hieroglyphics are “sacred carvings.”', accept: ['temple', 'temple courts', 'sanctuary'] },
    { id: 'krazo', lemma: 'κράζω', pos: 'verb', gloss: 'I cry out, call out', hook: 'Its stem is κραγ, not a dental: ἔκραξα, κέκραγα.', accept: ['i cry out', 'cry out', 'i call out', 'call out', 'shout', 'i shout', 'cry'] },
    { id: 'ouchi', lemma: 'οὐχί', pos: 'adverb', gloss: 'not', hook: 'A strengthened οὐ; in a question it expects “yes.”', accept: ['not', 'no'] },
    { id: 'paidion', lemma: 'παιδίον', lexical: 'παιδίον, -ου, τό', pos: 'noun', gloss: 'child, infant', hook: 'Pediatrics, pedagogy.', accept: ['child', 'infant', 'little child', 'baby'] },
    { id: 'speiro', lemma: 'σπείρω', pos: 'verb', gloss: 'I sow', hook: 'Its liquid aorist is ἔσπειρα; the noun is σπέρμα, “seed.”', accept: ['i sow', 'sow', 'plant'] },
  ],
  paradigms: [],
  participles: { verbs: VERBS, verses: VERSES },
}

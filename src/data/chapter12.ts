import { preposition } from './prepositions'
import type { AutosItem, Chapter, DeclensionParadigm } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 12: αὐτός.
// Verse excerpts are from the SBLGNT (CC BY 4.0); translations and practice phrases are written for this app.

const AUTOS: DeclensionParadigm = {
  id: 'autos', lemma: 'αὐτός', lexical: 'αὐτός, -ή, -ό', gloss: 'he, she, it; -self; same', pattern: '2-1-2',
  forms: {
    masculine: { sg: ['αὐτός', 'αὐτοῦ', 'αὐτῷ', 'αὐτόν'], pl: ['αὐτοί', 'αὐτῶν', 'αὐτοῖς', 'αὐτούς'] },
    feminine: { sg: ['αὐτή', 'αὐτῆς', 'αὐτῇ', 'αὐτήν'], pl: ['αὐταί', 'αὐτῶν', 'αὐταῖς', 'αὐτάς'] },
    neuter: { sg: ['αὐτό', 'αὐτοῦ', 'αὐτῷ', 'αὐτό'], pl: ['αὐτά', 'αὐτῶν', 'αὐτοῖς', 'αὐτά'] },
  },
}

const AION: DeclensionParadigm = {
  id: 'aion', lemma: 'αἰών', lexical: 'αἰών, -ῶνος, ὁ', gloss: 'age, eternity', pattern: 'noun',
  forms: { masculine: { sg: ['αἰών', 'αἰῶνος', 'αἰῶνι', 'αἰῶνα'], pl: ['αἰῶνες', 'αἰώνων', 'αἰῶσι(ν)', 'αἰῶνας'] } },
}

const POUS: DeclensionParadigm = {
  id: 'pous', lemma: 'πούς', lexical: 'πούς, ποδός, ὁ', gloss: 'foot', pattern: 'noun',
  forms: { masculine: { sg: ['πούς', 'ποδός', 'ποδί', 'πόδα'], pl: ['πόδες', 'ποδῶν', 'ποσί(ν)', 'πόδας'] } },
}

const MEDEIS: DeclensionParadigm = {
  id: 'medeis', lemma: 'μηδείς', lexical: 'μηδείς, μηδεμία, μηδέν', gloss: 'no one, nothing', pattern: '3-1-3',
  forms: {
    masculine: { sg: ['μηδείς', 'μηδενός', 'μηδενί', 'μηδένα'] },
    feminine: { sg: ['μηδεμία', 'μηδεμιᾶς', 'μηδεμιᾷ', 'μηδεμίαν'] },
    neuter: { sg: ['μηδέν', 'μηδενός', 'μηδενί', 'μηδέν'] },
  },
}

const PRONOUN_WRONG = ['himself', 'the same']

const ITEMS: AutosItem[] = [
  // Personal pronoun
  {
    id: 'john-1-3', ref: 'John 1:3', text: 'πάντα διʼ αὐτοῦ ἐγένετο,', word: 'αὐτοῦ', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'his'], translation: 'All things came into being through him,',
    note: 'αὐτοῦ refers back to ὁ λόγος (the Word): masculine singular, “him.”',
  },
  {
    id: 'john-1-4', ref: 'John 1:4', text: 'ἐν αὐτῷ ζωὴ ἦν,', word: 'αὐτῷ', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'them'], translation: 'In him was life,',
  },
  {
    id: 'john-1-5', ref: 'John 1:5', text: 'καὶ ἡ σκοτία αὐτὸ οὐ κατέλαβεν.', word: 'αὐτὸ', use: 'pronoun',
    english: 'it', wrong: ['itself', 'the same', 'him'], translation: 'and the darkness did not overcome it.',
    help: 'σκοτία = darkness · κατέλαβεν = overcame', note: 'Neuter αὐτό agrees with τὸ φῶς (the light) in the verse before: “it.”',
  },
  {
    id: 'john-1-11', ref: 'John 1:11', text: 'καὶ οἱ ἴδιοι αὐτὸν οὐ παρέλαβον.', word: 'αὐτὸν', use: 'pronoun',
    english: 'him', wrong: [...PRONOUN_WRONG, 'them'], translation: 'and his own people did not receive him.',
    help: 'ἴδιοι = his own (people) · παρέλαβον = they received',
  },
  {
    id: 'john-1-12', ref: 'John 1:12', text: 'ὅσοι δὲ ἔλαβον αὐτόν, ἔδωκεν αὐτοῖς ἐξουσίαν', word: 'αὐτοῖς', use: 'pronoun',
    english: 'to them', wrong: ['to him', 'themselves', 'the same'], translation: 'But as many as received him, he gave to them authority',
    help: 'ὅσοι = as many as · ἔλαβον = received · ἔδωκεν = he gave · ἐξουσία = authority',
  },
  {
    id: 'matt-1-21a', ref: 'Matt 1:21', text: 'καὶ καλέσεις τὸ ὄνομα αὐτοῦ Ἰησοῦν,', word: 'αὐτοῦ', use: 'pronoun',
    english: 'his', wrong: [...PRONOUN_WRONG, 'their'], translation: 'and you will call his name Jesus,',
    help: 'καλέσεις = you will call', note: 'The genitive of αὐτός often shows possession: “his.”',
  },
  {
    id: 'matt-1-21b', ref: 'Matt 1:21', text: 'σώσει τὸν λαὸν αὐτοῦ ἀπὸ τῶν ἁμαρτιῶν αὐτῶν.', word: 'αὐτῶν', use: 'pronoun',
    english: 'their', wrong: ['his', 'themselves', 'the same'], translation: 'he will save his people from their sins.',
    help: 'σώσει = he will save · λαός = people · ἁμαρτία = sin', note: 'Plural αὐτῶν refers back to the people: “their.”',
  },
  {
    id: 'matt-5-1', ref: 'Matt 5:1', text: 'προσῆλθαν αὐτῷ οἱ μαθηταὶ αὐτοῦ·', word: 'αὐτῷ', use: 'pronoun',
    english: 'to him', wrong: ['to them', 'himself', 'the same'], translation: 'his disciples came to him.',
    help: 'προσῆλθαν = came to',
  },
  {
    id: 'luke-2-7', ref: 'Luke 2:7', text: 'καὶ ἔτεκεν τὸν υἱὸν αὐτῆς τὸν πρωτότοκον,', word: 'αὐτῆς', use: 'pronoun',
    english: 'her', wrong: ['his', 'herself', 'the same'], translation: 'and she gave birth to her firstborn son,',
    help: 'ἔτεκεν = she gave birth to · πρωτότοκος = firstborn',
  },
  {
    id: 'john-14-21', ref: 'John 14:21', text: 'ὁ ἔχων τὰς ἐντολάς μου καὶ τηρῶν αὐτὰς', word: 'αὐτὰς', use: 'pronoun',
    english: 'them', wrong: ['her', 'themselves', 'the same'], translation: 'the one who has my commandments and keeps them',
    help: 'ἔχων = having · τηρῶν = keeping', note: 'Feminine plural because it refers to τὰς ἐντολάς. English uses “them” whatever the gender.',
  },
  {
    id: 'practice-1', text: 'λέγω αὐτῷ', word: 'αὐτῷ', use: 'pronoun',
    english: 'to him', wrong: ['himself', 'to them', 'the same'], translation: 'I say to him',
  },
  // Intensive
  {
    id: '1thess-4-16', ref: '1 Thess 4:16', text: 'αὐτὸς ὁ κύριος', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the Lord himself',
  },
  {
    id: 'rom-8-16', ref: 'Rom 8:16', text: 'αὐτὸ τὸ πνεῦμα συμμαρτυρεῖ τῷ πνεύματι ἡμῶν', word: 'αὐτὸ', use: 'intensive',
    english: 'himself', wrong: ['the same', 'it', 'him'], translation: 'the Spirit himself bears witness with our spirit',
    help: 'συμμαρτυρεῖ = bears witness with',
    note: 'αὐτό is neuter to agree with πνεῦμα. Translations usually say “the Spirit himself” because the Spirit is a person.',
  },
  {
    id: 'john-16-27', ref: 'John 16:27', text: 'αὐτὸς γὰρ ὁ πατὴρ φιλεῖ ὑμᾶς,', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'for the Father himself loves you,', help: 'φιλεῖ = loves',
  },
  {
    id: 'mark-12-36', ref: 'Mark 12:36', text: 'αὐτὸς Δαυὶδ εἶπεν ἐν τῷ πνεύματι τῷ ἁγίῳ·', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'David himself said by the Holy Spirit,',
  },
  {
    id: 'luke-24-15', ref: 'Luke 24:15', text: 'καὶ αὐτὸς Ἰησοῦς ἐγγίσας συνεπορεύετο αὐτοῖς,', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'Jesus himself drew near and went with them,',
    help: 'ἐγγίσας = drawing near · συνεπορεύετο = went with',
  },
  {
    id: 'practice-2', text: 'ὁ ἀπόστολος αὐτός', word: 'αὐτός', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the apostle himself',
  },
  {
    id: 'practice-3', text: 'αὐτὸς ὁ ἀπόστολος', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'the apostle himself',
  },
  // Identical
  {
    id: '1cor-12-4', ref: '1 Cor 12:4', text: 'τὸ δὲ αὐτὸ πνεῦμα·', word: 'αὐτὸ', use: 'identical',
    english: 'the same', wrong: ['itself', 'it', 'himself'], translation: 'but the same Spirit',
    note: 'δέ always comes second in its clause, so it can sit between the article and αὐτό; τὸ … αὐτό still go together.',
  },
  {
    id: '1cor-12-5', ref: '1 Cor 12:5', text: 'καὶ ὁ αὐτὸς κύριος·', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'and the same Lord',
  },
  {
    id: '1cor-12-6', ref: '1 Cor 12:6', text: 'ὁ δὲ αὐτὸς θεός,', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'but the same God',
  },
  {
    id: 'heb-13-8', ref: 'Heb 13:8', text: 'Ἰησοῦς Χριστὸς ἐχθὲς καὶ σήμερον ὁ αὐτός, καὶ εἰς τοὺς αἰῶνας.', word: 'αὐτός', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'Jesus Christ is the same yesterday and today and forever.',
    help: 'ἐχθές = yesterday · σήμερον = today', note: 'ὁ αὐτός with no noun means “the same (one).” εἰς τοὺς αἰῶνας = “forever.”',
  },
  {
    id: 'rom-10-12', ref: 'Rom 10:12', text: 'ὁ γὰρ αὐτὸς κύριος πάντων,', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'for the same Lord is Lord of all,',
  },
  {
    id: 'mark-14-39', ref: 'Mark 14:39', text: 'τὸν αὐτὸν λόγον εἰπών.', word: 'αὐτὸν', use: 'identical',
    english: 'the same', wrong: ['himself', 'him', 'his'], translation: 'saying the same word.', help: 'εἰπών = saying',
  },
  {
    id: 'phil-2-2', ref: 'Phil 2:2', text: 'ἵνα τὸ αὐτὸ φρονῆτε,', word: 'αὐτὸ', use: 'identical',
    english: 'the same (thing)', wrong: ['itself', 'it', 'himself'], translation: 'so that you think the same thing,',
    help: 'φρονῆτε = you think', note: 'Neuter with the article and no noun: “the same thing.”',
  },
  {
    id: 'practice-4', text: 'ὁ αὐτὸς ἀπόστολος', word: 'αὐτὸς', use: 'identical',
    english: 'the same', wrong: ['himself', 'he', 'him'], translation: 'the same apostle',
  },
  {
    id: 'practice-5', text: 'τὴν αὐτὴν ἐντολήν', word: 'αὐτὴν', use: 'identical',
    english: 'the same', wrong: ['herself', 'her', 'it'], translation: 'the same commandment',
  },
]

// Longer verses from Mounce's workbook (Exercise 12) and Merkle & Plummer ch. 9, read in three steps.
const READINGS: AutosItem[] = [
  {
    id: 'mark-9-20', ref: 'Mark 9:20', text: 'καὶ ἤνεγκαν αὐτὸν πρὸς αὐτόν.', word: 'αὐτὸν', use: 'pronoun',
    english: 'him', wrong: ['himself', 'the same', 'his'], translation: 'And they brought him to him.',
    sentenceWrong: ['And they brought him to themselves.', 'And he brought them to him.', 'And they brought the same one to him.'],
    help: 'ἤνεγκαν = they brought · πρός + acc = to',
    note: 'Both are “him,” but not the same person: the first is the boy, the second is Jesus. Only the context tells you which is which.',
  },
  {
    id: 'matt-7-14', ref: 'Matt 7:14', text: 'στενὴ ἡ πύλη … καὶ ὀλίγοι εἰσὶν οἱ εὑρίσκοντες αὐτήν.', word: 'αὐτήν', use: 'pronoun',
    english: 'it', wrong: ['her', 'herself', 'the same'], translation: 'the gate is narrow … and those who find it are few.',
    sentenceWrong: ['the gate is narrow … and those who find her are few.', 'the gate is narrow … and few find the same gate.', 'the gate itself is narrow … and few are finding.'],
    help: 'στενή = narrow · πύλη = gate · ὀλίγοι = few · οἱ εὑρίσκοντες = those who find',
    note: 'αὐτήν is feminine because it refers to ἡ πύλη (the gate). A gate is a thing, so English says “it,” not “her.”',
  },
  {
    id: 'john-10-4a', ref: 'John 10:4', text: 'ἔμπροσθεν αὐτῶν πορεύεται,', word: 'αὐτῶν', use: 'pronoun',
    english: 'them', wrong: ['their', 'themselves', 'the same'], translation: 'he goes ahead of them,',
    sentenceWrong: ['their front goes,', 'he goes ahead of their own,', 'they themselves go ahead,'],
    help: 'ἔμπροσθεν + gen = in front of, ahead of · πορεύεται = he goes',
    note: 'After a preposition the genitive is just the object of the preposition: “ahead of them,” not “ahead of their.”',
  },
  {
    id: 'john-10-4b', ref: 'John 10:4', text: 'ὅτι οἴδασιν τὴν φωνὴν αὐτοῦ·', word: 'αὐτοῦ', use: 'pronoun',
    english: 'his', wrong: ['him', 'himself', 'the same'], translation: 'because they know his voice.',
    sentenceWrong: ['because they know the voice itself.', 'because they know the same voice.', 'because he knows their voice.'],
    help: 'οἴδασιν = they know · φωνή = voice',
    note: 'Here the genitive follows a noun, not a preposition, so it shows possession: “his voice.”',
  },
  {
    id: 'acts-2-36', ref: 'Acts 2:36', text: 'ὅτι καὶ κύριον αὐτὸν καὶ χριστὸν ἐποίησεν ὁ θεός,', word: 'αὐτὸν', use: 'pronoun',
    english: 'him', wrong: ['himself', 'the same', 'his'], translation: 'that God has made him both Lord and Christ,',
    sentenceWrong: ['that God himself has made the Lord and Christ,', 'that God has made the same Lord and Christ,', 'that he has made God both Lord and Christ,'],
    help: 'καὶ … καί = both … and · ἐποίησεν = made',
    note: 'κύριον has no article, and αὐτόν doesn’t go with it: αὐτόν is the object, “him,” and κύριον and χριστόν say what God made him.',
  },
  {
    id: 'acts-20-35', ref: 'Acts 20:35', text: 'μνημονεύειν τε τῶν λόγων τοῦ κυρίου Ἰησοῦ ὅτι αὐτὸς εἶπεν', word: 'αὐτὸς', use: 'pronoun',
    english: 'he himself', wrong: ['the same', 'him', 'his'], translation: 'and to remember the words of the Lord Jesus, that he himself said,',
    sentenceWrong: ['and to remember the same words of the Lord Jesus, that he said,', 'and to remember the words of the Lord Jesus, that the same one said,', 'and to remember his words to the Lord Jesus, that he said,'],
    help: 'μνημονεύειν = to remember (+ gen) · τε = and · εἶπεν = he said',
    note: 'The verb εἶπεν already means “he said,” so a nominative αὐτός on its own adds emphasis: “he himself said.”',
  },
  {
    id: 'john-4-2', ref: 'John 4:2', text: 'καίτοιγε Ἰησοῦς αὐτὸς οὐκ ἐβάπτιζεν ἀλλʼ οἱ μαθηταὶ αὐτοῦ', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'although Jesus himself was not baptizing, but his disciples were',
    sentenceWrong: ['although the same Jesus was not baptizing, but his disciples were', 'although Jesus was not baptizing him, but his disciples were', 'although he was not baptizing Jesus, but the same disciples were'],
    help: 'καίτοιγε = although · ἐβάπτιζεν = was baptizing',
    note: 'Ἰησοῦς has no article here (names often don’t), but αὐτός still goes with it and has no article of its own: intensive.',
  },
  {
    id: 'john-2-24', ref: 'John 2:24', text: 'αὐτὸς δὲ Ἰησοῦς οὐκ ἐπίστευεν αὑτὸν αὐτοῖς', word: 'αὐτὸς', use: 'intensive',
    english: 'himself', wrong: ['the same', 'he', 'him'], translation: 'But Jesus himself did not entrust himself to them',
    sentenceWrong: ['But the same Jesus did not entrust them to himself', 'But he did not entrust Jesus to them', 'But Jesus did not believe the same things about them'],
    help: 'ἐπίστευεν = was entrusting · αὑτόν (rough breathing) = himself, a reflexive pronoun',
    note: 'αὐτός with Ἰησοῦς is intensive. Watch the breathing: αὑτόν, with a rough breathing, is a different word (“himself” as an object).',
  },
  {
    id: 'john-14-11', ref: 'John 14:11', text: 'εἰ δὲ μή, διὰ τὰ ἔργα αὐτὰ πιστεύετε.', word: 'αὐτὰ', use: 'intensive',
    english: 'themselves', wrong: ['the same', 'them', 'their'], translation: 'But if not, believe because of the works themselves.',
    sentenceWrong: ['But if not, believe because of the same works.', 'But if not, believe through their works.', 'But if not, believe them because of the works.'],
    help: 'εἰ δὲ μή = but if not · διά + acc = because of · ἔργον = work · πιστεύετε = believe',
    note: 'The article goes with ἔργα, not with αὐτά: τὰ ἔργα αὐτά, “the works themselves.”',
  },
  {
    id: 'matt-17-8', ref: 'Matt 17:8', text: 'οὐδένα εἶδον εἰ μὴ αὐτὸν Ἰησοῦν μόνον.', word: 'αὐτὸν', use: 'intensive',
    english: 'himself', wrong: ['the same', 'him', 'his'], translation: 'they saw no one except Jesus himself alone.',
    sentenceWrong: ['they saw no one except him, the only Jesus.', 'they saw no one except the same Jesus.', 'no one saw him except Jesus alone.'],
    help: 'οὐδένα = no one · εἶδον = they saw · εἰ μή = except · μόνον = alone, only',
    note: 'αὐτόν agrees with Ἰησοῦν and has no article: intensive, “Jesus himself.” μόνον is an adjective here, but it is often an adverb, “only.”',
  },
  {
    id: 'phil-2-24', ref: 'Phil 2:24', text: 'πέποιθα δὲ ἐν κυρίῳ ὅτι καὶ αὐτὸς ταχέως ἐλεύσομαι.', word: 'αὐτὸς', use: 'intensive',
    english: 'myself', wrong: ['he', 'the same', 'him'], translation: 'And I am confident in the Lord that I myself will also come soon.',
    sentenceWrong: ['And I am confident in the Lord that he will also come soon.', 'And I am confident in the same Lord that I will come soon.', 'And he is confident in the Lord that I will also come soon.'],
    help: 'πέποιθα = I am confident · ταχέως = soon · ἐλεύσομαι = I will come',
    note: 'ἐλεύσομαι is first person, so αὐτός can’t be “he.” It intensifies the subject inside the verb: “I myself.”',
  },
  {
    id: 'acts-10-26', ref: 'Acts 10:26', text: 'καὶ ἐγὼ αὐτὸς ἄνθρωπός εἰμι.', word: 'αὐτὸς', use: 'intensive',
    english: 'myself', wrong: ['he', 'the same', 'him'], translation: 'I myself am also a man.',
    sentenceWrong: ['He is also a man like me.', 'I am also the same man.', 'I am also his man.'],
    help: 'ἄνθρωπος = human being, man',
    note: 'αὐτός goes with ἐγώ, so it is “I myself.” καί here means “also.”',
  },
  {
    id: '1cor-1-10', ref: '1 Cor 1:10', text: 'ἐν τῷ αὐτῷ νοῒ καὶ ἐν τῇ αὐτῇ γνώμῃ.', word: 'αὐτῷ', use: 'identical',
    english: 'the same', wrong: ['itself', 'him', 'to him'], translation: 'in the same mind and in the same judgment.',
    sentenceWrong: ['in his mind and in her judgment.', 'in the mind itself and in the judgment itself.', 'in him, the mind, and in her, the judgment.'],
    help: 'νοῦς (dat νοΐ) = mind · γνώμη = judgment, opinion',
    note: 'τῷ αὐτῷ and τῇ αὐτῇ: the article comes right before αὐτός each time, so both mean “the same.”',
  },
  {
    id: 'luke-6-23', ref: 'Luke 6:23', text: 'κατὰ τὰ αὐτὰ γὰρ ἐποίουν τοῖς προφήταις οἱ πατέρες αὐτῶν.', word: 'αὐτὰ', use: 'identical',
    english: 'the same (things)', wrong: ['themselves', 'them', 'their'], translation: 'for their fathers used to do the same things to the prophets.',
    sentenceWrong: ['for the prophets used to do the same things to their fathers.', 'for their fathers used to do them to the prophets themselves.', 'for the fathers themselves used to do things to their prophets.'],
    help: 'κατὰ τὰ αὐτά = in the same way (lit. “according to the same things”) · ἐποίουν = they used to do · προφήτης = prophet',
    note: 'τὰ αὐτά with no noun is “the same things.” οἱ πατέρες is the subject even though it comes last.',
  },
  {
    id: 'rom-2-1', ref: 'Rom 2:1', text: 'τὰ γὰρ αὐτὰ πράσσεις ὁ κρίνων·', word: 'αὐτὰ', use: 'identical',
    english: 'the same (things)', wrong: ['themselves', 'them', 'their'], translation: 'for you who judge practice the same things.',
    sentenceWrong: ['for you who judge practice them yourselves.', 'for the one who judges practices their things.', 'for the same one who judges practices these things.'],
    help: 'πράσσεις = you practice, you do · ὁ κρίνων = the one who judges',
    note: 'γάρ always comes second, so it can sit between τά and αὐτά; they still go together: “the same things.”',
  },
  {
    id: 'luke-13-31', ref: 'Luke 13:31', text: 'Ἐν αὐτῇ τῇ ὥρᾳ προσῆλθάν τινες Φαρισαῖοι', word: 'αὐτῇ', use: 'identical',
    english: 'that very', wrong: ['her', 'to her', 'she'], translation: 'At that very hour some Pharisees came,',
    sentenceWrong: ['In her hour some Pharisees came,', 'Some Pharisees came to her at the hour,', 'At the hour some Pharisees came to her,'],
    help: 'ὥρα = hour · προσῆλθαν = came to · τινες = some',
    note: 'An exception to the word-order rule: αὐτῇ is in predicate position, yet Luke uses it to mean “that very (same) hour.” ἐν + dative here tells when.',
  },
]

export const chapter12: Chapter = {
  number: 12,
  title: 'αὐτός',
  short: 'αὐτός',
  topics: ['autos'],
  vocab: [
    { id: 'aion', lemma: 'αἰών', lexical: 'αἰών, -ῶνος, ὁ', pos: 'noun', gloss: 'age, eternity; εἰς τὸν αἰῶνα: forever', hook: 'Eon (aeon): an age.', accept: ['age', 'eternity', 'forever'] },
    { id: 'didaskalos', lemma: 'διδάσκαλος', lexical: 'διδάσκαλος, -ου, ὁ', pos: 'noun', gloss: 'teacher', hook: 'Didactic: meant to teach.', accept: ['teacher'] },
    { id: 'euthys', lemma: 'εὐθύς', pos: 'adverb', gloss: 'immediately', accept: ['immediately', 'at once'] },
    preposition('heos'),
    { id: 'mathetes', lemma: 'μαθητής', lexical: 'μαθητής, -οῦ, ὁ', pos: 'noun', gloss: 'disciple', hook: 'Mathematics: from μάθημα, “what is learned.”', accept: ['disciple', 'pupil', 'student'] },
    { id: 'men', lemma: 'μέν', pos: 'conjunction', gloss: 'on the one hand, indeed (often untranslated)', accept: ['on the one hand', 'indeed', 'untranslated'] },
    { id: 'medeis', lemma: 'μηδείς', lexical: 'μηδείς, μηδεμία, μηδέν', pos: 'adjective', gloss: 'no one, nothing', accept: ['no one', 'nothing', 'none', 'nobody'] },
    { id: 'monos', lemma: 'μόνος', lexical: 'μόνος, -η, -ον', pos: 'adjective', gloss: 'alone, only', hook: 'Monologue, monotheism, monopoly: alone, only one.', accept: ['alone', 'only'] },
    { id: 'hopos', lemma: 'ὅπως', pos: 'conjunction', gloss: 'how, that, in order that', accept: ['how', 'that', 'in order that', 'so that'] },
    { id: 'hosos', lemma: 'ὅσος', lexical: 'ὅσος, -η, -ον', pos: 'adjective', gloss: 'as great as, as many as', accept: ['as great as', 'as many as', 'as much as'] },
    { id: 'oun', lemma: 'οὖν', pos: 'conjunction', gloss: 'therefore, then, accordingly', accept: ['therefore', 'then', 'accordingly', 'so'] },
    { id: 'ophthalmos', lemma: 'ὀφθαλμός', lexical: 'ὀφθαλμός, -οῦ, ὁ', pos: 'noun', gloss: 'eye, sight', hook: 'Ophthalmology: the study of the eye.', accept: ['eye', 'sight'] },
    { id: 'palin', lemma: 'πάλιν', pos: 'adverb', gloss: 'again', hook: 'Palindrome: a word that runs back again (“level”).', accept: ['again'] },
    { id: 'pous', lemma: 'πούς', lexical: 'πούς, ποδός, ὁ', pos: 'noun', gloss: 'foot', hook: 'Podiatrist (foot doctor), tripod, octopus (“eight-foot”).', accept: ['foot'] },
    preposition('hyper'),
  ],
  paradigms: [],
  autos: { paradigm: AUTOS, items: ITEMS, readings: READINGS, nouns: [AION, POUS, MEDEIS] },
}

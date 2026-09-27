import type { Chapter, ParticipleUseItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 29: Adjectival Participles.
// Verse excerpts are from the SBLGNT (CC BY 4.0), parsed as in the MorphGNT; translations are written for this app.
// `english` is how the highlighted participle is translated; `wrong` are the tempting mistranslations.

const USES: ParticipleUseItem[] = [
  // Substantival: the article and no noun, so the participle is the noun: “the one who …”.
  {
    id: 'matt-10-40', ref: 'Matt 10:40', text: 'Ὁ δεχόμενος ὑμᾶς ἐμὲ δέχεται',
    word: 'δεχόμενος', lemma: 'δέχομαι', voice: 'middle/passive', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who receives', wrong: ['while receiving', 'he receives', 'after receiving'],
    translation: 'The one who receives you receives me', note: 'δέχομαι is middle-only and from this chapter’s vocabulary.',
  },
  {
    id: 'matt-10-40-aposteilanta', ref: 'Matt 10:40', text: 'καὶ ὁ ἐμὲ δεχόμενος δέχεται τὸν ἀποστείλαντά με.',
    word: 'ἀποστείλαντά', lemma: 'ἀποστέλλω', tense: 'aorist', voice: 'active', case: 'accusative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who sent', wrong: ['after sending', 'the one who is sending', 'he sent'],
    translation: 'and the one who receives me receives the one who sent me.',
    note: 'An aorist substantival participle: “the one who sent.” The second accent comes from the enclitic με.',
  },
  {
    id: 'matt-11-15', ref: 'Matt 11:15', text: 'ὁ ἔχων ὦτα ἀκουέτω.',
    word: 'ἔχων', lemma: 'ἔχω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who has', wrong: ['while having', 'he has', 'having had'],
    translation: 'Whoever has ears, let him hear.', help: 'οὖς, ὠτός = ear · ἀκουέτω = let him hear',
  },
  {
    id: 'matt-13-3', ref: 'Matt 13:3', text: 'Ἰδοὺ ἐξῆλθεν ὁ σπείρων τοῦ σπείρειν.',
    word: 'σπείρων', lemma: 'σπείρω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the sower (the one who sows)', wrong: ['while sowing', 'after he sowed', 'he is sowing'],
    translation: 'Look, the sower went out to sow.', help: 'τοῦ σπείρειν = to sow',
    note: 'A substantival participle often becomes an English noun: ὁ σπείρων, “the sower.”',
  },
  {
    id: 'mark-6-44', ref: 'Mark 6:44', text: 'καὶ ἦσαν οἱ φαγόντες τοὺς ἄρτους πεντακισχίλιοι ἄνδρες.',
    word: 'φαγόντες', lemma: 'ἐσθίω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', use: 'substantival',
    english: 'those who ate', wrong: ['while eating', 'they ate', 'those who are eating'],
    translation: 'And those who ate the loaves were five thousand men.', help: 'πεντακισχίλιοι = five thousand',
    note: 'φαγ- is the second aorist stem of ἐσθίω (ἔφαγον), from this chapter’s vocabulary.',
  },
  {
    id: 'mark-16-16', ref: 'Mark 16:16', text: 'ὁ πιστεύσας καὶ βαπτισθεὶς σωθήσεται',
    word: 'πιστεύσας', lemma: 'πιστεύω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who believed (whoever believes)', wrong: ['while believing', 'after he believed', 'he believes'],
    translation: 'Whoever believes and is baptized will be saved', help: 'σωθήσεται = he will be saved',
    note: 'One article covers both participles: ὁ πιστεύσας καὶ βαπτισθείς, “the one who believed and was baptized.”',
  },
  {
    id: 'mark-16-16-baptistheis', ref: 'Mark 16:16', text: 'ὁ πιστεύσας καὶ βαπτισθεὶς σωθήσεται',
    word: 'βαπτισθεὶς', lemma: 'βαπτίζω', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who was baptized', wrong: ['the one who baptized', 'while being baptized', 'he was baptized'],
    translation: 'Whoever believes and is baptized will be saved', help: 'σωθήσεται = he will be saved',
    note: 'No article of its own, but the ὁ before πιστεύσας covers it too.',
  },
  {
    id: 'luke-1-45', ref: 'Luke 1:45', text: 'καὶ μακαρία ἡ πιστεύσασα',
    word: 'πιστεύσασα', lemma: 'πιστεύω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'feminine', use: 'substantival',
    english: 'she who believed', wrong: ['the one who is believing', 'while believing', 'she believes'],
    translation: 'And blessed is she who believed', note: 'The feminine article and ending say “she who …”.',
  },
  {
    id: 'luke-2-18', ref: 'Luke 2:18', text: 'καὶ πάντες οἱ ἀκούσαντες ἐθαύμασαν',
    word: 'ἀκούσαντες', lemma: 'ἀκούω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', use: 'substantival',
    english: 'those who heard', wrong: ['while hearing', 'they heard', 'those who are hearing'],
    translation: 'And all who heard it were amazed', help: 'ἐθαύμασαν = they were amazed',
  },
  {
    id: 'john-1-12', ref: 'John 1:12', text: 'ἔδωκεν αὐτοῖς ἐξουσίαν τέκνα θεοῦ γενέσθαι, τοῖς πιστεύουσιν εἰς τὸ ὄνομα αὐτοῦ',
    word: 'πιστεύουσιν', lemma: 'πιστεύω', voice: 'active', case: 'dative', number: 'pl', gender: 'masculine', use: 'substantival',
    english: 'to those who believe', wrong: ['they believe', 'while believing', 'to those who believed'],
    translation: 'he gave them the right to become children of God, to those who believe in his name', help: 'ἔδωκεν = he gave · γενέσθαι = to become',
    note: 'πιστεύουσιν looks like “they believe,” but τοῖς shows it is a dative plural participle.',
  },
  {
    id: 'john-4-34', ref: 'John 4:34', text: 'Ἐμὸν βρῶμά ἐστιν ἵνα ποιήσω τὸ θέλημα τοῦ πέμψαντός με',
    word: 'πέμψαντός', lemma: 'πέμπω', tense: 'aorist', voice: 'active', case: 'genitive', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'of the one who sent', wrong: ['after sending', 'of the one who is sending', 'he sent'],
    translation: 'My food is to do the will of the one who sent me', help: 'βρῶμα = food',
    note: 'πέμπω is from this chapter’s vocabulary. The second accent comes from the enclitic με.',
  },
  {
    id: 'luke-10-16', ref: 'Luke 10:16', text: 'Ὁ ἀκούων ὑμῶν ἐμοῦ ἀκούει',
    word: 'ἀκούων', lemma: 'ἀκούω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who hears', wrong: ['while hearing', 'having heard', 'he hears'],
    translation: 'The one who hears you hears me', note: 'ἀκούω takes a genitive object: ὑμῶν, ἐμοῦ.',
  },
  {
    id: 'rom-14-3', ref: 'Rom 14:3', text: 'ὁ ἐσθίων τὸν μὴ ἐσθίοντα μὴ ἐξουθενείτω',
    word: 'ἐσθίων', lemma: 'ἐσθίω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who eats', wrong: ['while eating', 'he eats', 'the one who ate'],
    translation: 'Let the one who eats not despise the one who does not eat', help: 'ἐξουθενείτω = let him despise',
    note: 'τὸν μὴ ἐσθίοντα is substantival too, as the object: “the one who does not eat.” Participles are negated with μή.',
  },
  {
    id: 'rom-14-3-esthionta', ref: 'Rom 14:3', text: 'ὁ ἐσθίων τὸν μὴ ἐσθίοντα μὴ ἐξουθενείτω',
    word: 'ἐσθίοντα', lemma: 'ἐσθίω', voice: 'active', case: 'accusative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who (does not) eat', wrong: ['while (not) eating', 'they (do not) eat', 'the things that are eaten'],
    translation: 'Let the one who eats not despise the one who does not eat', help: 'ἐξουθενείτω = let him despise',
    note: 'The article τόν and μή come before the participle; it is the object of ἐξουθενείτω.',
  },
  {
    id: '1cor-10-12', ref: '1 Cor 10:12', text: 'ὥστε ὁ δοκῶν ἑστάναι βλεπέτω μὴ πέσῃ',
    word: 'δοκῶν', lemma: 'δοκέω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'substantival',
    english: 'the one who thinks', wrong: ['while thinking', 'he thinks', 'the one who is thought'],
    translation: 'So let the one who thinks he stands watch out that he does not fall.', help: 'ἑστάναι = to stand · βλεπέτω = let him watch · πέσῃ = he falls',
    note: 'δοκέω contracts: δοκε + ων → δοκῶν. It is from this chapter’s vocabulary.',
  },
  {
    id: 'luke-7-10', ref: 'Luke 7:10', text: 'καὶ ὑποστρέψαντες εἰς τὸν οἶκον οἱ πεμφθέντες εὗρον τὸν δοῦλον ὑγιαίνοντα.',
    word: 'πεμφθέντες', lemma: 'πέμπω', tense: 'aorist', voice: 'passive', case: 'nominative', number: 'pl', gender: 'masculine', use: 'substantival',
    english: 'those who had been sent', wrong: ['those who had sent', 'while being sent', 'they were sent'],
    translation: 'And when those who had been sent returned to the house, they found the servant well.', help: 'ὑποστρέψαντες = having returned · ὑγιαίνοντα = healthy',
    note: 'Two participles: ὑποστρέψαντες has no article (adverbial, “when they returned”); οἱ πεμφθέντες has one (substantival, the subject).',
  },
  // Attributive: the article and a noun to describe: “the … who …”.
  {
    id: 'matt-16-16', ref: 'Matt 16:16', text: 'Σὺ εἶ ὁ χριστὸς ὁ υἱὸς τοῦ θεοῦ τοῦ ζῶντος.',
    word: 'ζῶντος', lemma: 'ζάω', voice: 'active', case: 'genitive', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'living', wrong: ['while living', 'the one who lives', 'after living'],
    translation: 'You are the Christ, the Son of the living God.',
    note: 'τοῦ θεοῦ τοῦ ζῶντος: noun, repeated article, participle, like ὁ λόγος ὁ ἀγαθός.',
  },
  {
    id: 'john-4-11', ref: 'John 4:11', text: 'πόθεν οὖν ἔχεις τὸ ὕδωρ τὸ ζῶν;',
    word: 'ζῶν', lemma: 'ζάω', voice: 'active', case: 'accusative', number: 'sg', gender: 'neuter', use: 'attributive',
    english: 'living', wrong: ['while living', 'he who lives', 'having lived'],
    translation: 'Where then do you get that living water?', help: 'πόθεν = from where',
    note: 'ζῶν is neuter accusative here, agreeing with τὸ ὕδωρ; the same spelling is also the masculine nominative.',
  },
  {
    id: 'john-6-44', ref: 'John 6:44', text: 'ἐὰν μὴ ὁ πατὴρ ὁ πέμψας με ἑλκύσῃ αὐτόν',
    word: 'πέμψας', lemma: 'πέμπω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'who sent', wrong: ['after sending', 'who is sending', 'the sent'],
    translation: 'unless the Father who sent me draws him', help: 'ἑλκύσῃ = he draws',
  },
  {
    id: 'mark-11-10', ref: 'Mark 11:10', text: 'Εὐλογημένη ἡ ἐρχομένη βασιλεία τοῦ πατρὸς ἡμῶν Δαυίδ·',
    word: 'ἐρχομένη', lemma: 'ἔρχομαι', voice: 'middle/passive', case: 'nominative', number: 'sg', gender: 'feminine', use: 'attributive',
    english: 'coming', wrong: ['while coming', 'the one who came', 'having come'],
    translation: 'Blessed is the coming kingdom of our father David!', help: 'εὐλογημένη = blessed',
    note: 'Between the article and the noun, like ἡ ἀγαθὴ βασιλεία.',
  },
  {
    id: 'luke-18-30', ref: 'Luke 18:30', text: 'καὶ ἐν τῷ αἰῶνι τῷ ἐρχομένῳ ζωὴν αἰώνιον.',
    word: 'ἐρχομένῳ', lemma: 'ἔρχομαι', voice: 'middle/passive', case: 'dative', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'to come', wrong: ['while coming', 'who came', 'having come'],
    translation: 'and in the age to come, eternal life.',
  },
  {
    id: 'john-5-12', ref: 'John 5:12', text: 'Τίς ἐστιν ὁ ἄνθρωπος ὁ εἰπών σοι· Ἆρον καὶ περιπάτει;',
    word: 'εἰπών', lemma: 'λέγω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'who said', wrong: ['after saying', 'who is saying', 'saying'],
    translation: 'Who is the man who said to you, “Pick up your mat and walk”?', help: 'ἆρον = pick up!',
  },
  {
    id: 'rom-16-22', ref: 'Rom 16:22', text: 'ἀσπάζομαι ὑμᾶς ἐγὼ Τέρτιος ὁ γράψας τὴν ἐπιστολὴν ἐν κυρίῳ.',
    word: 'γράψας', lemma: 'γράφω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'who wrote', wrong: ['while writing', 'after he had written', 'who is writing'],
    translation: 'I Tertius, who wrote this letter, greet you in the Lord.', help: 'ἐπιστολή = letter',
    note: 'ὁ γράψας describes Τέρτιος. ἀσπάζομαι is from chapter 28’s vocabulary.',
  },
  {
    id: 'acts-11-1', ref: 'Acts 11:1', text: 'Ἤκουσαν δὲ οἱ ἀπόστολοι καὶ οἱ ἀδελφοὶ οἱ ὄντες κατὰ τὴν Ἰουδαίαν',
    word: 'ὄντες', lemma: 'εἰμί', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', use: 'attributive',
    english: 'who were', wrong: ['while being', 'those who are', 'having been'],
    translation: 'Now the apostles and the brothers who were throughout Judea heard',
  },
  {
    id: 'luke-6-15', ref: 'Luke 6:15', text: 'καὶ Σίμωνα τὸν καλούμενον Ζηλωτήν',
    word: 'καλούμενον', lemma: 'καλέω', voice: 'middle/passive', case: 'accusative', number: 'sg', gender: 'masculine', use: 'attributive',
    english: 'who was called', wrong: ['who called', 'while calling', 'the one calling'],
    translation: 'and Simon, who was called the Zealot',
    note: 'A present passive participle: “the one being called.” καλέω contracts: καλε + ο + μενον → καλούμενον.',
  },
  // Adverbial, for contrast: no article.
  {
    id: 'matt-2-3', ref: 'Matt 2:3', text: 'ἀκούσας δὲ ὁ βασιλεὺς Ἡρῴδης ἐταράχθη',
    word: 'ἀκούσας', lemma: 'ἀκούω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'adverbial',
    english: 'when he heard', wrong: ['the one who heard', 'who hears', 'the hearing'],
    translation: 'When King Herod heard this, he was troubled', help: 'ἐταράχθη = he was troubled',
  },
  {
    id: 'matt-14-30', ref: 'Matt 14:30', text: 'βλέπων δὲ τὸν ἄνεμον ἰσχυρὸν ἐφοβήθη',
    word: 'βλέπων', lemma: 'βλέπω', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'adverbial',
    english: 'seeing', wrong: ['the one who sees', 'who saw', 'the seeing one'],
    translation: 'But seeing the strong wind, he became afraid', help: 'ἄνεμος = wind · ἰσχυρός = strong',
  },
  {
    id: 'acts-16-25', ref: 'Acts 16:25', text: 'Κατὰ δὲ τὸ μεσονύκτιον Παῦλος καὶ Σιλᾶς προσευχόμενοι ὕμνουν τὸν θεόν',
    word: 'προσευχόμενοι', lemma: 'προσεύχομαι', voice: 'middle/passive', case: 'nominative', number: 'pl', gender: 'masculine', use: 'adverbial',
    english: 'while praying', wrong: ['those who pray', 'who were praying', 'the ones praying'],
    translation: 'About midnight Paul and Silas, while praying, were singing hymns to God', help: 'μεσονύκτιον = midnight · ὕμνουν = they were singing hymns',
  },
  {
    id: 'matt-13-46', ref: 'Matt 13:46', text: 'εὑρὼν δὲ ἕνα πολύτιμον μαργαρίτην ἀπελθὼν πέπρακεν πάντα ὅσα εἶχεν',
    word: 'εὑρὼν', lemma: 'εὑρίσκω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'sg', gender: 'masculine', use: 'adverbial',
    english: 'having found', wrong: ['the one who found', 'who finds', 'the finder'],
    translation: 'And having found one very valuable pearl, he went away and sold all that he had', help: 'πολύτιμος = very valuable · μαργαρίτης = pearl · πέπρακεν = he sold',
  },
  {
    id: 'matt-2-10', ref: 'Matt 2:10', text: 'ἰδόντες δὲ τὸν ἀστέρα ἐχάρησαν χαρὰν μεγάλην σφόδρα.',
    word: 'ἰδόντες', lemma: 'ὁράω', tense: 'aorist', voice: 'active', case: 'nominative', number: 'pl', gender: 'masculine', use: 'adverbial',
    english: 'when they saw', wrong: ['those who saw', 'who see', 'the ones seeing'],
    translation: 'When they saw the star, they rejoiced with exceedingly great joy.', help: 'ἀστήρ = star · ἐχάρησαν = they rejoiced · σφόδρα = exceedingly',
  },
]

export const chapter29: Chapter = {
  number: 29,
  title: 'Adjectival Participles',
  short: 'Adjectival participles',
  topics: ['ptcAdjectival'],
  vocab: [
    { id: 'dechomai', lemma: 'δέχομαι', pos: 'verb', gloss: 'I take, receive', accept: ['i take', 'take', 'i receive', 'receive', 'welcome', 'accept'] },
    { id: 'dokeo', lemma: 'δοκέω', pos: 'verb', gloss: 'I think, seem', hook: 'Docetism taught that Jesus only seemed human.', accept: ['i think', 'think', 'i seem', 'seem', 'suppose', 'appear'] },
    { id: 'esthio', lemma: 'ἐσθίω', pos: 'verb', gloss: 'I eat', hook: 'Esophagus comes from its second aorist root *φαγ (ἔφαγον).', accept: ['i eat', 'eat'] },
    { id: 'pempo', lemma: 'πέμπω', pos: 'verb', gloss: 'I send', hook: 'In John, God is ὁ πέμψας με, “the one who sent me.”', accept: ['i send', 'send'] },
    { id: 'phero', lemma: 'φέρω', pos: 'verb', gloss: 'I carry, bear, lead', hook: 'Christopher, “Christ-bearer.”', accept: ['i carry', 'carry', 'i bear', 'bear', 'i lead', 'lead', 'bring', 'i bring'] },
  ],
  paradigms: [],
  participleUses: USES,
}

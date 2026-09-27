import type { DeclensionParadigm, PrepReading } from './types'

// Verses to take apart the way the workbook's chapter 8 translation exercise does: find the preposition's object and the
// word the phrase modifies, then translate the whole sentence. Text is SBLGNT, checked word for word against MorphGNT.
export const PREP_READINGS: PrepReading[] = [
  {
    id: 'john-1-1', ref: 'John 1:1', text: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν,',
    phrase: 'πρὸς τὸν θεόν', prep: 'pros', case: 'accusative', object: 'θεόν', use: 'adverbial', modifies: 'ἦν',
    decoys: ['λόγος', 'ἀρχῇ'],
    translation: 'In the beginning was the Word, and the Word was with God,',
    wrong: [
      'In the beginning the Word was God, and God was with the Word,',
      'In the beginning was the Word, and the Word was from God,',
      'The Word was the beginning, and the Word was toward God,',
    ],
    note: 'Ἐν ἀρχῇ has no article, but English needs one: “in the beginning.” Greek often leaves the article out of a prepositional phrase.',
  },
  {
    id: 'mark-1-9', ref: 'Mark 1:9', text: 'ἦλθεν Ἰησοῦς ἀπὸ Ναζαρὲτ τῆς Γαλιλαίας καὶ ἐβαπτίσθη εἰς τὸν Ἰορδάνην ὑπὸ Ἰωάννου.',
    phrase: 'ὑπὸ Ἰωάννου', prep: 'hypo', case: 'genitive', object: 'Ἰωάννου', use: 'adverbial', modifies: 'ἐβαπτίσθη',
    decoys: ['ἦλθεν', 'Ἰορδάνην', 'Γαλιλαίας'], help: 'ἦλθεν he came · ἐβαπτίσθη he was baptized · Ἰορδάνην Jordan',
    translation: 'Jesus came from Nazareth of Galilee and was baptized in the Jordan by John.',
    wrong: [
      'Jesus came from Nazareth to Galilee and was baptized in the Jordan by John.',
      'Jesus came from Nazareth of Galilee, and John was baptized in the Jordan by him.',
      'Jesus came to Nazareth of Galilee and baptized John in the Jordan.',
    ],
    note: 'τῆς Γαλιλαίας is genitive, not the object of a preposition: Nazareth “of Galilee,” not “to Galilee.”',
  },
  {
    id: 'mark-3-7', ref: 'Mark 3:7', text: 'Καὶ ὁ Ἰησοῦς μετὰ τῶν μαθητῶν αὐτοῦ ἀνεχώρησεν πρὸς τὴν θάλασσαν·',
    phrase: 'μετὰ τῶν μαθητῶν αὐτοῦ', prep: 'meta', case: 'genitive', object: 'μαθητῶν', use: 'adverbial', modifies: 'ἀνεχώρησεν',
    decoys: ['Ἰησοῦς', 'θάλασσαν'], help: 'μαθητῶν disciples · ἀνεχώρησεν he withdrew',
    translation: 'And Jesus withdrew with his disciples to the sea.',
    wrong: [
      'And Jesus withdrew after his disciples to the sea.',
      'And the disciples of Jesus withdrew with him to the sea.',
      'And Jesus withdrew with his disciples from the sea.',
    ],
    note: 'The phrase sits between the subject and the verb, but it tells you how Jesus withdrew, so it goes with the verb.',
  },
  {
    id: 'mark-4-2', ref: 'Mark 4:2', text: 'καὶ ἐδίδασκεν αὐτοὺς ἐν παραβολαῖς πολλά',
    phrase: 'ἐν παραβολαῖς', prep: 'en-prep', case: 'dative', object: 'παραβολαῖς', use: 'adverbial', modifies: 'ἐδίδασκεν',
    decoys: ['αὐτοὺς', 'πολλά'], help: 'ἐδίδασκεν he was teaching · πολλά many things',
    translation: 'And he was teaching them many things in parables.',
    wrong: [
      'And he was teaching many parables to them.',
      'And they were teaching him many things in parables.',
      'And he was teaching them many things about parables.',
    ],
    note: 'The phrase says how he taught. Most prepositional phrases are like this one: they go with the verb.',
  },
  {
    id: 'mark-5-21', ref: 'Mark 5:21', text: 'συνήχθη ὄχλος πολὺς ἐπʼ αὐτόν, καὶ ἦν παρὰ τὴν θάλασσαν.',
    phrase: 'παρὰ τὴν θάλασσαν', prep: 'para', case: 'accusative', object: 'θάλασσαν', use: 'adverbial', modifies: 'ἦν',
    decoys: ['ὄχλος', 'συνήχθη', 'αὐτόν'], help: 'συνήχθη was gathered · πολύς great · ἐπʼ αὐτόν around him',
    translation: 'A great crowd was gathered around him, and he was alongside the sea.',
    wrong: [
      'A great crowd was gathered around him, and he was from the sea.',
      'A great crowd was gathered around him, and the sea was with him.',
      'He gathered a great crowd around him, and it was in the presence of the sea.',
    ],
    note: 'With εἰμί the phrase still goes with the verb: it says where he was.',
  },
  {
    id: 'john-5-24', ref: 'John 5:24', text: 'εἰς κρίσιν οὐκ ἔρχεται ἀλλὰ μεταβέβηκεν ἐκ τοῦ θανάτου εἰς τὴν ζωήν.',
    phrase: 'ἐκ τοῦ θανάτου', prep: 'ek', case: 'genitive', object: 'θανάτου', use: 'adverbial', modifies: 'μεταβέβηκεν',
    decoys: ['ἔρχεται', 'ζωήν', 'κρίσιν'], help: 'κρίσιν judgment · ἔρχεται he comes · μεταβέβηκεν he has passed',
    translation: 'He does not come into judgment, but has passed out of death into life.',
    wrong: [
      'He does not come into judgment, but has passed out of life into death.',
      'He does not come out of judgment, but death has passed into life.',
      'He does not come into judgment, but has passed away from death on account of life.',
    ],
    note: 'μετα-βέβηκεν is a compound verb (μετά + βαίνω, “go”). Its preposition is part of the verb, not a phrase of its own.',
  },
  {
    id: 'mark-2-13', ref: 'Mark 2:13', text: 'Καὶ ἐξῆλθεν πάλιν παρὰ τὴν θάλασσαν· καὶ πᾶς ὁ ὄχλος ἤρχετο πρὸς αὐτόν,',
    phrase: 'πρὸς αὐτόν', prep: 'pros', case: 'accusative', object: 'αὐτόν', use: 'adverbial', modifies: 'ἤρχετο',
    decoys: ['ἐξῆλθεν', 'ὄχλος', 'θάλασσαν'], help: 'ἐξῆλθεν he went out · πάλιν again · πᾶς all · ἤρχετο was coming',
    translation: 'And he went out again alongside the sea, and all the crowd was coming to him.',
    wrong: [
      'And he went out again from the sea, and all the crowd was coming with him.',
      'And he went out again alongside the sea, and he was coming to all the crowd.',
      'And the crowd went out again alongside the sea, and he was coming to them.',
    ],
  },
  {
    id: '1john-4-16', ref: '1 John 4:16', text: 'Ὁ θεὸς ἀγάπη ἐστίν, καὶ ὁ μένων ἐν τῇ ἀγάπῃ ἐν τῷ θεῷ μένει καὶ ὁ θεὸς ἐν αὐτῷ μένει.',
    phrase: 'ἐν τῷ θεῷ', prep: 'en-prep', case: 'dative', object: 'θεῷ', use: 'adverbial', modifies: 'μένει',
    decoys: ['μένων', 'ἀγάπῃ', 'ἐστίν'], help: 'ὁ μένων the one who remains · μένει he remains',
    translation: 'God is love, and the one who remains in love remains in God, and God remains in him.',
    wrong: [
      'God is love, and the one who remains in God remains in love, and God remains in him.',
      'Love is God, and the one who remains in love remains in God, and God remains in him.',
      'God is love, and love remains in God, and God remains in it.',
    ],
    note: 'Two ἐν phrases stand side by side. ἐν τῇ ἀγάπῃ goes with ὁ μένων (“the one remaining in love”); ἐν τῷ θεῷ goes with the main verb μένει.',
  },
  {
    id: 'mark-1-26', ref: 'Mark 1:26', text: 'καὶ φωνῆσαν φωνῇ μεγάλῃ ἐξῆλθεν ἐξ αὐτοῦ.',
    phrase: 'ἐξ αὐτοῦ', prep: 'ek', case: 'genitive', object: 'αὐτοῦ', use: 'adverbial', modifies: 'ἐξῆλθεν',
    decoys: ['φωνῇ', 'φωνῆσαν'], help: 'φωνῆσαν crying out · φωνῇ μεγάλῃ with a loud voice · ἐξῆλθεν it came out (the unclean spirit)',
    translation: 'And crying out with a loud voice, it came out of him.',
    wrong: [
      'And crying out with a loud voice, it came out out of him.',
      'And crying out with a loud voice, he came out with it.',
      'And crying out to him with a loud voice, it went away.',
    ],
    note: 'ἐξ-ῆλθεν already contains ἐκ, and Greek repeats the preposition after the verb. English says it once: “came out of him.” The repetition is style, not emphasis.',
  },
  {
    id: 'john-3-17', ref: 'John 3:17', text: 'οὐ γὰρ ἀπέστειλεν ὁ θεὸς τὸν υἱὸν εἰς τὸν κόσμον ἵνα κρίνῃ τὸν κόσμον, ἀλλʼ ἵνα σωθῇ ὁ κόσμος διʼ αὐτοῦ.',
    phrase: 'διʼ αὐτοῦ', prep: 'dia', case: 'genitive', object: 'αὐτοῦ', use: 'adverbial', modifies: 'σωθῇ',
    decoys: ['ἀπέστειλεν', 'κρίνῃ', 'κόσμος'], help: 'ἀπέστειλεν he sent · κρίνῃ he might judge · σωθῇ it might be saved',
    translation: 'For God did not send the Son into the world in order to judge the world, but in order that the world might be saved through him.',
    wrong: [
      'For God did not send the Son into the world in order to judge the world, but in order that the world might be saved on account of him.',
      'For God sent the Son into the world in order to judge the world, and the world will be saved through him.',
      'For the Son did not send God into the world in order to judge the world, but in order that he might save the world.',
    ],
    note: 'διʼ αὐτοῦ is genitive, so “through him”; with the accusative διά would mean “on account of.”',
    main: { verb: 'ἀπέστειλεν', dependent: ['κρίνῃ', 'σωθῇ'] },
  },
  {
    id: 'john-1-7', ref: 'John 1:7', text: 'οὗτος ἦλθεν εἰς μαρτυρίαν, ἵνα μαρτυρήσῃ περὶ τοῦ φωτός, ἵνα πάντες πιστεύσωσιν διʼ αὐτοῦ.',
    phrase: 'διʼ αὐτοῦ', prep: 'dia', case: 'genitive', object: 'αὐτοῦ', use: 'adverbial', modifies: 'πιστεύσωσιν',
    decoys: ['ἦλθεν', 'μαρτυρήσῃ', 'πάντες'],
    help: 'οὗτος this man · ἦλθεν he came · μαρτυρίαν witness · μαρτυρήσῃ he might testify · περί about · φωτός light · πάντες all · πιστεύσωσιν they might believe',
    translation: 'This man came as a witness, in order that he might testify about the light, in order that all might believe through him.',
    wrong: [
      'This man came as a witness, in order that all might testify about the light on account of him.',
      'All came as a witness, in order that he might believe in the light through them.',
      'This man came into a witness, and all believed through him about the light.',
    ],
    main: { verb: 'ἦλθεν', dependent: ['μαρτυρήσῃ', 'πιστεύσωσιν'] },
  },
  {
    id: 'john-5-44', ref: 'John 5:44', text: 'καὶ τὴν δόξαν τὴν παρὰ τοῦ μόνου θεοῦ οὐ ζητεῖτε;',
    phrase: 'παρὰ τοῦ μόνου θεοῦ', prep: 'para', case: 'genitive', object: 'θεοῦ', use: 'adjectival', modifies: 'δόξαν',
    decoys: ['ζητεῖτε', 'μόνου'], help: 'δόξαν glory · μόνου only · ζητεῖτε you seek · ; = ?',
    translation: 'And you do not seek the glory that comes from the only God?',
    wrong: [
      'And the only God does not seek your glory?',
      'And you do not seek the glory in the presence of the only God?',
      'And you seek glory, not the only God?',
    ],
    note: 'The article τήν is repeated in front of the phrase. That ties the phrase to δόξαν like an adjective: “the from-the-only-God glory,” which English smooths into “the glory that comes from the only God.”',
  },
  {
    id: 'matt-6-9', ref: 'Matt 6:9', text: 'Οὕτως οὖν προσεύχεσθε ὑμεῖς· Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς·',
    phrase: 'ἐν τοῖς οὐρανοῖς', prep: 'en-prep', case: 'dative', object: 'οὐρανοῖς', use: 'adjectival', modifies: 'Πάτερ',
    decoys: ['προσεύχεσθε', 'ἡμῶν', 'ὑμεῖς'], help: 'οὕτως like this · οὖν then · προσεύχεσθε pray · Πάτερ Father',
    translation: 'Pray then like this: Our Father who is in heaven,',
    wrong: [
      'Pray then like this: Our Father, you are in heaven,',
      'Pray then like this: Father, we are in heaven,',
      'Pray then like this: Our Father, go into heaven,',
    ],
    note: 'ὁ in front of the phrase links it to Πάτερ: “the in-heaven one,” so “who is in heaven.” Greek says “heavens”; English usually says “heaven.”',
  },
  {
    id: '1john-2-15', ref: '1 John 2:15', text: 'Μὴ ἀγαπᾶτε τὸν κόσμον μηδὲ τὰ ἐν τῷ κόσμῳ.',
    phrase: 'ἐν τῷ κόσμῳ', prep: 'en-prep', case: 'dative', object: 'κόσμῳ', use: 'substantival',
    decoys: ['ἀγαπᾶτε', 'κόσμον'], help: 'μὴ ἀγαπᾶτε do not love · μηδέ nor',
    translation: 'Do not love the world or the things in the world.',
    wrong: [
      'Do not love the world, which is in the world.',
      'Do not love the world or anyone in the world.',
      'Do not love the world, but love the things in it.',
    ],
    note: 'τά (neuter plural) with no noun turns the phrase into a noun: “the things in the world.”',
  },
  {
    id: 'mark-1-36', ref: 'Mark 1:36', text: 'καὶ κατεδίωξεν αὐτὸν Σίμων καὶ οἱ μετʼ αὐτοῦ,',
    phrase: 'μετʼ αὐτοῦ', prep: 'meta', case: 'genitive', object: 'αὐτοῦ', use: 'substantival',
    decoys: ['κατεδίωξεν', 'Σίμων'], help: 'κατεδίωξεν searched for · Σίμων Simon',
    translation: 'And Simon and those with him searched for him.',
    wrong: [
      'And Simon searched for him and was with them.',
      'And Simon and those after him searched for him.',
      'And he searched for Simon and those with him.',
    ],
    note: 'οἱ (masculine plural) with no noun makes the phrase mean “those (people) with him.”',
  },
]

const noun = (id: string, lemma: string, lexical: string, gloss: string, forms: DeclensionParadigm['forms']): DeclensionParadigm =>
  ({ id, lemma, lexical, gloss, pattern: 'noun', forms })

// Chapter 8's new nouns, parsed in the workbook's first exercise.
export const CH8_NOUNS: DeclensionParadigm[] = [
  noun('hemera', 'ἡμέρα', 'ἡμέρα, -ας, ἡ', 'day', {
    feminine: { sg: ['ἡμέρα', 'ἡμέρας', 'ἡμέρᾳ', 'ἡμέραν'], pl: ['ἡμέραι', 'ἡμερῶν', 'ἡμέραις', 'ἡμέρας'] },
  }),
  noun('thalassa', 'θάλασσα', 'θάλασσα, -ης, ἡ', 'sea', {
    feminine: { sg: ['θάλασσα', 'θαλάσσης', 'θαλάσσῃ', 'θάλασσαν'], pl: ['θάλασσαι', 'θαλασσῶν', 'θαλάσσαις', 'θαλάσσας'] },
  }),
  noun('oikia', 'οἰκία', 'οἰκία, -ας, ἡ', 'house', {
    feminine: { sg: ['οἰκία', 'οἰκίας', 'οἰκίᾳ', 'οἰκίαν'], pl: ['οἰκίαι', 'οἰκιῶν', 'οἰκίαις', 'οἰκίας'] },
  }),
  noun('parabole', 'παραβολή', 'παραβολή, -ῆς, ἡ', 'parable', {
    feminine: { sg: ['παραβολή', 'παραβολῆς', 'παραβολῇ', 'παραβολήν'], pl: ['παραβολαί', 'παραβολῶν', 'παραβολαῖς', 'παραβολάς'] },
  }),
  noun('thanatos', 'θάνατος', 'θάνατος, -ου, ὁ', 'death', {
    masculine: { sg: ['θάνατος', 'θανάτου', 'θανάτῳ', 'θάνατον'], pl: ['θάνατοι', 'θανάτων', 'θανάτοις', 'θανάτους'] },
  }),
  noun('oikos', 'οἶκος', 'οἶκος, -ου, ὁ', 'house', {
    masculine: { sg: ['οἶκος', 'οἴκου', 'οἴκῳ', 'οἶκον'], pl: ['οἶκοι', 'οἴκων', 'οἴκοις', 'οἴκους'] },
  }),
  noun('ochlos', 'ὄχλος', 'ὄχλος, -ου, ὁ', 'crowd', {
    masculine: { sg: ['ὄχλος', 'ὄχλου', 'ὄχλῳ', 'ὄχλον'], pl: ['ὄχλοι', 'ὄχλων', 'ὄχλοις', 'ὄχλους'] },
  }),
  // Like προφήτης: first declension masculine, genitive -ου. A name, so singular only.
  noun('ioannes', 'Ἰωάννης', 'Ἰωάννης, -ου, ὁ', 'John', {
    masculine: { sg: ['Ἰωάννης', 'Ἰωάννου', 'Ἰωάννῃ', 'Ἰωάννην'] },
  }),
]

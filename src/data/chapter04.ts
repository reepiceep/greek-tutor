import type { Chapter } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 4: Punctuation and Syllabification.
// Vocabulary only for now: flashcards and the vocab quiz.

export const chapter04: Chapter = {
  number: 4,
  title: 'Punctuation and Syllabification',
  short: 'First words (vocab)',
  topics: [],
  vocab: [
    { id: 'angelos', lemma: 'ἄγγελος', lexical: 'ἄγγελος, -ου, ὁ', pos: 'noun', gloss: 'angel; messenger', hook: 'Angel; the name Angela.', accept: ['angel', 'messenger'] },
    { id: 'amen', lemma: 'ἀμήν', pos: 'adverb', gloss: 'verily, truly, amen, so let it be', hook: 'Amen: the same word, from Hebrew.', accept: ['amen', 'truly', 'verily', 'so let it be'] },
    { id: 'anthropos', lemma: 'ἄνθρωπος', lexical: 'ἄνθρωπος, -ου, ὁ', pos: 'noun', gloss: 'man; person, human being; people, mankind', hook: 'Anthropology: the study of humankind.', accept: ['man', 'person', 'human being', 'human', 'people', 'mankind'] },
    { id: 'apostolos', lemma: 'ἀπόστολος', lexical: 'ἀπόστολος, -ου, ὁ', pos: 'noun', gloss: 'apostle; envoy, messenger', hook: 'Apostle: one sent out.', accept: ['apostle', 'envoy', 'messenger'] },
    { id: 'galilaia', lemma: 'Γαλιλαία', lexical: 'Γαλιλαία, -ας, ἡ', pos: 'noun', gloss: 'Galilee', accept: ['galilee'] },
    { id: 'graphe', lemma: 'γραφή', lexical: 'γραφή, -ῆς, ἡ', pos: 'noun', gloss: 'writing, Scripture', hook: 'Graphic, autograph, biography: writing.', accept: ['writing', 'scripture'] },
    { id: 'doxa', lemma: 'δόξα', lexical: 'δόξα, -ης, ἡ', pos: 'noun', gloss: 'glory, majesty, fame', hook: 'Doxology: words of glory to God.', accept: ['glory', 'majesty', 'fame'] },
    { id: 'ego', lemma: 'ἐγώ', pos: 'pronoun', gloss: 'I', hook: 'Ego: the self, “I.”', accept: ['i'] },
    { id: 'eschatos', lemma: 'ἔσχατος', lexical: 'ἔσχατος, -η, -ον', pos: 'adjective', gloss: 'last', hook: 'Eschatology: the study of the last things.', accept: ['last', 'final'] },
    { id: 'zoe', lemma: 'ζωή', lexical: 'ζωή, -ῆς, ἡ', pos: 'noun', gloss: 'life', hook: 'Zoology: the study of living things; the name Zoe.', accept: ['life'] },
    { id: 'theos', lemma: 'θεός', lexical: 'θεός, -οῦ, ὁ', pos: 'noun', gloss: 'God, god', hook: 'Theology: the study of God; atheist.', accept: ['god'] },
    { id: 'kai', lemma: 'καί', pos: 'conjunction', gloss: 'and; even, also; namely', accept: ['and', 'even', 'also', 'namely'] },
    { id: 'kardia', lemma: 'καρδία', lexical: 'καρδία, -ας, ἡ', pos: 'noun', gloss: 'heart', hook: 'Cardiology: the study of the heart.', accept: ['heart'] },
    { id: 'kosmos', lemma: 'κόσμος', lexical: 'κόσμος, -ου, ὁ', pos: 'noun', gloss: 'world, universe; humankind', hook: 'Cosmos, cosmic: the ordered universe.', accept: ['world', 'universe', 'humankind'] },
    { id: 'logos', lemma: 'λόγος', lexical: 'λόγος, -ου, ὁ', pos: 'noun', gloss: 'word, Word; statement, message', hook: 'Logic; and every -ology is a “word about” something.', accept: ['word', 'statement', 'message'] },
    { id: 'pneuma', lemma: 'πνεῦμα', lexical: 'πνεῦμα, -ατος, τό', pos: 'noun', gloss: 'spirit, Spirit; wind, breath; inner life', hook: 'Pneumatic: worked by air; pneumonia: in the lungs.', accept: ['spirit', 'wind', 'breath', 'inner life'] },
    { id: 'prophetes', lemma: 'προφήτης', lexical: 'προφήτης, -ου, ὁ', pos: 'noun', gloss: 'prophet', hook: 'Prophet.', accept: ['prophet'] },
    { id: 'sabbaton', lemma: 'σάββατον', lexical: 'σάββατον, -ου, τό', pos: 'noun', gloss: 'Sabbath; week', hook: 'Sabbath; a sabbatical is a rest from work.', accept: ['sabbath', 'week'] },
    { id: 'phone', lemma: 'φωνή', lexical: 'φωνή, -ῆς, ἡ', pos: 'noun', gloss: 'sound, noise; voice', hook: 'Phonics, telephone, symphony: sound.', accept: ['sound', 'noise', 'voice'] },
    { id: 'christos', lemma: 'Χριστός', lexical: 'Χριστός, -οῦ, ὁ', pos: 'noun', gloss: 'Christ, Messiah; Anointed One', hook: 'Christ: the Anointed One, the Greek for Messiah.', accept: ['christ', 'messiah', 'anointed one'] },
    { id: 'abraam', lemma: 'Ἀβραάμ', lexical: 'Ἀβραάμ, ὁ', pos: 'noun', gloss: 'Abraham', accept: ['abraham'] },
    { id: 'dauid', lemma: 'Δαυίδ', lexical: 'Δαυίδ, ὁ', pos: 'noun', gloss: 'David', accept: ['david'] },
    { id: 'paulos', lemma: 'Παῦλος', lexical: 'Παῦλος, -ου, ὁ', pos: 'noun', gloss: 'Paul', accept: ['paul'] },
    { id: 'petros', lemma: 'Πέτρος', lexical: 'Πέτρος, -ου, ὁ', pos: 'noun', gloss: 'Peter', hook: 'Petrify, petroleum: Peter is “rock.”', accept: ['peter'] },
    { id: 'pilatos', lemma: 'Πιλᾶτος', lexical: 'Πιλᾶτος, -ου, ὁ', pos: 'noun', gloss: 'Pilate', accept: ['pilate'] },
    { id: 'simon', lemma: 'Σίμων', lexical: 'Σίμων, -ωνος, ὁ', pos: 'noun', gloss: 'Simon', accept: ['simon'] },
  ],
  paradigms: [],
}

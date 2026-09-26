import { preposition } from './prepositions'
import type { Chapter } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 6: Nominative and Accusative; Definite Article.
// Vocabulary only for now: flashcards and the vocab quiz.

export const chapter06: Chapter = {
  number: 6,
  title: 'Nominative and Accusative',
  short: 'Nom. & acc. (vocab)',
  topics: [],
  vocab: [
    { id: 'agape', lemma: 'ἀγάπη', lexical: 'ἀγάπη, -ης, ἡ', pos: 'noun', gloss: 'love', hook: 'An agape meal: the early church’s love feast.', accept: ['love'] },
    { id: 'allos', lemma: 'ἄλλος', lexical: 'ἄλλος, -η, -ο', pos: 'adjective', gloss: 'other, another', hook: 'Allegory: saying something other than what it seems.', accept: ['other', 'another'] },
    { id: 'autos', lemma: 'αὐτός', lexical: 'αὐτός, -ή, -ό', pos: 'pronoun', gloss: 'he, she, it; him/her/itself; same', hook: 'Automatic, autograph: self-acting, self-written.', accept: ['he', 'she', 'it', 'him', 'her', 'himself', 'herself', 'itself', 'self', 'same'] },
    { id: 'basileia', lemma: 'βασιλεία', lexical: 'βασιλεία, -ας, ἡ', pos: 'noun', gloss: 'kingdom', hook: 'Basilica: originally a royal hall.', accept: ['kingdom', 'reign'] },
    { id: 'de', lemma: 'δέ', pos: 'conjunction', gloss: 'but, and', accept: ['but', 'and'] },
    preposition('en-prep'),
    { id: 'ergon', lemma: 'ἔργον', lexical: 'ἔργον, -ου, τό', pos: 'noun', gloss: 'work, deed, action', hook: 'Ergonomics: the study of people at work; energy.', accept: ['work', 'deed', 'action'] },
    { id: 'kairos', lemma: 'καιρός', lexical: 'καιρός, -οῦ, ὁ', pos: 'noun', gloss: '(appointed) time, season', accept: ['time', 'appointed time', 'season'] },
    { id: 'nyn', lemma: 'νῦν', pos: 'adverb', gloss: 'now; (the) present', hook: 'Sounds like English “now.”', accept: ['now', 'present', 'the present'] },
    { id: 'ho', lemma: 'ὁ', lexical: 'ὁ, ἡ, τό', pos: 'pronoun', gloss: 'the', accept: ['the'] },
    { id: 'hora', lemma: 'ὥρα', lexical: 'ὥρα, -ας, ἡ', pos: 'noun', gloss: 'hour; occasion, moment', hook: 'Hour and horoscope come from ὥρα.', accept: ['hour', 'occasion', 'moment', 'time'] },
    { id: 'hoti', lemma: 'ὅτι', pos: 'conjunction', gloss: 'that, since, because', accept: ['that', 'since', 'because'] },
    { id: 'ou', lemma: 'οὐ', forms: ['οὐκ', 'οὐχ'], pos: 'adverb', gloss: 'not', hook: 'οὐ before a consonant, οὐκ before a smooth breathing, οὐχ before a rough one.', accept: ['not', 'no'] },
  ],
  paradigms: [],
}

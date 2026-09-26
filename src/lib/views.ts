import type { TopicView } from '../data/types'

/** Labels for the chapter-specific practice screens, used by the nav bar and the dashboard. */
export const TOPIC_META: Record<TopicView, { nav: string; title: string; description: string; glyph: string }> = {
  paradigm: { nav: 'εἰμί', title: 'εἰμί drill', description: 'Paradigm, subject & predicate, enclitics', glyph: 'ε' },
  prepositions: { nav: 'Prepositions', title: 'Prepositions', description: 'Meaning by case, phrases, sentences, diagram, elision', glyph: 'π' },
  adjectives: { nav: 'Adjectives', title: 'Adjectives', description: 'Forms, parsing, agreement, and attributive / predicate / substantival', glyph: 'ἀ' },
  pronouns: { nav: 'Pronouns', title: 'Personal pronouns', description: 'ἐγώ, σύ, ἡμεῖς, ὑμεῖς: forms, meaning, verses, new nouns', glyph: 'ἐγ' },
  autos: { nav: 'αὐτός', title: 'αὐτός', description: 'Forms, and its three uses: he/she/it, -self, the same', glyph: 'αὐ' },
  demonstratives: { nav: 'Demonstratives', title: 'Demonstratives', description: 'οὗτος and ἐκεῖνος: forms, agreement, pronoun or adjective', glyph: 'οὗ' },
  relative: { nav: 'Relative pronoun', title: 'Relative pronoun', description: 'ὅς, ἥ, ὅ: forms, article or relative, antecedent and case', glyph: 'ὅς' },
  verbs: { nav: 'Verbs', title: 'Introduction to verbs', description: 'Person, number, tense and aspect, voice, mood; the parts of a verb', glyph: 'ω' },
  present: { nav: 'Present tense', title: 'Present active indicative', description: 'λύω and its endings: form, parse and translate, in charts and in verses', glyph: 'ω' },
  contract: { nav: 'Contract verbs', title: 'Contract verbs', description: 'ἀγαπάω, ποιέω, πληρόω: the contraction rules, forms, and verses', glyph: 'ῶ' },
  declension: { nav: '3rd declension', title: 'Third declension', description: 'Square of Stops, stems, parsing, πᾶς, τίς vs τις', glyph: 'σ' },
}

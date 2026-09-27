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
  participles: { nav: 'Participles', title: 'Introduction to participles', description: 'Verbal adjectives: aspect, voice, agreement, and word structure', glyph: 'ντ' },
  present: { nav: 'Present tense', title: 'Present active indicative', description: 'λύω and its endings: form, parse and translate, in charts and in verses', glyph: 'ω' },
  contract: { nav: 'Contract verbs', title: 'Contract verbs', description: 'ἀγαπάω, ποιέω, πληρόω: the contraction rules, forms, and verses', glyph: 'ῶ' },
  middle: { nav: 'Middle/passive', title: 'Present middle/passive', description: 'λύομαι and middle-only verbs like ἔρχομαι: endings, forms, active or passive, and verses', glyph: 'μαι' },
  future: { nav: 'Future', title: 'Future indicative', description: 'λύσω and λύσομαι: the σ, the Square of Stops, lengthened vowels, ἔσομαι, and present or future', glyph: 'σω' },
  roots: { nav: 'Other futures', title: 'Verbal roots and other futures', description: 'Roots and present stems; liquid futures (μενῶ, ἀποστελῶ) and changed stems (ὄψομαι, γνώσομαι)', glyph: 'ῶ' },
  imperfect: { nav: 'Imperfect', title: 'Imperfect indicative', description: 'ἔλυον and ἐλυόμην: the augment, secondary endings, contract verbs, and present or imperfect', glyph: 'ἐ' },
  aorist: { nav: 'Second aorist', title: 'Second aorist', description: 'ἔλαβον and ἐγενόμην: aorist stems, simple past, and imperfect or aorist', glyph: 'ον' },
  aorist1: { nav: 'First aorist', title: 'First aorist', description: 'ἔλυσα and ἐλυσάμην: the σα, stops and lengthened vowels, liquid aorists, and imperfect or aorist', glyph: 'σα' },
  passive: { nav: 'Passive', title: 'Aorist and future passive', description: 'ἐλύθην and λυθήσομαι: θη, stops before θ, second aorist passives, deponents, and aorist or future', glyph: 'θη' },
  perfect: { nav: 'Perfect', title: 'Perfect indicative', description: 'λέλυκα and λέλυμαι: reduplication, κα, second perfects, and aorist or perfect', glyph: 'λε' },
  cases: { nav: 'Genitive & dative', title: 'Genitive and dative', description: 'The endings, and what each case does in a sentence', glyph: 'γ' },
  declension: { nav: '3rd declension', title: 'Third declension', description: 'Square of Stops, stems, parsing, πᾶς, τίς vs τις', glyph: 'σ' },
}

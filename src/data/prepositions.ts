import type { ElisionItem, PrepPhrase, PrepSentence, SpatialUse, VocabWord } from './types'

// Every preposition in Mounce, Basics of Biblical Greek (4th ed.), chapters 4–20, with the chapter that introduces it.
// Glosses follow Mounce's vocabulary; `accept` holds the English answers the quizzes treat as correct.
export const PREPOSITIONS: VocabWord[] = [
  {
    id: 'en-prep', lemma: 'ἐν', chapter: 6, pos: 'preposition',
    hook: 'Sounds like English “in”.',
    gloss: 'dat: in, on, among',
    cases: [{ case: 'dative', gloss: 'in, on, among', accept: ['in', 'on', 'among'] }],
    accept: ['in', 'on', 'among'],
  },
  {
    id: 'eis', lemma: 'εἰς', chapter: 7, pos: 'preposition',
    hook: 'Eisegesis: reading your own ideas into a text.',
    gloss: 'acc: into, in, among',
    cases: [{ case: 'accusative', gloss: 'into, in, among', accept: ['into', 'in', 'among'] }],
    accept: ['into', 'in', 'among'],
  },
  {
    id: 'apo', lemma: 'ἀπό', forms: ['ἀπ᾽', 'ἀφ᾽'], chapter: 8, pos: 'preposition',
    hook: 'Apostle: one sent away from; apostasy: standing away from.',
    gloss: 'gen: (away) from',
    cases: [{ case: 'genitive', gloss: '(away) from', accept: ['from', 'away from'] }],
    accept: ['from', 'away from'],
  },
  {
    id: 'dia', lemma: 'διά', forms: ['δι᾽'], chapter: 8, pos: 'preposition',
    hook: 'Diameter: a measure through; dialogue: speech through.',
    gloss: 'gen: through; acc: on account of',
    cases: [
      { case: 'genitive', gloss: 'through', accept: ['through'] },
      { case: 'accusative', gloss: 'on account of', accept: ['on account of', 'because of'] },
    ],
    accept: ['through', 'on account of', 'because of'],
  },
  {
    id: 'ek', lemma: 'ἐκ', forms: ['ἐξ'], chapter: 8, pos: 'preposition',
    hook: 'Exodus: the way out; eccentric: out of the center.',
    gloss: 'gen: from, out of',
    cases: [{ case: 'genitive', gloss: 'from, out of', accept: ['from', 'out of'] }],
    accept: ['from', 'out of'],
  },
  {
    id: 'meta', lemma: 'μετά', forms: ['μετ᾽', 'μεθ᾽'], chapter: 8, pos: 'preposition',
    hook: 'Metamorphosis: a change after; think “meet up with.”',
    gloss: 'gen: with; acc: after',
    cases: [
      { case: 'genitive', gloss: 'with', accept: ['with'] },
      { case: 'accusative', gloss: 'after', accept: ['after'] },
    ],
    accept: ['with', 'after'],
  },
  {
    id: 'para', lemma: 'παρά', forms: ['παρ᾽'], chapter: 8, pos: 'preposition',
    hook: 'Parallel: lines beside each other; paramedic: working alongside.',
    gloss: 'gen: from; dat: beside, in the presence of; acc: alongside of',
    cases: [
      { case: 'genitive', gloss: 'from', accept: ['from'] },
      { case: 'dative', gloss: 'beside, in the presence of', accept: ['beside', 'in the presence of'] },
      { case: 'accusative', gloss: 'alongside of', accept: ['alongside', 'alongside of'] },
    ],
    accept: ['from', 'beside', 'in the presence of', 'alongside', 'alongside of'],
  },
  {
    id: 'pros', lemma: 'πρός', chapter: 8, pos: 'preposition',
    hook: 'Prosthetic: something added toward the body; proselyte: one who comes to.',
    gloss: 'acc: to, towards, with',
    cases: [{ case: 'accusative', gloss: 'to, towards, with', accept: ['to', 'towards', 'toward', 'with'] }],
    accept: ['to', 'towards', 'toward', 'with'],
  },
  {
    id: 'hypo', lemma: 'ὑπό', forms: ['ὑπ᾽', 'ὑφ᾽'], chapter: 8, pos: 'preposition',
    hook: 'Hypodermic: under the skin.',
    gloss: 'gen: by; acc: under',
    cases: [
      { case: 'genitive', gloss: 'by', accept: ['by'] },
      { case: 'accusative', gloss: 'under', accept: ['under', 'below'] },
    ],
    accept: ['by', 'under', 'below'],
  },
  {
    id: 'peri', lemma: 'περί', chapter: 10, pos: 'preposition',
    hook: 'Perimeter: the measure around; periscope: look around.',
    gloss: 'gen: concerning, about; acc: around',
    cases: [
      { case: 'genitive', gloss: 'concerning, about', accept: ['concerning', 'about'] },
      { case: 'accusative', gloss: 'around', accept: ['around'] },
    ],
    accept: ['concerning', 'about', 'around'],
  },
  {
    id: 'syn', lemma: 'σύν', chapter: 10, pos: 'preposition',
    hook: 'Synagogue: a gathering with; synthesis: putting with.',
    gloss: 'dat: with',
    cases: [{ case: 'dative', gloss: 'with', accept: ['with'] }],
    accept: ['with'],
  },
  {
    id: 'epi', lemma: 'ἐπί', forms: ['ἐπ᾽', 'ἐφ᾽'], chapter: 11, pos: 'preposition',
    hook: 'Epidermis: the layer on the skin; epitaph: words on a tomb.',
    gloss: 'gen: on, over, when; dat: on the basis of, at; acc: on, to, against',
    cases: [
      { case: 'genitive', gloss: 'on, over, when', accept: ['on', 'over', 'when'] },
      { case: 'dative', gloss: 'on the basis of, at', accept: ['on the basis of', 'at'] },
      { case: 'accusative', gloss: 'on, to, against', accept: ['on', 'to', 'against'] },
    ],
    accept: ['on', 'over', 'when', 'on the basis of', 'at', 'to', 'against'],
  },
  {
    id: 'exo', lemma: 'ἔξω', chapter: 11, pos: 'preposition',
    hook: 'Exoskeleton: a skeleton on the outside.',
    gloss: 'adverb: without; prep (gen): outside',
    cases: [{ case: 'genitive', gloss: 'outside', accept: ['outside', 'outside of'] }],
    accept: ['outside', 'outside of', 'without'],
  },
  {
    id: 'heos', lemma: 'ἕως', chapter: 12, pos: 'preposition',
    hook: 'Think “how far”: as far as, until.',
    gloss: 'conj: until; prep (gen): as far as',
    cases: [{ case: 'genitive', gloss: 'as far as, until', accept: ['as far as', 'until'] }],
    accept: ['as far as', 'until'],
  },
  {
    id: 'hyper', lemma: 'ὑπέρ', chapter: 12, pos: 'preposition',
    hook: 'Hyperactive: above normal.',
    gloss: 'gen: in behalf of; acc: above',
    cases: [
      { case: 'genitive', gloss: 'in behalf of', accept: ['in behalf of', 'on behalf of', 'for'] },
      { case: 'accusative', gloss: 'above', accept: ['above'] },
    ],
    accept: ['in behalf of', 'on behalf of', 'for', 'above'],
  },
  {
    id: 'enopion', lemma: 'ἐνώπιον', chapter: 14, pos: 'preposition',
    hook: 'ἐν + ὤψ (face): “in the face of,” before.',
    gloss: 'gen: before',
    cases: [{ case: 'genitive', gloss: 'before', accept: ['before', 'in front of'] }],
    accept: ['before', 'in front of'],
  },
  {
    id: 'kata', lemma: 'κατά', forms: ['κατ᾽', 'καθ᾽'], chapter: 14, pos: 'preposition',
    hook: 'Catacomb, cataract: going down; catalogue: according to a list.',
    gloss: 'gen: down from, against; acc: according to, throughout, during',
    cases: [
      { case: 'genitive', gloss: 'down from, against', accept: ['down from', 'against'] },
      { case: 'accusative', gloss: 'according to, throughout, during', accept: ['according to', 'throughout', 'during'] },
    ],
    accept: ['down from', 'against', 'according to', 'throughout', 'during'],
  },
]

export function preposition(id: string): VocabWord {
  const p = PREPOSITIONS.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown preposition ${id}`)
  return p
}

/** Chapters where new prepositions appear, for the "through chapter N" picker. */
export const PREPOSITION_CHAPTERS = [...new Set(PREPOSITIONS.map((p) => p.chapter!))]

// Practice content for the prepositions after chapter 8 (chapter 8's own items live in chapter08.ts).

export const LATER_PHRASES: PrepPhrase[] = [
  { id: 'en-ourano', greek: 'ἐν τῷ οὐρανῷ', prep: 'en-prep', case: 'dative', number: 'sg', meaning: 'in', object: 'heaven' },
  { id: 'en-kardia', greek: 'ἐν τῇ καρδίᾳ', prep: 'en-prep', case: 'dative', number: 'sg', meaning: 'in', object: 'the heart' },
  { id: 'en-anthropois', greek: 'ἐν τοῖς ἀνθρώποις', prep: 'en-prep', case: 'dative', number: 'pl', meaning: 'among', object: 'the people', avoid: ['with'] },
  { id: 'eis-kosmon', greek: 'εἰς τὸν κόσμον', prep: 'eis', case: 'accusative', number: 'sg', meaning: 'into', object: 'the world' },
  { id: 'eis-oikian', greek: 'εἰς τὴν οἰκίαν', prep: 'eis', case: 'accusative', number: 'sg', meaning: 'into', object: 'the house' },
  { id: 'peri-iesou', greek: 'περὶ τοῦ Ἰησοῦ', prep: 'peri', case: 'genitive', number: 'sg', meaning: 'concerning', object: 'Jesus' },
  { id: 'peri-thalassan', greek: 'περὶ τὴν θάλασσαν', prep: 'peri', case: 'accusative', number: 'sg', meaning: 'around', object: 'the sea' },
  { id: 'syn-mathetais', greek: 'σὺν τοῖς μαθηταῖς', prep: 'syn', case: 'dative', number: 'pl', meaning: 'with', object: 'the disciples' },
  { id: 'epi-thalasses', greek: 'ἐπὶ τῆς θαλάσσης', prep: 'epi', case: 'genitive', number: 'sg', meaning: 'on', object: 'the sea' },
  { id: 'epi-rhemati', greek: 'ἐπὶ τῷ ῥήματι', prep: 'epi', case: 'dative', number: 'sg', meaning: 'on the basis of', object: 'the word' },
  { id: 'epi-kephalen', greek: 'ἐπὶ τὴν κεφαλήν', prep: 'epi', case: 'accusative', number: 'sg', meaning: 'on', object: 'the head' },
  { id: 'kata-nomon', greek: 'κατὰ τὸν νόμον', prep: 'kata', case: 'accusative', number: 'sg', meaning: 'according to', object: 'the law' },
  { id: 'kata-iesou', greek: 'κατὰ τοῦ Ἰησοῦ', prep: 'kata', case: 'genitive', number: 'sg', meaning: 'against', object: 'Jesus' },
  { id: 'hyper-adelphon', greek: 'ὑπὲρ τῶν ἀδελφῶν', prep: 'hyper', case: 'genitive', number: 'pl', meaning: 'in behalf of', object: 'the brothers' },
  { id: 'hyper-didaskalon', greek: 'ὑπὲρ τὸν διδάσκαλον', prep: 'hyper', case: 'accusative', number: 'sg', meaning: 'above', object: 'the teacher' },
  { id: 'heos-thalasses', greek: 'ἕως τῆς θαλάσσης', prep: 'heos', case: 'genitive', number: 'sg', meaning: 'as far as', object: 'the sea' },
  { id: 'enopion-theou', greek: 'ἐνώπιον τοῦ θεοῦ', prep: 'enopion', case: 'genitive', number: 'sg', meaning: 'before', object: 'God', avoid: ['in the presence of'] },
  { id: 'exo-poleos', greek: 'ἔξω τῆς πόλεως', prep: 'exo', case: 'genitive', number: 'sg', meaning: 'outside', object: 'the city', avoid: ['out of'] },
]

export const LATER_ELISIONS: ElisionItem[] = [
  { id: 'epi-auton', prep: 'epi', next: 'αὐτόν', nextGloss: 'him', options: ['ἐπ᾽ αὐτόν', 'ἐφ᾽ αὐτόν', 'ἐπὶ αὐτόν'], rule: 'Before a vowel the final ι drops: ἐπ᾽.' },
  { id: 'epi-hemas', prep: 'epi', next: 'ἡμᾶς', nextGloss: 'us', options: ['ἐφ᾽ ἡμᾶς', 'ἐπ᾽ ἡμᾶς', 'ἐπὶ ἡμᾶς'], rule: 'Before rough breathing the ι drops and π becomes φ: ἐφ᾽.' },
  { id: 'kata-emou', prep: 'kata', next: 'ἐμοῦ', nextGloss: 'me', options: ['κατ᾽ ἐμοῦ', 'καθ᾽ ἐμοῦ', 'κατὰ ἐμοῦ'], rule: 'Before smooth breathing the α drops: κατ᾽.' },
  { id: 'kata-hemon', prep: 'kata', next: 'ἡμῶν', nextGloss: 'us', options: ['καθ᾽ ἡμῶν', 'κατ᾽ ἡμῶν', 'κατὰ ἡμῶν'], rule: 'Before rough breathing the α drops and τ becomes θ: καθ᾽ (Rom 8:31).' },
  { id: 'peri-autou', prep: 'peri', next: 'αὐτοῦ', nextGloss: 'him', options: ['περὶ αὐτοῦ', 'περ᾽ αὐτοῦ'], rule: 'περί never elides.' },
  { id: 'hyper-hemon', prep: 'hyper', next: 'ἡμῶν', nextGloss: 'us', options: ['ὑπὲρ ἡμῶν', 'ὑπ᾽ ἡμῶν', 'ὑφ᾽ ἡμῶν'], rule: 'ὑπέρ ends in a consonant, so it never elides. ὑπ᾽ and ὑφ᾽ are forms of ὑπό.' },
]

export const LATER_SPATIAL: SpatialUse[] = [
  { prep: 'en-prep', case: 'dative', shape: 'in', gloss: 'in' },
  { prep: 'eis', case: 'accusative', shape: 'into', gloss: 'into' },
  { prep: 'epi', case: 'genitive', shape: 'on', gloss: 'on' },
  { prep: 'peri', case: 'accusative', shape: 'around', gloss: 'around' },
  { prep: 'hyper', case: 'accusative', shape: 'above', gloss: 'above' },
  { prep: 'kata', case: 'genitive', shape: 'downFrom', gloss: 'down from' },
]

// Real sentences from the SBLGNT (CC BY 4.0, Society of Biblical Literature and Logos Bible Software).
// The English is a literal translation written for this app, not taken from a published version.
export const SENTENCES: PrepSentence[] = [
  {
    id: 'john-1-1a', ref: 'John 1:1', text: 'Ἐν ἀρχῇ ἦν ὁ λόγος,', phrase: 'Ἐν ἀρχῇ',
    prep: 'en-prep', case: 'dative', meaning: 'in', object: 'the beginning', english: '{} was the Word,',
  },
  {
    id: 'john-1-1b', ref: 'John 1:1', text: 'καὶ ὁ λόγος ἦν πρὸς τὸν θεόν,', phrase: 'πρὸς τὸν θεόν',
    prep: 'pros', case: 'accusative', meaning: 'with', object: 'God', english: 'and the Word was {},',
    note: 'πρός + acc usually means “to, towards,” but with a verb like “was” it means “with” (in company with).',
  },
  {
    id: 'john-1-3', ref: 'John 1:3', text: 'πάντα διʼ αὐτοῦ ἐγένετο,', phrase: 'διʼ αὐτοῦ',
    prep: 'dia', case: 'genitive', meaning: 'through', object: 'him', english: 'all things came into being {},',
    note: 'διʼ is διά with its α elided before the vowel of αὐτοῦ.',
  },
  {
    id: 'john-1-6', ref: 'John 1:6', text: 'Ἐγένετο ἄνθρωπος ἀπεσταλμένος παρὰ θεοῦ,', phrase: 'παρὰ θεοῦ',
    prep: 'para', case: 'genitive', meaning: 'from', object: 'God', english: 'There came a man sent {},',
  },
  {
    id: 'john-1-7', ref: 'John 1:7', text: 'ἵνα μαρτυρήσῃ περὶ τοῦ φωτός,', phrase: 'περὶ τοῦ φωτός',
    prep: 'peri', case: 'genitive', meaning: 'concerning', object: 'the light', english: 'so that he might testify {},',
    avoid: ['around'],
  },
  {
    id: 'john-1-14', ref: 'John 1:14', text: 'Καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν,', phrase: 'ἐν ἡμῖν',
    prep: 'en-prep', case: 'dative', meaning: 'among', object: 'us', english: 'And the Word became flesh and dwelt {},',
    avoid: ['with', 'in the presence of', 'beside'],
  },
  {
    id: 'john-3-17', ref: 'John 3:17', text: 'οὐ γὰρ ἀπέστειλεν ὁ θεὸς τὸν υἱὸν εἰς τὸν κόσμον', phrase: 'εἰς τὸν κόσμον',
    prep: 'eis', case: 'accusative', meaning: 'into', object: 'the world', english: 'For God did not send the Son {}',
    avoid: ['to'],
  },
  {
    id: 'john-6-19', ref: 'John 6:19', text: 'θεωροῦσιν τὸν Ἰησοῦν περιπατοῦντα ἐπὶ τῆς θαλάσσης', phrase: 'ἐπὶ τῆς θαλάσσης',
    prep: 'epi', case: 'genitive', meaning: 'on', object: 'the sea', english: 'they see Jesus walking {}',
    avoid: ['above', 'in'],
  },
  {
    id: 'matt-3-6', ref: 'Matt 3:6', text: 'καὶ ἐβαπτίζοντο ἐν τῷ Ἰορδάνῃ ποταμῷ ὑπʼ αὐτοῦ', phrase: 'ὑπʼ αὐτοῦ',
    prep: 'hypo', case: 'genitive', meaning: 'by', object: 'him', english: 'and they were being baptized in the Jordan River {}',
    note: 'ὑπό + gen with a passive verb gives the agent: “by him.” ὑπʼ is ὑπό elided before a vowel.',
  },
  {
    id: 'matt-3-13', ref: 'Matt 3:13', text: 'Τότε παραγίνεται ὁ Ἰησοῦς ἀπὸ τῆς Γαλιλαίας ἐπὶ τὸν Ἰορδάνην', phrase: 'ἐπὶ τὸν Ἰορδάνην',
    prep: 'epi', case: 'accusative', meaning: 'to', object: 'the Jordan', english: 'Then Jesus comes from Galilee {}',
    avoid: ['into', 'towards'],
  },
  {
    id: 'matt-4-1', ref: 'Matt 4:1', text: 'Τότε ὁ Ἰησοῦς ἀνήχθη εἰς τὴν ἔρημον ὑπὸ τοῦ πνεύματος,', phrase: 'ὑπὸ τοῦ πνεύματος',
    prep: 'hypo', case: 'genitive', meaning: 'by', object: 'the Spirit', english: 'Then Jesus was led up into the wilderness {},',
    avoid: ['through'],
  },
  {
    id: 'matt-6-10', ref: 'Matt 6:10', text: 'ὡς ἐν οὐρανῷ καὶ ἐπὶ γῆς·', phrase: 'ἐπὶ γῆς',
    prep: 'epi', case: 'genitive', meaning: 'on', object: 'earth', english: 'as in heaven, also {}.',
    avoid: ['in', 'among'],
  },
  {
    id: 'matt-10-24', ref: 'Matt 10:24', text: 'Οὐκ ἔστιν μαθητὴς ὑπὲρ τὸν διδάσκαλον', phrase: 'ὑπὲρ τὸν διδάσκαλον',
    prep: 'hyper', case: 'accusative', meaning: 'above', object: 'the teacher', english: 'A disciple is not {}',
  },
  {
    id: 'matt-26-59', ref: 'Matt 26:59', text: 'ἐζήτουν ψευδομαρτυρίαν κατὰ τοῦ Ἰησοῦ', phrase: 'κατὰ τοῦ Ἰησοῦ',
    prep: 'kata', case: 'genitive', meaning: 'against', object: 'Jesus', english: 'they were seeking false testimony {}',
    avoid: ['concerning'],
  },
  {
    id: 'matt-28-20a', ref: 'Matt 28:20', text: 'καὶ ἰδοὺ ἐγὼ μεθʼ ὑμῶν εἰμι πάσας τὰς ἡμέρας', phrase: 'μεθʼ ὑμῶν',
    prep: 'meta', case: 'genitive', meaning: 'with', object: 'you', english: 'and look, I am {} all the days',
    note: 'μεθʼ is μετά before the rough breathing of ὑμῶν: the α drops and τ becomes θ.',
    avoid: ['among', 'beside', 'in the presence of'],
  },
  {
    id: 'matt-28-20b', ref: 'Matt 28:20', text: 'ἐγὼ μεθʼ ὑμῶν εἰμι πάσας τὰς ἡμέρας ἕως τῆς συντελείας τοῦ αἰῶνος.', phrase: 'ἕως τῆς συντελείας τοῦ αἰῶνος',
    prep: 'heos', case: 'genitive', meaning: 'until', object: 'the end of the age', english: 'I am with you all the days {}.',
    note: 'ἕως + gen is “as far as”; with time words it means “until.”',
    avoid: ['after', 'during', 'throughout'],
  },
  {
    id: 'mark-1-9a', ref: 'Mark 1:9', text: 'ἦλθεν Ἰησοῦς ἀπὸ Ναζαρὲτ τῆς Γαλιλαίας', phrase: 'ἀπὸ Ναζαρὲτ τῆς Γαλιλαίας',
    prep: 'apo', case: 'genitive', meaning: 'from', object: 'Nazareth of Galilee', english: 'Jesus came {}',
    note: 'Ναζαρέτ is indeclinable, but τῆς Γαλιλαίας shows the phrase is genitive.',
  },
  {
    id: 'mark-1-9b', ref: 'Mark 1:9', text: 'καὶ ἐβαπτίσθη εἰς τὸν Ἰορδάνην ὑπὸ Ἰωάννου.', phrase: 'ὑπὸ Ἰωάννου',
    prep: 'hypo', case: 'genitive', meaning: 'by', object: 'John', english: 'and he was baptized in the Jordan {}.',
    avoid: ['through'],
  },
  {
    id: 'mark-1-10', ref: 'Mark 1:10', text: 'καὶ εὐθὺς ἀναβαίνων ἐκ τοῦ ὕδατος', phrase: 'ἐκ τοῦ ὕδατος',
    prep: 'ek', case: 'genitive', meaning: 'out of', object: 'the water', english: 'and immediately, coming up {}',
    avoid: ['away from', 'down from', 'outside'],
  },
  {
    id: 'mark-1-13', ref: 'Mark 1:13', text: 'καὶ ἦν μετὰ τῶν θηρίων,', phrase: 'μετὰ τῶν θηρίων',
    prep: 'meta', case: 'genitive', meaning: 'with', object: 'the wild animals', english: 'and he was {},',
    avoid: ['among', 'beside', 'in the presence of'],
  },
  {
    id: 'mark-3-34', ref: 'Mark 3:34', text: 'τοὺς περὶ αὐτὸν κύκλῳ καθημένους', phrase: 'περὶ αὐτὸν',
    prep: 'peri', case: 'accusative', meaning: 'around', object: 'him', english: 'those sitting in a circle {}',
    avoid: ['concerning', 'beside', 'alongside'],
  },
  {
    id: 'mark-4-1', ref: 'Mark 4:1', text: 'Καὶ πάλιν ἤρξατο διδάσκειν παρὰ τὴν θάλασσαν.', phrase: 'παρὰ τὴν θάλασσαν',
    prep: 'para', case: 'accusative', meaning: 'alongside', object: 'the sea', english: 'And again he began to teach {}.',
    avoid: ['beside', 'on', 'at', 'in the presence of'],
  },
  {
    id: 'mark-9-2', ref: 'Mark 9:2', text: 'Καὶ μετὰ ἡμέρας ἓξ παραλαμβάνει ὁ Ἰησοῦς τὸν Πέτρον', phrase: 'μετὰ ἡμέρας ἓξ',
    prep: 'meta', case: 'accusative', meaning: 'after', object: 'six days', english: 'And {} Jesus takes Peter',
    note: 'The same preposition means “with” in the genitive but “after” in the accusative.',
    avoid: ['during', 'throughout'],
  },
  {
    id: 'luke-1-19', ref: 'Luke 1:19', text: 'Ἐγώ εἰμι Γαβριὴλ ὁ παρεστηκὼς ἐνώπιον τοῦ θεοῦ,', phrase: 'ἐνώπιον τοῦ θεοῦ',
    prep: 'enopion', case: 'genitive', meaning: 'before', object: 'God', english: 'I am Gabriel, who stands {},',
    avoid: ['in the presence of', 'beside', 'alongside', 'with'],
  },
  {
    id: 'luke-2-22', ref: 'Luke 2:22', text: 'Καὶ ὅτε ἐπλήσθησαν αἱ ἡμέραι τοῦ καθαρισμοῦ αὐτῶν κατὰ τὸν νόμον Μωϋσέως,', phrase: 'κατὰ τὸν νόμον Μωϋσέως',
    prep: 'kata', case: 'accusative', meaning: 'according to', object: 'the law of Moses', english: 'And when the days of their purification were completed {},',
    avoid: ['on account of', 'on the basis of'],
  },
  {
    id: 'luke-23-43', ref: 'Luke 23:43', text: 'σήμερον μετʼ ἐμοῦ ἔσῃ ἐν τῷ παραδείσῳ.', phrase: 'μετʼ ἐμοῦ',
    prep: 'meta', case: 'genitive', meaning: 'with', object: 'me', english: 'today you will be {} in paradise.',
    note: 'μετʼ is μετά elided before the smooth breathing of ἐμοῦ.',
    avoid: ['among', 'beside', 'in the presence of'],
  },
  {
    id: 'acts-7-58', ref: 'Acts 7:58', text: 'καὶ ἐκβαλόντες ἔξω τῆς πόλεως ἐλιθοβόλουν.', phrase: 'ἔξω τῆς πόλεως',
    prep: 'exo', case: 'genitive', meaning: 'outside', object: 'the city', english: 'and after driving him {}, they began stoning him.',
    avoid: ['out of', 'away from', 'from'],
  },
  {
    id: 'acts-14-4', ref: 'Acts 14:4', text: 'καὶ οἱ μὲν ἦσαν σὺν τοῖς Ἰουδαίοις οἱ δὲ σὺν τοῖς ἀποστόλοις.', phrase: 'σὺν τοῖς Ἰουδαίοις',
    prep: 'syn', case: 'dative', meaning: 'with', object: 'the Jews', english: 'and some were {}, but others with the apostles.',
    avoid: ['among', 'beside', 'in the presence of'],
  },
  {
    id: 'rom-5-8', ref: 'Rom 5:8', text: 'Χριστὸς ὑπὲρ ἡμῶν ἀπέθανεν.', phrase: 'ὑπὲρ ἡμῶν',
    prep: 'hyper', case: 'genitive', meaning: 'in behalf of', object: 'us', english: 'Christ died {}.',
    avoid: ['on account of'],
  },
  {
    id: 'rom-8-31', ref: 'Rom 8:31', text: 'εἰ ὁ θεὸς ὑπὲρ ἡμῶν, τίς καθʼ ἡμῶν;', phrase: 'καθʼ ἡμῶν',
    prep: 'kata', case: 'genitive', meaning: 'against', object: 'us', english: 'If God is for us, who is {}?',
    note: 'καθʼ is κατά before the rough breathing of ἡμῶν. Compare ὑπὲρ ἡμῶν, “for us,” earlier in the verse.',
  },
]

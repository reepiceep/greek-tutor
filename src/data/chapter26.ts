import type { Chapter, ParticipleIntroItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 26: Introduction to Participles.
// Practice sentences and explanations are original to this app. No new vocabulary is listed on the chapter page.

const english: ParticipleIntroItem[] = [
  { id: 'walking', prompt: 'The student walking home loved reading. Which is the participle?', options: ['walking', 'reading', 'student', 'loved'], answer: 'walking', explain: 'Walking describes the student. Reading is a gerund: a verbal noun, here the object of loved.' },
  { id: 'singing', prompt: 'The children singing outside enjoyed the evening. Which is the participle?', options: ['singing', 'evening', 'children', 'enjoyed'], answer: 'singing', explain: 'Singing describes the children and keeps the action of sing. Evening only looks like one; it is a noun.' },
  { id: 'reading', prompt: 'Reading the letter, Maria forgot the morning’s troubles. Which is the participle?', options: ['Reading', 'morning’s', 'letter', 'forgot'], answer: 'Reading', explain: 'Reading expresses Maria’s action alongside the main verb forgot.' },
  { id: 'broken', prompt: 'The broken jar lay on the floor. Which is the participle?', options: ['broken', 'jar', 'lay', 'floor'], answer: 'broken', explain: 'Broken is the past participle of break; it describes the jar.' },
  { id: 'teaching', prompt: 'Teaching the crowd, Jesus was sitting in a boat. Which is the participle?', options: ['Teaching', 'was sitting', 'crowd', 'boat'], answer: 'Teaching', explain: 'Teaching describes Jesus as he acts. Was sitting is the main verb, a finite form with its own subject.' },
  { id: 'standing', prompt: 'Waiting is hard for the people standing at the gate. Which is the participle?', options: ['standing', 'Waiting', 'people', 'gate'], answer: 'standing', explain: 'Standing describes the people. Waiting is a gerund, the subject of is.' },
  { id: 'written', prompt: 'The letter written by Paul reached the church. Which is the participle?', options: ['written', 'letter', 'reached', 'church'], answer: 'written', explain: 'Written is the past participle of write; it describes the letter. Reached is the main verb.' },
  { id: 'sitting', prompt: 'Public speaking frightened the man sitting by the door. Which is the participle?', options: ['sitting', 'speaking', 'frightened', 'door'], answer: 'sitting', explain: 'Sitting describes the man. Speaking is a gerund, the subject of frightened.' },
  { id: 'listening', prompt: 'Listening carefully, the disciples were learning the lesson. Which is the participle?', options: ['Listening', 'were learning', 'disciples', 'lesson'], answer: 'Listening', explain: 'Listening describes the disciples. Were learning is the main verb.' },
  { id: 'sown', prompt: 'The seed sown in good soil grew quickly. Which is the participle?', options: ['sown', 'seed', 'grew', 'soil'], answer: 'sown', explain: 'Sown is the past participle of sow; it describes the seed. Grew is the main verb.' },
]

const properties: ParticipleIntroItem[] = [
  { id: 'aspect', prompt: 'Which side of a Greek participle gives its aspect?', options: ['Verbal', 'Adjectival', 'Case ending', 'Article'], answer: 'Verbal', explain: 'Aspect belongs to the participle’s verbal side.' },
  { id: 'voice', prompt: 'Which side of a Greek participle gives its voice?', options: ['Verbal', 'Adjectival', 'Gender', 'Number'], answer: 'Verbal', explain: 'Active, middle, and passive are verbal voice distinctions.' },
  { id: 'case', prompt: 'Which side of a Greek participle gives its case?', options: ['Adjectival', 'Verbal', 'Tense stem', 'Lexical meaning'], answer: 'Adjectival', explain: 'A participle has case because it behaves like an adjective.' },
  { id: 'gender', prompt: 'Which side of a Greek participle gives its gender?', options: ['Adjectival', 'Verbal', 'Aspect', 'Voice'], answer: 'Adjectival', explain: 'Gender belongs to the adjective side of a participle.' },
  { id: 'number', prompt: 'Which side of a Greek participle gives its number?', options: ['Adjectival', 'Verbal', 'Aspect', 'Voice'], answer: 'Adjectival', explain: 'Like an adjective, the participle agrees in number with the word it describes.' },
  { id: 'person', prompt: 'Which of these does a Greek participle lack?', options: ['Person and personal ending', 'Voice', 'Case', 'Gender'], answer: 'Person and personal ending', explain: 'A participle has no personal ending or grammatical person; its case ending marks its adjective side.' },
  { id: 'present', prompt: 'What does the present participle form primarily convey?', options: ['Continuous aspect', 'Undefined aspect', 'Perfective aspect', 'Present time'], answer: 'Continuous aspect', explain: 'Its present stem pictures the action as ongoing; context supplies its time.' },
  { id: 'aorist', prompt: 'What does the aorist participle form primarily convey?', options: ['Undefined aspect', 'Continuous aspect', 'Perfective aspect', 'Past time'], answer: 'Undefined aspect', explain: 'An aorist participle views the action simply as a whole. Its tense name alone does not fix its time.' },
  { id: 'perfect', prompt: 'What does the perfect participle form primarily convey?', options: ['Perfective aspect', 'Continuous aspect', 'Undefined aspect', 'Past time'], answer: 'Perfective aspect', explain: 'The perfect presents a completed action whose results continue.' },
  { id: 'time', prompt: 'Can the tense name of a participle alone tell you its absolute time?', options: ['No; context and the main verb matter', 'Yes; present always means now', 'Yes; aorist always means past', 'Yes; perfect always means future'], answer: 'No; context and the main verb matter', explain: 'Participle tense forms primarily express aspect, not absolute time.' },
  { id: 'adverbial', prompt: 'An adverbial participle most directly adds information to what?', options: ['The main verb or clause', 'A dictionary entry', 'A case ending', 'A personal ending'], answer: 'The main verb or clause', explain: 'An adverbial participle gives a circumstance of the main action.' },
  { id: 'adjectival', prompt: 'An adjectival participle most directly describes what?', options: ['A noun or pronoun', 'A personal ending', 'A tense marker', 'An accent'], answer: 'A noun or pronoun', explain: 'It modifies a noun or pronoun as an adjective does.' },
]

const agreement: ParticipleIntroItem[] = [
  { id: 'man-subject', prompt: 'ὁ ἄνθρωπος is the subject (“the man speaking”). What case, gender, and number must a participle describing him have?', options: ['Nominative masculine singular', 'Accusative masculine singular', 'Nominative feminine singular', 'Nominative masculine plural'], answer: 'Nominative masculine singular', explain: 'ὁ ἄνθρωπος is a singular masculine subject, so its participle agrees in all three features.' },
  { id: 'man-object', prompt: 'τὸν ἄνθρωπον is the direct object (“I saw the man speaking”). What must a participle describing him be?', options: ['Accusative masculine singular', 'Nominative masculine singular', 'Accusative feminine singular', 'Accusative masculine plural'], answer: 'Accusative masculine singular', explain: 'τὸν ἄνθρωπον is a singular masculine direct object.' },
  { id: 'woman-subject', prompt: 'ἡ γυνή is the subject (“the woman listening”). What must a participle describing her be?', options: ['Nominative feminine singular', 'Accusative feminine singular', 'Nominative masculine singular', 'Nominative feminine plural'], answer: 'Nominative feminine singular', explain: 'ἡ γυνή is a singular feminine subject.' },
  { id: 'woman-object', prompt: 'τὴν γυναῖκα is the direct object (“he saw the woman listening”). What must a participle describing her be?', options: ['Accusative feminine singular', 'Nominative feminine singular', 'Accusative masculine singular', 'Accusative feminine plural'], answer: 'Accusative feminine singular', explain: 'τὴν γυναῖκα is a singular feminine direct object.' },
  { id: 'men-subject', prompt: 'οἱ ἄνθρωποι is the subject (“the men walking”). What must a participle describing them be?', options: ['Nominative masculine plural', 'Accusative masculine plural', 'Nominative masculine singular', 'Nominative feminine plural'], answer: 'Nominative masculine plural', explain: 'οἱ ἄνθρωποι is a plural masculine subject.' },
  { id: 'women-object', prompt: 'τὰς γυναῖκας is the direct object (“she greeted the women waiting”). What must a participle describing them be?', options: ['Accusative feminine plural', 'Nominative feminine plural', 'Accusative feminine singular', 'Accusative masculine plural'], answer: 'Accusative feminine plural', explain: 'τὰς γυναῖκας is a plural feminine direct object.' },
  { id: 'child-subject', prompt: 'τὸ παιδίον is the subject (“the child sleeping”). What must a participle describing it be?', options: ['Nominative neuter singular', 'Accusative neuter singular', 'Nominative masculine singular', 'Nominative neuter plural'], answer: 'Nominative neuter singular', explain: 'τὸ παιδίον is a singular neuter subject. The article looks like the accusative too, so the stated role resolves the case.' },
  { id: 'children-subject', prompt: 'τὰ παιδία is the subject (“the children playing”). What must a participle describing them be?', options: ['Nominative neuter plural', 'Accusative neuter plural', 'Nominative neuter singular', 'Nominative masculine plural'], answer: 'Nominative neuter plural', explain: 'τὰ παιδία is a plural neuter subject. The form alone could also be accusative; its role resolves the case.' },
  { id: 'word-of-men', prompt: 'τῶν ἀνθρώπων means “of the men.” What must a participle describing the men be?', options: ['Genitive masculine plural', 'Nominative masculine plural', 'Genitive masculine singular', 'Genitive feminine plural'], answer: 'Genitive masculine plural', explain: 'τῶν ἀνθρώπων is genitive, masculine, and plural.' },
  { id: 'to-woman', prompt: 'τῇ γυναικί means “to the woman.” What must a participle describing her be?', options: ['Dative feminine singular', 'Accusative feminine singular', 'Dative masculine singular', 'Dative feminine plural'], answer: 'Dative feminine singular', explain: 'τῇ γυναικί is dative, feminine, and singular.' },
]

const structure: ParticipleIntroItem[] = [
  { id: 'lyontes-marker', prompt: 'λύοντες = λυ + ο + ντ + ες. Which piece is the participle marker?', options: ['ντ', 'λυ', 'ο', 'ες'], answer: 'ντ', explain: 'The ντ marker identifies an active participle; ες is a case ending.' },
  { id: 'lyontes-ending', prompt: 'λύοντες = λυ + ο + ντ + ες. Which piece is the case ending?', options: ['ες', 'λυ', 'ο', 'ντ'], answer: 'ες', explain: 'The case ending belongs to the participle’s adjective side.' },
  { id: 'lyontes-stem', prompt: 'λύοντες = λυ + ο + ντ + ες. Which piece carries the lexical meaning?', options: ['λυ', 'ο', 'ντ', 'ες'], answer: 'λυ', explain: 'The stem λυ carries the verb’s basic meaning.' },
  { id: 'lyontes-vowel', prompt: 'λύοντες = λυ + ο + ντ + ες. Which piece is the connecting vowel?', options: ['ο', 'λυ', 'ντ', 'ες'], answer: 'ο', explain: 'The ο connects the present stem to the participle marker.' },
  { id: 'lyomenos-marker', prompt: 'λυόμενος = λυ + ο + μενο + ς. Which piece marks the middle/passive participle?', options: ['μενο', 'λυ', 'ο', 'ς'], answer: 'μενο', explain: 'μενο (μενη in the feminine) marks the middle/passive participle.' },
  { id: 'lyomenos-ending', prompt: 'λυόμενος = λυ + ο + μενο + ς. Which piece is the case ending?', options: ['ς', 'λυ', 'ο', 'μενο'], answer: 'ς', explain: 'ς marks nominative masculine singular, as in λόγος (λογο + ς).' },
  { id: 'lyomenon-marker', prompt: 'λυόμενον = λυ + ο + μενο + ν. Which piece marks the middle/passive participle?', options: ['μενο', 'λυ', 'ο', 'ν'], answer: 'μενο', explain: 'The participle marker stays μενο as the case ending changes.' },
  { id: 'lyomenon-ending', prompt: 'λυόμενον = λυ + ο + μενο + ν. Which piece changes to show case, gender, and number?', options: ['ν', 'λυ', 'ο', 'μενο'], answer: 'ν', explain: 'ν marks accusative masculine singular or nominative/accusative neuter singular, as in λόγον and ἔργον.' },
]

export const chapter26: Chapter = {
  number: 26,
  title: 'Introduction to Participles',
  short: 'Intro to participles',
  topics: ['participles'],
  vocab: [],
  paradigms: [],
  participleIntro: { english, properties, agreement, structure },
}

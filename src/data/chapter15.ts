import type { Chapter, EnglishVerbItem, TermItem, VerbPartsItem } from './types'

// Mounce, Basics of Biblical Greek (4th ed.), ch. 15: Introduction to Verbs.
// This chapter introduces the terms for describing verbs; it has no new vocabulary.
// English sentences and definitions are written for this app.

const TERMS: TermItem[] = [
  { term: 'Person', definition: 'Who the subject is: the one speaking (1st), spoken to (2nd), or spoken about (3rd).', example: 'I (1st) · you (2nd) · he, she, it (3rd)' },
  { term: 'Number', definition: 'Whether the subject is one (singular) or more than one (plural).', example: 'I study · we study' },
  { term: 'Agreement', definition: 'A verb matches its subject in person and number.', example: 'he studies · they study' },
  { term: 'Tense', definition: 'In Greek, the form that carries aspect, and in the indicative also time.', example: 'present, future, aorist, imperfect, perfect' },
  { term: 'Aspect', definition: 'How the action is pictured: as ongoing (continuous), as a whole (undefined), or as completed with lasting results (perfective).', example: 'I am studying · I studied · I have studied' },
  { term: 'Time', definition: 'When the action happens: past, present, or future. In Greek, only the indicative shows time.', example: 'I studied · I study · I will study' },
  { term: 'Voice', definition: 'How the subject relates to the action: doing it (active), receiving it (passive), or acting for itself (middle).', example: 'I hit the ball · I was hit by the ball' },
  { term: 'Mood', definition: 'The verb’s relationship to reality: a statement (indicative), a possibility (subjunctive), or a command (imperative).', example: 'you study · you might study · study!' },
  { term: 'Lexical form', definition: 'The form listed in the dictionary; for a verb, the first person singular present active indicative.', example: 'λύω, “I loose”' },
  { term: 'Stem', definition: 'The part of the verb that carries its meaning.', example: 'λυ- in λύομεν' },
  { term: 'Connecting vowel', definition: 'The vowel (ο or ε) that joins the stem to the personal ending.', example: 'the ο in λύ-ο-μεν' },
  { term: 'Personal ending', definition: 'The ending that shows the person and number of the subject.', example: '-μεν, “we,” in λύομεν' },
  { term: 'Parsing', definition: 'Identifying a verb’s tense, voice, mood, person and number, its lexical form, and its meaning.', example: 'λύομεν: present active indicative, 1st plural, from λύω, “we loose”' },
]

const ENGLISH: EnglishVerbItem[] = [
  { id: 'studying', sentence: 'I am studying Greek.', verb: 'am studying', personNumber: '1 sg', time: 'present', aspect: 'continuous', voice: 'active', mood: 'indicative' },
  { id: 'studied', sentence: 'We studied the lesson.', verb: 'studied', personNumber: '1 pl', time: 'past', aspect: 'undefined', voice: 'active', mood: 'indicative' },
  { id: 'will-teach', sentence: 'She will teach the class.', verb: 'will teach', personNumber: '3 sg', time: 'future', aspect: 'undefined', voice: 'active', mood: 'indicative' },
  { id: 'were-writing', sentence: 'You (plural) were writing letters.', verb: 'were writing', personNumber: '2 pl', time: 'past', aspect: 'continuous', voice: 'active', mood: 'indicative' },
  { id: 'being-taught', sentence: 'The disciples were being taught by Jesus.', verb: 'were being taught', personNumber: '3 pl', time: 'past', aspect: 'continuous', voice: 'passive', mood: 'indicative' },
  { id: 'was-written', sentence: 'The letter was written by Paul.', verb: 'was written', personNumber: '3 sg', time: 'past', aspect: 'undefined', voice: 'passive', mood: 'indicative' },
  { id: 'have-believed', sentence: 'I have believed the gospel.', verb: 'have believed', personNumber: '1 sg', aspect: 'perfective', voice: 'active', mood: 'indicative' },
  { id: 'will-be-saved', sentence: 'They will be saved.', verb: 'will be saved', personNumber: '3 pl', time: 'future', voice: 'passive', mood: 'indicative' },
  { id: 'are-listening', sentence: 'You (plural) are listening.', verb: 'are listening', personNumber: '2 pl', time: 'present', aspect: 'continuous', voice: 'active', mood: 'indicative' },
  { id: 'has-been-preached', sentence: 'The word has been preached.', verb: 'has been preached', personNumber: '3 sg', aspect: 'perfective', voice: 'passive', mood: 'indicative' },
  { id: 'will-be-teaching', sentence: 'I will be teaching tomorrow.', verb: 'will be teaching', personNumber: '1 sg', time: 'future', aspect: 'continuous', voice: 'active', mood: 'indicative' },
  { id: 'was-sending', sentence: 'He was sending the apostles.', verb: 'was sending', personNumber: '3 sg', time: 'past', aspect: 'continuous', voice: 'active', mood: 'indicative' },
  { id: 'were-sent', sentence: 'The apostles were sent.', verb: 'were sent', personNumber: '3 pl', time: 'past', aspect: 'undefined', voice: 'passive', mood: 'indicative' },
  { id: 'have-heard', sentence: 'You (singular) have heard the word.', verb: 'have heard', personNumber: '2 sg', aspect: 'perfective', voice: 'active', mood: 'indicative' },
  { id: 'study', sentence: 'Study the vocabulary!', verb: 'Study', personNumber: '2nd person', voice: 'active', mood: 'imperative' },
  { id: 'believe', sentence: 'Believe in the Lord!', verb: 'Believe', personNumber: '2nd person', voice: 'active', mood: 'imperative' },
  { id: 'might-see', sentence: 'We might see the Lord.', verb: 'might see', personNumber: '1 pl', voice: 'active', mood: 'subjunctive' },
  { id: 'may-pass', sentence: 'They may pass the test.', verb: 'may pass', personNumber: '3 pl', voice: 'active', mood: 'subjunctive' },
  { id: 'is-taught', sentence: 'The child is taught by her mother.', verb: 'is taught', personNumber: '3 sg', time: 'present', voice: 'passive', mood: 'indicative' },
  { id: 'we-love', sentence: 'We love, because he first loved us.', verb: 'love', personNumber: '1 pl', time: 'present', voice: 'active', mood: 'indicative' },
]

const PARTS: VerbPartsItem[] = [
  { form: 'λύομεν', stem: 'λυ', vowel: 'ο', ending: 'μεν', subject: 'we', meaning: 'we loose' },
  { form: 'λύετε', stem: 'λυ', vowel: 'ε', ending: 'τε', subject: 'you (plural)', meaning: 'you loose' },
  { form: 'ἀκούομεν', stem: 'ἀκου', vowel: 'ο', ending: 'μεν', subject: 'we', meaning: 'we hear' },
  { form: 'βλέπετε', stem: 'βλεπ', vowel: 'ε', ending: 'τε', subject: 'you (plural)', meaning: 'you see' },
  { form: 'ἔχομεν', stem: 'ἐχ', vowel: 'ο', ending: 'μεν', subject: 'we', meaning: 'we have' },
  { form: 'πιστεύετε', stem: 'πιστευ', vowel: 'ε', ending: 'τε', subject: 'you (plural)', meaning: 'you believe' },
]

export const chapter15: Chapter = {
  number: 15,
  title: 'Introduction to Verbs',
  short: 'Intro to verbs',
  topics: ['verbs'],
  vocab: [],
  paradigms: [],
  verbIntro: { terms: TERMS, english: ENGLISH, parts: PARTS },
}

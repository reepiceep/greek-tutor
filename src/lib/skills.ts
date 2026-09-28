import type { View } from '../App'
import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { ENCLITIC_FORMS } from '../data/chapter08Eimi'
import type { Chapter, DeclensionParadigm, ParadigmRow, TopicView } from '../data/types'
import {
  AUTOS_SLOTS, autosItemId, autosProduceId, autosProduceQuestion, autosSentenceQuestion, autosSlotLabel, autosTranslateQuestion, autosUseQuestion,
} from './autosQuestions'
import {
  adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, adjTranslateQuestion, adjUseItemId, adjUseQuestion, distinctForms, slotsOf,
  translatable,
} from './declensionQuestions'
import {
  CASES_USE, caseUseQuestion, caseUseTranslateQuestion, phraseEnglish, phraseGreek, casePhraseItemId, phraseParseQuestion, phraseSlots,
  phraseTranslateQuestion,
} from './caseQuestions'
import {
  DEMONSTRATIVE_SLOTS, demonstrativeItemId, demonstrativeProduceId, demonstrativeProduceQuestion, demonstrativeSentenceQuestion,
  demonstrativeTranslateQuestion, demonstrativeUseQuestion, lookalikeId, lookalikeQuestion, vocativeCaseQuestion, vocativeFormId,
  vocativeFormQuestion, vocativeItemId,
} from './demonstrativeQuestions'
import {
  encliticAccentQuestion, encliticFormQuestion, encliticRuleQuestion, predicateSubjectQuestion, predicateTranslateQuestion,
} from './eimiQuestions'
import {
  elidedFormItemId, elisionItemId, encliticFormItemId, encliticItemId, paradigmItemId, phraseItemId, predicateItemId, prepItemId,
  sentenceItemId, spatialItemId, vocabItemId,
} from './items'
import { CASE_ABBR, caseUses, elidedForms, prepWord } from './prepositions'
import { LEARNED_BOX, type ItemStats } from './progress'
import {
  pronounEmphasisId, pronounEmphasisQuestion, pronounMeaningId, pronounMeaningQuestion, pronounParseId, pronounParseQuestion,
  pronounVerseCaseQuestion, pronounVerseId, pronounVerseWhoQuestion, PRONOUN_SLOTS, pronounProduceId, pronounProduceQuestion, pronounSlotLabel,
  pronounStressQuestion, pronounVerseTranslateQuestion,
} from './pronounQuestions'
import {
  elidedFormQuestion, elisionQuestion, paradigmIdentifyQuestion, paradigmProduceQuestion, phraseQuestion, prepCaseQuestion,
  prepMeaningQuestion, sentenceQuestion, spatialQuestion, vocabQuestion,
} from './questions'
import {
  relativeAntecedentQuestion, relativeCaseQuestion, relativeFormId, relativeFormQuestion, relativeItemId, relativeTranslateQuestion,
} from './relativeQuestions'
import {
  CONTRACTIONS, PRONOUN, SLOTS, SLOT_LABEL, contractTypeItemId, contractTypeQuestion, contractionItemId, contractionPairs,
  contractionQuestion, inVoice, tellsContractType, endingFormQuestion, endingItemId, endingPersonQuestion, presentDisplay, presentEnglish,
  FUTURE_RULES, futureFormItemId, futureFormQuestion, futureLexicalItemId, futureLexicalQuestion, futureRuleItemId, futureRuleQuestion,
  redupItemId, redupQuestion, PASSIVE_RULES, passiveRuleItemId, passiveRuleQuestion, aoristFormItemId, aoristFormQuestion, augmentItemId, augmentQuestion, hasFutureForm, inTense, rootItemId, rootQuestion, tenseItemId, tensePairs, tenseQuestion, plainEndingsOf, presentIdentifyQuestion, presentItemId, presentProduceQuestion, presentTranslateQuestion, presentVerseId, verseLexicalQuestion,
  verseParseQuestion, voiceItemId, voicePairs, voiceQuestion, inMood, moodItemId, moodPairs, moodQuestion, subjUseItemId, subjUseQuestion,
  tenseVoiceLabel, whichTenseItemId, whichTensePairs, whichTenseQuestion, whichVerbItemId, whichVerbPairs, whichVerbQuestion,
} from './presentQuestions'
import { usageItemId } from './usageQuestions'
import {
  ADJ_READING_SKILLS, adjReadingItemId, adjReadingQuestion, allAdjectives, lexicalFormQuestion, lexicalForms, lexicalItemId, substItemId,
  substItems, substQuestion,
} from './adjReadingQuestions'
import {
  MASTER_COLUMNS, MASTER_ROWS, d3Paradigms, d3ReadingItemId, d3ReadingQuestion, d3ReadingSkills, masterCellQuestion, masterItemId,
} from './d3ReadingQuestions'
import { nounPrepForms, nounPrepItemId, nounPrepQuestion, readingItemId, readingQuestion, readingSkills } from './prepReadingQuestions'
import { ruleItemId, ruleItemQuestion, tisItemId, tisQuestion } from './thirdDeclensionQuestions'
import { TOPIC_META } from './views'
import { PARTICIPLE_AREAS, participleItemId, participleQuestion } from './participleIntroQuestions'
import {
  parsingLabel, participleBuildId, participleBuildQuestion, participleCharts, participleParseId, participleParseQuestion, participleTenseId,
  participleTenseQuestion, participleVerseId, participleVerseParseQuestion, participleVerseTranslateQuestion, tenseChoices, absoluteId, absoluteQuestion, absoluteVerses,
} from './participleQuestions'
import { participleUseId, participleUseQuestion, participleUseTranslateQuestion } from './adjectivalParticipleQuestions'
import {
  KIND_LABEL, infinitive, infinitiveBuildQuestion, infinitiveItemId, infinitivePairs, infinitiveParseQuestion, infinitiveTranslateQuestion,
  infinitiveUseId, infinitiveUseQuestion, infinitiveVerseParseId, infinitiveVerseParseQuestion,
} from './infinitiveQuestions'
import {
  imperative, imperativeBuildQuestion, imperativeItemId, imperativeLabel, imperativeParseQuestion, imperativeTriples, imperativeVerseId,
  imperativeVerseParseQuestion, imperativeVerseTranslateQuestion, parsableVerses, prohibitionQuestion, prohibitionVerses,
} from './imperativeQuestions'
import {
  conditionId, conditionQuestion, conditionTranslateQuestion, didomiBuildQuestion, didomiFormId, didomiParseQuestion, didomiVerseId,
  didomiVerseQuestion,
} from './nonindicativeQuestions'
import {
  PROPERTY_NAMES, type VerbPart, askableProperties, englishItemId, englishVerbQuestion, partsItemId, termDefineQuestion, termItemId,
  termNameQuestion, verbPartQuestion,
} from './verbIntroQuestions'

export interface SkillItem {
  id: string
  /** Readable name, for the dashboard's "Focus on these" list. */
  name: string
  /** Builds a multiple-choice question for this item (used by the daily review). */
  make: () => ChoiceQuestion
}

export interface Skill {
  /** "Topic: skill", e.g. "Prepositions: phrases"; the dashboard groups by the part before the colon. */
  label: string
  view: View
  /** Every progress item in this skill. */
  items: SkillItem[]
}

// Building every chapter's items takes tens of milliseconds, and the daily review needs all of them on every render;
// they depend only on the chapter's data, so each chapter's list is built once.
const skillCache = new WeakMap<Chapter, Skill[]>()

/** All progress items for a chapter, grouped the way the dashboard shows them. */
export function chapterSkills(ch: Chapter): Skill[] {
  let skills = skillCache.get(ch)
  if (!skills) skillCache.set(ch, (skills = buildSkills(ch)))
  return skills
}

function buildSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const p = ch.paradigms.at(0)
  const pForm = (r: ParadigmRow) => r.display ?? r.forms[0]
  const adj = ch.adjectives
  const d3 = ch.thirdDeclension
  const pr = ch.pronouns
  const au = ch.autos
  const dm = ch.demonstratives
  const rl = ch.relative
  const vi = ch.verbIntro
  const parseItems = (dps: DeclensionParadigm[]) =>
    dps.flatMap((dp) => distinctForms(dp).map((f) => ({ id: adjParseItemId(n, dp, f), name: `parse ${f}`, make: () => adjParseQuestion(ch, dp, f) })))
  const skills: Skill[] = [
    {
      label: 'Vocab: Greek → English', view: 'quiz',
      items: ch.vocab.map((w) => ({ id: vocabItemId(n, w, 'g2e'), name: `${w.lemma} → English`, make: () => vocabQuestion(ch, w, 'g2e') })),
    },
    {
      label: 'Vocab: English → Greek', view: 'quiz',
      items: ch.vocab.map((w) => ({ id: vocabItemId(n, w, 'e2g'), name: `“${w.gloss}” → Greek`, make: () => vocabQuestion(ch, w, 'e2g') })),
    },
    {
      label: 'εἰμί: produce forms', view: 'paradigm',
      items: (p?.rows ?? []).map((r) => ({ id: paradigmItemId(n, p!.id, r, 'produce'), name: `“${r.gloss}” → ${pForm(r)}`, make: () => paradigmProduceQuestion(ch, p!, r) })),
    },
    {
      label: 'εἰμί: identify forms', view: 'paradigm',
      items: (p?.rows ?? []).map((r) => ({ id: paradigmItemId(n, p!.id, r, 'identify'), name: `${pForm(r)} = ${r.label}`, make: () => paradigmIdentifyQuestion(ch, p!, r) })),
    },
    {
      label: 'εἰμί: subject & predicate', view: 'paradigm',
      items: (ch.predicates ?? []).flatMap((it) => [
        { id: predicateItemId(n, it, 'subject'), name: `${it.text} (subject)`, make: () => predicateSubjectQuestion(ch, it) },
        { id: predicateItemId(n, it, 'translate'), name: `${it.text} (translate)`, make: () => predicateTranslateQuestion(ch, it) },
      ]),
    },
    {
      label: 'εἰμί: enclitics', view: 'paradigm',
      items: ch.enclitics?.length
        ? [
            ...ENCLITIC_FORMS.map((f) => ({ id: encliticFormItemId(n, f.form), name: `is ${f.form} enclitic?`, make: () => encliticFormQuestion(ch, f) })),
            ...ch.enclitics.flatMap((e) => [
              { id: encliticItemId(n, e, 'accent'), name: `${e.host} + ${e.enclitic}`, make: () => encliticAccentQuestion(ch, e) },
              { id: encliticItemId(n, e, 'rule'), name: `${e.pair}: which rule?`, make: () => encliticRuleQuestion(ch, e) },
            ]),
          ]
        : [],
    },
    {
      label: 'Prepositions: meaning & case', view: 'prepositions',
      items: caseUses(ch).flatMap((u) => [
        { id: prepItemId(n, u.word.id, u.case, 'meaning'), name: `${u.word.lemma} + ${CASE_ABBR[u.case]} = ?`, make: () => prepMeaningQuestion(ch, u) },
        { id: prepItemId(n, u.word.id, u.case, 'case'), name: `${u.word.lemma} “${u.gloss}” takes which case?`, make: () => prepCaseQuestion(ch, u) },
      ]),
    },
    {
      label: 'Prepositions: phrases', view: 'prepositions',
      items: (ch.phrases ?? []).map((ph) => ({ id: phraseItemId(n, ph), name: ph.greek, make: () => phraseQuestion(ch, ph) })),
    },
    {
      label: 'Prepositions: sentences', view: 'prepositions',
      items: (ch.sentences ?? []).map((st) => ({ id: sentenceItemId(n, st), name: `${st.phrase} (${st.ref})`, make: () => sentenceQuestion(ch, st) })),
    },
    {
      label: 'Prepositions: reading verses', view: 'prepositions',
      items: (ch.prepReadings ?? []).flatMap((r) => readingSkills(r).map((skill) => ({
        id: readingItemId(n, r, skill), name: `${r.ref}: ${skill === 'main' ? 'main verb' : skill}`, make: () => readingQuestion(ch, r, skill),
      }))),
    },
    {
      label: 'Prepositions: noun forms', view: 'prepositions',
      items: [
        ...parseItems(ch.nouns ?? []),
        ...nounPrepForms(ch).map(({ p: np, form }) => ({ id: nounPrepItemId(n, np, form), name: `${form}: which preposition?`, make: () => nounPrepQuestion(ch, np, form) })),
      ],
    },
    {
      label: 'Prepositions: diagram', view: 'prepositions',
      items: (ch.spatial ?? []).map((sp) => ({
        id: spatialItemId(n, sp), name: `diagram: ${prepWord(ch, sp.prep).lemma} + ${CASE_ABBR[sp.case]}`, make: () => spatialQuestion(ch, sp),
      })),
    },
    {
      label: 'Prepositions: elision', view: 'prepositions',
      items: [
        ...(ch.elisions ?? []).map((e) => ({ id: elisionItemId(n, e), name: `${prepWord(ch, e.prep).lemma} + ${e.next}`, make: () => elisionQuestion(ch, e) })),
        ...elidedForms(ch).map((f) => ({ id: elidedFormItemId(n, f.form), name: `${f.form} = ?`, make: () => elidedFormQuestion(ch, f.form, f.word) })),
      ],
    },
    { label: 'Adjectives: parsing', view: 'adjectives', items: parseItems(allAdjectives(ch)) },
    {
      label: 'Adjectives: lexical form', view: 'adjectives',
      items: allAdjectives(ch).flatMap((ap) => lexicalForms(ap).map((f) => ({ id: lexicalItemId(n, ap, f), name: `${f} → lexical form`, make: () => lexicalFormQuestion(ch, ap, f) }))),
    },
    {
      label: 'Adjectives: as nouns', view: 'adjectives',
      items: substItems(ch).map((si) => ({ id: substItemId(n, si), name: `${si.p.lemma} as a noun (${si.gender} ${si.number})`, make: () => substQuestion(ch, si) })),
    },
    {
      label: 'Adjectives: reading verses', view: 'adjectives',
      items: (adj?.readings ?? []).flatMap((r) => ADJ_READING_SKILLS.map((skill) => ({
        id: adjReadingItemId(n, r, skill), name: `${r.ref}: ${skill === 'head' ? 'which word' : skill}`, make: () => adjReadingQuestion(ch, r, skill),
      }))),
    },
    {
      label: 'Adjectives: agreement', view: 'adjectives',
      items: (adj?.paradigms ?? []).flatMap((ap) => (adj?.nouns ?? []).map((nn) => ({
        id: adjAgreeItemId(n, ap, nn), name: `${nn.greek} + ${ap.lemma}`, make: () => adjAgreeQuestion(ch, ap, nn),
      }))),
    },
    {
      label: 'Adjectives: uses', view: 'adjectives',
      items: (adj?.uses ?? []).flatMap((u) => [
        { id: adjUseItemId(n, u, 'use'), name: `${u.text}: how is ${u.adjective} used?`, make: () => adjUseQuestion(ch, u) },
        ...(translatable(u) ? [{ id: adjUseItemId(n, u, 'translate'), name: `${u.text} (translate)`, make: () => adjTranslateQuestion(ch, u) }] : []),
      ]),
    },
    {
      label: '3rd declension: stops & stems', view: 'declension',
      items: [
        ...(d3?.stops ?? []).map((r) => ({ id: ruleItemId(n, 'stop', r), name: r.prompt, make: () => ruleItemQuestion(ch, 'stop', r) })),
        ...(d3?.stems ?? []).map((r) => ({ id: ruleItemId(n, 'stem', r), name: `stem of ${r.prompt}`, make: () => ruleItemQuestion(ch, 'stem', r) })),
      ],
    },
    { label: '3rd declension: parsing', view: 'declension', items: d3 ? parseItems(d3Paradigms(ch)) : [] },
    {
      label: '3rd declension: lexical form', view: 'declension',
      items: d3 ? d3Paradigms(ch).flatMap((dp) => lexicalForms(dp).map((f) => ({ id: lexicalItemId(n, dp, f), name: `${f} → lexical form`, make: () => lexicalFormQuestion(ch, dp, f, d3Paradigms(ch)) }))) : [],
    },
    {
      label: '3rd declension: case ending chart', view: 'declension',
      items: d3 ? (['true', 'stem'] as const).flatMap((mode) => MASTER_COLUMNS.flatMap(({ col }) => MASTER_ROWS.map((row) => ({
        id: masterItemId(n, mode, col, row), name: `${mode === 'true' ? 'ending' : 'ending with stem vowel'}: ${col} ${row}`, make: () => masterCellQuestion(ch, mode, col, row),
      })))) : [],
    },
    {
      label: '3rd declension: declension & gender', view: 'declension',
      items: (d3?.forms ?? []).map((r) => ({ id: ruleItemId(n, 'decl', r), name: `${r.prompt}: ${r.ask ?? ''}`, make: () => ruleItemQuestion(ch, 'decl', r) })),
    },
    {
      label: '3rd declension: πᾶς meaning', view: 'declension',
      items: (d3?.pasUses ?? []).map((r) => ({ id: ruleItemId(n, 'pas', r), name: r.prompt, make: () => ruleItemQuestion(ch, 'pas', r) })),
    },
    {
      label: '3rd declension: look-alikes', view: 'declension',
      items: (d3?.lookalikes ?? []).map((r) => ({ id: ruleItemId(n, 'look', r), name: `${r.prompt} = ?`, make: () => ruleItemQuestion(ch, 'look', r) })),
    },
    {
      label: '3rd declension: reading verses', view: 'declension',
      items: (d3?.readings ?? []).flatMap((r) => d3ReadingSkills(r).map((skill) => ({
        id: d3ReadingItemId(n, r, skill), name: `${r.ref}: ${skill}`, make: () => d3ReadingQuestion(ch, r, skill),
      }))),
    },
    {
      label: '3rd declension: πᾶς agreement', view: 'declension',
      items: (d3?.agreement.nouns ?? []).map((nn) => ({
        id: adjAgreeItemId(n, d3!.agreement.paradigm, nn), name: `${nn.greek} + πᾶς`, make: () => adjAgreeQuestion(ch, d3!.agreement.paradigm, nn),
      })),
    },
    {
      label: '3rd declension: τίς or τις', view: 'declension',
      items: (d3?.tis ?? []).map((t) => ({ id: tisItemId(n, t), name: `${t.word} in ${t.ref}`, make: () => tisQuestion(ch, t) })),
    },
    {
      label: 'Pronouns: forms', view: 'pronouns',
      items: (pr?.forms ?? []).flatMap((f) => [
        { id: pronounParseId(n, f), name: `parse ${f.form}`, make: () => pronounParseQuestion(ch, f) },
        { id: pronounMeaningId(n, f), name: `${f.form} = ?`, make: () => pronounMeaningQuestion(ch, pr!.forms, f) },
        ...(f.emphatic !== undefined ? [{ id: pronounEmphasisId(n, f), name: `${f.form}: emphatic or enclitic?`, make: () => pronounEmphasisQuestion(ch, f) }] : []),
      ]),
    },
    {
      label: 'Pronouns: in verses', view: 'pronouns',
      items: (pr?.verses ?? []).flatMap((v) => [
        { id: pronounVerseId(n, v, 'who'), name: `${v.word} in ${v.ref}: who?`, make: () => pronounVerseWhoQuestion(ch, v) },
        { id: pronounVerseId(n, v, 'case'), name: `${v.word} in ${v.ref}: case?`, make: () => pronounVerseCaseQuestion(ch, v) },
        ...(v.stress ? [{ id: pronounVerseId(n, v, 'stress'), name: `${v.word} in ${v.ref}: why written?`, make: () => pronounStressQuestion(ch, v) }] : []),
        ...(v.wrong?.length ? [{ id: pronounVerseId(n, v, 'translate'), name: `${v.ref}: translate`, make: () => pronounVerseTranslateQuestion(ch, v) }] : []),
      ]),
    },
    {
      label: 'Pronouns: English → Greek', view: 'pronouns',
      items: pr ? PRONOUN_SLOTS.flatMap((sl) => (['english', 'desc'] as const).map((kind) => ({
        id: pronounProduceId(n, sl, kind), name: `${kind === 'desc' ? pronounSlotLabel(sl) : 'English'} → Greek`, make: () => pronounProduceQuestion(ch, pr.forms, sl, kind),
      }))) : [],
    },
    { label: 'Pronouns: new nouns', view: 'pronouns', items: parseItems(pr?.nouns ?? []) },
    { label: 'αὐτός: parsing', view: 'autos', items: parseItems(au ? [au.paradigm, ...au.nouns] : []) },
    {
      label: 'αὐτός: uses', view: 'autos',
      items: (au?.items ?? []).flatMap((it) => [
        { id: autosItemId(n, it, 'use'), name: `${it.text}: how is ${it.word} used?`, make: () => autosUseQuestion(ch, it) },
        { id: autosItemId(n, it, 'translate'), name: `${it.word} in ${it.ref ?? it.text}`, make: () => autosTranslateQuestion(ch, it) },
      ]),
    },
    {
      label: 'αὐτός: English → Greek', view: 'autos',
      items: au ? AUTOS_SLOTS.flatMap((sl) => (['english', 'desc'] as const).map((kind) => ({
        id: autosProduceId(n, sl, kind), name: `${kind === 'desc' ? autosSlotLabel(sl) : 'English'} → Greek`, make: () => autosProduceQuestion(ch, au.paradigm, sl, kind),
      }))) : [],
    },
    {
      label: 'αὐτός: read verses', view: 'autos',
      items: (au?.readings ?? []).flatMap((it) => [
        { id: autosItemId(n, it, 'use'), name: `${it.word} in ${it.ref}: which use?`, make: () => autosUseQuestion(ch, it) },
        { id: autosItemId(n, it, 'translate'), name: `${it.word} in ${it.ref}: translate`, make: () => autosTranslateQuestion(ch, it) },
        { id: autosItemId(n, it, 'sentence'), name: `${it.ref}: the whole sentence`, make: () => autosSentenceQuestion(ch, it) },
      ]),
    },
    { label: 'Demonstratives: parsing', view: 'demonstratives', items: parseItems(dm?.paradigms ?? []) },
    {
      label: 'Demonstratives: agreement', view: 'demonstratives',
      items: (dm?.agreement.paradigms ?? []).flatMap((dp) => dm!.agreement.nouns.map((nn) => ({
        id: adjAgreeItemId(n, dp, nn), name: `${nn.greek} + ${dp.lemma}`, make: () => adjAgreeQuestion(ch, dp, nn),
      }))),
    },
    {
      label: 'Demonstratives: uses', view: 'demonstratives',
      items: (dm?.items ?? []).flatMap((it) => [
        { id: demonstrativeItemId(n, it, 'use'), name: `${it.text}: how is ${it.word} used?`, make: () => demonstrativeUseQuestion(ch, it) },
        { id: demonstrativeItemId(n, it, 'translate'), name: `${it.word} in ${it.ref ?? it.text}`, make: () => demonstrativeTranslateQuestion(ch, it) },
      ]),
    },
    {
      label: 'Demonstratives: English → Greek', view: 'demonstratives',
      items: (dm?.agreement.paradigms ?? []).flatMap((dp) => DEMONSTRATIVE_SLOTS.flatMap((sl) => (['english', 'desc'] as const).map((kind) => ({
        id: demonstrativeProduceId(n, dp, sl, kind), name: `${dp.lemma}: ${kind === 'desc' ? 'description' : 'English'} → Greek`,
        make: () => demonstrativeProduceQuestion(ch, dp, sl, kind),
      })))),
    },
    {
      label: 'Demonstratives: read verses', view: 'demonstratives',
      items: (dm?.readings ?? []).flatMap((it) => [
        { id: demonstrativeItemId(n, it, 'use'), name: `${it.word} in ${it.ref}: which use?`, make: () => demonstrativeUseQuestion(ch, it) },
        { id: demonstrativeItemId(n, it, 'translate'), name: `${it.word} in ${it.ref}: translate`, make: () => demonstrativeTranslateQuestion(ch, it) },
        { id: demonstrativeItemId(n, it, 'sentence'), name: `${it.ref}: the whole sentence`, make: () => demonstrativeSentenceQuestion(ch, it) },
      ]),
    },
    {
      label: 'Demonstratives: look-alikes (αὕτη/αὐτή, ἤ/ἡ, κἀγώ)', view: 'demonstratives',
      items: (dm?.lookalikes ?? []).map((l) => ({ id: lookalikeId(n, l), name: `${l.word} in ${l.ref ?? l.text}`, make: () => lookalikeQuestion(ch, l) })),
    },
    {
      label: 'Vocative: forms and verses', view: 'demonstratives',
      items: dm ? [
        ...dm.vocative.forms.map((f) => ({ id: vocativeFormId(n, f), name: `${f.lemma}: vocative ${f.number}`, make: () => vocativeFormQuestion(ch, f) })),
        ...dm.vocative.items.map((it) => ({ id: vocativeItemId(n, it), name: `${it.word} in ${it.ref}: case?`, make: () => vocativeCaseQuestion(ch, it) })),
      ] : [],
    },
    {
      label: 'Relative pronoun: forms', view: 'relative',
      items: [
        ...parseItems(rl ? [rl.paradigm, ...rl.nouns] : []),
        ...(rl?.forms ?? []).map((f) => ({ id: relativeFormId(n, f), name: `${f.form}: article or relative?`, make: () => relativeFormQuestion(ch, f) })),
      ],
    },
    {
      label: 'Relative pronoun: clauses', view: 'relative',
      items: (rl?.items ?? []).flatMap((it) => [
        { id: relativeItemId(n, it, 'antecedent'), name: `${it.word} in ${it.ref ?? it.text} (antecedent)`, make: () => relativeAntecedentQuestion(ch, it) },
        { id: relativeItemId(n, it, 'case'), name: `${it.word} in ${it.ref ?? it.text} (case)`, make: () => relativeCaseQuestion(ch, it) },
        { id: relativeItemId(n, it, 'translate'), name: `${it.word} in ${it.ref ?? it.text} (translate)`, make: () => relativeTranslateQuestion(ch, it) },
      ]),
    },
    {
      label: 'Verbs: terms', view: 'verbs',
      items: (vi?.terms ?? []).flatMap((t) => [
        { id: termItemId(n, t, 'name'), name: `${t.term} (from its definition)`, make: () => termNameQuestion(ch, t, vi!.terms) },
        { id: termItemId(n, t, 'define'), name: `${t.term}: what does it mean?`, make: () => termDefineQuestion(ch, t, vi!.terms) },
      ]),
    },
    {
      label: 'Verbs: English verbs', view: 'verbs',
      items: (vi?.english ?? []).flatMap((e) => askableProperties(e).map((prop) => ({
        id: englishItemId(n, e, prop), name: `“${e.verb}”: ${PROPERTY_NAMES[prop]}`, make: () => englishVerbQuestion(ch, e, prop),
      }))),
    },
    {
      label: 'Verbs: parts of a verb', view: 'verbs',
      items: (vi?.parts ?? []).flatMap((pp) => (['stem', 'vowel', 'ending', 'subject'] as VerbPart[]).map((part) => ({
        id: partsItemId(n, pp, part), name: `${pp.form}: ${part}`, make: () => verbPartQuestion(ch, pp, part),
      }))),
    },
    ...PARTICIPLE_AREAS.map((area): Skill => ({
      label: `Participles: ${area.label}`, view: 'participles',
      items: (ch.participleIntro?.[area.key] ?? []).map((item) => ({
        id: participleItemId(n, area.key, item), name: item.prompt, make: () => participleQuestion(ch, area.key, item),
      })),
    })),
    ...casesSkills(ch),
    ...presentSkills(ch),
    ...participleSkills(ch),
    ...participleUseSkills(ch),
    ...infinitiveSkills(ch),
    ...imperativeSkills(ch),
    ...nonindicativeSkills(ch),
  ]
  // Chapters 10–14 have prepositions in their vocabulary but no Prepositions screen. Flashcards can split those into
  // one card per case; track that here so it shows on the dashboard and in the daily review.
  if (!(ch.topics ?? []).includes('prepositions')) {
    skills.push({
      label: 'Vocab: prepositions by case', view: 'flashcards',
      items: caseUses(ch).flatMap((u) => [
        { id: prepItemId(n, u.word.id, u.case, 'meaning'), name: `${u.word.lemma} + ${CASE_ABBR[u.case]} = ?`, make: () => prepMeaningQuestion(ch, u) },
        { id: prepItemId(n, u.word.id, u.case, 'case'), name: `${u.word.lemma} “${u.gloss}” takes which case?`, make: () => prepCaseQuestion(ch, u) },
      ]),
    })
  }
  // Only skills this chapter has content for, and a practice screen for (the preposition drills live under
  // "All prepositions" for chapters without their own Prepositions screen).
  const isTopic = (v: View) => v in TOPIC_META
  return skills.filter((sk) => sk.items.length > 0 && (!isTopic(sk.view) || (ch.topics ?? []).includes(sk.view as TopicView)))
}

export interface WeakItem {
  name: string
  skill: Skill
  stats: ItemStats
}

/** Items you have tried but not yet learned, the most-missed first. */
export function weakestItems(skills: Skill[], items: Record<string, ItemStats>, n: number): WeakItem[] {
  const accuracy = (s: ItemStats) => s.correct / s.attempts
  return skills
    .flatMap((skill) => skill.items.map((it) => ({ name: it.name, skill, stats: items[it.id] })))
    .filter((w): w is WeakItem => !!w.stats && w.stats.attempts > 0 && w.stats.box < LEARNED_BOX)
    .sort((a, b) => accuracy(a.stats) - accuracy(b.stats) || b.stats.attempts - a.stats.attempts)
    .slice(0, n)
}

/** Chapters 27–28: participle forms, both ways, present or aorist (28), and participles in verses. */
function participleSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const charts = participleCharts(ch)
  if (!charts.length) return []
  const perfect = charts.some((c) => c.tense === 'perfect')
  const aorist = !perfect && charts.some((c) => c.tense === 'aorist')
  const [topic, view]: [string, View] = perfect ? ['Perfect participles', 'ptcPerfect'] : aorist ? ['Aorist participles', 'ptcAorist'] : ['Present participles', 'ptcPresent']
  const verses = ch.participles?.verses ?? []
  return [
    {
      label: `${topic}: forms`, view,
      items: charts.flatMap((c) => [
        ...distinctForms(c.p).map((form) => ({
          id: participleParseId(n, c, form), name: `${form}: parse`, make: () => participleParseQuestion(ch, c, form),
        })),
        ...slotsOf(c.p).map((s) => ({
          id: participleBuildId(n, c, s), name: `${parsingLabel(c.tense, c.voice, s)} of ${c.v.lemma}`, make: () => participleBuildQuestion(ch, c, s),
        })),
      ]),
    },
    {
      label: `${topic}: present or aorist`, view,
      items: aorist
        ? tenseChoices(ch).map(({ c, form }) => ({
            id: participleTenseId(n, c, form), name: `${form}: ${c.tense}`, make: () => participleTenseQuestion(ch, c, form),
          }))
        : [],
    },
    {
      label: `${topic}: genitive absolutes`, view,
      items: absoluteVerses(ch).map((v) => ({ id: absoluteId(n, v), name: `${v.word} (${v.ref}): absolute?`, make: () => absoluteQuestion(ch, v) })),
    },
    {
      label: `${topic}: verses`, view,
      items: verses.flatMap((v) => [
        { id: participleVerseId(n, v, 'parse'), name: `${v.word} (${v.ref})`, make: () => participleVerseParseQuestion(ch, v) },
        ...(v.wrong?.length
          ? [{ id: participleVerseId(n, v, 'translate'), name: `${v.word} (${v.ref}): translate`, make: () => participleVerseTranslateQuestion(ch, v) }]
          : []),
      ]),
    },
  ]
}

/** Chapter 35: δίδωμι outside the indicative, and conditional sentences. */
function nonindicativeSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const ni = ch.nonindicative
  if (!ni) return []
  const view: View = 'miMoods'
  return [
    {
      label: 'δίδωμι: moods', view,
      items: ni.forms.flatMap((f) => [
        { id: didomiFormId(n, f, 'parse'), name: `${f.form} = ${f.parse}`, make: () => didomiParseQuestion(ch, f) },
        { id: didomiFormId(n, f, 'build'), name: `${f.parse} → ${f.form}`, make: () => didomiBuildQuestion(ch, f) },
      ]),
    },
    { label: 'δίδωμι: in verses', view, items: ni.verses.map((v) => ({ id: didomiVerseId(n, v), name: `${v.word} (${v.ref})`, make: () => didomiVerseQuestion(ch, v) })) },
    {
      label: 'Conditions: class and translation', view,
      items: ni.conditions.flatMap((c) => [
        { id: conditionId(n, c, 'use'), name: `${c.ref}: ${c.use} class`, make: () => conditionQuestion(ch, c) },
        { id: conditionId(n, c, 'translate'), name: `${c.word} = “${c.english}”`, make: () => conditionTranslateQuestion(ch, c) },
      ]),
    },
  ]
}

/** Chapter 33: imperative forms both ways, commands in verses, and prohibitions. */
function imperativeSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const view: View = 'imperative'
  return [
    {
      label: 'Imperative: forms', view,
      items: imperativeTriples(ch).flatMap(({ v, kind, slot }) => [
        { id: imperativeItemId(n, v, kind, slot, 'parse'), name: `${imperative(v, kind, slot)} = ${imperativeLabel(kind, slot)}`, make: () => imperativeParseQuestion(ch, v, kind, slot) },
        { id: imperativeItemId(n, v, kind, slot, 'build'), name: `${imperativeLabel(kind, slot)} of ${v.lemma} → ${imperative(v, kind, slot)}`, make: () => imperativeBuildQuestion(ch, v, kind, slot) },
      ]),
    },
    {
      label: 'Imperative: in verses', view,
      items: parsableVerses(ch).flatMap((v) => [
        { id: imperativeVerseId(n, v, 'parse'), name: `${v.word} (${v.ref})`, make: () => imperativeVerseParseQuestion(ch, v) },
        ...(v.wrong?.length ? [{ id: imperativeVerseId(n, v, 'translate'), name: `${v.word} (${v.ref}): translate`, make: () => imperativeVerseTranslateQuestion(ch, v) }] : []),
      ]),
    },
    {
      label: 'Imperative: prohibitions', view,
      items: prohibitionVerses(ch).map((v) => ({ id: imperativeVerseId(n, v, 'prohibition'), name: `μὴ ${v.word} (${v.ref})`, make: () => prohibitionQuestion(ch, v) })),
    },
  ]
}

/** Chapter 32: infinitive forms both ways, their uses, translation and parsing in verses. */
function infinitiveSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const items = ch.infinitives?.items ?? []
  const view: View = 'infinitive'
  return [
    {
      label: 'Infinitive: forms', view,
      items: infinitivePairs(ch).flatMap(({ v, kind }) => [
        { id: infinitiveItemId(n, v, kind, 'parse'), name: `${infinitive(v, kind)} = ${KIND_LABEL[kind]}`, make: () => infinitiveParseQuestion(ch, v, kind) },
        { id: infinitiveItemId(n, v, kind, 'build'), name: `${KIND_LABEL[kind]} of ${v.lemma} → ${infinitive(v, kind)}`, make: () => infinitiveBuildQuestion(ch, v, kind) },
      ]),
    },
    {
      label: 'Infinitive: uses', view,
      items: items.map((it) => ({ id: infinitiveUseId(n, it, 'use'), name: `${it.word} (${it.ref}): ${it.use}`, make: () => infinitiveUseQuestion(ch, it) })),
    },
    {
      label: 'Infinitive: translation', view,
      items: items.map((it) => ({ id: infinitiveUseId(n, it, 'translate'), name: `${it.word} = “${it.english}”`, make: () => infinitiveTranslateQuestion(ch, it) })),
    },
    {
      label: 'Infinitive: in verses', view,
      items: items.map((it) => ({ id: infinitiveVerseParseId(n, it), name: `${it.word} (${it.ref}): parse`, make: () => infinitiveVerseParseQuestion(ch, it) })),
    },
  ]
}

/** Chapter 29: adverbial, attributive or substantival; translation; parsing. */
function participleUseSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const items = ch.participleUses ?? []
  const view: View = 'ptcAdjectival'
  return [
    {
      label: 'Adjectival participles: use', view,
      items: items.map((u) => ({ id: participleUseId(n, u, 'use'), name: `${u.word} (${u.ref}): ${u.use}`, make: () => participleUseQuestion(ch, u) })),
    },
    {
      label: 'Adjectival participles: translation', view,
      items: items.map((u) => ({ id: participleUseId(n, u, 'translate'), name: `${u.word} = “${u.english}”`, make: () => participleUseTranslateQuestion(ch, u) })),
    },
    {
      label: 'Adjectival participles: parsing', view,
      items: items.map((u) => ({ id: participleVerseId(n, u, 'parse'), name: `${u.word} (${u.ref}): parse`, make: () => participleVerseParseQuestion(ch, u) })),
    },
  ]
}

/** Chapters 16 (present tense), 17 (contract verbs) and 18 (middle/passive) share their form and verse drills; each adds its own extras. */
function presentSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const pres = ch.present
  if (!pres) return []
  const perfect = pres.verbs.some((v) => v.tense === 'perfect')
  const aorist = perfect || pres.verbs.some((v) => v.tense === 'aorist')
  const imperfect = !aorist && pres.verbs.some((v) => v.tense === 'imperfect')
  const future = !aorist && !imperfect && pres.verbs.some((v) => v.tense)
  const roots = pres.verbs.some((v) => v.liquid)
  const middle = !aorist && !imperfect && !future && pres.verbs.some((v) => v.voice)
  const contract = !aorist && !imperfect && !future && !middle && pres.verbs.some((v) => v.contract)
  const firstAorist = pres.verbs.some((v) => v.firstAorist)
  const passive = pres.verbs.some((v) => v.passiveForm)
  const [topic, view]: [string, View] = aorist
    ? (perfect ? ['Perfect', 'perfect'] : passive ? ['Passive', 'passive'] : firstAorist ? ['First aorist', 'aorist1'] : ['Second aorist', 'aorist']) : imperfect ? ['Imperfect', 'imperfect'] : roots ? ['Other futures', 'roots'] : future ? ['Future', 'future'] : middle ? ['Middle/passive', 'middle']
    : contract ? ['Contract verbs', 'contract'] : ['Present tense', 'present']
  const endings = plainEndingsOf(pres.verbs[0])
  const forms: Skill = {
    label: `${topic}: forms`, view,
    items: pres.verbs.flatMap((v) => SLOTS.flatMap((s) => [
      { id: presentItemId(n, v, s, 'identify'), name: `${presentDisplay(v, s)} = ${SLOT_LABEL[s]}`, make: () => presentIdentifyQuestion(ch, v, s) },
      { id: presentItemId(n, v, s, 'translate'), name: `${presentDisplay(v, s)} = “${presentEnglish(v, s)}”`, make: () => presentTranslateQuestion(ch, v, s) },
      { id: presentItemId(n, v, s, 'produce'), name: `“${presentEnglish(v, s)}” → ${presentDisplay(v, s)}`, make: () => presentProduceQuestion(ch, v, s) },
    ])),
  }
  const extra: Skill = contract
    ? {
        label: `${topic}: contractions`, view,
        items: [
          ...contractionPairs().map(({ c, vowel }) => ({
            id: contractionItemId(n, c, vowel), name: `${c} + ${vowel} → ${CONTRACTIONS[c][vowel]}`, make: () => contractionQuestion(ch, c, vowel),
          })),
          ...pres.verbs.flatMap((v) => SLOTS.filter((s) => tellsContractType(v, s)).map((s) => ({
            id: contractTypeItemId(n, v, s), name: `${presentDisplay(v, s)}: from ${v.lemma}`, make: () => contractTypeQuestion(ch, v, s),
          }))),
        ],
      }
    : {
        label: `${topic}: endings`, view,
        items: SLOTS.flatMap((s) => [
          { id: endingItemId(n, s, 'person'), name: `-${endings[s]} = ${PRONOUN[s]}`, make: () => endingPersonQuestion(ch, s) },
          { id: endingItemId(n, s, 'ending'), name: `${PRONOUN[s]} → -${endings[s]}`, make: () => endingFormQuestion(ch, s) },
        ]),
      }
  const voice: Skill = {
    label: `${topic}: active or passive`, view,
    items: voicePairs(ch).map(({ v, slot, voice }) => ({
      id: voiceItemId(n, v, slot, voice), name: `${presentDisplay(inVoice(v, voice), slot)}: ${voice === 'mp' ? 'middle/passive' : 'active'} ${SLOT_LABEL[slot]}`,
      make: () => voiceQuestion(ch, v, slot, voice),
    })),
  }
  const verses: Skill = {
    label: `${topic}: in verses`, view,
    items: pres.verses.flatMap((v) => [
      { id: presentVerseId(n, v, 'parse'), name: `${v.word} in ${v.ref} (person)`, make: () => verseParseQuestion(ch, v) },
      { id: presentVerseId(n, v, 'lexical'), name: `${v.word} in ${v.ref} (lexical form)`, make: () => verseLexicalQuestion(ch, v) },
    ]),
  }
  if (pres.verbs.some((v) => v.lemma === 'ἵστημι')) {
    const mi2 = 'mi2' as View
    return [
      { ...forms, label: 'μι verbs: forms', view: mi2 },
      {
        label: 'μι verbs: which tense', view: mi2,
        items: whichTensePairs(ch).map(({ v, slot }) => ({
          id: whichTenseItemId(n, v, slot), name: `${presentDisplay(v, slot)}: ${tenseVoiceLabel(v)}`, make: () => whichTenseQuestion(ch, v, slot),
        })),
      },
      {
        label: 'μι verbs: which verb', view: mi2,
        items: whichVerbPairs(ch).map(({ v, slot }) => ({
          id: whichVerbItemId(n, v, slot), name: `${presentDisplay(v, slot)}: from ${v.lemma}`, make: () => whichVerbQuestion(ch, v, slot),
        })),
      },
      { ...verses, label: 'μι verbs: in verses', view: mi2 },
    ]
  }
  if (pres.verbs.some((v) => v.lemma === 'δίδωμι')) {
    const which: Skill = {
      label: 'δίδωμι: which tense', view: 'mi',
      items: whichTensePairs(ch).map(({ v, slot }) => ({
        id: whichTenseItemId(n, v, slot), name: `${presentDisplay(v, slot)}: ${tenseVoiceLabel(v)}`, make: () => whichTenseQuestion(ch, v, slot),
      })),
    }
    return [{ ...forms, label: 'δίδωμι: forms', view: 'mi' }, which, { ...verses, label: 'δίδωμι: in verses', view: 'mi' }]
  }
  if (pres.verbs.some((v) => v.mood === 'subjunctive')) {
    const subjForms = { ...forms, label: 'Subjunctive: forms', view: 'subjunctive' as View }
    const mood: Skill = {
      label: 'Subjunctive: indicative or subjunctive', view: 'subjunctive',
      items: moodPairs(ch).map(({ v, slot, mood: m }) => ({
        id: moodItemId(n, v, slot, m), name: `${presentDisplay(inMood(v, m), slot)}: ${m} ${SLOT_LABEL[slot]}`, make: () => moodQuestion(ch, v, slot, m),
      })),
    }
    const uses: Skill = {
      label: 'Subjunctive: why subjunctive', view: 'subjunctive',
      items: pres.verses.filter((v) => v.use).map((v) => ({ id: subjUseItemId(n, v), name: `${v.word} in ${v.ref}: ${v.use}`, make: () => subjUseQuestion(ch, v) })),
    }
    return [subjForms, mood, uses, { ...verses, label: 'Subjunctive: in verses', view: 'subjunctive' }]
  }
  const tenseSkill = (label: string): Skill => ({
    label: `${topic}: ${label}`, view,
    items: tensePairs(ch).map(({ v, slot, tense: t }) => ({
      id: tenseItemId(n, v, slot, t), name: `${presentDisplay(inTense(v, t), slot)}: ${t} ${SLOT_LABEL[slot]}`, make: () => tenseQuestion(ch, v, slot, t),
    })),
  })
  if (aorist) {
    const stems: Skill = {
      label: `${topic}: ${perfect ? 'reduplication' : passive ? 'forming the passive' : firstAorist ? 'forming the aorist' : 'aorist stems'}`, view,
      items: [
        ...(perfect ? pres.reduplications ?? [] : []).map((r) => ({ id: redupItemId(n, r), name: `${r.lemma} → ${r.options[0]}`, make: () => redupQuestion(ch, r) })),
        ...(passive && !perfect ? PASSIVE_RULES : []).map((r) => ({ id: passiveRuleItemId(n, r), name: `${r.from} + θ → ${r.to}`, make: () => passiveRuleQuestion(ch, r) })),
        ...(firstAorist && !passive && !perfect ? FUTURE_RULES : []).map((r) => ({ id: futureRuleItemId(n, r), name: `${r.from} + σ → ${r.to}`, make: () => futureRuleQuestion(ch, r) })),
        ...pres.verbs.map((v) => ({ id: aoristFormItemId(n, v), name: `${v.lemma} → ${presentDisplay(v, '1s')}`, make: () => aoristFormQuestion(ch, v) })),
        ...pres.verbs.flatMap((v) => SLOTS.map((s) => ({
          id: futureLexicalItemId(n, v, s), name: `${presentDisplay(v, s)}: from ${v.lemma}`, make: () => futureLexicalQuestion(ch, v, s),
        }))),
      ],
    }
    return [forms, stems, tenseSkill(perfect ? 'aorist or perfect' : passive ? 'aorist or future' : 'imperfect or aorist'), verses]
  }
  if (imperfect) {
    const augment: Skill = {
      label: `${topic}: the augment`, view,
      items: (pres.augments ?? []).map((r) => ({ id: augmentItemId(n, r), name: `${r.lemma} → ${r.options[0]}`, make: () => augmentQuestion(ch, r) })),
    }
    return [forms, augment, tenseSkill('present or imperfect'), verses]
  }
  if (future) {
    const forming: Skill = {
      label: `${topic}: forming the future`, view,
      items: [
        ...FUTURE_RULES.map((r) => ({ id: futureRuleItemId(n, r), name: `${r.from} + σ → ${r.to}`, make: () => futureRuleQuestion(ch, r) })),
        ...pres.verbs.filter(hasFutureForm).map((v) => ({
          id: futureFormItemId(n, v), name: `${v.lemma} → ${presentDisplay(v, '1s')}`, make: () => futureFormQuestion(ch, v),
        })),
        ...pres.verbs.flatMap((v) => SLOTS.map((s) => ({
          id: futureLexicalItemId(n, v, s), name: `${presentDisplay(v, s)}: from ${v.lemma}`, make: () => futureLexicalQuestion(ch, v, s),
        }))),
      ],
    }
    const tense = tenseSkill('present or future')
    const rootSkill: Skill = {
      label: `${topic}: verbal roots`, view,
      items: (pres.roots ?? []).map((r) => ({ id: rootItemId(n, r), name: `${r.lemma}: *${r.options[0]}`, make: () => rootQuestion(ch, r) })),
    }
    return [forms, ...(pres.roots ? [rootSkill] : []), forming, tense, verses]
  }
  return [forms, extra, ...(middle ? [voice] : []), verses]
}

/** Chapter 7: noun endings, article + noun phrases, and the case in verses. */
function casesSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const cs = ch.cases
  if (!cs) return []
  return [
    {
      label: 'Cases: parsing nouns', view: 'cases',
      items: cs.nouns.flatMap(({ paradigm: p }) => distinctForms(p).map((form) => ({
        id: adjParseItemId(n, p, form), name: `${form} (${p.lemma})`, make: () => adjParseQuestion(ch, p, form),
      }))),
    },
    {
      label: 'Cases: phrases', view: 'cases',
      items: phraseSlots(ch).flatMap((s) => [
        { id: casePhraseItemId(n, s, 'translate'), name: `${phraseGreek(s.noun, s.case, s.number)} = “${phraseEnglish(s.noun, s.case, s.number)}”`, make: () => phraseTranslateQuestion(ch, s) },
        { id: casePhraseItemId(n, s, 'parse'), name: `${phraseGreek(s.noun, s.case, s.number)}: case and number`, make: () => phraseParseQuestion(ch, s) },
      ]),
    },
    {
      label: 'Cases: in verses', view: 'cases',
      items: cs.uses.flatMap((u) => [
        { id: usageItemId(n, CASES_USE.prefix, u, 'use'), name: `${u.word} in ${u.ref} (case and use)`, make: () => caseUseQuestion(ch, u) },
        { id: usageItemId(n, CASES_USE.prefix, u, 'translate'), name: `${u.word} in ${u.ref} (translate)`, make: () => caseUseTranslateQuestion(ch, u) },
      ]),
    },
  ]
}

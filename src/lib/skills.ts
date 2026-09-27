import type { View } from '../App'
import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { ENCLITIC_FORMS } from '../data/chapter08Eimi'
import type { Chapter, DeclensionParadigm, ParadigmRow, TopicView } from '../data/types'
import { autosItemId, autosTranslateQuestion, autosUseQuestion } from './autosQuestions'
import {
  adjAgreeItemId, adjAgreeQuestion, adjParseItemId, adjParseQuestion, adjTranslateQuestion, adjUseItemId, adjUseQuestion, distinctForms,
  translatable,
} from './declensionQuestions'
import {
  CASES_USE, caseUseQuestion, caseUseTranslateQuestion, phraseEnglish, phraseGreek, casePhraseItemId, phraseParseQuestion, phraseSlots,
  phraseTranslateQuestion,
} from './caseQuestions'
import { demonstrativeItemId, demonstrativeTranslateQuestion, demonstrativeUseQuestion } from './demonstrativeQuestions'
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
  pronounVerseCaseQuestion, pronounVerseId, pronounVerseWhoQuestion,
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
  PASSIVE_RULES, passiveRuleItemId, passiveRuleQuestion, aoristFormItemId, aoristFormQuestion, augmentItemId, augmentQuestion, hasFutureForm, inTense, rootItemId, rootQuestion, tenseItemId, tensePairs, tenseQuestion, plainEndingsOf, presentIdentifyQuestion, presentItemId, presentProduceQuestion, presentTranslateQuestion, presentVerseId, verseLexicalQuestion,
  verseParseQuestion, voiceItemId, voicePairs, voiceQuestion,
} from './presentQuestions'
import { usageItemId } from './usageQuestions'
import { ruleItemId, ruleItemQuestion, tisItemId, tisQuestion } from './thirdDeclensionQuestions'
import { TOPIC_META } from './views'
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

/** All progress items for a chapter, grouped the way the dashboard shows them. */
export function chapterSkills(ch: Chapter): Skill[] {
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
    { label: 'Adjectives: parsing', view: 'adjectives', items: parseItems(adj?.paradigms ?? []) },
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
    { label: '3rd declension: parsing', view: 'declension', items: parseItems(d3?.paradigms ?? []) },
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
      ]),
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
    ...casesSkills(ch),
    ...presentSkills(ch),
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

/** Chapters 16 (present tense), 17 (contract verbs) and 18 (middle/passive) share their form and verse drills; each adds its own extras. */
function presentSkills(ch: Chapter): Skill[] {
  const n = ch.number
  const pres = ch.present
  if (!pres) return []
  const aorist = pres.verbs.some((v) => v.tense === 'aorist')
  const imperfect = !aorist && pres.verbs.some((v) => v.tense === 'imperfect')
  const future = !aorist && !imperfect && pres.verbs.some((v) => v.tense)
  const roots = pres.verbs.some((v) => v.liquid)
  const middle = !aorist && !imperfect && !future && pres.verbs.some((v) => v.voice)
  const contract = !aorist && !imperfect && !future && !middle && pres.verbs.some((v) => v.contract)
  const firstAorist = pres.verbs.some((v) => v.firstAorist)
  const passive = pres.verbs.some((v) => v.passiveForm)
  const [topic, view]: [string, View] = aorist
    ? (passive ? ['Passive', 'passive'] : firstAorist ? ['First aorist', 'aorist1'] : ['Second aorist', 'aorist']) : imperfect ? ['Imperfect', 'imperfect'] : roots ? ['Other futures', 'roots'] : future ? ['Future', 'future'] : middle ? ['Middle/passive', 'middle']
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
  const tenseSkill = (label: string): Skill => ({
    label: `${topic}: ${label}`, view,
    items: tensePairs(ch).map(({ v, slot, tense: t }) => ({
      id: tenseItemId(n, v, slot, t), name: `${presentDisplay(inTense(v, t), slot)}: ${t} ${SLOT_LABEL[slot]}`, make: () => tenseQuestion(ch, v, slot, t),
    })),
  })
  if (aorist) {
    const stems: Skill = {
      label: `${topic}: ${passive ? 'forming the passive' : firstAorist ? 'forming the aorist' : 'aorist stems'}`, view,
      items: [
        ...(passive ? PASSIVE_RULES : []).map((r) => ({ id: passiveRuleItemId(n, r), name: `${r.from} + θ → ${r.to}`, make: () => passiveRuleQuestion(ch, r) })),
        ...(firstAorist && !passive ? FUTURE_RULES : []).map((r) => ({ id: futureRuleItemId(n, r), name: `${r.from} + σ → ${r.to}`, make: () => futureRuleQuestion(ch, r) })),
        ...pres.verbs.map((v) => ({ id: aoristFormItemId(n, v), name: `${v.lemma} → ${presentDisplay(v, '1s')}`, make: () => aoristFormQuestion(ch, v) })),
        ...pres.verbs.flatMap((v) => SLOTS.map((s) => ({
          id: futureLexicalItemId(n, v, s), name: `${presentDisplay(v, s)}: from ${v.lemma}`, make: () => futureLexicalQuestion(ch, v, s),
        }))),
      ],
    }
    return [forms, stems, tenseSkill(passive ? 'aorist or future' : 'imperfect or aorist'), verses]
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

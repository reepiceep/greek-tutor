import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type {
  CaseForms, Chapter, DeclensionParadigm, Gender, GrammaticalNumber, ParsedParticiple, ParticipleTense, ParticipleVerb, ParticipleVerse,
  ParticipleVoice,
} from '../data/types'
import { chapter27 } from '../data/chapter27'
import { type Slot, distinctForms, formAt, parsingsOf, slotLabel, slotsOf } from './declensionQuestions'
import { shuffle } from './progress'

// Questions for chapters 27–29: participles. Every form is generated from the verb's stem. Present: stem + ο + ντ +
// third-declension endings (feminine ουσα, first declension), or stem + ο + μενο/η + 2-1-2 endings. First aorist: the
// same with σα (λύσας, λυσάμενος). Second aorist: the present's endings on the aorist stem, accented on the ending (λαβών).
// Aorist passive: θε + ντ (λυθείς, λυθεῖσα, λυθέν).

type Endings = Record<Gender, Record<GrammaticalNumber, CaseForms>>

/**
 * Connecting vowel + ντ + case ending, as they come out after the ντ drops or changes (ο + ντ + σα → ουσα).
 * An ending with an accent takes it (the ultima is long, so it can't stay on the stem); the rest leave it on the stem.
 */
const PRESENT: Endings = {
  masculine: { sg: ['ων', 'οντος', 'οντι', 'οντα'], pl: ['οντες', 'όντων', 'ουσι(ν)', 'οντας'] },
  feminine: { sg: ['ουσα', 'ούσης', 'ούσῃ', 'ουσαν'], pl: ['ουσαι', 'ουσῶν', 'ούσαις', 'ούσας'] },
  neuter: { sg: ['ον', 'οντος', 'οντι', 'ον'], pl: ['οντα', 'όντων', 'ουσι(ν)', 'οντα'] },
}

/** First aorist: α + ντ after the σ (or a liquid stem); σα + ντ + σα → σασα, and ντ + ς → ς with a long α (λύσας). */
const FIRST_AORIST: Endings = {
  masculine: { sg: ['ας', 'αντος', 'αντι', 'αντα'], pl: ['αντες', 'άντων', 'ασι(ν)', 'αντας'] },
  feminine: { sg: ['ασα', 'άσης', 'άσῃ', 'ασαν'], pl: ['ασαι', 'ασῶν', 'άσαις', 'άσας'] },
  neuter: { sg: ['αν', 'αντος', 'αντι', 'αν'], pl: ['αντα', 'άντων', 'ασι(ν)', 'αντα'] },
}

/** Second aorist: the present's endings, with the accent always on the ending's first syllable. */
const SECOND_AORIST: Endings = {
  masculine: { sg: ['ών', 'όντος', 'όντι', 'όντα'], pl: ['όντες', 'όντων', 'οῦσι(ν)', 'όντας'] },
  feminine: { sg: ['οῦσα', 'ούσης', 'ούσῃ', 'οῦσαν'], pl: ['οῦσαι', 'ουσῶν', 'ούσαις', 'ούσας'] },
  neuter: { sg: ['όν', 'όντος', 'όντι', 'όν'], pl: ['όντα', 'όντων', 'οῦσι(ν)', 'όντα'] },
}

/** Aorist passive: ε + ντ after the θ, accented on the ε (λυθείς, λυθέντος). */
const AORIST_PASSIVE: Endings = {
  masculine: { sg: ['είς', 'έντος', 'έντι', 'έντα'], pl: ['έντες', 'έντων', 'εῖσι(ν)', 'έντας'] },
  feminine: { sg: ['εῖσα', 'είσης', 'είσῃ', 'εῖσαν'], pl: ['εῖσαι', 'εισῶν', 'είσαις', 'είσας'] },
  neuter: { sg: ['έν', 'έντος', 'έντι', 'έν'], pl: ['έντα', 'έντων', 'εῖσι(ν)', 'έντα'] },
}

/** Perfect active: οτ after the reduplicated stem (and κ), feminine υια; always accented on the ending (λελυκώς, λελυκότος). */
const PERFECT: Endings = {
  masculine: { sg: ['ώς', 'ότος', 'ότι', 'ότα'], pl: ['ότες', 'ότων', 'όσι(ν)', 'ότας'] },
  feminine: { sg: ['υῖα', 'υίας', 'υίᾳ', 'υῖαν'], pl: ['υῖαι', 'υιῶν', 'υίαις', 'υίας'] },
  neuter: { sg: ['ός', 'ότος', 'ότι', 'ός'], pl: ['ότα', 'ότων', 'όσι(ν)', 'ότα'] },
}

/** The 2-1-2 endings after μενο/η. */
const MP: Endings = {
  masculine: { sg: ['ος', 'ου', 'ῳ', 'ον'], pl: ['οι', 'ων', 'οις', 'ους'] },
  feminine: { sg: ['η', 'ης', 'ῃ', 'ην'], pl: ['αι', 'ων', 'αις', 'ας'] },
  neuter: { sg: ['ον', 'ου', 'ῳ', 'ον'], pl: ['α', 'ων', 'οις', 'α'] },
}
/** Short final syllables: the accent can stay three syllables back (λυόμενος); after a long one it moves to μέν. */
const MP_SHORT = new Set(['ος', 'ον', 'οι', 'αι', 'α'])

const ACUTE = '́'
const DIPHTHONGS = new Set(['αι', 'ει', 'οι', 'υι', 'αυ', 'ευ', 'ου', 'ηυ'])
const unaccented = (w: string) => w.normalize('NFD').replace(/[̀́͂]/g, '').normalize('NFC')

function accentLastVowel(w: string) {
  const d = unaccented(w).normalize('NFD')
  const i = [...d].findLastIndex((c) => /[αεηιουω]/.test(c))
  let end = i + 1
  while (end < d.length && /[̀-ͯ]/.test(d[end])) end++
  return (d.slice(0, end) + ACUTE + d.slice(end)).normalize('NFC')
}

/** λύ → λῦ when the accented vowel is long (a diphthong, η, ω, or marked `long`). */
function circumflexIfLong(v: ParticipleVerb) {
  const d = v.stem.normalize('NFD')
  const at = d.indexOf(ACUTE)
  const letters = d.slice(0, at).replace(/[̀-ͯ]/g, '')
  const vowel = letters.at(-1)!
  const long = v.long || 'ηω'.includes(vowel) || DIPHTHONGS.has(letters.slice(-2))
  return long ? (d.slice(0, at) + '͂' + d.slice(at + 1)).normalize('NFC') : v.stem
}

/** Stem + ending: an accented ending takes the accent; otherwise it stays on the stem (a circumflex before a short -ον/-αν). */
function ntForm(v: ParticipleVerb, stem: string, ending: string) {
  if (/[́͂]/.test(ending.normalize('NFD'))) return unaccented(stem) + ending
  return (ending === 'ον' || ending === 'αν' ? circumflexIfLong(v) : stem) + ending
}

/** Stem + connecting vowel (ο, or α after a first aorist's σ) + μενο/η + ending, accented on the syllable before μεν. */
function mpForm(v: ParticipleVerb, ending: string) {
  const vowel = v.athematic ? '' : v.tense === 'aorist' && !v.second ? 'α' : 'ο'
  const before = unaccented(v.stem) + vowel
  return MP_SHORT.has(ending) ? `${accentLastVowel(before)}μεν${ending}` : `${before}μέν${ending}`
}

const mapEndings = (e: Endings, f: (ending: string) => string) =>
  Object.fromEntries(Object.entries(e).map(([g, byNumber]) => [g, {
    sg: byNumber.sg.map(f) as CaseForms, pl: byNumber.pl.map(f) as CaseForms,
  }])) as DeclensionParadigm['forms']

export const VOICE_SHORT: Record<ParticipleVoice, string> = { active: 'act', 'middle/passive': 'mid/pass', middle: 'mid', passive: 'pass' }
export const TENSE_SHORT: Record<ParticipleTense, string> = { present: 'pres', aorist: 'aor', perfect: 'perf' }
export const tenseOf = (x: { tense?: 'aorist' | 'perfect' }): ParticipleTense => x.tense ?? 'present'

function formsOf(v: ParticipleVerb, voice: ParticipleVoice): DeclensionParadigm['forms'] {
  // The perfect middle/passive has no connecting vowel and keeps the accent on μέν: λελυμένος, λελυμένοι.
  if (v.tense === 'perfect') return voice === 'active' ? mapEndings(PERFECT, (e) => unaccented(v.stem) + e) : mapEndings(MP, (e) => `${unaccented(v.stem)}μέν${e}`)
  if (voice === 'passive' && v.tense === 'aorist') return mapEndings(AORIST_PASSIVE, (e) => unaccented(v.passiveStem!) + e)
  if (voice !== 'active') return mapEndings(MP, (e) => mpForm(v, e))
  if (v.tense === 'aorist' && v.second) return mapEndings(SECOND_AORIST, (e) => unaccented(v.stem) + e)
  return mapEndings(v.tense === 'aorist' ? FIRST_AORIST : PRESENT, (e) => ntForm(v, v.stem, e))
}

/** Chapter 27's ids (lyo-act, lyo-mp) are kept; aorist charts are lyo-aor-act, lyo-aor-mid, lyo-aor-pass. */
function chartId(v: ParticipleVerb, voice: ParticipleVoice) {
  if (!v.tense) return `${v.id}-${voice === 'active' ? 'act' : 'mp'}`
  return `${v.id}-${TENSE_SHORT[v.tense]}-${VOICE_SHORT[voice]}`
}

/** The verb's participle in one voice, as a declension chart. */
export function participleParadigm(v: ParticipleVerb, voice: ParticipleVoice): DeclensionParadigm {
  const forms = formsOf(v, voice)
  const active = voice === 'active' || (voice === 'passive' && v.tense === 'aorist')
  return {
    id: chartId(v, voice),
    lemma: v.lemma,
    lexical: forms.masculine!.sg![0],
    gloss: participleEnglish(v, voice),
    pattern: active ? '3-1-3' : '2-1-2',
    forms,
  }
}

/** “loosing”, “having loosed”, “being loosed”, “having been loosed”, or a deponent's active meaning (“coming”). */
export function participleEnglish(v: ParticipleVerb, voice: ParticipleVoice) {
  if (voice === 'active' || v.middleOnly || !v.pp) return voice === 'middle' && !v.middleOnly ? `${v.ing} (for oneself)` : v.ing
  if (voice === 'middle') return `${v.ing} (for oneself)`
  return `${v.tense ? 'having been' : 'being'} ${v.pp}`
}

export interface ParticipleChart {
  v: ParticipleVerb
  voice: ParticipleVoice
  tense: ParticipleTense
  p: DeclensionParadigm
}

/** εἰμί has no stem: its participle is the active endings alone (ὤν, οὖσα, ὄν). */
const EIMI_VERB: ParticipleVerb = { id: 'eimi', lemma: 'εἰμί', stem: '', voices: ['active'], ing: 'being' }

/** Every verb and voice the chapter drills, then εἰμί if the chapter has it. */
export function participleCharts(ch: Chapter): ParticipleChart[] {
  const pt = ch.participles
  if (!pt) return []
  return [
    ...pt.verbs.flatMap((v) => v.voices.map((voice) => ({ v, voice, tense: tenseOf(v), p: participleParadigm(v, voice) }))),
    ...(pt.eimi ? [{ v: EIMI_VERB, voice: 'active' as const, tense: 'present' as const, p: pt.eimi }] : []),
  ]
}

const slotKey = (s: Slot) => `${s.case}-${s.number}-${s.gender}`
const sharedFeatures = (a: Slot, b: Slot) => Number(a.case === b.case) + Number(a.number === b.number) + Number(a.gender === b.gender)

interface Parsing {
  tense: ParticipleTense
  voice: ParticipleVoice
}

export const parsingLabel = (tense: ParticipleTense, voice: ParticipleVoice, s: Slot) =>
  `${TENSE_SHORT[tense]} ${VOICE_SHORT[voice]} ptc ${slotLabel(s)}`
const optionKey = (x: Parsing, s: Slot) => `${x.tense}:${x.voice}:${slotKey(s)}`
const option = (x: Parsing, s: Slot) => ({ key: optionKey(x, s), label: parsingLabel(x.tense, x.voice, s) })

/** Tense/voice combinations to offer as a wrong parsing: the other voices of this tense, and the other tense if the chapter has it. */
function otherParsings(x: Parsing, ch: Chapter): Parsing[] {
  const all: Parsing[] = [
    { tense: 'present', voice: 'active' }, { tense: 'present', voice: 'middle/passive' },
    ...(ch.number >= 28 ? [{ tense: 'aorist' as const, voice: 'active' as const }, { tense: 'aorist' as const, voice: 'middle' as const }, { tense: 'aorist' as const, voice: 'passive' as const }] : []),
    ...(ch.number >= 30 ? [{ tense: 'perfect' as const, voice: 'active' as const }, { tense: 'perfect' as const, voice: 'middle/passive' as const }] : []),
  ]
  return all.filter((y) => y.tense !== x.tense || y.voice !== x.voice)
}

/**
 * The right parsing, two wrong ones in the same tense and voice that share features with it (other valid parsings are
 * never offered), and the same case, number and gender in another tense or voice.
 */
function parseOptions(x: Parsing, answer: Slot, valid: Slot[], all: Slot[], others: Parsing[]) {
  const wrong = shuffle(all.filter((s) => !valid.some((v) => slotKey(v) === slotKey(s))))
    .sort((a, b) => sharedFeatures(b, answer) - sharedFeatures(a, answer))
    .slice(0, others.length ? 2 : 3)
    .map((s) => option(x, s))
  const alt = shuffle(others).slice(0, 1).map((y) => option(y, answer))
  return shuffle([option(x, answer), ...wrong, ...alt])
}

function breakdown(c: ParticipleChart) {
  const passive = c.voice === 'passive' && c.tense === 'aorist'
  const stem = <span className="greek">{unaccented(passive ? c.v.passiveStem! : c.v.stem)}</span>
  if (!c.v.stem) return <>no stem, just <span className="greek">ντ</span> + case ending, the same endings as <span className="greek">λύων</span></>
  if (c.tense === 'perfect') {
    return c.voice === 'active'
      ? <>reduplicated perfect stem {stem} + <span className="greek">οτ</span> (feminine <span className="greek">υια</span>) + case ending</>
      : <>reduplicated perfect stem {stem} + <span className="greek">μενο/η</span>, with no connecting vowel, + case ending</>
  }
  const marker = c.tense === 'present'
    ? (c.voice === 'active' ? 'ο + ντ' : `${c.v.athematic ? '' : 'ο + '}μενο/η`)
    : passive ? 'ε + ντ'
      : c.v.second ? (c.voice === 'active' ? 'ο + ντ' : 'ο + μενο/η')
        : c.voice === 'active' ? 'α + ντ' : 'α + μενο/η'
  const what = c.tense === 'present' ? 'present stem' : passive ? 'aorist passive stem' : c.v.second ? 'second aorist stem' : 'first aorist stem'
  return <>{what} {stem} + <span className="greek">{marker}</span> + case ending</>
}

function formExplain(c: ParticipleChart, form: string) {
  const valid = parsingsOf(c.p, form)
  const labels = valid.map((s) => parsingLabel(c.tense, c.voice, s)).join(' · ')
  return (
    <>
      <p>
        <span className="greek">{form}</span> = {breakdown(c)}: {labels} of <span className="greek">{c.v.lemma}</span>,
        {' '}“{participleEnglish(c.v, c.voice)}.”{valid.length > 1 && <> Context decides which.</>}
      </p>
      {c.v.middleOnly && <p>{c.voice === 'passive' ? 'Passive' : 'Middle'} in form, active in meaning.</p>}
      {c.tense === 'aorist' && <p>No augment: the augment belongs to the indicative only.</p>}
      {c.tense === 'perfect' && <p>The reduplication stays (it isn’t an augment); the accent is always on the ending (<span className="greek">-ώς, -ότος</span>) or on <span className="greek">μέν</span>.</p>}
      {form.endsWith('σι(ν)') && <p>The dative plural looks just like a 3rd plural indicative (<span className="greek">{form.replace('(ν)', '')}</span>); the sentence tells you which.</p>}
    </>
  )
}

export const participleParseId = (ch: number, c: ParticipleChart, form: string) => `ch${ch}:ptc-parse:${c.p.id}:${form}`
export const participleBuildId = (ch: number, c: ParticipleChart, s: Slot) => `ch${ch}:ptc-build:${c.p.id}:${slotKey(s)}`
export const participleTenseId = (ch: number, c: ParticipleChart, form: string) => `ch${ch}:ptc-tense:${c.p.id}:${form}`
export const participleVerseId = (ch: number, v: { id: string }, skill: 'parse' | 'translate') => `ch${ch}:ptc-verse:${v.id}:${skill}`

/** Chapters from 28 on have aorist participles to confuse with. */
const hasAorist = (ch: Chapter) => ch.number >= 28

/** See a form, choose its parsing. */
export function participleParseQuestion(ch: Chapter, c: ParticipleChart, form: string): ChoiceQuestion {
  const valid = parsingsOf(c.p, form)
  const answer = shuffle(valid)[0]
  const x = { tense: c.tense, voice: c.voice }
  const others = c.v.voices.filter((y) => y !== c.voice).map((voice) => ({ tense: c.tense, voice }))
  if (hasAorist(ch) && c.voice === 'active') {
    const tenses: ParticipleTense[] = ch.number >= 30 ? ['present', 'aorist', 'perfect'] : ['present', 'aorist']
    others.push({ tense: shuffle(tenses.filter((t) => t !== c.tense))[0], voice: 'active' })
  }
  return {
    id: participleParseId(ch.number, c, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{c.v.lemma}</span> — parse it</p></>,
    options: parseOptions(x, answer, valid, slotsOf(c.p), others),
    answer: optionKey(x, answer),
    explain: formExplain(c, form),
    review: <><span className="greek">{form}</span> = {valid.map((s) => parsingLabel(c.tense, c.voice, s)).join(' · ')}</>,
  }
}

/** Given a parsing, choose the form. Other forms that share the right one's spelling are never offered. */
export function participleBuildQuestion(ch: Chapter, c: ParticipleChart, s: Slot): ChoiceQuestion {
  const correct = formAt(c.p, s)
  const wrong = shuffle(distinctForms(c.p).filter((f) => f !== correct))
    .map((f) => ({ f, shared: Math.max(...parsingsOf(c.p, f).map((x) => sharedFeatures(x, s))) }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((x) => x.f)
  const label = parsingLabel(c.tense, c.voice, s)
  return {
    id: participleBuildId(ch.number, c, s),
    prompt: <><p className="sentence">{label}</p><p className="muted">of <span className="greek">{c.v.lemma}</span> — which form?</p></>,
    options: shuffle([correct, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: correct,
    explain: formExplain(c, correct),
    review: <>{label} of <span className="greek">{c.v.lemma}</span> = <span className="greek">{correct}</span></>,
  }
}

const TENSE_OPTIONS = [
  { key: 'present', label: <>Present — continuous: “<em>while</em> …ing”</> },
  { key: 'aorist', label: <>Aorist — undefined: “<em>after</em> …ing,” “having …”</> },
]

/** Present or aorist? The chart may come from chapter 27 (present) or 28 (aorist). */
export function participleTenseQuestion(ch: Chapter, c: ParticipleChart, form: string): ChoiceQuestion {
  return {
    id: participleTenseId(ch.number, c, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{c.v.lemma}</span> — present or aorist?</p></>,
    options: TENSE_OPTIONS,
    answer: c.tense,
    explain: formExplain(c, form),
    review: <><span className="greek">{form}</span> is {c.tense}</>,
  }
}

const verseSlot = (v: ParsedParticiple): Slot => ({ case: v.case, number: v.number, gender: v.gender })

function highlighted(v: ParsedParticiple) {
  const at = v.text.indexOf(v.word)
  return (
    <>
      <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
      <p className="muted small">{v.ref ?? 'practice phrase'}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
    </>
  )
}

function verseExplain(v: ParsedParticiple) {
  return (
    <>
      <p>
        <span className="greek">{v.word}</span> is {parsingLabel(tenseOf(v), v.voice, verseSlot(v))} of <span className="greek">{v.lemma}</span>.
        {v.agrees && <> It agrees with {v.agrees}.</>}
      </p>
      <p className="english">“{v.translation}”</p>
      {v.note && <p>{v.note}</p>}
    </>
  )
}

const ALL_SLOTS: Slot[] = (['masculine', 'feminine', 'neuter'] as Gender[]).flatMap((gender) => (['sg', 'pl'] as GrammaticalNumber[])
  .flatMap((number) => (['nominative', 'genitive', 'dative', 'accusative'] as const).map((c) => ({ case: c, number, gender }))))

export function participleVerseParseQuestion(ch: Chapter, v: ParsedParticiple): ChoiceQuestion {
  const s = verseSlot(v)
  const x = { tense: tenseOf(v), voice: v.voice }
  return {
    id: participleVerseId(ch.number, v, 'parse'),
    prompt: <>{highlighted(v)}<p className="muted">Parse the highlighted participle</p></>,
    options: parseOptions(x, s, [s], ALL_SLOTS, otherParsings(x, ch)),
    answer: optionKey(x, s),
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref ?? 'practice'}) = {parsingLabel(x.tense, x.voice, s)}</>,
  }
}

export function participleVerseTranslateQuestion(ch: Chapter, v: ParticipleVerse): ChoiceQuestion {
  return {
    id: participleVerseId(ch.number, v, 'translate'),
    prompt: <>{highlighted(v)}<p className="muted">Which translation fits the highlighted participle?</p></>,
    options: shuffle([v.translation, ...(v.wrong ?? [])]).map((t) => ({ key: t, label: t })),
    answer: v.translation,
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}): “{v.translation}”</>,
  }
}

/**
 * Forms for “present or aorist?”: this chapter's aorist charts, and chapter 27's present charts for the same verbs
 * (λύων and λύσας, ἐρχόμενος and ἐλθών).
 */
export function tenseChoices(ch: Chapter) {
  const aorist = participleCharts(ch).filter((c) => c.tense === 'aorist')
  const lemmas = new Set(aorist.map((c) => c.v.lemma))
  const present = participleCharts(chapter27).filter((c) => lemmas.has(c.v.lemma))
  return [...aorist, ...present].flatMap((c) => distinctForms(c.p).map((form) => ({ c, form })))
}

export const absoluteId = (ch: number, v: ParticipleVerse) => `ch${ch}:ptc-absolute:${v.id}`

const ABSOLUTE_OPTIONS = [
  { key: 'yes', label: <>Genitive absolute — it and its own genitive “subject” stand apart from the main clause: “while/when …”</> },
  { key: 'no', label: <>Not absolute — it agrees with a genitive word the sentence needs (“of …,” after a preposition)</> },
]

/** Chapter 30: is this genitive participle a genitive absolute? */
export function absoluteQuestion(ch: Chapter, v: ParticipleVerse): ChoiceQuestion {
  return {
    id: absoluteId(ch.number, v),
    prompt: <>{highlighted(v)}<p className="muted">Is the highlighted participle a genitive absolute?</p></>,
    options: ABSOLUTE_OPTIONS,
    answer: v.absolute ? 'yes' : 'no',
    explain: (
      <>
        {v.absolute && <p>Its “subject,” {v.agrees}, is genitive too, and neither is part of the main clause: <span className="greek">{v.word}</span> sets the scene.</p>}
        {verseExplain(v)}
      </>
    ),
    review: <><span className="greek">{v.word}</span> ({v.ref}) {v.absolute ? 'is' : 'is not'} a genitive absolute</>,
  }
}

/** Genitive participles marked absolute or not, for chapter 30's drill. */
export const absoluteVerses = (ch: Chapter) => (ch.participles?.verses ?? []).filter((v) => v.absolute !== undefined)

/** The translation question only exists for verses with wrong translations written. */
export const translatableVerses = (ch: Chapter) => (ch.participles?.verses ?? []).filter((v) => v.wrong?.length)

import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type {
  CaseForms, Chapter, DeclensionParadigm, Gender, GrammaticalNumber, ParticipleVerb, ParticipleVerse, ParticipleVoice,
} from '../data/types'
import { type Slot, distinctForms, formAt, parsingsOf, slotLabel, slotsOf } from './declensionQuestions'
import { shuffle } from './progress'

// Questions for chapter 27: present adverbial participles. Every form is generated from the verb's present stem:
// stem + ο + ντ + third-declension endings (feminine ουσα, first declension), or stem + ο + μενο/η + 2-1-2 endings.

type Endings = Record<Gender, Record<GrammaticalNumber, CaseForms>>

/**
 * Connecting vowel + ντ + case ending, as they come out after the ντ drops or changes (ο + ντ + σα → ουσα).
 * An ending with an accent takes it (the ultima is long, so it can't stay on the stem); the rest leave it on the stem.
 */
const ACTIVE: Endings = {
  masculine: { sg: ['ων', 'οντος', 'οντι', 'οντα'], pl: ['οντες', 'όντων', 'ουσι(ν)', 'οντας'] },
  feminine: { sg: ['ουσα', 'ούσης', 'ούσῃ', 'ουσαν'], pl: ['ουσαι', 'ουσῶν', 'ούσαις', 'ούσας'] },
  neuter: { sg: ['ον', 'οντος', 'οντι', 'ον'], pl: ['οντα', 'όντων', 'ουσι(ν)', 'οντα'] },
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

function activeForm(v: ParticipleVerb, ending: string) {
  if (/[́͂]/.test(ending.normalize('NFD'))) return unaccented(v.stem) + ending
  return (ending === 'ον' ? circumflexIfLong(v) : v.stem) + ending
}

function mpForm(v: ParticipleVerb, ending: string) {
  const before = unaccented(v.stem) + (v.athematic ? '' : 'ο')
  return MP_SHORT.has(ending) ? `${accentLastVowel(before)}μεν${ending}` : `${before}μέν${ending}`
}

const mapEndings = (e: Endings, f: (ending: string) => string) =>
  Object.fromEntries(Object.entries(e).map(([g, byNumber]) => [g, {
    sg: byNumber.sg.map(f) as CaseForms, pl: byNumber.pl.map(f) as CaseForms,
  }])) as DeclensionParadigm['forms']

export const VOICE_SHORT: Record<ParticipleVoice, string> = { active: 'act', 'middle/passive': 'mid/pass' }

/** The verb's present participle in one voice, as a declension chart. */
export function participleParadigm(v: ParticipleVerb, voice: ParticipleVoice): DeclensionParadigm {
  const active = voice === 'active'
  return {
    id: `${v.id}-${active ? 'act' : 'mp'}`,
    lemma: v.lemma,
    lexical: active ? activeForm(v, 'ων') : mpForm(v, 'ος'),
    gloss: participleEnglish(v, voice),
    pattern: active ? '3-1-3' : '2-1-2',
    forms: active ? mapEndings(ACTIVE, (e) => activeForm(v, e)) : mapEndings(MP, (e) => mpForm(v, e)),
  }
}

/** “loosing”, “being loosed”, or a middle-only verb's active meaning (“coming”). */
export function participleEnglish(v: ParticipleVerb, voice: ParticipleVoice) {
  return voice === 'active' || v.middleOnly || !v.pp ? v.ing : `being ${v.pp}`
}

export interface ParticipleChart {
  v: ParticipleVerb
  voice: ParticipleVoice
  p: DeclensionParadigm
}

/** εἰμί has no stem: its participle is the active endings alone (ὤν, οὖσα, ὄν). */
const EIMI_VERB: ParticipleVerb = { id: 'eimi', lemma: 'εἰμί', stem: '', voices: ['active'], ing: 'being' }

/** Every verb and voice the chapter drills, then εἰμί. */
export function participleCharts(ch: Chapter): ParticipleChart[] {
  const pt = ch.participles
  if (!pt) return []
  return [
    ...pt.verbs.flatMap((v) => v.voices.map((voice) => ({ v, voice, p: participleParadigm(v, voice) }))),
    { v: EIMI_VERB, voice: 'active', p: pt.eimi },
  ]
}

const slotKey = (s: Slot) => `${s.case}-${s.number}-${s.gender}`
const sharedFeatures = (a: Slot, b: Slot) => Number(a.case === b.case) + Number(a.number === b.number) + Number(a.gender === b.gender)
export const parsingLabel = (voice: ParticipleVoice, s: Slot) => `pres ${VOICE_SHORT[voice]} ptc ${slotLabel(s)}`
const optionKey = (voice: ParticipleVoice, s: Slot) => `${voice}:${slotKey(s)}`

/** The right parsing plus three wrong ones that share features with it; other valid parsings are never offered. */
function parseOptions(voice: ParticipleVoice, answer: Slot, valid: Slot[], all: Slot[], otherVoice?: ParticipleVoice) {
  const wrong = shuffle(all.filter((s) => !valid.some((v) => slotKey(v) === slotKey(s))))
    .sort((a, b) => sharedFeatures(b, answer) - sharedFeatures(a, answer))
    .slice(0, otherVoice ? 2 : 3)
    .map((s) => ({ voice, s }))
  const options = [{ voice, s: answer }, ...wrong, ...(otherVoice ? [{ voice: otherVoice, s: answer }] : [])]
  return shuffle(options).map(({ voice: vc, s }) => ({ key: optionKey(vc, s), label: parsingLabel(vc, s) }))
}

function breakdown(c: ParticipleChart) {
  if (!c.v.stem) return <>no stem, just <span className="greek">ντ</span> + case ending, the same endings as <span className="greek">λύων</span></>
  if (c.voice === 'active') return <>stem <span className="greek">{unaccented(c.v.stem)}</span> + <span className="greek">ο + ντ</span> + case ending</>
  return <>stem <span className="greek">{unaccented(c.v.stem)}</span> + {c.v.athematic ? '' : <><span className="greek">ο</span> + </>}<span className="greek">μενο/η</span> + case ending</>
}

function formExplain(c: ParticipleChart, form: string) {
  const valid = parsingsOf(c.p, form)
  return (
    <>
      <p>
        <span className="greek">{form}</span> = {breakdown(c)}: {valid.map((s) => parsingLabel(c.voice, s)).join(' · ')}
        {' '}of <span className="greek">{c.v.lemma}</span>, “{participleEnglish(c.v, c.voice)}.”
        {valid.length > 1 && <> Context decides which.</>}
      </p>
      {c.v.middleOnly && <p>Middle in form, active in meaning: <span className="greek">{c.v.lemma}</span> is used in the middle.</p>}
      {form.endsWith('σι(ν)') && <p>The dative plural looks just like the 3rd plural indicative (<span className="greek">{form.replace('(ν)', '')}</span>, “they …”); the sentence tells you which.</p>}
    </>
  )
}

export const participleParseId = (ch: number, c: ParticipleChart, form: string) => `ch${ch}:ptc-parse:${c.p.id}:${form}`
export const participleBuildId = (ch: number, c: ParticipleChart, s: Slot) => `ch${ch}:ptc-build:${c.p.id}:${slotKey(s)}`
export const participleVerseId = (ch: number, v: ParticipleVerse, skill: 'parse' | 'translate') => `ch${ch}:ptc-verse:${v.id}:${skill}`

/** See a form, choose its parsing. */
export function participleParseQuestion(ch: Chapter, c: ParticipleChart, form: string): ChoiceQuestion {
  const valid = parsingsOf(c.p, form)
  const answer = shuffle(valid)[0]
  const other = c.v.voices.find((x) => x !== c.voice)
  return {
    id: participleParseId(ch.number, c, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{c.v.lemma}</span> — parse it</p></>,
    options: parseOptions(c.voice, answer, valid, slotsOf(c.p), other),
    answer: optionKey(c.voice, answer),
    explain: formExplain(c, form),
    review: <><span className="greek">{form}</span> = {valid.map((s) => parsingLabel(c.voice, s)).join(' · ')}</>,
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
  return {
    id: participleBuildId(ch.number, c, s),
    prompt: <><p className="sentence">{parsingLabel(c.voice, s)}</p><p className="muted">of <span className="greek">{c.v.lemma}</span> — which form?</p></>,
    options: shuffle([correct, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: correct,
    explain: formExplain(c, correct),
    review: <>{parsingLabel(c.voice, s)} of <span className="greek">{c.v.lemma}</span> = <span className="greek">{correct}</span></>,
  }
}

const verseSlot = (v: ParticipleVerse): Slot => ({ case: v.case, number: v.number, gender: v.gender })

function highlighted(v: ParticipleVerse) {
  const at = v.text.indexOf(v.word)
  return (
    <>
      <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
      <p className="muted small">{v.ref}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
    </>
  )
}

function verseExplain(v: ParticipleVerse) {
  return (
    <>
      <p>
        <span className="greek">{v.word}</span> is {parsingLabel(v.voice, verseSlot(v))} of <span className="greek">{v.lemma}</span>. It
        agrees with {v.agrees}.
      </p>
      <p className="english">“{v.translation}”</p>
      {v.note && <p>{v.note}</p>}
    </>
  )
}

const ALL_SLOTS: Slot[] = (['masculine', 'feminine', 'neuter'] as Gender[]).flatMap((gender) => (['sg', 'pl'] as GrammaticalNumber[])
  .flatMap((number) => (['nominative', 'genitive', 'dative', 'accusative'] as const).map((c) => ({ case: c, number, gender }))))

export function participleVerseParseQuestion(ch: Chapter, v: ParticipleVerse): ChoiceQuestion {
  const s = verseSlot(v)
  return {
    id: participleVerseId(ch.number, v, 'parse'),
    prompt: <>{highlighted(v)}<p className="muted">Parse the highlighted participle</p></>,
    options: parseOptions(v.voice, s, [s], ALL_SLOTS, v.voice === 'active' ? 'middle/passive' : 'active'),
    answer: optionKey(v.voice, s),
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) = {parsingLabel(v.voice, s)}</>,
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

/** The translation question only exists for verses with wrong translations written. */
export const translatableVerses = (ch: Chapter) => (ch.participles?.verses ?? []).filter((v) => v.wrong?.length)

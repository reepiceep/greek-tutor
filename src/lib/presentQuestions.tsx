import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, ContractVowel, Paradigm, PersonSlot, PresentVerb, PresentVerse, RootItem, SubjunctiveUse } from '../data/types'
import { shuffle } from './progress'

// Questions for chapters 16–19: the present and future indicative. Every form is generated from the verb's stem,
// so λύω's endings carry over to ἀκούω, βλέπω and the rest; chapter 17 contracts them, chapter 18 adds the middle/passive,
// and chapter 19 puts the same endings on the future stem (λύσ-).

export const SLOTS: PersonSlot[] = ['1s', '2s', '3s', '1p', '2p', '3p']

/** Connecting vowel + personal ending, as Mounce teaches them to be memorised. */
export const ENDINGS: Record<PersonSlot, string> = { '1s': 'ω', '2s': 'εις', '3s': 'ει', '1p': 'ομεν', '2p': 'ετε', '3p': 'ουσι(ν)' }

// --- Contract verbs (chapter 17) ---

export const CONTRACT_VOWELS: ContractVowel[] = ['α', 'ε', 'ο']

/** The vowel (or diphthong) each ending starts with: what the contract vowel meets. */
export const ENDING_VOWEL: Record<PersonSlot, string> = { '1s': 'ω', '2s': 'ει', '3s': 'ει', '1p': 'ο', '2p': 'ε', '3p': 'ου' }

/** Mounce's contractions: contract vowel + ending vowel → result. ῃ only meets them in the middle/passive (ποιῇ). */
export const CONTRACTIONS: Record<ContractVowel, Record<string, string>> = {
  α: { ω: 'ω', ει: 'ᾳ', ο: 'ω', ε: 'α', ου: 'ω', ῃ: 'ᾳ' },
  ε: { ω: 'ω', ει: 'ει', ο: 'ου', ε: 'ει', ου: 'ου', ῃ: 'ῃ' },
  ο: { ω: 'ω', ει: 'οι', ο: 'ου', ε: 'ου', ου: 'ου', ῃ: 'οι' },
}

/** Contracted present active endings, with the circumflex the contraction brings. */
export const CONTRACT_ENDINGS: Record<ContractVowel, Record<PersonSlot, string>> = {
  α: { '1s': 'ῶ', '2s': 'ᾷς', '3s': 'ᾷ', '1p': 'ῶμεν', '2p': 'ᾶτε', '3p': 'ῶσι(ν)' },
  ε: { '1s': 'ῶ', '2s': 'εῖς', '3s': 'εῖ', '1p': 'οῦμεν', '2p': 'εῖτε', '3p': 'οῦσι(ν)' },
  ο: { '1s': 'ῶ', '2s': 'οῖς', '3s': 'οῖ', '1p': 'οῦμεν', '2p': 'οῦτε', '3p': 'οῦσι(ν)' },
}

export const CONTRACT_NAME: Record<ContractVowel, string> = { α: 'α-contract (-άω)', ε: 'ε-contract (-έω)', ο: 'ο-contract (-όω)' }

// --- Middle/passive (chapter 18) ---

/** The primary middle/passive personal endings, as δύναμαι shows them with no connecting vowel. */
export const MP_PRIMARY: Record<PersonSlot, string> = { '1s': 'μαι', '2s': 'σαι', '3s': 'ται', '1p': 'μεθα', '2p': 'σθε', '3p': 'νται' }

/** Connecting vowel + ending. In the 2nd singular the σ drops out and ε + αι contracts to ῃ. */
export const MP_ENDINGS: Record<PersonSlot, string> = { '1s': 'ομαι', '2s': 'ῃ', '3s': 'εται', '1p': 'ομεθα', '2p': 'εσθε', '3p': 'ονται' }

export const MP_ENDING_VOWEL: Record<PersonSlot, string> = { '1s': 'ο', '2s': 'ῃ', '3s': 'ε', '1p': 'ο', '2p': 'ε', '3p': 'ο' }

export const CONTRACT_MP_ENDINGS: Record<ContractVowel, Record<PersonSlot, string>> = {
  α: { '1s': 'ῶμαι', '2s': 'ᾷ', '3s': 'ᾶται', '1p': 'ώμεθα', '2p': 'ᾶσθε', '3p': 'ῶνται' },
  ε: { '1s': 'οῦμαι', '2s': 'ῇ', '3s': 'εῖται', '1p': 'ούμεθα', '2p': 'εῖσθε', '3p': 'οῦνται' },
  ο: { '1s': 'οῦμαι', '2s': 'οῖ', '3s': 'οῦται', '1p': 'ούμεθα', '2p': 'οῦσθε', '3p': 'οῦνται' },
}

/** The future has a separate passive (chapter 24), so a future with middle/passive endings is simply middle. */
// --- Imperfect (chapter 21) ---

/** Connecting vowel + secondary active endings (ν, ς, –, μεν, τε, ν). */
export const IMPF_ENDINGS: Record<PersonSlot, string> = { '1s': 'ον', '2s': 'ες', '3s': 'ε(ν)', '1p': 'ομεν', '2p': 'ετε', '3p': 'ον' }
/** Connecting vowel + secondary middle/passive endings (μην, σο, το, μεθα, σθε, ντο); ε + σο → ου. */
export const IMPF_MP_ENDINGS: Record<PersonSlot, string> = { '1s': 'ομην', '2s': 'ου', '3s': 'ετο', '1p': 'ομεθα', '2p': 'εσθε', '3p': 'οντο' }
export const SECONDARY: Record<PersonSlot, string> = { '1s': 'ν', '2s': 'ς', '3s': '–', '1p': 'μεν', '2p': 'τε', '3p': 'ν' }
export const SECONDARY_MP: Record<PersonSlot, string> = { '1s': 'μην', '2s': 'σο', '3s': 'το', '1p': 'μεθα', '2p': 'σθε', '3p': 'ντο' }
const IMPF_VOWEL: Record<PersonSlot, string> = { '1s': 'ο', '2s': 'ε', '3s': 'ε', '1p': 'ο', '2p': 'ε', '3p': 'ο' }
const IMPF_MP_VOWEL: Record<PersonSlot, string> = { '1s': 'ο', '2s': 'ου', '3s': 'ε', '1p': 'ο', '2p': 'ε', '3p': 'ο' }

/**
 * Contracted imperfect endings. Where the accent falls on the stem (ἠγάπων, ἐποίουν) the ending is unaccented; where
 * the contraction takes it (ἠγαπῶμεν) the ending carries it.
 */
export const CONTRACT_IMPF: Record<ContractVowel, Record<PersonSlot, string>> = {
  α: { '1s': 'ων', '2s': 'ας', '3s': 'α', '1p': 'ῶμεν', '2p': 'ᾶτε', '3p': 'ων' },
  ε: { '1s': 'ουν', '2s': 'εις', '3s': 'ει', '1p': 'οῦμεν', '2p': 'εῖτε', '3p': 'ουν' },
  ο: { '1s': 'ουν', '2s': 'ους', '3s': 'ου', '1p': 'οῦμεν', '2p': 'οῦτε', '3p': 'ουν' },
}
export const CONTRACT_IMPF_MP: Record<ContractVowel, Record<PersonSlot, string>> = {
  α: { '1s': 'ώμην', '2s': 'ῶ', '3s': 'ᾶτο', '1p': 'ώμεθα', '2p': 'ᾶσθε', '3p': 'ῶντο' },
  ε: { '1s': 'ούμην', '2s': 'οῦ', '3s': 'εῖτο', '1p': 'ούμεθα', '2p': 'εῖσθε', '3p': 'οῦντο' },
  ο: { '1s': 'ούμην', '2s': 'οῦ', '3s': 'οῦτο', '1p': 'ούμεθα', '2p': 'οῦσθε', '3p': 'οῦντο' },
}

/** First aorist endings after the σ (or a liquid stem): the α is the tense formative. */
export const AOR1_ENDINGS: Record<PersonSlot, string> = { '1s': 'α', '2s': 'ας', '3s': 'ε(ν)', '1p': 'αμεν', '2p': 'ατε', '3p': 'αν' }
export const AOR1_MP_ENDINGS: Record<PersonSlot, string> = { '1s': 'αμην', '2s': 'ω', '3s': 'ατο', '1p': 'αμεθα', '2p': 'ασθε', '3p': 'αντο' }

/** Aorist passive endings after the θη (or η): the secondary active endings, with σαν in the 3rd plural. */
export const AORP_ENDINGS: Record<PersonSlot, string> = { '1s': 'ν', '2s': 'ς', '3s': '', '1p': 'μεν', '2p': 'τε', '3p': 'σαν' }

/** Perfect active endings after the κ (or a second perfect's stem); the New Testament also has -αν in the 3rd plural. */
export const PERF_ENDINGS: Record<PersonSlot, string> = { '1s': 'α', '2s': 'ας', '3s': 'ε(ν)', '1p': 'αμεν', '2p': 'ατε', '3p': 'ασι(ν)' }
/** Perfect middle/passive: the primary endings straight onto the stem, with no connecting vowel. */
export const PERF_MP_ENDINGS: Record<PersonSlot, string> = { '1s': 'μαι', '2s': 'σαι', '3s': 'ται', '1p': 'μεθα', '2p': 'σθε', '3p': 'νται' }

/** Subjunctive: the connecting vowel lengthens (ο → ω, ε → η; ει → ῃ) before the primary endings. */
export const SUBJ_ENDINGS: Record<PersonSlot, string> = { '1s': 'ω', '2s': 'ῃς', '3s': 'ῃ', '1p': 'ωμεν', '2p': 'ητε', '3p': 'ωσι(ν)' }
export const SUBJ_MP_ENDINGS: Record<PersonSlot, string> = { '1s': 'ωμαι', '2s': 'ῃ', '3s': 'ηται', '1p': 'ωμεθα', '2p': 'ησθε', '3p': 'ωνται' }
/** The aorist passive subjunctive: θε + ω contracts, so the accent falls on the ending (λυθῶ). */
export const SUBJ_PASSIVE_ENDINGS: Record<PersonSlot, string> = { '1s': 'ῶ', '2s': 'ῇς', '3s': 'ῇ', '1p': 'ῶμεν', '2p': 'ῆτε', '3p': 'ῶσι(ν)' }

const DIPHTHONGS = new Set(['αι', 'ει', 'οι', 'υι', 'αυ', 'ευ', 'ου', 'ηυ'])
const MARK = /[\u0300-\u036f]/

/** A word's letters (NFD, with their marks) and its syllable nuclei: which letter takes the accent, and whether it is long. */
function syllables(word: string) {
  const letters: { ch: string; marks: string }[] = []
  for (const c of unaccented(word).normalize('NFD')) {
    if (MARK.test(c) && letters.length) letters[letters.length - 1].marks += c
    else letters.push({ ch: c, marks: '' })
  }
  const nuclei: { at: number; long: boolean }[] = []
  for (let k = 0; k < letters.length; k++) {
    const l = letters[k]
    if (!'αεηιουω'.includes(l.ch)) continue
    const next = letters[k + 1]
    if (next && DIPHTHONGS.has(l.ch + next.ch) && !next.marks.includes('\u0308')) {
      nuclei.push({ at: k + 1, long: true })
      k++
    } else nuclei.push({ at: k, long: 'ηω'.includes(l.ch) || l.marks.includes('\u0345') })
  }
  return { letters, nuclei }
}

/**
 * The recessive accent of verbs: as far back as the ultima allows (antepenult, or penult when the ultima is long),
 * never before syllable `earliest` (a compound's augment), and a circumflex on a long penult before a short ultima.
 * α, ι, υ count as short, which holds for every ending here.
 */
export function recessive(word: string, earliest = 0): string {
  const { letters, nuclei } = syllables(word)
  const n = nuclei.length
  // A final -αι or -οι counts as short for the accent (λέλυμαι).
  const finalShort = /(αι|οι)$/.test(letters.map((l) => l.ch).join(''))
  const ultimaLong = nuclei[n - 1].long && !finalShort
  let t = n === 1 ? 0 : ultimaLong ? n - 2 : Math.max(0, n - 3)
  t = Math.max(t, Math.min(earliest, n - 1))
  const circumflex = n === 1 ? ultimaLong : t === n - 2 && nuclei[t].long && !ultimaLong
  letters[nuclei[t].at].marks += circumflex ? '\u0342' : '\u0301'
  return letters.map((l) => l.ch + l.marks).join('').normalize('NFC')
}

/** The imperfect: augmented stem + ending, accented; the contracted 1st and 2nd plural carry the accent on the ending. */
function imperfectParts(v: PresentVerb, slot: PersonSlot): [string, string] {
  const e = endingsOf(v)[slot]
  const nu = e.endsWith('(ν)')
  const base = nu ? e.slice(0, -3) : e
  if (v.contract) {
    const onEnding = /[\u0301\u0342]/.test(base.normalize('NFD'))
    return [(onEnding ? unaccented(v.stem) : accentLastVowel(v.stem)) + base, nu ? '(ν)' : '']
  }
  const earliest = v.prefix ? syllables(v.prefix).nuclei.length : 0
  return [recessive(v.stem + base, earliest), nu ? '(ν)' : '']
}

/** The imperfect and the second aorist share the augment and the secondary endings. */
const secondary = (v: PresentVerb) => v.tense === 'imperfect' || v.tense === 'aorist'

/** The future and aorist have separate passives (chapters 23–24), so their middle/passive endings are simply middle. */
export const voiceName = (v: PresentVerb) => (v.passiveForm ? 'passive' : !v.voice ? 'active' : v.tense === 'future' || v.tense === 'aorist' ? 'middle' : 'middle/passive')
export const tenseName = (v: PresentVerb) => v.tense ?? 'present'
export const moodName = (v: PresentVerb) => v.mood ?? 'indicative'
const lexicalGloss = (v: PresentVerb) => v.lexicalGloss ?? `I ${v.en}`

/** The ending as memorised, before any contraction: ω, εις… or ομαι, ῃ… (μαι, σαι… for δύναμαι). */
export const plainEndingsOf = (v: PresentVerb) =>
  v.mood === 'subjunctive' ? (v.passiveForm ? SUBJ_PASSIVE_ENDINGS : v.voice ? SUBJ_MP_ENDINGS : SUBJ_ENDINGS)
    : v.tense === 'perfect' ? (v.voice ? PERF_MP_ENDINGS : PERF_ENDINGS)
    : v.passiveForm && v.tense === 'aorist' ? AORP_ENDINGS
    : v.firstAorist && v.tense === 'aorist' ? (v.voice ? AOR1_MP_ENDINGS : AOR1_ENDINGS)
    : secondary(v) ? (v.voice ? IMPF_MP_ENDINGS : IMPF_ENDINGS) : !v.voice ? ENDINGS : v.athematic ? MP_PRIMARY : MP_ENDINGS
const endingVowelOf = (v: PresentVerb) =>
  secondary(v) ? (v.voice ? IMPF_MP_VOWEL : IMPF_VOWEL) : v.voice ? MP_ENDING_VOWEL : ENDING_VOWEL

export const endingsOf = (v: PresentVerb) =>
  !v.contract || v.mood ? plainEndingsOf(v)
    : secondary(v) ? (v.voice ? CONTRACT_IMPF_MP : CONTRACT_IMPF)[v.contract]
      : (v.voice ? CONTRACT_MP_ENDINGS : CONTRACT_ENDINGS)[v.contract]

const ACCENTS = /[\u0300\u0301\u0342]/g
const unaccented = (w: string) => w.normalize('NFD').replace(ACCENTS, '').normalize('NFC')

/** Put an acute on the last vowel: δυνα → δυνά. */
function accentLastVowel(w: string) {
  const d = unaccented(w).normalize('NFD')
  const i = [...d].findLastIndex((c) => /[αεηιουω]/.test(c))
  let end = i + 1
  while (end < d.length && /[\u0300-\u036f]/.test(d[end])) end++
  return (d.slice(0, end) + '\u0301' + d.slice(end)).normalize('NFC')
}

/**
 * Stem and ending of one form. A middle/passive 1st plural can't keep the accent on the stem: -ομεθα is three
 * syllables, so the accent moves forward onto the ο (λυόμεθα), or onto δύναμαι's α (δυνάμεθα).
 */
function formParts(v: PresentVerb, slot: PersonSlot): [string, string] {
  const odd = v.irregular?.[slot]
  // An irregular form can end in a movable ν too (εἰμί's subjunctive ὦσι(ν)).
  if (odd) return odd.endsWith('(ν)') ? [odd.slice(0, -3), '(ν)'] : [odd, '']
  if (v.mood === 'subjunctive') {
    const e = plainEndingsOf(v)[slot]
    // λυθῶ carries its accent on the ending; λυώμεθα, like λυόμεθα, can't keep it on the stem.
    if (v.passiveForm) return [unaccented(v.stem), e]
    if (v.voice && slot === '1p') return [unaccented(v.stem), `ώ${e.slice(1)}`]
    return [v.stem, e]
  }
  if (secondary(v) || v.tense === 'perfect') return imperfectParts(v, slot)
  const e = endingsOf(v)[slot]
  if (v.voice && !v.contract && slot === '1p') return v.athematic ? [accentLastVowel(v.stem), e] : [unaccented(v.stem), `ό${e.slice(1)}`]
  return [v.stem, e]
}

/** Slots in reading order for a two-column grid, so each row is singular | plural of one person. */
const GRID_ORDER: PersonSlot[] = ['1s', '1p', '2s', '2p', '3s', '3p']

export const SLOT_LABEL: Record<PersonSlot, string> = {
  '1s': '1st sg', '2s': '2nd sg', '3s': '3rd sg', '1p': '1st pl', '2p': '2nd pl', '3p': '3rd pl',
}

export const SLOT_NAME: Record<PersonSlot, string> = {
  '1s': '1st person singular', '2s': '2nd person singular', '3s': '3rd person singular',
  '1p': '1st person plural', '2p': '2nd person plural', '3p': '3rd person plural',
}

export const PRONOUN: Record<PersonSlot, string> = {
  '1s': 'I', '2s': 'you (sg)', '3s': 'he/she/it', '1p': 'we', '2p': 'you (pl)', '3p': 'they',
}

/** Accepted spellings: the active 3rd plural has a movable ν. The first is canonical. */
export function presentForms(v: PresentVerb, slot: PersonSlot): string[] {
  const [stem, e] = formParts(v, slot)
  const forms = e.endsWith('(ν)') ? [stem + e.slice(0, -3), `${stem + e.slice(0, -3)}ν`] : [stem + e]
  // The perfect active 3rd plural also appears with -αν in the New Testament (ἔγνωκαν).
  if (v.tense === 'perfect' && !v.voice && slot === '3p' && !v.irregular?.['3p']) {
    forms.push(recessive(`${v.stem}αν`, v.prefix ? syllables(v.prefix).nuclei.length : 0))
  }
  return forms
}

export const presentDisplay = (v: PresentVerb, slot: PersonSlot) => formParts(v, slot).join('')

const BE: Record<PersonSlot, string> = { '1s': 'am', '2s': 'are', '3s': 'is', '1p': 'are', '2p': 'are', '3p': 'are' }
const HAVE: Record<PersonSlot, string> = { '1s': 'have', '2s': 'have', '3s': 'has', '1p': 'have', '2p': 'have', '3p': 'have' }
const WAS: Record<PersonSlot, string> = { '1s': 'was', '2s': 'were', '3s': 'was', '1p': 'were', '2p': 'were', '3p': 'were' }

function imperfectEnglish(v: PresentVerb, slot: PersonSlot) {
  if (v.voice === 'passive') return `${PRONOUN[slot]} ${WAS[slot]} being ${v.pp}`
  return `${PRONOUN[slot]} ${WAS[slot]}${v.ing ? ` ${v.ing}` : ''}`
}

export const presentEnglish = (v: PresentVerb, slot: PersonSlot) =>
  v.mood === 'subjunctive' ? `${PRONOUN[slot]} may ${v.voice === 'passive' ? `be ${v.pp}` : v.en}`
    : v.tense === 'perfect' ? `${PRONOUN[slot]} ${HAVE[slot]} ${v.voice === 'passive' ? 'been ' : ''}${v.pp}`
    : v.tense === 'aorist' ? `${PRONOUN[slot]} ${v.passiveForm && v.voice === 'passive' ? `${WAS[slot]} ${v.pp}` : v.past}`
    : v.tense === 'imperfect' ? imperfectEnglish(v, slot)
    : v.tense === 'future' ? `${PRONOUN[slot]} will ${v.voice === 'passive' ? `be ${v.pp}` : v.en}`
    : v.voice === 'passive' ? `${PRONOUN[slot]} ${BE[slot]} ${v.pp}` : `${PRONOUN[slot]} ${slot === '3s' ? v.en3 : v.en}`

/** The verb's present chart, in the shape the chart drill expects. */
export function presentParadigm(v: PresentVerb): Paradigm {
  return {
    id: `present-${v.id}`,
    title: `${v.lemma}: ${tenseName(v)} ${voiceName(v)} ${moodName(v)}`,
    rows: SLOTS.map((s) => ({
      key: s, label: SLOT_LABEL[s], forms: presentForms(v, s), gloss: presentEnglish(v, s),
      ...(s === '3p' ? { display: presentDisplay(v, s) } : {}),
    })),
  }
}

export type PresentSkill = 'identify' | 'translate' | 'produce' | 'type'
export type VerseSkill = 'parse' | 'lexical'

// Matches paradigmItemId, so typing a form in the chart counts toward "produce".
export const presentItemId = (ch: number, v: PresentVerb, slot: PersonSlot, skill: PresentSkill) => `ch${ch}:present-${v.id}:${slot}:${skill}`
export const endingItemId = (ch: number, slot: PersonSlot, dir: 'person' | 'ending') => `ch${ch}:present-ending:${slot}:${dir}`
export const presentVerseId = (ch: number, v: PresentVerse, skill: VerseSkill) => `ch${ch}:present-verse:${v.id}:${skill}`

const verbsOf = (ch: Chapter) => ch.present?.verbs ?? []
/** One verb per lemma, shuffled (λύω can appear as active and passive). */
const distinctLemmas = (vs: PresentVerb[]) => shuffle([...new Map(vs.map((v) => [v.lemma, v])).values()])
export const presentVerb = (ch: Chapter, id: string) => verbsOf(ch).find((v) => v.id === id)!

/** λύ + ομεν, or for a contract verb ποιε + ομεν (ε + ο → ου), or for a future βλεπ + σ + ω (π + σ → ψ). */
const breakdown = (v: PresentVerb, slot: PersonSlot) => {
  if (v.irregular?.[slot]) return <>irregular, with no connecting vowel</>
  if (v.mood === 'subjunctive') {
    const why = v.passiveForm ? 'θη + ω contracts, so the accent is on the ending' : v.tense === 'aorist' ? 'no augment, and a lengthened connecting vowel' : 'a lengthened connecting vowel'
    return <><span className="greek">{unaccented(v.stem)} + {plainEndingsOf(v)[slot]}</span> ({why})</>
  }
  if (v.passiveForm && v.tense === 'aorist') {
    const rule = passiveRuleFor(v)
    return (
      <>
        <span className="greek">{v.stem} + {plainEndingsOf(v)[slot] || '(no ending)'}</span>
        {rule && <> (<span className="greek">{rule.from} + θ → {rule.to}</span>)</>}
      </>
    )
  }
  if (v.firstAorist && v.tense === 'aorist') {
    const rule = ruleFor(v)
    return (
      <>
        <span className="greek">{v.stem} + {plainEndingsOf(v)[slot]}</span>
        {v.liquid ? <> (a liquid aorist: no σ)</> : rule && <> (<span className="greek">{rule.from} + σ → {rule.to}</span>)</>}
      </>
    )
  }
  if (v.liquid) {
    return <><span className="greek">{v.stem} + (ε)σ + {plainEndingsOf(v)[slot]}</span> (a liquid future: the σ drops out and the ε contracts)</>
  }
  if (v.tense === 'future') {
    const rule = ruleFor(v)
    return (
      <>
        <span className="greek">{v.from ?? v.stem} {v.from && '+ σ '}+ {plainEndingsOf(v)[slot]}</span>
        {rule && <> (<span className="greek">{rule.from} + σ → {rule.to}</span>)</>}
      </>
    )
  }
  const vowel = endingVowelOf(v)[slot]
  return (
    <>
      <span className="greek">{v.stem}{v.contract} + {plainEndingsOf(v)[slot]}</span>
      {v.contract && <> (<span className="greek">{v.contract} + {vowel} → {CONTRACTIONS[v.contract][vowel]}</span>)</>}
    </>
  )
}

function explainForm(v: PresentVerb, slot: PersonSlot) {
  return (
    <p>
      <span className="greek">{presentDisplay(v, slot)}</span> = {breakdown(v, slot)}: {SLOT_NAME[slot]}{v.tense && ` ${v.tense}`}{v.voice && ` ${voiceName(v)}`}{v.mood && ` ${v.mood}`} of{' '}
      <span className="greek">{v.lemma}</span>, “{presentEnglish(v, slot)}.”{v.change && <> {v.change}</>}
    </p>
  )
}

/** Two other persons of the same verb and the same person of another verb: the mistakes worth practising. */
function distractors(ch: Chapter, v: PresentVerb, slot: PersonSlot): { v: PresentVerb; slot: PersonSlot }[] {
  const form = presentDisplay(v, slot)
  const others = shuffle(SLOTS.filter((s) => presentDisplay(v, s) !== form))
  const other = shuffle(verbsOf(ch).filter((o) => o.lemma !== v.lemma))[0]
  return other ? [...others.slice(0, 2).map((s) => ({ v, slot: s })), { v: other, slot }] : others.slice(0, 3).map((s) => ({ v, slot: s }))
}

/** The first slot with the same form: ἔλυον answers both 1st sg and 3rd pl, so they share one option. */
const sameFormSlot = (v: PresentVerb, slot: PersonSlot) => SLOTS.find((s) => presentDisplay(v, s) === presentDisplay(v, slot))!

const key = (x: { v: PresentVerb; slot: PersonSlot }) => `${x.v.id}:${x.slot}`

/** Form → person and number. */
export function presentIdentifyQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, form = presentForms(v, slot)[0]): ChoiceQuestion {
  return {
    id: presentItemId(ch.number, v, slot, 'identify'),
    prompt: <><span className="greek big">{form}</span><p className="muted">Person and number?</p></>,
    options: [...new Set(GRID_ORDER.map((s) => sameFormSlot(v, s)))].map((k) => ({
      key: k,
      label: <>{SLOTS.filter((s) => sameFormSlot(v, s) === k).map((s) => SLOT_LABEL[s]).join(' / ')} <span className="muted">-{endingsOf(v)[k]}</span></>,
    })),
    answer: sameFormSlot(v, slot),
    explain: explainForm(v, slot),
    review: <><span className="greek">{form}</span> = {SLOT_LABEL[slot]}, “{presentEnglish(v, slot)}”</>,
  }
}

/** Form → English. */
export function presentTranslateQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  const options = shuffle([{ v, slot }, ...distractors(ch, v, slot)])
  return {
    id: presentItemId(ch.number, v, slot, 'translate'),
    prompt: <><span className="greek big">{presentForms(v, slot).at(-1)}</span><p className="muted">Translate</p></>,
    options: options.map((o) => ({ key: key(o), label: presentEnglish(o.v, o.slot) })),
    answer: key({ v, slot }),
    explain: explainForm(v, slot),
    review: <><span className="greek">{presentDisplay(v, slot)}</span> = “{presentEnglish(v, slot)}”</>,
  }
}

/** English → form. */
export function presentProduceQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  const options = shuffle([{ v, slot }, ...distractors(ch, v, slot)])
  return {
    id: presentItemId(ch.number, v, slot, 'produce'),
    prompt: <><span className="big">“{presentEnglish(v, slot)}”</span><p className="muted">Which Greek form?</p></>,
    options: options.map((o) => ({ key: key(o), label: presentDisplay(o.v, o.slot), greek: true })),
    answer: key({ v, slot }),
    explain: explainForm(v, slot),
    review: <>“{presentEnglish(v, slot)}” = <span className="greek">{presentDisplay(v, slot)}</span></>,
  }
}

/** The model verb's endings: ω, εις… in chapter 16, ομαι, ῃ… in chapter 18. */
const chapterEndings = (ch: Chapter) => (verbsOf(ch)[0] ? plainEndingsOf(verbsOf(ch)[0]) : ENDINGS)

/** -ομεν → “we”. */
export function endingPersonQuestion(ch: Chapter, slot: PersonSlot): ChoiceQuestion {
  const model = verbsOf(ch)[0]
  const endings = chapterEndings(ch)
  return {
    id: endingItemId(ch.number, slot, 'person'),
    prompt: <><span className="greek big">-{endings[slot]}</span><p className="muted">Who is the subject?</p></>,
    options: SLOTS.map((s) => ({ key: s, label: <>{PRONOUN[s]} <span className="muted">{SLOT_LABEL[s]}</span></> })),
    answer: slot,
    explain: model && explainForm(model, slot),
    review: <><span className="greek">-{endings[slot]}</span> = {PRONOUN[slot]} ({SLOT_LABEL[slot]})</>,
  }
}

/** “we” → -ομεν. */
export function endingFormQuestion(ch: Chapter, slot: PersonSlot): ChoiceQuestion {
  const model = verbsOf(ch)[0]
  const endings = chapterEndings(ch)
  return {
    id: endingItemId(ch.number, slot, 'ending'),
    prompt: <><span className="big">“{PRONOUN[slot]}”</span><p className="muted">{SLOT_NAME[slot]}: which present {model ? voiceName(model) : 'active'} ending?</p></>,
    options: SLOTS.map((s) => ({ key: s, label: `-${endings[s]}`, greek: true })),
    answer: slot,
    explain: model && explainForm(model, slot),
    review: <>{PRONOUN[slot]} = <span className="greek">-{endings[slot]}</span></>,
  }
}

function highlighted(v: PresentVerse) {
  const at = v.text.indexOf(v.word)
  return (
    <>
      <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
      <p className="muted small">{v.ref}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
    </>
  )
}

/** The verse's verb in the tense the verse has it in (a future passive in chapter 24, where the drills are aorist). */
export const verseVerb = (ch: Chapter, v: PresentVerse) => (v.tense ? inTense(presentVerb(ch, v.verb), v.tense) : presentVerb(ch, v.verb))

function explainVerse(ch: Chapter, v: PresentVerse) {
  const verb = verseVerb(ch, v)
  return (
    <>
      <p>
        <span className="greek">{v.word}</span> = {breakdown(verb, v.slot)}: {SLOT_NAME[v.slot]}, {tenseName(verb)} {voiceName(verb)} {moodName(verb)}
        of <span className="greek">{verb.lemma}</span>.
        {verb.voice === 'middle' && (verb.tense === 'future'
          ? <> Its future is middle in form but active in meaning.</>
          : <> <span className="greek">{verb.lemma}</span> is middle-only: middle/passive endings, active meaning.</>)}
      </p>
      <p className="english">“{v.translation}”</p>
      {sameFormSlot(verb, v.slot) !== v.slot || SLOTS.some((s) => s !== v.slot && sameFormSlot(verb, s) === v.slot)
        ? <p className="muted">The same form is also {SLOTS.filter((s) => s !== v.slot && presentDisplay(verb, s) === presentDisplay(verb, v.slot)).map((s) => SLOT_LABEL[s]).join(', ')}; the context decides.</p>
        : null}
      {v.note && <p>{v.note}</p>}
    </>
  )
}

export function verseParseQuestion(ch: Chapter, v: PresentVerse): ChoiceQuestion {
  return {
    id: presentVerseId(ch.number, v, 'parse'),
    prompt: <>{highlighted(v)}<p className="muted">Person and number of the highlighted verb?</p></>,
    options: GRID_ORDER.map((s) => ({ key: s, label: <>{SLOT_LABEL[s]} <span className="muted">“{PRONOUN[s]}”</span></> })),
    answer: v.slot,
    explain: explainVerse(ch, v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) = {SLOT_LABEL[v.slot]}</>,
  }
}

export function verseLexicalQuestion(ch: Chapter, v: PresentVerse): ChoiceQuestion {
  const verb = presentVerb(ch, v.verb)
  const others = distinctLemmas(verbsOf(ch).filter((o) => o.lemma !== verb.lemma)).slice(0, 3)
  return {
    id: presentVerseId(ch.number, v, 'lexical'),
    prompt: <>{highlighted(v)}<p className="muted">What is the lexical form of the highlighted verb?</p></>,
    options: shuffle([verb, ...others]).map((o) => ({ key: o.id, label: <><span className="greek">{o.lemma}</span> <span className="muted">“{lexicalGloss(o)}”</span></> })),
    answer: verb.id,
    explain: explainVerse(ch, v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) is from <span className="greek">{verb.lemma}</span></>,
  }
}

export const contractionItemId = (ch: number, c: ContractVowel, vowel: string) => `ch${ch}:contraction:${c}+${vowel}`
export const contractTypeItemId = (ch: number, v: PresentVerb, slot: PersonSlot) => presentItemId(ch, v, slot, 'type')

/** The vowels a contract vowel meets in the present active: ω, ει, ο, ε, ου. */
export const ACTIVE_VOWELS = [...new Set(SLOTS.map((s) => ENDING_VOWEL[s]))]

/** Every contract-vowel + ending-vowel pair that occurs in the present active. */
export const contractionPairs = () => CONTRACT_VOWELS.flatMap((c) => ACTIVE_VOWELS.map((vowel) => ({ c, vowel })))

const RESULTS = [...new Set(contractionPairs().map(({ c, vowel }) => CONTRACTIONS[c][vowel]))]

/** ε + ο → ? */
export function contractionQuestion(ch: Chapter, c: ContractVowel, vowel: string): ChoiceQuestion {
  const answer = CONTRACTIONS[c][vowel]
  const example = verbsOf(ch).find((v) => v.contract === c)
  const slot = SLOTS.find((s) => ENDING_VOWEL[s] === vowel)!
  return {
    id: contractionItemId(ch.number, c, vowel),
    prompt: <><span className="greek big">{c} + {vowel}</span><p className="muted">What do they contract to?</p></>,
    options: RESULTS.map((r) => ({ key: r, label: r, greek: true })),
    answer,
    explain: example && explainForm(example, slot),
    review: <><span className="greek">{c} + {vowel} → {answer}</span></>,
  }
}

/** Can the form be traced back to only one kind of contract verb? (ποιῶ could be -άω, -έω or -όω.) */
export function tellsContractType(v: PresentVerb, slot: PersonSlot): boolean {
  if (!v.contract) return false
  const table = v.voice ? CONTRACT_MP_ENDINGS : CONTRACT_ENDINGS
  const mine = table[v.contract][slot]
  return CONTRACT_VOWELS.filter((c) => c !== v.contract).every((c) => table[c][slot] !== mine)
}

/** ποιεῖτε → ε-contract, so the lexical form is ποιέω. */
export function contractTypeQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  return {
    id: contractTypeItemId(ch.number, v, slot),
    prompt: <><span className="greek big">{presentForms(v, slot).at(-1)}</span><p className="muted">What kind of contract verb is this?</p></>,
    options: CONTRACT_VOWELS.map((c) => ({ key: c, label: CONTRACT_NAME[c] })),
    answer: v.contract!,
    explain: explainForm(v, slot),
    review: <><span className="greek">{presentDisplay(v, slot)}</span> is from <span className="greek">{v.lemma}</span></>,
  }
}

export const FORM_SKILLS = ['identify', 'translate', 'produce'] as const

/** Identify, translate or produce one form. */
export function presentFormQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, skill: (typeof FORM_SKILLS)[number]): ChoiceQuestion {
  return skill === 'identify' ? presentIdentifyQuestion(ch, v, slot) : skill === 'translate' ? presentTranslateQuestion(ch, v, slot) : presentProduceQuestion(ch, v, slot)
}

// --- Active or middle/passive? (chapter 18) ---

export type VoiceKey = 'active' | 'mp'
const VOICE_LABEL: Record<VoiceKey, string> = { active: 'active', mp: 'middle/passive' }

/** The same verb in the active or the middle/passive. */
export const inVoice = (v: PresentVerb, voice: VoiceKey): PresentVerb => (voice === 'mp' ? v : { ...v, voice: undefined })

export const voiceItemId = (ch: number, v: PresentVerb, slot: PersonSlot, voice: VoiceKey) => `ch${ch}:present-voice:${v.id}:${slot}:${voice}`

/** Only a verb with an active (not ἔρχομαι), and only a form with one parse: ἀγαπᾷ is active 3rd sg and middle/passive 2nd sg. */
export const askVoice = (v: PresentVerb, slot: PersonSlot, voice: VoiceKey) =>
  v.voice === 'passive' && oneParse((k) => inVoice(v, k), ['active', 'mp'] as const, slot, voice)

export const voicePairs = (ch: Chapter) =>
  verbsOf(ch).flatMap((v) => SLOTS.flatMap((slot) => (['active', 'mp'] as const).filter((voice) => askVoice(v, slot, voice)).map((voice) => ({ v, slot, voice }))))

interface Side {
  key: string
  label: string
  v: PresentVerb
}

/**
 * The same form in two tenses or voices: the right parse, the other one in the same person, and both in a person that
 * is easy to confuse (2nd and 3rd singular: λύῃ / λύει).
 */
function contrastQuestion(id: string, shown: Side, other: Side, slot: PersonSlot, ask: string): ChoiceQuestion {
  const alt: PersonSlot = slot === '2s' ? '3s' : slot === '3s' ? '2s' : shuffle(SLOTS.filter((s) => s !== slot))[0]
  const options = shuffle([{ side: shown, slot }, { side: other, slot }, { side: shown, slot: alt }, { side: other, slot: alt }])
  return {
    id,
    prompt: <><span className="greek big">{presentForms(shown.v, slot).at(-1)}</span><p className="muted">{ask}</p></>,
    options: options.map((o) => ({ key: `${o.side.key}:${o.slot}`, label: `${o.side.label} · ${SLOT_LABEL[o.slot]}` })),
    answer: `${shown.key}:${slot}`,
    explain: (
      <>
        {explainForm(shown.v, slot)}
        <p className="muted">
          The {other.label} is <span className="greek">{presentDisplay(other.v, slot)}</span>, “{presentEnglish(other.v, slot)}.”
        </p>
      </>
    ),
    review: <><span className="greek">{presentDisplay(shown.v, slot)}</span> = {shown.label} {SLOT_LABEL[slot]}, “{presentEnglish(shown.v, slot)}”</>,
  }
}

/** Does the form have only one parse among both tenses or voices? (ἀγαπᾷ is active 3rd sg and middle/passive 2nd sg.) */
function oneParse<K extends string>(make: (k: K) => PresentVerb, keys: readonly K[], slot: PersonSlot, key: K) {
  const form = presentDisplay(make(key), slot)
  return keys.every((k) => SLOTS.every((s) => (k === key && s === slot) || presentDisplay(make(k), s) !== form))
}

/** λύῃ → middle/passive 2nd sg, with λύει (active 3rd sg) among the options: the trap in this chapter. */
export function voiceQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, voice: VoiceKey): ChoiceQuestion {
  const other: VoiceKey = voice === 'active' ? 'mp' : 'active'
  return contrastQuestion(
    voiceItemId(ch.number, v, slot, voice),
    { key: voice, label: VOICE_LABEL[voice], v: inVoice(v, voice) },
    { key: other, label: VOICE_LABEL[other], v: inVoice(v, other) },
    slot, 'Active or middle/passive, and which person?',
  )
}

// --- Future (chapter 19) ---

export interface FutureRule {
  /** The last letter of the stem, before the σ. */
  from: string
  /** What stem letter + σ becomes. */
  to: string
  /** Every result on offer for this kind of letter. */
  options: string[]
  why: string
}

const LABIAL = 'Labials (π, β, φ) + σ → ψ.'
const VELAR = 'Velars (κ, γ, χ) + σ → ξ.'
const DENTAL = 'Dentals (τ, δ, θ) and ζ drop out before σ.'
const LENGTHEN = 'A contract vowel lengthens before the σ: α and ε → η, ο → ω.'

/** Square of Stops, and contract vowels lengthening, when the future's σ is added. */
export const FUTURE_RULES: FutureRule[] = [
  ...['π', 'β', 'φ'].map((from) => ({ from, to: 'ψ', options: ['ψ', 'ξ', 'σ', `${from}σ`], why: LABIAL })),
  ...['κ', 'γ', 'χ'].map((from) => ({ from, to: 'ξ', options: ['ξ', 'ψ', 'σ', `${from}σ`], why: VELAR })),
  ...['τ', 'δ', 'θ', 'ζ'].map((from) => ({ from, to: 'σ', options: ['σ', 'ψ', 'ξ', `${from}σ`], why: DENTAL })),
  { from: 'α', to: 'ησ', options: ['ησ', 'ωσ', 'ασ'], why: LENGTHEN },
  { from: 'ε', to: 'ησ', options: ['ησ', 'ωσ', 'εσ'], why: LENGTHEN },
  { from: 'ο', to: 'ωσ', options: ['ωσ', 'ησ', 'οσ'], why: LENGTHEN },
]

const baseLetters = (w: string) => w.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/** The rule that made this verb's future stem (βλεπ + σ → βλεψ), if any: λύσω just adds σ. */
export function ruleFor(v: PresentVerb): FutureRule | undefined {
  return v.from ? FUTURE_RULES.find((r) => r.from === baseLetters(v.from!).at(-1)) : undefined
}

export const futureRuleItemId = (ch: number, r: FutureRule) => `ch${ch}:future-rule:${r.from}`
export const futureFormItemId = (ch: number, v: PresentVerb) => `ch${ch}:future-form:${v.id}`
export const futureLexicalItemId = (ch: number, v: PresentVerb, slot: PersonSlot) => `ch${ch}:future-lexical:${v.id}:${slot}`

const verbExample = (v: PresentVerb) => <><span className="greek">{v.lemma} → {presentDisplay(v, '1s')}</span></>

/** π + σ → ? */
export function futureRuleQuestion(ch: Chapter, r: FutureRule): ChoiceQuestion {
  const examples = verbsOf(ch).filter((v) => ruleFor(v) === r)
  return {
    id: futureRuleItemId(ch.number, r),
    prompt: <><span className="greek big">{r.from} + σ</span><p className="muted">What does it become when the σ is added?</p></>,
    options: r.options.map((o) => ({ key: o, label: o, greek: true })),
    answer: r.to,
    explain: <p>{r.why}{examples.length > 0 && <> {examples.map((v, i) => <span key={v.id}>{i > 0 && ', '}{verbExample(v)}</span>)}.</>}</p>,
    review: <><span className="greek">{r.from} + σ → {r.to}</span></>,
  }
}

/** Replace the letter a rule produced (ψ in βλεψ, η in ἀγαπησ), keeping its accent. */
function swapRuleLetter(stem: string, vowel: boolean, letter: string) {
  const d = stem.normalize('NFD')
  let i = d.length - (vowel ? 2 : 1)
  while (i > 0 && /[\u0300-\u036f]/.test(d[i])) i--
  return (d.slice(0, i) + letter + d.slice(i + 1)).normalize('NFC')
}

const LIQUID = 'Liquid stems (λ, μ, ν, ρ) take εσ: the σ drops out between vowels and the ε contracts with the ending, so the future looks like ποιέω: μενῶ, μενεῖς.'

/** Is there a future to form from the rules? Stops, contract vowels, and liquids. */
export const hasFutureForm = (v: PresentVerb) => !!v.liquid || !!ruleFor(v)

/**
 * βλέπω → βλέψω, among βλέξω, βλέσω, βλέπσω; μένω → μενῶ, among μένσω, μενήσω, μένω. Only for verbs whose future stem
 * shows a rule.
 */
export function futureFormQuestion(ch: Chapter, v: PresentVerb): ChoiceQuestion {
  const answer = presentDisplay(v, '1s')
  let forms: string[]
  let why: string
  if (v.liquid) {
    forms = [answer, `${accentLastVowel(v.stem)}σω`, `${unaccented(v.stem)}ήσω`, v.lemma]
    why = LIQUID
  } else {
    const r = ruleFor(v)!
    const vowel = r.to.length === 2
    const ending = plainEndingsOf(v)['1s']
    const wrong = r.options.filter((o) => o !== r.to).map((o) => (vowel ? swapRuleLetter(v.stem, true, o[0]) : `${v.stem.slice(0, -1)}${o}`) + ending)
    forms = [answer, ...wrong, ...(vowel ? [v.lemma] : [])]
    why = r.why
  }
  return {
    id: futureFormItemId(ch.number, v),
    prompt: <><span className="greek big">{v.lemma}</span><p className="muted">Future, 1st singular?</p></>,
    options: shuffle([...new Set(forms)]).map((f) => ({ key: f, label: f, greek: true })),
    answer,
    explain: <><p>{why}</p>{explainForm(v, '1s')}</>,
    review: <>{verbExample(v)}</>,
  }
}

export const rootItemId = (ch: number, r: RootItem) => `ch${ch}:root:${r.lemma}`
export const augmentItemId = (ch: number, r: RootItem) => `ch${ch}:augment:${r.lemma}`
export const redupItemId = (ch: number, r: RootItem) => `ch${ch}:redup:${r.lemma}`

/** λύω → λέλυκα. */
export function redupQuestion(ch: Chapter, r: RootItem): ChoiceQuestion {
  return ruleChoice(redupItemId(ch.number, r), r, 'Perfect, 1st singular?', '')
}

/** ἀποστέλλω → *στελ. */
export function rootQuestion(ch: Chapter, r: RootItem): ChoiceQuestion {
  return ruleChoice(rootItemId(ch.number, r), r, 'What is its verbal root?', '*')
}

/** ἀκούω → ἤκουον; α- → η. */
export function augmentQuestion(ch: Chapter, r: RootItem): ChoiceQuestion {
  return ruleChoice(augmentItemId(ch.number, r), r, 'Imperfect, 1st singular?', '')
}

function ruleChoice(id: string, r: RootItem, ask: string, mark: string): ChoiceQuestion {
  return {
    id,
    prompt: <><span className="greek big">{r.lemma}</span><p className="muted">{r.ask ?? ask}</p></>,
    options: shuffle(r.options).map((o) => ({ key: o, label: `${mark}${o}`, greek: true })),
    answer: r.options[0],
    explain: <p>{r.how}</p>,
    review: <><span className="greek">{r.lemma}: {mark}{r.options[0]}</span></>,
  }
}

/** λύσουσιν → λύω: undo the σ to find the lexical form. */
export function futureLexicalQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  const others = distinctLemmas(verbsOf(ch).filter((o) => o.lemma !== v.lemma)).slice(0, 3)
  return {
    id: futureLexicalItemId(ch.number, v, slot),
    prompt: <><span className="greek big">{presentForms(v, slot).at(-1)}</span><p className="muted">What is its lexical form?</p></>,
    options: shuffle([v, ...others]).map((o) => ({ key: o.id, label: <><span className="greek">{o.lemma}</span> <span className="muted">“{lexicalGloss(o)}”</span></> })),
    answer: v.id,
    explain: explainForm(v, slot),
    review: <><span className="greek">{presentDisplay(v, slot)}</span> is from <span className="greek">{v.lemma}</span></>,
  }
}

export type TenseKey = 'present' | 'future' | 'imperfect' | 'aorist' | 'perfect'
/** The two tenses a verb is contrasted in: present and future or imperfect, or imperfect and aorist. */
const tensesOf = (v: PresentVerb): TenseKey[] =>
  v.tense === 'perfect' ? ['aorist', 'perfect'] : v.passiveForm ? ['aorist', 'future'] : v.tense === 'aorist' ? ['imperfect', 'aorist'] : ['present', v.tense ?? 'future']
const hasTense = (v: PresentVerb, t: TenseKey) =>
  t === v.tense || (t === 'present' ? !!v.present : t === 'imperfect' ? !!v.imperfect : t === 'future' ? !!v.futurePassive : t === 'aorist' && !!v.aorist)

/** The same verb in the present or the future. */
export const inTense = (v: PresentVerb, tense: TenseKey): PresentVerb =>
  tense === v.tense ? v
    : tense === 'imperfect' ? {
      ...v, tense: 'imperfect', irregular: undefined, past: undefined,
      stem: v.imperfect!.stem, prefix: v.imperfect!.prefix, contract: v.imperfect!.contract, voice: v.imperfect!.voice,
    }
    : tense === 'aorist' && v.aorist ? {
      ...v, tense: 'aorist', stem: v.aorist.stem, prefix: v.aorist.prefix, firstAorist: v.aorist.firstAorist, passiveForm: v.aorist.passiveForm,
      liquid: v.aorist.liquid, irregular: v.aorist.irregular, voice: v.aorist.voice ?? v.voice, from: undefined,
    }
    : tense === 'future' && v.futurePassive ? {
      ...v, tense: 'future', stem: v.futurePassive.stem, prefix: undefined, from: undefined, irregular: undefined, voice: v.voice ?? 'middle',
    }
    : tense !== 'present' ? v : {
    ...v, tense: undefined, from: undefined, irregular: undefined, liquid: undefined, change: undefined, prefix: undefined,
    stem: v.present!.stem, contract: v.present!.contract, voice: v.present!.voice,
  }

export const tenseItemId = (ch: number, v: PresentVerb, slot: PersonSlot, tense: TenseKey) => `ch${ch}:future-tense:${v.id}:${slot}:${tense}`

export const askTense = (v: PresentVerb, slot: PersonSlot, tense: TenseKey) =>
  tensesOf(v).every((t) => hasTense(v, t)) && oneParse((t) => inTense(v, t), tensesOf(v), slot, tense)

export const tensePairs = (ch: Chapter) =>
  verbsOf(ch).flatMap((v) => SLOTS.flatMap((slot) => tensesOf(v).filter((tense) => askTense(v, slot, tense)).map((tense) => ({ v, slot, tense }))))

/** λύει or λύσει? λύει or ἔλυε? */
export function tenseQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, tense: TenseKey): ChoiceQuestion {
  const [first, second] = tensesOf(v)
  const other = tense === first ? second : first
  return contrastQuestion(
    tenseItemId(ch.number, v, slot, tense),
    { key: tense, label: tense, v: inTense(v, tense) },
    { key: other, label: other, v: inTense(v, other) },
    slot, `${first[0].toUpperCase()}${first.slice(1)} or ${second}, and which person?`,
  )
}

// --- Subjunctive (chapter 31) ---

export type MoodKey = 'indicative' | 'subjunctive'
const MOODS = ['indicative', 'subjunctive'] as const

/** The indicative a subjunctive is mistaken for: the present (λύει / λύῃ), or for a first aorist the future (λύσει / λύσῃ). */
export const inMood = (v: PresentVerb, mood: MoodKey): PresentVerb =>
  mood === 'subjunctive' ? v : { ...v, mood: undefined, firstAorist: undefined, tense: v.tense === 'aorist' ? 'future' : v.tense }

const moodLabel = (v: PresentVerb, mood: MoodKey) =>
  mood === 'subjunctive' ? `${tenseName(v)} subjunctive` : `${v.tense === 'aorist' ? 'future' : 'present'} indicative`

/** Only present and first aorist (not liquid) subjunctives have a look-alike indicative, and only forms with one parse. */
const canContrast = (v: PresentVerb) =>
  v.mood === 'subjunctive' && !v.passiveForm && !v.irregular && !v.liquid && !v.contract && (!v.tense || !!v.firstAorist)

export const askMood = (v: PresentVerb, slot: PersonSlot, mood: MoodKey) => canContrast(v) && oneParse((m) => inMood(v, m), MOODS, slot, mood)
export const moodPairs = (ch: Chapter) =>
  verbsOf(ch).flatMap((v) => SLOTS.flatMap((slot) => MOODS.filter((mood) => askMood(v, slot, mood)).map((mood) => ({ v, slot, mood }))))
export const moodItemId = (ch: number, v: PresentVerb, slot: PersonSlot, mood: MoodKey) => `ch${ch}:mood:${v.id}:${slot}:${mood}`

/** λύῃ or λύει? λύσῃ or λύσει? */
export function moodQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, mood: MoodKey): ChoiceQuestion {
  const other: MoodKey = mood === 'subjunctive' ? 'indicative' : 'subjunctive'
  return contrastQuestion(
    moodItemId(ch.number, v, slot, mood),
    { key: mood, label: moodLabel(v, mood), v: inMood(v, mood) },
    { key: other, label: moodLabel(v, other), v: inMood(v, other) },
    slot, 'Indicative or subjunctive, and which person?',
  )
}

export const SUBJUNCTIVE_USES: Record<SubjunctiveUse, { label: string; explain: string }> = {
  purpose: { label: 'After ἵνα: purpose, “so that …”', explain: 'ἵνα takes the subjunctive: “so that …, in order that ….” After verbs of asking or commanding it gives the content: “that ….”' },
  condition: { label: 'After ἐάν: a condition, “if …”', explain: 'ἐάν (εἰ + ἄν) takes the subjunctive for a condition that may or may not happen: “if ….”' },
  hortatory: { label: 'Hortatory: “let us …”', explain: 'A 1st person plural subjunctive on its own urges the speaker and hearers: “let us ….”' },
  deliberative: { label: 'Deliberative: a real question, “should we …?”', explain: 'A subjunctive in a question asks what to do: “what should we do?”' },
  emphatic: { label: 'οὐ μή: “never, certainly not”', explain: 'οὐ μή with an aorist subjunctive is the strongest negation: “will never ….”' },
  indefinite: { label: 'After ὃς ἄν, ὅταν: “whoever …, whenever …”', explain: 'A relative (or ὅταν, “when-ever”) with ἄν makes an indefinite clause with the subjunctive: “whoever …, whenever ….”' },
}

export const subjUseItemId = (ch: number, v: PresentVerse) => `ch${ch}:subj-use:${v.id}`

/** Why is the highlighted verb subjunctive? */
export function subjUseQuestion(ch: Chapter, v: PresentVerse): ChoiceQuestion {
  const use = v.use!
  return {
    id: subjUseItemId(ch.number, v),
    prompt: <>{highlighted(v)}<p className="muted">Why is the highlighted verb subjunctive?</p></>,
    options: shuffle((Object.keys(SUBJUNCTIVE_USES) as SubjunctiveUse[]).map((u) => ({ key: u, label: SUBJUNCTIVE_USES[u].label }))),
    answer: use,
    explain: <><p>{SUBJUNCTIVE_USES[use].explain}</p>{explainVerse(ch, v)}</>,
    review: <><span className="greek">{v.word}</span> ({v.ref}): {SUBJUNCTIVE_USES[use].label}</>,
  }
}

// --- μι verbs (chapter 34) ---

export const tenseVoiceLabel = (v: PresentVerb) => `${tenseName(v)} ${voiceName(v)}`
const sameLemma = (ch: Chapter, v: PresentVerb) => verbsOf(ch).filter((o) => o.lemma === v.lemma)

/** A form of a verb drilled in several tenses, spelled like no form of its other tenses. */
export const askWhichTense = (ch: Chapter, v: PresentVerb, slot: PersonSlot) => {
  const others = sameLemma(ch, v).filter((o) => o !== v)
  const form = presentDisplay(v, slot)
  return others.length >= 3 && others.every((o) => SLOTS.every((s) => presentDisplay(o, s) !== form))
}
export const whichTensePairs = (ch: Chapter) => verbsOf(ch).flatMap((v) => SLOTS.filter((s) => askWhichTense(ch, v, s)).map((slot) => ({ v, slot })))
export const whichTenseItemId = (ch: number, v: PresentVerb, slot: PersonSlot) => `ch${ch}:which-tense:${v.id}:${slot}`

/** δίδωσι, ἐδίδου, δώσει, ἔδωκεν, δέδωκεν: which tense and voice? */
export function whichTenseQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  const answer = tenseVoiceLabel(v)
  const others = shuffle([...new Set(sameLemma(ch, v).map(tenseVoiceLabel))].filter((l) => l !== answer)).slice(0, 3)
  return {
    id: whichTenseItemId(ch.number, v, slot),
    prompt: <><span className="greek big">{presentDisplay(v, slot)}</span><p className="muted">from <span className="greek">{v.lemma}</span> — which tense and voice?</p></>,
    options: shuffle([answer, ...others]).map((l) => ({ key: l, label: l })),
    answer,
    explain: explainForm(v, slot),
    review: <><span className="greek">{presentDisplay(v, slot)}</span> = {answer} {SLOT_LABEL[slot]}</>,
  }
}

/** A form that no drilled verb with another lemma shares, for “which verb?”. */
export const askWhichVerb = (ch: Chapter, v: PresentVerb, slot: PersonSlot) => {
  const form = presentDisplay(v, slot)
  return verbsOf(ch).filter((o) => o.lemma !== v.lemma).every((o) => SLOTS.every((s) => presentDisplay(o, s) !== form))
}
export const whichVerbPairs = (ch: Chapter) => verbsOf(ch).flatMap((v) => SLOTS.filter((s) => askWhichVerb(ch, v, s)).map((slot) => ({ v, slot })))
export const whichVerbItemId = (ch: number, v: PresentVerb, slot: PersonSlot) => `ch${ch}:which-verb:${v.id}:${slot}`

/** ἔθηκεν, ἔστησεν, ἔδειξεν, ἀφῆκεν: which μι verb is it from? */
export function whichVerbQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot): ChoiceQuestion {
  const lemmas = [...new Set(verbsOf(ch).map((o) => o.lemma))].filter((l) => l !== v.lemma)
  const options = shuffle([v.lemma, ...shuffle(lemmas).slice(0, 3)])
  return {
    id: whichVerbItemId(ch.number, v, slot),
    prompt: <><span className="greek big">{presentDisplay(v, slot)}</span><p className="muted">Which verb is it from?</p></>,
    options: options.map((l) => ({ key: l, label: l, greek: true })),
    answer: v.lemma,
    explain: explainForm(v, slot),
    review: <><span className="greek">{presentDisplay(v, slot)}</span> is from <span className="greek">{v.lemma}</span></>,
  }
}

// --- Second aorist (chapter 22) ---

export const aoristFormItemId = (ch: number, v: PresentVerb) => `ch${ch}:aorist-form:${v.id}`

/** λαμβάνω → ἔλαβον, among its imperfect (ἐλάμβανον) and other verbs' aorists: the stem has to be known. */
export function aoristFormQuestion(ch: Chapter, v: PresentVerb): ChoiceQuestion {
  const answer = presentDisplay(v, '1s')
  const imperfect = v.imperfect ? [presentDisplay(inTense(v, 'imperfect'), '1s')] : []
  const others = distinctLemmas(verbsOf(ch).filter((o) => o.lemma !== v.lemma)).map((o) => presentDisplay(o, '1s'))
  const aorist = v.tense === 'perfect' && v.aorist ? [presentDisplay(inTense(v, 'aorist'), '1s')] : []
  const forms = [...new Set([answer, ...imperfect, ...aorist, ...(v.future1s ? [v.future1s] : []), ...(v.alt1s ?? []), ...others])].slice(0, 4)
  return {
    id: aoristFormItemId(ch.number, v),
    prompt: (
      <>
        <span className="greek big">{v.lemma}</span>
        <p className="muted">{tenseName(v)[0].toUpperCase()}{tenseName(v).slice(1)}{v.passiveForm ? ' passive' : v.tense === 'perfect' && v.voice ? ' middle/passive' : ''}, 1st singular?</p>
      </>
    ),
    options: shuffle(forms).map((f) => ({ key: f, label: f, greek: true })),
    answer,
    explain: (
      <>
        {explainForm(v, '1s')}
        {imperfect.length > 0 && <p className="muted">The imperfect, <span className="greek">{imperfect[0]}</span>, is built on the present stem.</p>}
      </>
    ),
    review: <><span className="greek">{v.lemma} → {answer}</span></>,
  }
}

// --- Aorist and future passive (chapter 24) ---

const PLABIAL = 'Labials (π, β) become φ before θ: φθ.'
const PVELAR = 'Velars (κ, γ) become χ before θ: χθ.'
const PDENTAL = 'Dentals (τ, δ, θ) and ζ become σ before θ: σθ.'
const PLENGTHEN = 'A contract vowel lengthens before θη: α and ε → η, ο → ω.'

/** What θ does to the end of a stem in the aorist and future passive. */
export const PASSIVE_RULES: FutureRule[] = [
  // φ, χ and θ are already aspirated, so φθ, χθ and σθ (from θ) need no rule of their own.
  ...['π', 'β'].map((from) => ({ from, to: 'φθ', options: ['φθ', 'χθ', 'σθ', `${from}θ`], why: PLABIAL })),
  ...['κ', 'γ'].map((from) => ({ from, to: 'χθ', options: ['χθ', 'φθ', 'σθ', `${from}θ`], why: PVELAR })),
  ...['τ', 'δ', 'ζ'].map((from) => ({ from, to: 'σθ', options: ['σθ', 'φθ', 'χθ', `${from}θ`], why: PDENTAL })),
  { from: 'α', to: 'ηθ', options: ['ηθ', 'ωθ', 'αθ'], why: PLENGTHEN },
  { from: 'ε', to: 'ηθ', options: ['ηθ', 'ωθ', 'εθ'], why: PLENGTHEN },
  { from: 'ο', to: 'ωθ', options: ['ωθ', 'ηθ', 'οθ'], why: PLENGTHEN },
]

export function passiveRuleFor(v: PresentVerb): FutureRule | undefined {
  return v.from ? PASSIVE_RULES.find((r) => r.from === baseLetters(v.from!).at(-1)) : undefined
}

export const passiveRuleItemId = (ch: number, r: FutureRule) => `ch${ch}:passive-rule:${r.from}`

/** π + θ → ? */
export function passiveRuleQuestion(ch: Chapter, r: FutureRule): ChoiceQuestion {
  const examples = verbsOf(ch).filter((v) => passiveRuleFor(v) === r)
  return {
    id: passiveRuleItemId(ch.number, r),
    prompt: <><span className="greek big">{r.from} + θ</span><p className="muted">What does it become in the aorist passive?</p></>,
    options: r.options.map((o) => ({ key: o, label: o, greek: true })),
    answer: r.to,
    explain: <p>{r.why}{examples.length > 0 && <> {examples.map((v, i) => <span key={v.id}>{i > 0 && ', '}{verbExample(v)}</span>)}.</>}</p>,
    review: <><span className="greek">{r.from} + θ → {r.to}</span></>,
  }
}

import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, ContractVowel, Paradigm, PersonSlot, PresentVerb, PresentVerse } from '../data/types'
import { shuffle } from './progress'

// Questions for chapters 16–18: the present indicative. Every form is generated from the verb's stem,
// so λύω's endings carry over to ἀκούω, βλέπω and the rest; chapter 17 contracts them, chapter 18 adds the middle/passive.

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

export const voiceName = (v: PresentVerb) => (v.voice ? 'middle/passive' : 'active')

/** The ending as memorised, before any contraction: ω, εις… or ομαι, ῃ… (μαι, σαι… for δύναμαι). */
export const plainEndingsOf = (v: PresentVerb) => (!v.voice ? ENDINGS : v.athematic ? MP_PRIMARY : MP_ENDINGS)
const endingVowelOf = (v: PresentVerb) => (v.voice ? MP_ENDING_VOWEL : ENDING_VOWEL)

export const endingsOf = (v: PresentVerb) =>
  v.contract ? (v.voice ? CONTRACT_MP_ENDINGS : CONTRACT_ENDINGS)[v.contract] : plainEndingsOf(v)

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
  return e.endsWith('(ν)') ? [stem + e.slice(0, -3), `${stem + e.slice(0, -3)}ν`] : [stem + e]
}

export const presentDisplay = (v: PresentVerb, slot: PersonSlot) => formParts(v, slot).join('')

const BE: Record<PersonSlot, string> = { '1s': 'am', '2s': 'are', '3s': 'is', '1p': 'are', '2p': 'are', '3p': 'are' }

export const presentEnglish = (v: PresentVerb, slot: PersonSlot) =>
  v.voice === 'passive' ? `${PRONOUN[slot]} ${BE[slot]} ${v.pp}` : `${PRONOUN[slot]} ${slot === '3s' ? v.en3 : v.en}`

/** The verb's present chart, in the shape the chart drill expects. */
export function presentParadigm(v: PresentVerb): Paradigm {
  return {
    id: `present-${v.id}`,
    title: `${v.lemma}: present ${voiceName(v)} indicative`,
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
export const presentVerb = (ch: Chapter, id: string) => verbsOf(ch).find((v) => v.id === id)!

/** λύ + ομεν, or for a contract verb ποιε + ομεν (ε + ο → ου). */
const breakdown = (v: PresentVerb, slot: PersonSlot) => {
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
      <span className="greek">{presentDisplay(v, slot)}</span> = {breakdown(v, slot)}: {SLOT_NAME[slot]}{v.voice && ' middle/passive'} of{' '}
      <span className="greek">{v.lemma}</span>, “{presentEnglish(v, slot)}.”
    </p>
  )
}

/** Two other persons of the same verb and the same person of another verb: the mistakes worth practising. */
function distractors(ch: Chapter, v: PresentVerb, slot: PersonSlot): { v: PresentVerb; slot: PersonSlot }[] {
  const sameVerb = shuffle(SLOTS.filter((s) => s !== slot)).slice(0, 2).map((s) => ({ v, slot: s }))
  const other = shuffle(verbsOf(ch).filter((o) => o !== v))[0]
  return other ? [...sameVerb, { v: other, slot }] : shuffle(SLOTS.filter((s) => s !== slot)).slice(0, 3).map((s) => ({ v, slot: s }))
}

const key = (x: { v: PresentVerb; slot: PersonSlot }) => `${x.v.id}:${x.slot}`

/** Form → person and number. */
export function presentIdentifyQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, form = presentForms(v, slot)[0]): ChoiceQuestion {
  return {
    id: presentItemId(ch.number, v, slot, 'identify'),
    prompt: <><span className="greek big">{form}</span><p className="muted">Person and number?</p></>,
    options: GRID_ORDER.map((s) => ({ key: s, label: <>{SLOT_LABEL[s]} <span className="muted">-{endingsOf(v)[s]}</span></> })),
    answer: slot,
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

function explainVerse(ch: Chapter, v: PresentVerse) {
  const verb = presentVerb(ch, v.verb)
  return (
    <>
      <p>
        <span className="greek">{v.word}</span> = {breakdown(verb, v.slot)}: {SLOT_NAME[v.slot]}, present {voiceName(verb)} indicative
        of <span className="greek">{verb.lemma}</span>.
        {verb.voice === 'middle' && <> <span className="greek">{verb.lemma}</span> is middle-only: middle/passive endings, active meaning.</>}
      </p>
      <p className="english">“{v.translation}”</p>
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
  const others = shuffle(verbsOf(ch).filter((o) => o !== verb)).slice(0, 3)
  return {
    id: presentVerseId(ch.number, v, 'lexical'),
    prompt: <>{highlighted(v)}<p className="muted">What is the lexical form of the highlighted verb?</p></>,
    options: shuffle([verb, ...others]).map((o) => ({ key: o.id, label: <><span className="greek">{o.lemma}</span> <span className="muted">“I {o.en}”</span></> })),
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
export function askVoice(v: PresentVerb, slot: PersonSlot, voice: VoiceKey): boolean {
  if (v.voice !== 'passive') return false
  const form = presentDisplay(inVoice(v, voice), slot)
  return (['active', 'mp'] as const).every((vo) => SLOTS.every((s) => (vo === voice && s === slot) || presentDisplay(inVoice(v, vo), s) !== form))
}

export const voicePairs = (ch: Chapter) =>
  verbsOf(ch).flatMap((v) => SLOTS.flatMap((slot) => (['active', 'mp'] as const).filter((voice) => askVoice(v, slot, voice)).map((voice) => ({ v, slot, voice }))))

/** λύῃ → middle/passive 2nd sg, with λύει (active 3rd sg) among the options: the trap in this chapter. */
export function voiceQuestion(ch: Chapter, v: PresentVerb, slot: PersonSlot, voice: VoiceKey): ChoiceQuestion {
  const other: VoiceKey = voice === 'active' ? 'mp' : 'active'
  const alt: PersonSlot = slot === '2s' ? '3s' : slot === '3s' ? '2s' : shuffle(SLOTS.filter((s) => s !== slot))[0]
  const options = shuffle([{ voice, slot }, { voice: other, slot }, { voice, slot: alt }, { voice: other, slot: alt }])
  const shown = inVoice(v, voice)
  return {
    id: voiceItemId(ch.number, v, slot, voice),
    prompt: <><span className="greek big">{presentForms(shown, slot).at(-1)}</span><p className="muted">Active or middle/passive, and which person?</p></>,
    options: options.map((o) => ({ key: `${o.voice}:${o.slot}`, label: `${VOICE_LABEL[o.voice]} · ${SLOT_LABEL[o.slot]}` })),
    answer: `${voice}:${slot}`,
    explain: (
      <>
        {explainForm(shown, slot)}
        <p className="muted">
          The {VOICE_LABEL[other]} is <span className="greek">{presentDisplay(inVoice(v, other), slot)}</span>, “{presentEnglish(inVoice(v, other), slot)}.”
        </p>
      </>
    ),
    review: <><span className="greek">{presentDisplay(shown, slot)}</span> = {VOICE_LABEL[voice]} {SLOT_LABEL[slot]}, “{presentEnglish(shown, slot)}”</>,
  }
}

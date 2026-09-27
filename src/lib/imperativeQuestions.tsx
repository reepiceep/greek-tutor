import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, ImperativeKind, ImperativeSlot, ImperativeVerb, ImperativeVerse } from '../data/types'
import { shuffle } from './progress'

// Questions for chapter 33: the imperative. Forms are the stem + ending with a recessive accent; the 2nd singulars
// must be learned (ε, ου, σον, σαι, θητι), the rest follow the pattern τω, τε, τωσαν.

export const IMP_SLOTS: ImperativeSlot[] = ['2s', '3s', '2p', '3p']
export const IMP_KINDS: ImperativeKind[] = ['pres-act', 'pres-mp', 'aor-act', 'aor-mid', 'aor-pass']

export const IMP_SLOT_LABEL: Record<ImperativeSlot, string> = { '2s': '2nd sg', '3s': '3rd sg', '2p': '2nd pl', '3p': '3rd pl' }
export const IMP_KIND_LABEL: Record<ImperativeKind, string> = {
  'pres-act': 'pres act', 'pres-mp': 'pres mid/pass', 'aor-act': 'aor act', 'aor-mid': 'aor mid', 'aor-pass': 'aor pass',
}

const ENDINGS: Record<ImperativeKind | 'aor-act-2' | 'aor-mid-2', Record<ImperativeSlot, string>> = {
  'pres-act': { '2s': 'ε', '3s': 'ετω', '2p': 'ετε', '3p': 'ετωσαν' },
  'pres-mp': { '2s': 'ου', '3s': 'εσθω', '2p': 'εσθε', '3p': 'εσθωσαν' },
  'aor-act': { '2s': 'ον', '3s': 'ατω', '2p': 'ατε', '3p': 'ατωσαν' },
  'aor-mid': { '2s': 'αι', '3s': 'ασθω', '2p': 'ασθε', '3p': 'ασθωσαν' },
  'aor-pass': { '2s': 'ητι', '3s': 'ητω', '2p': 'ητε', '3p': 'ητωσαν' },
  // Second aorists take the present's endings on the aorist stem; the middle 2nd singular is accented οῦ (γενοῦ).
  'aor-act-2': { '2s': 'ε', '3s': 'ετω', '2p': 'ετε', '3p': 'ετωσαν' },
  'aor-mid-2': { '2s': 'οῦ', '3s': 'εσθω', '2p': 'εσθε', '3p': 'εσθωσαν' },
}

const DIPHTHONGS = new Set(['αι', 'ει', 'οι', 'υι', 'αυ', 'ευ', 'ου', 'ηυ'])
const MARKS = /[̀-ͯ]/
const unaccented = (w: string) => w.normalize('NFD').replace(/[̀́͂]/g, '').normalize('NFC')

/**
 * The recessive accent: as far back as the ultima allows, with a circumflex on a long penult before a short ultima.
 * Final -αι counts as short. `longAt` marks a nucleus (the stem's last vowel) as long though written α, ι or υ.
 */
function recessive(word: string, longAt?: number): string {
  const letters: { ch: string; marks: string }[] = []
  for (const c of unaccented(word).normalize('NFD')) {
    if (MARKS.test(c) && letters.length) letters[letters.length - 1].marks += c
    else letters.push({ ch: c, marks: '' })
  }
  const nuclei: { at: number; long: boolean }[] = []
  for (let k = 0; k < letters.length; k++) {
    if (!'αεηιουω'.includes(letters[k].ch)) continue
    const next = letters[k + 1]
    if (next && DIPHTHONGS.has(letters[k].ch + next.ch)) {
      nuclei.push({ at: k + 1, long: true })
      k++
    } else nuclei.push({ at: k, long: 'ηω'.includes(letters[k].ch) || letters[k].marks.includes('ͅ') })
  }
  if (longAt !== undefined && nuclei[longAt]) nuclei[longAt].long = true
  const n = nuclei.length
  const ultimaLong = nuclei[n - 1].long && !/αι$/.test(letters.map((l) => l.ch).join(''))
  const t = n === 1 ? 0 : ultimaLong ? n - 2 : Math.max(0, n - 3)
  const circumflex = (n === 1 && nuclei[0].long) || (t === n - 2 && nuclei[t].long && !ultimaLong)
  letters[nuclei[t].at].marks += circumflex ? '͂' : '́'
  return letters.map((l) => l.ch + l.marks).join('').normalize('NFC')
}

const nucleusCount = (w: string) => (w.normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(/αι|ει|οι|υι|αυ|ευ|ου|ηυ|[αεηιουω]/g) ?? []).length

/** The verb's imperative of one kind and person. */
export function imperative(v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot): string {
  const odd = v.irregular?.[kind]?.[slot]
  if (odd) return odd
  const stem = kind.startsWith('pres') ? v.present! : kind === 'aor-pass' ? v.passive! : v.aorist!
  const table = kind === 'aor-act' && v.second ? ENDINGS['aor-act-2'] : kind === 'aor-mid' && v.second ? ENDINGS['aor-mid-2'] : ENDINGS[kind]
  const ending = table[slot]
  if (/[́͂]/.test(ending.normalize('NFD'))) return unaccented(stem) + ending
  const longAt = v.long && kind !== 'aor-pass' ? nucleusCount(stem) - 1 : undefined
  return recessive(stem + ending, longAt)
}

/** “loose!”, “let him loose,” “be loosed!”, or a middle-only verb's active meaning. */
export function imperativeEnglish(v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot) {
  const passive = kind === 'aor-pass' || (kind === 'pres-mp' && !v.middleOnly && !!v.pp)
  const verb = passive ? `be ${v.pp ?? v.en}` : v.en
  const who = slot === '2p' ? ' (you all)' : ''
  return slot.startsWith('2') ? `${verb}!${who}` : `let ${slot === '3s' ? 'him/her' : 'them'} ${verb}`
}

export const imperativeLabel = (kind: ImperativeKind, slot: ImperativeSlot) => `${IMP_KIND_LABEL[kind]} impv ${IMP_SLOT_LABEL[slot]}`
const key = (kind: ImperativeKind, slot: ImperativeSlot) => `${kind}:${slot}`

export const imperativeItemId = (ch: number, v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot, skill: 'parse' | 'build') =>
  `ch${ch}:impv-${skill}:${v.id}:${kind}:${slot}`

/** Every verb, kind and person the chapter drills. */
export const imperativeTriples = (ch: Chapter) =>
  (ch.imperatives?.verbs ?? []).flatMap((v) => v.kinds.flatMap((kind) => IMP_SLOTS.map((slot) => ({ v, kind, slot }))))

/** Every parsing of a verb that gives this form. */
const parsingsOf = (v: ImperativeVerb, form: string) =>
  v.kinds.flatMap((k) => IMP_SLOTS.filter((s) => imperative(v, k, s) === form).map((s) => ({ kind: k, slot: s })))

function explainForm(v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot) {
  const form = imperative(v, kind, slot)
  return (
    <>
      <p>
        <span className="greek">{form}</span> is the {imperativeLabel(kind, slot).replace('impv', 'imperative')} of <span className="greek">{v.lemma}</span>:
        {' '}“{imperativeEnglish(v, kind, slot)}.”
      </p>
      {v.irregular?.[kind]?.[slot]
        ? <p>This form has to be learned.</p>
        : slot === '2s' && <p>The 2nd singular endings must be learned: ε, ου, σον, σαι, θητι.</p>}
      {kind.startsWith('aor') && <p>No augment: only the indicative has one.</p>}
      {kind === 'aor-mid' && slot === '2s' && !v.second && <p><span className="greek">{form}</span> also looks like the aorist active infinitive; context decides.</p>}
      {kind === 'pres-act' && slot === '2p' && <p>The same form is the present indicative, “you loose”; context decides.</p>}
    </>
  )
}

/** See an imperative, name its tense, voice and person. */
export function imperativeParseQuestion(ch: Chapter, v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot): ChoiceQuestion {
  const form = imperative(v, kind, slot)
  const valid = new Set(parsingsOf(v, form).map((p) => key(p.kind, p.slot)))
  const sameKind = shuffle(IMP_SLOTS.filter((s) => !valid.has(key(kind, s)))).slice(0, 2).map((s) => ({ kind, slot: s }))
  const otherKind = shuffle(IMP_KINDS.filter((k) => k !== kind && !valid.has(key(k, slot))))
    .sort((a, b) => Number(v.kinds.includes(b)) - Number(v.kinds.includes(a)))
    .slice(0, 1).map((k) => ({ kind: k, slot }))
  const options = [{ kind, slot }, ...sameKind, ...otherKind]
  return {
    id: imperativeItemId(ch.number, v, kind, slot, 'parse'),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{v.lemma}</span> — parse it</p></>,
    options: shuffle(options).map((o) => ({ key: key(o.kind, o.slot), label: imperativeLabel(o.kind, o.slot) })),
    answer: key(kind, slot),
    explain: explainForm(v, kind, slot),
    review: <><span className="greek">{form}</span> = {imperativeLabel(kind, slot)}</>,
  }
}

/** Given a parsing, choose the form among the verb's other imperatives. */
export function imperativeBuildQuestion(ch: Chapter, v: ImperativeVerb, kind: ImperativeKind, slot: ImperativeSlot): ChoiceQuestion {
  const correct = imperative(v, kind, slot)
  const sameKind = IMP_SLOTS.filter((s) => s !== slot).map((s) => imperative(v, kind, s))
  const otherKinds = v.kinds.filter((k) => k !== kind).map((k) => imperative(v, k, slot))
  const wrong = [...new Set([...shuffle(sameKind).slice(0, 2), ...shuffle(otherKinds), ...shuffle(sameKind)])].filter((f) => f !== correct).slice(0, 3)
  return {
    id: imperativeItemId(ch.number, v, kind, slot, 'build'),
    prompt: <><p className="sentence">{imperativeLabel(kind, slot)}</p><p className="muted">of <span className="greek">{v.lemma}</span>, “{imperativeEnglish(v, kind, slot)}” — which form?</p></>,
    options: shuffle([correct, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: correct,
    explain: explainForm(v, kind, slot),
    review: <>{imperativeLabel(kind, slot)} of <span className="greek">{v.lemma}</span> = <span className="greek">{correct}</span></>,
  }
}

function highlighted(v: ImperativeVerse) {
  const at = v.text.indexOf(v.word)
  return (
    <>
      <p className="sentence greek">{v.text.slice(0, at)}<mark>{v.word}</mark>{v.text.slice(at + v.word.length)}</p>
      <p className="muted small">{v.ref}{v.help && <> · <span className="greek">{v.help}</span></>}</p>
    </>
  )
}

function verseExplain(v: ImperativeVerse) {
  return (
    <>
      <p>
        <span className="greek">{v.word}</span> is {v.prohibition === 'subjunctive'
          ? <>an {IMP_KIND_LABEL[v.kind]} subjunctive, {IMP_SLOT_LABEL[v.slot]},</>
          : <>the {imperativeLabel(v.kind, v.slot).replace('impv', 'imperative')}</>} of <span className="greek">{v.lemma}</span>.
      </p>
      <p className="english">“{v.translation}”</p>
      {v.note && <p>{v.note}</p>}
    </>
  )
}

export const imperativeVerseId = (ch: number, v: ImperativeVerse, skill: 'parse' | 'translate' | 'prohibition') => `ch${ch}:impv-verse:${v.id}:${skill}`

/** Verses with μή, for the prohibition drill. */
export const prohibitionVerses = (ch: Chapter) => (ch.imperatives?.verses ?? []).filter((v) => v.prohibition)

/** The translation question only exists for verses with wrong translations written. */
export const translatableImperatives = (ch: Chapter) => (ch.imperatives?.verses ?? []).filter((v) => v.wrong?.length)

/** Imperatives (not the subjunctive prohibitions) to parse in verses. */
export const parsableVerses = (ch: Chapter) => (ch.imperatives?.verses ?? []).filter((v) => v.prohibition !== 'subjunctive')

export function imperativeVerseParseQuestion(ch: Chapter, v: ImperativeVerse): ChoiceQuestion {
  const sameKind = shuffle(IMP_SLOTS.filter((s) => s !== v.slot)).slice(0, 2).map((s) => ({ kind: v.kind, slot: s }))
  const otherKind = shuffle(IMP_KINDS.filter((k) => k !== v.kind)).slice(0, 1).map((k) => ({ kind: k, slot: v.slot }))
  return {
    id: imperativeVerseId(ch.number, v, 'parse'),
    prompt: <>{highlighted(v)}<p className="muted">Parse the highlighted imperative</p></>,
    options: shuffle([{ kind: v.kind, slot: v.slot }, ...sameKind, ...otherKind]).map((o) => ({ key: key(o.kind, o.slot), label: imperativeLabel(o.kind, o.slot) })),
    answer: key(v.kind, v.slot),
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}) = {imperativeLabel(v.kind, v.slot)}</>,
  }
}

export function imperativeVerseTranslateQuestion(ch: Chapter, v: ImperativeVerse): ChoiceQuestion {
  return {
    id: imperativeVerseId(ch.number, v, 'translate'),
    prompt: <>{highlighted(v)}<p className="muted">Which translation fits?</p></>,
    options: shuffle([v.translation, ...(v.wrong ?? [])]).map((t) => ({ key: t, label: t })),
    answer: v.translation,
    explain: verseExplain(v),
    review: <><span className="greek">{v.word}</span> ({v.ref}): “{v.translation}”</>,
  }
}

const PROHIBITION_OPTIONS = [
  { key: 'imperative', label: <>μή + present imperative — often “stop …, don’t keep on …”</> },
  { key: 'subjunctive', label: <>μή + aorist subjunctive — “don’t …” (don’t start, not even once)</> },
]

/** Which kind of prohibition is this? */
export function prohibitionQuestion(ch: Chapter, v: ImperativeVerse): ChoiceQuestion {
  return {
    id: imperativeVerseId(ch.number, v, 'prohibition'),
    prompt: <>{highlighted(v)}<p className="muted">What kind of prohibition is it?</p></>,
    options: PROHIBITION_OPTIONS,
    answer: v.prohibition!,
    explain: (
      <>
        <p>
          {v.prohibition === 'imperative'
            ? 'A present imperative with μή forbids an action as ongoing; it often means “stop doing what you are doing.”'
            : 'An aorist subjunctive with μή forbids the action as a whole; the aorist imperative is not used with μή in the 2nd person.'}
          {' '}This is a tendency, not a rule: context decides.
        </p>
        {verseExplain(v)}
      </>
    ),
    review: <><span className="greek">μὴ {v.word}</span> ({v.ref}): {v.prohibition === 'imperative' ? 'present imperative' : 'aorist subjunctive'}</>,
  }
}

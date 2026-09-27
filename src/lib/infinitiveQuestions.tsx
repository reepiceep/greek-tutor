import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, InfinitiveItem, InfinitiveKind, InfinitiveUse, InfinitiveVerb } from '../data/types'
import { shuffle } from './progress'
import { type UsageConfig, usageItemId, usageQuestion, usageTranslateQuestion } from './usageQuestions'

// Questions for chapter 32: the infinitive. Every form is generated from the verb's stems: ειν and εσθαι on the
// present stem, σαι and σασθαι on the first aorist (λῦσαι), εῖν and έσθαι on the second aorist (λαβεῖν, γενέσθαι),
// ῆναι on the aorist passive, έναι and σθαι on the perfect.

export const KINDS: InfinitiveKind[] = ['pres-act', 'pres-mp', 'aor-act', 'aor-mid', 'aor-pass', 'perf-act', 'perf-mp']

export const KIND_LABEL: Record<InfinitiveKind, string> = {
  'pres-act': 'pres act inf', 'pres-mp': 'pres mid/pass inf', 'aor-act': 'aor act inf', 'aor-mid': 'aor mid inf',
  'aor-pass': 'aor pass inf', 'perf-act': 'perf act inf', 'perf-mp': 'perf mid/pass inf',
}

/** The ending as Mounce teaches it, for the explanation. */
export const KIND_ENDING: Record<InfinitiveKind, string> = {
  'pres-act': 'ειν', 'pres-mp': 'εσθαι', 'aor-act': 'σαι (second aorist εῖν)', 'aor-mid': 'σασθαι (second aorist έσθαι)',
  'aor-pass': 'θῆναι', 'perf-act': 'κέναι', 'perf-mp': 'σθαι',
}

const CONTRACT_ACT = { α: 'ᾶν', ε: 'εῖν', ο: 'οῦν' } as const
const CONTRACT_MP = { α: 'ᾶσθαι', ε: 'εῖσθαι', ο: 'οῦσθαι' } as const

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

/** λύσ → λῦσ before the short -αι of the aorist: a long accented penult before a short ultima takes a circumflex. */
function circumflexIfLong(stem: string, long?: boolean) {
  const d = stem.normalize('NFD')
  const at = d.indexOf(ACUTE)
  if (at < 0) return stem
  const letters = d.slice(0, at).replace(/[̀-ͯ]/g, '')
  const isLong = long || 'ηω'.includes(letters.at(-1)!) || DIPHTHONGS.has(letters.slice(-2))
  return isLong ? (d.slice(0, at) + '͂' + d.slice(at + 1)).normalize('NFC') : stem
}

/** The verb's infinitive of one kind. */
export function infinitive(v: InfinitiveVerb, kind: InfinitiveKind): string {
  const odd = v.irregular?.[kind]
  if (odd) return odd
  switch (kind) {
    case 'pres-act': return v.contract ? v.present! + CONTRACT_ACT[v.contract] : `${v.present}ειν`
    case 'pres-mp': return v.contract ? v.present! + CONTRACT_MP[v.contract] : `${v.present}εσθαι`
    case 'aor-act': return v.second ? `${unaccented(v.aorist!)}εῖν` : `${circumflexIfLong(v.aorist!, v.long)}αι`
    case 'aor-mid': return v.second ? `${unaccented(v.aorist!)}έσθαι` : `${v.aorist}ασθαι`
    case 'aor-pass': return `${unaccented(v.passive!)}ῆναι`
    case 'perf-act': return `${unaccented(v.perfect!)}έναι`
    case 'perf-mp': return `${accentLastVowel(v.perfectMp!)}σθαι`
  }
}

/** “to loose,” “to be loosed,” or a middle-only verb's active meaning. */
export function infinitiveEnglish(v: InfinitiveVerb, kind: InfinitiveKind) {
  const passive = kind === 'aor-pass' || ((kind === 'pres-mp' || kind === 'perf-mp') && !v.middleOnly)
  const perfect = kind.startsWith('perf')
  if (passive && v.pp) return `to ${perfect ? 'have been' : 'be'} ${v.pp}`
  if (kind === 'aor-mid' && !v.middleOnly) return `to ${v.en} (for oneself)`
  return `to ${perfect ? `have ${v.pp ?? v.en}` : v.en}`
}

export const infinitiveItemId = (ch: number, v: InfinitiveVerb, kind: InfinitiveKind, skill: 'parse' | 'build') => `ch${ch}:inf-${skill}:${v.id}:${kind}`

function explainForm(v: InfinitiveVerb, kind: InfinitiveKind) {
  const form = infinitive(v, kind)
  return (
    <>
      <p>
        <span className="greek">{form}</span> is the {KIND_LABEL[kind].replace('inf', 'infinitive')} of <span className="greek">{v.lemma}</span>,
        {' '}“{infinitiveEnglish(v, kind)}.” {v.irregular?.[kind] ? 'It has to be learned.' : <>The ending: <span className="greek">{KIND_ENDING[kind]}</span>.</>}
      </p>
      {kind.startsWith('aor') && <p>No augment: the aorist infinitive is built on the unaugmented stem.</p>}
      {v.middleOnly && kind !== 'aor-pass' && <p>Middle in form, active in meaning.</p>}
    </>
  )
}

/** See an infinitive, name its tense and voice. */
export function infinitiveParseQuestion(ch: Chapter, v: InfinitiveVerb, kind: InfinitiveKind): ChoiceQuestion {
  const form = infinitive(v, kind)
  const same = KINDS.filter((k) => k !== kind && v.kinds.includes(k) && infinitive(v, k) === form)
  const wrong = shuffle(KINDS.filter((k) => k !== kind && !same.includes(k)))
    .sort((a, b) => Number(v.kinds.includes(b)) - Number(v.kinds.includes(a)))
    .slice(0, 3)
  return {
    id: infinitiveItemId(ch.number, v, kind, 'parse'),
    prompt: <><span className="greek big">{form}</span><p className="muted">from <span className="greek">{v.lemma}</span> — parse it</p></>,
    options: shuffle([kind, ...wrong]).map((k) => ({ key: k, label: KIND_LABEL[k] })),
    answer: kind,
    explain: explainForm(v, kind),
    review: <><span className="greek">{form}</span> = {KIND_LABEL[kind]} of <span className="greek">{v.lemma}</span></>,
  }
}

/** Given a tense and voice, choose the infinitive: the verb's other infinitives are the wrong answers. */
export function infinitiveBuildQuestion(ch: Chapter, v: InfinitiveVerb, kind: InfinitiveKind): ChoiceQuestion {
  const correct = infinitive(v, kind)
  const own = v.kinds.filter((k) => k !== kind).map((k) => infinitive(v, k))
  const others = (ch.infinitives?.verbs ?? []).filter((o) => o.id !== v.id && o.kinds.includes(kind)).map((o) => infinitive(o, kind))
  const wrong = [...new Set([...shuffle(own), ...shuffle(others)])].filter((f) => f !== correct).slice(0, 3)
  return {
    id: infinitiveItemId(ch.number, v, kind, 'build'),
    prompt: <><p className="sentence">{KIND_LABEL[kind]}</p><p className="muted">of <span className="greek">{v.lemma}</span> — which form?</p></>,
    options: shuffle([correct, ...wrong]).map((f) => ({ key: f, label: f, greek: true })),
    answer: correct,
    explain: explainForm(v, kind),
    review: <>{KIND_LABEL[kind]} of <span className="greek">{v.lemma}</span> = <span className="greek">{correct}</span></>,
  }
}

/** Every verb and kind the chapter drills. */
export const infinitivePairs = (ch: Chapter) => (ch.infinitives?.verbs ?? []).flatMap((v) => v.kinds.map((kind) => ({ v, kind })))

export const INFINITIVE_USES: Record<InfinitiveUse, { label: string; explain: string }> = {
  complementary: {
    label: 'Complementary — it completes a verb like δύναμαι, θέλω, μέλλω, ἄρχομαι, δεῖ',
    explain: 'Some verbs need an infinitive to finish their thought: δύναται σῶσαι, “he is able to save”; ἤρξατο λέγειν, “he began to say.”',
  },
  purpose: {
    label: 'Purpose — “to …, in order to …” (alone, or after τοῦ, εἰς τό, πρὸς τό)',
    explain: 'An infinitive can give the purpose of the main verb: ἦλθον πληρῶσαι, “I came to fulfill”; also τοῦ + infinitive and εἰς τό or πρὸς τό + infinitive.',
  },
  result: {
    label: 'Result — after ὥστε, “so that …”',
    explain: 'ὥστε + infinitive gives the result: “so that ….” Its subject, if it has one, is accusative.',
  },
  time: {
    label: 'Time — ἐν τῷ “while,” πρὸ τοῦ “before,” μετὰ τό “after”',
    explain: 'With the article and a preposition, the infinitive gives the time: ἐν τῷ (usually present) “while,” πρὸ τοῦ “before,” μετὰ τό (usually aorist) “after.”',
  },
  cause: {
    label: 'Cause — διὰ τό, “because …”',
    explain: 'διὰ τό + infinitive gives the reason: “because ….”',
  },
  substantival: {
    label: 'Substantival — with τό, it is a noun (“to live,” “living”)',
    explain: 'With the article and no preposition, the infinitive is a noun, the subject or object of the verb: τὸ ζῆν, “to live, living.”',
  },
}

const INFINITIVES: UsageConfig<InfinitiveUse> = {
  prefix: 'inf-use',
  ask: 'How is the highlighted infinitive used?',
  rules: INFINITIVE_USES,
  traps: [],
}

export const infinitiveUseId = (ch: number, it: InfinitiveItem, skill: 'use' | 'translate') => usageItemId(ch, INFINITIVES.prefix, it, skill)
export const infinitiveUseQuestion = (ch: Chapter, it: InfinitiveItem) => usageQuestion(ch, INFINITIVES, it)
export const infinitiveTranslateQuestion = (ch: Chapter, it: InfinitiveItem) => usageTranslateQuestion(ch, INFINITIVES, it)
export const infinitiveVerseParseId = (ch: number, it: InfinitiveItem) => `ch${ch}:inf-verse:${it.id}`

/** Parse the highlighted infinitive in a verse. */
export function infinitiveVerseParseQuestion(ch: Chapter, it: InfinitiveItem): ChoiceQuestion {
  const at = it.text.indexOf(it.word)
  const wrong = shuffle(KINDS.filter((k) => k !== it.kind)).slice(0, 3)
  return {
    id: infinitiveVerseParseId(ch.number, it),
    prompt: (
      <>
        <p className="sentence greek">{it.text.slice(0, at)}<mark>{it.word}</mark>{it.text.slice(at + it.word.length)}</p>
        <p className="muted small">{it.ref}{it.help && <> · <span className="greek">{it.help}</span></>}</p>
        <p className="muted">Parse the highlighted infinitive</p>
      </>
    ),
    options: shuffle([it.kind, ...wrong]).map((k) => ({ key: k, label: KIND_LABEL[k] })),
    answer: it.kind,
    explain: (
      <>
        <p><span className="greek">{it.word}</span> is the {KIND_LABEL[it.kind].replace('inf', 'infinitive')} of <span className="greek">{it.lemma}</span>.</p>
        <p className="english">“{it.translation}”</p>
        {it.note && <p>{it.note}</p>}
      </>
    ),
    review: <><span className="greek">{it.word}</span> ({it.ref}) = {KIND_LABEL[it.kind]}</>,
  }
}

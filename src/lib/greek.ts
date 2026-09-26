// Greek text utilities: normalization, answer checking, and transliterated typing.

const APOSTROPHES = /[᾽᾿’ʼ']/g
const COMBINING = /[̀-ͯ]/g

export const BREATHING = { smooth: '̓', rough: '̔' } as const
export const ACCENT = { acute: '́', grave: '̀', circumflex: '͂' } as const
export const IOTA_SUBSCRIPT = 'ͅ'
export const ELISION_MARK = '᾽' // ᾽

/** Normalize Greek for comparison. With `accents: false`, breathings, accents and iota subscripts are ignored. */
export function normalizeGreek(s: string, accents: boolean): string {
  let out = s.replace(APOSTROPHES, "'").normalize('NFD').toLowerCase().replace(/ς/g, 'σ')
  if (!accents) out = out.replace(COMBINING, '')
  return out.replace(/\s+/g, ' ').trim().normalize('NFC')
}

/** Is `input` one of the accepted Greek forms? For lexical entries, only the part before the first comma counts. */
export function checkGreek(input: string, accepted: string[], accents: boolean): boolean {
  const given = normalizeGreek(input.split(',')[0], accents)
  return given !== '' && accepted.some((f) => normalizeGreek(f, accents) === given)
}

function normalizeEnglish(s: string): string {
  return s
    .toLowerCase()
    .replace(/[()."!?]/g, '')
    .replace(/^(the|a|an) /, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Every comma/semicolon-separated part of `input` must match an accepted gloss. */
export function checkEnglish(input: string, accept: string[]): boolean {
  const parts = input.split(/[,;]/).map(normalizeEnglish).filter(Boolean)
  const ok = new Set(accept.map(normalizeEnglish))
  return parts.length > 0 && parts.every((p) => ok.has(p))
}

// --- Transliterated typing ---------------------------------------------------
// Latin letters become Greek (SBL/BibleWorks-style), and Beta-code-style keys
// add diacritics to the previous letter:  )  smooth   (  rough   /  acute
// \  grave   =  circumflex   |  iota subscript   '  elision mark

const LETTERS: Record<string, string> = {
  a: 'α', b: 'β', g: 'γ', d: 'δ', e: 'ε', z: 'ζ', h: 'η', q: 'θ', i: 'ι', k: 'κ', l: 'λ', m: 'μ',
  n: 'ν', c: 'ξ', o: 'ο', p: 'π', r: 'ρ', s: 'σ', t: 'τ', u: 'υ', f: 'φ', x: 'χ', y: 'ψ', w: 'ω',
  v: 'ς', j: 'ς',
}

const MARK_KEYS: Record<string, string> = {
  ')': BREATHING.smooth, '(': BREATHING.rough,
  '/': ACCENT.acute, '\\': ACCENT.grave, '=': ACCENT.circumflex,
  '|': IOTA_SUBSCRIPT,
}

const BREATHINGS = Object.values(BREATHING) as string[]
const ACCENTS = Object.values(ACCENT) as string[]

/** Add (or toggle off) a combining mark on a single Greek letter, keeping canonical mark order. */
export function applyMark(letter: string, mark: string): string {
  const [base, ...marks] = [...letter.normalize('NFD')]
  if (!/[α-ωΑ-Ω]/.test(base)) return letter
  let breathing = marks.find((m) => BREATHINGS.includes(m)) ?? ''
  let accent = marks.find((m) => ACCENTS.includes(m)) ?? ''
  let iota = marks.includes(IOTA_SUBSCRIPT) ? IOTA_SUBSCRIPT : ''
  const other = marks.filter((m) => !BREATHINGS.includes(m) && !ACCENTS.includes(m) && m !== IOTA_SUBSCRIPT)
  if (BREATHINGS.includes(mark)) breathing = breathing === mark ? '' : mark
  else if (ACCENTS.includes(mark)) accent = accent === mark ? '' : mark
  else if (mark === IOTA_SUBSCRIPT) iota = iota ? '' : mark
  // Breathing precedes accent (both combining class 230), so this order composes correctly.
  return (base + other.join('') + breathing + accent + iota).normalize('NFC')
}

/** Apply `mark` to the last Greek letter of `text`. */
export function markLastLetter(text: string, mark: string): string {
  const chars = [...text]
  for (let i = chars.length - 1; i >= 0; i--) {
    if (/\p{L}/u.test(chars[i])) {
      chars[i] = applyMark(chars[i], mark)
      return chars.join('')
    }
  }
  return text
}

/** σ at the end of a word becomes ς, and ς inside a word (typing continued past it) becomes σ. */
export function fixFinalSigma(text: string): string {
  return text.replace(/ς(?=\p{L})/gu, 'σ').replace(/σ(?=$|[\s,.;·'᾽])/g, 'ς')
}

/** Convert a whole input value typed with transliteration keys into Greek. Idempotent on Greek text. */
export function transliterate(text: string): string {
  let out = ''
  for (const ch of text) {
    const lower = ch.toLowerCase()
    if (LETTERS[lower]) out += ch === lower ? LETTERS[lower] : LETTERS[lower].toUpperCase()
    else if (MARK_KEYS[ch]) out = markLastLetter(out, MARK_KEYS[ch])
    else if (ch === "'") out += ELISION_MARK
    else out += ch
  }
  return fixFinalSigma(out.normalize('NFC'))
}

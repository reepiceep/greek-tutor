import { describe, expect, it } from 'vitest'
import { applyMark, BREATHING, ACCENT, checkEnglish, checkGreek, normalizeGreek, transliterate } from './greek'

describe('normalizeGreek', () => {
  it('ignores accents and breathings when lenient', () => {
    expect(normalizeGreek('ἡμέρα', false)).toBe(normalizeGreek('ημερα', false))
  })
  it('keeps accents when strict', () => {
    expect(normalizeGreek('ἡμέρα', true)).not.toBe(normalizeGreek('ημερα', true))
  })
  it('treats final sigma and apostrophe variants alike', () => {
    expect(normalizeGreek('πρός', true)).toBe(normalizeGreek('πρόσ', true))
    expect(normalizeGreek("μετ'", true)).toBe(normalizeGreek('μετ᾽', true))
  })
})

describe('checkGreek', () => {
  it('accepts any listed form', () => {
    expect(checkGreek('ἐστίν', ['ἐστί', 'ἐστίν'], true)).toBe(true)
  })
  it('uses only the lemma of a lexical entry', () => {
    expect(checkGreek('ἡμέρα, -ας, ἡ', ['ἡμέρα'], true)).toBe(true)
  })
  it('rejects wrong accent in strict mode only', () => {
    expect(checkGreek('ἡμερά', ['ἡμέρα'], true)).toBe(false)
    expect(checkGreek('ἡμερά', ['ἡμέρα'], false)).toBe(true)
  })
  it('rejects empty input', () => {
    expect(checkGreek('  ', ['ἡμέρα'], false)).toBe(false)
  })
})

describe('checkEnglish', () => {
  it('accepts one or several correct glosses', () => {
    expect(checkEnglish('House', ['house', 'home'])).toBe(true)
    expect(checkEnglish('house, home', ['house', 'home'])).toBe(true)
    expect(checkEnglish('the sea', ['sea', 'lake'])).toBe(true)
  })
  it('rejects if any part is wrong', () => {
    expect(checkEnglish('house, dog', ['house', 'home'])).toBe(false)
  })
})

describe('transliterate', () => {
  it('maps letters and final sigma', () => {
    expect(transliterate('qanatos')).toBe('θανατος')
  })
  it('applies diacritic keys in any order', () => {
    expect(transliterate('h(me/ra')).toBe('ἡμέρα')
    expect(transliterate('ei)mi/')).toBe('εἰμί')
    expect(applyMark(applyMark('α', ACCENT.acute), BREATHING.smooth)).toBe('ἄ')
  })
  it('handles letter-by-letter typing past a final sigma', () => {
    let v = ''
    for (const k of 'qanatos kai') v = transliterate(v + k)
    expect(v).toBe('θανατος και')
    expect(transliterate('θανατοςα')).toBe('θανατοσα')
  })
  it('is idempotent on Greek', () => {
    expect(transliterate('ἡμέρα')).toBe('ἡμέρα')
  })
  it("turns ' into the elision mark", () => {
    expect(transliterate("met'")).toBe('μετ᾽')
  })
})

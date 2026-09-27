import { describe, expect, it } from 'vitest'
import { READINGS } from '../data/readings'
import type { ReadingWord } from '../data/types'
import { courseWord, describeParse, gloss, grammarChapter, isName, passageStats } from './reader'

const word = (id: string, verse: number, text: string): ReadingWord => {
  const w = READINGS.find((r) => r.id === id)!.verses.find((v) => v.n === verse)!.words.find((x) => x[0].startsWith(text))
  if (!w) throw new Error(`${text} not in ${id} ${verse}`)
  return w
}

describe('reader', () => {
  it('has the passages, each verse in order and every word with a lemma and parse code', () => {
    expect(READINGS.length).toBeGreaterThanOrEqual(10)
    for (const r of READINGS) {
      r.verses.forEach((v, i) => i > 0 && expect(v.n).toBe(r.verses[i - 1].n + 1))
      for (const w of r.verses.flatMap((v) => v.words)) {
        expect(w[1]).toBeTruthy()
        expect(w[3]).toHaveLength(8)
      }
    }
  })

  it('every word has a gloss', () => {
    const missing = READINGS.flatMap((r) => r.verses.flatMap((v) => v.words)).filter((w) => !gloss(w[1]))
    expect(missing.map((w) => w[1])).toEqual([])
  })

  it('John 1:1 reads as the SBLGNT has it', () => {
    const v1 = READINGS.find((r) => r.id === 'jn1')!.verses[0].words.map((w) => w[0]).join(' ')
    expect(v1).toBe('Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.')
  })

  it('describes parsings in plain English', () => {
    const en = word('jn1', 1, 'ἦν')
    expect(describeParse(en[2], en[3])).toBe('imperfect active indicative, 3rd person singular')
    const archē = word('jn1', 1, 'ἀρχῇ')
    expect(describeParse(archē[2], archē[3])).toBe('dative singular feminine')
    // John 3:16 ὁ πιστεύων: a present active participle.
    const pisteuōn = word('jn3', 16, 'πιστεύων')
    expect(describeParse(pisteuōn[2], pisteuōn[3])).toBe('present active participle, nominative singular masculine')
    const kai = word('jn1', 1, 'καὶ')
    expect(describeParse(kai[2], kai[3])).toBe('')
  })

  it('finds the chapter each form is taught in', () => {
    expect(grammarChapter(word('jn1', 1, 'ἦν'))).toBe(21)
    expect(grammarChapter(word('jn1', 1, 'ἀρχῇ'))).toBe(7)
    // φῶς, φωτός: third declension, chapter 10, whatever the case.
    expect(grammarChapter(word('jn1', 4, 'φῶς'))).toBe(10)
    expect(grammarChapter(word('jn3', 16, 'πιστεύων'))).toBe(27)
    // Lord's Prayer: ἁγιασθήτω, an aorist passive imperative.
    expect(grammarChapter(word('mt6', 9, 'ἁγιασθήτω'))).toBe(33)
    // Mark 1:8 ἐβάπτισα: aorist; the μι-verb rule doesn't apply.
    expect(grammarChapter(word('mk1', 8, 'ἐβάπτισα'))).toBe(23)
  })

  it('knows course vocabulary and names', () => {
    expect(courseWord('λόγος')!.chapter).toBe(4)
    expect(gloss('λόγος')).toBe(courseWord('λόγος')!.word.gloss)
    expect(isName(word('jn1', 6, 'Ἰωάννης'))).toBe(true)
    expect(isName(word('jn1', 1, 'λόγος'))).toBe(false)
  })

  it('passage stats: grammar level, and more words known further into the course', () => {
    const jn1 = READINGS.find((r) => r.id === 'jn1')!
    const early = passageStats(jn1, 8)
    const late = passageStats(jn1, 36)
    expect(late.grammar).toBeGreaterThanOrEqual(21)
    expect(late.known).toBeGreaterThan(early.known)
    expect(late.known).toBeLessThanOrEqual(late.words)
    expect(late.forms).toBe(late.total)
    expect(early.forms).toBeLessThan(early.total)
    expect(late.readable).toBeGreaterThan(early.readable)
  })
})

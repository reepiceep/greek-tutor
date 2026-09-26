import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import { adjParseQuestion, distinctForms, parsingsOf, slotLabel } from '../lib/declensionQuestions'
import {
  relativeAntecedentQuestion, relativeCaseQuestion, relativeFormQuestion, relativeTranslateQuestion,
} from '../lib/relativeQuestions'
import { chapter14 as ch } from './chapter14'

const rl = ch.relative!
const acute = (w: string) => w.normalize('NFD').replace(/̀/g, '́').normalize('NFC')
const REASON_CASE = { subject: ['nominative'], object: ['accusative'], possession: ['genitive'], indirect: ['dative'], preposition: ['genitive', 'dative', 'accusative'] }

describe('chapter 14 data', () => {
  it('has the 18 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(18)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(18)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('each item’s gender, number and case is a real parsing of its relative form', () => {
    for (const r of rl.items) {
      const slots = parsingsOf(rl.paradigm, acute(r.word))
      expect(slots.some((s) => s.gender === r.gender && s.number === r.number && s.case === r.case), r.id).toBe(true)
    }
  })

  it('each case reason matches the case, and the words are all in the text', () => {
    for (const r of rl.items) {
      expect(REASON_CASE[r.reason], r.id).toContain(r.case)
      for (const w of [r.word, r.antecedent, ...r.others]) expect(r.text, `${r.id}: ${w}`).toContain(w)
      expect(r.others, r.id).not.toContain(r.antecedent)
      expect(r.others.length, r.id).toBeGreaterThanOrEqual(2)
      expect(r.wrong, r.id).not.toContain(r.english)
    }
  })

  it('forms marked “relative” are forms of ὅς and the others are not', () => {
    const relForms = new Set(distinctForms(rl.paradigm))
    for (const f of rl.forms) expect(relForms.has(f.form), f.form).toBe(f.kind === 'relative')
  })

  it('questions are well-formed', () => {
    for (const r of rl.items) {
      for (const q of [relativeAntecedentQuestion(ch, r), relativeCaseQuestion(ch, r), relativeTranslateQuestion(ch, r)]) {
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(keys.length)
        expect(keys.length, q.id).toBeGreaterThanOrEqual(3)
        expect(keys, q.id).toContain(q.answer)
      }
    }
    for (const f of rl.forms) expect(relativeFormQuestion(ch, f).options.map((o) => o.key)).toContain(f.kind)
    for (const p of [rl.paradigm, ...rl.nouns]) {
      for (const form of distinctForms(p)) {
        const valid = new Set(parsingsOf(p, form).map(slotLabel))
        expect(adjParseQuestion(ch, p, form).options.map((o) => o.label as string).filter((l) => valid.has(l)), form).toHaveLength(1)
      }
    }
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (x: string) => qs.filter((q) => q.area === x).length
      expect([count('Vocabulary'), count('Relative forms'), count('Relative clauses'), count('Review')]).toEqual([10, 6, 10, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

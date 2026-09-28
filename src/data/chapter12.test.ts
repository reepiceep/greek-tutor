import { describe, expect, it } from 'vitest'
import {
  AUTOS_SLOTS, autosEnglish, autosProduceQuestion, autosSentenceQuestion, autosTranslateQuestion, autosUseQuestion,
} from '../lib/autosQuestions'
import { buildChapterTest } from '../lib/chapterTest'
import { adjParseQuestion, distinctForms, formAt, parsingsOf, slotLabel } from '../lib/declensionQuestions'
import { chapter12 as ch } from './chapter12'

const au = ch.autos!
const ARTICLES = new Set(['ὁ', 'ἡ', 'τό', 'τὸ', 'τοῦ', 'τῆς', 'τῷ', 'τῇ', 'τόν', 'τὸν', 'τήν', 'τὴν', 'οἱ', 'αἱ', 'τά', 'τὰ', 'τῶν', 'τοῖς', 'ταῖς', 'τούς', 'τοὺς', 'τάς', 'τὰς'])
const POSTPOSITIVES = new Set(['δέ', 'δὲ', 'γάρ', 'γὰρ'])
/** Luke's ἐν αὐτῇ τῇ ὥρᾳ: “that very hour” in predicate position (Mounce §12.12). */
const PREDICATE_SAME = new Set(['luke-13-31'])
const all = [...au.items, ...au.readings]

describe('chapter 12 data', () => {
  it('has the 15 vocabulary words with unique ids', () => {
    expect(ch.vocab).toHaveLength(15)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(15)
  })

  it('items highlight a real form of αὐτός, cover all three uses, and never list the answer as wrong', () => {
    const forms = new Set(distinctForms(au.paradigm).map((f) => f.normalize('NFD').replace(/̀/g, '́').normalize('NFC')))
    expect(new Set(all.map((a) => a.id)).size).toBe(all.length)
    for (const a of all) {
      expect(a.text, a.id).toContain(a.word)
      expect(forms.has(a.word.normalize('NFD').replace(/̀/g, '́').normalize('NFC')), a.id).toBe(true)
      expect(a.wrong, a.id).not.toContain(a.english)
    }
    expect(new Set(au.items.map((a) => a.use))).toEqual(new Set(['pronoun', 'intensive', 'identical']))
  })

  it('an item is “identical” exactly when an article comes right before αὐτός (skipping δέ, γάρ)', () => {
    for (const a of all) {
      const before = a.text.slice(0, a.text.indexOf(a.word)).split(/\s+/).filter(Boolean).filter((w) => !POSTPOSITIVES.has(w))
      expect(ARTICLES.has(before.at(-1) ?? ''), a.id).toBe(a.use === 'identical' && !PREDICATE_SAME.has(a.id))
    }
  })

  it('every reading covers all three uses and has three wrong whole-sentence translations', () => {
    expect(au.readings.length).toBeGreaterThanOrEqual(14)
    expect(new Set(au.readings.map((a) => a.use))).toEqual(new Set(['pronoun', 'intensive', 'identical']))
    for (const a of au.readings) {
      expect(a.ref, a.id).toBeTruthy()
      expect(new Set([a.translation, ...a.sentenceWrong!]).size, a.id).toBe(4)
    }
  })

  it('questions have four distinct options including the answer', () => {
    for (const a of all) {
      for (const q of [autosUseQuestion(ch, a), autosTranslateQuestion(ch, a), ...(a.sentenceWrong ? [autosSentenceQuestion(ch, a)] : [])]) {
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(4)
        expect(keys, q.id).toContain(q.answer)
      }
    }
  })

  it('English → Greek offers four different forms, and only the right one fits the slot', () => {
    expect(AUTOS_SLOTS).toHaveLength(24)
    for (const s of AUTOS_SLOTS) {
      expect(autosEnglish(s)).toBeTruthy()
      for (const kind of ['english', 'desc'] as const) {
        const q = autosProduceQuestion(ch, au.paradigm, s, kind)
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(4)
        expect(q.answer).toBe(formAt(au.paradigm, s))
        expect(keys.filter((k) => k === q.answer), q.id).toHaveLength(1)
      }
    }
  })

  it('parse questions never offer another valid reading as wrong', () => {
    for (const p of [au.paradigm, ...au.nouns]) {
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
      expect([count('Vocabulary'), count('αὐτός forms'), count('αὐτός uses'), count('New nouns'), count('Review')]).toEqual([10, 6, 8, 2, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
      for (const q of qs) expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

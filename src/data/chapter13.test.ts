import { describe, expect, it } from 'vitest'
import { buildChapterTest } from '../lib/chapterTest'
import { adjAgreeQuestion, adjParseQuestion, distinctForms, formAt, parsingsOf, slotLabel } from '../lib/declensionQuestions'
import {
  DEMONSTRATIVE_SLOTS, demonstrativeEnglish, demonstrativeProduceQuestion, demonstrativeSentenceQuestion, demonstrativeTranslateQuestion,
  demonstrativeUseQuestion, lookalikeQuestion, vocativeCaseQuestion, vocativeFormQuestion,
} from '../lib/demonstrativeQuestions'
import { recordingFor } from '../lib/audio'
import { chapter13 as ch } from './chapter13'
import type { Slot } from '../lib/declensionQuestions'

const dm = ch.demonstratives!
const [HOUTOS, EKEINOS] = dm.agreement.paradigms

// Article forms and the case/number/gender slots each can be.
const ARTICLE: Record<string, string[]> = {
  'ὁ': ['nominative-sg-masculine'], 'ἡ': ['nominative-sg-feminine'], 'τό': ['nominative-sg-neuter', 'accusative-sg-neuter'],
  'τοῦ': ['genitive-sg-masculine', 'genitive-sg-neuter'], 'τῆς': ['genitive-sg-feminine'],
  'τῷ': ['dative-sg-masculine', 'dative-sg-neuter'], 'τῇ': ['dative-sg-feminine'],
  'τόν': ['accusative-sg-masculine'], 'τήν': ['accusative-sg-feminine'],
  'οἱ': ['nominative-pl-masculine'], 'αἱ': ['nominative-pl-feminine'], 'τά': ['nominative-pl-neuter', 'accusative-pl-neuter'],
  'τῶν': ['genitive-pl-masculine', 'genitive-pl-feminine', 'genitive-pl-neuter'],
  'τοῖς': ['dative-pl-masculine', 'dative-pl-neuter'], 'ταῖς': ['dative-pl-feminine'],
  'τούς': ['accusative-pl-masculine'], 'τάς': ['accusative-pl-feminine'],
}
const norm = (w: string) => w.replace(/[,.;·]/g, '').normalize('NFD').replace(/̀/g, '́').normalize('NFC').toLowerCase()
const key = (s: Slot) => `${s.case}-${s.number}-${s.gender}`

describe('chapter 13 data', () => {
  it('has the 13 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(13)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('an item is an adjective exactly when an agreeing article is right next to the demonstrative', () => {
    for (const d of [...dm.items, ...dm.readings]) {
      const tokens = d.text.split(/\s+/).map(norm).filter((t) => t !== 'δέ')
      const i = tokens.indexOf(norm(d.word))
      // Match forms without accents: Οὗτός ἐστιν has an extra accent from the enclitic that follows.
      const bare = (w: string) => norm(w).normalize('NFD').replace(/[\u0300\u0301\u0342]/g, '')
      const slots = new Set([HOUTOS, EKEINOS].flatMap((p) => distinctForms(p).filter((f) => bare(f) === bare(d.word)).flatMap((f) => parsingsOf(p, f))).map(key))
      expect(slots.size, d.id).toBeGreaterThan(0)
      // The article right after it (οὗτος ὁ λόγος) or two words before it (ὁ λόγος οὗτος).
      const neighbours = [tokens[i + 1], tokens[i - 2]].filter(Boolean)
      const agrees = neighbours.some((t) => (ARTICLE[t] ?? []).some((s) => slots.has(s)))
      expect(agrees, d.id).toBe(d.use === 'adjective')
    }
  })

  it('items cover both uses and questions have four distinct options including the answer', () => {
    expect(new Set(dm.items.map((d) => d.use))).toEqual(new Set(['pronoun', 'adjective']))
    for (const d of dm.items) {
      expect(d.wrong, d.id).not.toContain(d.english)
      for (const q of [demonstrativeUseQuestion(ch, d), demonstrativeTranslateQuestion(ch, d)]) {
        expect(new Set(q.options.map((o) => o.key)).size, q.id).toBe(4)
        expect(q.options.map((o) => o.key), q.id).toContain(q.answer)
      }
    }
  })

  it('readings have unique ids, cover both uses, and three wrong whole-sentence translations', () => {
    const ids = [...dm.items, ...dm.readings].map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(dm.readings.length).toBeGreaterThanOrEqual(16)
    expect(new Set(dm.readings.map((d) => d.use))).toEqual(new Set(['pronoun', 'adjective']))
    for (const d of dm.readings) {
      expect(d.text, d.id).toContain(d.word)
      expect(d.wrong, d.id).not.toContain(d.english)
      expect(new Set([d.translation, ...d.sentenceWrong!]).size, d.id).toBe(4)
      for (const q of [demonstrativeUseQuestion(ch, d), demonstrativeTranslateQuestion(ch, d), demonstrativeSentenceQuestion(ch, d)]) {
        expect(new Set(q.options.map((o) => o.key)).size, q.id).toBe(4)
      }
    }
  })

  it('English → Greek: a helping word by gender, and only the right form fits', () => {
    expect(demonstrativeEnglish(HOUTOS, { case: 'dative', number: 'sg', gender: 'feminine' })).toBe('to this woman')
    expect(demonstrativeEnglish(EKEINOS, { case: 'genitive', number: 'pl', gender: 'neuter' })).toBe('of those things')
    for (const p of [HOUTOS, EKEINOS]) {
      for (const s of DEMONSTRATIVE_SLOTS) {
        const q = demonstrativeProduceQuestion(ch, p, s, 'english')
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(4)
        expect(q.answer).toBe(formAt(p, s))
        expect(keys.filter((k) => k === q.answer)).toHaveLength(1)
      }
    }
  })

  it('look-alikes and vocatives are well-formed', () => {
    for (const l of dm.lookalikes) {
      expect(l.text, l.id).toContain(l.word)
      expect(l.wrong, l.id).not.toContain(l.answer)
      expect(new Set(lookalikeQuestion(ch, l).options.map((o) => o.key)).size, l.id).toBe(4)
    }
    for (const f of dm.vocative.forms) {
      expect(f.wrong, f.lemma).not.toContain(f.form)
      expect(new Set(vocativeFormQuestion(ch, f).options.map((o) => o.key)).size, f.lemma).toBe(4)
    }
    // Plural vocatives are the same as the nominative plural.
    const plural: Record<string, string> = { ἀδελφός: 'ἀδελφοί', ἀνήρ: 'ἄνδρες', ἀγαπητός: 'ἀγαπητοί' }
    for (const f of dm.vocative.forms.filter((x) => x.number === 'pl')) expect(f.form).toBe(plural[f.lemma])
    const ids = dm.vocative.items.map((v) => v.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const v of dm.vocative.items) {
      expect(v.text, v.id).toContain(v.word)
      expect(vocativeCaseQuestion(ch, v).options.map((o) => o.key), v.id).toContain(v.case)
    }
    expect(dm.vocative.items.filter((v) => v.case === 'vocative').length).toBeGreaterThan(dm.vocative.items.length / 2)
  })

  it('parse and agreement questions are well-formed', () => {
    for (const p of dm.paradigms) {
      for (const form of distinctForms(p)) {
        const valid = new Set(parsingsOf(p, form).map(slotLabel))
        expect(adjParseQuestion(ch, p, form).options.map((o) => o.label as string).filter((l) => valid.has(l)), form).toHaveLength(1)
      }
    }
    for (const p of dm.agreement.paradigms) {
      for (const n of dm.agreement.nouns) expect(new Set(adjAgreeQuestion(ch, p, n).options.map((o) => o.key)).size).toBe(4)
    }
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (x: string) => qs.filter((q) => q.area === x).length
      expect(['Vocabulary', 'Demonstrative forms', 'Demonstratives in use', 'Look-alikes', 'Vocative', 'Agreement', 'Review'].map(count)).toEqual([10, 5, 7, 2, 3, 1, 2])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

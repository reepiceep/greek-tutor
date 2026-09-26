import { describe, expect, it } from 'vitest'
import { buildChapterTest } from '../lib/chapterTest'
import { adjAgreeQuestion, adjParseQuestion, distinctForms, parsingsOf, slotLabel } from '../lib/declensionQuestions'
import { demonstrativeTranslateQuestion, demonstrativeUseQuestion } from '../lib/demonstrativeQuestions'
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
    for (const d of dm.items) {
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
      expect([count('Vocabulary'), count('Demonstrative forms'), count('Demonstratives in use'), count('Agreement'), count('Review')]).toEqual([10, 6, 8, 3, 3])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

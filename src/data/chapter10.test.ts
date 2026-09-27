import { describe, expect, it } from 'vitest'
import {
  MASTER_COLUMNS, MASTER_ROWS, checkEnding, d3ReadingParadigm, d3ReadingQuestion, d3ReadingSkills, masterCellQuestion, masterChart,
} from '../lib/d3ReadingQuestions'
import { adjAgreeQuestion, adjParseQuestion, distinctForms, parsingsOf, slotLabel, slotsOf } from '../lib/declensionQuestions'
import { buildChapterTest } from '../lib/chapterTest'
import { chapter10 as ch } from './chapter10'

const d = ch.thirdDeclension!

describe('chapter 10 data', () => {
  it('has the 14 vocabulary words with unique ids', () => {
    expect(ch.vocab).toHaveLength(14)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(14)
  })

  it('stop and stem items have distinct options with the answer first', () => {
    for (const r of [...d.stops, ...d.stems]) {
      expect(new Set(r.options).size, r.id).toBe(r.options.length)
      expect(r.options.length, r.id).toBeGreaterThanOrEqual(4)
    }
  })

  it('single stops follow the Square of Stops', () => {
    const expected: Record<string, string> = { π: 'ψ', β: 'ψ', φ: 'ψ', κ: 'ξ', γ: 'ξ', χ: 'ξ', τ: 'σ', δ: 'σ', θ: 'σ' }
    for (const r of d.stops.filter((s) => /^. \+ σ$/.test(s.prompt))) expect(r.options[0], r.prompt).toBe(expected[r.prompt[0]])
  })

  it('stems are the genitive minus -ος', () => {
    for (const r of d.stems) {
      const gen = r.prompt.split(', ')[1].normalize('NFD').replace(/[̀-ͯ]/g, '')
      const stem = r.options[0].normalize('NFD').replace(/[̀-ͯ]/g, '')
      // Abbreviated genitives like -ματος only give the ending, so compare endings.
      expect(stem.endsWith(gen.replace(/^-/, '').replace(/ος$/, '')), r.id).toBe(true)
    }
  })

  it('τίς items are accented on the first syllable and τις items are not', () => {
    const firstVowelAcute = (w: string) => /^[^αεηιουω]*[αεηιουω]́/.test(w.toLowerCase().normalize('NFD'))
    for (const t of d.tis) {
      expect(t.text, t.id).toContain(t.word)
      expect(firstVowelAcute(t.word), t.id).toBe(t.kind === 'interrogative')
    }
    expect(new Set(d.tis.map((t) => t.kind))).toEqual(new Set(['interrogative', 'indefinite']))
  })

  it('πᾶς agreement nouns cover every slot exactly once', () => {
    const keys = d.agreement.nouns.map((n) => `${n.case}-${n.number}-${n.gender}`)
    expect(new Set(keys).size).toBe(24)
    for (const n of d.agreement.nouns) expect(new Set(adjAgreeQuestion(ch, d.agreement.paradigm, n).options.map((o) => o.key)).size).toBe(4)
  })

  it('parse questions never offer another valid reading as a wrong answer, even for one-gender nouns and εἷς', () => {
    for (const p of d.paradigms) {
      expect(slotsOf(p).length, p.id).toBeGreaterThanOrEqual(8)
      for (const form of distinctForms(p)) {
        const q = adjParseQuestion(ch, p, form)
        const valid = new Set(parsingsOf(p, form).map(slotLabel))
        expect(q.options.map((o) => o.label as string).filter((l) => valid.has(l)), form).toHaveLength(1)
        expect(q.options, form).toHaveLength(4)
      }
    }
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (a: string) => qs.filter((q) => q.area === a).length
      expect([count('Vocabulary'), count('Third declension'), count('πᾶς, τίς and verses'), count('Review')]).toEqual([10, 10, 6, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
      for (const q of qs) expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

describe('chapter 10 additions', () => {
  const d = ch.thirdDeclension!
  const words = (text: string) => text.split(/[\s,.·;]+/).filter(Boolean)

  it('extra charts match the vocabulary lexical forms', () => {
    const lexical: Record<string, string> = { σῶμα: 'σῶμα, -ματος, τό', πνεῦμα: 'πνεῦμα, -ατος, τό', Σίμων: 'Σίμων, -ωνος, ὁ', τις: 'τις, τι', οὐδείς: 'οὐδείς, οὐδεμία, οὐδέν' }
    for (const p of d.more ?? []) expect(p.lexical, p.lemma).toBe(lexical[p.lemma])
  })

  it('verses parse a word from a known chart, in a slot that form really has', () => {
    const readings = d.readings ?? []
    expect(readings.length).toBeGreaterThanOrEqual(15)
    expect(new Set(readings.map((r) => r.id)).size).toBe(readings.length)
    for (const r of readings) {
      expect(r.text, r.id).toContain(r.word)
      const p = d3ReadingParadigm(ch, r)
      const slots = parsingsOf(p, r.form ?? r.word).map((s) => `${s.case} ${s.number} ${s.gender}`)
      expect(slots, r.id).toContain(`${r.case} ${r.number} ${r.gender}`)
      if (r.head) expect(words(r.text), r.id).toContain(r.head)
      for (const x of r.decoys ?? []) expect(words(r.text), r.id).toContain(x)
      expect(new Set(r.wrong).size, r.id).toBe(3)
      expect(r.wrong, r.id).not.toContain(r.translation)
      for (const skill of d3ReadingSkills(r)) {
        const q = d3ReadingQuestion(ch, r, skill)
        const keys = q.options.map((o) => o.key)
        expect(keys, `${r.id} ${skill}`).toContain(q.answer)
        expect(new Set(keys).size, `${r.id} ${skill}`).toBe(keys.length)
      }
    }
  })

  it('rule items have distinct options with the answer first', () => {
    for (const r of [...(d.forms ?? []), ...(d.pasUses ?? []), ...(d.lookalikes ?? [])]) {
      expect(new Set(r.options).size, r.id).toBe(r.options.length)
      expect(r.options.length, r.id).toBeGreaterThanOrEqual(3)
    }
  })

  it('the master chart checks endings, alternatives and "no ending"', () => {
    expect(checkEnding('σι', ['σι(ν)', 'σι', 'σιν'])).toBe(true)
    expect(checkEnding('α/ν', ['α', 'ν'])).toBe(true)
    expect(checkEnding('-', ['—'])).toBe(true)
    expect(checkEnding('', ['—'])).toBe(false)
    expect(checkEnding('-ος', ['ος'])).toBe(true)
    expect(checkEnding('ες', ['ος'])).toBe(false)
    for (const mode of ['true', 'stem'] as const) {
      for (const { col } of MASTER_COLUMNS) {
        expect(masterChart(mode)[col]).toHaveLength(MASTER_ROWS.length)
        for (const row of MASTER_ROWS) {
          const q = masterCellQuestion(ch, mode, col, row)
          expect(q.options.map((o) => o.key)).toContain(q.answer)
        }
      }
    }
  })
})

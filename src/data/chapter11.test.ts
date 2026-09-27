import { describe, expect, it } from 'vitest'
import { buildChapterTest } from '../lib/chapterTest'
import { adjParseQuestion, distinctForms, parsingsOf, slotLabel } from '../lib/declensionQuestions'
import {
  PRONOUN_SLOTS, pronounMeaningQuestion, pronounParseQuestion, pronounProduceQuestion, pronounStressQuestion, pronounVerseTranslateQuestion, slotForms,
} from '../lib/pronounQuestions'
import { chapter11 as ch } from './chapter11'

const pr = ch.pronouns!

describe('chapter 11 data', () => {
  it('has the 21 vocabulary words with unique ids', () => {
    expect(ch.vocab).toHaveLength(21)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(21)
  })

  it('has a form for all 16 person/number/case slots, and emphatic/enclitic pairs only in the singular oblique cases', () => {
    const slots = new Set(pr.forms.map((f) => `${f.person}-${f.number}-${f.case}`))
    expect(slots.size).toBe(16)
    for (const f of pr.forms) {
      const pair = f.number === 'sg' && f.case !== 'nominative'
      expect(f.emphatic !== undefined, f.form).toBe(pair)
    }
    expect(new Set(pr.forms.map((f) => f.form)).size).toBe(pr.forms.length)
  })

  it('enclitic forms are unaccented and emphatic ones accented', () => {
    const accented = (w: string) => /[́̀͂]/.test(w.normalize('NFD'))
    for (const f of pr.forms.filter((x) => x.emphatic !== undefined)) expect(accented(f.form), f.form).toBe(f.emphatic)
  })

  it('verses highlight a real pronoun form with matching person, number and case', () => {
    const norm = (w: string) => w.normalize('NFD').replace(/[̀́͂]/g, '́').toLowerCase()
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      const match = pr.forms.find((f) => norm(f.form) === norm(v.word))
      expect(match, v.id).toBeTruthy()
      expect([match!.person, match!.number, match!.case], v.id).toEqual([v.person, v.number, v.case])
    }
  })

  it('pronoun questions have four distinct options including the answer', () => {
    for (const f of pr.forms) {
      for (const q of [pronounParseQuestion(ch, f), pronounMeaningQuestion(ch, pr.forms, f)]) {
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(4)
        expect(keys, q.id).toContain(q.answer)
      }
    }
  })

  it('meaning questions for ἡμ- forms offer the ὑμ- counterpart as a distractor', () => {
    const hemon = pr.forms.find((f) => f.form === 'ἡμῶν')!
    expect(pronounMeaningQuestion(ch, pr.forms, hemon).options.map((o) => o.key)).toContain('your (pl), of you')
  })

  it('new noun parse questions never offer another valid reading as wrong', () => {
    for (const p of pr.nouns) {
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
      const count = (a: string) => qs.filter((q) => q.area === a).length
      expect([count('Vocabulary'), count('Pronoun forms'), count('Pronouns in verses'), count('New nouns'), count('Review')]).toEqual([10, 8, 6, 3, 3])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
      for (const q of qs) expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

describe('chapter 11 additions', () => {
  it('produce questions offer four distinct forms, never the same slot’s other form', () => {
    for (const sl of PRONOUN_SLOTS) {
      for (const kind of ['english', 'desc'] as const) {
        const q = pronounProduceQuestion(ch, pr.forms, sl, kind)
        const keys = q.options.map((o) => o.key)
        expect(keys).toHaveLength(4)
        expect(new Set(keys).size).toBe(4)
        expect(keys).toContain(q.answer)
        for (const f of slotForms(pr.forms, sl).slice(1)) expect(keys).not.toContain(f.form)
      }
    }
  })

  it('verses with translations have three distinct wrong ones; stressed pronouns are nominative', () => {
    const long = pr.verses.filter((v) => v.wrong)
    expect(long.length).toBeGreaterThanOrEqual(9)
    for (const v of long) {
      expect(new Set(v.wrong).size, v.id).toBe(3)
      expect(v.wrong, v.id).not.toContain(v.translation)
      expect(pronounVerseTranslateQuestion(ch, v).options.map((o) => o.key)).toContain(v.translation)
    }
    const stressed = pr.verses.filter((v) => v.stress)
    expect(stressed.length).toBeGreaterThanOrEqual(6)
    for (const v of stressed) {
      expect(v.case, v.id).toBe('nominative')
      expect(pronounStressQuestion(ch, v).answer).toBe('emphasis')
    }
  })

  it('the new nouns have lexical forms matching the vocabulary', () => {
    for (const p of pr.nouns) expect(ch.vocab.find((w) => w.lemma === p.lemma)?.lexical, p.lemma).toBe(p.lexical)
  })
})

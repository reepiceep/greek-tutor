import { describe, expect, it } from 'vitest'
import { chapter08 as ch } from './chapter08'
import { normalizeGreek } from '../lib/greek'
import { caseUses, findUse, meaningDistractors, phraseDistractors, phraseTranslation } from '../lib/prepositions'
import { nounPrepForms, nounPrepQuestion, readingQuestion, readingSkills } from '../lib/prepReadingQuestions'
import { PREPOSITIONS } from './prepositions'

describe('chapter 8 data', () => {
  it('has unique ids', () => {
    for (const list of [ch.vocab, ch.phrases ?? [], ch.elisions ?? []]) {
      const ids = list.map((x) => x.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('phrases use a real preposition + case and one of its meanings', () => {
    for (const p of ch.phrases ?? []) {
      const use = findUse(ch, p.prep, p.case)
      expect(use.accept, p.id).toContain(p.meaning)
      expect(normalizeGreek(p.greek, false).startsWith(normalizeGreek(use.word.lemma, false)), p.id).toBe(true)
    }
  })

  it('elision items start with their preposition and have distinct options', () => {
    for (const e of ch.elisions ?? []) {
      expect(new Set(e.options).size, e.id).toBe(e.options.length)
      expect(e.options[0].endsWith(e.next), e.id).toBe(true)
      expect(ch.vocab.find((w) => w.id === e.prep)?.pos, e.id).toBe('preposition')
    }
  })

  it('spatial uses exist', () => {
    for (const s of ch.spatial ?? []) expect(() => findUse(ch, s.prep, s.case)).not.toThrow()
  })
})

describe('distractors', () => {
  it('never include a correct meaning', () => {
    for (const use of caseUses(ch)) {
      for (const d of meaningDistractors(ch, use, 3)) {
        expect(d.gloss).not.toBe(use.gloss)
        expect(use.accept).not.toContain(d.primary)
      }
    }
  })

  it('give three wrong phrase translations', () => {
    for (const p of ch.phrases ?? []) {
      const ds = phraseDistractors(ch, p, 3)
      expect(ds, p.id).toHaveLength(3)
      expect(ds).not.toContain(phraseTranslation(p))
    }
  })
})

describe('verses to read', () => {
  const readings = ch.prepReadings ?? []
  const words = (text: string) => text.split(/[\s,.·;]+/).filter(Boolean)

  it('have unique ids and a phrase inside the text, starting with its preposition', () => {
    expect(readings.length).toBeGreaterThanOrEqual(12)
    expect(new Set(readings.map((r) => r.id)).size).toBe(readings.length)
    for (const r of readings) {
      expect(r.text, r.id).toContain(r.phrase)
      const prep = PREPOSITIONS.find((p) => p.id === r.prep)!
      expect(prep.cases!.map((c) => c.case), r.id).toContain(r.case)
      // Elided (διʼ, μετʼ) and altered (ἐξ) spellings count: compare without the apostrophe.
      const bare = (w: string) => normalizeGreek(w, false).replace(/[ʼ᾽’']/g, '')
      const first = bare(r.phrase.split(' ')[0])
      expect([prep.lemma, ...(prep.forms ?? [])].some((f) => bare(f) === first) || bare(prep.lemma).startsWith(first), r.id).toBe(true)
    }
  })

  it('name an object inside the phrase and a modified word outside it', () => {
    for (const r of readings) {
      expect(words(r.phrase), r.id).toContain(r.object)
      expect(!!r.modifies, r.id).toBe(r.use !== 'substantival')
      if (r.modifies) {
        expect(words(r.text), r.id).toContain(r.modifies)
        expect(words(r.phrase), r.id).not.toContain(r.modifies)
      }
    }
  })

  it('offer decoys from the verse that are neither the object nor the modified word', () => {
    for (const r of readings) {
      expect(r.decoys.length, r.id).toBeGreaterThanOrEqual(2)
      for (const d of r.decoys) {
        expect(words(r.text), `${r.id}: ${d}`).toContain(d)
        expect([r.object, r.modifies], `${r.id}: ${d}`).not.toContain(d)
      }
      if (r.main) for (const v of [r.main.verb, ...r.main.dependent]) expect(words(r.text), r.id).toContain(v)
    }
  })

  it('have three distinct wrong translations', () => {
    for (const r of readings) {
      expect(new Set(r.wrong).size, r.id).toBe(3)
      expect(r.wrong, r.id).not.toContain(r.translation)
    }
  })

  it('build every question with the answer among the options', () => {
    for (const r of readings) {
      for (const skill of readingSkills(r)) {
        const q = readingQuestion(ch, r, skill)
        expect(q.options.map((o) => o.key), `${r.id} ${skill}`).toContain(q.answer)
        expect(new Set(q.options.map((o) => o.key)).size, `${r.id} ${skill}`).toBe(q.options.length)
        expect(q.options.length, `${r.id} ${skill}`).toBeGreaterThanOrEqual(3)
      }
    }
  })
})

describe('noun forms', () => {
  it('pair every one-case, non-nominative form with a preposition taking that case', () => {
    const forms = nounPrepForms(ch)
    expect(forms.length).toBeGreaterThan(20)
    // ἡμέρας is genitive singular or accusative plural, so no single preposition fits.
    expect(forms.some(({ form }) => form === 'ἡμέρας')).toBe(false)
    expect(forms.some(({ form }) => form === 'ὄχλοι')).toBe(false)
    for (const { p, form } of forms) {
      const q = nounPrepQuestion(ch, p, form)
      expect(q.options).toHaveLength(4)
      expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })

  it('are the chapter’s nouns, with matching lexical forms', () => {
    for (const p of ch.nouns ?? []) expect(ch.vocab.find((w) => w.lemma === p.lemma)?.lexical, p.lemma).toBe(p.lexical)
  })
})

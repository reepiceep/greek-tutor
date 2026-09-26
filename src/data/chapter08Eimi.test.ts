import { describe, expect, it } from 'vitest'
import { encliticRuleQuestion, predicateSubjectQuestion, predicateTranslateQuestion } from '../lib/eimiQuestions'
import { chapter08 as ch } from './chapter08'
import { ENCLITIC_FORMS, ENCLITIC_RULES, ENCLITICS, PREDICATES } from './chapter08Eimi'

describe('predicate nominative items', () => {
  it('have unique ids, words that appear in the sentence, and three distinct wrong translations', () => {
    expect(new Set(PREDICATES.map((p) => p.id)).size).toBe(PREDICATES.length)
    for (const p of PREDICATES) {
      expect(p.text, p.id).toContain(p.predicate)
      if (p.rule === 'implied') expect(p.text, p.id).not.toContain(p.subject)
      else expect(p.text, p.id).toContain(p.subject)
      expect(p.wrong.length, p.id).toBeGreaterThanOrEqual(3)
      expect(new Set([p.translation, ...p.wrong]).size, p.id).toBe(p.wrong.length + 1)
    }
  })

  it('cover every subject rule', () => {
    expect(new Set(PREDICATES.map((p) => p.rule))).toEqual(new Set(['pronoun', 'implied', 'article', 'proper']))
  })

  it('build questions with four distinct options including the answer', () => {
    for (const p of PREDICATES) {
      for (const q of [predicateSubjectQuestion(ch, p), predicateTranslateQuestion(ch, p)]) {
        const keys = q.options.map((o) => o.key)
        expect(new Set(keys).size, q.id).toBe(4)
        expect(keys, q.id).toContain(q.answer)
      }
    }
  })
})

describe('enclitic items', () => {
  it('quote the verse, list the verse spelling first, and have distinct options', () => {
    expect(new Set(ENCLITICS.map((e) => e.id)).size).toBe(ENCLITICS.length)
    for (const e of ENCLITICS) {
      expect(e.text, e.id).toContain(e.pair)
      expect(e.options[0].toLowerCase(), e.id).toBe(e.pair.toLowerCase())
      expect(new Set(e.options).size, e.id).toBe(e.options.length)
    }
  })

  it('cover every accent rule, and rule questions offer four different rules', () => {
    expect(new Set(ENCLITICS.map((e) => e.rule))).toEqual(new Set(Object.keys(ENCLITIC_RULES)))
    for (const e of ENCLITICS) expect(new Set(encliticRuleQuestion(ch, e).options.map((o) => o.key)).size).toBe(4)
  })

  it('mark only εἶ and ἦν as not enclitic', () => {
    expect(ENCLITIC_FORMS.filter((f) => !f.enclitic).map((f) => f.form)).toEqual(['εἶ', 'ἦν'])
  })
})

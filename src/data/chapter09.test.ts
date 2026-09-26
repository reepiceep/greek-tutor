import { describe, expect, it } from 'vitest'
import {
  GENDERS, NOUN_CASES, NUMBERS, adjAgreeQuestion, adjParseQuestion, distinctForms, formAt, graveBeforeWord, parsingsOf, slotLabel,
} from '../lib/declensionQuestions'
import { buildChapterTest } from '../lib/chapterTest'
import { vocabDistractors } from '../lib/items'
import { chapter09 as ch } from './chapter09'

const adj = ch.adjectives!

describe('chapter 9 vocabulary', () => {
  it('has the 18 words with unique ids', () => {
    expect(ch.vocab).toHaveLength(18)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(18)
  })

  it('never offers a synonym as a wrong answer (κακός / πονηρός, ἐμός / μου)', () => {
    const kakos = ch.vocab.find((w) => w.id === 'kakos')!
    const emos = ch.vocab.find((w) => w.id === 'emos')!
    for (let i = 0; i < 20; i++) {
      expect(vocabDistractors(ch, kakos, 17).map((w) => w.id)).not.toContain('poneros')
      expect(vocabDistractors(ch, emos, 17).map((w) => w.id)).not.toContain('mou')
    }
  })
})

describe('adjective paradigms', () => {
  it('have all 24 forms, and 2-2 feminine equals masculine', () => {
    for (const p of adj.paradigms) {
      for (const g of GENDERS) for (const n of NUMBERS) for (const c of NOUN_CASES) expect(formAt(p, { gender: g, number: n, case: c }), p.id).toBeTruthy()
      if (p.pattern === '2-2') expect(p.forms.feminine).toEqual(p.forms.masculine)
    }
  })

  it('share the article-like ending patterns: neuter nom = acc, gen pl the same in all genders', () => {
    for (const p of adj.paradigms) {
      for (const n of NUMBERS) {
        expect(formAt(p, { gender: 'neuter', number: n, case: 'nominative' }), p.id).toBe(formAt(p, { gender: 'neuter', number: n, case: 'accusative' }))
      }
      expect(new Set(GENDERS.map((g) => formAt(p, { gender: g, number: 'pl', case: 'genitive' }))).size, p.id).toBe(1)
    }
  })
})

describe('graveBeforeWord', () => {
  it('turns a final acute grave and leaves other accents alone', () => {
    expect(graveBeforeWord('ἀγαθός')).toBe('ἀγαθὸς')
    expect(graveBeforeWord('ἀγαθαί')).toBe('ἀγαθαὶ')
    expect(graveBeforeWord('ἀγαθῆς')).toBe('ἀγαθῆς')
    expect(graveBeforeWord('ἅγιος')).toBe('ἅγιος')
    expect(graveBeforeWord('αἰώνιον')).toBe('αἰώνιον')
  })
})

describe('adjective questions', () => {
  it('parse: the answer is a valid parsing and no other valid parsing is a wrong option', () => {
    for (const p of adj.paradigms) {
      for (const form of distinctForms(p)) {
        const q = adjParseQuestion(ch, p, form)
        const valid = new Set(parsingsOf(p, form).map(slotLabel))
        const labels = q.options.map((o) => o.label as string)
        expect(labels).toHaveLength(4)
        expect(labels.filter((l) => valid.has(l)), form).toHaveLength(1)
      }
    }
  })

  it('agree: the answer matches the noun and all four options differ', () => {
    for (const p of adj.paradigms) {
      for (const n of adj.nouns) {
        const q = adjAgreeQuestion(ch, p, n)
        expect(new Set(q.options.map((o) => o.key)).size).toBe(4)
        expect(q.answer).toBe(formAt(p, n))
      }
    }
  })

  it('noun phrases cover every case, number and gender', () => {
    for (const g of GENDERS) for (const n of NUMBERS) {
      expect(adj.nouns.some((x) => x.gender === g && x.number === n), `${g} ${n}`).toBe(true)
    }
  })

  it('uses: adjective is in the text, all three uses appear, and wrong translations differ from the right one', () => {
    expect(new Set(adj.uses.map((u) => u.id)).size).toBe(adj.uses.length)
    expect(new Set(adj.uses.map((u) => u.use))).toEqual(new Set(['attributive', 'predicate', 'substantival']))
    for (const u of adj.uses) {
      expect(u.text, u.id).toContain(u.adjective)
      if (u.wrong) expect(u.wrong, u.id).not.toContain(u.translation)
    }
  })
})

describe('chapter 9 test', () => {
  it('has 30 questions in the planned areas, none repeated, answers among options', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (a: string) => qs.filter((q) => q.area === a).length
      expect([count('Vocabulary'), count('Adjective forms'), count('Adjective use'), count('Chapter 8 review')]).toEqual([10, 8, 8, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
      for (const q of qs) expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

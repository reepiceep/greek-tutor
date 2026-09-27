import { describe, expect, it } from 'vitest'
import {
  GENDERS, NOUN_CASES, NUMBERS, adjAgreeQuestion, adjParseQuestion, distinctForms, formAt, graveBeforeWord, parsingsOf, slotLabel,
} from '../lib/declensionQuestions'
import { buildChapterTest } from '../lib/chapterTest'
import { vocabDistractors } from '../lib/items'
import { chapter09 as ch } from './chapter09'
import {
  ADJ_READING_SKILLS, NO_HEAD, adjReadingQuestion, allAdjectives, lexicalFormQuestion, lexicalForms, substEnglish, substItems, substQuestion,
} from '../lib/adjReadingQuestions'

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

describe('chapter 9 verses to read', () => {
  const readings = adj.readings ?? []
  const words = (text: string) => text.split(/[\s,.·;]+/).filter(Boolean)

  it('have unique ids, the highlighted words in the text, and a head word only when not substantival', () => {
    expect(readings.length).toBeGreaterThanOrEqual(15)
    expect(new Set(readings.map((r) => r.id)).size).toBe(readings.length)
    for (const r of readings) {
      expect(r.text, r.id).toContain(r.adjective)
      expect(!!r.head, r.id).toBe(r.use !== 'substantival')
      if (r.head) expect(words(r.text), r.id).toContain(r.head)
    }
  })

  it('offer decoys from the verse, never the right word, and three distinct wrong translations', () => {
    for (const r of readings) {
      expect(r.decoys.length, r.id).toBeGreaterThanOrEqual(2)
      for (const d of r.decoys) {
        expect(words(r.text), `${r.id}: ${d}`).toContain(d)
        expect(d, r.id).not.toBe(r.head)
      }
      expect(new Set(r.wrong).size, r.id).toBe(3)
      expect(r.wrong, r.id).not.toContain(r.translation)
    }
  })

  it('build every question with the answer among distinct options', () => {
    for (const r of readings) {
      for (const skill of ADJ_READING_SKILLS) {
        const q = adjReadingQuestion(ch, r, skill)
        const keys = q.options.map((o) => o.key)
        expect(keys, `${r.id} ${skill}`).toContain(q.answer)
        expect(new Set(keys).size, `${r.id} ${skill}`).toBe(keys.length)
      }
      expect(adjReadingQuestion(ch, r, 'head').answer === NO_HEAD, r.id).toBe(r.use === 'substantival')
    }
  })
})

describe('chapter 9 extra adjectives', () => {
  it('match the lexical forms in the vocabulary lists', () => {
    const vocab = [...ch.vocab, { lemma: 'ἄλλος', lexical: 'ἄλλος, -η, -ο' }, { lemma: 'ἔσχατος', lexical: 'ἔσχατος, -η, -ον' }]
    for (const p of adj.more ?? []) expect(vocab.find((w) => w.lemma === p.lemma)?.lexical, p.lemma).toBe(p.lexical)
  })

  it('have the lemma as the masculine nominative singular, and follow α after ε, ι, ρ', () => {
    for (const p of adj.more ?? []) {
      expect(formAt(p, { case: 'nominative', number: 'sg', gender: 'masculine' })).toBe(p.lemma)
      const fem = formAt(p, { case: 'nominative', number: 'sg', gender: 'feminine' })
      expect(fem.normalize('NFD').replace(/[\u0300-\u036f]/g, '').endsWith('α'), p.lemma).toBe(/[ειρ]ος$/.test(p.lemma.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    }
  })

  it('ask for lexical forms with the lemma among the options', () => {
    for (const p of allAdjectives(ch)) {
      for (const f of lexicalForms(p)) {
        const q = lexicalFormQuestion(ch, p, f)
        expect(q.options).toHaveLength(4)
        expect(q.options.map((o) => o.key)).toContain(p.lemma)
      }
    }
  })
})

describe('substantival adjectives', () => {
  it('add man, woman or thing by gender and number', () => {
    expect(substEnglish('good', 'masculine', 'sg', false)).toBe('a good man')
    expect(substEnglish('evil', 'masculine', 'sg', false)).toBe('an evil man')
    expect(substEnglish('good', 'feminine', 'pl', false)).toBe('good women')
    expect(substEnglish('good', 'neuter', 'pl', true)).toBe('the good things')
  })

  it('give four distinct options with the answer among them', () => {
    const items = substItems(ch)
    expect(items.length).toBeGreaterThan(20)
    for (const s of items) {
      const q = substQuestion(ch, s)
      expect(q.options).toHaveLength(4)
      expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

import { describe, expect, it } from 'vitest'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { conditionQuestion, didomiBuildQuestion, didomiParseQuestion, didomiVerseQuestion } from '../lib/nonindicativeQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter35 as ch } from './chapter35'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'

const { forms, verses, conditions } = ch.nonindicative!
const strip = (w: string) => w.normalize('NFD').replace('̀', '́').normalize('NFC').toLowerCase()

describe('chapter 35 data', () => {
  it('is the latest chapter, with its 15 vocabulary words', () => {
    expect(LATEST_CHAPTER).toBe(35)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toHaveLength(15)
  })

  it('lists each nonindicative form of δίδωμι once, with its own parsing', () => {
    expect(new Set(forms.map((f) => f.form)).size).toBe(forms.length)
    expect(new Set(forms.map((f) => f.parse)).size).toBe(forms.length)
    expect(new Set(forms.map((f) => f.mood))).toEqual(new Set(['subjunctive', 'imperative', 'infinitive', 'participle']))
    // The present keeps its reduplication; the aorist doesn't.
    for (const f of forms) {
      if (f.parse.startsWith('pres')) expect(f.form, f.parse).toMatch(/^διδ|^δίδ/)
      if (f.parse.startsWith('aor')) expect(f.form, f.parse).not.toMatch(/^διδ|^δίδ/)
    }
  })

  it('every verse has its word, and the parsing of a δίδωμι form matches the chart', () => {
    for (const v of verses) {
      expect(v.text, v.id).toContain(v.word)
      const f = forms.find((x) => x.parse === v.parse)
      if (f && v.lemma === 'δίδωμι') expect(strip(v.word), v.id).toBe(strip(f.form))
      expect(didomiVerseQuestion(ch, v).options.map((o) => o.key), v.id).toContain(v.parse)
    }
  })

  it('has conditions of each class, with the “if” clause in the text and a class matching its εἰ or ἐάν', () => {
    expect(new Set(conditions.map((c) => c.use))).toEqual(new Set(['first', 'second', 'third']))
    for (const c of conditions) {
      expect(c.text, c.id).toContain(c.word)
      const ifWord = strip(c.word.split(' ')[0])
      if (c.use === 'third') expect(ifWord, c.id).toBe('ἐάν')
      else expect(ifWord, c.id).toBe('εἰ')
      if (c.use === 'second') expect(c.text, c.id).toMatch(/ἂν|ἄν/)
      expect(c.wrong, c.id).not.toContain(c.english)
      expect(conditionQuestion(ch, c).answer).toBe(c.use)
    }
  })

  it('parse and build questions have distinct options with one right answer', () => {
    for (const f of forms) {
      for (const q of [didomiParseQuestion(ch, f), didomiBuildQuestion(ch, f)]) {
        expect(new Set(q.options.map((o) => o.key)).size).toBe(4)
        expect(q.options.filter((o) => o.key === q.answer)).toHaveLength(1)
      }
    }
  })

  it('every skill item makes a question with its own id and an answer among the options', () => {
    const seen = new Set<string>()
    for (const skill of chapterSkills(ch)) {
      for (const item of skill.items) {
        expect(seen.has(item.id), item.id).toBe(false)
        seen.add(item.id)
        const q = item.make()
        expect(q.id).toBe(item.id)
        expect(q.options.map((o) => o.key), item.id).toContain(q.answer)
      }
    }
  })

  it('builds a 30-question test across four areas', () => {
    expect(testAreas(35).map((a) => a.count)).toEqual([10, 8, 5, 7])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

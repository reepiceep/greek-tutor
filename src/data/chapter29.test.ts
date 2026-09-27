import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { formAt } from '../lib/declensionQuestions'
import { participleCharts, tenseOf } from '../lib/participleQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter27 } from './chapter27'
import { chapter28 } from './chapter28'
import { chapter29 as ch } from './chapter29'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'

const items = ch.participleUses!

/** An enclitic after a word adds a second acute on its last syllable (πέμψαντός με), and a grave becomes acute. */
function dictionaryForm(word: string) {
  const d = word.normalize('NFD').replace('̀', '́')
  const accents = [...d].filter((c) => c === '́' || c === '͂').length
  return (accents > 1 ? d.slice(0, d.lastIndexOf('́')) + d.slice(d.lastIndexOf('́') + 1) : d).normalize('NFC')
}

describe('chapter 29 data', () => {
  it('is the latest chapter, with the 5 vocabulary words, each with audio', () => {
    expect(LATEST_CHAPTER).toBe(29)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toHaveLength(5)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('has every use, translations that differ from the wrong ones, and at least 25 items for the test', () => {
    expect(new Set(items.map((u) => u.use))).toEqual(new Set(['adverbial', 'attributive', 'substantival']))
    expect(items.length).toBeGreaterThanOrEqual(25)
    const ids = new Set<string>()
    for (const u of items) {
      expect(ids.has(u.id), u.id).toBe(false)
      ids.add(u.id)
      expect(u.text, u.id).toContain(u.word)
      expect(u.wrong.length, u.id).toBeGreaterThanOrEqual(3)
      expect(u.wrong, u.id).not.toContain(u.english)
    }
  })

  it('an attributive or substantival participle has an article; an adverbial one here has none', () => {
    const ARTICLES = /^(ὁ|ἡ|τό|τὸ|τοῦ|τῆς|τῷ|τῇ|τόν|τὸν|τήν|τὴν|οἱ|αἱ|τά|τὰ|τῶν|τοῖς|ταῖς|τούς|τοὺς|τάς|τὰς)$/i
    for (const u of items) {
      const words = u.text.split(/\s+/)
      const at = words.findIndex((w) => w.includes(u.word))
      const before = words.slice(Math.max(0, at - 3), at).map((w) => w.replace(/[·,.;]/g, ''))
      if (u.use === 'adverbial') expect(before.some((w) => ARTICLES.test(w)), u.id).toBe(false)
      // Mark 16:16's βαπτισθείς shares πιστεύσας's article.
      else if (u.id !== 'mark-16-16-baptistheis') expect(before.some((w) => ARTICLES.test(w)), u.id).toBe(true)
    }
  })

  it('matches chapters 27–28’s generated charts wherever the verb is there', () => {
    const charts = [...participleCharts(chapter27), ...participleCharts(chapter28)]
    let checked = 0
    for (const u of items) {
      const c = charts.find((x) => x.v.lemma === u.lemma && x.voice === u.voice && x.tense === tenseOf(u))
      if (!c) continue
      checked++
      const form = formAt(c.p, u)
      const spellings = form.endsWith('(ν)') ? [form.slice(0, -3), `${form.slice(0, -3)}ν`] : [form]
      expect(spellings, u.id).toContain(dictionaryForm(u.word))
    }
    expect(checked).toBeGreaterThanOrEqual(15)
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
        expect(new Set(q.options.map((o) => o.key)).size, item.id).toBe(q.options.length)
      }
    }
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['Adjectival participles: use', 'Adjectival participles: translation', 'Adjectival participles: parsing']))
  })

  it('builds a 30-question test across four areas', () => {
    expect(testAreas(29).map((a) => a.count)).toEqual([5, 10, 8, 7])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

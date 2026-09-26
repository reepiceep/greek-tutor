import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import { SLOTS, presentForms, presentVerb } from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter16 as ch } from './chapter16'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()

describe('chapter 16 data', () => {
  it('has the 12 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(12)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(12)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('every verb is in the vocabulary (or an earlier chapter) and its lexical form is stem + ω', () => {
    expect(pr.verbs[0].lemma).toBe('λύω')
    for (const v of pr.verbs) {
      expect(presentForms(v, '1s')[0], v.id).toBe(v.lemma)
      expect(ch.vocab.some((w) => w.lemma === v.lemma), v.lemma).toBe(true)
    }
  })

  it('generates λύω as Mounce charts it', () => {
    expect(SLOTS.map((s) => presentForms(pr.verbs[0], s))).toEqual([
      ['λύω'], ['λύεις'], ['λύει'], ['λύομεν'], ['λύετε'], ['λύουσι', 'λύουσιν'],
    ])
  })

  it('each verse’s word is the form its slot and verb generate', () => {
    expect(new Set(pr.verses.map((v) => v.id)).size).toBe(pr.verses.length)
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      const forms = presentForms(presentVerb(ch, v.verb), v.slot).map(bare)
      expect(forms, v.id).toContain(bare(v.word))
    }
    // Every person and number appears in a verse.
    for (const s of SLOTS) expect(pr.verses.some((v) => v.slot === s), s).toBe(true)
  })

  it('every skill item builds a question whose answer is among its options', () => {
    for (const sk of chapterSkills(ch)) {
      for (const it of sk.items) {
        const q = it.make()
        expect(q.id, sk.label).toBe(it.id)
        expect(q.options.map((o) => o.key), it.id).toContain(q.answer)
        expect(new Set(q.options.map((o) => o.key)).size, it.id).toBe(q.options.length)
      }
    }
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['Present tense: forms', 'Present tense: endings', 'Present tense: in verses']))
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (x: string) => qs.filter((q) => q.area === x).length
      expect([count('Vocabulary'), count('Present forms'), count('Endings'), count('Verses')]).toEqual([10, 10, 4, 6])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

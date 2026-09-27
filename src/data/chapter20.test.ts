import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  SLOTS, askTense, futureFormQuestion, inTense, presentDisplay, presentForms, presentVerb, ruleFor, tensePairs,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter20 as ch } from './chapter20'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 20 data', () => {
  it('has the 16 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(16)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(16)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('liquid futures are conjugated like ποιέω', () => {
    expect(chart('meno')).toEqual(['μενῶ', 'μενεῖς', 'μενεῖ', 'μενοῦμεν', 'μενεῖτε', 'μενοῦσι(ν)'])
    expect(chart('apostello')[0]).toBe('ἀποστελῶ')
    expect(chart('airo')[0]).toBe('ἀρῶ')
    expect(chart('lego')).toEqual(['ἐρῶ', 'ἐρεῖς', 'ἐρεῖ', 'ἐροῦμεν', 'ἐρεῖτε', 'ἐροῦσι(ν)'])
    for (const v of pr.verbs.filter((x) => x.liquid)) expect(v.contract, v.id).toBe('ε')
  })

  it('other futures: changed stems, another root, and middle forms', () => {
    expect(chart('horao')).toEqual(['ὄψομαι', 'ὄψῃ', 'ὄψεται', 'ὀψόμεθα', 'ὄψεσθε', 'ὄψονται'])
    expect(chart('erchomai')[0]).toBe('ἐλεύσομαι')
    expect(chart('ginosko')[3]).toBe('γνωσόμεθα')
    expect(chart('echo')[0]).toBe('ἕξω')
    expect(chart('kaleo')[0]).toBe('καλέσω')
    expect(chart('sozo')[2]).toBe('σώσει')
    for (const v of pr.verbs.filter((x) => x.from)) {
      const r = ruleFor(v)
      expect(bare(v.stem), v.id).toBe(r ? bare(v.from!).slice(0, -1) + r.to : `${bare(v.from!)}σ`)
    }
  })

  it('the present stem gives back the lexical form, in the right voice', () => {
    for (const v of pr.verbs) {
      const p = inTense(v, 'present')
      const lexical = p.contract ? `${p.stem}${p.contract}ω` : presentForms(p, '1s')[0]
      expect(bare(lexical), v.id).toBe(bare(v.lemma))
    }
    // μένει / μενεῖ differ only in the accent, and are still told apart.
    expect(presentDisplay(inTense(presentVerb(ch, 'meno'), 'present'), '3s')).toBe('μένει')
    expect(askTense(presentVerb(ch, 'meno'), '3s', 'future')).toBe(true)
    expect(tensePairs(ch).length).toBeGreaterThan(100)
  })

  it('liquid future choices include the σ-future mistakes', () => {
    const keys = futureFormQuestion(ch, presentVerb(ch, 'meno')).options.map((o) => o.key)
    expect(keys.sort()).toEqual(['μενήσω', 'μενῶ', 'μένσω', 'μένω'].sort())
  })

  it('every root question has its root first among distinct options, and every verse matches its generated form', () => {
    for (const r of pr.roots!) expect(new Set(r.options).size, r.lemma).toBe(r.options.length)
    expect(new Set(pr.verses.map((v) => v.id)).size).toBe(pr.verses.length)
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      expect(presentForms(presentVerb(ch, v.verb), v.slot).map((f) => f.toLowerCase()), v.id).toContain(v.word.toLowerCase())
    }
    for (const s of SLOTS) expect(pr.verses.some((v) => v.slot === s), s).toBe(true)
  })

  it('every skill item builds a question whose answer is among its distinct options', () => {
    const labels = chapterSkills(ch).map((s) => s.label)
    expect(labels).toEqual(expect.arrayContaining(['Other futures: forms', 'Other futures: verbal roots', 'Other futures: forming the future', 'Other futures: present or future', 'Other futures: in verses']))
    for (const sk of chapterSkills(ch)) {
      for (const it of sk.items) {
        const q = it.make()
        expect(q.id, sk.label).toBe(it.id)
        expect(q.options.map((o) => o.key), it.id).toContain(q.answer)
        expect(new Set(q.options.map((o) => o.key)).size, it.id).toBe(q.options.length)
      }
    }
  })

  it('the chapter test has 30 unique questions in the planned areas', () => {
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      const count = (x: string) => qs.filter((q) => q.area === x).length
      expect(['Vocabulary', 'Future forms', 'Roots & futures', 'Present or future', 'Verses'].map(count)).toEqual([10, 8, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

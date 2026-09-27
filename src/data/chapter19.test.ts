import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  FUTURE_RULES, SLOTS, askTense, futureFormQuestion, inTense, presentDisplay, presentEnglish, presentForms, presentVerb, ruleFor, tensePairs,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter19 as ch } from './chapter19'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 19 data', () => {
  it('has the 10 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(10)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(10)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates λύσω and λύσομαι-type futures, with the accent moving forward in the middle 1st plural', () => {
    expect(chart('lyo')).toEqual(['λύσω', 'λύσεις', 'λύσει', 'λύσομεν', 'λύσετε', 'λύσουσι(ν)'])
    expect(chart('poreuomai')).toEqual(['πορεύσομαι', 'πορεύσῃ', 'πορεύσεται', 'πορευσόμεθα', 'πορεύσεσθε', 'πορεύσονται'])
    expect(chart('eimi')).toEqual(['ἔσομαι', 'ἔσῃ', 'ἔσται', 'ἐσόμεθα', 'ἔσεσθε', 'ἔσονται'])
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3p')).toBe('they will loose')
  })

  it('every future stem is `from` + σ, changed by its rule (βλεπ + σ → βλεψ, ἀγαπα + σ → ἀγαπησ)', () => {
    for (const v of pr.verbs.filter((x) => x.from)) {
      const r = ruleFor(v)
      const expected = r ? bare(v.from!).slice(0, -1) + r.to : `${bare(v.from!)}σ`
      expect(bare(v.stem), v.id).toBe(expected)
    }
    expect(ruleFor(presentVerb(ch, 'blepo'))!.to).toBe('ψ')
    expect(ruleFor(presentVerb(ch, 'synago'))!.to).toBe('ξ')
    expect(ruleFor(presentVerb(ch, 'lyo'))).toBeUndefined()
  })

  it('the present stem gives back the lexical form (so “present or future” shows real present forms)', () => {
    for (const v of pr.verbs.filter((x) => x.present)) {
      const lexical = v.present!.contract ? `${v.present!.stem}${v.present!.contract}${v.voice ? 'ομαι' : 'ω'}` : presentForms(inTense(v, 'present'), '1s')[0]
      expect(bare(lexical), v.id).toBe(bare(v.lemma))
    }
    expect(presentDisplay(inTense(presentVerb(ch, 'poieo'), 'present'), '3s')).toBe('ποιεῖ')
    expect(askTense(presentVerb(ch, 'zao'), '3s', 'future')).toBe(false)
    for (const { v } of tensePairs(ch)) expect(v.present, v.id).toBeTruthy()
  })

  it('the Square of Stops rules offer distinct options with the answer among them', () => {
    for (const r of FUTURE_RULES) {
      expect(r.options, r.from).toContain(r.to)
      expect(new Set(r.options).size, r.from).toBe(r.options.length)
    }
    const q = futureFormQuestion(ch, presentVerb(ch, 'blepo'))
    expect(q.options.map((o) => o.key).sort()).toEqual(['βλέπσω', 'βλέσω', 'βλέψω', 'βλέξω'].sort())
    expect(futureFormQuestion(ch, presentVerb(ch, 'agapao')).options.map((o) => o.key)).toEqual(expect.arrayContaining(['ἀγαπήσω', 'ἀγαπώσω', 'ἀγαπάσω', 'ἀγαπάω']))
  })

  it('each verse’s word is exactly the form its slot and verb generate', () => {
    expect(new Set(pr.verses.map((v) => v.id)).size).toBe(pr.verses.length)
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      expect(presentForms(presentVerb(ch, v.verb), v.slot).map((f) => f.toLowerCase()), v.id).toContain(v.word.toLowerCase())
    }
    for (const s of SLOTS) expect(pr.verses.some((v) => v.slot === s), s).toBe(true)
  })

  it('every skill item builds a question whose answer is among its distinct options', () => {
    const labels = chapterSkills(ch).map((s) => s.label)
    expect(labels).toEqual(expect.arrayContaining(['Future: forms', 'Future: forming the future', 'Future: present or future', 'Future: in verses']))
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
      expect(['Vocabulary', 'Future forms', 'Forming the future', 'Present or future', 'Verses'].map(count)).toEqual([10, 8, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

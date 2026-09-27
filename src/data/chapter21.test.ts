import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  SLOTS, inTense, presentDisplay, presentEnglish, presentForms, presentIdentifyQuestion, presentProduceQuestion, presentTranslateQuestion,
  presentVerb, recessive, tensePairs,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter21 as ch } from './chapter21'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 21 data', () => {
  it('has the 9 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(9)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('puts the recessive accent in the right place, never before a compound’s augment', () => {
    expect(recessive('ἐλυον')).toBe('ἔλυον')
    expect(recessive('ἐλυομην')).toBe('ἐλυόμην')
    expect(recessive('εἰχον')).toBe('εἶχον')
    expect(recessive('συνηγον', 1)).toBe('συνῆγον')
    expect(recessive('ἐπορευου')).toBe('ἐπορεύου')
  })

  it('generates Mounce’s imperfect paradigms', () => {
    expect(chart('lyo')).toEqual(['ἔλυον', 'ἔλυες', 'ἔλυε(ν)', 'ἐλύομεν', 'ἐλύετε', 'ἔλυον'])
    expect(chart('lyo-mp')).toEqual(['ἐλυόμην', 'ἐλύου', 'ἐλύετο', 'ἐλυόμεθα', 'ἐλύεσθε', 'ἐλύοντο'])
    expect(chart('agapao')).toEqual(['ἠγάπων', 'ἠγάπας', 'ἠγάπα', 'ἠγαπῶμεν', 'ἠγαπᾶτε', 'ἠγάπων'])
    expect(chart('poieo')).toEqual(['ἐποίουν', 'ἐποίεις', 'ἐποίει', 'ἐποιοῦμεν', 'ἐποιεῖτε', 'ἐποίουν'])
    expect(chart('synago')).toEqual(['συνῆγον', 'συνῆγες', 'συνῆγε(ν)', 'συνήγομεν', 'συνήγετε', 'συνῆγον'])
    expect(chart('ekballo')[0]).toBe('ἐξέβαλλον')
    expect(chart('peripateo')[0]).toBe('περιεπάτουν')
    expect(chart('erchomai')).toEqual(['ἠρχόμην', 'ἤρχου', 'ἤρχετο', 'ἠρχόμεθα', 'ἤρχεσθε', 'ἤρχοντο'])
    expect(chart('echo')[0]).toBe('εἶχον')
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3p')).toBe('they were loosing')
    expect(presentEnglish(presentVerb(ch, 'lyo-mp'), '1s')).toBe('I was being loosed')
    expect(presentEnglish(presentVerb(ch, 'eimi'), '1s')).toBe('I was')
  })

  it('every augment question that names a chapter verb has that verb’s 1st singular as its answer', () => {
    for (const r of pr.augments!) {
      expect(new Set(r.options).size, r.lemma).toBe(r.options.length)
      const v = pr.verbs.find((x) => x.lemma === r.lemma && x.voice !== 'passive')
      if (v) expect(presentDisplay(v, '1s'), r.lemma).toBe(r.options[0])
    }
  })

  it('ἔλυον (1st sg = 3rd pl) is one option, and is never offered as a wrong answer', () => {
    const lyo = presentVerb(ch, 'lyo')
    const q = presentIdentifyQuestion(ch, lyo, '3p')
    expect(q.options).toHaveLength(5)
    expect(q.answer).toBe('1s')
    for (let i = 0; i < 20; i++) {
      const t = presentTranslateQuestion(ch, lyo, '1s')
      expect(t.options.filter((o) => o.label === 'they were loosing')).toHaveLength(0)
      const p = presentProduceQuestion(ch, lyo, '3p')
      expect(p.options.filter((o) => o.label === 'ἔλυον')).toHaveLength(1)
    }
  })

  it('the present stem gives back the lexical form; present-or-imperfect never asks an ambiguous form', () => {
    for (const v of pr.verbs.filter((x) => x.present)) {
      const p = inTense(v, 'present')
      const lexical = p.contract ? `${p.stem}${p.contract}ω` : presentForms({ ...p, voice: p.voice === 'passive' ? undefined : p.voice }, '1s')[0]
      expect(bare(lexical), v.id).toBe(bare(v.lemma))
    }
    expect(tensePairs(ch).some(({ v, slot, tense }) => v.id === 'lyo' && tense === 'imperfect' && (slot === '1s' || slot === '3p'))).toBe(false)
    expect(tensePairs(ch).some(({ v, slot }) => v.id === 'lyo' && slot === '3s')).toBe(true)
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
    expect(labels).toEqual(expect.arrayContaining(['Imperfect: forms', 'Imperfect: the augment', 'Imperfect: present or imperfect', 'Imperfect: in verses']))
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
      expect(['Vocabulary', 'Imperfect forms', 'The augment', 'Present or imperfect', 'Verses'].map(count)).toEqual([9, 9, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

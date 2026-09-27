import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  PASSIVE_RULES, SLOTS, aoristFormQuestion, askTense, inTense, passiveRuleFor, presentDisplay, presentEnglish, presentForms, presentVerb,
  verseVerb, voiceName,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter24 as ch } from './chapter24'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 24 data', () => {
  it('has the 8 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(8)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates aorist passives: θη + ν, ς, –, μεν, τε, σαν', () => {
    expect(chart('lyo')).toEqual(['ἐλύθην', 'ἐλύθης', 'ἐλύθη', 'ἐλύθημεν', 'ἐλύθητε', 'ἐλύθησαν'])
    expect(chart('apokrinomai')).toEqual(['ἀπεκρίθην', 'ἀπεκρίθης', 'ἀπεκρίθη', 'ἀπεκρίθημεν', 'ἀπεκρίθητε', 'ἀπεκρίθησαν'])
    expect(chart('ago')[0]).toBe('ἤχθην')
    expect(chart('horao')[2]).toBe('ὤφθη')
    expect(chart('baptizo')[0]).toBe('ἐβαπτίσθην')
    expect(chart('grapho')[2]).toBe('ἐγράφη')
    expect(chart('chairo')[5]).toBe('ἐχάρησαν')
  })

  it('translates true passives as passives and deponents actively, and parses both as passive', () => {
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3s')).toBe('he/she/it was loosed')
    expect(presentEnglish(presentVerb(ch, 'apokrinomai'), '3s')).toBe('he/she/it answered')
    expect(voiceName(presentVerb(ch, 'apokrinomai'))).toBe('passive')
  })

  it('builds future passives from θησ + middle endings', () => {
    const fut = (id: string) => SLOTS.map((s) => presentDisplay(inTense(presentVerb(ch, id), 'future'), s))
    expect(fut('lyo')).toEqual(['λυθήσομαι', 'λυθήσῃ', 'λυθήσεται', 'λυθησόμεθα', 'λυθήσεσθε', 'λυθήσονται'])
    expect(presentEnglish(inTense(presentVerb(ch, 'lyo'), 'future'), '1s')).toBe('I will be loosed')
    expect(presentEnglish(inTense(presentVerb(ch, 'apokrinomai'), 'future'), '1s')).toBe('I will answer')
    expect(askTense(presentVerb(ch, 'poreuomai'), '3s', 'aorist')).toBe(false)
  })

  it('each θ stem follows its stop rule', () => {
    for (const v of pr.verbs.filter((x) => x.from)) {
      const r = passiveRuleFor(v)
      const end = (r ? bare(v.from!).slice(0, -1) + r.to : `${bare(v.from!)}θ`) + 'η'
      expect(bare(v.stem).endsWith(end.slice(1)), `${v.id}: ${v.stem}`).toBe(true)
    }
    for (const r of PASSIVE_RULES) expect(new Set(r.options).size, r.from).toBe(r.options.length)
  })

  it('choosing the aorist passive offers the aorist active as a distractor', () => {
    const keys = aoristFormQuestion(ch, presentVerb(ch, 'lyo')).options.map((o) => o.key)
    expect(keys).toEqual(expect.arrayContaining(['ἐλύθην', 'ἔλυσα']))
  })

  it('each verse’s word is exactly the form its slot, verb and tense generate', () => {
    expect(new Set(pr.verses.map((v) => v.id)).size).toBe(pr.verses.length)
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      expect(presentForms(verseVerb(ch, v), v.slot).map((f) => f.toLowerCase()), v.id).toContain(v.word.toLowerCase())
    }
    for (const s of SLOTS) expect(pr.verses.some((v) => v.slot === s), s).toBe(true)
  })

  it('every skill item builds a question whose answer is among its distinct options', () => {
    const labels = chapterSkills(ch).map((s) => s.label)
    expect(labels).toEqual(expect.arrayContaining(['Passive: forms', 'Passive: forming the passive', 'Passive: aorist or future', 'Passive: in verses']))
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
      expect(['Vocabulary', 'Passive forms', 'Forming the passive', 'Aorist or future', 'Verses'].map(count)).toEqual([8, 10, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

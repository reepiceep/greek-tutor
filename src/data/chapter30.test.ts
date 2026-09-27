import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { distinctForms, formAt, parsingsOf } from '../lib/declensionQuestions'
import {
  absoluteQuestion, absoluteVerses, participleCharts, participleParadigm, participleParseQuestion, participleVerseParseQuestion, tenseOf,
} from '../lib/participleQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter27 } from './chapter27'
import { chapter28 } from './chapter28'
import { chapter30 as ch } from './chapter30'
import { CHAPTERS } from './chapters'

const pt = ch.participles!
const chart = (id: string) => {
  const v = pt.verbs.find((x) => x.id === id)!
  return participleParadigm(v, v.voices[0]).forms
}

describe('chapter 30 data', () => {
  it('is in the chapter list, with its 2 vocabulary words, each with audio', () => {
    expect(CHAPTERS).toContain(ch)
    expect(ch.vocab).toHaveLength(2)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates the perfect active: λελυκώς, λελυκυῖα, λελυκός', () => {
    expect(chart('lyo')).toEqual({
      masculine: { sg: ['λελυκώς', 'λελυκότος', 'λελυκότι', 'λελυκότα'], pl: ['λελυκότες', 'λελυκότων', 'λελυκόσι(ν)', 'λελυκότας'] },
      feminine: { sg: ['λελυκυῖα', 'λελυκυίας', 'λελυκυίᾳ', 'λελυκυῖαν'], pl: ['λελυκυῖαι', 'λελυκυιῶν', 'λελυκυίαις', 'λελυκυίας'] },
      neuter: { sg: ['λελυκός', 'λελυκότος', 'λελυκότι', 'λελυκός'], pl: ['λελυκότα', 'λελυκότων', 'λελυκόσι(ν)', 'λελυκότα'] },
    })
    expect(chart('oida').masculine!.sg![0]).toBe('εἰδώς')
    expect(chart('oida').feminine!.sg![0]).toBe('εἰδυῖα')
    expect(chart('ginomai').neuter!.sg![3]).toBe('γεγονός')
  })

  it('generates the perfect middle/passive, accented on μέν: λελυμένος', () => {
    expect(chart('lyo-mp')).toEqual({
      masculine: { sg: ['λελυμένος', 'λελυμένου', 'λελυμένῳ', 'λελυμένον'], pl: ['λελυμένοι', 'λελυμένων', 'λελυμένοις', 'λελυμένους'] },
      feminine: { sg: ['λελυμένη', 'λελυμένης', 'λελυμένῃ', 'λελυμένην'], pl: ['λελυμέναι', 'λελυμένων', 'λελυμέναις', 'λελυμένας'] },
      neuter: { sg: ['λελυμένον', 'λελυμένου', 'λελυμένῳ', 'λελυμένον'], pl: ['λελυμένα', 'λελυμένων', 'λελυμένοις', 'λελυμένα'] },
    })
    expect(chart('grapho-mp').feminine!.sg![3]).toBe('γεγραμμένην')
  })

  it('every verse has its participle, and matches the chapter 27, 28 or 30 chart for its verb', () => {
    const charts = [...participleCharts(chapter27), ...participleCharts(chapter28), ...participleCharts(ch)]
    const ids = new Set<string>()
    let checked = 0
    for (const v of pt.verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      if (v.wrong) expect(v.wrong, v.id).not.toContain(v.translation)
      const c = charts.find((x) => x.v.lemma === v.lemma && x.voice === v.voice && x.tense === tenseOf(v))
      if (!c) continue
      checked++
      // A grave on the last syllable is an acute before another word; an enclitic adds a second accent (πέμψαντός με).
      const d = v.word.normalize('NFD').replace('̀', '́')
      const accents = [...d].filter((x) => x === '́' || x === '͂').length
      const word = (accents > 1 ? d.slice(0, d.lastIndexOf('́')) + d.slice(d.lastIndexOf('́') + 1) : d).normalize('NFC').toLowerCase()
      const form = formAt(c.p, v)
      expect(form.endsWith('(ν)') ? [form.slice(0, -3), `${form.slice(0, -3)}ν`] : [form], v.id).toContain(word)
    }
    expect(checked).toBeGreaterThanOrEqual(22)
  })

  it('marks genitive participles absolute or not, and only genitives', () => {
    const marked = absoluteVerses(ch)
    expect(marked.filter((v) => v.absolute).length).toBeGreaterThanOrEqual(8)
    expect(marked.filter((v) => !v.absolute).length).toBeGreaterThanOrEqual(3)
    for (const v of marked) {
      expect(v.case, v.id).toBe('genitive')
      expect(absoluteQuestion(ch, v).answer).toBe(v.absolute ? 'yes' : 'no')
    }
  })

  it('never offers another valid parsing as a wrong option', () => {
    for (const c of participleCharts(ch)) {
      for (const form of distinctForms(c.p)) {
        const q = participleParseQuestion(ch, c, form)
        const valid = new Set(parsingsOf(c.p, form).map((s) => `${c.tense}:${c.voice}:${s.case}-${s.number}-${s.gender}`))
        expect(new Set(q.options.map((o) => o.key)).size, form).toBe(4)
        expect(q.options.filter((o) => valid.has(o.key)), form).toHaveLength(1)
      }
    }
    for (const v of pt.verses) expect(new Set(participleVerseParseQuestion(ch, v).options.map((o) => o.key)).size, v.id).toBe(4)
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
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['Perfect participles: forms', 'Perfect participles: genitive absolutes']))
  })

  it('builds a 30-question test across four areas', () => {
    expect(testAreas(30).map((a) => a.count)).toEqual([2, 10, 8, 10])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

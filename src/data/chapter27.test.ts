import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { distinctForms, formAt, parsingsOf, slotsOf } from '../lib/declensionQuestions'
import {
  participleBuildQuestion, participleCharts, participleParadigm, participleParseQuestion, participleVerseParseQuestion, translatableVerses,
} from '../lib/participleQuestions'
import { chapterSkills } from '../lib/skills'
import { CHAPTERS } from './chapters'
import { chapter27 as ch } from './chapter27'
import type { ParticipleVoice } from './types'

const pt = ch.participles!
const chart = (id: string, voice: ParticipleVoice = 'active') => participleParadigm(pt.verbs.find((v) => v.id === id)!, voice).forms

describe('chapter 27 data', () => {
  it('is in the chapter list, with the 14 vocabulary words, each with audio', () => {
    expect(CHAPTERS).toContain(ch)
    expect(ch.vocab).toHaveLength(14)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates λύων, λύουσα, λῦον', () => {
    expect(chart('lyo')).toEqual({
      masculine: { sg: ['λύων', 'λύοντος', 'λύοντι', 'λύοντα'], pl: ['λύοντες', 'λυόντων', 'λύουσι(ν)', 'λύοντας'] },
      feminine: { sg: ['λύουσα', 'λυούσης', 'λυούσῃ', 'λύουσαν'], pl: ['λύουσαι', 'λυουσῶν', 'λυούσαις', 'λυούσας'] },
      neuter: { sg: ['λῦον', 'λύοντος', 'λύοντι', 'λῦον'], pl: ['λύοντα', 'λυόντων', 'λύουσι(ν)', 'λύοντα'] },
    })
  })

  it('generates λυόμενος, λυομένη, λυόμενον', () => {
    expect(chart('lyo', 'middle/passive')).toEqual({
      masculine: { sg: ['λυόμενος', 'λυομένου', 'λυομένῳ', 'λυόμενον'], pl: ['λυόμενοι', 'λυομένων', 'λυομένοις', 'λυομένους'] },
      feminine: { sg: ['λυομένη', 'λυομένης', 'λυομένῃ', 'λυομένην'], pl: ['λυόμεναι', 'λυομένων', 'λυομέναις', 'λυομένας'] },
      neuter: { sg: ['λυόμενον', 'λυομένου', 'λυομένῳ', 'λυόμενον'], pl: ['λυόμενα', 'λυομένων', 'λυομένοις', 'λυόμενα'] },
    })
  })

  it('keeps the accent on the stem, with a circumflex on a long vowel before a short ultima', () => {
    expect(chart('pisteuo').neuter!.sg![0]).toBe('πιστεῦον')
    expect(chart('akouo').neuter!.sg![0]).toBe('ἀκοῦον')
    expect(chart('ginosko').neuter!.sg![0]).toBe('γινῶσκον')
    expect(chart('anabaino').neuter!.sg![0]).toBe('ἀναβαῖνον')
    expect(chart('kerysso').neuter!.sg![0]).toBe('κηρῦσσον')
    expect(chart('echo').neuter!.sg![0]).toBe('ἔχον')
    expect(chart('lego').neuter!.sg![0]).toBe('λέγον')
    expect(chart('baptizo').neuter!.sg![0]).toBe('βαπτίζον')
    expect(chart('echo').feminine!.sg![1]).toBe('ἐχούσης')
    expect(chart('lego').masculine!.pl![1]).toBe('λεγόντων')
    expect(chart('kathemai', 'middle/passive').masculine!.sg).toEqual(['καθήμενος', 'καθημένου', 'καθημένῳ', 'καθήμενον'])
    expect(chart('erchomai', 'middle/passive').feminine!.sg![0]).toBe('ἐρχομένη')
    expect(chart('poreuomai', 'middle/passive').masculine!.pl![2]).toBe('πορευομένοις')
  })

  it('every verse has its participle, and the chart for its verb gives that exact form', () => {
    const ids = new Set<string>()
    const charts = participleCharts(ch)
    for (const v of pt.verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      if (v.wrong) expect(v.wrong, v.id).not.toContain(v.translation)
      const c = charts.find((x) => x.v.lemma === v.lemma && x.voice === v.voice)
      if (!c) continue
      const form = formAt(c.p, v)
      const spellings = form.endsWith('(ν)') ? [form.slice(0, -3), form.slice(0, -3) + 'ν'] : [form]
      expect(spellings, v.id).toContain(v.word.toLowerCase())
    }
    // Every verse but σχίζω's is checked against a generated chart.
    expect(pt.verses.filter((v) => !charts.some((c) => c.v.lemma === v.lemma)).map((v) => v.lemma)).toEqual(['σχίζω'])
    expect(translatableVerses(ch).length).toBeGreaterThanOrEqual(4)
  })

  it('never offers another valid parsing, or another spelling of the answer, as a wrong option', () => {
    for (const c of participleCharts(ch)) {
      for (const form of distinctForms(c.p)) {
        const q = participleParseQuestion(ch, c, form)
        const valid = new Set(parsingsOf(c.p, form).map((s) => `${c.tense}:${c.voice}:${s.case}-${s.number}-${s.gender}`))
        expect(q.options).toHaveLength(4)
        expect(valid.has(q.answer), form).toBe(true)
        expect(q.options.filter((o) => valid.has(o.key)), form).toHaveLength(1)
      }
      for (const s of slotsOf(c.p)) {
        const q = participleBuildQuestion(ch, c, s)
        expect(new Set(q.options.map((o) => o.key)).size).toBe(4)
        expect(q.options.map((o) => o.key)).toContain(q.answer)
      }
    }
    for (const v of pt.verses) {
      const q = participleVerseParseQuestion(ch, v)
      expect(new Set(q.options.map((o) => o.key)).size, v.id).toBe(4)
      expect(q.options.map((o) => o.key), v.id).toContain(q.answer)
    }
  })

  it('every skill item makes a question with its own id and an answer among the options', () => {
    const skills = chapterSkills(ch)
    expect(skills.map((s) => s.label)).toEqual(expect.arrayContaining(['Present participles: forms', 'Present participles: verses']))
    const seen = new Set<string>()
    for (const skill of skills) {
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
    expect(testAreas(27).map((a) => a.count)).toEqual([10, 10, 6, 4])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

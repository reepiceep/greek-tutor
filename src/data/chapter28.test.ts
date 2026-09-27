import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { distinctForms, formAt, parsingsOf, slotsOf } from '../lib/declensionQuestions'
import {
  participleBuildQuestion, participleCharts, participleParadigm, participleParseQuestion, participleTenseQuestion, participleVerseParseQuestion,
  tenseChoices, tenseOf, translatableVerses,
} from '../lib/participleQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter28 as ch } from './chapter28'
import { CHAPTERS } from './chapters'
import type { ParticipleVoice } from './types'

const pt = ch.participles!
const chart = (id: string, voice: ParticipleVoice = 'active') => participleParadigm(pt.verbs.find((v) => v.id === id)!, voice).forms

describe('chapter 28 data', () => {
  it('is in the chapter list, with the 8 vocabulary words, each with audio', () => {
    expect(CHAPTERS).toContain(ch)
    expect(ch.vocab).toHaveLength(8)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates the first aorist: λύσας, λύσασα, λῦσαν', () => {
    expect(chart('lyo')).toEqual({
      masculine: { sg: ['λύσας', 'λύσαντος', 'λύσαντι', 'λύσαντα'], pl: ['λύσαντες', 'λυσάντων', 'λύσασι(ν)', 'λύσαντας'] },
      feminine: { sg: ['λύσασα', 'λυσάσης', 'λυσάσῃ', 'λύσασαν'], pl: ['λύσασαι', 'λυσασῶν', 'λυσάσαις', 'λυσάσας'] },
      neuter: { sg: ['λῦσαν', 'λύσαντος', 'λύσαντι', 'λῦσαν'], pl: ['λύσαντα', 'λυσάντων', 'λύσασι(ν)', 'λύσαντα'] },
    })
    expect(chart('lyo', 'middle').masculine!.sg).toEqual(['λυσάμενος', 'λυσαμένου', 'λυσαμένῳ', 'λυσάμενον'])
    expect(chart('lyo', 'middle').feminine!.pl).toEqual(['λυσάμεναι', 'λυσαμένων', 'λυσαμέναις', 'λυσαμένας'])
    expect(chart('akouo').neuter!.sg![0]).toBe('ἀκοῦσαν')
    expect(chart('poieo').neuter!.sg![0]).toBe('ποιῆσαν')
    expect(chart('kaleo').neuter!.sg![0]).toBe('καλέσαν')
    expect(chart('speiro').masculine!.sg).toEqual(['σπείρας', 'σπείραντος', 'σπείραντι', 'σπείραντα'])
    expect(chart('speiro').neuter!.sg![0]).toBe('σπεῖραν')
    expect(chart('aspazomai', 'middle').masculine!.sg![0]).toBe('ἀσπασάμενος')
  })

  it('generates the second aorist, accented on the ending: λαβών, λαβοῦσα, λαβόν', () => {
    expect(chart('lambano')).toEqual({
      masculine: { sg: ['λαβών', 'λαβόντος', 'λαβόντι', 'λαβόντα'], pl: ['λαβόντες', 'λαβόντων', 'λαβοῦσι(ν)', 'λαβόντας'] },
      feminine: { sg: ['λαβοῦσα', 'λαβούσης', 'λαβούσῃ', 'λαβοῦσαν'], pl: ['λαβοῦσαι', 'λαβουσῶν', 'λαβούσαις', 'λαβούσας'] },
      neuter: { sg: ['λαβόν', 'λαβόντος', 'λαβόντι', 'λαβόν'], pl: ['λαβόντα', 'λαβόντων', 'λαβοῦσι(ν)', 'λαβόντα'] },
    })
    expect(chart('exerchomai').masculine!.sg![0]).toBe('ἐξελθών')
    expect(chart('lego').feminine!.sg![0]).toBe('εἰποῦσα')
    expect(chart('ginomai', 'middle').masculine!.sg).toEqual(['γενόμενος', 'γενομένου', 'γενομένῳ', 'γενόμενον'])
  })

  it('generates the aorist passive: λυθείς, λυθεῖσα, λυθέν', () => {
    expect(chart('lyo', 'passive')).toEqual({
      masculine: { sg: ['λυθείς', 'λυθέντος', 'λυθέντι', 'λυθέντα'], pl: ['λυθέντες', 'λυθέντων', 'λυθεῖσι(ν)', 'λυθέντας'] },
      feminine: { sg: ['λυθεῖσα', 'λυθείσης', 'λυθείσῃ', 'λυθεῖσαν'], pl: ['λυθεῖσαι', 'λυθεισῶν', 'λυθείσαις', 'λυθείσας'] },
      neuter: { sg: ['λυθέν', 'λυθέντος', 'λυθέντι', 'λυθέν'], pl: ['λυθέντα', 'λυθέντων', 'λυθεῖσι(ν)', 'λυθέντα'] },
    })
    expect(chart('speiro', 'passive').masculine!.sg![0]).toBe('σπαρείς')
    expect(chart('kaleo', 'passive').masculine!.sg![0]).toBe('κληθείς')
    expect(chart('apokrinomai', 'passive').feminine!.sg![0]).toBe('ἀποκριθεῖσα')
  })

  it('every verse has its participle, and the chart for its verb gives that exact form', () => {
    const charts = participleCharts(ch)
    const ids = new Set<string>()
    for (const v of pt.verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      expect(v.tense, v.id).toBe('aorist')
      if (v.wrong) expect(v.wrong, v.id).not.toContain(v.translation)
      const c = charts.find((x) => x.v.lemma === v.lemma && x.voice === v.voice)
      if (!c) continue
      // A grave on the last syllable is an acute before another word.
      const word = v.word.normalize('NFD').replace('̀', '́').normalize('NFC')
      expect(formAt(c.p, v), v.id).toBe(word)
    }
    expect([...new Set(pt.verses.filter((v) => !charts.some((c) => c.v.lemma === v.lemma)).map((v) => v.lemma))]).toEqual(['κράζω'])
    expect(translatableVerses(ch).length).toBeGreaterThanOrEqual(4)
  })

  it('never offers another valid parsing as a wrong option', () => {
    for (const c of participleCharts(ch)) {
      for (const form of distinctForms(c.p)) {
        const q = participleParseQuestion(ch, c, form)
        const valid = new Set(parsingsOf(c.p, form).map((s) => `${c.tense}:${c.voice}:${s.case}-${s.number}-${s.gender}`))
        expect(q.options, form).toHaveLength(4)
        expect(new Set(q.options.map((o) => o.key)).size, form).toBe(4)
        expect(q.options.filter((o) => valid.has(o.key)), form).toHaveLength(1)
      }
      for (const s of slotsOf(c.p)) expect(new Set(participleBuildQuestion(ch, c, s).options.map((o) => o.key)).size).toBe(4)
    }
    for (const v of pt.verses) {
      const q = participleVerseParseQuestion(ch, v)
      expect(new Set(q.options.map((o) => o.key)).size, v.id).toBe(4)
      expect(q.options.map((o) => o.key), v.id).toContain(q.answer)
    }
  })

  it('asks present or aorist about chapter 27 and 28 forms of the same verbs, with no form in both tenses', () => {
    const choices = tenseChoices(ch)
    const tenses = new Set(choices.map(({ c }) => c.tense))
    expect(tenses).toEqual(new Set(['present', 'aorist']))
    const byForm = new Map<string, Set<string>>()
    for (const { c, form } of choices) byForm.set(form, (byForm.get(form) ?? new Set()).add(c.tense))
    for (const [form, t] of byForm) expect(t.size, form).toBe(1)
    const q = participleTenseQuestion(ch, choices[0].c, choices[0].form)
    expect(q.answer).toBe(tenseOf(choices[0].c.v))
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
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['Aorist participles: forms', 'Aorist participles: present or aorist', 'Aorist participles: verses']))
  })

  it('builds a 30-question test across five areas', () => {
    expect(testAreas(28).map((a) => a.count)).toEqual([8, 8, 4, 6, 4])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

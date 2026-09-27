import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  SLOTS, aoristFormQuestion, inTense, presentDisplay, presentEnglish, presentForms, presentVerb, recessive, tensePairs, voiceName,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter25 as ch } from './chapter25'

const pr = ch.present!
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 25 data', () => {
  it('has the 3 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(3)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates perfect actives, including second perfects', () => {
    expect(chart('lyo')).toEqual(['λέλυκα', 'λέλυκας', 'λέλυκε(ν)', 'λελύκαμεν', 'λελύκατε', 'λελύκασι(ν)'])
    expect(chart('agapao')[0]).toBe('ἠγάπηκα')
    expect(chart('aiteo')[3]).toBe('ᾐτήκαμεν')
    expect(chart('ginosko')[0]).toBe('ἔγνωκα')
    expect(chart('apostello')[0]).toBe('ἀπέσταλκα')
    expect(chart('ginomai')[0]).toBe('γέγονα')
    expect(chart('erchomai')[0]).toBe('ἐλήλυθα')
    expect(chart('akouo')).toEqual(['ἀκήκοα', 'ἀκήκοας', 'ἀκήκοε(ν)', 'ἀκηκόαμεν', 'ἀκηκόατε', 'ἀκηκόασι(ν)'])
    expect(chart('horao')[0]).toBe('ἑώρακα')
    // The New Testament's -καν 3rd plural is accepted too.
    expect(presentForms(presentVerb(ch, 'ginosko'), '3p')).toContain('ἔγνωκαν')
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3s')).toBe('he/she/it has loosed')
  })

  it('generates perfect middle/passives with a short final -αι', () => {
    expect(recessive('λελυμαι')).toBe('λέλυμαι')
    expect(chart('lyo-mp')).toEqual(['λέλυμαι', 'λέλυσαι', 'λέλυται', 'λελύμεθα', 'λέλυσθε', 'λέλυνται'])
    expect(chart('pleroo-mp')[2]).toBe('πεπλήρωται')
    expect(chart('grapho-mp')[2]).toBe('γέγραπται')
    expect(presentEnglish(presentVerb(ch, 'lyo-mp'), '1s')).toBe('I have been loosed')
    expect(voiceName(presentVerb(ch, 'lyo-mp'))).toBe('middle/passive')
  })

  it('every reduplication answer is the perfect the chart generates', () => {
    for (const r of pr.reduplications!) {
      expect(new Set(r.options).size, r.lemma).toBe(r.options.length)
      const v = pr.verbs.find((x) => x.lemma === r.lemma && !x.voice)
      if (v) expect(presentDisplay(v, '1s'), r.lemma).toBe(r.options[0])
    }
  })

  it('pairs each perfect with its aorist', () => {
    const aor = (id: string) => presentDisplay(inTense(presentVerb(ch, id), 'aorist'), '1s')
    expect(aor('lyo')).toBe('ἔλυσα')
    expect(aor('erchomai')).toBe('ἦλθον')
    expect(aor('ginomai')).toBe('ἐγενόμην')
    expect(aor('ginosko')).toBe('ἔγνων')
    expect(aor('lyo-mp')).toBe('ἐλύθην')
    expect(tensePairs(ch).length).toBeGreaterThan(100)
    expect(aoristFormQuestion(ch, presentVerb(ch, 'lyo')).options.map((o) => o.key)).toContain('ἔλυσα')
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
    expect(labels).toEqual(expect.arrayContaining(['Perfect: forms', 'Perfect: reduplication', 'Perfect: aorist or perfect', 'Perfect: in verses']))
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
      expect(['Vocabulary', 'Perfect forms', 'Reduplication', 'Aorist or perfect', 'Verses'].map(count)).toEqual([3, 12, 6, 4, 5])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

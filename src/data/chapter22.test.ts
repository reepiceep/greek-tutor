import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  SLOTS, aoristFormQuestion, inTense, presentDisplay, presentEnglish, presentForms, presentVerb, tensePairs, voiceName,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter22 as ch } from './chapter22'

const pr = ch.present!
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 22 data', () => {
  it('has the 14 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(14)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates second aorists with the imperfect’s endings on the aorist stem', () => {
    expect(chart('lambano')).toEqual(['ἔλαβον', 'ἔλαβες', 'ἔλαβε(ν)', 'ἐλάβομεν', 'ἐλάβετε', 'ἔλαβον'])
    expect(chart('ginomai')).toEqual(['ἐγενόμην', 'ἐγένου', 'ἐγένετο', 'ἐγενόμεθα', 'ἐγένεσθε', 'ἐγένοντο'])
    expect(chart('erchomai')).toEqual(['ἦλθον', 'ἦλθες', 'ἦλθε(ν)', 'ἤλθομεν', 'ἤλθετε', 'ἦλθον'])
    expect(chart('eiserchomai')[0]).toBe('εἰσῆλθον')
    expect(chart('apothnesko')[0]).toBe('ἀπέθανον')
    expect(chart('heurisko')).toEqual(['εὗρον', 'εὗρες', 'εὗρε(ν)', 'εὕρομεν', 'εὕρετε', 'εὗρον'])
    expect(chart('lego')[0]).toBe('εἶπον')
    expect(chart('horao')[3]).toBe('εἴδομεν')
    expect(chart('synago')[0]).toBe('συνήγαγον')
    expect(chart('ginosko')).toEqual(['ἔγνων', 'ἔγνως', 'ἔγνω', 'ἔγνωμεν', 'ἔγνωτε', 'ἔγνωσαν'])
    expect(presentEnglish(presentVerb(ch, 'lambano'), '3p')).toBe('they took')
    expect(voiceName(presentVerb(ch, 'ginomai'))).toBe('middle')
  })

  it('builds each imperfect from the present stem, for telling the two apart', () => {
    const impf = (id: string) => presentDisplay(inTense(presentVerb(ch, id), 'imperfect'), '1s')
    expect(impf('lambano')).toBe('ἐλάμβανον')
    expect(impf('ballo')).toBe('ἔβαλλον')
    expect(impf('apothnesko')).toBe('ἀπέθνῃσκον')
    expect(impf('ginomai')).toBe('ἐγινόμην')
    expect(impf('eiserchomai')).toBe('εἰσηρχόμην')
    expect(impf('horao')).toBe('ἑώρων')
    expect(impf('ginosko')).toBe('ἐγίνωσκον')
    expect(presentEnglish(inTense(presentVerb(ch, 'lambano'), 'imperfect'), '1s')).toBe('I was taking')
    expect(tensePairs(ch).some(({ v, tense }) => v.id === 'ballo' && tense === 'imperfect')).toBe(true)
  })

  it('the aorist-stem question offers the imperfect as a distractor', () => {
    const keys = aoristFormQuestion(ch, presentVerb(ch, 'lambano')).options.map((o) => o.key)
    expect(keys).toContain('ἔλαβον')
    expect(keys).toContain('ἐλάμβανον')
    expect(new Set(keys).size).toBe(keys.length)
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
    expect(labels).toEqual(expect.arrayContaining(['Second aorist: forms', 'Second aorist: aorist stems', 'Second aorist: imperfect or aorist', 'Second aorist: in verses']))
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
      expect(['Vocabulary', 'Aorist forms', 'Aorist stems', 'Imperfect or aorist', 'Verses'].map(count)).toEqual([10, 8, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

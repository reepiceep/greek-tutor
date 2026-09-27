import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  SLOTS, aoristFormQuestion, askTense, inTense, presentDisplay, presentEnglish, presentForms, presentVerb, ruleFor,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter23 as ch } from './chapter23'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 23 data', () => {
  it('has the 8 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(8)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates first aorists: σα endings, stops, lengthened vowels, liquids and the middle', () => {
    expect(chart('lyo')).toEqual(['ἔλυσα', 'ἔλυσας', 'ἔλυσε(ν)', 'ἐλύσαμεν', 'ἐλύσατε', 'ἔλυσαν'])
    expect(chart('archomai')).toEqual(['ἠρξάμην', 'ἤρξω', 'ἤρξατο', 'ἠρξάμεθα', 'ἤρξασθε', 'ἤρξαντο'])
    expect(chart('grapho')[0]).toBe('ἔγραψα')
    expect(chart('kerysso')[0]).toBe('ἐκήρυξα')
    expect(chart('doxazo')[0]).toBe('ἐδόξασα')
    expect(chart('agapao')[0]).toBe('ἠγάπησα')
    expect(chart('meno')[0]).toBe('ἔμεινα')
    expect(chart('apostello')[0]).toBe('ἀπέστειλα')
    expect(chart('airo')).toEqual(['ἦρα', 'ἦρας', 'ἦρε(ν)', 'ἤραμεν', 'ἤρατε', 'ἦραν'])
    expect(chart('pino')[0]).toBe('ἔπιον')
    expect(chart('aperchomai')[0]).toBe('ἀπῆλθον')
    expect(presentEnglish(presentVerb(ch, 'lyo'), '1s')).toBe('I loosed')
  })

  it('each σ stem is its `from` stem changed by the Square of Stops or a lengthened vowel', () => {
    for (const v of pr.verbs.filter((x) => x.from)) {
      const r = ruleFor(v)
      const end = r ? bare(v.from!).slice(0, -1) + r.to : `${bare(v.from!)}σ`
      // The augment can change the first letter (ἀκου → ἠκουσ), so compare the rest.
      expect(bare(v.stem).endsWith(end.slice(1)), `${v.id}: ${v.stem}`).toBe(true)
    }
  })

  it('imperfects come from the present stem, and ambiguous 3rd singulars are never asked', () => {
    const impf = (id: string) => presentDisplay(inTense(presentVerb(ch, id), 'imperfect'), '1s')
    expect(impf('lyo')).toBe('ἔλυον')
    expect(impf('airo')).toBe('ᾖρον')
    expect(impf('apostello')).toBe('ἀπέστελλον')
    // ἤγειρε(ν) is both imperfect and aorist 3rd singular.
    expect(askTense(presentVerb(ch, 'egeiro'), '3s', 'aorist')).toBe(false)
    expect(askTense(presentVerb(ch, 'egeiro'), '1s', 'aorist')).toBe(true)
  })

  it('choosing the aorist offers the imperfect and the future as distractors', () => {
    const keys = aoristFormQuestion(ch, presentVerb(ch, 'grapho')).options.map((o) => o.key)
    expect(keys).toEqual(expect.arrayContaining(['ἔγραψα', 'ἔγραφον', 'γράψω']))
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
    expect(labels).toEqual(expect.arrayContaining(['First aorist: forms', 'First aorist: forming the aorist', 'First aorist: imperfect or aorist', 'First aorist: in verses']))
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
      expect(['Vocabulary', 'Aorist forms', 'Forming the aorist', 'Imperfect or aorist', 'Verses'].map(count)).toEqual([8, 10, 5, 3, 4])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

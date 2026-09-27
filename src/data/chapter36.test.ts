import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import {
  SLOTS, presentDisplay, presentForms, presentVerb, whichTensePairs, whichVerbPairs, whichVerbQuestion,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter36 as ch } from './chapter36'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'

const pr = ch.present!
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 36 data', () => {
  it('is the latest chapter, with its 9 vocabulary words, each with audio', () => {
    expect(LATEST_CHAPTER).toBe(36)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toHaveLength(9)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('builds the tenses of ἵστημι and τίθημι from their stems', () => {
    expect(chart('histemi-fut')[0]).toBe('στήσω')
    expect(chart('histemi-aor1')).toEqual(['ἔστησα', 'ἔστησας', 'ἔστησε(ν)', 'ἐστήσαμεν', 'ἐστήσατε', 'ἔστησαν'])
    expect(chart('histemi-perf')).toEqual(['ἕστηκα', 'ἕστηκας', 'ἕστηκε(ν)', 'ἑστήκαμεν', 'ἑστήκατε', 'ἑστήκασι(ν)'])
    expect(chart('tithemi-mp')).toEqual(['τίθεμαι', 'τίθεσαι', 'τίθεται', 'τιθέμεθα', 'τίθεσθε', 'τίθενται'])
    expect(chart('tithemi-aor')).toEqual(['ἔθηκα', 'ἔθηκας', 'ἔθηκε(ν)', 'ἐθήκαμεν', 'ἐθήκατε', 'ἔθηκαν'])
    expect(chart('tithemi-perf')[0]).toBe('τέθεικα')
    expect(chart('tithemi-aorp')[0]).toBe('ἐτέθην')
  })

  it('builds δείκνυμι and ἀφίημι, with the circumflex of ἀφῆκα', () => {
    expect(chart('deiknymi-aor')[0]).toBe('ἔδειξα')
    expect(chart('deiknymi-fut')[2]).toBe('δείξει')
    expect(chart('aphiemi-aor')).toEqual(['ἀφῆκα', 'ἀφῆκας', 'ἀφῆκε(ν)', 'ἀφήκαμεν', 'ἀφήκατε', 'ἀφῆκαν'])
    expect(chart('aphiemi-aorp')[5]).toBe('ἀφέθησαν')
    expect(chart('aphiemi-mp')[2]).toBe('ἀφίεται')
    expect(chart('anistemi-futm')[2]).toBe('ἀναστήσεται')
  })

  it('every verse has its verb, in the form the chart gives', () => {
    const ids = new Set<string>()
    for (const v of pr.verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      const word = v.word.normalize('NFD').replace('̀', '́').normalize('NFC').toLowerCase()
      expect(presentForms(presentVerb(ch, v.verb), v.slot), v.id).toContain(word)
    }
  })

  it('asks “which verb?” only about forms no other verb shares, and “which tense?” too', () => {
    const verbPairs = whichVerbPairs(ch)
    const forms = new Set(verbPairs.map(({ v, slot }) => presentDisplay(v, slot)))
    for (const f of ['ἔθηκε(ν)', 'ἔστησε(ν)', 'ἔδειξε(ν)', 'ἀφῆκε(ν)', 'τίθησι(ν)']) expect(forms, f).toContain(f)
    const q = whichVerbQuestion(ch, presentVerb(ch, 'tithemi-aor'), '3s')
    expect(q.answer).toBe('τίθημι')
    expect(new Set(q.options.map((o) => o.key)).size).toBe(4)
    // ἔστησαν is both aorists of ἵστημι, so “which tense?” never asks about it.
    expect(whichTensePairs(ch).some(({ v, slot }) => presentDisplay(v, slot) === 'ἔστησαν')).toBe(false)
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
  })

  it('builds a 30-question test across five areas', () => {
    expect(testAreas(36).map((a) => a.count)).toEqual([9, 8, 4, 3, 6])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

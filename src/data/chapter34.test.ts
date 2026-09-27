import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import {
  SLOTS, presentDisplay, presentEnglish, presentForms, presentVerb, tenseVoiceLabel, whichTensePairs, whichTenseQuestion,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter34 as ch } from './chapter34'
import { CHAPTERS } from './chapters'

const pr = ch.present!
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 34 data', () => {
  it('is in the chapter list, with its 7 vocabulary words, each with audio', () => {
    expect(CHAPTERS).toContain(ch)
    expect(ch.vocab).toHaveLength(7)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('has δίδωμι in every tense of the indicative', () => {
    expect(chart('didomi')).toEqual(['δίδωμι', 'δίδως', 'δίδωσι(ν)', 'δίδομεν', 'δίδοτε', 'διδόασι(ν)'])
    expect(chart('didomi-mp')).toEqual(['δίδομαι', 'δίδοσαι', 'δίδοται', 'διδόμεθα', 'δίδοσθε', 'δίδονται'])
    expect(chart('didomi-impf')).toEqual(['ἐδίδουν', 'ἐδίδους', 'ἐδίδου', 'ἐδίδομεν', 'ἐδίδοτε', 'ἐδίδοσαν'])
    expect(chart('didomi-fut')).toEqual(['δώσω', 'δώσεις', 'δώσει', 'δώσομεν', 'δώσετε', 'δώσουσι(ν)'])
    expect(chart('didomi-futp')).toEqual(['δοθήσομαι', 'δοθήσῃ', 'δοθήσεται', 'δοθησόμεθα', 'δοθήσεσθε', 'δοθήσονται'])
    expect(chart('didomi-aor')).toEqual(['ἔδωκα', 'ἔδωκας', 'ἔδωκε(ν)', 'ἐδώκαμεν', 'ἐδώκατε', 'ἔδωκαν'])
    expect(chart('didomi-aorp')).toEqual(['ἐδόθην', 'ἐδόθης', 'ἐδόθη', 'ἐδόθημεν', 'ἐδόθητε', 'ἐδόθησαν'])
    expect(chart('didomi-perf')).toEqual(['δέδωκα', 'δέδωκας', 'δέδωκε(ν)', 'δεδώκαμεν', 'δεδώκατε', 'δεδώκασι(ν)'])
    expect(presentForms(presentVerb(ch, 'didomi'), '3s')).toEqual(['δίδωσι', 'δίδωσιν'])
    expect(presentEnglish(presentVerb(ch, 'didomi-futp'), '3s')).toBe('he/she/it will be given')
    expect(tenseVoiceLabel(presentVerb(ch, 'didomi-futp'))).toBe('future passive')
  })

  it('has παραδίδωμι with its prefix kept in front of the augment', () => {
    expect(chart('paradidomi-aor')[0]).toBe('παρέδωκα')
    expect(chart('paradidomi-aor')[3]).toBe('παρεδώκαμεν')
    expect(chart('paradidomi-aorp')[2]).toBe('παρεδόθη')
    expect(chart('paradidomi-mp')[3]).toBe('παραδιδόμεθα')
    expect(chart('paradidomi-fut')[2]).toBe('παραδώσει')
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

  it('asks “which tense?” only about forms no other tense shares', () => {
    const pairs = whichTensePairs(ch)
    expect(pairs.length).toBeGreaterThan(40)
    const shown = new Set(pairs.map(({ v, slot }) => presentDisplay(v, slot)))
    for (const f of ['δίδωσι(ν)', 'ἐδίδου', 'δώσει', 'ἔδωκε(ν)', 'δέδωκε(ν)', 'ἐδόθη']) expect(shown, f).toContain(f)
    const q = whichTenseQuestion(ch, presentVerb(ch, 'didomi-aor'), '1s')
    expect(q.answer).toBe('aorist active')
    expect(new Set(q.options.map((o) => o.key)).size).toBe(4)
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
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining(['δίδωμι: forms', 'δίδωμι: which tense', 'δίδωμι: in verses']))
  })

  it('builds a 30-question test across four areas', () => {
    expect(testAreas(34).map((a) => a.count)).toEqual([7, 10, 6, 7])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

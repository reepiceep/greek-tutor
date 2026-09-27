import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import {
  SLOTS, inMood, moodPairs, moodQuestion, presentDisplay, presentEnglish, presentForms, presentVerb, subjUseQuestion, verseLexicalQuestion,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter31 as ch } from './chapter31'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'

const pr = ch.present!
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 31 data', () => {
  it('is the latest chapter, with its 2 vocabulary words, each with audio', () => {
    expect(LATEST_CHAPTER).toBe(31)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toHaveLength(2)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates present subjunctives with lengthened vowels', () => {
    expect(chart('lyo')).toEqual(['λύω', 'λύῃς', 'λύῃ', 'λύωμεν', 'λύητε', 'λύωσι(ν)'])
    expect(chart('lyo-mp')).toEqual(['λύωμαι', 'λύῃ', 'λύηται', 'λυώμεθα', 'λύησθε', 'λύωνται'])
    expect(chart('proseuchomai')[4]).toBe('προσεύχησθε')
    expect(chart('eimi')).toEqual(['ὦ', 'ᾖς', 'ᾖ', 'ὦμεν', 'ἦτε', 'ὦσι(ν)'])
    expect(presentForms(presentVerb(ch, 'eimi'), '3p')).toEqual(['ὦσι', 'ὦσιν'])
    expect(chart('poieo')[4]).toBe('ποιῆτε')
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3s')).toBe('he/she/it may loose')
    expect(presentEnglish(presentVerb(ch, 'lyo-mp'), '1p')).toBe('we may be loosed')
  })

  it('generates aorist subjunctives with no augment, and the passive accented on the ending', () => {
    expect(chart('lyo-aor')).toEqual(['λύσω', 'λύσῃς', 'λύσῃ', 'λύσωμεν', 'λύσητε', 'λύσωσι(ν)'])
    expect(chart('lambano')).toEqual(['λάβω', 'λάβῃς', 'λάβῃ', 'λάβωμεν', 'λάβητε', 'λάβωσι(ν)'])
    expect(chart('ginomai')).toEqual(['γένωμαι', 'γένῃ', 'γένηται', 'γενώμεθα', 'γένησθε', 'γένωνται'])
    expect(chart('proseuchomai-aor')[2]).toBe('προσεύξηται')
    expect(chart('lyo-pass')).toEqual(['λυθῶ', 'λυθῇς', 'λυθῇ', 'λυθῶμεν', 'λυθῆτε', 'λυθῶσι(ν)'])
    expect(chart('apokrinomai')[4]).toBe('ἀποκριθῆτε')
    expect(presentEnglish(presentVerb(ch, 'lyo-pass'), '3s')).toBe('he/she/it may be loosed')
    expect(presentEnglish(presentVerb(ch, 'apokrinomai'), '3s')).toBe('he/she/it may answer')
  })

  it('every verse has its verb, in the form the chart gives, and a reason for the subjunctive', () => {
    const ids = new Set<string>()
    for (const v of pr.verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      expect(v.use, v.id).toBeTruthy()
      const word = v.word.normalize('NFD').replace('̀', '́').normalize('NFC').toLowerCase()
      expect(presentForms(presentVerb(ch, v.verb), v.slot), v.id).toContain(word)
      expect(verseLexicalQuestion(ch, v).options.map((o) => o.key), v.id).toContain(v.verb)
    }
    const uses = new Set(pr.verses.map((v) => v.use))
    expect(uses).toEqual(new Set(['purpose', 'condition', 'hortatory', 'deliberative', 'emphatic', 'indefinite']))
    for (const v of pr.verses) expect(subjUseQuestion(ch, v).answer).toBe(v.use)
  })

  it('contrasts indicative and subjunctive only where the form has one parse', () => {
    const pairs = moodPairs(ch)
    expect(pairs.length).toBeGreaterThan(20)
    const shown = pairs.map(({ v, slot, mood }) => `${presentDisplay(inMood(v, mood), slot)}:${mood}`)
    expect(shown).toContain('λύῃ:subjunctive')
    expect(shown).toContain('λύει:indicative')
    expect(shown).toContain('λύσῃ:subjunctive')
    expect(shown).toContain('λύσει:indicative')
    // λύω and λύσω are both indicative and subjunctive, so they are never asked.
    expect(shown.some((s) => s.startsWith('λύω:') || s.startsWith('λύσω:'))).toBe(false)
    const q = moodQuestion(ch, presentVerb(ch, 'lyo'), '3s', 'subjunctive')
    expect(q.options.map((o) => o.key)).toContain(q.answer)
    expect(presentDisplay(inMood(presentVerb(ch, 'lyo-aor'), 'indicative'), '3s')).toBe('λύσει')
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
    expect(chapterSkills(ch).map((s) => s.label)).toEqual(expect.arrayContaining([
      'Subjunctive: forms', 'Subjunctive: indicative or subjunctive', 'Subjunctive: why subjunctive', 'Subjunctive: in verses',
    ]))
  })

  it('builds a 30-question test across five areas', () => {
    expect(testAreas(31).map((a) => a.count)).toEqual([2, 10, 6, 6, 6])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

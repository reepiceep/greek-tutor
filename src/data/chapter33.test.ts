import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import {
  IMP_SLOTS, imperative, imperativeBuildQuestion, imperativeEnglish, imperativeParseQuestion, imperativeTriples, parsableVerses,
  prohibitionQuestion, prohibitionVerses,
} from '../lib/imperativeQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter33 as ch } from './chapter33'
import { CHAPTERS, LATEST_CHAPTER } from './chapters'
import type { ImperativeKind } from './types'

const { verbs, verses } = ch.imperatives!
const verb = (id: string) => verbs.find((v) => v.id === id)!
const row = (id: string, kind: ImperativeKind) => IMP_SLOTS.map((s) => imperative(verb(id), kind, s))

describe('chapter 33 data', () => {
  it('is the latest chapter, with its 3 vocabulary words, each with audio', () => {
    expect(LATEST_CHAPTER).toBe(33)
    expect(CHAPTERS.at(-1)).toBe(ch)
    expect(ch.vocab).toHaveLength(3)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates every imperative of λύω, with recessive accents', () => {
    expect(row('lyo', 'pres-act')).toEqual(['λῦε', 'λυέτω', 'λύετε', 'λυέτωσαν'])
    expect(row('lyo', 'pres-mp')).toEqual(['λύου', 'λυέσθω', 'λύεσθε', 'λυέσθωσαν'])
    expect(row('lyo', 'aor-act')).toEqual(['λῦσον', 'λυσάτω', 'λύσατε', 'λυσάτωσαν'])
    expect(row('lyo', 'aor-mid')).toEqual(['λῦσαι', 'λυσάσθω', 'λύσασθε', 'λυσάσθωσαν'])
    expect(row('lyo', 'aor-pass')).toEqual(['λύθητι', 'λυθήτω', 'λύθητε', 'λυθήτωσαν'])
    expect(imperativeEnglish(verb('lyo'), 'pres-act', '3s')).toBe('let him/her loose')
    expect(imperativeEnglish(verb('lyo'), 'aor-pass', '2s')).toBe('be loosed!')
    expect(imperativeEnglish(verb('ginomai'), 'aor-pass', '3s')).toBe('let him/her be done')
  })

  it('generates second aorists, liquids, compounds, and the irregulars', () => {
    expect(row('lambano', 'aor-act')).toEqual(['λάβε', 'λαβέτω', 'λάβετε', 'λαβέτωσαν'])
    expect(row('exerchomai', 'aor-act')[0]).toBe('ἔξελθε')
    expect(row('erchomai', 'aor-act')).toEqual(['ἐλθέ', 'ἐλθέτω', 'ἔλθετε', 'ἐλθέτωσαν'])
    expect(row('ginomai', 'aor-mid')).toEqual(['γενοῦ', 'γενέσθω', 'γένεσθε', 'γενέσθωσαν'])
    expect(row('ginomai', 'pres-mp')).toEqual(['γίνου', 'γινέσθω', 'γίνεσθε', 'γινέσθωσαν'])
    expect(row('airo', 'aor-act')).toEqual(['ἆρον', 'ἀράτω', 'ἄρατε', 'ἀράτωσαν'])
    expect(row('krino', 'pres-act')[0]).toBe('κρῖνε')
    expect(row('hypago', 'pres-act')[0]).toBe('ὕπαγε')
    expect(row('apolyo', 'aor-act')[0]).toBe('ἀπόλυσον')
    expect(row('sozo', 'aor-act')[0]).toBe('σῶσον')
    expect(row('egeiro', 'aor-pass')[0]).toBe('ἐγέρθητι')
    expect(row('poreuomai', 'aor-pass')[0]).toBe('πορεύθητι')
    expect(row('pisteuo', 'aor-act')[0]).toBe('πίστευσον')
    expect(row('eimi', 'pres-act')).toEqual(['ἴσθι', 'ἔστω', 'ἔστε', 'ἔστωσαν'])
  })

  it('every verse has its word, and every imperative matches the generated form', () => {
    const ids = new Set<string>()
    for (const v of verses) {
      expect(ids.has(v.id), v.id).toBe(false)
      ids.add(v.id)
      expect(v.text, v.id).toContain(v.word)
      if (v.wrong) expect(v.wrong, v.id).not.toContain(v.translation)
      if (v.prohibition === 'subjunctive') continue
      const vb = verbs.find((x) => x.lemma === v.lemma)
      expect(vb?.kinds, v.id).toContain(v.kind)
      const word = v.word.normalize('NFD').replace('̀', '́').normalize('NFC').toLowerCase()
      expect(imperative(vb!, v.kind, v.slot).toLowerCase(), v.id).toBe(word)
    }
    expect(prohibitionVerses(ch).map((v) => v.prohibition)).toEqual(expect.arrayContaining(['imperative', 'subjunctive']))
    for (const v of prohibitionVerses(ch)) expect(prohibitionQuestion(ch, v).answer).toBe(v.prohibition)
    expect(parsableVerses(ch).length).toBeGreaterThanOrEqual(20)
  })

  it('parse and build questions have four distinct options with one right answer', () => {
    for (const { v, kind, slot } of imperativeTriples(ch)) {
      const p = imperativeParseQuestion(ch, v, kind, slot)
      expect(new Set(p.options.map((o) => o.key)).size, `${v.id} ${kind} ${slot}`).toBe(p.options.length)
      expect(p.options.map((o) => o.key)).toContain(p.answer)
      const b = imperativeBuildQuestion(ch, v, kind, slot)
      expect(new Set(b.options.map((o) => o.key)).size).toBe(b.options.length)
      expect(b.options.filter((o) => o.key === b.answer)).toHaveLength(1)
    }
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
    expect(testAreas(33).map((a) => a.count)).toEqual([3, 11, 6, 6, 4])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

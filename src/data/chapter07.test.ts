import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { ARTICLE, phraseEnglish, phraseGreek, phraseSlots } from '../lib/caseQuestions'
import { buildChapterTest } from '../lib/chapterTest'
import { NOUN_CASES, parsingsOf } from '../lib/declensionQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter07 as ch } from './chapter07'
import type { CaseFunction, NounCase } from './types'

const cs = ch.cases!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()

describe('chapter 7 data', () => {
  it('has Mounce’s 15 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(15)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(15)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('every noun in the vocabulary has a chart, and each chart’s lemma is its nominative singular', () => {
    const nouns = ch.vocab.filter((w) => w.pos === 'noun')
    expect(cs.nouns.map((n) => n.paradigm.lemma).sort()).toEqual(nouns.map((w) => w.lemma).sort())
    for (const { paradigm: p } of cs.nouns) {
      const g = Object.keys(p.forms)[0] as keyof typeof p.forms
      expect(p.forms[g]!.sg![0], p.id).toBe(p.lemma)
      expect(ch.vocab.find((w) => w.lemma === p.lemma)!.lexical, p.id).toBe(p.lexical)
    }
  })

  it('the charts follow the endings (second declension -ου -ῳ -ων -οις, first declension -ας/-ης -ᾳ/-ῃ -ων -αις)', () => {
    const ENDINGS: Record<string, [string, string, string, string]> = {
      // sg gen, sg dat, pl gen, pl dat
      second: ['ου', 'ω', 'ων', 'οις'],
      firstEta: ['ης', 'η', 'ων', 'αις'],
      firstAlpha: ['ας', 'α', 'ων', 'αις'],
    }
    const kind: Record<string, string> = { kyrios: 'second', ouranos: 'second', huios: 'second', euangelion: 'second', arche: 'firstEta', hamartia: 'firstAlpha', exousia: 'firstAlpha' }
    for (const { paradigm: p } of cs.nouns.filter((n) => kind[n.paradigm.id])) {
      const f = Object.values(p.forms)[0]!
      const [gs, ds, gp, dp] = ENDINGS[kind[p.id]]
      expect(bare(f.sg![1]).endsWith(gs), `${p.id} gen sg`).toBe(true)
      expect(bare(f.sg![2]).endsWith(ds), `${p.id} dat sg`).toBe(true)
      expect(bare(f.pl![1]).endsWith(gp), `${p.id} gen pl`).toBe(true)
      expect(bare(f.pl![2]).endsWith(dp), `${p.id} dat pl`).toBe(true)
    }
    // The dative singular always carries an iota subscript.
    for (const { paradigm: p } of cs.nouns.filter((n) => kind[n.paradigm.id])) {
      const dat = Object.values(p.forms)[0]!.sg![2]
      expect(dat.normalize('NFD'), p.id).toContain('ͅ')
    }
  })

  it('generates phrases with the right article', () => {
    const kyrios = cs.nouns.find((n) => n.paradigm.id === 'kyrios')!
    expect(phraseGreek(kyrios, 'genitive', 'sg')).toBe('τοῦ κυρίου')
    expect(phraseGreek(kyrios, 'dative', 'pl')).toBe('τοῖς κυρίοις')
    const hamartia = cs.nouns.find((n) => n.paradigm.id === 'hamartia')!
    expect(phraseGreek(hamartia, 'genitive', 'sg')).toBe('τῆς ἁμαρτίας')
    expect(phraseGreek(hamartia, 'dative', 'sg')).toBe('τῇ ἁμαρτίᾳ')
    expect(phraseEnglish(hamartia, 'genitive', 'pl')).toBe('of the sins')
    expect(phraseEnglish(kyrios, 'dative', 'sg')).toBe('to/for the lord')
    const euangelion = cs.nouns.find((n) => n.paradigm.id === 'euangelion')!
    expect(phraseGreek(euangelion, 'genitive', 'pl')).toBe('τῶν εὐαγγελίων')
    expect(ARTICLE.neuter.sg[3]).toBe('τό')
    // 7 nouns with a plural × (genitive, dative) × (sg, pl); Ἰησοῦς has no plural.
    expect(phraseSlots(ch)).toHaveLength(7 * 4)
  })

  it('each verse word is in its text, has three wrong renderings, and its case matches the use', () => {
    const CASE_OF: Record<CaseFunction, NounCase> = { subject: 'nominative', object: 'accusative', possession: 'genitive', indirect: 'dative', place: 'dative', means: 'dative' }
    expect(new Set(cs.uses.map((u) => u.id)).size).toBe(cs.uses.length)
    for (const u of cs.uses) {
      expect(u.text, u.id).toContain(u.word)
      expect(u.wrong, u.id).toHaveLength(3)
      expect(u.wrong, u.id).not.toContain(u.english)
    }
    for (const u of cs.uses) {
      const found = cs.nouns.flatMap((n) => parsingsOf(n.paradigm, u.word))
      if (found.length) expect(found.map((s) => s.case), u.id).toContain(CASE_OF[u.use])
    }
    // Every case and function appears.
    for (const f of Object.keys(CASE_OF) as CaseFunction[]) expect(cs.uses.some((u) => u.use === f), f).toBe(true)
    expect(NOUN_CASES).toHaveLength(4)
  })

  it('preposition questions borrow wrong answers when the chapter has too few prepositions', () => {
    const q = chapterSkills(ch).find((s) => s.label === 'Vocab: prepositions by case')!.items[0].make()
    expect(q.options.length).toBeGreaterThanOrEqual(4)
  })

  it('every skill item builds a question whose answer is among its distinct options', () => {
    const labels = chapterSkills(ch).map((s) => s.label)
    expect(labels).toEqual(expect.arrayContaining(['Cases: parsing nouns', 'Cases: phrases', 'Cases: in verses']))
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
      expect([count('Vocabulary'), count('Noun forms'), count('Phrases'), count('Verses')]).toEqual([10, 8, 6, 6])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

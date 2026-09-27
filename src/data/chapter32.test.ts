import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest, testAreas } from '../lib/chapterTest'
import { infinitive, infinitiveBuildQuestion, infinitiveEnglish, infinitivePairs, infinitiveParseQuestion } from '../lib/infinitiveQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter32 as ch } from './chapter32'
import { CHAPTERS } from './chapters'

const { verbs, items } = ch.infinitives!
const verb = (id: string) => verbs.find((v) => v.id === id)!
const forms = (id: string) => verb(id).kinds.map((k) => infinitive(verb(id), k))

describe('chapter 32 data', () => {
  it('is in the chapter list, with its 2 vocabulary words, each with audio', () => {
    expect(CHAPTERS).toContain(ch)
    expect(ch.vocab).toHaveLength(2)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('generates every infinitive of λύω', () => {
    expect(forms('lyo')).toEqual(['λύειν', 'λύεσθαι', 'λῦσαι', 'λύσασθαι', 'λυθῆναι', 'λελυκέναι', 'λελύσθαι'])
    expect(infinitiveEnglish(verb('lyo'), 'aor-pass')).toBe('to be loosed')
    expect(infinitiveEnglish(verb('lyo'), 'perf-act')).toBe('to have loosed')
    expect(infinitiveEnglish(verb('erchomai'), 'pres-mp')).toBe('to come')
  })

  it('generates first and second aorists, contract verbs, and the irregulars', () => {
    expect(forms('pisteuo')).toEqual(['πιστεύειν', 'πιστεῦσαι', 'πεπιστευκέναι'])
    expect(forms('akouo')).toEqual(['ἀκούειν', 'ἀκοῦσαι', 'ἀκουσθῆναι'])
    expect(forms('poieo')).toEqual(['ποιεῖν', 'ποιῆσαι', 'πεποιηκέναι'])
    expect(forms('pleroo')).toEqual(['πληροῦν', 'πληρῶσαι', 'πληρωθῆναι'])
    expect(forms('horao')).toEqual(['ὁρᾶν', 'ἰδεῖν'])
    expect(forms('sozo')).toEqual(['σῴζειν', 'σῶσαι', 'σωθῆναι'])
    expect(forms('baptizo')).toEqual(['βαπτίζειν', 'βαπτίσαι', 'βαπτισθῆναι'])
    expect(forms('speiro')).toEqual(['σπείρειν', 'σπεῖραι'])
    expect(forms('lego')).toEqual(['λέγειν', 'λέγεσθαι', 'εἰπεῖν'])
    expect(forms('ginomai')).toEqual(['γίνεσθαι', 'γενέσθαι', 'γεγονέναι'])
    expect(forms('proseuchomai')).toEqual(['προσεύχεσθαι', 'προσεύξασθαι'])
    expect(forms('apothnesko')).toEqual(['ἀποθνῄσκειν', 'ἀποθανεῖν'])
    expect(forms('eimi')).toEqual(['εἶναι'])
    expect(forms('zao')).toEqual(['ζῆν'])
  })

  it('every verse has its infinitive, matching the generated form wherever the verb is drilled', () => {
    const ids = new Set<string>()
    let checked = 0
    for (const it of items) {
      expect(ids.has(it.id), it.id).toBe(false)
      ids.add(it.id)
      expect(it.text, it.id).toContain(it.word)
      expect(it.wrong.length, it.id).toBeGreaterThanOrEqual(3)
      expect(it.wrong, it.id).not.toContain(it.english)
      const v = verbs.find((x) => x.lemma === it.lemma)
      if (!v?.kinds.includes(it.kind)) continue
      checked++
      // An enclitic adds a second accent (ἐγερθῆναί με).
      const d = it.word.normalize('NFD')
      const accents = [...d].filter((c) => c === '́' || c === '͂').length
      const word = (accents > 1 ? d.slice(0, d.lastIndexOf('́')) + d.slice(d.lastIndexOf('́') + 1) : d).normalize('NFC')
      expect(infinitive(v, it.kind), it.id).toBe(word)
    }
    expect(checked).toBeGreaterThanOrEqual(26)
    expect(new Set(items.map((it) => it.use))).toEqual(new Set(['complementary', 'purpose', 'result', 'time', 'cause', 'substantival']))
  })

  it('parse and build questions never offer the right form twice', () => {
    for (const { v, kind } of infinitivePairs(ch)) {
      const p = infinitiveParseQuestion(ch, v, kind)
      expect(new Set(p.options.map((o) => o.key)).size).toBe(4)
      const b = infinitiveBuildQuestion(ch, v, kind)
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
    expect(testAreas(32).map((a) => a.count)).toEqual([2, 10, 8, 6, 4])
    for (let i = 0; i < 10; i++) {
      const qs = buildChapterTest(ch)
      expect(qs).toHaveLength(30)
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

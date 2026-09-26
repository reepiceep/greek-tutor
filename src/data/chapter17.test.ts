import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import { CONTRACTIONS, CONTRACT_ENDINGS, ENDINGS, ENDING_VOWEL, SLOTS, presentForms, presentVerb, tellsContractType } from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter17 as ch } from './chapter17'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()

describe('chapter 17 data', () => {
  it('has the 11 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(11)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(11)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('every verb is a contract verb from the vocabulary, and its lexical form is stem + contract vowel + ω', () => {
    for (const v of pr.verbs) {
      expect(v.contract, v.id).toBeTruthy()
      expect(bare(v.lemma), v.id).toBe(bare(`${v.stem}${v.contract}ω`))
      expect(ch.vocab.some((w) => w.lemma === v.lemma), v.lemma).toBe(true)
    }
  })

  it('the contracted endings follow the contraction rules', () => {
    for (const c of ['α', 'ε', 'ο'] as const) {
      for (const s of SLOTS) {
        // Replace the ending's opening vowel with its contraction: ε + ομεν → ουμεν.
        const rest = ENDINGS[s].slice(ENDING_VOWEL[s].length)
        expect(bare(CONTRACT_ENDINGS[c][s]).replace('ι', ''), `${c} ${s}`).toBe(bare(CONTRACTIONS[c][ENDING_VOWEL[s]] + rest).replace('ι', ''))
      }
    }
  })

  it('generates Mounce’s three model paradigms', () => {
    const forms = (id: string) => SLOTS.map((s) => presentForms(presentVerb(ch, id), s).at(-1))
    expect(forms('agapao')).toEqual(['ἀγαπῶ', 'ἀγαπᾷς', 'ἀγαπᾷ', 'ἀγαπῶμεν', 'ἀγαπᾶτε', 'ἀγαπῶσιν'])
    expect(forms('poieo')).toEqual(['ποιῶ', 'ποιεῖς', 'ποιεῖ', 'ποιοῦμεν', 'ποιεῖτε', 'ποιοῦσιν'])
    expect(forms('pleroo')).toEqual(['πληρῶ', 'πληροῖς', 'πληροῖ', 'πληροῦμεν', 'πληροῦτε', 'πληροῦσιν'])
  })

  it('only asks the kind of contract verb when the form shows it', () => {
    const poieo = presentVerb(ch, 'poieo')
    expect(SLOTS.filter((s) => tellsContractType(poieo, s))).toEqual(['2s', '3s', '2p'])
    expect(SLOTS.filter((s) => tellsContractType(presentVerb(ch, 'agapao'), s))).toEqual(['2s', '3s', '1p', '2p', '3p'])
  })

  it('each verse’s word is exactly the form its slot and verb generate', () => {
    expect(new Set(pr.verses.map((v) => v.id)).size).toBe(pr.verses.length)
    for (const v of pr.verses) {
      expect(v.text, v.id).toContain(v.word)
      expect(presentForms(presentVerb(ch, v.verb), v.slot), v.id).toContain(v.word)
    }
    for (const s of SLOTS) expect(pr.verses.some((v) => v.slot === s), s).toBe(true)
  })

  it('every skill item builds a question whose answer is among its distinct options', () => {
    const labels = chapterSkills(ch).map((s) => s.label)
    expect(labels).toEqual(expect.arrayContaining(['Contract verbs: forms', 'Contract verbs: contractions', 'Contract verbs: in verses']))
    expect(labels.some((l) => l.startsWith('Present tense'))).toBe(false)
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
      expect([count('Vocabulary'), count('Contract forms'), count('Contractions'), count('Verses')]).toEqual([10, 10, 5, 5])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { buildChapterTest } from '../lib/chapterTest'
import {
  CONTRACTIONS, CONTRACT_MP_ENDINGS, MP_ENDINGS, MP_ENDING_VOWEL, SLOTS, askVoice, inVoice, presentDisplay, presentEnglish, presentForms,
  presentVerb, voicePairs,
} from '../lib/presentQuestions'
import { chapterSkills } from '../lib/skills'
import { chapter18 as ch } from './chapter18'

const pr = ch.present!
const bare = (w: string) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase()
const chart = (id: string) => SLOTS.map((s) => presentDisplay(presentVerb(ch, id), s))

describe('chapter 18 data', () => {
  it('has the 10 vocabulary words, each with audio', () => {
    expect(ch.vocab).toHaveLength(10)
    expect(new Set(ch.vocab.map((w) => w.id)).size).toBe(10)
    for (const w of ch.vocab) expect(recordingFor(w.lemma), w.lemma).toBeTruthy()
  })

  it('every verb is middle/passive; passive verbs have a participle, middle-only verbs a lexical form in -μαι', () => {
    for (const v of pr.verbs) {
      expect(v.voice, v.id).toBeTruthy()
      if (v.voice === 'passive') expect(v.pp, v.id).toBeTruthy()
      else expect(v.lemma.endsWith('μαι'), v.id).toBe(true)
    }
  })

  it('generates λύομαι, with the accent moving forward in the 1st plural', () => {
    expect(chart('lyo')).toEqual(['λύομαι', 'λύῃ', 'λύεται', 'λυόμεθα', 'λύεσθε', 'λύονται'])
    expect(chart('erchomai')).toEqual(['ἔρχομαι', 'ἔρχῃ', 'ἔρχεται', 'ἐρχόμεθα', 'ἔρχεσθε', 'ἔρχονται'])
    expect(chart('apokrinomai')[3]).toBe('ἀποκρινόμεθα')
  })

  it('δύναμαι takes the endings with no connecting vowel', () => {
    expect(chart('dynamai')).toEqual(['δύναμαι', 'δύνασαι', 'δύναται', 'δυνάμεθα', 'δύνασθε', 'δύνανται'])
  })

  it('every lexical form is the uncontracted 1st singular (the active one for passive verbs)', () => {
    for (const v of pr.verbs) {
      const expected = v.voice === 'middle' ? presentForms(v, '1s')[0] : `${v.stem}${v.contract ?? ''}${v.contract ? 'ω' : presentForms(inVoice(v, 'active'), '1s')[0].slice(v.stem.length)}`
      expect(bare(expected), v.id).toBe(bare(v.lemma))
    }
  })

  it('contract verbs follow the contraction rules in the middle/passive', () => {
    for (const c of ['α', 'ε', 'ο'] as const) {
      for (const s of SLOTS) {
        const rest = MP_ENDINGS[s].slice(MP_ENDING_VOWEL[s].length)
        expect(bare(CONTRACT_MP_ENDINGS[c][s]), `${c} ${s}`).toBe(bare(CONTRACTIONS[c][MP_ENDING_VOWEL[s]] + rest))
      }
    }
    expect(chart('agapao')).toEqual(['ἀγαπῶμαι', 'ἀγαπᾷ', 'ἀγαπᾶται', 'ἀγαπώμεθα', 'ἀγαπᾶσθε', 'ἀγαπῶνται'])
    expect(chart('kaleo')).toEqual(['καλοῦμαι', 'καλῇ', 'καλεῖται', 'καλούμεθα', 'καλεῖσθε', 'καλοῦνται'])
    expect(chart('pleroo')).toEqual(['πληροῦμαι', 'πληροῖ', 'πληροῦται', 'πληρούμεθα', 'πληροῦσθε', 'πληροῦνται'])
  })

  it('translates passives with “am/is/are” and middle-only verbs actively', () => {
    expect(presentEnglish(presentVerb(ch, 'lyo'), '3s')).toBe('he/she/it is loosed')
    expect(presentEnglish(presentVerb(ch, 'erchomai'), '3s')).toBe('he/she/it comes')
  })

  it('asks active or middle/passive only for verbs with an active, and only when the form has one parse', () => {
    const agapao = presentVerb(ch, 'agapao')
    // ἀγαπᾷ is active 3rd sg and middle/passive 2nd sg; πληροῖ likewise.
    expect(askVoice(agapao, '3s', 'active')).toBe(false)
    expect(askVoice(agapao, '2s', 'mp')).toBe(false)
    expect(askVoice(presentVerb(ch, 'pleroo'), '2s', 'mp')).toBe(false)
    expect(askVoice(presentVerb(ch, 'kaleo'), '2s', 'mp')).toBe(true)
    expect(askVoice(presentVerb(ch, 'lyo'), '2s', 'mp')).toBe(true)
    expect(askVoice(presentVerb(ch, 'erchomai'), '1s', 'mp')).toBe(false)
    for (const { v, slot, voice } of voicePairs(ch)) expect(v.voice, `${v.id} ${slot} ${voice}`).toBe('passive')
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
    expect(labels).toEqual(expect.arrayContaining(['Middle/passive: forms', 'Middle/passive: endings', 'Middle/passive: active or passive', 'Middle/passive: in verses']))
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
      expect([count('Vocabulary'), count('Middle/passive forms'), count('Endings & voice'), count('Verses')]).toEqual([10, 10, 5, 5])
      expect(new Set(qs.map((q) => q.id)).size).toBe(30)
    }
  })
})

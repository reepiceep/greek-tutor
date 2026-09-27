import { describe, expect, it } from 'vitest'
import { recordingFor } from '../lib/audio'
import { RECORDINGS } from './audio'
import { CHAPTERS } from './chapters'

// Chapter 35's vocabulary pages have no players, and the server has only two of its files (checked 2026-09-27).
const NO_RECORDING = new Set([
  'ἁμαρτάνω', 'ἁμαρτωλός', 'ἀνάστασις', 'ἀπαγγέλλω', 'διακονέω', 'δικαιόω', 'θλῖψις', 'ἱλαστήριον', 'σταυρόω', 'σωτήρ', 'σωτηρία', 'φανερόω', 'φόβος',
])
const NO_MODERN = new Set(['Σίμων', 'ἁγιάζω', 'διακονία'])

describe('pronunciation recordings', () => {
  it('exist for every vocabulary word in every chapter, in both pronunciations, except the few Mounce doesn’t have', () => {
    for (const ch of CHAPTERS) {
      for (const w of ch.vocab) {
        const rec = recordingFor(w.lemma)
        if (NO_RECORDING.has(w.lemma)) {
          expect(rec, `${w.lemma} now has a recording: take it off the list`).toBeUndefined()
          continue
        }
        expect(rec, `ch ${ch.number} ${w.lemma}`).toBeTruthy()
        expect(rec!.mounce, w.lemma).toMatch(/^https:\/\/greek\.billmounce\.com\/chpt\d\d\/words\/[a-z0-9]+\.mp3$/)
        if (!NO_MODERN.has(w.lemma)) expect(rec!.modern, w.lemma).toMatch(/^https:\/\/greek\.billmounce\.com\/chpt\d\d\/modern\/[a-z0-9]+\.mp3$/)
      }
    }
  })

  it('has no recordings for words that are not in the vocabulary', () => {
    const lemmas = new Set(CHAPTERS.flatMap((c) => c.vocab.map((w) => w.lemma.normalize('NFC'))))
    for (const k of Object.keys(RECORDINGS)) expect(lemmas.has(k), k).toBe(true)
  })

  it('tells τίς and τις apart', () => {
    expect(recordingFor('τίς')).toBeTruthy()
    expect(recordingFor('τις')).toBeTruthy()
  })
})

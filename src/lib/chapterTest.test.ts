import { describe, expect, it } from 'vitest'
import { chapter08 as ch } from '../data/chapter08'
import { areaTier, buildChapterTest, neededToPass, scoreTest } from './chapterTest'
import { exportProgress, importProgress, record, stats } from './progress'

describe('buildChapterTest', () => {
  it('has 30 questions in the planned areas, none repeated', () => {
    const qs = buildChapterTest(ch)
    expect(qs).toHaveLength(30)
    const count = (a: string) => qs.filter((q) => q.area === a).length
    expect([count('Vocabulary'), count('εἰμί'), count('Prepositions'), count('Phrases'), count('Elision')]).toEqual([10, 6, 7, 4, 3])
    expect(new Set(qs.map((q) => q.id)).size).toBe(30)
  })

  it('every question has its answer among the options', () => {
    for (let i = 0; i < 20; i++) {
      for (const q of buildChapterTest(ch)) expect(q.options.map((o) => o.key)).toContain(q.answer)
    }
  })
})

describe('scoreTest', () => {
  const qs = buildChapterTest(ch)

  it('is ready only when every area reaches 90%', () => {
    expect(scoreTest(ch, qs.map((q) => ({ q, correct: true })), 60).ready).toBe(true)
    // One miss in a small area (elision: 2/3) fails it even though the total is 29/30.
    const oneMiss = qs.map((q) => ({ q, correct: q !== qs.find((x) => x.area === 'Elision') }))
    const r = scoreTest(ch, oneMiss, 60)
    expect(r.correct).toBe(29)
    expect(r.areas['Elision']).toEqual({ correct: 2, total: 3 })
    expect(r.ready).toBe(false)
  })
})

describe('export / import', () => {
  it('round-trips progress', () => {
    record('ch8:test:item', true)
    const json = exportProgress()
    record('ch8:test:item', false)
    importProgress(json)
    expect(stats('ch8:test:item').box).toBe(2)
  })

  it('rejects files that are not progress', () => {
    expect(() => importProgress('not json')).toThrow('not valid JSON')
    expect(() => importProgress('{"foo": 1}')).toThrow('does not contain')
    expect(() => importProgress('{"items": {"x": {"box": 9}}}')).toThrow('malformed')
  })
})

describe('area tiers', () => {
  it('passes at 90%, is close from 75%, and low below', () => {
    expect(areaTier(10, 10)).toBe('pass')
    expect(areaTier(9, 10)).toBe('pass')
    expect(areaTier(6, 7)).toBe('close')
    expect(areaTier(3, 4)).toBe('close')
    expect(areaTier(2, 3)).toBe('low')
    expect(areaTier(0, 0)).toBe('low')
    expect([neededToPass(6, 7), neededToPass(3, 4), neededToPass(2, 3), neededToPass(9, 10), neededToPass(8, 10)]).toEqual([1, 1, 1, 0, 1])
  })
})

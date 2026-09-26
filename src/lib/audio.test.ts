import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { playWord, recordingFor } from './audio'

/** A stand-in for HTMLAudioElement that lets each test decide what happens after play(). */
class FakeAudio extends EventTarget {
  static last: FakeAudio
  static behaviour: 'play-then-end' | 'error' | 'stall' = 'play-then-end'
  src: string
  constructor(src: string) {
    super()
    this.src = src
    FakeAudio.last = this
  }
  play() {
    if (FakeAudio.behaviour === 'play-then-end') {
      setTimeout(() => this.dispatchEvent(new Event('playing')), 10)
      setTimeout(() => this.dispatchEvent(new Event('ended')), 500)
    } else if (FakeAudio.behaviour === 'error') {
      setTimeout(() => this.dispatchEvent(new Event('error')), 10)
    }
    return Promise.resolve()
  }
  pause() {
    this.dispatchEvent(new Event('pause'))
  }
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubGlobal('Audio', FakeAudio)
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('playWord', () => {
  it('plays the chosen pronunciation and resolves when it ends', async () => {
    FakeAudio.behaviour = 'play-then-end'
    const p = playWord('ἀλλά', 'modern')
    expect(FakeAudio.last.src).toBe('https://greek.billmounce.com/chpt08/modern/alla.mp3')
    await vi.advanceTimersByTimeAsync(600)
    await expect(p).resolves.toBeUndefined()
  })

  it('rejects on a load error', async () => {
    FakeAudio.behaviour = 'error'
    const p = playWord('ἀλλά', 'mounce')
    const check = expect(p).rejects.toThrow('failed to load')
    await vi.advanceTimersByTimeAsync(50)
    await check
  })

  it('gives up if nothing plays within 8 seconds (offline or blocked)', async () => {
    FakeAudio.behaviour = 'stall'
    const p = playWord('ἀλλά', 'mounce')
    const check = expect(p).rejects.toThrow('did not load')
    await vi.advanceTimersByTimeAsync(8100)
    await check
  })

  it('stopping for a new word resolves the old one', async () => {
    FakeAudio.behaviour = 'stall'
    const first = playWord('ἀλλά', 'mounce')
    playWord('ἀπό', 'mounce').catch(() => {})
    await expect(first).resolves.toBeUndefined()
  })

  it('plays the Erasmian recording when a word has no modern one', async () => {
    FakeAudio.behaviour = 'play-then-end'
    expect(recordingFor('Σίμων')!.modern).toBeUndefined()
    const done = playWord('Σίμων', 'modern')
    expect(FakeAudio.last.src).toMatch(/chpt04\/words\/simwn\.mp3$/)
    await vi.runAllTimersAsync()
    await expect(done).resolves.toBeUndefined()
  })

  it('rejects straight away for a word with no recording', async () => {
    await expect(playWord('ξξξ', 'mounce')).rejects.toThrow('No recording')
  })
})

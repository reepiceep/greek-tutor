import { RECORDINGS, type Recording } from '../data/audio'

export type Pronunciation = keyof Recording

/** The recording for a word, if Mounce has one (looked up by lemma, e.g. "ἀλλά"). */
export function recordingFor(lemma: string): Recording | undefined {
  return RECORDINGS[lemma.normalize('NFC')]
}

/** How long to wait for a recording to start before giving up (offline, slow or blocked). */
const START_TIMEOUT_MS = 8000

// One shared player, so starting a word stops the previous one.
let player: HTMLAudioElement | null = null

/**
 * Play a word. Resolves when the recording finishes; rejects if it can't play:
 * no recording, autoplay blocked, a load error, or nothing within START_TIMEOUT_MS.
 */
export function playWord(lemma: string, style: Pronunciation): Promise<void> {
  const rec = recordingFor(lemma)
  if (!rec) return Promise.reject(new Error(`No recording for ${lemma}`))
  player?.pause()
  const audio = new Audio(rec[style] ?? rec.mounce)
  player = audio
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      // Reject before pausing, so the pause handler below can't report this as a normal finish.
      reject(new Error('Recording did not load'))
      audio.pause()
    }, START_TIMEOUT_MS)
    audio.addEventListener('playing', () => clearTimeout(timer), { once: true })
    audio.addEventListener('ended', () => resolve(), { once: true })
    audio.addEventListener('pause', () => { clearTimeout(timer); resolve() }, { once: true })
    audio.addEventListener('error', () => { clearTimeout(timer); reject(new Error('Recording failed to load')) }, { once: true })
    // play() returns a promise in browsers; wrap it so a missing one doesn't break us.
    Promise.resolve(audio.play()).catch((e) => { clearTimeout(timer); reject(e) })
  })
}

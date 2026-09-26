import { useEffect, useState } from 'react'
import { playWord, recordingFor } from '../lib/audio'
import { useProgress } from '../lib/progress'

interface Props {
  lemma: string
  /** Play once when the button first appears, if the autoplay setting is on. */
  autoPlay?: boolean
}

/** A speaker button that plays Mounce's recording of a word. Renders nothing if there is no recording. */
export function AudioButton({ lemma, autoPlay }: Props) {
  const { settings } = useProgress()
  const [state, setState] = useState<'idle' | 'playing' | 'error'>('idle')

  const play = () => {
    setState('playing')
    playWord(lemma, settings.pronunciation).then(
      () => setState('idle'),
      () => setState('error'),
    )
  }

  useEffect(() => {
    // Browsers may block autoplay before the first click; that just leaves the button idle.
    if (autoPlay && settings.autoplay && recordingFor(lemma)) {
      playWord(lemma, settings.pronunciation).catch(() => {})
    }
    // Only when the word changes, not when settings do.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lemma])

  if (!recordingFor(lemma)) return null
  return (
    <button
      type="button"
      className={`audio-btn ${state}`}
      onClick={(e) => { e.stopPropagation(); play() }}
      title={state === 'error' ? 'Couldn’t play the recording (are you offline?)' : `Hear ${lemma}`}
      aria-label={`Hear ${lemma}`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
        {state === 'error'
          ? <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          : <path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />}
      </svg>
    </button>
  )
}

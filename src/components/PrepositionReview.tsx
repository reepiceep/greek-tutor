import { useMemo, useState } from 'react'
import { PREPOSITION_CHAPTERS } from '../data/prepositions'
import { prepositionReview } from '../data/prepositionReview'
import { PrepositionDrills } from './PrepositionDrills'

const LAST = PREPOSITION_CHAPTERS.at(-1)!
// Ranges start at chapter 8; before it there are only ἐν and εἰς.
const RANGES = PREPOSITION_CHAPTERS.filter((c) => c >= 8)

/** All prepositions from Mounce chapters 6 onward, limited to those introduced by a chosen chapter. */
export function PrepositionReview() {
  const [through, setThrough] = useState(LAST)
  const chapter = useMemo(() => prepositionReview(through), [through])
  const count = chapter.vocab.length

  return (
    <PrepositionDrills
      chapter={chapter}
      title="All prepositions"
      header={
        <div className="range">
          <span className="muted">Through chapter</span>
          <div className="seg">
            {RANGES.map((c) => (
              <button key={c} className={through === c ? 'on' : ''} onClick={() => setThrough(c)}>{c}</button>
            ))}
          </div>
          <span className="muted">{count} prepositions</span>
        </div>
      }
    />
  )
}

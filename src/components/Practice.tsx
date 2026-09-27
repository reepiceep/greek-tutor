import type { View } from '../App'
import type { Chapter } from '../data/types'
import { practiceCards } from '../lib/views'

/** Every practice screen in the chapter. On phones, the bottom bar's Practice tab. */
export function Practice({ chapter, go }: { chapter: Chapter; go: (v: View) => void }) {
  return (
    <section className="practice">
      <p className="eyebrow">Chapter {chapter.number}</p>
      <h2 className="greek">{chapter.title}</h2>
      <div className="modes">
        {practiceCards(chapter).map((c) => (
          <button key={c.view} className="mode" onClick={() => go(c.view)}>
            <span className="mode-glyph greek" aria-hidden="true">{c.glyph}</span>
            <span className="mode-text">
              <strong className={c.greekTitle ? 'greek' : ''}>{c.title}</strong>
              <span>{c.description}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

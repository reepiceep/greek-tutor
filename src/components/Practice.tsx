import type { View } from '../App'
import type { Chapter } from '../data/types'
import { learnedFraction, useProgress } from '../lib/progress'
import { chapterSkills } from '../lib/skills'
import { practiceCards } from '../lib/views'

/** Every practice screen in the chapter, each with how much of it is learned. On phones, the bottom bar's Practice tab. */
export function Practice({ chapter, go }: { chapter: Chapter; go: (v: View) => void }) {
  const { items } = useProgress()
  const skills = chapterSkills(chapter)
  return (
    <section className="practice">
      <p className="eyebrow">Chapter {chapter.number}</p>
      <h2 className="greek">{chapter.title}</h2>
      <div className="modes">
        {practiceCards(chapter).map((c) => {
          const ids = skills.filter((s) => s.view === c.view).flatMap((s) => s.items.map((i) => i.id))
          const tried = ids.some((id) => items[id])
          const pct = Math.round(learnedFraction(ids, items) * 100)
          return (
            <button key={c.view} className="mode" onClick={() => go(c.view)}>
              <span className="mode-glyph greek" aria-hidden="true">{c.glyph}</span>
              <span className="mode-text">
                <strong className={c.greekTitle ? 'greek' : ''}>{c.title}</strong>
                <span>{c.description}</span>
                {tried && (
                  <span className="mode-progress">
                    <span className="meter" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
                    {pct}% learned
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

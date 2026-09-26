import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { CHAPTERS } from '../data/chapters'
import type { Chapter } from '../data/types'
import { type ItemStats, dueAt, isDue, shuffle } from './progress'
import { type Skill, type SkillItem, chapterSkills } from './skills'

// The daily review: everything due from every chapter, topped up with a few new items from the current chapter.

export interface ReviewEntry {
  chapter: Chapter
  skill: Skill
  item: SkillItem
}

export interface ReviewPlan {
  /** Due items for this session, most urgent first. */
  due: ReviewEntry[]
  /** New (never tried) items from the current chapter, used only when there is room. */
  fresh: ReviewEntry[]
  /** Everything due right now, including what doesn't fit in one session. */
  totalDue: number
  /** When the next item falls due, if nothing is due now. */
  nextDue?: number
}

export const SESSION_SIZE = 20
export const NEW_PER_SESSION = 5

function allEntries(): ReviewEntry[] {
  return CHAPTERS.flatMap((chapter) => chapterSkills(chapter).flatMap((skill) => skill.items.map((item) => ({ chapter, skill, item }))))
}

export function reviewPlan(items: Record<string, ItemStats>, now: number, current: Chapter, size = SESSION_SIZE, newCount = NEW_PER_SESSION): ReviewPlan {
  const entries = allEntries()
  const tried = entries.filter((e) => items[e.item.id])
  const dueAll = tried
    .filter((e) => isDue(items[e.item.id], now))
    // Lowest box (shakiest) first, then the longest overdue.
    .sort((a, b) => items[a.item.id].box - items[b.item.id].box || dueAt(items[a.item.id]) - dueAt(items[b.item.id]))
  const due = dueAll.slice(0, size)
  const room = Math.max(0, Math.min(newCount, size - due.length))
  const fresh = entries.filter((e) => e.chapter.number === current.number && !items[e.item.id]).slice(0, room)
  const upcoming = tried.filter((e) => !isDue(items[e.item.id], now)).map((e) => dueAt(items[e.item.id]))
  return { due, fresh, totalDue: dueAll.length, nextDue: dueAll.length ? undefined : upcoming.length ? Math.min(...upcoming) : undefined }
}

/** Questions for a plan: due items in shuffled order, then the new ones; each labelled with where it comes from. */
export function reviewQuestions(plan: ReviewPlan): ChoiceQuestion[] {
  const label = (e: ReviewEntry, isNew: boolean) => (
    <p className="review-tag">
      {isNew && <span className="new-tag">new</span>}
      Ch {e.chapter.number} · {e.skill.label}
    </p>
  )
  const wrap = (e: ReviewEntry, isNew: boolean): ChoiceQuestion => {
    const q = e.item.make()
    return { ...q, prompt: <>{label(e, isNew)}{q.prompt}</> }
  }
  return [...shuffle(plan.due).map((e) => wrap(e, false)), ...plan.fresh.map((e) => wrap(e, true))]
}

/** "later today", "tomorrow" or "in N days". */
export function whenDue(t: number, now: number): string {
  const days = Math.round((t - now) / (24 * 60 * 60 * 1000))
  return days <= 0 ? 'later today' : days === 1 ? 'tomorrow' : `in ${days} days`
}

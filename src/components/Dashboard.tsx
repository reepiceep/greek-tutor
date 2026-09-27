import { useRef, useState } from 'react'
import type { View } from '../App'
import type { Chapter } from '../data/types'
import { formatTime, hasTest } from '../lib/chapterTest'
import {
  type ItemStats, currentStreak, exportProgress, importProgress, learnedFraction, resetProgress, updateSettings, useProgress,
} from '../lib/progress'
import { type Skill, chapterSkills, weakestItems } from '../lib/skills'
import { TOPIC_META } from '../lib/views'
import { AreaBars } from './ChapterTest'
import { CourseMap } from './CourseMap'
import { reviewPlan, whenDue } from '../lib/review'
import { useNow } from '../lib/useNow'

interface Card {
  view: View
  glyph: string
  title: string
  description: string
  greekTitle?: boolean
}

export function Dashboard({ chapter, go }: { chapter: Chapter; go: (v: View) => void }) {
  const { items, tests } = useProgress()
  const skills = chapterSkills(chapter)
  const weak = weakestItems(skills, items, 5)
  const chapterTests = tests.filter((t) => t.chapter === chapter.number)
  const latest = chapterTests.at(-1)
  const best = chapterTests.reduce((m, t) => Math.max(m, t.correct / t.total), 0)
  const allIds = skills.flatMap((s) => s.items.map((i) => i.id))
  const learnedPct = Math.round(learnedFraction(allIds, items) * 100)
  const started = allIds.some((id) => items[id])

  const cards: Card[] = [
    ...(chapter.vocab.length
      ? [
          { view: 'flashcards' as View, glyph: 'α', title: 'Flashcards', description: `Learn the ${chapter.vocab.length} new words` },
          { view: 'quiz' as View, glyph: 'λ', title: 'Vocab quiz', description: 'Multiple choice or typed, both directions' },
        ]
      : []),
    ...(chapter.topics ?? []).map((t): Card => ({
      view: t, glyph: TOPIC_META[t].glyph, title: TOPIC_META[t].title, description: TOPIC_META[t].description, greekTitle: true,
    })),
    ...(chapter.number >= 8
      ? [{ view: 'review' as View, glyph: 'Π', title: 'All prepositions', description: 'Review every preposition from chapters 6–14' }]
      : []),
  ]

  return (
    <section className="dashboard">
      <CourseMap current={chapter} />
      <div className="dash-hero">
        <p className="eyebrow">Chapter {chapter.number}</p>
        <h2 className="greek">{chapter.title}</h2>
        <p className="muted">
          {started ? <>{learnedPct}% of this chapter learned</> : <>{chapter.vocab.length ? 'Not started yet: begin with the flashcards' : 'Not started yet: begin with the lesson'}</>}
          {' · '}{chapter.vocab.length ? `${chapter.vocab.length} words · ` : 'no new vocabulary · '}{skills.length} skills
        </p>
      </div>

      <div className="dash-grid">
        <div className="dash-main">
          <TodayCard chapter={chapter} go={go} />
          {hasTest(chapter.number) && <div className={`readiness ${latest?.ready ? 'good' : ''}`}>
            {latest ? (
              <>
                <div className="readiness-head">
                  <div>
                    <strong>{latest.ready ? 'Ready for the next chapter' : 'Not ready yet'}</strong>
                    <div className="muted">
                      Last test {latest.correct}/{latest.total} in {formatTime(latest.seconds)}, {new Date(latest.date).toLocaleDateString()}
                      {chapterTests.length > 1 && <> · best {Math.round(best * 100)}% · {chapterTests.length} tests</>}
                    </div>
                  </div>
                  <button className="primary" onClick={() => go('test')}>Take the test</button>
                </div>
                <AreaBars result={latest} />
              </>
            ) : (
              <div className="readiness-head">
                <div>
                  <strong>Chapter test</strong>
                  <div className="muted">30 mixed questions. Score 90% in every area to be ready for chapter {chapter.number + 1}.</div>
                </div>
                <button className="primary" onClick={() => go('test')}>Take the test</button>
              </div>
            )}
          </div>}

          <h3>Practice</h3>
          <div className="modes">
            {cards.map((c) => (
              <button key={c.view} className="mode" onClick={() => go(c.view)}>
                <span className="mode-glyph greek" aria-hidden="true">{c.glyph}</span>
                <span className="mode-text">
                  <strong className={c.greekTitle ? 'greek' : ''}>{c.title}</strong>
                  <span>{c.description}</span>
                </span>
              </button>
            ))}
          </div>

          {weak.length > 0 && (
            <>
              <h3>Focus on these</h3>
              <p className="muted">What you’ve missed most and haven’t learned yet.</p>
              <div className="skills">
                {weak.map((w) => (
                  <button key={w.name + w.skill.label} className="skill weak" onClick={() => go(w.skill.view)}>
                    <span><span className="greek">{w.name}</span> <span className="muted">· {w.skill.label}</span></span>
                    <span className="pct">{w.stats.correct}/{w.stats.attempts}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="dash-side">
          <h3>Progress</h3>
          <p className="muted small">Learned = right twice in a row. A miss sends it back to the start.</p>
          <ProgressGroups skills={skills} items={items} go={go} />
        </aside>
      </div>

      <details className="settings-panel">
        <summary>Settings, typing help and backup</summary>
        <Settings />
        <TypingHelp />
        <Backup />
      </details>
    </section>
  )
}

/** The daily review at a glance: how much is due and the current streak. */
function TodayCard({ chapter, go }: { chapter: Chapter; go: (v: View) => void }) {
  const { items, daily } = useProgress()
  const now = useNow()
  const plan = reviewPlan(items, now, chapter)
  const streak = currentStreak(daily, now)
  const count = plan.due.length + plan.fresh.length
  return (
    <div className="today-card">
      <div>
        <strong>Today’s review</strong>
        <div className="muted">
          {plan.totalDue ? `${plan.totalDue} due` : 'Nothing due'}
          {plan.fresh.length > 0 && ` · ${plan.fresh.length} new`}
          {streak > 0 && ` · ★ ${streak}-day streak`}
          {!count && plan.nextDue && ` · next ${whenDue(plan.nextDue, now)}`}
        </div>
      </div>
      <button className={count ? 'primary' : ''} onClick={() => go('today')}>{count ? 'Start review' : 'Open'}</button>
    </div>
  )
}

/** Skills grouped by topic ("Prepositions: phrases" → Prepositions / phrases); untouched skills say "not started". */
function ProgressGroups({ skills, items, go }: { skills: Skill[]; items: Record<string, ItemStats>; go: (v: View) => void }) {
  const groups = new Map<string, Skill[]>()
  for (const s of skills) {
    const topic = s.label.split(':')[0]
    groups.set(topic, [...(groups.get(topic) ?? []), s])
  }
  return (
    <>
      {[...groups].map(([topic, list]) => (
        <div key={topic} className="progress-group">
          <h4>{topic}</h4>
          {list.map((s) => {
            const ids = s.items.map((i) => i.id)
            const tried = ids.filter((id) => items[id]).length
            const pct = Math.round(learnedFraction(ids, items) * 100)
            const name = s.label.split(':').slice(1).join(':').trim() || s.label
            return (
              <button key={s.label} className="progress-row" onClick={() => go(s.view)}
                title={tried ? `${Math.round((pct / 100) * ids.length)} of ${ids.length} learned · ${tried} tried` : `${ids.length} items`}>
                <span className="progress-name">{name}</span>
                {tried ? (
                  <>
                    <span className="meter"><span style={{ width: `${pct}%` }} /></span>
                    <span className="pct">{pct}%</span>
                  </>
                ) : (
                  <span className="not-started">not started</span>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </>
  )
}

function Settings() {
  const { settings } = useProgress()
  return (
    <>
      <h3>Settings</h3>
      <label className="check">
        <input type="checkbox" checked={settings.requireAccents}
          onChange={(e) => updateSettings({ requireAccents: e.target.checked })} />
        Require accents and breathing marks in typed Greek
      </label>
      <label className="check">
        Pronunciation
        <select value={settings.pronunciation} onChange={(e) => updateSettings({ pronunciation: e.target.value as 'mounce' | 'modern' })}>
          <option value="mounce">Erasmian (Mounce, as taught in BBG)</option>
          <option value="modern">Modern Greek</option>
        </select>
      </label>
      <label className="check">
        <input type="checkbox" checked={settings.autoplay}
          onChange={(e) => updateSettings({ autoplay: e.target.checked, autoplayChosen: true })} />
        Play the pronunciation automatically when a Greek word appears
      </label>
      <p className="muted small">Recordings are Bill Mounce’s, played from billmounce.com, so they need an internet connection.</p>
    </>
  )
}

function TypingHelp() {
  return (
    <>
      <h3>How to type Greek</h3>
      <p>Type Latin letters and they turn into Greek. Put marks <em>after</em> the letter.</p>
      <table className="translit">
        <tbody>
          <tr><td>a b g d e z h q</td><td className="greek">α β γ δ ε ζ η θ</td></tr>
          <tr><td>i k l m n c o p</td><td className="greek">ι κ λ μ ν ξ ο π</td></tr>
          <tr><td>r s t u f x y w</td><td className="greek">ρ σ τ υ φ χ ψ ω</td></tr>
          <tr><td>) ( / \ = |</td><td>smooth, rough, acute, grave, circumflex, iota subscript</td></tr>
          <tr><td>'</td><td>elision mark (<span className="greek">μετ᾽</span>)</td></tr>
        </tbody>
      </table>
      <p>Example: <code>h(me/ra</code> → <span className="greek">ἡμέρα</span>. Final sigma is automatic. There are also buttons under each Greek answer box.</p>
    </>
  )
}

/** Export progress to a JSON file, import it back (e.g. on another computer), or reset. */
function Backup() {
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `greek-tutor-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMessage({ ok: true, text: 'Progress exported.' })
  }

  const upload = async (file: File | undefined) => {
    if (!file) return
    try {
      const text = await file.text()
      if (!confirm('Replace your current progress with this file?')) return
      importProgress(text)
      setMessage({ ok: true, text: `Imported ${file.name}.` })
    } catch (e) {
      setMessage({ ok: false, text: e instanceof Error ? e.message : String(e) })
    } finally {
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  return (
    <>
      <h3>Backup</h3>
      <p className="muted">Progress is saved in this browser only. Export it to keep a copy or move it to another computer.</p>
      <div className="actions left">
        <button onClick={download}>Export progress</button>
        <button onClick={() => fileInput.current?.click()}>Import progress…</button>
        <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(e) => upload(e.target.files?.[0])} />
        <button className="link danger" onClick={() => { if (confirm('Erase all progress and test results?')) resetProgress() }}>
          Reset progress
        </button>
      </div>
      {message && <p className={message.ok ? 'ok-msg' : 'err-msg'}>{message.text}</p>}
    </>
  )
}

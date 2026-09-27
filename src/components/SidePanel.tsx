import type { ReactNode } from 'react'

/**
 * A drill with a side panel beside it on wide screens (hidden on narrower ones, where it would only push the
 * question down). The panel repeats nothing the drill needs: it's the round at a glance, what you've missed, and keys.
 */
export function DrillLayout({ aside, children }: { aside: ReactNode; children: ReactNode }) {
  return (
    <div className="drill">
      <div className="drill-main">{children}</div>
      <aside className="drill-side" aria-label="This round">{aside}</aside>
    </div>
  )
}

export type Mark = 'right' | 'wrong' | 'done' | 'todo'

/** Past this many, one dot per question gets too dense to read; show a bar instead. */
const MAX_PIPS = 40

/** The round so far: a dot per question (green right, red missed), then counts. */
export function RoundProgress({ marks, current, stats }: { marks: Mark[]; current?: number; stats: [number, string][] }) {
  const answered = marks.filter((m) => m !== 'todo').length
  return (
    <section className="side-block">
      <h3>This round</h3>
      {marks.length <= MAX_PIPS ? (
        <div className="round-pips" aria-hidden="true">
          {marks.map((m, i) => <span key={i} className={`round-pip ${m}${i === current ? ' current' : ''}`} />)}
        </div>
      ) : (
        <div className="progress-bar" aria-hidden="true"><div style={{ width: `${(answered / marks.length) * 100}%` }} /></div>
      )}
      <dl className="side-stats">
        {stats.map(([n, label]) => (
          <div key={label}><dt>{label}</dt><dd>{n}</dd></div>
        ))}
      </dl>
    </section>
  )
}

/** What's been missed this round, newest first. */
export function MissedList({ items }: { items: { key: string; node: ReactNode }[] }) {
  if (!items.length) return null
  const shown = items.slice(-5).reverse()
  return (
    <section className="side-block">
      <h3>Missed so far</h3>
      <ul className="side-missed">{shown.map((m) => <li key={m.key}>{m.node}</li>)}</ul>
      {items.length > shown.length && <p className="muted small">and {items.length - shown.length} more</p>}
    </section>
  )
}

/** Keyboard shortcuts, as [keys, what they do]; several keys for one action are alternatives. Not shown on touch screens. */
export function KeyHelp({ keys }: { keys: [string[], string][] }) {
  return (
    <section className="side-block pointer-only-block">
      <h3>Keys</h3>
      <dl className="side-keys">
        {keys.map(([ks, what]) => (
          <div key={what}><dt>{ks.map((k, i) => <span key={k}>{i > 0 && ' '}<kbd>{k}</kbd></span>)}</dt><dd>{what}</dd></div>
        ))}
      </dl>
    </section>
  )
}

import { type ReactNode, useState } from 'react'

export interface ReferenceCell {
  greek: ReactNode
  english: string
}

export interface ReferenceRow {
  label: string
  /** A heading row (e.g. “Plural”) drawn above this row. */
  section?: string
  cells: ReferenceCell[]
}

type Hide = 'none' | 'greek' | 'english'

/** A chart of forms with their English. Hide the Greek or the English to test yourself, then click a cell to check it. */
export function ReferenceChart({ columns, rows, className, greekHint = 'Greek' }: {
  columns: string[]
  rows: ReferenceRow[]
  className: string
  /** What to say when the Greek is hidden, e.g. “Greek (both forms where there are two)”. */
  greekHint?: string
}) {
  const [hide, setHide] = useState<Hide>('none')
  const [shown, setShown] = useState<Set<string>>(new Set())
  const keys = rows.flatMap((_, r) => columns.map((_c, c) => `${r}:${c}`))
  const toggle = (k: string) => setShown((s) => {
    const next = new Set(s)
    if (next.has(k)) next.delete(k)
    else next.add(k)
    return next
  })
  const choose = (h: Hide) => { setHide(h); setShown(new Set()) }
  const reveal = (k: string, content: ReactNode, hidden: boolean) =>
    !hidden ? content
      : shown.has(k)
        ? <button className="revealed" onClick={() => toggle(k)} title="Hide again">{content}</button>
        : <button className="reveal" onClick={() => toggle(k)}>show</button>

  return (
    <>
      <div className="reference-tools">
        <div className="hide-choice" role="group" aria-label="Hide">
          <span className="muted small">Hide</span>
          <div className="seg small-seg">
            <button className={hide === 'none' ? 'on' : ''} onClick={() => choose('none')}>Nothing</button>
            <button className={hide === 'greek' ? 'on' : ''} onClick={() => choose('greek')}>Greek</button>
            <button className={hide === 'english' ? 'on' : ''} onClick={() => choose('english')}>English</button>
          </div>
        </div>
        {hide !== 'none' && (
          <div className="seg small-seg">
            <button onClick={() => setShown(new Set(keys))} disabled={shown.size === keys.length}>Show all</button>
            <button onClick={() => setShown(new Set())} disabled={shown.size === 0}>Hide all</button>
          </div>
        )}
      </div>
      {hide !== 'none' && (
        <p className="muted small">Say the hidden {hide === 'greek' ? greekHint : 'meaning'}, then click to check it.</p>
      )}
      <table className={`paradigm compact ${className}`}>
        <thead><tr><th />{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, r) => (
            <RowGroup key={r} row={row} span={columns.length + 1}>
              {row.cells.map((cell, c) => {
                const k = `${r}:${c}`
                return (
                  <td key={c}>
                    {reveal(k, cell.greek, hide === 'greek')}
                    <div className="cell-gloss">{reveal(k, cell.english, hide === 'english')}</div>
                  </td>
                )
              })}
            </RowGroup>
          ))}
        </tbody>
      </table>
    </>
  )
}

function RowGroup({ row, span, children }: { row: ReferenceRow; span: number; children: ReactNode }) {
  return (
    <>
      {row.section && <tr className="section-row"><th colSpan={span}>{row.section}</th></tr>}
      <tr>
        <th>{row.label}</th>
        {children}
      </tr>
    </>
  )
}

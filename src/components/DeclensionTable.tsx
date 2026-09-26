import type { DeclensionParadigm, Gender } from '../data/types'
import { GENDERS, NOUN_CASES, NUMBERS, formAt, hasSlot } from '../lib/declensionQuestions'

const GENDER_HEAD: Record<Gender, string> = { masculine: 'masc', feminine: 'fem', neuter: 'neut' }

/** A paradigm chart showing only the genders and numbers the word has; identical masc/fem columns are merged. */
export function DeclensionTable({ p }: { p: DeclensionParadigm }) {
  const has = (g: Gender) => NUMBERS.some((n) => hasSlot(p, { gender: g, number: n, case: 'nominative' }))
  const mergeMF = has('masculine') && has('feminine') && JSON.stringify(p.forms.masculine) === JSON.stringify(p.forms.feminine)
  const genders = GENDERS.filter((g) => has(g) && !(mergeMF && g === 'feminine'))
  const numbers = NUMBERS.filter((n) => genders.some((g) => hasSlot(p, { gender: g, number: n, case: 'nominative' })))
  const single = genders.length === 1

  return (
    <div className="adj-table">
      <h3><span className="greek">{p.lexical}</span> <span className="muted small">{p.gloss} · {p.pattern}</span></h3>
      <table className="paradigm compact">
        {!single && (
          <thead>
            <tr><th />{genders.map((g) => <th key={g}>{mergeMF && g === 'masculine' ? 'masc/fem' : GENDER_HEAD[g]}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {numbers.flatMap((n) => NOUN_CASES.map((c) => (
            <tr key={`${n}-${c}`} className={c === 'nominative' && n === 'pl' ? 'group-start' : ''}>
              <th>{c.slice(0, 3)} {n}</th>
              {genders.map((g) => <td key={g} className="greek">{formAt(p, { case: c, number: n, gender: g })}</td>)}
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  )
}

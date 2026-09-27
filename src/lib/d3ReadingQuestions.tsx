import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import type { Chapter, D3Reading, DeclensionParadigm } from '../data/types'
import { parsingsOf, slotLabel, slotsOf, type Slot } from './declensionQuestions'
import { shuffle } from './progress'

// Chapter 10's workbook drills beyond the charts: parse a word inside a verse and translate the verse, and fill in the
// Master Case Ending Chart (Mounce 10.14).

export type D3ReadingSkill = 'parse' | 'head' | 'translate'

export const d3ReadingItemId = (ch: number, r: D3Reading, skill: D3ReadingSkill) => `ch${ch}:d3-reading:${r.id}:${skill}`

/** Parse, then which word it agrees with (only when the item names one), then translate. */
export const d3ReadingSkills = (r: D3Reading): D3ReadingSkill[] => ['parse', ...(r.head ? ['head' as const] : []), 'translate']

/** Every chart the chapter parses: the main ones and the collapsed extras. */
export const d3Paradigms = (ch: Chapter) => [...(ch.thirdDeclension?.paradigms ?? []), ...(ch.thirdDeclension?.more ?? [])]

export function d3ReadingParadigm(ch: Chapter, r: D3Reading): DeclensionParadigm {
  const p = d3Paradigms(ch).find((x) => x.id === r.paradigm)
  if (!p) throw new Error(`No chart ${r.paradigm} for ${r.id}`)
  return p
}

function verse(r: D3Reading) {
  const at = r.text.indexOf(r.word)
  return (
    <>
      <p className="sentence greek">{r.text.slice(0, at)}<mark>{r.word}</mark>{r.text.slice(at + r.word.length)}</p>
      <p className="muted small">{r.ref}{r.help && <> · <span className="greek">{r.help}</span></>}</p>
    </>
  )
}

function explain(r: D3Reading) {
  return (
    <>
      {r.note && <p>{r.note}</p>}
      <p className="english">“{r.translation}” ({r.ref})</p>
    </>
  )
}

const key = (s: Slot) => `${s.case}-${s.number}-${s.gender}`
const shared = (a: Slot, b: Slot) => Number(a.case === b.case) + Number(a.number === b.number) + Number(a.gender === b.gender)

/** Parse the word as it is used in this verse. Other parsings of the same form are never offered as wrong answers. */
export function d3ReadingParseQuestion(ch: Chapter, r: D3Reading): ChoiceQuestion {
  const p = d3ReadingParadigm(ch, r)
  const answer: Slot = { case: r.case, number: r.number, gender: r.gender }
  const valid = new Set(parsingsOf(p, r.form ?? r.word).map(key))
  const wrong = shuffle(slotsOf(p).filter((s) => !valid.has(key(s))))
    .sort((a, b) => shared(b, answer) - shared(a, answer))
    .slice(0, 3)
  const others = parsingsOf(p, r.form ?? r.word).filter((s) => key(s) !== key(answer))
  return {
    id: d3ReadingItemId(ch.number, r, 'parse'),
    prompt: <>{verse(r)}<p className="muted">Parse the highlighted word as it is used here (from <span className="greek">{p.lexical}</span>).</p></>,
    options: shuffle([answer, ...wrong]).map((s) => ({ key: key(s), label: slotLabel(s) })),
    answer: key(answer),
    explain: (
      <>
        <p>
          <span className="greek">{r.word}</span> is {slotLabel(answer)} here.
          {others.length > 0 && <> On its own it could also be {others.map(slotLabel).join(' or ')}; the sentence decides.</>}
        </p>
        {explain(r)}
      </>
    ),
    review: <><span className="greek">{r.word}</span> ({r.ref}) = {slotLabel(answer)}</>,
  }
}

export function d3ReadingHeadQuestion(ch: Chapter, r: D3Reading): ChoiceQuestion {
  const words = [...new Set(r.decoys ?? [])].filter((w) => w !== r.head).slice(0, 3)
  return {
    id: d3ReadingItemId(ch.number, r, 'head'),
    prompt: <>{verse(r)}<p className="muted">Which word does it agree with?</p></>,
    options: shuffle([r.head!, ...words]).map((w) => ({ key: w, label: w })),
    answer: r.head!,
    explain: explain(r),
    review: <><span className="greek">{r.word}</span> ({r.ref}) → <span className="greek">{r.head}</span></>,
  }
}

export function d3ReadingTranslateQuestion(ch: Chapter, r: D3Reading): ChoiceQuestion {
  return {
    id: d3ReadingItemId(ch.number, r, 'translate'),
    prompt: <>{verse(r)}<p className="muted">Translate the whole sentence.</p></>,
    options: shuffle([r.translation, ...r.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: r.translation,
    explain: explain(r),
    review: <><span className="greek">{r.text}</span> = “{r.translation}”</>,
  }
}

export function d3ReadingQuestion(ch: Chapter, r: D3Reading, skill: D3ReadingSkill): ChoiceQuestion {
  if (skill === 'parse') return d3ReadingParseQuestion(ch, r)
  if (skill === 'head') return d3ReadingHeadQuestion(ch, r)
  return d3ReadingTranslateQuestion(ch, r)
}

// --- Master Case Ending Chart ----------------------------------------------------------

export type MasterColumn = 'm2' | 'f1' | 'n2' | 'mf3' | 'n3'

export const MASTER_COLUMNS: { col: MasterColumn; label: string; group: string }[] = [
  { col: 'm2', label: 'masc', group: '1st/2nd' },
  { col: 'f1', label: 'fem', group: '1st/2nd' },
  { col: 'n2', label: 'neut', group: '1st/2nd' },
  { col: 'mf3', label: 'masc/fem', group: '3rd' },
  { col: 'n3', label: 'neut', group: '3rd' },
]

export const MASTER_ROWS = ['nom sg', 'gen sg', 'dat sg', 'acc sg', 'nom pl', 'gen pl', 'dat pl', 'acc pl'] as const
export type MasterRow = (typeof MASTER_ROWS)[number]

/** Mounce's Master Case Ending Chart (10.14): the true endings. "—" is no ending; the first spelling is shown. */
export const MASTER_TRUE: Record<MasterColumn, string[][]> = {
  m2: [['ς'], ['υ'], ['ι'], ['ν'], ['ι'], ['ων'], ['ις'], ['υς']],
  f1: [['—'], ['ς'], ['ι'], ['ν'], ['ι'], ['ων'], ['ις'], ['ς']],
  n2: [['ν'], ['υ'], ['ι'], ['ν'], ['α'], ['ων'], ['ις'], ['α']],
  mf3: [['ς', '—'], ['ος'], ['ι'], ['α', 'ν'], ['ες'], ['ων'], ['σι(ν)', 'σι', 'σιν'], ['ας']],
  n3: [['—'], ['ος'], ['ι'], ['—'], ['α'], ['ων'], ['σι(ν)', 'σι', 'σιν'], ['α']],
}

/** The same chart as the endings look after the stem vowel (ος, ου, ῳ, ον …): the version you will actually read. */
export const MASTER_STEM: Record<MasterColumn, string[][]> = {
  m2: [['ος'], ['ου'], ['ῳ'], ['ον'], ['οι'], ['ων'], ['οις'], ['ους']],
  f1: [['η', 'α'], ['ης', 'ας'], ['ῃ', 'ᾳ'], ['ην', 'αν'], ['αι'], ['ων'], ['αις'], ['ας']],
  n2: [['ον'], ['ου'], ['ῳ'], ['ον'], ['α'], ['ων'], ['οις'], ['α']],
  mf3: MASTER_TRUE.mf3,
  n3: MASTER_TRUE.n3,
}

export type MasterMode = 'true' | 'stem'
export const masterChart = (mode: MasterMode) => (mode === 'true' ? MASTER_TRUE : MASTER_STEM)

/** How a cell is shown: alternatives joined (α / ν), "—" for no ending. */
export const masterDisplay = (forms: string[]) => (forms[0] === 'σι(ν)' ? 'σι(ν)' : forms.join(' / '))

const NO_ENDING = new Set(['-', '—', '–'])

/** Does the typed ending match? A dash means "no ending" (a blank cell is never right); a cell with alternatives accepts either or both. */
export function checkEnding(input: string, forms: string[]): boolean {
  const given = input.normalize('NFC').replace(/\s+/g, '').replace(/^-(?=\S)/, '')
  if (forms.includes('—') && NO_ENDING.has(given)) return true
  if (forms.length > 1 && !forms.includes('σι(ν)') && given === forms.filter((f) => f !== '—').join('/')) return true
  return forms.some((f) => f !== '—' && f.normalize('NFC') === given)
}

export const masterItemId = (ch: number, mode: MasterMode, col: MasterColumn, row: MasterRow) => `ch${ch}:master:${mode}:${col}:${row}`

const COL_NAME: Record<MasterColumn, string> = {
  m2: '2nd declension masculine', f1: '1st declension feminine', n2: '2nd declension neuter',
  mf3: '3rd declension masculine/feminine', n3: '3rd declension neuter',
}

/** One cell of the chart as a choice question, for the daily review. */
export function masterCellQuestion(ch: Chapter, mode: MasterMode, col: MasterColumn, row: MasterRow): ChoiceQuestion {
  const chart = masterChart(mode)
  const answer = masterDisplay(chart[col][MASTER_ROWS.indexOf(row)])
  const pool = [...new Set(Object.values(chart).flatMap((c) => c.map(masterDisplay)))].filter((d) => d !== answer)
  return {
    id: masterItemId(ch.number, mode, col, row),
    prompt: (
      <>
        <span className="big">{row}</span>
        <p className="muted">{COL_NAME[col]}: which {mode === 'true' ? 'case ending' : 'ending (with the stem vowel)'}?</p>
      </>
    ),
    options: shuffle([answer, ...shuffle(pool).slice(0, 3)]).map((d) => ({ key: d, label: d, greek: true })),
    answer,
    explain: <p>The {COL_NAME[col]} {row} ending is <span className="greek">{answer}</span> (“—” means no ending).</p>,
    review: <>{COL_NAME[col]} {row}: <span className="greek">{answer}</span></>,
  }
}

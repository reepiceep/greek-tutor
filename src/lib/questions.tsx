import type { Chapter, ElisionItem, Paradigm, ParadigmRow, PrepPhrase, PrepSentence, SpatialUse, VocabWord } from '../data/types'
import { CaseTag } from '../components/CaseTag'
import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { SpatialIcon } from '../components/SpatialIcon'
import { WordDetails } from '../components/WordDetails'
import { AudioButton } from '../components/AudioButton'
import {
  type Direction, displayForm, elidedFormItemId, elisionItemId, paradigmItemId, phraseItemId, prepItemId, sentenceItemId, spatialItemId,
  vocabDistractors, vocabItemId,
} from './items'
import { CASES, CASE_ABBR, type CaseUse, findUse, meaningDistractors, phraseDistractors, phraseTranslation, prepWord } from './prepositions'
import { shuffle } from './progress'

// Builders for every multiple-choice question type, shared by the practice drills and the chapter test.

export function vocabQuestion(ch: Chapter, word: VocabWord, dir: Direction): ChoiceQuestion {
  const label = (w: VocabWord) => (dir === 'g2e' ? w.gloss : displayForm(w))
  return {
    id: vocabItemId(ch.number, word, dir),
    prompt: dir === 'g2e'
      ? <><span className="word-head"><span className="greek big">{displayForm(word)}</span><AudioButton lemma={word.lemma} autoPlay /></span><p className="muted">What does it mean?</p></>
      : <><span className="big">{word.gloss}</span><p className="muted">Which Greek word?</p></>,
    options: shuffle([word, ...vocabDistractors(ch, word, 3)]).map((w) => ({ key: w.id, label: label(w), greek: dir === 'e2g' })),
    answer: word.id,
    explain: <WordDetails word={word} autoPlay={dir === 'e2g'} />,
    review: <><span className="greek">{displayForm(word)}</span> — {word.gloss}</>,
  }
}

const rowForm = (r: ParadigmRow) => r.display ?? r.forms[0]

/** See a form, pick person and number. `form` lets ἐστί and ἐστίν both be asked. */
export function paradigmIdentifyQuestion(ch: Chapter, p: Paradigm, row: ParadigmRow, form = row.forms[0]): ChoiceQuestion {
  return {
    id: paradigmItemId(ch.number, p.id, row, 'identify'),
    prompt: <><span className="greek big">{form}</span><p className="muted">Person and number?</p></>,
    options: p.rows.map((r) => ({ key: r.key, label: <>{r.label} <span className="muted">“{r.gloss}”</span></> })),
    answer: row.key,
    explain: <p><span className="greek">{form}</span> is {row.label}: “{row.gloss}”.</p>,
    review: <><span className="greek">{form}</span> = {row.label} “{row.gloss}”</>,
  }
}

/** See the English, pick the Greek form. */
export function paradigmProduceQuestion(ch: Chapter, p: Paradigm, row: ParadigmRow): ChoiceQuestion {
  const others = shuffle(p.rows.filter((r) => r !== row)).slice(0, 3)
  return {
    id: paradigmItemId(ch.number, p.id, row, 'produce'),
    prompt: <><span className="big">“{row.gloss}”</span><p className="muted">Which form of <span className="greek">{p.rows[0].forms[0]}</span>?</p></>,
    options: shuffle([row, ...others]).map((r) => ({ key: r.key, label: rowForm(r), greek: true })),
    answer: row.key,
    explain: <p>{row.label}: <span className="greek">{rowForm(row)}</span></p>,
    review: <>“{row.gloss}” = <span className="greek">{rowForm(row)}</span></>,
  }
}

export function prepMeaningQuestion(ch: Chapter, use: CaseUse): ChoiceQuestion {
  const options = shuffle([use, ...meaningDistractors(ch, use, 3)])
  return {
    id: prepItemId(ch.number, use.word.id, use.case, 'meaning'),
    prompt: <><span className="greek big">{use.word.lemma}</span> <span className="plus">+</span> <CaseTag c={use.case} /><p className="muted">What does it mean?</p></>,
    options: options.map((o) => ({ key: `${o.word.id}:${o.case}`, label: o.gloss })),
    answer: `${use.word.id}:${use.case}`,
    explain: <WordDetails word={use.word} />,
    review: <><span className="greek">{use.word.lemma}</span> + {use.case}: {use.gloss}</>,
  }
}

export function prepCaseQuestion(ch: Chapter, use: CaseUse): ChoiceQuestion {
  return {
    id: prepItemId(ch.number, use.word.id, use.case, 'case'),
    prompt: <><span className="greek big">{use.word.lemma}</span><p>Which case follows it when it means <strong>“{use.gloss}”</strong>?</p></>,
    options: CASES.map((c) => ({ key: c, label: <><CaseTag c={c} /> {c}</> })),
    answer: use.case,
    explain: <WordDetails word={use.word} />,
    review: <><span className="greek">{use.word.lemma}</span> “{use.gloss}” takes the {use.case}</>,
  }
}

export function phraseQuestion(ch: Chapter, p: PrepPhrase): ChoiceQuestion {
  const use = findUse(ch, p.prep, p.case)
  const answer = phraseTranslation(p)
  const object = p.greek.split(' ').slice(1).join(' ')
  return {
    id: phraseItemId(ch.number, p),
    prompt: <><span className="greek big">{p.greek}</span><p className="muted">Translate the phrase</p></>,
    options: shuffle([answer, ...phraseDistractors(ch, p, 3)]).map((t) => ({ key: t, label: t })),
    answer,
    explain: (
      <p>
        <span className="greek">{object}</span> is {p.case} {p.number === 'sg' ? 'singular' : 'plural'}, so{' '}
        <span className="greek">{use.word.lemma}</span> + <CaseTag c={p.case} /> = “{use.gloss}”.
      </p>
    ),
    review: <><span className="greek">{p.greek}</span>: {answer}</>,
  }
}

export const spatialLabel = (ch: Chapter, s: SpatialUse) => `${prepWord(ch, s.prep).lemma} + ${CASE_ABBR[s.case]}`

export function spatialQuestion(ch: Chapter, s: SpatialUse): ChoiceQuestion {
  const uses = shuffle([s, ...shuffle((ch.spatial ?? []).filter((o) => o !== s)).slice(0, 5)])
  return {
    id: spatialItemId(ch.number, s),
    prompt: <><SpatialIcon shape={s.shape} size={240} label="Which preposition is this?" /><p className="muted">The box is the object. Which preposition + case is this?</p></>,
    options: uses.map((o) => ({ key: `${o.prep}:${o.case}`, label: spatialLabel(ch, o), greek: true })),
    answer: `${s.prep}:${s.case}`,
    explain: <p><span className="greek">{spatialLabel(ch, s)}</span>: {s.gloss}</p>,
    review: <><span className="greek">{spatialLabel(ch, s)}</span>: {s.gloss}</>,
  }
}

export function elisionQuestion(ch: Chapter, e: ElisionItem): ChoiceQuestion {
  const lemma = prepWord(ch, e.prep).lemma
  return {
    id: elisionItemId(ch.number, e),
    prompt: <><span className="greek big">{lemma} + {e.next}</span><p className="muted">({e.next} = “{e.nextGloss}”) How is it written?</p></>,
    options: shuffle(e.options).map((o) => ({ key: o, label: o, greek: true })),
    answer: e.options[0],
    explain: <p>{e.rule}</p>,
    review: <span className="greek">{lemma} + {e.next} → {e.options[0]}</span>,
  }
}

export function elidedFormQuestion(ch: Chapter, form: string, word: VocabWord): ChoiceQuestion {
  const preps = ch.vocab.filter((w) => w.pos === 'preposition' && w !== word)
  const when = /[φθ]᾽$/.test(form) ? 'before rough breathing' : 'before a vowel'
  return {
    id: elidedFormItemId(ch.number, form),
    prompt: <><span className="greek big">{form}</span><p className="muted">Which preposition is this?</p></>,
    options: shuffle([word, ...shuffle(preps).slice(0, 3)]).map((p) => ({ key: p.id, label: p.lemma, greek: true })),
    answer: word.id,
    explain: <p><span className="greek">{form}</span> is <span className="greek">{word.lemma}</span> written {when}.</p>,
    review: <span className="greek">{form} = {word.lemma}</span>,
  }
}

const capitalize = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

/** A real sentence with its preposition phrase highlighted; choose the English that fills the blank. */
export function sentenceQuestion(ch: Chapter, s: PrepSentence): ChoiceQuestion {
  const use = findUse(ch, s.prep, s.case)
  const answer = phraseTranslation(s)
  const at = s.text.indexOf(s.phrase)
  const object = s.phrase.split(' ').slice(1).join(' ')
  return {
    id: sentenceItemId(ch.number, s),
    prompt: (
      <>
        <p className="sentence greek">
          {s.text.slice(0, at)}<mark>{s.phrase}</mark>{s.text.slice(at + s.phrase.length)}
        </p>
        <p className="muted small">{s.ref}</p>
        <p className="english">{s.english.replace('{}', '_____')}</p>
      </>
    ),
    options: shuffle([answer, ...phraseDistractors(ch, s, 3)]).map((t) => ({ key: t, label: t })),
    answer,
    explain: (
      <>
        <p className="english">“{capitalize(s.english.replace('{}', answer))}” ({s.ref})</p>
        <p>
          <span className="greek">{object}</span> is {s.case}, so <span className="greek">{use.word.lemma}</span> +{' '}
          <CaseTag c={s.case} /> = “{use.gloss}”.
        </p>
        {s.note && <p>{s.note}</p>}
      </>
    ),
    review: <><span className="greek">{s.phrase}</span> ({s.ref}): {answer}</>,
  }
}

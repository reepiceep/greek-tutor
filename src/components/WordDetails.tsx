import type { VocabWord } from '../data/types'
import { AudioButton } from './AudioButton'

const CASE_ABBR = { genitive: 'gen', dative: 'dat', accusative: 'acc' } as const

interface Props {
  word: VocabWord
  /** Show the pronunciation button (off inside elements that are themselves buttons, like a flashcard). */
  audio?: boolean
  autoPlay?: boolean
}

/** Full answer for a word: lexical form, elided forms, and meaning (per case for prepositions). */
export function WordDetails({ word, audio = true, autoPlay = false }: Props) {
  return (
    <div className="word-details">
      <div className="word-head">
        <span className="greek big">{word.lexical ?? word.lemma}</span>
        {audio && <AudioButton lemma={word.lemma} autoPlay={autoPlay} />}
      </div>
      {word.forms && <div className="greek muted">also {word.forms.join(', ')}</div>}
      {word.cases ? (
        <ul className="cases">
          {word.cases.map((c) => (
            <li key={c.case}><span className={`case-tag ${c.case}`}>{CASE_ABBR[c.case]}</span> {c.gloss}</li>
          ))}
        </ul>
      ) : (
        <div className="gloss">{word.gloss}</div>
      )}
      {word.hook && <p className="word-hook"><span className="hook-label">Remember</span>{word.hook}</p>}
    </div>
  )
}

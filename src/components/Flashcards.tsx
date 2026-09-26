import { useEffect, useState } from 'react'
import type { Chapter, VocabWord } from '../data/types'
import { type Direction, displayForm, prepItemId, vocabItemId } from '../lib/items'
import { pickWeakest, record, updateSettings, useProgress } from '../lib/progress'
import { type CaseUse, caseUses, firstLetterHint } from '../lib/prepositions'
import { caseUseLabel } from '../lib/prepGames'
import { CaseTag } from './CaseTag'
import { WordDetails } from './WordDetails'
import { AudioButton } from './AudioButton'
import { Celebration } from './Celebration'
import { ChapterRange } from './ChapterRange'
import { type Range, chaptersIn, vocabPool } from '../lib/vocabQuiz'
import { playWord, recordingFor } from '../lib/audio'

interface Card {
  word: VocabWord
  /** The chapter the word is from: its progress counts there. */
  chapter: number
  dir: Direction
  /** Set when a preposition is split into one card per case. */
  use?: CaseUse
}

type DirChoice = Direction | 'mixed'

/**
 * Progress id for a card. Split preposition cards share the preposition drills' items:
 * Greek → English is "what does μετά + gen mean?", English → Greek is "which preposition + case means 'with'?".
 */
function cardId(c: Card): string {
  return c.use
    ? prepItemId(c.chapter, c.word.id, c.use.case, c.dir === 'g2e' ? 'meaning' : 'case')
    : vocabItemId(c.chapter, c.word, c.dir)
}

/** Cards in one session when studying several chapters: the weakest first. */
const RANGE_DECK = 30

function buildDeck(chapters: Chapter[], choice: DirChoice, split: boolean): Card[] {
  const uses = chapters.flatMap(caseUses)
  const cards = vocabPool(chapters).flatMap(({ word, chapter }) => {
    const dirs = choice === 'mixed' ? (['g2e', 'e2g'] as const) : [choice]
    const wordUses = split && word.pos === 'preposition' ? uses.filter((u) => u.word.id === word.id) : []
    return wordUses.length
      ? wordUses.flatMap((use) => dirs.map((dir) => ({ word, chapter, dir, use })))
      : dirs.map((dir) => ({ word, chapter, dir }))
  })
  const size = chapters.length > 1 ? RANGE_DECK : choice === 'mixed' ? 20 : cards.length
  return pickWeakest(cards, cardId, size)
}

/** The back of a single preposition + case card: that case's meaning, with the other cases for comparison. */
function CaseCardBack({ word, use }: { word: VocabWord; use: CaseUse }) {
  const others = (word.cases ?? []).filter((c) => c.case !== use.case)
  return (
    <div className="word-details">
      <div className="word-head"><span className="greek big">{word.lemma}</span> <span className="plus">+</span> <CaseTag c={use.case} /></div>
      <div className="gloss">{use.gloss}</div>
      {others.length > 0 && (
        <div className="muted small">
          Compare: {others.map((o, i) => <span key={o.case}>{i > 0 && ' · '}<CaseTag c={o.case} /> {o.gloss}</span>)}
        </div>
      )}
      {word.hook && <p className="word-hook"><span className="hook-label">Remember</span>{word.hook}</p>}
    </div>
  )
}

export function Flashcards({ chapter }: { chapter: Chapter }) {
  const { settings } = useProgress()
  const [choice, setChoice] = useState<DirChoice>('g2e')
  const [range, setRange] = useState<Range>([chapter.number, chapter.number])
  const chapters = chaptersIn(range)
  const multiChapter = chapters.length > 1
  const split = !!settings.splitPrepositions
  const allUses = chapters.flatMap(caseUses)
  const hasPrepositions = allUses.length > 0
  const [deck, setDeck] = useState<Card[]>(() => buildDeck([chapter], 'g2e', split))
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [missed, setMissed] = useState<{ key: string; greek: string; gloss: string }[]>([])

  const restart = (c: DirChoice, splitCards = split, r = range) => {
    setChoice(c)
    setRange(r)
    setDeck(buildDeck(chaptersIn(r), c, splitCards))
    setFlipped(false)
    setKnown(0)
    setMissed([])
  }

  const card = deck[0]

  const grade = (gotIt: boolean) => {
    record(cardId(card), gotIt)
    setFlipped(false)
    if (gotIt) {
      setKnown((k) => k + 1)
      setDeck((d) => d.slice(1))
    } else {
      const key = card.use ? `${card.word.id}:${card.use.case}` : card.word.id
      const greek = card.use ? caseUseLabel(card.use) : card.word.lemma
      const gloss = card.use ? card.use.gloss : card.word.gloss
      setMissed((m) => (m.some((x) => x.key === key) ? m : [...m, { key, greek, gloss }]))
      // Missed cards come back at the end of the deck until you know them.
      setDeck((d) => [...d.slice(1), d[0]])
    }
  }

  // The Greek is on screen: the front of a Greek → English card, or any card once flipped.
  const greekVisible = !!card && (card.dir === 'g2e' || flipped)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!card) return
      if (e.key === 'p' && greekVisible) {
        playWord(card.word.lemma, settings.pronunciation).catch(() => {})
      } else if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      } else if (flipped && (e.key === 'ArrowRight' || e.key === 'k')) grade(true)
      else if (flipped && (e.key === 'ArrowLeft' || e.key === 'j')) grade(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <section>
      <div className="toolbar">
        <h2>Flashcards</h2>
        <div className="seg">
          {(['g2e', 'e2g', 'mixed'] as const).map((c) => (
            <button key={c} className={choice === c ? 'on' : ''} onClick={() => restart(c)}>
              {c === 'g2e' ? 'Greek → English' : c === 'e2g' ? 'English → Greek' : 'Mixed'}
            </button>
          ))}
        </div>
      </div>
      <div className="deck-range">
        <span className="muted small">Chapters</span>
        <ChapterRange chapter={chapter} range={range} onChange={(r) => restart(choice, split, r)} />
        <span className="muted small">
          {vocabPool(chapters).length} words{multiChapter && ` · ${RANGE_DECK} cards a round, the ones you know least first`}
        </span>
      </div>
      {hasPrepositions && (
        <label className="check split-toggle">
          <input type="checkbox" checked={split} onChange={(e) => {
            updateSettings({ splitPrepositions: e.target.checked })
            restart(choice, e.target.checked)
          }} />
          Prepositions: one card per case (<span className="greek">μετά</span> + gen, <span className="greek">μετά</span> + acc)
        </label>
      )}

      {card ? (
        <>
          <p className="muted">
            {known} known · {deck.length} to go
            {multiChapter && <span className="review-tag"> · Ch {card.chapter}</span>}
          </p>
          <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
            {!flipped ? (
              card.use
                ? card.dir === 'g2e'
                  ? <span><span className="greek big">{card.word.lemma}</span> <span className="plus">+</span> <CaseTag c={card.use.case} /></span>
                  : (
                    <span className="case-front">
                      <span className="big">{card.use.gloss}</span>
                      <span className="muted">with the <CaseTag c={card.use.case} /></span>
                      {firstLetterHint(card.use, allUses) && (
                        <span className="muted small">starts with <span className="greek">{firstLetterHint(card.use, allUses)}…</span></span>
                      )}
                    </span>
                  )
                : card.dir === 'g2e'
                  ? <span className="greek big">{displayForm(card.word)}</span>
                  : <span className="big">{card.word.gloss}</span>
            ) : card.use ? (
              <CaseCardBack word={card.word} use={card.use} />
            ) : (
              <WordDetails word={card.word} audio={false} />
            )}
          </button>
          {greekVisible && recordingFor(card.word.lemma) && (
            <div className="card-audio">
              <AudioButton key={`${card.word.id}-${card.use?.case ?? ''}-${card.dir}`} lemma={card.word.lemma} autoPlay />
              <span className="muted small">Hear it <kbd>P</kbd></span>
            </div>
          )}
          {flipped ? (
            <div className="actions">
              <button className="bad" onClick={() => grade(false)}>Missed it <kbd>←</kbd></button>
              <button className="good" onClick={() => grade(true)}>Got it <kbd>→</kbd></button>
            </div>
          ) : (
            <p className="muted center">Click the card or press <kbd>space</kbd> to flip</p>
          )}
        </>
      ) : (
        <div className="done">
          <h3>Deck complete</h3>
          {missed.length > 0 ? (
            <>
              <p>Words to keep reviewing:</p>
              <ul className="word-list">
                {missed.map((w) => <li key={w.key}><span className="greek">{w.greek}</span> — {w.gloss}</li>)}
              </ul>
            </>
          ) : <><Celebration /><p>You knew every card on the first try.</p></>}
          <button onClick={() => restart(choice)}>Go again</button>
        </div>
      )}
    </section>
  )
}

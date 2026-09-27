import { useEffect, useRef, useState } from 'react'
import { READINGS } from '../data/readings'
import type { Chapter, Reading, ReadingWord } from '../data/types'
import { recordingFor } from '../lib/audio'
import { updateSettings, useProgress } from '../lib/progress'
import {
  GRAMMAR_TOPIC, courseWord, describeParse, gloss, grammarChapter, isName, partOfSpeech, passageStats,
} from '../lib/reader'
import { AudioButton } from './AudioButton'

/** Read New Testament passages; tap a word for its meaning and parsing. */
export function Reader({ chapter }: { chapter: Chapter }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const reading = READINGS.find((r) => r.id === openId)
  return reading
    ? <Passage key={reading.id} reading={reading} chapter={chapter} onBack={() => setOpenId(null)} />
    : <PassageList chapter={chapter} onOpen={setOpenId} />
}

function PassageList({ chapter, onOpen }: { chapter: Chapter; onOpen: (id: string) => void }) {
  const { settings } = useProgress()
  const read = new Set(settings.readPassages ?? [])
  // Most readable now first: the most words learned and forms covered.
  const list = READINGS.map((r) => ({ r, stats: passageStats(r, chapter.number) }))
    .sort((a, b) => b.stats.readable - a.stats.readable)

  return (
    <section className="reader">
      <div className="toolbar"><h2>Read the New Testament</h2></div>
      <p className="muted reader-intro">
        Passages from the Greek New Testament, the most readable at chapter {chapter.number} first. Tap any word for its
        meaning and parsing; words you haven’t learned yet are underlined.
      </p>
      <div className="reading-list">
        {list.map(({ r, stats }) => {
          const wordsPct = Math.round((stats.known / stats.words) * 100)
          const formsPct = Math.round((stats.forms / stats.total) * 100)
          return (
            <button key={r.id} className="reading-card" onClick={() => onOpen(r.id)}>
              <span className="reading-head">
                <strong>{r.title}</strong>
                {read.has(r.id) && <span className="reading-read" aria-label="read">✓</span>}
              </span>
              <span className="muted">{r.ref} · {stats.words} words</span>
              <span className="reading-meta">
                <span className="reading-known">
                  <span className="meter" aria-hidden="true"><span style={{ width: `${wordsPct}%` }} /></span>
                  {wordsPct}% of words learned
                </span>
                <span className="reading-known">
                  <span className="meter" aria-hidden="true"><span style={{ width: `${formsPct}%` }} /></span>
                  {formsPct === 100 ? 'every form covered' : `${formsPct}% of forms covered (all by ch ${stats.grammar})`}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <Credits />
    </section>
  )
}

// Punctuation before and after a word; the elision mark ’ is part of the word (δι’).
const SPLIT = /^([(—]*)(.*?)([,.·;:)—]*)$/u

function Passage({ reading, chapter, onBack }: { reading: Reading; chapter: Chapter; onBack: () => void }) {
  const { settings } = useProgress()
  const [markNew, setMarkNew] = useState(true)
  const words = reading.verses.flatMap((v) => v.words)
  // Index into `words` of the word being looked at.
  const [selected, setSelected] = useState<number | null>(null)
  // The passage is one Tab stop: only this word is in the tab order (the last one focused, or the one selected), and
  // the arrow keys move from word to word.
  const [cursor, setCursor] = useState(0)
  const tabStop = selected ?? cursor
  const text = useRef<HTMLDivElement>(null)
  const read = (settings.readPassages ?? []).includes(reading.id)
  const stats = passageStats(reading, chapter.number)

  // Arrow keys step through the words; Escape closes the word card.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || (e.target as HTMLElement | null)?.closest?.('input, textarea')) return
      const inText = !!text.current?.contains(document.activeElement)
      if (e.key === 'Escape') setSelected(null)
      // With nothing selected, step from the focused word (or from the start or end of the passage).
      else if (e.key === 'ArrowRight') setSelected((s) => Math.min((s ?? (inText ? cursor : -1)) + 1, words.length - 1))
      else if (e.key === 'ArrowLeft') setSelected((s) => Math.max((s ?? (inText ? cursor : words.length)) - 1, 0))
      else if (e.key === 'Home' && inText) setSelected(0)
      else if (e.key === 'End' && inText) setSelected(words.length - 1)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [words.length, cursor])

  // When the keyboard moves the selection while focus is in the text, focus follows it.
  useEffect(() => {
    if (selected === null || !text.current?.contains(document.activeElement)) return
    text.current.querySelector<HTMLElement>(`[data-i="${selected}"]`)?.focus()
  }, [selected])

  // Where each verse's words start in `words`.
  const starts = reading.verses.map((_, n) => reading.verses.slice(0, n).reduce((sum, v) => sum + v.words.length, 0))
  return (
    <section className={`reader passage${selected !== null ? ' has-card' : ''}`}>
      <button className="link reader-back" onClick={onBack}>← All passages</button>
      <div className="toolbar">
        <div>
          <h2>{reading.title}</h2>
          <p className="muted reader-ref">
            {reading.ref} · {stats.forms === stats.total ? 'every form covered by now' : `every form covered by chapter ${stats.grammar}`}
          </p>
        </div>
        <label className="check">
          <input type="checkbox" checked={markNew} onChange={(e) => setMarkNew(e.target.checked)} />
          <span>Underline words not learned yet</span>
        </label>
      </div>

      <div className="reader-layout">
        <div ref={text} className="reading-text greek" lang="el" role="group"
          aria-label="Passage text. Use the arrow keys to move from word to word, Enter to look one up.">
          {reading.verses.map((v, vi) => (
            <span key={v.n} className="verse">
              <sup className="verse-num">{v.n}</sup>
              {v.words.map((w, wi) => {
                const index = starts[vi] + wi
                const [, before, core, after] = w[0].match(SPLIT) ?? ['', '', w[0], '']
                const learned = isName(w) || (courseWord(w[1])?.chapter ?? Infinity) <= chapter.number
                return (
                  <span key={index}>
                    {before}
                    <button type="button" className={`rw${selected === index ? ' on' : ''}${markNew && !learned ? ' new' : ''}`}
                      data-i={index} tabIndex={index === tabStop ? 0 : -1} onFocus={() => setCursor(index)}
                      aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)}>
                      {core}
                    </button>
                    {after}{' '}
                  </span>
                )
              })}
            </span>
          ))}
        </div>
        <aside className="word-card" aria-live="polite">
          {selected === null
            ? <p className="muted">Tap a word to see its meaning and parsing. <span className="pointer-only">The arrow keys step through the words.</span></p>
            : <WordCard word={words[selected]} chapter={chapter.number} onClose={() => setSelected(null)} />}
        </aside>
      </div>

      <div className="actions">
        <button className={read ? '' : 'primary'} onClick={() => {
          const rest = (settings.readPassages ?? []).filter((id) => id !== reading.id)
          updateSettings({ readPassages: read ? rest : [...rest, reading.id] })
        }}>
          {read ? 'Read ✓ (undo)' : 'Mark as read'}
        </button>
        <button onClick={onBack}>All passages</button>
      </div>
      <Credits />
    </section>
  )
}

function WordCard({ word, chapter, onClose }: { word: ReadingWord; chapter: number; onClose: () => void }) {
  const [text, lemma, pos, parse] = word
  const [, , core] = text.match(SPLIT) ?? ['', '', text]
  const course = courseWord(lemma)
  const parsing = describeParse(pos, parse)
  const grammar = grammarChapter(word)
  return (
    <div className="word-card-body">
      <button className="sheet-close word-card-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="word-card-form greek">{core}</div>
      <div className="word-card-lemma">
        <span className="greek">{course?.word.lexical ?? lemma}</span>
        {recordingFor(lemma) && <AudioButton key={lemma} lemma={lemma} />}
      </div>
      <div className="word-card-gloss">{gloss(lemma)}</div>
      <p className="word-card-parse">{partOfSpeech(pos)}{parsing && <>: {parsing}</>}</p>
      <ul className="word-card-notes muted">
        <li>
          {isName(word) ? 'A name.' : course
            ? <>Course vocabulary, chapter {course.chapter}{course.chapter > chapter ? ' (not reached yet)' : ''}.</>
            : 'Not in the course vocabulary.'}
        </li>
        {grammar > 4 && (
          <li>This form: chapter {grammar}, {GRAMMAR_TOPIC[grammar]}{grammar > chapter ? ' (ahead of you)' : ''}.</li>
        )}
      </ul>
    </div>
  )
}

function Credits() {
  return (
    <p className="muted small reader-credits">
      Greek text: SBL Greek New Testament (CC BY 4.0). Parsing: MorphGNT (CC BY-SA 3.0). Glosses for words outside the
      course: Dodson’s Greek lexicon (public domain).
    </p>
  )
}

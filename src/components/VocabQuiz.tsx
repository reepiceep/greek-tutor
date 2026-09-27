import { useEffect, useState } from 'react'
import type { Chapter, VocabWord } from '../data/types'
import { checkEnglish, checkGreek } from '../lib/greek'
import { type Direction, displayForm, greekAnswersFor, vocabItemId } from '../lib/items'
import { record, useProgress } from '../lib/progress'
import { type Question, type Range, buildQuiz, chaptersIn, vocabPool } from '../lib/vocabQuiz'
import { ChapterRange } from './ChapterRange'
import { GreekInput } from './GreekInput'
import { WordDetails } from './WordDetails'
import { AudioButton } from './AudioButton'
import { Celebration } from './Celebration'

type Format = 'choice' | 'typed'

interface Answer {
  q: Question
  correct: boolean
  given: string
}

export function VocabQuiz({ chapter }: { chapter: Chapter }) {
  const { settings } = useProgress()
  const [dir, setDir] = useState<Direction>('g2e')
  const [format, setFormat] = useState<Format>('choice')
  const [length, setLength] = useState(10)
  const [range, setRange] = useState<Range>([chapter.number, chapter.number])
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [poolVocab, setPoolVocab] = useState<VocabWord[]>([])
  const inRange = chaptersIn(range)
  const multiChapter = range[0] !== range[1]
  const [answers, setAnswers] = useState<Answer[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState<Answer | null>(null)

  const start = () => {
    setQuestions(buildQuiz(inRange, dir, length))
    setPoolVocab(vocabPool(inRange).map((e) => e.word))
    setAnswers([])
    setInput('')
    setPending(null)
  }

  if (!questions) {
    return (
      <section>
        <h2>Vocabulary quiz</h2>
        <div className="setup">
          <label>Direction
            <div className="seg">
              <button className={dir === 'g2e' ? 'on' : ''} onClick={() => setDir('g2e')}>Greek → English</button>
              <button className={dir === 'e2g' ? 'on' : ''} onClick={() => setDir('e2g')}>English → Greek</button>
            </div>
          </label>
          <label>Answer by
            <div className="seg">
              <button className={format === 'choice' ? 'on' : ''} onClick={() => setFormat('choice')}>Multiple choice</button>
              <button className={format === 'typed' ? 'on' : ''} onClick={() => setFormat('typed')}>Typing</button>
            </div>
          </label>
          <label>Chapters
            <ChapterRange chapter={chapter} range={range} onChange={setRange} />
            <span className="muted small">{vocabPool(inRange).length} words</span>
          </label>
          <label>Questions
            <div className="seg">
              {[10, 20, 50, Infinity].map((n) => (
                <button key={n} className={length === n ? 'on' : ''} onClick={() => setLength(n)}>
                  {n === Infinity ? `${vocabPool(inRange).length} (all)` : n}
                </button>
              ))}
            </div>
          </label>
          <p className="muted">Words you know least well are asked first.</p>
          <button className="primary" onClick={start}>Start</button>
        </div>
      </section>
    )
  }

  const index = answers.length
  const q = questions[index]

  if (!q) {
    const score = answers.filter((a) => a.correct).length
    const missed = answers.filter((a) => !a.correct)
    return (
      <section>
        <h2>Vocabulary quiz</h2>
        <div className="done">
          {score === answers.length && answers.length > 0 && <><Celebration /><h3 className="perfect">Perfect round!</h3></>}
          <div className="score">{score} / {answers.length}</div>
          {missed.length > 0 && (
            <>
              <p>Review these:</p>
              <ul className="word-list">
                {missed.map((a) => (
                  <li key={a.q.word.id}>
                    <span className="greek">{displayForm(a.q.word)}</span> — {a.q.word.gloss}
                    {a.given && <span className="muted"> (you: {a.given})</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="actions">
            <button onClick={() => setQuestions(null)}>Change settings</button>
            <button className="primary" onClick={start}>New quiz</button>
          </div>
        </div>
      </section>
    )
  }

  const submit = (given: string, correct: boolean) => {
    if (!pending) setPending({ q, given, correct })
  }

  const submitTyped = () => {
    if (!input.trim()) return
    const ok = q.dir === 'g2e'
      ? checkEnglish(input, q.word.accept)
      : checkGreek(input, greekAnswersFor(q.word, poolVocab), settings.requireAccents)
    submit(input.trim(), ok)
  }

  // Results are recorded on moving on, so "I was right" can overrule the checker first.
  const next = (overruled = false) => {
    if (!pending) return
    const answer = overruled ? { ...pending, correct: true } : pending
    record(vocabItemId(q.chapter, q.word, q.dir), answer.correct)
    setAnswers((a) => [...a, answer])
    setPending(null)
    setInput('')
  }

  const label = (w: VocabWord) => (q.dir === 'g2e' ? w.gloss : displayForm(w))

  return (
    <section>
      <QuizKeys
        onNumber={format === 'choice' && !pending
          ? (i) => { const o = q.options[i]; if (o) submit(label(o), o === q.word) }
          : undefined}
        onEnter={pending ? () => next() : undefined} />
      <div className="toolbar">
        <h2>Vocabulary quiz</h2>
        <span className="muted">Question {index + 1} of {questions.length}</span>
      </div>
      <div className="progress-bar"><div style={{ width: `${(index / questions.length) * 100}%` }} /></div>

      <div className="prompt">
        {multiChapter && <p className="review-tag">Ch {q.chapter}</p>}
        {q.dir === 'g2e'
          ? <span className="word-head"><span className="greek big">{displayForm(q.word)}</span><AudioButton key={index} lemma={q.word.lemma} autoPlay /></span>
          : <span className="big">{q.word.gloss}</span>}
      </div>

      {format === 'choice' ? (
        <div className="options">
          {q.options.map((o, i) => {
            const state = pending && (o === q.word ? 'right' : pending.given === label(o) ? 'wrong' : '')
            return (
              <button key={o.id} className={`option ${q.dir === 'e2g' ? 'greek' : ''} ${state || ''}`}
                disabled={!!pending} onClick={() => submit(label(o), o === q.word)}>
                <kbd>{i + 1}</kbd> {label(o)}
              </button>
            )
          })}
        </div>
      ) : q.dir === 'e2g' ? (
        <GreekInput value={input} onChange={setInput} onSubmit={submitTyped} disabled={!!pending} autoFocus key={index} />
      ) : (
        <input className="text-answer" value={input} autoFocus key={index} disabled={!!pending}
          placeholder="English meaning…" onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !pending) { e.preventDefault(); submitTyped() } }} />
      )}

      {format === 'typed' && !pending && (
        <div className="actions"><button className="primary" onClick={submitTyped}>Check</button></div>
      )}

      {pending && (
        <div className={`feedback ${pending.correct ? 'good' : 'bad'}`}>
          <strong>{pending.correct ? 'Correct' : 'Not quite'}</strong>
          <WordDetails word={q.word} autoPlay={q.dir === 'e2g'} />
          <div className="actions">
            {!pending.correct && format === 'typed' && (
              <button onClick={() => next(true)}>I was right</button>
            )}
            <button className="primary" onClick={() => next()}>Next <kbd>Enter</kbd></button>
          </div>
        </div>
      )}
    </section>
  )
}

/** Number keys pick a multiple-choice option; Enter moves on after feedback. */
function QuizKeys({ onNumber, onEnter }: { onNumber?: (i: number) => void; onEnter?: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The Enter that submitted an answer (already handled by the input) must not also skip its feedback.
      if (e.defaultPrevented) return
      if (e.key === 'Enter' && onEnter) {
        e.preventDefault()
        onEnter()
      } else if (onNumber && /^[1-9]$/.test(e.key)) {
        onNumber(Number(e.key) - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onNumber, onEnter])
  return null
}

import { useState } from 'react'
import type { Chapter, VocabWord } from '../data/types'
import { checkEnglish, checkGreek } from '../lib/greek'
import { type Direction, displayForm, greekAnswersFor, vocabItemId } from '../lib/items'
import { useProgress } from '../lib/progress'
import { type Question, type Range, buildQuiz, chaptersIn, vocabPool } from '../lib/vocabQuiz'
import { ChapterRange } from './ChapterRange'
import { ChoiceQuiz, type ChoiceQuestion } from './ChoiceQuiz'
import { WordDetails } from './WordDetails'
import { AudioButton } from './AudioButton'

type Format = 'choice' | 'typed'

interface Settings {
  format: Format
  multiChapter: boolean
  /** Every word in the chosen chapters: a typed Greek answer may match another word with the same meaning. */
  pool: VocabWord[]
  requireAccents: boolean
}

/** One vocabulary question in the shared quiz's form, multiple choice or typed. */
function toQuestion(q: Question, s: Settings): ChoiceQuestion {
  const g2e = q.dir === 'g2e'
  return {
    id: vocabItemId(q.chapter, q.word, q.dir),
    prompt: (
      <>
        {s.multiChapter && <p className="review-tag">Ch {q.chapter}</p>}
        {g2e
          ? <span className="word-head"><span className="greek big">{displayForm(q.word)}</span><AudioButton key={`${q.chapter}-${q.word.id}`} lemma={q.word.lemma} autoPlay /></span>
          : <span className="big">{q.word.gloss}</span>}
      </>
    ),
    options: s.format === 'choice' ? q.options.map((o) => ({ key: o.id, label: g2e ? o.gloss : displayForm(o), greek: !g2e })) : [],
    answer: q.word.id,
    explain: <WordDetails word={q.word} autoPlay={!g2e} />,
    review: <><span className="greek">{displayForm(q.word)}</span> — {q.word.gloss}</>,
    typed: s.format === 'typed'
      ? {
          greek: !g2e,
          check: (input) => (g2e ? checkEnglish(input, q.word.accept) : checkGreek(input, greekAnswersFor(q.word, s.pool), s.requireAccents)),
        }
      : undefined,
  }
}

export function VocabQuiz({ chapter }: { chapter: Chapter }) {
  const { settings } = useProgress()
  const [dir, setDir] = useState<Direction>('g2e')
  const [format, setFormat] = useState<Format>('choice')
  const [length, setLength] = useState(10)
  const [range, setRange] = useState<Range>([chapter.number, chapter.number])
  const [questions, setQuestions] = useState<ChoiceQuestion[] | null>(null)
  const [round, setRound] = useState(0)
  const inRange = chaptersIn(range)

  const start = () => {
    const s: Settings = {
      format, multiChapter: range[0] !== range[1], pool: vocabPool(inRange).map((e) => e.word), requireAccents: settings.requireAccents,
    }
    setQuestions(buildQuiz(inRange, dir, length).map((q) => toQuestion(q, s)))
    setRound((r) => r + 1)
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

  return (
    <section>
      <div className="toolbar"><h2>Vocabulary quiz</h2></div>
      <ChoiceQuiz key={round} questions={questions} onRestart={start}
        doneActions={<button onClick={() => setQuestions(null)}>Change settings</button>} />
    </section>
  )
}

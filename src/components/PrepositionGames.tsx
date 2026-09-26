import { useEffect, useRef, useState } from 'react'
import type { Chapter } from '../data/types'
import { formatTime } from '../lib/chapterTest'
import {
  type MatchCard, type SpeedQuestion, SPEED_SECONDS, matchCards, pickPairs, speedPoints, speedQuestion, caseUseLabel,
} from '../lib/prepGames'
import type { CaseUse } from '../lib/prepositions'
import { saveBest, useProgress } from '../lib/progress'
import { Celebration } from './Celebration'

type Game = 'match' | 'memory' | 'speed'

const GAMES: { game: Game; title: string; description: string }[] = [
  { game: 'match', title: 'Match', description: 'Pair each preposition + case with its meaning, against the clock.' },
  { game: 'memory', title: 'Memory', description: 'The same pairs, face down: remember where each card is.' },
  { game: 'speed', title: 'Speed round', description: `${SPEED_SECONDS} seconds of rapid-fire meanings and cases. Streaks score double.` },
]

const PAIRS = 6

/** Games for learning prepositions by case. Results aren't recorded as progress; only best scores are kept. */
export function PrepositionGames({ chapter }: { chapter: Chapter }) {
  const [game, setGame] = useState<Game | null>(null)
  const [round, setRound] = useState(0)
  const { bests } = useProgress()

  if (!game) {
    return (
      <div className="games">
        <p className="muted">Short games for the meanings that change with the case. They don’t affect your progress bars.</p>
        <div className="modes">
          {GAMES.map((g) => {
            const best = bests[bestKey(g.game)]
            return (
              <button key={g.game} className="mode" onClick={() => setGame(g.game)}>
                <span className="mode-glyph greek" aria-hidden="true">{g.game === 'speed' ? '⏱' : g.game === 'match' ? '⇄' : '?'}</span>
                <span className="mode-text">
                  <strong>{g.title}</strong>
                  <span>{g.description}</span>
                  {best !== undefined && <span className="best">Best: {g.game === 'speed' ? `${best} points` : formatTime(best)}</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const again = () => setRound((r) => r + 1)
  return (
    <div className="games">
      <button className="link" onClick={() => setGame(null)}>← All games</button>
      {game === 'speed'
        ? <SpeedRound key={round} chapter={chapter} onAgain={again} />
        : <MatchGame key={`${game}-${round}`} chapter={chapter} hidden={game === 'memory'} onAgain={again} />}
    </div>
  )
}

// Clock helpers live outside the components so the purity lint doesn't mistake handler code for render code.
const nowMs = () => Date.now()
/** Whole seconds since a timestamp. */
const secondsSince = (t: number) => Math.round((nowMs() - t) / 1000)

const bestKey = (g: Game) => (g === 'speed' ? 'prep-speed' : `prep-${g}`)

function Hook({ use }: { use: CaseUse }) {
  return (
    <p className="hook">
      <span className="greek">{caseUseLabel(use)}</span> = “{use.gloss}”
      {use.word.hook && <span className="muted"> · {use.word.hook}</span>}
    </p>
  )
}

// --- Match / Memory ------------------------------------------------------------------

function MatchGame({ chapter, hidden, onAgain }: { chapter: Chapter; hidden: boolean; onAgain: () => void }) {
  const [uses] = useState(() => pickPairs(chapter, PAIRS))
  const [cards] = useState<MatchCard[]>(() => matchCards(uses))
  const [selected, setSelected] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [start, setStart] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const [result, setResult] = useState<{ seconds: number; newBest: boolean } | null>(null)
  const [lastMatch, setLastMatch] = useState<CaseUse | null>(null)
  const locked = useRef(false)

  useEffect(() => {
    if (!start || result) return
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [start, result])

  const click = (i: number) => {
    const card = cards[i]
    if (locked.current || result || matched.has(card.pair) || selected.includes(i)) return
    if (!start) setStart(nowMs())
    const sel = [...selected, i]
    if (sel.length < 2) return setSelected(sel)
    setMoves((m) => m + 1)
    const [a, b] = sel.map((k) => cards[k])
    if (a.pair === b.pair && a.side !== b.side) {
      const done = new Set(matched).add(a.pair)
      setMatched(done)
      setSelected([])
      setLastMatch(uses.find((u) => `${u.word.id}:${u.case}` === a.pair) ?? null)
      if (done.size === uses.length) {
        const seconds = start ? secondsSince(start) : 0
        setResult({ seconds, newBest: saveBest(bestKey(hidden ? 'memory' : 'match'), seconds, true) })
      }
    } else {
      setSelected(sel)
      setWrong(sel)
      locked.current = true
      setTimeout(() => {
        setSelected([])
        setWrong([])
        locked.current = false
      }, hidden ? 900 : 600)
    }
  }

  const elapsed = result ? result.seconds : start ? Math.round((now - start) / 1000) : 0

  return (
    <div>
      <div className="game-status">
        <strong>{hidden ? 'Memory' : 'Match'}</strong>
        <span className="quiz-chips">
          <span className="chip">{matched.size}/{uses.length} pairs</span>
          <span className="chip">{moves} moves</span>
          <span className="chip">{formatTime(elapsed)}</span>
        </span>
      </div>
      <p className="muted small">
        {hidden ? 'Turn over two cards at a time; find each preposition + case and its meaning.' : 'Tap a preposition + case, then its meaning.'}
      </p>
      <div className={`match-board ${hidden ? 'hidden-mode' : ''}`}>
        {cards.map((c, i) => {
          const isMatched = matched.has(c.pair)
          const faceUp = !hidden || isMatched || selected.includes(i)
          const state = isMatched ? 'matched' : wrong.includes(i) ? 'wrong' : selected.includes(i) ? 'selected' : ''
          return (
            <button key={c.id} type="button" data-pair={c.pair} className={`match-card side-${c.side} ${state} ${faceUp ? 'up' : 'down'}`}
              onClick={() => click(i)} aria-label={faceUp ? c.text : 'face-down card'} disabled={isMatched}>
              {faceUp ? <span className={c.side === 'greek' ? 'greek' : ''}>{c.text}</span> : <span className="card-back" aria-hidden="true">Θ</span>}
            </button>
          )
        })}
      </div>
      {lastMatch && <Hook use={lastMatch} />}
      {result && (
        <div className="done">
          {result.newBest && <Celebration />}
          <h3 className="perfect">{result.newBest ? 'New best time!' : 'All pairs found!'}</h3>
          <div className="score">{formatTime(result.seconds)}</div>
          <p className="muted">{moves} moves{hidden && ` · a perfect game is ${uses.length}`}</p>
          <div className="hooks-list">{uses.map((u) => <Hook key={`${u.word.id}:${u.case}`} use={u} />)}</div>
          <button className="primary" onClick={onAgain}>Play again</button>
        </div>
      )}
    </div>
  )
}

// --- Speed round -----------------------------------------------------------------------

function SpeedRound({ chapter, onAgain }: { chapter: Chapter; onAgain: () => void }) {
  const [start, setStart] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const [q, setQ] = useState<SpeedQuestion>(() => speedQuestion(chapter))
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [right, setRight] = useState(0)
  const [flash, setFlash] = useState<{ key: string; ok: boolean } | null>(null)
  const [missed, setMissed] = useState<CaseUse[]>([])
  const [result, setResult] = useState<{ newBest: boolean } | null>(null)
  const { bests } = useProgress()

  const left = start ? Math.max(0, SPEED_SECONDS - (now - start) / 1000) : SPEED_SECONDS

  // The score as the timer sees it when time runs out.
  const scoreRef = useRef(0)

  useEffect(() => {
    if (!start || result) return
    const t = setInterval(() => {
      const n = Date.now()
      setNow(n)
      if (n - start >= SPEED_SECONDS * 1000) {
        clearInterval(t)
        setResult({ newBest: scoreRef.current > 0 && saveBest('prep-speed', scoreRef.current) })
      }
    }, 200)
    return () => clearInterval(t)
  }, [start, result])

  const answer = (key: string) => {
    if (!start || flash || result) return
    const ok = key === q.answer
    setAnswered((n) => n + 1)
    if (ok) {
      const s = streak + 1
      setStreak(s)
      setRight((n) => n + 1)
      scoreRef.current += speedPoints(s)
      setScore(scoreRef.current)
    } else {
      setStreak(0)
      setMissed((m) => (m.includes(q.use) ? m : [...m, q.use]))
    }
    setFlash({ key, ok })
    setTimeout(() => {
      setFlash(null)
      setQ((prev) => speedQuestion(chapter, prev))
    }, ok ? 250 : 1100)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!/^[1-9]$/.test(e.key)) return
      const o = q.options[Number(e.key) - 1]
      if (o) answer(o.key)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (!start) {
    return (
      <div className="done">
        <h3>Speed round</h3>
        <p>{SPEED_SECONDS} seconds. Answer as many as you can: 1 point each, 2 from five in a row, 3 from ten.</p>
        {bests['prep-speed'] !== undefined && <p className="muted">Your best: {bests['prep-speed']} points</p>}
        <button className="primary" onClick={() => { setStart(Date.now()); setNow(Date.now()) }}>Start</button>
      </div>
    )
  }

  if (result) {
    return (
      <div className="done">
        {result.newBest && <Celebration />}
        <h3 className="perfect">{result.newBest ? 'New best score!' : 'Time’s up!'}</h3>
        <div className="score">{score} points</div>
        <p className="muted">{right} of {answered} right{bests['prep-speed'] !== undefined && !result.newBest && ` · best ${bests['prep-speed']}`}</p>
        {missed.length > 0 && (
          <>
            <p>Worth another look:</p>
            <div className="hooks-list">{missed.map((u) => <Hook key={`${u.word.id}:${u.case}`} use={u} />)}</div>
          </>
        )}
        <button className="primary" onClick={onAgain}>Play again</button>
      </div>
    )
  }

  return (
    <div>
      <div className="game-status">
        <strong>{score} points</strong>
        <span className="quiz-chips">
          {streak >= 3 && <span className="chip streak" key={streak}>★ {streak} in a row{speedPoints(streak + 1) > 1 && ` · ×${speedPoints(streak + 1)}`}</span>}
          <span className={`chip ${left < 10 ? 'hurry' : ''}`}>{Math.ceil(left)}s</span>
        </span>
      </div>
      <div className="progress-bar timer"><div style={{ width: `${(left / SPEED_SECONDS) * 100}%` }} /></div>
      <div className="prompt">
        {q.kind === 'meaning'
          ? <><span className="greek big">{caseUseLabel(q.use)}</span><p className="muted">What does it mean?</p></>
          : <><span className="greek big">{q.use.word.lemma}</span><p>Which case gives <strong>“{q.use.gloss}”</strong>?</p></>}
      </div>
      <div className="options grid">
        {q.options.map((o, i) => {
          const state = flash && (o.key === q.answer ? 'right' : o.key === flash.key ? 'wrong' : '')
          return (
            <button key={o.key} className={`option ${state || ''}`} disabled={!!flash} onClick={() => answer(o.key)}>
              <kbd>{i + 1}</kbd> {o.label}
            </button>
          )
        })}
      </div>
      {flash && !flash.ok && <Hook use={q.use} />}
    </div>
  )
}

import { useLayoutEffect, useState } from 'react'
import { CHAPTERS, getChapter } from './data/chapters'
import type { TopicView } from './data/types'
import { Adjectives } from './components/Adjectives'
import { ThirdDeclension } from './components/ThirdDeclension'
import { Pronouns } from './components/Pronouns'
import { Autos } from './components/Autos'
import { Demonstratives } from './components/Demonstratives'
import { RelativePronoun } from './components/RelativePronoun'
import { VerbIntro } from './components/VerbIntro'
import { ParticipleIntro } from './components/ParticipleIntro'
import { Cases } from './components/Cases'
import { PresentTense } from './components/PresentTense'
import { ChapterTest } from './components/ChapterTest'
import { hasTest } from './lib/chapterTest'
import { Dashboard } from './components/Dashboard'
import { Flashcards } from './components/Flashcards'
import { ParadigmDrill } from './components/ParadigmDrill'
import { PrepositionDrills } from './components/PrepositionDrills'
import { PrepositionReview } from './components/PrepositionReview'
import { VocabQuiz } from './components/VocabQuiz'
import { updateSettings, useProgress } from './lib/progress'
import { TOPIC_META } from './lib/views'
import { applyTheme } from './lib/theme'
import { ThemeToggle } from './components/ThemeToggle'
import { Today } from './components/Today'
import { reviewPlan } from './lib/review'
import { useNow } from './lib/useNow'

export type View = 'home' | 'today' | 'flashcards' | 'quiz' | 'review' | 'test' | TopicView

export default function App() {
  const { settings, items } = useProgress()
  const chapter = getChapter(settings.chapter)
  const topics = chapter.topics ?? []
  const [chosen, setView] = useState<View>('home')
  // Before paint, so a saved theme doesn't flash the system one first.
  useLayoutEffect(() => applyTheme(settings.theme), [settings.theme])
  // A topic view from another chapter isn't available here; fall back to home.
  const unavailable = ((Object.keys(TOPIC_META) as View[]).includes(chosen) && !topics.includes(chosen as TopicView))
    || (!chapter.vocab.length && (chosen === 'flashcards' || chosen === 'quiz'))
    || (chosen === 'review' && chapter.number < 8)
    || (chosen === 'test' && !hasTest(chapter.number))
  const view: View = unavailable ? 'home' : chosen

  const now = useNow()
  const dueNow = reviewPlan(items, now, chapter).totalDue
  const nav: { view: View; label: string; badge?: number }[] = [
    { view: 'home', label: 'Home' },
    { view: 'today', label: 'Today', badge: dueNow },
    // Chapters without vocabulary have no flashcards or vocab quiz.
    ...(chapter.vocab.length ? [{ view: 'flashcards' as View, label: 'Flashcards' }, { view: 'quiz' as View, label: 'Vocab quiz' }] : []),
    ...topics.map((t) => ({ view: t, label: TOPIC_META[t].nav })),
    // Most prepositions arrive in chapter 8; before that, the review would quiz words not yet taught.
    ...(chapter.number >= 8 ? [{ view: 'review' as View, label: 'All prepositions' }] : []),
    ...(hasTest(chapter.number) ? [{ view: 'test' as View, label: 'Test' }] : []),
  ]

  return (
    <div className="app">
      <header>
        <div className="header-top">
          <h1 className="brand-heading">
            <button type="button" className="brand" onClick={() => setView('home')} title="Home">
              <span className="brand-mark" aria-hidden="true">Θ</span>
              <span className="brand-text">
                <span className="brand-name">
                  <span className="greek" lang="el">Θεόφιλος</span><span className="latin">Theophilus</span>
                </span>
                <span className="brand-tag">friend of God · Luke 1:3</span>
              </span>
            </button>
          </h1>
          <div className="header-tools">
            <label className="chapter-pick">
              <span className="sr-label">Chapter</span>
              <select value={chapter.number} onChange={(e) => updateSettings({ chapter: Number(e.target.value) })}>
                {CHAPTERS.map((c) => <option key={c.number} value={c.number}>Ch {c.number}: {c.title}</option>)}
              </select>
            </label>
            <ThemeToggle />
          </div>
        </div>
        <nav>
          {nav.map((n) => (
            <button key={n.view} className={view === n.view ? 'on' : ''} onClick={() => setView(n.view)}>
              {n.label}{n.badge ? <span className="badge" aria-label={`${n.badge} due`}>{n.badge}</span> : null}
            </button>
          ))}
        </nav>
      </header>
      <main key={chapter.number} className={view === 'home' ? 'wide' : ''}>
        {view === 'home' && <Dashboard chapter={chapter} go={setView} />}
        {view === 'today' && <Today chapter={chapter} />}
        {view === 'flashcards' && <Flashcards chapter={chapter} />}
        {view === 'quiz' && <VocabQuiz chapter={chapter} />}
        {view === 'paradigm' && <ParadigmDrill chapter={chapter} />}
        {view === 'prepositions' && <PrepositionDrills chapter={chapter} />}
        {view === 'adjectives' && <Adjectives chapter={chapter} />}
        {view === 'declension' && <ThirdDeclension chapter={chapter} />}
        {view === 'pronouns' && <Pronouns chapter={chapter} />}
        {view === 'autos' && <Autos chapter={chapter} />}
        {view === 'demonstratives' && <Demonstratives chapter={chapter} />}
        {view === 'relative' && <RelativePronoun chapter={chapter} />}
        {view === 'verbs' && <VerbIntro chapter={chapter} />}
        {view === 'participles' && <ParticipleIntro chapter={chapter} />}
        {view === 'cases' && <Cases chapter={chapter} />}
        {(view === 'present' || view === 'contract' || view === 'middle' || view === 'future' || view === 'roots' || view === 'imperfect' || view === 'aorist' || view === 'aorist1' || view === 'passive' || view === 'perfect') && <PresentTense key={view} chapter={chapter} />}
        {view === 'review' && <PrepositionReview />}
        {view === 'test' && <ChapterTest chapter={chapter} />}
      </main>
    </div>
  )
}

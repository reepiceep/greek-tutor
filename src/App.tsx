import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getChapter } from './data/chapters'
import type { TopicView } from './data/types'
import { Adjectives } from './components/Adjectives'
import { ThirdDeclension } from './components/ThirdDeclension'
import { Pronouns } from './components/Pronouns'
import { Autos } from './components/Autos'
import { Demonstratives } from './components/Demonstratives'
import { RelativePronoun } from './components/RelativePronoun'
import { VerbIntro } from './components/VerbIntro'
import { ParticipleIntro } from './components/ParticipleIntro'
import { Participles } from './components/Participles'
import { AdjectivalParticiple } from './components/AdjectivalParticiple'
import { Infinitive } from './components/Infinitive'
import { Imperative } from './components/Imperative'
import { NonIndicative } from './components/NonIndicative'
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
import { useProgress } from './lib/progress'
import { TOPIC_META } from './lib/views'
import { applyTheme } from './lib/theme'
import { ThemeToggle } from './components/ThemeToggle'
import { Today } from './components/Today'
import { Practice } from './components/Practice'
import { ChapterSheet } from './components/ChapterSheet'
import { reviewPlan } from './lib/review'
import { useNow } from './lib/useNow'
import { useStickyNavTop, useTabsFollowSelection } from './lib/layout'

export type View = 'home' | 'today' | 'practice' | 'flashcards' | 'quiz' | 'review' | 'test' | TopicView

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

  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const headerTop = useStickyNavTop(headerRef, navRef)
  useTabsFollowSelection()
  // On a phone the nav scrolls sideways: keep the current screen's tab in view, however it was reached.
  useEffect(() => {
    navRef.current?.querySelector('.on')?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' })
  }, [view])

  const [picking, setPicking] = useState(false)
  const closePicker = useCallback(() => setPicking(false), [])

  const now = useNow()
  const dueNow = reviewPlan(items, now, chapter).totalDue
  const test = hasTest(chapter.number)
  type NavItem = { view: View; label: string; badge?: number }
  // Global screens, then this chapter's own: the nav shows them as two groups.
  const global: NavItem[] = [
    { view: 'home', label: 'Home' },
    { view: 'today', label: 'Today', badge: dueNow },
  ]
  const local: NavItem[] = [
    // Chapters without vocabulary have no flashcards or vocab quiz.
    ...(chapter.vocab.length ? [{ view: 'flashcards' as View, label: 'Flashcards' }, { view: 'quiz' as View, label: 'Vocab quiz' }] : []),
    ...topics.map((t) => ({ view: t, label: TOPIC_META[t].nav })),
    // Most prepositions arrive in chapter 8; before that, the review would quiz words not yet taught.
    ...(chapter.number >= 8 ? [{ view: 'review' as View, label: 'All prepositions' }] : []),
    ...(test ? [{ view: 'test' as View, label: 'Test' }] : []),
  ]
  const navButton = (n: NavItem) => (
    <button key={n.view} className={view === n.view ? 'on' : ''} onClick={() => setView(n.view)}>
      {n.label}{n.badge ? <span className="badge" aria-label={`${n.badge} due`}>{n.badge}</span> : null}
    </button>
  )
  // Phones get a bottom bar instead of the nav: every chapter screen is under Practice.
  const tab: View = view === 'home' || view === 'today' || view === 'test' ? view : 'practice'
  const tabs: (NavItem & { glyph: string })[] = [
    { view: 'home', label: 'Home', glyph: 'Θ' },
    { view: 'today', label: 'Today', glyph: '★', badge: dueNow },
    { view: 'practice', label: 'Practice', glyph: 'α' },
    ...(test ? [{ view: 'test' as View, label: 'Test', glyph: '✓' }] : []),
  ]

  return (
    <div className="app">
      <header ref={headerRef} style={{ top: headerTop }}>
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
            <button type="button" className="chapter-pick" onClick={() => setPicking(true)} aria-haspopup="dialog" aria-expanded={picking}>
              <span className="chapter-pick-num">Ch {chapter.number}</span>
              <span className="chapter-pick-title">{chapter.short}</span>
              <svg className="chapter-pick-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
        <nav ref={navRef} aria-label="Sections">
          {global.map(navButton)}
          <span className="nav-group" aria-hidden="true">Ch {chapter.number}</span>
          {local.map(navButton)}
        </nav>
      </header>
      <main key={chapter.number} className={view === 'home' ? 'wide' : ''}>
        {view === 'home' && <Dashboard chapter={chapter} go={setView} />}
        {view === 'today' && <Today chapter={chapter} />}
        {view === 'practice' && <Practice chapter={chapter} go={setView} />}
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
        {(view === 'ptcPresent' || view === 'ptcAorist' || view === 'ptcPerfect') && <Participles key={view} chapter={chapter} view={view} />}
        {view === 'ptcAdjectival' && <AdjectivalParticiple chapter={chapter} />}
        {view === 'infinitive' && <Infinitive chapter={chapter} />}
        {view === 'imperative' && <Imperative chapter={chapter} />}
        {view === 'miMoods' && <NonIndicative chapter={chapter} />}
        {view === 'cases' && <Cases chapter={chapter} />}
        {(view === 'present' || view === 'contract' || view === 'middle' || view === 'future' || view === 'roots' || view === 'imperfect' || view === 'aorist' || view === 'aorist1' || view === 'passive' || view === 'perfect' || view === 'subjunctive' || view === 'mi' || view === 'mi2') && <PresentTense key={view} chapter={chapter} />}
        {view === 'review' && <PrepositionReview />}
        {view === 'test' && <ChapterTest chapter={chapter} />}
      </main>
      <nav className="tabbar" aria-label="Main">
        {tabs.map((t) => (
          <button key={t.view} className={tab === t.view ? 'on' : ''} aria-current={tab === t.view ? 'page' : undefined} onClick={() => setView(t.view)}>
            <span className="tab-glyph greek" aria-hidden="true">{t.glyph}</span>
            <span className="tab-label">{t.label}</span>
            {t.badge ? <span className="badge" aria-label={`${t.badge} due`}>{t.badge}</span> : null}
          </button>
        ))}
      </nav>
      {picking && <ChapterSheet current={chapter} onClose={closePicker} />}
    </div>
  )
}

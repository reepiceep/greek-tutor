import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getChapter } from './data/chapters'
import type { TopicView } from './data/types'
import { hasTest } from './lib/chapterTest'
import { Dashboard } from './components/Dashboard'
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
import { lazyScreen, preloadScreens } from './components/lazyScreen'
import { ScreenBoundary } from './components/ScreenBoundary'
import { UpdateBanner } from './components/UpdateBanner'

// Every screen but Home, Today and Practice is fetched when first opened (and in the background once the page is up).
const Adjectives = lazyScreen(() => import('./components/Adjectives').then((m) => m.Adjectives))
const ThirdDeclension = lazyScreen(() => import('./components/ThirdDeclension').then((m) => m.ThirdDeclension))
const Pronouns = lazyScreen(() => import('./components/Pronouns').then((m) => m.Pronouns))
const Autos = lazyScreen(() => import('./components/Autos').then((m) => m.Autos))
const Demonstratives = lazyScreen(() => import('./components/Demonstratives').then((m) => m.Demonstratives))
const RelativePronoun = lazyScreen(() => import('./components/RelativePronoun').then((m) => m.RelativePronoun))
const VerbIntro = lazyScreen(() => import('./components/VerbIntro').then((m) => m.VerbIntro))
const ParticipleIntro = lazyScreen(() => import('./components/ParticipleIntro').then((m) => m.ParticipleIntro))
const Participles = lazyScreen(() => import('./components/Participles').then((m) => m.Participles))
const AdjectivalParticiple = lazyScreen(() => import('./components/AdjectivalParticiple').then((m) => m.AdjectivalParticiple))
const Infinitive = lazyScreen(() => import('./components/Infinitive').then((m) => m.Infinitive))
const Imperative = lazyScreen(() => import('./components/Imperative').then((m) => m.Imperative))
const NonIndicative = lazyScreen(() => import('./components/NonIndicative').then((m) => m.NonIndicative))
const Cases = lazyScreen(() => import('./components/Cases').then((m) => m.Cases))
const PresentTense = lazyScreen(() => import('./components/PresentTense').then((m) => m.PresentTense))
const ChapterTest = lazyScreen(() => import('./components/ChapterTest').then((m) => m.ChapterTest))
const Flashcards = lazyScreen(() => import('./components/Flashcards').then((m) => m.Flashcards))
const ParadigmDrill = lazyScreen(() => import('./components/ParadigmDrill').then((m) => m.ParadigmDrill))
const PrepositionDrills = lazyScreen(() => import('./components/PrepositionDrills').then((m) => m.PrepositionDrills))
const PrepositionReview = lazyScreen(() => import('./components/PrepositionReview').then((m) => m.PrepositionReview))
const VocabQuiz = lazyScreen(() => import('./components/VocabQuiz').then((m) => m.VocabQuiz))

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

  // Once the first screen is up, fetch the rest while the reader is looking at it.
  useEffect(() => {
    const id = setTimeout(() => { preloadScreens().catch(() => {}) }, 1500)
    return () => clearTimeout(id)
  }, [])

  const [picking, setPicking] = useState(false)
  const closePicker = useCallback(() => setPicking(false), [])

  const now = useNow()
  const dueNow = reviewPlan(items, now, chapter).totalDue
  const test = hasTest(chapter.number)
  type NavItem = { view: View; label: string; badge?: number }
  // Global screens, then this chapter's own: the nav shows them as two groups, split by a divider.
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
          <span className="nav-group" aria-hidden="true" />
          {local.map(navButton)}
        </nav>
      </header>
      <main key={chapter.number} className={view === 'home' ? 'wide' : ''}>
        <ScreenBoundary key={view}>
          <Suspense fallback={<p className="muted loading">Loading…</p>}>
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
          </Suspense>
        </ScreenBoundary>
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
      <UpdateBanner />
    </div>
  )
}

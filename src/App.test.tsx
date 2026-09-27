// @vitest-environment jsdom
import { StrictMode } from 'react'
import { afterEach, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

const nav = (label: string) => fireEvent.click(screen.getByText(label, { selector: 'nav button' }))
const tab = (label: string) => fireEvent.click(screen.getByText(label, { selector: '.seg button' }))
const pickChapter = (n: number) => fireEvent.change(document.querySelector('.chapter-pick select')!, { target: { value: String(n) } })

it('renders every view without crashing', () => {
  render(<StrictMode><App /></StrictMode>)
  pickChapter(8)
  nav('Flashcards')
  expect(screen.getByText(/20 to go/)).toBeTruthy()
  nav('Vocab quiz')
  fireEvent.click(screen.getByText('Start'))
  expect(screen.getByText(/Question 1 of 10/)).toBeTruthy()
  nav('εἰμί')
  tab('Identify forms')
  for (const t of ['Subject & predicate', 'Enclitics']) {
    tab(t)
    expect(document.querySelector('.lesson')).toBeTruthy()
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
  }
  nav('Prepositions')
  for (const t of ['Meaning & case', 'Phrases', 'Sentences', 'Elision']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
  }
  tab('Diagram')
  expect(document.querySelectorAll('.spatial-grid figure')).toHaveLength(7)
  tab('Quiz me')
  expect(screen.getByText('1 of 7')).toBeTruthy()
})

it('opens every tab of the all-prepositions review at each range', () => {
  render(<App />)
  nav('All prepositions')
  for (const range of ['8', '14']) {
    fireEvent.click(screen.getByText(range, { selector: '.range button' }))
    for (const t of ['Meaning & case', 'Phrases', 'Sentences', 'Elision']) {
      tab(t)
      expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    }
    tab('Reference')
    expect(document.querySelectorAll('.reference tbody tr').length).toBe(range === '8' ? 9 : 17)
  }
  tab('Sentences')
  expect(document.querySelector('.sentence mark')).toBeTruthy()
})

it('answering a choice question shows feedback and records progress', () => {
  render(<App />)
  pickChapter(8)
  nav('Prepositions')
  tab('Elision')
  fireEvent.click(document.querySelector('.option')!)
  expect(document.querySelector('.feedback')).toBeTruthy()
  expect(localStorage.getItem('greek-tutor:v1')).toContain('ch8:')
})

it('takes a whole chapter test and shows the result on the dashboard', () => {
  render(<App />)
  pickChapter(8)
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
  expect(screen.getByText('Vocabulary', { exact: false })).toBeTruthy()
  nav('Home')
  expect(screen.getByText(/^Last test \d+\/30/)).toBeTruthy()
})

it('chapter 9: every adjectives tab works and the test adds up to 30', () => {
  render(<StrictMode><App /></StrictMode>)
  pickChapter(9)
  expect(screen.queryByText('εἰμί', { selector: 'nav button' })).toBeNull()
  nav('Adjectives')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(4)
  for (const t of ['Parse', 'Agreement', 'Uses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText('Chapter 8 review', { exact: false })).toBeTruthy()
  nav('Home')
  expect(screen.getByText(/^Last test \d+\/30/)).toBeTruthy()
  expect(screen.getByText('Adjectives', { selector: '.progress-group h4' })).toBeTruthy()
  expect(screen.getByText('agreement', { selector: '.progress-name' })).toBeTruthy()
})

it('switching chapters from a chapter-only view goes home', () => {
  render(<App />)
  pickChapter(8)
  nav('εἰμί')
  pickChapter(9)
  expect(screen.getByText('Chapter 9', { selector: '.eyebrow' })).toBeTruthy()
})

it('chapter 10: every third-declension tab works and the test runs', () => {
  render(<App />)
  pickChapter(10)
  nav('3rd declension')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(5)
  for (const t of ['Stops & stems', 'Parse', 'πᾶς agreement', 'τίς or τις?']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
})

it('chapter 11: every pronoun tab works and the test runs', () => {
  render(<App />)
  pickChapter(11)
  nav('Pronouns')
  expect(document.querySelector('.pronoun-table')).toBeTruthy()
  for (const t of ['Parse', 'Meaning', 'In verses', 'New nouns']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
})

it('chapter 12: every αὐτός tab works and the test runs', () => {
  render(<App />)
  pickChapter(12)
  nav('αὐτός')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(3)
  for (const t of ['Parse', 'Uses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
})

it('chapter 13: every demonstratives tab works and the test runs', () => {
  render(<App />)
  pickChapter(13)
  nav('Demonstratives')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(6)
  for (const t of ['Parse', 'Agreement', 'Uses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
})

it('chapter 14: every relative pronoun tab works and the test runs', () => {
  render(<App />)
  pickChapter(14)
  nav('Relative pronoun')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(3)
  for (const t of ['Parse', 'Clauses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  for (let i = 0; i < 30; i++) fireEvent.click(document.querySelector('.option')!)
  expect(screen.getByText(/^(Ready for the next chapter|Not ready yet)$/)).toBeTruthy()
})

it('the theme toggle switches between light and dark and remembers the choice', () => {
  render(<App />)
  const toggle = () => fireEvent.click(document.querySelector('.theme-toggle')!)
  // jsdom has no system dark mode, so the first click goes light → dark.
  toggle()
  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(localStorage.getItem('greek-tutor:v1')).toContain('"theme":"dark"')
  expect(document.querySelector('.theme-toggle')!.getAttribute('aria-label')).toContain('Manuscript')
  toggle()
  expect(document.documentElement.dataset.theme).toBe('light')
})

it('shows the Theophilus brand, which returns to the home page', () => {
  render(<App />)
  expect(screen.getByText('Θεόφιλος')).toBeTruthy()
  expect(screen.getByText('Theophilus')).toBeTruthy()
  nav('Flashcards')
  fireEvent.click(document.querySelector('.brand')!)
  expect(screen.getByText('Home', { selector: 'nav button' }).className).toBe('on')
})

it('the course map lists every chapter and switches chapter on click', () => {
  render(<App />)
  nav('Home')
  const stops = document.querySelectorAll('.course-map .stop')
  expect(stops.length).toBeGreaterThanOrEqual(7)
  const nouns = screen.getByText('Introduction and nouns').closest('button')!
  if (nouns.getAttribute('aria-expanded') === 'false') fireEvent.click(nouns)
  fireEvent.click(screen.getByText('Adjectives', { selector: '.stop-title' }))
  expect(screen.getByText('Chapter 9', { selector: '.eyebrow' })).toBeTruthy()
  expect(document.querySelector('.stop.current .stop-title')!.textContent).toBe('Adjectives')
})

it('course map parts collapse and expand, remember it, and the current chapter’s part opens by itself', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(29)
  nav('Home')
  const head = (title: string) => screen.getByText(title, { selector: '.part-title' }).closest('button')!
  const isOpen = (title: string) => head(title).getAttribute('aria-expanded') === 'true'
  expect(isOpen('Participles')).toBe(true)
  expect(isOpen('Indicative verbs')).toBe(false)
  // A closed part is inert: its chapters stay in the page (for the animation) but can't be reached.
  expect(document.getElementById(head('Indicative verbs').getAttribute('aria-controls')!)!.hasAttribute('inert')).toBe(true)
  const range = head('Participles').querySelector('.part-range')!.textContent!.match(/ch\. (\d+)–(\d+)/)!
  expect(range[1]).toBe('26')
  expect(head('Participles').querySelectorAll('.pip')).toHaveLength(Number(range[2]) - 25)
  fireEvent.click(head('Indicative verbs'))
  expect(isOpen('Indicative verbs')).toBe(true)
  fireEvent.click(head('Participles'))
  expect(isOpen('Participles')).toBe(false)
  const saved: string[] = JSON.parse(localStorage.getItem('greek-tutor:course-map-open')!)
  expect(saved).toContain('Indicative verbs')
  expect(saved).not.toContain('Participles')
  fireEvent.click(screen.getByText('Expand all'))
  expect(isOpen('Participles') && isOpen('Introduction and nouns')).toBe(true)
  fireEvent.click(screen.getByText('Collapse all'))
  expect(isOpen('Indicative verbs')).toBe(false)
  // Picking a chapter in a closed part opens that part.
  pickChapter(9)
  nav('Home')
  expect(isOpen('Introduction and nouns')).toBe(true)
})

it('daily review: new items for a fresh start, and finishing starts a streak', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(9)
  nav('Today')
  fireEvent.click(screen.getByText(/^Start \(\d+ questions\)$/))
  for (let i = 0; i < 20 && document.querySelector('.option'); i++) {
    expect(document.querySelector('.review-tag')!.textContent).toMatch(/Ch \d+ · /)
    fireEvent.click(document.querySelector('.option')!)
    fireEvent.click(screen.getByText('Next', { exact: false, selector: 'button' }))
  }
  expect(document.querySelector('.streak-banner')!.textContent).toMatch(/Review done for today|in a row/)
  expect(localStorage.getItem('greek-tutor:v1')).toContain('"streak":1')
})

it('flashcards show a noun with its genitive and article', () => {
  render(<App />)
  pickChapter(8)
  nav('Flashcards')
  const fronts: string[] = []
  for (let i = 0; i < 20; i++) {
    fronts.push(document.querySelector('.flashcard')!.textContent!)
    fireEvent.click(document.querySelector('.flashcard')!)
    fireEvent.click(screen.getByText('Got it', { exact: false }))
  }
  expect(fronts).toContain('θάνατος, -ου, ὁ')
  expect(fronts).toContain('ἀλλά')
})

it('flashcards can be filtered to one or more parts of speech, and the filter is remembered', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(9)
  nav('Flashcards')
  const chip = (label: string) => [...document.querySelectorAll<HTMLButtonElement>('.chip')].find((b) => b.textContent!.replace(/\s*\d+$/, '').trim() === label)!
  const count = (label: string) => Number(chip(label).querySelector('.chip-count')!.textContent)
  const words = () => Number(screen.getByText(/\d+ words · \d+ cards/).textContent!.match(/(\d+) words/)![1])
  const all = words()
  expect(chip('All').getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(chip('Nouns'))
  expect(words()).toBe(count('Nouns'))
  expect(chip('All').getAttribute('aria-pressed')).toBe('false')
  // Every card is a noun: shown with its genitive and article (θάνατος, -ου, ὁ).
  for (let i = 0; i < count('Nouns'); i++) {
    expect(document.querySelector('.flashcard')!.textContent).toMatch(/, (ὁ|ἡ|τό)$/)
    fireEvent.click(document.querySelector('.flashcard')!)
    fireEvent.click(screen.getByText('Got it', { exact: false, selector: 'button' }))
  }
  expect(screen.getByText('Deck complete')).toBeTruthy()
  fireEvent.click(chip('Adjectives'))
  expect(words()).toBe(count('Nouns') + count('Adjectives'))
  expect(JSON.parse(localStorage.getItem('greek-tutor:v1')!).settings.flashcardTypes).toEqual(['noun', 'adjective'])
  fireEvent.click(chip('All'))
  expect(words()).toBe(all)
})

it('flashcards can split prepositions into one card per case', () => {
  render(<App />)
  pickChapter(8)
  nav('Flashcards')
  const collect = () => {
    const fronts: string[] = []
    for (let i = 0; i < 40 && document.querySelector('.flashcard'); i++) {
      fronts.push(document.querySelector('.flashcard')!.textContent!.replace(/\s+/g, ' ').trim())
      fireEvent.click(document.querySelector('.flashcard')!)
      fireEvent.click(screen.getByText('Got it', { exact: false }))
    }
    return fronts
  }
  fireEvent.click(document.querySelector('.split-toggle input')!)
  const split = collect()
  expect(split).toContain('μετά + gen')
  expect(split).toContain('μετά + acc')
  expect(split).toContain('παρά + dat')
  expect(split).not.toContain('μετά')
  expect(split).toContain('θάνατος, -ου, ὁ')
  expect(localStorage.getItem('greek-tutor:v1')).toContain('ch8:prep:meta:accusative:meaning')
  // Turning it off brings back one card per preposition.
  fireEvent.click(screen.getByText('Go again'))
  fireEvent.click(document.querySelector('.split-toggle input')!)
  expect(collect()).toContain('μετά')
})

it('vocab quiz can cover several chapters and records each word under its own chapter', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(9)
  nav('Vocab quiz')
  fireEvent.click(screen.getByText(/^All \(/))
  fireEvent.click(screen.getByText('20'))
  fireEvent.click(screen.getByText('Start'))
  expect(document.querySelector('.review-tag')!.textContent).toMatch(/^Ch \d+$/)
  for (let i = 0; i < 20; i++) {
    fireEvent.click(document.querySelector('.option')!)
    fireEvent.click(screen.getByText('Next', { exact: false, selector: 'button' }))
  }
  const saved = localStorage.getItem('greek-tutor:v1')!
  const chapters = new Set([...saved.matchAll(/"ch(\d+):vocab:/g)].map((m) => m[1]))
  expect(chapters.size).toBeGreaterThan(1)
})

it('chapter 15: no vocab tabs, and every verbs tab works', () => {
  render(<App />)
  pickChapter(15)
  expect(screen.queryByText('Flashcards', { selector: 'nav button' })).toBeNull()
  expect(screen.getByText(/no new vocabulary/)).toBeTruthy()
  nav('Verbs')
  expect(document.querySelector('.terms-table')).toBeTruthy()
  for (const t of ['Terms', 'English verbs', 'Parts of a verb']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 16: present tense lesson, chart for any verb, and every quiz tab works', () => {
  render(<App />)
  pickChapter(16)
  nav('Present tense')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λύουσι(ν)')
  tab('Fill the chart')
  tab('ἀκούω')
  expect(document.querySelectorAll('table.paradigm input')).toHaveLength(6)
  fireEvent.click(screen.getByText('Check'))
  expect(document.querySelector('.correction')!.textContent).toBe('ἀκούω')
  for (const t of ['Parse & translate', 'Endings', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 17: contract verbs lesson, contracted chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(17)
  nav('Contract verbs')
  expect(document.querySelector('.contraction-table')).toBeTruthy()
  expect(document.querySelector('.endings-table')!.textContent).toContain('ποιοῦσι(ν)')
  expect(screen.queryByText('Endings', { selector: '.seg button' })).toBeNull()
  tab('Fill the chart')
  expect(screen.getByText('poiw=')).toBeTruthy()
  tab('ἀγαπάω')
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ἀγαπᾷς')
  for (const t of ['Parse & translate', 'Contractions', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 18: middle/passive lesson, λύομαι chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(18)
  nav('Middle/passive')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λυόμεθα')
  expect(screen.queryByText('Contractions', { selector: '.seg button' })).toBeNull()
  tab('Fill the chart')
  expect(screen.getByText('lu/omai')).toBeTruthy()
  tab('δύναμαι')
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('δύνασαι')
  for (const t of ['Parse & translate', 'Endings', 'Active or passive?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 19: future lesson, λύσω chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(19)
  nav('Future')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λύσουσι(ν)')
  expect(document.querySelector('.future-table')!.textContent).toContain('βλέψω')
  tab('Fill the chart')
  expect(screen.getByText('lu/sw')).toBeTruthy()
  tab('εἰμί')
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ἔσται')
  for (const t of ['Parse & translate', 'Forming the future', 'Present or future?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 20: roots lesson, liquid-future chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(20)
  nav('Other futures')
  expect(document.querySelector('.endings-table')!.textContent).toContain('μενοῦσι(ν)')
  expect(document.querySelector('.future-table')!.textContent).toContain('ὄψομαι')
  tab('Fill the chart')
  expect(screen.getByText('menw=')).toBeTruthy()
  tab('ὁράω')
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ὀψόμεθα')
  for (const t of ['Parse & translate', 'Verbal roots', 'Forming the future', 'Present or future?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 21: imperfect lesson, augmented chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(21)
  nav('Imperfect')
  expect(document.querySelector('.endings-table')!.textContent).toContain('ἐλυόμην')
  tab('Fill the chart')
  expect(screen.getByText('e)/luon')).toBeTruthy()
  tab('συνάγω')
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('συνῆγον')
  for (const t of ['Parse & translate', 'The augment', 'Present or imperfect?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 22: second aorist lesson, aorist chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(22)
  nav('Second aorist')
  expect(document.querySelector('.endings-table')!.textContent).toContain('ἐλάμβανον')
  tab('Fill the chart')
  expect(screen.getByText('e)/labon')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ἐλάβομεν')
  for (const t of ['Parse & translate', 'Aorist stems', 'Imperfect or aorist?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 23: first aorist lesson, σα chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(23)
  nav('First aorist')
  expect(document.querySelector('.endings-table')!.textContent).toContain('ἐλυσάμην')
  tab('Fill the chart')
  expect(screen.getByText('e)/lusa')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ἐλύσαμεν')
  for (const t of ['Parse & translate', 'Forming the aorist', 'Imperfect or aorist?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 24: passive lesson, θη chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(24)
  nav('Passive')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λυθήσομαι')
  tab('Fill the chart')
  expect(screen.getByText('e)lu/qhn')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('ἐλύθησαν')
  for (const t of ['Parse & translate', 'Forming the passive', 'Aorist or future?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 25: perfect lesson, reduplicated chart, and every quiz tab works', () => {
  render(<App />)
  pickChapter(25)
  nav('Perfect')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λέλυμαι')
  tab('Fill the chart')
  expect(screen.getByText('le/luka')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('λελύκαμεν')
  for (const t of ['Parse & translate', 'Reduplication', 'Aorist or perfect?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 26: participle lesson, four drills, and test work without vocabulary', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(26)
  expect(screen.queryByText('Flashcards', { selector: 'nav button' })).toBeNull()
  expect(screen.getByText(/Not started yet: begin with the lesson/)).toBeTruthy()
  nav('Participles')
  expect(screen.getByText(/verbal adjective/, { selector: 'summary' })).toBeTruthy()
  for (const area of ['English participles', 'Verbal and adjectival', 'Agreement', 'Word structure']) {
    tab(area)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 27: present participle lesson, charts, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(27)
  expect(screen.getByText('Flashcards', { selector: 'nav button' })).toBeTruthy()
  nav('Present participles')
  const charts = [...document.querySelectorAll('.adj-table')].map((t) => t.textContent)
  expect(charts.some((t) => t!.includes('λυουσῶν'))).toBe(true)
  expect(charts.some((t) => t!.includes('λυομένης'))).toBe(true)
  expect(charts.some((t) => t!.includes('οὔσῃ'))).toBe(true)
  for (const t of ['Parse', 'Build the form', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 28: aorist participle lesson, charts, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(28)
  nav('Aorist participles')
  const charts = [...document.querySelectorAll('.adj-table')].map((t) => t.textContent)
  for (const form of ['λυσασῶν', 'λαβοῦσα', 'λυθεῖσα', 'λυσαμένης']) expect(charts.some((t) => t!.includes(form)), form).toBe(true)
  for (const t of ['Parse', 'Build the form', 'Present or aorist?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 29: adjectival participle lesson, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(29)
  nav('Adjectival participles')
  expect(document.querySelector('.terms-table')!.textContent).toContain('ὁ πατὴρ ὁ πέμψας με')
  for (const t of ['How is it used?', 'Translate', 'Parse']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 30: perfect participle lesson, charts, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(30)
  nav('Perfect participles')
  const charts = [...document.querySelectorAll('.adj-table')].map((t) => t.textContent)
  for (const form of ['λελυκυῖα', 'λελυμένης']) expect(charts.some((t) => t!.includes(form)), form).toBe(true)
  for (const t of ['Parse', 'Build the form', 'Genitive absolutes', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 31: subjunctive lesson, chart, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(31)
  nav('Subjunctive')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λυθῶμεν')
  tab('Fill the chart')
  expect(screen.getByText('lu/h|')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('λύωμεν')
  for (const t of ['Parse & translate', 'Indicative or subjunctive?', 'Why subjunctive?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 32: infinitive lesson, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(32)
  nav('Infinitive')
  expect(document.querySelector('.endings-table')!.textContent).toContain('λυθῆναι')
  for (const t of ['Parse', 'Build the form', 'How is it used?', 'Translate', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 33: imperative lesson, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(33)
  nav('Imperative')
  const tables = [...document.querySelectorAll('.endings-table')].map((t) => t.textContent).join(' ')
  for (const form of ['λῦε', 'λύου', 'λῦσον', 'λῦσαι', 'λύθητι']) expect(tables, form).toContain(form)
  for (const t of ['Parse', 'Build the form', 'Commands in verses', 'Prohibitions']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 34: δίδωμι lesson, chart, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(34)
  nav('δίδωμι')
  expect(document.querySelector('.endings-table')!.textContent).toContain('διδόασι(ν)')
  tab('Fill the chart')
  expect(screen.getByText('di/dwmi')).toBeTruthy()
  fireEvent.click(screen.getByText('Check'))
  expect([...document.querySelectorAll('.correction')].map((c) => c.textContent)).toContain('δίδομεν')
  for (const t of ['Parse & translate', 'Which tense?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 35: δίδωμι moods and conditionals, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(35)
  nav('δίδωμι & “if”')
  const tables = [...document.querySelectorAll('.endings-table')].map((t) => t.textContent).join(' ')
  for (const form of ['δῷ', 'δός', 'δοῦναι', 'διδούς']) expect(tables, form).toContain(form)
  for (const t of ['Forms', 'δίδωμι in verses', 'Conditional sentences']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('chapter 36: μι verbs lesson, chart, every quiz tab, and the test', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(36)
  nav('ἵστημι, τίθημι')
  const table = [...document.querySelectorAll('.endings-table')].map((t) => t.textContent).join(' ')
  for (const form of ['ἵστημι', 'ἔθηκα', 'ἀφῆκα', 'ἕστηκα']) expect(table, form).toContain(form)
  tab('Fill the chart')
  expect(screen.getByText('ti/qhmi')).toBeTruthy()
  for (const t of ['Parse & translate', 'Which tense?', 'Which verb?', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
  nav('Test')
  fireEvent.click(screen.getByText('Start the test'))
  expect(screen.getByText(/Question 1 of 30/)).toBeTruthy()
})

it('preposition reference: hidden meanings can be shown and hidden again, one at a time or all at once', () => {
  render(<App />)
  pickChapter(8)
  nav('Prepositions')
  tab('Reference')
  fireEvent.click(screen.getByLabelText(/Hide meanings/))
  const hidden = document.querySelectorAll('.reference .reveal').length
  expect(hidden).toBeGreaterThan(0)
  // Show one meaning, then click it again to hide it.
  fireEvent.click(document.querySelector('.reference .reveal')!)
  expect(document.querySelectorAll('.reference .reveal')).toHaveLength(hidden - 1)
  fireEvent.click(document.querySelector('.reference .revealed')!)
  expect(document.querySelectorAll('.reference .reveal')).toHaveLength(hidden)
  fireEvent.click(screen.getByText('Show all'))
  expect(document.querySelectorAll('.reference .reveal')).toHaveLength(0)
  expect(document.querySelectorAll('.reference .revealed')).toHaveLength(hidden)
  fireEvent.click(screen.getByText('Hide all'))
  expect(document.querySelectorAll('.reference .reveal')).toHaveLength(hidden)
})

it('flashcards can span a chapter range, and each card counts toward its own chapter', () => {
  localStorage.clear()
  render(<App />)
  pickChapter(9)
  nav('Flashcards')
  fireEvent.change(screen.getByLabelText('From chapter'), { target: { value: '8' } })
  fireEvent.change(screen.getByLabelText('To chapter'), { target: { value: '12' } })
  // Every word in chapters 8–12 is in the deck: no cap on a round.
  const words = Number(screen.getByText(/\d+ words · \d+ cards/).textContent!.match(/(\d+) words/)![1])
  expect(screen.getByText('The ones you know least come first.')).toBeTruthy()
  expect(words).toBeGreaterThan(30)
  expect(screen.getByText(new RegExp(`${words} to go`))).toBeTruthy()
  for (let i = 0; i < words; i++) {
    fireEvent.click(document.querySelector('.flashcard')!)
    fireEvent.click(screen.getByText('Got it', { exact: false, selector: 'button' }))
  }
  expect(screen.getByText('Deck complete')).toBeTruthy()
  const saved = localStorage.getItem('greek-tutor:v1')!
  const chapters = new Set([...saved.matchAll(/"ch(\d+):vocab:/g)].map((m) => m[1]))
  expect(chapters.size).toBeGreaterThan(1)
  fireEvent.click(screen.getByText('This chapter'))
  expect(screen.queryByText('The ones you know least come first.')).toBeNull()
})

it('chapter 7: genitive and dative charts, and every quiz tab works', () => {
  render(<App />)
  pickChapter(7)
  expect(screen.getByText(/15 new words/)).toBeTruthy()
  expect(screen.queryByText('All prepositions', { selector: 'nav button' })).toBeNull()
  nav('Genitive & dative')
  expect(document.querySelector('.article-table')!.textContent).toContain('τοῦ')
  expect(document.querySelectorAll('.adj-table')).toHaveLength(8)
  for (const t of ['Parse nouns', 'Phrases', 'In verses']) {
    tab(t)
    expect(screen.getByText(/^1 of \d+$/)).toBeTruthy()
    fireEvent.click(document.querySelector('.option')!)
    expect(document.querySelector('.feedback')).toBeTruthy()
  }
})

it('chapter 6: vocabulary only, with flashcards and no test', () => {
  render(<App />)
  pickChapter(6)
  expect(screen.queryByText('Test', { selector: 'nav button' })).toBeNull()
  expect(screen.queryByText('Take the test')).toBeNull()
  nav('Flashcards')
  expect(screen.getByText(/13 words/)).toBeTruthy()
  fireEvent.click(document.querySelector('.flashcard')!)
  fireEvent.click(screen.getByText('Got it', { exact: false, selector: 'button' }))
  expect(screen.getByText(/1 known/)).toBeTruthy()
})

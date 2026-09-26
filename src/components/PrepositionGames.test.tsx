// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { chapter08 } from '../data/chapter08'
import { PrepositionGames } from './PrepositionGames'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('PrepositionGames', () => {
  it('Match: finding every pair finishes the game and saves a best time', () => {
    render(<PrepositionGames chapter={chapter08} />)
    fireEvent.click(screen.getByText('Match', { selector: '.mode strong' }))
    const pairs = [...new Set([...document.querySelectorAll<HTMLElement>('.match-card')].map((c) => c.dataset.pair!))]
    expect(pairs).toHaveLength(6)
    for (const p of pairs) {
      for (const c of document.querySelectorAll<HTMLElement>(`.match-card[data-pair="${p}"]`)) fireEvent.click(c)
    }
    expect(document.querySelectorAll('.match-card.matched')).toHaveLength(12)
    expect(screen.getByText(/All pairs found!|New best time!/)).toBeTruthy()
    expect(localStorage.getItem('greek-tutor:v1')).toContain('prep-match')
  })

  it('Memory: cards start face down', () => {
    render(<PrepositionGames chapter={chapter08} />)
    fireEvent.click(screen.getByText('Memory', { selector: '.mode strong' }))
    expect(document.querySelectorAll('.match-card.down')).toHaveLength(12)
    const first = document.querySelector<HTMLElement>('.match-card')!
    fireEvent.click(first)
    expect(first.className).toContain('up')
  })

  it('Speed round: ends when the minute is up', () => {
    vi.useFakeTimers()
    render(<PrepositionGames chapter={chapter08} />)
    fireEvent.click(screen.getByText('Speed round', { selector: '.mode strong' }))
    fireEvent.click(screen.getByText('Start'))
    fireEvent.click(document.querySelector('.option')!)
    act(() => { vi.advanceTimersByTime(61_000) })
    expect(screen.getByText(/Time’s up!|New best score!/)).toBeTruthy()
    expect(screen.getByText(/of 1 right/)).toBeTruthy()
  })
})

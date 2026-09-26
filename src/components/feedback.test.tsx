// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { ChoiceQuiz, type ChoiceQuestion } from './ChoiceQuiz'
import { Lesson } from './Lesson'

afterEach(cleanup)

const questions = (n: number): ChoiceQuestion[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `test:q${i}`, prompt: `Q${i}`, answer: 'a', review: `Q${i}`,
    options: [{ key: 'a', label: 'right' }, { key: 'b', label: 'wrong' }],
  }))

const answer = (label: 'right' | 'wrong') => {
  fireEvent.click(screen.getByText(label, { selector: '.option', exact: false }))
  fireEvent.click(screen.getByText('Next', { exact: false, selector: 'button' }))
}

describe('quiz feedback', () => {
  it('shows a streak chip from three in a row, and resets it after a miss', () => {
    render(<ChoiceQuiz questions={questions(6)} onRestart={() => {}} />)
    answer('right'); answer('right')
    expect(document.querySelector('.chip.streak')).toBeNull()
    answer('right')
    expect(document.querySelector('.chip.streak')!.textContent).toContain('3 in a row')
    answer('wrong')
    expect(document.querySelector('.chip.streak')).toBeNull()
    expect(screen.getByText('3 right')).toBeTruthy()
  })

  it('marks the right and wrong options', () => {
    render(<ChoiceQuiz questions={questions(1)} onRestart={() => {}} />)
    fireEvent.click(screen.getByText('wrong', { selector: '.option', exact: false }))
    expect(document.querySelector('.option.wrong .mark')!.textContent).toBe('✗')
    expect(document.querySelector('.option.right .mark')!.textContent).toBe('✓')
  })

  it('celebrates a perfect round and announces a 5-in-a-row milestone', () => {
    render(<ChoiceQuiz questions={questions(5)} onRestart={() => {}} />)
    for (let i = 0; i < 4; i++) answer('right')
    fireEvent.click(screen.getByText('right', { selector: '.option', exact: false }))
    expect(screen.getByText('Correct — 5 in a row!')).toBeTruthy()
    fireEvent.click(screen.getByText('Next', { exact: false, selector: 'button' }))
    expect(screen.getByText('Perfect round!')).toBeTruthy()
    expect(document.querySelector('.confetti')).toBeTruthy()
  })

  it('does not celebrate in test mode (the test screen does that itself)', () => {
    render(<ChoiceQuiz test questions={questions(2)} onRestart={() => {}} />)
    fireEvent.click(screen.getByText('right', { selector: '.option', exact: false }))
    fireEvent.click(screen.getByText('right', { selector: '.option', exact: false }))
    expect(screen.queryByText('Perfect round!')).toBeNull()
  })
})

describe('Lesson', () => {
  it('is open the first time and collapsed on the next visit', () => {
    const first = render(<Lesson title="A test lesson">body</Lesson>)
    expect(first.container.querySelector('details')!.open).toBe(true)
    first.unmount()
    const second = render(<Lesson title="A test lesson">body</Lesson>)
    expect(second.container.querySelector('details')!.open).toBe(false)
  })
})

import { useRef, useState } from 'react'
import { ACCENT, BREATHING, ELISION_MARK, IOTA_SUBSCRIPT, fixFinalSigma, markLastLetter, transliterate } from '../lib/greek'

const MARK_BUTTONS = [
  { label: 'ἀ', title: 'Smooth breathing  )', mark: BREATHING.smooth },
  { label: 'ἁ', title: 'Rough breathing  (', mark: BREATHING.rough },
  { label: 'ά', title: 'Acute  /', mark: ACCENT.acute },
  { label: 'ὰ', title: 'Grave  \\', mark: ACCENT.grave },
  { label: 'ᾶ', title: 'Circumflex  =', mark: ACCENT.circumflex },
  { label: 'ᾳ', title: 'Iota subscript  |', mark: IOTA_SUBSCRIPT },
]

const KEYBOARD = ['αβγδεζηθ', 'ικλμνξοπ', 'ρσςτυφχψω']

interface Props {
  value: string
  onChange: (v: string) => void
  onSubmit?: () => void
  disabled?: boolean
  autoFocus?: boolean
  compact?: boolean
  className?: string
  placeholder?: string
}

export function GreekInput({ value, onChange, onSubmit, disabled, autoFocus, compact, className, placeholder }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [showKeys, setShowKeys] = useState(false)

  const insert = (next: string) => {
    onChange(next)
    ref.current?.focus()
  }

  return (
    <div className={`greek-input ${className ?? ''}`}>
      <input
        ref={ref}
        className="greek"
        lang="el"
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder={placeholder ?? 'type Greek…'}
        onChange={(e) => onChange(transliterate(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) {
            e.preventDefault()
            onSubmit()
          }
        }}
      />
      {!compact && !disabled && (
        <>
          <div className="mark-bar">
            {MARK_BUTTONS.map((b) => (
              <button key={b.label} type="button" title={b.title} className="key greek"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insert(markLastLetter(value, b.mark))}>{b.label}</button>
            ))}
            <button type="button" title="Elision mark  '" className="key greek"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insert(value + ELISION_MARK)}>᾽</button>
            <button type="button" className="key link" onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowKeys((s) => !s)}>{showKeys ? 'hide keyboard' : 'keyboard'}</button>
          </div>
          {showKeys && (
            <div className="keyboard">
              {KEYBOARD.map((row) => (
                <div key={row} className="key-row">
                  {[...row].map((ch) => (
                    <button key={ch} type="button" className="key greek"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => insert(fixFinalSigma(value + ch))}>{ch}</button>
                  ))}
                </div>
              ))}
              <div className="key-row">
                <button type="button" className="key wide" onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insert(value + ' ')}>space</button>
                <button type="button" className="key wide" onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insert([...value].slice(0, -1).join(''))}>⌫</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

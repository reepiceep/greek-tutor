import { useEffect, useState } from 'react'

const COLORS = ['var(--accent)', 'var(--good)', 'var(--warn)', 'var(--acc)', 'var(--dat)']

/** A short confetti burst for a perfect round or a passed test. Hidden when the system asks for reduced motion. */
export function Celebration() {
  const [visible, setVisible] = useState(true)
  const [pieces] = useState(() =>
    Array.from({ length: 36 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.4 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 160,
      spin: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      round: i % 3 === 0,
    })),
  )

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={p.round ? 'round' : ''}
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--drift' as string]: `${p.drift}px`,
            ['--spin' as string]: `${p.spin}deg`,
          }}
        />
      ))}
    </div>
  )
}

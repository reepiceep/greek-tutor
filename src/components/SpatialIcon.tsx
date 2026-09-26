import type { Shape } from '../data/types'

// Each picture shows the same box (the preposition's object) and one moving or resting marker.
const BOX = { x: 55, y: 35, w: 50, h: 50 }
const MID = { x: BOX.x + BOX.w / 2, y: BOX.y + BOX.h / 2 }

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const len = 10
  const spread = 0.45
  const head = [
    [x2, y2],
    [x2 - len * Math.cos(angle - spread), y2 - len * Math.sin(angle - spread)],
    [x2 - len * Math.cos(angle + spread), y2 - len * Math.sin(angle + spread)],
  ].map((p) => p.join(',')).join(' ')
  // Stop the line short of the tip so the head stays sharp.
  const lx = x2 - (len - 2) * Math.cos(angle)
  const ly = y2 - (len - 2) * Math.sin(angle)
  return (
    <g className="mover">
      <line x1={x1} y1={y1} x2={lx} y2={ly} strokeWidth={3} strokeLinecap="round" />
      <polygon points={head} />
    </g>
  )
}

/** Most of a circle around the box, ending in an arrowhead. */
function Around() {
  const r = 44
  const pts = Array.from({ length: 33 }, (_, i) => {
    const t = (-100 + (i * 300) / 32) * (Math.PI / 180)
    return [MID.x + r * Math.cos(t), MID.y + (r - 4) * Math.sin(t)]
  })
  const [px, py] = pts[pts.length - 2]
  const [ex, ey] = pts[pts.length - 1]
  return (
    <>
      <polyline className="mover-line" points={pts.slice(0, -1).map((p) => p.join(',')).join(' ')} />
      <Arrow x1={px} y1={py} x2={ex + (ex - px) * 2} y2={ey + (ey - py) * 2} />
    </>
  )
}

const Dot = ({ x, y }: { x: number; y: number }) => <circle className="mover" cx={x} cy={y} r={6} />

function Marker({ shape }: { shape: Shape }) {
  switch (shape) {
    case 'out':
      return <><Dot x={MID.x} y={MID.y + 8} /><Arrow x1={MID.x} y1={MID.y + 2} x2={MID.x} y2={6} /></>
    case 'away':
      return <><Dot x={BOX.x - 7} y={MID.y} /><Arrow x1={BOX.x - 12} y1={MID.y} x2={6} y2={MID.y} /></>
    case 'through':
      return <Arrow x1={6} y1={MID.y} x2={154} y2={MID.y} />
    case 'toward':
      return <Arrow x1={154} y1={MID.y} x2={BOX.x + BOX.w + 4} y2={MID.y} />
    case 'alongside':
      return <Arrow x1={BOX.x - 12} y1={BOX.y - 10} x2={BOX.x - 12} y2={BOX.y + BOX.h + 12} />
    case 'beside':
      return <Dot x={BOX.x + BOX.w + 12} y={MID.y} />
    case 'under':
      return <Dot x={MID.x} y={BOX.y + BOX.h + 13} />
    case 'in':
      return <Dot x={MID.x} y={MID.y} />
    case 'into':
      return <Arrow x1={6} y1={MID.y} x2={MID.x} y2={MID.y} />
    case 'on':
      return <Dot x={MID.x} y={BOX.y - 7} />
    case 'above':
      return <Dot x={MID.x} y={8} />
    case 'around':
      return <Around />
    case 'downFrom':
      return <><Dot x={BOX.x + BOX.w - 6} y={BOX.y - 7} /><Arrow x1={BOX.x + BOX.w + 2} y1={BOX.y - 2} x2={150} y2={112} /></>
  }
}

export function SpatialIcon({ shape, size = 160, label }: { shape: Shape; size?: number; label: string }) {
  return (
    <svg className="spatial" viewBox="0 0 160 120" width={size} height={(size * 3) / 4} role="img" aria-label={label}>
      <rect className="object" x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx={4} />
      <Marker shape={shape} />
    </svg>
  )
}

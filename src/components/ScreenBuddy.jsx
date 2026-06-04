import { useEffect, useReducer, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Web mascot for ScreenPass: a soft, slightly squished yellow squircle with two
// antennae, capsule eyes set into the face, blush cheeks, and a mood-driven smile.
// Idle bob + occasional blink. Decorative — aria-hidden, and all motion gates on
// Reduce Motion (renders a still current-mood frame).

const MOODS = ['hopeful', 'stoked', 'chill', 'idle', 'sleepy']

function smileFor(mood) {
  switch (mood) {
    case 'sleepy': return 0.2
    case 'hopeful': return 0.6
    case 'stoked': return 1.0
    case 'chill': return 0.15
    default: return 0.65 // idle
  }
}

// Eye capsule height (px in the 120 viewBox). Squashes to ~2 on a blink.
function eyeHeightFor(mood, blinking) {
  if (blinking) return 2
  switch (mood) {
    case 'sleepy': return 6
    case 'stoked': return 13
    default: return 12
  }
}

const EYE_CY = 52
// mouth spans x 45→75 on baseline y 73; smile bends the control point down.
function mouthPath(smile) {
  return `M 45 73 Q 60 ${73 + smile * 8} 75 73`
}

export default function ScreenBuddy({ size = 200, mood = 'hopeful', cycle = false, className = '' }) {
  const reduce = useReducedMotion()
  const [autoIndex, advance] = useReducer((i) => (i + 1) % MOODS.length, 0)
  const [blinking, setBlinking] = useState(false)

  useEffect(() => {
    if (!cycle || reduce) return
    const id = setInterval(advance, 2600)
    return () => clearInterval(id)
  }, [cycle, reduce])

  useEffect(() => {
    if (reduce) return
    let t1, t2
    const loop = () => {
      t1 = setTimeout(() => {
        setBlinking(true)
        t2 = setTimeout(() => {
          setBlinking(false)
          loop()
        }, 120)
      }, 3200 + Math.random() * 2600)
    }
    loop()
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduce])

  const active = cycle && !reduce ? MOODS[autoIndex] : mood
  const smile = smileFor(active)
  const eyeH = eyeHeightFor(active, blinking)
  const cheekOpacity = active === 'stoked' ? 0.7 : 0.5

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} role="img">
        <defs>
          <filter id="buddyShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* antennae — drawn first so the stalks tuck behind the head */}
        <g stroke="#1c1c1e" strokeWidth="3" strokeLinecap="round" fill="#1c1c1e">
          <path d="M50 36 Q44 20 40 14" fill="none" />
          <circle cx="40" cy="13" r="4" stroke="none" />
          <path d="M70 36 Q76 20 80 14" fill="none" />
          <circle cx="80" cy="13" r="4" stroke="none" />
        </g>

        {/* head — slightly wider than tall (squished / elongated) */}
        <rect x="24" y="30" width="72" height="62" rx="24" fill="var(--accent)" filter="url(#buddyShadow)" />

        {/* blush cheeks */}
        <circle cx="40" cy="68" r="6" fill="#F2916B" opacity={cheekOpacity} />
        <circle cx="80" cy="68" r="6" fill="#F2916B" opacity={cheekOpacity} />

        {/* eyes — capsules set into the upper face */}
        <motion.rect
          x="46.25" width="7.5" rx="3.75" fill="#1c1c1e"
          animate={{ height: eyeH, y: EYE_CY - eyeH / 2 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />
        <motion.rect
          x="66.25" width="7.5" rx="3.75" fill="#1c1c1e"
          animate={{ height: eyeH, y: EYE_CY - eyeH / 2 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />

        {/* mouth */}
        <motion.path
          fill="none" stroke="#1c1c1e" strokeWidth="3.6" strokeLinecap="round"
          animate={{ d: mouthPath(smile) }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
      </svg>
    </motion.div>
  )
}

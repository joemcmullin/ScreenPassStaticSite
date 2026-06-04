import { useEffect, useReducer, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Web recreation of the iOS app's `ScreenBuddy`: a soft yellow squircle with two
// capsule eyes, a quadratic-curve mouth whose smile maps to `mood`, white cheeks
// when "stoked", an idle bob and an occasional blink. Decorative — aria-hidden,
// and every motion gates on Reduce Motion (renders a still current-mood frame).

const MOODS = ['sleepy', 'hopeful', 'stoked', 'chill', 'idle']

function smileFor(mood) {
  switch (mood) {
    case 'sleepy': return 0.15
    case 'hopeful': return 0.55
    case 'stoked': return 1.0
    case 'chill': return 0.0
    default: return 0.6 // idle
  }
}

function eyeOpenFor(mood, blinking) {
  if (blinking) return 1.2
  switch (mood) {
    case 'sleepy': return 5
    case 'stoked': return 12
    default: return 10
  }
}

// viewBox is 100×100; mouth spans x 35→65 centred on y 65.
function mouthPath(smile) {
  const cy = 65 + smile * 7.5
  return `M 35 65 Q 50 ${cy} 65 65`
}

export default function ScreenBuddy({ size = 200, mood = 'hopeful', cycle = false, className = '' }) {
  const reduce = useReducedMotion()
  const [autoIndex, advance] = useReducer((i) => (i + 1) % MOODS.length, 1)
  const [blinking, setBlinking] = useState(false)

  // When `cycle`, rotate moods on a gentle cadence for an alive hero buddy.
  useEffect(() => {
    if (!cycle || reduce) return
    const id = setInterval(advance, 2600)
    return () => clearInterval(id)
  }, [cycle, reduce])

  // Occasional blink.
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
      }, 3500 + Math.random() * 2500)
    }
    loop()
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [reduce])

  const active = cycle && !reduce ? MOODS[autoIndex] : mood
  const smile = smileFor(active)
  const eyeH = eyeOpenFor(active, blinking)
  const showCheeks = active === 'stoked'

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size }}
      animate={reduce ? {} : { y: [0, -8, 0] }}
      transition={reduce ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} role="img">
        {/* soft drop shadow */}
        <defs>
          <filter id="buddyShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>

        <rect
          x="13" y="13" width="74" height="74" rx="22"
          fill="var(--accent)" filter="url(#buddyShadow)"
        />

        {/* cheeks (stoked only) */}
        {showCheeks && (
          <g>
            <circle cx="33" cy="61" r="3.4" fill="#ffffff" opacity="0.4" />
            <circle cx="67" cy="61" r="3.4" fill="#ffffff" opacity="0.4" />
          </g>
        )}

        {/* eyes — capsules that squash on blink / mood */}
        <motion.rect
          x="32.5" width="8.5" rx="4.25" fill="#1c1c1e"
          animate={{ height: eyeH, y: 45 - eyeH / 2 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />
        <motion.rect
          x="59" width="8.5" rx="4.25" fill="#1c1c1e"
          animate={{ height: eyeH, y: 45 - eyeH / 2 }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />

        {/* mouth */}
        <motion.path
          fill="none" stroke="#1c1c1e" strokeWidth="3.4" strokeLinecap="round"
          animate={{ d: mouthPath(smile) }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        />
      </svg>
    </motion.div>
  )
}

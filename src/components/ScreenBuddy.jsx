import { useEffect, useReducer, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Web mascot for ScreenPass: a soft, flat-ish rounded yellow head with two
// antennae, two eyes centered on the face, and a mood-driven smile. Idle bob +
// occasional blink. Decorative — aria-hidden, and all motion gates on Reduce
// Motion (renders a still current-mood frame).
//
// Eyes blink/squint via a CSS transform (scaleY around their own centre) rather
// than animating the SVG `y` attribute — animating `y` mis-places them on mount.

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

// Vertical scale of the eye capsule: 1 = wide open, ~0.1 = blink.
function eyeScaleFor(mood, blinking) {
  if (blinking) return 0.12
  switch (mood) {
    case 'sleepy': return 0.5
    case 'stoked': return 1.12
    default: return 1
  }
}

const EYE_CY = 62 // eyes sit on the vertical middle of the face
// mouth spans x 46→74 on baseline y 76; smile bends the control point down.
function mouthPath(smile) {
  return `M 46 76 Q 60 ${76 + smile * 8} 74 76`
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
  const eyeScale = eyeScaleFor(active, blinking)
  const eyeStyle = { transformBox: 'fill-box', transformOrigin: 'center' }

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

        {/* antennae — drawn first so the stalks tuck behind the head. Each sways
            around its own base, slightly out of phase, for organic movement. */}
        {/* left antenna — smooth outward arc, springy bouncing sway */}
        <motion.g
          className="buddy-antenna"
          stroke="var(--text-hi)" strokeWidth="3" strokeLinecap="round" fill="var(--text-hi)"
          style={{ transformBox: 'view-box', transformOrigin: '53px 42px' }}
          animate={reduce ? {} : { rotate: [0, -20, 12, -8, 4, 0] }}
          transition={reduce ? {} : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M53 42 C 50 32, 44 24, 36 17" fill="none" />
          <circle cx="36" cy="16" r="4" stroke="none" />
        </motion.g>
        {/* right antenna — a touch more curve, swings on its own springy cadence */}
        <motion.g
          className="buddy-antenna"
          stroke="var(--text-hi)" strokeWidth="3" strokeLinecap="round" fill="var(--text-hi)"
          style={{ transformBox: 'view-box', transformOrigin: '67px 42px' }}
          animate={reduce ? {} : { rotate: [0, 18, -11, 7, -4, 0] }}
          transition={reduce ? {} : { duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M67 42 C 70 32, 77 24, 85 17" fill="none" />
          <circle cx="85" cy="16" r="4" stroke="none" />
        </motion.g>

        {/* head — flatter, with a softly rounded corner radius */}
        <rect x="24" y="38" width="72" height="52" rx="20" fill="var(--accent)" filter="url(#buddyShadow)" />

        {/* eyes — centred on the face, blink via scaleY */}
        <motion.rect
          x="46" y={EYE_CY - 6.5} width="8" height="13" rx="4" fill="#1c1c1e"
          style={eyeStyle}
          animate={{ scaleY: eyeScale }}
          transition={{ duration: 0.12, ease: 'easeInOut' }}
        />
        <motion.rect
          x="66" y={EYE_CY - 6.5} width="8" height="13" rx="4" fill="#1c1c1e"
          style={eyeStyle}
          animate={{ scaleY: eyeScale }}
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

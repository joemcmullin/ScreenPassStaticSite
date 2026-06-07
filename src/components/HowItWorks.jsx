import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow } from './ui.jsx'

gsap.registerPlugin(ScrollTrigger)

/* Unique SVG motif per step ------------------------------------------------ */

function ClockMotif() {
  // concentric rings + a slowly sweeping hand — "set the rhythm"
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <g fill="none" stroke="currentColor" className="text-accent-ink/30">
        <circle cx="60" cy="60" r="52" strokeWidth="1" />
        <circle cx="60" cy="60" r="38" strokeWidth="1" strokeDasharray="3 5" />
        <circle cx="60" cy="60" r="24" strokeWidth="1" />
      </g>
      {[...Array(12)].map((_, i) => (
        <rect key={i} x="59" y="10" width="2" height="7" rx="1" fill="currentColor"
          className="text-accent-ink/40" transform={`rotate(${i * 30} 60 60)`} />
      ))}
      <g style={{ transformOrigin: '60px 60px' }} className="origin-center [animation:spin_8s_linear_infinite]">
        <line x1="60" y1="60" x2="60" y2="26" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx="60" cy="60" r="4" fill="var(--accent)" />
    </svg>
  )
}

function ScanMotif() {
  // a notification "ping" scanning a grid — "kids ask, you decide"
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <g fill="currentColor" className="text-accent-ink/25">
        {[...Array(5)].map((_, r) =>
          [...Array(5)].map((_, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 20} cy={20 + r * 20} r="2.2" />
          )),
        )}
      </g>
      <line x1="8" x2="112" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
        className="[animation:scanY_2.6s_ease-in-out_infinite]">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2.6s" repeatCount="indefinite" />
      </line>
      <g>
        <circle cx="60" cy="60" r="6" fill="var(--accent)" />
        <circle cx="60" cy="60" r="6" fill="none" stroke="var(--accent)" strokeWidth="2"
          className="[animation:pulse-ring_2.4s_cubic-bezier(0.4,0,0.6,1)_infinite] origin-center"
          style={{ transformOrigin: '60px 60px' }} />
      </g>
    </svg>
  )
}

function PulseMotif() {
  // EKG heartbeat via stroke-dashoffset — "everyone stays in sync"
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <path
        d="M6 60 H40 l6 -26 l9 46 l8 -34 l7 14 H114"
        fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        pathLength="100" strokeDasharray="100" className="[animation:dash_2.8s_linear_infinite]"
      />
    </svg>
  )
}

const STEPS = [
  {
    n: '01',
    title: 'Set the rhythm',
    body: 'Create flexible schedules for each child — School Day, Weekend, Vacation — and pick which apps each one covers. No more single, all-or-nothing downtime.',
    Motif: ClockMotif,
  },
  {
    n: '02',
    title: 'Kids ask for a pass',
    body: 'When they want more time, your child taps how much and sends a Pass Request. You get a notification and approve or deny in one tap — no app-switching, no nagging.',
    Motif: ScanMotif,
  },
  {
    n: '03',
    title: 'Everyone stays in sync',
    body: 'A friendly “you’re on a break” screen replaces the cold block, a widget shows today’s status at a glance, and a daily summary keeps you in the loop.',
    Motif: PulseMotif,
  },
]

export default function HowItWorks() {
  const root = useRef(null)

  useEffect(() => {
    // Reduced motion: skip the scale/blur stacking so cards stay static.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.hiw-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.92,
          filter: 'blur(8px)',
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={root} className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow className="justify-center">How it works</Eyebrow>
        <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.7rem]">
          Three steps. <span className="font-play text-accent-ink">Zero standoffs.</span>
        </h2>
      </div>

      <div className="mt-14">
        {STEPS.map((s, i) => (
          <div key={s.n} className="min-h-[78vh]">
            <div
              className="hiw-card sticky top-28 overflow-hidden rounded-[2.5rem] border border-line bg-card p-8 shadow-soft sm:p-12"
              style={{ willChange: 'transform' }}
            >
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <span className="font-mono text-sm font-semibold text-accent-ink">{s.n}</span>
                  <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight text-hi sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-balance leading-relaxed text-mid">{s.body}</p>
                </div>
                <div className="mx-auto h-40 w-40 text-accent-ink sm:h-48 sm:w-48" aria-hidden="true">
                  <s.Motif />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

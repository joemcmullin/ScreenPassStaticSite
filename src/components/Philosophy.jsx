import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow } from './ui.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-word]').forEach((w) => {
        gsap.from(w, {
          opacity: 0.12,
          y: 8,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: w, start: 'top 88%', end: 'top 55%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const big = 'trust, rhythm, and earned freedom.'.split(' ')

  return (
    <section ref={root} className="relative overflow-hidden bg-surface py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 dotgrid opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Eyebrow className="justify-center">Our philosophy</Eyebrow>

        <p className="mt-8 text-lg font-medium text-mid sm:text-xl">
          Most parental controls focus on{' '}
          <span className="text-hi">blocking, spying, and locking kids out.</span>
        </p>

        <h2 className="mt-6 font-play text-4xl font-600 leading-[1.05] tracking-tight text-hi sm:text-6xl">
          We focus on{' '}
          {big.map((w, i) => (
            <span
              key={i}
              data-word
              className={`inline-block ${
                w.startsWith('earned') || w.startsWith('freedom') ? 'text-accent-ink' : ''
              }`}
            >
              {w}&nbsp;
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-balance leading-relaxed text-mid">
          Kids who understand the rules — and have a fair way to ask for more — fight them less.
          ScreenPass is designed to grow trust, not surveillance.
        </p>
      </div>
    </section>
  )
}

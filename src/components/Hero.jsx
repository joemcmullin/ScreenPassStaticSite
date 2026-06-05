import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Bell, ArrowDown, Apple } from 'lucide-react'
import { CTAButton, Eyebrow } from './ui.jsx'
import ScreenBuddy from './ScreenBuddy.jsx'
import { BRAND } from '../config.js'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-rise]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      })
      gsap.from('[data-buddy]', {
        scale: 0.7,
        opacity: 0,
        duration: 1.1,
        ease: 'back.out(1.6)',
        delay: 0.25,
      })
      gsap.from('[data-chip]', {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(2)',
        stagger: 0.12,
        delay: 0.7,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="dotgrid relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* warm ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy column */}
        <div className="text-center lg:text-left">
          <div data-rise className="flex justify-center lg:justify-start">
            <Eyebrow>Coming soon · {BRAND.platforms}</Eyebrow>
          </div>

          <h1 className="mt-6 font-sans text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-hi sm:text-6xl lg:text-[4.4rem]">
            <span data-rise className="block">
              Screen time that gives kids
            </span>
            <span
              data-rise
              className="mt-2 block font-play text-[3.4rem] font-600 leading-[0.95] text-accent-ink sm:text-7xl lg:text-[5.2rem]"
            >
              a pass, not a prison.
            </span>
          </h1>

          <p
            data-rise
            className="mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-mid lg:mx-0"
          >
            ScreenPass swaps one rigid downtime for flexible schedules and one-tap{' '}
            <span className="font-semibold text-hi">Pass Requests</span> — so screen time
            becomes a conversation, not a battle.
          </p>

          <div
            data-rise
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <CTAButton href="#notify" icon={Bell}>
              Get notified at launch
            </CTAButton>
            <CTAButton href="#how" variant="ghost" icon={ArrowDown}>
              See how it works
            </CTAButton>
          </div>

          <p data-rise className="mt-5 flex items-center justify-center gap-2 text-sm text-lo lg:justify-start">
            <Apple className="h-4 w-4" />
            Built for iOS 16+ · Private by design · No ads, ever
          </p>
        </div>

        {/* Buddy column */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            {/* halo */}
            <div className="absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div
              data-buddy
              className="relative flex h-72 w-72 items-center justify-center rounded-[3rem] border border-line bg-card/60 backdrop-blur-sm shadow-soft sm:h-80 sm:w-80"
            >
              <ScreenBuddy size={210} cycle />
            </div>

            {/* floating status chips */}
            <div
              data-chip
              className="absolute -left-6 top-6 flex items-center gap-2 rounded-2xl border border-line bg-card px-3.5 py-2 shadow-card sm:-left-12"
            >
              <span className="h-2 w-2 rounded-full bg-pass" />
              <span className="font-mono text-xs font-medium text-hi">Pass active · 18 min</span>
            </div>

            <div
              data-chip
              className="absolute -right-4 top-1/2 flex items-center gap-2 rounded-2xl border border-line bg-card px-3.5 py-2 shadow-card sm:-right-10"
            >
              <span className="font-mono text-xs text-mid">School Day</span>
              <span className="font-mono text-xs font-semibold text-accent-ink">9:00–15:00</span>
            </div>

            <div
              data-chip
              className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-line bg-card px-3.5 py-2 shadow-card"
            >
              <Bell className="h-3.5 w-3.5 text-accent-ink" />
              <span className="font-mono text-xs text-hi">“15 more min?” → Approved ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

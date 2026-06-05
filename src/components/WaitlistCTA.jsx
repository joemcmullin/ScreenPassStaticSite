import { motion } from 'framer-motion'
import { Apple } from 'lucide-react'
import ScreenBuddy from './ScreenBuddy.jsx'
import NotifyForm from './NotifyForm.jsx'
import { BRAND } from '../config.js'

export default function WaitlistCTA() {
  return (
    <section id="notify" className="relative mx-auto max-w-6xl px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-[3rem] border border-line bg-card px-6 py-14 text-center shadow-soft sm:px-12 sm:py-20"
      >
        {/* ambient accents */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[90px]" />
        <div className="pointer-events-none absolute inset-0 dotgrid opacity-40" />

        <div className="relative flex flex-col items-center">
          <ScreenBuddy size={92} mood="stoked" />

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5 font-mono text-xs text-mid">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Launching {BRAND.launchWindow} · {BRAND.platforms}
          </span>

          <h2 className="mt-6 max-w-2xl font-sans text-3xl font-extrabold leading-[1.05] tracking-tight text-hi sm:text-5xl">
            Be first to give your kids{' '}
            <span className="font-play text-accent-ink">a pass.</span>
          </h2>
          <p className="mt-4 max-w-md text-balance leading-relaxed text-mid">
            Join the launch list and we’ll send one email the day {BRAND.name} arrives on the App Store.
            No spam, no sharing your address — ever.
          </p>

          <NotifyForm />

          <span className="mt-5 flex items-center gap-2 text-sm text-lo">
            <Apple className="h-4 w-4" />
            Coming to the App Store
          </span>
        </div>
      </motion.div>
    </section>
  )
}

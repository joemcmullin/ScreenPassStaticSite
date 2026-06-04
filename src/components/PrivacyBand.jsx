import { motion } from 'framer-motion'
import { ShieldCheck, EyeOff, Smartphone, Ban } from 'lucide-react'
import { Eyebrow } from './ui.jsx'

// A prominent "private by design" strip. Doubles as the #privacy summary; the
// full legal policy lives below at #privacy-policy.
const POINTS = [
  {
    icon: EyeOff,
    title: 'We can’t see what your kids do',
    body: 'ScreenPass is built on Apple’s Family Controls. The app works with opaque tokens — it never sees app names, messages, browsing, or content.',
  },
  {
    icon: Smartphone,
    title: 'Your data stays on the device',
    body: 'Schedules, profiles and pass history live in your device’s secure App Group storage — not on our servers.',
  },
  {
    icon: Ban,
    title: 'No ads, no tracking, no resale',
    body: 'No third-party analytics or advertising SDKs. We have nothing to sell because we collect nothing to sell.',
  },
]

export default function PrivacyBand() {
  return (
    <section id="privacy" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Private by design</Eyebrow>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.6rem]">
            The opposite of <span className="font-play text-accent-ink">creepy.</span>
          </h2>
          <p className="mt-4 max-w-md text-balance leading-relaxed text-mid">
            Most monitoring apps work by watching everything. ScreenPass works by changing the rules of
            access — which means there’s nothing to spy on in the first place.
          </p>
          <a
            href="#privacy-policy"
            className="link-lift mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink"
          >
            <ShieldCheck className="h-4 w-4" />
            Read the full Privacy Policy
          </a>
        </div>

        <div className="grid gap-4">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-start gap-4 rounded-3xl border border-line bg-card p-5 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-sans font-bold tracking-tight text-hi">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-mid">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

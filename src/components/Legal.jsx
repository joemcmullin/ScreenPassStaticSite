import { useState } from 'react'
import { ChevronDown, ShieldCheck, ScrollText, Send, ArrowUpRight } from 'lucide-react'
import { Eyebrow } from './ui.jsx'
import { BRAND } from '../config.js'
import NotifyForm from './NotifyForm.jsx'

const FAQ = [
  {
    q: 'When does ScreenPass launch?',
    a: `We’re targeting a ${BRAND.launchWindow} release on ${BRAND.platforms}. Join the launch list and you’ll be among the first to know the moment it’s on the App Store.`,
  },
  {
    q: 'How much will it cost?',
    a: 'ScreenPass starts with a 14-day free trial that unlocks every feature. After that it continues as an auto-renewing subscription. Final pricing is shown in the app before you purchase.',
  },
  {
    q: 'Can ScreenPass see my child’s messages, photos, or browsing?',
    a: 'No. ScreenPass is built on Apple’s Family Controls, which hands the app opaque tokens — not names or content. It cannot read messages, see photos, or track browsing. It changes access; it doesn’t watch behavior.',
  },
  {
    q: 'What is a Pass Request?',
    a: 'When a child wants more screen time, they send a Pass Request from their device. You receive a notification and approve or deny it in a single tap — no back-and-forth, no unlocking menus.',
  },
  {
    q: 'Does it work on Android?',
    a: "Not at this time. ScreenPass is a native Apple app built on Family Controls, and it's launching on iPhone (iOS 16 and later).",
  },
  {
    q: 'Will my schedules sync to the cloud?',
    a: 'Schedules, child profiles, and pass history are stored in your device’s secure App Group storage. We don’t keep them on our servers.',
  },
]

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-sans text-base font-semibold text-hi sm:text-lg">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-accent-ink transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-mid">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

// The full legal text lives on dedicated, always-expanded pages (/privacy, /terms)
// so the App Store, in-app links, and link-checkers get a plain, full-text URL.
// The homepage just links to them — no duplicate copy to keep in sync.
const LEGAL_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Privacy Policy',
    blurb: 'How we handle information. Short version: your family’s data stays on your device, and we never sell anything.',
    href: '/privacy',
  },
  {
    icon: ScrollText,
    title: 'Terms of Service',
    blurb: 'The agreement for using ScreenPass — license, subscriptions, and the legal essentials.',
    href: '/terms',
  },
]

export default function Legal() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
      {/* FAQ */}
      <div id="faq" className="scroll-mt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Questions, answered</Eyebrow>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.6rem]">
            Frequently asked
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>

      {/* Privacy & Terms — link cards to the dedicated pages */}
      <div id="legal" className="mt-24 scroll-mt-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">The fine print</Eyebrow>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.6rem]">
            Privacy &amp; terms
          </h2>
          <p className="mt-4 text-balance text-mid">
            The full, current versions live on their own pages — easy to read, link, and reference.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {LEGAL_CARDS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group flex flex-col rounded-[2rem] border border-line bg-card p-7 shadow-card transition-colors hover:bg-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-sans text-xl font-extrabold tracking-tight text-hi">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-mid">{c.blurb}</p>
              <span className="link-lift mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                Read the full {c.title}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Support */}
      <div id="support" className="mt-20 scroll-mt-28">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-line bg-card p-7 shadow-card sm:p-9">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
              <Send className="h-5 w-5" />
            </span>
            <h3 className="font-sans text-xl font-extrabold tracking-tight text-hi">Support</h3>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-mid">
            Need a hand, found a bug, or have a feature request? Use the form below or email{' '}
            <a className="text-accent-ink" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>. To help
            us help you fast, include your device model, iOS version, and a short description of what you expected
            versus what happened. We read every message and aim to reply within two business days.
          </p>
          <NotifyForm
            submitLabel="Send message"
            successText="Thanks — we've got your message and we'll reply within two business days."
            subject="ScreenPass — Support request"
            defaultMessage=""
            footnote="We usually reply within two business days."
            icon={Send}
          />
        </div>
      </div>
    </section>
  )
}

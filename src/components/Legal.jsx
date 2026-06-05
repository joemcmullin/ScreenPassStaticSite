import { useState } from 'react'
import { ChevronDown, ShieldCheck, ScrollText, LifeBuoy, Send } from 'lucide-react'
import { Eyebrow } from './ui.jsx'
import { BRAND, LEGAL_EFFECTIVE } from '../config.js'
import NotifyForm from './NotifyForm.jsx'

const FAQ = [
  {
    q: 'When does ScreenPass launch?',
    a: `We’re targeting a ${BRAND.launchWindow} release on ${BRAND.platforms}. Join the launch list and you’ll be among the first to know the moment it’s on the App Store.`,
  },
  {
    q: 'How much will it cost?',
    a: 'ScreenPass starts with a 14-day free trial that unlocks every feature. After that it continues as a subscription. Final pricing is announced at launch.',
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

function LegalPanel({ id, icon: Icon, title, children, collapsible = false }) {
  const [open, setOpen] = useState(false)
  const bodyId = `${id}-body`

  const header = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-sans text-xl font-extrabold tracking-tight text-hi">{title}</h3>
        <p className="font-mono text-xs text-lo">Effective {LEGAL_EFFECTIVE}</p>
      </div>
    </>
  )

  const body = (
    <div className="prose-legal space-y-4 text-[0.95rem] leading-relaxed text-mid">{children}</div>
  )

  if (!collapsible) {
    return (
      <article id={id} className="scroll-mt-28 rounded-[2rem] border border-line bg-card p-7 shadow-card sm:p-9">
        <div className="mb-5 flex items-center gap-3">{header}</div>
        {body}
      </article>
    )
  }

  return (
    <article id={id} className="scroll-mt-28 rounded-[2rem] border border-line bg-card p-7 shadow-card sm:p-9">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 text-left"
        aria-expanded={open}
        aria-controls={bodyId}
      >
        {header}
        <ChevronDown
          className={`ml-auto h-5 w-5 shrink-0 text-accent-ink transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={bodyId}
        className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] pt-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">{body}</div>
      </div>
    </article>
  )
}

const H = ({ children }) => <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-hi">{children}</h4>

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

      {/* Legal */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">The fine print</Eyebrow>
          <h2 className="mt-5 font-sans text-3xl font-extrabold tracking-tight text-hi sm:text-[2.6rem]">
            Privacy, terms & support
          </h2>
        </div>

        <div className="mt-10 grid gap-6">
          {/* PRIVACY POLICY */}
          <LegalPanel id="privacy-policy" icon={ShieldCheck} title="Privacy Policy" collapsible>
            <p>
              {BRAND.name} is built by {BRAND.studio} (“we,” “us”). We designed it to do its job while
              collecting as little about you and your family as technically possible. This policy explains
              what that means.
            </p>
            <H>What we collect</H>
            <p>
              Almost nothing. The schedules you create, your children’s profiles, and your Pass Request
              history are stored on your device in a secure App Group container. We do not upload this data
              to our servers, and there are no third-party advertising or analytics SDKs in the app.
            </p>
            <H>Screen Time &amp; Family Controls</H>
            <p>
              {BRAND.name} uses Apple’s Family Controls, Managed Settings, and Device Activity frameworks to
              apply your rules. Apple provides these as privacy-preserving <em>opaque tokens</em>: the app can
              restrict an app or website you select, but it never receives the app’s name, your child’s
              messages, photos, browsing history, or any content. We cannot see what we are not given.
            </p>
            <H>Subscriptions</H>
            <p>
              Purchases and the free trial are processed by Apple through the App Store. We receive a
              subscription status (active or not) to unlock features — we never see your card number or
              billing details. Subscription management is handled in your Apple account settings.
            </p>
            <H>Children’s privacy</H>
            <p>
              {BRAND.name} is rated 4+ and intended to be configured by a parent or guardian. Because
              family data stays on the device and is never transmitted to us, we do not knowingly collect
              personal information from children.
            </p>
            <H>Your controls</H>
            <p>
              You can delete all data {BRAND.name} stores by removing the app from your device. To ask a
              question about your privacy, you can contact us using the form in the Support section below.
            </p>
          </LegalPanel>

          {/* TERMS */}
          <LegalPanel id="terms" icon={ScrollText} title="Terms of Use" collapsible>
            <p>
              By downloading or using {BRAND.name}, you agree to these Terms of Use, the Privacy Policy
              above, and Apple’s Licensed Application End User License Agreement (the standard EULA at
              <a className="text-accent-ink" href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer"> apple.com/legal/.../stdeula</a>).
            </p>
            <H>License</H>
            <p>
              We grant you a personal, non-transferable, non-exclusive license to use {BRAND.name} on Apple
              devices you own or control, for your personal, non-commercial family use.
            </p>
            <H>Subscriptions &amp; billing</H>
            <p>
              {BRAND.name} offers a 14-day free trial with full access. After the trial, continued use
              requires an auto-renewing subscription billed through your Apple account. Your subscription
              renews automatically unless cancelled at least 24 hours before the end of the current period.
              You can manage or cancel anytime in your device’s Settings. Final pricing is shown in-app
              before purchase.
            </p>
            <H>Acceptable use</H>
            <p>
              {BRAND.name} is a tool to help families manage screen time by agreement. You agree to use it
              lawfully and only to manage devices and accounts you are responsible for.
            </p>
            <H>No warranty &amp; limitation of liability</H>
            <p>
              {BRAND.name} is provided “as is.” Device-management behavior depends on Apple’s operating
              system and frameworks, which can change. To the fullest extent permitted by law,
              {' '}{BRAND.studio} is not liable for indirect or incidental damages arising from use of the app.
            </p>
            <H>Changes</H>
            <p>
              We may update these terms as the app evolves. Material changes will be reflected by the
              effective date above and, where appropriate, noted in the app.
            </p>
          </LegalPanel>

          {/* SUPPORT */}
          <LegalPanel id="support" icon={LifeBuoy} title="Support">
            <p>
              Need a hand, found a bug, or have a feature request? We read every message and aim to reply
              within two business days.
            </p>
            <H>Contact</H>
            <p>
              Use the form below to reach us. To help us help you fast, include your device model, iOS
              version, and a short description of what you expected versus what happened.
            </p>
            <NotifyForm
              submitLabel="Send message"
              successText="Thanks — we've got your message and we'll reply within two business days."
              subject="ScreenPass — Support request"
              defaultMessage=""
              footnote="We usually reply within two business days."
              icon={Send}
            />
            <H>Before launch</H>
            <p>
              {BRAND.name} isn’t on the App Store yet. If you’d like product updates and to be notified the
              day it ships, join the launch list below.
            </p>
          </LegalPanel>
        </div>
      </div>
    </section>
  )
}

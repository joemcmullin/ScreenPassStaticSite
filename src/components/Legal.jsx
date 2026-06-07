import { useEffect, useState } from 'react'
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

function LegalPanel({ id, icon: Icon, title, children, collapsible = false }) {
  const [open, setOpen] = useState(false)
  const bodyId = `${id}-body`

  // Auto-expand when this panel is the navigation target (e.g. a header link to
  // #privacy-policy or #terms), on first load and on later hash changes, so the
  // linked content is actually visible — not hidden behind a collapsed header.
  useEffect(() => {
    if (!collapsible) return
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}`) setOpen(true)
    }
    openIfTargeted()
    window.addEventListener('hashchange', openIfTargeted)
    return () => window.removeEventListener('hashchange', openIfTargeted)
  }, [collapsible, id])

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

const H = ({ children }) => (
  <h4 className="pt-2 font-sans text-sm font-bold uppercase tracking-wide text-hi">{children}</h4>
)

const APPLE_EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

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
            Privacy &amp; terms
          </h2>
          <p className="mt-4 text-balance text-mid">
            Tap a section to read it in full. Short version: your family’s data stays on your device, we
            can’t see what your kids do, and we never sell anything.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* ============================ PRIVACY POLICY ============================ */}
          <LegalPanel id="privacy-policy" icon={ShieldCheck} title="Privacy Policy" collapsible>
            <p>
              This Privacy Policy explains how {BRAND.studio} (“{BRAND.name},” “we,” “us,” or “our”) handles
              information in connection with the {BRAND.name} iPhone app (the “App”) and this website at
              screenpassapp.com (the “Site”). {BRAND.name} is built to do its job while collecting as little
              about you and your family as technically possible.
            </p>

            <H>The short version</H>
            <p>
              Your family’s data — schedules, child profiles, and Pass Request history — stays on your
              device. The App is built on Apple’s Family Controls, so it never sees the names of the apps you
              restrict, your child’s messages, photos, or browsing. There are no third-party advertising or
              analytics SDKs in the App. We don’t sell data, and we don’t build profiles about you. The only
              information we actually receive is what you choose to send us (for example, an email through
              this Site).
            </p>

            <H>Our privacy-first design (Family Controls)</H>
            <p>
              {BRAND.name} uses Apple’s Family Controls, Managed Settings, and Device Activity frameworks to
              apply the rules you set. Apple provides these through privacy-preserving{' '}
              <em>opaque tokens</em>: the App can restrict an app or website you select, but it never receives
              the app’s name, bundle identifier, URL, your child’s messages, photos, browsing history, or any
              other content. We cannot see what Apple does not give us — and Apple does not give us your
              child’s activity.
            </p>

            <H>Information the App collects</H>
            <p>
              Almost none. The schedules you create, your children’s profiles (a name and an icon you
              choose), and your Pass Request history are stored on your device in a secure App Group
              container. This information is not transmitted to us and is not kept on our servers — we do not
              operate a backend account system for this data. The App does not require you to create an
              account or provide personal information to function.
            </p>

            <H>Information you send us (Site &amp; support)</H>
            <p>
              When you join the launch list or contact us through this Site, you provide your name, email
              address, and any message you write. We use this solely to reply to you and, if you ask, to
              notify you when {BRAND.name} launches. These messages are processed by our customer-support
              provider, Fernand (getfernand.com), which receives them on our behalf. We don’t sell this
              information or use it for advertising.
            </p>

            <H>Information related to purchases</H>
            <p>
              Subscriptions and the free trial are processed by Apple through the App Store. Apple tells the
              App whether your subscription is active so we can unlock features — we never receive your name,
              card number, or billing details. Subscription management happens in your Apple account settings.
            </p>

            <H>How we use information</H>
            <p>
              We use the limited information described above to: provide and operate {BRAND.name}; respond to
              your messages and support requests; send you the one launch email you requested (if you joined
              the list); maintain the security and integrity of the App and Site; and comply with our legal
              obligations. We do not use your information for advertising, profiling, or to track you across
              other apps or websites.
            </p>

            <H>What we never do</H>
            <p>
              We do not sell or rent your personal information. We do not include third-party advertising or
              analytics SDKs in the App. We do not build behavioral profiles, and we do not track you across
              other companies’ apps or websites (so the App does not present an App Tracking Transparency
              prompt, because it does not track).
            </p>

            <H>Children’s privacy (COPPA &amp; GDPR-K)</H>
            <p>
              {BRAND.name} is rated 4+ and is designed to be set up and operated by a parent, guardian, or
              other responsible adult. Because your family’s data stays on the device and is never transmitted
              to us, we do not knowingly collect personal information from children. We do not direct the Site
              to children and do not knowingly collect information from a child under 13 (or the equivalent
              minimum age in your country) through the Site. If you believe a child has provided us personal
              information through the Site, contact us at {BRAND.supportEmail} and we will delete it.
            </p>

            <H>Third-party services</H>
            <p>
              We rely on a small number of service providers, each handling data only as needed to provide
              their service and under their own privacy terms, with protections at least equivalent to those
              described here:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Apple</strong> — the App Store, in-app purchases/subscriptions, and the Family Controls frameworks the App is built on.</li>
              <li><strong>Fernand</strong> (getfernand.com) — processes the name, email, and message you submit through the Site’s forms so we can reply.</li>
              <li><strong>GitHub Pages</strong> — hosts this static website; standard web server logs may be processed by GitHub to deliver and protect the Site.</li>
            </ul>

            <H>Data retention &amp; deletion</H>
            <p>
              App data lives on your device for as long as the App is installed. You can delete all of it at
              any time by removing the App from your device. Messages you send us through the Site are kept
              only as long as needed to handle your request and a reasonable period afterward, then deleted.
              To request deletion of information you’ve sent us, email {BRAND.supportEmail}.
            </p>

            <H>Security</H>
            <p>
              On-device data is protected by iOS’s app sandbox and App Group protections. Information
              submitted through the Site is transmitted over encrypted connections (HTTPS). No method of
              storage or transmission is perfectly secure, but we keep the data we touch to a minimum and
              protect it with appropriate safeguards.
            </p>

            <H>Your rights &amp; choices</H>
            <p>
              You can delete all App data by removing the App. For information you’ve sent us through the
              Site, you may request access, correction, or deletion, and you may withdraw consent to further
              contact, by emailing {BRAND.supportEmail}. Depending on where you live, you may have additional
              rights: California residents (CCPA/CPRA) have the right to know, delete, and opt out of the
              “sale” or “sharing” of personal information — we do not sell or share personal information.
              Residents of the EEA and UK (GDPR) have rights of access, rectification, erasure, restriction,
              portability, and objection, and may lodge a complaint with their local supervisory authority;
              our legal basis for processing the information you submit is your consent and our legitimate
              interest in responding to you.
            </p>

            <H>International users</H>
            <p>
              {BRAND.name} is operated from the United States. If you contact us from outside the United
              States, the information you send may be processed in the United States and other countries where
              our service providers operate.
            </p>

            <H>Changes to this policy</H>
            <p>
              We may update this Privacy Policy as {BRAND.name} evolves. Changes take effect when posted, and
              we’ll update the “Effective” date above. Material changes will be highlighted here and, where
              appropriate, in the App.
            </p>

            <H>Contact</H>
            <p>
              Questions about your privacy? Email{' '}
              <a className="text-accent-ink" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>,
              or use the form in the Support section below. {BRAND.name} is a product of {BRAND.studio}.
            </p>
          </LegalPanel>

          {/* ============================ TERMS OF SERVICE ============================ */}
          <LegalPanel id="terms" icon={ScrollText} title="Terms of Service" collapsible>
            <p>
              These Terms of Service (“Terms”) are a legal agreement between you and {BRAND.studio} (“{BRAND.name},”
              “we,” “us”) governing your use of the {BRAND.name} app and this website. By downloading,
              installing, or using {BRAND.name}, you agree to these Terms, to our Privacy Policy above, and to
              Apple’s Licensed Application End User License Agreement (the “Standard EULA,” available at{' '}
              <a className="text-accent-ink" href={APPLE_EULA} target="_blank" rel="noreferrer">apple.com/legal/.../stdeula</a>).
              If you do not agree, do not use {BRAND.name}.
            </p>

            <H>Eligibility</H>
            <p>
              You must be at least 18 years old and a parent, legal guardian, or other adult authorized to
              manage the devices and family members you set up in {BRAND.name}. You are responsible for the
              accounts and devices you choose to manage and for complying with all laws that apply to you.
            </p>

            <H>License</H>
            <p>
              We grant you a personal, limited, non-exclusive, non-transferable, revocable license to use
              {' '}{BRAND.name} on Apple-branded devices you own or control, for your personal,
              non-commercial family use, in accordance with these Terms and the Standard EULA.
            </p>

            <H>How the service works</H>
            <p>
              {BRAND.name} helps you manage screen time by applying schedules and approving or denying Pass
              Requests through Apple’s Family Controls. Because the App depends on Apple’s operating system
              and frameworks — which Apple may change — we cannot guarantee that any specific app or website
              will always be restrictable, or that schedules and restrictions will apply without delay.
              {' '}{BRAND.name} is a tool to assist parents; it is not a substitute for your own supervision.
            </p>

            <H>Free trial, subscriptions &amp; billing</H>
            <p>
              {BRAND.name} offers a 14-day free trial with full access. If you don’t cancel before the trial
              ends, it automatically converts to a paid, auto-renewing subscription. The subscription renews
              automatically for the same period (for example, monthly or yearly) and bills your Apple account
              at the then-current price <strong>until you cancel</strong>. Your account is charged for renewal
              within 24 hours before the end of the current period. The exact price, billing period, and what’s
              included are shown in the App before you purchase. You can manage or cancel your subscription, or
              turn off auto-renewal, at any time in <em>Settings → your Apple Account → Subscriptions</em>;
              cancellation takes effect at the end of the current billing period.
            </p>

            <H>Payments &amp; refunds</H>
            <p>
              All payments are processed by Apple through your App Store account; we never see or store your
              payment details. Refunds are handled by Apple under its standard policies — we cannot grant
              refunds directly. To request one, visit reportaproblem.apple.com.
            </p>

            <H>Acceptable use</H>
            <p>
              You agree to use {BRAND.name} only for its intended purpose — managing the screen time of
              children or devices you are legally responsible for — and in compliance with all applicable
              laws. You agree not to: use the App to monitor or restrict an adult without their knowledge and
              consent where the law requires it; reverse engineer, decompile, or attempt to extract the
              source code of the App except as permitted by law; interfere with or disrupt the App, Site, or
              their security; or use the App in any unlawful, harmful, or abusive way.
            </p>

            <H>Intellectual property</H>
            <p>
              {BRAND.name}, the ScreenBuddy character, our logos, and the content of the App and Site are
              owned by {BRAND.studio} and protected by intellectual-property laws. These Terms don’t grant you
              any right to use our names, logos, or branding without our prior written permission.
            </p>

            <H>Disclaimers</H>
            <p>
              {BRAND.name} is provided “as is” and “as available,” without warranties of any kind, whether
              express or implied, including implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement. We do not warrant that the App will be uninterrupted, error-free,
              or that restrictions will always apply as intended, since this depends on Apple’s frameworks and
              your device configuration.
            </p>

            <H>Limitation of liability</H>
            <p>
              To the fullest extent permitted by law, {BRAND.studio} and its owners and contributors will not
              be liable for any indirect, incidental, special, consequential, or punitive damages, or for any
              loss arising from your use of (or inability to use) {BRAND.name}. To the extent liability cannot
              be excluded, our total liability is limited to the amount you paid us for the App in the twelve
              months before the claim.
            </p>

            <H>Indemnification</H>
            <p>
              You agree to indemnify and hold harmless {BRAND.studio} from any claims, losses, or expenses
              arising out of your misuse of {BRAND.name} or your violation of these Terms or applicable law.
            </p>

            <H>Termination</H>
            <p>
              You may stop using {BRAND.name} at any time by cancelling your subscription and deleting the
              App. We may suspend or terminate your access if you violate these Terms. Sections that by their
              nature should survive termination (such as disclaimers, limitation of liability, and
              indemnification) will continue to apply.
            </p>

            <H>Apple &amp; the Standard EULA</H>
            <p>
              Your license to use {BRAND.name} is also subject to Apple’s Standard EULA. As required by Apple,
              you acknowledge that: these Terms are between you and us, not Apple; Apple has no obligation to
              provide maintenance or support for the App; and Apple, and Apple’s subsidiaries, are
              third-party beneficiaries of these Terms and may enforce them against you.
            </p>

            <H>Governing law &amp; changes</H>
            <p>
              These Terms are governed by the laws of the United States and the state in which {BRAND.studio}{' '}
              is organized, without regard to conflict-of-laws rules. We may update these Terms as {BRAND.name}
              {' '}evolves; changes take effect when posted, with the “Effective” date updated above, and your
              continued use means you accept the updated Terms.
            </p>

            <H>Contact</H>
            <p>
              Questions about these Terms? Email{' '}
              <a className="text-accent-ink" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
            </p>
          </LegalPanel>

          {/* ============================ SUPPORT ============================ */}
          <LegalPanel id="support" icon={LifeBuoy} title="Support">
            <p>
              Need a hand, found a bug, or have a feature request? We read every message and aim to reply
              within two business days.
            </p>
            <H>Contact</H>
            <p>
              Use the form below to reach us, or email{' '}
              <a className="text-accent-ink" href={`mailto:${BRAND.supportEmail}`}>{BRAND.supportEmail}</a>.
              To help us help you fast, include your device model, iOS version, and a short description of
              what you expected versus what happened.
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
              day it ships, join the launch list above.
            </p>
          </LegalPanel>
        </div>
      </div>
    </section>
  )
}

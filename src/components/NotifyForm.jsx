// On-page launch / contact form. Replaces the old `mailto:` CTA so visitors
// never have to open their own email client — they fill name + email (+ an
// optional note) and it's submitted straight into our Fernand inbox via the
// headless contact endpoint. ScreenPass support shares the existing Fernand
// workspace, so we use that workspace's appId and prefix the subject with
// "ScreenPass" to keep it identifiable alongside Journey Tracker.

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, Loader2 } from 'lucide-react'

const FERNAND_ENDPOINT = 'https://api.getfernand.com/messenger/contact'
const FERNAND_APP_ID = 'journey-tracker'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Pre-filled so the visitor can just hit send — they can edit or clear it.
const DEFAULT_MESSAGE =
  "Hi ScreenPass team — please let me know the moment the app is released on the App Store. I'd like to be on the launch list. Thanks!"

const inputCls =
  'w-full rounded-2xl border border-line bg-bg px-4 py-3 text-[0.95rem] text-hi ' +
  'placeholder:text-lo outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40'

export default function NotifyForm({
  submitLabel = 'Notify me at launch',
  successText = "You're on the list! We'll email you the day ScreenPass launches.",
  subject = 'ScreenPass — Launch list / website contact',
  defaultMessage = DEFAULT_MESSAGE,
  footnote = "No spam, ever. One email at launch — that's it.",
  icon: Icon = Bell,
} = {}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(defaultMessage)
  const [honeypot, setHoneypot] = useState('') // bots fill this; humans never see it
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'sending' || status === 'success') return
    if (honeypot) return // silently drop bot submissions

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    setStatus('sending')
    try {
      const res = await fetch(FERNAND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-AppId': FERNAND_APP_ID,
        },
        body: JSON.stringify({
          slug: FERNAND_APP_ID,
          name: name.trim(),
          email: email.trim(),
          subject,
          message:
            message.trim() ||
            'Requested launch notification from the ScreenPass website.',
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again, or email support@screenpassapp.com.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        role="status"
        aria-live="polite"
        className="mt-8 flex w-full max-w-md items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 text-left shadow-card"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[#1c1c1e]">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <p className="text-sm leading-relaxed text-hi">
          {successText}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 w-full max-w-md text-left">
      {/* Honeypot — visually hidden, off the tab order. Bots fill it; people don't. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
      />

      <div className="flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="nf-name" className="sr-only">Your name</label>
            <input
              id="nf-name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby={error ? 'nf-error' : undefined}
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="nf-email" className="sr-only">Your email</label>
            <input
              id="nf-email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={error ? 'nf-error' : undefined}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label htmlFor="nf-message" className="sr-only">Message (optional)</label>
          <textarea
            id="nf-message"
            rows={3}
            maxLength={2000}
            placeholder="Anything you'd like us to know? (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>

        {error && (
          <p id="nf-error" role="alert" className="text-sm font-medium text-deny">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-magnetic group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight text-[#1c1c1e] shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
          <span className="relative z-10 inline-flex items-center gap-2">
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending&hellip;
              </>
            ) : (
              <>
                {submitLabel} <Icon className="h-4 w-4" />
              </>
            )}
          </span>
        </button>

        <p className="text-xs text-lo">{footnote}</p>
      </div>
    </form>
  )
}

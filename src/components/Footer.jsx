import { Bell } from 'lucide-react'
import { Logo } from './ui.jsx'
import { BRAND } from '../config.js'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Private by design', href: '#privacy' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Terms of Use', href: '#terms' },
      { label: 'Support', href: '#support' },
    ],
  },
]

export default function Footer() {
  const year = 2026
  return (
    <footer className="relative mt-10 rounded-t-[3rem] bg-surface pt-16 sm:rounded-t-[4rem]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-10 pb-14 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-balance text-sm leading-relaxed text-mid">
              {BRAND.purpose} {BRAND.tagline}
            </p>
            <a
              href="#notify"
              className="btn-magnetic group/btn relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#1c1c1e]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover/btn:translate-x-0" />
              <Bell className="relative z-10 h-4 w-4" />
              <span className="relative z-10">Notify me at launch</span>
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-lo">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="link-lift inline-block text-sm text-mid hover:text-hi">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-mid">
              In development · Launching {BRAND.launchWindow}
            </span>
          </div>

          <p className="text-sm text-lo">
            © {year} {BRAND.name}. Designed &amp; built by{' '}
            <a
              href={BRAND.studioUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent-ink hover:underline"
            >
              {BRAND.studio}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

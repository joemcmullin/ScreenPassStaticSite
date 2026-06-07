import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor, Bell, Menu, X } from 'lucide-react'
import { Logo, CTAButton } from './ui.jsx'
import { useTheme } from '../lib/useTheme.js'
import { NAV_LINKS } from '../config.js'

const ICON = { light: Sun, dark: Moon, system: Monitor }

export default function Navbar() {
  const { theme, cycle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ThemeIcon = ICON[theme]

  // Morph the floating island into an opaque bar as soon as the page scrolls,
  // so the hero text never bleeds through the nav. A simple scrollY check is
  // reliable here — the previous IntersectionObserver watched #top, which wraps
  // the ENTIRE page, so it stayed "intersecting" and never toggled `scrolled`.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? 'border-line bg-bg/95 backdrop-blur-xl shadow-card'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-lift text-sm font-medium text-mid hover:text-hi"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cycle}
            aria-label={`Theme: ${theme}. Click to change.`}
            title={`Theme: ${theme}`}
            className="btn-magnetic flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-hi hover:bg-card-hover"
          >
            <ThemeIcon className="h-[1.05rem] w-[1.05rem]" />
          </button>

          <a
            href="#notify"
            className="btn-magnetic group/btn relative hidden items-center gap-2 overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[#1c1c1e] sm:inline-flex"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover/btn:translate-x-0" />
            <Bell className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Notify me</span>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-hi lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="absolute top-[4.5rem] w-[calc(100%-2rem)] max-w-5xl rounded-4xl border border-line bg-bg/95 p-4 backdrop-blur-xl shadow-soft lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-hi hover:bg-card-hover"
              >
                {l.label}
              </a>
            ))}
            <CTAButton href="#notify" icon={Bell} className="mt-2 w-full" onClick={() => setOpen(false)}>
              Notify me at launch
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  )
}

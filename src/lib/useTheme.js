import { useCallback, useEffect, useState } from 'react'

// Three-state theme: Light → Dark → System. Persists the *choice* (not just the
// resolved value) so "System" keeps tracking the OS even after a manual visit.
// The initial html class is applied pre-paint by the inline script in index.html.

const ORDER = ['light', 'dark', 'system']

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(theme) {
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark())
  document.documentElement.classList.toggle('dark', dark)
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'system'
    } catch {
      return 'system'
    }
  })

  // Re-apply whenever the choice changes.
  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  // While on "System", follow live OS appearance changes.
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [theme])

  const cycle = useCallback(() => {
    setTheme((t) => ORDER[(ORDER.indexOf(t) + 1) % ORDER.length])
  }, [])

  return { theme, cycle }
}

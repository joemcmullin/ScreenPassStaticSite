/* Theme + nav behavior for the standalone legal pages. Uses the SAME
   localStorage('theme') key as the React app (src/lib/useTheme.js) so the
   light/dark/system choice stays in sync across the whole site. */
(function () {
  var KEY = 'theme'
  var ORDER = ['light', 'dark', 'system']
  var root = document.documentElement
  var mq = window.matchMedia('(prefers-color-scheme: dark)')

  var ICONS = {
    light:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    dark:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    system:
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  }

  function current() { try { return localStorage.getItem(KEY) || 'system' } catch (e) { return 'system' } }
  function apply(t) { root.classList.toggle('dark', t === 'dark' || (t === 'system' && mq.matches)) }
  function paintIcon(t) {
    var b = document.getElementById('themeToggle')
    if (b) { b.innerHTML = ICONS[t] || ICONS.system; b.setAttribute('title', 'Theme: ' + t) }
  }
  function cycle() {
    var t = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length]
    try { localStorage.setItem(KEY, t) } catch (e) {}
    apply(t); paintIcon(t)
  }

  // Keep "system" responsive to OS changes.
  mq.addEventListener('change', function () { if (current() === 'system') apply('system') })

  document.addEventListener('DOMContentLoaded', function () {
    apply(current())
    paintIcon(current())

    var toggle = document.getElementById('themeToggle')
    if (toggle) toggle.addEventListener('click', cycle)

    var ham = document.getElementById('hamburger')
    var sheet = document.getElementById('mobileSheet')
    if (ham && sheet) {
      ham.addEventListener('click', function () { sheet.hidden = !sheet.hidden })
      sheet.addEventListener('click', function (e) { if (e.target.tagName === 'A') sheet.hidden = true })
    }

    var nav = document.getElementById('nav')
    function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 20) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
})()

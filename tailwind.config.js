/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // All tokens resolve to CSS custom properties defined in index.css
        // (light values on :root, dark values on .dark). One class, both themes.
        bg: 'var(--bg)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        line: 'var(--border)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'var(--accent-soft)',
        hi: 'var(--text-hi)',
        mid: 'var(--text-mid)',
        lo: 'var(--text-lo)',
        approve: 'var(--approve)',
        deny: 'var(--deny)',
        downtime: 'var(--downtime)',
        pass: 'var(--pass)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        play: ['Fredoka', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(0,0,0,0.18)',
        card: '0 4px 24px -8px rgba(0,0,0,0.12)',
        glow: '0 0 0 1px rgba(250,204,21,0.35), 0 12px 50px -12px rgba(250,204,21,0.45)',
      },
      keyframes: {
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        bob: 'bob 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}

// Small shared primitives: the wordmark logo and the magnetic CTA button.

export function Logo({ className = '' }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 group ${className}`} aria-label="ScreenPass home">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-[0.6rem] bg-accent shadow-sm transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="h-6 w-6">
          {/* two small antennae, mirrored around the centre */}
          <path d="M44 40 C 41 31, 36 25, 31 20" stroke="#1c1c1e" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="31" cy="19" r="4" fill="#1c1c1e" />
          <path d="M56 40 C 59 31, 64 25, 69 20" stroke="#1c1c1e" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="69" cy="19" r="4" fill="#1c1c1e" />
          {/* two eyes, centred and symmetric about x=50 */}
          <rect x="38" y="48" width="7" height="13" rx="3.5" fill="#1c1c1e" />
          <rect x="55" y="48" width="7" height="13" rx="3.5" fill="#1c1c1e" />
          {/* friendly smile, centred on x=50 */}
          <path d="M38 70 Q50 80 62 70" stroke="#1c1c1e" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-sans text-lg font-extrabold tracking-tight text-hi">
        Screen<span className="text-accent-ink">Pass</span>
      </span>
    </a>
  )
}

// Magnetic button with a sliding fill layer. `variant`: solid (accent) | ghost.
export function CTAButton({ href, children, variant = 'solid', className = '', icon: Icon, ...rest }) {
  const base =
    'btn-magnetic group/btn relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight'

  if (variant === 'ghost') {
    return (
      <a
        href={href}
        className={`${base} border border-line bg-card text-hi hover:shadow-card ${className}`}
        {...rest}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {Icon && <Icon className="h-4 w-4" />}
        </span>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`${base} bg-accent text-[#1c1c1e] shadow-glow ${className}`}
      {...rest}
    >
      {/* sliding sheen */}
      <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 ease-out group-hover/btn:translate-x-0" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {Icon && <Icon className="h-4 w-4" />}
      </span>
    </a>
  )
}

// Eyebrow / section label — monospace, accent dot.
export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mid ${className}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </div>
  )
}

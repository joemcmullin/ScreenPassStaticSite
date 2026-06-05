// Small shared primitives: the wordmark logo and the magnetic CTA button.

export function Logo({ className = '' }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center ${className}`}
      aria-label="ScreenPass home"
    >
      {/* Wordmark only — the cramped mascot square mark was removed (the animated
          hero mascot is the site's one mascot). Sized to roughly match the nav
          button height, with a bright brand-accent period. */}
      <span className="font-sans text-[2.05rem] font-extrabold leading-none tracking-tight text-hi transition-transform duration-300 group-hover:scale-[1.03] sm:text-[2.2rem]">
        Screen<span className="text-accent-ink">Pass</span><span className="text-accent">.</span>
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

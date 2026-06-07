// ----------------------------------------------------------------------------
// Single source of truth for brand strings, links, and contact details.
// Change these (especially the email addresses) to your real values before
// going live — every CTA and legal section reads from here.
// ----------------------------------------------------------------------------

export const BRAND = {
  name: 'ScreenPass',
  tagline: 'A pass, not a prison.',
  purpose:
    'The parental control app that swaps rigid downtime for flexible schedules and one-tap Pass Requests.',
  studio: 'Apex Development Studio LLC',
  studioUrl: 'https://apexdevelopmentstudio.com',
  platforms: 'iPhone',
  launchWindow: '2026',
  // Real addresses (screenpassapp.com). Waitlist signups, support, and privacy
  // inquiries all route to the monitored support inbox. noreply@screenpassapp.com
  // is reserved for outbound/automated mail (e.g. a future form provider).
  notifyEmail: 'support@screenpassapp.com',
  supportEmail: 'support@screenpassapp.com',
  privacyEmail: 'support@screenpassapp.com',
}

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  // Legal links go to the dedicated full-text pages.
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Support', href: '#support' },
]

// Effective date shown on the legal sections.
export const LEGAL_EFFECTIVE = 'June 7, 2026'

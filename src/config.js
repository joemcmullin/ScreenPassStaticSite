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
  platforms: 'iPhone · iPad · Mac',
  launchWindow: '2026',
  // TODO: confirm these addresses before launch.
  notifyEmail: 'hello@screenpass.app',
  supportEmail: 'support@screenpass.app',
  privacyEmail: 'privacy@screenpass.app',
}

// Prefilled "notify me at launch" mail composer.
export const NOTIFY_MAILTO =
  `mailto:${BRAND.notifyEmail}` +
  '?subject=' +
  encodeURIComponent('Notify me when ScreenPass launches') +
  '&body=' +
  encodeURIComponent(
    "Hi ScreenPass team,\n\nPlease add me to the launch list — I'd like to know the moment ScreenPass is available on the App Store.\n\nThanks!",
  )

export const SUPPORT_MAILTO =
  `mailto:${BRAND.supportEmail}` +
  '?subject=' +
  encodeURIComponent('ScreenPass support')

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'FAQ', href: '#faq' },
]

// Effective date shown on the legal sections.
export const LEGAL_EFFECTIVE = 'June 4, 2026'

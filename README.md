# ScreenPass — Landing Site

Cinematic marketing / pre-launch landing page for **ScreenPass**, the parental
control app that gives kids *a pass, not a prison*. Designed & built by
**Apex Development Studio LLC**.

- **Stack:** React 18 + Vite, Tailwind CSS v3 (`darkMode: 'class'`), GSAP +
  ScrollTrigger, Framer Motion, Lucide icons.
- **Brand:** matches the iOS app exactly — accent `#FACC15`, white/near-black
  surfaces, and a web recreation of the in-app **ScreenBuddy** mascot.
- **Sections:** Hero · Features (3 interactive demos) · Philosophy · Private by
  design · How it works (sticky stacking) · Waitlist CTA · FAQ · Privacy Policy ·
  Terms of Use · Support · Footer.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # → dist/
npm run preview  # serve the production build locally
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to
`main`. After the first push:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` — the site deploys automatically.

`vite.config.js` uses `base: './'`, so it works on a project path
(`user.github.io/ScreenPassStaticSite/`) or a custom domain root with no changes.

## Before launch — update these

All brand strings live in [`src/config.js`](src/config.js):

- `notifyEmail`, `supportEmail`, `privacyEmail` — currently placeholders
  (`@screenpass.app`). The "Notify me" CTAs open a prefilled `mailto:` to
  `notifyEmail`.
- `launchWindow`, `LEGAL_EFFECTIVE` — release window and legal effective date.

The Privacy Policy, Terms of Use, and Support content live in
[`src/components/Legal.jsx`](src/components/Legal.jsx) and satisfy Apple's
required-URL fields via in-page anchors (`#privacy-policy`, `#terms`, `#support`).
Have them reviewed before submission.

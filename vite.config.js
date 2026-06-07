import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// Dev-only: Vite's dev server falls back to the SPA index.html for clean routes,
// so /privacy and /terms would otherwise render the homepage during `npm run dev`.
// This middleware serves the real static legal pages from public/ in dev, matching
// production (GitHub Pages serves public/privacy/index.html at /privacy automatically).
function serveLegalPagesInDev() {
  const routes = { '/privacy': 'privacy', '/terms': 'terms' }
  return {
    name: 'serve-legal-pages-in-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0].replace(/\/$/, '')
        const dir = routes[url]
        if (dir) {
          const file = path.resolve(process.cwd(), 'public', dir, 'index.html')
          if (fs.existsSync(file)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(file))
            return
          }
        }
        next()
      })
    },
  }
}

// Relative base so built assets resolve correctly on GitHub Pages at the custom
// domain root. Anchor-based navigation means no router/base-path coupling.
export default defineConfig({
  base: './',
  plugins: [react(), serveLegalPagesInDev()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the built assets resolve correctly on GitHub Pages whether the
// site is served from a project path (user.github.io/ScreenPassStaticSite/) or a
// custom domain root. Anchor-based navigation means no router/base-path coupling.
export default defineConfig({
  base: './',
  plugins: [react()],
})

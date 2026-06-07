import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Philosophy from './components/Philosophy.jsx'
import PrivacyBand from './components/PrivacyBand.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WaitlistCTA from './components/WaitlistCTA.jsx'
import Legal from './components/Legal.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation honor the
    // visitor's prefers-reduced-motion setting (transforms become instant).
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Features />
          <Philosophy />
          <PrivacyBand />
          <HowItWorks />
          <WaitlistCTA />
          <Legal />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

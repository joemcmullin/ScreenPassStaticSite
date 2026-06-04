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
    <div id="top" className="relative">
      <Navbar />
      <main>
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
  )
}

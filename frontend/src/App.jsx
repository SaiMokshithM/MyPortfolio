import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import StatsBar from './components/StatsBar'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorEffect from './components/CursorEffect'
import SmoothScroll from './components/SmoothScroll'
import SectionReveal from './components/SectionReveal'
import ScrollProgressBar from './components/ScrollProgressBar'
import CinematicScroll from './components/CinematicScroll'

function App() {
  return (
    <Router>
      <div style={{ background: '#000', minHeight: '100vh', color: '#fff', position: 'relative' }}>

        {/* ── Global scroll engine ── */}
        <SmoothScroll />
        <CinematicScroll />
        <CursorEffect />

        {/* ── Glowing scroll progress bar at top ── */}
        <ScrollProgressBar />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2px',
              fontSize: '13px',
            },
          }}
        />

        <Navbar />

        <main>
          {/* Hero has its own parallax — no SectionReveal wrapper */}
          <Hero />

          {/* Every section gets the premium 3D reveal + parallax exit */}
          <SectionReveal><About /></SectionReveal>
          <StatsBar />
          <SectionReveal><Skills /></SectionReveal>
          <SectionReveal><Projects /></SectionReveal>
          <SectionReveal><Experience /></SectionReveal>
          <SectionReveal><Resume /></SectionReveal>
          <SectionReveal><Contact /></SectionReveal>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App

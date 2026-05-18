import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const isMobile = useIsMobile()
  const { scrollY } = useScroll()
  const rawY = useTransform(scrollY, [0, 600], [0, -120])
  const rawOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useSpring(rawY, { stiffness: 80, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 })

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: 64,
      background: '#000',
    }}>

      {/* ── TOP META BAR ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: isMobile ? '14px 20px' : '18px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="label">Full-Stack Developer · B.Tech CSE Student</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Open to Internships — {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '40px 20px' : '60px 40px', y, opacity }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>

          {/* Big title row with arrow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 28 }}
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: 1, background: 'rgba(255,255,255,0.35)', flexShrink: 0 }}
            />
            <h1 className="display-xl">Portfolio</h1>
          </motion.div>

          {/* 3-column info grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? 28 : 40,
              marginTop: isMobile ? 36 : 52,
              paddingTop: isMobile ? 24 : 36,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Col 1 — Name */}
            <div>
              <p className="label" style={{ marginBottom: 10 }}>Name</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
                M. Sai Mokshith
              </p>
            </div>

            {/* Col 2 — University */}
            <div>
              <p className="label" style={{ marginBottom: 10 }}>University</p>
              <p style={{ fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em' }}>
                KL University
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                3rd Year — B.Tech CSE
              </p>
            </div>

            {/* Col 3 — Contacts */}
            <div>
              <p className="label" style={{ marginBottom: 10 }}>My Contacts</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a
                  href="mailto:2400032976cseelge@gmail.com"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  2400032976cseelge@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  linkedin.com/in/medam-sai-mokshith
                </a>
                <a
                  href="https://github.com/SaiMokshithM/"
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                >
                  github.com/SaiMokshithM
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── BOTTOM BAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: isMobile ? '16px 20px' : '20px 40px' }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => scrollTo('projects')}
              className="btn-solid"
              style={{ padding: '10px 24px', fontSize: 12 }}
            >
              View My Work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-outline"
              style={{ padding: '10px 24px', fontSize: 12 }}
            >
              Contact Me
            </button>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {['React.js', 'Node.js', 'MongoDB', 'Express.js'].map(tech => (
              <span key={tech} className="label" style={{ color: 'rgba(255,255,255,0.2)' }}>{tech}</span>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  )
}

export default Hero

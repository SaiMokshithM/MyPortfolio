import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Work',       href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [isMobile,   setIsMobile]   = useState(true) // default true — corrected after mount
  const [hoveredIdx, setHoveredIdx] = useState(null)

  useEffect(() => {
    // Correct isMobile after mount (safe — window is available)
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMenuOpen(false)
    }
    checkMobile() // run once immediately after mount

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(href.replace('#', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 350) // wait for menu close animation
  }

  return (
    <>
      {/* ── Header bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          background: scrolled
            ? 'rgba(0,0,0,0.95)'
            : menuOpen
              ? 'rgba(0,0,0,0.98)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
          backdropFilter: (scrolled || menuOpen) ? 'blur(20px)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          padding: isMobile ? '0 20px' : '0 40px',
        }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}>
          {/* Logo */}
          <button
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: 8, flexShrink: 0,
            }}
          >
            <span style={{
              fontSize: isMobile ? 15 : 18,
              color: '#fff', fontWeight: 700,
              letterSpacing: '-0.02em',
              fontFamily: 'Space Grotesk, sans-serif',
            }}>
              M. Sai Mokshith
            </span>
          </button>

          {/* Desktop Nav — only rendered on ≥768 px */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {links.map((link, i) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: hoveredIdx === i ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: 13, fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    fontFamily: 'Inter, sans-serif',
                    padding: 0,
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#fff'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Hire Me
              </button>
            </nav>
          )}

          {/* Mobile Hamburger — only on <768 px */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none', border: 'none',
                cursor: 'pointer', color: '#fff',
                padding: 8, display: 'flex',
                flexDirection: 'column', gap: 5,
                width: 36, alignItems: 'flex-end',
              }}
            >
              <span style={{
                display: 'block', height: 1.5,
                background: '#fff', width: '100%',
                borderRadius: 2,
                transition: 'transform 0.35s cubic-bezier(.77,0,.18,1), opacity 0.2s',
                transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
              }} />
              <span style={{
                display: 'block', height: 1.5,
                background: '#fff',
                borderRadius: 2,
                transition: 'opacity 0.2s, width 0.35s',
                opacity: menuOpen ? 0 : 1,
                width: menuOpen ? '0%' : '70%',
              }} />
              <span style={{
                display: 'block', height: 1.5,
                background: '#fff', width: '100%',
                borderRadius: 2,
                transition: 'transform 0.35s cubic-bezier(.77,0,.18,1), opacity 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
              }} />
            </button>
          )}
        </div>
      </motion.header>

      {/* ── Full-screen mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.18, 1] }}
            style={{
              position: 'fixed',
              top: 64, left: 0, right: 0, bottom: 0,
              zIndex: 999,
              background: 'rgba(0,0,0,0.98)',
              backdropFilter: 'blur(30px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 32px 48px',
              overflowY: 'auto',
            }}
          >
            {/* Nav links — vertical, staggered */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{
                    delay: menuOpen ? i * 0.06 + 0.1 : 0,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif',
                    padding: '20px 0',
                    letterSpacing: '-0.02em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#fff'
                  }}
                >
                  <span>{link.label}</span>
                  {/* Arrow accent */}
                  <span style={{
                    fontSize: 18,
                    opacity: 0.3,
                    fontWeight: 300,
                    letterSpacing: 0,
                    transform: 'rotate(-45deg)',
                    display: 'inline-block',
                  }}>↗</span>
                </motion.button>
              ))}
            </nav>

            {/* Hire Me CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: links.length * 0.06 + 0.15, duration: 0.4 }}
              style={{ marginTop: 40 }}
            >
              <button
                onClick={() => scrollTo('#contact')}
                style={{
                  width: '100%',
                  padding: '18px 0',
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Hire Me
              </button>
            </motion.div>

            {/* Subtle index counter */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: 24,
                fontSize: 11,
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                textAlign: 'center',
              }}
            >
              Portfolio — 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

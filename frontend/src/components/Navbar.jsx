import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.4s ease',
          padding: '0 40px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 18, color: '#fff', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'Space Grotesk, sans-serif' }}>
              M. Sai Mokshith
            </span>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
            {links.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.5)', fontSize: 13,
                  fontWeight: 400, letterSpacing: '0.08em',
                  textTransform: 'uppercase', transition: 'color 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-outline"
              style={{ padding: '8px 20px', fontSize: 12 }}
            >
              Hire Me
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4 }}
          >
            <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ height: 1, background: '#fff', width: menuOpen ? '100%' : '100%', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <div style={{ height: 1, background: '#fff', width: '70%', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <div style={{ height: 1, background: '#fff', width: '100%', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
              background: '#000', borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '24px 40px',
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#fff', fontSize: 24, fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  letterSpacing: '-0.01em',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

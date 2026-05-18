import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const Hero = () => {
  const isMobile = useIsMobile()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const { scrollY } = useScroll()
  const rawFade  = useTransform(scrollY, [0, 420], [1, 0])
  const heroFade = useSpring(rawFade, { stiffness: 80, damping: 20 })

  const socials = [
    {
      href: 'https://github.com/SaiMokshithM/',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: 'mailto:saimokshith2006@gmail.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M2 7l10 7 10-7"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        paddingTop: 'var(--nav-height)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Grain overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* ── Radial dark vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(20,20,20,0) 0%, rgba(0,0,0,0.65) 100%)',
      }} />

      {/* ════════════ MAIN GRID ════════════ */}
      <motion.div
        style={{ flex: 1, opacity: heroFade, position: 'relative', zIndex: 1 }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          minHeight: isMobile ? 'auto' : 'calc(100vh - var(--nav-height) - 60px)',
          alignItems: 'center',
        }}>

          {/* ══ LEFT — TEXT ══ */}
          <div style={{
            padding: isMobile
              ? '48px 24px 32px'
              : 'clamp(40px,8vh,80px) clamp(32px,6vw,80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>

            {/* Hi! I'm */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? 18 : 22,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 8,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
            >
              Hi! I'm
            </motion.p>

            {/* MOKSHITH */}
            <div style={{ overflow: 'hidden', marginBottom: 12 }}>
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(3.5rem,18vw,6rem)' : 'clamp(4rem,8.5vw,9rem)',
                  fontWeight: 800,
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: '#fff',
                  margin: 0,
                }}
              >
                MOKSHITH
              </motion.h1>
            </div>

            {/* Role underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: 'left',
                height: 2,
                width: isMobile ? '80%' : '60%',
                background: '#fff',
                marginBottom: 16,
                opacity: 0.9,
              }}
            />

            {/* Role label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? 13 : 14,
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: isMobile ? 24 : 32,
              }}
            >
              Full-Stack Developer
            </motion.p>

            {/* Storytelling paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: isMobile ? 14 : 15,
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.38)',
                maxWidth: 400,
                marginBottom: isMobile ? 28 : 40,
                fontWeight: 400,
              }}
            >
              A 3rd-year B.Tech CSE student at KL University who turns ideas
              into scalable, production-ready software. From pixel-perfect React UIs
              to robust Node.js APIs — I build things that work and last.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <button
                onClick={() => scrollTo('projects')}
                style={{
                  padding: isMobile ? '12px 28px' : '13px 32px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.6)',
                  borderRadius: 2,
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
              >
                Know More
              </button>
              <button
                onClick={() => {
                  const a = document.createElement('a')
                  a.href = '/MyResume.pdf'
                  a.download = 'Sai_Mokshith_Resume.pdf'
                  a.click()
                }}
                style={{
                  padding: isMobile ? '12px 28px' : '13px 32px',
                  background: '#fff',
                  border: '1px solid #fff',
                  borderRadius: 2,
                  color: '#000',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
              >
                Download CV
              </button>
            </motion.div>

          </div>

          {/* ══ RIGHT — PHOTO ══ */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '100%',
                minHeight: 'calc(100vh - var(--nav-height) - 60px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Photo — full height, B&W dramatic */}
              <img
                src="/sai.jpg"
                alt="Mokshith — Full-Stack Developer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'grayscale(100%) contrast(1.15) brightness(0.82)',
                  display: 'block',
                }}
              />

              {/* Left-side fade into background */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.3) 30%, transparent 60%)',
              }} />

              {/* Bottom fade */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 40%)',
              }} />

              {/* Top fade */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 25%)',
              }} />

              {/* Page counter — right edge, like reference */}
              <div style={{
                position: 'absolute',
                right: 24, top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                zIndex: 3,
              }}>
                {['01','02','03','04','05'].map((n, i) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: i === 2 ? 1 : 0.25 }}
                    transition={{ duration: 0.4, delay: 1.4 + i * 0.08 }}
                    onClick={() => {
                      const sections = ['home','about','projects','experience','contact']
                      scrollTo(sections[i])
                    }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      color: i === 2 ? '#fff' : 'rgba(255,255,255,0.35)',
                      fontWeight: i === 2 ? 600 : 400,
                      cursor: 'pointer',
                      writingMode: 'horizontal-tb',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = i === 2 ? '#fff' : 'rgba(255,255,255,0.35)'}
                  >
                    {n}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══ MOBILE PHOTO ══ */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: 320, position: 'relative', overflow: 'hidden' }}
            >
              <img
                src="/sai.jpg"
                alt="Mokshith"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center top',
                  filter: 'grayscale(100%) contrast(1.15) brightness(0.82)',
                }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 50%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 30%)',
              }} />
            </motion.div>
          )}

        </div>
      </motion.div>

      {/* ════ BOTTOM BAR — socials left, scroll right ════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{
          position: isMobile ? 'relative' : 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: isMobile ? '16px 24px' : '18px clamp(32px,6vw,80px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 5,
        }}
      >

        {/* Social icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
              style={{
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                display: 'flex',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Scroll indicator — right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          onClick={() => scrollTo('about')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            writingMode: 'vertical-rl',
            fontWeight: 500,
          }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0))',
            }}
          />
        </motion.div>

      </motion.div>

    </section>
  )
}

export default Hero

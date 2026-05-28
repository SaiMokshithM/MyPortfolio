import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const About = () => {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  const scrollToNext = () =>
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })

  const socials = [
    {
      href: 'https://github.com/SaiMokshithM/',
      label: 'GitHub',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/',
      label: 'LinkedIn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: 'mailto:saimokshith2006@gmail.com',
      label: 'Email',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 7l10 7 10-7" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >

      {/* ── Grain overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* ── Radial vignette ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at center, rgba(18,18,18,0) 30%, rgba(0,0,0,0.8) 100%)',
      }} />

      {/* ════ GIANT BACKGROUND TEXT ════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: isMobile ? '8%' : '12%',
          left: 0,
          right: 0,
          zIndex: 1,
          pointerEvents: 'none',
          textAlign: 'center',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '22vw' : '18vw',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.055)',
          display: 'block',
          whiteSpace: 'nowrap',
        }}>
          About me
        </span>
      </motion.div>

      {/* ════ FOREGROUND CONTENT ════ */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: isMobile
          ? '72px 20px 80px'
          : 'clamp(80px,16vw,140px) clamp(40px,8vw,100px) 120px',
        maxWidth: 800,
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 20 : 28 }}
        >
          <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
            01 — Introduction
          </span>
        </motion.div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: isMobile ? 16 : 20 }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 'clamp(2rem,10vw,3rem)' : 'clamp(2.2rem,4vw,3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            M. Sai Mokshith
          </motion.h2>
        </div>

        {/* Bio paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? 14 : 16,
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: 480,
            marginBottom: isMobile ? 28 : 36,
            fontWeight: 400,
          }}
        >
          Full-stack developer based in Vijayawada, India.
          Currently studying at{' '}
          <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>KL University</span>.
          Passionate about React, Node.js, Spring Boot,
          and building software that actually ships.
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.72 }}
          style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: isMobile ? 32 : 40 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.82 + i * 0.1 }}
              whileHover={{ scale: 1.12 }}
              title={s.label}
              style={{
                width: 42, height: 42,
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.45)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#fff'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05 }}
          style={{
            paddingTop: isMobile ? 24 : 28,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Solid — GET IN TOUCH */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: isMobile ? '14px 28px' : '15px 36px',
              background: '#fff',
              border: '1px solid #fff',
              borderRadius: 2,
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#000',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.88)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff'
            }}
          >
            Get In Touch
          </motion.button>

          {/* Outlined — VIEW CV */}
          <motion.a
            href="/MyResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: isMobile ? '14px 28px' : '15px 36px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 2,
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#fff'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            View CV
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 9L9 1M9 1H3M9 1V7"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* ════ BOTTOM — down arrow ════ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 1.0 }}
        style={{
          position: 'absolute',
          bottom: isMobile ? 28 : 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <motion.button
          onClick={scrollToNext}
          whileHover={{ scale: 1.1 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'border-color 0.2s, color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#fff'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.button>
      </motion.div>

      {/* ════ RIGHT — vertical "Featured work" text ════ */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            position: 'absolute',
            right: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            writingMode: 'vertical-rl',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
          >
            Featured work
          </span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
        </motion.div>
      )}

    </section>
  )
}

export default About

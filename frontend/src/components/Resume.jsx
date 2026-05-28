import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const Resume = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 })
  const isMobile = useIsMobile()

  return (
    <section
      id="resume"
      ref={ref}
      style={{
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: `clamp(80px, 11vw, 120px) 0 clamp(60px, 8vw, 100px)`,
      }}
    >
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Ghost BG */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: '0%', right: '-2%',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '32vw' : '20vw',
          fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85,
          userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        Resume
      </motion.span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 0,
          alignItems: 'flex-end',
          marginBottom: isMobile ? 48 : 72,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
                05 — Résumé
              </span>
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 700, letterSpacing: '-0.035em',
                  color: '#fff', lineHeight: 0.9, margin: 0,
                }}
              >
                My Resume
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.35)', maxWidth: 380,
              marginLeft: isMobile ? 0 : 'auto',
            }}
          >
            A full overview of my academic background, technical skills,
            projects, and certifications — all in one document.
          </motion.p>
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            padding: isMobile ? '36px 28px' : '52px 48px',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <div>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 22 : 28,
              fontWeight: 700, letterSpacing: '-0.025em',
              color: '#fff', marginBottom: 8, lineHeight: 1.15,
            }}>
              M. Sai Mokshith
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12,
              color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Full-Stack Developer · KL University · 3rd Year
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
            <motion.a
              href="/MyResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 32px',
                background: '#fff', border: '1px solid #fff',
                borderRadius: 2, fontFamily: 'Inter, sans-serif',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#000',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: 8, transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.88)'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              View Resume
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 9L9 1M9 1H3M9 1V7"/>
              </svg>
            </motion.a>

            <motion.a
              href="/MyResume.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 32px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 2, fontFamily: 'Inter, sans-serif',
                fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: 8, transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              Download PDF
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15V3M6 9l6 6 6-6M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Resume

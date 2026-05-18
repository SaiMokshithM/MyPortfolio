import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const education = [
  {
    num: '01',
    period: '2024 — 2028',
    badge: 'Present',
    role: 'B.Tech — Computer Science',
    honors: 'Honors in AI & Autonomy',
    company: 'KL University',
    location: 'Vijayawada, Andhra Pradesh',
    gpa: '9.27 / 10.00',
    description: 'Pursuing B.Tech in Computer Science with Honors in AI & Autonomy. Currently in 3rd year with a strong focus on full-stack development, data structures, algorithms, and enterprise software architecture.',
    achievements: [
      'CGPA: 9.27 / 10.00',
      'Built 10+ full-stack projects using Spring Boot, React, MySQL, MongoDB',
      'Certifications in GitHub Copilot (Microsoft), NPTEL AI, Automation Anywhere',
      'Active in hackathons and technical events',
    ],
    subjects: ['DSA', 'DBMS', 'OS', 'Spring Boot', 'React', 'Probability & Stats'],
  },
  {
    num: '02',
    period: '2022 — 2024',
    badge: null,
    role: 'Intermediate — MPC',
    honors: '95.4%',
    company: 'Narayana Junior College',
    location: 'Nellore, Andhra Pradesh',
    gpa: null,
    description: 'Completed Intermediate with Mathematics, Physics, and Chemistry at Narayana Junior College, Nellore — scoring 95.4%.',
    achievements: [
      'Scored 95.4% in MPC stream',
      'Strong foundation in Mathematics and Sciences',
    ],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    num: '03',
    period: '2021 — 2022',
    badge: null,
    role: 'SSC — 10th Grade',
    honors: '84%',
    company: 'Narayana EM School',
    location: 'Andhra Pradesh',
    gpa: null,
    description: 'Completed Secondary School Certificate at Narayana EM School with 84%, building a solid academic foundation across core subjects.',
    achievements: [
      'Scored 84% in SSC board examinations',
      'Strong foundation in Mathematics, Science, and English',
    ],
    subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Telugu'],
  },
]

/* ── Education row ───────────────────────────────────────────── */
const EducationRow = ({ item, index, inView, isMobile }) => {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        background: hovered ? 'rgba(255,255,255,0.018)' : 'transparent',
        transition: 'background 0.3s',
      }}
    >
      {/* Left hover accent */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', left: -32,
          top: 0, bottom: 0, width: 1,
          background: '#fff', transformOrigin: 'top',
        }}
      />

      {/* Main clickable row */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'pointer',
          padding: isMobile ? '28px 0 20px' : '36px 0 28px',
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr auto'
            : '56px 1fr auto',
          gap: isMobile ? 0 : 0,
          alignItems: 'start',
        }}
      >
        {/* Number */}
        {!isMobile && (
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.15 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 32, fontWeight: 800,
              color: '#fff', letterSpacing: '-0.04em',
              lineHeight: 1, paddingTop: 4,
            }}
          >
            {item.num}
          </motion.span>
        )}

        {/* Center block */}
        <motion.div
          animate={{ x: hovered && !isMobile ? 6 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingRight: isMobile ? 16 : 48 }}
        >
          {/* Period + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.06em',
            }}>
              {item.period}
            </span>
            {item.badge && (
              <span style={{
                fontSize: 9, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Inter, sans-serif', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '3px 10px', borderRadius: 2,
              }}>
                {item.badge}
              </span>
            )}
          </div>

          {/* Degree title */}
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? 'clamp(1.3rem, 5vw, 1.7rem)' : 'clamp(1.5rem, 2.5vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
            lineHeight: 1.1,
            marginBottom: 4,
            transition: 'color 0.3s',
          }}>
            {item.role}
          </h3>

          {/* Honors / score + institution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13, color: 'rgba(255,255,255,0.45)',
              fontStyle: 'italic',
            }}>
              {item.honors}
            </span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>·</span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13, color: 'rgba(255,255,255,0.35)',
            }}>
              {item.company}
            </span>
            {item.gpa && (
              <>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>·</span>
                <span style={{
                  fontSize: 10, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'Inter, sans-serif', fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: '3px 10px', borderRadius: 2,
                }}>
                  GPA {item.gpa}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Expand toggle */}
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 22, color: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, flexShrink: 0,
            paddingTop: isMobile ? 0 : 4,
          }}
        >
          +
        </motion.span>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingBottom: 36,
              paddingLeft: isMobile ? 0 : 56,
              paddingTop: 4,
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 24 : 48,
            }}>
              {/* Left — description + achievements */}
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.38)',
                  marginBottom: 20,
                }}>
                  {item.description}
                </p>
                <p className="label" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em', marginBottom: 14 }}>
                  Highlights
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {item.achievements.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — subjects */}
              <div>
                <p className="label" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em', marginBottom: 14 }}>
                  Subjects & Focus Areas
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {item.subjects.map(s => (
                    <span key={s} style={{
                      padding: '7px 14px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 2,
                      fontSize: 11, letterSpacing: '0.06em',
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Main ────────────────────────────────────────────────────── */
const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 })
  const isMobile = useIsMobile()

  return (
    <section
      id="experience"
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
        transition={{ duration: 1.8 }}
        style={{
          position: 'absolute', top: '5%', right: '-3%',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '32vw' : '20vw',
          fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85,
          userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.015) 60%, transparent 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        Education
      </motion.span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 0, alignItems: 'flex-end',
          marginBottom: isMobile ? 40 : 64,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>04 — Education</span>
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 700, letterSpacing: '-0.035em', color: '#fff',
                  lineHeight: 0.9, margin: 0,
                }}
              >
                My Education
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.35)', maxWidth: 360, marginLeft: isMobile ? 0 : 'auto' }}
          >
            Currently in 3rd year at KL University, building real-world skills alongside academics.
          </motion.p>
        </div>

        {/* Rows */}
        <div style={{ paddingLeft: isMobile ? 0 : 32 }}>
          {education.map((item, i) => (
            <EducationRow key={i} item={item} index={i} inView={inView} isMobile={isMobile} />
          ))}
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.9 }}
            style={{ transformOrigin: 'left', height: 1, background: 'rgba(255,255,255,0.07)' }}
          />
        </div>

      </div>
    </section>
  )
}

export default Experience

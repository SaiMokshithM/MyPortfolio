import { useState } from 'react'
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
    accent: '#c084fc',
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
    accent: '#60a5fa',
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
    accent: '#4ade80',
    description: 'Completed Secondary School Certificate at Narayana EM School with 84%, building a solid academic foundation across core subjects.',
    achievements: [
      'Scored 84% in SSC board examinations',
      'Strong foundation in Mathematics, Science, and English',
    ],
    subjects: ['Mathematics', 'Science', 'Social Studies', 'English', 'Telugu'],
  },
]

/* ── Education Row ───────────────────────────────────────────── */
const EducationRow = ({ item, index, inView, isMobile }) => {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      {/* Top border line with accent fade-in on hover */}
      <div style={{
        height: 1,
        background: hovered
          ? `linear-gradient(90deg, ${item.accent}60, rgba(255,255,255,0.08) 60%, transparent)`
          : 'rgba(255,255,255,0.06)',
        transition: 'background 0.5s ease',
        marginBottom: 0,
      }} />

      {/* Clickable header row */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: 'none',
          padding: isMobile ? '28px 0 24px' : '40px 0 32px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '1fr auto',
          gap: 24,
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 16 : 40, flexDirection: isMobile ? 'column' : 'row' }}>

          {/* Giant stroke number */}
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? '14vw' : '4.5vw',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: `1px ${hovered ? item.accent + '60' : 'rgba(255,255,255,0.1)'}`,
            userSelect: 'none',
            flexShrink: 0,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            minWidth: isMobile ? 'auto' : '5vw',
          }}>{item.num}</div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            {/* Period + badge row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>{item.period}</span>
              {item.badge && (
                <span style={{
                  fontSize: 8,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: item.accent,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  border: `1px solid ${item.accent}40`,
                  background: `${item.accent}10`,
                  padding: '3px 10px',
                  borderRadius: 2,
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Degree title */}
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 'clamp(1.3rem, 5.5vw, 1.8rem)' : 'clamp(1.6rem, 2.4vw, 2.6rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
              lineHeight: 1.05,
              margin: '0 0 8px',
              transition: 'color 0.3s ease',
            }}>
              {item.role}
            </h3>

            {/* Institution + score row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12.5,
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
              }}>{item.honors}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>·</span>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12.5,
                color: 'rgba(255,255,255,0.6)',
              }}>{item.company}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>·</span>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.03em',
              }}>{item.location}</span>
              {item.gpa && (
                <>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)' }}>·</span>
                  <span style={{
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: item.accent,
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    border: `1px solid ${item.accent}35`,
                    background: `${item.accent}0a`,
                    padding: '3px 10px',
                    borderRadius: 2,
                  }}>
                    GPA {item.gpa}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expand toggle */}
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 36, height: 36, flexShrink: 0,
            border: `1px solid ${hovered ? item.accent + '50' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: hovered ? item.accent : 'rgba(255,255,255,0.3)',
            fontSize: 18, fontWeight: 300,
            transition: 'all 0.35s ease',
            background: expanded ? `${item.accent}08` : 'transparent',
          }}
        >+</motion.div>
      </div>

      {/* Expanded details panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingBottom: 44,
              paddingLeft: isMobile ? 0 : 'calc(4.5vw + 40px)',
            }}>
              {/* Accent divider */}
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${item.accent}40, rgba(255,255,255,0.04) 60%, transparent)`,
                marginBottom: 32,
              }} />

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
                gap: isMobile ? 28 : 56,
              }}>
                {/* Left — description + highlights */}
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.7)',
                    margin: '0 0 28px',
                    fontWeight: 400,
                  }}>
                    {item.description}
                  </p>

                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 16,
                  }}>Highlights</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {item.achievements.map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: item.accent,
                          flexShrink: 0,
                          marginTop: 7,
                          boxShadow: `0 0 6px ${item.accent}`,
                        }} />
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 13,
                          color: 'rgba(255,255,255,0.75)',
                          lineHeight: 1.7,
                          fontWeight: 400,
                        }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — subjects */}
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 16,
                  }}>Subjects & Focus</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {item.subjects.map((s, i) => (
                      <span key={s} style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 9,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: i === 0 ? item.accent : 'rgba(255,255,255,0.55)',
                        background: i === 0 ? `${item.accent}10` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${i === 0 ? item.accent + '35' : 'rgba(255,255,255,0.12)'}`,
                        padding: '6px 14px',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                      }}>{s}</span>
                    ))}
                  </div>
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
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Giant ghost background word */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: isMobile ? '4%' : '6%',
          left: 0,
          right: 0,
          zIndex: 0,
          pointerEvents: 'none',
          textAlign: 'center',
          lineHeight: 0.85,
          userSelect: 'none',
        }}
      >
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '16vw' : '15vw',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.045)',
          display: 'block',
          whiteSpace: 'nowrap',
        }}>
          EDUCATION
        </span>
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          gap: isMobile ? 20 : 0,
          alignItems: 'flex-end',
          marginBottom: isMobile ? 48 : 80,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}>04 — Education</span>
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  color: '#fff',
                  lineHeight: 0.95,
                  margin: 0,
                }}
              >Academic Path</motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13.5,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: 380,
              marginLeft: isMobile ? 0 : 'auto',
              marginRight: 0,
              fontWeight: 300,
            }}
          >
            Currently in 3rd year at KL University, building real-world engineering skills alongside a rigorous academic foundation in AI and full-stack systems.
          </motion.p>
        </div>

        {/* ── Education rows ── */}
        <div>
          {education.map((item, i) => (
            <EducationRow key={i} item={item} index={i} inView={inView} isMobile={isMobile} />
          ))}
          {/* Bottom closing rule */}
          <motion.div
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.8 }}
            style={{ transformOrigin: 'left', height: 1, background: 'rgba(255,255,255,0.06)' }}
          />
        </div>

      </div>
    </section>
  )
}

export default Experience

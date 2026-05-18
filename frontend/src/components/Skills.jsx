import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const categories = [
  {
    num: '01',
    label: 'Frontend',
    headline: 'What users see & interact with',
    skills: ['React.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    num: '02',
    label: 'Backend',
    headline: 'The engine powering the product',
    skills: ['Spring Boot', 'Node.js', 'Express.js', 'RESTful APIs', 'Spring Security', 'Hibernate ORM'],
  },
  {
    num: '03',
    label: 'Database',
    headline: 'Where structured truth lives',
    skills: ['MySQL', 'MongoDB', 'Spring Data JPA', 'ChromaDB'],
  },
  {
    num: '04',
    label: 'Languages',
    headline: 'How I communicate with machines',
    skills: ['Java', 'JavaScript', 'Python', 'SQL', 'C'],
  },
  {
    num: '05',
    label: 'Tools & DevOps',
    headline: 'The craft, sharpened daily',
    skills: ['Git / GitHub', 'Postman', 'Maven', 'Swagger', 'IntelliJ IDEA', 'n8n'],
  },
]

const concepts = [
  'OOP', 'Microservices', 'JWT Auth', 'RBAC',
  'RAG Pipeline', 'REST Design', 'MVC', 'DSA', 'DBMS',
]

const CategoryRow = ({ cat, index, inView, isMobile }) => {
  const [hovered, setHovered] = useState(false)

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
        padding: isMobile ? '28px 0' : '36px 0',
        cursor: 'default',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
      }}
    >
      {/* Left accent line on hover */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          left: -32,
          top: 0, bottom: 0,
          width: 1,
          background: '#fff',
          transformOrigin: 'top',
        }}
      />

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 10,
              color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em',
            }}>{cat.num}</span>
            <div>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 22,
                fontWeight: 700, letterSpacing: '-0.025em',
                color: '#fff', marginBottom: 4,
              }}>{cat.label}</p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.28)', fontStyle: 'italic',
              }}>{cat.headline}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px' }}>
            {cat.skills.map(skill => (
              <span key={skill} style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
                padding: '5px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
              }}>{skill}</span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '64px 260px 1fr',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Number */}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.15 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 38,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {cat.num}
          </motion.span>

          {/* Category + headline */}
          <motion.div
            animate={{ x: hovered ? 8 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingRight: 40 }}
          >
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
              lineHeight: 1.1,
              marginBottom: 6,
              transition: 'color 0.3s',
            }}>{cat.label}</p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.28)',
              fontStyle: 'italic',
            }}>{cat.headline}</p>
          </motion.div>

          {/* Skills — left-aligned, wrap naturally */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 10px',
            alignItems: 'center',
          }}>
            {cat.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + i * 0.05 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 400,
                  color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
                  padding: '5px 13px',
                  border: `1px solid ${hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 2,
                  transition: 'color 0.3s, border-color 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

const Skills = () => {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 })

  return (
    <section
      id="skills"
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
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Ghost BG — premium gradient fill */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: '0%', right: '-2%',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '45vw' : '28vw',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          lineHeight: 0.85,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.01) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Skills
      </motion.span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Meta + Heading */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 0,
          alignItems: 'flex-end',
          marginBottom: isMobile ? 40 : 64,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
                02 — Technical Skills
              </span>
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  color: '#fff',
                  lineHeight: 0.9,
                  margin: 0,
                }}
              >
                My Stack
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: 380,
              marginLeft: isMobile ? 0 : 'auto',
            }}
          >
            Technologies I use to build scalable, production-ready
            software — from polished UIs to robust server-side systems.
          </motion.p>
        </div>

        {/* Rows */}
        <div style={{ paddingLeft: isMobile ? 0 : 32 }}>
          {categories.map((cat, i) => (
            <CategoryRow key={cat.num} cat={cat} index={i} inView={inView} isMobile={isMobile} />
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            style={{ transformOrigin: 'left', height: 1, background: 'rgba(255,255,255,0.07)' }}
          />
        </div>

        {/* Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            marginTop: isMobile ? 48 : 64,
            paddingTop: isMobile ? 28 : 36,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
            gap: isMobile ? 14 : 40,
            alignItems: 'start',
          }}
        >
          <p className="label" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em', paddingTop: 2 }}>
            Concepts & Practices
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: isMobile ? 14 : 15,
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.9,
              letterSpacing: '0.01em',
              fontWeight: 400,
            }}
          >
            {concepts.join('  ·  ')}
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}

export default Skills

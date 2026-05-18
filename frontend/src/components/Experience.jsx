import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const education = [
  {
    period: '2024 — May 2028 (Present)',
    role: 'B.Tech — Computer Science (Honors in AI & Autonomy)',
    company: 'Koneru Lakshmaiah University (KL University)',
    type: 'Undergraduate — 3rd Year · GPA: 9.27 / 10.00',
    location: 'Vijayawada, Andhra Pradesh',
    description: 'Pursuing Bachelor of Technology in Computer Science with Honors in AI & Autonomy at KL University. Currently in 3rd year with a CGPA of 9.27/10.00. Strong focus on full-stack web development, data structures, algorithms, and enterprise software architecture.',
    achievements: [
      'CGPA: 9.27 / 10.00',
      'Built multiple full-stack projects using Spring Boot, React, MySQL and MongoDB',
      'Completed certifications in GitHub Copilot (Microsoft), NPTEL AI, and Automation Anywhere',
      'Active participant in college hackathons and technical events',
    ],
    stack: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Enterprise Software Architecture (Spring Boot & React)', 'Probability & Statistics'],
  },
  {
    period: '2022 — 2024',
    role: 'Intermediate (MPC) — 95.4%',
    company: 'Narayana Junior College',
    type: 'Higher Secondary Education',
    location: 'Nellore, Andhra Pradesh',
    description: 'Completed Intermediate with Mathematics, Physics, and Chemistry (MPC) stream at Narayana Junior College, Nellore with a percentage of 95.4%.',
    achievements: [
      'Scored 95.4% in MPC stream',
      'Strong foundation in Mathematics and Sciences',
    ],
    stack: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    period: '2021 — 2022',
    role: 'Secondary School Certificate (SSC) — 84%',
    company: 'Narayana EM School',
    type: 'Secondary School Education (10th)',
    location: 'Andhra Pradesh',
    description: 'Completed Secondary School Certificate (SSC / 10th Grade) at Narayana EM School with a percentage of 84%, building a solid academic foundation across core subjects.',
    achievements: [
      'Scored 84% in SSC board examinations',
      'Strong foundation in core subjects — Mathematics, Science, and English',
    ],
    stack: ['Mathematics', 'Science', 'Social Studies', 'English', 'Telugu'],
  },
]

const ExperienceRow = ({ item, index, inView, isLast, isMobile }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Main row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '200px 1fr auto',
          gap: isMobile ? 16 : 32,
          padding: '32px 0',
          cursor: 'pointer',
          alignItems: 'start',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {!isMobile && (
          <div>
            <span className="label" style={{ color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 6 }}>
              {item.period}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {item.type}
            </span>
          </div>
        )}
        <div>
          {isMobile && (
            <div style={{ marginBottom: 12 }}>
              <span className="label" style={{ color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 4 }}>
                {item.period}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {item.type}
              </span>
            </div>
          )}
          <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', color: '#fff', marginBottom: 4, letterSpacing: '-0.01em' }}>
            {item.role}
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            {item.company} — {item.location}
          </p>
        </div>
        <div style={{ paddingTop: 4 }}>
          <span style={{
            fontSize: 20, color: 'rgba(255,255,255,0.3)', display: 'block',
            transition: 'transform 0.3s ease',
            transform: expanded ? 'rotate(45deg)' : 'none',
          }}>+</span>
        </div>
      </div>

      {/* Expanded */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ paddingBottom: 36, paddingLeft: isMobile ? 0 : 232, paddingTop: isMobile ? 12 : 0 }}>
          <p className="body-text" style={{ marginBottom: 20, maxWidth: 620 }}>
            {item.description}
          </p>

          <div style={{ marginBottom: 20 }}>
            <p className="label" style={{ marginBottom: 12 }}>Highlights</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {item.achievements.map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', marginTop: 1, flexShrink: 0 }}>→</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label" style={{ marginBottom: 10 }}>Subjects & Focus Areas</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.stack.map(s => <span key={s} className="tag">{s}</span>)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const isMobile = useIsMobile()

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        {/* Meta */}
        <div className="section-meta">
          <span className="label">04 — Education</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Academic Background</span>
        </div>

        {/* Heading */}
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 16 }}
        >
          My Education
        </motion.h2>

        <motion.p
          className="body-text"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 48 }}
        >
          Currently in my 3rd year at KL University, building real-world skills alongside academics.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '200px 1fr auto',
          gap: isMobile ? 16 : 32,
          padding: '12px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          {!isMobile && <span className="label">Period</span>}
          <span className="label">Degree & Institution</span>
          {!isMobile && <span style={{ width: 20 }} />}
        </div>

        {/* Education rows */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {education.map((item, i) => (
            <ExperienceRow
              key={i}
              item={item}
              index={i}
              inView={inView}
              isLast={i === education.length - 1}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

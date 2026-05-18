import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const skillGroups = [
  {
    category: 'Frontend Engineering',
    skills: [
      { name: 'React.js (Hooks, Router)', years: '1 year', level: 78 },
      { name: 'HTML5 / CSS3', years: '1 year', level: 85 },
      { name: 'JavaScript (ES6+)', years: '1 year', level: 75 },
      { name: 'Vite', years: '1 year', level: 72 },
      { name: 'Tailwind CSS', years: '1 year', level: 70 },
    ],
  },
  {
    category: 'Backend Engineering',
    skills: [
      { name: 'Spring Boot', years: '1 year', level: 75 },
      { name: 'Hibernate ORM', years: '1 year', level: 65 },
      { name: 'Spring Security', years: '< 1 year', level: 55 },
      { name: 'Spring Data JPA', years: '1 year', level: 65 },
      { name: 'RESTful APIs', years: '1 year', level: 78 },
      { name: 'Node.js / Express.js', years: '< 1 year', level: 55 },
      { name: 'FastAPI (Python)', years: '< 1 year', level: 50 },
    ],
  },
  {
    category: 'Database & Cloud',
    skills: [
      { name: 'MySQL', years: '1 year', level: 72 },
      { name: 'MongoDB', years: '< 1 year', level: 55 },
      { name: 'ChromaDB', years: '< 1 year', level: 45 },
    ],
  },
  {
    category: 'Languages',
    skills: [
      { name: 'Java', years: '1 year', level: 80 },
      { name: 'C', years: '1 year', level: 70 },
      { name: 'JavaScript', years: '1 year', level: 75 },
      { name: 'SQL', years: '1 year', level: 72 },
      { name: 'Python (Pandas, NumPy)', years: '< 1 year', level: 55 },
    ],
  },
  {
    category: 'Tools & Practices',
    skills: [
      { name: 'Git / GitHub', years: '1 year', level: 80 },
      { name: 'Maven', years: '1 year', level: 65 },
      { name: 'n8n', years: '< 1 year', level: 45 },
      { name: 'Swagger / OpenAPI', years: '< 1 year', level: 50 },
      { name: 'Postman', years: '1 year', level: 72 },
    ],
  },
]

const SkillRow = ({ skill, inView, delay, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    style={{
      display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : '1fr 80px 120px',
      alignItems: 'center', gap: isMobile ? 12 : 20,
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>{skill.name}</span>
      {isMobile && <span className="label" style={{ color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{skill.years}</span>}
    </div>
    {!isMobile && <span className="label" style={{ color: 'rgba(255,255,255,0.25)', textAlign: 'right' }}>{skill.years}</span>}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: '#fff' }}
        />
      </div>
      <span className="label" style={{ color: 'rgba(255,255,255,0.3)', minWidth: 32, textAlign: 'right' }}>{skill.level}%</span>
    </div>
  </motion.div>
)

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const isMobile = useIsMobile()

  const current = skillGroups[activeTab]

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        {/* Meta */}
        <div className="section-meta">
          <span className="label">02 — Technical Skills</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Technologies & Tools</span>
        </div>

        {/* Heading */}
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          My Stack
        </motion.h2>

        {/* Tab nav */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            display: 'flex', gap: 0, 
            borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 0,
            overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}
        >
          {skillGroups.map((g, i) => (
            <button
              key={g.category}
              onClick={() => setActiveTab(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 0', marginRight: 36,
                fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
                color: activeTab === i ? '#fff' : 'rgba(255,255,255,0.25)',
                borderBottom: activeTab === i ? '1px solid #fff' : '1px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {g.category}
            </button>
          ))}
        </motion.div>

        {/* Column header */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr auto' : '1fr 80px 120px',
          gap: isMobile ? 12 : 20, padding: '14px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span className="label">Technology</span>
          {!isMobile && <span className="label" style={{ textAlign: 'right' }}>Experience</span>}
          <span className="label" style={{ textAlign: 'right' }}>Proficiency</span>
        </div>

        {/* Skill rows */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {current.skills.map((skill, i) => (
            <SkillRow key={skill.name} skill={skill} inView={inView} delay={i * 0.06} isMobile={isMobile} />
          ))}
        </motion.div>

        {/* Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="label" style={{ marginBottom: 16 }}>Concepts & Practices</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              'OOP', 'Microservices Architecture', 'JWT Authentication',
              'Role-Based Access Control', 'RAG Pipeline', 'Data Structures & Algorithms',
              'DBMS', 'Operating Systems', 'REST API Design',
            ].map(c => <span key={c} className="tag">{c}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

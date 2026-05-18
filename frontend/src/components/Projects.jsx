import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import useIsMobile from '../hooks/useIsMobile'

const defaultProjects = [
  {
    _id: 'lensbysai',
    title: 'LensBySai',
    subtitle: 'Photography Portfolio & Booking',
    category: 'Full-Stack',
    year: '2025',
    description: 'Premium photography portfolio with seamless gallery experience. React + Vite frontend, Supabase backend — image storage, real-time DB, and auth.',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://lensbysai.in',
  },
  {
    _id: 'participate-plus',
    title: 'Participate+',
    subtitle: 'Student Activity Platform',
    category: 'Full-Stack',
    year: '2024',
    description: 'Full-stack platform for KL University students to discover, register, and manage extracurricular activities with admin panel and participation tracking.',
    tags: ['React', 'Spring Boot', 'MySQL', 'Java'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'donorhub',
    title: 'DonorHub',
    subtitle: 'Donation Management Platform',
    category: 'Full-Stack',
    year: '2024',
    description: 'Role-based web app supporting donation and distribution during emergencies — modules for Admin, Donor, Recipient, and Logistics.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'drawsense',
    title: 'DrawSense',
    subtitle: 'Hand Gesture Drawing App',
    category: 'Frontend',
    year: '2025',
    description: 'Interactive drawing app using hand gesture tracking — draw on a digital canvas without touching the screen, built for low-latency gesture recognition.',
    tags: ['React', 'Canvas', 'MediaPipe', 'Vite'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://drawsense-beta.vercel.app',
  },
  {
    _id: 'attcalbot',
    title: 'AttCalBot',
    subtitle: 'AI Attendance Chatbot',
    category: 'AI / ML',
    year: '2025',
    description: 'AI-powered attendance calculator using RAG pipeline. Semantic search via ChromaDB, REST API via FastAPI, conversational interface for students.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'hippocria',
    title: 'Hippocria',
    subtitle: 'Healthcare Assistance Chatbot',
    category: 'AI / ML',
    year: '2025',
    description: 'AI healthcare chatbot using RAG pipeline with ChromaDB and FastAPI. Provides accessible medical information and basic symptom guidance.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'openopsenv',
    title: 'OpenOpsEnv',
    subtitle: 'AI Code Review Agent',
    category: 'AI / ML',
    year: '2025',
    description: 'AI agent environment simulating software engineering workflow — finds bugs, identifies vulnerabilities, classifies severity and suggests fixes.',
    tags: ['Python', 'AI Agents', 'Hugging Face', 'RL'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://huggingface.co/spaces/saimokshith/OpenOpsEnv',
  },
  {
    _id: 'taskmanagementapp',
    title: 'TaskManagementApp',
    subtitle: 'Enterprise Task Platform',
    category: 'Full-Stack',
    year: '2025',
    description: 'Enterprise task management with JWT auth, role-based access control, and real-time tracking. React + Vite + Spring Boot + MySQL.',
    tags: ['React', 'Spring Boot', 'MySQL', 'JWT'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
]

const filterCategories = ['All', 'Full-Stack', 'Frontend', 'AI / ML']

/* ── Single project row ─────────────────────────────────────── */
const ProjectRow = ({ project, index, inView, isMobile }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Hover fill — left to right sweep */}
      <motion.div
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.025)',
          transformOrigin: 'left',
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1,
        padding: isMobile ? '28px 0' : '40px 0',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '60px 1fr auto',
        gap: isMobile ? 14 : 0,
        alignItems: 'center',
      }}>

        {/* Index number */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.15 }}
          transition={{ duration: 0.35 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? 14 : 11,
            fontWeight: isMobile ? 600 : 500,
            color: '#fff',
            letterSpacing: isMobile ? '-0.01em' : '0.12em',
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Center — title block */}
        <div style={{ paddingRight: isMobile ? 0 : 60 }}>

          {/* Title row */}
          <div style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'baseline',
            gap: isMobile ? 10 : 18,
            marginBottom: 8,
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <motion.h3
              animate={{ x: hovered && !isMobile ? 6 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(1.8rem, 3.2vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
                lineHeight: 1,
                transition: 'color 0.3s',
              }}
            >
              {project.title}
            </motion.h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, paddingBottom: isMobile ? 0 : 4 }}>
              <span style={{
                fontSize: 11,
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.3)',
                fontStyle: 'italic',
                letterSpacing: '0.01em',
              }}>
                {project.subtitle}
              </span>
              {!isMobile && (
                <span style={{
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  border: `1px solid ${hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)'}`,
                  padding: '5px 12px',
                  borderRadius: 2,
                  transition: 'color 0.3s, border-color 0.3s',
                  flexShrink: 0,
                }}>
                  {project.category}
                </span>
              )}
            </div>
          </div>

          {/* Description — appears on hover */}
          <AnimatePresence>
            {hovered && !isMobile && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -4 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13, lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.4)',
                  maxWidth: 520, marginBottom: 14,
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          {isMobile && (
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, fontFamily: 'Inter, sans-serif', marginBottom: 12 }}>
              {project.description}
            </p>
          )}

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, fontFamily: 'Inter, sans-serif',
                color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — year + links */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          gap: isMobile ? 20 : 12,
          alignItems: isMobile ? 'center' : 'flex-end',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.08em',
          }}>
            {project.year}
          </span>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)'}
            >
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)',
                textDecoration: 'none', fontFamily: 'Inter, sans-serif',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)'}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main ────────────────────────────────────────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects)
  const [filter, setFilter] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 })
  const isMobile = useIsMobile()

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => { if (res.data?.data?.length) setProjects([...defaultProjects, ...res.data.data]) })
      .catch(() => {})
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section
      id="projects"
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

      {/* Ghost BG — top, behind heading */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: '0%', right: '-2%',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '45vw' : '28vw',
          fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.85,
          userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.025) 50%, transparent 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >
        Work
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
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>03 — Selected Work</span>
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 700, letterSpacing: '-0.035em', color: '#fff', lineHeight: 0.9, margin: 0,
                }}
              >
                My Work
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.35)', maxWidth: 360, marginLeft: isMobile ? 0 : 'auto' }}
          >
            Full-stack platforms, AI-powered tools, and frontend experiments — built to solve real problems.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: isMobile ? 32 : 52 }}
        >
          {filterCategories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '9px 20px',
              border: filter === cat ? '1px solid #fff' : '1px solid rgba(255,255,255,0.12)',
              borderRadius: 2, background: filter === cat ? '#fff' : 'transparent',
              color: filter === cat ? '#000' : 'rgba(255,255,255,0.45)',
              fontFamily: 'Inter, sans-serif', fontSize: 11,
              fontWeight: filter === cat ? 600 : 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (filter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' } }}
              onMouseLeave={e => { if (filter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' } }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((p, i) => (
              <ProjectRow key={p._id} project={p} index={i} inView={inView} isMobile={isMobile} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{ transformOrigin: 'left', height: 1, background: 'rgba(255,255,255,0.07)' }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{ marginTop: isMobile ? 40 : 56, display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <a href="https://github.com/SaiMokshithM/" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            All Projects on GitHub ↗
          </a>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

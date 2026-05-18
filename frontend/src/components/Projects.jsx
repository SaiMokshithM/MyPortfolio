import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'

const defaultProjects = [
  {
    _id: 'lensbysai',
    title: 'LensBySai',
    subtitle: 'Photography Portfolio & Booking Website',
    category: 'Full-Stack',
    year: '2025',
    description: 'A premium photography portfolio website showcasing photography work with a seamless gallery experience. Built with React + Vite on the frontend and Supabase for the backend — handling image storage, real-time database, and authentication. Currently live at lensbysai.in.',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Storage', 'Real-time'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://lensbysai.in',
  },
  {
    _id: 'participate-plus',
    title: 'Participate+',
    subtitle: 'Student Extracurricular Activity Platform',
    category: 'Full-Stack',
    year: '2024',
    description: 'A full-stack web platform built for KL University students to discover, register, and manage extracurricular activities and campus events. Features include student registration, activity listings, admin management panel, and participation tracking.',
    tags: ['React', 'Vite', 'Spring Boot', 'MySQL', 'REST API', 'Java'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'donorhub',
    title: 'DonorHub',
    subtitle: 'Donation Management Platform',
    category: 'Full-Stack',
    year: '2024',
    description: 'A full-stack web application to support the donation and distribution of essential items during emergencies. Features role-based modules for Admin, Donor, Recipient, and Logistics Coordinator to manage donations and requests efficiently.',
    tags: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'attcalbot',
    title: 'AttCalBot',
    subtitle: 'Attendance Calculator Chatbot',
    category: 'AI/ML',
    year: '2025',
    description: 'An AI-powered attendance calculator chatbot built using a Retrieval-Augmented Generation (RAG) pipeline. Integrates semantic search with ChromaDB and REST APIs with FastAPI for chat interactions. Provides users with accessible medical information and basic symptom guidance.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'RAG'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'hippocria',
    title: 'Hippocria',
    subtitle: 'Healthcare Assistance Chatbot',
    category: 'AI/ML',
    year: '2025',
    description: 'An AI-powered healthcare chatbot built using a Retrieval-Augmented Generation (RAG) pipeline. Integrates semantic search with ChromaDB and REST APIs with FastAPI for chat interactions. Provides users with accessible medical information and basic symptom guidance.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'RAG'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'techcorp',
    title: 'TechCorp',
    subtitle: 'HR Assistant Chatbot',
    category: 'AI/ML',
    year: '2025',
    description: 'An AI-powered HR Assistant chatbot built using a Retrieval-Augmented Generation (RAG) pipeline. Integrates semantic search with ChromaDB and REST APIs with FastAPI for chat interactions. Provides users with accessible HR policies and basic company guidance.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Ollama', 'RAG'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
  {
    _id: 'drawsense',
    title: 'DrawSense',
    subtitle: 'Hand Gesture Drawing Website',
    category: 'Frontend',
    year: '2025',
    description: 'An interactive drawing web application that tracks hand gestures to allow users to draw on a digital canvas without touching the screen. Built entirely on the frontend for low-latency gesture recognition.',
    tags: ['React', 'Vite', 'Canvas', 'MediaPipe', 'Frontend'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://drawsense-beta.vercel.app',
  },
  {
    _id: 'openopsenv',
    title: 'OpenOpsEnv',
    subtitle: 'AI Agent Code Review Environment — OpenEnv Spec',
    category: 'AI/ML',
    year: '2025',
    description: 'A real-world AI agent benchmarking environment that simulates a software engineering workflow where an AI agent reviews Pull Requests — finding bugs, identifying security vulnerabilities, classifying severity, and suggesting fixes. Built to the full OpenEnv specification with typed models, step() / reset() / state() lifecycle, and openenv.yaml config. Ships 3 progressively harder tasks (easy → medium → hard) with agent graders, partial reward signals (0.0–1.0), and a reproducible baseline inference script for evaluating AI code review capabilities.',
    tags: ['Python', 'OpenEnv', 'AI Agents', 'Hugging Face', 'Code Review', 'Reinforcement Learning'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://huggingface.co/spaces/saimokshith/OpenOpsEnv',
  },
  {
    _id: 'taskmanagementapp',
    title: 'TaskManagementApp',
    subtitle: 'Enterprise Task Management Platform',
    category: 'Full-Stack',
    year: '2025',
    description: 'A full-stack enterprise task management application with secure JWT authentication, role-based access control, and real-time task tracking. Built with a React + Vite frontend and a Spring Boot REST API backend, backed by MySQL for persistent storage. Supports task creation, assignment, priority management, and status tracking across teams.',
    tags: ['React', 'Vite', 'Spring Boot', 'MySQL', 'JWT', 'REST API', 'Java'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
  },
]


const categories = ['All', 'Full-Stack', 'Frontend', 'Backend', 'AI/ML']

const Projects = () => {
  const [projects, setProjects] = useState(defaultProjects)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => {
        if (res.data?.data?.length) {
          setProjects([...defaultProjects, ...res.data.data])
        }
      })
      .catch(() => { })
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        {/* Meta */}
        <div className="section-meta">
          <span className="label">03 — Selected Work</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Projects & Case Studies</span>
        </div>

        {/* Heading */}
        <motion.h2
          className="display-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 40 }}
        >
          My Work
        </motion.h2>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                background: filter === cat ? '#fff' : 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 2,
                padding: '7px 18px',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: filter === cat ? '#000' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr auto',
          gap: 32, padding: '12px 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span className="label">#</span>
          <span className="label">Project</span>
          <span className="label">Links</span>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ padding: '48px 0' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 1, background: 'rgba(255,255,255,0.04)',
                marginBottom: 1,
                animation: 'pulse 1.5s infinite',
              }} />
            ))}
          </div>
        )}

        {/* Empty state — no projects yet */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="label" style={{ marginBottom: 16 }}>No projects added yet</p>
            <p className="body-text" style={{ maxWidth: 400 }}>
              Projects will appear here once they are added via the admin dashboard or backend API.
              Check back soon.
            </p>
          </motion.div>
        )}

        {/* Project rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr auto',
                  gap: 32, padding: '32px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'start',
                }}
              >
                <span className="label" style={{ color: 'rgba(255,255,255,0.2)', paddingTop: 4 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.01em', color: '#fff' }}>
                      {p.title}
                    </h3>
                    {p.year && <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>{p.year}</span>}
                  </div>
                  {p.subtitle && (
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                      {p.subtitle}
                    </p>
                  )}
                  <p className="body-text" style={{ maxWidth: 640, marginBottom: 14, fontSize: 13 }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(p.tags || []).map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4, minWidth: 90, alignItems: 'flex-end' }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 11, color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      style={{
                        fontSize: 11, color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 20 }}
        >
          <a
            href="https://github.com/SaiMokshithM/"
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
          >
            View GitHub Profile ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

/* ─── Project data ────────────────────────────────────────────── */
const projects = [
  {
    _id: 'lensbysai',
    number: '01',
    title: 'LensBySai',
    subtitle: 'Photography Portfolio & Booking Platform',
    category: 'Full-Stack',
    year: '2025',
    description: 'An ultra-premium, agency-level digital portfolio and instant booking experience designed for professional visual artists. Employs advanced image optimizations, dynamic lighting effects, and a highly responsive custom scheduler.',
    longDescription: 'LensBySai is a highly optimized photography presentation and client reservation ecosystem. Developed to display raw high-fidelity artwork elegantly while providing real-time scheduling controls, client-proofing workflows, and secure administrative controls.',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Framer Motion'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://lensbysai.in',
    accent: '#c084fc',
    previewImage: '/media__1779947072853.png',
    challenges: [
      'Serving dozens of high-resolution, uncompressed photographic assets without slowing down initial page loads.',
      'Securing and structuring reservation dates in real time without booking conflicts.'
    ],
    solutions: [
      'Implemented automated image format transformation (WebP/AVIF) coupled with lazy-loading blurred placeholder animations.',
      'Created custom database trigger locks inside PostgreSQL paired with Supabase Realtime listeners for instantaneous calendar slot blocking.'
    ],
    keyFeatures: [
      'Supabase Authentication & File Storage Buckets',
      'Real-Time Conflict-Free Booking Engine',
      'Automated Client Galleries & Proofing System',
      'Interactive Custom Image Carousel & Filters'
    ],
    metrics: { efficiency: '98% PageSpeed', loadTime: '< 0.6s Loading', traffic: '1.2k+ Sessions' }
  },
  {
    _id: 'participate-plus',
    number: '02',
    title: 'Participate+',
    subtitle: 'Student Activity & Verification Portal',
    category: 'Full-Stack',
    year: '2024',
    description: 'Full-stack university activity hub providing automated event coordinates, check-ins, and cryptographic credentialing for over 5,000+ active students.',
    longDescription: 'Participate+ is a university administrative solution designed to digitize student extracurricular participation logs. Features multi-layered role authorization pipelines, capacity controls, and dynamic PDF certificates.',
    tags: ['React', 'Spring Boot', 'MySQL', 'Java', 'JWT'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://participate-frontend.vercel.app/',
    accent: '#4ade80',
    previewImage: '/media__1779946995414.png',
    challenges: [
      'Mitigating database locking and concurrency congestion when hundreds of students attempt registration simultaneously.',
      'Allowing administrators to easily audit activity records without leaking sensitive student PII.'
    ],
    solutions: [
      'Integrated Redis cache-aside caching loops for popular active event data alongside optimized multi-column indexes in MySQL.',
      'Engineered localized JWT privilege filters restricting route execution down to strict permissions.'
    ],
    keyFeatures: [
      'Multi-Tenant Role Dashboards (Admin, Coordinator, Student)',
      'Secure Spring Security Filtering & Tokens',
      'One-Click Cryptographic Certificate Exports',
      'Live Event Registration Limit Trackers'
    ],
    metrics: { efficiency: '99.9% Uptime', loadTime: '120ms API Res', traffic: '5k+ Students' }
  },
  {
    _id: 'drawsense',
    number: '03',
    title: 'DrawSense',
    subtitle: 'Zero-Latency Hand Gesture Canvas',
    category: 'Frontend',
    year: '2025',
    description: 'An futuristic interaction canvas utilizing computer vision models to track spatial hand nodes via webcams, allowing digital drawing without touch.',
    longDescription: 'DrawSense is an experimental computer-vision frontend app designed to bridge physical hand movements and digital creative canvases. It bypasses touch-screens entirely, using standard RGB webcams to trigger complex artistic gestures.',
    tags: ['React', 'Canvas API', 'MediaPipe', 'Vite', 'TailwindCSS'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://drawsense-beta.vercel.app',
    accent: '#22d3ee',
    previewImage: '/media__1779947249349.png',
    challenges: [
      'High rendering lag between physical gesture motion and canvas vector draws.',
      'Heuristic misfires and false-positive gesture triggers from ambient background noise.'
    ],
    solutions: [
      'Delegated gesture prediction to dedicated Web Workers running Google MediaPipe Hands in a parallel thread.',
      'Designed a localized coordinate smoothing filter that calculates moving averages of finger coordinates to reject sudden noise spikes.'
    ],
    keyFeatures: [
      'MediaPipe Hands Neural Interaction Model',
      'High-Performance HTML5 Canvas Rendering',
      'Predictive Hand Node Path Smoothing',
      'Gesture Toolbar (Color shift, brush size, reset)'
    ],
    metrics: { efficiency: '60 FPS Draw', loadTime: '0ms Interface Lag', traffic: 'Interactive client-side' }
  },
  {
    _id: 'taskmanagementapp',
    number: '04',
    title: 'TaskFlow',
    subtitle: 'Enterprise Collaborative Workspace',
    category: 'Full-Stack',
    year: '2025',
    description: 'A comprehensive task workflow portal with drag-and-drop mechanics, interactive gantt progress charts, and real-time collaborative socket synchronization.',
    longDescription: 'TaskFlow is a productivity hub geared for mid-to-large business teams. It enables agile tracking via customizable columns, role hierarchy boundaries, and automatic summary notifications.',
    tags: ['React', 'Spring Boot', 'MySQL', 'JWT', 'TailwindCSS'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
    accent: '#60a5fa',
    previewImage: '/media__1779950996490.png',
    challenges: [
      'Maintaining coherent workspace state across different concurrent browsers without data overlaps.',
      'Protecting project datasets from cross-tenant privilege escalation vulnerabilities.'
    ],
    solutions: [
      'Established full workspace validation policies ensuring users can only fetch details matching their authorized tenant token.',
      'Synchronized frontend boards with REST status models to ensure fluid offline-resilience actions.'
    ],
    keyFeatures: [
      'Fluid Drag-and-Drop Column Boards',
      'Granular Permission Access Settings',
      'Productivity Analytics & Burn-Down Charts',
      'JWT Encrypted Controller Filters'
    ],
    metrics: { efficiency: 'Zero Overlaps', loadTime: '100ms Updates', traffic: 'Enterprise-grade' }
  },
  {
    _id: 'openopsenv',
    number: '05',
    title: 'OpenOpsEnv',
    subtitle: 'Agentic AI Code Sandbox & Reviewer',
    category: 'AI / ML',
    year: '2025',
    description: 'An AI-agent software engineering environment designed to autonomously identify codebase defects, evaluate security threats, and test patches.',
    longDescription: 'OpenOpsEnv provides a simulated software development harness where autonomous AI agents can analyze, modify, and verify codebases. Leverages advanced LLM agents to resolve complex bugs inside safe sandbox systems.',
    tags: ['Python', 'AI Agents', 'Hugging Face', 'FastAPI', 'Gradio'],
    github: 'https://github.com/SaiMokshithM/',
    live: 'https://huggingface.co/spaces/saimokshith/OpenOpsEnv',
    accent: '#f97316',
    previewImage: '/media__1779946903431.png',
    challenges: [
      'Preventing execution of dangerous code by LLM agents during testing phases.',
      'Structuring multi-step agent diagnostic outputs inside readable user-facing logs.'
    ],
    solutions: [
      'Containerized execution units utilizing micro-VM boundaries to run and test code modifications in complete isolation.',
      'Created a rich reactive streaming socket layout using Gradio to display real-time agent execution trees.'
    ],
    keyFeatures: [
      'Agentic Software Engineering Loops',
      'Autonomous Security Vulnerability Assessment',
      'Isolated Sandbox Code Compiler',
      'Live Vector Log Tree Streaming'
    ],
    metrics: { efficiency: '92% Bug Capture', loadTime: 'Gradio Panel', traffic: 'Hosted on Hugging Face' }
  },
  {
    _id: 'donorhub',
    number: '06',
    title: 'DonorHub',
    subtitle: 'Crisis Supply Distribution Platform',
    category: 'Full-Stack',
    year: '2024',
    description: 'An agile response platform enabling emergency groups, donors, and logistics teams to coordinate aid allocation and supply lines in real-time.',
    longDescription: 'DonorHub is a crisis response logistics system built to prevent bottlenecks in supply chains during emergencies. It bridges donors and verified recipients with transport networks to track resources end-to-end.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
    accent: '#fb923c',
    previewImage: '/media__1779949859348.png',
    challenges: [
      'Keeping aid items accurately accounted for during chaotic crisis conditions.',
      'Providing an accessible interface that works smoothly on low-bandwidth emergency connections.'
    ],
    solutions: [
      'Designed a lightweight static-render UI prioritizing core forms and micro-JSON payloads.',
      'Engineered an atomic donation lifecycle tracker backed by MongoDB transaction APIs.'
    ],
    keyFeatures: [
      'Atomic Supply Chain Allocation Ledger',
      'Real-Time Low-Bandwidth Status Dashboards',
      'Geo-Location Supply Delivery Map Pinning',
      'Secure SMS Recipient Verification API'
    ],
    metrics: { efficiency: 'Atomic Ledgers', loadTime: '3KB Payload', traffic: 'Crisis Resilient' }
  },
  {
    _id: 'attcalbot',
    number: '07',
    title: 'AttCalBot',
    subtitle: 'Semantic Academic RAG Chatbot',
    category: 'AI / ML',
    year: '2025',
    description: 'An AI assistant utilizing semantic vector databases to query attendance policies, predict schedules, and answer conversational student queries.',
    longDescription: 'AttCalBot is a student assistant chat system incorporating modern Retrieval-Augmented Generation (RAG) structures to parse and deliver complex university rules, rosters, and schedules.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'OpenAI'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
    accent: '#a78bfa',
    previewImage: '/media__1779947550296.png',
    challenges: [
      'High latency when generating answers over dense academic rulebooks.',
      'AI hallucinations outputting incorrect details about critical calendar dates.'
    ],
    solutions: [
      'Developed vector chunking rules separating tables and paragraphs in ChromaDB vector layers.',
      'Added strict system constraints limiting the AI model to query-matched citation metadata.'
    ],
    keyFeatures: [
      'LangChain Agentic Document Query Chains',
      'ChromaDB Vector Embeddings Store',
      'Context-Bounded Precision Chat Loops',
      'High-Speed FastAPI REST Controllers'
    ],
    metrics: { efficiency: '95% Accuracy', loadTime: '1.1s Response', traffic: 'RAG Pipeline' }
  },
  {
    _id: 'saitech',
    number: '08',
    title: 'SaiTech Solutions',
    subtitle: 'AI HR Knowledge Assistant',
    category: 'AI / ML',
    year: '2025',
    description: 'An AI-powered HR knowledge assistant utilizing semantic vector databases to query company leave policies, benefits, and insurance parameters.',
    longDescription: 'SaiTech Solutions is an enterprise-grade HR knowledge assistant powered by an integrated Qwen2 retrieval-augmented generation (RAG) pipeline. It provides instant context-aware details on employee leave policies, benefits packages, and general operational guides.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'Qwen2', 'RAG'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
    accent: '#34d399',
    previewImage: '/media__1779947778304.png',
    challenges: [
      'Parsing complex, unstructured PDF employee handbooks containing nested benefit tables accurately.',
      'Preventing general AI hallucinations when delivering critical maternity and health coverage details.'
    ],
    solutions: [
      'Developed robust document chunking rules and layout-aware tables extraction using LangChain document loaders.',
      'Integrated strict prompt system boundaries restricting RAG queries to high-confidence ChromaDB vector matches with direct citations.'
    ],
    keyFeatures: [
      'ChromaDB Semantic HR Knowledge Base',
      'FastAPI High-Speed REST Controller Async',
      'Strict Context-Bounded Qwen2 Prompt Loops',
      'Interactive Employee Benefit Suggestions'
    ],
    metrics: { efficiency: '98% RAG Recall', loadTime: '0.8s Response', traffic: 'HR Assistant' }
  },
  {
    _id: 'hippocria',
    number: '09',
    title: 'Hippocria',
    subtitle: 'Semantic Healthcare RAG Chatbot',
    category: 'AI / ML',
    year: '2025',
    description: 'An AI assistant utilizing semantic vector databases to query health symptoms, medicine details, and provide conversational wellness guidance.',
    longDescription: 'Hippocria is an AI Healthcare Assistant powered by an integrated medical knowledge base and Retrieval-Augmented Generation (RAG) pipeline. It utilizes semantic vector databases to accurately retrieve medical references, symptoms, and wellness plans with absolute context safety.',
    tags: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'OpenAI'],
    github: 'https://github.com/SaiMokshithM/',
    live: null,
    accent: '#818cf8',
    previewImage: '/media__1779949727346.png',
    challenges: [
      'High latency when querying massive medical knowledge libraries and symptom logs.',
      'AI hallucinations outputting incorrect details about critical clinical or wellness procedures.'
    ],
    solutions: [
      'Developed vector chunking rules separating medical conditions and tables in ChromaDB vector layers.',
      'Added strict system constraints and safety boundaries limiting the AI model to query-matched citation metadata.'
    ],
    keyFeatures: [
      'LangChain Agentic Healthcare Query Chains',
      'ChromaDB Semantic Vector Embeddings Store',
      'Context-Bounded Precision Chat Loops & Safety Filters',
      'High-Speed FastAPI REST Controllers'
    ],
    metrics: { efficiency: '97% Accuracy', loadTime: '0.9s Response', traffic: 'Medical RAG' }
  }
]

const filterCategories = ['All', 'Full-Stack', 'Frontend', 'AI / ML']

/* ─── Device Mockup Safari Window ────────────────────────────── */
const SafariMockup = ({ children, liveUrl, accent, hovered }) => {
  return (
    <div style={{
      width: '100%',
      background: '#0d0d0d',
      border: `1px solid ${hovered ? accent + '40' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: hovered
        ? `0 24px 60px ${accent}15, 0 2px 10px rgba(0,0,0,0.8)`
        : '0 8px 32px rgba(0,0,0,0.5)',
      transition: 'all 0.4s ease-out',
    }}>
      {/* Title bar */}
      <div style={{
        background: '#121212',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        position: 'relative',
      }}>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
        </div>
        {/* URL Bar */}
        <div style={{
          flex: 1,
          maxWidth: 400,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 4,
          padding: '2px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          fontFamily: 'Inter, sans-serif',
          fontSize: 9,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.04em',
        }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          {liveUrl ? liveUrl.replace('https://', '') : 'internal.preview'}
        </div>
      </div>
      {/* Content wrapper */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

/* ─── Gradient Preview Component ─────────────────────────────── */
const GradientPreview = ({ accent, title, hovered }) => (
  <div style={{
    width: '100%', height: '100%',
    background: `radial-gradient(ellipse at 30% 40%, ${accent}25 0%, #080808 80%)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
    transition: 'all 0.5s ease',
  }}>
    {/* Grid lines */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(${accent}10 1px, transparent 1px), linear-gradient(90deg, ${accent}10 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
      opacity: hovered ? 0.7 : 0.4,
      transition: 'opacity 0.4s ease',
    }} />
    {/* Central design */}
    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: `rgba(255,255,255,0.02)`,
        border: `1px solid ${accent}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: hovered ? `0 0 20px ${accent}20` : 'none',
        transition: 'all 0.4s ease',
      }}>
        <span style={{ fontSize: 18, color: accent, fontWeight: 300 }}>⌘</span>
      </div>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '11px',
        fontWeight: 600, letterSpacing: '0.15em',
        color: '#fff', opacity: 0.6,
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>{title}</span>
    </div>
    {/* Accent glow orb */}
    <div style={{
      position: 'absolute',
      width: '120px', height: '120px',
      borderRadius: '50%',
      background: accent,
      opacity: hovered ? 0.08 : 0.04,
      filter: 'blur(40px)',
      top: '20%', left: '20%',
      transition: 'all 0.5s ease',
    }} />
  </div>
)

/* ─── Immersive Case Study Drawer Modal ───────────────────────── */
const ProjectDrawer = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Lock background scroll
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      {/* Floating Spotlight behind drawer */}
      <div style={{
        position: 'absolute',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
        bottom: '-10vw', right: '-10vw',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Main Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 190 }}
        style={{
          width: '100%',
          maxWidth: '720px',
          height: '100%',
          background: '#0a0a0a',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '-10px 0 50px rgba(0,0,0,0.9)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Row */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(10,10,10,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 10,
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: project.accent,
              background: `${project.accent}12`,
              border: `1px solid ${project.accent}30`,
              padding: '3px 10px',
              borderRadius: 3,
            }}>{project.number}</span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>{project.category} / {project.year}</span>
          </div>
          {/* Close button with cursor trigger */}
          <button
            onClick={onClose}
            role="button"
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff' }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '40px 40px 60px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          {/* Title Area */}
          <div>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#fff',
              lineHeight: 1.1,
              margin: '0 0 10px',
            }}>{project.title}</h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
              fontWeight: 300,
            }}>{project.subtitle}</p>
          </div>

          {/* Device Mockup or Screenshot Showcase */}
          <div>
            <SafariMockup liveUrl={project.live} accent={project.accent} hovered={true}>
              {project.previewImage ? (
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              ) : (
                <GradientPreview accent={project.accent} title={project.title} hovered={true} />
              )}
            </SafariMockup>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 14 }}>
            {project.live && (
              <a
                href={project.live}
                target="_blank" rel="noopener noreferrer"
                role="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 24px',
                  background: project.accent,
                  border: `1px solid ${project.accent}`,
                  borderRadius: 4,
                  color: '#000',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  boxShadow: `0 10px 30px ${project.accent}20`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 35px ${project.accent}35` }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 30px ${project.accent}20` }}
              >
                Launch Site
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15,3 21,3 21,9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank" rel="noopener noreferrer"
                role="button"
                style={{
                  flex: project.live ? 1 : 'none',
                  width: project.live ? 'auto' : '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  cursor: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
              >
                View Repository
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            )}
          </div>

          {/* Project Long Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>Architecture Overview</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.7)',
              margin: 0,
            }}>{project.longDescription || project.description}</p>
          </div>

          {/* Engineering Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 6,
            padding: '20px 24px',
          }}>
            {Object.entries(project.metrics || {}).map(([key, val]) => (
              <div key={key}>
                <span style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 4,
                }}>{key}</span>
                <span style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Challenges vs Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                margin: 0,
              }}>Engineering Challenges</h3>

              {project.challenges.map((challenge, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    padding: '24px',
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(255,255,255,0.01)',
                  }}
                >
                  {/* Challenge block */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#ff5f56', fontWeight: 600 }}>The Challenge</span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{challenge}</p>
                  </div>
                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />
                  {/* Solution block */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27c93f' }} />
                      <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#27c93f', fontWeight: 600 }}>The Resolution</span>
                    </div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{project.solutions[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Key Features Checkboxes */}
          {project.keyFeatures && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                margin: 0,
              }}>Core Integrations</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {project.keyFeatures.map((feat) => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      border: `1px solid ${project.accent}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: project.accent }} />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Tech Chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}>Engineered Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10.5,
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.04em',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Agency-Level Alternating Showcase Row ─────────────────── */
const SplitShowcaseItem = ({ project, index, inView, onOpenCaseStudy }) => {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const isMobile = useIsMobile()
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingBottom: isMobile ? 56 : 96,
        marginBottom: isMobile ? 0 : 0,
      }}
    >
      {/* ── Top metadata strip ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isMobile ? 20 : 28,
        paddingTop: isMobile ? 48 : 72,
      }}>
        {/* Index + category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.2em',
          }}>{project.number}</span>
          <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              display: 'inline-block',
              width: 5, height: 5, borderRadius: '50%',
              background: project.accent,
              boxShadow: `0 0 8px ${project.accent}`,
            }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              fontWeight: 600,
              color: project.accent,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}>{project.category}</span>
          </div>
        </div>
        {/* Year */}
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 10,
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.1em',
        }}>{project.year}</span>
      </div>

      {/* ── Main grid: Image + Content ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isEven ? '1fr 0.82fr' : '0.82fr 1fr',
        gap: isMobile ? 36 : 64,
        alignItems: 'start',
      }}>

        {/* ─ Image pane ─ */}
        <div
          style={{
            order: isMobile ? 0 : isEven ? 0 : 1,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            cursor: 'none',
          }}
          role="button"
          onClick={() => onOpenCaseStudy(project)}
          data-cursor-label="case study"
        >
          {/* Accent glow halo */}
          <div style={{
            position: 'absolute', inset: -1, zIndex: 0,
            borderRadius: 5,
            background: `radial-gradient(ellipse at 50% 0%, ${project.accent}28 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.55s ease',
            pointerEvents: 'none',
          }} />

          {/* Image wrapper */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/10',
            overflow: 'hidden',
            borderRadius: 4,
            border: `1px solid ${hovered ? project.accent + '35' : 'rgba(255,255,255,0.06)'}`,
            transition: 'border-color 0.5s ease',
            background: '#060606',
          }}>
            {project.previewImage ? (
              <img
                src={project.previewImage}
                alt={project.title}
                onLoad={() => setImgLoaded(true)}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: hovered ? 'scale(1.035)' : 'scale(1)',
                  filter: `brightness(${hovered ? 0.65 : 0.82}) blur(${hovered ? 2 : 0}px)`,
                  transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
                  opacity: imgLoaded ? 1 : 0,
                }}
              />
            ) : (
              <GradientPreview accent={project.accent} title={project.title} hovered={hovered} />
            )}

          </div>

          {/* Elegant center glassmorphic CTA overlay on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 2,
          }}>
            <div style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: 'rgba(10, 10, 10, 0.72)',
              backdropFilter: 'blur(16px) saturate(180%)',
              border: `1px solid ${project.accent}40`,
              boxShadow: `0 12px 40px rgba(0, 0, 0, 0.5), 0 0 25px ${project.accent}20`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.85) rotate(-8deg)',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              {/* Icon with accent background */}
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: `${project.accent}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${project.accent}35`,
                marginBottom: 2,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="3">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              {/* Label */}
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
                textAlign: 'center',
              }}>
                Case Study
              </span>
            </div>
          </div>

          {/* Bottom accent line on hover */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${project.accent} 50%, transparent 100%)`,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: '0 0 4px 4px',
          }} />
        </div>

        {/* ─ Content pane ─ */}
        <div style={{
          order: isMobile ? 1 : isEven ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
          paddingTop: isMobile ? 0 : 12,
          position: 'relative',
        }}>

          {/* Ambient glow behind text */}
          <div style={{
            position: 'absolute', top: '10%', left: '-10%',
            width: 240, height: 240, borderRadius: '50%',
            background: project.accent,
            opacity: hovered ? 0.045 : 0,
            filter: 'blur(80px)',
            pointerEvents: 'none',
            transition: 'opacity 0.7s ease',
            zIndex: -1,
          }} />

          {/* Giant editorial project number */}
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? '18vw' : '7.5vw',
            fontWeight: 800,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: 'transparent',
            WebkitTextStroke: `1px ${hovered ? project.accent + '40' : 'rgba(255,255,255,0.07)'}`,
            userSelect: 'none',
            marginBottom: isMobile ? 16 : 20,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>{project.number}</div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? 'clamp(2rem, 9vw, 2.8rem)' : 'clamp(2rem, 3.2vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            color: '#fff',
            margin: '0 0 10px',
            transition: 'color 0.3s ease',
          }}>{project.title}</h3>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11.5,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
            margin: '0 0 24px',
            fontStyle: 'italic',
          }}>{project.subtitle}</p>

          {/* Thin divider */}
          <div style={{
            width: '100%', height: 1,
            background: `linear-gradient(90deg, ${project.accent}30, rgba(255,255,255,0.06) 60%, transparent)`,
            marginBottom: 24,
            transition: 'opacity 0.4s',
            opacity: hovered ? 1 : 0.5,
          }} />

          {/* Description */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.48)',
            margin: '0 0 28px',
            fontWeight: 300,
          }}>{project.description}</p>

          {/* Tech stack pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 36 }}>
            {project.tags.map((tag, i) => (
              <span key={tag} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                fontWeight: 500,
                color: i === 0 ? project.accent : 'rgba(255,255,255,0.38)',
                background: i === 0 ? `${project.accent}12` : 'rgba(255,255,255,0.025)',
                border: `1px solid ${i === 0 ? project.accent + '30' : 'rgba(255,255,255,0.07)'}`,
                padding: '4px 11px',
                borderRadius: 2,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}>{tag}</span>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <button
              onClick={() => onOpenCaseStudy(project)}
              role="button"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 26px',
                background: 'transparent',
                border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.18)'}`,
                borderRadius: 3,
                color: hovered ? project.accent : 'rgba(255,255,255,0.75)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'none',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                marginRight: 20,
              }}
            >
              Case Study
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            {project.live ? (
              <a
                href={project.live}
                target="_blank" rel="noopener noreferrer"
                role="button"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.35)',
                  cursor: 'none',
                  padding: '13px 6px',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >
                Visit Live ↗
              </a>
            ) : (
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                color: 'rgba(255,255,255,0.18)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '13px 6px',
              }}>Private Repo</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}


/* ─── Main Projects Showcase Component ──────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.02 })
  const isMobile = useIsMobile()

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
      {/* Decorative Ambient Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Cinematic giant background typography text */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 2.2 }}
        style={{
          position: 'absolute', top: '0%', right: '-2%',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: isMobile ? '45vw' : '26vw',
          fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.8,
          userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}
      >SYSTEMS</motion.span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
          gap: isMobile ? 24 : 0, alignItems: 'flex-end',
          marginBottom: isMobile ? 48 : 80,
        }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}
            >
              <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em' }}>
                03 — Agency Showcase
              </span>
            </motion.div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }} animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: isMobile ? 'clamp(2.5rem, 12vw, 4rem)' : 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 700, letterSpacing: '-0.035em',
                  color: '#fff', lineHeight: 0.95, margin: 0,
                }}
              >Selected Work</motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13.5, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.4)', maxWidth: 400,
              marginLeft: isMobile ? 0 : 'auto',
              marginRight: 0,
              fontWeight: 300,
            }}
          >
            A high-fidelity collection of full-stack ecosystems, zero-latency frontend products, and semantic RAG intelligence agents built to scale.
          </motion.p>
        </div>

        {/* ── Subheader Filters and View Switcher ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: isMobile ? 32 : 52,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: 24,
          }}
        >
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filterCategories.map(cat => (
              <button
                key={cat}
                role="button"
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 18px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 4,
                  background: filter === cat ? '#fff' : 'rgba(255,255,255,0.02)',
                  color: filter === cat ? '#000' : 'rgba(255,255,255,0.45)',
                  fontFamily: 'Inter, sans-serif', fontSize: 9.5,
                  fontWeight: filter === cat ? 700 : 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'none', transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { if (filter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff' } }}
                onMouseLeave={e => { if (filter !== cat) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' } }}
              >{cat}</button>
            ))}
          </div>

        </motion.div>

        {/* ── Active View Body ── */}
        <motion.div
          key="showcase-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
        >
          {filtered.map((proj, idx) => (
            <SplitShowcaseItem
              key={proj._id}
              project={proj}
              index={idx}
              inView={inView}
              onOpenCaseStudy={setActiveProject}
            />
          ))}
        </motion.div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          style={{ marginTop: isMobile ? 56 : 96, display: 'flex', alignItems: 'center', gap: 24 }}
        >
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <a
            href="https://github.com/SaiMokshithM/"
            target="_blank" rel="noopener noreferrer"
            role="button"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Inter, sans-serif', fontSize: 10.5,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              flexShrink: 0, padding: '12px 28px',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4,
              transition: 'all 0.25s',
              cursor: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            Archive Repository ↗
          </a>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

      </div>

      {/* Deep Dive Case Study Overlay Drawer — rendered via Portal to bypass SectionReveal CSS transform stacking context */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {activeProject && (
            <ProjectDrawer
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  )
}

export default Projects

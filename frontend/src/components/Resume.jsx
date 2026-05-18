import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Resume = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="resume" className="section" ref={ref}>
      <div className="container">
        {/* Meta */}
        <div className="section-meta">
          <span className="label">05 — Resume</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Curriculum Vitae</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 40 }}>
          <motion.h2
            className="display-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            My Resume
          </motion.h2>

          <motion.p
            className="body-text"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 480 }}
          >
            My resume includes a full overview of my academic background, technical skills, projects, and certifications. Click below to view it online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/MyResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid"
              style={{ fontSize: 14, padding: '16px 40px', letterSpacing: '0.1em' }}
            >
              View Resume ↗
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Resume

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const isMobile = useIsMobile()

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
    }),
  }

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">

        {/* Section meta row */}
        <div className="section-meta">
          <span className="label">01 — Introduction</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Developer Profile</span>
        </div>

        {/* Large heading */}
        <motion.h2
          className="display-lg"
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
          style={{ marginBottom: 60 }}
        >
          Introduction
        </motion.h2>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
        }}>

          {/* Left — Profile card */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
          >
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Profile photo — full cover */}
              <img
                src="/sai.jpg"
                alt="M. Sai Mokshith"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />

              {/* Gradient overlay at bottom for labels */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '45%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }} />

              {/* Name & Role at bottom */}
              <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                <span className="label" style={{ color: '#fff', letterSpacing: '0.12em' }}>M. Sai Mokshith</span>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: 5,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>Full-Stack Developer</div>
              </div>

              {/* Corner labels */}
              <div style={{ position: 'absolute', top: 20, left: 20 }}>
                <span className="label" style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: 2 }}>KL University — 3rd Year</span>
              </div>
              <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <span className="label" style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: 2 }}>B.Tech CSE</span>
              </div>
            </div>

          </motion.div>

          {/* Right — Bio content */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
            style={{ paddingTop: 20 }}
          >
            <h3 style={{
              fontSize: 28,
              fontWeight: 600,
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}>
              M. Sai Mokshith
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              <p className="body-text">
                I'm a 3rd year Computer Science & Engineering student at KL University, passionate about building full-stack web applications. I specialize in the MERN stack — React.js, Node.js, Express.js, and MongoDB.
              </p>
              <p className="body-text">
                I enjoy building projects from scratch, learning new technologies, and turning ideas into functional products. I'm always exploring modern tools and best practices in web development.
              </p>
              <p className="body-text">
                Currently looking for internship opportunities and open to collaborating on interesting projects.
              </p>
            </div>

            {/* Info table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'University', value: 'KL University, Vijayawada' },
                { label: 'Degree', value: 'B.Tech — Computer Science & Engineering' },
                { label: 'Year', value: '3rd Year (2024 — 2028)' },
                { label: 'Email', value: 'saimokshith2006@gmail.com' },
                { label: 'Availability', value: 'Open to Internships & Projects' },
                { label: 'Languages', value: 'Telugu (native), English (professional)' },
              ].map((row) => (
                <div key={row.label} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '160px 1fr',
                  padding: isMobile ? '10px 0' : '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  gap: isMobile ? 4 : 20,
                }}>
                  <span className="label" style={{ color: 'rgba(255,255,255,0.3)', paddingTop: 2 }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-solid"
              >
                Get In Touch
              </button>
              <a href="/MyResume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                View CV ↗
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            marginTop: isMobile ? 40 : 80,
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { number: '3rd', label: 'Year of B.Tech' },
            { number: '10+', label: 'Projects Built' },
            { number: '5+', label: 'Certifications' },
            { number: '15+', label: 'Technologies' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: isMobile ? '24px 0' : '40px 0',
              borderRight: (!isMobile && i < 3) || (isMobile && i % 2 === 0) ? '1px solid rgba(255,255,255,0.06)' : 'none',
              borderBottom: isMobile && i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              paddingLeft: (!isMobile && i > 0) || (isMobile && i % 2 !== 0) ? (isMobile ? 24 : 40) : 0,
            }}>
              <div style={{
                fontSize: 'clamp(2rem, 9vw, 3rem)',
                fontWeight: 700,
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.03em',
                marginBottom: 8,
              }}>{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

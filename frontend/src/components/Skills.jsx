import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

/* ─── Skill data with CDN icon URLs ──────────────────────────────────────── */
const skills = [
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    color: '#E34F26',
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    color: '#1572B6',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
  },
  {
    name: 'React.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB',
  },
  {
    name: 'Tailwind',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#38BDF8',
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: '#F89820',
  },
  {
    name: 'Spring Boot',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    color: '#6DB33F',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#68A063',
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#ffffff',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    color: '#4479A1',
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    color: '#47A248',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032',
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    color: '#ffffff',
  },
  {
    name: 'Postman',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    color: '#FF6C37',
  },
  {
    name: 'IntelliJ',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg',
    color: '#FE315D',
  },
  {
    name: 'Vite',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    color: '#646CFF',
  },
  {
    name: 'Framer',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg',
    color: '#BB4BFF',
  },
]

const concepts = [
  'OOP', 'Microservices', 'JWT Auth', 'RBAC',
  'RAG Pipeline', 'REST Design', 'MVC', 'DSA', 'DBMS',
]

/* ─── Single skill card ───────────────────────────────────────────────────── */
const SkillCard = ({ skill, index, inView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        delay: 0.2 + index * 0.055,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        padding: '28px 16px 22px',
        borderRadius: 4,
        border: `1px solid ${hovered ? `${skill.color}40` : 'rgba(255,255,255,0.07)'}`,
        background: hovered
          ? `radial-gradient(ellipse at 50% 0%, ${skill.color}14 0%, rgba(0,0,0,0.6) 70%)`
          : 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(8px)',
        cursor: 'default',
        transition: 'border-color 0.35s, background 0.35s, box-shadow 0.35s, transform 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px ${skill.color}22, 0 0 0 1px ${skill.color}18` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%',
        height: 1,
        background: hovered
          ? `linear-gradient(90deg, transparent, ${skill.color}80, transparent)`
          : 'transparent',
        transition: 'background 0.35s',
        borderRadius: 999,
      }} />

      {/* Icon */}
      <motion.div
        animate={{ scale: hovered ? 1.12 : 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 52,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: hovered ? 'drop-shadow(0 0 10px ' + skill.color + '88)' : 'none',
          transition: 'filter 0.35s',
        }}
      >
        <img
          src={skill.icon}
          alt={skill.name}
          width={52}
          height={52}
          style={{
            objectFit: 'contain',
            opacity: hovered ? 1 : 0.75,
            transition: 'opacity 0.3s',
          }}
          onError={e => { e.target.style.display = 'none' }}
        />
      </motion.div>

      {/* Label */}
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.3s',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

/* ─── Main Skills section ─────────────────────────────────────────────────── */
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
      {/* Noise grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Ghost BG text */}
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.005) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Skills
      </motion.span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 0,
          alignItems: 'flex-end',
          marginBottom: isMobile ? 48 : 72,
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

        {/* ── Icon Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(3, 1fr)'
            : 'repeat(6, 1fr)',
          gap: isMobile ? 10 : 14,
          marginBottom: isMobile ? 48 : 64,
        }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Concepts strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            paddingTop: isMobile ? 28 : 36,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
            gap: isMobile ? 14 : 40,
            alignItems: 'start',
          }}
        >
          <p className="label" style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em', paddingTop: 2 }}>
            Concepts &amp; Practices
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
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

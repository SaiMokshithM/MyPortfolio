import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useIsMobile from '../hooks/useIsMobile'

const stats = [
  { num: '3rd',  label: 'Year of B.Tech'  },
  { num: '10+',  label: 'Projects Built'  },
  { num: '5+',   label: 'Certifications'  },
  { num: '15+',  label: 'Technologies'    },
]

const StatsBar = () => {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div
      ref={ref}
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      }}
    >
      {stats.map(({ num, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            padding: isMobile ? '36px 28px' : '52px 52px',
            borderRight: isMobile
              ? (i % 2 === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none')
              : (i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none'),
            borderBottom: isMobile && i < 2
              ? '1px solid rgba(255,255,255,0.07)'
              : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.018)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {/* Large number — premium gradient */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 52 : 68,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              background: 'linear-gradient(160deg, #ffffff 30%, rgba(255,255,255,0.45) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {num}
          </motion.p>

          {/* Thin divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            style={{
              width: 24, height: 1,
              background: 'rgba(255,255,255,0.2)',
              transformOrigin: 'left',
            }}
          />

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 500,
            }}
          >
            {label}
          </motion.p>
        </motion.div>
      ))}
    </div>
  )
}

export default StatsBar

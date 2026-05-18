import { motion } from 'framer-motion'

const items = [
  'React.js', '✦', 'Node.js', '✦', 'MongoDB', '✦', 'Express.js', '✦',
  'Tailwind CSS', '✦', 'MySQL', '✦', 'Git & GitHub', '✦', 'REST APIs', '✦',
  'Full-Stack Development', '✦', 'Java', '✦', 'Python', '✦', 'Docker', '✦',
  'React.js', '✦', 'Node.js', '✦', 'MongoDB', '✦', 'Express.js', '✦',
  'Tailwind CSS', '✦', 'MySQL', '✦', 'Git & GitHub', '✦', 'REST APIs', '✦',
]

const Marquee = () => {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '18px 0',
      background: '#0a0a0a',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to right, #0a0a0a, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120,
        background: 'linear-gradient(to left, #0a0a0a, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 40, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontSize: item === '✦' ? 10 : 11,
              fontWeight: item === '✦' ? 400 : 500,
              letterSpacing: item === '✦' ? 0 : '0.15em',
              textTransform: 'uppercase',
              color: item === '✦' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee

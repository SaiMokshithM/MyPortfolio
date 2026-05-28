import { useScroll, useSpring, motion, useTransform } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // Glow intensity pulses as you scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.7])

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 99999,
        }}
      />
      {/* Glow trail behind bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(180,140,255,0.25) 50%, rgba(255,255,255,0.1) 100%)',
          transformOrigin: '0%',
          scaleX,
          opacity: glowOpacity,
          filter: 'blur(3px)',
          zIndex: 99998,
        }}
      />
    </>
  )
}

export default ScrollProgressBar

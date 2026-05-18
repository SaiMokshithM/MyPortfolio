import { useScroll, useSpring, motion } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 99999,
        boxShadow: '0 0 12px rgba(255,255,255,0.5)',
      }}
    />
  )
}

export default ScrollProgressBar

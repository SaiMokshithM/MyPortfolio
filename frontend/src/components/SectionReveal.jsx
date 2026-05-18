import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Wraps any section with a premium scroll effect:
 * - Slides & fades in from below when entering
 * - Scales down + fades out as you scroll past it
 */
const SectionReveal = ({ children, id }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // As section enters: scale from 0.94 → 1
  const rawScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.92])
  // As section exits: fade out
  const rawOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 1, 1, 0])
  // Slight Y parallax on exit
  const rawY = useTransform(scrollYProgress, [0.85, 1], [0, -40])

  const scale = useSpring(rawScale, { stiffness: 80, damping: 22 })
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 22 })
  const y = useSpring(rawY, { stiffness: 80, damping: 22 })

  return (
    <div ref={ref} id={id} style={{ position: 'relative' }}>
      <motion.div style={{ scale, opacity, y, transformOrigin: 'center top' }}>
        {children}
      </motion.div>
    </div>
  )
}

export default SectionReveal

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Premium section reveal wrapper:
 *  - Subtle scale + Y entrance (card lifts in)
 *  - Spring-smoothed for buttery feel
 *  - NO exit animation — sections stay fully visible when scrolling back up
 */
const SectionReveal = ({ children, id }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // ── Entrance only — no exit fade (prevents black screen on reverse scroll)
  const rawScale   = useTransform(scrollYProgress, [0, 0.14], [0.96, 1], { clamp: true })
  const rawOpacity = useTransform(scrollYProgress, [0, 0.10], [0,    1], { clamp: true })
  const rawY       = useTransform(scrollYProgress, [0, 0.14], [48,   0], { clamp: true })
  const rawRotateX = useTransform(scrollYProgress, [0, 0.14], [3,    0], { clamp: true })

  // ── Springs — stiffness/damping tuned for premium feel ────────
  const scale   = useSpring(rawScale,   { stiffness: 55, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 55, damping: 20 })
  const y       = useSpring(rawY,       { stiffness: 55, damping: 20 })
  const rotateX = useSpring(rawRotateX, { stiffness: 55, damping: 20 })

  return (
    <div
      ref={ref}
      id={id}
      style={{
        position: 'relative',
        perspective: '1200px',
        /* Critical: zero out any browser default spacing */
        margin: 0,
        padding: 0,
        /* Prevent gap lines from sub-pixel rounding on mobile */
        fontSize: 0,
        lineHeight: 0,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          rotateX,
          transformOrigin: 'center top',
          willChange: 'transform, opacity',
          /* Restore font for children */
          fontSize: 'initial',
          lineHeight: 'initial',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default SectionReveal

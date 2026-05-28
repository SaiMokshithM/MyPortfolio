import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * Premium section reveal wrapper:
 *  - Clip-path wipe from bottom as section enters viewport
 *  - Subtle scale + Y entrance (card lifts in)
 *  - Parallax Y drift + fade-out as section exits
 *  - Spring-smoothed for buttery feel
 */
const SectionReveal = ({ children, id }) => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // ── Entrance (0 → 0.18) ──────────────────────────────────────
  const rawScale   = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [0.96, 1,    1,    0.94], { clamp: true })
  const rawOpacity = useTransform(scrollYProgress, [0, 0.10, 0.78, 1], [0,    1,    1,    0   ], { clamp: true })
  const rawY       = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [48,   0,    0,    -36 ], { clamp: true })
  const rawRotateX = useTransform(scrollYProgress, [0, 0.14],          [3,    0                ], { clamp: true })

  // ── Springs — stiffness/damping tuned for premium feel ────────
  const scale   = useSpring(rawScale,   { stiffness: 55, damping: 20 })
  const opacity = useSpring(rawOpacity, { stiffness: 55, damping: 20 })
  const y       = useSpring(rawY,       { stiffness: 55, damping: 20 })
  const rotateX = useSpring(rawRotateX, { stiffness: 55, damping: 20 })

  return (
    <div
      ref={ref}
      id={id}
      style={{ position: 'relative', perspective: '1200px' }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          rotateX,
          transformOrigin: 'center top',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default SectionReveal

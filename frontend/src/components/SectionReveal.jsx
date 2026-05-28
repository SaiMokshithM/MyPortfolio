import { motion } from 'framer-motion'

/**
 * Premium section reveal wrapper:
 *  - Subtle scale + Y entrance (card lifts in)
 *  - Spring-smoothed for buttery feel
 *  - Animates on entrance once, and stays fully visible
 *  - 100% robust: immune to scroll-linking and race conditions
 */
const SectionReveal = ({ children, id }) => {
  return (
    <div
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
        initial={{ opacity: 0, y: 48, scale: 0.96, rotateX: 3 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
        transition={{
          type: 'spring',
          stiffness: 45,
          damping: 18,
          mass: 1
        }}
        style={{
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

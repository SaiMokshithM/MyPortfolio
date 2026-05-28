import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ParallaxText — text that drifts vertically at a custom speed as you scroll.
 * speed: negative = moves up faster than scroll (foreground feel)
 *        positive = moves down slower (background feel)
 */
export const ParallaxText = ({ children, speed = -0.15, style = {} }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  return (
    <motion.div ref={ref} style={{ y, ...style }}>
      {children}
    </motion.div>
  )
}

/**
 * FadeSlideIn — fades + slides in from a direction when entering viewport.
 * direction: 'up' | 'down' | 'left' | 'right'
 */
export const FadeSlideIn = ({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 0.7,
  style = {},
}) => {
  const dirMap = {
    up:    { y: distance,  x: 0          },
    down:  { y: -distance, x: 0          },
    left:  { x: distance,  y: 0          },
    right: { x: -distance, y: 0          },
  }
  const from = dirMap[direction] ?? dirMap.up

  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/**
 * RevealMask — text masked with clip-path, wiping in from bottom.
 * Great for headings.
 */
export const RevealMask = ({ children, delay = 0, style = {} }) => (
  <div style={{ overflow: 'hidden', ...style }}>
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
)

/**
 * HorizontalScrollLine — a horizontal rule that draws itself left→right on scroll.
 */
export const HorizontalScrollLine = ({ delay = 0, color = 'rgba(255,255,255,0.08)' }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{
      height: 1,
      background: color,
      transformOrigin: 'left',
    }}
  />
)

/**
 * ScaleOnScroll — element scales from small → 1 as it enters.
 */
export const ScaleOnScroll = ({ children, from = 0.88, delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, scale: from }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    style={style}
  >
    {children}
  </motion.div>
)

/**
 * StaggerParent — wraps children so they can be staggered.
 * Use with StaggerChild on each child.
 */
export const StaggerParent = ({ children, stagger = 0.08, delayStart = 0, style = {} }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delayStart },
      },
    }}
    style={style}
  >
    {children}
  </motion.div>
)

export const StaggerChild = ({ children, style = {} }) => (
  <motion.div
    variants={{
      hidden:  { opacity: 0, y: 28 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
    }}
    style={style}
  >
    {children}
  </motion.div>
)

/**
 * FloatingOrb — decorative glowing orb that drifts slowly on scroll.
 */
export const FloatingOrb = ({ color = 'rgba(255,255,255,0.04)', size = 400, top, left, right, bottom, speed = -0.08 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', `${speed * 300}px`])
  const y = useSpring(rawY, { stiffness: 40, damping: 18 })

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
        top, left, right, bottom,
        y,
        zIndex: 0,
      }}
    />
  )
}

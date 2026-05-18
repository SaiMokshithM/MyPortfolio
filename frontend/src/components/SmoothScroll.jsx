import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export const getLenis = () => lenisInstance

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    lenisInstance = lenis

    // Sync lenis with framer-motion scroll events
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return null
}

export default SmoothScroll

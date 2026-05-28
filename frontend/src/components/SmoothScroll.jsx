import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance = null

export const getLenis = () => lenisInstance

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // Ultra-smooth feel — longer duration, premium easing curve
      duration: 1.6,
      easing: (t) => {
        // Custom "ease-out-expo" — fast start, luxurious deceleration
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      },
      smoothWheel: true,
      wheelMultiplier: 0.85,   // Slightly slower wheel = feels more controlled
      touchMultiplier: 1.8,    // Responsive on mobile
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: false,        // Let native touch be native (better mobile UX)
    })

    lenisInstance = lenis

    // Sync lenis scroll events with native scroll listeners (for react-intersection-observer)
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
    })

    // RAF loop
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Anchor click handler — smooth-scroll to section IDs via Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -80, duration: 1.8 })
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}

export default SmoothScroll

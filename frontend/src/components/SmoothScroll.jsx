import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

    // ── KEY BRIDGE: Sync Lenis scroll position with GSAP ScrollTrigger ──
    // Without this, GSAP ScrollTrigger uses native scroll position which
    // doesn't match Lenis's virtual scroll — causing animation jitter.
    lenis.on('scroll', ScrollTrigger.update)

    // Also dispatch native scroll event for react-intersection-observer
    lenis.on('scroll', () => {
      window.dispatchEvent(new Event('scroll'))
    })

    // ── RAF loop — tick both Lenis and GSAP together ─────────────
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)  // GSAP time is in seconds, Lenis expects ms
    })

    // Disable GSAP's lagSmoothing to keep scroll perfectly synced
    gsap.ticker.lagSmoothing(0)

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
      // Remove GSAP ticker — critical to avoid double RAF loops
      gsap.ticker.remove(lenis.raf)
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}

export default SmoothScroll

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   Helper: split text into individual char spans for reveal
───────────────────────────────────────────────────────────── */
const splitChars = (el) => {
  if (!el || el.dataset.split) return
  el.dataset.split = 'true'
  const text = el.textContent
  el.textContent = ''
  el.style.overflow = 'hidden'
  text.split('').forEach((ch) => {
    const outer = document.createElement('span')
    outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom'
    const inner = document.createElement('span')
    inner.style.cssText = 'display:inline-block;will-change:transform'
    inner.textContent = ch === ' ' ? '\u00a0' : ch
    outer.appendChild(inner)
    el.appendChild(outer)
  })
  return [...el.querySelectorAll(':scope > span > span')]
}

/* ─────────────────────────────────────────────────────────────
   Helper: detect reduced-motion preference
───────────────────────────────────────────────────────────── */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ═════════════════════════════════════════════════════════════
   CINEMATIC SCROLL — mounts and tears down all GSAP triggers
   on the page. Zero layout changes. Pure visual layering.
═════════════════════════════════════════════════════════════ */
const CinematicScroll = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      /* ── 1. SECTION ENTRANCE — blur + scale + opacity ─────── */
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => {
        // Skip hero — it has its own animations
        if (section.id === 'home') return

        gsap.fromTo(
          section,
          {
            opacity: 0,
            scale: 0.97,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none none',  // play once, never reverse
            },
          }
        )
      })

      /* ── 2. HEADING CHAR REVEAL — staggered letter rise ────── */
      const headings = document.querySelectorAll('h1, h2, h3')
      headings.forEach((el) => {
        // Only large headings
        const fs = parseFloat(window.getComputedStyle(el).fontSize)
        if (fs < 28) return

        const chars = splitChars(el)
        if (!chars || chars.length === 0) return

        gsap.fromTo(
          chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: { amount: 0.45, from: 'start' },
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── 3. FADE + SLIDE paragraphs and labels ─────────────── */
      const bodies = document.querySelectorAll('p, .label')
      bodies.forEach((el) => {
        const fs = parseFloat(window.getComputedStyle(el).fontSize)
        if (fs < 11) return  // skip tiny decorative text

        gsap.fromTo(
          el,
          { opacity: 0, y: 32, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── 4. CARD STAGGER — project/skill cards lift in ─────── */
      const cardGroups = document.querySelectorAll('[data-cards], .cards-grid')
      cardGroups.forEach((group) => {
        const cards = group.querySelectorAll('[data-card]')
        if (cards.length === 0) return
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: group,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── 5. PARALLAX — hero photo drifts at 0.5x speed ─────── */
      if (!isMobile) {
        const heroPhoto = document.querySelector('.hero-photo')
        if (heroPhoto) {
          gsap.to(heroPhoto, {
            y: '-14%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#home',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.8,
            },
          })
        }

        /* Background ghost words drift slower than content */
        document.querySelectorAll('section[id] [style*="position: absolute"]').forEach((el) => {
          const txt = el.textContent?.trim()
          if (!txt || txt.length < 3) return
          const style = window.getComputedStyle(el)
          const fs = parseFloat(style.fontSize)
          if (fs < 80) return   // only giant background words

          gsap.to(el, {
            y: '-20%',
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.5,
            },
          })
        })
      }

      /* ── 6. HORIZONTAL SCROLL LABELS ───────────────────────── */
      // Horizontal drift on decorative number badges / stat numbers
      const statNums = document.querySelectorAll('[data-stat]')
      statNums.forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: -30, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── 7. DEPTH LAYERS — foreground vs background speed ───── */
      if (!isMobile) {
        // Foreground content — slight upward drift (fast)
        document.querySelectorAll('section[id]:not(#home) .container').forEach((el) => {
          gsap.to(el, {
            y: '-4%',
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        })
      }

      /* ── 8. BORDER LINES draw in left→right ─────────────────── */
      document.querySelectorAll('[style*="height: 1px"], [style*="height:1px"]').forEach((el) => {
        const w = el.offsetWidth
        if (w < 40) return
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ── 9. SCALE SPOTLIGHT — removed to prevent black screen on reverse scroll ── */

      /* ── 10. STICKY NUMBER counters animate on enter ─────────── */
      document.querySelectorAll('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count)
        if (isNaN(target)) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Number.isInteger(target)
              ? Math.round(obj.val)
              : obj.val.toFixed(1)
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      /* ── 11. CINEMATIC OVERLAY VIGNETTE on scroll ────────────── */
      let vignetteEl = document.getElementById('__cinematic_vignette__')
      if (!vignetteEl) {
        vignetteEl = document.createElement('div')
        vignetteEl.id = '__cinematic_vignette__'
        vignetteEl.style.cssText = `
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9990;
          background: radial-gradient(ellipse at center,
            transparent 60%,
            rgba(0,0,0,0.55) 100%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        `
        document.body.appendChild(vignetteEl)
      }

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          const v = Math.min(self.progress * 1.4, 0.9)
          vignetteEl.style.opacity = v
        },
      })

      /* ── 12. HERO text cinematic entrance (one-shot) ────────── */
      const heroSection = document.querySelector('#home')
      if (heroSection) {
        const heroHeadings = heroSection.querySelectorAll('h1, h2')
        heroHeadings.forEach((el) => {
          const chars = splitChars(el)
          if (!chars || chars.length === 0) return
          gsap.fromTo(
            chars,
            { yPercent: 120, opacity: 0, rotateX: 25 },
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1.1,
              ease: 'expo.out',
              stagger: { amount: 0.5 },
              delay: 0.3,
            }
          )
        })
      }
    })

    return () => {
      ctx.revert()
      // Clean up vignette
      const vig = document.getElementById('__cinematic_vignette__')
      if (vig) vig.remove()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return null
}

export default CinematicScroll

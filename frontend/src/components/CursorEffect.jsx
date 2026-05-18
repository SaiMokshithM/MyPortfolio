import React, { useEffect, useRef, useState } from 'react'

const CursorEffect = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const [label, setLabel] = useState('')
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const trail = trailRef.current
    let animId

    // Hide default cursor
    document.documentElement.style.cursor = 'none'

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onMouseDown = () => setIsClick(true)
    const onMouseUp = () => setIsClick(false)

    const animate = () => {
      // Ring: smooth follow with lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.10
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.10
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'

      // Trail: even slower follow
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.05
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.05
      trail.style.left = trailPos.current.x + 'px'
      trail.style.top = trailPos.current.y + 'px'

      animId = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = (e) => {
      setIsHover(true)
      const tag = e.target.tagName.toLowerCase()
      if (tag === 'a') setLabel('open')
      else if (tag === 'button') setLabel('click')
      else setLabel('')
    }

    const onMouseLeaveLink = () => {
      setIsHover(false)
      setLabel('')
    }

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.style.cursor = 'none'
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    addListeners()
    animId = requestAnimationFrame(animate)

    // Re-add listeners when DOM changes
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.documentElement.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Outer slow trail — large soft glow */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9996,
          left: '-60px',
          top: '-60px',
          width: 120,
          height: 120,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: isHover
            ? 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          transition: 'background 0.4s ease',
          willChange: 'left, top',
        }}
      />

      {/* Ring — medium lag, expands on hover */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9998,
          left: '-20px',
          top: '-20px',
          width: isHover ? 60 : 36,
          height: isHover ? 60 : 36,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          border: isHover
            ? '1px solid rgba(255,255,255,0.7)'
            : '1px solid rgba(255,255,255,0.25)',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
          willChange: 'left, top',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Label inside ring on hover */}
        {label && isHover && (
          <span style={{
            fontSize: 8,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            opacity: isHover ? 1 : 0,
            transition: 'opacity 0.2s',
          }}>
            {label}
          </span>
        )}
      </div>

      {/* Core dot — instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          left: '-4px',
          top: '-4px',
          width: isClick ? 3 : isHover ? 0 : 5,
          height: isClick ? 3 : isHover ? 0 : 5,
          borderRadius: '50%',
          background: '#fff',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
          opacity: isHover ? 0 : 1,
          willChange: 'left, top',
          boxShadow: '0 0 6px rgba(255,255,255,0.8)',
        }}
      />
    </>
  )
}

export default CursorEffect

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import useIsMobile from '../hooks/useIsMobile'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.04 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const isMobile = useIsMobile()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{ name: form.name, email: form.email, message: form.message }])
      if (error) throw error
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      toast.success('Message sent.')
      setTimeout(() => setSent(false), 5000)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${hasError ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
    padding: '16px 0',
    fontFamily: 'Inter, sans-serif',
    fontSize: 15,
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.25s',
    boxSizing: 'border-box',
    letterSpacing: '0.01em',
  })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.015) 0%, transparent 70%)',
      }} />

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        padding: isMobile
          ? '60px 20px 60px'
          : `clamp(80px,11vw,120px) clamp(20px,6vw,80px)`,
        boxSizing: 'border-box',
        width: '100%',
      }}>

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 32 : 48 }}
        >
          <div style={{ width: 20, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <span className="label" style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
            06 — Contact
          </span>
        </motion.div>

        {/* ── MASSIVE headline ── */}
        <div style={{ marginBottom: isMobile ? 48 : 72, overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 'clamp(3rem, 15vw, 5.5rem)' : 'clamp(4rem, 9vw, 10rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.88,
              color: '#fff',
              margin: 0,
            }}
          >
            Let's Build<br />
            <span style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Something.
            </span>
          </motion.h2>
        </div>

        {/* ── Clickable email ── */}
        <motion.a
          href="mailto:saimokshith2006@gmail.com"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{
            display: 'inline-block',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: isMobile ? 'clamp(1rem, 4.5vw, 1.5rem)' : 'clamp(1.2rem, 2.5vw, 2.2rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: 6,
            marginBottom: isMobile ? 48 : 72,
            transition: 'color 0.25s, border-color 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
            e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.12)'
          }}
        >
          saimokshith2006@gmail.com ↗
        </motion.a>

        {/* ── Horizontal rule ── */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{ transformOrigin: 'left', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: isMobile ? 48 : 64 }}
        />

        {/* ── Two-column: socials + form ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
          gap: isMobile ? 48 : 80,
          alignItems: 'start',
        }}>

          {/* Left — links + availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            {[
              { label: 'LinkedIn', value: 'medam-sai-mokshith ↗', href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/' },
              { label: 'GitHub',   value: 'SaiMokshithM ↗',       href: 'https://github.com/SaiMokshithM/' },
              { label: 'Phone',    value: '+91 9347804324',        href: null },
              { label: 'Location', value: 'Vijayawada, India',     href: null },
            ].map(({ label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.07 }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
                  {label}
                </span>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s', textAlign: 'right' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{value}</a>
                ) : (
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', textAlign: 'right' }}>{value}</span>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>
                Open to internships & projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 40 }}>
              {/* Name */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: errors.name ? 'rgba(248,113,113,0.8)' : 'rgba(255,255,255,0.22)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 8 }}>
                  Name *
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  style={inputStyle(errors.name)} placeholder=""
                  onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.45)'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = errors.name ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}
                />
                {errors.name && <p style={{ fontSize: 10, color: 'rgba(248,113,113,0.8)', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: errors.email ? 'rgba(248,113,113,0.8)' : 'rgba(255,255,255,0.22)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 8 }}>
                  Email *
                </label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  style={inputStyle(errors.email)} placeholder=""
                  onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.45)'}
                  onBlur={e => e.currentTarget.style.borderBottomColor = errors.email ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}
                />
                {errors.email && <p style={{ fontSize: 10, color: 'rgba(248,113,113,0.8)', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>{errors.email}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: errors.message ? 'rgba(248,113,113,0.8)' : 'rgba(255,255,255,0.22)', fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 8 }}>
                Message *
              </label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                rows={5} style={{ ...inputStyle(errors.message), resize: 'none' }} placeholder=""
                onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.45)'}
                onBlur={e => e.currentTarget.style.borderBottomColor = errors.message ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.1)'}
              />
              {errors.message && <p style={{ fontSize: 10, color: 'rgba(248,113,113,0.8)', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>{errors.message}</p>}
            </div>

            {/* Submit row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? { scale: 1.03 } : {}}
                whileTap={!sending ? { scale: 0.97 } : {}}
                style={{
                  padding: '15px 44px',
                  background: '#fff', border: '1px solid #fff',
                  borderRadius: 2, fontFamily: 'Inter, sans-serif',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#000',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  opacity: sending ? 0.65 : 1,
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  transition: 'background 0.2s, opacity 0.2s',
                }}
              >
                {sending ? (
                  <>
                    <span style={{
                      width: 12, height: 12,
                      border: '1.5px solid rgba(0,0,0,0.2)',
                      borderTopColor: '#000', borderRadius: '50%',
                      display: 'inline-block', animation: 'spin 0.7s linear infinite',
                    }} />
                    Sending
                  </>
                ) : 'Send Message'}
              </motion.button>

              <AnimatePresence>
                {sent && (
                  <motion.span
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ fontSize: 12, color: '#4ade80', fontFamily: 'Inter, sans-serif', letterSpacing: '0.08em' }}
                  >
                    ✓ Sent successfully
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

export default Contact

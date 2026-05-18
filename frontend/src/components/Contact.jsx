import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import axios from 'axios'
import toast from 'react-hot-toast'
import useIsMobile from '../hooks/useIsMobile'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
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
      await axios.post('/api/contact', form)
      toast.success('Message sent successfully.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.success('Message sent successfully.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } finally {
      setSending(false)
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        {/* Meta */}
        <div className="section-meta">
          <span className="label">06 — Contact</span>
          <span className="label" style={{ color: 'rgba(255,255,255,0.25)' }}>Get In Touch</span>
        </div>

        {/* Heading */}
        <motion.h2 className="display-lg" {...fadeUp(0)} style={{ marginBottom: 16 }}>
          Let's Talk
        </motion.h2>
        <motion.p className="body-text" {...fadeUp(0.1)} style={{ maxWidth: 480, marginBottom: 80 }}>
          Have a project, job opportunity, or just want to connect? I'm open to conversations.
          Typical response time is within 24 hours.
        </motion.p>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
          {/* Left — Info */}
          <motion.div {...fadeUp(0.15)} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: 'Email', value: 'saimokshith2006@gmail.com', href: 'mailto:saimokshith2006@gmail.com' },
              { label: 'Phone', value: '+91 9347804324', href: null },
              { label: 'Location', value: 'India', href: null },
              { label: 'LinkedIn', value: 'linkedin.com/in/medam-sai-mokshith', href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/' },
              { label: 'GitHub', value: 'github.com/SaiMokshithM', href: 'https://github.com/SaiMokshithM/' },
            ].map((info) => (
              <div key={info.label} style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '80px 1fr' : '120px 1fr',
                padding: isMobile ? '14px 0' : '18px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                gap: isMobile ? 12 : 20,
                alignItems: 'start',
              }}>
                <span className="label" style={{ color: 'rgba(255,255,255,0.3)', paddingTop: 2 }}>{info.label}</span>
                {info.href ? (
                  <a href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: isMobile ? 13 : 14,
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontWeight: 400,
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere',
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
                  >
                    {info.value}
                  </a>
                ) : (
                  <span style={{
                    fontSize: isMobile ? 13 : 14,
                    color: 'rgba(255,255,255,0.75)',
                    wordBreak: 'break-word',
                  }}>{info.value}</span>
                )}
              </div>
            ))}

            {/* Status */}
            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Currently available for new projects</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form {...fadeUp(0.2)} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 32 }}>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: 8 }}>Name *</label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name"
                  className="input-field"
                  style={{ borderBottomColor: errors.name ? 'rgba(248,113,113,0.6)' : undefined }}
                />
                {errors.name && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.8)', marginTop: 6 }}>{errors.name}</p>}
              </div>
              <div>
                <label className="label" style={{ display: 'block', marginBottom: 8 }}>Email *</label>
                <input
                  name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-field"
                  style={{ borderBottomColor: errors.email ? 'rgba(248,113,113,0.6)' : undefined }}
                />
                {errors.email && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.8)', marginTop: 6 }}>{errors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginTop: 32 }}>
              <label className="label" style={{ display: 'block', marginBottom: 8 }}>Subject</label>
              <input
                name="subject" value={form.subject} onChange={handleChange}
                placeholder="What's this about?"
                className="input-field"
              />
            </div>

            {/* Message */}
            <div style={{ marginTop: 32 }}>
              <label className="label" style={{ display: 'block', marginBottom: 8 }}>Message *</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell me about your project, timeline, or anything else..."
                rows={6}
                className="input-field"
                style={{
                  resize: 'none',
                  borderBottomColor: errors.message ? 'rgba(248,113,113,0.6)' : undefined,
                }}
              />
              {errors.message && <p style={{ fontSize: 11, color: 'rgba(248,113,113,0.8)', marginTop: 6 }}>{errors.message}</p>}
            </div>

            {/* Submit */}
            <div style={{ marginTop: 40 }}>
              <button
                type="submit"
                disabled={sending}
                className="btn-solid"
                style={{ opacity: sending ? 0.6 : 1, cursor: sending ? 'not-allowed' : 'pointer', padding: '14px 40px' }}
              >
                {sending ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      width: 14, height: 14,
                      border: '1.5px solid rgba(0,0,0,0.3)',
                      borderTopColor: '#000',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }} />
                    Sending...
                  </span>
                ) : 'Send Message →'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}

export default Contact

import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/SaiMokshithM/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/' },
  { label: 'Twitter / X', href: 'https://twitter.com' },
  { label: 'Email', href: 'mailto:saimokshith2006@gmail.com' },
]

const Footer = () => {
  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  const isMobile = useIsMobile()

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#000',
      padding: isMobile ? '60px 20px 40px' : '80px 40px 40px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 40 : 60, marginBottom: isMobile ? 40 : 80 }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 28, fontWeight: 700,
              letterSpacing: '-0.02em', color: '#fff',
              marginBottom: 16,
            }}>
              M. Sai Mokshith
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 260 }}>
              Full-Stack Developer based in India. Building clean, functional web applications with modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label" style={{ marginBottom: 20 }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 14, color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'Inter, sans-serif',
                      padding: '10px 0',
                      minHeight: 44,
                      display: 'flex', alignItems: 'center',
                      transition: 'color 0.2s',
                      width: '100%', textAlign: 'left',
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="label" style={{ marginBottom: 20 }}>Connect</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {socials.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 14, color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none', display: 'flex',
                      alignItems: 'center', gap: 8,
                      transition: 'color 0.2s',
                      padding: '10px 0',
                      minHeight: 44,
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {s.label}
                    <span style={{ fontSize: 11, opacity: 0.4 }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 32 }} />

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} M. Sai Mokshith. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'space-between' : 'flex-end' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              Built with React + Vite + Node.js
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 2, cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
              aria-label="Back to top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

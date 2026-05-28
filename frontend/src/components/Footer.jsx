import useIsMobile from '../hooks/useIsMobile'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Work',       href: '#projects'   },
  { label: 'Education',  href: '#experience' },
  { label: 'Resume',     href: '#resume'     },
  { label: 'Contact',    href: '#contact'    },
]

const socials = [
  { label: 'GitHub',   href: 'https://github.com/SaiMokshithM/'                          },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/medam-sai-mokshith-a03a8333b/' },
  { label: 'Email',    href: 'mailto:saimokshith2006@gmail.com'                           },
]

const linkStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  color: 'rgba(255,255,255,0.32)',
  textDecoration: 'none',
  letterSpacing: '0.02em',
  transition: 'color 0.2s',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  textAlign: 'left',
}

const Footer = () => {
  const isMobile = useIsMobile()

  const scrollTo = (href) =>
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '56px 24px 32px' : '72px 60px 36px', position: 'relative' }}>

        {/* ── Top: name + nav + socials ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto auto',
          gap: isMobile ? 44 : 80,
          alignItems: 'start',
          marginBottom: isMobile ? 48 : 64,
        }}>

          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: isMobile ? 26 : 32,
              fontWeight: 700, letterSpacing: '-0.025em',
              color: '#fff', marginBottom: 12, lineHeight: 1.1,
            }}>
              M. Sai Mokshith
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13, lineHeight: 1.75,
              color: 'rgba(255,255,255,0.28)',
              maxWidth: 280,
            }}>
              Full-stack developer building clean, functional software. Based in Vijayawada, India.
            </p>
          </div>

          {/* Nav */}
          <div style={{ minWidth: 120 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>
              Pages
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div style={{ minWidth: 120 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>
              Connect
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {socials.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: 5 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.32)'}
                  >
                    {s.label}
                    <span style={{ fontSize: 10, opacity: 0.5 }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 16,
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} M. Sai Mokshith — All rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.15)', letterSpacing: '0.04em' }}>
              Built with React · Vite · Spring Boot
            </p>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                width: 40, height: 40, background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2, cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, transition: 'all 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
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

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music2 } from 'lucide-react'

const navLinks = [
  { href: '/agenda', label: 'Agenda' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/feed', label: 'Feed' },
  { href: '/locais', label: 'Locais' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header
      style={{
        background: 'rgba(10,10,10,0.95)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a84c, #a07830)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Music2 size={16} color="#0a0a0a" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#c9a84c',
                letterSpacing: '0.02em',
              }}
            >
              Jazz BH
            </span>
            <span
              style={{
                fontSize: '0.55rem',
                color: '#888',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Portal Cultural
            </span>
          </div>
        </Link>

        {/* Desktop nav — hidden on mobile (BottomNav handles mobile) */}
        <nav className="hidden md:flex" style={{ gap: '0.25rem' }}>
          {navLinks.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? '#c9a84c' : '#888',
                  textDecoration: 'none',
                  background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

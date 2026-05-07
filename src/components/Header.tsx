'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music2, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/agenda', label: 'Agenda' },
  { href: '/mapa', label: 'Mapa' },
  { href: '/feed', label: 'Feed' },
  { href: '/locais', label: 'Locais' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        background: 'rgba(10,10,10,0.95)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a84c, #a07830)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Music2 size={18} color="#0a0a0a" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#c9a84c',
                letterSpacing: '0.02em',
              }}
            >
              Jazz BH
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                color: '#888',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Portal Cultural
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.5rem 1rem',
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none',
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: '#0f0f0f',
            borderTop: '1px solid #1a1a1a',
            padding: '1rem 1.5rem',
          }}
          className="show-mobile"
        >
          {navLinks.map((link) => {
            const active = pathname?.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #1a1a1a',
                  color: active ? '#c9a84c' : '#888',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: active ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  )
}

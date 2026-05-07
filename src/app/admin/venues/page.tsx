import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminVenuesPage() {
  const venues = await db.venue.findMany({
    include: {
      _count: {
        select: { events: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <Link
        href="/admin"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.82rem',
          color: '#555',
          textDecoration: 'none',
          marginBottom: '1.5rem',
        }}
      >
        <ArrowLeft size={14} />
        Voltar ao admin
      </Link>

      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#e8e8e8',
          marginBottom: '1.5rem',
        }}
      >
        Gerenciar Locais ({venues.length})
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {venues.map((venue) => (
          <div
            key={venue.id}
            style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '12px',
              padding: '1.25rem',
              opacity: venue.active ? 1 : 0.5,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#e8e8e8',
                }}
              >
                {venue.name}
              </h3>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  borderRadius: '4px',
                  background: venue.active ? 'rgba(76,175,80,0.1)' : 'rgba(255,255,255,0.05)',
                  color: venue.active ? '#4caf50' : '#555',
                }}
              >
                {venue.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.3rem', marginBottom: '0.5rem' }}>
              <MapPin size={12} color="#c9a84c" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.8rem', color: '#888', display: 'block' }}>{venue.address}</span>
                <span style={{ fontSize: '0.72rem', color: '#555' }}>{venue.neighborhood}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#555' }}>
                {venue._count.events} event{venue._count.events !== 1 ? 'os' : 'o'}
              </span>
              <Link
                href={`/locais/${venue.id}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#c9a84c',
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                }}
              >
                Ver local
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

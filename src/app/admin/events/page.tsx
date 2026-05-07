import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    include: { venue: true, artists: { include: { artist: true } } },
    orderBy: { startsAt: 'asc' },
    take: 100,
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
        Gerenciar Shows ({events.length})
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {events.map((event) => {
          const isPast = event.startsAt < new Date()
          return (
            <div
              key={event.id}
              style={{
                background: '#141414',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                opacity: isPast ? 0.6 : 1,
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e8e8e8', marginBottom: '0.25rem' }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#666' }}>
                  {event.venue.name} · {event.startsAt.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: event.status === 'published'
                      ? 'rgba(76,175,80,0.1)'
                      : 'rgba(201,168,76,0.1)',
                    color: event.status === 'published' ? '#4caf50' : '#c9a84c',
                  }}
                >
                  {event.status === 'published' ? 'Publicado' : 'Pendente'}
                </span>
                <Link
                  href={`/agenda/${event.id}`}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #2a2a2a',
                    color: '#888',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                  }}
                >
                  Ver
                </Link>
              </div>
            </div>
          )
        })}
        {events.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#555', border: '1px dashed #2a2a2a', borderRadius: '12px' }}>
            Nenhum show cadastrado.
          </div>
        )}
      </div>
    </div>
  )
}

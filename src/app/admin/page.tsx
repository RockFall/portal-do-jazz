import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Calendar, MapPin, Music, CheckCircle, Clock, Newspaper } from 'lucide-react'
import db from '@/lib/db'

export const dynamic = 'force-dynamic'

async function checkAuth() {
  const headersList = await headers()
  const token = headersList.get('x-admin-token')
  // In production, implement proper auth
  return true
}

async function getStats() {
  const now = new Date()
  const [
    totalEvents,
    upcomingEvents,
    publishedEvents,
    totalVenues,
    totalPosts,
    pendingEvents,
  ] = await Promise.all([
    db.event.count(),
    db.event.count({ where: { startsAt: { gte: now }, status: 'published' } }),
    db.event.count({ where: { status: 'published' } }),
    db.venue.count({ where: { active: true } }),
    db.post.count(),
    db.event.count({ where: { status: 'pending' } }),
  ])

  return { totalEvents, upcomingEvents, publishedEvents, totalVenues, totalPosts, pendingEvents }
}

async function getRecentEvents() {
  return db.event.findMany({
    include: { venue: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
}

export default async function AdminPage() {
  const stats = await getStats()
  const recentEvents = await getRecentEvents()

  const statCards = [
    { icon: <Calendar size={20} color="#c9a84c" />, label: 'Shows cadastrados', value: stats.totalEvents },
    { icon: <Clock size={20} color="#4c8ec9" />, label: 'Próximos shows', value: stats.upcomingEvents },
    { icon: <CheckCircle size={20} color="#4caf50" />, label: 'Publicados', value: stats.publishedEvents },
    { icon: <Clock size={20} color="#c97a4c" />, label: 'Pendentes', value: stats.pendingEvents },
    { icon: <MapPin size={20} color="#c9a84c" />, label: 'Locais ativos', value: stats.totalVenues },
    { icon: <Newspaper size={20} color="#7a4cc9" />, label: 'Posts', value: stats.totalPosts },
  ]

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Music size={22} color="#c9a84c" />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#e8e8e8',
            }}
          >
            Painel Admin — Jazz BH
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#555' }}>
          Gerenciar shows, locais e publicações
        </p>
      </div>

      {/* Quick links */}
      <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { href: '/admin/events', label: 'Gerenciar Shows' },
          { href: '/admin/venues', label: 'Gerenciar Locais' },
          { href: '/agenda', label: 'Ver Agenda' },
          { href: '/locais', label: 'Ver Locais' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #2a2a2a',
              background: '#111',
              color: '#888',
              fontSize: '0.82rem',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {statCards.map(({ icon, label, value }) => (
          <div
            key={label}
            style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {icon}
              <span style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: '#e8e8e8',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent events table */}
      <div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#e8e8e8',
            marginBottom: '1rem',
          }}
        >
          Shows recentes
        </h2>
        <div
          style={{
            background: '#111',
            border: '1px solid #2a2a2a',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                {['Título', 'Local', 'Data', 'Status', 'Confiança', 'Ações'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.875rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: '#555',
                      fontWeight: 600,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event, i) => (
                <tr
                  key={event.id}
                  style={{
                    borderBottom: i < recentEvents.length - 1 ? '1px solid #1a1a1a' : 'none',
                  }}
                >
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <Link
                      href={`/agenda/${event.id}`}
                      style={{
                        fontSize: '0.875rem',
                        color: '#e8e8e8',
                        textDecoration: 'none',
                        fontWeight: 500,
                      }}
                    >
                      {event.title}
                    </Link>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontSize: '0.82rem', color: '#666' }}>{event.venue.name}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontSize: '0.82rem', color: '#666' }}>
                      {event.startsAt.toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: event.status === 'published'
                          ? 'rgba(76,175,80,0.1)'
                          : event.status === 'pending'
                          ? 'rgba(201,168,76,0.1)'
                          : 'rgba(255,255,255,0.05)',
                        color: event.status === 'published'
                          ? '#4caf50'
                          : event.status === 'pending'
                          ? '#c9a84c'
                          : '#666',
                      }}
                    >
                      {event.status === 'published' ? 'Publicado' : event.status === 'pending' ? 'Pendente' : event.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontSize: '0.82rem', color: '#666' }}>{event.confidenceScore}%</span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.375rem' }}>
                      <Link
                        href={`/agenda/${event.id}`}
                        style={{
                          padding: '0.3rem 0.6rem',
                          borderRadius: '5px',
                          border: '1px solid #2a2a2a',
                          color: '#888',
                          fontSize: '0.75rem',
                          textDecoration: 'none',
                        }}
                      >
                        Ver
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentEvents.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#555', fontSize: '0.875rem' }}>
              Nenhum evento cadastrado.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

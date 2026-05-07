import db from '@/lib/db'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'

export const dynamic = 'force-dynamic'

const typeFilters = [
  { key: undefined, label: 'Tudo' },
  { key: 'news', label: 'Notícias' },
  { key: 'review', label: 'Reviews' },
  { key: 'interview', label: 'Entrevistas' },
  { key: 'announcement', label: 'Eventos' },
]

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const sp = await searchParams
  const posts = await db.post.findMany({
    where: sp.type ? { type: sp.type } : undefined,
    orderBy: { publishedAt: 'desc' },
    take: 50,
  })

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Newspaper size={18} color="#c9a84c" />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#e8e8e8',
            }}
          >
            Feed Cultural
          </h1>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#555' }}>
          Notícias, reviews e entrevistas da cena jazz de BH
        </p>
      </div>

      {/* Type filters */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {typeFilters.map(({ key, label }) => {
          const active = sp.type === key || (!sp.type && !key)
          return (
            <Link
              key={label}
              href={key ? `/feed?type=${key}` : '/feed'}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: active ? 600 : 400,
                background: active ? 'rgba(201,168,76,0.15)' : '#111',
                color: active ? '#c9a84c' : '#666',
                border: `1px solid ${active ? 'rgba(201,168,76,0.3)' : '#2a2a2a'}`,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {posts.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            border: '1px dashed #2a2a2a',
            borderRadius: '12px',
            color: '#555',
          }}
        >
          <Newspaper size={32} color="#333" style={{ margin: '0 auto 1rem' }} />
          <p>Nenhuma publicação encontrada.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              type={post.type}
              sourceUrl={post.sourceUrl}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  )
}

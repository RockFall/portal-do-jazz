import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import db from '@/lib/db'

const typeLabels: Record<string, { label: string; color: string }> = {
  news: { label: 'Notícia', color: '#4c8ec9' },
  review: { label: 'Review', color: '#c97a4c' },
  interview: { label: 'Entrevista', color: '#7a4cc9' },
  announcement: { label: 'Evento', color: '#c9a84c' },
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id } })
  if (!post) notFound()

  const typeInfo = typeLabels[post.type] ?? { label: post.type, color: '#888' }
  const date = post.publishedAt

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Link
        href="/feed"
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
        Voltar para o feed
      </Link>

      <article>
        <div style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.25rem 0.6rem',
              borderRadius: '4px',
              background: `${typeInfo.color}22`,
              color: typeInfo.color,
              marginBottom: '1rem',
            }}
          >
            {typeInfo.label}
          </span>

          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#e8e8e8',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            {post.title}
          </h1>

          <p style={{ fontSize: '0.82rem', color: '#555' }}>
            {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, #c9a84c, transparent)',
            marginBottom: '2rem',
          }}
        />

        <div
          style={{
            fontSize: '1rem',
            color: '#aaa',
            lineHeight: 1.9,
            whiteSpace: 'pre-wrap',
          }}
        >
          {post.body}
        </div>

        {post.sourceUrl && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #1e1e1e' }}>
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #2a2a2a',
                color: '#888',
                fontSize: '0.82rem',
                textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} />
              Ver fonte original
            </a>
          </div>
        )}
      </article>
    </div>
  )
}

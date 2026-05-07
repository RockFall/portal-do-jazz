"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ExternalLink } from "lucide-react";

interface PostCardProps {
  id: string;
  title: string;
  body: string;
  type: string;
  sourceUrl?: string | null;
  publishedAt: Date | string;
}

const typeLabels: Record<string, { label: string; color: string }> = {
  news: { label: "Notícia", color: "#4c8ec9" },
  review: { label: "Review", color: "#c97a4c" },
  interview: { label: "Entrevista", color: "#7a4cc9" },
  announcement: { label: "Evento", color: "#c9a84c" },
};

export default function PostCard({ id, title, body, type, sourceUrl, publishedAt }: PostCardProps) {
  const typeInfo = typeLabels[type] ?? { label: type, color: "#888" };
  const date = typeof publishedAt === "string" ? new Date(publishedAt) : publishedAt;
  const excerpt = body.length > 160 ? body.slice(0, 160) + "…" : body;

  return (
    <Link href={`/feed/${id}`} className="block group">
      <article
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "1.25rem",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        className="card-hover"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "0.2rem 0.55rem",
              borderRadius: "4px",
              background: `${typeInfo.color}22`,
              color: typeInfo.color,
            }}
          >
            {typeInfo.label}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#555" }}>
            {format(date, "d MMM yyyy", { locale: ptBR })}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#e8e8e8",
            marginBottom: "0.6rem",
            lineHeight: 1.3,
            transition: "color 0.15s ease",
            flexGrow: 1,
          }}
          className="group-hover:text-[#c9a84c]"
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "0.82rem",
            color: "#666",
            lineHeight: 1.6,
            marginBottom: "0.75rem",
          }}
        >
          {excerpt}
        </p>

        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
              color: "#555",
              transition: "color 0.15s",
              marginTop: "auto",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <ExternalLink size={11} />
            Ver fonte
          </a>
        )}
      </article>
    </Link>
  );
}

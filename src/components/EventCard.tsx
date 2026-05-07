import Link from "next/link";
import { MapPin, Clock, Ticket } from "lucide-react";
import { formatDate, formatTime, formatPrice, getDayLabel } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  startsAt: Date | string;
  venueName: string;
  neighborhood: string;
  priceMin?: number | null;
  priceMax?: number | null;
  imageUrl?: string | null;
  description?: string | null;
}

const dayColors: Record<string, { strip: string; badge: string; badgeText: string }> = {
  hoje: {
    strip: "linear-gradient(135deg, #c9a84c, #a07830)",
    badge: "rgba(201,168,76,0.15)",
    badgeText: "#c9a84c",
  },
  "amanhã": {
    strip: "linear-gradient(135deg, #a0a0a0, #606060)",
    badge: "rgba(160,160,160,0.12)",
    badgeText: "#b0b0b0",
  },
  semana: {
    strip: "linear-gradient(135deg, #4c8ec9, #2a5f8f)",
    badge: "rgba(76,142,201,0.12)",
    badgeText: "#7ab0d8",
  },
  futuro: {
    strip: "linear-gradient(135deg, #3a3a3a, #2a2a2a)",
    badge: "rgba(255,255,255,0.05)",
    badgeText: "#888",
  },
};

export default function EventCard({
  id,
  title,
  startsAt,
  venueName,
  neighborhood,
  priceMin,
  priceMax,
  description,
}: EventCardProps) {
  const label = getDayLabel(startsAt);
  const colors = dayColors[label] ?? dayColors.futuro;
  const isFree = priceMin === 0 || (!priceMin && !priceMax);

  return (
    <Link
      href={`/agenda/${id}`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <article
        className="card-hover"
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Color strip */}
        <div style={{ height: "3px", background: colors.strip }} />

        <div style={{ padding: "1rem" }}>
          {/* Date badge + time row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.625rem",
            }}
          >
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                background: colors.badge,
                color: colors.badgeText,
              }}
            >
              {formatDate(startsAt)}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.78rem",
                color: "#666",
              }}
            >
              <Clock size={11} />
              {formatTime(startsAt)}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "0.5rem",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          {/* Description — only on larger screens via line clamp */}
          {description && (
            <p
              style={{
                fontSize: "0.78rem",
                color: "#666",
                marginBottom: "0.625rem",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </p>
          )}

          {/* Venue */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              marginBottom: "0.4rem",
              flexWrap: "wrap",
            }}
          >
            <MapPin size={12} color="#c9a84c" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.8rem", color: "#aaa" }}>{venueName}</span>
            <span style={{ fontSize: "0.72rem", color: "#555" }}>· {neighborhood}</span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Ticket size={12} color={isFree ? "#4caf50" : "#555"} style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: "0.78rem",
                color: isFree ? "#4caf50" : "#aaa",
                fontWeight: isFree ? 600 : 400,
              }}
            >
              {formatPrice(priceMin, priceMax)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

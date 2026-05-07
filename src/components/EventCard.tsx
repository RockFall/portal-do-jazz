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
  amanhã: {
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
  const colors = dayColors[label];

  return (
    <Link href={`/agenda/${id}`} className="block group">
      <article
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        className="card-hover"
      >
        {/* Color strip */}
        <div style={{ height: "3px", background: colors.strip }} />

        <div style={{ padding: "1.25rem" }}>
          {/* Date badge + time */}
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
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                padding: "0.25rem 0.6rem",
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
                gap: "0.3rem",
                fontSize: "0.8rem",
                color: "#888",
              }}
            >
              <Clock size={12} />
              {formatTime(startsAt)}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "0.5rem",
              lineHeight: 1.3,
              transition: "color 0.15s ease",
            }}
            className="group-hover:text-[#c9a84c]"
          >
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "#666",
                marginBottom: "0.75rem",
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
              gap: "0.4rem",
              marginBottom: "0.5rem",
            }}
          >
            <MapPin size={13} color="#c9a84c" />
            <span style={{ fontSize: "0.82rem", color: "#aaa" }}>
              {venueName}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#555" }}>
              · {neighborhood}
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Ticket size={13} color="#555" />
            <span
              style={{
                fontSize: "0.8rem",
                color: priceMin === 0 || (!priceMin && !priceMax) ? "#4caf50" : "#aaa",
                fontWeight: priceMin === 0 || (!priceMin && !priceMax) ? 600 : 400,
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

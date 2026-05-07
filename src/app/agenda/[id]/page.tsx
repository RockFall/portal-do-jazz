import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Ticket, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import db from "@/lib/db";
import EventCard from "@/components/EventCard";
import { formatDateFull, formatTime, formatPrice } from "@/lib/utils";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await db.event.findUnique({
    where: { id },
    include: {
      venue: true,
      artists: { include: { artist: true } },
    },
  });

  if (!event) notFound();

  const relatedEvents = await db.event.findMany({
    where: {
      venueId: event.venueId,
      status: "published",
      startsAt: { gte: new Date() },
      id: { not: id },
    },
    include: { venue: true },
    orderBy: { startsAt: "asc" },
    take: 4,
  });

  const isPast = event.startsAt < new Date();

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <Link
        href="/agenda"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.82rem",
          color: "#555",
          textDecoration: "none",
          marginBottom: "1.5rem",
        }}
      >
        <ArrowLeft size={14} />
        Voltar para agenda
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
        {/* Main content */}
        <div>
          {/* Event hero */}
          <div
            style={{
              background: "linear-gradient(135deg, #141414, #1a1610)",
              border: "1px solid #2a2a2a",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                height: "6px",
                background: isPast
                  ? "#333"
                  : "linear-gradient(90deg, #c9a84c, #e0c06a, #a07830)",
              }}
            />
            <div style={{ padding: "2rem" }}>
              {isPast && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "0.25rem 0.6rem",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.05)",
                    color: "#555",
                    marginBottom: "1rem",
                  }}
                >
                  Show encerrado
                </span>
              )}

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 800,
                  color: "#e8e8e8",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                }}
              >
                {event.title}
              </h1>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                {[
                  {
                    icon: <Calendar size={16} color="#c9a84c" />,
                    label: "Data",
                    value: formatDateFull(event.startsAt),
                  },
                  {
                    icon: <Clock size={16} color="#c9a84c" />,
                    label: "Horário",
                    value: formatTime(event.startsAt),
                  },
                  {
                    icon: <MapPin size={16} color="#c9a84c" />,
                    label: "Local",
                    value: `${event.venue.name} — ${event.venue.neighborhood}`,
                  },
                  {
                    icon: <Ticket size={16} color="#c9a84c" />,
                    label: "Entrada",
                    value: formatPrice(event.priceMin, event.priceMax),
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid #2a2a2a",
                      borderRadius: "8px",
                      padding: "0.875rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {icon}
                      <span
                        style={{
                          fontSize: "0.65rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#555",
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#e8e8e8", fontWeight: 500 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {event.description && (
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#888",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                  }}
                >
                  {event.description}
                </p>
              )}

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {event.ticketUrl && !isPast && (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #c9a84c, #a07830)",
                      color: "#0a0a0a",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                    }}
                  >
                    <Ticket size={16} />
                    Comprar ingresso
                    <ExternalLink size={13} />
                  </a>
                )}
                <Link
                  href={`/locais/${event.venueId}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "8px",
                    border: "1px solid #2a2a2a",
                    color: "#888",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                  }}
                >
                  <MapPin size={15} />
                  Ver local
                </Link>
                {event.sourceUrl && (
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      border: "1px solid #2a2a2a",
                      color: "#555",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={13} />
                    Fonte
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Artists */}
          {event.artists.length > 0 && (
            <div
              style={{
                background: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: "12px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#e8e8e8",
                  marginBottom: "1rem",
                }}
              >
                Artistas
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {event.artists.map(({ artist }) => (
                  <span
                    key={artist.id}
                    style={{
                      padding: "0.4rem 0.9rem",
                      borderRadius: "20px",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#c9a84c",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {artist.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#e8e8e8",
                marginBottom: "1rem",
              }}
            >
              Outros shows em {event.venue.name}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "0.875rem",
              }}
            >
              {relatedEvents.map((e) => (
                <EventCard
                  key={e.id}
                  id={e.id}
                  title={e.title}
                  startsAt={e.startsAt}
                  venueName={e.venue.name}
                  neighborhood={e.venue.neighborhood}
                  priceMin={e.priceMin}
                  priceMax={e.priceMax}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

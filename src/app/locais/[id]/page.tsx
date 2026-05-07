import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, Globe, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import db from "@/lib/db";
import EventCard from "@/components/EventCard";

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const venue = await db.venue.findUnique({
    where: { id },
    include: {
      events: {
        where: { status: "published", startsAt: { gte: new Date() } },
        orderBy: { startsAt: "asc" },
        take: 12,
      },
    },
  });

  if (!venue) notFound();

  const pastEvents = await db.event.findMany({
    where: {
      venueId: id,
      status: "published",
      startsAt: { lt: new Date() },
    },
    include: { venue: true },
    orderBy: { startsAt: "desc" },
    take: 4,
  });

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <Link
        href="/locais"
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
        Todos os locais
      </Link>

      {/* Venue header */}
      <div
        style={{
          background: "linear-gradient(135deg, #141414, #1a1610)",
          border: "1px solid #2a2a2a",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            height: "120px",
            background:
              "repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #141414 10px, #141414 20px)",
            borderBottom: "1px solid #2a2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "4rem",
              color: "rgba(201,168,76,0.1)",
              fontWeight: 800,
              userSelect: "none",
            }}
          >
            ♬
          </span>
        </div>

        <div style={{ padding: "1.75rem" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2rem",
              fontWeight: 800,
              color: "#e8e8e8",
              marginBottom: "0.5rem",
            }}
          >
            {venue.name}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "1.5rem",
            }}
          >
            <MapPin size={14} color="#c9a84c" />
            <span style={{ fontSize: "0.875rem", color: "#888" }}>{venue.address}</span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              · {venue.neighborhood}
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {venue.phone && (
              <a
                href={`tel:${venue.phone}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                <Phone size={13} />
                {venue.phone}
              </a>
            )}
            {venue.websiteUrl && (
              <a
                href={venue.websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                <Globe size={13} />
                Site
              </a>
            )}
            {venue.instagramUrl && (
              <a
                href={venue.instagramUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={13} />
                Instagram
              </a>
            )}
            {venue.latitude && venue.longitude && (
              <a
                href={`https://maps.google.com/?q=${venue.latitude},${venue.longitude}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  background: "rgba(201,168,76,0.1)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "#c9a84c",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                <MapPin size={13} />
                Como chegar
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming events */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <Calendar size={16} color="#c9a84c" />
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#e8e8e8",
            }}
          >
            Próximos Shows
          </h2>
          {venue.events.length > 0 && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "0.15rem 0.5rem",
                borderRadius: "20px",
                background: "#c9a84c",
                color: "#0a0a0a",
              }}
            >
              {venue.events.length}
            </span>
          )}
        </div>

        {venue.events.length === 0 ? (
          <div
            style={{
              padding: "2.5rem",
              border: "1px dashed #2a2a2a",
              borderRadius: "12px",
              textAlign: "center",
              color: "#555",
              fontSize: "0.875rem",
            }}
          >
            Nenhum show agendado no momento.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {venue.events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                startsAt={event.startsAt}
                venueName={venue.name}
                neighborhood={venue.neighborhood}
                priceMin={event.priceMin}
                priceMax={event.priceMax}
                description={event.description}
              />
            ))}
          </div>
        )}
      </div>

      {/* Past events */}
      {pastEvents.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#444",
              marginBottom: "1rem",
            }}
          >
            Shows anteriores
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "0.875rem",
              opacity: 0.6,
            }}
          >
            {pastEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                startsAt={event.startsAt}
                venueName={event.venue.name}
                neighborhood={event.venue.neighborhood}
                priceMin={event.priceMin}
                priceMax={event.priceMax}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

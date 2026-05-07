import { MapPin } from "lucide-react";
import db from "@/lib/db";
import VenueCard from "@/components/VenueCard";

export default async function LocaisPage() {
  const venues = await db.venue.findMany({
    where: { active: true },
    include: {
      _count: {
        select: {
          events: { where: { status: "published", startsAt: { gte: new Date() } } },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const neighborhoods = [...new Set(venues.map((v) => v.neighborhood))].sort();

  const venuesByNeighborhood = neighborhoods.map((n) => ({
    neighborhood: n,
    venues: venues.filter((v) => v.neighborhood === n),
  }));

  return (
    <div className="container-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <MapPin size={18} color="#c9a84c" />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.35rem, 4vw, 1.75rem)",
              fontWeight: 700,
              color: "#e8e8e8",
            }}
          >
            Casas de Jazz em BH
          </h1>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#555" }}>
          {venues.length} local{venues.length !== 1 ? "is" : ""} com programação de jazz
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {venuesByNeighborhood.map(({ neighborhood, venues: nVenues }) => (
          <div key={neighborhood}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ width: "24px", height: "1px", background: "#c9a84c" }} />
              <h2
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#c9a84c",
                }}
              >
                {neighborhood}
              </h2>
              <div style={{ flex: 1, height: "1px", background: "#1e1e1e" }} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                gap: "1rem",
              }}
            >
              {nVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  id={venue.id}
                  name={venue.name}
                  address={venue.address}
                  neighborhood={venue.neighborhood}
                  upcomingCount={venue._count.events}
                  instagramUrl={venue.instagramUrl}
                  websiteUrl={venue.websiteUrl}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

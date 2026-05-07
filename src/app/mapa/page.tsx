import { MapPin } from "lucide-react";
import db from "@/lib/db";
import MapWrapper from "@/components/MapWrapper";

export default async function MapaPage() {
  const venues = await db.venue.findMany({
    where: { active: true },
    include: {
      _count: {
        select: {
          events: { where: { status: "published", startsAt: { gte: new Date() } } },
        },
      },
    },
  });

  const markers = venues
    .filter((v) => v.latitude !== null && v.longitude !== null)
    .map((v) => ({
      id: v.id,
      name: v.name,
      address: v.address,
      neighborhood: v.neighborhood,
      latitude: v.latitude as number,
      longitude: v.longitude as number,
      upcomingCount: v._count.events,
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
            Mapa do Jazz em BH
          </h1>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#555" }}>
          {markers.length} local{markers.length !== 1 ? "is" : ""} com programação de jazz
        </p>
      </div>

      <MapWrapper venues={markers} />

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#c9a84c" }} />
        <span style={{ fontSize: "0.75rem", color: "#555" }}>
          Clique nos marcadores para ver detalhes e próximos shows.
        </span>
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#e8e8e8",
            marginBottom: "1rem",
          }}
        >
          Todos os locais
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
            gap: "0.75rem",
          }}
        >
          {venues.map((venue) => (
            <a
              key={venue.id}
              href={`/locais/${venue.id}`}
              style={{
                display: "block",
                background: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: "10px",
                padding: "0.875rem",
                textDecoration: "none",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <strong
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "0.875rem",
                    color: "#e8e8e8",
                    display: "block",
                    marginBottom: "0.2rem",
                  }}
                >
                  {venue.name}
                </strong>
                {venue._count.events > 0 && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      background: "#c9a84c",
                      color: "#0a0a0a",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "4px",
                      flexShrink: 0,
                      marginLeft: "0.5rem",
                    }}
                  >
                    {venue._count.events}
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.72rem", color: "#555" }}>{venue.neighborhood}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

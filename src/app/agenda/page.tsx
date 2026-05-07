import Link from "next/link";
import { Calendar, Filter } from "lucide-react";
import db from "@/lib/db";
import EventCard from "@/components/EventCard";
import NeighborhoodSelect from "@/components/NeighborhoodSelect";
import { addDays, startOfDay } from "date-fns";

async function getEvents(params: {
  neighborhood?: string;
  priceFilter?: string;
  dateFilter?: string;
  q?: string;
}) {
  const now = new Date();
  const where: Record<string, unknown> = {
    status: "published",
    startsAt: { gte: now },
  };

  if (params.neighborhood) {
    where.venue = { neighborhood: params.neighborhood };
  }

  if (params.priceFilter === "gratuito") {
    where.priceMin = 0;
  }

  if (params.dateFilter === "hoje") {
    where.startsAt = { gte: startOfDay(now), lte: startOfDay(addDays(now, 1)) };
  } else if (params.dateFilter === "amanha") {
    const tmr = addDays(now, 1);
    where.startsAt = { gte: startOfDay(tmr), lte: startOfDay(addDays(tmr, 1)) };
  } else if (params.dateFilter === "semana") {
    where.startsAt = { gte: now, lte: addDays(now, 7) };
  }

  return db.event.findMany({
    where,
    include: { venue: true },
    orderBy: { startsAt: "asc" },
    take: 50,
  });
}

async function getNeighborhoods() {
  const venues = await db.venue.findMany({
    where: { active: true },
    select: { neighborhood: true },
    distinct: ["neighborhood"],
    orderBy: { neighborhood: "asc" },
  });
  return venues.map((v) => v.neighborhood);
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{
    neighborhood?: string;
    preco?: string;
    data?: string;
    q?: string;
  }>;
}) {
  const sp = await searchParams;
  const [events, neighborhoods] = await Promise.all([
    getEvents({ neighborhood: sp.neighborhood, priceFilter: sp.preco, dateFilter: sp.data, q: sp.q }),
    getNeighborhoods(),
  ]);

  const dateFilters = [
    { key: undefined, label: "Todos" },
    { key: "hoje", label: "Hoje" },
    { key: "amanha", label: "Amanhã" },
    { key: "semana", label: "Esta semana" },
  ];

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { neighborhood: sp.neighborhood, preco: sp.preco, data: sp.data, ...overrides };
    Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
    const q = p.toString();
    return `/agenda${q ? `?${q}` : ""}`;
  };

  return (
    <div className="container-page">
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <Calendar size={18} color="#c9a84c" />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.35rem, 4vw, 1.75rem)",
              fontWeight: 700,
              color: "#e8e8e8",
            }}
          >
            Agenda de Jazz
          </h1>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#555" }}>
          {events.length} show{events.length !== 1 ? "s" : ""} encontrado{events.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters — scrollable on mobile */}
      <div
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#555", fontSize: "0.78rem" }}>
          <Filter size={13} />
          <span>Filtros</span>
        </div>

        {/* Date filter */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
            Data
          </label>
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
            {dateFilters.map(({ key, label }) => {
              const active = sp.data === key;
              return (
                <Link
                  key={label}
                  href={buildHref({ data: key })}
                  style={{
                    padding: "0.4rem 0.7rem",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    background: active ? "rgba(201,168,76,0.15)" : "#1a1a1a",
                    color: active ? "#c9a84c" : "#666",
                    border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "#2a2a2a"}`,
                    textDecoration: "none",
                    minHeight: "36px",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Neighborhood filter */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
            Bairro
          </label>
          <NeighborhoodSelect
            neighborhoods={neighborhoods}
            current={sp.neighborhood}
            currentData={sp.data}
            currentPreco={sp.preco}
          />
        </div>

        {/* Price filter */}
        <div>
          <label style={{ display: "block", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
            Preço
          </label>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            {[
              { key: undefined, label: "Todos" },
              { key: "gratuito", label: "Gratuito" },
            ].map(({ key, label }) => {
              const active = sp.preco === key;
              return (
                <Link
                  key={label}
                  href={buildHref({ preco: key })}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "6px",
                    fontSize: "0.78rem",
                    background: active ? "rgba(201,168,76,0.15)" : "#1a1a1a",
                    color: active ? "#c9a84c" : "#666",
                    border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "#2a2a2a"}`,
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {(sp.neighborhood || sp.preco || sp.data) && (
          <Link
            href="/agenda"
            style={{ fontSize: "0.78rem", color: "#555", textDecoration: "underline", marginTop: "0.5rem" }}
          >
            Limpar filtros
          </Link>
        )}
      </div>

      {/* Grid */}
      {events.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            border: "1px dashed #2a2a2a",
            borderRadius: "12px",
            color: "#555",
          }}
        >
          <Calendar size={32} color="#333" style={{ margin: "0 auto 1rem" }} />
          <p>Nenhum show encontrado com esses filtros.</p>
          <Link href="/agenda" style={{ color: "#c9a84c", fontSize: "0.85rem", marginTop: "0.5rem", display: "block" }}>
            Ver todos
          </Link>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              startsAt={event.startsAt}
              venueName={event.venue.name}
              neighborhood={event.venue.neighborhood}
              priceMin={event.priceMin}
              priceMax={event.priceMax}
              description={event.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}

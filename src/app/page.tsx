import Link from "next/link";
import { MapPin, Music, Calendar, Newspaper, ArrowRight } from "lucide-react";
import db from "@/lib/db";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import { startOfDay, endOfDay, addDays } from "date-fns";

async function getUpcomingEvents(filter?: string) {
  const now = new Date();
  let startsAfter = now;
  let startsBefore: Date | undefined;

  if (filter === "hoje") {
    startsAfter = startOfDay(now);
    startsBefore = endOfDay(now);
  } else if (filter === "amanha") {
    const tomorrow = addDays(now, 1);
    startsAfter = startOfDay(tomorrow);
    startsBefore = endOfDay(tomorrow);
  } else if (filter === "fimdesemana") {
    const dayOfWeek = now.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    startsAfter = startOfDay(addDays(now, daysUntilFriday));
    startsBefore = endOfDay(addDays(now, daysUntilFriday + 2));
  } else if (filter === "gratuito") {
    return db.event.findMany({
      where: { status: "published", startsAt: { gte: now }, priceMin: 0 },
      include: { venue: true },
      orderBy: { startsAt: "asc" },
      take: 8,
    });
  }

  return db.event.findMany({
    where: {
      status: "published",
      startsAt: { gte: startsAfter, ...(startsBefore ? { lte: startsBefore } : {}) },
    },
    include: { venue: true },
    orderBy: { startsAt: "asc" },
    take: 8,
  });
}

async function getRecentPosts() {
  return db.post.findMany({ orderBy: { publishedAt: "desc" }, take: 3 });
}

async function getStats() {
  const [eventCount, venueCount] = await Promise.all([
    db.event.count({ where: { status: "published", startsAt: { gte: new Date() } } }),
    db.venue.count({ where: { active: true } }),
  ]);
  return { eventCount, venueCount };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const filter = params.filter;
  const [events, posts, stats] = await Promise.all([
    getUpcomingEvents(filter),
    getRecentPosts(),
    getStats(),
  ]);

  const filters = [
    { key: undefined, label: "Todos" },
    { key: "hoje", label: "Hoje" },
    { key: "amanha", label: "Amanhã" },
    { key: "fimdesemana", label: "Fim de Semana" },
    { key: "gratuito", label: "Gratuito" },
  ];

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(to bottom, #0f0f0f 0%, #0a0a0a 70%)",
          borderBottom: "1px solid #1a1a1a",
          /* Mobile: less vertical padding; desktop: generous */
          padding: "clamp(2rem, 6vw, 5rem) 1rem clamp(1.5rem, 4vw, 4rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles — hidden on small screens to save space */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.06)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ maxWidth: "640px" }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.875rem",
              }}
            >
              <div style={{ width: "24px", height: "1px", background: "#c9a84c" }} />
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontWeight: 600,
                }}
              >
                Belo Horizonte
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 7vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#e8e8e8",
                marginBottom: "0.875rem",
              }}
            >
              Jazz acontece
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #e0c06a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                em BH.
              </span>
            </h1>

            {/* Subtitle — shorter on mobile */}
            <p
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
                color: "#888",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
                maxWidth: "440px",
              }}
            >
              Shows, artistas e locais da cena jazzística de Belo Horizonte.
            </p>

            {/* Stats chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "1.5rem",
              }}
            >
              {[
                { icon: <Calendar size={13} />, label: `${stats.eventCount} shows` },
                { icon: <MapPin size={13} />, label: `${stats.venueCount} locais` },
                { icon: <Music size={13} />, label: "Sempre atualizado" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.75rem",
                    color: "#666",
                    padding: "0.3rem 0.65rem",
                    borderRadius: "20px",
                    border: "1px solid #2a2a2a",
                    background: "#111",
                    minHeight: "unset",
                  }}
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs — full width on mobile, auto on desktop */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.625rem",
                maxWidth: "380px",
              }}
            >
              <Link
                href="/agenda"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #c9a84c, #a07830)",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  minHeight: "48px",
                }}
              >
                Ver agenda
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/mapa"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  background: "#111",
                  minHeight: "48px",
                }}
              >
                <MapPin size={14} />
                Mapa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shows ───────────────────────────────────────── */}
      <section className="container-page">
        {/* Header + filters */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#e8e8e8",
              }}
            >
              Próximos Shows
            </h2>
          </div>

          {/* Horizontal scrollable filter pills */}
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "2px",
              maxWidth: "100%",
            }}
          >
            {filters.map(({ key, label }) => {
              const active = filter === key;
              return (
                <Link
                  key={label}
                  href={key ? `/?filter=${key}` : "/"}
                  style={{
                    padding: "0.4rem 0.85rem",
                    borderRadius: "20px",
                    fontSize: "0.78rem",
                    fontWeight: active ? 600 : 400,
                    background: active ? "rgba(201,168,76,0.15)" : "#111",
                    color: active ? "#c9a84c" : "#666",
                    border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "#2a2a2a"}`,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    minHeight: "36px",
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {events.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              color: "#555",
              border: "1px dashed #2a2a2a",
              borderRadius: "12px",
            }}
          >
            <Music size={28} color="#333" style={{ margin: "0 auto 0.75rem" }} />
            <p style={{ fontSize: "0.875rem" }}>Nenhum show para este filtro.</p>
            <Link
              href="/"
              style={{ color: "#c9a84c", fontSize: "0.82rem", marginTop: "0.5rem", display: "block" }}
            >
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

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/agenda"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.5rem",
              borderRadius: "8px",
              border: "1px solid #2a2a2a",
              color: "#888",
              fontSize: "0.85rem",
              textDecoration: "none",
              minHeight: "44px",
            }}
          >
            Ver agenda completa
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Feed ────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section style={{ borderTop: "1px solid #1a1a1a", background: "#0d0d0d" }}>
          <div className="container-page">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#e8e8e8",
                }}
              >
                Feed Cultural
              </h2>
              <Link
                href="/feed"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.82rem",
                  color: "#c9a84c",
                  textDecoration: "none",
                  minHeight: "44px",
                }}
              >
                Ver tudo <ArrowRight size={13} />
              </Link>
            </div>

            <div className="content-grid">
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
          </div>
        </section>
      )}

      {/* ── Newsletter ───────────────────────────────────── */}
      <section style={{ borderTop: "1px solid #1a1a1a", padding: "2.5rem 1rem 3rem" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
          <Newspaper size={28} color="#c9a84c" style={{ margin: "0 auto 0.875rem" }} />
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.35rem, 4vw, 1.75rem)",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "0.625rem",
            }}
          >
            Fique por dentro
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#666",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            Receba a agenda de jazz em BH toda semana no WhatsApp.
          </p>
          {/* Stack on mobile, row on tablet+ */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
            }}
          >
            <input
              type="tel"
              placeholder="(31) 9 0000-0000"
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
                background: "#111",
                color: "#e8e8e8",
                fontSize: "1rem",
                outline: "none",
                minHeight: "52px",
              }}
            />
            <button
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #c9a84c, #a07830)",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                minHeight: "52px",
                justifyContent: "center",
              }}
            >
              Receber agenda no WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

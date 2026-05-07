import Link from "next/link";
import { MapPin, Music, Calendar, Newspaper, ArrowRight } from "lucide-react";
import db from "@/lib/db";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import { isToday, isTomorrow, startOfDay, endOfDay, addDays } from "date-fns";

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
    const days = [5, 6, 0];
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
  return db.post.findMany({
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
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
      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, #0f0f0f 0%, #0a0a0a 60%, #0a0a0a 100%)",
          borderBottom: "1px solid #1a1a1a",
          padding: "5rem 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "-20px",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.04)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ maxWidth: "640px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "1px",
                  background: "#c9a84c",
                }}
              />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontWeight: 600,
                }}
              >
                Belo Horizonte
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#e8e8e8",
                marginBottom: "1.25rem",
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

            <p
              style={{
                fontSize: "1.1rem",
                color: "#888",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              Descubra shows, artistas e lugares da cena jazzística de Belo
              Horizonte. Agenda atualizada, mapa de locais e feed cultural.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2.5rem",
              }}
            >
              {[
                { icon: <Calendar size={14} />, label: `${stats.eventCount} shows` },
                { icon: <MapPin size={14} />, label: `${stats.venueCount} locais` },
                { icon: <Music size={14} />, label: "Sempre atualizado" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.8rem",
                    color: "#666",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "20px",
                    border: "1px solid #2a2a2a",
                    background: "#111",
                  }}
                >
                  {icon}
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/agenda"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #c9a84c, #a07830)",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "opacity 0.15s ease",
                }}
              >
                Ver agenda completa
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/mapa"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #2a2a2a",
                  color: "#888",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  background: "#111",
                }}
              >
                <MapPin size={15} />
                Ver no mapa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events section */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.75rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#e8e8e8",
              }}
            >
              Próximos Shows
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#555", marginTop: "0.25rem" }}>
              Jazz ao vivo em Belo Horizonte
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {filters.map(({ key, label }) => {
              const active = filter === key;
              return (
                <Link
                  key={label}
                  href={key ? `/?filter=${key}` : "/"}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: active ? 600 : 400,
                    background: active ? "rgba(201,168,76,0.15)" : "#111",
                    color: active ? "#c9a84c" : "#666",
                    border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "#2a2a2a"}`,
                    textDecoration: "none",
                    transition: "all 0.15s",
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
              padding: "4rem 2rem",
              color: "#555",
              border: "1px dashed #2a2a2a",
              borderRadius: "12px",
            }}
          >
            <Music size={32} color="#333" style={{ margin: "0 auto 1rem" }} />
            <p style={{ fontSize: "0.9rem" }}>Nenhum show encontrado para este filtro.</p>
            <Link href="/" style={{ color: "#c9a84c", fontSize: "0.85rem", marginTop: "0.5rem", display: "block" }}>
              Ver todos os shows
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
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

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
            }}
          >
            Ver agenda completa
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Feed section */}
      {posts.length > 0 && (
        <section
          style={{
            borderTop: "1px solid #1a1a1a",
            background: "#0d0d0d",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "3rem 1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#e8e8e8",
                  }}
                >
                  Feed Cultural
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#555", marginTop: "0.25rem" }}>
                  Notícias, reviews e entrevistas
                </p>
              </div>
              <Link
                href="/feed"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.82rem",
                  color: "#c9a84c",
                  textDecoration: "none",
                }}
              >
                Ver tudo <ArrowRight size={13} />
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
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

      {/* CTA Newsletter */}
      <section
        style={{
          borderTop: "1px solid #1a1a1a",
          padding: "4rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Newspaper size={32} color="#c9a84c" style={{ margin: "0 auto 1rem" }} />
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "0.75rem",
            }}
          >
            Fique por dentro
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              color: "#666",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
            }}
          >
            Receba toda semana a agenda de jazz em BH direto no seu WhatsApp.
            Sem spam, só o essencial da cena.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <input
              type="text"
              placeholder="Seu número de WhatsApp"
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #2a2a2a",
                background: "#111",
                color: "#e8e8e8",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #c9a84c, #a07830)",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Inscrever
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

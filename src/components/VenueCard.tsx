"use client";

import Link from "next/link";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface VenueCardProps {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  upcomingCount?: number;
  websiteUrl?: string | null;
  instagramUrl?: string | null;
}

export default function VenueCard({
  id,
  name,
  address,
  neighborhood,
  upcomingCount = 0,
  instagramUrl,
}: VenueCardProps) {
  return (
    <Link href={`/locais/${id}`} className="block group">
      <article
        style={{
          background: "#141414",
          border: "1px solid #2a2a2a",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          height: "100%",
        }}
        className="card-hover"
      >
        {/* Placeholder visual */}
        <div
          style={{
            height: "80px",
            background:
              "linear-gradient(135deg, #1a1a1a 0%, #141414 50%, #1e1a10 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #1e1e1e",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "2rem",
              color: "rgba(201,168,76,0.15)",
              fontWeight: 700,
              userSelect: "none",
            }}
          >
            ♩
          </span>
          {upcomingCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                background: "#c9a84c",
                color: "#0a0a0a",
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.2rem 0.5rem",
                borderRadius: "20px",
                letterSpacing: "0.04em",
              }}
            >
              {upcomingCount} show{upcomingCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#e8e8e8",
              marginBottom: "0.4rem",
              transition: "color 0.15s ease",
            }}
            className="group-hover:text-[#c9a84c]"
          >
            {name}
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.35rem",
              marginBottom: "0.35rem",
            }}
          >
            <MapPin size={12} color="#c9a84c" style={{ marginTop: "2px", flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: "0.78rem", color: "#888" }}>
                {address}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "#555",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginTop: "1px",
                }}
              >
                {neighborhood}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
            {upcomingCount > 0 && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.75rem",
                  color: "#666",
                }}
              >
                <Calendar size={11} />
                {upcomingCount} próximo{upcomingCount !== 1 ? "s" : ""}
              </span>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
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
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                <ExternalLink size={11} />
                Instagram
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

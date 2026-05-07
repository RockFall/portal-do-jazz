"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

interface VenueMarker {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  upcomingCount: number;
}

interface MapClientProps {
  venues: VenueMarker[];
}

export default function MapClient({ venues }: MapClientProps) {
  useEffect(() => {
    // Fix Leaflet default icon paths
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  const goldIcon = new L.DivIcon({
    className: "",
    html: `<div style="
      width: 28px; height: 28px;
      background: linear-gradient(135deg, #c9a84c, #a07830);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid #0a0a0a;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });

  const center: [number, number] = [-19.917, -43.934];

  return (
    <div style={{ height: "600px", borderRadius: "12px", overflow: "hidden", border: "1px solid #2a2a2a" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%", background: "#141414" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            position={[venue.latitude, venue.longitude]}
            icon={goldIcon}
          >
            <Popup>
              <div
                style={{
                  background: "#141414",
                  color: "#e8e8e8",
                  padding: "0.5rem",
                  minWidth: "180px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "0.95rem",
                    marginBottom: "0.3rem",
                    color: "#c9a84c",
                  }}
                >
                  {venue.name}
                </strong>
                <span style={{ fontSize: "0.78rem", color: "#888", display: "block", marginBottom: "0.25rem" }}>
                  {venue.address}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#555", display: "block", marginBottom: "0.5rem" }}>
                  {venue.neighborhood}
                </span>
                {venue.upcomingCount > 0 && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.7rem",
                      background: "rgba(201,168,76,0.15)",
                      color: "#c9a84c",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {venue.upcomingCount} show{venue.upcomingCount !== 1 ? "s" : ""} próximo{venue.upcomingCount !== 1 ? "s" : ""}
                  </span>
                )}
                <a
                  href={`/locais/${venue.id}`}
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    color: "#c9a84c",
                    textDecoration: "none",
                    marginTop: "0.25rem",
                  }}
                >
                  Ver local →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

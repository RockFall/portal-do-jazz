'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface VenueData {
  id: string
  name: string
  address: string
  neighborhood: string
  latitude: number | null
  longitude: number | null
  nextEvent: {
    id: string
    title: string
    startsAt: string
  } | null
}

interface MapClientProps {
  venues: VenueData[]
}

export default function MapClient({ venues }: MapClientProps) {
  const [showTodayOnly, setShowTodayOnly] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<VenueData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  const mappableVenues = venues.filter((v) => v.latitude !== null && v.longitude !== null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const filteredVenues = showTodayOnly
    ? mappableVenues.filter((v) => {
        if (!v.nextEvent) return false
        const d = new Date(v.nextEvent.startsAt)
        return d >= today && d < tomorrow
      })
    : mappableVenues

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any

    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css' as unknown as string).catch(() => {})

      if (!mapRef.current || mapInstanceRef.current) return

      // Fix icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.default.Icon.Default.prototype as any)._getIconUrl
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // BH center
      map = L.default.map(mapRef.current).setView([-19.9167, -43.9345], 13)

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      mapInstanceRef.current = map
      setIsLoaded(true)

      // Add markers
      filteredVenues.forEach((venue) => {
        if (!venue.latitude || !venue.longitude) return

        const marker = L.default.marker([venue.latitude, venue.longitude])
        const popupContent = `
          <div style="font-family:system-ui;min-width:160px;color:#e8e8e8">
            <strong style="display:block;color:#c9a84c;margin-bottom:4px;font-size:0.9rem">${venue.name}</strong>
            <span style="font-size:0.75rem;color:#888;display:block;margin-bottom:6px">${venue.neighborhood}</span>
            ${venue.nextEvent ? `<div style="font-size:0.75rem;color:#c9a84c;margin-bottom:6px">🎵 ${venue.nextEvent.title}</div>` : ''}
            <a href="/locais/${venue.id}" style="color:#c9a84c;font-size:0.75rem">Ver local →</a>
          </div>
        `
        marker.bindPopup(popupContent)
        marker.addTo(map)
      })
    })

    return () => {
      if (map) {
        map.remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {/* Controls */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <button
          onClick={() => setShowTodayOnly(!showTodayOnly)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: `1px solid ${showTodayOnly ? 'rgba(201,168,76,0.4)' : '#2a2a2a'}`,
            background: showTodayOnly ? 'rgba(201,168,76,0.9)' : 'rgba(10,10,10,0.9)',
            color: showTodayOnly ? '#0a0a0a' : '#888',
            fontSize: '0.8rem',
            fontWeight: showTodayOnly ? 700 : 400,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}
        >
          Tem show hoje
        </button>

        {selectedVenue && (
          <div
            style={{
              background: 'rgba(10,10,10,0.95)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '10px',
              padding: '1rem',
              maxWidth: '220px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <button
              onClick={() => setSelectedVenue(null)}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                color: '#555',
                cursor: 'pointer',
                fontSize: '1.1rem',
                lineHeight: 1,
              }}
            >
              ×
            </button>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#e8e8e8',
                marginBottom: '0.25rem',
              }}
            >
              {selectedVenue.name}
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem' }}>
              {selectedVenue.neighborhood}
            </p>
            {selectedVenue.nextEvent && (
              <div
                style={{
                  background: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  marginBottom: '0.625rem',
                }}
              >
                <p style={{ fontSize: '0.7rem', color: '#c9a84c', fontWeight: 600, marginBottom: '0.2rem' }}>
                  Próximo show
                </p>
                <p style={{ fontSize: '0.78rem', color: '#ccc', lineHeight: 1.3 }}>
                  {selectedVenue.nextEvent.title}
                </p>
                <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.2rem' }}>
                  {format(new Date(selectedVenue.nextEvent.startsAt), "d MMM 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            )}
            <Link
              href={`/locais/${selectedVenue.id}`}
              style={{
                display: 'block',
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#c9a84c',
                fontSize: '0.78rem',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Ver local →
            </Link>
          </div>
        )}
      </div>

      {/* Venue count */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          zIndex: 1000,
          background: 'rgba(10,10,10,0.85)',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          padding: '0.625rem 0.875rem',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p style={{ fontSize: '0.75rem', color: '#666' }}>
          {filteredVenues.length} local{filteredVenues.length !== 1 ? 'is' : ''} no mapa
        </p>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
            zIndex: 500,
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #c9a84c',
              borderTopColor: 'transparent',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p style={{ fontSize: '0.875rem', color: '#555' }}>Carregando mapa…</p>
        </div>
      )}

      {/* Map container */}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .leaflet-container { background: #1a1a1a !important; }
        .leaflet-popup-content-wrapper {
          background: #1a1a1a !important;
          color: #e8e8e8 !important;
          border: 1px solid rgba(201,168,76,0.25) !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-tip { background: #1a1a1a !important; }
        .leaflet-tile { filter: brightness(0.6) saturate(0.4) !important; }
      `}</style>
    </div>
  )
}

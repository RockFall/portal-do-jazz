"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

interface VenueMarker {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  upcomingCount: number;
}

export default function MapWrapper({ venues }: { venues: VenueMarker[] }) {
  return <MapClient venues={venues} />;
}

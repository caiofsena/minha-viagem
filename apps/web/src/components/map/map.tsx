"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import type { Place, Category } from "@minha-viagem/shared";
import { CATEGORY_COLORS } from "@minha-viagem/shared";

function createColoredIcon(category: Category) {
  const color = CATEGORY_COLORS[category];
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 28px; height: 28px; 
      border-radius: 50%; 
      background: ${color}; 
      border: 3px solid #252b48;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

interface MapClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FlyToCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface MapProps {
  places: Place[];
  onClickMarker?: (place: Place) => void;
  onMapClick: (lat: number, lng: number) => void;
  center?: [number, number];
}

export function Map({ places, onClickMarker, onMapClick, center }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-full w-full bg-[#252b48] animate-pulse" />;
  }

  return (
    <MapContainer
      center={center || [-15.7934, -47.8823]}
      zoom={center ? 14 : 4}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      {center && <FlyToCenter center={center} />}
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={createColoredIcon(place.categoria)}
          eventHandlers={{
            click: () => onClickMarker?.(place),
          }}
        />
      ))}
    </MapContainer>
  );
}

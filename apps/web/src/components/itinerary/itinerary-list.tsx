"use client";

import type { Place, DayGroup } from "@minha-viagem/shared";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@minha-viagem/shared";
import { Clock, MapPin, Pencil, Trash2 } from "lucide-react";

interface ItineraryListProps {
  places: Place[];
  onToggleVisited: (place: Place) => void;
  onEditPlace: (place: Place) => void;
  onDeletePlace: (place: Place) => void;
}

function groupByDate(places: Place[]): DayGroup[] {
  const map = new Map<string, Place[]>();
  for (const p of places) {
    const existing = map.get(p.data) || [];
    existing.push(p);
    map.set(p.data, existing);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([data, places]) => ({
      data,
      places: places.sort((a, b) => a.hora_entrada.localeCompare(b.hora_entrada)),
    }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function ItineraryList({
  places,
  onToggleVisited,
  onEditPlace,
  onDeletePlace,
}: ItineraryListProps) {
  const days = groupByDate(places);

  if (days.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-[#B5AFA8]">
        <MapPin size={32} className="mb-3" />
        <p className="text-sm">Clique no mapa para adicionar lugares</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      {days.map((day) => (
        <div key={day.data} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#2D2A26] capitalize">{formatDate(day.data)}</h3>
            <span className="badge-category bg-[#3D8B7A]/10 text-[#3D8B7A]">
              {day.places.length} {day.places.length === 1 ? "lugar" : "lugares"}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {day.places.map((place) => (
              <div
                key={place.id}
                className={`card-warm flex items-start gap-3.5 p-3.5 transition-all ${
                  place.visitado ? "opacity-60" : ""
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => onToggleVisited(place)}
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors"
                  style={{
                    borderColor: place.visitado ? "#E07A5F" : "#E5DFD7",
                    backgroundColor: place.visitado ? "#E07A5F" : "#FAF7F2",
                  }}
                >
                  {place.visitado && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-[15px] font-semibold ${
                        place.visitado ? "line-through text-[#B5AFA8]" : "text-[#2D2A26]"
                      }`}
                    >
                      {place.nome}
                    </h4>
                    <span
                      className="badge-category"
                      style={{
                        backgroundColor: CATEGORY_COLORS[place.categoria] + "18",
                        color: CATEGORY_COLORS[place.categoria],
                      }}
                    >
                      {CATEGORY_LABELS[place.categoria]}
                    </span>
                  </div>

                  {(place.hora_entrada || place.hora_saida) && (
                    <div className="flex items-center gap-1.5 text-sm text-[#8C8680]">
                      <Clock size={14} className="text-[#B5AFA8]" />
                      {place.hora_entrada && <span>{place.hora_entrada}</span>}
                      {place.hora_entrada && place.hora_saida && <span>—</span>}
                      {place.hora_saida && <span>{place.hora_saida}</span>}
                    </div>
                  )}

                  {place.notas && <p className="text-xs text-[#B5AFA8]">{place.notas}</p>}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => onEditPlace(place)}
                    className="rounded-lg p-1.5 text-[#B5AFA8] hover:bg-[#F2EDE7] hover:text-[#8C8680] transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDeletePlace(place)}
                    className="rounded-lg p-1.5 text-[#B5AFA8] hover:bg-[#F2EDE7] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

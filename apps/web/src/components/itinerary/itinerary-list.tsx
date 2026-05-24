"use client";

import type { Place, DayGroup, Category } from "@minha-viagem/shared";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@minha-viagem/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, GripVertical } from "lucide-react";

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
    weekday: "long",
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
      <div className="py-12 text-center text-zinc-400">
        <MapPin size={32} className="mx-auto mb-3" />
        <p className="text-sm">Clique no mapa para adicionar lugares</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {days.map((day) => (
        <div key={day.data}>
          <h3 className="mb-3 text-sm font-semibold uppercase text-zinc-500">
            {formatDate(day.data)}
          </h3>
          <div className="space-y-2">
            {day.places.map((place) => (
              <div
                key={place.id}
                className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                  place.visitado
                    ? "border-zinc-100 bg-zinc-50 opacity-60"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <div className="mt-1 flex items-center gap-2">
                  <Checkbox
                    checked={place.visitado}
                    onChange={() => onToggleVisited(place)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-medium ${
                        place.visitado ? "line-through text-zinc-400" : "text-zinc-900"
                      }`}
                    >
                      {place.nome}
                    </h4>
                    <Badge
                      style={{
                        backgroundColor: CATEGORY_COLORS[place.categoria] + "20",
                        color: CATEGORY_COLORS[place.categoria],
                        borderColor: CATEGORY_COLORS[place.categoria] + "40",
                      }}
                      variant="outline"
                    >
                      {CATEGORY_LABELS[place.categoria]}
                    </Badge>
                  </div>

                  {(place.hora_entrada || place.hora_saida) && (
                    <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                      <Clock size={12} />
                      {place.hora_entrada && <span>{place.hora_entrada}</span>}
                      {place.hora_entrada && place.hora_saida && <span>—</span>}
                      {place.hora_saida && <span>{place.hora_saida}</span>}
                    </div>
                  )}

                  {place.notas && (
                    <p className="mt-1 text-xs text-zinc-400">{place.notas}</p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => onEditPlace(place)}
                  >
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69699 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500 hover:text-red-600"
                    onClick={() => onDeletePlace(place)}
                  >
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M5.5 5.5C5.77614 5.5 6 5.72386 6 6V11C6 11.2761 5.77614 11.5 5.5 11.5C5.22386 11.5 5 11.2761 5 11V6C5 5.72386 5.22386 5.5 5.5 5.5ZM9.5 5.5C9.77614 5.5 10 5.72386 10 6V11C10 11.2761 9.77614 11.5 9.5 11.5C9.22386 11.5 9 11.2761 9 11V6C9 5.72386 9.22386 5.5 9.5 5.5Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 4.5C3 4.22386 3.22386 4 3.5 4H11.5C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V5H3.5C3.22386 5 3 4.77614 3 4.5ZM5 5H10V12H5V5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

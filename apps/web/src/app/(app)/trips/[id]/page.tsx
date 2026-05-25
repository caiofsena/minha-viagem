"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/stores/tripStore";
import { useAuthStore } from "@/stores/authStore";
import { usePlaces, useAddPlace, useUpdatePlace, useRemovePlace } from "@/hooks/usePlaces";
import { useTrip } from "@/hooks/useTrips";
import { Map } from "@/components/map/map";
import { ItineraryList } from "@/components/itinerary/itinerary-list";
import { PlaceForm } from "@/components/forms/place-form";
import type { PlaceFormData } from "@/components/forms/place-form";
import type { Place, Category } from "@minha-viagem/shared";
import { CATEGORY_LABELS } from "@minha-viagem/shared";
import { ArrowLeft, Plus, Calendar } from "lucide-react";
import { useState } from "react";

const CATEGORIES: Category[] = Object.keys(CATEGORY_LABELS) as Category[];

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuthStore();
  const { formOpen, editingPlace, newLat, newLng, openPlaceForm, closePlaceForm } = useTripStore();
  const { data: trip } = useTrip(id);
  const { data: places = [], isLoading: placesLoading } = usePlaces(id);
  const addPlace = useAddPlace();
  const updatePlace = useUpdatePlace();
  const removePlace = useRemovePlace();
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState<Set<Category>>(new Set());

  const handleMapClick = (lat: number, lng: number) => {
    openPlaceForm(lat, lng);
  };

  const handleSubmitPlace = (data: PlaceFormData) => {
    if (editingPlace) {
      updatePlace.mutate({
        id: editingPlace.id,
        nome: data.nome,
        categoria: data.categoria,
        data: data.data,
        hora_entrada: data.hora_entrada || "",
        hora_saida: data.hora_saida || "",
        notas: data.notas || "",
      });
    } else if (newLat !== null && newLng !== null) {
      addPlace.mutate({
        trip_id: id,
        nome: data.nome,
        lat: newLat,
        lng: newLng,
        categoria: data.categoria,
        data: data.data,
        hora_entrada: data.hora_entrada || "",
        hora_saida: data.hora_saida || "",
        visitado: false,
        ordem: places.length,
        notas: data.notas || "",
      });
    }
  };

  const handleToggleVisited = (place: Place) => {
    updatePlace.mutate({ id: place.id, visitado: !place.visitado });
  };

  const handleEditPlace = (place: Place) => {
    openPlaceForm(undefined, undefined, place);
  };

  const handleDeletePlace = (place: Place) => {
    if (confirm("Remover este lugar do itinerário?")) {
      removePlace.mutate({ id: place.id, tripId: id });
    }
  };

  const toggleFilter = (cat: Category) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredPlaces =
    activeFilters.size > 0 ? places.filter((p) => activeFilters.has(p.categoria)) : places;

  if (authLoading || !user) return null;

  const mapCenter: [number, number] =
    places.length > 0 ? [places[0].lat, places[0].lng] : [-15.7934, -47.8823];

  const startDate = trip?.data_inicio ? new Date(trip.data_inicio) : null;
  const endDate = trip?.data_fim ? new Date(trip.data_fim) : null;
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const dateRange =
    startDate && endDate
      ? `${startDate.getDate()} — ${endDate.getDate()} de ${months[endDate.getMonth()]}, ${endDate.getFullYear()}`
      : "";

  return (
    <div className="flex h-[calc(100vh-3.5rem)] bg-[#1a1f3d]">
      {/* Map Area */}
      <div className="relative h-full w-1/2 bg-[#252b48]">
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#252b48] px-3.5 py-2 text-sm font-medium text-white shadow-sm border border-[#2d3561] hover:bg-[#2d3561] transition-colors"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          {trip && (
            <div className="rounded-xl bg-[#252b48] px-4 py-3 shadow-sm border border-[#2d3561]">
              <h2 className="text-lg font-bold text-white">{trip.nome}</h2>
              {dateRange && (
                <div className="mt-1 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#718096]" />
                  <span className="text-sm text-[#a0aec0]">{dateRange}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <Map
          places={filteredPlaces}
          onMapClick={handleMapClick}
          onClickMarker={handleEditPlace}
          center={mapCenter}
        />
      </div>

      {/* Sidebar */}
      <div className="flex h-full w-1/2 flex-col border-l border-[#2d3561] bg-[#252b48]">
        {/* Header */}
        <div className="flex flex-col gap-0 border-b border-[#2d3561] px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Itinerário</h2>
            <button
              onClick={() => openPlaceForm()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4ecdc4] px-3.5 py-2 text-sm font-semibold text-[#1a1f3d] hover:bg-[#4ecdc4]/90 transition-colors"
            >
              <Plus size={14} /> Adicionar
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-3.5 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilters.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#4ecdc4] text-[#1a1f3d]"
                      : "bg-[#2d3561] text-[#a0aec0] hover:bg-[#2d3561]/80"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Places List */}
        <div className="flex-1 overflow-auto px-5 py-5">
          {placesLoading ? (
            <div className="space-y-3 py-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-xl bg-[#2d3561]" />
              ))}
            </div>
          ) : (
            <ItineraryList
              places={filteredPlaces}
              onToggleVisited={handleToggleVisited}
              onEditPlace={handleEditPlace}
              onDeletePlace={handleDeletePlace}
            />
          )}
        </div>
      </div>

      <PlaceForm
        open={formOpen}
        onClose={closePlaceForm}
        onSubmit={handleSubmitPlace}
        initialData={editingPlace || undefined}
        title={editingPlace ? "Editar Local" : "Novo Local"}
      />
    </div>
  );
}

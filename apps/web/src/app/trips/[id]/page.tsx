"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useTripStore } from "@/stores/tripStore";
import { useAuthStore } from "@/stores/authStore";
import { usePlaces, useAddPlace, useUpdatePlace, useRemovePlace } from "@/hooks/usePlaces";
import { Map } from "@/components/map/map";
import { ItineraryList } from "@/components/itinerary/itinerary-list";
import { PlaceForm } from "@/components/forms/place-form";
import type { PlaceFormData } from "@/components/forms/place-form";
import { Button } from "@/components/ui/button";
import type { Place, Category } from "@minha-viagem/shared";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

export default function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuthStore();
  const { formOpen, editingPlace, newLat, newLng, openPlaceForm, closePlaceForm } = useTripStore();
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
    activeFilters.size > 0
      ? places.filter((p) => activeFilters.has(p.categoria))
      : places;

  if (authLoading || !user) return null;

  const mapCenter: [number, number] =
    places.length > 0
      ? [places[0].lat, places[0].lng]
      : [-15.7934, -47.8823];

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      <div className="relative h-[40vh] lg:h-full lg:w-1/2">
        <div className="absolute top-3 left-3 z-[1000]">
          <Button size="sm" variant="outline" className="bg-white" onClick={() => router.push("/")}>
            <ArrowLeft size={14} className="mr-1" /> Voltar
          </Button>
        </div>
        <Map
          places={filteredPlaces}
          onMapClick={handleMapClick}
          onClickMarker={handleEditPlace}
          center={mapCenter}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-auto border-t border-zinc-200 lg:border-l lg:border-t-0">
        <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white px-4 py-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Itinerário</h2>
            <Button size="sm" onClick={() => openPlaceForm()}>
              <Plus size={14} className="mr-1" /> Adicionar
            </Button>
          </div>

          <div className="flex flex-wrap gap-1">
            {(["hotel", "restaurante", "museu", "parque", "compras", "aeroporto", "outro"] as Category[]).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                    activeFilters.has(cat)
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {{
                    hotel: "Hotel",
                    restaurante: "Restaurante",
                    museu: "Museu",
                    parque: "Parque",
                    compras: "Compras",
                    aeroporto: "Aeroporto",
                    outro: "Outro",
                  }[cat]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-4">
          {placesLoading ? (
            <div className="space-y-3 py-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-zinc-100" />
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
        initialData={
          editingPlace
            ? editingPlace
            : undefined
        }
        title={editingPlace ? "Editar Local" : "Novo Local"}
      />
    </div>
  );
}

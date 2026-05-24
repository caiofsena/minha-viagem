import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import type { Place } from "@minha-viagem/shared";

interface TripState {
  currentTripId: string | null;
  editingPlace: Place | null;
  formOpen: boolean;
  newLat: number | null;
  newLng: number | null;

  setCurrentTripId: (id: string | null) => void;
  openPlaceForm: (lat?: number, lng?: number, place?: Place) => void;
  closePlaceForm: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  currentTripId: null,
  editingPlace: null,
  formOpen: false,
  newLat: null,
  newLng: null,

  setCurrentTripId(id) {
    set({ currentTripId: id });
  },

  openPlaceForm(lat, lng, place) {
    set({
      formOpen: true,
      newLat: lat ?? null,
      newLng: lng ?? null,
      editingPlace: place ?? null,
    });
  },

  closePlaceForm() {
    set({
      formOpen: false,
      newLat: null,
      newLng: null,
      editingPlace: null,
    });
  },
}));

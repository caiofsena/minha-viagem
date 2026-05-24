import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Place } from "@minha-viagem/shared";

const supabase = createClient();

export function usePlaces(tripId: string) {
  return useQuery({
    queryKey: ["places", tripId],
    queryFn: async () => {
      const { data } = await supabase
        .from("places")
        .select("*")
        .eq("trip_id", tripId)
        .order("ordem", { ascending: true });
      return (data || []) as Place[];
    },
    enabled: !!tripId,
  });
}

export function useAddPlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (place: Omit<Place, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("places")
        .insert(place)
        .select()
        .single();
      if (error) throw error;
      return data as Place;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places", data.trip_id] });
    },
  });
}

export function useUpdatePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...placeData }: Partial<Place> & { id: string }) => {
      const { data, error } = await supabase
        .from("places")
        .update(placeData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Place;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["places", data.trip_id] });
    },
  });
}

export function useRemovePlace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tripId }: { id: string; tripId: string }) => {
      const { error } = await supabase.from("places").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["places", variables.tripId] });
    },
  });
}

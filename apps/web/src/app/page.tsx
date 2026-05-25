"use client";

import { useAuthStore } from "@/stores/authStore";
import { useTrips } from "@/hooks/useTrips";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plus, MapPin } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuthStore();
  const { data: trips = [], isLoading } = useTrips();

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Minhas Viagens</h1>
        <Link href="/trips/new">
          <Button>
            <Plus size={16} className="mr-2" /> Nova Viagem
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="h-32 animate-pulse bg-zinc-100" />
            </Card>
          ))}
        </div>
      ) : trips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <MapPin size={48} className="mb-4 text-zinc-300" />
            <p className="mb-4 text-zinc-500">Nenhuma viagem planejada ainda</p>
            <Link href="/trips/new">
              <Button>Criar Primeira Viagem</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.id}`}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{trip.nome}</CardTitle>
                  <p className="text-sm text-zinc-500">{trip.destino}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-zinc-400">
                    {new Date(trip.data_inicio).toLocaleDateString("pt-BR")} —{" "}
                    {new Date(trip.data_fim).toLocaleDateString("pt-BR")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

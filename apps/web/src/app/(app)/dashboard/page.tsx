"use client";

import { useAuthStore } from "@/stores/authStore";
import { useTrips } from "@/hooks/useTrips";
import Link from "next/link";
import { Plus, MapPin, Calendar, Search } from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuthStore();
  const { data: trips = [], isLoading } = useTrips();

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-[#1a1f3d]">
      <div className="mx-auto max-w-5xl px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Minhas Viagens</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#718096]"
              />
              <input
                type="text"
                placeholder="Buscar..."
                className="h-10 w-64 rounded-xl border border-[#2d3561] bg-[#252b48] pl-10 pr-4 text-sm text-white placeholder:text-[#718096] focus:outline-none focus:border-[#4ecdc4] transition-colors"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-warm h-40 animate-pulse" />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="card-warm flex flex-col items-center py-16">
            <MapPin size={48} className="mb-4 text-[#718096]" />
            <p className="mb-6 text-[#a0aec0]">Nenhuma viagem planejada ainda</p>
            <Link href="/trips/new">
              <span className="btn-primary inline-flex items-center gap-2">
                <Plus size={16} /> Criar Primeira Viagem
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => {
              const start = new Date(trip.data_inicio);
              const end = new Date(trip.data_fim);
              const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
              const months = [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ];
              const dateStr = `${start.getDate()} — ${end.getDate()} ${months[end.getMonth()]}`;

              return (
                <Link key={trip.id} href={`/trips/${trip.id}`}>
                  <div className="card-warm cursor-pointer transition-all hover:shadow-lg hover:border-[#4ecdc4]/30">
                    <div className="flex flex-col gap-2 p-6 pb-4">
                      <h3 className="text-lg font-bold text-white">{trip.nome}</h3>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#4ecdc4]" />
                        <span className="text-sm text-[#a0aec0]">{trip.destino}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-[#2d3561] px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#718096]" />
                        <span className="text-sm text-[#a0aec0]">{dateStr}</span>
                      </div>
                      <span className="badge-category bg-[#4ecdc4]/10 text-[#4ecdc4]">
                        {days} dias
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCreateTrip } from "@/hooks/useTrips";
import { ArrowLeft } from "lucide-react";

const tripSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  destino: z.string().min(1, "Destino obrigatório"),
  data_inicio: z.string().min(1, "Data de início obrigatória"),
  data_fim: z.string().min(1, "Data de fim obrigatória"),
});

type TripFormData = z.infer<typeof tripSchema>;

export default function NewTripPage() {
  const router = useRouter();
  const createTrip = useCreateTrip();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
  });

  async function onSubmit(data: TripFormData) {
    try {
      const trip = await createTrip.mutateAsync(data);
      router.push(`/trips/${trip.id}`);
    } catch {
      setError("root", { message: "Erro ao criar viagem." });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE7] px-4">
      <div className="flex w-full max-w-[520px] flex-col">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#8C8680] hover:text-[#2D2A26] transition-colors"
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="card-warm p-0">
          <div className="flex items-center justify-between border-b border-[#E5DFD7] px-6 py-5">
            <h1 className="text-lg font-bold text-[#2D2A26]">Nova Viagem</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-6 py-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Nome da viagem</label>
              <input
                placeholder="Ex: Férias em Paris"
                className="input-warm"
                {...register("nome")}
              />
              {errors.nome && <p className="text-xs text-red-500">{errors.nome.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Destino</label>
              <input
                placeholder="Ex: Paris, França"
                className="input-warm"
                {...register("destino")}
              />
              {errors.destino && <p className="text-xs text-red-500">{errors.destino.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#2D2A26]">Data de início</label>
                <input
                  type="date"
                  className="input-warm"
                  {...register("data_inicio")}
                />
                {errors.data_inicio && <p className="text-xs text-red-500">{errors.data_inicio.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#2D2A26]">Data de fim</label>
                <input
                  type="date"
                  className="input-warm"
                  {...register("data_fim")}
                />
                {errors.data_fim && <p className="text-xs text-red-500">{errors.data_fim.message}</p>}
              </div>
            </div>

            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? "Criando..." : "Criar Viagem"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

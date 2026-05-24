"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCreateTrip } from "@/hooks/useTrips";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tripSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  destino: z.string().min(1, "Destino obrigatório"),
  data_inicio: z.string().min(1, "Data de início obrigatória"),
  data_fim: z.string().min(1, "Data de fim obrigatória"),
});

type TripFormData = z.infer<typeof tripSchema>;

export function TripForm() {
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
    } catch (error) {
      setError("root", { message: "Erro ao criar viagem." });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Nova Viagem</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da viagem</Label>
            <Input
              id="nome"
              placeholder="Ex: Férias em Paris"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-xs text-red-600">{errors.nome.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="destino">Destino</Label>
            <Input
              id="destino"
              placeholder="Ex: Paris, França"
              {...register("destino")}
            />
            {errors.destino && (
              <p className="text-xs text-red-600">{errors.destino.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data_inicio">Data de início</Label>
              <Input
                id="data_inicio"
                type="date"
                {...register("data_inicio")}
              />
              {errors.data_inicio && (
                <p className="text-xs text-red-600">{errors.data_inicio.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="data_fim">Data de fim</Label>
              <Input
                id="data_fim"
                type="date"
                {...register("data_fim")}
              />
              {errors.data_fim && (
                <p className="text-xs text-red-600">{errors.data_fim.message}</p>
              )}
            </div>
          </div>
          {errors.root && (
            <p className="text-sm text-red-600">{errors.root.message}</p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Viagem"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

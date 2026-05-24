"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Place, Category } from "@minha-viagem/shared";
import { CATEGORY_LABELS } from "@minha-viagem/shared";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const placeSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  categoria: z.enum(["hotel", "restaurante", "museu", "parque", "compras", "aeroporto", "outro"]),
  data: z.string().min(1, "Data obrigatória"),
  hora_entrada: z.string().optional(),
  hora_saida: z.string().optional(),
  notas: z.string().optional(),
});

export type PlaceFormData = z.infer<typeof placeSchema>;

interface PlaceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PlaceFormData) => void;
  initialData?: Partial<Place>;
  title: string;
}

export function PlaceForm({ open, onClose, onSubmit, initialData, title }: PlaceFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      nome: "",
      categoria: "outro",
      data: "",
      hora_entrada: "",
      hora_saida: "",
      notas: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        nome: initialData?.nome || "",
        categoria: initialData?.categoria || "outro",
        data: initialData?.data || "",
        hora_entrada: initialData?.hora_entrada || "",
        hora_saida: initialData?.hora_saida || "",
        notas: initialData?.notas || "",
      });
    }
  }, [open, initialData, reset]);

  function handleFormSubmit(data: PlaceFormData) {
    onSubmit(data);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do local</Label>
          <Input
            id="nome"
            placeholder="Ex: Torre Eiffel"
            {...register("nome")}
          />
          {errors.nome && (
            <p className="text-xs text-red-600">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">Categoria</Label>
          <Controller
            control={control}
            name="categoria"
            render={({ field }) => (
              <Select id="categoria" value={field.value} onChange={field.onChange}>
                {(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>
            )}
          />
          {errors.categoria && (
            <p className="text-xs text-red-600">{errors.categoria.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="data">Data</Label>
          <Input
            id="data"
            type="date"
            {...register("data")}
          />
          {errors.data && (
            <p className="text-xs text-red-600">{errors.data.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hora_entrada">Horário de entrada</Label>
            <Input
              id="hora_entrada"
              type="time"
              {...register("hora_entrada")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hora_saida">Horário de saída</Label>
            <Input
              id="hora_saida"
              type="time"
              {...register("hora_saida")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notas">Notas</Label>
          <Input
            id="notas"
            placeholder="Observações..."
            {...register("notas")}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>Salvar</Button>
        </div>
      </form>
    </Dialog>
  );
}

"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Place, Category } from "@minha-viagem/shared";
import { CATEGORY_LABELS } from "@minha-viagem/shared";
import { Dialog } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col w-full max-w-[480px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5DFD7] px-6 py-5">
          <h2 className="text-lg font-bold text-[#2D2A26]">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#B5AFA8] hover:bg-[#F2EDE7] hover:text-[#8C8680] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5 px-6 py-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2D2A26]">Nome do local</label>
            <input
              placeholder="Ex: Torre Eiffel"
              className="input-warm"
              {...register("nome")}
            />
            {errors.nome && <p className="text-xs text-red-500">{errors.nome.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2D2A26]">Categoria</label>
            <Controller
              control={control}
              name="categoria"
              render={({ field }) => (
                <select
                  className="input-warm appearance-none cursor-pointer"
                  value={field.value}
                  onChange={field.onChange}
                >
                  {(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              )}
            />
            {errors.categoria && <p className="text-xs text-red-500">{errors.categoria.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2D2A26]">Data</label>
            <input
              type="date"
              className="input-warm"
              {...register("data")}
            />
            {errors.data && <p className="text-xs text-red-500">{errors.data.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Horário de entrada</label>
              <input
                type="time"
                className="input-warm"
                {...register("hora_entrada")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Horário de saída</label>
              <input
                type="time"
                className="input-warm"
                {...register("hora_saida")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2D2A26]">Notas</label>
            <input
              placeholder="Observações..."
              className="input-warm"
              {...register("notas")}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#E5DFD7] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

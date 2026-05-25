"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Globe } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
});

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterData) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("root", { message: error.message });
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F2EDE7] px-4">
      <div className="flex w-full max-w-[420px] flex-col">
        <div className="card-warm p-0">
          <div className="flex flex-col gap-2 border-b border-[#E5DFD7] px-8 pt-8 pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E07A5F]/10">
              <Globe size={24} className="text-[#E07A5F]" />
            </div>
            <h1 className="text-xl font-bold text-[#2D2A26]">Crie sua conta</h1>
            <p className="text-sm text-[#8C8680]">Comece a planejar suas aventuras</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-8 pt-6 pb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="input-warm"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#2D2A26]">Senha</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                className="input-warm"
                {...register("password")}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Criando..." : "Criar Conta"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#8C8680]">
          Já tem conta?{" "}
          <a href="/login" className="font-semibold text-[#E07A5F] hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}

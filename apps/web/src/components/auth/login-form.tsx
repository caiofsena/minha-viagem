"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    const { error } = await supabase.auth.signInWithPassword({
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
    <div className="flex min-h-screen items-center justify-center bg-[#1a1f3d] px-4">
      <div className="flex w-full max-w-[420px] flex-col">
        <div className="card-warm p-0">
          <div className="flex flex-col gap-2 border-b border-[#2d3561] px-8 pt-8 pb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ecdc4]/10">
              <Image
                src="/logo-minha-viagem-icone-transparente.png"
                alt="Minha Viagem"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <h1 className="text-xl font-bold text-white">Bem-vindo de volta</h1>
            <p className="text-sm text-[#a0aec0]">Entre para continuar planejando</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-8 pt-6 pb-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="input-warm"
                {...register("email")}
              />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-warm"
                {...register("password")}
              />
              {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {errors.root && <p className="text-sm text-red-400">{errors.root.message}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-[#a0aec0]">
          Não tem conta?{" "}
          <a href="/register" className="font-semibold text-[#4ecdc4] hover:underline">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}

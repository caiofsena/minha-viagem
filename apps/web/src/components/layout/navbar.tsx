"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Menu, X, LogOut, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <nav className="border-b border-[#2d3561] bg-[#252b48]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2.5">
          <Image
            src="/logo-minha-viagem-icone-transparente.png"
            alt="Minha Viagem"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span className="text-base font-semibold text-white">Minha Viagem</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="rounded-lg px-4 py-2 text-sm font-medium text-[#a0aec0] hover:bg-[#2d3561] transition-colors">
                  Minhas Viagens
                </span>
              </Link>
              <Link href="/trips/new">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#4ecdc4] px-5 py-2 text-sm font-semibold text-[#1a1f3d] hover:bg-[#4ecdc4]/90 transition-colors">
                  <Plus size={14} />
                  Nova Viagem
                </span>
              </Link>
              <span className="text-sm text-[#a0aec0]">{user.email}</span>
              <button
                className="rounded-lg p-2 text-[#718096] hover:bg-[#2d3561] hover:text-[#a0aec0] transition-colors"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="rounded-lg px-4 py-2 text-sm font-medium text-[#a0aec0] hover:bg-[#2d3561] transition-colors">
                  Entrar
                </span>
              </Link>
              <Link href="/register">
                <span className="rounded-lg bg-[#4ecdc4] px-5 py-2 text-sm font-semibold text-[#1a1f3d] hover:bg-[#4ecdc4]/90 transition-colors">
                  Criar Conta
                </span>
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-[#a0aec0] hover:bg-[#2d3561] md:hidden transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#2d3561] px-6 py-4 md:hidden">
          {user ? (
            <div className="space-y-3">
              <p className="text-sm text-[#a0aec0]">{user.email}</p>
              <Link href="/trips/new" className="block">
                <span className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#4ecdc4] px-5 py-2.5 text-sm font-semibold text-[#1a1f3d]">
                  <Plus size={14} /> Nova Viagem
                </span>
              </Link>
              <button
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[#a0aec0] hover:bg-[#2d3561] transition-colors"
                onClick={handleSignOut}
              >
                <LogOut size={14} /> Sair
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" className="block">
                <span className="flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-[#a0aec0] hover:bg-[#2d3561] transition-colors">
                  Entrar
                </span>
              </Link>
              <Link href="/register" className="block">
                <span className="flex w-full items-center justify-center rounded-lg bg-[#4ecdc4] px-5 py-2.5 text-sm font-semibold text-[#1a1f3d]">
                  Criar Conta
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

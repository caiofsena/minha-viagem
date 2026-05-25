"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MapPin, Menu, X, LogOut, Plus } from "lucide-react";
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
    <nav className="border-b border-[#E5DFD7] bg-[#FAF7F2]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <MapPin size={20} className="text-[#E07A5F]" />
          <span className="text-base font-semibold text-[#2D2A26]">Minha Viagem</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href="/dashboard">
                <span className="rounded-lg px-4 py-2 text-sm font-medium text-[#8C8680] hover:bg-[#F2EDE7] transition-colors">
                  Minhas Viagens
                </span>
              </Link>
              <Link href="/trips/new">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#E07A5F] px-5 py-2 text-sm font-semibold text-white hover:bg-[#E07A5F]/90 transition-colors">
                  <Plus size={14} />
                  Nova Viagem
                </span>
              </Link>
              <span className="text-sm text-[#8C8680]">{user.email}</span>
              <button
                className="rounded-lg p-2 text-[#B5AFA8] hover:bg-[#F2EDE7] hover:text-[#8C8680] transition-colors"
                onClick={handleSignOut}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="rounded-lg px-4 py-2 text-sm font-medium text-[#8C8680] hover:bg-[#F2EDE7] transition-colors">
                  Entrar
                </span>
              </Link>
              <Link href="/register">
                <span className="rounded-lg bg-[#E07A5F] px-5 py-2 text-sm font-semibold text-white hover:bg-[#E07A5F]/90 transition-colors">
                  Criar Conta
                </span>
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-lg p-2 text-[#8C8680] hover:bg-[#F2EDE7] md:hidden transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#E5DFD7] px-6 py-4 md:hidden">
          {user ? (
            <div className="space-y-3">
              <p className="text-sm text-[#8C8680]">{user.email}</p>
              <Link href="/trips/new" className="block">
                <span className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white">
                  <Plus size={14} /> Nova Viagem
                </span>
              </Link>
              <button
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[#8C8680] hover:bg-[#F2EDE7] transition-colors"
                onClick={handleSignOut}
              >
                <LogOut size={14} /> Sair
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" className="block">
                <span className="flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-[#8C8680] hover:bg-[#F2EDE7] transition-colors">
                  Entrar
                </span>
              </Link>
              <Link href="/register" className="block">
                <span className="flex w-full items-center justify-center rounded-lg bg-[#E07A5F] px-5 py-2.5 text-sm font-semibold text-white">
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

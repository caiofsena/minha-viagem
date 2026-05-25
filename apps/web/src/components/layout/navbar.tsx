"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
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
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-900">
          <MapPin size={20} className="text-zinc-900" />
          Minha Viagem
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Minhas Viagens
                </Button>
              </Link>
              <Link href="/trips/new">
                <Button size="sm">
                  <Plus size={14} className="mr-1" />
                  Nova Viagem
                </Button>
              </Link>
              <span className="text-sm text-zinc-500">{user.email}</span>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Criar Conta</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-200 px-4 py-3 md:hidden">
          {user ? (
            <div className="space-y-2">
              <p className="text-sm text-zinc-500">{user.email}</p>
              <Link href="/trips/new" className="block">
                <Button size="sm" className="w-full">
                  <Plus size={14} className="mr-1" /> Nova Viagem
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut size={14} className="mr-1" /> Sair
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full">Entrar</Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full">Criar Conta</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

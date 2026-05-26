"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Share2, Smartphone, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: MapPin,
    title: "Mapa Interativo",
    desc: "Visualize todos os seus lugares no mapa com marcadores coloridos por categoria.",
  },
  {
    icon: Calendar,
    title: "Timeline Organizada",
    desc: "Veja seu itinerário dia a dia, com horários e detalhes de cada visita.",
  },
  {
    icon: Share2,
    title: "Compartilhe Viagens",
    desc: "Envie roteiros para amigos e família planejem juntos.",
  },
  {
    icon: Smartphone,
    title: "Acesso Mobile",
    desc: "Consulte seu roteiro offline direto do celular, a qualquer momento.",
  },
];

const steps = [
  { num: "1", title: "Crie sua conta", desc: "Cadastre-se gratuitamente em poucos segundos." },
  {
    num: "2",
    title: "Planeje sua viagem",
    desc: "Adicione destinos, datas e lugares que deseja visitar.",
  },
  {
    num: "3",
    title: "Explore no mapa",
    desc: "Visualize tudo no mapa interativo e organize por dia.",
  },
  {
    num: "4",
    title: "Aproveite a viagem",
    desc: "Consulte seu roteiro offline e marque lugares visitados.",
  },
];

export default function LandingPage() {
  const { user } = useAuthStore();

  const ctaHref = user ? "/dashboard" : "/register";
  const ctaText = user ? "Ir para Dashboard" : "Criar Conta Gratuita";
  const navLoginHref = user ? "/dashboard" : "/login";
  const navRegisterHref = user ? "/dashboard" : "/register";
  const navLoginText = user ? "Dashboard" : "Entrar";
  const navRegisterText = user ? "Dashboard" : "Criar Conta";

  return (
    <div className="min-h-screen bg-[#1a1f3d]">
      {/* Navbar */}
      <nav className="border-b border-[#2d3561] bg-[#252b48]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-minha-viagem-icone-transparente.png"
              alt="Minha Viagem"
              width={28}
              height={28}
              className="h-10 w-10"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href={navLoginHref}>
              <Button variant="ghost" className="text-[#a0aec0] hover:text-white">
                {navLoginText}
              </Button>
            </Link>
            <Link href={navRegisterHref}>
              <Button className="bg-[#4ecdc4] text-[#1a1f3d] hover:bg-[#4ecdc4]/90">
                {navRegisterText}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/logo-minha-viagem.png"
            alt="Minha Viagem Logo"
            width={300}
            height={300}
            className="drop-shadow-2xl shadow-xl bg-transparent rounded-full"
            priority
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Planeje suas viagens de forma inteligente
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#a0aec0]">
          Organize roteiros, descubra lugares incríveis e compartilhe experiências com quem você
          ama.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href={ctaHref}>
            <Button size="lg" className="bg-[#4ecdc4] px-8 text-[#1a1f3d] hover:bg-[#4ecdc4]/90">
              Começar Agora <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <a href="#features">
            <Button
              size="lg"
              variant="outline"
              className="border-[#2d3561] bg-[#252b48] text-white"
            >
              Saiba Mais
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="flex flex-col items-center px-6 py-20">
        <h2 className="text-3xl font-bold text-white">Por que usar o Minha Viagem?</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-2xl border border-[#2d3561] bg-[#252b48] p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4ecdc4]/10">
                <f.icon size={24} className="text-[#4ecdc4]" />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#a0aec0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="flex flex-col items-center px-6 py-20">
        <h2 className="text-3xl font-bold text-white">Como funciona</h2>
        <div className="mt-12 flex w-full max-w-2xl flex-col gap-6">
          {steps.map((s) => (
            <div key={s.num} className="flex items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4ecdc4] text-lg font-bold text-[#1a1f3d]">
                {s.num}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-[#a0aec0]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-20">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl bg-[#4ecdc4] px-10 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#1a1f3d] sm:text-3xl">
            Pronto para planejar sua próxima aventura?
          </h2>
          <p className="text-[#1a1f3d]/80">
            Crie sua conta gratuita e comece a organizar suas viagens hoje mesmo.
          </p>
          <Link href={ctaHref}>
            <Button size="lg" className="bg-white px-10 text-[#4ecdc4] hover:bg-white/90">
              {ctaText}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-[#2d3561] bg-[#252b48] px-6 py-8">
        <p className="text-sm text-[#718096]">© 2026 Minha Viagem. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-[#a0aec0] hover:text-white">
            Termos
          </a>
          <a href="#" className="text-sm text-[#a0aec0] hover:text-white">
            Privacidade
          </a>
          <a href="#" className="text-sm text-[#a0aec0] hover:text-white">
            Contato
          </a>
        </div>
      </footer>
    </div>
  );
}

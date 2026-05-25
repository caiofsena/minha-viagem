"use client";

import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Share2, Smartphone, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-[#F2EDE7]">
      {/* Navbar */}
      <nav className="bg-[#FAF7F2] border-b border-[#E5DFD7]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <MapPin size={24} className="text-[#E07A5F]" />
            <span className="text-lg font-bold text-[#2D2A26]">Minha Viagem</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={navLoginHref}>
              <Button variant="ghost" className="text-[#8C8680] hover:text-[#2D2A26]">
                {navLoginText}
              </Button>
            </Link>
            <Link href={navRegisterHref}>
              <Button className="bg-[#E07A5F] text-white hover:bg-[#E07A5F]/90">
                {navRegisterText}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-[#2D2A26] sm:text-5xl lg:text-6xl">
          Planeje suas viagens de forma inteligente
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[#8C8680]">
          Organize roteiros, descubra lugares incríveis e compartilhe experiências com quem você
          ama.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href={ctaHref}>
            <Button size="lg" className="bg-[#E07A5F] px-8 text-white hover:bg-[#E07A5F]/90">
              Começar Agora <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="border-[#E5DFD7] bg-[#FAF7F2]">
              Saiba Mais
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="flex flex-col items-center px-6 py-20">
        <h2 className="text-3xl font-bold text-[#2D2A26]">Por que usar o Minha Viagem?</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 rounded-2xl border border-[#E5DFD7] bg-[#FAF7F2] p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E07A5F]/10">
                <f.icon size={24} className="text-[#E07A5F]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2D2A26]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#8C8680]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="flex flex-col items-center px-6 py-20">
        <h2 className="text-3xl font-bold text-[#2D2A26]">Como funciona</h2>
        <div className="mt-12 flex w-full max-w-2xl flex-col gap-6">
          {steps.map((s) => (
            <div key={s.num} className="flex items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E07A5F] text-lg font-bold text-white">
                {s.num}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#2D2A26]">{s.title}</h3>
                <p className="text-sm text-[#8C8680]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center px-6 py-20">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl bg-[#E07A5F] px-10 py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pronto para planejar sua próxima aventura?
          </h2>
          <p className="text-[#FFFFFFCC]">
            Crie sua conta gratuita e comece a organizar suas viagens hoje mesmo.
          </p>
          <Link href={ctaHref}>
            <Button size="lg" className="bg-white px-10 text-[#E07A5F] hover:bg-white/90">
              {ctaText}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-[#E5DFD7] bg-[#FAF7F2] px-6 py-8">
        <p className="text-sm text-[#B5AFA8]">© 2026 Minha Viagem. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-[#8C8680] hover:text-[#2D2A26]">
            Termos
          </a>
          <a href="#" className="text-sm text-[#8C8680] hover:text-[#2D2A26]">
            Privacidade
          </a>
          <a href="#" className="text-sm text-[#8C8680] hover:text-[#2D2A26]">
            Contato
          </a>
        </div>
      </footer>
    </div>
  );
}

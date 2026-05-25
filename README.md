# Minha Viagem

Planeje suas viagens de forma inteligente com mapas interativos, itinerários organizados por dia e compartilhamento de roteiros.

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS 3 + tailwind-variants
- **Auth & DB:** Supabase (Auth + PostgreSQL + RLS)
- **State:** Zustand (UI) + React Query (server state)
- **Forms:** React Hook Form + Zod
- **Maps:** Leaflet + react-leaflet
- **Monorepo:** Turborepo + pnpm workspaces

## Estrutura

```
minha-viagem/
├── apps/
│   └── web/                    # Next.js app
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   │   ├── (app)/      # Authenticated routes
│       │   │   ├── (auth)/     # Login/Register
│       │   │   └── page.tsx    # Landing page
│       │   ├── components/     # UI, forms, layout
│       │   ├── hooks/          # React Query hooks
│       │   ├── lib/            # Supabase clients
│       │   └── stores/         # Zustand stores
│       ── package.json
├── packages/
│   └── shared/                 # Shared types & constants
├── supabase/
│   ── migrations/             # SQL schema migrations
└── pencil/                     # Design prototypes
```

## Setup

### Pré-requisitos

- Node.js 20+
- pnpm 9+
- Supabase project

### Instalação

```bash
# Instalar dependências
pnpm install

# Criar arquivo de env
cp apps/web/.env.local.example apps/web/.env.local

# Editar com suas credenciais do Supabase
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=xxx
```

### Rodar migrations

```bash
# Via Supabase CLI (se instalado)
supabase db push

# Ou execute manualmente o SQL em:
# supabase/migrations/001_initial_schema.sql
```

### Desenvolvimento

```bash
# Rodar web app
pnpm dev:web

# Rodar todos os packages
pnpm dev
```

Acesse: http://localhost:3000

### Build

```bash
pnpm build:web
```

## Scripts

| Comando          | Descrição                       |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Roda todos os packages em dev   |
| `pnpm dev:web`   | Roda apenas o web app           |
| `pnpm build`     | Build de todos os packages      |
| `pnpm build:web` | Build apenas do web app         |
| `pnpm lint`      | Lint de todos os packages       |
| `pnpm typecheck` | Type check de todos os packages |
| `pnpm format`    | Formata código com Prettier     |

## Design

O protótipo está em `pencil/minha-viagem.pen`. Abra no [Pencil](https://pencil.evolus.vn/) para visualizar as telas.

## Paleta de Cores

| Token               | Cor       | Uso                  |
| ------------------- | --------- | -------------------- |
| `bg-warm`           | `#F2EDE7` | Background principal |
| `surface-warm`      | `#FAF7F2` | Cards, navbar        |
| `accent-terracotta` | `#E07A5F` | Primary actions      |
| `accent-ocean`      | `#3D8B7A` | Badges, success      |
| `text-primary`      | `#2D2A26` | Text principal       |
| `text-secondary`    | `#8C8680` | Text secundário      |

## Licença

MIT

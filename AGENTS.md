# Minha Viagem - Agent Context

## Project Overview

Travel itinerary planning web app with interactive maps, categorized places, and date-organized timelines.

## Architecture

- **Monorepo:** Turborepo + pnpm workspaces
- **Apps:** `apps/web` (Next.js 15 App Router)
- **Packages:** `packages/shared` (types, constants)
- **DB:** Supabase (PostgreSQL + Auth + RLS)

## Key Patterns

### Routing

- `(app)/` — authenticated route group (has Navbar)
- `(auth)/` — unauthenticated route group (no Navbar)
- `/` — public landing page
- `/dashboard` — authenticated dashboard (redirects from `/` if logged in)

### Auth Flow

- Middleware redirects `/` → `/dashboard` if logged in
- Middleware redirects `/login`, `/register` → `/dashboard` if logged in
- Logout redirects to `/` (landing page)
- Protected routes: `/dashboard`, `/trips/*`

### State Management

- **Zustand:** UI state only (`authStore`, `tripStore`)
- **React Query:** Server state (trips, places CRUD)
- Auth state synced via `onAuthStateChange` listener in `AuthProvider`

### Supabase

- Singleton browser client (`lib/supabase/client.ts`)
- Server client for SSR (`lib/supabase/server.ts`)
- RLS policies on both `trips` and `places` tables
- All inserts must include `user_id`

### Styling

- Tailwind CSS 3 with custom warm palette
- `tailwind-variants` for component variants
- CSS utility classes in `globals.css`: `btn-primary`, `btn-secondary`, `input-warm`, `card-warm`
- No dark mode (hardcoded warm colors)

### Forms

- React Hook Form + Zod validation
- Raw `<input>` elements with `input-warm` class (not shadcn/ui)
- PlaceForm uses custom Dialog component

### Shared Package

- Raw TypeScript source (no build step)
- Next.js `transpilePackages` handles transpilation
- Exports: `Category`, `Place`, `Trip`, `DayGroup`, `CATEGORY_LABELS`, `CATEGORY_COLORS`

## File Conventions

- Components: `src/components/{category}/{name}.tsx`
- Hooks: `src/hooks/use{Entity}.ts` (React Query)
- Stores: `src/stores/{name}Store.ts` (Zustand)
- Pages: `src/app/{route}/page.tsx`
- UI primitives: `src/components/ui/{name}.tsx`

## Commands

```bash
pnpm dev:web          # Start dev server
pnpm build:web        # Production build
pnpm lint             # ESLint
pnpm typecheck        # TypeScript check
pnpm format           # Prettier
```

## Database Schema

### trips

- `id` (UUID PK), `user_id` (FK auth.users), `nome`, `destino`, `data_inicio`, `data_fim`, `created_at`

### places

- `id` (UUID PK), `trip_id` (FK trips), `nome`, `lat`, `lng`, `categoria`, `data`, `hora_entrada`, `hora_saida`, `visitado`, `ordem`, `notas`, `created_at`

## Design Reference

Prototypes in `pencil/minha-viagem.pen`. Open in Pencil app to view.

## Common Gotchas

1. **Auth redirects:** Don't add page-level `useEffect` redirects — middleware handles it
2. **Supabase client:** Always use singleton `createClient()` from `lib/supabase/client.ts`
3. **RLS inserts:** Must include `user_id` in insert mutations
4. **Env vars:** Must restart dev server after `.env.local` changes
5. **Next.js build:** Fails without `.env.local` (env vars required at build time)
6. **Zustand stores:** Only for UI state — use React Query for server data
7. **Category colors:** Use `CATEGORY_COLORS` from shared — don't hardcode

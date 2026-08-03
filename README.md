# kzamanbd portfolio

Personal portfolio and resume site for **MD Kamruzzaman**, Full Stack Software Engineer.
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript, with Firebase-backed
short URLs.

Extracted from the `draftscripts` monorepo into a standalone project; the shared
metadata, social icons, theme provider and class helpers that used to come from
`@repo/shared` now live under `src/lib` and `src/components`.

## Requirements

- Node 22+
- pnpm 10+

## Commands

```bash
pnpm install

pnpm dev            # dev server (Turbopack)
pnpm dev:https      # dev server over HTTPS
pnpm build          # production build
pnpm start          # serve the production build

pnpm lint           # eslint, zero warnings allowed
pnpm check-types    # tsc --noEmit
pnpm format         # prettier --write .
```

## Environment

Copy `.env.example` to `.env.local` and fill in the Firebase client config. The
`NEXT_PUBLIC_*` values are shipped to the browser by design (the Firebase client
SDK needs them); access is governed by Firestore security rules, not secrecy.

```bash
cp .env.example .env.local
```

## Hosting

**This app is server-rendered and cannot be hosted on GitHub Pages.** It uses
API route handlers (`src/app/api/*`), Server Actions (`src/app/shorturl/actions.ts`)
and a dynamic redirect route (`src/app/shorturl/[code]`), none of which survive a
static export. Deploy to Vercel (or any Node host) and point the domain there.

The repository keeps its `kzamanbd.github.io` name for continuity; the GitHub
Pages workflow that used to build the old Vite site has been replaced by a CI
workflow that lints, type-checks and builds.

## Layout

```
src/
  app/            routes only: pages, layouts, metadata routes, API handlers
    api/          route handlers
    resume/       on-site resume (print friendly)
    shorturl/     Firebase-backed short links + [code] redirect
    plugins/      plugin landing pages
  components/
    animations/   animated underline, shiny text
    backgrounds/  grid and dot backdrops
    common/       section heading, tag, spotlight primitives
    home/         home page sections, each with its own contents.ts
    icons/        social icons
    layout/       navbar, footer, theme controls, scroll sync
    resume/       resume building blocks
  lib/            site metadata and shared types
  utils/          pure helpers (cn, firebase, jsonLd, formatting)
```

## Conventions

- Prettier: 4-space indent, single quotes, no trailing commas, `printWidth` 100,
  `bracketSameLine`, and **CRLF** line endings. `prettier-plugin-tailwindcss`
  sorts class names.
- Kebab-case component files, camelCase utilities.
- Import with the `@/` alias rather than relative paths.
- `src/app/` holds routing concerns only; components live in `src/components/`.

# kzamanbd portfolio

Personal site for **Md Kamruzzaman**, Software Engineer: portfolio, technical
articles, an on-site resume and a Firebase-backed URL shortener. Live at
[kzaman.com](https://kzaman.com).

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript 6.

## Features

- **Home page**: hero, about, skills, projects and contact sections. Cards share
  a cursor spotlight ("glow") treatment, and the hero's grid lights up under the
  pointer.
- **Articles**: Markdown in `content/articles/`, rendered with marked + shiki
  (alerts, footnotes, emoji, Mermaid and interactive flow diagrams), with series,
  related posts, reading time, tag filtering, full-page search and a Cmd+K palette.
  Exposed as RSS (`/feed.xml`), Atom (`/atom.xml`) and JSON Feed (`/feed.json`).
- **Generated covers**: each article's cover gradient is derived from its slug,
  so the card, page wash and OpenGraph image always match without stored assets.
- **Resume**: `/resume`, laid out as an A4 sheet and styled for print.
- **Short URLs**: `/shorturl`, backed by Firestore, with a dynamic `[code]` redirect.
- **Contact form**: posts to `/api/contact`, which validates, rate-limits and
  delivers through Resend.
- **PWA**: Serwist service worker, offline shell, and an update toast that detects
  a newer deploy through `/version.json`.
- **Light/dark themes** with cross-fading background tokens.
- **Article editor** (development only): `/studio/article-editor`.

## Requirements

- Node 22+
- pnpm 10+

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev
```

## Commands

```bash
pnpm dev            # dev server (Turbopack)
pnpm dev:https      # dev server over HTTPS (for PWA / OG testing)
pnpm build          # production build (webpack, see below)
pnpm start          # serve the production build

pnpm lint           # eslint, zero warnings allowed
pnpm check-types    # tsc --noEmit
pnpm format         # prettier --write src
pnpm format:check   # prettier --check src
```

`pnpm build` runs `next build --webpack` on purpose: `@serwist/next` is a webpack
plugin and does nothing under Turbopack, which would ship a build with no `sw.js`.

There is no test suite. CI (`.github/workflows/ci.yml`, Node 22 / pnpm 10) runs
lint, format check, type-check and build.

## Environment

See `.env.example` for the full list.

| Variable                          | Required | Notes                                                                 |
| --------------------------------- | -------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_*`          | yes      | Firebase client config. Public by design; Firestore rules govern access. |
| `RESEND_API_KEY`                  | yes      | **Secret.** Read only by `/api/contact`. Never prefix it `NEXT_PUBLIC`. |
| `CONTACT_FROM_EMAIL`              | no       | Sender on a Resend-verified domain. Without it, Resend's sandbox only delivers to the account owner. |
| `CONTACT_TO_EMAIL`                | no       | Where submissions go; defaults to the address published on the site.  |
| `NEXT_PUBLIC_SITE_URL`            | no       | Canonical site URL, used by metadata and `robots.ts`.                 |
| `NEXT_PUBLIC_SITEMAP_URL`         | no       | Sitemap URL advertised in `robots.txt`.                               |

## Writing an article

Add `content/articles/NN-<slug>.md`. The `NN` prefix sets ordering only and is
stripped from the URL (`/articles/<slug>`).

```yaml
---
title: 'Your cron ran twice'
description: 'One or two sentences for cards, feeds and meta tags.'
date: '2026-07-23' # required; the build fails on a missing or invalid date
updated: '2026-08-01' # optional
tags: [Scheduling, Reliability]
category: 'Reliability' # optional
difficulty: 'Intermediate' # Beginner | Intermediate | Advanced
tech: [cron, PostgreSQL]
learn:
    - What the reader takes away
cover: '/images/articles/cover.webp' # optional; a gradient is generated otherwise
series: { name: 'Series name', order: 1 } # optional
draft: true # optional; drafts are excluded
---
```

The full contract lives in `src/services/article-schema.ts`.

## Hosting

**The app is server-rendered and cannot be hosted on GitHub Pages.** It needs a
Node host for the API route handlers (`src/app/api/*`), the Server Actions in
`src/app/(site)/shorturl/actions.ts` and the dynamic short-URL redirect. Deploy to
Vercel or any Node host. The repository keeps its `kzamanbd.github.io` name for
continuity only.

## Project layout

```
content/articles/   Markdown articles
docs/               SEO audits and checklists
public/             static assets, offline shell, PWA icons
src/
  app/              routes only: pages, layouts, metadata routes, API handlers
    (site)/         routes that share the navbar and footer
    api/            route handlers (articles, contact, ...)
    resume/         print-first resume, outside the site chrome
    sw.ts           service worker source
  components/       every component, grouped by area
    articles/       article page, cards, search palette, diagrams, editor
    home/           home page sections, each with its own contents.ts
    layout/         navbar, footer, theme controls
    common/         shared primitives (section heading, tag, spotlight)
    ui/             button, input, textarea, spinner
    pwa/            update toast, network status
  config/           route-scoped fonts
  services/         I/O and subsystems: posts, markdown, feeds, contact, metadata
  utils/            small pure helpers
```

## Conventions

- Prettier: 4-space indent, single quotes, no trailing commas, `printWidth` 100,
  `bracketSameLine`, and **CRLF** line endings. `prettier-plugin-tailwindcss`
  sorts class names.
- Kebab-case file names. Imports use the `@/` alias, never relative paths.
- `src/app/` holds routing concerns only. Components live in `src/components/`,
  which never imports from `src/app/`.
- Class names compose with [`cn`](https://github.com/shadcn-ui/cn)
  (`import { cn } from 'cn'`).
- Pages are server components. Interactive pieces are extracted into small
  `'use client'` components.

See `CLAUDE.md` for the deeper architecture notes.

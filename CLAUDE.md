# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev            # dev server (Turbopack)
pnpm dev:https      # dev server over HTTPS (for testing PWA/OG features)
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint           # eslint, --max-warnings 0
pnpm check-types    # tsc --noEmit
pnpm format         # prettier --write .
```

There is **no test suite and no test runner**. CI (`.github/workflows/ci.yml`) runs
lint, check-types and build on Node 22 / pnpm 10; treat those three as the gate.

`pnpm build` runs `next build --webpack`, not Turbopack, and that is deliberate:
`@serwist/next` is a webpack plugin and is a silent no-op under Turbopack, which
would produce a build with no `sw.js` and an inert PWA.

## Runtime model

The app is **server-rendered and cannot be statically exported** (so not GitHub
Pages, despite the repository name). Route handlers under `src/app/api/*`, the
Server Actions in `src/app/shorturl/actions.ts`, and the dynamic
`src/app/shorturl/[code]` redirect all need a Node host. Most other routes still
prerender; check the route table printed by `pnpm build` before assuming a page
is static.

Secrets vs public config: `NEXT_PUBLIC_*` values reach the browser by design (the
Firebase client config is public; Firestore rules govern access). `RESEND_API_KEY`
is an account secret and is read **only** by `src/app/api/contact/route.ts` through
`src/lib/contact/config.ts`, which is server-only and must never be imported from a
client component.

## Architecture

### Routing / component boundary

`src/app/` holds routing concerns only: pages, layouts, metadata routes
(`sitemap.ts`, `robots.ts`, `manifest.ts`), API handlers, `globals.css`. Every
component lives in `src/components/`, and `src/components/` never imports from
`src/app/`. Data a route owns sits beside it (`src/app/(site)/now/contents.ts`,
`src/app/resume/contents.ts`); data a self-contained component owns sits in a
`contents.ts` inside that component's folder (`src/components/home/*/contents.ts`).
When a route's data and its components share types, the types go in a `types.ts`
in the component folder so both sides can import them without crossing the boundary.

Files are kebab-case; imports always use the `@/` alias, never relative paths.

The root layout owns only what every route needs — `<html>`/`<body>`, the theme
providers, the page wash, analytics. The navbar and footer live one level down in
`src/app/(site)/layout.tsx`, so a route opts out of the site chrome by sitting
outside that group; `/resume` is the one that does, because it is printed rather
than browsed. `error.tsx` and `not-found.tsx` stay at the app root (Next only
honours a global not-found there) and therefore render the navbar and footer
themselves.

### Article pipeline

Markdown in `content/articles/NN-<slug>.md` (the `NN` ordering prefix is stripped
for the URL) flows through:

- `src/lib/article-schema.ts` — the frontmatter contract. Deliberately node-free
  (no `fs`/`path`) so client components can import it.
- `src/lib/posts.ts` — reads and caches the files, excludes `draft: true`, derives
  reading time, series and related posts. It **throws on a missing or malformed
  `date:`**, naming the file, because an invalid date would otherwise surface as
  an `Invalid Date` deep inside feed or sitemap serialisation.
- `src/lib/markdown.ts` — marked + shiki, with custom inline extensions
  (`==mark==`, `~sub~`, `^sup^`), alerts, footnotes and emoji. It also stamps
  `spotlightSurfaceAttribute` onto code blocks and tables so the cursor spotlight
  works inside article bodies.
- `src/lib/feed.ts` feeds `/feed.xml`, `/atom.xml`, `/feed.json`.

Cover art is **not** stored: `src/utils/article-cover.ts` hashes the slug into a
deterministic gradient pair, which the card, the page wash and the OG image
(`src/app/articles/[slug]/opengraph-image.tsx`) all read, so they can never
disagree.

### Theming and the design system

`src/app/globals.css` is the only place for global concerns: theme tokens, the
`focus-ring` utility, shared keyframes. Component-specific CSS goes in a
co-located CSS Module.

- `next-themes` writes a `dark` class on `<html>`; tokens flip on `:root` / `.dark`.
- The background tokens are registered with `@property`, which is what makes a
  theme switch **cross-fade** rather than snap. Text colours are deliberately left
  unregistered so they snap instantly.
- `main.home-sections > section` gets a per-section accent swell cycling through
  four tints, so a section added to the home page is tinted automatically. It is
  scoped to `.home-sections` so inner pages stay flat.
- Inner pages instead get a full-page wash from
  `src/components/backgrounds/page-gradient/`, whose colour is derived from the
  route. A page can claim its own colours by rendering `SyncPageGradient` (article
  pages feed it their cover gradient).

Fonts are **route-scoped on purpose** (`src/config/fonts.ts`, `src/config/mono-font.ts`):
Noto Sans is global, Zain is applied only on the hero element, and JetBrains Mono
lives in its own module so it ships only where its variable is applied (article
routes). Adding a font to `fonts.ts` puts it on every route, because the root
layout imports that module.

### The spotlight / glow system

The site's signature card treatment. The contract:

1. Wrap a group in `SpotlightList` (a `<ul>`) or `SpotlightGroup` (a `<div>`) —
   these are the only client components involved, holding one delegated
   `pointermove` listener for the whole group.
2. Spread `spotlightSurfaceProps` on each surface. It is an explicit attribute
   rather than a tag match because a surface can itself contain list items.
3. The surface's CSS module reads `--pointer-x` / `--pointer-y` and fades its
   layers in on `:hover`.

The hook writes those properties straight to inline style once per frame and never
through React, so the cursor path causes no re-render, and the surfaces themselves
stay server components. `src/components/common/glow-card.module.css` is the shared
rest-and-bloom treatment; sections with their own tuning (project cards, skill
tiles, facet cards, the contact panel) each carry a local module.

### Contact form

`src/lib/contact/` is a vendor-agnostic `ContactProvider` contract. The active
provider is one line in `src/lib/contact/index.ts`; the form, its hook and its UI
depend only on the contract, so swapping delivery never touches them. The current
provider POSTs to `/api/contact`, which is where the Resend SDK actually runs.

The route does the work the browser cannot be trusted with: trims and length-caps
each field, validates, escapes the sender's text out of the email body, sets
`replyTo` to the sender, and applies a small in-memory per-IP rate limit (there is
no captcha in front of the form). Resend's sandbox sender only delivers to the
Resend account's own address; sending anywhere else needs a verified domain and
`CONTACT_FROM_EMAIL`.

### PWA and update detection

`next.config.ts` bakes a fresh ISO timestamp into `NEXT_PUBLIC_BUILD_TIME` each
build; `src/lib/version.ts` and the `/version.json` route expose it. A running tab
compares its baked value against the deployed one to detect a newer deploy — git
plays no part, so it behaves the same locally and in CI. The service worker
(`src/app/sw.ts`) registers manually rather than automatically, so the update toast
can drive the waiting-worker swap instead of a new build taking over an open tab.

### Search

`/articles/search` is a full page over server-passed summaries. The Cmd+K palette
(`src/components/articles/search-palette/`) instead fetches the corpus from
`/api/articles` the first time it opens, cached in a module-level promise, so the
archive is not serialised into every page.

## Conventions that bite

- **Prettier: CRLF line endings**, 4-space indent, single quotes, no trailing
  commas, `printWidth` 100, `bracketSameLine`. Config lives in `package.json`.
  Reformatting a file with different settings produces a whole-file diff.
- `noUncheckedIndexedAccess` is on: indexing an array yields `T | undefined`.
- Pages are server components by default. Passing an inline `onClick` from one
  fails the **build**, not the dev server — extract a `'use client'` component
  (see `src/components/resume/print-button.tsx`).
- `next/image`: declare the source file's real aspect ratio and set both CSS
  dimensions. Inside a flex row also add `shrink-0`, or the image gets squeezed a
  pixel or two and Next warns that the rendered box no longer matches the ratio.

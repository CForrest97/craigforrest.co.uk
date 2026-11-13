# Project Agent Instructions

Shared conventions for any AI coding agent working in this repo (Codex, Claude Code, or others). Keep this file concise and focused on practical development guidance.

## Build & test

`npm install`, `npm run dev`, `npm run check` (typecheck), `npm run format:check` (Prettier), `npm run build`, `npm run preview`. See [README.md](README.md#development).

## Conventions

Astro (`.astro` components/pages) with TypeScript. Repeated content (project cards, contact links) is plain typed TS data under `src/data/`, not Zod-validated. Prefer `type` over `interface`. Formatting is enforced by Prettier (`npm run format`); don't hand-format.

Use the host's native interactive questioning tool when it is available and appropriate.

## Where things live

- `src/pages/` — Astro pages.
- `src/components/` — reusable Astro components.
- `src/data/` — typed project and contact content.
- `src/styles/` — global styles and design tokens.
- `public/` — static assets and Cloudflare Pages headers.
- `infra/` — OpenTofu configuration; see the [deployment guide](infra/README.md).
- `.github/workflows/` — validation, deployment, and infrastructure workflows.

# 0001. Use Astro as the build tool and framework

Status: Accepted
Date: 2026-08-11

## Context

Initiative [0001-build-website-foundation](../product/initiatives/0001-build-website-foundation/spec.md) requires a locally buildable, single-page TypeScript site with no backend or runtime API. The product overview constrains the wider product to TypeScript throughout, near-£0 running costs, and Cloudflare and/or AWS static hosting. The overview's later content pillars (Thoughts articles, project case studies) are not in scope for this initiative but are the expected next initiatives.

## Decision

Use [Astro](https://astro.build) as the build tool and framework. Pages and components are authored as `.astro` files with TypeScript; Astro ships zero JS by default and outputs a static site suitable for any static host.

## Alternatives considered

- **Vite + vanilla TypeScript** — smaller dependency surface and no framework conventions to learn, but pushes templating, routing, and content-collection concerns onto hand-written code that Astro provides out of the box. Rejected because the near-term roadmap (articles, case-study pages) is exactly what Astro is designed for, so adopting it now avoids a migration later.
- **Plain `tsc` + `esbuild`** — maximum minimalism, but the team would own the dev server, asset pipeline, and templating from scratch. Rejected as more plumbing than the product needs to maintain.

## Consequences

- Adds Astro and its toolchain as a project dependency and introduces `.astro` file conventions alongside plain TypeScript.
- Future initiatives adding articles or case-study pages can use Astro's content collections and file-based routing rather than introducing new tooling.
- The build output remains static HTML/CSS/JS, compatible with Cloudflare Pages or an S3/CloudFront-style AWS static hosting setup, so this decision does not constrain later hosting choices.

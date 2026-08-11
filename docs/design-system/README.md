# Design system reference

Source of truth: Craig Forrest — Design System, a Claude-created design-system project at
`https://claude.ai/design/p/66ad62b1-716f-4ac2-b40c-3807ec93f1ce`. This directory is a snapshot of the
tokens needed to implement initiative [0001-build-website-foundation](../product/initiatives/0001-build-website-foundation/spec.md);
it is not a copy of the whole project. Re-fetch from the design project if tokens change.

## What's here

- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — the CSS custom properties the
  implementation is built against.

## What's deliberately not copied

The design project's `ui_kits/website/` sample (`index.html` / `App.jsx`) is a React-in-browser prototype
(CDN React, Babel-in-browser) meant for visual review inside the design tool, not production code. The
Astro implementation reproduces its visual hierarchy, components, and interaction states using these
tokens, rather than vendoring that prototype markup.

## Palette, type, and voice notes (from the design project's own readme)

- Two-colour system: teal (`--color-accent`) as the single accent, warm-neutral "paper" backgrounds, ink-grey
  text. Muted rust exists only as a sparing highlight/callout accent. No gradients.
- Serif display (Newsreader) for headings, sans (Public Sans) for UI/body, mono (IBM Plex Mono) for
  metadata, dates, and nav-adjacent labels. Sentence case throughout; no all-caps except small tracked-wide
  mono labels.
- 1px hairline borders (`--color-border`) are the primary separator; shadows are earned by hover only, never
  static decoration.
- Minimal motion: 120–200ms ease transitions on colour/border/shadow only.
- Single-column layout, ~760px content max-width.
- Voice: first person, technical and precise, concrete numbers over vague claims, no marketing adjectives,
  no emoji.

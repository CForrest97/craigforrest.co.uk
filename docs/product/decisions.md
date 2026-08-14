# Product Decision Log

<!-- Append-only. Never edit past entries — add a new one if a decision is reversed.

## YYYY-MM-DD — Example entry

**Decision:** what was decided
**Why:** the reasoning
**Alternatives considered:** what else was on the table -->

## 2026-08-14 — Retain IBM Plex Mono with one static face per family

**Decision:** Retain IBM Plex Mono 400 for metadata and labels. Load only Newsreader 600, Public Sans 400,
and IBM Plex Mono 400, allowing the browser to synthesise medium and semibold weights where required.

**Why:** IBM Plex Mono materially reinforces the site's developer-oriented visual identity. Its approximately
15 KB payload is worthwhile, while limiting each family to one static face still reduces the production font
payload from approximately 94 KB across six files to approximately 53 KB across three files.

**Alternatives considered:** Use only Newsreader and Public Sans for an approximately 39 KB payload, which
would make the design feel less distinctive; restore all genuine static weights, which would recover exact
typography but lose the variant reduction.

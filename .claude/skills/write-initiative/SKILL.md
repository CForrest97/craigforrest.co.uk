---
name: write-initiative
description: Use when starting a new product initiative, feature, or writing a PRD/brief/spec.
---

# Write Initiative

1. Check `docs/product/decisions.md` and `docs/adr/README.md` first; surface any conflicting or answering decision.
2. Pick structure by decision weight, not write-up length: if it's the first initiative, sets initial architecture/stack, or implies multiple ADR-worthy decisions, use the complex form — `NNNN-<name>/{brief,prd,spec}.md` from the matching templates, no `README.md` alongside. Otherwise use the simple form — `NNNN-<name>/README.md` from `_template.md`. Ask the user if unsure; don't default to simple.
3. Add a row to `docs/product/initiatives/README.md`.

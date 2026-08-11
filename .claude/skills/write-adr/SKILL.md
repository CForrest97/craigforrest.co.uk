---
name: write-adr
description: Use when the user asks to write, draft, or record an Architecture Decision Record (ADR), or document an architectural/technical decision.
---

# Write ADR

1. Read `docs/adr/README.md` to find the next sequential number and check whether a related/conflicting ADR already exists.
2. Copy `docs/adr/_template.md` to `docs/adr/NNNN-short-title.md`.
3. Fill in Context / Decision / Alternatives considered / Consequences. Keep it to half a page to a page — this is a record, not an essay.
4. Add a row to the table in `docs/adr/README.md` (number, title, status "Accepted" or "Proposed", date).
5. If this ADR reverses or replaces an earlier one, set the old ADR's status to `Superseded by ADR-NNNN` — never edit its content.

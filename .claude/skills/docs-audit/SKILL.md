---
name: docs-audit
description: Use when the user asks to audit, review, or check the health of the documentation. Run periodically, not automatically.
---

# Docs Audit

Flag, don't fix automatically:

1. ADRs in `docs/adr/` with no status set.
2. `docs/architecture.md` and `docs/product/overview.md` with no "Last reviewed" date, or one older than ~6 months.
3. Initiatives in `docs/product/initiatives/` untouched for a long stretch relative to their apparent activity elsewhere in the repo.

Report findings as a list; let the user decide what to update.

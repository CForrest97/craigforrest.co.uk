---
name: check-decisions
description: Use before proposing or implementing changes to architecture, dependencies, data storage, API design, or product scope. Checks for conflicting past decisions before proceeding.
---

# Check Decisions

1. Search `docs/adr/README.md` and the ADR files for anything related to the current proposal.
2. Search `docs/product/decisions.md` for related product decisions.
3. If something conflicts with or already answers the current request, surface it explicitly before proceeding — don't silently override a past decision.
4. If nothing relevant exists, report that the decision is not yet recorded. The absence of a decision is not approval to choose silently; continue through the repository's discovery, approval, and readiness workflow.

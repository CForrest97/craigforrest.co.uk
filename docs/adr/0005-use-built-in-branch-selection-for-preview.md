# 0005. Use GitHub's built-in branch selection for preview

Status: Accepted
Date: 2026-08-14

## Context

ADR-0004 introduced a manually dispatched preview workflow with a custom revision input so a maintainer could preview a branch, tag, or commit SHA. GitHub's workflow dispatch interface already includes a branch selector for choosing the revision containing the workflow. The additional input makes branch previews require two choices and creates ambiguity about which selection controls the deployment.

## Decision

Use GitHub's built-in workflow branch selector as the only revision choice for manual preview deployments. The checkout step uses the commit selected by the dispatch event. Preview deployments no longer accept a separate tag or commit SHA.

All other application and infrastructure isolation decisions from ADR-0004 remain in effect.

## Alternatives considered

- **Retain the custom revision input** — preserves tag and commit SHA previews, but keeps the confusing duplicate choice for the usual branch workflow.
- **Ignore the built-in branch selector and label the custom input more clearly** — cannot remove GitHub's selector and still presents two revision-related controls.
- **Add separate workflows for branches and arbitrary revisions** — retains flexibility at the cost of unnecessary workflow and maintenance overhead for a single maintainer.

## Consequences

Starting a preview requires one branch choice, and the selected branch supplies both the workflow definition and deployed revision. Direct tag and commit-SHA previews are no longer available; a commit must be present on a branch to be previewed. Preview infrastructure, state ownership, validation, and deployment behaviour are otherwise unchanged.

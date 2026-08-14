# 0004. Use a manually selected application and infrastructure preview

Status: Superseded by ADR-0005
Date: 2026-08-14

## Context

[ADR-0003](0003-cloudflare-pages-hosting.md) selects repository-controlled Cloudflare Pages Direct Upload and OpenTofu-managed infrastructure. A single maintainer needs a stable preview URL for an explicitly selected revision, including preview-safe infrastructure changes, without Cloudflare's Git integration or collaboration-oriented branch and label automation.

Production and preview share the `craigforrest.co.uk` Cloudflare zone. Some zone settings and ruleset phases have singleton ownership and therefore cannot be safely managed by two independent OpenTofu states.

## Decision

Provide one manually dispatched Preview workflow accepting a Git branch, tag, or commit SHA. It creates a saved preview plan and applies it only when OpenTofu reports changes, then validates, builds, and uploads the same revision.

Use a reusable Pages module with peer production and preview roots under `infra/environments`. Their `main.tf` entry points are identical and differ only through environment input defaults. Production retains `site.tfstate` and owns the live Pages project, apex/`www` DNS, and explicitly separated shared-zone resources in `zone.tf`, including settings and redirects. Preview uses `preview.tfstate` and owns a separate `craigforrest-co-uk-preview` Pages project, `preview.craigforrest.co.uk`, and its DNS record. Both state objects share the existing R2 bucket. Each root has its own provider lock file, reads Cloudflare authentication from `CLOUDFLARE_API_TOKEN`, and applies only a freshly saved plan.

Ship the preview hostname's `X-Robots-Tag: noindex` policy in the Pages deployment artefact through `public/_headers`. Its absolute hostname pattern applies the header only to `preview.craigforrest.co.uk`. This application-owned configuration avoids claiming the zone's singleton response-header transform phase and allows other applications in the zone to manage their own Pages headers independently.

Relinquish the former production-state response-header ruleset address non-destructively if it was ever applied. The zone owner must reconcile any surviving live entry-point rule so this application repository cannot delete unrelated rules from a shared phase.

## Alternatives considered

- **PR labels and a long-lived preview branch** — useful for a team combining several PRs, but unnecessary workflow and conflict-management overhead for one maintainer.
- **Apply the selected revision to production state** — would test all infrastructure but could mutate the live site before review.
- **Duplicate the entire stack in the existing zone** — is unsafe because two states would compete for singleton zone resources.
- **Use a separate test zone** — provides complete isolation but requires another domain or delegated zone and additional credentials.
- **Manage preview `noindex` through a zone response-header transform rule** — would couple an application concern to the zone's singleton phase entry-point ruleset and require coordinated ownership with every other application using that phase.

## Consequences

The preview hostname follows the latest successful manual deployment, and failed runs leave the previous version live. Environment-scoped Pages and DNS changes can be exercised safely before production. Zone settings, redirects, and shared ruleset changes remain production-only and may yield no preview plan changes. The preview header policy changes with the selected application revision and does not mutate production infrastructure. The module refactor requires state-preserving moved declarations and careful review of the first production plan.

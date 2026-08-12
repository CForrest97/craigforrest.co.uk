# 0002. Deploy site to craigforrest.co.uk — Specification

Status: Approved
Date: 2026-08-11

## Context

The site is an Astro/TypeScript static site (see [ADR-0001](../../../adr/0001-astro-build-tooling.md)) that currently builds and runs only locally. Cloudflare is the domain registrar for `craigforrest.co.uk` and already manages DNS (CNAMEs), but no hosting target is connected. The product overview constrains running costs to under £5/month (target ~£0/month) and requires hosting on Cloudflare and/or AWS.

Craig has indicated a preference for Cloudflare Pages as the hosting target, with automated CI/CD deploys on push to main, but this has not yet been recorded as an accepted architectural decision.

## Proposed approach

After this initiative is approved and its required architecture decisions are accepted:

- provision Cloudflare Pages (or the accepted alternative) as the hosting target for the Astro static build;
- connect the Pages project's git integration to this repository so pushes to main trigger a build and deploy;
- configure Cloudflare DNS so `craigforrest.co.uk` (and `www.craigforrest.co.uk` if used) points at the Pages deployment, with one canonical hostname and a redirect from the other;
- enable/verify HTTPS (Cloudflare-managed) and HTTP→HTTPS redirection;
- document the pipeline (how a deploy happens, how to roll back, how to change DNS or hosting config) in the repository.

## Interfaces and data

- Cloudflare account/dashboard: DNS records and Pages project configuration.
- Git repository: source of truth for the build; Pages' git integration polls/receives pushes to main.
- No application-level APIs, databases, or third-party runtime integrations are introduced.

## Delivery considerations

- Readiness gates: this initiative is approved, and the hosting-target ADR is accepted.
- A required ADR must record the hosting target decision (Cloudflare Pages vs. AWS S3/CloudFront vs. other), since this is a consequential, hard-to-reverse choice affecting cost, DNS, and deploy workflow.
- Verification: deploy a test commit and confirm it appears live; confirm HTTPS and redirect behaviour from an external network; confirm cost stays within constraint (Cloudflare Pages free tier covers this site's scale).
- Rollback: rely on the hosting target's built-in deployment history/rollback (e.g. Cloudflare Pages' previous-deployment promotion) rather than building custom tooling.
- No database, migration, or backend service is introduced, so there is no data migration risk.

## Risks and open questions

- Hosting target is not yet recorded as an ADR — needed before implementation (Craig has expressed a preference for Cloudflare Pages).
- DNS cutover risk: changing CNAME/A records for a domain with existing Cloudflare configuration should be verified in a low-risk window in case of propagation delays or misconfiguration.
- If `www` is adopted as a hostname alongside the apex domain, the canonical-vs-redirect choice should be settled during implementation rather than left ambiguous.

## Related decisions

A new ADR is required to select the hosting target and deployment mechanism before implementation begins. See the [ADR index](../../../adr/README.md). Product scope remains governed by the [product overview](../../overview.md) and [product decision log](../../decisions.md).

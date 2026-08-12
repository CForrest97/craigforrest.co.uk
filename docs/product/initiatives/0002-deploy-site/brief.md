# 0002. Deploy site to craigforrest.co.uk — Brief

Status: Approved
Date: 2026-08-11

## Intended outcome

Make the site publicly accessible at `craigforrest.co.uk` over HTTPS, built and deployed automatically from the repository, so future content and feature work ships without a manual deployment step.

## Rationale

[Initiative 0001](../0001-build-website-foundation/brief.md) deliberately excluded deployment, domain configuration, and HTTPS from its scope so the design and page structure could be validated first. That foundation now exists. Craig wants the site live now rather than continuing to build features against a local-only site. Cloudflare already holds the domain registration and manages DNS (CNAMEs), but no hosting target or deployment pipeline is connected to it yet.

## Scope

Included:

- selecting and provisioning a hosting target for the built Astro site;
- connecting `craigforrest.co.uk` (and any required subdomain, e.g. `www`) to that hosting target via Cloudflare DNS;
- HTTPS for the live domain;
- an automated deploy pipeline that builds and publishes the site on push to the main branch;
- documenting the deployment setup and how to operate it.

Excluded:

- new page content, features, or design changes — this initiative deploys the existing foundation as-is;
- the thoughts/blog section or any feature not already built;
- monitoring, alerting, or analytics tooling beyond what the hosting target provides by default;
- a staging/preview environment, unless trivially provided by the chosen hosting target's default workflow.

## Success measures

- `https://craigforrest.co.uk` serves the current site to a public visitor.
- HTTP requests and the bare domain redirect to the canonical HTTPS URL.
- A push to the main branch results in the live site updating without manual intervention.
- Running costs remain within the product overview's £5/month ceiling (target ~£0/month).

## Stakeholders

- Craig Forrest — product owner, approver, and operator of the deployed site.

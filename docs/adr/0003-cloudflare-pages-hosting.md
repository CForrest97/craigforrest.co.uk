# 0003. Host on Cloudflare Pages, deployed via GitHub Actions

Status: Accepted
Date: 2026-08-11

## Context

[Initiative 0002](../product/initiatives/0002-deploy-site/spec.md) requires the Astro static site ([ADR-0001](0001-astro-build-tooling.md)) to be publicly reachable at `craigforrest.co.uk` over HTTPS, deployed automatically on push to main, within the product overview's near-£0/month cost constraint. Cloudflare already holds the domain registration and manages DNS. The product overview scopes hosting to Cloudflare and/or AWS. Infrastructure is provisioned with OpenTofu, the project's default IaC tool, rather than clicked together in the Cloudflare dashboard.

## Decision

Host the site on Cloudflare Pages, but drive both provisioning and deploys explicitly rather than through Pages' built-in git integration:

- OpenTofu ([`infra/`](../../infra/)) provisions the Cloudflare Pages project, custom domains, DNS records, and zone settings (HTTPS enforcement, `www`→apex redirect). The Pages project has no connected git `source` — Cloudflare does not build or deploy on its own.
- Both provisioning and deploys run as GitHub Actions workflows, not from a developer's machine: the `Deploy` workflow runs on push to `main` (install dependencies, `npm run build`, then `wrangler pages deploy dist/`); the `Infra` workflow runs `tofu plan` on pull requests touching `infra/**` and `tofu apply` automatically on push to `main` touching `infra/**`. No production credentials are held locally by default.
- Tofu state lives in a Cloudflare R2 bucket (S3-compatible backend) rather than a local file, since CI runners don't persist state between runs.
- Point `craigforrest.co.uk` at the Pages deployment via Cloudflare DNS, with Cloudflare-managed HTTPS and HTTP→HTTPS redirection.

## Alternatives considered

- **Cloudflare Pages' native git integration** (original decision) — Cloudflare polls/receives the push and builds and deploys itself, with no GitHub Actions workflow to maintain. Simpler, but the build step lives in Cloudflare's dashboard config rather than as versioned workflow code in the repo, and provisioning (Tofu) and deployment (Cloudflare) become two separate, only loosely related mechanisms. Superseded by the GHA approach below for tighter control and a single place (the repo) that defines how the site is built and shipped.
- **AWS S3 + CloudFront** — viable within the product overview's hosting options, but requires assembling and maintaining a CDN, certificate (ACM), and cache-invalidation-on-deploy pipeline by hand. Rejected because it's materially more infrastructure to operate for the same outcome.
- **Other static hosts (Netlify, Vercel)** — comparable free-tier git-integrated static hosting, but would introduce a third-party account/provider outside Cloudflare and AWS, which the product overview doesn't scope to. Rejected as unnecessary given Cloudflare already manages the domain and DNS.

## Consequences

- DNS and hosting live in the same Cloudflare account, so no cross-provider handoff is needed for the domain-to-host connection.
- The build and deploy steps are explicit, versioned GitHub Actions workflow code, not implicit Cloudflare dashboard configuration — auditable and reviewable like any other change.
- Cloudflare API tokens and an R2 access key pair must be stored as GitHub Actions secrets for the workflows to authenticate; these are credentials to manage and rotate, which the pure git-integration approach didn't require. In exchange, no prod-capable credentials need to sit on a developer's machine.
- Infra changes apply automatically on merge to `main`, with no manual approval gate — a bad `infra/` change (e.g. a wrong DNS record) goes live as soon as it's merged, same as a bad app code change would.
- Rollback relies on Cloudflare Pages' built-in deployment history (promote a previous deployment) rather than custom tooling.
- Running cost is £0/month on Cloudflare Pages' free tier and GitHub Actions' free tier at this site's scale, within the product overview's constraint.
- Ties hosting to Cloudflare Pages and deployment to GitHub Actions; moving off either later would require re-provisioning hosting/DNS or rewriting the workflow, though the static build output itself remains portable.

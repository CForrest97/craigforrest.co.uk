# 0002. Deploy site to craigforrest.co.uk — Product Requirements

Status: Approved
Date: 2026-08-11

## User problem

Craig has a working local site foundation but nothing a visitor can reach. Engineering peers, recruiters, and potential collaborators need to be able to visit `craigforrest.co.uk` and see the current site, and Craig needs future changes to reach visitors without a manual publish step.

## User experience

A visitor navigates to `craigforrest.co.uk` (with or without `www`, with or without `https://`) and reliably lands on the live site over HTTPS with no certificate warnings or broken redirects. There is no visitor-facing interaction beyond what the existing page already offers.

Craig pushes a commit to the main branch and, within a few minutes, the change is visible on the live site without running any manual deploy command.

## Requirements

- The production build of the current site must be deployed to a public hosting target.
- `craigforrest.co.uk` must resolve to the deployed site via Cloudflare-managed DNS.
- The site must be served over HTTPS with a valid certificate; HTTP requests must redirect to HTTPS.
- Both the apex domain and `www` (if used) must resolve to the same site, with one canonical form and a redirect from the other.
- Deploys must run automatically from the repository's main branch (CI/CD), requiring no manual build-and-upload step for routine changes.
- The chosen hosting approach must keep running costs within the product overview's constraint (under £5/month, targeting ~£0/month).
- The deployment setup and operating instructions must be documented in the repository.

## Out of scope

- New content, pages, or features beyond what initiative 0001 already delivered.
- Staging/preview environments beyond what the hosting target provides by default for branch or PR builds.
- Monitoring, alerting, uptime checks, or analytics.
- Contact form backends or other runtime services.

## Acceptance criteria

- Visiting `https://craigforrest.co.uk` from an external network loads the current site with a valid HTTPS certificate.
- Visiting `http://craigforrest.co.uk` and the non-canonical `www`/apex form both redirect to the canonical HTTPS URL.
- A test commit pushed to main appears on the live site without a manual deploy action.
- The repository documents how the deployment pipeline works and how to make DNS or hosting changes in future.
- No recurring cost is introduced beyond the domain registration already in place, unless explicitly accepted and recorded.

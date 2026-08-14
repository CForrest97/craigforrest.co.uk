# 0003. Manual application and infrastructure preview

Status: Approved
Date: 2026-08-14

## Problem

The site has no stable environment for reviewing a chosen application revision and its safely isolated infrastructure changes before ordinary production deployment. Team-oriented PR labelling and integration-branch automation would add unnecessary overhead for a single maintainer.

## Requirements

- A manually dispatched workflow accepts a branch, tag, or commit SHA and deploys that exact revision to `preview.craigforrest.co.uk`.
- Preview uses a separate Cloudflare Pages project and persistent OpenTofu state.
- Each run creates a saved preview plan and applies it before the application only when OpenTofu reports infrastructure changes.
- The Pages deployment artefact applies `X-Robots-Tag: noindex` only to the public preview hostname.
- Failed checkouts, infrastructure applies, builds, or uploads leave the previous successful preview live.
- Production deployment and state ownership remain unchanged.

## Approach

Share an OpenTofu Pages module between peer production and preview roots while keeping their state and resource ownership independent. The existing zone constrains preview to Pages, custom-domain, and DNS resources; singleton zone settings and rules remain outside preview state. One manual GitHub workflow plans the selected revision's preview root, applies the saved plan when necessary, and uploads its static build with Wrangler. A hostname-scoped Pages `_headers` rule travels with that build, keeping preview indexing policy out of production and shared-zone infrastructure. The architecture is recorded in [ADR-0004](../../../adr/0004-shared-cloudflare-preview-environment.md).

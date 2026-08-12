# 0002. Represent repeated content as plain typed TypeScript data

Status: Accepted
Date: 2026-08-11

## Context

The spec for initiative [0001-build-website-foundation](../product/initiatives/0001-build-website-foundation/spec.md) requires the repeated project-card and contact-link content to be expressed through a content representation rather than duplicated presentation markup, without prescribing the representation ahead of an ADR. This data is authored in-repo by the site owner, not submitted by an external user or fetched from an untrusted source at runtime.

## Decision

Represent project cards and contact links as plain TypeScript data modules (e.g. `src/data/projects.ts`) exporting `const` arrays typed against TypeScript `interface`/`type` declarations. Presentation components iterate over this typed data. No runtime schema validation is applied to this data.

## Alternatives considered

- **Zod-validated data module** — wraps the same shape in a Zod schema, parsed at load time, with the TypeScript type derived via `z.infer`. Rejected for this data: it's authored directly in the repository and checked by the TypeScript compiler at build time, so it never crosses an untrusted boundary, and Zod's runtime validation would add a dependency and indirection without a corresponding guarantee it doesn't already have.

## Consequences

- Adding or editing a project or contact link means editing a typed TS literal; a shape mistake is caught by `tsc`/the editor, not at runtime.
- If a future initiative introduces content sourced from outside the repo (e.g. a CMS, user submissions, or an external feed), that boundary should be revisited with Zod (or an equivalent) at the point data enters the system, per the project's general validation guidance — this ADR only covers in-repo, author-controlled data.

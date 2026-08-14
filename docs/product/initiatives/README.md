# Product Initiatives

| #    | Title                                                                                      | Status   | Date       |
| ---- | ------------------------------------------------------------------------------------------ | -------- | ---------- |
| 0001 | [Build website foundation](0001-build-website-foundation/brief.md)                         | Proposed | 2026-08-11 |
| 0002 | [Deploy site to craigforrest.co.uk](0002-deploy-site/brief.md)                             | Approved | 2026-08-11 |
| 0003 | [Manual application and infrastructure preview](0003-shared-preview-environment/README.md) | Approved | 2026-08-14 |

Status values: Proposed / Approved / In progress / Completed / Superseded by Initiative-NNNN

Each initiative has one of two structures:

- For a simple initiative, create a `NNNN-short-title` directory and copy [`_template.md`](_template.md) to `NNNN-short-title/README.md`.
- For a complex initiative, create `NNNN-short-title/{brief,prd,spec}.md` instead, using [`_brief-template.md`](_brief-template.md), [`_prd-template.md`](_prd-template.md), and [`_spec-template.md`](_spec-template.md). `brief.md` covers the outcome, scope, and rationale; `prd.md` covers user needs and requirements; `spec.md` covers the implementation approach.

Do not keep `README.md` alongside the three-file structure. Fill in the appropriate files and add a row above.

# 0001. Build website foundation — Specification

Status: Approved
Date: 2026-08-11

## Context

The repository currently contains product and delivery documentation but no application implementation. The product overview requires TypeScript, low running costs, and eventual hosting on Cloudflare and/or AWS, while deliberately leaving feature and architecture choices to initiatives and ADRs.

An existing Claude-created design system will be supplied separately. It is a required implementation input and will define visual tokens, component treatment, spacing, typography, and interaction styling where applicable.

## Proposed approach

After this initiative is approved and its required architecture decisions are accepted:

- initialise the minimum TypeScript application structure selected by ADR;
- implement one page composed of semantic identity/context, projects, and contact regions;
- express the repeated project and contact content through the content representation selected by ADR rather than duplicating presentation markup;
- populate the page with realistic sample data that is visibly marked as non-production;
- translate the supplied design-system artifact into the chosen implementation while preserving its visual hierarchy and interaction states;
- document the commands needed to install dependencies, run the site locally, perform checks, and create a production build locally.

No deployment configuration should be introduced by this initiative.

## Interfaces and data

There are no backend, runtime API, database, migration, or third-party integration requirements.

The implementation must support these content shapes, without prescribing their code-level representation before an ADR is accepted:

- project card: title, short summary, technology-tag list, and one or more labelled external URLs;
- contact/profile link: accessible label and external URL;
- identity/context: concise heading and supporting introductory copy.

All external URLs used in this initiative are sample values. External links must remain identifiable and keyboard accessible, and any new-tab behaviour must be communicated accessibly if the accepted implementation uses it.

## Delivery considerations

- Readiness gates: the initiative is approved, the design-system artifact is present and reviewable, and the required ADRs are accepted.
- Verification must include the selected repository checks for type safety, build success, and accessibility, plus manual keyboard and responsive-layout review.
- Visual review must compare the implementation with the supplied design system at representative narrow and wide viewport sizes.
- Sample content must be checked for accidental production claims, personal contact details, or misleading live links.
- Completion produces a local build only. Hosting, domain, HTTPS, monitoring, and rollout work require a later approved initiative.

## Risks and open questions

- The design-system artifact is not yet in the repository; implementation cannot begin until it is supplied and its scope is understood.
- The application framework, build tooling, and code-level content representation are unresolved consequential choices. They must be proposed and accepted through ADRs after initiative approval.
- Final copy, real project links, and real contact/profile destinations remain future content work, so this foundation cannot be treated as publicly launch-ready.
- Hosting architecture is intentionally deferred because deployment is outside this initiative.

## Related decisions

No existing ADR selects the implementation architecture or content representation. Before implementation, record and accept the necessary decisions in the [ADR index](../../../adr/README.md). Product scope remains governed by the [product overview](../../overview.md) and [product decision log](../../decisions.md).


# 0001. Build website foundation — Product Requirements

Status: Approved
Date: 2026-08-11

## User problem

Craig needs a concrete website foundation that can validate the intended design and core visitor journey before final content and hosting are addressed. Future visitors need a concise way to understand who Craig is, see representative work, and find contact details without navigating a conventional CV or broad project archive.

## User experience

A visitor lands on one page and can:

1. identify Craig and understand the site's engineering focus from a concise introductory section;
2. scan three project cards, each showing a title, summary, technology tags, and external link options;
3. reach a compact contact area containing direct profile and contact links.

The page follows the supplied design system and remains understandable and operable across supported screen sizes and with keyboard-only navigation. All initiative content is realistic sample content and is clearly presented as non-production.

## Requirements

- The experience must be a single page with distinct identity/context, projects, and contact sections.
- The projects section must render exactly three sample project cards.
- Each project card must contain a title, short summary, technology tags, and at least one external URL.
- The contact section must support direct contact and profile links without form submission or backend processing.
- Sample copy and URLs must be realistic enough to validate layout while remaining clearly identifiable as placeholders.
- The supplied Claude-created design-system artifact must be available before implementation and treated as the visual source of truth.
- The implementation must use TypeScript throughout.
- The page must use meaningful semantic regions, have a logical heading order, support keyboard navigation, expose visible focus states, and provide accessible names for interactive controls.
- The layout must adapt without loss of content or functionality across narrow mobile and wider desktop viewports.
- The site must build and run locally using documented commands.

## Out of scope

- Production-ready personal, project, or contact content.
- A thoughts section, article pages, feeds, or publishing workflow.
- Project detail or case-study pages.
- Contact forms, message delivery, spam protection, databases, or runtime APIs.
- Analytics, audience-growth features, or conversion prompts.
- Cloudflare or AWS deployment, custom-domain work, HTTPS configuration, and production launch checks.

## Acceptance criteria

- A successful local build produces the single-page experience without requiring network-backed application services.
- The page visibly contains the three required sections and exactly three project cards.
- Every project card exposes all required content fields and at least one clearly sample external link.
- The contact area exposes clearly sample direct contact/profile links and does not contain a form.
- Placeholder status is apparent without inspecting source code.
- Keyboard users can reach every link in a logical order and can see which element has focus.
- Automated checks report no known violations for the agreed accessibility, type-safety, and build checks; manual review confirms semantic heading order and responsive behaviour.
- The implementation can be compared directly with the supplied design-system artifact and contains no knowingly unexplained visual departures.
- No public environment, domain, backend, or runtime API is created as part of completion.

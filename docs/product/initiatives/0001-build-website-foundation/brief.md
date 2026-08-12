# 0001. Build website foundation — Brief

Status: Approved
Date: 2026-08-11

## Intended outcome

Create a locally buildable, single-page foundation for Craig's engineering website. The page will establish the intended information hierarchy and apply the existing Claude-created design system to realistic, clearly non-production sample content.

This initiative prepares the website for later content completion and public launch; it does not itself produce a launch-ready or deployed site.

## Rationale

The product direction is defined, but there is no implementation against which to validate the design, page structure, responsive behaviour, or core content shapes. A focused foundation makes those concerns tangible without coupling the first build to production copy or hosting decisions.

## Scope

Included:

- a single responsive page containing identity and personal context, three project cards, and direct contact/profile links;
- realistic sample content that is visibly identified as non-production;
- project cards with a title, short summary, technology tags, and one or more external links;
- implementation of the supplied Claude-created design system;
- semantic structure, keyboard accessibility, and local build verification.

Excluded:

- final project, personal, or contact content;
- thoughts or other publishing features;
- project case-study pages;
- a contact form or any backend service;
- public deployment, domain configuration, HTTPS setup, or production launch verification;
- selection of an implementation stack without accepted architecture decisions.

## Success measures

- The site builds and runs locally as a coherent single-page experience.
- The supplied design system is represented consistently across the page at supported viewport sizes.
- All scoped sections can be reached and operated with a keyboard and use appropriate semantic structure.
- The three sample project cards and sample contact/profile links demonstrate the final content shapes without being mistaken for production content.
- No deployment service, runtime API, or backend is required.

## Stakeholders

- Craig Forrest — product owner, content owner, design-system provider, and approver.
- Engineering peers, recruiters, and potential collaborators — future site visitors whose needs guide the experience.

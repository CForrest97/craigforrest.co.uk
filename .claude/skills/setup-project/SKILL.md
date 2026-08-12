---
name: setup-project
description: Initialise a new or reset project through documentation-first discovery and approval gates. Use when a user asks to initialise, set up, start, bootstrap, or kick off a project or repository, especially when product documentation is empty or still contains placeholders. Do not treat setup language alone as permission to scaffold an application, select dependencies, or configure deployment.
---

# Set Up Project

Establish why and for whom the project exists before deciding how to build it.

## Workflow

1. Read `AGENTS.md`, the documentation map, the product overview, the product decision log, and the ADR index when they exist.
2. Report the current phase: discovery, product definition, technical planning, or implementation-ready.
3. If the documentation structure is missing, create only the minimal documentation scaffold used by the repository. Do not create application source directories or install dependencies.
4. If the product overview is incomplete or contains placeholders, remain in discovery:
   - Ask for the smallest useful set of missing facts about purpose, primary users, their problem or desired action, success, constraints, and explicit non-goals.
   - Record only information confirmed by the user or existing evidence.
   - Label unresolved matters as open questions. Do not turn guesses into requirements.
5. Once the audience, problem, exclusions, and principles are confirmed without placeholders, stop. This skill's job ends at a complete product overview — it does not draft initiatives, propose architecture, or begin implementation.
6. Ask the user to review the product overview. Do not infer approval from silence or from a request to initialise the project.
7. Point the user to the `write-initiative` skill as the next step, for when they're ready to scope the first (or next) body of work.

## Handoff

Summarise:

- the current project phase;
- documentation created or updated;
- confirmed decisions;
- open questions;
- that the next step is running `write-initiative` when the user is ready.

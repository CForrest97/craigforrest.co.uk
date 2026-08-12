# Rules

Path-scoped conventions (frontmatter `paths:` glob). Add files here for conventions that only apply to certain file types, e.g.:

---

paths: - "src/api/\*_/_.ts"

---

# API rules

- ...

Note: this mechanism is Claude Code-specific. Codex's closest equivalent is nested AGENTS.md per directory (directory-scoped, not glob-scoped) — duplicate genuinely cross-directory rules into AGENTS.md itself if Codex parity matters.

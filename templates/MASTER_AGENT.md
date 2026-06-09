# AI Native Architecture Instructions

## Purpose

Portable copy-paste instructions for agents that cannot import `AGENTS.md`.

This is distribution copy generated from the canonical rules. Prefer `AGENTS.md` when a tool can read it.

## Load

Paste into Codex, Claude Code, Cursor, Gemini CLI, Windsurf, Roo Code, or any coding agent that needs project rules.

## Protocol

You are working in an AI Native Architecture project.

Before editing:

1. Identify `src/domains/<domain>/<feature>`.
2. Read local schema, types, API, state, UI, and tests.
3. Search existing local code before adding new code.
4. Edit inside the feature folder first.
5. Touch `src/shared` only for primitives used by multiple domains.
6. Avoid duplicate business logic.
7. Use explicit filenames.
8. Update nearby tests.
9. Report tests run or why they could not run.

Architecture:

```txt
src/
  app/       runtime setup
  domains/   product behavior by domain and feature
  shared/    cross-domain primitives only
```

Rules:

- Feature code stays together.
- Schemas belong near boundaries.
- Generic buckets are banned unless tightly scoped.
- No `utils.ts`, `helpers.ts`, `common.ts`, or `misc.ts` as dumping grounds.
- No new abstraction until two real callers need it.
- Local domain guidance overrides root guidance.
- Agent-facing docs optimize for token efficiency, not prose readability.

## Proof

Success target:

```txt
Feature understood in fewer than 10 files.
Unrelated domains opened: 0.
Duplicate business logic added: 0.
Nearby tests updated: yes.
```

## Limits

- Do not duplicate this prompt into multiple repo files if `AGENTS.md` can be used.
- Keep future additions short and operational.

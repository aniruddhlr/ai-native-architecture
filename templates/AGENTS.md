# AGENTS.md

## Purpose

Canonical AI Native Architecture rules for coding agents.

This file is optimized for token efficiency, not prose readability. Keep it short, specific, and executable.

## Load

Use as the source of truth for agent behavior.

Other tool files should import or reference this file when supported. Do not duplicate the full rule set in `CLAUDE.md`, `GEMINI.md`, Cursor rules, or local docs.

## Protocol

Before editing:

1. Identify domain: `src/domains/<domain>`.
2. Identify feature: `src/domains/<domain>/<feature>`.
3. Read local `schema`, `types`, `api`, `state`, UI, and tests.
4. Search before adding new code. Reuse existing local behavior.
5. Edit locally first. Touch `shared` only when multiple domains need the same primitive.
6. Update nearby tests.
7. If adding a domain rule, add it near that domain in `AGENTS.md` or a local `AGENTS.md`.

Architecture:

- Runtime setup: `src/app`.
- Product behavior: `src/domains`.
- Cross-domain primitives: `src/shared`.
- Full-stack contracts: `packages/contracts`.
- Keep UI, API, schema, state, types, and tests together by feature.

Naming:

- Prefer explicit files: `validateTaskTitle.ts`, `calculateTaskPriority.ts`.
- Avoid buckets: `utils.ts`, `helpers.ts`, `common.ts`, `misc.ts`, `logic.ts`.
- Small `api.ts`, `types.ts`, `schema.ts` files are OK inside feature folders.

Duplication:

- Duplicate business logic is a bug.
- Do not copy rules across agent files.
- Do not move code to `shared` after one use.
- Do not add a new abstraction until two real callers need it.

Research:

- Inspect existing code before inventing structure.
- Prefer local patterns over general best practices.
- Check package versions and existing dependencies before adding libraries.

Testing:

- Run the smallest relevant test first.
- Add or update tests near the feature.
- If tests cannot run, report the exact reason.

## Proof

Success target:

```txt
Feature understood in fewer than 10 files.
Unrelated domains opened: 0.
Duplicate business logic added: 0.
Nearby tests updated: yes.
```

## Limits

- Agent-loaded docs spend context. Keep them compact.
- Human explanation belongs in README or docs, not here.
- If instructions conflict, nearest domain-specific guidance wins.

# Cursor Rules

## Purpose

Install AI Native Architecture rules in Cursor without duplicating the canonical rule set.

## Load

Cursor can use project rules and may also read `AGENTS.md`. Keep `templates/AGENTS.md` as the source of truth.

## Protocol

Recommended setup:

```txt
.cursor/
  rules/
    ai-native.mdc
AGENTS.md
```

Minimal `.cursor/rules/ai-native.mdc`:

```md
---
description: AI Native Architecture project rules
alwaysApply: true
---

Follow AGENTS.md. Optimize for local feature context, no duplicate business logic, and fewer than 10 files to understand a feature.
```

If Cursor does not load `AGENTS.md` in your setup, paste `templates/MASTER_AGENT.md` into the rule body instead.

## Proof

For task-list work, Cursor should start in:

```txt
src/domains/tasks/list
```

It should not scan global `components`, `hooks`, `services`, or `utils` folders.

## Limits

- Keep always-applied Cursor rules short.
- Avoid maintaining a second full copy of the rules.
- Use glob-scoped rules for large projects when only part of the codebase needs extra guidance.

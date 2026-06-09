# AI Native Architecture Instructions

You are working in an AI Native Architecture project.

## Rules

1. Organize by business domain first.
2. Keep feature code together.
3. Avoid generic `utils.ts` and `helpers.ts`.
4. Prefer explicit filenames.
5. Keep files under 500 lines.
6. Create local `AGENT.md` files for domain-specific rules.
7. Shared code must be intentionally shared.
8. Schemas belong at boundaries.
9. Update documentation when introducing new domains.
10. Minimize files required to understand a feature.

## Success Criteria

An agent should understand and modify a feature by reading fewer than 10 files.

## Default Layout

```txt
src/
  app/
  domains/
  shared/
```

## Full-Stack Layout

```txt
app/
  web/
    src/
      app/
      domains/
      shared/
  api/
    src/
      domains/
      shared/
  packages/
    contracts/
```

## Before Editing

- Identify the domain.
- Identify the feature.
- Read local schemas, types, state, API, UI, and tests.
- Prefer local changes.
- Touch shared code only when the behavior is genuinely cross-domain.

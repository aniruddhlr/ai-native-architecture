# Agent Instructions

You are working in an AI Native Architecture project.

## Rules

1. Organize by business domain first.
2. Keep feature code together.
3. Avoid generic `utils.ts`, `helpers.ts`, `common.ts`, and `misc.ts` files.
4. Prefer explicit filenames that describe behavior.
5. Keep files under 500 lines unless there is a strong reason.
6. Create local `AGENT.md` files for domain-specific rules.
7. Shared code must be intentionally shared by multiple domains.
8. Schemas belong at system boundaries.
9. Update documentation when introducing new domains.
10. Minimize files required to understand a feature.

## Success Criteria

An agent should understand and modify a feature by reading fewer than 10 files.

## Default Structure

```txt
src/
  app/
  domains/
  shared/
```

For full-stack apps:

```txt
app/
  web/
  api/
  packages/
    contracts/
```

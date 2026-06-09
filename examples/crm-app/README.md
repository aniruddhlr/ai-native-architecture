# CRM App Boundary Example

## Purpose

Show how the standard scales from Todo to a common business app with contacts, companies, and deals.

This is a secondary example. It demonstrates boundaries, not full implementation.

## Load

Audience: humans and agents comparing domain shapes.

Use the Todo example first if you want the proof case.

## Protocol

Organize by customer-facing behavior:

```txt
src/
  app/
    router.tsx
    providers.tsx
  domains/
    contacts/
      list/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
      detail/
      create/
    companies/
      list/
      detail/
    deals/
      pipeline/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
      detail/
      create/
  shared/
    ui/
    http/
    auth/
    currency/
```

Agent workflow:

1. Map the request to a domain: `contacts`, `companies`, or `deals`.
2. Pick the smallest feature folder.
3. Read local schema, types, API, state, UI, and test.
4. Avoid moving CRM-specific behavior into `shared`.

## Proof

Task:

```txt
Add a deal stage filter to the sales pipeline.
```

Inspect:

```txt
src/domains/deals/pipeline/page.tsx
src/domains/deals/pipeline/components
src/domains/deals/pipeline/api.ts
src/domains/deals/pipeline/schema.ts
src/domains/deals/pipeline/types.ts
src/domains/deals/pipeline/state.ts
src/domains/deals/pipeline/test.tsx
```

Do not inspect unless the task expands:

```txt
src/domains/contacts
src/domains/companies
src/domains/deals/detail
src/shared/currency
```

Success criteria:

```txt
Files opened: fewer than 10
Unrelated domains opened: 0
Duplicate pipeline filtering logic: 0
Nearby tests updated: yes
```

## Limits

- `shared/currency` can format money, but it must not know deal stages.
- Deal-specific validation belongs in `deals/pipeline/schema.ts` or a nearby deal feature.
- Keep instructions concise because agent-loaded Markdown spends context.

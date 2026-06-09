# CRM App Example

An AI Native Architecture example for a simple customer relationship management app.

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
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        test.tsx
      create/
        components/
        api.ts
        schema.ts
        types.ts
        test.tsx
    companies/
      list/
      detail/
    deals/
      pipeline/
      detail/
      create/
  shared/
    ui/
    http/
    auth/
    currency/
```

## Agent Task Example

> Add a deal stage filter to the sales pipeline.

An agent should start in:

```txt
src/domains/deals/pipeline
```

Likely files:

```txt
page.tsx
components/
api.ts
schema.ts
types.ts
state.ts
test.tsx
```

If the task needs shared formatting, use `src/shared/currency`. Do not add deal-specific logic to `shared`.

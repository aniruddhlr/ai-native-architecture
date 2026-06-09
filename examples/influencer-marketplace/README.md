# Influencer Marketplace Example

An AI Native Architecture example for a marketplace app with creators, campaigns, and brands.

```txt
src/
  app/
    router.tsx
    providers.tsx
  domains/
    creators/
      search/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
      profile/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        test.tsx
      scoring/
        calculateCreatorScore.ts
        scoringFactors.ts
        schema.ts
        types.ts
        test.ts
    campaigns/
      create/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        test.tsx
      list/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        state.ts
    brands/
      profile/
      settings/
  shared/
    ui/
    http/
    auth/
    money/
```

## Agent Task Example

> Add creator scoring to search results.

An agent should inspect:

```txt
src/domains/creators/search
src/domains/creators/scoring
```

The task should not require opening unrelated campaign or brand features.

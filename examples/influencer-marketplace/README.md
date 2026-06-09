# Marketplace Boundary Example

## Purpose

Show the standard on a larger marketplace with creators, campaigns, and brands.

This is a secondary example for multi-domain systems.

## Load

Audience: humans and agents evaluating larger product boundaries.

Use this after the Todo proof case.

## Protocol

Organize by business domain first, feature second:

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
      scoring/
        calculateCreatorScore.ts
        scoringFactors.ts
        schema.ts
        types.ts
        test.ts
    campaigns/
      create/
      list/
    brands/
      profile/
      settings/
  shared/
    ui/
    http/
    auth/
    money/
```

Agent workflow:

1. Identify the business domain: `creators`, `campaigns`, or `brands`.
2. Start in the smallest feature folder.
3. Inspect adjacent feature folders only when the task explicitly crosses boundaries.
4. Do not duplicate scoring, money, or auth logic.

## Proof

Task:

```txt
Add creator scoring to search results.
```

Inspect:

```txt
src/domains/creators/search
src/domains/creators/scoring
```

Do not inspect unless the task expands:

```txt
src/domains/campaigns
src/domains/brands
src/shared/money
```

Success criteria:

```txt
Files opened: fewer than 10
Unrelated domains opened: 0
Duplicate scoring logic: 0
Nearby tests updated: yes
```

## Limits

- Creator scoring has one owner: `src/domains/creators/scoring`.
- Search may consume scoring, but must not reimplement it.
- Shared code is for cross-domain primitives, not marketplace business rules.
- Agent-facing docs should be compact and loaded only where useful.

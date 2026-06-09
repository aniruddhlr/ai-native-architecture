# ai-native-architecture

A software architecture standard optimized for AI agents, autonomous coding systems, and human developers.

Traditional app structures were designed for humans browsing code by technical category:

```txt
src/
  components/
  hooks/
  services/
  utils/
  pages/
```

That layout is familiar, but it spreads one feature across many folders. An AI agent has to search for the page, component, API call, state, types, validation, and tests separately before making a safe change.

An AI-native structure should optimize for the way agents actually work:

```txt
domain -> feature -> complete local context
```

The goal is not to abandon Vite, React, Node, or existing tools. The goal is to change the project shape so both humans and agents can understand a feature by opening one small area of the codebase.

## Core Idea

Prefer vertical slices over technical layers.

Instead of grouping code by what kind of file it is, group it by what user or business capability it supports.

```txt
src/
  domains/
    creators/
      search/
        page.tsx
        CreatorSearchForm.tsx
        CreatorResults.tsx
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
```

When an agent is asked to change creator search, most of the required context is in `src/domains/creators/search`.

## Recommended App Structure

For a Vite React frontend with a Node backend, use this shape:

```txt
app/
  web/
    src/
      app/
        router.tsx
        providers.tsx
        layout.tsx
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
        campaigns/
          create/
          details/
          analytics/
      shared/
        ui/
        config/
        http/
        auth/
        dates/
      main.tsx
  api/
    src/
      app.ts
      server.ts
      domains/
        creators/
          search/
            route.ts
            service.ts
            repository.ts
            schema.ts
            types.ts
            test.ts
          profile/
        campaigns/
      shared/
        db/
        auth/
        errors/
        logging/
  packages/
    contracts/
      src/
        creators/
          search.ts
          profile.ts
        campaigns/
```

This keeps the frontend, backend, and shared contracts separate while still organizing each by domain and feature.

## Vite Or Plain Node?

Use Vite for frontend apps. Vite is only the build tool and dev server; it does not force the default `components/hooks/services` structure.

Use Node for backend services. The backend should follow the same domain-first structure.

Good default:

```txt
Vite + React + TypeScript for web
Node + Fastify or Hono + TypeScript for API
Zod or Valibot for shared schemas
Vitest for tests
```

Avoid making a custom build system unless the project has a real reason. Agents benefit from boring, predictable tooling. The architecture should be AI-native; the tools can stay standard.

## Agent-Friendly Rules

### 1. One Feature Should Be Locally Understandable

Each feature folder should contain the UI, API calls, schemas, state, types, and tests needed for that feature.

Good:

```txt
domains/creators/search/api.ts
domains/creators/search/schema.ts
domains/creators/search/page.tsx
```

Avoid:

```txt
components/CreatorSearch.tsx
hooks/useCreatorSearch.ts
services/creatorApi.ts
types/creator.ts
```

### 2. Shared Code Must Earn Its Place

Only move code into `shared/` when at least two domains genuinely use it.

Good shared folders:

```txt
shared/ui/Button.tsx
shared/http/client.ts
shared/auth/session.ts
shared/errors/AppError.ts
```

Bad shared folders:

```txt
shared/utils.ts
shared/helpers.ts
shared/common.ts
shared/misc.ts
```

Generic names become dumping grounds and make agent retrieval worse.

### 3. File Names Should Describe Intent

Prefer names an agent can understand without opening the file.

Good:

```txt
calculateCreatorScore.ts
validateInstagramHandle.ts
formatCampaignBudget.ts
getCreatorSearchResults.ts
```

Avoid:

```txt
helpers.ts
utils.ts
service.ts
data.ts
logic.ts
```

Small generic names are acceptable inside a tightly scoped feature folder, but not across the whole app.

### 4. Keep Files Small

Aim for files that are easy to fit into an agent context window.

Useful guideline:

```txt
Component files: 80-250 lines
Service files: 100-300 lines
Schema/type files: 50-200 lines
Tests: focused per feature behavior
```

If a file grows beyond that, split by behavior, not by arbitrary technical category.

### 5. Put Contracts Near Boundaries

Shared request/response schemas should live in `packages/contracts` or another clearly named boundary package.

```txt
packages/contracts/src/creators/search.ts
```

Both frontend and backend can import the same schema, which prevents agents from accidentally changing only one side of an API contract.

### 6. Add Agent Notes Where They Matter

Each large domain can include a short `AGENT.md`.

```txt
domains/creators/AGENT.md
```

Example:

```md
# Creators Domain

Owns creator discovery, profiles, scoring, and social account metadata.

Rules:
- Creator score is calculated in `scoring/calculateCreatorScore.ts`.
- Public API schemas live in `packages/contracts/src/creators`.
- Do not call external social APIs directly from UI components.
```

This is more useful for agents than one huge root README.

## What To Avoid

Avoid a structure like this for AI-heavy development:

```txt
src/
  components/
  hooks/
  contexts/
  services/
  utils/
  types/
  pages/
```

It is not wrong, but it is optimized for human categorization rather than task completion. Agents usually receive feature-level requests, so the code should be arranged around feature-level context.

## Best Default For New Projects

For a new AI-native app, start with:

```txt
app/
  web/
  api/
  packages/
    contracts/
docs/
  architecture/
    decisions/
```

Inside each app:

```txt
src/
  app/
  domains/
  shared/
```

This is simple, scalable, and agent-friendly. It works with Vite, Node, React, Fastify, Hono, Express, or most modern TypeScript stacks.

The important shift is:

```txt
from: technical folders
to: domain and feature folders
```

That gives AI agents smaller search spaces, clearer ownership boundaries, safer edits, and better long-term maintainability for humans too.

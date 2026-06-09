# AI Native Architecture

> A project structure standard for apps built with AI agents, autonomous coding systems, and human developers.

AI Native Architecture is a practical way to organize modern applications so agents can understand, modify, and extend code with less searching and fewer accidental side effects.

Most frontend and backend templates still organize code for manual human navigation:

```txt
src/
  components/
  hooks/
  services/
  utils/
  pages/
```

That works, but it scatters one feature across many folders. Agents usually receive feature-level tasks, so the codebase should expose feature-level context.

```txt
src/
  domains/
    tasks/
      list/
        page.tsx
        components/
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
```

Open the feature folder. See the feature. Change the feature.

## Start Here

Use this standard when you are starting a new app or gradually cleaning up an existing one.

```txt
src/
  app/       Runtime setup
  domains/   Product behavior
  shared/    Cross-domain primitives
```

For full-stack TypeScript apps, use:

```txt
app/
  web/
  api/
  packages/
    contracts/
```

Then organize both `web` and `api` by domain and feature.

## Use It

Copy the agent instructions into your coding agent:

- [AGENTS.md](templates/AGENTS.md)
- [CLAUDE.md](templates/CLAUDE.md)
- [Cursor Rules](templates/CURSOR_RULES.md)
- [Gemini Instructions](templates/GEMINI.md)
- [Master Agent Prompt](templates/MASTER_AGENT.md)

Explore example structures:

- [Todo App](examples/todo-app)
- [CRM App](examples/crm-app)
- [Influencer Marketplace](examples/influencer-marketplace)

Try the starter CLI locally:

```bash
npx create-ai-native-app my-app
```

## Contents

- [Why](#why)
- [Use It](#use-it)
- [Recommended Stack](#recommended-stack)
- [Blueprint](#blueprint)
- [The Rule](#the-rule)
- [Folder Roles](#folder-roles)
- [Naming](#naming)
- [File Size](#file-size)
- [Agent Notes](#agent-notes)
- [Migration Path](#migration-path)
- [Benchmarks](#benchmarks)
- [Principles](#principles)

## Why

AI agents are good at reading local context, following patterns, and making focused changes. They are weaker when a simple request requires searching through loosely named files spread across the whole app.

AI Native Architecture optimizes for:

- Locality: code for a feature lives near the feature.
- Intent: file names describe behavior, not vague categories.
- Boundaries: shared code is explicit and limited.
- Contracts: frontend and backend agree through typed schemas.
- Scale: teams can add domains without turning `utils/` into a junk drawer.

This is not a new framework. It is a structure that works with boring, proven tools.

## Recommended Stack

For most new TypeScript apps:

```txt
Frontend: Vite + React + TypeScript
Backend: Node + Fastify, Hono, or Express
Schemas: Zod or Valibot
Tests: Vitest
Contracts: Shared package imported by web and API
```

Vite is not the problem. Default folder organization is.

Use standard tooling. Change the shape of the code.

## Blueprint

```txt
app/
  web/
    src/
      app/
        router.tsx
        providers.tsx
        layout.tsx
      domains/
        tasks/
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
        projects/
          list/
          detail/
          members/
      shared/
        ui/
        http/
        auth/
        config/
        dates/
      main.tsx

  api/
    src/
      app.ts
      server.ts
      domains/
        tasks/
          list/
            route.ts
            service.ts
            repository.ts
            schema.ts
            types.ts
            test.ts
          detail/
        projects/
      shared/
        db/
        auth/
        errors/
        logging/

  packages/
    contracts/
      src/
        tasks/
          list.ts
          detail.ts
        projects/
```

## The Rule

Organize by product behavior first, technical role second.

```txt
domains/tasks/list/components/TaskList.tsx
domains/tasks/list/api.ts
domains/tasks/list/schema.ts
```

Not:

```txt
components/TaskList.tsx
services/taskApi.ts
types/task.ts
hooks/useTasks.ts
```

The traditional structure is familiar, but it forces every feature change to become a treasure hunt.

## Folder Roles

### `app/`

Application-level setup: routing, providers, layout, bootstrapping, environment wiring.

Use this for things that affect the whole runtime.

### `domains/`

Business capabilities and feature slices.

Examples:

```txt
domains/tasks/list
domains/tasks/detail
domains/projects/members
domains/projects/settings
```

Each feature should contain the files needed to understand and modify that feature.

### `shared/`

Cross-domain utilities and primitives.

Code should only move here after more than one domain genuinely needs it.

Good:

```txt
shared/ui/Button.tsx
shared/http/client.ts
shared/auth/session.ts
shared/errors/AppError.ts
```

Avoid:

```txt
shared/utils.ts
shared/helpers.ts
shared/common.ts
shared/misc.ts
```

### `packages/contracts/`

Shared schemas and types for boundaries between apps.

This is where API request and response contracts should live when both frontend and backend need them.

```txt
packages/contracts/src/tasks/list.ts
```

## Naming

Agents rely heavily on names when deciding which files to open.

Prefer:

```txt
calculateTaskPriority.ts
validateTaskTitle.ts
formatDueDate.ts
getProjectMembers.ts
```

Avoid:

```txt
helpers.ts
utils.ts
service.ts
logic.ts
data.ts
```

Generic names are acceptable only inside very small feature folders where the surrounding folder gives enough context.

## File Size

Keep files small enough for agents and humans to scan.

Useful defaults:

- Components: 80-250 lines
- Services: 100-300 lines
- Schemas and types: 50-200 lines
- Tests: focused on one feature or behavior

When a file gets too large, split by behavior.

Good:

```txt
calculateTaskPriority.ts
sortTasksByDueDate.ts
groupTasksByProject.ts
```

Avoid:

```txt
taskUtils.ts
```

## Agent Notes

Add small `AGENT.md` files where domain rules matter.

```txt
domains/tasks/AGENT.md
```

Example:

```md
# Tasks Domain

Owns task creation, task lists, task details, and task status changes.

Rules:
- Task status values are defined in `packages/contracts/src/tasks/status.ts`.
- UI components should not call the database directly.
- API routes should validate input with the shared schema before calling services.
```

Agents do not need giant documentation dumps. They need short, local rules at the place where decisions are made.

## Migration Path

You do not need to rewrite an existing app all at once.

1. Pick one active feature.
2. Create a domain folder for it.
3. Move its UI, API, schema, state, and tests together.
4. Replace broad imports from `utils/` with specific files.
5. Add an `AGENT.md` only if the domain has rules worth preserving.

Repeat as features change.

## Benchmarks

AI Native Architecture should be judged by whether it reduces the amount of context an agent needs.

See [docs/benchmarks.md](docs/benchmarks.md) for the initial benchmark format and informal baseline.

## Principles

- Prefer vertical slices over technical layers.
- Keep feature context local.
- Make shared code rare and obvious.
- Name files by intent.
- Put schemas at system boundaries.
- Keep files small.
- Write docs for agents where agents need them.

## Status

This repository is a working standard, not a package. The goal is to define a structure that can be copied into new apps, adapted by existing teams, and used as a reference by AI coding agents.

## License

MIT

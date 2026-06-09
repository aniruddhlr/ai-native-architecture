# AI Native Architecture

> Agents should understand and modify a feature by reading fewer than 10 files.

AI Native Architecture is a project structure and agent-instruction standard for teams building with Codex, Claude Code, Cursor, Gemini CLI, Windsurf, Roo Code, and other coding agents.

The core idea is simple: optimize the codebase for agent context retrieval, not just human folder browsing.

## Purpose

Most templates organize code by technical type:

```txt
src/
  components/
  hooks/
  services/
  utils/
  pages/
```

That is familiar, but it scatters one product change across many folders. A task like "add priority filtering to tasks" can force an agent to inspect components, hooks, services, types, validation, tests, and generic utilities before it knows where to edit.

AI Native Architecture organizes by domain and feature:

```txt
src/
  app/
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
  shared/
```

Open the feature folder. Read the local contract. Change the feature. Update the nearby test.

## Load

This README is for humans evaluating the standard.

Agent-loaded Markdown should live in templates such as:

- [AGENTS.md](templates/AGENTS.md)
- [CLAUDE.md](templates/CLAUDE.md)
- [GEMINI.md](templates/GEMINI.md)
- [Cursor Rules](templates/CURSOR_RULES.md)
- [Master Agent Prompt](templates/MASTER_AGENT.md)

Agent docs are different from human docs. They are loaded into model context, so they should optimize for token efficiency over prose readability. Short, specific, local instructions beat long explanations.

## Protocol

Use this standard when creating a new app or migrating an existing one.

1. Put runtime setup in `src/app`.
2. Put product behavior in `src/domains`.
3. Put truly cross-domain primitives in `src/shared`.
4. Keep UI, API, schema, state, types, and tests near the feature.
5. Avoid global `utils.ts`, `helpers.ts`, `common.ts`, and duplicate business logic.
6. Add local `AGENTS.md` files only when a domain has rules worth loading.

For full-stack TypeScript apps:

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

Use boring tools. Change the shape.

```txt
Frontend: Vite + React + TypeScript
Backend: Node + Fastify, Hono, or Express
Schemas: Zod or Valibot
Tests: Vitest
Contracts: shared package imported by web and API
```

## Proof

### Task

> Add priority filtering to the task list.

In a traditional structure, the agent may need to inspect:

```txt
src/pages/TasksPage.tsx
src/components/TaskList.tsx
src/components/TaskFilters.tsx
src/hooks/useTasks.ts
src/services/taskApi.ts
src/types/task.ts
src/utils/filters.ts
src/utils/sort.ts
src/validation/task.ts
src/tests/task-list.test.tsx
```

In AI Native Architecture, the agent starts here:

```txt
src/domains/tasks/list/
  page.tsx
  components/
  api.ts
  schema.ts
  types.ts
  state.ts
  test.tsx
```

Expected outcome: the agent can complete the task by reading fewer than 10 files and without opening unrelated domains.

See:

- [Todo proof case](examples/todo-app)
- [Benchmarks](docs/benchmarks.md)

## Limits

This is not a framework, runtime, or state library.

It does not replace Vite, React, Node, tests, schemas, or your existing stack. It defines where code and agent instructions should live so agents search less, duplicate less, and make smaller changes.

Rules:

- Shared code must earn its place.
- Duplicate business logic is a bug.
- Generic names hide intent.
- Agent instructions should be short because every loaded word costs context.
- More Markdown is not better; better-loaded Markdown is better.

## Try It

```bash
npx create-ai-native-app my-app
```

Generated shape:

```txt
src/
  app/
  domains/
    tasks/
      list/
      detail/
  shared/
AGENTS.md
```

## Examples

- [Todo App](examples/todo-app): flagship proof case.
- [CRM App](examples/crm-app): secondary example for contacts, companies, and deals.
- [Influencer Marketplace](examples/influencer-marketplace): larger marketplace example.

## Naming

Prefer intent-revealing filenames:

```txt
calculateTaskPriority.ts
validateTaskTitle.ts
formatDueDate.ts
getProjectMembers.ts
```

Avoid global buckets:

```txt
utils.ts
helpers.ts
common.ts
misc.ts
logic.ts
data.ts
```

Small generic files like `api.ts` or `types.ts` are acceptable inside a tight feature folder because the path supplies the missing context.

## Agent Files

Use one canonical rules file, then tool-specific adapters.

```txt
templates/
  AGENTS.md        canonical source
  CLAUDE.md        imports AGENTS.md
  GEMINI.md        imports AGENTS.md
  CURSOR_RULES.md  installation notes
  MASTER_AGENT.md  portable copy-paste prompt
```

Do not maintain five separate copies of the same rules. Duplicated instructions drift, waste tokens, and make agents less predictable.

## Status

This repository is a working standard plus starter tooling. The next proof step is to run the same feature task against traditional and AI Native layouts and publish the measured file counts.

## License

MIT

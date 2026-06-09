# Benchmarks

## Purpose

Measure whether AI Native Architecture reduces the amount of context an agent needs for common feature changes.

This is not a scientific benchmark suite yet. It is an initial, reproducible measurement format that turns the architecture claim into something inspectable.

## Load

Audience: humans and agents evaluating architecture quality.

Do not load this file as general coding guidance. Agent rules live in `templates/AGENTS.md`.

## Protocol

For each task, record:

```txt
Task:
Architecture:
Agent:
Files opened:
Files modified:
Unrelated folders opened:
Generic utility files opened:
Tests run:
Result:
Notes:
```

Count a file as opened if the agent reads it, searches directly inside it, or uses it as context for the change.

## Proof

### Case Study: Task Priority Filtering

Task:

```txt
Add priority filtering to the task list.
```

Traditional layout expected search path:

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

AI Native expected search path:

```txt
src/domains/tasks/list/page.tsx
src/domains/tasks/list/components/TaskList.tsx
src/domains/tasks/list/api.ts
src/domains/tasks/list/schema.ts
src/domains/tasks/list/types.ts
src/domains/tasks/list/state.ts
src/domains/tasks/list/test.tsx
```

Initial measurement:

| Task | Traditional opened | AI Native opened | Reduction |
| --- | ---: | ---: | ---: |
| Add task priority filtering | 10 | 7 | 30% |

Target:

```txt
Feature understood in fewer than 10 files.
Unrelated folders opened: 0.
Duplicate business logic introduced: 0.
Tests near feature updated: yes.
```

## Limits

- These numbers are initial and should be rerun with real agents.
- Do not claim universal speedups from this table alone.
- The primary metric is context required, not subjective preference.
- Benchmarks should favor simple, repeatable tasks over impressive anecdotes.

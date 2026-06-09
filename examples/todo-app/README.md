# Todo App Proof Case

## Purpose

Show the standard on a simple domain everyone understands: tasks.

This is the flagship example. It exists to prove the claim that an agent can understand and modify a feature by reading fewer than 10 files.

## Load

Audience: humans evaluating the architecture and agents learning where to start.

Use this example before reading larger CRM or marketplace structures.

## Protocol

Feature work starts in the smallest matching domain folder:

```txt
src/
  app/
    router.tsx
    providers.tsx
  domains/
    tasks/
      list/
        page.tsx
        components/
          TaskList.tsx
          TaskListItem.tsx
          TaskPriorityFilter.tsx
        api.ts
        schema.ts
        types.ts
        state.ts
        test.tsx
      detail/
        page.tsx
        components/
          TaskDetail.tsx
        api.ts
        schema.ts
        types.ts
        test.tsx
      create/
        components/
          CreateTaskForm.tsx
        api.ts
        schema.ts
        types.ts
        test.tsx
    projects/
      list/
      detail/
  shared/
    ui/
    http/
    dates/
```

Agent workflow for task-list changes:

1. Open `src/domains/tasks/list`.
2. Read `schema.ts`, `types.ts`, `state.ts`, `api.ts`, `page.tsx`, and nearby components.
3. Edit locally.
4. Update `test.tsx`.
5. Do not add task-list behavior to `shared`.

## Proof

Task:

```txt
Add task priority filtering to the task list.
```

Inspect:

```txt
src/domains/tasks/list/schema.ts
src/domains/tasks/list/types.ts
src/domains/tasks/list/state.ts
src/domains/tasks/list/api.ts
src/domains/tasks/list/components/TaskPriorityFilter.tsx
src/domains/tasks/list/components/TaskList.tsx
src/domains/tasks/list/test.tsx
```

Do not inspect unless the task expands:

```txt
src/domains/tasks/detail
src/domains/tasks/create
src/domains/projects
src/shared
```

Success criteria:

```txt
Files opened: fewer than 10
Unrelated domains opened: 0
Duplicate filtering logic: 0
Nearby tests updated: yes
```

## Limits

- Keep task-list-only behavior inside `tasks/list`.
- Move code to `shared` only after another domain needs it.
- Prefer small explicit files over `taskUtils.ts`.
- Agent-facing notes should stay token-efficient, not prose-heavy.

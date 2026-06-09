# Todo App Example

A minimal AI Native Architecture example for a task manager.

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

## Agent Task Example

> Add task priority filtering to the task list.

An agent should start in:

```txt
src/domains/tasks/list
```

Likely files:

```txt
schema.ts
types.ts
state.ts
components/TaskList.tsx
test.tsx
```

Success criteria: the feature can be understood and modified without opening global `components`, `hooks`, or `utils` folders.

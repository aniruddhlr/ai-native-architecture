# Cursor Rules

This project uses AI Native Architecture.

## Structure

- Put product behavior in `src/domains`.
- Put runtime setup in `src/app`.
- Put reusable cross-domain primitives in `src/shared`.
- Keep feature files together.

## Naming

- Avoid `utils.ts`, `helpers.ts`, `common.ts`, and `misc.ts`.
- Prefer names that describe intent.
- Good: `validateTaskTitle.ts`, `formatDueDate.ts`, `calculateTaskPriority.ts`.

## Editing

- Start from the relevant domain folder.
- Keep edits local unless the request clearly crosses boundaries.
- Add or update tests near the feature.
- Do not move code into `shared` unless multiple domains need it.

## Goal

An AI agent should understand and modify a feature by reading fewer than 10 files.

# Gemini Instructions

Use AI Native Architecture conventions.

1. Find the relevant domain under `src/domains`.
2. Work inside the smallest feature folder that matches the request.
3. Keep UI, API, schemas, state, types, and tests together.
4. Avoid vague shared files like `utils.ts` and `helpers.ts`.
5. Prefer explicit, behavior-oriented filenames.
6. Add shared code only when it is needed by multiple domains.
7. Keep files small and focused.
8. Update local domain notes when adding new domain rules.

Success criteria: the next agent should need fewer than 10 files to understand the feature.

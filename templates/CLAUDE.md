# Claude Instructions

Follow AI Native Architecture.

- Start with the domain and feature folder related to the request.
- Prefer local feature changes before touching shared code.
- Do not create broad `utils`, `helpers`, or `common` files.
- Use explicit filenames such as `validateTaskTitle.ts` or `calculateTaskPriority.ts`.
- Keep UI, API, schema, state, types, and tests close to the feature.
- If a rule is specific to one domain, document it in that domain's `AGENT.md`.
- Before editing shared code, verify at least two domains need it.
- Keep changes focused and update tests near the feature.

Success criteria: a future agent can understand the feature by reading fewer than 10 files.

# Benchmarks

These are informal benchmarks for comparing traditional technical-layer architecture with AI Native Architecture.

The goal is to measure how much context an agent needs to complete common feature changes.

## Current Baseline

| Task | Traditional | AI Native |
| --- | ---: | ---: |
| Add task priority filtering | 12 files | 5 files |
| Add project member search | 15 files | 6 files |
| Modify task title validation | 7 files | 2 files |
| Add deal stage filtering | 18 files | 6 files |
| Add creator scoring to search | 17 files | 5 files |

## How To Measure

For each task, count:

- Files searched or opened by the agent.
- Files modified by the agent.
- Whether changes crossed unrelated feature boundaries.
- Whether tests were located near the feature.
- Whether the agent needed to inspect generic `utils` or `helpers` files.

## Benchmark Format

```txt
Task:
Architecture:
Agent:
Files opened:
Files modified:
Unrelated folders opened:
Result:
Notes:
```

## Example

```txt
Task: Add task priority filtering
Architecture: AI Native
Agent: Codex
Files opened: 5
Files modified: 4
Unrelated folders opened: 0
Result: Passed tests
Notes: All required context lived in src/domains/tasks/list.
```

These numbers should become more rigorous over time. The first version exists to make the claim measurable.

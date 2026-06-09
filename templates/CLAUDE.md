# CLAUDE.md

@AGENTS.md

## Purpose

Claude Code adapter for AI Native Architecture.

## Load

Claude Code reads `CLAUDE.md` as project memory. This file imports canonical rules from `AGENTS.md` to avoid duplicated instructions.

## Protocol

- Follow `AGENTS.md`.
- Use this file only for Claude-specific additions.
- Keep additions concise because Claude loads project memory into context.

## Proof

Claude should complete a feature by starting in the relevant domain folder and reading fewer than 10 files.

## Limits

- Do not paste the full `AGENTS.md` content here.
- Do not store personal preferences here; use local or user-level Claude memory.

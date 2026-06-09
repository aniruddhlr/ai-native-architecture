# GEMINI.md

@AGENTS.md

## Purpose

Gemini CLI adapter for AI Native Architecture.

## Load

Gemini CLI can load `GEMINI.md` context files and supports imports. This file imports canonical rules from `AGENTS.md` to avoid duplicated instructions.

## Protocol

- Follow `AGENTS.md`.
- Keep Gemini-specific additions here only when needed.
- Prefer local domain context over broad repo scans.

## Proof

Gemini should complete a feature by reading fewer than 10 files and touching no unrelated domains.

## Limits

- Do not paste the full `AGENTS.md` content here.
- Keep imported context small; agent-loaded Markdown spends tokens.

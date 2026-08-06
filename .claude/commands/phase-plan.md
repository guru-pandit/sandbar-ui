# /phase-plan

**Agent**: Architect (opus) | **Phase**: 0 of the per-phase loop — runs before any component in a category is built

## Trigger
Run at the **start of every sidebar-category phase** (Layout, Typography, Buttons, Forms, …), before `/create-plan` for any individual component. Also run when a phase is being resumed after a long gap, to re-verify its assumptions against the current codebase.

## What happens
Use the architect subagent in **phase plan** mode. It reads the current state of the repo and produces the contract the whole phase is built against. No code.

## Steps
1. Determine the phase from `.claude/context/architecture.md` §Execution Order and `.claude/PROGRESS.md` — do not skip ahead; the next phase is the next unfinished category in that list.
2. The architect subagent loads `architecture.md`, `docs-page-pattern.md`, `api-conventions.md`, `react-patterns.md`, `coding-standards.md`, `testing-strategy.md`, `PROGRESS.md`.
3. It inspects the real codebase: which primitives, hooks, tokens, and recipe conventions already exist.
4. It outputs the sections from `architect.md` §Mode 1:
   - Phase contract (components + build order, dependencies, blockers, exit criteria)
   - Shared foundations to build **once, first**
   - Per-component brief (sub-parts, prop axes, state model, ARIA pattern, docs axes, risks)
   - Token / contract impact
   - Test strategy for the phase
   - Risks & open questions

## Rules
- No code, no file writes.
- Shared foundations are identified up front — a token, hook, or recipe fragment that three components need is built once before the first of them, not three times.
- Anything touching the token contract, theme engine, or a published prop API is flagged as a breaking change with a migration note, not slipped in.
- A component outside `architecture.md` §Component Scope stops the plan until scope is explicitly approved.
- Open questions are asked, not silently decided.

## Gate
End with: **"Phase plan complete. Approve before /implement begins."**
No component work starts until the developer approves.

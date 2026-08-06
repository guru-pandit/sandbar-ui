# /create-plan

**Agent**: Planner | **Step**: 1 of the `/component` pipeline (runs after `/phase-plan` is approved)

## Trigger
Run when a new requirement, component request, bug report, or design reference has been provided.

## What happens
Use the planner subagent to produce an implementation plan. No code.

## Steps
1. Read the user's input (problem statement / requirement / error)
2. The planner subagent loads context:
   - `.claude/context/architecture.md`
   - `.claude/context/coding-standards.md`
   - `.claude/context/api-conventions.md`
3. Explore impacted files in the codebase:
   - Relevant `packages/core/src/`, `packages/react/src/<Component>/`, `packages/tokens/src/`, `packages/icons/src/`, `packages/cli/src/`, `apps/docs/content/`
4. Output all sections defined in `planner.md`:
   - Requirement Summary
   - Scope + Out of scope (confirm component is in `architecture.md` §Component Scope if new)
   - Files To Change (table)
   - New Files Required (table + justification)
   - Approach (step-by-step, no code)
   - Risks
   - Test Strategy

## Rules
- No code generation under any circumstances
- Flag immediately if the task requires changing: the token contract, the theme engine, a published component's public prop API, or is blocked on the still-open styling-engine/docs-stack ADR
- If anything is ambiguous, ask before producing the plan

## Gate
End with: **"Awaiting approval before implementation begins."**
Do not proceed to `/implement` until the user explicitly approves.

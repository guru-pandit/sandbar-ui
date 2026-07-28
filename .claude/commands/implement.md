# /implement

**Agent**: Implementer | **Phase**: 2 of 6

## Trigger
Run after `/create-plan` has been explicitly approved by the developer.

## What happens
Load `.claude/agents/implementer.md` and write production-ready code.

## Steps
1. Re-read the approved plan from the conversation
2. Load context:
   - `.claude/context/architecture.md`
   - `.claude/context/coding-standards.md`
   - `.claude/context/react-patterns.md`
   - `.claude/context/api-conventions.md`
3. Run pre-flight checklist from `implementer.md` before writing any file
4. Implement only what the plan specifies — no scope creep
5. Apply all changes using Edit/Write tools
6. Output:
   - **Files Modified** table
   - **Summary** (3–5 bullets)

## Hard rules
- Do NOT change the token contract, theme engine, or a published component's public prop API unless the plan explicitly approves it as a breaking change
- Do NOT add packages — propose in planning
- Do NOT refactor outside task scope
- Compound components for anything with sub-parts; `asChild` via the shared `Slot`; controlled+uncontrolled via `useControllableState`; state via `data-*` attributes; styling via tokens/recipe only
- Full deliverable set per component: implementation, recipe, unit + interaction tests, axe a11y test, Storybook story, MDX docs page, changeset entry

## Gate
End with: **"Implementation complete. Run /review-implementation to begin review."**

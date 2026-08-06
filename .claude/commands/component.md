# /component <Name>

**Agents**: Planner → Implementer → Test Engineer → Security Reviewer → Code Reviewer → Docs Engineer → E2E QA → Architect
**Scope**: the full pipeline for exactly **one** component, start to gate

## Trigger
Run to build one component completely, once `/phase-plan` for its category has been approved. This is the default way a component gets built — it is the whole `CLAUDE.md` workflow bound into a single ordered run so no step gets skipped.

## Preconditions (verify before starting)
- [ ] `/phase-plan` for this component's category is approved and the component appears in its build order
- [ ] The component is in `.claude/context/architecture.md` §Component Scope
- [ ] The phase's shared foundations (tokens/hooks/primitives the plan named) already exist
- [ ] The previous component in the phase closed with a **GO** from `/checkpoint`

If any is false, stop and say which.

## Sequence — each step completes before the next begins

| # | Step | Agent | Output |
|---|---|---|---|
| 1 | `/create-plan` | planner | Component plan. **Stop for approval.** |
| 2 | `/implement` | implementer | Implementation + recipe + Storybook story + export |
| 3 | Review — tests | test-engineer | Coverage gaps closed, gap tests written |
| 4 | Review — security | security-reviewer | PASS / PASS WITH NOTES / FAIL |
| 5 | Review — code | code-reviewer | PASS / PASS WITH NOTES / FAIL |
| 6 | `/docs` | docs-engineer | MDX page, live demos, index card, props table — full `docs-page-pattern.md` §3 |
| 7 | `/e2e-qa` | e2e-qa | Real-browser verification of the page and the component |
| 8 | `/issues` | main conversation | Findings compiled if anything is open |
| 9 | `/checkpoint` | architect | **GO / NO-GO** |

## Rules
- **No step is skipped and no step runs early.** Docs come after review passes, not alongside implementation.
- A **FAIL** at step 4 or 5 sends work back to the implementer, then re-runs **only** the failed step.
- Findings from steps 7–8 are fixed and the failed step re-run — they are not deferred past the gate.
- A **NO-GO** at step 9 means this component is not done; the next component does not start.
- Scope stays as planned throughout — a discovered need becomes a note for `/phase-plan`, not an in-flight expansion.

## Gate
End with the architect's verdict from step 9, then either the next component in the phase, or — if this was the last one — **"Phase component work complete. Run /checkpoint for the phase gate."**

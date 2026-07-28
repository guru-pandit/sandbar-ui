# /ship

**Agent**: Documenter | **Phase**: 6 of 6

## Trigger
Run after `/review-implementation` completes with all phases PASS or PASS WITH NOTES.

## Pre-flight
Confirm before running:
- [ ] Phase 3 (Test Engineer): PASS or PASS WITH NOTES
- [ ] Phase 4 (Security Reviewer): PASS or PASS WITH NOTES
- [ ] Phase 5 (Code Reviewer): PASS or PASS WITH NOTES

If any phase is FAIL — stop and report which phase needs re-review.

## What happens
Load `.claude/agents/documenter.md` and produce handoff documentation.

## Steps
1. Load `.claude/context/architecture.md` — verify new packages/components/docs pages are consistent with the monorepo layout and IA
2. Produce all sections from `documenter.md`:
   - **Summary** — 2–3 sentences
   - **Technical Notes** — non-obvious decisions only
   - **Public API Changes** table (or "No public API changes.") — flag breaking changes
   - **Docs Site Changes** table (or "No docs changes.")
   - **Changeset** — confirm one exists per changed package, with bump type
   - **Manual QA Steps** — step-by-step for reviewer
   - **Rollback Plan** — files changed + changeset/version implications
   - **PR Body** — formatted draft ready to paste into GitHub

## Rules
- PR body is a **draft** — developer must review and edit before submitting
- Do NOT open a PR or push code — output only
- Do NOT summarise what each reviewer said — produce clean forward-facing docs

## Gate
Workflow complete. Developer copies PR body, edits as needed, and submits.

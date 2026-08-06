# /docs

**Agent**: Docs Engineer (sonnet) | **Phase**: 6 of the per-component pipeline — after review passes

## Trigger
Run after a component's implementation has passed `/review-implementation`, or whenever a docs page is stale, incomplete, or predates the current pattern.

## What happens
Use the docs-engineer subagent to build the documentation *product* — the MDX page **and** the live React demo components that make it real. This command writes files.

## Steps
1. The docs-engineer subagent loads `.claude/context/docs-page-pattern.md` (the spec it implements), plus `architecture.md` (IA, sidebar order) and `design-system.md` (voice, originality).
2. It reads the component's source and its `.css.ts` recipe — every documented prop, value, default, and data attribute comes from the code, never from memory or inference.
3. It produces, per component:
   - `apps/docs/content/docs/components/<slug>.mdx` — every section of `docs-page-pattern.md` §3, in order
   - live demo components in `ComponentDemos.tsx` (one export per example, each rendering **every value of its axis side by side**)
   - registration in `mdxComponents` (`app/docs/[[...slug]]/page.tsx`)
   - the component's card on the `/docs/components` index, thumbnail rendering the real component
   - props table wired to `react-docgen-typescript` — verified present in `.generated/props-tables.json`
4. It also refreshes root/per-package `README.md` and the changeset summary when those are stale.
5. It runs the generator and the docs build, and reports the real output.

## Output format
### Files Created / Updated
| File | What changed |
|------|--------------|

### Page QA (`docs-page-pattern.md` §7)
| Check | Result | Evidence |
|---|---|---|

### Flagged (needs human input)
Anything the source code left ambiguous — as a question, not a guess.

## Rules
- Never hand-write a props table — if the generator doesn't cover it, that's a defect to report
- Never invent a prop, variant value, default, or data attribute
- Never write an axis subsection as a dropdown demo or as prose — all values render live, side by side
- Never ship a static image, dead markup, or `TODO` as an example
- Never remove documentation for something that still exists just because the recent diff didn't mention it
- Match the reference libraries' *structure*, never their visual design (`design-system.md` §Originality Requirement)
- Anything unverified is reported as **Not verified**, never as a pass

## Gate
End with: **"Docs complete. Run /e2e-qa to verify in a real browser."**

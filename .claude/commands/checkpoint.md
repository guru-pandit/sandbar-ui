# /checkpoint

**Agent**: Architect (opus) | **Phase**: after every component, and again at the end of every phase

## Trigger
Run **after each component is finished**, before starting the next one — and again **at the end of a phase**, before starting the next phase. This is the gate that makes "done" mean something.

## What happens
Collect real evidence, then have the architect subagent return an explicit **GO** or **NO-GO**.

## Steps
1. Run the verification commands and capture actual output (do not summarise from memory):
   - `pnpm typecheck`
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build`
   - the props-table generator, if a docs page changed
2. Collect the docs QA results — walk `.claude/context/docs-page-pattern.md` §7 against the component's page in a running docs site.
3. Pass all of it, plus the diff, to the architect subagent in **gate** mode.
4. The architect outputs its gate table (`architect.md` §Mode 2): every gate item as Pass / Fail / Not verified, each with the evidence that proves it, then the blocking list and a verdict.

## Gate items (all must Pass)
Typecheck · Lint · Unit + interaction tests · a11y test · Build · Recipe complete with `defaultVariants` · Storybook story · Docs page complete per `docs-page-pattern.md` §3 · Index card with a live thumbnail · Exported from `packages/react/src/index.ts` · Changeset · `PROGRESS.md` updated.

## Rules
- **Not verified is a failure.** If the evidence wasn't produced, the verdict is NO-GO with the command to run — never an assumed pass.
- Do not start the next component or phase on a NO-GO. Fix, then re-run `/checkpoint`.
- Do not soften a Fail because everything else passed; partial completion is the failure mode this gate exists to catch.
- On GO, update `.claude/PROGRESS.md` in the same pass — what closed, what's next, and any open item discovered.

## Gate
End with either:
- **"GO — <name> closed. Next: <next component/phase>."**, or
- **"NO-GO — <n> blocking item(s). Fix and re-run /checkpoint."**

# /e2e-qa

**Agent**: E2E QA | **Phase**: on demand — recommended before `/ship` on any release, or after `/review-implementation` passes

## Trigger
Run before shipping a release, or whenever you want confidence a component actually works end-to-end in the real docs site — not just that unit/axe tests pass in isolation.

## What happens
Use the e2e-qa subagent to drive the running docs site (and Storybook where needed) with Playwright and verify rendering, interaction, keyboard behavior, and accessibility for every touched component.

## Steps
1. The e2e-qa subagent loads `.claude/context/testing-strategy.md` and `.claude/context/architecture.md`
2. Confirm the docs site (and Storybook, if relevant) is reachable — start it if needed, using the commands already approved in `settings.json`
3. Walk through every flow listed in `e2e-qa.md` for each touched component: docs-page rendering, variant gallery, keyboard table match, focus management, controlled/uncontrolled, `asChild`, theme/RTL toggles, plus the site-wide search/nav/sandbox-isolation checks
4. Run an axe-core scan against each touched component's live docs page
5. Record every result as Pass / Fail / Not Verified — do NOT fix anything found here
6. Output the Flows Verified table, Failures Found, and Not Verified sections defined in `e2e-qa.md`

## Rules
- No implementation fixes in this pass — this command finds problems, it doesn't solve them
- Every touched component must get an explicit result for its docs-page flows and its axe scan — nothing silently skipped
- If the docs site can't be reached at all, stop and report that instead of guessing at results

## Gate
End with: **"E2E QA complete. Run /issues to compile findings, or fix and re-run /e2e-qa to verify."**

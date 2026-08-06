# /docs

**Agent**: Documenter | **Phase**: on demand

## Trigger
Run any time documentation is stale — after a component ships, after `/ship`, or whenever explicitly requested.

## What happens
Use the documenter subagent, in `/docs` mode (this mode DOES write/edit files, unlike `/ship`).

## Steps
1. The documenter subagent loads `.claude/context/architecture.md` §Every Component Page Requires and the docs site IA
2. Review what's out of date for each touched component/package:
   - `apps/docs/content/components/<slug>.mdx` — Usage/Preview/Code, `## Examples` gallery per variant axis, keyboard table, data-attributes table, a11y notes, composition recipes, styling section, source links
   - Props table — confirm it's wired to auto-generate from TypeScript via `react-docgen-typescript`; never hand-write one
   - Root `README.md` and any per-package `README.md` (`packages/*/README.md`) — install steps, exports, usage snippet
   - `CHANGELOG.md` / changeset summary for the most recent shipped change
3. Update or create each file that's out of date. Do not touch files that are already accurate.
4. Do not invent props, behavior, or examples that don't exist in the code — mark unclear areas as `TODO` for a human instead of guessing.

## Output format
### Files Updated
| File | What changed |
|------|--------------|

### Files Created
| File | Purpose |
|------|---------|

### Flagged (needs human input)
Anything left as a `TODO` because the code's intent was ambiguous.

## Rules
- Never hand-write a props table — flag it as broken if it isn't auto-generated
- Never invent component behavior, props, or examples that don't exist in the code
- Never remove documentation for something that still exists just because it wasn't mentioned in the recent diff
- Keep language plain and concrete — no marketing language, no filler

## Gate
None — this command is safe to run standalone at any time.

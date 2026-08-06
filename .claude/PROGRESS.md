# Progress Log

Living status log for Panux UI, kept alongside `.claude/context/architecture.md`'s
Execution Order. Update this after finishing a phase or a notable out-of-band
change — it's the fast way for a new session to answer "what's done, what's next"
without re-deriving it from `git log` and the file tree.

## Current state (as of 2026-08-06)

**Phase 0 (setup)** — done: monorepo scaffold, `@panux-ui/tokens` + theme engine
+ `ThemeProvider`, `@panux-ui/core` primitives (`Slot`, `Portal`, `VisuallyHidden`,
`useControllableState`, `useFocusTrap`, `useDismissable`, `useMergedRefs`), docs-site
skeleton (Fumadocs, custom Shiki highlighting, `Example`/`ComponentDemos`/`PropsTable`,
auto props-table generation), Storybook wired (vanilla-extract Vite plugin + `ThemeProvider`
decorator).

**Phase 1 (Layout) — done, all 12/12 components.** Each has `.tsx`, `.css.ts` (except
`Box`, bare-by-design), `.test.tsx`, `.a11y.test.tsx`, `.stories.tsx`, an MDX docs page
wired into `ComponentDemos.tsx`/`page.tsx`, and is exported from `packages/react/src/index.ts`:

| Component | Notes |
|---|---|
| AspectRatio | `ratio` is a dynamic inline-style prop, not a recipe variant |
| Bleed | `inline`/`block` negative-margin variants; `inline` defaults `md` (cancels `Container`'s gutter) |
| Box | Deliberately bare — `as`/`asChild` only, no recipe, not a partial deliverable |
| Center | `inline` boolean variant |
| Container | `size` variant; breakpoints are still literal px (no breakpoint token scale yet — see Open Items) |
| Flex | General-purpose flex: `direction`/`align`/`justify`/`gap`/`wrap` |
| Float | `placement`×`offset` compound variants (12 combos); needs a `position: relative` parent, documented in its MDX Accessibility section |
| Grid | `columns` is a dynamic inline-style prop (open-ended integer, same reasoning as `AspectRatio.ratio`); `gap`/`align` are recipe variants |
| Group | Row-only action cluster; tighter default `gap="sm"` than `Stack` |
| SimpleGrid | `columns` or `minChildWidth` (dynamic props, `columns` wins if both set); `gap` variant |
| Stack | Vertical/horizontal convenience; no `justify` prop by design (deferred until a real need surfaces one) |
| Wrap | Always-wrapping flex for tag/chip lists; `gap`/`align` variants |

One batched changeset: `.changeset/layout-phase-complete.md`.

**Out-of-order / ahead-of-schedule:** `Text` and `Heading` (Typography category) were
already fully built (recipe, tests, story, MDX) before Layout was finished. Left as-is
rather than unwound — they're complete deliverables, not partial ones. Typography phase
picks up from here (see Next Up).

**Housekeeping done this pass:** removed a stray empty `packages/react/src/Button/`
directory (predated this work, no files in it); fixed a stale comment in `Box.tsx` that
contradicted its own MDX page's "bare by design" documentation.

**Brand rename:** the whole project was renamed `Sandbar` → `Panux` (commit `a89b2c2`,
2026-08-06) — `@sandbar-ui/*` → `@panux-ui/*`, `--sandbar-` → `--panux-`,
`.sandbar-ui-theme` → `.panux-ui-theme`, `data-sandbar-*` → `data-panux-*`, Storybook
titles `SandbarUI/...` → `PanuxUI/...`, CLI binary, docs strings, changesets. Mechanical,
no behavioral changes. All naming in this log and in the codebase now uses Panux.

**Instruction-file upgrade (2026-08-06, this pass):** the docs standard and the agentic
workflow were both raised, files-first, before any further component work:

- New `.claude/context/docs-page-pattern.md` — authoritative spec for the docs shell,
  the `/docs/components` card-grid index, the component page section catalog (Usage →
  Examples → Ref → Customization → Props → Data Attributes → CSS Variables → Keyboard →
  Accessibility → Composition → Styling → prev/next), the `Example` block contract, hook
  pages, and a per-page QA checklist. Structure matches Chakra/Ant depth; visual design
  stays original per `design-system.md`.
- New agents: **architect** (opus — phase plans + GO/NO-GO gates) and **docs-engineer**
  (sonnet — builds MDX pages and live demo components). `documenter` narrowed to `/ship`
  PR-body output only, no file writes.
- New commands: `/phase-plan`, `/component <Name>` (full per-component pipeline),
  `/checkpoint` (evidence-based gate). `/docs` re-pointed at docs-engineer.
- `CLAUDE.md`, `PROMPT.md` (§8 docs anatomy, new §14 operating model), `architecture.md`,
  and `testing-strategy.md` updated to match.

## Open items / known follow-ups

- **Docs backfill owed.** Every Layout page plus `text`/`heading` predate
  `docs-page-pattern.md` and stop after `## Props` — missing Data Attributes, CSS
  Variables, Accessibility, Composition, Styling, Ref, the four-part Customization
  section, index cards, and prev/next. There is also **no `/docs/components` index page
  yet**. Backfill to spec before Phase 2 (Typography) is called complete; do not carry
  the shortfall into new pages.

- **No breakpoint token scale** in `@panux-ui/tokens` yet — `Container.css.ts` uses
  literal px `maxWidth` values with a comment flagging this. Promote to a real token
  tier once a second component needs the same breakpoint values.
- **No grid-column/fr-unit token scale** — `Grid`/`SimpleGrid`'s `columns` are plain
  numeric props (dynamic value pattern), not tokens; revisit only if a preset step
  vocabulary turns out to be genuinely needed.

## Next up

**First: the docs-platform work the new standard requires** — the `/docs/components`
card-grid index, the section-tab row, and the backfill of the existing Layout/Typography
pages to `docs-page-pattern.md`. New component pages must not be written against the old
shorter shape.

**Then: Phase 2 — Typography.** `Heading` and `Text` are already implemented (see above,
though their pages need the backfill). Remaining, in canonical scope order:
**Blockquote, Code, Em, Highlight, Link, Mark, Prose.**

Run `/phase-plan` (architect) to open the phase before building any of them, then
`/component <Name>` per component. Implementation pattern is stable and doesn't need
re-deriving: skeleton in `Container.tsx`/`.css.ts`, tests in `Container.test.tsx`/
`.a11y.test.tsx`, story in `Container.stories.tsx`, MDX in
`apps/docs/content/docs/components/container.mdx` + `ComponentDemos.tsx` +
`apps/docs/app/docs/[[...slug]]/page.tsx`'s `mdxComponents` registration. `/checkpoint`
after each component and again at the end of the phase; one batched changeset at the end.

Don't start Buttons or any later phase before Typography is complete, even though an
empty scaffold pattern might tempt jumping ahead — that's exactly what happened before
Layout was finished last time (see "Out-of-order" above); it's tolerated once, not a
habit to repeat.

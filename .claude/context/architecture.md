# Architecture

## Stack
pnpm workspaces + Turborepo monorepo. React 19 + TypeScript (strict). Build via tsup. Styling via CSS variables + a compile-time engine (vanilla-extract or Panda CSS — see Open Decisions). Docs site: Next.js 15 App Router + MDX. Testing: Vitest + Testing Library + axe-core + Storybook/Chromatic. Versioning: Changesets.

## Open Decisions (ADR required before implementation)
`PROMPT.md`'s Output Format requires a written architecture decision record as the **first** deliverable, covering:
- **Styling engine** — vanilla-extract vs Panda CSS
- **RSC strategy** — how `"use client"` boundaries are drawn per component, how the no-FOUC theme script coexists with RSC
- **Theming approach** — how `data-theme` + runtime CSS-variable overrides compose with the compile-time engine's output
- **Docs stack** — Fumadocs vs Contentlayer for MDX; Sandpack vs a custom `react-live` runner; Orama vs Algolia DocSearch

Do not silently default to one option mid-task. If `docs/adr/0001-*.md` doesn't exist yet, the Planner must produce the ADR (or flag it as a blocking prerequisite) before component work begins.

## Monorepo Layout
```
panux-ui/
├─ packages/
│  ├─ core/           @panux-ui/core    — headless primitives, hooks, context
│  ├─ react/           @panux-ui/react   — styled components (main package)
│  ├─ tokens/          @panux-ui/tokens  — design tokens, theme contract
│  ├─ icons/           @panux-ui/icons   — SVG icon set, tree-shakeable
│  ├─ cli/             @panux-ui/cli     — scaffolding + codemods
│  └─ eslint-plugin/   @panux-ui/eslint-plugin
└─ apps/
   ├─ docs/            Next.js documentation website (panux-ui.design)
   ├─ playground/       dev sandbox
   └─ storybook/
```

## Build Pipeline
Every publishable package builds with tsup to ESM + CJS + `.d.ts`. `"sideEffects": false` in every `package.json` so consumers get real tree-shaking. `packages/react` exposes **per-component entry points** (e.g. `@panux-ui/react/dialog`) in addition to the barrel, so importing one component doesn't drag the whole library into a bundle-analysis report. `"use client"` is added only at the top of files that actually need it (state, effects, event handlers, portals) — never at a package or barrel level.

## Design Token System (three tiers)
```
Primitive   raw scales — blue.50–blue.950, space.1–space.24, type scale, radii, shadows, z-index, durations, easings
Semantic    role-based aliases — bg.canvas, bg.subtle, fg.default, fg.muted, border.default, accent.solid, danger.solid
Component   per-component overrides consuming semantic tokens only, never primitives directly
```
12-step color scales follow the Radix Colors model. Light/dark/high-contrast switch via `data-theme` on `.panux-ui-theme`; an inline theme script in `<head>` (before hydration) prevents FOUC by reading `localStorage`/`prefers-color-scheme` and setting the attribute synchronously. The theme contract is a typed object (`packages/tokens/src/contract.ts`) so consumers get autocomplete on token names, and supports a runtime override for custom themes. **Component tokens must reference semantic tokens, never primitives directly** — so a semantic remap re-themes every component without per-component edits.

## Layers (top → bottom, no upward imports)
```
apps/docs, apps/storybook, apps/playground
        │
   @panux-ui/react     (styled components; compound parts, recipes)
        │
   @panux-ui/core       (headless primitives — useControllableState, useFocusTrap, useDismissable, useId, useMergedRefs)
        │
   @panux-ui/tokens      (design tokens, theme contract)

@panux-ui/icons and @panux-ui/cli are standalone — no dependency on @panux-ui/react.
@panux-ui/eslint-plugin ships lint rules for consumers of @panux-ui/react — no runtime dependency on it.
```
`@panux-ui/react` never reaches into `apps/docs`. `apps/docs` is a **consumer** of the published (or workspace-linked, in dev) packages — deliberate, since the docs site is the primary dogfooding surface and must exercise the real public API, not internal shortcuts.

## Component Scope
Matches the docs-site sidebar exactly (see Docs Site Architecture → Sidebar IA below) — this is the authoritative list, supersedes any prior scope draft.

| Category | Components |
|---|---|
| Buttons | Button, Close Button, Icon Button, Download Trigger |
| Data and Time | Date Picker, Calendar |
| Forms | Checkbox, Checkbox Card, Color Picker, Color Swatch, Editable, Field, Fieldset, File Upload, Input, Number Input, PIN Input, Radio, Radio Card, Rating Group, Segmented Control, Select (Native), Select, Slider, Switch, Textarea |
| Layout | Aspect Ratio, Bleed, Box, Center, Container, Flex, Float, Grid, Group, SimpleGrid, Stack, Wrap |
| Data Display | Card, Checkmark, Data List, Icon, Kbd, List, Stat, Table, Tag, Timeline |
| Feedback | Alert, Progress, Progress Circle, Skeleton, Spinner, Toast |
| Typography | Blockquote, Code, Em, Heading, Highlight, Link, Mark, Prose, Text |
| Overlay | Dialog, Drawer, Menu, Popover, Tooltip |
| Disclosure | Accordion, Collapsible, Tabs |
| Navigation | Breadcrumb, Pagination, Steps |
| Media and Icons | Avatar, Icon, Image, Status |
| Utilities | Client Only, Environment Provider, For, Format Byte, Format Number, Locale Provider, Portal, Presence, Show, Toggle Tip, Visually Hidden |

Building outside this list needs explicit scope approval in the plan first.

## Where New Code Goes
| What | Where |
|------|-------|
| New component | `packages/react/src/<Component>/` — `<Component>.tsx`, `<Component>.css.ts`, `<Component>.test.tsx`, `<Component>.a11y.test.tsx`, `<Component>.stories.tsx` |
| New headless primitive/hook | `packages/core/src/<name>/` |
| New/changed token | `packages/tokens/src/` — flag which tier (primitive/semantic/component) in the plan |
| New icon | `packages/icons/src/<name>.tsx` — generated from SVG source, not hand-authored per icon |
| New CLI command/codemod | `packages/cli/src/commands/` |
| New lint rule | `packages/eslint-plugin/src/rules/` |
| New docs page | `apps/docs/content/...` per the IA below |
| Component doc page | `apps/docs/content/docs/components/<slug>.mdx` — required alongside any new component, per `docs-page-pattern.md` |
| Live demo component | `apps/docs/app/components/ComponentDemos.tsx` + registration in `app/docs/[[...slug]]/page.tsx` |

## Docs Site Architecture
Next.js 15 App Router, statically generated, built with `@panux-ui/react` itself (dogfooding). MDX via the chosen pipeline (see Open Decisions). Every example is live, runnable, and forkable. Props tables generate from TypeScript source via `react-docgen-typescript` at build time — never hand-written, never drifts.

### Information Architecture
```
/                        Landing page
/docs/getting-started    Installation, Next.js/Vite/Remix setup, ThemeProvider wiring, first component
/docs/theming            Token reference, color scales, dark mode, custom themes, CSS var reference
/docs/components         Index — searchable card grid, one card per component with a live miniature preview
/docs/components/[slug]  One page per component
/docs/hooks/[slug]       One page per public hook
/docs/patterns           Composition recipes: forms, data tables, auth flows, dashboards, modals-in-modals
/docs/guides             SSR/RSC guide, migration guides (from MUI/Chakra), performance, bundle optimization
/docs/accessibility      Philosophy, keyboard conventions, testing methodology, screen reader matrix
/docs/changelog          Generated from Changesets
/blog                    Release notes and design system deep dives
/themes                  Interactive theme builder — export as JSON/CSS
/playground              Full-page live editor
```

### Top Nav & Sidebar IA
**Top nav** — left: logo + main menu (Docs, Blog, Guides). Right: version dropdown, search bar, GitHub icon, theme toggler. Below the top nav, a tab row switching doc sections: **Get Started · Components · Styling · Theming**.

**Get Started sidebar** — Overview (Installation, Migration, CLI); Frameworks (Next JS (App), Next JS (Pages), Vite).

**Components sidebar** — one section per category from Component Scope above, each listing its components in that fixed order (this order is the canonical nav order and the canonical phase order — see Execution Order).

Every component page carries a right-rail on-page table of contents, auto-generated from its own section headings.

### Every Component Page Requires
**The full spec lives in `.claude/context/docs-page-pattern.md` — read it before writing or editing any docs page.** It defines the docs shell, the `/docs/components` index card grid, the component page section catalog and order, the `Example` block contract, the hook page anatomy, and the per-page QA checklist that blocks merge.

In brief, in order: header (title, one-line description, status badge, Source/Recipe/Storybook/Copy Page controls) · Usage (import + base markup + primary live example) · `## Examples` with one `###` subsection per prop axis, each rendering **every value side by side, live** · Ref · Customization (add a variant, add a size, change default size, change default variant) · auto-generated Props tables · Data Attributes · CSS Variables · Keyboard Interactions · Accessibility · Composition · Styling · prev/next footer, with a right-rail TOC throughout.

Structure and depth match Chakra UI / Ant Design; **visual design must not** (`design-system.md` §Originality Requirement). A component isn't done until its page has all of it and a card on the components index — see `CLAUDE.md` §Per-Component Deliverable Checklist. Copy the pattern from an existing page (`apps/docs/content/docs/components/container.mdx` + `ComponentDemos.tsx`) rather than inventing a new structure.

### Design & Quality Gates (every page, every component — blocks merge)
- **Code previews**: every code block (Code tab, inline snippets, customization examples) is syntax-highlighted (Shiki/`rehype-pretty-code`) — covering JSX/TSX, JS/TS, bash/CLI, JSON. No plain monochrome code. Every block has a working copy-to-clipboard button. The Preview/Code toggle must actually switch between a live rendered preview and the highlighted source — never a static screenshot.
- **Unique theme**: color system, typography, spacing, and overall visual identity are original per `design-system.md` — must NOT visually match Chakra UI, Radix, shadcn/ui, MUI, Mantine, Ant, or any other public component-docs site. The Shiki/highlighter theme is also custom/on-brand — not a copied default like "GitHub Dark" or "Dracula" verbatim. Light and dark mode both use the custom palette.
- **Functional previews**: every rendered example is interactive and functional — no static images, no dead markup. Every documented prop/example renders correctly and reflects the prop being demonstrated. Props tables match the real component API. No broken imports, no console errors, no placeholder "TODO" previews.

### Docs Site Requirements
`next/og` per-page OG image generation, `llms.txt` + copy-as-Markdown endpoints, Cmd+K full-text search, a live theme switcher in the **top-right of the top navbar** (Chakra's color-mode-toggle position — wired via Fumadocs' `DocsLayout`'s `themeSwitch.component` slot, not `nav.children`, which renders cramped next to the sidebar title instead) that re-themes every example in place, LTR/RTL toggle, version switcher, "Open in StackBlitz/CodeSandbox" per example. Lighthouse budget enforced in CI: 100 accessibility, 95+ performance. The docs site is held to the **same a11y bar as the library** — axe-clean, keyboard navigable.

Note: `apps/docs` runs on **Next.js 16**, not 15 — the Fumadocs versions compatible with Next 15's peer range have broken internal module paths (discovered empirically, not a preference). This is a docs-tooling-only deviation; `@panux-ui/react` itself has no Next.js dependency and targets React 19 regardless of which Next major the docs site runs.

## Execution Order

**Phase 0 — Setup & instruction files (files first, then implementation):**
1. Monorepo scaffold, build pipeline, CI
2. Token system + theme engine + `ThemeProvider`
3. Core primitives (`Box`, `Slot`, `Portal`, `VisuallyHidden`) + shared hooks (`useControllableState`, `useFocusTrap`, `useDismissable`, `useId`, `useMergedRefs`)
4. Docs site skeleton — MDX pipeline, live playground, auto props tables, custom on-brand syntax highlighter, theme switcher, page shell (top nav, sidebar, right-rail TOC, Preview/Code tabs, copy button, prev/next footer)
5. Checkpoint: confirm tokens, highlighter, and shell render correctly before touching any component.

**Phase 1 → N — Components, one sidebar category per phase, in this order:**
1. Layout
2. Typography
3. Buttons
4. Forms
5. Data Display
6. Feedback
7. Overlay
8. Disclosure
9. Navigation
10. Media and Icons
11. Data and Time
12. Utilities

### How a phase runs

1. **`/phase-plan`** (architect) opens the phase: build order, the shared foundations to build once up front, a per-component brief, token/contract impact, test strategy, exit criteria. **Approved before any component work starts.**
2. Build the phase's **shared foundations** first — a token tier, hook, or recipe fragment that several components in the phase need is built once, not re-derived per component.
3. For each component in order: **`/component <Name>`** — `/create-plan` → approve → `/implement` → `/review-implementation` → `/docs` → `/e2e-qa` → `/issues` → **`/checkpoint`**.
4. Complete one component fully before starting the next — implementation, recipe, tests, a11y test, Storybook story, MDX docs page (per `docs-page-pattern.md`), index card, export, changeset. `/checkpoint` returns **GO / NO-GO** on real command output; a NO-GO stops the line until it's fixed.
5. At the end of the phase, run **`/checkpoint`** again as the phase gate, then update `.claude/PROGRESS.md`, then `/ship`.

An unverified gate item counts as a failed one. Don't reorder phases without discussing impact — later phases assume earlier primitives exist (every Overlay component depends on the Popover/focus-trap/dismissable foundation from Phase 0 step 3 / Phase 7).

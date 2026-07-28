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
sandbar-ui/
├─ packages/
│  ├─ core/           @sandbar-ui/core    — headless primitives, hooks, context
│  ├─ react/           @sandbar-ui/react   — styled components (main package)
│  ├─ tokens/          @sandbar-ui/tokens  — design tokens, theme contract
│  ├─ icons/           @sandbar-ui/icons   — SVG icon set, tree-shakeable
│  ├─ cli/             @sandbar-ui/cli     — scaffolding + codemods
│  └─ eslint-plugin/   @sandbar-ui/eslint-plugin
└─ apps/
   ├─ docs/            Next.js documentation website (sandbar-ui.design)
   ├─ playground/       dev sandbox
   └─ storybook/
```

## Build Pipeline
Every publishable package builds with tsup to ESM + CJS + `.d.ts`. `"sideEffects": false` in every `package.json` so consumers get real tree-shaking. `packages/react` exposes **per-component entry points** (e.g. `@sandbar-ui/react/dialog`) in addition to the barrel, so importing one component doesn't drag the whole library into a bundle-analysis report. `"use client"` is added only at the top of files that actually need it (state, effects, event handlers, portals) — never at a package or barrel level.

## Design Token System (three tiers)
```
Primitive   raw scales — blue.50–blue.950, space.1–space.24, type scale, radii, shadows, z-index, durations, easings
Semantic    role-based aliases — bg.canvas, bg.subtle, fg.default, fg.muted, border.default, accent.solid, danger.solid
Component   per-component overrides consuming semantic tokens only, never primitives directly
```
12-step color scales follow the Radix Colors model. Light/dark/high-contrast switch via `data-theme` on `.sandbar-ui-theme`; an inline theme script in `<head>` (before hydration) prevents FOUC by reading `localStorage`/`prefers-color-scheme` and setting the attribute synchronously. The theme contract is a typed object (`packages/tokens/src/contract.ts`) so consumers get autocomplete on token names, and supports a runtime override for custom themes. **Component tokens must reference semantic tokens, never primitives directly** — so a semantic remap re-themes every component without per-component edits.

## Layers (top → bottom, no upward imports)
```
apps/docs, apps/storybook, apps/playground
        │
   @sandbar-ui/react     (styled components; compound parts, recipes)
        │
   @sandbar-ui/core       (headless primitives — useControllableState, useFocusTrap, useDismissable, useId, useMergedRefs)
        │
   @sandbar-ui/tokens      (design tokens, theme contract)

@sandbar-ui/icons and @sandbar-ui/cli are standalone — no dependency on @sandbar-ui/react.
@sandbar-ui/eslint-plugin ships lint rules for consumers of @sandbar-ui/react — no runtime dependency on it.
```
`@sandbar-ui/react` never reaches into `apps/docs`. `apps/docs` is a **consumer** of the published (or workspace-linked, in dev) packages — deliberate, since the docs site is the primary dogfooding surface and must exercise the real public API, not internal shortcuts.

## Component Scope
| Category | Components |
|---|---|
| Layout | Box, Flex, Grid, Stack, Container, Center, Spacer, AspectRatio, Divider, ScrollArea |
| Forms | Button, IconButton, ButtonGroup, Input, Textarea, Select, Combobox/Autocomplete, Checkbox, Radio, Switch, Slider, RangeSlider, DatePicker, TimePicker, FileUpload, PinInput, NumberInput, Field/Label/HelperText/ErrorText, TagsInput, ColorPicker |
| Overlays | Modal/Dialog, Drawer, Popover, Tooltip, HoverCard, ContextMenu, Menu/Dropdown, Toast, AlertDialog, CommandPalette |
| Navigation | Tabs, Breadcrumb, Pagination, Stepper, NavigationMenu, Sidebar, Link |
| Data Display | Table (sorting/selection/virtualization/sticky headers), DataGrid, Card, Avatar, AvatarGroup, Badge, Tag, List, Stat, Timeline, Tree, Accordion, Collapsible, Code, Kbd, Calendar, Empty State |
| Feedback | Alert, Spinner, Progress, CircularProgress, Skeleton, Toast |
| Typography | Heading, Text, Prose |
| Utilities | Portal, VisuallyHidden, FocusTrap, Presence, Slot, ClientOnly |

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
| Component doc page | `apps/docs/content/components/<slug>.mdx` — required alongside any new component |

## Docs Site Architecture
Next.js 15 App Router, statically generated, built with `@sandbar-ui/react` itself (dogfooding). MDX via the chosen pipeline (see Open Decisions). Every example is live, runnable, and forkable. Props tables generate from TypeScript source via `react-docgen-typescript` at build time — never hand-written, never drifts.

### Information Architecture
```
/                        Landing page
/docs/getting-started    Installation, Next.js/Vite/Remix setup, ThemeProvider wiring, first component
/docs/theming            Token reference, color scales, dark mode, custom themes, CSS var reference
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

### Every Component Page Requires
Follows the Chakra UI documentation pattern (house standard — see `apps/docs/app/components/Example.tsx` and `ComponentDemos.tsx` for the reference implementation):
1. Import statement code block, with copy button
2. **Usage** — one primary example in an `Example` (Preview/Code toggle) block: live rendered output by default, exact source on the Code tab, a Copy button
3. **Examples** (`## Examples`) — one `### <Axis>` subsection per prop/variant axis (e.g. Sizes, Variants, Colors), each with a one-line description of the prop and a gallery `Example` rendering **every value of that axis side by side, live** — not a single interactive example with a dropdown, and not just prose describing the options
4. Auto-generated props tables per sub-component (including inherited HTML props — acknowledged via a footer note, not literally enumerated; see `PropsTable.tsx`), never hand-written
5. A keyboard interactions table (interactive components only)
6. A data attributes table
7. Accessibility notes
8. Composition recipes (real-world usage combining this component with others)
9. A styling section (className/recipes/CSS vars)
10. Links to source + the Storybook story

A component isn't done until its page has all of these — see `CLAUDE.md` §Per-Component Deliverable Checklist. When adding a new component's docs page, copy the pattern from an existing one (e.g. `apps/docs/content/docs/components/text.mdx` + its `Example` components in `ComponentDemos.tsx`) rather than inventing a new structure.

### Docs Site Requirements
`next/og` per-page OG image generation, `llms.txt` + copy-as-Markdown endpoints, Cmd+K full-text search, a live theme switcher in the **top-right of the top navbar** (Chakra's color-mode-toggle position — wired via Fumadocs' `DocsLayout`'s `themeSwitch.component` slot, not `nav.children`, which renders cramped next to the sidebar title instead) that re-themes every example in place, LTR/RTL toggle, version switcher, "Open in StackBlitz/CodeSandbox" per example. Lighthouse budget enforced in CI: 100 accessibility, 95+ performance. The docs site is held to the **same a11y bar as the library** — axe-clean, keyboard navigable.

Note: `apps/docs` runs on **Next.js 16**, not 15 — the Fumadocs versions compatible with Next 15's peer range have broken internal module paths (discovered empirically, not a preference). This is a docs-tooling-only deviation; `@sandbar-ui/react` itself has no Next.js dependency and targets React 19 regardless of which Next major the docs site runs.

## Execution Order
1. Monorepo scaffold, build pipeline, CI
2. Token system + theme engine + `ThemeProvider`
3. Core primitives (`Box`, `Slot`, `Portal`, `VisuallyHidden`) + shared hooks (`useControllableState`, `useFocusTrap`, `useDismissable`, `useId`, `useMergedRefs`)
4. Docs site skeleton — MDX pipeline, live playground, auto props tables, theme switcher (build early so every later component ships documented)
5. Layout + Typography
6. Forms (Button → Input → Checkbox/Radio/Switch → Select/Combobox)
7. Overlays (Popover foundation → Dialog, Menu, Tooltip, Toast)
8. Navigation + Data Display
9. Theme builder, CLI, migration guides, v1.0 release

Don't reorder without discussing impact — later phases assume earlier primitives exist (every overlay depends on the Popover/focus-trap/dismissable foundation from phase 3/7).

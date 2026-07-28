# Prompt: Build **Sandbar UI** — A Production-Grade React/Next.js Component Library

You are a senior frontend architect and design systems engineer. Build **Sandbar UI**, a modern, accessible, themeable component library for **React 19** and **Next.js 15 (App Router)**, comparable in scope and quality to Material UI, Chakra UI, and Radix Themes — plus a full documentation website.

---

## 0. Brand

**Name:** Sandbar UI
**Tagline:** *The container for your interface.*
**Domain:** `sandbar-ui.design` (fallbacks: `sandbarui.com`, `usesandbar.dev`)
**npm scope:** `@sandbar-ui`
**GitHub:** `sandbar-ui/sandbar-ui`

### Package Names

| Package | Purpose |
|---|---|
| `@sandbar-ui/react` | Main styled component package |
| `@sandbar-ui/core` | Headless primitives, hooks, context |
| `@sandbar-ui/tokens` | Design tokens, theme contract |
| `@sandbar-ui/icons` | Tree-shakeable SVG icon set |
| `@sandbar-ui/cli` | Scaffolding and codemods |
| `@sandbar-ui/eslint-plugin` | Misuse detection |

CLI binary is `sandbar`: `npx sandbar init`, `npx sandbar add dialog`, `npx sandbar theme`.

### Visual Identity

- **Mark:** a minimal open container — an outlined rounded-square with an open top edge, readable at 16px favicon size. Works as a monogram "V" negative-space variant for social avatars.
- **Wordmark:** lowercase `sandbar`, geometric grotesque (Inter Display or Geist), tight tracking, no ligature tricks.
- **Brand color:** a deep teal-to-slate accent (`#0F766E` family) — distinct from MUI blue, Chakra teal-green, and shadcn neutral-zinc. Neutrals are a true cool gray, not blue-tinted.
- **Typography:** Inter (UI), Geist Mono or JetBrains Mono (code), Inter Display (marketing headings only).
- **Illustration style:** geometric line diagrams and anatomy schematics over 3D renders or gradients. Docs anatomy diagrams are part of the brand.

### Voice

Direct, technical, and unhyped. Write like a good API reference: short sentences, concrete nouns, no marketing superlatives. Never call anything "beautiful," "blazing fast," or "magical." State what it does and what it costs. Error messages and CLI output follow the same rule — they explain the problem and the fix, nothing else.

### Naming Conventions

- Data attributes: `data-sandbar-*` reserved namespace for internal hooks
- CSS variables: `--sandbar-` prefix (e.g. `--sandbar-color-bg-canvas`, `--sandbar-space-4`)
- Theme class: `.sandbar-ui-theme`, applied with `data-theme="light | dark | contrast"`
- Storybook titles: `SandbarUI/<Category>/<Component>`

---

## 1. Architecture

**Monorepo** (pnpm workspaces + Turborepo):

```
sandbar-ui/
├─ packages/
│  ├─ core/           # @sandbar-ui/core    — headless primitives, hooks, context
│  ├─ react/          # @sandbar-ui/react   — styled components (main package)
│  ├─ tokens/         # @sandbar-ui/tokens  — design tokens, theme contract
│  ├─ icons/          # @sandbar-ui/icons   — SVG icon set, tree-shakeable
│  ├─ cli/            # @sandbar-ui/cli     — scaffolding + codemods
│  └─ eslint-plugin/  # @sandbar-ui/eslint-plugin
└─ apps/
   ├─ docs/           # Next.js documentation website (sandbar-ui.design)
   ├─ playground/     # dev sandbox
   └─ storybook/
```

**Build:** tsup (ESM + CJS + `.d.ts`), `"sideEffects": false`, per-component entry points for tree-shaking, `"use client"` directives on interactive components only.

**Styling:** Zero-runtime CSS via CSS variables + a compile-time solution (vanilla-extract or Panda CSS). No runtime CSS-in-JS — must work in RSC without hydration cost.

---

## 2. Design Token System

Three-tier token architecture:

- **Primitive** — raw scales (`blue.50`–`blue.950`, `space.1`–`space.24`, type scale, radii, shadows, z-index, durations, easings)
- **Semantic** — role-based aliases (`bg.canvas`, `bg.subtle`, `fg.default`, `fg.muted`, `border.default`, `accent.solid`, `danger.solid`)
- **Component** — per-component overrides consuming semantic tokens

**Requirements:** 12-step color scales (Radix Colors model), automatic light/dark/high-contrast modes via `data-theme` attribute, no FOUC (inline theme script), typed theme contract with autocomplete, runtime theme override support.

---

## 3. Component Scope

**Layout:** Box, Flex, Grid, Stack, Container, Center, Spacer, AspectRatio, Divider, ScrollArea

**Forms:** Button, IconButton, ButtonGroup, Input, Textarea, Select, Combobox/Autocomplete, Checkbox, Radio, Switch, Slider, RangeSlider, DatePicker, TimePicker, FileUpload, PinInput, NumberInput, Form primitives (Field, Label, HelperText, ErrorText), TagsInput, ColorPicker

**Overlays:** Modal/Dialog, Drawer, Popover, Tooltip, HoverCard, ContextMenu, Menu/Dropdown, Toast, AlertDialog, CommandPalette

**Navigation:** Tabs, Breadcrumb, Pagination, Stepper, NavigationMenu, Sidebar, Link

**Data Display:** Table (sorting, selection, virtualization, sticky headers), DataGrid, Card, Avatar, AvatarGroup, Badge, Tag, List, Stat, Timeline, Tree, Accordion, Collapsible, Code, Kbd, Calendar, Empty State

**Feedback:** Alert, Spinner, Progress, CircularProgress, Skeleton, Toast

**Typography:** Heading, Text, Prose

**Utilities:** Portal, VisuallyHidden, FocusTrap, Presence, Slot, ClientOnly

---

## 4. API Design Principles

- **Compound components** for anything with sub-parts: `<Dialog.Root><Dialog.Trigger/><Dialog.Content/></Dialog.Root>`
- **`asChild` polymorphism** (Radix Slot pattern) as primary escape hatch; `as` prop as secondary
- **Controlled + uncontrolled** for every stateful component (`value` / `defaultValue` / `onValueChange`)
- **Consistent variant API:** `variant`, `size`, `colorScheme`, `radius` — same prop names across all components
- **Full DOM prop forwarding** + `ref` forwarding on every component
- **Data attributes over class names** for state styling: `data-state="open"`, `data-disabled`, `data-side`, `data-orientation`
- **No prop explosion** — style overrides go through `className` and the recipe system, not 50 style props

---

## 5. Accessibility (Non-Negotiable)

Every component must implement WAI-ARIA Authoring Practices: correct roles/states/properties, full keyboard interaction (arrow keys, Home/End, typeahead, Escape, Tab loops), focus management (trap, restore, initial focus), scroll locking without layout shift, RTL support, `prefers-reduced-motion` respect, screen reader announcements via live regions, and WCAG 2.2 AA contrast on every token pairing.

**Gate:** axe-core in CI, zero violations. Manual VoiceOver/NVDA test matrix documented per component.

---

## 6. Per-Component Deliverable Checklist

For each component ship:

1. Implementation with full TypeScript types (no `any`, generics where needed)
2. Recipe/style definition with all variants
3. Unit tests + interaction tests (Vitest + Testing Library)
4. A11y test (axe)
5. Visual regression story (Storybook + Chromatic)
6. MDX docs page (see §7)
7. Changeset entry

---

## 7. Documentation Website

Build a complete docs site at `apps/docs` — Next.js 15 App Router, statically generated, treated as a first-class product, not an afterthought.

### Stack

- Next.js 15 App Router + MDX via Fumadocs or Contentlayer
- Live, editable code playgrounds (Sandpack or a custom `react-live` runner) — every example runnable and forkable
- Shiki for syntax highlighting with dual light/dark themes and line/word highlighting
- Auto-generated props tables from TypeScript source (`react-docgen-typescript`) — never hand-written, never drifts
- Full-text search (Orama or Algolia DocSearch) with `Cmd+K` command palette
- The docs site itself is built entirely with the library — it is the primary dogfooding surface

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

### Every Component Page Must Contain

1. One-line description + import statement with copy button
2. Anatomy diagram showing compound part structure
3. Live editable primary example
4. Variant gallery — every `variant` × `size` × `colorScheme` combination rendered
5. Auto-generated props table for each sub-component, including inherited HTML props
6. Keyboard interactions table
7. Data attributes table (for styling hooks)
8. Accessibility notes — ARIA pattern implemented, screen reader behavior, caveats
9. Composition recipes — real-world usage (e.g. Combobox inside Dialog inside Form)
10. Styling section — how to override with `className`, recipes, and CSS vars
11. Link to source on GitHub and to the Storybook story

### Site Features

- Live theme switcher in the header (light/dark/high-contrast) that re-themes all examples in place
- Direction toggle (LTR/RTL) applied globally to examples
- Version switcher for docs across major versions
- "Open in StackBlitz / CodeSandbox" on every example
- Copy-as-Markdown and `llms.txt` endpoint so AI tools can consume the docs
- Responsive, keyboard navigable, and axe-clean — the docs site is held to the same a11y bar as the library
- Lighthouse budget enforced in CI: 100 accessibility, 95+ performance
- OG image generation per page via `next/og`

---

## 8. DX Requirements

- CLI: `npx sandbar init` (framework detection, theme setup, provider wiring), `add <component>` for copy-in source mode
- Both consumption models: npm package **and** shadcn-style source copy
- Codemods for breaking changes
- ESLint plugin for misuse detection
- SSR-safe by default: no `window` access at module scope, `useIsomorphicLayoutEffect`, deterministic IDs via `useId`
- Bundle budget enforced in CI (per-component size limits, `size-limit`)

---

## 9. Quality Gates

TypeScript strict mode • 90%+ coverage on core • Zero axe violations (library **and** docs site) • Chromatic approval required • Bundle size regression blocks merge • Docs Lighthouse budget enforced • Semantic versioning via Changesets • Node 18/20/22 + React 18/19 matrix

---

## 10. Execution Order

1. Monorepo scaffold, build pipeline, CI
2. Token system + theme engine + `ThemeProvider`
3. Core primitives (Box, Slot, Portal, VisuallyHidden) + shared hooks (`useControllableState`, `useFocusTrap`, `useDismissable`, `useId`, `useMergedRefs`)
4. **Docs site skeleton** — MDX pipeline, live playground, auto props tables, theme switcher (build early so every subsequent component ships documented)
5. Layout + Typography
6. Forms (Button → Input → Checkbox/Radio/Switch → Select/Combobox)
7. Overlays (Popover foundation → Dialog, Menu, Tooltip, Toast)
8. Navigation + Data Display
9. Theme builder, CLI, migration guides, v1.0 release

---

## Output Format

Start with a written **architecture decision record** covering styling engine choice, RSC strategy, theming approach, and docs stack selection. Apply the Sandbar UI brand, package names, and prefix conventions from §0 consistently across every file, token, and doc page. Then implement in the order above.

For each component and each docs page, output complete file trees with full source — no placeholders, no `// TODO`, no truncation. Explain non-obvious trade-offs inline as comments.
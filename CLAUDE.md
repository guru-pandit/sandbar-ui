# Project: Panux UI

Panux UI is a production-grade, accessible, themeable **React 19 / Next.js 15** component library — comparable in scope and quality to Material UI, Chakra UI, and Radix Themes — plus its documentation website. This is a **monorepo**, not a single app.

**Tagline:** *The container for your interface.* **npm scope:** `@panux-ui` **CLI binary:** `panux`

This is a **library + docs product**. There is no customer-facing business logic, no database, no backend auth. Every deliverable is either a package published to npm or a page on the docs site (`apps/docs`, `panux-ui.design`).

## Tech Stack
- **Monorepo**: pnpm workspaces + Turborepo
- **Build**: tsup (ESM + CJS + `.d.ts`), `"sideEffects": false`, per-component entry points for tree-shaking, `"use client"` only on components that need it
- **Styling**: Zero-runtime CSS via CSS variables + a compile-time engine (vanilla-extract or Panda CSS — final choice recorded in the project's first ADR, see `.claude/context/architecture.md`). No runtime CSS-in-JS — must work in RSC with zero hydration cost.
- **Components**: React 19, TypeScript strict mode, headless/styled split (`@panux-ui/core` / `@panux-ui/react`)
- **Docs site**: Next.js 15 App Router, MDX (Fumadocs or Contentlayer), live playgrounds (Sandpack or `react-live`), Shiki, Orama/Algolia DocSearch
- **Testing**: Vitest + Testing Library (unit/interaction), axe-core (a11y gate), Storybook + Chromatic (visual regression)
- **Versioning**: Changesets, semantic versioning, Node 18/20/22 + React 18/19 CI matrix
- **Package manager**: pnpm (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm test`)
- **Deployment**: docs site → Vercel; packages → npm under `@panux-ui/*`

## Packages
| Package | Purpose |
|---|---|
| `@panux-ui/react` | Main styled component package |
| `@panux-ui/core` | Headless primitives, hooks, context |
| `@panux-ui/tokens` | Design tokens, theme contract |
| `@panux-ui/icons` | Tree-shakeable SVG icon set |
| `@panux-ui/cli` | Scaffolding and codemods (`panux init`, `panux add <component>`, `panux theme`) |
| `@panux-ui/eslint-plugin` | Misuse detection |

## Key Paths
| What | Where |
|------|-------|
| Headless primitives / hooks | `packages/core/src/` |
| Styled components | `packages/react/src/<Component>/` |
| Design tokens / theme contract | `packages/tokens/src/` |
| Icons | `packages/icons/src/` |
| CLI | `packages/cli/src/` |
| ESLint plugin | `packages/eslint-plugin/src/` |
| Docs site | `apps/docs/` |
| Storybook | `apps/storybook/` |
| Dev sandbox | `apps/playground/` |
| Per-component MDX docs | `apps/docs/content/docs/components/<slug>.mdx` |
| Docs page spec | `.claude/context/docs-page-pattern.md` |
| Live demo components | `apps/docs/app/components/ComponentDemos.tsx` |
| Component stories | `packages/react/src/<Component>/<Component>.stories.tsx` |

## Naming Conventions (full brand spec in `.claude/context/design-system.md`)
- CSS variables: `--panux-` prefix (e.g. `--panux-color-bg-canvas`, `--panux-space-4`)
- Internal DOM hooks: `data-panux-*` reserved namespace
- Theme class `.panux-ui-theme`, mode via `data-theme="light | dark | contrast"`
- State styling via data attributes (`data-state="open"`, `data-disabled`) — never one-off conditional class names
- Storybook titles: `PanuxUI/<Category>/<Component>`

## Component API Contract (non-negotiable — see `.claude/context/react-patterns.md`)
- Compound components for anything with sub-parts: `<Dialog.Root><Dialog.Trigger/><Dialog.Content/></Dialog.Root>`
- `asChild` polymorphism (Slot pattern) as the primary style/element escape hatch; `as` prop as secondary
- Controlled **and** uncontrolled support on every stateful component (`value`/`defaultValue`/`onValueChange`) via `useControllableState`
- Consistent variant props across all components: `variant`, `size`, `colorScheme`, `radius`
- Full DOM prop forwarding + `ref` forwarding on every component
- No prop explosion — style overrides go through `className`/recipes, not dozens of style props

## Accessibility (non-negotiable — see `.claude/context/testing-strategy.md`)
Every component implements the relevant WAI-ARIA Authoring Practice: correct roles/states, full keyboard interaction, focus management (trap/restore/initial focus), scroll locking without layout shift, RTL support, `prefers-reduced-motion` respect, live-region announcements, WCAG 2.2 AA contrast on every token pairing. **Gate: zero axe-core violations in CI, for both the library and the docs site.**

## Per-Component Deliverable Checklist
Every component ships with **all** of the following. Anything less is not done — there is no "mostly shipped".

1. Implementation — full TS types, no `any`, compound parts, `asChild`, controlled + uncontrolled, ref + DOM prop forwarding
2. `<Component>.css.ts` recipe — every variant axis, `defaultVariants` set in the recipe (not as a prop default)
3. `<Component>.test.tsx` — unit + interaction, including keyboard, `asChild`, ref, compound misuse
4. `<Component>.a11y.test.tsx` — zero axe violations in every documented state
5. `<Component>.stories.tsx` — `PanuxUI/<Category>/<Component>`, variant gallery for visual regression
6. Export from `packages/react/src/index.ts`
7. **Docs page** — `apps/docs/content/docs/components/<slug>.mdx` with every section of `.claude/context/docs-page-pattern.md` §3, its live demo components in `ComponentDemos.tsx`, and its card on the `/docs/components` index with a real live thumbnail
8. Changeset entry (batched per phase is fine)
9. A **GO** verdict from `/checkpoint`

## Documentation Standard
The docs site is a first-class deliverable, held to the depth of Chakra UI's and Ant Design's component docs: a searchable index of live preview cards, a category sidebar, and per-component pages with Usage, an `## Examples` section whose every axis renders **all** its values side by side live (never a dropdown demo, never prose instead of a gallery), Ref, a four-part Customization section, auto-generated props tables, data-attribute and CSS-variable tables, keyboard table, a11y notes, composition, styling, and a right-rail TOC with prev/next.

**Full spec: `.claude/context/docs-page-pattern.md` — read it before writing or editing any docs page.** We match those libraries' *information structure*; we never match their visual design (`design-system.md` §Originality Requirement).

## How We Work
- **Plan first, always.** No implementation starts without an approved plan: `/phase-plan` (architect) opens a category, `/create-plan` (planner) opens each component. Building ahead of an approved plan is the one habit that breaks this project.
- **Phase by phase.** One sidebar category = one phase, in `.claude/context/architecture.md` §Execution Order. Don't start the next phase before the current one gates GO.
- **One component at a time.** Inside a phase, finish a component completely (all 9 checklist items) before touching the next.
- **Test and gate phase by phase.** `/checkpoint` runs after every component and again at the end of every phase, and returns GO / NO-GO on real command output. Unverified counts as failed.
- **Files first.** Instruction files (`CLAUDE.md` / `.claude/context/*`) capture a decision *before* it is implemented; `.claude/PROGRESS.md` is updated as part of the same pass that closes a component or phase.
- See `.claude/context/docs-page-pattern.md` before writing or editing any docs page.
- See `.claude/context/architecture.md` before designing anything new (monorepo layout, token tiers, build pipeline, docs site IA, component scope table, execution order).
- See `.claude/context/coding-standards.md` before writing any code.
- See `.claude/context/react-patterns.md` for compound components, `asChild`, controlled/uncontrolled state, RSC/SSR safety.
- See `.claude/context/api-conventions.md` before adding or changing any component's public prop API or a docs-site API route.
- See `.claude/context/security-baseline.md` before touching dependencies, the live playground sandbox, or anything published to npm.
- See `.claude/context/testing-strategy.md` before writing or modifying tests.
- See `.claude/context/dependencies.md` before adding any package.
- See `.claude/context/design-system.md` before touching brand, tokens, or the theme engine.

## Agents & Commands
| Command | Agent (model) | Purpose |
|---------|----------------|---------|
| `/phase-plan` | Architect (opus) | Open a phase: component build order, shared foundations, per-component briefs, exit criteria — no code |
| `/component <Name>` | orchestrates the pipeline below | Build one component end to end, plan → gate, no step skipped |
| `/create-plan` | Planner (opus) | Analyse one component/bug/reference, produce plan — no code |
| `/implement` | Implementer (sonnet) | Write production code from approved plan |
| `/review-implementation` | Test Engineer (sonnet) → Security Reviewer (opus) → Code Reviewer (opus) | Three-phase review |
| `/docs` | Docs Engineer (sonnet) | Build the MDX page, live demos, index card, props-table wiring to `docs-page-pattern.md` |
| `/e2e-qa` | E2E QA (sonnet) | Playwright-driven QA of docs site + Storybook: rendering, interaction, keyboard, a11y; records, doesn't fix |
| `/issues` | — (main conversation) | Compile review + e2e-qa findings into `issues.md` |
| `/checkpoint` | Architect (opus) | Gate a component or a phase on real command output: **GO / NO-GO** |
| `/ship` | Documenter (haiku) | PR body draft + handoff notes (no file writes) |

**The loop:**

```
/phase-plan  ──►  per component:  /component <Name>
(once per category)                 └─ /create-plan → approve → /implement
                                       → /review-implementation (tests → security → code)
                                       → /docs → /e2e-qa → /issues (if open)
                                       → /checkpoint  ⇒ GO / NO-GO
                                    repeat for each component in the phase
                 ──►  /checkpoint (phase gate)  ──►  /ship  ──►  next /phase-plan
```

A **NO-GO** stops the line: fix, re-run the failed step, re-gate. Never start the next component or phase on a NO-GO.

## Hard Rules
- No runtime CSS-in-JS — styling is CSS variables + the compile-time engine only; must work in RSC with zero hydration cost
- Every stateful component supports both controlled and uncontrolled usage
- Every interactive component supports `asChild`; anything with sub-parts uses the compound-component pattern
- State is expressed via `data-*` attributes, not conditional class names
- `ref` forwarding and full DOM prop spreading on every component — no exceptions
- Props tables in docs are auto-generated from TypeScript (`react-docgen-typescript`) — never hand-written
- Zero axe-core violations blocks merge — for the library and the docs site
- Bundle size regression blocks merge (`size-limit` per component)
- Never change the token contract, theme engine, or a published component's public prop API without an approved plan — a breaking change needs a migration note and a major changeset
- Never commit secrets, npm publish tokens, or search (Algolia/Chromatic) API keys
- Never skip lint, type checks, or tests
- New component → confirm it is in the approved scope (`.claude/context/architecture.md` §Component Scope) before building it
- Visual design (docs site and every component) must be original — must NOT visually match Chakra UI, Radix, shadcn/ui, MUI, Mantine, or Ant Design (see `.claude/context/design-system.md` §Originality Requirement)
- Every code block on the docs site is syntax-highlighted with a custom on-brand theme and a working copy-to-clipboard button — no monochrome code, no copied default highlighter theme
- Every documented preview is live and interactive — no static images, no dead markup, no console errors
- Every docs `### ` axis subsection renders **all** values of that axis side by side, live — never a dropdown-driven single preview, never prose in place of a gallery
- Every component has a card with a live miniature preview on the `/docs/components` index — a component missing from the index is not shipped
- No implementation without an approved plan; no next component or phase without a **GO** from `/checkpoint`; an unverified gate item is a failed gate item

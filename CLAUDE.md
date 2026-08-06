# Project: Sandbar UI

Sandbar UI is a production-grade, accessible, themeable **React 19 / Next.js 15** component library — comparable in scope and quality to Material UI, Chakra UI, and Radix Themes — plus its documentation website. This is a **monorepo**, not a single app.

**Tagline:** *The container for your interface.* **npm scope:** `@sandbar-ui` **CLI binary:** `sandbar`

This is a **library + docs product**. There is no customer-facing business logic, no database, no backend auth. Every deliverable is either a package published to npm or a page on the docs site (`apps/docs`, `sandbar-ui.design`).

## Tech Stack
- **Monorepo**: pnpm workspaces + Turborepo
- **Build**: tsup (ESM + CJS + `.d.ts`), `"sideEffects": false`, per-component entry points for tree-shaking, `"use client"` only on components that need it
- **Styling**: Zero-runtime CSS via CSS variables + a compile-time engine (vanilla-extract or Panda CSS — final choice recorded in the project's first ADR, see `.claude/context/architecture.md`). No runtime CSS-in-JS — must work in RSC with zero hydration cost.
- **Components**: React 19, TypeScript strict mode, headless/styled split (`@sandbar-ui/core` / `@sandbar-ui/react`)
- **Docs site**: Next.js 15 App Router, MDX (Fumadocs or Contentlayer), live playgrounds (Sandpack or `react-live`), Shiki, Orama/Algolia DocSearch
- **Testing**: Vitest + Testing Library (unit/interaction), axe-core (a11y gate), Storybook + Chromatic (visual regression)
- **Versioning**: Changesets, semantic versioning, Node 18/20/22 + React 18/19 CI matrix
- **Package manager**: pnpm (`pnpm install`, `pnpm dev`, `pnpm build`, `pnpm test`)
- **Deployment**: docs site → Vercel; packages → npm under `@sandbar-ui/*`

## Packages
| Package | Purpose |
|---|---|
| `@sandbar-ui/react` | Main styled component package |
| `@sandbar-ui/core` | Headless primitives, hooks, context |
| `@sandbar-ui/tokens` | Design tokens, theme contract |
| `@sandbar-ui/icons` | Tree-shakeable SVG icon set |
| `@sandbar-ui/cli` | Scaffolding and codemods (`sandbar init`, `sandbar add <component>`, `sandbar theme`) |
| `@sandbar-ui/eslint-plugin` | Misuse detection |

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
| Per-component MDX docs | `apps/docs/content/components/<slug>.mdx` |
| Component stories | `packages/react/src/<Component>/<Component>.stories.tsx` |

## Naming Conventions (full brand spec in `.claude/context/design-system.md`)
- CSS variables: `--sandbar-` prefix (e.g. `--sandbar-color-bg-canvas`, `--sandbar-space-4`)
- Internal DOM hooks: `data-sandbar-*` reserved namespace
- Theme class `.sandbar-ui-theme`, mode via `data-theme="light | dark | contrast"`
- State styling via data attributes (`data-state="open"`, `data-disabled`) — never one-off conditional class names
- Storybook titles: `SandbarUI/<Category>/<Component>`

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
Every component ships with: implementation (full TS types, no `any`), a `<Component>.css.ts` recipe with all variants, unit + interaction tests, an axe a11y test, a Storybook visual regression story, an MDX docs page following the Chakra-UI-style pattern (Usage example with Preview/Code toggle, an `## Examples` section with one live side-by-side gallery per variant axis — not a dropdown-driven single preview, auto-generated props table, keyboard table, data-attributes table, a11y notes, composition recipes, styling section, source links — see `.claude/context/architecture.md` §Every Component Page Requires and `apps/docs/app/components/Example.tsx`/`ComponentDemos.tsx` for the reference pattern), and a changeset entry. Incomplete = not done.

## How We Work
- Work proceeds **phase by phase, files-first**: instruction files (`CLAUDE.md`/`.claude/context/*`) are updated to capture a decision *before* implementing it. One sidebar category = one phase; within a phase, finish one component completely (impl, tests, docs page, QA checklist) before starting the next. Checkpoint before moving to the next component or phase — see `.claude/context/architecture.md` §Execution Order.
- See `.claude/context/architecture.md` before designing anything new (monorepo layout, token tiers, build pipeline, docs site IA — top nav/sidebar/per-component page structure, component scope table, execution order).
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
| `/create-plan` | Planner (opus) | Analyse requirement, produce plan — no code |
| `/implement` | Implementer (sonnet) | Write production code from approved plan |
| `/review-implementation` | Test Engineer (sonnet) → Security Reviewer (opus) → Code Reviewer (opus) | Three-phase review |
| `/e2e-qa` | E2E QA (sonnet) | Playwright-driven end-to-end QA of docs site + Storybook: rendering, interaction, keyboard, a11y; records, doesn't fix |
| `/issues` | — (main conversation) | Compile review + e2e-qa findings into `issues.md` |
| `/docs` | Documenter (haiku) | Create/update MDX docs pages, README, changelog/changeset summary |
| `/ship` | Documenter (haiku) | Changeset, docs, PR body draft (no file writes) |

Suggested order for a full component build: `/create-plan` → `/implement` → `/review-implementation` → `/e2e-qa` → `/issues` (if anything's open, fix and re-run the failed phase) → `/docs` → `/ship`.

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

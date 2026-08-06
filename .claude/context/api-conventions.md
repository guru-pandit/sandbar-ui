# API Conventions

This file covers two distinct surfaces: the **public component API** every package in `packages/react` exposes to consumers, and the small set of real HTTP **API routes** in `apps/docs`.

## Component Public API

### Prop Naming — Consistent Across the Whole Library
| Prop | Meaning | Applies to |
|---|---|---|
| `variant` | Visual style (`solid`, `outline`, `ghost`, `soft`) | Any component with alternate visual treatments |
| `size` | `sm` \| `md` \| `lg` (extend, don't rename, per component) | Any sizeable component |
| `colorScheme` | Semantic color token group (`accent`, `danger`, `neutral`, ...) | Any component that renders color |
| `radius` | `none` \| `sm` \| `md` \| `lg` \| `full` | Any component with rounded corners |
| `asChild` | Render props/behavior onto the single child instead of own element | Every interactive component |
| `value` / `defaultValue` / `onValueChange` | Controlled/uncontrolled state trio | Every stateful component |

Never introduce a component-specific synonym for one of these (no `color` on one component and `colorScheme` on another) — grep the rest of `packages/react/src` for the existing prop name before inventing a new one.

### Compound Sub-Component Contract
- `Root` owns state and context; parts read via a `use<Component>Context()` hook that throws outside `Root` (see `react-patterns.md`)
- Every part accepts `asChild` if it renders a real DOM element
- Every part forwards `ref` and spreads unrecognized DOM props

### Breaking Change Policy
A change is breaking if it: renames/removes a prop, changes a prop's accepted values or default, changes rendered output in a way that breaks a consumer's CSS override (e.g. a different `data-*` attribute name or DOM structure), or removes a compound sub-part. Breaking changes require:
1. Explicit approval in the plan (flag it — don't let it slip in as a side effect of an unrelated fix)
2. A major changeset with a migration note
3. A codemod in `@panux-ui/cli` if the fix is mechanical (e.g. a prop rename)
4. An entry in the relevant `/docs/guides/migration-*` page

### Package Export Conventions
Each publishable package's `package.json` uses the `"exports"` field for subpath exports (`@panux-ui/react/dialog`) alongside the barrel (`@panux-ui/react`), with `"sideEffects": false`. New components must add their subpath export — don't rely on the barrel alone, or tree-shaking claims in the docs become false.

## Docs Site API Routes (`apps/docs/app/api/`)
Real Next.js Route Handlers, used only for the docs site's own features — never a backend for the component library itself.

| Route | Purpose |
|-------|---------|
| `GET /api/og` | Per-page OG image generation via `next/og`, reads page title/description from route params |
| `GET /llms.txt` | Machine-readable docs summary for AI tooling consumption |
| `GET /docs/[...slug]?format=md` (or a dedicated route) | Copy-as-Markdown for any docs page |
| `GET/POST /api/search` | Only if the chosen search engine (Orama vs Algolia, see `architecture.md` Open Decisions) needs a server-side index/query endpoint — Algolia DocSearch typically needs none, a self-hosted Orama index might |

These routes have no auth, no user data, no database — they're stateless transforms over static docs content. Validate route params defensively (e.g. reject a `slug` that doesn't resolve to a real docs page with a `404`, not a 500) but there's no Zod/schema-validation layer to wire up here — see `security-baseline.md` for the actual risk surface (sandboxed code execution in the live playground, not these routes).

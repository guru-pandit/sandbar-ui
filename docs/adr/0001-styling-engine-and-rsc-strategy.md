# ADR 0001: Styling Engine, RSC Strategy, Theming Approach, and Docs Stack

**Status:** Accepted
**Date:** 2026-07-23

`PROMPT.md`'s Output Format requires this record as the first deliverable before any component work begins. It covers four decisions left open by `.claude/context/architecture.md`.

## 1. Styling Engine: vanilla-extract

**Decision:** Use [vanilla-extract](https://vanilla-extract.style/) (`@vanilla-extract/css`, `@vanilla-extract/recipes`) as the compile-time CSS engine for `packages/tokens` and `packages/react`.

**Context:** `CLAUDE.md` mandates zero-runtime CSS-in-JS that works in RSC with zero hydration cost. The two realistic compile-time candidates are vanilla-extract and Panda CSS.

**Alternatives considered:**
- **Panda CSS** — its slot-recipe API (`sva`) is a more direct match for compound components with multiple styled sub-parts than vanilla-extract's single-part recipes. However, Panda requires a separate `panda codegen` step that generates a `styled-system` directory before anything else can build, and has no first-party esbuild plugin. Our build tool is tsup (esbuild-based) across six packages; wiring Panda's codegen into that pipeline means either running it as a pre-build script per package (more moving parts, more places for the codegen step to go stale) or adopting a second bundler just for the styling layer.
- **vanilla-extract** ships an official `@vanilla-extract/esbuild-plugin`, so tsup can compile `.css.ts` files directly as part of its normal esbuild pass — one build tool, one step, per package. Its `createThemeContract` / `createTheme` APIs produce plain CSS custom properties, which is exactly what the `--sandbar-*` variable contract needs, and gives the token package a typed, autocomplete-friendly contract object for free.

**Consequence:** We lose Panda's native multi-part slot recipes. Compound components (`Dialog.Root`/`Dialog.Trigger`/`Dialog.Content`, etc.) will use a "recipe per part" convention: each sub-part that needs variant styling gets its own `recipe()` call in the component's `<Component>.recipe.ts`, sharing token references. This is more files per component but keeps every package on one build tool.

## 2. RSC Strategy

**Decision:** Server Components by default everywhere — both in `apps/docs` and in how every `packages/react` component is documented/expected to be consumed. `"use client"` is added only to leaf files that need state, effects, ref-based DOM measurement, or event handlers (see `.claude/context/react-patterns.md` §SSR/RSC Safety).

The no-FOUC theme switch is handled by a small Server Component that renders a synchronous inline `<script>` tag (not a client component) setting `data-theme` on `<html>` before paint, reading `localStorage` and `prefers-color-scheme`. Because vanilla-extract's output is static CSS linked via `<link>`/inlined at build time — not JS-applied styles — style application itself requires zero client JavaScript. Only *interactive* component state (open/closed, focus, selection) requires a client boundary, never style application.

## 3. Theming Approach

**Decision:** `data-theme="light | dark | contrast"` on the `.sandbar-ui-theme` root class. Each mode is a vanilla-extract `createTheme()` class layered with `globalStyle` selectors keyed off the attribute (e.g. `:root[data-theme="dark"] &`), so the three themes coexist in one stylesheet and switching is a single attribute write with no re-render, re-fetch, or class-list rewrite of every element.

Runtime custom-theme overrides (a consumer supplying their own brand color) are supported because the generated theme variables are ordinary CSS custom properties underneath `createThemeContract` — `ThemeProvider` accepts a partial token-override object and applies it as inline `style` custom properties on its wrapping element, which cascade over the static theme class beneath them without needing to regenerate any stylesheet.

## 4. Docs Stack

| Concern | Decision | Why |
|---|---|---|
| MDX pipeline | **Fumadocs** over Contentlayer | Built specifically for the Next.js App Router; Contentlayer's App Router/React 19 support has stalled and is not a safe long-term bet for a project with a multi-year support horizon |
| Live playground | **Sandpack** (`@codesandbox/sandpack-react`) over `react-live` | Runs in a genuinely sandboxed iframe on an isolated origin (required by `.claude/context/security-baseline.md`), resolves real npm dependencies rather than an in-page Babel transform with a hand-maintained scope object, and gives natural parity with the required "Open in CodeSandbox" feature since it's built by the same team |
| Docs search | **Orama** over Algolia DocSearch | Fumadocs ships built-in Orama integration — fully self-hosted, no external account application, no API key to provision or leak. Algolia remains a fallback if Orama's relevance proves insufficient at scale, but starting self-hosted avoids a blocking external dependency for Phase 4 |

### Note: enforcing the `--sandbar-` prefix
vanilla-extract does not prefix generated CSS variable/class identifiers by default — left unconfigured, it produces names like `--bg-canvas__sij84e0`. Both the esbuild plugin (tsup builds) and the Vite plugin (Vitest) are configured with a shared custom `identifiers` function (`packages/tokens/vanilla-extract-identifiers.ts`, duplicated verbatim in `packages/react`) that prefixes every generated identifier with `sandbar-`, satisfying `CLAUDE.md`'s CSS variable naming rule. Any new package that adds `.css.ts` files must wire the same function into its build and test config — it is not a global default.

## Consequences Going Forward
- `packages/tokens`'s theme contract (Phase 2) is authored against vanilla-extract's `createThemeContract`/`createTheme` APIs — changing engines later would mean rewriting every token file and every component recipe, not just a config swap.
- Every compound component's recipe file follows the "recipe per part" convention from §1, not a single slot-recipe call.
- `apps/docs` takes a dependency on Fumadocs + Sandpack + Orama starting Phase 4; none of these are wired yet in this scaffold phase.

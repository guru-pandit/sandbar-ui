# Panux UI

*The container for your interface.*

A production-grade, accessible, themeable React 19 / Next.js 15 component library — plus its documentation website. See `PROMPT.md` for the full spec and `CLAUDE.md` for how this repo is meant to be worked in day to day.

**Status:** Phase 1 (monorepo scaffold) of the execution order in `.claude/context/architecture.md`. No real components, tokens, or docs content exist yet — see `docs/adr/0001-styling-engine-and-rsc-strategy.md` for the decisions this scaffold is built on.

## Layout
```
packages/
  core/            @panux-ui/core         — headless primitives, hooks, context
  react/           @panux-ui/react        — styled components (main package)
  tokens/          @panux-ui/tokens       — design tokens, theme contract
  icons/           @panux-ui/icons        — tree-shakeable SVG icon set
  cli/             @panux-ui/cli          — scaffolding + codemods (`panux` binary)
  eslint-plugin/   @panux-ui/eslint-plugin — misuse detection
apps/
  docs/            Next.js documentation site (panux-ui.design)
  storybook/       Visual regression surface for packages/react
  playground/      Vite dev sandbox
docs/adr/          Architecture decision records
```

## Requirements
- Node 18, 20, or 22 (this repo pins `packageManager: pnpm@10.34.5` in `package.json`, which works across that range — note that pnpm's own *latest* major requires Node ≥22.13, so don't `corepack enable` a newer pnpm without checking)
- [pnpm](https://pnpm.io) via Corepack: `corepack enable`

## Getting Started
```bash
pnpm install
pnpm build       # builds every package (turbo, cached, dependency-ordered)
pnpm dev         # runs dev/watch mode across the workspace in parallel
pnpm test        # runs each package's test suite
pnpm lint         # eslint across the whole repo (single shared flat config)
pnpm typecheck    # tsc --noEmit per package, dependency-ordered
```

Per-package/app commands run the same way via pnpm's `--filter`, e.g.:
```bash
pnpm --filter @panux-ui/react build
pnpm --filter docs dev
pnpm --filter storybook dev
```

## Versioning
This repo uses [Changesets](https://github.com/changesets/changesets). After changing a publishable package under `packages/*`, run:
```bash
pnpm changeset
```

## Working in this repo
Read `CLAUDE.md` first — it indexes the context docs under `.claude/context/` (architecture, coding standards, React patterns, component API conventions, security baseline, testing strategy, dependencies, design system) and the plan → implement → review → ship workflow under `.claude/commands/`.

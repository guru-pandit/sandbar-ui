# Dependencies

## Approved Libraries by Concern

| Concern | Library | Notes |
|---------|---------|-------|
| Monorepo tooling | `pnpm` (workspaces), `turbo` | pnpm is the only supported package manager — no npm/yarn lockfiles |
| Build | `tsup` | ESM + CJS + `.d.ts`, per-component entry points |
| Language | `typescript` | Strict mode, every package |
| Styling engine | `vanilla-extract` **or** `panda-css` | Final pick recorded in the project ADR — see `architecture.md` Open Decisions; do not mix both in the same package |
| Framework (docs only) | `next`, `react`, `react-dom` | React 19; `@panux-ui/react` itself supports React 18/19 per the CI matrix |
| MDX pipeline | `fumadocs` **or** `contentlayer` | Per ADR |
| Live playground | `@codesandbox/sandpack-react` **or** `react-live` | Per ADR — sandboxed execution is mandatory regardless of choice, see `security-baseline.md` |
| Syntax highlighting | `shiki` | Dual light/dark themes |
| Docs search | `@orama/orama` **or** Algolia DocSearch | Per ADR |
| Props table generation | `react-docgen-typescript` | Never hand-write a props table |
| Testing | `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` | |
| Accessibility testing | `axe-core`, `vitest-axe` (or `jest-axe`) | Zero-violation gate |
| Visual regression | `storybook`, `chromatic` | Every component ships a story |
| Bundle budget | `size-limit`, `@size-limit/preset-small-lib` | Per-component budgets in CI |
| Versioning | `@changesets/cli` | Every PR touching a package needs a changeset |
| Class/variant merging | The chosen styling engine's own recipe/`cva`-equivalent API | Don't reach for a separate `clsx`/`cva` combo if the styling engine already provides variant composition |
| Icons build | SVGO + a codegen script | `@panux-ui/icons` source SVGs are generated into tree-shakeable components, not hand-written per icon |
| Lint tooling (for `@panux-ui/eslint-plugin` authoring) | `@typescript-eslint/utils`, `eslint` | |

## Deprecated / Do Not Use
| Library | Reason | Use Instead |
|---------|--------|-------------|
| `styled-components`, `@emotion/react`, any runtime CSS-in-JS | Violates the zero-runtime, RSC-safe styling contract in `CLAUDE.md` | The chosen compile-time engine (vanilla-extract/Panda) |
| Radix Primitives, MUI, Chakra, or any other component library as a runtime dependency of `@panux-ui/react` | Panux UI builds its own headless primitives in `@panux-ui/core` — depending on a competing library undermines bundle-size and API-consistency goals | Hand-built primitives in `@panux-ui/core`, informed by the WAI-ARIA APG, not wrapped |
| `moment` | Large bundle, legacy API | Native `Date`/`Intl`, or a lightweight library only if `DatePicker`/`Calendar` genuinely need date-math beyond `Intl` |
| `lodash` (full package) | Bundle bloat for a tree-shakeable library | Native JS, or a specific `lodash.<fn>` subpackage only if truly needed |
| `axios` | `fetch` is sufficient wherever the docs site or CLI needs HTTP | Native `fetch` |
| Bootstrap or any CSS framework | Not in stack, conflicts with the token/recipe system | The token system + styling engine |
| `getServerSideProps`/Pages Router patterns (docs site) | `apps/docs` is App Router only | Server Components, Route Handlers |

## Pinned Resolutions
None yet. Add here if `pnpm audit` flags a transitive CVE requiring a forced resolution — document the CVE and why the pin is needed.

## License Policy
- **Allowed**: MIT, ISC, BSD-2, BSD-3, Apache-2.0
- **Review required**: LGPL
- **Forbidden**: GPL, AGPL, SSPL, proprietary/commercial without approval — a copyleft dependency in `@panux-ui/react` or `@panux-ui/core` propagates an obligation to every downstream consumer, which is unacceptable for a published library

## Proposing a New Dependency
1. Confirm no approved library already covers the need
2. Check license and bundle size impact — for `packages/core`/`packages/react`, run it through `size-limit` before merging, not after
3. Run `pnpm audit` after install — no new critical/high CVEs
4. Add to this file under the correct concern
5. Get explicit approval in the plan before merging — **do not install mid-task without approval**, and never as a runtime dependency of `@panux-ui/react`/`@panux-ui/core` without discussing the bundle-size tradeoff explicitly

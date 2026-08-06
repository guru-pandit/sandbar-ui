# Testing Strategy

## Stack
Vitest + React Testing Library for unit/interaction tests. `axe-core` (via `jest-axe`/`vitest-axe` or `@axe-core/react`) for automated accessibility tests. Storybook + Chromatic for visual regression. `size-limit` for bundle budgets. No E2E framework at the component-library layer — Storybook interaction tests + the docs site's own Lighthouse/axe CI cover the product-level surface.

## Test Pyramid
```
        [ Manual a11y QA ]     — VoiceOver/NVDA test matrix per component before release
      [ Visual regression ]    — Storybook + Chromatic, every variant×size×colorScheme
    [ Unit + Interaction ]     — Vitest + Testing Library, every component + every core hook
  [ Automated a11y (axe) ]     — zero violations gate, every component, library AND docs site
```

## Coverage Priorities
| Layer | Priority |
|-------|---------|
| `packages/core/src/` (hooks: `useControllableState`, `useFocusTrap`, `useDismissable`, `useMergedRefs`, `useId`) | High — every styled component depends on these being correct |
| `packages/react/src/<Component>/` interaction tests | High — keyboard interaction, controlled/uncontrolled, compound-part misuse errors |
| `packages/react/src/<Component>/*.a11y.test.tsx` | High — zero axe violations is a merge gate, not a nice-to-have |
| `packages/tokens/src/` | Medium — snapshot the resolved token output per theme (light/dark/contrast) to catch accidental token drift |
| `packages/cli/src/commands/` | Medium — codemods need fixture-based before/after tests; scaffolding needs a smoke test that generated projects build |
| `apps/docs` MDX content/pages | Low for unit tests — covered by Lighthouse/axe CI + manual review, not component-style unit tests |

## Must-Have Tests (per component)
- Renders with default props, matches expected role/name (accessible name, not just DOM presence)
- Every `variant`/`size`/`colorScheme` combination renders without throwing (paired with the Storybook variant-gallery story)
- Controlled mode: `value`/`onValueChange` drive state, component never mutates state internally when controlled
- Uncontrolled mode: `defaultValue` seeds state, component manages its own state after
- Keyboard interaction per the relevant WAI-ARIA Authoring Practice (arrow keys, Home/End, typeahead, Escape, Tab loop) — see the component's docs page keyboard table, the test list should match it 1:1
- Compound sub-part used outside `Root` throws the documented error message
- `asChild` renders the child element with merged props/ref, not a wrapper element
- `ref` forwards to the actual DOM node (or the `asChild` target)
- Focus management for overlays: initial focus lands correctly, focus traps inside while open, focus restores to the trigger on close
- Zero axe violations in both default and every documented variant state (open/closed/disabled/error)
- SSR smoke test: `renderToString`/`renderToStaticMarkup` doesn't throw and doesn't touch `window` at module scope

## Gates — when tests actually run

Testing is **phase by phase**, not saved for the end. Two gates, both run by `/checkpoint` (architect subagent):

**Component gate** — after every component, before the next one starts:

| Gate | Command / evidence |
|---|---|
| Typecheck | `pnpm typecheck` exit 0 |
| Lint | `pnpm lint` exit 0 |
| Unit + interaction | `pnpm test` exit 0, with the Must-Have Tests above present |
| a11y | `<Component>.a11y.test.tsx` green, zero violations |
| Build | `pnpm build` exit 0 (packages **and** apps) |
| Docs page | `docs-page-pattern.md` §7 checklist, walked against the running site |
| Storybook | story renders, variant gallery present |

**Phase gate** — after the last component of a category, before the next phase: everything above across the whole phase, plus a full docs-site axe pass over every page the phase added, plus the batched changeset.

Rules: evidence is the actual command output, never a recollection. **A gate item with no evidence is "Not verified", which is a failure, not a pass.** A NO-GO stops the line — fix, re-run the failed step, re-gate. Don't defer a red test to "later in the phase"; later never comes with a clean diff.

## Manual QA Checklist (per component, before release)
- VoiceOver (macOS/iOS Safari) and NVDA (Windows/Chrome) pass through the documented screen-reader behavior
- Keyboard-only pass — no mouse — through every interactive state
- `prefers-reduced-motion` respected — no forced animation
- RTL rendering checked (`dir="rtl"`) for anything with directional layout (arrows, icons, side-anchored overlays)
- Light/dark/high-contrast themes checked for the WCAG 2.2 AA contrast requirement on every token pairing the component uses
- Storybook story reviewed and approved in Chromatic

## Fixture Conventions
```ts
// packages/react/src/Dialog/__fixtures__/dialog.ts
export const renderDialog = (props: Partial<DialogRootProps> = {}) =>
  render(
    <Dialog.Root {...props}>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Title</Dialog.Title>
      </Dialog.Content>
    </Dialog.Root>
  );
```
Co-locate test files next to source: `Dialog.test.tsx`, `Dialog.a11y.test.tsx`, `useControllableState.test.ts`.

## Mock Policy
| What | Policy |
|------|--------|
| Portal target (`document.body`) | Use the real DOM in jsdom — don't mock `Portal`, it's part of what's under test for overlay components |
| Timers (animations, debounced dismiss) | `vi.useFakeTimers()` for deterministic interaction tests, never a real `setTimeout` wait |
| `matchMedia` (theme/`prefers-reduced-motion`) | Mock per-test in jsdom setup — jsdom has no real implementation |
| MDX/docs content in unit tests | Don't unit-test MDX prose — that's Lighthouse/axe/manual-review territory |

Never mock the module under test. Never mock `@panux-ui/core` hooks from within `packages/react` tests — if a hook needs different behavior for a test, that's a sign the test belongs at the hook's own level in `packages/core`.

## Bundle Size Gate
`size-limit` runs in CI against every component's per-entry-point bundle. A PR that grows a component's bundle size past its configured budget fails CI — either justify the budget increase explicitly in the PR or find the regression (an accidentally-bundled dependency is the most common cause).

## Flake Protocol
1. Re-run 3× — if it passes 2+/3, it's flaky
2. Fix the root cause: unresolved promise, missing `await`, a real timer instead of fake timers, a Portal/focus-trap test racing animation frames
3. Never merge a flaky test with a `.skip`/retry wrapper as the fix

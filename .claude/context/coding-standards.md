# Coding Standards

## Naming
| Thing | Convention | Example |
|-------|-----------|---------|
| Component | PascalCase | `Dialog`, `Button` |
| Compound sub-part | `Component.Part` | `Dialog.Trigger`, `Dialog.Content` |
| Component file | PascalCase, `.tsx` | `Dialog.tsx` |
| Recipe/style file | `<Component>.css.ts` | `Dialog.css.ts` |
| Public hook | `use` + PascalCase suffix | `useControllableState`, `useFocusTrap` |
| CSS variable | `--sandbar-` prefix, kebab-case | `--sandbar-color-bg-canvas`, `--sandbar-space-4` |
| Internal data attribute | `data-sandbar-*` | `data-sandbar-focus-scope` |
| State data attribute | `data-<state>` | `data-state="open"`, `data-disabled` |
| Token export | camelCase, tier-scoped | `semanticTokens.bg.canvas` |
| Constant value | SCREAMING_SNAKE_CASE | `DEFAULT_ANIMATION_DURATION` |

## File Structure
```
packages/core/src/<name>/           headless primitive or hook — index.ts, <name>.ts, <name>.test.ts
packages/react/src/<Component>/     <Component>.tsx, .css.ts, .test.tsx, .a11y.test.tsx, .stories.tsx
packages/tokens/src/                primitive.ts, semantic.ts, contract.ts, themes/<name>.ts
packages/icons/src/                 one file per icon, generated — do not hand-edit generated output
packages/cli/src/commands/          init.ts, add.ts, theme.ts
packages/eslint-plugin/src/rules/   one rule per file
apps/docs/content/                  MDX per the information architecture in architecture.md
```

## Types
- No `any`. Use generics where a component's value type is consumer-defined (e.g. `Select<T>`, `Combobox<T>`)
- Every component's props type is exported (`DialogRootProps`, `ButtonProps`) — consumers need it for `forwardRef`/wrapper patterns
- Extend the relevant DOM element's props via `ComponentPropsWithoutRef<'button'>` (or the primitive it polymorphically renders as) rather than re-declaring `onClick`, `className`, etc. by hand
- `strict: true` in every package's `tsconfig.json` — no implicit `any`, no `// @ts-ignore` without a comment explaining why
- Discriminated unions for variant props with mutually exclusive shapes (e.g. a `Toast` that's either `description`-only or has `action`), not optional-everything

## Error Handling (dev-time misuse, not runtime try/catch)
- A sub-part rendered outside its compound root throws a clear, actionable error in development (e.g. `"Dialog.Trigger must be used within Dialog.Root"`) — use a context with a `null` default and check it, don't silently no-op
- Passing both `value` and `defaultValue` (or omitting `onValueChange` while controlled) warns once in development via the shared `warn()` util — never throws in production
- Dev-only warnings are gated by `process.env.NODE_ENV !== 'production'` so they strip from production builds entirely — never ship a `console.warn` that survives tree-shaking into a consumer's prod bundle

## Logging
- No `console.log` anywhere in `packages/*` source — use the shared dev-only `warn()`/`invariant()` utils from `@sandbar-ui/core`
- `apps/docs`/`apps/playground` may log for their own debugging but nothing ships to a published package

## Async Patterns
- `async/await` over `.then()/.catch()` chains — mainly relevant in `@sandbar-ui/cli` (codemods, scaffolding) and `apps/docs` (MDX/data loading)
- Components themselves are almost entirely synchronous render logic; async state (e.g. `Combobox` remote options) is the consumer's responsibility via props, not baked into the component

## Forbidden Patterns
```ts
// ✗ Runtime CSS-in-JS — breaks the zero-runtime, RSC-safe styling contract
import styled from 'styled-components';

// ✗ Inline style objects for anything expressible as a token
<div style={{ padding: '16px', color: '#0F766E' }} />

// ✗ Conditional class names for component state — use data attributes + the recipe
<div className={open ? 'dialog-open' : 'dialog-closed'} />

// ✗ Hand-rolled controlled/uncontrolled logic instead of the shared hook
const [open, setOpen] = useState(props.defaultOpen); // duplicates useControllableState

// ✗ cloneElement-based asChild instead of the shared Slot primitive
return cloneElement(children, { onClick: handleClick });

// ✗ Hardcoded hex/rgb color anywhere in packages/react — must come from a token
const styles = { background: '#0F766E' };

// ✗ 'use client' at a barrel or package-entry file
// packages/react/src/index.ts
'use client';
export * from './Dialog';
```

## React / Next.js Idioms
- `'use client'` only in leaf files that use state, effects, refs to DOM nodes for imperative work, or browser-only APIs — pushed to the smallest file, never a barrel
- `ref` forwarding on every component (`forwardRef` or React 19's ref-as-prop, per whatever the ADR settles on for the codebase-wide convention) — no exceptions, including components that don't render a DOM node directly (forward to the underlying `asChild`/Slot target)
- Full DOM prop spreading (`{...rest}`) after applying the component's own resolved props/classes, so consumer overrides (`className`, `style`, `data-*`, event handlers) win predictably
- IDs generated with `useId()`, never `Math.random()`/a module-level counter — required for SSR/hydration determinism
- No `window`/`document` access at module scope — guard behind `typeof window !== 'undefined'` or defer to an effect/`useIsomorphicLayoutEffect`
- `useMemo`/`useCallback` only for measurably expensive work or to satisfy a dependency identity contract (e.g. context value stability) — don't reflexively wrap every function

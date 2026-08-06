# React Patterns

## Compound Components
Anything with sub-parts is a compound component: a `Root` owns state via context, parts consume it.
```tsx
// packages/react/src/Dialog/Dialog.tsx
const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(part: string) {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error(`Dialog.${part} must be used within Dialog.Root`);
  return ctx;
}

function Root({ open, defaultOpen, onOpenChange, children }: DialogRootProps) {
  const [isOpen, setIsOpen] = useControllableState({ value: open, defaultValue: defaultOpen ?? false, onChange: onOpenChange });
  return <DialogContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>{children}</DialogContext.Provider>;
}

const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({ asChild, ...props }, ref) => {
  const { setOpen } = useDialogContext('Trigger');
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} data-state={/* open ? 'open' : 'closed' */ undefined} onClick={() => setOpen(true)} {...props} />;
});

export const Dialog = { Root, Trigger, Content, Close, Title, Description };
```
Consumers compose: `<Dialog.Root><Dialog.Trigger asChild><MyButton/></Dialog.Trigger><Dialog.Content>...</Dialog.Content></Dialog.Root>`.

## `asChild` — the Slot Pattern
`asChild` merges the component's behavior/props onto the single child element instead of rendering its own DOM node — the primary style/element escape hatch (Radix Slot pattern). Implement via a shared `Slot` primitive in `@panux-ui/core`, never ad hoc `cloneElement`:
```tsx
// packages/core/src/Slot/Slot.tsx
export const Slot = forwardRef<HTMLElement, SlotProps>(({ children, ...slotProps }, ref) => {
  if (!isValidElement(children)) return null;
  return cloneElement(children, {
    ...mergeProps(slotProps, children.props), // merges event handlers, className, style — not last-write-wins
    ref: mergeRefs(ref, (children as any).ref),
  });
});
```
Every interactive component takes `asChild?: boolean` and swaps its rendered tag for `Slot` — this is what lets `<Button asChild><Link href="/x">Go</Link></Button>` render a real `<a>` with Button's styling and behavior, no wrapper `<button><a/></button>` nesting.

## Controlled + Uncontrolled — `useControllableState`
Every stateful component supports both modes through one shared hook — never hand-rolled per component:
```ts
// packages/core/src/useControllableState/useControllableState.ts
function useControllableState<T>({ value, defaultValue, onChange }: {
  value?: T; defaultValue: T; onChange?: (value: T) => void;
}): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;
  const setState = useCallback((next: T) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }, [isControlled, onChange]);
  return [current, setState];
}
```
In development, warn once if a component flips between controlled and uncontrolled across renders (a common consumer bug) — see `coding-standards.md` §Error Handling.

## Data Attributes Over Class Names
State is exposed via `data-*` so both the recipe/styling engine and consumer CSS can target it without reaching into JS:
```tsx
<div
  data-state={open ? 'open' : 'closed'}
  data-disabled={disabled ? '' : undefined}
  data-orientation={orientation}
  data-side={side}
  className={recipe({ variant, size })}
/>
```
Never `className={open ? 'is-open' : ''}` — the recipe consumes `data-state` via a selector (`&[data-state="open"]`), keeping style logic in the compile-time engine, not scattered template strings.

## SSR / RSC Safety
- No `window`/`document`/`localStorage` access at module scope — breaks server rendering entirely, not just a lint nit
- IDs via `useId()` for anything that needs a stable id across server and client render (label/input pairing, `aria-describedby` targets) — never a module-level counter or `Math.random()`
- `useIsomorphicLayoutEffect` (falls back to `useEffect` on the server) for anything that would otherwise warn about `useLayoutEffect` during SSR
- `"use client"` goes on the smallest leaf file that actually needs it — a compound component's `Root` (owns state) and interactive parts (`Trigger`, `Close`) need it; a purely presentational part with no hooks does not

## Docs Site Client/Server Boundary
`apps/docs` defaults to Server Components, same discipline as any Next.js App Router site. Push `'use client'` to the smallest leaf: the page shell, nav, and static MDX content stay server-rendered; only the live playground (`Sandpack`/`react-live` runner), the theme switcher, the Cmd+K search palette, and the LTR/RTL toggle are client islands. A component's MDX doc page itself is not a client component just because it *contains* a live example — only the example runner is.

## Key Rules
| Pattern | Rule |
|---------|------|
| Sub-parts | Compound component (`Component.Part`) backed by context, not prop-drilled booleans |
| Style/element override | `asChild` via the shared `Slot` primitive — never `cloneElement` ad hoc |
| Stateful value | `useControllableState` — every component supports controlled + uncontrolled |
| State styling | `data-*` attributes, consumed by the recipe — never conditional class names |
| `ref` | Forwarded on every component, including `asChild` targets |
| DOM props | Spread `{...rest}` after the component's own resolved props so overrides win |
| IDs | `useId()` — never `Math.random()`/module counters |
| `'use client'` | Smallest leaf file only — never a barrel or package entry |
| Variant styling | Recipe/token system — never inline `style={{}}` except a genuinely dynamic value (e.g. a computed transform) |

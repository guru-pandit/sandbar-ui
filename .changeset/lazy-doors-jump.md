---
"@panux-ui/core": minor
"@panux-ui/react": minor
---

Add the Phase 3 headless primitives and hooks: `Slot` (asChild pattern, with prop/ref merging), `Portal` (SSR-safe teleport to `document.body` or a custom container), `VisuallyHidden`, `useMergedRefs`, `useDismissable` (outside-click + Escape), `useFocusTrap` (Tab-cycling, initial focus, focus restore on unmount), and a re-exported `useId`. `@panux-ui/react` adds `Box` (the minimal polymorphic `as`/`asChild` primitive — full Layout deliverable lands in Phase 5) and re-exports `Slot`/`Portal`/`VisuallyHidden` for convenience.

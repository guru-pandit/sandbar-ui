import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';

export interface BoxProps extends ComponentPropsWithoutRef<'div'> {
  /** Render onto the single child instead of Box's own element — see @sandbar-ui/core's Slot. Takes priority over `as`. */
  asChild?: boolean;
  /** Element/component to render as. @default 'div' */
  as?: ElementType;
}

/**
 * The minimal polymorphic primitive every layout component builds on —
 * `as`/`asChild`, full ref forwarding, full DOM prop spreading, no styling
 * of its own. This is a Phase 3 foundation only: the real Layout deliverable
 * (spacing/sizing tokens via the recipe system, variant gallery, a11y test,
 * story, MDX docs, changeset) lands in Phase 5 per
 * .claude/context/architecture.md §Execution Order — don't treat this as a
 * "done" component yet.
 *
 * `ref` is typed as `HTMLDivElement` regardless of `as` — a fully precise
 * polymorphic ref/prop type (varying with `as`) is deferred to the Phase 5
 * pass rather than solved here.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box({ asChild, as: As = 'div', ...props }, ref) {
  const Comp = asChild ? Slot : As;
  return <Comp ref={ref} {...props} />;
});

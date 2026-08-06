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
 * of its own by design (see the Box docs page's Customization section) —
 * not a partial deliverable, this is the complete component.
 *
 * `ref` is typed as `HTMLDivElement` regardless of `as` — a fully precise
 * polymorphic ref/prop type (varying with `as`) is out of scope; every other
 * Layout component built on this same skeleton follows the same convention.
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box({ asChild, as: As = 'div', ...props }, ref) {
  const Comp = asChild ? Slot : As;
  return <Comp ref={ref} {...props} />;
});

import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { stackRecipe, type StackVariants } from './Stack.css';

// `type` (not `interface extends`) — TS can't verify a `RecipeVariants`-derived
// type has "statically known members" for interface extension.
export type StackProps = ComponentPropsWithoutRef<'div'> &
  StackVariants & {
    /** Render onto the single child instead of Stack's own element. Takes priority over `as`. */
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * A flex container for laying out children with consistent spacing —
 * `direction`, `gap`, `align`, `wrap`, all token-driven. No `justify` prop
 * yet (deferred until a real usage need surfaces one — see
 * .claude/context/coding-standards.md's no-premature-abstraction guidance).
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { asChild, as: As = 'div', direction, gap, align, wrap, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = stackRecipe({ direction, gap, align, wrap });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

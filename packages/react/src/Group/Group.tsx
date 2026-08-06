import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { groupRecipe, type GroupVariants } from './Group.css';

export type GroupProps = ComponentPropsWithoutRef<'div'> &
  GroupVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * A horizontal cluster of related controls — buttons, tags, filter chips —
 * with a tighter default `gap` than `Stack`. Row-only; use `Flex`/`Stack`
 * when the layout needs a `direction` axis.
 */
export const Group = forwardRef<HTMLDivElement, GroupProps>(function Group(
  { asChild, as: As = 'div', gap, align, wrap, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = groupRecipe({ gap, align, wrap });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

import { Slot } from '@panux-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { flexRecipe, type FlexVariants } from './Flex.css';

export type FlexProps = ComponentPropsWithoutRef<'div'> &
  FlexVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * The general-purpose flex container — `direction`, `align`, `justify`,
 * `gap`, `wrap`, all token-driven. Reach for `Stack` instead for the common
 * vertical/horizontal list case; `Flex` is the full escape hatch when a
 * layout needs `justify` or a reversed direction.
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { asChild, as: As = 'div', direction, align, justify, gap, wrap, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = flexRecipe({ direction, align, justify, gap, wrap });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

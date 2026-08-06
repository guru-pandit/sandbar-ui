import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { wrapRecipe, type WrapVariants } from './Wrap.css';

export type WrapProps = ComponentPropsWithoutRef<'div'> &
  WrapVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * A flex container that always wraps, with consistent spacing between both
 * items and wrapped rows — the standard layout for tag/chip lists whose
 * item count isn't known ahead of time.
 */
export const Wrap = forwardRef<HTMLDivElement, WrapProps>(function Wrap(
  { asChild, as: As = 'div', gap, align, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = wrapRecipe({ gap, align });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

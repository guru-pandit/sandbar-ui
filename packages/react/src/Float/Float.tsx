import { Slot } from '@panux-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { floatRecipe, type FloatVariants } from './Float.css';

export type FloatProps = ComponentPropsWithoutRef<'div'> &
  FloatVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * Absolutely-positions a child at a corner of its parent — e.g. a status
 * dot or count badge pinned to an `Avatar` corner. The parent must itself
 * establish a positioning context (`position: relative` or similar);
 * `Float` can't set that on the parent for you. `placement` uses logical
 * inline-start/end so the corner flips correctly under `dir="rtl"`.
 */
export const Float = forwardRef<HTMLDivElement, FloatProps>(function Float(
  { asChild, as: As = 'div', placement, offset, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = floatRecipe({ placement, offset });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

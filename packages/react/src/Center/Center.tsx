import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { centerRecipe, type CenterVariants } from './Center.css';

export type CenterProps = ComponentPropsWithoutRef<'div'> &
  CenterVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/** Centers its children both horizontally and vertically via flex. */
export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  { asChild, as: As = 'div', inline, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = centerRecipe({ inline });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

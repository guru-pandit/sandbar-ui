import { Slot } from '@panux-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { containerRecipe, type ContainerVariants } from './Container.css';

export type ContainerProps = ComponentPropsWithoutRef<'div'> &
  ContainerVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/** A centered, max-width content wrapper — the standard page/section shell. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { asChild, as: As = 'div', size, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = containerRecipe({ size });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

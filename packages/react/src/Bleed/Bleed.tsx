import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { bleedRecipe, type BleedVariants } from './Bleed.css';

export type BleedProps = ComponentPropsWithoutRef<'div'> &
  BleedVariants & {
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * Pulls content past a padded parent's edge via negative margin — e.g. a
 * full-bleed image inside a `Container`. `inline` bleeds horizontally,
 * `block` bleeds vertically; `inline` defaults to `md` (matching
 * `Container`'s own `space['4']` padding) so `<Bleed>` alone cancels the
 * standard container gutter with no extra props.
 */
export const Bleed = forwardRef<HTMLDivElement, BleedProps>(function Bleed(
  { asChild, as: As = 'div', inline, block, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = bleedRecipe({ inline, block });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

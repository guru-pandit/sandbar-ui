import { Slot } from '@panux-ui/core';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { headingRecipe, type HeadingVariants } from './Heading.css';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = ComponentPropsWithoutRef<'h1'> &
  HeadingVariants & {
    /** Render onto the single child instead of Heading's own element. */
    asChild?: boolean;
    /** Semantic heading level (h1–h6) — drives the rendered tag. Deliberately no `as` prop: unlike Box/Stack/Text, level IS the element here (visual `size` is independent, so a document-correct `<h2>` can still look like the largest heading). @default 2 */
    level?: HeadingLevel;
  };

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { asChild, level = 2, size, weight, color, className, ...props },
  ref,
) {
  const Tag = `h${level}` as const;
  const Comp = asChild ? Slot : Tag;
  const recipeClassName = headingRecipe({ size, weight, color });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

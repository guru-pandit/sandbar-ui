import { Slot } from '@panux-ui/core';
import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { simpleGridRecipe, type SimpleGridVariants } from './SimpleGrid.css';

export type SimpleGridProps = ComponentPropsWithoutRef<'div'> &
  SimpleGridVariants & {
    /** Fixed number of equal-width columns. Takes priority over `minChildWidth` if both are set. */
    columns?: number;
    /**
     * Responsive column count with no explicit breakpoints — each column is
     * at least this wide, wrapping to fewer columns as the container
     * shrinks (`repeat(auto-fit, minmax(minChildWidth, 1fr))`). Ignored
     * when `columns` is set.
     */
    minChildWidth?: string;
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * The common "N equal-width columns" grid — `columns` for a fixed count or
 * `minChildWidth` for a responsive count with no breakpoints, both
 * genuinely open-ended values applied via inline style rather than recipe
 * variants (same reasoning as `AspectRatio`'s `ratio`). Reach for `Grid`
 * instead for template areas, explicit rows, or child spans.
 */
export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(function SimpleGrid(
  { asChild, as: As = 'div', columns, minChildWidth, gap, className, style, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = simpleGridRecipe({ gap });
  const gridTemplateColumns =
    columns !== undefined
      ? `repeat(${columns}, minmax(0, 1fr))`
      : minChildWidth !== undefined
        ? `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
        : undefined;
  const resolvedStyle: CSSProperties | undefined = gridTemplateColumns ? { gridTemplateColumns, ...style } : style;
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      style={resolvedStyle}
      {...props}
    />
  );
});

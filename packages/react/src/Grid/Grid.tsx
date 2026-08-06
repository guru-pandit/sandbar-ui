import { Slot } from '@panux-ui/core';
import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { gridRecipe, type GridVariants } from './Grid.css';

export type GridProps = ComponentPropsWithoutRef<'div'> &
  GridVariants & {
    /**
     * Number of equal-width columns (`repeat(columns, minmax(0, 1fr))`) — a
     * genuinely open-ended integer, not a preset step, so it's a plain prop
     * applied via inline style rather than a recipe variant (same reasoning
     * as `AspectRatio`'s `ratio`). Omit to lay out columns yourself via
     * `style`/`className` (template areas, explicit track sizes, etc.).
     */
    columns?: number;
    asChild?: boolean;
    /** Element/component to render as. @default 'div' */
    as?: ElementType;
  };

/**
 * A CSS grid container — the general escape hatch for layouts `SimpleGrid`'s
 * fixed-column convenience doesn't cover (template areas, explicit rows,
 * child `gridColumn`/`gridRow` spans via plain `style`).
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { asChild, as: As = 'div', columns, gap, align, className, style, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = gridRecipe({ gap, align });
  const resolvedStyle: CSSProperties | undefined =
    columns !== undefined ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style } : style;
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      style={resolvedStyle}
      {...props}
    />
  );
});

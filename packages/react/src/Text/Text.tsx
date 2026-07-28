import { Slot } from '@sandbar-ui/core';
import { forwardRef, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { textRecipe, type TextVariants } from './Text.css';

export type TextProps = ComponentPropsWithoutRef<'span'> &
  TextVariants & {
    /** Render onto the single child instead of Text's own element. Takes priority over `as`. */
    asChild?: boolean;
    /** Element/component to render as. @default 'span' */
    as?: ElementType;
  };

/**
 * Inline/block text with token-driven `size`/`weight`/`color` variants — the
 * base for any body copy, labels, or captions. See `Heading` for section
 * titles (semantic `h1`–`h6`, larger default sizes).
 */
export const Text = forwardRef<HTMLSpanElement, TextProps>(function Text(
  { asChild, as: As = 'span', size, weight, color, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const recipeClassName = textRecipe({ size, weight, color });
  return (
    <Comp
      ref={ref}
      className={className ? `${recipeClassName} ${className}` : recipeClassName}
      {...props}
    />
  );
});

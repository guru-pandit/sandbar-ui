import { Slot } from '@sandbar-ui/core';
import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { aspectRatioClassName } from './AspectRatio.css';

export type AspectRatioProps = ComponentPropsWithoutRef<'div'> & {
  /** Width-to-height ratio of the content. @default 4 / 3 */
  ratio?: number;
  asChild?: boolean;
  /** Element/component to render as. @default 'div' */
  as?: ElementType;
};

/**
 * Constrains a single child (image, video, iframe, embed) to a fixed
 * width-to-height ratio via the CSS `aspect-ratio` property — no
 * padding-bottom hack.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(function AspectRatio(
  { asChild, as: As = 'div', ratio = 4 / 3, className, style, ...props },
  ref,
) {
  const Comp = asChild ? Slot : As;
  const resolvedStyle: CSSProperties = { aspectRatio: String(ratio), ...style };
  return (
    <Comp
      ref={ref}
      className={className ? `${aspectRatioClassName} ${className}` : aspectRatioClassName}
      style={resolvedStyle}
      {...props}
    />
  );
});

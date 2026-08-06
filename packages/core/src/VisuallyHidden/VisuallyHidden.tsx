import { forwardRef, type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '../Slot/Slot';

/**
 * The standard "visually hidden but present for assistive tech" clip
 * technique. Inline styles are the one legitimate exception to "no inline
 * style" here — this is a headless (@panux-ui/core) primitive with no
 * dependency on the styling engine, and the technique's exact values are
 * part of its correctness, not a themeable concern. See
 * .claude/context/coding-standards.md §Forbidden Patterns.
 */
const visuallyHiddenStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export interface VisuallyHiddenProps extends ComponentPropsWithoutRef<'span'> {
  asChild?: boolean;
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(function VisuallyHidden(
  { asChild, style, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'span';
  return <Comp ref={ref} style={{ ...visuallyHiddenStyle, ...style }} {...props} />;
});

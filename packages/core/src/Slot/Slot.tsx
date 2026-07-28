import {
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { useMergedRefs } from '../useMergedRefs/useMergedRefs';
import { warnOnce } from '../warn';
import { mergeProps } from './mergeProps';

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * The shared primitive behind every component's `asChild` prop — merges
 * Slot's resolved props/ref onto its single child element instead of
 * rendering its own DOM node. See .claude/context/react-patterns.md §asChild
 * — the Radix Slot pattern is not reimplemented ad hoc per component.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot({ children, ...slotProps }, ref) {
  if (!isValidElement(children)) {
    if (process.env.NODE_ENV !== 'production' && children != null) {
      warnOnce(
        'Slot:invalid-child',
        'Slot expected a single valid React element child (the asChild target) — extra props were not applied.',
      );
    }
    return null;
  }

  const child = children as ReactElement<Record<string, unknown> & { ref?: Ref<HTMLElement> }>;
  // React 19 exposes ref via props, not a separate element field — see
  // https://react.dev (element.props.ref is the supported access path).
  const childRef = child.props.ref;
  const mergedRef = useMergedRefs<HTMLElement>(ref, childRef);

  return cloneElement(child, {
    ...mergeProps(slotProps as Record<string, unknown>, child.props ?? {}),
    ref: mergedRef,
  });
});

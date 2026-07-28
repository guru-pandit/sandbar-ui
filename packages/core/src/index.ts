/**
 * @sandbar-ui/core — headless primitives, hooks, and context.
 *
 * See .claude/context/architecture.md §Layers — every styled component in
 * @sandbar-ui/react is built on these.
 */
export { Slot, type SlotProps } from './Slot/Slot';
export { Portal, type PortalProps } from './Portal/Portal';
export { VisuallyHidden, type VisuallyHiddenProps } from './VisuallyHidden/VisuallyHidden';

export { useControllableState } from './useControllableState/useControllableState';
export type { UseControllableStateProps } from './useControllableState/useControllableState';
export { useDismissable } from './useDismissable/useDismissable';
export type { UseDismissableOptions } from './useDismissable/useDismissable';
export { useFocusTrap } from './useFocusTrap/useFocusTrap';
export type { UseFocusTrapOptions } from './useFocusTrap/useFocusTrap';
export { useMergedRefs } from './useMergedRefs/useMergedRefs';

/** Re-exported for a consistent import surface alongside this package's other hooks. */
export { useId } from 'react';

export { invariant, warnOnce } from './warn';

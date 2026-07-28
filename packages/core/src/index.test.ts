import { describe, expect, it } from 'vitest';
import {
  invariant,
  Portal,
  Slot,
  useControllableState,
  useDismissable,
  useFocusTrap,
  useId,
  useMergedRefs,
  VisuallyHidden,
  warnOnce,
} from './index';

describe('@sandbar-ui/core barrel', () => {
  it('re-exports every primitive and hook', () => {
    expect(typeof Slot).toBe('object'); // forwardRef component
    expect(typeof Portal).toBe('function');
    expect(typeof VisuallyHidden).toBe('object'); // forwardRef component
    expect(typeof useControllableState).toBe('function');
    expect(typeof useDismissable).toBe('function');
    expect(typeof useFocusTrap).toBe('function');
    expect(typeof useMergedRefs).toBe('function');
    expect(typeof useId).toBe('function');
    expect(typeof invariant).toBe('function');
    expect(typeof warnOnce).toBe('function');
  });
});

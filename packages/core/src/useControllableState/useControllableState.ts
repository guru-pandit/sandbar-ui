import { useCallback, useRef, useState } from 'react';
import { warnOnce } from '../warn';

export interface UseControllableStateProps<T> {
  /** Controlled value. When provided (including `undefined` is treated as "not provided"), the component no longer manages its own state. */
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
  /** Component name, used only to make the dev-time controlled/uncontrolled-switch warning actionable. */
  name?: string;
}

/**
 * Backs every stateful component's controlled/uncontrolled dual support —
 * see .claude/context/react-patterns.md §Controlled + Uncontrolled. Never
 * hand-roll this per component.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
  name = 'component',
}: UseControllableStateProps<T>): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const wasControlled = useRef(isControlled);

  if (process.env.NODE_ENV !== 'production' && wasControlled.current !== isControlled) {
    warnOnce(
      `useControllableState:${name}`,
      `${name} switched between controlled and uncontrolled. Decide between passing \`value\` (controlled) or \`defaultValue\` (uncontrolled) and keep it consistent across renders.`,
    );
  }
  wasControlled.current = isControlled;

  const current = isControlled ? (value as T) : uncontrolled;

  const setState = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setState];
}

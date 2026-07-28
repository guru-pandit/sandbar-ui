import { useEffect, useRef, type RefObject } from 'react';

export interface UseDismissableOptions {
  enabled?: boolean;
  onDismiss: () => void;
}

/**
 * Calls `onDismiss` on an outside pointerdown or Escape — the shared
 * dismissal behavior every overlay (Popover, Dialog, Menu, ...) needs. Keeps
 * `onDismiss` in a ref internally so passing a fresh inline callback each
 * render doesn't tear down and re-subscribe the listeners.
 */
export function useDismissable(
  ref: RefObject<HTMLElement | null>,
  { enabled = true, onDismiss }: UseDismissableOptions,
): void {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (ref.current && target && !ref.current.contains(target)) {
        onDismissRef.current();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onDismissRef.current();
    }

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [enabled, ref]);
}

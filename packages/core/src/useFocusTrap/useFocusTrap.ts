import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// Checks inline style/hidden only, not full computed style (e.g. a
// stylesheet-driven `display: none` on an ancestor) — jsdom doesn't compute
// real layout, so getComputedStyle/getClientRects can't reliably tell
// visible from hidden in tests either. Good enough for the common case;
// revisit if a real component needs stricter visibility detection.
function isDisplayNone(el: HTMLElement): boolean {
  const style = el.style;
  return el.hidden || style.display === 'none' || style.visibility === 'hidden';
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !isDisplayNone(el),
  );
}

export interface UseFocusTrapOptions {
  enabled?: boolean;
}

/**
 * Traps Tab/Shift+Tab focus cycling within `ref`'s subtree, moves initial
 * focus to the first focusable descendant (or the container itself — give
 * it `tabIndex={-1}` if it may contain no focusable children) on mount, and
 * restores focus to whatever was focused beforehand on unmount. Required for
 * every overlay per .claude/context/testing-strategy.md's "Focus management
 * for overlays" must-have test.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  { enabled = true }: UseFocusTrapOptions = {},
): void {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = ref.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const initial = getFocusable(container)[0] ?? container;
    // A container with no focusable descendants and no tabindex of its own
    // is inert to `.focus()` in real browsers and jsdom alike — make it
    // programmatically focusable rather than relying on every consumer to
    // remember `tabIndex={-1}` on their overlay content.
    if (initial === container && !container.hasAttribute('tabindex')) {
      container.setAttribute('tabindex', '-1');
    }
    initial.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !container) return;
      const items = getFocusable(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      previouslyFocused.current?.focus();
    };
  }, [enabled, ref]);
}

import { useCallback, type Ref, type RefCallback } from 'react';

/**
 * Merges any number of refs (callback or object) into one callback ref — see
 * .claude/context/react-patterns.md §Compound Components / Slot pattern,
 * where `Slot` needs to merge its own forwarded ref with the child's. The
 * refs array is spread as the dependency list; its length is stable per call
 * site (same refs passed every render for a given usage) even though it
 * isn't a static literal — `useMergedRefs` itself is just generic over N refs.
 */
export function useMergedRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return useCallback((node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as { current: T | null }).current = node;
    }
  }, refs);
}

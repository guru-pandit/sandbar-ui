'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  /** DOM node to portal into. @default document.body */
  container?: Element | null;
}

/**
 * Teleports `children` to another DOM location (default `document.body`) —
 * the foundation every overlay (Dialog, Popover, Menu, Toast, ...) renders
 * through so its stacking context isn't constrained by wherever it's
 * mounted in the React tree. Mounts nothing until after the first client
 * render (no `document` access at module scope, and matches server-rendered
 * output for hydration) — see .claude/context/react-patterns.md §SSR/RSC Safety.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container ?? document.body);
}

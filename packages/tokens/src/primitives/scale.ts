/**
 * Non-color primitive scales — space, radii, shadows, z-index, motion, type.
 * See .claude/context/architecture.md §Design Token System.
 */

/** space.1 – space.24 on a 4px base grid, expressed in rem. */
export const space = Object.fromEntries(
  Array.from({ length: 24 }, (_, i) => [String(i + 1), `${((i + 1) * 0.25).toString()}rem`]),
) as Record<
  | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20'
  | '21' | '22' | '23' | '24',
  string
>;

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 8px -2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
  lg: '0 12px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
  xl: '0 24px 48px -8px rgb(0 0 0 / 0.18), 0 8px 16px -8px rgb(0 0 0 / 0.1)',
};

/** Semantic z-index scale — components reference these, never a raw number. */
export const zIndex = {
  dropdown: '1000',
  sticky: '1100',
  overlay: '1200',
  modal: '1300',
  popover: '1400',
  toast: '1500',
  tooltip: '1600',
};

export const duration = {
  fast: '120ms',
  normal: '200ms',
  slow: '320ms',
};

export const easing = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
};

/**
 * Reduced-motion fallback — every duration collapses to near-instant so
 * consumers don't have to special-case `prefers-reduced-motion` per
 * component (see .claude/context/design-system.md §Accessibility Baseline).
 */
export const durationReducedMotion = {
  fast: '0.01ms',
  normal: '0.01ms',
  slow: '0.01ms',
};

export const fontFamily = {
  ui: 'Inter, system-ui, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
  display: '"Inter Display", Inter, system-ui, sans-serif',
};

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const lineHeight = {
  tight: '1.2',
  normal: '1.5',
  relaxed: '1.7',
};

import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import {
  duration,
  durationReducedMotion,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radii,
  shadows,
  space,
  zIndex,
} from '../primitives/scale';

/**
 * Mode-independent tokens (same in light/dark/contrast) — applied once to
 * `.sandbar-ui-theme` rather than per `data-theme`, unlike colorVars.css.ts.
 */
export const staticVars = createGlobalTheme('.sandbar-ui-theme', {
  space,
  radius: radii,
  shadow: shadows,
  zIndex,
  duration,
  easing,
  font: {
    family: fontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  },
});

// prefers-reduced-motion: every duration collapses to near-instant so
// components never have to special-case this per animation — see
// .claude/context/design-system.md §Accessibility Baseline.
globalStyle('.sandbar-ui-theme', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      vars: {
        [staticVars.duration.fast]: durationReducedMotion.fast,
        [staticVars.duration.normal]: durationReducedMotion.normal,
        [staticVars.duration.slow]: durationReducedMotion.slow,
      },
    },
  },
});

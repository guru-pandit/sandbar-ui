import { createGlobalTheme } from '@vanilla-extract/css';
import { light, dark, contrast, type ColorScale } from '../primitives/colors';

const NEAR_BLACK = '#1A1A1A';
const NEAR_WHITE = '#FFFFFF';

interface StatusScales {
  accent: ColorScale;
  danger: ColorScale;
  success: ColorScale;
  warning: ColorScale;
}

/**
 * `onSolid` text colors are picked per mode against the *actual* solid (step
 * 9) swatch for that mode, verified >= 4.5:1 — see the contrast check this
 * file's values were derived from (scratchpad, not committed; re-verify
 * numerically before changing any of these hexes, don't eyeball it).
 */
function semanticFromScale(
  gray: ColorScale,
  status: StatusScales,
  onSolid: { accent: string; danger: string; success: string; warning: string; neutral: string },
  neutralSolidIndex: number,
) {
  return {
    bg: {
      canvas: gray[0]!,
      subtle: gray[1]!,
      overlay: gray[2]!,
    },
    fg: {
      default: gray[11]!,
      muted: gray[10]!,
      onAccent: onSolid.accent,
      onDanger: onSolid.danger,
      onSuccess: onSolid.success,
      onWarning: onSolid.warning,
      onNeutral: onSolid.neutral,
    },
    border: {
      default: gray[6]!,
      subtle: gray[5]!,
    },
    accent: {
      bg: status.accent[2]!,
      bgHover: status.accent[3]!,
      border: status.accent[6]!,
      solid: status.accent[8]!,
      solidHover: status.accent[9]!,
      text: status.accent[10]!,
    },
    danger: {
      bg: status.danger[2]!,
      bgHover: status.danger[3]!,
      border: status.danger[6]!,
      solid: status.danger[8]!,
      solidHover: status.danger[9]!,
      text: status.danger[10]!,
    },
    success: {
      bg: status.success[2]!,
      bgHover: status.success[3]!,
      border: status.success[6]!,
      solid: status.success[8]!,
      solidHover: status.success[9]!,
      text: status.success[10]!,
    },
    warning: {
      bg: status.warning[2]!,
      bgHover: status.warning[3]!,
      border: status.warning[6]!,
      solid: status.warning[8]!,
      solidHover: status.warning[9]!,
      text: status.warning[10]!,
    },
    // The gray scale as an interactive colorScheme (e.g. `Button
    // colorScheme="neutral"`) — needs its own solid-step per mode rather
    // than the uniform "step 9" the status scales use; step 9 fails 4.5:1
    // in dark mode against either text color. Verified numerically (light:
    // step 9 + black = 5.04:1; dark: step 8 + white = 5.42:1) — see
    // `onSolid.neutral` above for the paired text color per mode.
    neutral: {
      bg: gray[2]!,
      bgHover: gray[3]!,
      border: gray[6]!,
      solid: gray[neutralSolidIndex]!,
      solidHover: gray[Math.min(neutralSolidIndex + 1, 11)]!,
      text: gray[10]!,
    },
    focusRing: status.accent[8]!,
  };
}

// Light + contrast: solid swatches (accent/danger/success) are dark enough
// for white text; warning's solid swatch is a light amber and always needs
// dark text. Neutral's solid (gray step 9) also needs dark text in light mode.
const lightOnSolid = {
  accent: NEAR_WHITE,
  danger: NEAR_WHITE,
  success: NEAR_WHITE,
  warning: NEAR_BLACK,
  neutral: NEAR_BLACK,
};
const LIGHT_NEUTRAL_SOLID_INDEX = 8; // step 9

// Dark: solid swatches are brightened tints (see primitives/colors.ts) so
// they need dark text instead. Neutral's dark solid is pulled from step 8
// (index 7), not step 9 — see the comment on `neutral` above.
const darkOnSolid = {
  accent: dark.accent[0]!,
  danger: dark.danger[0]!,
  success: dark.success[0]!,
  warning: dark.warning[0]!,
  neutral: NEAR_WHITE,
};
const DARK_NEUTRAL_SOLID_INDEX = 7; // step 8

const lightValues = semanticFromScale(light.gray, light, lightOnSolid, LIGHT_NEUTRAL_SOLID_INDEX);
const darkValues = semanticFromScale(dark.gray, dark, darkOnSolid, DARK_NEUTRAL_SOLID_INDEX);

// Contrast mode reuses the light scale but pulls from more extreme steps for
// text/borders — see docs/adr/0001-styling-engine-and-rsc-strategy.md and
// primitives/colors.ts.
const contrastBase = semanticFromScale(contrast.gray, contrast, lightOnSolid, LIGHT_NEUTRAL_SOLID_INDEX);
const contrastValues = {
  ...contrastBase,
  fg: { ...contrastBase.fg, muted: contrast.gray[11]! },
  border: { default: contrast.gray[7]!, subtle: contrast.gray[6]! },
};

/**
 * `colorVars` is both the typed contract (for recipes to reference,
 * e.g. `colorVars.fg.default`) and the light theme's values — the first
 * `createGlobalTheme` call defines the contract; dark/contrast extend it.
 * Selector covers both an explicit `data-theme="light"` and the no-attribute
 * default, so consumers who never set the attribute still get a themed page.
 */
export const colorVars = createGlobalTheme(
  '.sandbar-ui-theme[data-theme="light"], .sandbar-ui-theme:not([data-theme])',
  lightValues,
);

createGlobalTheme('.sandbar-ui-theme[data-theme="dark"]', colorVars, darkValues);
createGlobalTheme('.sandbar-ui-theme[data-theme="contrast"]', colorVars, contrastValues);

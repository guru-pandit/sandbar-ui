/**
 * Primitive color scales — 12-step, Radix Colors-model (see
 * .claude/context/architecture.md §Design Token System). Values here are
 * hand-curated starting points, not output of a perceptual-uniformity
 * generator — `.claude/context/testing-strategy.md`'s manual QA pass and the
 * Phase 9 theme builder are where these get audited/refined further. Solid
 * steps (9) are verified against their paired text color for WCAG 2.2 AA
 * (>= 4.5:1) — see the contrast check referenced in this package's tests.
 *
 * Step meaning (both modes): 1 app bg, 2 subtle bg, 3 ui element bg, 4 hovered
 * ui bg, 5 active/selected ui bg, 6 subtle border, 7 ui element border,
 * 8 hovered border, 9 solid bg, 10 hovered solid bg, 11 low-contrast text,
 * 12 high-contrast text.
 */
export type ColorScale = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface ColorScales {
  gray: ColorScale;
  accent: ColorScale;
  danger: ColorScale;
  success: ColorScale;
  warning: ColorScale;
}

/** True cool gray — not blue-tinted (see .claude/context/design-system.md). */
const grayLight: ColorScale = [
  '#FCFCFC',
  '#F7F7F7',
  '#F0F0F0',
  '#E8E8E8',
  '#E0E0E0',
  '#D6D6D6',
  '#C4C4C4',
  '#A8A8A8',
  '#8A8A8A',
  '#7A7A7A',
  '#6B6B6B',
  '#1A1A1A',
];

const grayDark: ColorScale = [
  '#111111',
  '#191919',
  '#222222',
  '#2A2A2A',
  '#313131',
  '#3A3A3A',
  '#484848',
  '#606060',
  '#6E6E6E',
  '#7B7B7B',
  '#B4B4B4',
  '#EEEEEE',
];

/** Brand accent — deep teal-to-slate, #0F766E family. */
const accentLight: ColorScale = [
  '#FAFEFD',
  '#F1FBF9',
  '#E1F5F1',
  '#CFEEE9',
  '#B9E5DF',
  '#9DD8D0',
  '#78C6BB',
  '#3FAFA0',
  '#0F766E',
  '#0C5F58',
  '#0B6F65',
  '#063D38',
];

const accentDark: ColorScale = [
  '#0B1615',
  '#0E1E1C',
  '#123330',
  '#144440',
  '#16534E',
  '#1A655F',
  '#1F7A72',
  '#22938A',
  '#2DD4BF',
  '#5EEAD4',
  '#7DEDDC',
  '#CCFBF1',
];

const dangerLight: ColorScale = [
  '#FFFCFC',
  '#FFF7F7',
  '#FEEBEB',
  '#FFDBDB',
  '#FFC9C9',
  '#F9B4B4',
  '#F09A9A',
  '#E67373',
  '#DC2626',
  '#B91C1C',
  '#C22626',
  '#5F0F0F',
];

const dangerDark: ColorScale = [
  '#1A0F0F',
  '#220E0E',
  '#3A1414',
  '#4D1414',
  '#5E1919',
  '#6F2020',
  '#872626',
  '#A32E2E',
  '#F87171',
  '#FCA5A5',
  '#FCA5A5',
  '#FEE2E2',
];

const successLight: ColorScale = [
  '#FAFEFC',
  '#F1FBF6',
  '#E2F6EB',
  '#CDEEDC',
  '#B5E4CB',
  '#96D7B5',
  '#6FC599',
  '#3CAC79',
  '#15803D',
  '#166534',
  '#157F3B',
  '#0B3B1D',
];

const successDark: ColorScale = [
  '#0C1510',
  '#0F1D14',
  '#143322',
  '#16452C',
  '#195536',
  '#1D6842',
  '#227D4E',
  '#26975D',
  '#4ADE80',
  '#86EFAC',
  '#86EFAC',
  '#DCFCE7',
];

const warningLight: ColorScale = [
  '#FFFDFA',
  '#FFF9EE',
  '#FFF1D6',
  '#FFE6B8',
  '#FED999',
  '#F5C87A',
  '#E9B155',
  '#D6952E',
  '#D97706',
  '#B45309',
  '#92400E',
  '#451A03',
];

const warningDark: ColorScale = [
  '#171207',
  '#1F1709',
  '#34240B',
  '#452D0B',
  '#55380D',
  '#684510',
  '#7E5514',
  '#99691A',
  '#FBBF24',
  '#FCD34D',
  '#FCD34D',
  '#FEF3C7',
];

export const light: ColorScales = {
  gray: grayLight,
  accent: accentLight,
  danger: dangerLight,
  success: successLight,
  warning: warningLight,
};

export const dark: ColorScales = {
  gray: grayDark,
  accent: accentDark,
  danger: dangerDark,
  success: successDark,
  warning: warningDark,
};

/**
 * High-contrast mode: same hues, remapped to the more extreme steps of each
 * scale (text pulls from 12, borders from 8, solid stays at 9) rather than a
 * separate hand-tuned palette — see docs/adr/0001-styling-engine-and-rsc-strategy.md.
 */
export const contrast: ColorScales = light;

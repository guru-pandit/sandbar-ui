import { describe, expect, it } from 'vitest';
import { light, dark, contrast } from './colors';

function srgbToLinear(channel: number) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string) {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hexA: string, hexB: string) {
  const a = relativeLuminance(hexA);
  const b = relativeLuminance(hexB);
  const [lighter, darker] = a > b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}

const AA_NORMAL_TEXT = 4.5;

describe('primitive color scales', () => {
  it.each(['gray', 'accent', 'danger', 'success', 'warning'] as const)(
    '%s has exactly 12 valid hex steps in light and dark',
    (name) => {
      for (const scale of [light[name], dark[name]]) {
        expect(scale).toHaveLength(12);
        for (const hex of scale) {
          expect(hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        }
      }
    },
  );

  it('contrast mode reuses the light scale', () => {
    expect(contrast).toBe(light);
  });

  // These pairings are exactly what packages/tokens/src/semantic/colorVars.css.ts
  // uses for fg.onAccent/onDanger/onSuccess/onWarning and fg.default/fg.muted on
  // bg.canvas — a hard WCAG 2.2 AA gate per CLAUDE.md. If this test starts
  // failing after editing a hex in colors.ts, fix the hex, don't skip the test.
  it.each([
    ['light fg.default on bg.canvas', light.gray[11], light.gray[0]],
    ['light fg.muted on bg.canvas', light.gray[10], light.gray[0]],
    ['light onAccent (white) on accent solid', '#FFFFFF', light.accent[8]],
    ['light onDanger (white) on danger solid', '#FFFFFF', light.danger[8]],
    ['light onSuccess (white) on success solid', '#FFFFFF', light.success[8]],
    ['light onWarning (near-black) on warning solid', '#1A1A1A', light.warning[8]],
    ['dark fg.default on bg.canvas', dark.gray[11], dark.gray[0]],
    ['dark fg.muted on bg.canvas', dark.gray[10], dark.gray[0]],
    ['dark onAccent on accent solid', dark.accent[0], dark.accent[8]],
    ['dark onDanger on danger solid', dark.danger[0], dark.danger[8]],
    ['dark onSuccess on success solid', dark.success[0], dark.success[8]],
    ['dark onWarning on warning solid', dark.warning[0], dark.warning[8]],
    // neutral (gray-as-colorScheme) uses different solid steps per mode —
    // see the comment on `neutral` in colorVars.css.ts.
    ['light onNeutral (near-black) on neutral solid (gray step 9)', '#1A1A1A', light.gray[8]],
    ['dark onNeutral (white) on neutral solid (gray step 8)', '#FFFFFF', dark.gray[7]],
  ])('%s meets WCAG AA (>= 4.5:1)', (_label, fg, bg) => {
    expect(contrastRatio(fg as string, bg as string)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
  });
});

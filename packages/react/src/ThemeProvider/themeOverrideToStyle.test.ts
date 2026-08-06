import { colorVars } from '@panux-ui/tokens';
import { describe, expect, it } from 'vitest';
import { themeOverrideToStyle } from './themeOverrideToStyle';

describe('themeOverrideToStyle', () => {
  it('returns an empty object for no override', () => {
    expect(themeOverrideToStyle(undefined)).toEqual({});
  });

  it('maps a nested override onto the real generated CSS variable name', () => {
    const style = themeOverrideToStyle({ accent: { solid: '#ff0000' } }) as Record<string, string>;
    const varName = /var\((--[a-zA-Z0-9-]+)\)/.exec(colorVars.accent.solid)![1]!;
    expect(style[varName]).toBe('#ff0000');
  });

  it('ignores keys that do not exist in the contract', () => {
    const style = themeOverrideToStyle({ notARealKey: 'x' } as never);
    expect(Object.keys(style)).toHaveLength(0);
  });

  it('supports multiple overrides at once', () => {
    const style = themeOverrideToStyle({
      accent: { solid: '#ff0000' },
      danger: { solid: '#00ff00' },
    }) as Record<string, string>;
    expect(Object.values(style)).toEqual(expect.arrayContaining(['#ff0000', '#00ff00']));
  });
});

import { describe, expect, it } from 'vitest';
import { colorVars, staticVars, themeClassName } from './index';

describe('@sandbar-ui/tokens', () => {
  it('exposes a color contract of CSS var references', () => {
    expect(typeof colorVars.bg.canvas).toBe('string');
    expect(colorVars.bg.canvas).toContain('var(');
    expect(typeof colorVars.accent.solid).toBe('string');
  });

  it('exposes a static contract of CSS var references', () => {
    expect(typeof staticVars.space['4']).toBe('string');
    expect(typeof staticVars.radius.md).toBe('string');
  });

  it('exposes the literal theme root class name', () => {
    expect(themeClassName).toBe('sandbar-ui-theme');
  });
});

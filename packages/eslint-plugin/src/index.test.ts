import { describe, expect, it } from 'vitest';
import { version } from './index';

describe('@panux-ui/eslint-plugin', () => {
  it('exposes a version placeholder', () => {
    expect(version).toBe('0.0.0');
  });
});

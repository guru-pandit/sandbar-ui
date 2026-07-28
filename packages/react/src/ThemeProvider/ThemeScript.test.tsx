import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeScript } from './ThemeScript';

describe('ThemeScript', () => {
  // jsdom does not execute injected <script> content by default (vitest's
  // jsdom environment doesn't enable `runScripts: 'dangerously'`), so this
  // asserts the static source is well-formed rather than its runtime effect
  // — ThemeProvider.test.tsx covers the resulting data-theme attribute via
  // the (untestable-in-jsdom) script's real-browser behavior being mimicked
  // by ThemeProvider's own server-rendered default.
  it('renders a script tag with no dynamic interpolation of props', () => {
    const { container } = render(<ThemeScript />);
    const script = container.querySelector('script');
    expect(script).not.toBeNull();
    const source = script!.innerHTML;
    expect(source).toContain('sandbar-ui-theme');
    expect(source).toContain('document.currentScript');
    expect(source).toContain('prefers-color-scheme: dark');
  });

  it('is a plain function component with no hooks (safe as a Server Component)', () => {
    expect(ThemeScript.toString()).not.toMatch(/useState|useEffect|useContext/);
  });
});

import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

function Consumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>go dark</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the panux-ui-theme root with the default theme', () => {
    render(
      <ThemeProvider>
        <p>content</p>
      </ThemeProvider>,
    );
    const root = screen.getByText('content').parentElement!;
    expect(root).toHaveClass('panux-ui-theme');
    expect(root).toHaveAttribute('data-theme', 'light');
  });

  it('respects defaultTheme (uncontrolled)', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <p>content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('is driven by `theme` when controlled', () => {
    const { rerender } = render(
      <ThemeProvider theme="contrast">
        <p>content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'contrast');

    rerender(
      <ThemeProvider theme="dark">
        <p>content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('content').parentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('useTheme().setTheme updates the root when uncontrolled', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    await user.click(screen.getByText('go dark'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('persists the resolved theme to localStorage', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    await user.click(screen.getByText('go dark'));
    expect(window.localStorage.getItem('panux-ui-theme')).toBe('dark');
  });

  it('applies themeOverride as inline CSS custom properties using the real generated var name', () => {
    render(
      <ThemeProvider themeOverride={{ accent: { solid: '#ff0000' } }}>
        <p>content</p>
      </ThemeProvider>,
    );
    const root = screen.getByText('content').parentElement!;
    const value = Array.from(root.style)
      .filter((prop) => prop.startsWith('--panux-'))
      .map((prop) => root.style.getPropertyValue(prop))
      .find((v) => v === '#ff0000');
    expect(value).toBe('#ff0000');
  });

  it('useTheme throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(/useTheme must be used within ThemeProvider/);
  });

  it('warns once if a consumer switches between controlled and uncontrolled', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const user = userEvent.setup();

    function Wrapper() {
      const [controlled, setControlled] = useState(false);
      return (
        <ThemeProvider theme={controlled ? 'dark' : undefined}>
          <button onClick={() => setControlled(true)}>switch</button>
        </ThemeProvider>
      );
    }

    render(<Wrapper />);
    await user.click(screen.getByText('switch'));

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('ThemeProvider'));
    warnSpy.mockRestore();
  });
});

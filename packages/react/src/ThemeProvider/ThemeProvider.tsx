'use client';

import { invariant, useControllableState } from '@sandbar-ui/core';
import { themeClassName, type ThemeMode, type ThemeOverride } from '@sandbar-ui/tokens';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ComponentPropsWithoutRef,
} from 'react';
import { STORAGE_KEY, ThemeScript } from './ThemeScript';
import { themeOverrideToStyle } from './themeOverrideToStyle';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps extends ComponentPropsWithoutRef<'div'> {
  /** Uncontrolled initial theme — ignored once `theme` is passed. @default 'light' */
  defaultTheme?: ThemeMode;
  /** Controlled theme. */
  theme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
  /** Runtime token overrides, applied as inline CSS custom properties on the theme root. */
  themeOverride?: ThemeOverride;
}

/**
 * Owns theme state and renders the `.sandbar-ui-theme` root element every
 * semantic token selector targets (see packages/tokens/src/semantic/colorVars.css.ts).
 * Renders `ThemeScript` internally so nesting `ThemeProvider` anywhere in the
 * tree (not just at the app root) still gets no-FOUC correction scoped to
 * that instance — see docs/adr/0001-styling-engine-and-rsc-strategy.md.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  theme,
  onThemeChange,
  themeOverride,
  className,
  style,
  ...rest
}: ThemeProviderProps) {
  const [resolvedTheme, setResolvedTheme] = useControllableState<ThemeMode>({
    value: theme,
    defaultValue: defaultTheme,
    onChange: onThemeChange,
    name: 'ThemeProvider',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, resolvedTheme);
    } catch {
      // localStorage unavailable (private browsing, disabled) — theme still
      // works for the session, just doesn't persist.
    }
  }, [resolvedTheme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme: resolvedTheme, setTheme: setResolvedTheme }),
    [resolvedTheme, setResolvedTheme],
  );

  const overrideStyle = useMemo(() => themeOverrideToStyle(themeOverride), [themeOverride]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        className={className ? `${themeClassName} ${className}` : themeClassName}
        data-theme={resolvedTheme}
        style={{ ...overrideStyle, ...style }}
        suppressHydrationWarning
        {...rest}
      >
        <ThemeScript />
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  invariant(ctx, 'useTheme must be used within ThemeProvider');
  return ctx;
}

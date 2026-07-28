'use client';

import { useTheme } from '@sandbar-ui/react';
import type { ThemeMode } from '@sandbar-ui/tokens';

const MODES: { value: ThemeMode; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'dark', label: 'Dark', icon: '☾' },
  { value: 'contrast', label: 'Contrast', icon: '◐' },
];

/**
 * PROMPT.md's "one theme switcher re-themes all examples in place" — this
 * drives `@sandbar-ui/react`'s `ThemeProvider` directly (the actual
 * `--sandbar-*` tokens every component example/playground on the page
 * reads). Fumadocs' own chrome (sidebar/nav background) is intentionally
 * NOT wired to this — its `themeSwitch` is disabled in app/docs/layout.tsx
 * to avoid a second, unrelated toggle. Full unification is tracked as
 * follow-up — see app/layout.tsx's comment.
 *
 * Self-contained opaque background (not transparent) is deliberate: this
 * renders inside Fumadocs' nav, whose background color is independent of
 * `--sandbar-*` (the two theme systems aren't unified yet) — a transparent
 * background here previously made unselected buttons invisible whenever
 * Fumadocs' chrome happened to be dark.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      style={{
        display: 'inline-flex',
        gap: 2,
        padding: 2,
        borderRadius: 8,
        background: 'var(--sandbar-bg-subtle)',
        border: '1px solid var(--sandbar-border-default)',
        marginRight: 4,
      }}
    >
      {MODES.map(({ value, label, icon }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: 'none',
            background: theme === value ? 'var(--sandbar-accent-solid)' : 'transparent',
            color: theme === value ? 'var(--sandbar-fg-onAccent)' : 'var(--sandbar-fg-default)',
            cursor: 'pointer',
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          <span aria-hidden="true">{icon}</span>
        </button>
      ))}
    </div>
  );
}

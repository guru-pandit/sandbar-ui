import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '../../lib/source';
import { ThemeSwitcher } from '../ThemeSwitcher';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ title: <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>Panux UI</span> }}
      // Swaps Fumadocs' own theme switch (next-themes, unrelated to
      // @panux-ui/react's ThemeProvider) for ours, in the same top-right
      // navbar slot — see app/ThemeSwitcher.tsx.
      themeSwitch={{ component: <ThemeSwitcher /> }}
    >
      {children}
    </DocsLayout>
  );
}

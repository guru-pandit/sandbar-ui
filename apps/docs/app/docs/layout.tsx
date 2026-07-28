import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '../../lib/source';
import { ThemeSwitcher } from '../ThemeSwitcher';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>Sandbar UI</span>,
        children: <ThemeSwitcher />,
      }}
      // Fumadocs' built-in theme switch is disabled here — it drives its own
      // next-themes state, unrelated to @sandbar-ui/react's ThemeProvider.
      // `ThemeSwitcher` above replaces it. See app/ThemeSwitcher.tsx.
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}

import { ThemeProvider } from '@sandbar-ui/react';
import '@sandbar-ui/tokens/styles.css';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sandbar UI',
  description: 'The container for your interface.',
};

/**
 * Two theme systems currently run side by side, not yet unified — a known
 * Phase 4 gap, not an oversight: `ThemeProvider`/`useTheme` (@sandbar-ui/react)
 * themes the actual component examples via `--sandbar-*` tokens;
 * Fumadocs' `RootProvider` independently themes its own docs-site chrome
 * (sidebar, nav, search) via next-themes/`.dark`. PROMPT.md's "one theme
 * switcher re-themes everything in place" requirement means these need to
 * be driven from a single source — tracked as follow-up, see apps/docs/README.md.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

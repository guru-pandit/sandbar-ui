import { Placeholder, version } from '@sandbar-ui/react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Sandbar UI</h1>
      <p>The container for your interface.</p>
      <p>Phase 4 scaffold — @sandbar-ui/react placeholder version {version}.</p>
      <Placeholder />
      <ThemeSwitcher />
      <p>
        <Link href="/docs">Read the docs →</Link>
      </p>
    </main>
  );
}

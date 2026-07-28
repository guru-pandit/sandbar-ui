import { Placeholder, ThemeProvider, version } from '@sandbar-ui/react';

export function App() {
  return (
    <ThemeProvider>
      <h1>Sandbar UI Playground</h1>
      <p>Phase 1 scaffold — @sandbar-ui/react placeholder version {version}.</p>
      <Placeholder />
    </ThemeProvider>
  );
}

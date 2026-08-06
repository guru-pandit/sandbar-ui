import { Placeholder, ThemeProvider, version } from '@panux-ui/react';

export function App() {
  return (
    <ThemeProvider>
      <h1>Panux UI Playground</h1>
      <p>Phase 1 scaffold — @panux-ui/react placeholder version {version}.</p>
      <Placeholder />
    </ThemeProvider>
  );
}

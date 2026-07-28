---
"@sandbar-ui/react": minor
"@sandbar-ui/core": minor
---

Add `ThemeProvider`, `useTheme`, and `ThemeScript` (`@sandbar-ui/react`), and `useControllableState`, `invariant`, `warnOnce` (`@sandbar-ui/core`). `ThemeProvider` renders the `.sandbar-ui-theme` root, supports controlled/uncontrolled theme state and runtime token overrides (`themeOverride`), and persists the resolved theme to `localStorage`. `ThemeScript` is independently importable as a zero-client-JS Server Component for the no-FOUC inline script.

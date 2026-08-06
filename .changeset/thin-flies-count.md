---
"@panux-ui/react": minor
"@panux-ui/core": minor
---

Add `ThemeProvider`, `useTheme`, and `ThemeScript` (`@panux-ui/react`), and `useControllableState`, `invariant`, `warnOnce` (`@panux-ui/core`). `ThemeProvider` renders the `.panux-ui-theme` root, supports controlled/uncontrolled theme state and runtime token overrides (`themeOverride`), and persists the resolved theme to `localStorage`. `ThemeScript` is independently importable as a zero-client-JS Server Component for the no-FOUC inline script.

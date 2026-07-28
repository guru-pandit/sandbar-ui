const STORAGE_KEY = 'sandbar-ui-theme';

/**
 * Static, build-time-authored script source — no dynamic interpolation of
 * runtime/user data, so `dangerouslySetInnerHTML` here is safe per
 * .claude/context/security-baseline.md. Runs synchronously via
 * `document.currentScript` before paint, correcting `data-theme` on its own
 * parent element (the `ThemeProvider` wrapper) from `localStorage` /
 * `prefers-color-scheme` — avoids a flash of the server-guessed default
 * theme. See docs/adr/0001-styling-engine-and-rsc-strategy.md §2 RSC Strategy.
 */
const SCRIPT_SOURCE = `(function(){try{var e=document.currentScript.parentElement;var s=localStorage.getItem('${STORAGE_KEY}');var m=(s==='light'||s==='dark'||s==='contrast')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');e.setAttribute('data-theme',m);}catch(err){}})();`;

/**
 * No `'use client'` — this is a plain Server Component (zero client JS of
 * its own) so a fully static page can opt into no-FOUC theming without
 * pulling in `ThemeProvider`'s interactive bundle. `ThemeProvider` also
 * renders this internally as its first child.
 */
export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: SCRIPT_SOURCE }} />;
}

export { STORAGE_KEY };

import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { sandbarShikiDark, sandbarShikiLight } from './shiki-theme';

const LANG_IMPORTS = {
  tsx: () => import('shiki/langs/tsx.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  bash: () => import('shiki/langs/bash.mjs'),
  json: () => import('shiki/langs/json.mjs'),
} as const;

export type HighlightLang = keyof typeof LANG_IMPORTS;

let highlighterPromise: Promise<HighlighterCore> | null = null;

/**
 * One highlighter instance, shared by every `Example` block on a page —
 * built on the fine-grained bundle (explicit langs/engine) so the docs site
 * never pulls in Shiki's full language set or the WASM oniguruma engine,
 * per .claude/context/architecture.md §Design & Quality Gates (Lighthouse
 * performance budget applies to apps/docs too).
 */
function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [sandbarShikiLight, sandbarShikiDark],
      langs: Object.values(LANG_IMPORTS).map((load) => load()),
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

/**
 * Highlights a hardcoded, developer-authored source string (never
 * consumer/user input — see .claude/context/security-baseline.md) into HTML
 * carrying both light and dark colors as CSS variables
 * (`--shiki-light`/`--shiki-dark`); apps/docs/app/shiki.css picks the active
 * one from `[data-theme]`.
 */
export async function highlightCode(code: string, lang: HighlightLang = 'tsx'): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'sandbar-light', dark: 'sandbar-dark' },
    defaultColor: false,
  });
}

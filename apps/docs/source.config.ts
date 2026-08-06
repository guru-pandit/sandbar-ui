import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { sandbarShikiDark, sandbarShikiLight } from './lib/shiki-theme';

export const docs = defineDocs({
  dir: 'content/docs',
});

/**
 * Fumadocs highlights plain markdown code fences (every ```tsx/```bash block
 * in MDX prose) through its own pipeline, separate from
 * app/components/Example.tsx's Code tab (lib/highlight.ts) — both must use
 * the same custom on-brand theme, not Fumadocs' default "github-light"/
 * "github-dark", per .claude/context/design-system.md §Originality
 * Requirement and CLAUDE.md's "no copied default highlighter theme" rule.
 * `defaultColor: false` matches lib/highlight.ts's approach: emit both
 * --shiki-light/--shiki-dark per token, apps/docs/app/shiki.css picks the
 * active one from [data-theme].
 */
export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: sandbarShikiLight, dark: sandbarShikiDark },
      defaultColor: false,
    },
  },
});

import { primitiveColors } from '@panux-ui/tokens';
import type { ThemeRegistrationRaw } from 'shiki';

/**
 * Custom on-brand Shiki theme built from @panux-ui/tokens' own primitive
 * color scales (deep teal accent + true cool gray + green/amber) — never a
 * copied default like "GitHub Dark"/"Dracula", per
 * .claude/context/design-system.md §Originality Requirement. Deliberately
 * restrained (4 hues, not a rainbow) to match the "direct, technical,
 * unhyped" brand voice.
 *
 * Scale index -> step (see packages/tokens/src/primitives/colors.ts):
 * [1]=step2 subtle bg, [8]=step9 solid, [9]=step10 hovered solid,
 * [10]=step11 low-contrast text, [11]=step12 high-contrast text.
 */
function buildTheme(
  name: string,
  type: 'light' | 'dark',
  scale: primitiveColors.ColorScales,
): ThemeRegistrationRaw {
  const { gray, accent, success, warning } = scale;
  return {
    name,
    type,
    colors: {
      'editor.background': gray[1],
      'editor.foreground': gray[11],
    },
    // `settings` — the TextMate-native key Shiki's theme engine actually
    // reads. `tokenColors` (the VSCode-theme-JSON name for the same data) is
    // declared on the type but never consumed by @shikijs/core — verified by
    // grepping its compiled output. Every rule must live here.
    settings: [
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: gray[10], fontStyle: 'italic' },
      },
      {
        scope: ['punctuation', 'punctuation.definition.tag', 'meta.tag', 'punctuation.separator'],
        settings: { foreground: gray[9] },
      },
      {
        scope: [
          'keyword',
          'keyword.control',
          'keyword.operator.new',
          'storage.type',
          'storage.modifier',
          'variable.language.this',
        ],
        settings: { foreground: accent[8] },
      },
      {
        scope: ['string', 'string.quoted', 'string.template'],
        settings: { foreground: success[8] },
      },
      {
        scope: ['constant.numeric', 'constant.language', 'constant.language.boolean'],
        settings: { foreground: warning[8] },
      },
      {
        scope: [
          'entity.name.tag',
          'entity.name.function',
          'support.class.component',
          'meta.function-call',
        ],
        settings: { foreground: accent[10], fontStyle: 'bold' },
      },
      {
        scope: ['entity.other.attribute-name', 'variable.parameter'],
        settings: { foreground: gray[11] },
      },
    ],
  };
}

export const panuxShikiLight = buildTheme('panux-light', 'light', primitiveColors.light);
export const panuxShikiDark = buildTheme('panux-dark', 'dark', primitiveColors.dark);

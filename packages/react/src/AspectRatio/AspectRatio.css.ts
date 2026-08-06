import { globalStyle, style } from '@vanilla-extract/css';

/**
 * No `recipe()` here — `ratio` is a continuous numeric value applied via
 * inline `style` on the component (the sanctioned exception in
 * .claude/context/react-patterns.md's Key Rules table: "a genuinely dynamic
 * value"), so there's no discrete variant set to enumerate. Child selectors
 * use `globalStyle` (not `recipe`'s `selectors`, which only supports
 * modifiers on the class's own element, e.g. `&:hover` — not descendant
 * combinators like `& > *`, since a single style block is meant to affect
 * only its own class).
 */
export const aspectRatioClassName = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

globalStyle(`${aspectRatioClassName} > *`, {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  margin: 0,
});

globalStyle(
  `${aspectRatioClassName} > img, ${aspectRatioClassName} > video, ${aspectRatioClassName} > iframe, ${aspectRatioClassName} > canvas`,
  { objectFit: 'cover' },
);

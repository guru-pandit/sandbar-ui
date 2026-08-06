import { staticVars } from '@panux-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * The general-purpose flexbox primitive — `Stack` is the opinionated
 * vertical/horizontal convenience built for simple lists; `Flex` exposes the
 * full `direction`/`align`/`justify` vocabulary for layouts that need it.
 * `gap` reuses the same `none/sm/md/lg` → `staticVars.space` steps as every
 * other Layout component's gap variant, for a consistent scale across the
 * category — see .claude/context/architecture.md §Design Token System.
 */
export const flexRecipe = recipe({
  base: {
    display: 'flex',
    boxSizing: 'border-box',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
      'row-reverse': { flexDirection: 'row-reverse' },
      'column-reverse': { flexDirection: 'column-reverse' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
      evenly: { justifyContent: 'space-evenly' },
    },
    gap: {
      none: { gap: 0 },
      sm: { gap: staticVars.space['2'] },
      md: { gap: staticVars.space['4'] },
      lg: { gap: staticVars.space['6'] },
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    gap: 'none',
    wrap: false,
  },
});

export type FlexVariants = RecipeVariants<typeof flexRecipe>;

import { staticVars } from '@panux-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * A flex container that always wraps — for tag/chip-style lists. `gap`
 * (CSS `gap`, not margin) spaces both wrapped rows and items in one
 * declaration, so there's no separate row/column gap prop to reconcile.
 */
export const wrapRecipe = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
  },
  variants: {
    gap: {
      none: { gap: 0 },
      sm: { gap: staticVars.space['2'] },
      md: { gap: staticVars.space['4'] },
      lg: { gap: staticVars.space['6'] },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
    },
  },
  defaultVariants: {
    gap: 'sm',
    align: 'start',
  },
});

export type WrapVariants = RecipeVariants<typeof wrapRecipe>;

import { staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * `columns` is a genuinely open-ended integer (not a preset step), so it's
 * applied via inline style on the component rather than a recipe variant —
 * see Grid.tsx. Only the discrete `gap`/`align` steps live here, reusing the
 * same `none/sm/md/lg` → `staticVars.space` scale as every other Layout gap
 * variant.
 */
export const gridRecipe = recipe({
  base: {
    display: 'grid',
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
      start: { alignItems: 'start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'end' },
      stretch: { alignItems: 'stretch' },
    },
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
  },
});

export type GridVariants = RecipeVariants<typeof gridRecipe>;

import { staticVars } from '@panux-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * `columns`/`minChildWidth` are genuinely open-ended values applied via
 * inline style on the component (see SimpleGrid.tsx), not recipe variants —
 * only the discrete `gap` step lives here.
 */
export const simpleGridRecipe = recipe({
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
  },
  defaultVariants: {
    gap: 'md',
  },
});

export type SimpleGridVariants = RecipeVariants<typeof simpleGridRecipe>;

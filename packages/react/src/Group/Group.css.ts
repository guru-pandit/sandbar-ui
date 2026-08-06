import { staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * A row-only cluster for actions/controls (buttons, tags) — no `direction`
 * prop by design, unlike `Flex`/`Stack`; reach for those when a layout needs
 * to switch axis. `gap` defaults tighter (`sm`) than `Stack`'s `md`, matching
 * an action cluster's denser spacing convention.
 */
export const groupRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
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
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
  },
  defaultVariants: {
    gap: 'sm',
    align: 'center',
    wrap: false,
  },
});

export type GroupVariants = RecipeVariants<typeof groupRecipe>;

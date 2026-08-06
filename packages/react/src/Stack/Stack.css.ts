import { staticVars } from '@panux-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * Component-tier tokens reference semantic/static tokens only, never
 * primitives directly — see .claude/context/architecture.md §Design Token
 * System. `gap: none` is a literal `0`, not a token — there is no
 * `space.0` entry in the primitive scale.
 */
export const stackRecipe = recipe({
  base: {
    display: 'flex',
    boxSizing: 'border-box',
  },
  variants: {
    direction: {
      vertical: { flexDirection: 'column' },
      horizontal: { flexDirection: 'row' },
    },
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
      stretch: { alignItems: 'stretch' },
    },
    wrap: {
      true: { flexWrap: 'wrap' },
      false: { flexWrap: 'nowrap' },
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: 'md',
    align: 'stretch',
    wrap: false,
  },
});

export type StackVariants = RecipeVariants<typeof stackRecipe>;

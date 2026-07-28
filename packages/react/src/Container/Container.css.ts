import { staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

// Breakpoint values are literal px strings — packages/tokens has no
// breakpoint scale yet (not part of the Phase 2 token system). Promote these
// to real tokens if/when a second component needs the same values.
export const containerRecipe = recipe({
  base: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: staticVars.space['4'],
    paddingRight: staticVars.space['4'],
    width: '100%',
    boxSizing: 'border-box',
  },
  variants: {
    size: {
      sm: { maxWidth: '640px' },
      md: { maxWidth: '768px' },
      lg: { maxWidth: '1024px' },
      xl: { maxWidth: '1280px' },
      full: { maxWidth: 'none' },
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type ContainerVariants = RecipeVariants<typeof containerRecipe>;

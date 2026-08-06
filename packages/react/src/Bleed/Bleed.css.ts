import { staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

/**
 * Component-tier tokens reference semantic/static tokens only, never
 * primitives directly — see .claude/context/architecture.md §Design Token
 * System. `staticVars.space[n]` is a `var(--sandbar-space-n)` reference (from
 * vanilla-extract's `createGlobalTheme`), so negating it needs `calc(...* -1)`
 * — a bare `-var(...)` isn't valid CSS. `none` is a literal `0`, matching the
 * `gap` scale's convention elsewhere in Layout (no `space.0` primitive).
 */
const negate = (token: string) => `calc(${token} * -1)`;

export const bleedRecipe = recipe({
  base: {
    boxSizing: 'border-box',
  },
  variants: {
    inline: {
      none: { marginInline: 0 },
      sm: { marginInline: negate(staticVars.space['2']) },
      md: { marginInline: negate(staticVars.space['4']) },
      lg: { marginInline: negate(staticVars.space['6']) },
    },
    block: {
      none: { marginBlock: 0 },
      sm: { marginBlock: negate(staticVars.space['2']) },
      md: { marginBlock: negate(staticVars.space['4']) },
      lg: { marginBlock: negate(staticVars.space['6']) },
    },
  },
  defaultVariants: {
    inline: 'md',
    block: 'none',
  },
});

export type BleedVariants = RecipeVariants<typeof bleedRecipe>;

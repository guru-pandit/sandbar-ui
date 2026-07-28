import { colorVars, staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const headingRecipe = recipe({
  base: {
    margin: 0,
    fontFamily: staticVars.font.family.ui,
    lineHeight: staticVars.font.lineHeight.tight,
  },
  variants: {
    size: {
      sm: { fontSize: staticVars.font.size.lg },
      md: { fontSize: staticVars.font.size.xl },
      lg: { fontSize: staticVars.font.size['2xl'] },
      xl: { fontSize: staticVars.font.size['3xl'] },
    },
    weight: {
      semibold: { fontWeight: staticVars.font.weight.semibold },
      bold: { fontWeight: staticVars.font.weight.bold },
    },
    color: {
      default: { color: colorVars.fg.default },
      muted: { color: colorVars.fg.muted },
      accent: { color: colorVars.accent.text },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'semibold',
    color: 'default',
  },
});

export type HeadingVariants = RecipeVariants<typeof headingRecipe>;

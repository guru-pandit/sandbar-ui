import { colorVars, staticVars } from '@panux-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const textRecipe = recipe({
  base: {
    margin: 0,
    fontFamily: staticVars.font.family.ui,
  },
  variants: {
    size: {
      xs: { fontSize: staticVars.font.size.xs },
      sm: { fontSize: staticVars.font.size.sm },
      md: { fontSize: staticVars.font.size.md },
      lg: { fontSize: staticVars.font.size.lg },
      xl: { fontSize: staticVars.font.size.xl },
    },
    weight: {
      regular: { fontWeight: staticVars.font.weight.regular },
      medium: { fontWeight: staticVars.font.weight.medium },
      semibold: { fontWeight: staticVars.font.weight.semibold },
      bold: { fontWeight: staticVars.font.weight.bold },
    },
    color: {
      default: { color: colorVars.fg.default },
      muted: { color: colorVars.fg.muted },
      accent: { color: colorVars.accent.text },
      danger: { color: colorVars.danger.text },
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'regular',
    color: 'default',
  },
});

export type TextVariants = RecipeVariants<typeof textRecipe>;

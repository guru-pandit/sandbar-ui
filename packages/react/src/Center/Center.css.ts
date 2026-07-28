import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const centerRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    inline: {
      true: { display: 'inline-flex' },
      false: {},
    },
  },
  defaultVariants: {
    inline: false,
  },
});

export type CenterVariants = RecipeVariants<typeof centerRecipe>;

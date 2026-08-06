import { staticVars } from '@sandbar-ui/tokens';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

type Placement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
type Offset = 'sm' | 'md' | 'lg';

const CORNER_PULL: Record<Placement, string> = {
  'top-start': 'translate(-50%, -50%)',
  'top-end': 'translate(50%, -50%)',
  'bottom-start': 'translate(-50%, 50%)',
  'bottom-end': 'translate(50%, 50%)',
};

const OFFSET_TOKEN: Record<Offset, string> = {
  sm: staticVars.space['1'],
  md: staticVars.space['2'],
  lg: staticVars.space['4'],
};

/**
 * Which corner + how far outside it sits are inherently a 2D combination
 * (the `inset*` property that carries the offset depends on which corner),
 * so real styles live in `compoundVariants` — `variants.placement`/`.offset`
 * exist only to give the recipe's TS/runtime API the two prop names; every
 * actual style declaration is generated once per placement×offset pair
 * below rather than hand-duplicated 12 times.
 */
export const floatRecipe = recipe({
  base: {
    position: 'absolute',
  },
  variants: {
    placement: {
      'top-start': {},
      'top-end': {},
      'bottom-start': {},
      'bottom-end': {},
    },
    offset: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  compoundVariants: (Object.keys(CORNER_PULL) as Placement[]).flatMap((placement) =>
    (Object.keys(OFFSET_TOKEN) as Offset[]).map((offset) => ({
      variants: { placement, offset },
      style: {
        ...(placement.startsWith('top')
          ? { insetBlockStart: OFFSET_TOKEN[offset] }
          : { insetBlockEnd: OFFSET_TOKEN[offset] }),
        ...(placement.endsWith('start')
          ? { insetInlineStart: OFFSET_TOKEN[offset] }
          : { insetInlineEnd: OFFSET_TOKEN[offset] }),
        transform: CORNER_PULL[placement],
      },
    })),
  ),
  defaultVariants: {
    placement: 'top-end',
    offset: 'sm',
  },
});

export type FloatVariants = RecipeVariants<typeof floatRecipe>;

/**
 * @sandbar-ui/react — the main styled component package.
 *
 * `Placeholder` is a Phase 1 scaffold placeholder proving the
 * package/build/Storybook wiring works end to end — it is not a real
 * component and carries none of the per-component deliverables required by
 * CLAUDE.md (no recipe, no variants, no a11y test). Delete it once the first
 * real component (Phase 5, starting with Button) lands.
 */
export const version = '0.0.0';
export { Placeholder } from './Placeholder';

export { ThemeProvider, useTheme, type ThemeProviderProps } from './ThemeProvider/ThemeProvider';
export { ThemeScript } from './ThemeProvider/ThemeScript';

export { AspectRatio, type AspectRatioProps } from './AspectRatio/AspectRatio';
export { Bleed, type BleedProps } from './Bleed/Bleed';
export { Box, type BoxProps } from './Box/Box';
export { Stack, type StackProps } from './Stack/Stack';
export { Container, type ContainerProps } from './Container/Container';
export { Center, type CenterProps } from './Center/Center';
export { Flex, type FlexProps } from './Flex/Flex';
export { Float, type FloatProps } from './Float/Float';
export { Grid, type GridProps } from './Grid/Grid';
export { Group, type GroupProps } from './Group/Group';
export { SimpleGrid, type SimpleGridProps } from './SimpleGrid/SimpleGrid';
export { Wrap, type WrapProps } from './Wrap/Wrap';
export { Text, type TextProps } from './Text/Text';
export { Heading, type HeadingProps } from './Heading/Heading';

// Re-exported from @sandbar-ui/core so consumers of the styled package don't
// need a separate dependency on the headless package for these.
export { Portal, Slot, VisuallyHidden } from '@sandbar-ui/core';
export type { PortalProps, SlotProps, VisuallyHiddenProps } from '@sandbar-ui/core';

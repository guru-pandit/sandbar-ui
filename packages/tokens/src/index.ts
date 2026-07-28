/**
 * @sandbar-ui/tokens — design tokens and theme contract.
 *
 * Three-tier system (primitive/semantic/component) — see
 * .claude/context/architecture.md §Design Token System. Component-tier
 * tokens live alongside each component's recipe in @sandbar-ui/react, not here.
 */
export * as primitiveColors from './primitives/colors';
export * as primitiveScale from './primitives/scale';
export { colorVars } from './semantic/colorVars.css';
export { staticVars } from './semantic/staticVars.css';
export { themeClassName } from './themeClassName';
export type { ColorContract, StaticContract, ThemeMode, ThemeOverride } from './contract';

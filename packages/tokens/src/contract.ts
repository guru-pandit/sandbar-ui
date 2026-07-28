import type { colorVars } from './semantic/colorVars.css';
import type { staticVars } from './semantic/staticVars.css';

export type ThemeMode = 'light' | 'dark' | 'contrast';

export type ColorContract = typeof colorVars;
export type StaticContract = typeof staticVars;

type DeepPartial<T> = T extends string ? string : { [K in keyof T]?: DeepPartial<T[K]> };

/**
 * Runtime theme override shape — a consumer supplies raw values (not var
 * references) for any subset of the color contract; `ThemeProvider` applies
 * them as inline CSS custom properties on its root element, cascading over
 * the static theme class beneath (see docs/adr/0001-styling-engine-and-rsc-strategy.md
 * §Theming Approach).
 */
export type ThemeOverride = DeepPartial<ColorContract>;

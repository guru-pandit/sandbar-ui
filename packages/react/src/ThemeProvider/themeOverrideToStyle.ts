import { colorVars, type ThemeOverride } from '@panux-ui/tokens';
import type { CSSProperties } from 'react';

const VAR_REF = /var\((--[a-zA-Z0-9-]+)\)/;

function extractVarName(varRef: string): string | null {
  const match = VAR_REF.exec(varRef);
  return match ? match[1]! : null;
}

/**
 * Walks a runtime override object (raw values) alongside the `colorVars`
 * contract (var-reference strings) in lockstep, so a consumer's
 * `{ accent: { solid: '#ff0000' } }` becomes `{ '--panux-accent-solid': '#ff0000' }` —
 * the actual generated variable name, not a guessed one. See
 * docs/adr/0001-styling-engine-and-rsc-strategy.md §3 Theming Approach.
 */
function walk(overrideNode: unknown, contractNode: unknown, out: Record<string, string>): void {
  if (typeof overrideNode === 'string') {
    if (typeof contractNode === 'string') {
      const varName = extractVarName(contractNode);
      if (varName) out[varName] = overrideNode;
    }
    return;
  }
  if (overrideNode && typeof overrideNode === 'object' && contractNode && typeof contractNode === 'object') {
    for (const key of Object.keys(overrideNode as Record<string, unknown>)) {
      walk(
        (overrideNode as Record<string, unknown>)[key],
        (contractNode as Record<string, unknown>)[key],
        out,
      );
    }
  }
}

export function themeOverrideToStyle(override: ThemeOverride | undefined): CSSProperties {
  if (!override) return {};
  const out: Record<string, string> = {};
  walk(override, colorVars, out);
  return out as CSSProperties;
}

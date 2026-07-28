import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';
import { preserveDirectivesPlugin } from './preserve-directives-plugin';
import { sandbarUiIdentifiers } from './vanilla-extract-identifiers';

// Known Phase 2 limitation: with a single `index.ts` entry, any client
// component anywhere in the barrel (currently just ThemeProvider) makes
// `preserveDirectivesPlugin` mark the *entire* dist/index.js as "use client"
// — server-safe exports like `Placeholder`/`ThemeScript` lose their
// zero-client-JS benefit when imported via the barrel specifically. Real
// per-component subpath entries (`@sandbar-ui/react/dialog`, per
// .claude/context/architecture.md §Build Pipeline) fix this properly and are
// due once there are enough real components to justify the build
// complexity — tracked for Phase 5+, not a Phase 2 blocker.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [
    vanillaExtractPlugin({ identifiers: sandbarUiIdentifiers }),
    preserveDirectivesPlugin(),
  ],
});

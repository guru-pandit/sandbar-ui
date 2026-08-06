import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { defineConfig } from 'tsup';
import { panuxUiIdentifiers } from './vanilla-extract-identifiers';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [vanillaExtractPlugin({ identifiers: panuxUiIdentifiers })],
});

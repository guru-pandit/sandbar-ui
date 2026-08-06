import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';
import { panuxUiIdentifiers } from './vanilla-extract-identifiers';

export default defineConfig({
  plugins: [vanillaExtractPlugin({ identifiers: panuxUiIdentifiers })],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});

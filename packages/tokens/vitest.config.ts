import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';
import { sandbarUiIdentifiers } from './vanilla-extract-identifiers';

export default defineConfig({
  plugins: [vanillaExtractPlugin({ identifiers: sandbarUiIdentifiers })],
  test: {
    environment: 'node',
  },
});

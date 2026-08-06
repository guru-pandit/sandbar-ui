import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import { panuxUiIdentifiers } from '../../../packages/react/vanilla-extract-identifiers';

const config: StorybookConfig = {
  stories: ['../../../packages/react/src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  // Every component recipe lives in a `.css.ts` file (vanilla-extract) —
  // without this plugin, Vite ships the file to the browser unprocessed and
  // vanilla-extract throws "Styles were unable to be assigned to a file"
  // for every single story (verified across Center/Stack/AspectRatio, not
  // specific to one component). `panuxUiIdentifiers` matches the same
  // identifier scheme packages/react's own build/vitest config uses, so
  // generated class names are consistent between Storybook and the real app.
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(vanillaExtractPlugin({ identifiers: panuxUiIdentifiers }));
    return viteConfig;
  },
};

export default config;

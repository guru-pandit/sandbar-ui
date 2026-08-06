import { ThemeProvider } from '@sandbar-ui/react';
import '@sandbar-ui/tokens/styles.css';
import { createElement } from 'react';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  // Every component reads `--sandbar-*` CSS variables via ThemeProvider's
  // `.sandbar-ui-theme[data-theme]` root — without this wrapper, stories
  // render with every color/token-driven style unset (transparent/inherit),
  // same class of gap as the missing vanilla-extract plugin in main.ts.
  decorators: [(Story) => createElement(ThemeProvider, null, createElement(Story))],
};

export default preview;

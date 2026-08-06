import { ThemeProvider } from '@panux-ui/react';
import '@panux-ui/tokens/styles.css';
import { createElement } from 'react';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  // Every component reads `--panux-*` CSS variables via ThemeProvider's
  // `.panux-ui-theme[data-theme]` root — without this wrapper, stories
  // render with every color/token-driven style unset (transparent/inherit),
  // same class of gap as the missing vanilla-extract plugin in main.ts.
  decorators: [(Story) => createElement(ThemeProvider, null, createElement(Story))],
};

export default preview;

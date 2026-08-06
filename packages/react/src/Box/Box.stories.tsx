import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'PanuxUI/Layout/Box',
  component: Box,
  argTypes: {
    as: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box style={{ padding: 16, background: '#F1FBF9', border: '1px solid #CFEEE9' }}>content</Box>
  ),
};

export const AsGallery: Story = {
  render: () => (
    <>
      {(['div', 'section', 'article', 'span'] as const).map((tag) => (
        <Box
          key={tag}
          as={tag}
          style={{ display: 'block', padding: 16, background: '#F1FBF9', border: '1px solid #CFEEE9', marginBottom: 8 }}
        >
          {`<${tag}>`}
        </Box>
      ))}
    </>
  ),
};

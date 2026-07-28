import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'SandbarUI/Layout/Container',
  component: Container,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Container {...args} style={{ background: '#F1FBF9', outline: '1px dashed #0F766E' }}>
      Container content
    </Container>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size} style={{ background: '#F1FBF9', outline: '1px dashed #0F766E' }}>
          size={size}
        </Container>
      ))}
    </div>
  ),
};

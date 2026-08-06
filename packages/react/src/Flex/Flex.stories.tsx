import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';

function Swatch({ label }: { label: string }) {
  return (
    <div style={{ padding: '10px 16px', background: '#0F766E', color: '#fff', borderRadius: 4, fontSize: 13 }}>
      {label}
    </div>
  );
}

const meta: Meta<typeof Flex> = {
  title: 'PanuxUI/Layout/Flex',
  component: Flex,
  argTypes: {
    direction: { control: 'radio', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    align: { control: 'radio', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'radio', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    wrap: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: { direction: 'row', gap: 'md' },
  render: (args) => (
    <Flex {...args}>
      <Swatch label="One" />
      <Swatch label="Two" />
      <Swatch label="Three" />
    </Flex>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((direction) => (
        <Flex key={direction} direction={direction} gap="sm">
          <Swatch label="One" />
          <Swatch label="Two" />
          <Swatch label="Three" />
        </Flex>
      ))}
    </Flex>
  ),
};

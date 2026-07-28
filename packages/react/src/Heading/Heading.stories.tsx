import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'SandbarUI/Typography/Heading',
  component: Heading,
  argTypes: {
    level: { control: 'radio', options: [1, 2, 3, 4, 5, 6] },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl'] },
    weight: { control: 'radio', options: ['semibold', 'bold'] },
    color: { control: 'radio', options: ['default', 'muted', 'accent'] },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: { level: 2, children: 'The container for your interface.' },
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Heading key={size} level={2} size={size}>
          size={size}
        </Heading>
      ))}
    </div>
  ),
};

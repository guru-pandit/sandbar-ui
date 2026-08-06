import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from './Group';

function Chip({ label }: { label: string }) {
  return (
    <div style={{ padding: '6px 12px', background: '#0F766E', color: '#fff', borderRadius: 999, fontSize: 13 }}>
      {label}
    </div>
  );
}

const meta: Meta<typeof Group> = {
  title: 'PanuxUI/Layout/Group',
  component: Group,
  argTypes: {
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
    wrap: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Group>;

export const Default: Story = {
  args: { gap: 'sm' },
  render: (args) => (
    <Group {...args}>
      <Chip label="One" />
      <Chip label="Two" />
      <Chip label="Three" />
    </Group>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <Group gap="lg" align="start" wrap>
      {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
        <Group key={gap} gap={gap} style={{ padding: 8, outline: '1px dashed #0F766E' }}>
          <Chip label="One" />
          <Chip label="Two" />
        </Group>
      ))}
    </Group>
  ),
};

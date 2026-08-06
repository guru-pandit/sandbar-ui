import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimpleGrid } from './SimpleGrid';

function Swatch({ label }: { label: string }) {
  return (
    <div style={{ padding: 16, background: '#F1FBF9', outline: '1px dashed #0F766E', fontSize: 13, textAlign: 'center' }}>
      {label}
    </div>
  );
}

const meta: Meta<typeof SimpleGrid> = {
  title: 'PanuxUI/Layout/SimpleGrid',
  component: SimpleGrid,
  argTypes: {
    columns: { control: 'number' },
    minChildWidth: { control: 'text' },
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof SimpleGrid>;

export const Default: Story = {
  args: { columns: 3, gap: 'md' },
  render: (args) => (
    <SimpleGrid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Swatch key={i} label={`${i + 1}`} />
      ))}
    </SimpleGrid>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {([2, 3, 4] as const).map((columns) => (
        <SimpleGrid key={columns} columns={columns} gap="sm">
          {Array.from({ length: columns * 2 }, (_, i) => (
            <Swatch key={i} label={`columns=${columns}`} />
          ))}
        </SimpleGrid>
      ))}
    </div>
  ),
};

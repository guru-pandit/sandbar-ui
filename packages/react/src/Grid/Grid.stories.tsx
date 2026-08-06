import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

function Swatch({ label }: { label: string }) {
  return (
    <div style={{ padding: 16, background: '#F1FBF9', outline: '1px dashed #0F766E', fontSize: 13, textAlign: 'center' }}>
      {label}
    </div>
  );
}

const meta: Meta<typeof Grid> = {
  title: 'PanuxUI/Layout/Grid',
  component: Grid,
  argTypes: {
    columns: { control: 'number' },
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    align: { control: 'radio', options: ['start', 'center', 'end', 'stretch'] },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: { columns: 3, gap: 'md' },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Swatch key={i} label={`${i + 1}`} />
      ))}
    </Grid>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {([2, 3, 4] as const).map((columns) => (
        <Grid key={columns} columns={columns} gap="sm">
          {Array.from({ length: columns * 2 }, (_, i) => (
            <Swatch key={i} label={`columns=${columns}`} />
          ))}
        </Grid>
      ))}
    </div>
  ),
};

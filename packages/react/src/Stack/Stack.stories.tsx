import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'PanuxUI/Layout/Stack',
  component: Stack,
  argTypes: {
    direction: { control: 'radio', options: ['vertical', 'horizontal'] },
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    align: { control: 'radio', options: ['start', 'center', 'end', 'stretch'] },
    wrap: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Stack>;

const Swatch = ({ label }: { label: string }) => (
  <div style={{ padding: 12, background: '#0F766E', color: 'white', borderRadius: 6 }}>{label}</div>
);

export const Default: Story = {
  args: { direction: 'vertical', gap: 'md', align: 'stretch' },
  render: (args) => (
    <Stack {...args}>
      <Swatch label="One" />
      <Swatch label="Two" />
      <Swatch label="Three" />
    </Stack>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <Stack gap="lg">
      {(['vertical', 'horizontal'] as const).map((direction) =>
        (['none', 'sm', 'md', 'lg'] as const).map((gap) => (
          <div key={`${direction}-${gap}`}>
            <p>
              direction={direction}, gap={gap}
            </p>
            <Stack direction={direction} gap={gap}>
              <Swatch label="A" />
              <Swatch label="B" />
            </Stack>
          </div>
        )),
      )}
    </Stack>
  ),
};

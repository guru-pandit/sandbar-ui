import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bleed } from './Bleed';

const meta: Meta<typeof Bleed> = {
  title: 'PanuxUI/Layout/Bleed',
  component: Bleed,
  argTypes: {
    inline: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    block: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Bleed>;

export const Default: Story = {
  args: { inline: 'md', block: 'none' },
  render: (args) => (
    <div style={{ padding: 24, background: '#F1FBF9', outline: '1px dashed #0F766E' }}>
      <Bleed {...args} style={{ background: '#0F766E', color: '#fff', padding: 12 }}>
        Bleed content
      </Bleed>
    </div>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((inline) => (
        <div key={inline} style={{ padding: 24, background: '#F1FBF9', outline: '1px dashed #0F766E' }}>
          <Bleed inline={inline} style={{ background: '#0F766E', color: '#fff', padding: 12 }}>
            inline={inline}
          </Bleed>
        </div>
      ))}
    </div>
  ),
};

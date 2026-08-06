import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'PanuxUI/Layout/AspectRatio',
  component: AspectRatio,
  argTypes: {
    ratio: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

const Swatch = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      background: '#0F766E',
      color: 'white',
    }}
  >
    content
  </div>
);

export const Default: Story = {
  args: { ratio: 4 / 3 },
  render: (args) => (
    <div style={{ width: 320 }}>
      <AspectRatio {...args}>
        <Swatch />
      </AspectRatio>
    </div>
  ),
};

export const RatioGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {[
        { label: '16/9', ratio: 16 / 9 },
        { label: '4/3', ratio: 4 / 3 },
        { label: '1/1', ratio: 1 },
        { label: '21/9', ratio: 21 / 9 },
      ].map(({ label, ratio }) => (
        <div key={label} style={{ width: 240 }}>
          <p>ratio={label}</p>
          <AspectRatio ratio={ratio}>
            <Swatch />
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};

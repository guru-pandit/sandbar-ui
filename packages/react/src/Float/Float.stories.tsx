import type { Meta, StoryObj } from '@storybook/react-vite';
import { Float } from './Float';

function Anchor({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: '#F1FBF9',
        outline: '1px dashed #0F766E',
      }}
    >
      {children}
    </div>
  );
}

function Dot() {
  return <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#0F766E', border: '2px solid #fff' }} />;
}

const meta: Meta<typeof Float> = {
  title: 'SandbarUI/Layout/Float',
  component: Float,
  argTypes: {
    placement: { control: 'radio', options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'] },
    offset: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof Float>;

export const Default: Story = {
  args: { placement: 'top-end', offset: 'sm' },
  render: (args) => (
    <Anchor>
      <Float {...args}>
        <Dot />
      </Float>
    </Anchor>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const).map((placement) => (
        <Anchor key={placement}>
          <Float placement={placement}>
            <Dot />
          </Float>
        </Anchor>
      ))}
    </div>
  ),
};

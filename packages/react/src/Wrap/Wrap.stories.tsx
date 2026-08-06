import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wrap } from './Wrap';

function Tag({ label }: { label: string }) {
  return (
    <div style={{ padding: '4px 10px', background: '#F1FBF9', outline: '1px solid #CFEEE9', borderRadius: 999, fontSize: 13 }}>
      {label}
    </div>
  );
}

const meta: Meta<typeof Wrap> = {
  title: 'SandbarUI/Layout/Wrap',
  component: Wrap,
  argTypes: {
    gap: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
  },
};

export default meta;

type Story = StoryObj<typeof Wrap>;

const tags = ['React', 'TypeScript', 'Vanilla Extract', 'Accessibility', 'Design Tokens', 'RSC', 'Turborepo'];

export const Default: Story = {
  args: { gap: 'sm' },
  render: (args) => (
    <Wrap {...args} style={{ maxWidth: 320 }}>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </Wrap>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((gap) => (
        <Wrap key={gap} gap={gap} style={{ maxWidth: 260 }}>
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Wrap>
      ))}
    </div>
  ),
};

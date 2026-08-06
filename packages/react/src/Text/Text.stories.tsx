import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'PanuxUI/Typography/Text',
  component: Text,
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    weight: { control: 'radio', options: ['regular', 'medium', 'semibold', 'bold'] },
    color: { control: 'radio', options: ['default', 'muted', 'accent', 'danger'] },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { children: 'The container for your interface.' },
};

export const VariantGallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) =>
        (['regular', 'medium', 'semibold', 'bold'] as const).map((weight) => (
          <Text key={`${size}-${weight}`} size={size} weight={weight}>
            size={size} weight={weight}
          </Text>
        )),
      )}
    </div>
  ),
};

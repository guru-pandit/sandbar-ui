import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from './Center';

const meta: Meta<typeof Center> = {
  title: 'PanuxUI/Layout/Center',
  component: Center,
  argTypes: {
    inline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Center>;

export const Default: Story = {
  args: { inline: false },
  render: (args) => (
    <Center {...args} style={{ width: 200, height: 100, background: '#F1FBF9' }}>
      centered
    </Center>
  ),
};

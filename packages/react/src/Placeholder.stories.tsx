import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from './Placeholder';

/**
 * Scaffold-only story proving apps/storybook resolves packages/react — not a
 * real component story. Delete alongside Placeholder.tsx once real components
 * land (Phase 5).
 */
const meta: Meta<typeof Placeholder> = {
  title: 'SandbarUI/_Scaffold/Placeholder',
  component: Placeholder,
};

export default meta;

type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {};

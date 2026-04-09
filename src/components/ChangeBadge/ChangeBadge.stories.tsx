import type { Meta, StoryObj } from '@storybook/react';
import { ChangeBadge } from './ChangeBadge';

const meta: Meta<typeof ChangeBadge> = {
  title: 'Liquid/ChangeBadge',
  component: ChangeBadge,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down'] },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ChangeBadge>;

export const Up: Story = {
  args: { value: '+2.4%', direction: 'up' },
};

export const Down: Story = {
  args: { value: '-1.8%', direction: 'down' },
};

export const LargeGain: Story = {
  args: { value: '+14.2%', direction: 'up' },
};

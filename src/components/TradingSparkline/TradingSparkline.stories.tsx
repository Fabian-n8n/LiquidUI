import type { Meta, StoryObj } from '@storybook/react';
import { TradingSparkline } from './TradingSparkline';

const meta: Meta<typeof TradingSparkline> = {
  title: 'Liquid/TradingSparkline',
  component: TradingSparkline,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down'] },
  },
};

export default meta;
type Story = StoryObj<typeof TradingSparkline>;

export const Uptrend: Story = {
  args: {
    bars: [0.3, 0.4, 0.35, 0.5, 0.6, 0.55, 0.8, 1.0],
    direction: 'up',
  },
};

export const Downtrend: Story = {
  args: {
    bars: [1.0, 0.85, 0.9, 0.7, 0.6, 0.5, 0.4, 0.3],
    direction: 'down',
  },
};

export const Volatile: Story = {
  args: {
    bars: [0.6, 0.2, 0.9, 0.3, 1.0, 0.4, 0.7, 0.5],
    direction: 'up',
  },
};

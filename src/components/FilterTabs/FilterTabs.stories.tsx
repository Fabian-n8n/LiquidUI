import type { Meta, StoryObj } from '@storybook/react';
import { FilterTabs } from './FilterTabs';

const meta: Meta<typeof FilterTabs> = {
  title: 'Liquid/FilterTabs',
  component: FilterTabs,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onChange: { action: 'tab changed' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterTabs>;

const MARKET_TABS = ['All', 'Crypto', 'Stocks', 'Forex', 'Commodities'];

export const Default: Story = {
  args: {
    tabs: MARKET_TABS,
    defaultActive: 'All',
  },
};

export const CryptoActive: Story = {
  args: {
    tabs: MARKET_TABS,
    defaultActive: 'Crypto',
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: ['All', 'Crypto', 'Stocks', 'Forex', 'Commodities', 'ETFs', 'Indices'],
    defaultActive: 'All',
  },
};

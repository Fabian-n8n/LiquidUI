import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrendingCard } from './TrendingCard';

const meta: Meta<typeof TrendingCard> = {
  title: 'Liquid/TrendingCard',
  component: TrendingCard,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down'] },
    onTrade: { action: 'trade clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TrendingCard>;

export const BitcoinUp: Story = {
  args: {
    ticker: 'BTC',
    name: 'Bitcoin',
    price: '$64,230',
    change: '+2.4%',
    direction: 'up',
    sparklineBars: [0.3, 0.4, 0.5, 0.6, 0.7, 0.65, 0.85, 1.0],
  },
};

export const EthereumDown: Story = {
  args: {
    ticker: 'ETH',
    name: 'Ethereum',
    price: '$3,421',
    change: '-1.8%',
    direction: 'down',
    sparklineBars: [1.0, 0.85, 0.9, 0.7, 0.6, 0.5, 0.4, 0.3],
  },
};

export const HorizontalScroll: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, padding: '0 20px', overflowX: 'auto', width: 390 }}>
      <TrendingCard ticker="BTC" name="Bitcoin"  price="$64,230" change="+2.4%" direction="up"   sparklineBars={[0.3,0.4,0.5,0.6,0.7,0.65,0.85,1.0]} />
      <TrendingCard ticker="ETH" name="Ethereum" price="$3,421"  change="-1.8%" direction="down" sparklineBars={[1.0,0.85,0.9,0.7,0.6,0.5,0.4,0.3]}  />
      <TrendingCard ticker="SOL" name="Solana"   price="$142"    change="+5.1%" direction="up"   sparklineBars={[0.5,0.4,0.6,0.55,0.7,0.8,0.9,1.0]}  />
    </div>
  ),
};

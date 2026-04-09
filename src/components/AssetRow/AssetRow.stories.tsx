import type { Meta, StoryObj } from '@storybook/react';
import { AssetRow } from './AssetRow';

const meta: Meta<typeof AssetRow> = {
  title: 'Liquid/AssetRow',
  component: AssetRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    direction: { control: 'radio', options: ['up', 'down'] },
    onTrade: { action: 'trade clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AssetRow>;

export const Bitcoin: Story = {
  args: {
    ticker: 'BTC',
    name: 'Bitcoin',
    price: '$64,230.12',
    change: '+2.4%',
    direction: 'up',
    sparklineBars: [0.3, 0.4, 0.35, 0.5, 0.6, 0.55, 0.8, 1.0],
  },
};

export const Ethereum: Story = {
  args: {
    ticker: 'ETH',
    name: 'Ethereum',
    price: '$3,421.50',
    change: '-1.8%',
    direction: 'down',
    sparklineBars: [1.0, 0.85, 0.9, 0.7, 0.6, 0.55, 0.4, 0.35],
  },
};

export const Solana: Story = {
  args: {
    ticker: 'SOL',
    name: 'Solana',
    price: '$142.30',
    change: '+5.1%',
    direction: 'up',
    sparklineBars: [0.5, 0.4, 0.6, 0.55, 0.7, 0.8, 0.9, 1.0],
  },
};

export const List: Story = {
  render: () => (
    <div style={{ width: 390 }}>
      <AssetRow ticker="BTC" name="Bitcoin" price="$64,230.12" change="+2.4%" direction="up" sparklineBars={[0.3,0.4,0.5,0.6,0.7,0.65,0.85,1.0]} />
      <AssetRow ticker="ETH" name="Ethereum" price="$3,421.50" change="-1.8%" direction="down" sparklineBars={[1.0,0.85,0.9,0.7,0.6,0.55,0.4,0.35]} />
      <AssetRow ticker="SOL" name="Solana" price="$142.30" change="+5.1%" direction="up" sparklineBars={[0.5,0.4,0.6,0.55,0.7,0.8,0.9,1.0]} />
      <AssetRow ticker="ADA" name="Cardano" price="$0.4821" change="-3.0%" direction="down" sparklineBars={[0.9,1.0,0.8,0.7,0.6,0.5,0.45,0.4]} />
    </div>
  ),
};

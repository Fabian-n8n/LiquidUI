import React from 'react';
import { ChangeBadge } from '../ChangeBadge/ChangeBadge';
import { TradingSparkline } from '../TradingSparkline/TradingSparkline';
import styles from './AssetRow.module.css';

export interface AssetRowProps {
  ticker: string;        // e.g. "BTC"
  name: string;          // e.g. "Bitcoin"
  price: string;         // e.g. "$64,230.12"
  change: string;        // e.g. "+2.4%"
  direction: 'up' | 'down';
  sparklineBars?: number[];
  onTrade?: () => void;
}

const DEFAULT_BARS = [0.4, 0.5, 0.45, 0.6, 0.7, 0.65, 0.85, 1.0];

export function AssetRow({
  ticker,
  name,
  price,
  change,
  direction,
  sparklineBars = DEFAULT_BARS,
  onTrade,
}: AssetRowProps) {
  return (
    <div className={styles.row}>
      {/* Token icon */}
      <div className={styles.icon} aria-hidden="true">
        <span className={styles.iconText}>{ticker.slice(0, 4)}</span>
      </div>

      {/* Name group */}
      <div className={styles.nameGroup}>
        <span className={styles.ticker}>{ticker}</span>
        <span className={styles.name}>{name}</span>
      </div>

      {/* Spacer */}
      <div className={styles.spacer} />

      {/* Sparkline */}
      <TradingSparkline bars={sparklineBars} direction={direction} />

      {/* Price group */}
      <div className={styles.priceGroup}>
        <span className={styles.price}>{price}</span>
        <ChangeBadge value={change} direction={direction} />
      </div>

      {/* Trade CTA */}
      <button className={styles.tradeBtn} onClick={onTrade} aria-label={`Trade ${ticker}`}>
        Trade
      </button>
    </div>
  );
}

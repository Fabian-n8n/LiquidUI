import React from 'react';
import { ChangeBadge } from '../ChangeBadge/ChangeBadge';
import { TradingSparkline } from '../TradingSparkline/TradingSparkline';
import styles from './TrendingCard.module.css';

export interface TrendingCardProps {
  ticker: string;
  name: string;
  price: string;
  change: string;
  direction: 'up' | 'down';
  sparklineBars?: number[];
  onTrade?: () => void;
}

const DEFAULT_BARS = [0.4, 0.5, 0.6, 0.55, 0.7, 0.8, 0.9, 1.0];

export function TrendingCard({
  ticker,
  name,
  price,
  change,
  direction,
  sparklineBars = DEFAULT_BARS,
  onTrade,
}: TrendingCardProps) {
  return (
    <div className={styles.card}>
      {/* Top row: icon + ticker + badge */}
      <div className={styles.topRow}>
        <div className={styles.icon} aria-hidden="true">
          <span className={styles.iconText}>{ticker.slice(0, 4)}</span>
        </div>
        <div className={styles.tickerGroup}>
          <span className={styles.ticker}>{ticker}</span>
          <span className={styles.name}>{name}</span>
        </div>
        <ChangeBadge value={change} direction={direction} />
      </div>

      {/* Sparkline */}
      <div className={styles.sparklineRow}>
        <TradingSparkline bars={sparklineBars} direction={direction} />
      </div>

      {/* Price + Trade CTA */}
      <div className={styles.bottomRow}>
        <span className={styles.price}>{price}</span>
        <button className={styles.tradeBtn} onClick={onTrade} aria-label={`Trade ${ticker}`}>
          Trade
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './TradingSparkline.module.css';

export interface TradingSparklineProps {
  bars: number[];          // 8 relative bar heights, 0–1
  direction: 'up' | 'down';
}

const BAR_COUNT = 8;
const BAR_W = 5;
const BAR_GAP = 2;
const CHART_H = 20;   // usable bar area (28px total - 4px bottom padding - 4px top)
const BOTTOM_PAD = 4;

export function TradingSparkline({ bars, direction }: TradingSparklineProps) {
  const normalized = bars.slice(0, BAR_COUNT);
  const max = Math.max(...normalized, 0.01);

  return (
    <div className={`${styles.wrapper} ${styles[direction]}`}>
      <svg
        width={BAR_COUNT * BAR_W + (BAR_COUNT - 1) * BAR_GAP}
        height={28}
        viewBox={`0 0 ${BAR_COUNT * BAR_W + (BAR_COUNT - 1) * BAR_GAP} 28`}
        role="img"
        aria-label={`${direction === 'up' ? 'Upward' : 'Downward'} trend sparkline`}
      >
        {normalized.map((v, i) => {
          const barH = Math.max(3, (v / max) * CHART_H);
          const x = i * (BAR_W + BAR_GAP);
          const y = 28 - BOTTOM_PAD - barH;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={BAR_W}
              height={barH}
              rx={1.5}
              className={styles.bar}
            />
          );
        })}
      </svg>
    </div>
  );
}

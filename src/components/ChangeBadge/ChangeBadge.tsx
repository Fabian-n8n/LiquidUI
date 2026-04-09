import React from 'react';
import styles from './ChangeBadge.module.css';

export interface ChangeBadgeProps {
  value: string;      // e.g. "+2.4%" or "-1.8%"
  direction: 'up' | 'down';
}

export function ChangeBadge({ value, direction }: ChangeBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[direction]}`}>
      {value}
    </span>
  );
}

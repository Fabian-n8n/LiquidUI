import React, { useState } from 'react';
import styles from './FilterTabs.module.css';

export interface FilterTabsProps {
  tabs: string[];
  defaultActive?: string;
  onChange?: (tab: string) => void;
}

export function FilterTabs({ tabs, defaultActive, onChange }: FilterTabsProps) {
  const [active, setActive] = useState(defaultActive ?? tabs[0]);

  const handleClick = (tab: string) => {
    setActive(tab);
    onChange?.(tab);
  };

  return (
    <div className={styles.row} role="tablist" aria-label="Market filters">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={tab === active}
          className={`${styles.tab} ${tab === active ? styles.active : styles.inactive}`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

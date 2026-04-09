import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const F = "'Saans', 'Inter', sans-serif";

const SPACING = [
  { token: '--liquid-spacing-1',          value: '4px',  note: 'Base unit' },
  { token: '--liquid-spacing-2',          value: '8px',  note: 'Tab row gap, card gap' },
  { token: '--liquid-spacing-3',          value: '12px', note: 'Bottom bar gap (Search → Buy/Sell)' },
  { token: '--liquid-spacing-4',          value: '16px', note: 'Screen horizontal padding, cards gap' },
  { token: '--liquid-spacing-5',          value: '20px', note: 'Section gap above header' },
  { token: '--liquid-spacing-6',          value: '24px', note: 'Section gap large' },
  { token: '--liquid-spacing-status-bar', value: '47px', note: 'iPhone 13/14 notch area (status bar height)' },
];

const RADIUS = [
  { token: '--liquid-radius-card',        value: '32px',  note: 'Trending cards — squircle-style premium feel' },
  { token: '--liquid-radius-tab',         value: '32px',  note: 'Filter tab pills' },
  { token: '--liquid-radius-action-btn',  value: '32px',  note: 'Add Funds / Withdraw ghost buttons' },
  { token: '--liquid-radius-buysell-btn', value: '32px',  note: 'Buy/Sell CTA in bottom bar' },
  { token: '--liquid-radius-search-btn',  value: '32px',  note: 'Search icon button in bottom bar' },
  { token: '--liquid-radius-google-btn',  value: '32px',  note: 'Continue with Google button' },
  { token: '--liquid-radius-cta',         value: '48px',  note: 'Continue / Get Stocks primary CTA' },
  { token: '--liquid-radius-input',       value: '99px',  note: 'Phone input — full pill' },
  { token: '--liquid-radius-badge',       value: '999px', note: 'Change % badge pill' },
];

const SIZES = [
  { name: 'Frame width',         value: '390px',  note: 'iPhone 14/15 width' },
  { name: 'Frame height',        value: '844px',  note: 'iPhone 14/15 height' },
  { name: 'Trending card',       value: '160×188px', note: 'w×h, r=32' },
  { name: 'Bottom action bar',   value: '352×56px',  note: 'Total w × h, centered' },
  { name: 'Search button',       value: '56×55px',   note: 'Circle, r=32' },
  { name: 'Buy/Sell button',     value: '284×56px',  note: 'Pill, r=32, white' },
  { name: 'Primary CTA',         value: '100%×56px', note: 'Full-width pill, r=48' },
  { name: 'Avatar',              value: '44×44px',   note: 'Circle' },
  { name: 'Add Funds / Withdraw',value: '176×48px',  note: 'Ghost button, r=32' },
  { name: 'Filter tab',          value: 'auto×34px', note: 'Pill, px=14, r=32' },
];

function SpacingPage() {
  return (
    <div style={{ background: '#121214', minHeight: '100vh', padding: '48px 32px', fontFamily: F }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>Spacing & Radius</h1>
      <p style={{ margin: '0 0 48px', fontSize: 14, color: '#a5a0ab', lineHeight: 1.6 }}>
        Base unit: <strong style={{ color: '#fff' }}>4px</strong> · Screen padding: <strong style={{ color: '#fff' }}>16px</strong> · All from Figma Dev Handover.
      </p>

      {/* Spacing */}
      <h3 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        Spacing Scale
      </h3>
      <div style={{ marginBottom: 48 }}>
        {SPACING.map(s => (
          <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 120, flexShrink: 0 }}>
              <div style={{ height: 8, borderRadius: 2, background: '#a5a0ab', width: s.value }} />
            </div>
            <div style={{ minWidth: 44, flexShrink: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#ffffff', fontFamily: 'monospace' }}>{s.value}</span>
            </div>
            <div>
              <code style={{ fontSize: 10, color: '#57505e', fontFamily: 'monospace' }}>{s.token}</code>
              <div style={{ fontSize: 11, color: '#767575', marginTop: 2 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Radius */}
      <h3 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        Border Radius
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
        {RADIUS.map(r => (
          <div key={r.token} style={{ background: '#1c191f', padding: '14px 16px', borderRadius: 10, minWidth: 160, flex: '1 1 160px' }}>
            <div style={{
              width: 48, height: 28, background: 'rgba(255,255,255,0.08)',
              borderRadius: parseInt(r.value) > 28 ? '999px' : r.value,
              marginBottom: 10,
              border: '1px solid rgba(255,255,255,0.1)',
            }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>{r.value}</div>
            <code style={{ fontSize: 9, color: '#57505e', fontFamily: 'monospace', display: 'block', marginTop: 2 }}>{r.token}</code>
            <div style={{ fontSize: 11, color: '#767575', marginTop: 4 }}>{r.note}</div>
          </div>
        ))}
      </div>

      {/* Component sizes */}
      <h3 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        Component Sizes
      </h3>
      <div>
        {SIZES.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#ffffff', minWidth: 180 }}>{s.name}</span>
            <code style={{ fontSize: 12, color: '#00CC88', fontFamily: 'monospace' }}>{s.value}</code>
            <span style={{ fontSize: 11, color: '#767575' }}>{s.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Spacing',
  component: SpacingPage,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Spacing scale, border radius, and component sizes from Figma Dev Handover.' } },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <SpacingPage />,
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const F = "'Saans', 'Inter', sans-serif";

const SURFACES = [
  { token: '--liquid-color-bg-base',     hex: '#121214', name: 'bg-base',    role: 'Page background — all screens' },
  { token: '--liquid-color-bg-surface',  hex: '#1c191f', name: 'bg-surface', role: 'Cards, trending cards, input fields' },
  { token: '--liquid-color-bg-elevated', hex: '#252530', name: 'bg-elevated',role: 'Hover states, tooltips' },
  { token: '--liquid-color-bg-sheet',    hex: '#1f1f1f', name: 'bg-sheet',   role: 'Sign Up full-screen' },
];

const TEXT_COLORS = [
  { token: '--liquid-color-text-primary',   hex: '#ffffff', name: 'text-primary',   role: 'Headlines, asset tickers, prices' },
  { token: '--liquid-color-text-secondary', hex: '#a5a0ab', name: 'text-secondary', role: 'Subtitles, View all, inactive tabs' },
  { token: '--liquid-color-text-muted',     hex: '#767575', name: 'text-muted',     role: 'Placeholders, OR divider, fine print' },
  { token: '--liquid-color-text-subtitle',  hex: '#acabaa', name: 'text-subtitle',  role: 'Phone auth body copy' },
  { token: '--liquid-color-text-fineprint', hex: '#57505e', name: 'text-fineprint', role: 'Terms of service' },
];

const TRADING = [
  { token: '--liquid-color-up',   hex: '#00CC88', name: 'color-up',   role: 'Positive % change, upward sparklines' },
  { token: '--liquid-color-down', hex: '#FF4D6A', name: 'color-down', role: 'Negative % change, downward sparklines' },
];

const INTERACTIVE = [
  { token: '--liquid-color-cta-primary',       hex: '#ffffff', name: 'cta-primary',       role: 'Primary CTA buttons (Buy/Sell, Continue, Get Stocks)' },
  { token: '--liquid-color-cta-primary-text',  hex: '#000000', name: 'cta-primary-text',  role: 'Text on primary CTA', onDark: false },
  { token: '--liquid-color-cta-gradient-end',  hex: '#d4d4d4', name: 'cta-gradient-end',  role: 'Continue button gradient end' },
  { token: '--liquid-color-border-input',      hex: '#2b282e', name: 'border-input',      role: 'Input field border, ghost button stroke' },
  { token: '--liquid-color-google-btn-bg',     hex: '#121214', name: 'google-btn-bg',     role: 'Continue with Google background' },
  { token: '--liquid-color-google-btn-text',   hex: '#e7e7e7', name: 'google-btn-text',   role: 'Continue with Google text' },
];

function Swatch({ hex, name, token, role, onDark = true }: {
  hex: string; name: string; token: string; role: string; onDark?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 10, flexShrink: 0,
        background: hex,
        border: '1px solid rgba(255,255,255,0.08)',
      }} />
      <div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#ffffff', fontFamily: F }}>{name}</span>
          <code style={{ fontSize: 11, color: '#a5a0ab', fontFamily: 'monospace' }}>{hex}</code>
        </div>
        <div style={{ fontSize: 12, color: '#767575', fontFamily: F, marginTop: 2 }}>{role}</div>
        <code style={{ fontSize: 10, color: '#57505e', fontFamily: 'monospace', display: 'block', marginTop: 3 }}>{token}</code>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', fontFamily: F, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function ColorPage() {
  return (
    <div style={{ background: '#121214', minHeight: '100vh', padding: '48px 32px', fontFamily: F }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>Colors</h1>
      <p style={{ margin: '0 0 48px', fontSize: 14, color: '#a5a0ab', lineHeight: 1.6 }}>
        Extracted from Figma Dev Handover — April 2026. Background is <code style={{ color: '#00CC88', fontSize: 13 }}>#121214</code> (warm near-black), not <code style={{ color: '#FF4D6A', fontSize: 13 }}>#000000</code> or <code style={{ color: '#FF4D6A', fontSize: 13 }}>#0C0C0E</code>.
      </p>

      <Section title="Surfaces">
        {SURFACES.map(s => <Swatch key={s.name} {...s} />)}
      </Section>

      <Section title="Text">
        {TEXT_COLORS.map(s => <Swatch key={s.name} {...s} />)}
      </Section>

      <Section title="Semantic — Trading">
        {TRADING.map(s => <Swatch key={s.name} {...s} />)}
        <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(255,77,106,0.07)', borderRadius: 8, borderLeft: '2px solid #FF4D6A' }}>
          <span style={{ fontSize: 12, color: '#a5a0ab', fontFamily: F }}>
            Rule: <strong style={{ color: '#ffffff' }}>Never</strong> use color-up or color-down for anything other than market direction.
          </span>
        </div>
      </Section>

      <Section title="Interactive">
        {INTERACTIVE.map(s => <Swatch key={s.name} {...s} />)}
      </Section>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Colors',
  component: ColorPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Design token color palette extracted from Figma Dev Handover, April 2026.',
      },
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <ColorPage />,
};

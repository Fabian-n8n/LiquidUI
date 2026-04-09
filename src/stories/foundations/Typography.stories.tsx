import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const F = "'Saans', 'Inter', sans-serif";

const SCALE = [
  { role: 'Brand / Nav Logo',    size: 24, weight: 800, color: '#ffffff', sample: 'Liquid',                       usage: '"Liquid" wordmark' },
  { role: 'Phone Auth Heading',  size: 36, weight: 800, color: '#ffffff', sample: 'Enter your phone\nnumber',     usage: 'Auth screen H1' },
  { role: 'Sign Up Headline',    size: 24, weight: 800, color: '#ffffff', sample: '2 Free Tesla Stocks',           usage: 'Marketing screen' },
  { role: 'Section Header',      size: 20, weight: 600, color: '#ffffff', sample: 'Trending Now',                 usage: 'Section label (non-bold)' },
  { role: 'Section Header Bold', size: 20, weight: 800, color: '#ffffff', sample: 'Market Assets',               usage: 'Section label (bold)' },
  { role: 'Tab Label',           size: 16, weight: 600, color: '#121214', bg: '#ffffff', sample: 'All',           usage: 'Active filter tab — white pill, dark text' },
  { role: 'Tab Label Inactive',  size: 16, weight: 400, color: '#a5a0ab', sample: 'Watchlist',                    usage: 'Inactive tab — no background' },
  { role: 'Phone Auth Subtitle', size: 16, weight: 400, color: '#acabaa', sample: "We'll send you a code to securely sign up or log in.", usage: 'Auth screen body copy' },
  { role: 'CTA Text',            size: 14, weight: 700, color: '#000000', bg: 'linear-gradient(180deg,#fff 0%,#d4d4d4 100%)', sample: 'CONTINUE',      usage: 'All CTA buttons — uppercase' },
  { role: 'View all / Helper',   size: 14, weight: 600, color: '#a5a0ab', sample: 'View all',                     usage: 'Section right-side link' },
  { role: 'Sign Up Subtitle',    size: 14, weight: 400, color: '#a5a0ab', sample: 'Create your account to start claiming your rewards.',  usage: 'Marketing screen subtitle' },
  { role: 'Input Placeholder',   size: 18, weight: 400, color: '#767575', sample: '9812-3456',                    usage: 'Phone number placeholder' },
  { role: 'OR Divider',          size: 18, weight: 400, color: '#767575', sample: 'OR',                           usage: 'Between auth options' },
  { role: 'Sign Up Kicker',      size: 10, weight: 800, color: '#a5a0ab', sample: 'GET STARTED WITH LIQUID',      usage: 'Uppercase kicker above headline' },
  { role: 'Fine Print',          size: 11, weight: 400, color: '#57505e', sample: 'By continuing, you agree to our Terms of Service and Privacy Policy', usage: 'ToS fine print' },
];

const WEIGHTS = [
  { label: 'Regular',  weight: 400, saans: '380', sample: 'Subtitles, body copy, placeholders' },
  { label: 'SemiBold', weight: 600, saans: '570', sample: 'Section headers, View all, active tabs' },
  { label: 'Bold',     weight: 700, saans: '670', sample: 'CTA buttons, price values' },
  { label: 'Heavy',    weight: 800, saans: '790', sample: 'Wordmark, headlines, Market Assets' },
];

function TypographyPage() {
  return (
    <div style={{ background: '#121214', minHeight: '100vh', padding: '48px 32px', fontFamily: F }}>
      <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>Typography</h1>
      <p style={{ margin: '0 0 8px', fontSize: 14, color: '#a5a0ab', lineHeight: 1.6 }}>
        Primary: <strong style={{ color: '#fff' }}>Saans</strong> (brand variable font) · Fallback: Inter
      </p>
      <p style={{ margin: '0 0 48px', fontSize: 12, color: '#57505e', lineHeight: 1.6 }}>
        Saans uses a variable weight scale. CSS mapping: 380→400, 570→600, 670→700, 790→800.
      </p>

      {/* Weight scale */}
      <h3 style={{ margin: '0 0 16px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        Weight Scale
      </h3>
      <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
        {WEIGHTS.map(w => (
          <div key={w.label} style={{ background: '#1c191f', borderRadius: 12, padding: '16px 20px', minWidth: 160 }}>
            <div style={{ fontSize: 24, fontWeight: w.weight, color: '#ffffff', marginBottom: 8 }}>Aa</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>{w.label}</div>
            <div style={{ fontSize: 11, color: '#a5a0ab', marginTop: 2 }}>CSS {w.weight} · Saans {w.saans}</div>
            <div style={{ fontSize: 11, color: '#57505e', marginTop: 6 }}>{w.sample}</div>
          </div>
        ))}
      </div>

      {/* Type scale */}
      <h3 style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        Type Scale
      </h3>
      <div style={{ marginTop: 0 }}>
        {SCALE.map(s => (
          <div key={s.role} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ minWidth: 200, flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#a5a0ab', letterSpacing: '0.4px' }}>{s.role}</div>
              <div style={{ fontSize: 10, color: '#57505e', marginTop: 3 }}>{s.size}px · wt {s.weight}</div>
              <div style={{ fontSize: 10, color: '#57505e', marginTop: 1 }}>{s.usage}</div>
            </div>
            <div style={{
              flex: 1,
              background: s.bg || 'transparent',
              borderRadius: s.bg ? 8 : 0,
              padding: s.bg ? '8px 14px' : 0,
              display: 'inline-flex', alignItems: 'center',
            }}>
              <span style={{
                fontSize: s.size,
                fontWeight: s.weight,
                color: s.color,
                fontFamily: F,
                whiteSpace: 'pre-line',
                letterSpacing: s.role.includes('Kicker') || s.role.includes('CTA') ? '1px' : undefined,
                textTransform: s.role.includes('Kicker') || s.role.includes('CTA') ? 'uppercase' : undefined,
                lineHeight: 1.2,
              }}>
                {s.sample}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Liquid type scale — Saans variable font with Figma-sourced sizes and weights.' } },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <TypographyPage />,
};

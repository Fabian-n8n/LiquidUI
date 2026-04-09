import type { Meta, StoryObj } from '@storybook/react';

const IntroductionDoc = () => (
  <div style={{ fontFamily: "'Saans', 'Inter', sans-serif", maxWidth: 720, margin: '0 auto', padding: '48px 24px', color: '#F2F2F4' }}>
    <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Liquid Design System</h1>
    <p style={{ color: '#a5a0ab', marginBottom: 24 }}>
      <strong style={{ color: '#fff' }}>Dark-first trading interface for crypto and multi-asset markets.</strong><br />
      Built for the AnythingDesign Assessment — April 2026.
    </p>
    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Overview</h2>
    <p style={{ color: '#acabaa', lineHeight: 1.7, marginBottom: 16 }}>
      Liquid is a precision-crafted mobile trading app designed for clarity under pressure. The visual language draws from professional terminals (Bloomberg, TradingView) while staying native to iOS — restrained, data-dense, and thumb-friendly.
    </p>
    <blockquote style={{ borderLeft: '3px solid #2b282e', paddingLeft: 16, color: '#a5a0ab', fontStyle: 'italic', marginBottom: 32 }}>
      Signal over noise. Price, change, and trend are the stars. Everything else is scaffolding.
    </blockquote>

    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Color Tokens</h2>
    <p style={{ color: '#a5a0ab', marginBottom: 16 }}>All values extracted directly from Figma Dev Handover, April 2026.</p>

    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#a5a0ab' }}>Surfaces</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
      <thead><tr style={{ borderBottom: '1px solid #2b282e' }}>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Token</th>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Hex</th>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Usage</th>
      </tr></thead>
      <tbody>
        {[
          ['bg-base', '#121214', 'Page background — warm near-black'],
          ['bg-surface', '#1c191f', 'Cards, inputs, trending cards'],
          ['bg-elevated', '#252530', 'Hover / pressed states'],
          ['bg-sheet', '#1f1f1f', 'Sign Up full-screen'],
        ].map(([token, hex, usage]) => (
          <tr key={token} style={{ borderBottom: '1px solid #2b282e' }}>
            <td style={{ padding: '10px 12px' }}><code style={{ background: '#1c191f', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{token}</code></td>
            <td style={{ padding: '10px 12px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: hex, border: '1px solid #2b282e', flexShrink: 0 }} />
                <code style={{ fontSize: 13 }}>{hex}</code>
              </span>
            </td>
            <td style={{ padding: '10px 12px', color: '#a5a0ab', fontSize: 14 }}>{usage}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#a5a0ab' }}>Semantic (Trading)</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
      <thead><tr style={{ borderBottom: '1px solid #2b282e' }}>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Token</th>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Hex</th>
        <th style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>Usage</th>
      </tr></thead>
      <tbody>
        {[
          ['color-up', '#00CC88', 'Positive change, upward sparklines'],
          ['color-down', '#FF4D6A', 'Negative change, downward sparklines'],
        ].map(([token, hex, usage]) => (
          <tr key={token} style={{ borderBottom: '1px solid #2b282e' }}>
            <td style={{ padding: '10px 12px' }}><code style={{ background: '#1c191f', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{token}</code></td>
            <td style={{ padding: '10px 12px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 16, height: 16, borderRadius: 4, background: hex, border: '1px solid #2b282e', flexShrink: 0 }} />
                <code style={{ fontSize: 13 }}>{hex}</code>
              </span>
            </td>
            <td style={{ padding: '10px 12px', color: '#a5a0ab', fontSize: 14 }}>{usage}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Typography</h2>
    <p style={{ color: '#a5a0ab', marginBottom: 16 }}>Font: Saans (brand variable) · Fallback: Inter</p>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
      <thead><tr style={{ borderBottom: '1px solid #2b282e' }}>
        {['Role', 'Size', 'Weight', 'Color'].map(h => (
          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>{h}</th>
        ))}
      </tr></thead>
      <tbody>
        {[
          ['Brand Logo / Nav', '24px', '800', '#ffffff'],
          ['Phone Auth H1', '36px', '800', '#ffffff'],
          ['Sign Up Headline', '24px', '800', '#ffffff'],
          ['Section Header', '20px', '600–800', '#ffffff'],
          ['Filter Tab (active)', '16px', '600', '#121214 on white pill'],
          ['Filter Tab (inactive)', '16px', '400', '#a5a0ab'],
          ['Body / Subtitle', '16px', '400', '#acabaa'],
          ['CTA Text', '14px', '700', '#000000 uppercase'],
          ['Input Placeholder', '18px', '400', '#767575'],
          ['Fine Print', '11px', '400', '#57505e'],
        ].map(([role, size, weight, color]) => (
          <tr key={role} style={{ borderBottom: '1px solid #2b282e' }}>
            <td style={{ padding: '10px 12px', fontSize: 14 }}>{role}</td>
            <td style={{ padding: '10px 12px', fontSize: 14, color: '#a5a0ab' }}>{size}</td>
            <td style={{ padding: '10px 12px', fontSize: 14, color: '#a5a0ab' }}>{weight}</td>
            <td style={{ padding: '10px 12px', fontSize: 14, color: '#a5a0ab' }}>{color}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Design Principles</h2>
    <ol style={{ color: '#acabaa', lineHeight: 2, paddingLeft: 20 }}>
      <li><strong style={{ color: '#fff' }}>One clear action per zone</strong> — browse → spot → trade. Never ambiguous.</li>
      <li><strong style={{ color: '#fff' }}>Status at a glance</strong> — green = up, red = down. No other color carries meaning.</li>
      <li><strong style={{ color: '#fff' }}>Thumb-friendly</strong> — all primary actions reachable in the bottom 60% of screen.</li>
      <li><strong style={{ color: '#fff' }}>Flat elevation</strong> — no shadows. Surface color is the depth signal.</li>
      <li><strong style={{ color: '#fff' }}>Data density</strong> — every pixel earns its place. No decoration for decoration's sake.</li>
    </ol>
  </div>
);

const meta: Meta = {
  title: 'Liquid / Introduction',
  component: IntroductionDoc,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj;
export const Default: Story = {};

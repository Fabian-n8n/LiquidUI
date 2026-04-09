import type { Meta, StoryObj } from '@storybook/react';

const ScreensDoc = () => (
  <div style={{ fontFamily: "'Saans', 'Inter', sans-serif", maxWidth: 720, margin: '0 auto', padding: '48px 24px', color: '#F2F2F4' }}>
    <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Screens</h1>
    <p style={{ color: '#a5a0ab', marginBottom: 32 }}>The Liquid app has two distinct user states with five core screens.</p>
    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>User State: New User</h2>
    <p style={{ color: '#a5a0ab', marginBottom: 24 }}>The new user flow is a 3-step funnel: Browse → Offer → Auth → Verify.</p>

    {[
      {
        n: '1', title: 'New User Markets', story: 'Screens / Markets – New User',
        points: [
          'No portfolio balance section',
          'Trending Now — horizontal scroll row, 3 cards (BTC, ETH, SOL), 3rd card partially visible',
          'Full asset list with Filter Tabs (All, Watchlist, Gainers, Losers, New…)',
          'Bottom action bar with Search + Buy/Sell CTA pill',
          'All elements have pointer cursor — clicking anywhere triggers the sign-up flow',
          'After 5 seconds (or on tap), automatically advances to the Sign Up screen',
        ],
      },
      {
        n: '2', title: 'Sign Up Offer', story: 'Screens / Markets Flow → Sign Up Offer',
        points: [
          'Animation: slideUp — cubic-bezier(0.22, 1, 0.36, 1) — 420ms spring feel',
          'Background: #1f1f1f (slightly lighter than page bg)',
          'Hero image (Tesla coin) with radial glow aura',
          'Two CTAs: GET MY FREE STOCKS (primary white gradient pill) and MAYBE LATER (text, uppercase)',
          'Claim → advances to Phone Auth · Later → jumps directly to Existing User',
        ],
      },
      {
        n: '3', title: 'Phone Auth', story: 'Screens / Markets Flow → Phone Auth',
        points: [
          'Background: #121214',
          '36px heavy headline, 16px subtitle in warm gray #ACABAA (two lines)',
          'Full-pill input (r=99): country flag + dial code + live numeric input field',
          'Input auto-focuses on mount — triggers iOS numeric keypad (inputMode="numeric")',
          'Continue button: enabled (white gradient) only when phone number has been entered',
          'OR divider → Continue with Google (Google logo inline)',
          'Fine print: ToS + Privacy Policy links',
        ],
      },
      {
        n: '4', title: 'Verification Code', story: 'Screens / Markets Flow → Verify Code',
        points: [
          '4 × 52px OTP input boxes, auto-focused on mount',
          'Auto-advances to next box on digit entry',
          'On 4th digit entered → navigates directly to Existing User',
          'Boxes highlight white border when filled',
        ],
      },
    ].map(({ n, title, story, points }) => (
      <div key={n} style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{n}. {title}</h3>
        <p style={{ color: '#57505e', fontSize: 13, marginBottom: 12 }}>Story: <code style={{ background: '#1c191f', padding: '2px 6px', borderRadius: 4 }}>{story}</code></p>
        <ul style={{ color: '#a5a0ab', lineHeight: 1.9, paddingLeft: 20 }}>
          {points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
    ))}

    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>User State: Existing User</h2>

    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>5. Existing User Dashboard</h3>
      <p style={{ color: '#57505e', fontSize: 13, marginBottom: 12 }}>Story: <code style={{ background: '#1c191f', padding: '2px 6px', borderRadius: 4 }}>Screens / Markets Flow → Existing User</code></p>
      <ul style={{ color: '#a5a0ab', lineHeight: 1.9, paddingLeft: 20 }}>
        {[
          'Header: circular avatar (Joshua) + name + notification badge with unread count 2',
          'Portfolio balance: large $14,048.00 + P&L row (dollar + percent)',
          'Add Funds / Withdraw ghost action buttons (stroke only, no fill)',
          'Trending Now — same 3-card partial scroll row as New User',
          'Market Assets list with Filter Tabs',
          'Bottom action bar with Buy/Sell CTA',
          'Shows "Verification success!" toast when arriving from Verify flow (bottom: 108, above CTAs)',
        ].map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>

    <hr style={{ borderColor: '#2b282e', marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Interaction Flow</h2>
    <pre style={{ background: '#1c191f', borderRadius: 12, padding: 24, color: '#a5a0ab', fontSize: 13, lineHeight: 1.8, overflowX: 'auto' }}>{`New User Markets
      ↓ (5s or tap anywhere)
Sign Up Offer  ← slides up with spring animation
      ↓ "GET MY FREE STOCKS"        ↓ "MAYBE LATER"
  Phone Auth  ─────────────────────→  Existing User
      ↓ type number → "CONTINUE"
  Verify Code
      ↓ enter any 4 digits
  Existing User  ← shows "Verification success!" toast`}</pre>

    <hr style={{ borderColor: '#2b282e', marginTop: 32, marginBottom: 32 }} />

    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Design System Values</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead><tr style={{ borderBottom: '1px solid #2b282e' }}>
        {['Token', 'Value', 'Used in'].map(h => (
          <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#a5a0ab', fontWeight: 600 }}>{h}</th>
        ))}
      </tr></thead>
      <tbody>
        {[
          ['bg-base', '#121214', 'All screen backgrounds'],
          ['bg-surface', '#1c191f', 'Cards, input fields'],
          ['bg-sheet', '#1f1f1f', 'Sign Up screen'],
          ['text-secondary', '#a5a0ab', 'Inactive tabs, subtitles'],
          ['text-subtitle', '#acabaa', 'Phone auth copy'],
          ['cta-gradient', '#fff → #d4d4d4', 'Continue, Get Stocks'],
          ['card radius', '32px', 'Trending cards'],
          ['cta radius', '48px', 'Primary CTAs'],
          ['input radius', '99px', 'Phone input pill'],
        ].map(([token, value, used]) => (
          <tr key={token} style={{ borderBottom: '1px solid #2b282e' }}>
            <td style={{ padding: '10px 12px' }}><code style={{ background: '#1c191f', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{token}</code></td>
            <td style={{ padding: '10px 12px', fontSize: 14, color: '#a5a0ab' }}>{value}</td>
            <td style={{ padding: '10px 12px', fontSize: 14, color: '#a5a0ab' }}>{used}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const meta: Meta = {
  title: 'Liquid / Screens',
  component: ScreensDoc,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj;
export const Default: Story = {};

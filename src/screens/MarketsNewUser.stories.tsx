import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — from Figma Dev Handover, April 2026
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  bg:        '#121214',   // Figma bg-base — warm near-black
  surface:   '#1c191f',   // Figma bg-surface — cards, inputs
  white:     '#ffffff',
  secondary: '#a5a0ab',   // warm gray — inactive tabs, view all
  muted:     '#767575',
  up:        '#00CC88',
  down:      '#FF4D6A',
  border:    '#2b282e',
  font:      "'Saans', 'Inter', sans-serif",
};

const STYLES = `
  * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
  ::-webkit-scrollbar { display: none; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Status bar — 47px (iPhone 13/14 with notch)
// ─────────────────────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{ height: 47, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" fill="none" viewBox="0 0 17 12">
          {([0,1,2,3] as const).map(i => (
            <rect key={i} x={i*4.5} y={12-(i+1)*3} width={3} height={(i+1)*3} rx={0.8}
              fill={T.white} opacity={i < 2 ? 0.35 : 1} />
          ))}
        </svg>
        <svg width="16" height="12" fill="none" viewBox="0 0 16 12">
          <path d="M1 4.5C3 2.3 5.3 1 8 1s5 1.3 7 3.5" stroke={T.white} strokeWidth="1.4" strokeLinecap="round" opacity="0.35"/>
          <path d="M3 7c1.2-1.5 2.9-2.5 5-2.5s3.8 1 5 2.5" stroke={T.white} strokeWidth="1.4" strokeLinecap="round" opacity="0.65"/>
          <circle cx="8" cy="11" r="1.2" fill={T.white}/>
        </svg>
        <svg width="26" height="13" fill="none" viewBox="0 0 26 13">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={T.white} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="9" rx="2" fill={T.white}/>
          <path d="M23.5 4.5v4a2 2 0 000-4z" fill={T.white} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sparkline
// ─────────────────────────────────────────────────────────────────────────────
function Sparkline({ points, dir, w = 80, h = 36, sw = 1.8 }: {
  points: number[]; dir: 'up' | 'down'; w?: number; h?: number; sw?: number;
}) {
  const color = dir === 'up' ? T.up : T.down;
  const min = Math.min(...points), max = Math.max(...points), range = max - min || 1;
  const p = 2;
  const coords = points.map((v, i) => [
    p + (i / (points.length - 1)) * (w - p * 2),
    p + (1 - (v - min) / range) * (h - p * 2),
  ] as [number, number]);
  let d = `M ${coords[0][0]},${coords[0][1]}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const [x0, y0] = coords[i], [x1, y1] = coords[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', flexShrink: 0 }}>
      <path d={d} stroke={color} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Coin icons
// ─────────────────────────────────────────────────────────────────────────────
const BtcIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#F7931A"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Arial">₿</text>
  </svg>
);
const SolIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#9945FF"/>
    <path d="M6 14.5h8.5l-2 2H6v-2zm0-4h8.5l-2 2H6v-2zm2-4h6.5l-2-2H8v2z" fill="white" opacity="0.9"/>
  </svg>
);
const EthIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#627EEA"/>
    <path d="M11 4v8.5L16 10.5 11 4z" fill="white" opacity="0.7"/>
    <path d="M11 4L6 10.5l5 2V4z" fill="white"/>
    <path d="M11 14v4l5-7-5 3z" fill="white" opacity="0.7"/>
    <path d="M11 18v-4L6 11l5 7z" fill="white"/>
  </svg>
);
const AdaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#0033AD"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Arial">₳</text>
  </svg>
);
const DotIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#E6007A"/>
    <circle cx="11" cy="8" r="2.5" fill="white"/>
    <ellipse cx="11" cy="14.5" rx="5" ry="2.5" fill="white"/>
  </svg>
);
const FtmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#1969FF"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Arial">F</text>
  </svg>
);
const LinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#2A5ADA"/>
    <text x="11" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Arial">LINK</text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Sparkline data
// ─────────────────────────────────────────────────────────────────────────────
const SPARK_BTC  = [52,58,54,62,58,66,60,68,64,72,68,74];
const SPARK_ETH  = [44,48,46,52,48,50,46,52,50,48,52,50];
const SPARK_SOL  = [30,36,40,34,42,38,46,44,50,48,54,58];
const SPARK_ADA  = [38,42,40,36,38,34,30,28,32,28,26,24];
const SPARK_DOT  = [30,34,38,36,40,38,44,42,46,44,48,50];
const SPARK_FTM  = [28,32,30,34,32,30,34,32,36,34,38,36];
const SPARK_LINK = [60,56,58,52,54,50,48,44,46,42,40,38];

// ─────────────────────────────────────────────────────────────────────────────
// Trending card — 160×188 r=32 (from Figma)
// ─────────────────────────────────────────────────────────────────────────────
function TrendCard({ icon, ticker, price, change, dir, points }: {
  icon: React.ReactNode; ticker: string; price: string;
  change: string; dir: 'up' | 'down'; points: number[];
}) {
  const color = dir === 'up' ? T.up : T.down;
  return (
    <div style={{
      width: 160, height: 188, borderRadius: 32,
      background: T.surface, padding: '18px 16px 14px',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
        <span style={{ fontSize: 13, fontWeight: 600, color, fontFamily: T.font }}>{change}</span>
      </div>
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: T.secondary, fontFamily: T.font, letterSpacing: '0.2px' }}>{ticker}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px', marginTop: 3 }}>{price}</div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <Sparkline points={points} dir={dir} w={128} h={32} sw={1.8} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Asset row — compact, h≈64, no trade button (per Figma)
// ─────────────────────────────────────────────────────────────────────────────
function AssetRow({ icon, name, ticker, price, change, dir, points }: {
  icon: React.ReactNode; name: string; ticker: string; price: string;
  change: string; dir: 'up' | 'down'; points: number[];
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      height: 64, padding: '0 4px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      cursor: 'pointer',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 20, background: T.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>{name}</div>
        <div style={{ fontSize: 12, fontWeight: 400, color: T.secondary, fontFamily: T.font, marginTop: 2 }}>{ticker}</div>
      </div>
      <Sparkline points={points} dir={dir} w={72} h={32} sw={1.5} />
      <div style={{ marginLeft: 12, textAlign: 'right', flexShrink: 0, minWidth: 56 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>{price}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: dir === 'up' ? T.up : T.down, fontFamily: T.font, marginTop: 2 }}>{change}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter tabs — h=34 r=32 16px (from Figma)
// ─────────────────────────────────────────────────────────────────────────────
const FILTER_ROW1 = ['All', 'Watchlist', 'Gainers', 'Losers', 'New'];
const FILTER_ROW2 = ['Layer 1', 'Layer 2', 'DeFi', 'Meme', 'AI', 'RWA'];

function FilterTabs({ active = 'All' }: { active?: string }) {
  const tab = (label: string) => {
    const on = label === active;
    return (
      <div key={label} style={{
        height: 34, borderRadius: 32, padding: '0 14px',
        background: on ? '#ffffff' : 'transparent',
        display: 'flex', alignItems: 'center',
        color: on ? '#121214' : T.secondary,
        fontSize: 16, fontWeight: on ? 600 : 400,
        fontFamily: T.font, whiteSpace: 'nowrap', cursor: 'pointer',
      }}>{label}</div>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {FILTER_ROW1.map(tab)}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {FILTER_ROW2.map(tab)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Bottom action bar — Search 56×55 + Buy/Sell 284×56 (from Figma)
// ─────────────────────────────────────────────────────────────────────────────
function BottomActionBar() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
      background: `linear-gradient(to top, ${T.bg} 60%, transparent)`,
      display: 'flex', alignItems: 'center', padding: '0 19px 20px',
    }}>
      <div style={{
        width: 56, height: 55, borderRadius: 32,
        background: T.bg, border: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, cursor: 'pointer',
      }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <circle cx="9" cy="9" r="5.5" stroke={T.secondary} strokeWidth="1.6"/>
          <path d="M13 13L16.5 16.5" stroke={T.secondary} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{
        width: 284, height: 56, borderRadius: 32,
        background: '#ffffff', marginLeft: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 7, cursor: 'pointer',
      }}>
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
          <path d="M7 1v12M1 7h12" stroke="#000" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#000', fontFamily: T.font, letterSpacing: '-0.1px' }}>Buy/Sell</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen component
// ─────────────────────────────────────────────────────────────────────────────
interface MarketsNewUserProps {
  /** Active filter tab label */
  activeFilter?: string;
}

function MarketsNewUser({ activeFilter = 'All' }: MarketsNewUserProps) {
  return (
    <>
      <style>{STYLES}</style>
      <div style={{
        width: 390, height: 844, background: T.bg,
        borderRadius: 48, overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      }}>
        <StatusBar />
        <div style={{ height: 'calc(100% - 47px)', overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 100 }}>

          {/* Nav bar — "Liquid" wordmark 24px 800, y=57 from frame top */}
          <div style={{ padding: '10px 16px 18px' }}>
            <span
              data-testid="page-title"
              style={{ fontSize: 24, fontWeight: 800, color: T.white, fontFamily: T.font, letterSpacing: '-0.5px' }}
            >
              Liquid
            </span>
          </div>

          {/* Trending Now — 20px 600 #fff */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, padding: '0 16px' }}>
              <span style={{ fontSize: 20, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px' }}>
                Trending Now
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: T.secondary, fontFamily: T.font, cursor: 'pointer' }}>View all</span>
            </div>
            {/* paddingLeft keeps left margin; no paddingRight → 3rd card partially visible */}
            <div style={{
              display: 'flex', gap: 16,
              overflowX: 'auto', scrollbarWidth: 'none',
              paddingLeft: 16, paddingRight: 0,
              WebkitOverflowScrolling: 'touch',
            } as React.CSSProperties}>
              <TrendCard icon={<BtcIcon />} ticker="BTC" price="$64,230.12" change="+2.4%" dir="up" points={SPARK_BTC} />
              <TrendCard icon={<EthIcon />} ticker="ETH" price="$3,450.88"  change="+1.8%" dir="up" points={SPARK_ETH} />
              <TrendCard icon={<SolIcon />} ticker="SOL" price="$142.56"    change="+5.3%" dir="up" points={SPARK_SOL} />
              <div style={{ width: 8, flexShrink: 0 }} />
            </div>
          </div>

          {/* Market Assets — 20px 800 #fff */}
          <div style={{ padding: '0 16px' }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px' }}>
                Market Assets
              </span>
            </div>
            <FilterTabs active={activeFilter} />
            <div style={{ marginTop: 4 }}>
              <AssetRow icon={<AdaIcon />}  name="Cardano"   ticker="ADA"  price="$0.45"  change="-1.2%" dir="down" points={SPARK_ADA}  />
              <AssetRow icon={<DotIcon />}  name="Polkadot"  ticker="DOT"  price="$7.25"  change="+3.1%" dir="up"   points={SPARK_DOT}  />
              <AssetRow icon={<FtmIcon />}  name="Fantom"    ticker="FTM"  price="$0.45"  change="+2.2%" dir="up"   points={SPARK_FTM}  />
              <AssetRow icon={<LinkIcon />} name="Chainlink" ticker="LINK" price="$19.12" change="-3.2%" dir="down" points={SPARK_LINK} />
            </div>
          </div>

        </div>
        <BottomActionBar />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Storybook meta
// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta<typeof MarketsNewUser> = {
  title: 'Screens/Markets – New User',
  component: MarketsNewUser,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Markets – New User** — anonymous state, first screen a new Liquid user sees.

Measurements from Figma Dev Handover (April 2026).

| Token | Value | Source |
|---|---|---|
| Background | \`#121214\` | Figma bg-base |
| Surface (cards) | \`#1c191f\` | Figma bg-surface |
| Section header | 20px / weight 600–800 | Figma node |
| Filter tab | 16px / h=34 / r=32 | Figma node |
| Card | 160×188 / r=32 | Figma node |
| Buy/Sell CTA | 284×56 / r=32 / white | Figma node |
        `,
      },
    },
  },
  argTypes: {
    activeFilter: {
      control: 'select',
      options: [...FILTER_ROW1, ...FILTER_ROW2],
      description: 'Which filter tab is active',
      table: { defaultValue: { summary: 'All' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarketsNewUser>;

export const Default: Story = {
  args: { activeFilter: 'All' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = await canvas.findByTestId('page-title');
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveTextContent('Liquid');
  },
};

export const GainersFilter: Story = {
  args: { activeFilter: 'Gainers' },
  parameters: { docs: { description: { story: '"Gainers" filter tab active.' } } },
};

export const WatchlistFilter: Story = {
  args: { activeFilter: 'Watchlist' },
  parameters: { docs: { description: { story: '"Watchlist" filter tab active.' } } },
};

export const DeFiFilter: Story = {
  args: { activeFilter: 'DeFi' },
  parameters: { docs: { description: { story: 'Category row — "DeFi" active.' } } },
};

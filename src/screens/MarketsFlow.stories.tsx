import React, { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import heroCoin from '../assets/hero-coin.png';
import avatarJoshua from '../assets/avatar-joshua.png';

// ─────────────────────────────────────────────────────────────────────────────
// Animation keyframes
// ─────────────────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes screenIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0.6; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .fade-in   { animation: fadeIn  0.32s ease forwards; }
  .screen-in { animation: screenIn 0.28s ease forwards; }
  .slide-up  { animation: slideUp 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
  ::-webkit-scrollbar { display: none; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens — source: Figma Dev Handover, April 2026
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  // Surfaces — #121214 is the actual bg from Figma, not #0C0C0E
  bg:          '#121214',
  surface:     '#1c191f',
  sheet:       '#1f1f1f',

  // Text
  white:       '#ffffff',
  secondary:   '#a5a0ab',   // warm gray — inactive tabs, subtitles
  muted:       '#767575',   // placeholders, OR divider
  subtitle:    '#acabaa',   // phone auth body copy

  // Semantic
  up:          '#00CC88',
  down:        '#FF4D6A',

  // CTA
  cta:         '#ffffff',
  ctaText:     '#000000',

  // Borders
  border:      '#2b282e',   // input borders, ghost button stroke

  // Font
  font:        "'Saans', 'Inter', sans-serif",
};

// ─────────────────────────────────────────────────────────────────────────────
// Status bar — iPhone notch style
// ─────────────────────────────────────────────────────────────────────────────
function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? '#000' : T.white;
  return (
    <div style={{
      height: 47, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px', flexShrink: 0,
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: c, fontFamily: T.font, letterSpacing: '-0.2px' }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* Signal */}
        <svg width="17" height="12" fill="none" viewBox="0 0 17 12">
          {([0,1,2,3] as const).map(i => (
            <rect key={i} x={i*4.5} y={12-(i+1)*3} width={3} height={(i+1)*3} rx={0.8}
              fill={c} opacity={i < 2 ? 0.35 : 1} />
          ))}
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" fill="none" viewBox="0 0 16 12">
          <path d="M1 4.5C3 2.3 5.3 1 8 1s5 1.3 7 3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.35"/>
          <path d="M3 7c1.2-1.5 2.9-2.5 5-2.5s3.8 1 5 2.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" opacity="0.65"/>
          <circle cx="8" cy="11" r="1.2" fill={c}/>
        </svg>
        {/* Battery */}
        <svg width="26" height="13" fill="none" viewBox="0 0 26 13">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={c} strokeOpacity="0.35"/>
          <rect x="2" y="2" width="17" height="9" rx="2" fill={c}/>
          <path d="M23.5 4.5v4a2 2 0 000-4z" fill={c} opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Smooth bezier sparkline
// ─────────────────────────────────────────────────────────────────────────────
function Sparkline({ points, dir, w = 80, h = 36, sw = 1.6 }: {
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
const BtcIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#F7931A"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Arial">₿</text>
  </svg>
);
const SolIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#9945FF"/>
    <path d="M6 14.5h8.5l-2 2H6v-2zm0-4h8.5l-2 2H6v-2zm2-4h6.5l-2-2H8v2z" fill="white" opacity="0.9"/>
  </svg>
);
const EthIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#627EEA"/>
    <path d="M11 4v8.5L16 10.5 11 4z" fill="white" opacity="0.7"/>
    <path d="M11 4L6 10.5l5 2V4z" fill="white"/>
    <path d="M11 14v4l5-7-5 3z" fill="white" opacity="0.7"/>
    <path d="M11 18v-4L6 11l5 7z" fill="white"/>
  </svg>
);
const AdaIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#0033AD"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Arial">₳</text>
  </svg>
);
const DotIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#E6007A"/>
    <circle cx="11" cy="8" r="2.5" fill="white"/>
    <ellipse cx="11" cy="14.5" rx="5" ry="2.5" fill="white"/>
  </svg>
);
const FtmIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#1969FF"/>
    <text x="11" y="15.5" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="Arial">F</text>
  </svg>
);
const LinkIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#2A5ADA"/>
    <text x="11" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" fontFamily="Arial">LINK</text>
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Trending card — 160×188 r=32 bg=#1c191f (from Figma)
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
      {/* Header: coin icon + % badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{icon}</div>
        <span style={{ fontSize: 13, fontWeight: 600, color, fontFamily: T.font }}>{change}</span>
      </div>

      {/* Token info: ticker + price */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: T.secondary, fontFamily: T.font, letterSpacing: '0.2px' }}>{ticker}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px', marginTop: 3 }}>{price}</div>
      </div>

      {/* Sparkline — fills remaining space */}
      <div style={{ marginTop: 'auto' }}>
        <Sparkline points={points} dir={dir} w={128} h={32} sw={1.8} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Asset row — h=40, compact list item (no trade button per Figma)
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
      {/* Coin icon circle */}
      <div style={{
        width: 40, height: 40, borderRadius: 20,
        background: T.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>

      {/* Name group */}
      <div style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>{name}</div>
        <div style={{ fontSize: 12, fontWeight: 400, color: T.secondary, fontFamily: T.font, marginTop: 2 }}>{ticker}</div>
      </div>

      {/* Sparkline */}
      <Sparkline points={points} dir={dir} w={72} h={32} sw={1.5} />

      {/* Price group */}
      <div style={{ marginLeft: 12, textAlign: 'right', flexShrink: 0, minWidth: 56 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>{price}</div>
        <div style={{ fontSize: 12, fontWeight: 500, color: dir === 'up' ? T.up : T.down, fontFamily: T.font, marginTop: 2 }}>{change}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Filter tabs — h=34 r=32 16px from Figma
// ─────────────────────────────────────────────────────────────────────────────
const TABS_ROW1 = ['All', 'Watchlist', 'Gainers', 'Losers', 'New'];
const TABS_ROW2 = ['Layer 1', 'Layer 2', 'DeFi', 'Meme', 'AI', 'RWA'];

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
        {TABS_ROW1.map(tab)}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {TABS_ROW2.map(tab)}
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
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 100,
      background: `linear-gradient(to top, ${T.bg} 60%, transparent)`,
      display: 'flex', alignItems: 'center',
      padding: '0 19px 20px',
    }}>
      {/* Search — 56×55 circle */}
      <div style={{
        width: 56, height: 55, borderRadius: 32,
        background: T.bg,
        border: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, cursor: 'pointer',
      }}>
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
          <circle cx="9" cy="9" r="5.5" stroke={T.secondary} strokeWidth="1.6"/>
          <path d="M13 13L16.5 16.5" stroke={T.secondary} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Buy/Sell pill — 284×56 white */}
      <div style={{
        width: 284, height: 56, borderRadius: 32,
        background: T.cta, marginLeft: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 7, cursor: 'pointer',
      }}>
        <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
          <path d="M7 1v12M1 7h12" stroke={T.ctaText} strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.ctaText, fontFamily: T.font, letterSpacing: '-0.1px' }}>Buy/Sell</span>
      </div>
    </div>
  );
}

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
// Market content (shared between New User and Existing User)
// ─────────────────────────────────────────────────────────────────────────────
function MarketContent() {
  return (
    <>
      {/* Trending Now */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: 14,
          padding: '0 16px',
        }}>
          <span style={{ fontSize: 20, fontWeight: 600, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px' }}>
            Trending Now
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.secondary, fontFamily: T.font, cursor: 'pointer' }}>View all</span>
        </div>
        {/* paddingLeft keeps left margin; no paddingRight so 3rd card peeks and bleeds */}
        <div style={{
          display: 'flex', gap: 16,
          overflowX: 'auto', scrollbarWidth: 'none',
          paddingLeft: 16, paddingRight: 0,
          WebkitOverflowScrolling: 'touch',
        } as React.CSSProperties}>
          <TrendCard icon={<BtcIcon />} ticker="BTC" price="$64,230.12" change="+2.4%" dir="up"   points={SPARK_BTC} />
          <TrendCard icon={<EthIcon />} ticker="ETH" price="$3,450.88"  change="+1.8%" dir="up"   points={SPARK_ETH} />
          <TrendCard icon={<SolIcon />} ticker="SOL" price="$142.56"    change="+5.3%" dir="up"   points={SPARK_SOL} />
          {/* Spacer so the last card's right edge is reachable on scroll */}
          <div style={{ width: 8, flexShrink: 0 }} />
        </div>
      </div>

      {/* Market Assets */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: T.white, fontFamily: T.font, letterSpacing: '-0.4px' }}>
            Market Assets
          </span>
        </div>
        <FilterTabs active="All" />
        <div style={{ marginTop: 4 }}>
          <AssetRow icon={<AdaIcon />}  name="Cardano"   ticker="ADA"  price="$0.45"   change="-1.2%" dir="down" points={SPARK_ADA}  />
          <AssetRow icon={<DotIcon />}  name="Polkadot"  ticker="DOT"  price="$7.25"   change="+3.1%" dir="up"   points={SPARK_DOT}  />
          <AssetRow icon={<FtmIcon />}  name="Fantom"    ticker="FTM"  price="$0.45"   change="+2.2%" dir="up"   points={SPARK_FTM}  />
          <AssetRow icon={<LinkIcon />} name="Chainlink" ticker="LINK" price="$19.12"  change="-3.2%" dir="down" points={SPARK_LINK} />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen 1: New User Markets
// Layout matches Figma: bg=#121214, Liquid nav y=57, Trending y=116, etc.
// ─────────────────────────────────────────────────────────────────────────────
function MarketsScreen() {
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 100 }}>
        {/* Nav — "Liquid" wordmark 24px 800 at y≈57 */}
        <div style={{ padding: '10px 16px 18px' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: T.white, fontFamily: T.font, letterSpacing: '-0.5px' }}>
            Liquid
          </span>
        </div>

        <MarketContent />
      </div>

      <BottomActionBar />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen 2: Sign Up — FULL SCREEN (not a bottom sheet)
// bg=#1f1f1f, hero at y=106, copy at y≈377, CTAs at y≈666
// ─────────────────────────────────────────────────────────────────────────────
function SignUpScreen({ onClaim, onLater }: { onClaim: () => void; onLater: () => void }) {
  return (
    <div className="slide-up" style={{
      width: '100%', height: '100%',
      background: T.sheet,
      display: 'flex', flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow aura — radial white blur behind hero */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 280, height: 320,
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <StatusBar />

      {/* Hero image — y=106 from top */}
      <div style={{
        marginTop: 59, // 106 - 47 status bar
        width: '100%', display: 'flex', justifyContent: 'center',
      }}>
        <img
          src={heroCoin}
          alt="2 Free Tesla Stocks"
          style={{
            width: 210, height: 212,
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
          }}
        />
      </div>

      {/* Copy — starts at y≈377 */}
      <div style={{
        marginTop: 28,
        width: '100%', padding: '0 16px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Kicker — 10px 790 #a5a0ab */}
        <span style={{
          fontSize: 10, fontWeight: 800, color: T.secondary,
          fontFamily: T.font, letterSpacing: '1.2px',
          textTransform: 'uppercase',
        }}>
          GET STARTED WITH LIQUID
        </span>

        {/* Headline — 24px 790 #fff, y=+23 within group */}
        <h2 style={{
          margin: '10px 0 0',
          fontSize: 24, fontWeight: 800, color: T.white,
          fontFamily: T.font, letterSpacing: '-0.4px', lineHeight: 1.2,
        }}>
          2 Free Tesla Stocks
        </h2>

        {/* Subtitle — 14px 380 #a5a0ab, y=+63 within group */}
        <p style={{
          margin: '14px 0 0',
          fontSize: 14, fontWeight: 400, color: T.secondary,
          fontFamily: T.font, lineHeight: 1.6, letterSpacing: '-0.1px',
          maxWidth: 260,
        }}>
          Create your account to start claiming your rewards.
        </p>
      </div>

      {/* CTAs — pushed toward bottom, matching y≈666 */}
      <div style={{
        marginTop: 'auto', marginBottom: 50,
        width: '100%', padding: '0 16px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 0,
      }}>
        {/* Primary CTA — h=56 r=48 gradient white→#d4d4d4, text 14px 670 uppercase */}
        <button
          data-testid="claim-btn"
          onClick={onClaim}
          style={{
            width: '100%', height: 56, borderRadius: 48,
            background: 'linear-gradient(180deg, #ffffff 0%, #d4d4d4 100%)',
            border: 'none',
            color: T.ctaText, fontSize: 14, fontWeight: 700,
            fontFamily: T.font, letterSpacing: '1px',
            textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          Get my free stocks
        </button>

        {/* Maybe Later — text button, #c6c6c6, 14px uppercase */}
        <button
          data-testid="later-btn"
          onClick={onLater}
          style={{
            marginTop: 24, background: 'none', border: 'none',
            color: '#c6c6c6', fontSize: 14, fontWeight: 600,
            fontFamily: T.font, letterSpacing: '1px',
            textTransform: 'uppercase', cursor: 'pointer', padding: '8px 0',
          }}
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen 3: Phone Auth — functional input, auto-focus, numeric keyboard
// y values from Figma: input y=345, continue y=442, google y=588, print y=752
// ─────────────────────────────────────────────────────────────────────────────
function PhoneAuthScreen({ onContinue }: { onContinue: () => void }) {
  const [phone, setPhone] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-focus triggers iOS numeric keypad on mount
  React.useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="screen-in" style={{
      width: '100%', height: '100%',
      background: T.bg,
      display: 'flex', flexDirection: 'column',
    }}>
      <StatusBar />

      <div style={{
        flex: 1, padding: '0 16px',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Heading group — gap from status bar (47px) to y=117 = 70px */}
        <div style={{ height: 70, flexShrink: 0 }} />

        {/* Headline — 36px 800 */}
        <h1 style={{
          margin: 0,
          fontSize: 36, fontWeight: 800, color: T.white,
          fontFamily: T.font, letterSpacing: '-0.8px', lineHeight: 1.1,
          whiteSpace: 'pre-line',
        }}>
          {'Enter your phone\nnumber'}
        </h1>

        {/* Subtitle — 16px 400 #acabaa, two lines */}
        <p style={{
          margin: '24px 0 0',
          fontSize: 16, fontWeight: 400, color: T.subtitle,
          fontFamily: T.font, lineHeight: 1.6, letterSpacing: '-0.1px',
        }}>
          We'll send you a code to securely<br />sign up or log in.
        </p>

        {/* Gap to input */}
        <div style={{ height: 67, flexShrink: 0 }} />

        {/* Phone input — y=345 h=56 bg=#1c191f r=99 border=#2b282e */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: T.surface,
          borderRadius: 99,
          border: `1px solid ${T.border}`,
          height: 56, flexShrink: 0, overflow: 'hidden',
          cursor: 'text',
        }} onClick={() => inputRef.current?.focus()}>
          {/* Country selector */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '0 10px 0 20px',
            borderRight: `1px solid rgba(43,40,46,0.6)`,
            height: '100%', flexShrink: 0, cursor: 'pointer',
          }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>🇸🇬</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: T.white, fontFamily: T.font }}>+65</span>
            <svg width="10" height="6" fill="none" viewBox="0 0 10 6">
              <path d="M1 1l4 4 4-4" stroke={T.subtitle} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Functional numeric input */}
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            pattern="[0-9\-]*"
            placeholder="9812-3456"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            style={{
              flex: 1, height: '100%', padding: '0 20px',
              background: 'transparent', border: 'none', outline: 'none',
              fontSize: 18, fontWeight: 400, color: T.white,
              fontFamily: T.font, letterSpacing: '0.3px',
              caretColor: T.white,
            }}
          />
        </div>

        {/* Gap to continue */}
        <div style={{ height: 41, flexShrink: 0 }} />

        {/* Continue CTA — enabled only when phone has value */}
        <button
          data-testid="continue-btn"
          onClick={() => { if (phone.trim()) onContinue(); }}
          style={{
            width: '100%', height: 56, borderRadius: 48,
            background: phone.trim()
              ? 'linear-gradient(180deg, #ffffff 0%, #d4d4d4 100%)'
              : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: phone.trim() ? T.ctaText : 'rgba(255,255,255,0.4)',
            fontSize: 14, fontWeight: 700,
            fontFamily: T.font, letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: phone.trim() ? 'pointer' : 'default',
            flexShrink: 0,
            transition: 'background 0.2s ease, color 0.2s ease',
          }}
        >
          Continue
        </button>

        {/* OR divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0 20px', flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 18, fontWeight: 400, color: T.muted, fontFamily: T.font }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>

        {/* Google button — y=588 h=55 r=32 */}
        <button style={{
          width: '100%', height: 55, borderRadius: 32,
          background: T.bg, border: `1px solid ${T.border}`,
          color: '#e7e7e7', fontSize: 14, fontWeight: 600,
          fontFamily: T.font, letterSpacing: '-0.1px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Fine print — pushed to bottom */}
        <p style={{
          marginTop: 'auto', marginBottom: 22,
          fontSize: 11, fontWeight: 400, color: '#57505e',
          fontFamily: T.font, textAlign: 'center', lineHeight: 1.7,
        }}>
          By continuing, you agree to our{' '}
          <span style={{ color: T.subtitle, textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: T.subtitle, textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen 4: Existing User Dashboard
// Layout from Figma: Top Bar y=47, Portfolio y=121, Quick Actions y=241
// ─────────────────────────────────────────────────────────────────────────────
function ExistingUserScreen({ showToast = false }: { showToast?: boolean }) {
  const [toastVisible, setToastVisible] = React.useState(showToast);

  React.useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setToastVisible(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: T.bg,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Verification success toast — bottom, above Quick Action buttons */}
      {toastVisible && (
        <div style={{
          position: 'absolute',
          bottom: 108, left: 24, right: 24,
          zIndex: 100,
          background: T.up,
          borderRadius: 32,
          height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 8px 24px rgba(0,204,136,0.3)',
          animation: 'fadeIn 0.28s ease forwards',
        }}>
          <svg width="14" height="11" fill="none" viewBox="0 0 14 11">
            <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: T.font, letterSpacing: '0.2px' }}>
            Verification success!
          </span>
        </div>
      )}

      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', paddingBottom: 100 }}>
        {/* Top Bar — y=47 h=44 */}
        <div style={{
          height: 44, padding: '0 16px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* User Info — avatar 44×44 + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              overflow: 'hidden', flexShrink: 0,
              border: '1.5px solid rgba(255,255,255,0.1)',
            }}>
              <img
                src={avatarJoshua}
                alt="Joshua"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.white, fontFamily: T.font, letterSpacing: '-0.2px' }}>
                Hi Joshua
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, color: T.secondary, fontFamily: T.font, marginTop: 1 }}>
                @joshua_xyz
              </div>
            </div>
          </div>

          {/* Notification Bell with "2" badge */}
          <div style={{ position: 'relative', width: 29, height: 30 }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M12 3a7 7 0 00-7 7v4.5L3 17h18l-2-2.5V10a7 7 0 00-7-7z" stroke={T.white} strokeWidth="1.5" fill="none"/>
              <path d="M10 20a2 2 0 004 0" stroke={T.white} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div style={{
              position: 'absolute', top: -2, right: -2,
              width: 18, height: 18, borderRadius: 9,
              background: '#FF3B30',
              border: `1.5px solid ${T.bg}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: T.font, lineHeight: 1 }}>2</span>
            </div>
          </div>
        </div>

        {/* Portfolio Balance Card — y=121 h=111 */}
        <div style={{ padding: '20px 16px 0', textAlign: 'center' }}>
          <div style={{
            fontSize: 11, fontWeight: 500, color: T.secondary,
            fontFamily: T.font, letterSpacing: '1.5px',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            TOTAL PORTFOLIO BALANCE
          </div>
          <div style={{
            fontSize: 40, fontWeight: 800, color: T.white,
            fontFamily: T.font, letterSpacing: '-1.5px', lineHeight: 1,
          }}>
            $14,048.00
          </div>
          <div style={{
            marginTop: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: T.up, fontFamily: T.font,
          }}>
            <span>+$344.17</span>
            <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path d="M5 1l4 4H1l4-4z" fill={T.up}/>
            </svg>
            <span>+2.45%</span>
          </div>
        </div>

        {/* Quick Actions — y=241 h=48, ghost buttons w=176 each */}
        <div style={{ padding: '20px 16px 24px', display: 'flex', gap: 8 }}>
          {[
            {
              label: 'Add Funds',
              icon: (
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke={T.white} strokeWidth="1.3"/>
                  <path d="M8 6.5v3M6.5 8h3" stroke={T.white} strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              label: 'Withdraw',
              icon: (
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="2" stroke={T.white} strokeWidth="1.3"/>
                  <path d="M8 10V7M6.5 7.5L8 6l1.5 1.5" stroke={T.white} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
            },
          ].map(({ label, icon }) => (
            <div key={label} style={{
              flex: 1, height: 48, borderRadius: 32,
              background: 'transparent',
              border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              cursor: 'pointer',
            }}>
              {icon}
              <span style={{ fontSize: 16, fontWeight: 500, color: T.white, fontFamily: T.font }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <MarketContent />
      </div>

      <BottomActionBar />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen 4: Verification Code
// 4 digit boxes — auto-focus, auto-advance, triggers existing user on complete
// ─────────────────────────────────────────────────────────────────────────────
function VerifyScreen({ onSuccess }: { onSuccess: () => void }) {
  const [digits, setDigits] = React.useState(['', '', '', '']);
  const [done, setDone] = React.useState(false);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first box
  React.useEffect(() => {
    const t = setTimeout(() => inputsRef.current[0]?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (idx: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = digit;
    setDigits(next);

    if (digit && idx < 3) {
      inputsRef.current[idx + 1]?.focus();
    }

    const allFilled = next.every(d => d !== '');
    if (allFilled) {
      setDone(true);
      setTimeout(() => onSuccess(), 1400);
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      const prev = [...digits];
      prev[idx - 1] = '';
      setDigits(prev);
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="screen-in" style={{
      width: '100%', height: '100%',
      background: T.bg,
      display: 'flex', flexDirection: 'column',
    }}>
      <StatusBar />

      <div style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ height: 70, flexShrink: 0 }} />

        {/* Heading */}
        <h1 style={{
          margin: 0,
          fontSize: 36, fontWeight: 800, color: T.white,
          fontFamily: T.font, letterSpacing: '-0.8px', lineHeight: 1.1,
        }}>
          Verify your<br />number
        </h1>

        <p style={{
          margin: '20px 0 0',
          fontSize: 16, fontWeight: 400, color: T.subtitle,
          fontFamily: T.font, lineHeight: 1.6, letterSpacing: '-0.1px',
        }}>
          Enter the 4-digit code sent to<br />+65 9812-3456
        </p>

        {/* 4 digit boxes — 52px wide each, centered */}
        <div style={{ marginTop: 48, display: 'flex', gap: 12, flexShrink: 0, justifyContent: 'center' }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputsRef.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                width: 52,
                height: 64,
                flexShrink: 0,
                borderRadius: 16,
                background: T.surface,
                border: `1.5px solid ${d ? T.white : T.border}`,
                color: T.white,
                fontSize: 28,
                fontWeight: 700,
                fontFamily: T.font,
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.15s ease',
                caretColor: 'transparent',
              }}
            />
          ))}
        </div>

        {/* Resend link */}
        <div style={{ marginTop: 24, textAlign: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 400, color: T.subtitle, fontFamily: T.font }}>
            Didn't receive it?{' '}
          </span>
          <span style={{
            fontSize: 14, fontWeight: 600, color: T.white,
            fontFamily: T.font, cursor: 'pointer', textDecoration: 'underline',
          }}>
            Resend code
          </span>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// State machine — 5 screens
// ─────────────────────────────────────────────────────────────────────────────
type Screen = 'markets' | 'signup' | 'phone-auth' | 'verify' | 'existing';

function LiquidFlow({ initialScreen = 'markets' as Screen, disableAutoAdvance = false }: { initialScreen?: Screen; disableAutoAdvance?: boolean }) {
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance from markets after 5s (disabled in docs mode)
  useEffect(() => {
    if (screen === 'markets' && !disableAutoAdvance) {
      timerRef.current = setTimeout(() => setScreen('signup'), 5000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [screen, disableAutoAdvance]);

  const renderScreen = () => {
    switch (screen) {
      case 'signup':
        return (
          <SignUpScreen
            onClaim={() => setScreen('phone-auth')}
            onLater={() => setScreen('existing')}
          />
        );
      case 'phone-auth':
        return <PhoneAuthScreen onContinue={() => setScreen('verify')} />;
      case 'verify':
        return <VerifyScreen onSuccess={() => { setPrevScreen('verify'); setScreen('existing'); }} />;
      case 'existing':
        return <ExistingUserScreen showToast={prevScreen === 'verify'} />;
      default:
        return (
          <div
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
            onClick={() => setScreen('signup')}
          >
            <MarketsScreen />
          </div>
        );
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div style={{
        width: 390, height: 844,
        background: T.bg,
        borderRadius: 48,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      }}>
        {renderScreen()}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Storybook meta
// ─────────────────────────────────────────────────────────────────────────────
const meta: Meta<typeof LiquidFlow> = {
  title: 'Screens/Markets Flow',
  component: LiquidFlow,
  tags: ['autodocs'],
  // Disable auto-advance in docs mode so the Markets screen stays visible
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <LiquidFlow key={context.args.initialScreen as string} {...(context.args as any)} disableAutoAdvance={true} />;
      }
      return <Story />;
    },
  ],
  // key forces full remount when switching stories — prevents stale useState
  render: (args) => <LiquidFlow key={args.initialScreen} {...args} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Markets Flow** — 4-screen journey for Liquid trading app.

All measurements from Figma Dev Handover (April 2026). Background \`#121214\`, cards \`#1c191f\` r=32.

### Screens
1. **New User Markets** — browsable market list, auto-advances to sign up after 5s (or click)
2. **Sign Up** — full-screen promo (NOT a bottom sheet), Tesla stocks reward offer
3. **Phone Auth** — phone number entry with gradient CTA
4. **Existing User** — logged-in dashboard with portfolio balance

Use the \`initialScreen\` control to jump to any screen directly.
        `,
      },
    },
  },
  argTypes: {
    initialScreen: {
      control: 'select',
      options: ['markets', 'signup', 'phone-auth', 'verify', 'existing'],
      description: 'Jump directly to any screen in the flow',
      table: { defaultValue: { summary: 'markets' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiquidFlow>;

// ─────────────────────────────────────────────────────────────────────────────
// Stories
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { initialScreen: 'markets' },
  parameters: {
    docs: { description: { story: 'New user markets. Click anywhere to advance to the sign-up screen. Auto-advances after 5s.' } },
  },
};

export const SignUpOffer: Story = {
  args: { initialScreen: 'signup' },
  parameters: {
    docs: { description: { story: 'Full-screen sign-up promo with Tesla stock reward. "Get my free stocks" → Phone Auth. "Maybe Later" → Existing User.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const claimBtn = await canvas.findByTestId('claim-btn');
    await expect(claimBtn).toBeInTheDocument();
    await expect(claimBtn).toHaveTextContent(/get my free stocks/i);
  },
};

export const PhoneAuth: Story = {
  args: { initialScreen: 'phone-auth' },
  parameters: {
    docs: { description: { story: 'Phone number entry. "Continue" gradient pill advances to Existing User.' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByTestId('continue-btn');
    await expect(btn).toBeInTheDocument();
    await expect(btn).toHaveTextContent(/continue/i);
    // NOTE: do NOT click — clicking navigates away from this screen
  },
};

export const VerifyCode: Story = {
  args: { initialScreen: 'verify' },
  parameters: {
    docs: { description: { story: 'SMS verification. Type any 4 digits — when the 4th is entered it auto-advances to Existing User with a success toast.' } },
  },
};

export const ExistingUser: Story = {
  args: { initialScreen: 'existing' },
  parameters: {
    docs: { description: { story: 'Authenticated dashboard — portfolio balance, Add Funds/Withdraw, trending assets, and full market list.' } },
  },
};

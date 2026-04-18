import React from 'react';

// ── PhoneFrame ───────────────────────────────────────────────────────────────
export function PhoneFrame({ width = 280, height = 580, children, style = {}, glow = null, tint = '#16181d' }) {
  const innerR = 38;
  return (
    <div style={{
      width, height,
      background: '#0b0c0e',
      borderRadius: 46,
      padding: 8,
      boxShadow: glow
        ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${glow}44, 0 0 120px ${glow}22`
        : '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: tint,
        borderRadius: innerR,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 10, left: '50%',
          transform: 'translateX(-50%)',
          width: 90, height: 22,
          background: '#000',
          borderRadius: 14,
          zIndex: 10,
        }}/>
        {children}
      </div>
    </div>
  );
}

// ── BrowserWindow ────────────────────────────────────────────────────────────
export function BrowserWindow({ width = 640, height = 400, url = 'example.com', children, style = {}, glow = null, accent = 'oklch(70% 0.15 250)' }) {
  return (
    <div style={{
      width, height,
      background: '#14161b',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: glow
        ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${glow}44, 0 0 80px ${glow}22`
        : '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
      ...style,
    }}>
      {/* Title bar */}
      <div style={{
        height: 32, background: '#1b1d23',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: 8, flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }}/>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }}/>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }}/>
        </div>
        <div style={{
          flex: 1, marginLeft: 12, height: 20,
          background: 'rgba(0,0,0,0.3)', borderRadius: 4, padding: '0 10px',
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: 'rgba(245,242,234,0.55)', letterSpacing: '0.02em',
          maxWidth: Math.max(160, width * 0.6),
          overflow: 'hidden',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: accent, flexShrink: 0, boxShadow: `0 0 6px ${accent}`,
          }}/>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {url}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, background: '#0f1115', overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}

// ── WebsiteMockup ────────────────────────────────────────────────────────────
export function WebsiteMockup({ kind = 'social', accent = 'oklch(70% 0.15 250)', t = 0 }) {
  switch (kind) {
    case 'social':   return <MockSocial accent={accent} t={t} />;
    case 'travel':   return <MockTravel accent={accent} t={t} />;
    case 'movies':   return <MockMovies accent={accent} t={t} />;
    case 'festival': return <MockFestival accent={accent} t={t} />;
    case 'shop':     return <MockShop accent={accent} t={t} />;
    case 'editor':   return <MockEditor accent={accent} t={t} />;
    default:         return null;
  }
}

// ── Mock visuals ─────────────────────────────────────────────────────────────
function MockSocial({ accent, t }) {
  return (
    <div style={{ padding: 10, height: '100%', background: '#0f1115', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 60, height: 8, background: accent, opacity: 0.9, borderRadius: 2 }}/>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--fg-15)' }}/>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--fg-15)' }}/>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, oklch(60% 0.15 320))` }}/>
        <div>
          <div style={{ width: 60, height: 6, background: 'rgba(245,242,234,0.6)', borderRadius: 1, marginBottom: 3 }}/>
          <div style={{ width: 40, height: 5, background: 'rgba(245,242,234,0.3)', borderRadius: 1 }}/>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {[...Array(9)].map((_, i) => {
          const pulse = (Math.sin(t * 2 + i * 0.4) + 1) * 0.5;
          return (
            <div key={i} style={{
              aspectRatio: '1',
              background: `linear-gradient(${135 + i * 40}deg, oklch(${40 + pulse * 30}% 0.12 ${(i * 47) % 360}), oklch(${60 - pulse * 10}% 0.14 ${(i * 47 + 60) % 360}))`,
              borderRadius: 4, position: 'relative',
            }}>
              <div style={{ position: 'absolute', bottom: 3, left: 3, width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockTravel({ accent, t }) {
  return (
    <div style={{ height: '100%', background: '#0f1115', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        height: '55%',
        background: 'linear-gradient(135deg, oklch(35% 0.08 30), oklch(55% 0.12 20), oklch(60% 0.14 60))',
        position: 'relative', overflow: 'hidden',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0 }} preserveAspectRatio="none" viewBox="0 0 100 40">
          <polygon points="0,40 20,15 35,25 50,8 70,20 85,12 100,22 100,40" fill="#0a0b0f" opacity="0.6"/>
          <polygon points="0,40 15,25 30,32 50,20 65,28 80,22 100,30 100,40" fill="#0a0b0f"/>
        </svg>
        <div style={{ position: 'absolute', top: 12, left: 12, width: 80, height: 10, background: 'rgba(255,255,255,0.9)', borderRadius: 2 }}/>
        <div style={{ position: 'absolute', top: 28, left: 12, width: 120, height: 6, background: 'rgba(255,255,255,0.6)', borderRadius: 1 }}/>
      </div>
      <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ background: 'var(--fg-04)', padding: 8, borderRadius: 3 }}>
            <div style={{ width: '100%', height: 24, background: `oklch(50% 0.1 ${(i*80)%360})`, borderRadius: 2, marginBottom: 5 }}/>
            <div style={{ width: '80%', height: 4, background: 'rgba(245,242,234,0.5)', borderRadius: 1, marginBottom: 3 }}/>
            <div style={{ width: '60%', height: 4, background: 'rgba(245,242,234,0.3)', borderRadius: 1 }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockMovies({ accent, t }) {
  return (
    <div style={{ height: '100%', background: '#0a0a0d', padding: 10 }}>
      <div style={{
        height: 26, background: 'var(--fg-04)',
        border: `1px solid ${accent}66`, borderRadius: 3, marginBottom: 8,
        display: 'flex', alignItems: 'center', padding: '0 8px',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, marginRight: 6 }}/>
        <div style={{ width: 60, height: 4, background: 'rgba(245,242,234,0.3)', borderRadius: 1 }}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {[...Array(12)].map((_, i) => {
          const hue = (i * 33) % 360;
          const liked = (i + Math.floor(t)) % 4 === 0;
          return (
            <div key={i} style={{
              aspectRatio: '2/3',
              background: `linear-gradient(170deg, oklch(35% 0.1 ${hue}), oklch(20% 0.08 ${hue + 40}))`,
              borderRadius: 3, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', bottom: 2, left: 2, right: 2, height: 3, background: 'rgba(245,242,234,0.4)', borderRadius: 1 }}/>
              {liked && (
                <div style={{ position: 'absolute', top: 3, right: 3, width: 8, height: 8, borderRadius: '50%', background: 'oklch(75% 0.2 20)', boxShadow: '0 0 6px oklch(75% 0.2 20)' }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockFestival({ accent, t }) {
  return (
    <div style={{ height: '100%', background: '#e8e6dd', padding: 12, fontFamily: '"Space Grotesk", sans-serif', color: '#0a0a0c', position: 'relative' }}>
      <div style={{ display: 'flex', gap: 10, fontSize: 7, fontWeight: 500, marginBottom: 20, opacity: 0.8 }}>
        {['LOGO', 'AFISHA', 'BIBLIO', 'PROJECTS', 'HISTORY', 'BLOG', 'ABOUT'].map((x, i) => (
          <div key={i} style={{ whiteSpace: 'nowrap' }}>{x}</div>
        ))}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: 12 }}>
        Lyubimovka—<br/>Festival 2023
      </div>
      <div style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid #0a0a0c', fontSize: 7, letterSpacing: '0.1em', marginBottom: 20 }}>
        READ MORE →
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40%', height: '30%', background: 'oklch(78% 0.15 120)', padding: 8 }}>
        <div style={{ fontSize: 7, fontWeight: 600, marginBottom: 4 }}>НОВОСТИ</div>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>Эхо<br/>Любимовки</div>
      </div>
    </div>
  );
}

function MockShop({ accent, t }) {
  return (
    <div style={{ height: '100%', background: '#fff', padding: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ width: 40, height: 10, background: accent, borderRadius: 2 }}/>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 14, height: 10, background: 'rgba(0,0,0,0.15)', borderRadius: 2 }}/>
          <div style={{ width: 24, height: 10, background: accent, borderRadius: 2 }}/>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ background: '#f4f1ea', borderRadius: 3, padding: 4 }}>
            <div style={{ aspectRatio: '1', background: `radial-gradient(circle at 40% 40%, oklch(75% 0.15 ${(i*60)%360}), oklch(50% 0.12 ${(i*60+40)%360}))`, borderRadius: 2, marginBottom: 4 }}/>
            <div style={{ width: '70%', height: 3, background: '#333', borderRadius: 1, marginBottom: 2 }}/>
            <div style={{ width: '40%', height: 3, background: accent, borderRadius: 1 }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockEditor({ accent, t }) {
  const nodes = [
    { x: 15, y: 20, w: 25, h: 16, c: accent },
    { x: 55, y: 30, w: 25, h: 16, c: 'oklch(70% 0.15 160)' },
    { x: 30, y: 60, w: 25, h: 16, c: 'oklch(70% 0.15 30)' },
    { x: 70, y: 70, w: 25, h: 16, c: 'oklch(70% 0.15 320)' },
  ];
  return (
    <div style={{ height: '100%', background: '#15171d', position: 'relative', padding: 8 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, var(--fg-10) 0.5px, transparent 1px)', backgroundSize: '12px 12px' }}/>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 40 28 Q 50 28 55 38" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.7"/>
        <path d="M 42 36 Q 42 50 42 60" stroke="oklch(70% 0.15 160)" strokeWidth="0.5" fill="none" opacity="0.7"/>
        <path d="M 55 68 Q 65 75 70 78" stroke="oklch(70% 0.15 30)" strokeWidth="0.5" fill="none" opacity="0.7"/>
      </svg>
      {nodes.map((n, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, width: `${n.w}%`, height: `${n.h}%`,
          background: 'var(--fg-06)', border: `1px solid ${n.c}`, borderRadius: 3, boxShadow: `0 0 8px ${n.c}44`,
        }}>
          <div style={{ height: '40%', background: n.c, opacity: 0.3, borderRadius: '2px 2px 0 0' }}/>
          <div style={{ padding: 2 }}>
            <div style={{ width: '80%', height: 2, background: 'rgba(245,242,234,0.5)', borderRadius: 1, marginBottom: 2 }}/>
            <div style={{ width: '60%', height: 2, background: 'rgba(245,242,234,0.3)', borderRadius: 1 }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

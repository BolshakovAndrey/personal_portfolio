import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LiveChat } from './BotLiveChat';

const BOTS = [
  { id: 'gc', title: 'GoodChemistry',    sub: 'e-commerce bot',       accent: 'oklch(78% 0.18 280)' },
  { id: 'ht', title: 'AI Health Tracker', sub: 'GPT Vision nutrition', accent: 'oklch(78% 0.15 160)' },
  { id: 'dl', title: 'DeliveryBot',       sub: 'business lunches',     accent: 'oklch(78% 0.15 50)'  },
  { id: 'mr', title: 'Fitness Marathon',  sub: 'gamified challenge',    accent: 'oklch(78% 0.16 210)' },
];

const N = BOTS.length;

const SLOT = [
  { xPct: 0,    scale: 1,    opacity: 1,    zIndex: 4 },   // center (active)
  { xPct: 38,   scale: 0.52, opacity: 0.45, zIndex: 3 },   // right
  { xPct: -38,  scale: 0.52, opacity: 0.45, zIndex: 3 },   // left
  { xPct: 0,    scale: 0.3,  opacity: 0,    zIndex: 1 },   // hidden (back)
];

function slotFor(delta) {
  if (delta === 0) return SLOT[0];
  if (delta === 1 || delta === -(N - 1)) return SLOT[1];
  if (delta === -1 || delta === N - 1) return SLOT[2];
  return SLOT[3];
}

const PW = 320;
const PH = 620;

export default function BotConstellation({ onSelectBot }) {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const [cw, setCw] = useState(900);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const [bob, setBob] = useState(0);

  useEffect(() => {
    const measure = () => { if (containerRef.current) setCw(containerRef.current.offsetWidth); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    const step = () => {
      tRef.current += 0.012;
      setBob(Math.sin(tRef.current) * 8);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const go = useCallback((dir) => {
    setActive(a => (a + dir + N) % N);
  }, []);

  // Stage height: just the phone, with vertical padding so it doesn't clip
  const ch = PH + 40;
  const cx = cw / 2;
  const cy = ch / 2;

  const activeBot = BOTS[active];

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative', userSelect: 'none' }}>
      <style>{`
        @keyframes bcFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Stage — only phones, no labels inside */}
      <div style={{ position: 'relative', width: cw, height: ch, overflow: 'hidden' }}>

        {/* Ambient glow behind active */}
        <div style={{
          position: 'absolute',
          left: cx, top: cy,
          width: 320, height: 320,
          marginLeft: -160, marginTop: -160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${activeBot.accent}18 0%, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transition: 'background 400ms',
        }} />

        {/* Phones */}
        {BOTS.map((bot, i) => {
          const delta = ((i - active) + N) % N;
          const dSigned = delta <= N / 2 ? delta : delta - N;
          const slot = slotFor(dSigned);
          const isActive = dSigned === 0;
          const xPx = cx + (slot.xPct / 100) * cw;
          const yPx = cy + (isActive ? bob : 0);

          return (
            <div
              key={bot.id}
              onClick={() => isActive ? onSelectBot(bot.id) : go(dSigned > 0 ? 1 : -1)}
              style={{
                position: 'absolute',
                left: xPx,
                top: yPx,
                transform: `translate(-50%, -50%) scale(${slot.scale})`,
                opacity: slot.opacity,
                zIndex: slot.zIndex,
                cursor: 'pointer',
                transition: 'left 420ms cubic-bezier(.4,0,.2,1), top 420ms cubic-bezier(.4,0,.2,1), transform 420ms cubic-bezier(.4,0,.2,1), opacity 420ms',
              }}
            >
              {/* Phone shell */}
              <div style={{
                width: PW, height: PH,
                background: '#0b0c0e',
                borderRadius: 46,
                padding: 8,
                boxShadow: isActive
                  ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${bot.accent}33`
                  : '0 16px 40px rgba(0,0,0,0.4)',
                transition: 'box-shadow 400ms',
                position: 'relative',
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  background: '#0c0d10',
                  borderRadius: 38,
                  overflow: 'hidden',
                  position: 'relative',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity 400ms',
                  pointerEvents: 'none',
                }}>
                  {/* Dynamic Island */}
                  <div style={{
                    position: 'absolute', top: 10, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 90, height: 22,
                    background: '#000', borderRadius: 14, zIndex: 10,
                  }} />
                  <LiveChat botId={bot.id} compact autoScroll />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Label — outside stage so overflow:hidden doesn't clip it */}
      <div key={activeBot.id} style={{
        textAlign: 'center', marginTop: 20,
        animation: 'bcFadeIn 300ms ease',
      }}>
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 600,
          color: 'var(--fg)', letterSpacing: '-0.02em',
        }}>{activeBot.title}</div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: activeBot.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
          marginTop: 4,
        }}>{activeBot.sub}</div>
        <div style={{
          marginTop: 12,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: activeBot.accent, letterSpacing: '0.14em', textTransform: 'uppercase',
          opacity: 0.85,
        }}>нажмите чтобы открыть →</div>
      </div>

      {/* Arrows */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 24, marginTop: 20,
      }}>
        <button
          onClick={() => go(-1)}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--fg-04)', border: '1px solid var(--fg-10)',
            color: 'var(--fg)', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 200ms, border-color 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--fg-10)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--fg-04)'}
        >←</button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {BOTS.map((bot, i) => (
            <button
              key={bot.id}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 20 : 6,
                height: 6, borderRadius: 3,
                background: i === active ? activeBot.accent : 'var(--fg-10)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 300ms',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--fg-04)', border: '1px solid var(--fg-10)',
            color: 'var(--fg)', fontSize: 18, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 200ms',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--fg-10)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--fg-04)'}
        >→</button>
      </div>
    </div>
  );
}

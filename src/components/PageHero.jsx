import React from 'react';

const PAGE_META = {
  about: {
    label: '// about',
    kicker: '4+ years · 2 continents',
    title: 'Builder.',
    sub: 'Python backend. React frontend. Telegram bots and web apps for real teams.',
    accent: 'var(--accent-bots)',
  },
  portfolio: {
    label: '// projects · 10',
    kicker: 'ten shipped things',
    title: 'The work.',
    sub: 'Bots, platforms, editorial sites. Click any card to preview.',
    accent: 'var(--accent-web)',
  },
  contact: {
    label: '// contact',
    kicker: 'fastest response on telegram',
    title: 'Get in touch.',
    sub: 'Hiring, freelance, friendly DMs — all welcome.',
    accent: 'var(--accent-link)',
  },
};

export default function PageHero({ page }) {
  const m = PAGE_META[page];
  if (!m) return null;

  return (
    <section style={{
      position: 'relative',
      padding: 'clamp(120px, 20vh, 200px) clamp(20px, 5vw, 80px) clamp(60px, 8vh, 100px)',
      background: 'var(--bg-hero)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div className="page-enter-up" style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: m.accent,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>
          {m.label} · <span style={{ opacity: 0.6 }}>{m.kicker}</span>
        </div>

        <h1 className="page-enter" style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 'clamp(56px, 9vw, 140px)',
          fontWeight: 500,
          color: 'var(--fg)',
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          margin: 0,
        }}>
          {m.title}
        </h1>

        <p className="page-enter-up" style={{
          marginTop: 24,
          maxWidth: 560,
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(15px, 1.2vw, 18px)',
          color: 'var(--fg)',
          opacity: 0.6,
          lineHeight: 1.55,
          animationDelay: '150ms',
        }}>
          {m.sub}
        </p>

        <div style={{
          marginTop: 40,
          height: 2,
          maxWidth: 120,
          background: m.accent,
          opacity: 0.8,
          animation: 'softBlur 900ms cubic-bezier(.2,.8,.2,1) 300ms both',
        }} />
      </div>

      {/* Orb */}
      <div style={{
        position: 'absolute',
        right: '-10%', top: '20%',
        width: 600, height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, color-mix(in oklch, ${m.accent} 11%, transparent) 0%, transparent 60%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </section>
  );
}

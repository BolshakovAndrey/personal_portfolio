import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const TERMINAL_ROLES = [
  'Backend Development',
  'Frontend Development',
  'Full-stack Development',
  'Telegram Bot Development',
  'AI Solutions Development'
];

function TerminalBio({ t }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const typingSpeed = isDeleting ? 40 : 80;
  const pauseTime = 2000;

  useEffect(() => {
    let timer;
    const currentRole = TERMINAL_ROLES[index];

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % TERMINAL_ROLES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentRole.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  const syntax = {
    keyword: '#ff79c6',
    variable: '#8be9fd',
    string: '#f1fa8c',
    operator: '#f8f8f2',
    comment: '#6272a4',
    prompt: '#50fa7b',
    icon_apple: '#ffffff',
    icon_home: '#8be9fd',
    icon_path: '#6272a4',
    icon_arrow: '#ff5555'
  };

  const lastLogin = new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div style={{ 
      marginTop: 24, 
      fontFamily: 'JetBrains Mono, monospace', 
      fontSize: 'clamp(12px, 0.9vw, 15px)', 
      lineHeight: 1.8,
      padding: '20px',
      background: 'rgba(0,0,0,0.3)',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.05)',
      maxWidth: 640
    }}>
      {/* Last Login Header */}
      <div style={{ color: syntax.comment, marginBottom: 12, fontSize: '0.85em' }}>
        Last login: {lastLogin} on ttys001
      </div>

      {/* Line 1: Real Zsh Prompt */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ color: syntax.icon_apple }}></span>
          <span style={{ color: syntax.icon_home }}>🏠</span>
          <span style={{ color: syntax.icon_path }}>~</span>
          <span style={{ color: syntax.icon_arrow }}>❯</span>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <span style={{ color: syntax.variable }}>specialize</span>
          <span style={{ color: syntax.operator, margin: '0 8px' }}>--in</span>
          <span style={{ color: syntax.string }}>'{displayText}'</span>
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ width: 8, height: 16, background: syntax.prompt, display: 'inline-block', marginLeft: 4, verticalAlign: 'middle' }} 
          />
        </div>
        <div style={{ color: syntax.comment, fontSize: '0.8em', opacity: 0.7 }}>
           {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Line 2 Content */}
      <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: '0 8px', paddingLeft: 70 }}>
         <span style={{ color: syntax.keyword }}>const</span>
         <span style={{ color: syntax.variable }}>mission</span>
         <span style={{ color: syntax.operator }}>=</span>
         <span style={{ color: syntax.string }}>"{t('hero.about_sub_part2', { defaultValue: 'Telegram-боты и веб-приложения для реальных команд.' })}"</span>
      </div>
      
      {/* Line 3 Status */}
      <div style={{ marginTop: 4, color: syntax.comment, fontSize: '0.85em', paddingLeft: 70 }}>
         // status: <span style={{ color: syntax.prompt }}>ready_to_deploy</span>
      </div>
    </div>
  );
}

export default function PageHero({ page }) {
  const { t } = useTranslation();

  const PAGE_META = {
    about: {
      label: t('hero.about_label'),
      kicker: t('hero.about_kicker'),
      title: t('hero.about_title'),
      sub: t('hero.about_sub'),
      accent: 'var(--accent-bots)',
    },
    portfolio: {
      label: t('hero.portfolio_label'),
      kicker: t('hero.portfolio_kicker'),
      title: t('hero.portfolio_title'),
      sub: t('hero.portfolio_sub'),
      accent: 'var(--accent-web)',
    },
    contact: {
      label: t('hero.contact_label'),
      kicker: t('hero.contact_kicker'),
      title: t('hero.contact_title'),
      sub: t('hero.contact_sub'),
      accent: 'var(--accent-link)',
    },
  };

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

        {page === 'about' ? (
          <TerminalBio t={t} />
        ) : (
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
        )}

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

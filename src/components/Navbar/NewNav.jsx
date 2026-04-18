import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

// ── useTheme hook ────────────────────────────────────────────────────────────
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
      return document.documentElement.dataset.theme;
    }
    return 'dark';
  });

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    document.documentElement.dataset.theme = next;
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggle };
}

// ── ThemeToggle ──────────────────────────────────────────────────────────────
function ThemeToggle({ theme, onToggle }) {
  const isDark = theme !== 'light';
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 40, height: 40, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--fg-15)',
        color: 'var(--fg)',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--fg-06)';
        e.currentTarget.style.borderColor = 'var(--fg-20)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'var(--fg-15)';
      }}
    >
      <svg
        width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        style={{
          transition: 'transform 400ms cubic-bezier(.2,.8,.2,1)',
          transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        {isDark ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
          </>
        )}
      </svg>
    </button>
  );
}

// ── Nav routes ───────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/portfolio',label: 'Portfolio' },
  { to: '/contact',  label: 'Contact' },
];

// ── NewNav component ─────────────────────────────────────────────────────────
function NewNav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 820 : false
  );

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    const onScroll = () => setScrolled(window.scrollY > 30);
    check(); onScroll();
    window.addEventListener('resize', check);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const linkStyle = (isActive) => ({
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--fg)',
    opacity: isActive ? 1 : 0.6,
    textDecoration: 'none',
    padding: '6px 2px',
    borderBottom: isActive ? '1px solid var(--fg)' : '1px solid transparent',
    transition: 'opacity 200ms, border-color 200ms',
  });

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: isMobile ? '14px 20px' : '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--fg-06)' : '1px solid transparent',
        transition: 'background 300ms ease, border-color 300ms ease',
      }}>
        {/* Logo / name */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-ok)',
            boxShadow: '0 0 12px var(--accent-ok)',
            animation: 'pulse 2s ease infinite',
            flexShrink: 0,
          }}/>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: isMobile ? 10 : 11,
            color: 'var(--fg)', opacity: 0.85,
            letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            {isMobile ? 'A. Bolshakov' : 'Andrei Bolshakov'}
          </div>
        </NavLink>

        {/* Desktop nav */}
        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: 8, display: 'flex', flexDirection: 'column', gap: 4,
              }}
            >
              <span style={{
                display: 'block', width: 24, height: 2, background: 'var(--fg)',
                transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                transition: 'all 200ms',
              }}/>
              <span style={{
                display: 'block', width: 24, height: 2, background: 'var(--fg)',
                opacity: open ? 0 : 1, transition: 'all 200ms',
              }}/>
              <span style={{
                display: 'block', width: 24, height: 2, background: 'var(--fg)',
                transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                transition: 'all 200ms',
              }}/>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => linkStyle(isActive)}
              >
                {label}
              </NavLink>
            ))}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: open ? '100vh' : 0,
          background: 'var(--bg-nav)',
          backdropFilter: 'blur(20px)',
          zIndex: 150,
          transition: 'height 350ms cubic-bezier(.2,.8,.2,1)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 28,
        }}>
          {NAV_LINKS.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 42, fontWeight: 500,
                color: 'var(--fg)', textDecoration: 'none',
                letterSpacing: '-0.03em',
                opacity: open ? (isActive ? 1 : 0.7) : 0,
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 400ms ${i * 60}ms cubic-bezier(.2,.8,.2,1)`,
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}

export default NewNav;

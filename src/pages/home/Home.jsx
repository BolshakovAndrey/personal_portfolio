import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import GlobeCanvas from '../../components/Globe/GlobeCanvas';
import ProjectDetail from '../../components/Globe/ProjectDetail';
import BotProjectModal from '../../components/BotProjectModal';

// Bot screenshot images (imported from assets)
import GC2 from '../../assets/bots/goodchemistry-02-catalog.png';
import HT4 from '../../assets/bots/healthtracker-04-report.png';
import DL2 from '../../assets/bots/delivery-02-category.png';
import MR2 from '../../assets/bots/marathon-02-chat.png';

// Map bot node id → imported image
const BOT_IMAGE_MAP = {
  gc:  GC2,
  ht:  HT4,
  dl:  DL2,
  mr:  MR2,
};

// Project nodes
const BOT_NODES = [
  { id: 'gc',  city: 'Moscow',   lat: 55.75, lon: 37.61,  title: 'GoodChemistry',    sub: 'e-commerce bot',      url: 'http://t.me/online_gc_bot',       stack: 'Python · Aiogram · PostgreSQL' },
  { id: 'ht',  city: 'Lisbon',   lat: 38.72, lon: -9.14,  title: 'AI Health Tracker', sub: 'GPT Vision nutrition', url: 'https://t.me/NutrForProBot',      stack: 'Python · OpenAI Vision · Redis' },
  { id: 'dl',  city: 'Berlin',   lat: 52.52, lon: 13.40,  title: 'DeliveryBot',       sub: 'business lunches',    url: 'http://t.me/DeliveryBot_mvp_bot', stack: 'Python · Aiogram · Sheets' },
  { id: 'mr',  city: 'Istanbul', lat: 41.01, lon: 28.98,  title: 'Fitness Marathon',  sub: 'gamified challenge',  url: 'https://t.me/slim_together_bot',  stack: 'Aiogram · FastAPI · React' },
];

const WEB_NODES = [
  { id: 'lub',    city: 'Belgrade',  lat: 44.79, lon: 20.45, title: 'Lyubimovka Festival', sub: 'festival platform', url: 'https://lubimovka.art',                                       kind: 'festival', stack: 'Python · Django · React', accent: 'oklch(78% 0.15 120)' },
  { id: 'place',  city: 'Amsterdam', lat: 52.37, lon:  4.89, title: 'The Place',           sub: 'social network',    url: 'https://bolshakov.nomoredomains.xyz',                         kind: 'social',   stack: 'React · Node.js',         accent: 'oklch(70% 0.15 250)' },
  { id: 'movies', city: 'Warsaw',    lat: 52.23, lon: 21.01, title: 'Movies Explorer',     sub: 'film library',      url: 'https://bolshakovav.nomoredomains.xyz/movies',                kind: 'movies',   stack: 'React · Node.js',         accent: 'oklch(70% 0.15 200)' },
  { id: 'travel', city: 'Tbilisi',   lat: 41.72, lon: 44.79, title: 'Russian Travel',      sub: 'adaptive site',     url: 'https://bolshakovandrey.github.io/russian-travel/',           kind: 'travel',   stack: 'HTML · CSS',              accent: 'oklch(75% 0.15 50)' },
  { id: 'shop',   city: 'Prague',    lat: 50.08, lon: 14.44, title: 'Toy4Joy',             sub: 'e-shop',            url: 'https://www.toy4joy.site/',                                   kind: 'shop',     stack: 'jQuery · Bootstrap',      accent: 'oklch(75% 0.16 25)' },
  { id: 'editor', city: 'Zurich',    lat: 47.38, lon:  8.55, title: 'Visual Script Editor', sub: 'QCodes',           url: 'https://bolshakovandrey.github.io/qcodes-react-demo-pages/', kind: 'editor',   stack: 'React.js',                accent: 'oklch(72% 0.15 300)' },
];

const WORLD_CITIES = [
  [40.71, -74.01], [35.68, 139.69], [-33.87, 151.21], [-23.55, -46.63],
  [1.35,  103.82], [25.20,  55.27], [28.61,   77.21], [43.65,  -79.38],
  [-1.29,  36.82], [13.75, 100.50], [37.57,  126.98], [19.43,  -99.13],
  [39.90, 116.40], [37.77,-122.42], [22.32,  114.17], [-34.60, -58.38],
  [41.88, -87.63], [34.05,-118.24], [ 6.52,    3.38], [29.76,  -95.37],
  [30.04,  31.23], [59.33,  18.07], [48.86,    2.35], [51.51,   -0.13],
  [33.75, -84.39], [45.42, -75.70], [64.13,  -21.95], [14.60,  120.98],
];

function generateArcs() {
  const B = '178, 132, 255';
  const W = '120, 220, 160';
  const pick = (n) => [...WORLD_CITIES].sort(() => Math.random() - 0.5).slice(0, n);
  const arcs = [];
  for (const node of BOT_NODES)
    pick(3).forEach(to => arcs.push({ from: [node.lat, node.lon], to, color: B }));
  for (const node of WEB_NODES)
    pick(2).forEach(to => arcs.push({ from: [node.lat, node.lon], to, color: W }));
  return arcs;
}

// ── FilmGrain ────────────────────────────────────────────────────────────────
function FilmGrain({ opacity = 0.04 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'1.2\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'120\' height=\'120\' filter=\'url(%23n)\' opacity=\'1\'/></svg>")',
      opacity,
      mixBlendMode: 'overlay',
      pointerEvents: 'none',
      zIndex: 1,
    }}/>
  );
}

// ── HoverCard ────────────────────────────────────────────────────────────────
function HoverCard({ hover, boxRect }) {
  const { t } = useTranslation();
  if (!hover) return null;
  const { node, group, sx, sy } = hover;
  const color = group === 'bots' ? 'oklch(78% 0.18 280)' : 'oklch(78% 0.15 140)';
  const left = boxRect.left + sx;
  const top  = boxRect.top  + sy;
  return (
    <div style={{
      position: 'fixed', left, top,
      transform: 'translate(12px, 12px)',
      pointerEvents: 'none',
      zIndex: 500,
      background: 'var(--bg-elev)',
      border: `1px solid ${color}66`,
      borderRadius: 8,
      padding: '10px 14px',
      fontFamily: 'Inter, sans-serif',
      boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 30px ${color}33`,
      animation: 'fadeIn 150ms ease',
      minWidth: 200,
    }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
        color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4,
      }}>
        {group === 'bots' ? t('home.tg_bot') : t('home.web_app')} · {node.city}
      </div>
      <div style={{
        fontFamily: '"Space Grotesk", sans-serif', fontSize: 18, fontWeight: 600,
        color: 'var(--fg)', letterSpacing: '-0.02em',
      }}>
        {node.title}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif', fontSize: 12,
        color: 'var(--fg)', opacity: 0.55, marginTop: 2,
      }}>
        {node.sub}
      </div>
      <div style={{
        marginTop: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color, opacity: 0.8, letterSpacing: '0.1em',
      }}>
        {t('home.click_open')}
      </div>
    </div>
  );
}

// ── HeroSection ──────────────────────────────────────────────────────────────
// Europe oscillation constants
const EUROPE_CENTER = 0.32; // ~18° lon — Central Europe in front
const EUROPE_AMP    = 0.48; // ±27° — covers Portugal↔Moscow

function HeroSection({ theme }) {
  const { t } = useTranslation();
  const [rotation, setRotation] = useState(EUROPE_CENTER - EUROPE_AMP); // start at Greenwich
  const [pulseT, setPulseT]     = useState(0);
  const [mouse, setMouse]       = useState({ x: 0.5, y: 0.5 });
  const [hover, setHover]       = useState(null);
  const [land, setLand]         = useState(null);
  const [loadState, setLoadState] = useState('loading');
  const [selected, setSelected] = useState(null);
  const [speed, setSpeed]       = useState(1);
  const [paused, setPaused]     = useState(false);
  const pausedRef               = useRef(false);
  const [globeArcs, setGlobeArcs] = useState(() => generateArcs());
  const nodesRef    = useRef([]);
  const globeBoxRef = useRef(null);
  const [boxRect, setBoxRect] = useState({ left: 0, top: 0 });

  // Drag state
  const isDragging      = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartRot    = useRef(0);
  const manualOffset    = useRef(0);
  const preDragOffset   = useRef(0);   // offset saved at drag start — prevents click from resetting position
  const animTime        = useRef(0);

  // Load world land polygons
  useEffect(() => {
    const loadWorld = async () => {
      try {
        const [topoResp, topoClientResp] = await Promise.all([
          fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json'),
          fetch('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'),
        ]);
        const topo = await topoResp.json();
        const clientSrc = await topoClientResp.text();
        const module = {}; const exports = {};
        const fn = new Function('module', 'exports', clientSrc + '; return (typeof topojson !== "undefined" ? topojson : (module.exports || exports));');
        const topojson = fn(module, exports) || window.topojson;
        const geo = topojson.feature(topo, topo.objects.land);
        const polys = [];
        const walk = (coords) => {
          if (typeof coords[0] === 'number') return;
          if (typeof coords[0][0] === 'number') { polys.push(coords); return; }
          for (const c of coords) walk(c);
        };
        if (geo.type === 'FeatureCollection') {
          for (const f of geo.features) walk(f.geometry.coordinates);
        } else if (geo.type === 'Feature') {
          walk(geo.geometry.coordinates);
        }
        setLand(polys);
        setLoadState('ready');
      } catch (err) {
        console.warn('Failed to load world atlas, using fallback', err);
        setLand([]);
        setLoadState('ready');
      }
    };
    loadWorld();
  }, []);

  // Rotation + pulse animation — oscillates over Europe, no full spins
  useEffect(() => {
    let raf, last = performance.now();
    const step = (ts) => {
      const dt = Math.min((ts - last) / 1000, 0.05); last = ts;
      if (!isDragging.current && !pausedRef.current) {
        animTime.current += dt * speed * 0.18;
        const osc = EUROPE_CENTER + EUROPE_AMP * Math.sin(animTime.current);
        setRotation(osc + manualOffset.current);
      }
      setPulseT(p => (p + dt * 0.5) % 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Track globe container rect
  useEffect(() => {
    const update = () => {
      if (!globeBoxRef.current) return;
      const r = globeBoxRef.current.getBoundingClientRect();
      setBoxRect({ left: r.left, top: r.top });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
    const id = setInterval(update, 200);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
      clearInterval(id);
    };
  }, []);

  // Each arc refreshes independently at a random interval (3–9 s)
  useEffect(() => {
    const alive = { v: true };
    const timers = new Map();

    const schedule = (i) => {
      const delay = 3000 + Math.random() * 6000;
      timers.set(i, setTimeout(() => {
        if (!alive.v) return;
        setGlobeArcs(prev => {
          const next = [...prev];
          next[i] = { ...next[i], to: WORLD_CITIES[Math.floor(Math.random() * WORLD_CITIES.length)] };
          return next;
        });
        schedule(i);
      }, delay));
    };

    globeArcs.forEach((_, i) => schedule(i));
    return () => { alive.v = false; timers.forEach(clearTimeout); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key to close modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Responsive sizing
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const isMobile  = vw < 820;
  const isTablet  = vw < 1180 && !isMobile;
  const globeSize = isMobile ? Math.min(vw - 20, 460) : isTablet ? 540 : 720;
  const tilt      = 0.25;
  const parallaxX = (mouse.x - 0.5) * 16;

  // Drag handlers
  const onDragStart = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    preDragOffset.current = manualOffset.current;          // save before drag
    dragStartRot.current = rotation - manualOffset.current;
  };
  const onDragMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = x - dragStartX.current;
    manualOffset.current = preDragOffset.current + dx / 240; // accumulate, don't reset
    setRotation(dragStartRot.current + manualOffset.current);
  };
  const onDragEnd = () => { isDragging.current = false; };

  return (
    <>
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'var(--bg-hero)',
          overflow: 'visible',
          fontFamily: 'Inter, system-ui, sans-serif',
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '90px 20px 40px' : isTablet ? '100px 40px 60px' : '100px 80px 60px',
        }}
      >
        {/* Clipped decorative layer — film grain + stars stay inside section bounds */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <FilmGrain opacity={0.04} />

        {/* Starfield */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <pattern id="stars" width="140" height="140" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="30" r="0.7" fill="#fff" opacity="0.7"/>
                <circle cx="80" cy="15" r="0.5" fill="#fff" opacity="0.5"/>
                <circle cx="50" cy="90" r="0.8" fill="#b4d0ff" opacity="0.6"/>
                <circle cx="120" cy="60" r="0.5" fill="#fff" opacity="0.4"/>
                <circle cx="30" cy="110" r="0.6" fill="#fff" opacity="0.6"/>
                <circle cx="100" cy="120" r="0.4" fill="#d4e0ff" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stars)"/>
          </svg>
        </div>
        </div>{/* end clipped decorative layer */}

        {/* Main grid layout */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 1400, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 60,
          alignItems: 'center',
        }}>

          {/* LEFT: Text */}
          <div style={{
            transform: isMobile ? 'none' : `translateX(${parallaxX * 0.4}px)`,
            maxWidth: isMobile ? '100%' : 480,
            order: isMobile || isTablet ? 1 : 0,
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: 'oklch(78% 0.18 280)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              {t('home.label', { count: 10 })}
            </div>

            <h1 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 500,
              color: 'var(--fg)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              margin: 0,
            }}>
              {t('home.h1')}<br/>
              <span style={{
                fontStyle: 'italic',
                background: 'linear-gradient(90deg, oklch(78% 0.18 280), oklch(78% 0.15 140))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('home.h2')}
              </span>
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: 'var(--fg)', opacity: 0.55,
              lineHeight: 1.6, marginTop: 24, maxWidth: 380,
            }}>
              {t('home.sub')}
              {!isMobile && <><br/>{t('home.hint')}</>}
            </p>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 28, marginTop: 36 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'oklch(78% 0.18 280)',
                    boxShadow: '0 0 10px oklch(78% 0.18 280)',
                  }}/>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: 'var(--fg)', opacity: 0.7,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                  }}>{t('home.stats_bots')}</div>
                </div>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif', fontSize: 32, fontWeight: 500,
                  color: 'var(--fg)', letterSpacing: '-0.02em',
                }}>04</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'oklch(78% 0.15 140)',
                    boxShadow: '0 0 10px oklch(78% 0.15 140)',
                  }}/>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: 'var(--fg)', opacity: 0.7,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                  }}>{t('home.stats_web')}</div>
                </div>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif', fontSize: 32, fontWeight: 500,
                  color: 'var(--fg)', letterSpacing: '-0.02em',
                }}>06</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'oklch(82% 0.17 50)',
                    boxShadow: '0 0 10px oklch(82% 0.17 50)',
                  }}/>
                  <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                    color: 'var(--fg)', opacity: 0.7,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                  }}>{t('home.stats_years')}</div>
                </div>
                <div style={{
                  fontFamily: '"Space Grotesk", sans-serif', fontSize: 32, fontWeight: 500,
                  color: 'var(--fg)', letterSpacing: '-0.02em',
                }}>5+</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Globe */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            margin: isMobile || isTablet ? '0 auto' : '0 0 0 auto',
            order: isMobile || isTablet ? 0 : 1,
            transform: isMobile ? 'none' : `translateX(${parallaxX * 0.3}px)`,
          }}>
            <div
              ref={globeBoxRef}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={onDragStart}
              onTouchMove={onDragMove}
              onTouchEnd={onDragEnd}
              style={{
                position: 'relative',
                width: globeSize, height: globeSize,
                cursor: isDragging.current ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
            >
              {/* Circular glow aligned to sphere boundary (canvas has 20px padding around sphere) */}
              <div style={{
                position: 'absolute',
                inset: 20,
                borderRadius: '50%',
                boxShadow: '0 0 36px 4px rgba(60,100,170,0.20)',
                pointerEvents: 'none',
                zIndex: -1,
              }} />

              {loadState === 'ready' ? (
                <GlobeCanvas
                  size={globeSize}
                  rotation={rotation}
                  tilt={tilt}
                  land={land}
                  pulseT={pulseT}
                  theme={theme}
                  nodes={nodesRef}
                  botNodes={BOT_NODES}
                  webNodes={WEB_NODES}
                  arcs={globeArcs}
                  onNodeHover={setHover}
                  onNodeClick={(h) => { if (!isDragging.current) setSelected({ project: h.node, group: h.group }); }}
                />
              ) : (
                <div style={{
                  width: globeSize, height: globeSize,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                  color: 'var(--fg)', opacity: 0.5,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                }}>
                  {t('home.loading')}
                </div>
              )}
            </div>

            {/* Globe controls */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginTop: 12,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
              color: 'var(--fg)', opacity: 0.5, letterSpacing: '0.15em',
              userSelect: 'none',
            }}>
              {/* Pause / Play toggle */}
              <button
                onClick={() => { pausedRef.current = !pausedRef.current; setPaused(p => !p); }}
                title={paused ? t('home.resume') : t('home.pause')}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: paused ? 'oklch(78% 0.18 280)' : 'transparent',
                  border: '1px solid',
                  borderColor: paused ? 'oklch(78% 0.18 280)' : 'var(--fg-20)',
                  color: paused ? '#03050a' : 'var(--fg)',
                  cursor: 'pointer', flexShrink: 0,
                  transition: 'all 200ms ease',
                }}
              >
                {paused ? (
                  /* Play triangle */
                  <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
                    <polygon points="1,0 8,4.5 1,9"/>
                  </svg>
                ) : (
                  /* Pause bars */
                  <svg width="8" height="9" viewBox="0 0 8 9" fill="currentColor">
                    <rect x="0" y="0" width="3" height="9"/>
                    <rect x="5" y="0" width="3" height="9"/>
                  </svg>
                )}
              </button>

              <span style={{ opacity: paused ? 1 : 0.6 }}>
                {paused ? t('home.paused') : t('home.speed')}
              </span>
              <input
                type="range" min="0.1" max="4" step="0.1"
                value={speed}
                onChange={e => setSpeed(parseFloat(e.target.value))}
                disabled={paused}
                style={{ width: 80, accentColor: 'oklch(78% 0.18 280)', cursor: paused ? 'default' : 'pointer', opacity: paused ? 0.3 : 1 }}
              />
              <span style={{ opacity: paused ? 0.3 : 1 }}>{speed.toFixed(1)}×</span>
            </div>
          </div>
        </div>

        {/* AI translation disclaimer */}
        <div style={{
          position: 'absolute', bottom: 48, left: 0, right: 0,
          textAlign: 'center', pointerEvents: 'none', zIndex: 5,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
          color: 'var(--fg)', opacity: 0.25, letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          {t('home.ai_note')}
        </div>

        {/* Hover tooltip */}
        <HoverCard hover={hover} boxRect={boxRect} />

        {/* Soft vignette on page enter */}
        <div
          className="page-enter-soft"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
        />
      </section>

      {/* Bot modal — same as Portfolio (with LiveChat simulation) */}
      {selected && selected.group === 'bots' && (
        <BotProjectModal
          botId={selected.project.id}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Web project detail */}
      {selected && selected.group === 'web' && (
        <ProjectDetail
          project={selected.project}
          group="web"
          onClose={() => setSelected(null)}
          botImageMap={BOT_IMAGE_MAP}
        />
      )}
    </>
  );
}

export default HeroSection;

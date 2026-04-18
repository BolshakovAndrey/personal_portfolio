import React, { useEffect, useRef, useState } from 'react';
import { skills } from '../data';

// Map skill title → { size, hue }
const STYLE_MAP = {
  'JavaScript':    { s: 52, hue: 55  },
  'TypeScript':    { s: 50, hue: 250 },
  'Python':        { s: 58, hue: 200 },
  'React.js':      { s: 46, hue: 190 },
  'Next.js':       { s: 34, hue: 0   },
  'Node.js':       { s: 36, hue: 140 },
  'Express.js':    { s: 30, hue: 100 },
  'Fastify':       { s: 28, hue: 120 },
  'Django':        { s: 40, hue: 140 },
  'FastAPI':       { s: 42, hue: 160 },
  'HTML5':         { s: 30, hue: 25  },
  'CSS3':          { s: 28, hue: 220 },
  'Tailwind CSS':  { s: 28, hue: 210 },
  'MUI':           { s: 26, hue: 190 },
  'Bootstrap':     { s: 26, hue: 270 },
  'PostgreSQL':    { s: 38, hue: 230 },
  'MongoDB':       { s: 28, hue: 130 },
  'Redis':         { s: 32, hue: 20  },
  'SQLite':        { s: 26, hue: 45  },
  'Supabase':      { s: 28, hue: 150 },
  'Prisma':        { s: 26, hue: 240 },
  'Docker':        { s: 34, hue: 220 },
  'Nginx':         { s: 26, hue: 120 },
  'Linux':         { s: 30, hue: 60  },
  'AWS':           { s: 30, hue: 35  },
  'Git':           { s: 28, hue: 15  },
  'Vite':          { s: 26, hue: 290 },
  'Webpack':       { s: 26, hue: 200 },
  'Storybook':     { s: 26, hue: 340 },
  'Jest':          { s: 26, hue: 0   },
  'Sentry':        { s: 26, hue: 10  },
  'Framer Motion': { s: 28, hue: 280 },
  'Aiogram':       { s: 50, hue: 220 },
};

const SKILLS = skills.map(sk => ({
  n: sk.title,
  s: (STYLE_MAP[sk.title] || { s: 26 }).s,
  hue: (STYLE_MAP[sk.title] || { hue: 200 }).hue,
}));

export default function OrbitCloud() {
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const [tick, setTick] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [size, setSize] = useState({ w: 900, h: 520 });
  const containerRef = useRef(null);

  // Responsive size
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSize({ w, h: Math.max(400, Math.min(560, w * 0.55)) });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animation loop
  useEffect(() => {
    const step = () => {
      tRef.current += 0.012;
      setTick(t => t + 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const t = tRef.current;
  const cx = size.w / 2;
  const cy = size.h / 2;

  // Three orbit radii
  const rings = [1, 0.65, 0.4];

  const positions = SKILLS.map((sk, i) => {
    const ring = rings[i % 3];
    const count = SKILLS.filter((_, j) => j % 3 === i % 3).length;
    const idxInRing = Math.floor(i / 3);
    const baseAngle = (idxInRing / count) * Math.PI * 2;
    const speed = ring === 1 ? 0.06 : ring === 0.65 ? -0.09 : 0.13;
    const angle = baseAngle + t * speed;
    const rx = cx * ring * 0.95;
    const ry = cy * ring * 0.72;
    const px = cx + Math.cos(angle) * rx;
    const py = cy + Math.sin(angle) * ry;
    // Depth from y position for parallax feel
    const depth = 0.7 + 0.3 * Math.sin(angle);
    return { px, py, depth, angle };
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: size.h,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Subtle center glow */}
      <div style={{
        position: 'absolute',
        left: cx, top: cy,
        width: 400, height: 400,
        marginLeft: -200, marginTop: -200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(78% 0.18 280 / 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Sort by depth so closer ones render on top */}
      {[...SKILLS.map((sk, i) => ({ sk, i, ...positions[i] }))]
        .sort((a, b) => a.depth - b.depth)
        .map(({ sk, i, px, py, depth }) => {
          const isHov = hovered === i;
          const color = `oklch(${isHov ? '90%' : `${70 + depth * 10}%`} 0.15 ${sk.hue})`;
          const fontSize = (sk.s * (0.7 + depth * 0.45)) | 0;
          return (
            <div
              key={sk.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute',
                left: px,
                top: py,
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color,
                opacity: isHov ? 1 : 0.55 + depth * 0.4,
                whiteSpace: 'nowrap',
                textShadow: isHov
                  ? `0 0 30px oklch(78% 0.2 ${sk.hue} / 0.8)`
                  : `0 0 20px oklch(70% 0.15 ${sk.hue} / 0.3)`,
                cursor: 'default',
                transition: 'opacity 200ms, text-shadow 200ms, color 200ms',
                pointerEvents: 'auto',
                zIndex: (depth * 10) | 0,
              }}
            >
              {sk.n}
            </div>
          );
        })}
    </div>
  );
}

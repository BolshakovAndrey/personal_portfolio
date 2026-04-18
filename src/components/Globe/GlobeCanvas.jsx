import { useRef, useCallback, useEffect } from 'react';

// ── Helpers ──────────────────────────────────────────────────────────────────
function sphToVec(lat, lon) {
  const la = lat * Math.PI / 180;
  const lo = lon * Math.PI / 180;
  return {
    x: Math.cos(la) * Math.sin(lo),
    y: Math.sin(la),
    z: Math.cos(la) * Math.cos(lo),
  };
}

function rotateVec(v, rotation, tilt) {
  const cosR = Math.cos(rotation), sinR = Math.sin(rotation);
  const x1 = v.x * cosR + v.z * sinR;
  const z1 = -v.x * sinR + v.z * cosR;
  const y1 = v.y;
  const cosT = Math.cos(tilt), sinT = Math.sin(tilt);
  const y2 = y1 * cosT - z1 * sinT;
  const z2 = y1 * sinT + z1 * cosT;
  return { x: x1, y: -y2, z: z2 };
}

function arcPoints(a, b, steps = 48, lift = 0.35) {
  const A = sphToVec(a[0], a[1]);
  const B = sphToVec(b[0], b[1]);
  const dot = A.x*B.x + A.y*B.y + A.z*B.z;
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
  const sinO = Math.sin(omega);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * omega) / sinO;
    const s2 = Math.sin(t * omega) / sinO;
    const x = s1 * A.x + s2 * B.x;
    const y = s1 * A.y + s2 * B.y;
    const z = s1 * A.z + s2 * B.z;
    const h = 1 + Math.sin(t * Math.PI) * lift;
    pts.push({ x: x*h, y: y*h, z: z*h });
  }
  return pts;
}

// Ambient world cities (dim dots for context)
const AMBIENT = [
  [40.71, -74.01], [51.51, -0.13], [35.68, 139.69], [48.86, 2.35], [55.75, 37.61],
  [25.20, 55.27], [1.35, 103.82], [-33.87, 151.21], [37.77, -122.42], [-23.55, -46.63],
  [34.05, -118.24], [19.43, -99.13], [30.04, 31.23], [-1.29, 36.82], [28.61, 77.21],
  [59.33, 18.07], [41.90, 12.50], [39.90, 116.40], [37.57, 126.98], [13.75, 100.50],
  [-34.60, -58.38], [6.52, 3.38], [43.65, -79.38], [49.28, -123.12], [33.75, -84.39],
  [41.88, -87.63], [29.76, -95.37], [42.36, -71.06], [45.42, -75.70], [38.90, -77.04],
  [53.48, -2.24], [53.55, 9.99], [52.37, 4.89], [50.08, 14.44], [45.46, 9.19],
  [60.17, 24.94], [50.11, 8.68], [41.38, 2.17], [40.42, -3.70], [47.50, 19.04],
  [44.43, 26.10], [59.44, 24.75], [64.13, -21.95], [55.68, 12.57], [46.05, 14.51],
  [31.23, 121.47], [22.32, 114.17], [23.13, 113.26], [10.82, 106.63], [14.60, 120.98],
  [24.71, 46.67], [35.68, 51.39], [33.89, 35.50], [32.09, 34.78], [32.65, 51.68],
  [-26.20, 28.04], [36.81, 10.18], [30.07, -9.57], [9.01, 38.76], [15.50, 32.55],
  [-22.91, -43.17], [-12.05, -77.04], [4.71, -74.07], [10.48, -66.90], [-0.18, -78.47],
  [-41.29, 174.78], [-36.85, 174.76], [-37.81, 144.96], [-27.47, 153.03], [21.03, 105.85],
];

// ── GlobeCanvas ──────────────────────────────────────────────────────────────
function GlobeCanvas({ size, rotation, tilt, land, onNodeHover, onNodeClick, nodes, pulseT, theme, botNodes, webNodes }) {
  const canvasRef = useRef(null);

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const W = size, H = size;
    if (c.width !== W * dpr) { c.width = W * dpr; c.height = H * dpr; }
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2;
    const r = W / 2 - 20;
    const isLight = theme === 'light';

    // ── Sphere fill ──
    const grad = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, r*0.1, cx, cy, r*1.1);
    if (isLight) {
      grad.addColorStop(0,   '#fefcf5');
      grad.addColorStop(0.6, '#ece6d4');
      grad.addColorStop(1,   '#d9d2bf');
    } else {
      grad.addColorStop(0,   '#1a1f2a');
      grad.addColorStop(0.6, '#0e1219');
      grad.addColorStop(1,   '#06080c');
    }
    ctx.beginPath();
    ctx.fillStyle = grad;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // ── Grid ──
    ctx.strokeStyle = isLight ? 'rgba(90, 110, 140, 0.18)' : 'rgba(120, 180, 220, 0.08)';
    ctx.lineWidth = 0.8;
    for (let lon = -180; lon < 180; lon += 15) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 4) {
        const p = rotateVec(sphToVec(lat, lon), rotation, tilt);
        if (p.z < 0) { started = false; continue; }
        const sx = cx + p.x * r, sy = cy + p.y * r;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    for (let lat = -75; lat <= 75; lat += 15) {
      ctx.beginPath();
      let started = false;
      for (let lon2 = -180; lon2 <= 180; lon2 += 4) {
        const p = rotateVec(sphToVec(lat, lon2), rotation, tilt);
        if (p.z < 0) { started = false; continue; }
        const sx = cx + p.x * r, sy = cy + p.y * r;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // ── Continents ──
    if (land && land.length) {
      ctx.fillStyle   = isLight ? 'rgba(120, 140, 160, 0.30)' : 'rgba(80, 120, 160, 0.18)';
      ctx.strokeStyle = isLight ? 'rgba(70, 90, 120, 0.55)'   : 'rgba(140, 200, 240, 0.35)';
      ctx.lineWidth = 0.7;
      for (const poly of land) {
        ctx.beginPath();
        let started = false;
        for (const [lon, lat] of poly) {
          const p = rotateVec(sphToVec(lat, lon), rotation, tilt);
          if (p.z < 0.05) { started = false; continue; }
          const sx = cx + p.x * r, sy = cy + p.y * r;
          if (!started) { ctx.moveTo(sx, sy); started = true; }
          else ctx.lineTo(sx, sy);
        }
        ctx.fill();
        ctx.stroke();
      }
    }

    // ── Ambient dots ──
    for (const [lat, lon] of AMBIENT) {
      const p = rotateVec(sphToVec(lat, lon), rotation, tilt);
      if (p.z < 0) continue;
      const sx = cx + p.x * r, sy = cy + p.y * r;
      const front = p.z;
      ctx.beginPath();
      ctx.fillStyle = isLight
        ? `rgba(60, 90, 130, ${0.25 + front * 0.45})`
        : `rgba(180, 220, 240, ${0.15 + front * 0.35})`;
      ctx.arc(sx, sy, 0.9 + front * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Arcs ──
    const drawArcs = (groupNodes, colorRGB) => {
      for (let i = 0; i < groupNodes.length; i++) {
        const a = groupNodes[i];
        const b = groupNodes[(i + 1) % groupNodes.length];
        const pts = arcPoints([a.lat, a.lon], [b.lat, b.lon], 60, 0.28);
        ctx.beginPath();
        let started = false;
        let maxZ = -1;
        for (const pt of pts) {
          const p = rotateVec(pt, rotation, tilt);
          if (p.z > maxZ) maxZ = p.z;
          if (p.z < -0.2) { started = false; continue; }
          const sx = cx + p.x * r, sy = cy + p.y * r;
          if (!started) { ctx.moveTo(sx, sy); started = true; }
          else ctx.lineTo(sx, sy);
        }
        const visible = Math.max(0, Math.min(1, (maxZ + 0.2) / 1.2));
        ctx.strokeStyle = `rgba(${colorRGB}, ${0.25 + visible * 0.55})`;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = `rgba(${colorRGB}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        const pulsePos = (pulseT + i * 0.1) % 1;
        const pi = Math.floor(pulsePos * pts.length);
        const pp = rotateVec(pts[pi], rotation, tilt);
        if (pp.z > -0.1) {
          const psx = cx + pp.x * r, psy = cy + pp.y * r;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${colorRGB}, 0.9)`;
          ctx.shadowColor = `rgba(${colorRGB}, 1)`;
          ctx.shadowBlur = 12;
          ctx.arc(psx, psy, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };
    drawArcs(botNodes, '178, 132, 255');
    drawArcs(webNodes, '120, 220, 160');

    // ── Project nodes ──
    const nodeScreenPositions = [];
    const drawNodes = (groupNodes, colorRGB, groupName) => {
      for (const n of groupNodes) {
        const p = rotateVec(sphToVec(n.lat, n.lon), rotation, tilt);
        if (p.z < -0.1) { nodeScreenPositions.push(null); continue; }
        const sx = cx + p.x * r, sy = cy + p.y * r;
        const front = Math.max(0, p.z);

        const pulseR = 4 + ((pulseT * 2) % 1) * 14;
        const pulseA = Math.max(0, 0.6 - ((pulseT * 2) % 1) * 0.6);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${colorRGB}, ${pulseA * front})`;
        ctx.lineWidth = 1.2;
        ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(${colorRGB}, ${0.4 + front * 0.6})`;
        ctx.shadowColor = `rgba(${colorRGB}, 1)`;
        ctx.shadowBlur = 14;
        ctx.arc(sx, sy, 3.5 + front * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        nodeScreenPositions.push({ node: n, group: groupName, sx, sy, front });
      }
    };
    drawNodes(botNodes, '178, 132, 255', 'bots');
    drawNodes(webNodes, '120, 220, 160', 'web');

    // ── Atmosphere glow ──
    const glow = ctx.createRadialGradient(cx, cy, r * 0.95, cx, cy, r * 1.15);
    const glowRGB = isLight ? '90, 110, 140' : '120, 180, 220';
    glow.addColorStop(0, `rgba(${glowRGB}, ${isLight ? 0.18 : 0.25})`);
    glow.addColorStop(1, `rgba(${glowRGB}, 0)`);
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
    ctx.fill();

    nodes.current = nodeScreenPositions.filter(Boolean);
  }, [size, rotation, tilt, land, pulseT, theme, botNodes, webNodes, nodes]);

  useEffect(() => { draw(); }, [draw]);

  const handleMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best = null, bestD = 24;
    for (const n of nodes.current) {
      const d = Math.hypot(n.sx - mx, n.sy - my);
      if (d < bestD) { best = n; bestD = d; }
    }
    onNodeHover(best);
  };

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let best = null, bestD = 24;
    for (const n of nodes.current) {
      const d = Math.hypot(n.sx - mx, n.sy - my);
      if (d < bestD) { best = n; bestD = d; }
    }
    if (best) onNodeClick(best);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: 'block', cursor: 'pointer' }}
      onMouseMove={handleMove}
      onMouseLeave={() => onNodeHover(null)}
      onClick={handleClick}
    />
  );
}

export default GlobeCanvas;

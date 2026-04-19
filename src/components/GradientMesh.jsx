import React from 'react';

export default function GradientMesh() {
  return (
    <>
      <style>{`
        @keyframes blobA {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(6vw, 10vh) scale(1.12); }
          66%  { transform: translate(-4vw, 6vh) scale(0.92); }
          100% { transform: translate(3vw, -8vh) scale(1.05); }
        }
        @keyframes blobB {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(-8vw, -6vh) scale(1.08); }
          66%  { transform: translate(5vw, -10vh) scale(0.95); }
          100% { transform: translate(-3vw, 7vh) scale(1.1); }
        }
        @keyframes blobC {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(5vw, -8vh) scale(1.15); }
          100% { transform: translate(-6vw, 4vh) scale(0.88); }
        }
      `}</style>

      {/* Solid base */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -2,
        background: 'var(--bg-solid)',
        pointerEvents: 'none',
      }} />

      {/* Blob 1 — blue/purple, top-left */}
      <div style={{
        position: 'fixed',
        width: '65vw', height: '65vw',
        borderRadius: '50%',
        background: 'oklch(55% 0.28 280)',
        filter: 'blur(130px)',
        opacity: 'var(--blob-opacity, 0.22)',
        top: '-20%', left: '-15%',
        zIndex: -1,
        pointerEvents: 'none',
        animation: 'blobA 28s infinite alternate cubic-bezier(.45,0,.55,1)',
      }} />

      {/* Blob 2 — teal/green, bottom-right */}
      <div style={{
        position: 'fixed',
        width: '55vw', height: '55vw',
        borderRadius: '50%',
        background: 'oklch(58% 0.24 160)',
        filter: 'blur(110px)',
        opacity: 'var(--blob-opacity, 0.22)',
        bottom: '-20%', right: '-15%',
        zIndex: -1,
        pointerEvents: 'none',
        animation: 'blobB 35s infinite alternate cubic-bezier(.45,0,.55,1)',
      }} />

      {/* Blob 3 — amber/orange, center accent */}
      <div style={{
        position: 'fixed',
        width: '40vw', height: '40vw',
        borderRadius: '50%',
        background: 'oklch(62% 0.22 50)',
        filter: 'blur(140px)',
        opacity: 'calc(var(--blob-opacity, 0.22) * 0.6)',
        top: '40%', left: '30%',
        zIndex: -1,
        pointerEvents: 'none',
        animation: 'blobC 42s infinite alternate cubic-bezier(.45,0,.55,1)',
      }} />
    </>
  );
}

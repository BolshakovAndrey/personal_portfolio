import { useEffect } from 'react';
import { PhoneFrame, BrowserWindow, WebsiteMockup } from './Mockups';

function ProjectDetail({ project, group, onClose, botImageMap }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  const accent = group === 'bots' ? 'oklch(78% 0.18 280)' : 'oklch(78% 0.15 140)';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'var(--bg-modal)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 300ms ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-elev)',
          border: `1px solid ${accent}55`,
          borderRadius: 16,
          padding: 40,
          maxWidth: 780,
          width: '92%',
          display: 'flex', gap: 36,
          flexWrap: 'wrap',
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 80px ${accent}22`,
          animation: 'slideUp 400ms cubic-bezier(.2,.8,.2,1)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Visual preview */}
        <div style={{ flexShrink: 0 }}>
          {group === 'bots' ? (
            <PhoneFrame width={240} height={490} glow={accent} tint="#0c0d10">
              {botImageMap && botImageMap[project.id] ? (
                <img
                  src={botImageMap[project.id]}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                  color: 'rgba(245,242,234,0.4)', letterSpacing: '0.1em',
                }}>
                  preview
                </div>
              )}
            </PhoneFrame>
          ) : (
            <BrowserWindow
              width={400}
              height={280}
              url={project.url.replace(/^https?:\/\//, '')}
              accent={project.accent}
              glow={accent}
            >
              <WebsiteMockup kind={project.kind} accent={project.accent} t={0} />
            </BrowserWindow>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: accent, letterSpacing: '0.2em', textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            {group === 'bots' ? 'Telegram bot' : 'Web application'} · {project.city}
          </div>
          <div style={{
            fontFamily: '"Space Grotesk", sans-serif', fontSize: 42, fontWeight: 600,
            color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1,
            marginBottom: 10,
          }}>
            {project.title}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 16,
            color: 'var(--fg)', opacity: 0.6, marginBottom: 22,
          }}>
            {project.sub}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: 'var(--fg)', opacity: 0.7, marginBottom: 26, letterSpacing: '0.05em',
          }}>
            {project.stack}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '12px 24px', background: accent, color: 'var(--bg-deep)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 4,
                boxShadow: `0 0 30px ${accent}66`,
              }}
            >
              Open live →
            </a>
            <button
              onClick={onClose}
              style={{
                padding: '12px 24px', background: 'transparent', color: 'var(--fg)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: '1px solid var(--fg-20)', borderRadius: 4, cursor: 'pointer',
              }}
            >
              Close (esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;

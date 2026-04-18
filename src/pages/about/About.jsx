import React, { useState } from 'react';
import PageHero from '../../components/PageHero';
import SkillsCloud from '../../components/SkillsCloud';
import OrbitCloud from '../../components/OrbitCloud';
import { resume } from '../../data';


function SectionLabel({ color, text }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
      color, letterSpacing: '0.22em', textTransform: 'uppercase',
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 10px ${color}` }} />
      {text}
    </div>
  );
}

const sectionStyle = {
  position: 'relative', zIndex: 10,
  padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
  background: 'var(--bg)',
  borderTop: '1px solid var(--fg-04)',
};
const inner = { maxWidth: 1280, margin: '0 auto' };
const h2Style = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: 'clamp(40px, 6vw, 80px)',
  fontWeight: 500,
  color: 'var(--fg)',
  letterSpacing: '-0.04em',
  lineHeight: 0.95,
  margin: 0,
};

export default function About() {
  const [resumeTab, setResumeTab] = useState('experience');
  const [skillsView, setSkillsView] = useState('orbit');

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PageHero page="about" />

      {/* Bio + Skills tags */}
      <section style={sectionStyle}>
        <div style={inner}>
          <SectionLabel color="oklch(78% 0.18 280)" text="// about · 01" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
            marginTop: 32,
          }}>
            <div>
              <h2 style={h2Style}>
                Full-stack<br />
                <span style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, oklch(78% 0.18 280), oklch(78% 0.15 140))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  with a bias<br />for shipping.
                </span>
              </h2>
            </div>

            <div style={{ maxWidth: 560 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'var(--fg)', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>
                I build and ship production software — Telegram bots, web platforms, and AI integrations.
                Based in Europe, working remotely with teams across Russia, Germany, and the Balkans.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'var(--fg)', opacity: 0.7, lineHeight: 1.65, margin: '20px 0 0' }}>
                Four years of writing code that real people use daily — a festival platform serving hundreds of visitors,
                bots handling thousands of orders, AI tools that actually save time instead of just demoing well.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Skills Cloud */}
      <section style={sectionStyle}>
        <div style={inner}>
          <SectionLabel color="oklch(78% 0.15 140)" text="// skills · 02" />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 32, marginBottom: 48 }}>
            <h2 style={h2Style}>Tech stack.</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {['orbit', 'cloud'].map(v => (
                <button key={v} onClick={() => setSkillsView(v)} style={{
                  padding: '8px 16px',
                  background: skillsView === v ? 'var(--fg)' : 'transparent',
                  color: skillsView === v ? 'var(--bg-deep)' : 'var(--fg)',
                  border: '1px solid', borderColor: skillsView === v ? 'var(--fg)' : 'var(--fg-20)',
                  borderRadius: 4,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 200ms',
                }}>{v === 'orbit' ? '◎ orbit' : '⊹ cloud'}</button>
              ))}
            </div>
          </div>
          {skillsView === 'orbit' ? <OrbitCloud /> : <SkillsCloud />}
        </div>
      </section>

      {/* Resume */}
      <section style={{ ...sectionStyle, paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
        <div style={inner}>
          <SectionLabel color="oklch(82% 0.17 50)" text="// resume · 03" />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginTop: 32, marginBottom: 48 }}>
            <h2 style={h2Style}>Experience &<br />Education.</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {['experience', 'education'].map(tab => (
                <button key={tab} onClick={() => setResumeTab(tab)} style={{
                  padding: '10px 18px',
                  background: resumeTab === tab ? 'var(--fg)' : 'transparent',
                  color: resumeTab === tab ? 'var(--bg-deep)' : 'var(--fg)',
                  border: '1px solid', borderColor: resumeTab === tab ? 'var(--fg)' : 'var(--fg-20)',
                  borderRadius: 4,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 200ms',
                }}>{tab}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {resume.filter(r => r.category === resumeTab).map(r => (
              <div key={r.id} style={{
                background: 'var(--fg-02)', border: '1px solid var(--fg-08)',
                borderRadius: 10, padding: '24px 28px',
                transition: 'border-color 200ms',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'oklch(82% 0.17 50)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {r.year}
                </div>
                <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 20, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em', marginBottom: 6 }}
                  dangerouslySetInnerHTML={{ __html: r.title }} />
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--fg)', opacity: 0.6, lineHeight: 1.5 }}>
                  {r.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

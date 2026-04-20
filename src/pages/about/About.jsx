import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useSpring, useMotionTemplate } from 'framer-motion';
import PageHero from '../../components/PageHero';
import SkillsCloud from '../../components/SkillsCloud';
import OrbitCloud from '../../components/OrbitCloud';
import MagneticButton from '../../components/MagneticButton/MagneticButton';
import { resume } from '../../data';

function ResumeCard({ r, itemTitle, itemDesc }) {
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, x: -80, filter: 'blur(15px)', skewX: -10 },
        show:   { opacity: 1, x: 0, filter: 'blur(0px)', skewX: 0, transition: { type: 'spring', damping: 20, stiffness: 120 } },
        exit:   { opacity: 0, x: 40, filter: 'blur(10px)', transition: { duration: 0.2 } }
      }}
      exit="exit"
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '32px 36px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      }}
    >
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
          background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, oklch(82% 0.17 50 / 0.12), transparent 80%)`,
          zIndex: 0
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: '50%', background: 'oklch(82% 0.17 50 / 0.15)', border: '1px solid oklch(82% 0.17 50 / 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'oklch(82% 0.17 50)', boxShadow: '0 0 20px oklch(82% 0.17 50 / 0.2)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'oklch(82% 0.17 50)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            {r.year}
          </div>
          <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 600, color: '#f5f2ea', letterSpacing: '-0.01em', marginBottom: 6 }}
            dangerouslySetInnerHTML={{ __html: itemTitle }} />
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#f5f2ea', opacity: 0.6, lineHeight: 1.6 }}>
            {itemDesc}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


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
  const { t } = useTranslation();
  const [resumeTab, setResumeTab] = useState('experience');
  const [skillsView, setSkillsView] = useState('orbit');

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PageHero page="about" />

      {/* Bio + Skills tags */}
      <section style={sectionStyle}>
        <div style={inner}>
          <SectionLabel color="oklch(78% 0.18 280)" text={t('about.section_label')} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
            marginTop: 32,
          }}>
            <div>
              <h2 style={h2Style}>
                {t('about.h2_1')}<br />
                <span style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, oklch(78% 0.18 280), oklch(78% 0.15 140))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  whiteSpace: 'pre-line',
                }}>
                  {t('about.h2_2')}
                </span>
              </h2>
            </div>

            <div style={{ maxWidth: 560 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'var(--fg)', opacity: 0.7, lineHeight: 1.65, margin: 0 }}>
                {t('about.bio1')}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'var(--fg)', opacity: 0.7, lineHeight: 1.65, margin: '20px 0 0' }}>
                {t('about.bio2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Cloud */}
      <section style={sectionStyle}>
        <div style={inner}>
          <SectionLabel color="oklch(78% 0.15 140)" text={t('about.skills_label')} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 32, marginBottom: 48 }}>
            <h2 style={h2Style}>{t('about.skills_title')}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {['orbit', 'cloud'].map(v => (
                <MagneticButton key={v} onClick={() => setSkillsView(v)}>
                  <button style={{
                    padding: '8px 16px',
                    background: skillsView === v ? 'var(--fg)' : 'transparent',
                    color: skillsView === v ? 'var(--bg-deep)' : 'var(--fg)',
                    border: '1px solid', borderColor: skillsView === v ? 'var(--fg)' : 'var(--fg-20)',
                    borderRadius: 4,
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 200ms',
                  }}>{v === 'orbit' ? t('about.orbit') : t('about.cloud')}</button>
                </MagneticButton>
              ))}
            </div>
          </div>
          {skillsView === 'orbit' ? <OrbitCloud /> : <SkillsCloud />}
        </div>
      </section>

      {/* Resume */}
      <section style={{ ...sectionStyle, paddingBottom: 'clamp(80px, 12vh, 160px)' }}>
        <div style={inner}>
          <SectionLabel color="oklch(82% 0.17 50)" text={t('about.resume_label')} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginTop: 32, marginBottom: 48 }}>
            <h2 style={{ ...h2Style, whiteSpace: 'pre-line' }}>{t('about.resume_title')}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {['experience', 'education'].map(tab => (
                <MagneticButton key={tab} onClick={() => setResumeTab(tab)}>
                  <button style={{
                    padding: '10px 18px',
                    background: resumeTab === tab ? 'var(--fg)' : 'transparent',
                    color: resumeTab === tab ? 'var(--bg-deep)' : 'var(--fg)',
                    border: '1px solid', borderColor: resumeTab === tab ? 'var(--fg)' : 'var(--fg-20)',
                    borderRadius: 4,
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 200ms',
                  }}>{tab === 'experience' ? t('about.experience') : t('about.education')}</button>
                </MagneticButton>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={resumeTab}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1, margin: "50px" }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {resume.filter(r => r.category === resumeTab).map(r => {
                const itemTitle = t(`resume_items.${r.id}.title`, { defaultValue: r.title });
                const itemDesc  = t(`resume_items.${r.id}.desc`,  { defaultValue: r.desc });
                return <ResumeCard key={r.id} r={r} itemTitle={itemTitle} itemDesc={itemDesc} />;
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

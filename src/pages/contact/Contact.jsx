import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../../components/PageHero';
import axios from 'axios';

const CONTACT_LINKS = [
  { label: 'Telegram', value: '@Bolshakov_Andrey', href: 'https://t.me/Bolshakov_Andrey',                    hue: 200 },
  { label: 'Email',    value: 'abolshakovy@gmail.com', href: 'mailto:abolshakovy@gmail.com',                  hue: 140 },
  { label: 'GitHub',   value: 'github.com/BolshakovAndrey', href: 'https://github.com/BolshakovAndrey',       hue: 280 },
  { label: 'LinkedIn', value: 'linkedin.com/in/bolshakovandrei', href: 'https://www.linkedin.com/in/bolshakovandrei/', hue: 50 },
];

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

function ContactCard({ link }) {
  const [hover, setHover] = useState(false);
  const color = `oklch(75% 0.15 ${link.hue})`;
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        background: 'var(--fg-02)',
        border: `1px solid ${hover ? color + '66' : 'var(--fg-08)'}`,
        borderRadius: 8, padding: 24,
        textDecoration: 'none',
        transition: 'all 200ms',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10,
      }}>{link.label}</div>
      <div style={{
        fontFamily: '"Space Grotesk", sans-serif', fontSize: 20, fontWeight: 500,
        color: 'var(--fg)', letterSpacing: '-0.01em',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.value}</span>
        <span style={{
          fontSize: 14, opacity: 0.5,
          transform: hover ? 'translate(4px, -4px)' : 'translate(0, 0)',
          transition: 'transform 200ms',
        }}>↗</span>
      </div>
    </a>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--fg-04)',
  border: '1px solid var(--fg-10)',
  borderRadius: 6,
  fontFamily: 'Inter, sans-serif', fontSize: 15,
  color: 'var(--fg)',
  outline: 'none',
  transition: 'border-color 200ms',
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://sheet.best/api/sheets/49b0e9e0-12d5-4879-a9b7-a82907ebb26a', {
      Name: form.name, Email: form.email, Subject: form.subject, Message: form.message,
    }).then(() => {
      setForm({ name: '', email: '', subject: '', message: '' });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    });
  };

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PageHero page="contact" />

      <section style={{
        position: 'relative', zIndex: 10,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px)',
        background: 'var(--bg)',
        borderTop: '1px solid var(--fg-04)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionLabel color="oklch(70% 0.15 250)" text={t('contact.section_label')} />

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 500, color: 'var(--fg)',
            letterSpacing: '-0.04em', lineHeight: 0.95, margin: '32px 0 0',
          }}>
            {t('contact.h2_1')}<br />
            <span style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, oklch(70% 0.15 250), oklch(82% 0.17 50))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>{t('contact.h2_2')}</span>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.2vw, 17px)',
            color: 'var(--fg)', opacity: 0.7, lineHeight: 1.65,
            marginTop: 24, maxWidth: 560,
          }}>
            {t('contact.sub')}
          </p>

          {/* Contact cards */}
          <div style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}>
            {CONTACT_LINKS.map(l => <ContactCard key={l.label} link={l} />)}
          </div>

          {/* Form */}
          <div style={{ marginTop: 80 }}>
            <SectionLabel color="oklch(82% 0.17 50)" text={t('contact.form_label')} />
            <form onSubmit={handleSubmit} style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input
                  type="text" placeholder={t('contact.name')} required
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={inputStyle}
                />
                <input
                  type="email" placeholder={t('contact.email')} required
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={inputStyle}
                />
              </div>
              <input
                type="text" placeholder={t('contact.subject')} required
                value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={inputStyle}
              />
              <textarea
                placeholder={t('contact.message')} required rows={6}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button type="submit" style={{
                alignSelf: 'flex-start',
                padding: '14px 32px',
                background: 'var(--accent-web)',
                color: 'var(--bg-deep)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', borderRadius: 4, cursor: 'pointer',
                boxShadow: '0 0 30px oklch(78% 0.15 140 / 0.4)',
                transition: 'opacity 200ms',
              }}>
                {sent ? t('contact.sent') : t('contact.send')}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 80, paddingTop: 32,
            borderTop: '1px solid var(--fg-08)',
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
            color: 'var(--fg)', opacity: 0.4, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            <div>{t('contact.footer')}</div>
            <div>{t('contact.built')}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../../components/PageHero';
import axios from 'axios';
import { PhoneFrame } from '../../components/Globe/Mockups';
import ImgAvatar from '../../assets/home.jpg';

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start'
          }}>
            {/* Left Column: Links & Large Photo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}>
                {CONTACT_LINKS.map(l => <ContactCard key={l.label} link={l} />)}
              </div>
              <div style={{
                width: '100%', maxWidth: 480, overflow: 'hidden', borderRadius: 16,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                border: '1px solid var(--fg-08)'
              }}>
                <img src={ImgAvatar} alt="Andrey Bolshakov" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Right Column: Telegram Chat Form */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InteractiveChatForm t={t} />
            </div>
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

// ── Interactive Chat Form (Telegram Style) ──────────────────────────────────
function InteractiveChatForm({ t }) {
  const [messages, setMessages] = useState([
    { id: 1, textKey: 'contact.chat.greeting', defaultText: "Hi there! 👋 Glad to see you here.", sender: 'bot', timeKey: 'contact.chat.now', defaultTime: 'Now' },
    { id: 2, textKey: 'contact.chat.ask_name', defaultText: "What's your name?", sender: 'bot', timeKey: 'contact.chat.now', defaultTime: 'Now' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('NAME'); 
  const [isTyping, setIsTyping] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const addBotMessage = (msgObj) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), ...msgObj, sender: 'bot' }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || step === 'DONE' || isTyping) return;
    
    const newVal = input.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now(), text: newVal, sender: 'user', timeText: timeNow }]);
    setInput('');

    if (step === 'NAME') {
      setForm(f => ({ ...f, name: newVal }));
      addBotMessage({ 
        textKey: 'contact.chat.ask_email', 
        nameVar: newVal, 
        defaultText: `Nice to meet you, {{name}}! What's your email?`,
        timeText: timeNow 
      });
      setStep('EMAIL');
    } else if (step === 'EMAIL') {
      setForm(f => ({ ...f, email: newVal }));
      addBotMessage({ 
        textKey: 'contact.chat.ask_message', 
        defaultText: "Got it. What message would you like to send?",
        timeText: timeNow 
      });
      setStep('MESSAGE');
    } else if (step === 'MESSAGE') {
      setForm(f => ({ ...f, message: newVal }));
      setIsTyping(true);
      setTimeout(() => {
         axios.post('https://sheet.best/api/sheets/49b0e9e0-12d5-4879-a9b7-a82907ebb26a', {
             Name: form.name, Email: form.email, Subject: 'Chat Form', Message: newVal
         })
         .then(() => {
            setMessages(prev => [...prev, { id: Date.now(), textKey: 'contact.chat.sent', defaultText: "Message sent! I'll get back to you ASAP. 🚀", sender: 'bot', timeText: timeNow }]);
         })
         .catch((err) => {
            setMessages(prev => [...prev, { id: Date.now(), textKey: 'contact.chat.error', defaultText: "Oops, my server seems to be hitting its limits right now!", sender: 'bot', timeText: timeNow }]);
         })
         .finally(() => {
            setIsTyping(false);
            setStep('DONE');
         });
      }, 1000);
    }
  };

  return (
    <PhoneFrame width={340} height={640} glow="oklch(70% 0.15 250)">
      <div style={{ width: '100%', height: '100%', background: '#0e1621', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* iOS Header to clear Notch */}
        <div style={{ 
          paddingTop: 44, paddingBottom: 10, background: '#17212b', 
          display: 'flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12,
          borderBottom: '1px solid rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          <div style={{ color: '#5288c1', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
             <span style={{ fontSize: 16 }}>{t('contact.chat.back', { defaultValue: 'Back' })}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -40 }}>
             <div style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>Andrey Bolshakov</div>
             <div style={{ color: '#5288c1', fontSize: 13 }}>{t('contact.chat.online', { defaultValue: 'online' })}</div>
          </div>
          <img src={ImgAvatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, position: 'absolute', right: 12 }} />
        </div>

        {/* Chat Area */}
        <div style={{ 
          flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8, 
          background: 'url("https://www.transparenttextures.com/patterns/cubes.png") #0e1621',
          overflowY: 'auto'
        }}>
          <div style={{ alignSelf: 'center', background: '#182533', padding: '4px 12px', borderRadius: 12, color: '#7f91a4', fontSize: 13, marginBottom: 8 }}>{t('contact.chat.today', { defaultValue: 'Today' })}</div>
          
          {messages.map(m => (
            <div key={m.id} style={{ 
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', 
              background: m.sender === 'user' ? '#2b5278' : '#182533', 
              padding: '8px 12px', 
              borderRadius: m.sender === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', 
              maxWidth: '85%', color: '#fff', fontSize: 15,
              wordBreak: 'break-word',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
               {m.textKey ? t(m.textKey, { defaultValue: m.defaultText, name: m.nameVar }) : m.text}
               <div style={{ fontSize: 11, color: m.sender === 'user' ? '#749dbe' : '#7f91a4', textAlign: 'right', marginTop: 4 }}>
                 {m.timeKey ? t(m.timeKey, { defaultValue: m.defaultTime }) : m.timeText}
               </div>
            </div>
          ))}

          {isTyping && (
             <div style={{ alignSelf: 'flex-start', background: '#182533', padding: '8px 16px', borderRadius: '12px 12px 12px 4px', color: '#fff', display: 'flex', gap: 4 }}>
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
             </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} style={{ height: 50, background: '#17212b', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7f91a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          <input 
             type="text" 
             value={input}
             onChange={e => setInput(e.target.value)}
             disabled={step === 'DONE'}
             placeholder={step === 'DONE' ? t('contact.chat.ended', { defaultValue: "Chat ended" }) : t('contact.chat.placeholder', { defaultValue: "Message..." })}
             style={{ 
               flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: 16, outline: 'none',
               fontFamily: 'inherit'
             }}
          />
          <button type="submit" disabled={!input.trim()} style={{ background: 'transparent', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill={input.trim() ? "#5288c1" : "none"} stroke={input.trim() ? "#5288c1" : "#7f91a4"} strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </PhoneFrame>
  );
}


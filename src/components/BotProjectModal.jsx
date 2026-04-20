import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LiveChat } from './BotLiveChat';
import MiniAppDemo from './MiniAppDemo';

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, glow, width = 300, height = 620 }) {
  return (
    <div style={{
      width, height,
      background: '#0b0c0e',
      borderRadius: 46,
      padding: 8,
      boxShadow: glow
        ? `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 60px ${glow}44, 0 0 120px ${glow}22`
        : '0 30px 80px rgba(0,0,0,0.6)',
      position: 'relative', flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: '#0c0d10',
        borderRadius: 38,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 10, left: '50%',
          transform: 'translateX(-50%)',
          width: 90, height: 22,
          background: '#000', borderRadius: 14, zIndex: 10,
        }} />
        {children}
      </div>
    </div>
  );
}

// ── Bot metadata ──────────────────────────────────────────────────────────────
const BOT_META = {
  gc: {
    kicker: 'E-COMMERCE · TELEGRAM BOT',
    big: ['Весь путь', 'покупки внутри', 'Telegram.'],
    sub: 'Полноценный магазин БАДов: каталог по категориям, умная корзина, регистрация номера телефона и доставка через СДЭК — без перехода на сайт.',
    stack: ['Python 3.10', 'Aiogram 2.19', 'PostgreSQL 15', 'CDEK API'],
    url: 'http://t.me/online_gc_bot',
    accent: 'oklch(78% 0.18 280)',
  },
  ht: {
    kicker: 'AI HEALTH TRACKER · PRO / TRIAL',
    big: ['ИИ считает КБЖУ', 'по фото за', '2 секунды.'],
    sub: 'Мультипровайдерный AI (OpenAI → Anthropic → Gemini, auto-fallback). Трекинг еды, воды, шагов, тренировок, сна и настроения. Встроенный марафон со штрафной системой. Pro/Trial-подписка. Mini App. 782 теста.',
    stack: ['Python', 'Aiogram 3', 'FastAPI', 'PostgreSQL', 'Redis', 'APScheduler', 'Telegram Mini App', 'Railway'],
    url: 'https://t.me/NutrForProBot',
    accent: 'oklch(78% 0.15 160)',
  },
  dl: {
    kicker: 'FOOD DELIVERY · TELEGRAM BOT',
    big: ['Бизнес-ланчи', 'без звонков', 'и очередей.'],
    sub: 'Меню из Google Sheets обновляется каждые 5 минут. Корзина, зоны доставки, оплата при получении. Уведомления о новых заказах в Telegram-группу кухни. Hybrid-кэш (SQLite + Memory), Sentry, Docker.',
    stack: ['Python 3.10', 'Aiogram 3.13', 'SQLite', 'Redis', 'Google Sheets API', 'Sentry', 'Docker'],
    url: 'http://t.me/DeliveryBot_mvp_bot',
    accent: 'oklch(78% 0.15 50)',
  },
  mr: {
    kicker: 'GAMIFIED FITNESS · MARATHON BOT + MINI APP',
    big: ['Фитнес-челлендж', 'под контролем AI.', 'Реальное похудение.'],
    sub: '▎ AI-верификация скриншотов шагомера · Авторасчёт КБЖУ · Лидерборд в Telegram Mini App · Ежедневный рейтинг участников.',
    stack: ['Python 3.13', 'Aiogram 3', 'PostgreSQL', 'Redis', 'APScheduler', 'AI Vision', 'Telegram Mini App', 'Railway'],
    url: 'https://t.me/slim_together_bot',
    accent: 'oklch(78% 0.16 210)',
    miniApp: true,
  },
};

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function BotProjectModal({ botId, onClose }) {
  const { t } = useTranslation();
  const meta = BOT_META[botId];
  const { accent } = meta || {};

  const tKey = `bot_modal.${botId}.sub`;
  const hasTrans = t(tKey) !== tKey;
  const bigLines = hasTrans
    ? [t(`bot_modal.${botId}.big_0`), t(`bot_modal.${botId}.big_1`), t(`bot_modal.${botId}.big_2`)]
    : meta?.big;
  const subText = hasTrans ? t(tKey) : meta?.sub;

  useEffect(() => {
    if (!meta) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, meta]);

  if (!meta) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(3,5,8,0.96)',
      backdropFilter: 'blur(24px)',
      animation: 'fadeIn 250ms ease',
      overflowY: 'auto',
    }}>
      <style>{`
        .bot-modal-inner {
          min-height: 100%;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          overflow: hidden;
        }
        .bot-modal-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(40px, 6vw, 100px);
          border-right: 1px solid rgba(245,242,234,0.06);
          min-width: 0;
        }
        .bot-modal-right {
          width: clamp(300px, 36vw, 480px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 40px 40px 40px 24px;
          flex-shrink: 0;
        }
        .bot-modal-right.has-miniapp {
          width: clamp(480px, 52vw, 660px);
        }
        @media (max-width: 900px) {
          .bot-modal-right.has-miniapp {
            width: 100%;
            padding: 32px 24px 48px;
          }
        }
        @media (max-width: 700px) {
          .bot-modal-inner {
            flex-direction: column;
            align-items: center;
          }
          .bot-modal-left {
            border-right: none;
            border-bottom: 1px solid rgba(245,242,234,0.06);
            padding: 56px 24px 32px;
            width: 100%;
          }
          .bot-modal-right {
            width: 100%;
            padding: 32px 24px 48px;
            justify-content: center;
          }
        }
      `}</style>

      <div onClick={e => e.stopPropagation()} className="bot-modal-inner">

        {/* LEFT — text */}
        <div className="bot-modal-left">
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: accent, letterSpacing: '0.25em', textTransform: 'uppercase',
            marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 28, height: 1, background: accent }} />
            {meta.kicker}
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: 'clamp(44px, 5.5vw, 88px)',
            fontWeight: 500, color: '#f5f2ea',
            letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0,
          }}>
            {bigLines[0]}<br />
            {bigLines[1]}<br />
            <span style={{ fontStyle: 'italic', color: accent }}>{bigLines[2]}</span>
          </h2>

          <p style={{
            marginTop: 28,
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            color: '#f5f2ea', opacity: 0.6, lineHeight: 1.65,
            maxWidth: 420,
          }}>{subText}</p>

          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {meta.stack.map(s => (
              <div key={s} style={{
                padding: '6px 12px',
                border: '1px solid rgba(245,242,234,0.12)',
                borderRadius: 4,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                color: '#f5f2ea', opacity: 0.7, letterSpacing: '0.05em',
              }}>{s}</div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={meta.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px',
              background: accent, color: '#03050a',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 4,
              boxShadow: `0 0 40px ${accent}55`,
            }}>{t('modal.open_telegram')}</a>
            <button onClick={onClose} style={{
              padding: '14px 24px',
              background: 'transparent', color: '#f5f2ea',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1px solid rgba(245,242,234,0.15)',
              borderRadius: 4, cursor: 'pointer',
            }}>{t('modal.close')}</button>
          </div>
        </div>

        {/* RIGHT — phone(s) */}
        <div className={`bot-modal-right${meta.miniApp ? ' has-miniapp' : ''}`}>
          {/* Bot chat phone */}
          <PhoneFrame glow={accent} width={meta.miniApp ? 240 : 300} height={meta.miniApp ? 500 : 620}>
            <LiveChat botId={botId} compact={!!meta.miniApp} />
          </PhoneFrame>

          {/* MiniApp phone — shown only when miniApp: true */}
          {meta.miniApp && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <PhoneFrame glow={accent} width={240} height={500}>
                <MiniAppDemo botId={botId} />
              </PhoneFrame>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                color: accent, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7,
              }}>Mini App</div>
            </div>
          )}
        </div>
      </div>

      {/* Close X */}
      <button onClick={onClose} style={{
        position: 'fixed', top: 20, right: 20,
        width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(245,242,234,0.06)',
        border: '1px solid rgba(245,242,234,0.12)',
        color: '#f5f2ea', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, lineHeight: 1,
      }}>×</button>
    </div>
  );
}

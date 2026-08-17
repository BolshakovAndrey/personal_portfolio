import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneFrame, BrowserWindow } from './Mockups';

import ImgLub    from '../../assets/project-5.jpeg';
import ImgPlace  from '../../assets/project-2.jpeg';
import ImgMovies from '../../assets/project-4.jpeg';
import ImgTravel from '../../assets/project-3.jpeg';
import ImgShop   from '../../assets/project-6.jpeg';
import ImgEditor from '../../assets/Project-8.png';
import ImgNutriFor from '../../assets/nutrifor.png';

const WEB_IMAGE_MAP = { lub: ImgLub, place: ImgPlace, movies: ImgMovies, travel: ImgTravel, shop: ImgShop, editor: ImgEditor, nutrifor: ImgNutriFor };

const WEB_META = {
  nutrifor: {
    kicker: 'HEALTH APP · TELEGRAM MINI APP',
    big: ['NutriFor', 'держать', 'ритм'],
    sub: 'Веб-приложение и Telegram Mini App для питания и привычек: еда, вода, движение и самочувствие — в одной картине дня.',
  },
  lub: {
    kicker: 'PLATFORM · REACT & DJANGO',
    big: ['Платформа', 'Любимовки', ''],
    sub: 'Многостраничный портал независимого фестиваля: афиша, библиотека пьес, онлайн-регистрация, интеграция с медиа и сложного расписания.',
  },
  place: {
    kicker: 'SOCIAL NETWORK · SPA',
    big: ['Mesto:', 'социальная', 'сеть'],
    sub: 'Полноценный SPA проект. Регистрация, авторизация, добавление фотографий, лайки, удаление контента и смена аватара.',
  },
  movies: {
    kicker: 'WEB APP · FILM LIBRARY',
    big: ['Сервис', 'поиска', 'фильмов'],
    sub: 'Два веб-сервера (фронтенд и бэкенд), база данных. Регистрация, поиск фильмов через сторонний API, сохранение в закладки.',
  },
  travel: {
    kicker: 'LANDING PAGE · ADAPTIVE',
    big: ['Russian', 'Travel', ''],
    sub: 'Адаптивный лэндинг с рассказом о путешествиях. Использование Flexbox, Grid Layout, медиазапросов для всех экранов.',
  },
  shop: {
    kicker: 'E-COMMERCE · BOOTSTRAP',
    big: ['Магазин', 'Toy4Joy', ''],
    sub: 'Классический e-commerce проект: каталог товаров, карточки, корзина. Оптимизированный адаптивный дизайн.',
  },
  editor: {
    kicker: 'VISUAL COMPOSER',
    big: ['Визуальный', 'редактор', ''],
    sub: 'No-code визуальный редактор для проектирования сценариев. Построение графов, связи (линии), управление координатами.',
  }
};

function ProjectDetail({ project, group, onClose, botImageMap }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, project]);

  if (!project) return null;

  const accent = (group === 'bots' || project.group === 'bots') ? 'oklch(78% 0.18 280)' : (project.accent || 'oklch(70% 0.15 250)');
  const meta = group === 'web' || project.group === 'web' ? WEB_META[project.id] : null;

  const kicker = meta?.kicker || (group === 'bots' ? 'TELEGRAM BOT' : 'WEB APPLICATION');
  const subText = meta?.sub || project.sub;
  const bigLines = meta?.big || [project.title, '', ''];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(3,5,8,0.96)',
      backdropFilter: 'blur(24px)',
      animation: 'fadeIn 250ms ease',
      overflowY: 'auto',
    }}>
      <style>{`
        .bot-modal-inner { min-height: 100%; display: flex; flex-direction: row; align-items: stretch; overflow: hidden; }
        .bot-modal-left { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: clamp(40px, 6vw, 100px); border-right: 1px solid rgba(245,242,234,0.06); min-width: 0; }
        .bot-modal-right { width: clamp(400px, 45vw, 680px); display: flex; align-items: center; justify-content: center; gap: 16px; padding: 40px 40px 40px 24px; flex-shrink: 0; }
        @media (max-width: 900px) {
          .bot-modal-inner { flex-direction: column; align-items: center; }
          .bot-modal-left { border-right: none; border-bottom: 1px solid rgba(245,242,234,0.06); padding: 56px 24px 32px; width: 100%; }
          .bot-modal-right { width: 100%; padding: 32px 24px 48px; justify-content: center; }
        }
      `}</style>

      <div onClick={e => e.stopPropagation()} className="bot-modal-inner">
        {/* LEFT — text */}
        <div className="bot-modal-left">
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: accent, letterSpacing: '0.25em', textTransform: 'uppercase',
            marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 28, height: 1, background: accent }} />
            {kicker} · {project.city}
          </div>

          <h2 style={{
            fontFamily: '"Space Grotesk", sans-serif', fontSize: 'clamp(44px, 5.5vw, 88px)',
            fontWeight: 500, color: '#f5f2ea', letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0,
          }}>
            {bigLines[0]}<br />
            {bigLines[1]}<br />
            <span style={{ fontStyle: 'italic', color: accent }}>{bigLines[2] || project.title}</span>
          </h2>

          <p style={{
            marginTop: 28, fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.1vw, 16px)',
            color: '#f5f2ea', opacity: 0.6, lineHeight: 1.65, maxWidth: 420,
          }}>{subText}</p>

          <div style={{ marginTop: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.stack?.split('·').map(s => (
              <div key={s} style={{
                padding: '6px 12px', border: '1px solid rgba(245,242,234,0.12)', borderRadius: 4,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#f5f2ea', opacity: 0.7, letterSpacing: '0.05em',
              }}>{s.trim()}</div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px',
              background: accent, color: '#03050a', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 4,
              boxShadow: `0 0 40px ${accent}55`,
            }}>
              {group === 'bots' || project.group === 'bots' ? t('modal.open_telegram', { defaultValue: 'Open in Telegram' }) : 'Open Live'}
            </a>
            <button onClick={onClose} style={{
              padding: '14px 24px', background: 'transparent', color: '#f5f2ea',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(245,242,234,0.15)',
              borderRadius: 4, cursor: 'pointer',
            }}>{t('modal.close', { defaultValue: 'Close' })}</button>
          </div>
        </div>

        {/* RIGHT — mockups */}
        <div className="bot-modal-right">
          {group === 'bots' || project.group === 'bots' ? (
            <PhoneFrame width={300} height={620} glow={accent} tint="#0c0d10">
              {botImageMap && botImageMap[project.id] ? (
                <img src={botImageMap[project.id]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                  Preview
                </div>
              )}
            </PhoneFrame>
          ) : (
            <BrowserWindow
              width={640} height={400}
              url={project.url.replace(/^https?:\/\//, '')}
              accent={accent} glow={accent}
            >
              {WEB_IMAGE_MAP[project.id] ? (
                 <img src={WEB_IMAGE_MAP[project.id]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
              ) : (
                 <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                   Preview
                 </div>
              )}
            </BrowserWindow>
          )}
        </div>
      </div>

      {/* Close X */}
      <button onClick={onClose} style={{
        position: 'fixed', top: 20, right: 20, width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(245,242,234,0.06)', border: '1px solid rgba(245,242,234,0.12)',
        color: '#f5f2ea', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, lineHeight: 1,
      }}>×</button>
    </div>
  );
}

export default ProjectDetail;

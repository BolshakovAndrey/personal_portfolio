import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './portfolio.css';
import { LiveChat } from '../../components/BotLiveChat';
import PageHero from '../../components/PageHero';
import ProjectDetail from '../../components/Globe/ProjectDetail';
import BotProjectModal from '../../components/BotProjectModal';
import BotConstellation from '../../components/BotConstellation';

import GC2 from '../../assets/bots/goodchemistry-02-catalog.png';
import HT4 from '../../assets/bots/healthtracker-04-report.png';
import DL2 from '../../assets/bots/delivery-02-category.png';
import MR2 from '../../assets/bots/marathon-02-chat.png';

import ImgLub    from '../../assets/project-5.jpeg';
import ImgPlace  from '../../assets/project-2.jpeg';
import ImgMovies from '../../assets/project-4.jpeg';
import ImgTravel from '../../assets/project-3.jpeg';
import ImgShop   from '../../assets/project-6.jpeg';
import ImgEditor from '../../assets/Project-8.png';

const BOT_IMAGE_MAP = { gc: GC2, ht: HT4, dl: DL2, mr: MR2 };
const WEB_IMAGE_MAP = { lub: ImgLub, place: ImgPlace, movies: ImgMovies, travel: ImgTravel, shop: ImgShop, editor: ImgEditor };

const BOT_NODES = [
  { id: 'gc',  city: 'Moscow',   lat: 55.75, lon: 37.61,  title: 'GoodChemistry',    sub: 'e-commerce bot',       url: 'http://t.me/online_gc_bot',       stack: 'Python · Aiogram · PostgreSQL' },
  { id: 'ht',  city: 'Lisbon',   lat: 38.72, lon: -9.14,  title: 'AI Health Tracker', sub: 'GPT Vision nutrition', url: 'https://t.me/NutrForProBot',      stack: 'Python · OpenAI Vision · Redis' },
  { id: 'dl',  city: 'Berlin',   lat: 52.52, lon: 13.40,  title: 'DeliveryBot',       sub: 'business lunches',    url: 'http://t.me/DeliveryBot_mvp_bot', stack: 'Python · Aiogram · Sheets' },
  { id: 'mr',  city: 'Istanbul', lat: 41.01, lon: 28.98,  title: 'Fitness Marathon',  sub: 'gamified challenge',  url: 'https://t.me/slim_together_bot',  stack: 'Aiogram · FastAPI · React' },
];

const WEB_NODES = [
  { id: 'lub',    city: 'Belgrade',  lat: 44.79, lon: 20.45, title: 'Lyubimovka Festival', sub: 'festival platform', url: 'https://lubimovka.art',                                       kind: 'festival', stack: 'Python · Django · React', accent: 'oklch(78% 0.15 120)' },
  { id: 'place',  city: 'Amsterdam', lat: 52.37, lon:  4.89, title: 'The Place',           sub: 'social network',    url: 'https://bolshakov.nomoredomains.xyz',                         kind: 'social',   stack: 'React · Node.js',         accent: 'oklch(70% 0.15 250)' },
  { id: 'movies', city: 'Warsaw',    lat: 52.23, lon: 21.01, title: 'Movies Explorer',     sub: 'film library',      url: 'https://bolshakovav.nomoredomains.xyz/movies',                kind: 'movies',   stack: 'React · Node.js',         accent: 'oklch(70% 0.15 200)' },
  { id: 'travel', city: 'Tbilisi',   lat: 41.72, lon: 44.79, title: 'Russian Travel',      sub: 'adaptive site',     url: 'https://bolshakovandrey.github.io/russian-travel/',           kind: 'travel',   stack: 'HTML · CSS',              accent: 'oklch(75% 0.15 50)' },
  { id: 'shop',   city: 'Prague',    lat: 50.08, lon: 14.44, title: 'Toy4Joy',             sub: 'e-shop',            url: 'https://www.toy4joy.site/',                                   kind: 'shop',     stack: 'jQuery · Bootstrap',      accent: 'oklch(75% 0.16 25)' },
  { id: 'editor', city: 'Zurich',    lat: 47.38, lon:  8.55, title: 'Visual Script Editor', sub: 'QCodes',           url: 'https://bolshakovandrey.github.io/qcodes-react-demo-pages/', kind: 'editor',   stack: 'React.js',                accent: 'oklch(72% 0.15 300)' },
];

const ALL = [
  ...BOT_NODES.map(p => ({ ...p, group: 'bots' })),
  ...WEB_NODES.map(p => ({ ...p, group: 'web' })),
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

function ProjectCard({ project, onClick }) {
  const { t } = useTranslation();
  const accent = project.group === 'bots' ? 'oklch(78% 0.18 280)' : 'oklch(78% 0.15 140)';

  return (
    <div
      onClick={onClick}
      className="project-card"
      style={{
        position: 'relative',
        background: 'var(--fg-02)',
        borderRadius: 10,
        padding: 24,
        cursor: 'pointer',
        overflow: 'hidden',
        "--accent": accent,
        "--accent-hover-border": `${accent}66`,
        "--accent-hover-shadow": `${accent}22`
      }}
    >
      {/* Preview */}
      <div style={{
        height: 180, marginBottom: 20, borderRadius: 6, overflow: 'hidden',
        background: '#0c0d10', position: 'relative',
      }}>
        {project.group === 'bots' ? (
          <div style={{ width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
            <LiveChat botId={project.id} compact autoScroll />
          </div>
        ) : project.group === 'web' && WEB_IMAGE_MAP[project.id] ? (
          <img className="project-card-image" src={WEB_IMAGE_MAP[project.id]} alt="" />
        ) : null}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          padding: '4px 8px', background: 'rgba(3,5,8,0.8)',
          backdropFilter: 'blur(10px)', borderRadius: 3,
          border: `1px solid ${accent}66`,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
          color: accent, letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          {project.group === 'bots' ? t('portfolio.tg_bot') : t('portfolio.web')} · {project.city}
        </div>
      </div>

      <div style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 22, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em', marginBottom: 4 }}>
        {project.title}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--fg)', opacity: 0.55, marginBottom: 14 }}>
        {project.sub}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--fg)', opacity: 0.45, letterSpacing: '0.05em' }}>
        {project.stack}
      </div>

      <div className="project-card-link">{t('portfolio.open')}</div>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => filter === 'all' ? ALL : ALL.filter(p => p.group === filter), [filter]);

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <PageHero page="portfolio" />

      <section style={{
        position: 'relative', zIndex: 10,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 5vw, 80px) clamp(80px, 12vh, 160px)',
        background: 'var(--bg)',
        borderTop: '1px solid var(--fg-04)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionLabel color="oklch(78% 0.15 140)" text={t('portfolio.section_label')} />

          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20, marginTop: 32, marginBottom: 48,
          }}>
            <h2 style={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 500, color: 'var(--fg)',
              letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0,
            }}>
              {t('portfolio.headline', { count: ALL.length })}<br />
              <span style={{ fontStyle: 'italic', color: 'oklch(78% 0.15 140)' }}>{t('portfolio.headline2')}</span>
            </h2>

            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'all',  label: t('portfolio.filter_all',  { count: ALL.length }) },
                { id: 'bots', label: t('portfolio.filter_bots', { count: BOT_NODES.length }) },
                { id: 'web',  label: t('portfolio.filter_web',  { count: WEB_NODES.length }) },
              ].map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{
                  padding: '10px 18px',
                  background: filter === f.id ? 'var(--fg)' : 'transparent',
                  color: filter === f.id ? 'var(--bg-deep)' : 'var(--fg)',
                  border: '1px solid', borderColor: filter === f.id ? 'var(--fg)' : 'var(--fg-20)',
                  borderRadius: 4,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 200ms',
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          {filter === 'bots' ? (
            <BotConstellation onSelectBot={(id) => {
              const bot = BOT_NODES.find(b => b.id === id);
              if (bot) setSelected({ project: { ...bot, group: 'bots' }, group: 'bots' });
            }} />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20,
            }}>
              {filtered.map(p => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelected({ project: p, group: p.group })} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && selected.group === 'bots' && (
        <BotProjectModal
          botId={selected.project.id}
          onClose={() => setSelected(null)}
        />
      )}
      {selected && selected.group === 'web' && (
        <ProjectDetail
          project={selected.project}
          group="web"
          botImageMap={BOT_IMAGE_MAP}
          onClose={() => setSelected(null)}
        />
      )}
    </main>
  );
}

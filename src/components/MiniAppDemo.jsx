import React, { useState } from 'react';

// ── Marathon MiniApp mock screens ─────────────────────────────────────────────

const MR_COLORS = {
  bg: '#fdf6f2',
  surface: '#ffffff',
  accent: '#f66f40',
  accentSoft: 'rgba(246,111,64,0.10)',
  accentDark: '#d44b3a',
  text1: '#2d1a0e',
  text2: '#7a5f52',
  text3: '#b09a8f',
  ok: '#2ebb7f',
  danger: '#ef4444',
  border: 'rgba(246,111,64,0.12)',
};

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: MR_COLORS.surface,
      borderRadius: 14,
      padding: '10px 12px',
      boxShadow: '0 1px 3px rgba(212,75,58,0.05), 0 4px 12px rgba(246,111,64,0.06)',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ fontSize: 16 }}>{icon}</div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 18, fontWeight: 800, color: color || MR_COLORS.text1, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, color: MR_COLORS.text2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function ActivityRow({ icon, label, value, done }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0' }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        background: done ? MR_COLORS.ok : MR_COLORS.accentSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, flexShrink: 0,
        color: done ? '#fff' : MR_COLORS.text3,
      }}>{done ? '✓' : '·'}</div>
      <div style={{ flex: 1, fontFamily: 'Inter,sans-serif', fontSize: 10, color: MR_COLORS.text1, fontWeight: 500 }}>{label}</div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, color: MR_COLORS.text2 }}>{value}</div>
    </div>
  );
}

function DashboardScreen() {
  const waterPct = 72;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 10px 10px' }}>
      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <StatCard icon="📊" label="Отчётов" value="18" />
        <StatCard icon="⭐" label="Звёзды" value="12" color={MR_COLORS.accent} />
        <StatCard icon="🏆" label="Рейтинг" value="#3" color={MR_COLORS.accentDark} />
        <StatCard icon="💰" label="Штрафы" value="6€" color={MR_COLORS.danger} />
      </div>

      {/* Today */}
      <div style={{
        background: MR_COLORS.surface,
        borderRadius: 14,
        padding: '10px 12px',
        boxShadow: '0 1px 3px rgba(212,75,58,0.05)',
      }}>
        <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 700, color: MR_COLORS.text1, marginBottom: 6 }}>Сегодня</div>
        <ActivityRow icon="🥗" label="КБЖУ" value="1840 ккал" done={true} />
        <ActivityRow icon="👟" label="Шаги" value="6 200 / 8 000" done={false} />
        <ActivityRow icon="💪" label="Тренировка" value="45 мин" done={true} />
      </div>

      {/* Water */}
      <div style={{
        background: MR_COLORS.surface,
        borderRadius: 14,
        padding: '10px 12px',
        boxShadow: '0 1px 3px rgba(212,75,58,0.05)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 700, color: MR_COLORS.text1 }}>💧 Вода</div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, color: MR_COLORS.text2 }}>1 440 / 2 000 мл</div>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: MR_COLORS.accentSoft, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${waterPct}%`, background: `linear-gradient(90deg, ${MR_COLORS.accent}, ${MR_COLORS.accentDark})`, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {['+100', '+250', '+330', '+500'].map(ml => (
            <div key={ml} style={{
              flex: 1, textAlign: 'center',
              padding: '4px 0',
              background: MR_COLORS.accentSoft,
              borderRadius: 8,
              fontFamily: 'Inter,sans-serif', fontSize: 8, fontWeight: 600, color: MR_COLORS.accent,
            }}>{ml}</div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${MR_COLORS.accent}, ${MR_COLORS.accentDark})`,
        borderRadius: 12,
        padding: '10px 0',
        textAlign: 'center',
        fontFamily: 'Inter,sans-serif', fontSize: 11, fontWeight: 700, color: '#fff',
      }}>Отправить отчёт сегодня →</div>
    </div>
  );
}

function LeaderboardScreen() {
  const entries = [
    { rank: 1, name: 'Анна К.', stars: 20, penalty: '0€', weight: '▼ 3.2 кг' },
    { rank: 2, name: 'Михаил Б.', stars: 18, penalty: '3€', weight: '▼ 2.1 кг' },
    { rank: 3, name: 'Вы', stars: 12, penalty: '6€', weight: '▼ 1.8 кг', isMe: true },
    { rank: 4, name: 'Ольга Н.', stars: 11, penalty: '9€', weight: '▼ 0.9 кг' },
    { rank: 5, name: 'Дмитрий С.', stars: 9, penalty: '12€', weight: '▲ 0.3 кг', gainWeight: true },
  ];
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      {entries.map(e => (
        <div key={e.rank} style={{
          background: e.isMe ? MR_COLORS.accentSoft : MR_COLORS.surface,
          borderRadius: 12,
          padding: '8px 10px',
          display: 'flex', alignItems: 'center', gap: 8,
          border: e.isMe ? `1px solid ${MR_COLORS.border}` : 'none',
          boxShadow: '0 1px 3px rgba(212,75,58,0.05)',
        }}>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: e.rank <= 3 ? 16 : 11, fontWeight: 700, width: 20, textAlign: 'center', color: MR_COLORS.text2 }}>
            {e.rank <= 3 ? medals[e.rank - 1] : e.rank}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, fontWeight: 700, color: e.isMe ? MR_COLORS.accent : MR_COLORS.text1 }}>{e.name}</div>
            <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 8, color: MR_COLORS.text2 }}>⭐ {e.stars} · 💰 {e.penalty}</div>
          </div>
          <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 9, fontWeight: 600, color: e.gainWeight ? MR_COLORS.danger : MR_COLORS.ok }}>{e.weight}</div>
        </div>
      ))}
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',        label: 'Главная',  icon: '⊞' },
  { id: 'reports',     label: 'Отчёты',   icon: '📋' },
  { id: 'leaderboard', label: 'Топ',      icon: '🏆' },
  { id: 'profile',     label: 'Профиль',  icon: '👤' },
];

// ── Public component ──────────────────────────────────────────────────────────
export default function MiniAppDemo({ botId }) {
  const [tab, setTab] = useState('home');

  // Currently only Marathon MiniApp is implemented
  if (botId !== 'mr') return null;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: MR_COLORS.bg,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '32px 12px 8px',
        background: 'rgba(253,246,242,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${MR_COLORS.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: `linear-gradient(135deg, ${MR_COLORS.accent}, ${MR_COLORS.accentDark})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12,
        }}>🏃</div>
        <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, fontWeight: 800, color: MR_COLORS.text1, letterSpacing: '-0.02em' }}>
          {tab === 'home' ? 'Мой прогресс' : tab === 'leaderboard' ? 'Лидерборд' : tab === 'reports' ? 'История' : 'Профиль'}
        </div>
      </div>

      {/* Screen content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {tab === 'home' && <DashboardScreen />}
        {tab === 'leaderboard' && <LeaderboardScreen />}
        {(tab === 'reports' || tab === 'profile') && (
          <div style={{ padding: 20, textAlign: 'center', color: MR_COLORS.text3, fontSize: 11, marginTop: 40 }}>
            {tab === 'reports' ? '📋 История отчётов' : '👤 Профиль'}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{
        display: 'flex',
        background: 'rgba(253,246,242,0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: `1px solid ${MR_COLORS.border}`,
        padding: '6px 4px 10px',
        flexShrink: 0,
      }}>
        {NAV_ITEMS.map(item => {
          const active = tab === item.id;
          return (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 0',
              borderRadius: 8,
              transition: 'all 0.15s ease',
            }}>
              <div style={{ fontSize: 16 }}>{item.icon}</div>
              <div style={{
                fontFamily: 'Inter,sans-serif', fontSize: 8, fontWeight: 600,
                color: active ? MR_COLORS.accent : MR_COLORS.text3,
              }}>{item.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

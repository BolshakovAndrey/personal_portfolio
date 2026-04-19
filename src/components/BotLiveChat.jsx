import React, { useState, useEffect, useRef } from 'react';

// ── Telegram inline button ────────────────────────────────────────────────────
export function TgBtn({ label, wide = false }) {
  return (
    <button style={{
      flex: wide ? '1 1 100%' : '1 1 calc(50% - 3px)',
      padding: '9px 8px',
      background: 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 8,
      fontFamily: 'Inter, sans-serif', fontSize: 12,
      color: '#f5f2ea', cursor: 'default',
      textAlign: 'center', lineHeight: 1.3,
    }}>{label}</button>
  );
}

// ── Bot scripts ───────────────────────────────────────────────────────────────
export const BOT_SCRIPTS = {
  gc: {
    name: 'GoodChemistry',
    username: '@online_gc_bot',
    accent: 'oklch(78% 0.18 280)',
    avatar: '💊',
    steps: [
      { from: 'user', text: '/start', delay: 0 },
      {
        from: 'bot',
        text: 'Добро пожаловать в Good Chemistry! 💊\n\nЭто главное меню — выберите один из разделов:',
        delay: 800,
        buttons: [
          { label: '💊 Каталог', wide: true },
          { label: '🔍 Поиск', wide: true },
          { label: '🛒 Корзина', wide: true },
          { label: '👤 Мой профиль', wide: true },
        ],
      },
      { from: 'user', text: '💊 Каталог', delay: 2200 },
      {
        from: 'bot',
        text: 'Выберите категорию товаров:',
        delay: 3000,
        buttons: [
          { label: 'Аллергия' }, { label: 'Анемия' },
          { label: 'Группа В' }, { label: 'Детские' },
          { label: 'ЖКТ' }, { label: 'Магний' },
          { label: 'Мужское здоровье' }, { label: 'ОРВИ, иммунитет' },
          { label: '↩ Назад', wide: true },
        ],
      },
      { from: 'user', text: 'Магний', delay: 4400 },
      {
        from: 'bot',
        text: '🧲 Swiss Bork Magnesium Chelate\n\nМагний в хелатной форме для максимального усвоения. Поддерживает нервную систему, мышцы и нормальный сон.\n\n💰 1 890 ₽',
        delay: 5300,
        buttons: [
          { label: '🛒 В корзину', wide: true },
          { label: '↩ Назад' }, { label: '🔔 Уведомить о скидке' },
        ],
      },
      { from: 'user', text: '🛒 В корзину', delay: 6800 },
      {
        from: 'bot',
        text: '✅ Swiss Bork Magnesium добавлен!\n\n🛒 Корзина (1 товар):\n• Swiss Bork Magnesium — 1 шт. × 1 890 ₽\n\nСумма товаров: 1 890 ₽\n🚚 Доставка: Офис СДЭК от 140 ₽\n\n💰 Итого: от 2 030 ₽',
        delay: 7600,
        buttons: [
          { label: '🧾 Оформить заказ', wide: true },
          { label: '🛍 Продолжить покупки' }, { label: '🗑 Очистить' },
        ],
      },
    ],
  },

  ht: {
    name: 'Health Tracker',
    username: '@NutrForProBot',
    accent: 'oklch(78% 0.15 160)',
    avatar: '🥗',
    steps: [
      {
        from: 'bot',
        text: 'Привет! Я — ИИ-помощник по здоровью 🤖\n\nОтслеживаю:\n🍽 Еда (AI анализ КБЖУ по фото)\n💧 Вода · 🦶 Шаги · 💪 Тренировка\n💊 Витамины · 😀 Настроение · 😴 Сон\n📊 Ежедневная статистика',
        delay: 300,
        buttons: [{ label: '🚀 Начать', wide: true }],
      },
      { from: 'user', text: '🚀 Начать', delay: 1800 },
      {
        from: 'bot',
        text: 'Выберите раздел:',
        delay: 2500,
        buttons: [
          { label: '💧 Вода' }, { label: '🍽 Еда' }, { label: '💊 В…мины' },
          { label: '🦶 Шаги' }, { label: '💪 Тренировка' },
          { label: '😀 Н…ение' }, { label: '😴 Сон' }, { label: '🤕 Мигрень' },
        ],
      },
      { from: 'user', text: '🍽 Еда', delay: 3800 },
      { from: 'bot', text: '📸 Отправь фото блюда — я посчитаю КБЖУ через GPT-4 Vision', delay: 4500 },
      { from: 'user', text: '📷 [Фото: салат + свиная вырезка]', delay: 5800 },
      { from: 'bot', text: '⏳ Анализирую…', delay: 6500 },
      {
        from: 'bot',
        text: '🍽 Анализ тарелки\n\nСалат из микса листьев (~150г) + свиная вырезка в глазури (~100г)\n\n🔥 265 ккал  🥩 Б 24г  🧈 Ж 14г  🍞 У 7г\n\n📊 После этого приёма:\n2608 / 2148 ккал (121%) ⚠️\nЖиры: 130 / 72г ⚠️\n\n⚡ Калории превышают норму на 460 ккал!',
        delay: 8200,
        buttons: [
          { label: 'Сохранить' }, { label: 'Уточнить' },
          { label: 'Переснять' }, { label: 'К отчётам', wide: true },
        ],
      },
    ],
  },

  dl: {
    name: 'DeliveryBot',
    username: '@DeliveryBot_mvp_bot',
    accent: 'oklch(78% 0.15 50)',
    avatar: '🍱',
    steps: [
      {
        from: 'bot',
        text: '👋 Добро пожаловать в DeliveryBot!\n\nМы готовим и доставляем свежие бизнес-ланчи прямо к вашему порогу.\n\n✨ Почему выбирают нас:\n• Всегда свежие продукты 🥦\n• Быстрая доставка по городу 🚗\n• Удобное управление через Telegram 📱',
        delay: 300,
        buttons: [
          { label: '📋 Посмотреть меню', wide: true },
          { label: '🛒 Корзина (всего 2)', wide: true },
          { label: '📦 Мои заказы', wide: true },
          { label: 'ℹ️ О нас', wide: true },
        ],
      },
      { from: 'user', text: '📋 Посмотреть меню', delay: 1700 },
      {
        from: 'bot',
        text: 'Доступные категории:',
        delay: 2500,
        buttons: [
          { label: 'Супы', wide: true }, { label: 'Второе', wide: true },
          { label: '🔍 Поиск по меню', wide: true },
          { label: '🛒 Корзина', wide: true }, { label: '🏠 Главное меню', wide: true },
        ],
      },
      { from: 'user', text: 'Супы', delay: 3800 },
      {
        from: 'bot',
        text: '🥣 Борщ классический\n450 RSD · 380 ккал\n\nВ наличии ✅',
        delay: 4600,
        buttons: [
          { label: '➕ Добавить в корзину', wide: true },
          { label: '↩ Назад', wide: true },
        ],
      },
      { from: 'user', text: '➕ Добавить в корзину', delay: 5900 },
      {
        from: 'bot',
        text: '🛒 Ваша корзина:\n\n• Борщ × 2 = 900.0 RSD\n• Плов × 1 = 600.0 RSD\n\nСумма: 1 500.0 RSD\nДоставка: 300 RSD\n\n💰 Итого: 1 800.0 RSD',
        delay: 6800,
        buttons: [
          { label: '🚀 Оформить заказ', wide: true },
          { label: '🗑 Очистить корзину', wide: true },
        ],
      },
      { from: 'user', text: '🚀 Оформить заказ', delay: 8200 },
      { from: 'bot', text: '📍 Введите адрес доставки:', delay: 9000 },
      { from: 'user', text: 'Бульвар Зорана Джинджича, 123', delay: 10300 },
      {
        from: 'bot', text: '💳 Выберите способ оплаты:', delay: 11200,
        buttons: [
          { label: '💵 Наличными при получении', wide: true },
          { label: '💳 Оплата картой', wide: true },
        ],
      },
      { from: 'user', text: '💵 Наличными при получении', delay: 12500 },
      {
        from: 'bot',
        text: '🎉 Заказ №13 принят!\nМенеджер свяжется с вами в ближайшее время.\n\n📢 Уведомление отправлено в группу.',
        delay: 13400,
        buttons: [
          { label: '📋 Посмотреть меню', wide: true },
          { label: '📦 Мои заказы', wide: true },
        ],
      },
    ],
  },

  mr: {
    name: 'Fitness Marathon',
    username: '@slim_together_bot',
    accent: 'oklch(78% 0.16 210)',
    avatar: '🏃',
    steps: [
      {
        from: 'bot',
        text: '🏆 Добро пожаловать в фитнес-челлендж!\n\nПравила:\n1. Каждый день 3 активности:\n   – КБЖУ (вписался в норму)\n   – Шаги (мин. 8000, скриншот)\n   – Тренировка (5 из 7 дней)\n\n2. Штрафы:\n   – 3 EUR за невыполненную активность\n   – 1 выходной в неделю без штрафа\n   – 100 EUR если слился\n\n3. Побеждает тот, у кого меньше штрафов ⭐',
        delay: 300,
        buttons: [
          { label: '💪 Участвую!', wide: true },
          { label: '⚙️ Админ-панель', wide: true },
        ],
      },
      { from: 'user', text: '💪 Участвую!', delay: 2200 },
      {
        from: 'bot',
        text: '🎉 Ты в деле! Марафон начнётся, когда объявят набор.\n\nЧто делаем сегодня?',
        delay: 3000,
        buttons: [
          { label: '🏃 Мои активности' }, { label: '🏖 Выходной' },
          { label: '📋 Отправить отчёт', wide: true },
          { label: '📊 Статистика марафона' }, { label: '📝 Сводка за сегодня' },
        ],
      },
      { from: 'user', text: '📊 Статистика марафона', delay: 4400 },
      {
        from: 'bot',
        text: '📊 Статистика марафона\n\n⭐ 0 | 💩 5 | 💤 1 | ❄️ 2\n⚖️ Вес: 84.5 кг (+0.0 кг)\n\nПо дням:\n03-22 ✅ 📱 ❌ 🏆 💩 2\n03-23 ❌ 📱 ❌ 🏆 💩 3',
        delay: 5400,
        buttons: [
          { label: '🏃 Мои активности', wide: true },
          { label: '📝 Сводка за сегодня', wide: true },
        ],
      },
    ],
  },
};

// ── Live Chat ─────────────────────────────────────────────────────────────────
export function LiveChat({ botId, compact = false, autoScroll = false }) {
  const script = BOT_SCRIPTS[botId];
  const { accent, name, avatar } = script;
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const timersRef = useRef([]);

  const clear = () => timersRef.current.forEach(clearTimeout);

  const runScript = () => {
    clear();
    setVisibleSteps([]);
    setTyping(false);
    timersRef.current = [];

    script.steps.forEach((step, i) => {
      if (step.from === 'bot' && i > 0) {
        const t1 = setTimeout(() => setTyping(true), step.delay - 600);
        timersRef.current.push(t1);
      }
      const t2 = setTimeout(() => {
        setTyping(false);
        setVisibleSteps(v => [...v, i]);
      }, step.delay);
      timersRef.current.push(t2);
    });

    const lastDelay = script.steps[script.steps.length - 1].delay;
    timersRef.current.push(setTimeout(runScript, lastDelay + 4000));
  };

  useEffect(() => {
    runScript();
    return clear;
  }, [botId]); // eslint-disable-line

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [visibleSteps, typing, autoScroll]);


  const fs = compact ? 10 : 12;
  const headerPad = compact ? '32px 10px 8px' : '42px 14px 10px';
  const avatarSize = compact ? 28 : 36;
  const avatarFs = compact ? 14 : 18;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#17212b' }}>
      <style>{`
        @keyframes typingDot {
          0%,60%,100% { transform:translateY(0); opacity:.4; }
          30% { transform:translateY(-4px); opacity:1; }
        }
        @keyframes msgIn {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: headerPad, background: '#17212b',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
      }}>
        <div style={{
          width: avatarSize, height: avatarSize, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, oklch(55% 0.18 250))`,
          display: 'grid', placeItems: 'center', fontSize: avatarFs, flexShrink: 0,
        }}>{avatar}</div>
        <div>
          <div style={{ fontSize: compact ? 11 : 13, fontWeight: 600, color: '#f5f2ea', lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontSize: compact ? 9 : 10, color: accent }}>бот · online</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="lc-scroll" style={{
        flex: 1, overflowY: 'auto', padding: compact ? '6px 8px 4px' : '10px 10px 6px',
        display: 'flex', flexDirection: 'column', gap: compact ? 3 : 5,
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {script.steps.map((step, i) => {
          if (!visibleSteps.includes(i)) return null;
          const isMe = step.from === 'user';
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: 3 }}>
              <div style={{
                maxWidth: '90%',
                padding: compact ? '5px 8px' : '8px 11px',
                borderRadius: isMe ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
                background: isMe
                  ? `linear-gradient(135deg, ${accent}cc, oklch(55% 0.2 250)cc)`
                  : 'rgba(255,255,255,0.07)',
                color: '#f5f2ea',
                fontSize: fs, lineHeight: 1.4,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'pre-line',
                animation: 'msgIn 180ms cubic-bezier(.2,.8,.2,1)',
              }}>{step.text}</div>
              {step.buttons && (
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 3, maxWidth: '94%',
                  animation: 'msgIn 250ms 80ms cubic-bezier(.2,.8,.2,1) both',
                }}>
                  {step.buttons.map(btn => (
                    <button key={btn.label} style={{
                      flex: btn.wide ? '1 1 100%' : '1 1 calc(50% - 2px)',
                      padding: compact ? '5px 6px' : '9px 8px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: 6,
                      fontFamily: 'Inter, sans-serif', fontSize: compact ? 9 : 12,
                      color: '#f5f2ea', cursor: 'default',
                      textAlign: 'center', lineHeight: 1.3,
                    }}>{btn.label}</button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {typing && (
          <div style={{
            alignSelf: 'flex-start',
            padding: compact ? '6px 10px' : '10px 14px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '12px 12px 12px 3px',
            display: 'flex', gap: 3, alignItems: 'center',
          }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{
                width: compact ? 4 : 5, height: compact ? 4 : 5, borderRadius: '50%',
                background: 'rgba(245,242,234,0.5)',
                animation: `typingDot 1.2s ease ${j * 0.15}s infinite`,
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} style={{ height: 1 }} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: compact ? '5px 8px 10px' : '8px 10px 18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
      }}>
        <div style={{
          flex: 1, height: compact ? 26 : 34, background: 'rgba(255,255,255,0.06)',
          borderRadius: 14, display: 'flex', alignItems: 'center',
          padding: '0 10px', fontSize: compact ? 10 : 12,
          color: 'rgba(245,242,234,0.3)', fontFamily: 'Inter, sans-serif',
        }}>Сообщение…</div>
        <div style={{
          width: compact ? 26 : 34, height: compact ? 26 : 34, borderRadius: '50%',
          background: accent, display: 'grid', placeItems: 'center',
          fontSize: compact ? 13 : 16,
        }}>🎤</div>
      </div>
    </div>
  );
}

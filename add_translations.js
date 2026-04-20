const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/i18n/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const translations = {
  en: {
    "chat": {
      "greeting": "Hi there! 👋 Glad to see you here.",
      "ask_name": "What's your name?",
      "ask_email": "Nice to meet you, {{name}}! What's your email?",
      "ask_message": "Got it. What message would you like to send?",
      "sent": "Message sent! I'll get back to you ASAP. 🚀",
      "error": "Oops, my server seems to be hitting its limits right now! 😅 But no worries, you can just click my Telegram or Email links to the left to reach me.",
      "today": "Today",
      "now": "Now",
      "ended": "Chat ended",
      "placeholder": "Message...",
      "back": "Back",
      "online": "online"
    }
  },
  ru: {
    "chat": {
      "greeting": "Привет! 👋 Рад видеть тебя здесь.",
      "ask_name": "Как тебя зовут?",
      "ask_email": "Приятно познакомиться, {{name}}! Какой у тебя email?",
      "ask_message": "Понял. Какое сообщение ты хочешь отправить?",
      "sent": "Сообщение отправлено! Я свяжусь с тобой как можно скорее. 🚀",
      "error": "Упс, мой сервер временно отдыхает (лимит API)! 😅 Но ты всё равно можешь связаться со мной, нажав на ссылки Telegram или Email слева.",
      "today": "Сегодня",
      "now": "Сейчас",
      "ended": "Чат завершен",
      "placeholder": "Сообщение...",
      "back": "Назад",
      "online": "в сети"
    }
  }
};

for (const file of files) {
  const lang = file.replace('.json', '');
  const p = path.join(localesDir, file);
  try {
    let data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!data.contact) data.contact = {};
    
    // Choose EN fallback if lang not RU
    const toAdd = translations[lang] || translations['en'];
    
    data.contact.chat = toAdd.chat;
    fs.writeFileSync(p, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  } catch(e) {
    console.error(`Error with ${file}:`, e);
  }
}

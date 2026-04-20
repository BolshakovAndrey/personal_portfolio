import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import de from './locales/de.json';
import ru from './locales/ru.json';
import sr from './locales/sr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

const savedLang = (() => { try { return localStorage.getItem('lang'); } catch { return null; } })();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      ru: { translation: ru },
      sr: { translation: sr },
      es: { translation: es },
      pt: { translation: pt },
      zh: { translation: zh },
    },
    lng: savedLang || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;

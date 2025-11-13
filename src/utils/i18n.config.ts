import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en';
import ru from './translations/ru';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { languageDetectorPlugin } = require('./languageDetectorPlugin');

export const languages = [
  {
    value: 'en',
    name: 'English',
  },
  {
    value: 'ru',
    name: 'Russian',
  },
];

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(languageDetectorPlugin)
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v4',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

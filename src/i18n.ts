import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

const resources = Object.entries(translations).reduce(
  (acc, [lng, value]) => ({
    ...acc,
    [lng]: { translation: value },
  }),
  {} as Record<string, { translation: any }>
);

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

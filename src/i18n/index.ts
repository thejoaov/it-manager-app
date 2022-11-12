/* eslint-disable import/extensions */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './translations/enUS.json';
import pt from './translations/ptBR.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: {
      'en-US': en,
      'pt-BR': pt,
      en,
      pt,
    },
    lng: Localization.locale,
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

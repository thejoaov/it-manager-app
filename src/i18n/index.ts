/* eslint-disable import/extensions */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './translations/enUS.json';
import pt from './translations/ptBR.json';
import {
  registerTranslation,
  pt as DatePickerPT,
  en as DatePickerEN,
} from 'react-native-paper-dates';

export const getDatePickerLocalization = () => {
  const locale = Localization.locale;
  if (locale === 'pt-BR') {
    return DatePickerPT;
  }
  return DatePickerEN;
};

export const getLocale = () => {
  const locale = Localization.locale;
  if (locale === 'pt-BR') {
    return 'pt';
  }
  return 'en';
};

// registerTranslation(getLocale(), getDatePickerLocalization());
registerTranslation('pt', DatePickerPT);
registerTranslation('pt-BR', DatePickerPT);
registerTranslation('en', DatePickerEN);
registerTranslation('en-US', DatePickerEN);

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
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import backend from 'i18next-xhr-backend';
import languageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath:process.env.REACT_APP_I18N_LOCALES
    },
    fallbackLng: process.env.REACT_APP_I18N_FALLBACK,
    debug: process.env.REACT_APP_I18N_DEBUG,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
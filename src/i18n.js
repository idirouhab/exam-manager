import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_es from "./transalations/es/common.json";
import common_en from "./transalations/en/common.json";

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {escapeValue: false},
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                common: common_en
            },
            es: {
                common: common_es
            },
        },
    });



export default i18n;
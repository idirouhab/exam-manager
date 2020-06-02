import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import common_es from "./transalations/es/common.json";
import common_en from "./transalations/en/common.json";
import common_ca from "./transalations/ca/common.json";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {escapeValue: false},
        debug: false,
        fallbackLng: 'en',
        resources: {
            en: {
                common: common_en
            },
            es: {
                common: common_es
            },
            ca: {
                common: common_ca
            },
        },
    });

export default i18n;

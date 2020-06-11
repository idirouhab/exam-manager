import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import common_es from "./transalations/es/common.json";
import api_es from "./transalations/es/api.json";
import common_en from "./transalations/en/common.json";
import api_en from "./transalations/en/api.json";
import common_ca from "./transalations/ca/common.json";
import api_ca from "./transalations/ca/api.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    debug: false,
    fallbackLng: "en",
    fallbackNS: "common",
    resources: {
      en: {
        common: common_en,
        api: api_en
      },
      es: {
        common: common_es,
        api: api_es
      },
      ca: {
        common: common_ca,
        api: api_ca

      },
      /* gl: {
         common: common_gl
       },
       fr: {
         common: common_fr
       },*/
    },
  });

export default i18n;

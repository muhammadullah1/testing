import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnglishTranslation from './locales/en/en.json'
import ArabicTranslation from './locales/ar/ar.json'

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    lng: window.localStorage.getItem("lang") || "en",
    resources: {
        en: {
            translation: EnglishTranslation,
        },
        ar: {
            translation: ArabicTranslation,
        },
    },
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

i18n.languages = ["en", "ar"];

export default i18n;

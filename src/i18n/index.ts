import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

export const LANGUAGE_STORAGE_KEY = "affiliates:lang";
export const supportedLanguages = ["zh", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

function getStoredLanguage(): SupportedLanguage | null {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(stored as SupportedLanguage)
      ? (stored as SupportedLanguage)
      : null;
  } catch {
    return null;
  }
}

const initialLanguage = getStoredLanguage() ?? "zh";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: initialLanguage,
  fallbackLng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, LOCALES, LOCALE_TAGS, type Dict, type Locale } from "./translations";

const STORAGE_KEY = "portfolio-lang";
const DEFAULT_LOCALE: Locale = "fr";

interface LanguageContextValue {
  locale: Locale;
  /** BCP-47 tag used for number/date formatting (fr-FR, en-GB, de-DE). */
  localeTag: string;
  t: Dict;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  localeTag: LOCALE_TAGS[DEFAULT_LOCALE],
  t: translations[DEFAULT_LOCALE],
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always starts in French (server + first client render) so hydration matches;
  // a previously chosen language is restored right after mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        setLocaleState(saved as Locale);
      }
    } catch {
      /* storage unavailable: stay on the default language */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translations[locale].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translations[locale].meta.description);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, localeTag: LOCALE_TAGS[locale], t: translations[locale], setLocale }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

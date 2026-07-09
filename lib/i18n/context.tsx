"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { es, type Dict } from "./es";
import { pt } from "./pt";

export type Locale = "es" | "pt";

const DICTS: Record<Locale, Dict> = { es, pt };
const STORAGE_KEY = "kunuu-locale";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: Dict;
  switching: boolean;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [switching, setSwitching] = useState(false);

  // Hidratar desde localStorage (o preferencia del navegador) tras montar.
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Locale | null;
    if (stored === "es" || stored === "pt") {
      setLocaleState(stored);
    } else if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("pt")) {
      setLocaleState("pt");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback(
    (l: Locale) => {
      setLocaleState((prev) => {
        if (prev === l) return prev;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, l);
        }
        // Micro-transición suave al cambiar de idioma
        setSwitching(true);
        window.setTimeout(() => setSwitching(false), 420);
        return l;
      });
    },
    []
  );

  const toggle = useCallback(() => {
    setLocale(locale === "es" ? "pt" : "es");
  }, [locale, setLocale]);

  const value = useMemo<LangContextValue>(
    () => ({ locale, setLocale, toggle, t: DICTS[locale], switching }),
    [locale, setLocale, toggle, switching]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}

/** Atajo para acceder solo al diccionario. */
export function useT(): Dict {
  return useLang().t;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLang } from "./i18n/context";

export type Currency = "USD" | "PYG" | "BRL";

/** Tasas FALSAS (demo). Base = USD. Editá acá para cambiarlas. */
export const RATES: Record<Currency, number> = {
  USD: 1,
  PYG: 7300,
  BRL: 5.45,
};

export const CURRENCY_META: Record<
  Currency,
  { symbol: string; short: string; locale: string }
> = {
  USD: { symbol: "US$", short: "US$", locale: "en-US" },
  PYG: { symbol: "₲", short: "₲", locale: "es-PY" },
  BRL: { symbol: "R$", short: "R$", locale: "pt-BR" },
};

const STORAGE_KEY = "kunuu-currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Formatea un monto en USD a la moneda activa. */
  format: (usd: number) => string;
  /** Formatea un monto en USD a una moneda específica. */
  formatIn: (usd: number, c: Currency) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function fmt(usd: number, c: Currency): string {
  const meta = CURRENCY_META[c];
  const amount = Math.round(usd * RATES[c]);
  const n = new Intl.NumberFormat(meta.locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${meta.symbol} ${n}`;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useLang();
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (stored === "USD" || stored === "PYG" || stored === "BRL") {
      setCurrencyState(stored);
    } else {
      // Default por idioma: ES → guaraníes (Paraguay), PT → reales (Brasil)
      setCurrencyState(locale === "pt" ? "BRL" : "PYG");
    }
    // solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    window.localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      format: (usd: number) => fmt(usd, currency),
      formatIn: (usd: number, c: Currency) => fmt(usd, c),
    }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useMoney() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useMoney debe usarse dentro de <CurrencyProvider>");
  return ctx;
}

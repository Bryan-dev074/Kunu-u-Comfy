import type { Locale, Bilingual } from "./types";

/** Une clases condicionalmente (mini clsx). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Elige el valor bilingüe según el idioma. */
export function pick(field: Bilingual, locale: Locale): string {
  return field[locale];
}

const LOCALE_TAG: Record<Locale, string> = { es: "es-AR", pt: "pt-BR" };

/** Formatea precios en la moneda del demo (USD) con formato local. */
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Reemplaza {token} en una cadena de plantilla. */
export function tpl(str: string, vars: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

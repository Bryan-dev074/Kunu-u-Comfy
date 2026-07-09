"use client";

import { motion } from "motion/react";
import { useLang, type Locale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLang();
  const options: Locale[] = ["es", "pt"];

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border border-[var(--line-strong)] bg-algodon/40 p-0.5 backdrop-blur",
        className
      )}
      role="group"
      aria-label="Idioma / Idioma"
    >
      <motion.span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-terracota"
        animate={{ x: locale === "es" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
      />
      {options.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "relative z-10 rounded-full px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors",
            locale === l ? "text-algodon" : "text-taupe hover:text-cacao"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

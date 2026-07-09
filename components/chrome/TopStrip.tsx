"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useT } from "@/lib/i18n/context";
import { useMoney, RATES, CURRENCY_META, type Currency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { PYFlag, BRFlag, USFlag } from "@/components/icons/Flags";

const CURRENCIES: Currency[] = ["USD", "PYG", "BRL"];
const FLAG: Record<Currency, (p: { className?: string }) => React.ReactElement> = {
  USD: USFlag,
  PYG: PYFlag,
  BRL: BRFlag,
};

export default function TopStrip() {
  const t = useT();
  const { currency, setCurrency } = useMoney();
  const msgs = t.announce;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % msgs.length), 4200);
    return () => window.clearInterval(id);
  }, [msgs.length]);

  const safe = i % msgs.length;
  const fxPyg = new Intl.NumberFormat("es-PY").format(RATES.PYG);
  const fxBrl = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(RATES.BRL);

  return (
    <div className="bg-nocturno text-lino/85">
      <div className="u-container flex h-10 items-center justify-between gap-3 text-[0.66rem]">
        {/* Ticker de cambio (falso) con banderas */}
        <div className="flex items-center gap-2 whitespace-nowrap sm:gap-3">
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="uppercase tracking-[0.18em] text-lino/45">Cambio</span>
          </span>
          <span className="tabular flex items-center gap-1.5">
            US$ 1 =
            <PYFlag className="h-3 w-[1.15rem] rounded-[3px] ring-1 ring-black/10" />
            <b className="font-semibold text-lino">₲ {fxPyg}</b>
          </span>
          <span className="hidden text-lino/25 sm:inline">·</span>
          <span className="tabular hidden items-center gap-1.5 sm:flex">
            US$ 1 =
            <BRFlag className="h-3 w-[1.15rem] rounded-[3px] ring-1 ring-black/10" />
            <b className="font-semibold text-lino">R$ {fxBrl}</b>
          </span>
        </div>

        {/* Anuncio rotativo (desktop) */}
        <div className="hidden flex-1 justify-center overflow-hidden lg:flex">
          <AnimatePresence mode="wait">
            <motion.span
              key={msgs[safe]}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="uppercase tracking-[0.2em] text-lino/65"
            >
              {msgs[safe]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Selector de moneda con banderas */}
        <div
          className="flex items-center gap-0.5 rounded-full border border-lino/15 p-0.5"
          role="group"
          aria-label="Moneda"
        >
          {CURRENCIES.map((c) => {
            const Flag = FLAG[c];
            const active = currency === c;
            return (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 font-semibold leading-none transition-colors",
                  active ? "bg-terracota text-algodon" : "text-lino/55 hover:text-lino"
                )}
              >
                <Flag className="h-2.5 w-[0.95rem] rounded-[2px] ring-1 ring-black/10" />
                {CURRENCY_META[c].short}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
